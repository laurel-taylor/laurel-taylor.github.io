const GAME_ID_KEY = 'gridChase.gameId';

export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

export function getStoredGameId() {
  return sessionStorage.getItem(GAME_ID_KEY);
}

export function storeGameId(id) {
  sessionStorage.setItem(GAME_ID_KEY, id);
}

export function clearStoredGameId() {
  sessionStorage.removeItem(GAME_ID_KEY);
}

async function request(url, options) {
  let response;
  try {
    response = await fetch(url, options);
  } catch {
    throw new ApiError('Network error', 0);
  }

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new ApiError(data.error || `Request failed (${response.status})`, response.status);
  }
  return data;
}

export async function createGame(difficulty = 0) {
  const game = await request('/api/games', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ difficulty }),
  });
  storeGameId(game.id);
  return game;
}

export async function fetchGame(id) {
  return request(`/api/games/${id}`);
}

export async function setGameDifficulty(id, difficulty) {
  return request(`/api/games/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ difficulty }),
  });
}

export async function moveGame(id, direction) {
  return request(`/api/games/${id}/move`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ direction }),
  });
}
