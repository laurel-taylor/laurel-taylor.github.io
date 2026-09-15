export const GRID_SIZE = 10;
export const GAME_TIMEOUT_MS = 60_000;

export const DIRECTIONS = {
  n: { dx: 0, dy: -1 },
  ne: { dx: 1, dy: -1 },
  e: { dx: 1, dy: 0 },
  se: { dx: 1, dy: 1 },
  s: { dx: 0, dy: 1 },
  sw: { dx: -1, dy: 1 },
  w: { dx: -1, dy: 0 },
  nw: { dx: -1, dy: -1 },
};

export const PLAYER_DIRECTIONS = Object.keys(DIRECTIONS);
export const PC_DIRECTIONS = PLAYER_DIRECTIONS;

export function wrap(n) {
  return ((n % GRID_SIZE) + GRID_SIZE) % GRID_SIZE;
}

export function step(pos, direction) {
  const delta = DIRECTIONS[direction];
  if (!delta) return null;
  return { x: wrap(pos.x + delta.dx), y: wrap(pos.y + delta.dy) };
}

export function same(a, b) {
  return a.x === b.x && a.y === b.y;
}

export function shortestDelta(from, to) {
  let delta = to - from;
  const half = GRID_SIZE / 2;
  if (delta > half) delta -= GRID_SIZE;
  if (delta < -half) delta += GRID_SIZE;
  return delta;
}

export function directionToward(from, to) {
  const dx = Math.sign(shortestDelta(from.x, to.x));
  const dy = Math.sign(shortestDelta(from.y, to.y));
  return (
    PC_DIRECTIONS.find((dir) => {
      const stepDelta = DIRECTIONS[dir];
      return stepDelta.dx === dx && stepDelta.dy === dy;
    }) ?? PC_DIRECTIONS[Math.floor(Math.random() * PC_DIRECTIONS.length)]
  );
}

function pickPcDirection(game) {
  if (game.difficulty >= 1) {
    return directionToward(game.pc, game.player);
  }
  return PC_DIRECTIONS[Math.floor(Math.random() * PC_DIRECTIONS.length)];
}

export function randomCell() {
  return {
    x: Math.floor(Math.random() * GRID_SIZE),
    y: Math.floor(Math.random() * GRID_SIZE),
  };
}

export function spawnEntities() {
  const used = new Set();
  function unique() {
    let cell;
    do {
      cell = randomCell();
    } while (used.has(`${cell.x},${cell.y}`));
    used.add(`${cell.x},${cell.y}`);
    return cell;
  }
  return {
    player: unique(),
    pc: unique(),
    objective: unique(),
  };
}

export function startedAtMs(createdAt) {
  if (typeof createdAt === 'number') return createdAt;
  if (!createdAt) return Date.now();
  return Date.parse(String(createdAt).replace(' ', 'T') + 'Z');
}

export function applyTimeoutIfNeeded(game, now = Date.now()) {
  if (game.status !== 'in_progress') return game;
  if (now - game.startedAt < GAME_TIMEOUT_MS) return game;
  return { ...game, status: 'lost', reason: 'timeout' };
}

export function applyPlayerMove(game, direction) {
  if (game.status !== 'in_progress') {
    return { error: 'Game is over', status: 400 };
  }
  const player = step(game.player, direction);
  if (!player) {
    return { error: 'Invalid direction', status: 400 };
  }

  const next = {
    ...game,
    player,
    pc: game.pc,
    objective: game.objective,
  };

  if (same(player, game.pc)) {
    return { game: { ...next, status: 'lost', reason: 'player_hit_pc' } };
  }
  if (same(player, game.objective)) {
    return { game: { ...next, status: 'won', reason: 'player_hit_objective' } };
  }
  return { game: { ...next, reason: null } };
}

export function applyPcMove(game) {
  if (game.status !== 'in_progress') {
    return { error: 'Game is over', status: 400 };
  }

  const pcDir = pickPcDirection(game);
  const pc = step(game.pc, pcDir);
  const next = {
    ...game,
    player: game.player,
    pc,
    objective: game.objective,
  };

  if (same(pc, game.player)) {
    return { game: { ...next, status: 'lost', reason: 'pc_hit_player' } };
  }
  if (same(pc, game.objective)) {
    return { game: { ...next, status: 'lost', reason: 'pc_hit_objective' } };
  }
  return { game: { ...next, reason: null } };
}
