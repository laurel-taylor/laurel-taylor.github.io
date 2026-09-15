import { WebSocketServer } from 'ws';
import { applyPcMove } from './game.js';

export const PC_MOVE_INTERVAL_MS = 3000;

/**
 * Attach the game WebSocket server and PC tickers to an HTTP server.
 * @returns {{ broadcast: (gameId: string, payload: object) => void, publishGame: (game: object) => object }}
 */
export function attachGameSocket({
  server,
  db,
  rowToGame,
  toPublic,
  saveGame,
  applyTimeoutIfNeeded,
}) {
  const wss = new WebSocketServer({ server, path: '/ws' });

  /** @type {Map<string, { clients: Set<import('ws').WebSocket>, interval: ReturnType<typeof setInterval> | null }>} */
  const rooms = new Map();

  function getRoom(gameId) {
    let room = rooms.get(gameId);
    if (!room) {
      room = { clients: new Set(), interval: null };
      rooms.set(gameId, room);
    }
    return room;
  }

  function removeClient(gameId, socket) {
    const room = rooms.get(gameId);
    if (!room) return;
    room.clients.delete(socket);
    if (room.clients.size === 0) {
      stopPcTicker(gameId);
      rooms.delete(gameId);
    }
  }

  function broadcast(gameId, payload) {
    const room = rooms.get(gameId);
    if (!room) return;
    const message = JSON.stringify(payload);
    for (const client of room.clients) {
      if (client.readyState === 1) {
        client.send(message);
      }
    }
  }

  function stopPcTicker(gameId) {
    const room = rooms.get(gameId);
    if (!room?.interval) return;
    clearInterval(room.interval);
    room.interval = null;
  }

  function tickPc(gameId) {
    const row = db.prepare('SELECT * FROM games WHERE id = ?').get(gameId);
    if (!row || row.status !== 'in_progress') {
      stopPcTicker(gameId);
      return;
    }

    const current = applyTimeoutIfNeeded(rowToGame(row));
    if (current.status !== 'in_progress') {
      const saved = saveGame(current);
      broadcast(gameId, { type: 'game_update', game: toPublic(saved) });
      stopPcTicker(gameId);
      return;
    }

    const result = applyPcMove(current);
    if (result.error) {
      stopPcTicker(gameId);
      return;
    }

    const saved = saveGame(result.game);
    broadcast(gameId, { type: 'game_update', game: toPublic(saved) });

    if (saved.status !== 'in_progress') {
      stopPcTicker(gameId);
    }
  }

  function ensurePcTicker(gameId) {
    const room = getRoom(gameId);
    if (room.interval) return;

    const row = db.prepare('SELECT status FROM games WHERE id = ?').get(gameId);
    if (!row || row.status !== 'in_progress') return;

    room.interval = setInterval(() => tickPc(gameId), PC_MOVE_INTERVAL_MS);
  }

  function publishGame(game) {
    const saved = saveGame(game);
    broadcast(saved.id, { type: 'game_update', game: toPublic(saved) });
    if (saved.status !== 'in_progress') {
      stopPcTicker(saved.id);
    }
    return saved;
  }

  wss.on('connection', (socket) => {
    let subscribedGameId = null;

    socket.on('message', (raw) => {
      let message;
      try {
        message = JSON.parse(String(raw));
      } catch {
        return;
      }

      if (message.type !== 'subscribe' || typeof message.gameId !== 'string') {
        return;
      }

      const gameId = message.gameId;
      const row = db.prepare('SELECT * FROM games WHERE id = ?').get(gameId);
      if (!row) {
        socket.send(JSON.stringify({ type: 'error', error: 'Game not found' }));
        return;
      }

      if (subscribedGameId && subscribedGameId !== gameId) {
        removeClient(subscribedGameId, socket);
      }

      subscribedGameId = gameId;
      const room = getRoom(gameId);
      room.clients.add(socket);
      socket.send(JSON.stringify({ type: 'game_update', game: toPublic(rowToGame(row)) }));
      ensurePcTicker(gameId);
    });

    socket.on('close', () => {
      if (!subscribedGameId) return;
      removeClient(subscribedGameId, socket);
    });
  });

  return { broadcast, publishGame };
}
