# Grid Chase

10x10 wrapping chase game. Reach objective. The PC moves after every turn you take (including Stay). You lose if you collide with the PC, or if the PC reaches the objective.

## Features

- Wrapping grid
- 8-way movement
- Difficulty: PC moves randomly or tries to catch you
- Different themes that change the look and feel of the game

## Caviats

- Must run local server to play

## Run locally

The Express server owns the rules and stores games in SQLite (`server/data/games.db`). The Vite app proxies `/api` to that server.

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
