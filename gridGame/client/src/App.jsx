import { useCallback, useEffect, useState } from 'react';
import {
  clearStoredGameId,
  createGame,
  fetchGame,
  getStoredGameId,
  moveGame,
  setGameDifficulty,
} from './api.js';
import Grid from './components/Grid.jsx';
import Legend from './components/Legend.jsx';
import Pad from './components/Pad.jsx';
import { getStoredThemeId, messageFor, storeThemeId, THEMES } from './themes.js';
import './App.css';

const ABOUT_URL =
  'https://github.com/laurel-taylor/laurel-taylor.github.io/blob/master/gridGame/README.md';

const SERVER_DOWN_MESSAGE =
  'The game server is not running. Start it locally to play (see About / README).';

function errorMessage(err) {
  if (err?.status === 0 || err?.status >= 500) {
    return SERVER_DOWN_MESSAGE;
  }
  return err?.message || 'Something went wrong.';
}

const KEY_TO_DIRECTION = {
  ArrowUp: 'n',
  w: 'n',
  W: 'n',
  ArrowDown: 's',
  s: 's',
  S: 's',
  ArrowLeft: 'w',
  a: 'w',
  A: 'w',
  ArrowRight: 'e',
  d: 'e',
  D: 'e',
  q: 'nw',
  Q: 'nw',
  e: 'ne',
  E: 'ne',
  z: 'sw',
  Z: 'sw',
  c: 'se',
  C: 'se',
  ' ': 'stay',
};

export default function App() {
  const [game, setGame] = useState(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [themeId, setThemeId] = useState(getStoredThemeId);
  const [hard, setHard] = useState(false);
  const theme = THEMES[themeId] ?? THEMES.standard;

  const difficulty = hard ? 1 : 0;

  const startNewGame = useCallback(async () => {
    setBusy(true);
    setError('');
    try {
      const next = await createGame(difficulty);
      setGame(next);
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setBusy(false);
    }
  }, [difficulty]);

  const sendMove = useCallback(
    async (direction) => {
      if (!game || game.status !== 'in_progress' || busy) return;
      setBusy(true);
      setError('');
      try {
        const next = await moveGame(game.id, direction);
        setGame(next);
      } catch (err) {
        setError(errorMessage(err));
      } finally {
        setBusy(false);
      }
    },
    [busy, game],
  );

  const toggleHard = useCallback(
    async (checked) => {
      setHard(checked);
      if (!game || game.status !== 'in_progress') return;
      try {
        const next = await setGameDifficulty(game.id, checked ? 1 : 0);
        setGame(next);
      } catch (err) {
        setError(errorMessage(err));
        setHard(!checked);
      }
    },
    [game],
  );

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setBusy(true);
      try {
        const storedId = getStoredGameId();
        if (storedId) {
          try {
            const existing = await fetchGame(storedId);
            if (!cancelled) setGame(existing);
            if (!cancelled) setHard(existing.difficulty >= 1);
            return;
          } catch {
            clearStoredGameId();
          }
        }
        const next = await createGame(difficulty);
        if (!cancelled) setGame(next);
      } catch (err) {
        if (!cancelled) setError(errorMessage(err));
      } finally {
        if (!cancelled) setBusy(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === 'Enter') {
        if (busy) return;
        if (event.target.closest('select, input, textarea, button')) return;
        event.preventDefault();
        startNewGame();
        return;
      }
      const direction = KEY_TO_DIRECTION[event.key];
      if (!direction) return;
      event.preventDefault();
      sendMove(direction);
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [busy, sendMove, startNewGame]);

  useEffect(() => {
    storeThemeId(theme.id);
    document.title = theme.title;
  }, [theme.id]);

  const ended = game && game.status !== 'in_progress';
  const copy = theme.copy;

  return (
    <main className="app">
      <header className="header">
        <div>
          <h1>{theme.title}</h1>
          <p>{game ? messageFor(game, theme) : copy.starting}</p>
          <a
            className="about-link"
            href={ABOUT_URL}
            target="_blank"
            rel="noreferrer"
          >
            About
          </a>
        </div>
        <div className="header-actions">
          <div className="theme-switch">
            <label className="hard-toggle">
              <input
                type="checkbox"
                checked={hard}
                onChange={(event) => toggleHard(event.target.checked)}
              />
              Chase mode
            </label>
            <select
              id="theme-select"
              value={theme.id}
              onChange={(event) => setThemeId(event.target.value)}
            >
              {Object.values(THEMES).map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <button type="button" onClick={startNewGame} disabled={busy}>
            {copy.newGame}
          </button>
        </div>
      </header>

      {error ? <p className="error">{error}</p> : null}

      {game ? (
        <section className="play">
          <div className="board-wrap">
            <Grid game={game} themeId={theme.id} />
            {ended ? (
              <div className="board-overlay" role="status">
                <strong>{game.status === 'won' ? copy.youWin : copy.youLose}</strong>
                <p>{messageFor(game, theme)}</p>
                <button type="button" onClick={startNewGame} disabled={busy}>
                  {copy.newGame}
                </button>
              </div>
            ) : null}
          </div>
          <aside className="sidebar">
            <Legend theme={theme} />
            <Pad onMove={sendMove} disabled={busy || ended} stayLabel={copy.stay} />
          </aside>
        </section>
      ) : null}
    </main>
  );
}
