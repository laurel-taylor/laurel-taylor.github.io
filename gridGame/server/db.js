import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Database from 'better-sqlite3';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, 'data');

export function getDb() {
  fs.mkdirSync(dataDir, { recursive: true });
  const db = new Database(path.join(dataDir, 'games.db'));
  db.exec(`
    DROP TABLE IF EXISTS games;
    CREATE TABLE games (
      id TEXT PRIMARY KEY,
      status TEXT NOT NULL,
      reason TEXT,
      player_x INTEGER NOT NULL,
      player_y INTEGER NOT NULL,
      pc_x INTEGER NOT NULL,
      pc_y INTEGER NOT NULL,
      objective_x INTEGER NOT NULL,
      objective_y INTEGER NOT NULL,
      difficulty INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    )
  `);
  return db;
}
