# Grid Chase

10x10 wrapping chase game. Reach the objective before the PC does. You move on demand; the PC moves on a timer over WebSockets (every 2 seconds by default). You lose if you collide with the PC, or if the PC reaches the objective.

## Features

- Wrapping grid
- 8-way movement
- Real-time PC movement via WebSockets
- Difficulty: PC moves randomly or tries to catch you
- Different themes that change the look and feel of the game

## Caviats

- Must run local server to play

## Run locally

The Express server owns the rules, stores games in SQLite (`server/data/games.db`), and pushes PC moves over WebSocket (`/ws`). The Vite app proxies `/api` and `/ws` to that server.

PC move speed is controlled by `PC_MOVE_INTERVAL_MS` in `server/ws.js` (default `2000`).

```bash
# terminal 1
cd gridGame/server && npm install && npm run dev

# terminal 2
cd gridGame/client && npm install && npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Build frontend

```bash
cd gridGame/client && npm run build
```

The built files will be in `gridGame/client/dist`.

## Credits

- Original concept from my web design class at UGA (Spring 2009)
- Made with help from Cursor (Grok 4.5 High Fast)
