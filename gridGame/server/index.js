import crypto from 'node:crypto';
import http from 'node:http';
import cors from 'cors';
import express from 'express';
import { getDb } from './db.js';
import {
  applyPlayerMove,
  applyTimeoutIfNeeded,
  GAME_TIMEOUT_MS,
  GRID_SIZE,
  spawnEntities,
  startedAtMs,
} from './game.js';
import { attachGameSocket, PC_MOVE_INTERVAL_MS } from './ws.js';

const PORT = Number(process.env.PORT) || 3001;

const db = getDb();
const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

function rowToGame(row) {
  if (!row) return null;
  return {
    id: row.id,
    status: row.status,
    reason: row.reason ?? null,
    player: { x: row.player_x, y: row.player_y },
    pc: { x: row.pc_x, y: row.pc_y },
    objective: { x: row.objective_x, y: row.objective_y },
    difficulty: row.difficulty,
    version: row.version ?? 0,
    startedAt: startedAtMs(row.created_at),
  };
}

function toPublic(game) {
  const { startedAt, ...rest } = game;
  return {
    ...rest,
    gridSize: GRID_SIZE,
    timeLimitMs: GAME_TIMEOUT_MS,
    expiresAt: startedAt + GAME_TIMEOUT_MS,
  };
}

function resolveGame(row) {
  const game = applyTimeoutIfNeeded(rowToGame(row));
  if (game.status !== row.status || game.reason !== (row.reason ?? null)) {
    return publishGame(game);
  }
  return game;
}

function saveGame(game) {
  const version = (game.version ?? 0) + 1;
  db.prepare(
    `
    UPDATE games SET
      status = ?,
      reason = ?,
      player_x = ?, player_y = ?,
      pc_x = ?, pc_y = ?,
      objective_x = ?, objective_y = ?,
      version = ?,
      updated_at = datetime('now')
    WHERE id = ?
  `,
  ).run(
    game.status,
    game.reason ?? null,
    game.player.x,
    game.player.y,
    game.pc.x,
    game.pc.y,
    game.objective.x,
    game.objective.y,
    version,
    game.id,
  );
  return { ...game, version };
}

const { broadcast, publishGame } = attachGameSocket({
  server,
  db,
  rowToGame,
  toPublic,
  saveGame,
  applyTimeoutIfNeeded,
});

app.post('/api/games', (req, res) => {
  const id = crypto.randomUUID();
  const spawned = spawnEntities();
  const difficulty = req.body.difficulty;
  const startedAt = Date.now();
  db.prepare(
    `
    INSERT INTO games (
      id, status, reason, player_x, player_y, pc_x, pc_y, objective_x, objective_y, difficulty, version
    ) VALUES (?, 'in_progress', NULL, ?, ?, ?, ?, ?, ?, ?, 0)
  `,
  ).run(
    id,
    spawned.player.x,
    spawned.player.y,
    spawned.pc.x,
    spawned.pc.y,
    spawned.objective.x,
    spawned.objective.y,
    difficulty,
  );
  res.status(201).json(
    toPublic({
      id,
      status: 'in_progress',
      reason: null,
      difficulty,
      version: 0,
      startedAt,
      ...spawned,
    }),
  );
});

app.get('/api/games/:id', (req, res) => {
  const row = db.prepare('SELECT * FROM games WHERE id = ?').get(req.params.id);
  if (!row) {
    return res.status(404).json({ error: 'Game not found' });
  }
  res.json(toPublic(resolveGame(row)));
});

app.patch('/api/games/:id', (req, res) => {
  const row = db.prepare('SELECT * FROM games WHERE id = ?').get(req.params.id);
  if (!row) {
    return res.status(404).json({ error: 'Game not found' });
  }
  const current = resolveGame(row);
  if (current.status !== 'in_progress') {
    return res.status(400).json({ error: 'Game is over' });
  }
  const difficulty = req.body.difficulty;
  const version = (current.version ?? 0) + 1;
  db.prepare(
    `UPDATE games SET difficulty = ?, version = ?, updated_at = datetime('now') WHERE id = ?`,
  ).run(difficulty, version, req.params.id);
  const game = toPublic({ ...current, difficulty, version });
  broadcast(req.params.id, { type: 'game_update', game });
  res.json(game);
});

app.post('/api/games/:id/move', (req, res) => {
  const row = db.prepare('SELECT * FROM games WHERE id = ?').get(req.params.id);
  if (!row) {
    return res.status(404).json({ error: 'Game not found' });
  }
  const current = applyTimeoutIfNeeded(rowToGame(row));
  if (current.status !== 'in_progress') {
    const saved = publishGame(current);
    return res.json(toPublic(saved));
  }
  const result = applyPlayerMove(current, req.body?.direction);
  if (result.error) {
    return res.status(result.status).json({ error: result.error });
  }
  const saved = publishGame(result.game);
  res.json(toPublic(saved));
});

server.listen(PORT, () => {
  console.log(`Grid chase server on http://localhost:${PORT}`);
  console.log(`WebSocket on ws://localhost:${PORT}/ws (PC moves every ${PC_MOVE_INTERVAL_MS}ms)`);
});
