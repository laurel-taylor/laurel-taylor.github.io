import crypto from 'node:crypto';
import cors from 'cors';
import express from 'express';
import { getDb } from './db.js';
import { applyPlayerMove, GRID_SIZE, spawnEntities } from './game.js';

const PORT = Number(process.env.PORT) || 3001;
const db = getDb();
const app = express();

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
  };
}

function toPublic(game) {
  return { ...game, gridSize: GRID_SIZE };
}

function saveGame(game) {
  db.prepare(
    `
    UPDATE games SET
      status = ?,
      reason = ?,
      player_x = ?, player_y = ?,
      pc_x = ?, pc_y = ?,
      objective_x = ?, objective_y = ?,
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
    game.id,
  );
}

app.post('/api/games', (req, res) => {
  const id = crypto.randomUUID();
  const spawned = spawnEntities();
  const difficulty = req.body.difficulty;
  db.prepare(
    `
    INSERT INTO games (
      id, status, reason, player_x, player_y, pc_x, pc_y, objective_x, objective_y, difficulty
    ) VALUES (?, 'in_progress', NULL, ?, ?, ?, ?, ?, ?, ?)
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
  res.status(201).json(toPublic({ id, status: 'in_progress', reason: null, difficulty, ...spawned }));
});

app.get('/api/games/:id', (req, res) => {
  const row = db.prepare('SELECT * FROM games WHERE id = ?').get(req.params.id);
  if (!row) {
    return res.status(404).json({ error: 'Game not found' });
  }
  res.json(toPublic(rowToGame(row)));
});

app.patch('/api/games/:id', (req, res) => {
  const row = db.prepare('SELECT * FROM games WHERE id = ?').get(req.params.id);
  if (!row) {
    return res.status(404).json({ error: 'Game not found' });
  }
  if (row.status !== 'in_progress') {
    return res.status(400).json({ error: 'Game is over' });
  }
  const difficulty = req.body.difficulty;
  db.prepare(
    `UPDATE games SET difficulty = ?, updated_at = datetime('now') WHERE id = ?`,
  ).run(difficulty, req.params.id);
  res.json(toPublic(rowToGame({ ...row, difficulty })));
});

app.post('/api/games/:id/move', (req, res) => {
  const row = db.prepare('SELECT * FROM games WHERE id = ?').get(req.params.id);
  if (!row) {
    return res.status(404).json({ error: 'Game not found' });
  }
  const result = applyPlayerMove(rowToGame(row), req.body?.direction);
  if (result.error) {
    return res.status(result.status).json({ error: result.error });
  }
  saveGame(result.game);
  res.json(toPublic(result.game));
});

app.listen(PORT, () => {
  console.log(`Grid chase server on http://localhost:${PORT}`);
});
