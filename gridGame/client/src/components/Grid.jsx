import { CELL_MARKS } from './themeMarks.js';
import './Grid.css';

function occupant(game, x, y) {
  if (game.player.x === x && game.player.y === y) return 'player';
  if (game.pc.x === x && game.pc.y === y) return 'pc';
  if (game.objective.x === x && game.objective.y === y) return 'objective';
  return 'empty';
}

export default function Grid({ game, themeId }) {
  const size = game.gridSize;
  const Mark = CELL_MARKS[themeId];
  const marked = themeId !== 'standard' && Boolean(Mark);
  const cells = [];
  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const kind = occupant(game, x, y);
      const alt = (x + y) % 2 === 1 ? ' cell-alt' : '';
      cells.push(
        <div
          key={`${x},${y}`}
          className={`cell cell-${kind}${alt}`}
          title={`${kind} (${x}, ${y})`}
          aria-label={`${kind} at ${x}, ${y}`}
        >
          {marked && kind !== 'empty' ? <Mark kind={kind} /> : null}
        </div>,
      );
    }
  }

  return (
    <div
      className={marked ? 'board board-marked' : 'board'}
      style={{
        gridTemplateColumns: `repeat(${size}, 1fr)`,
        gridTemplateRows: `repeat(${size}, 1fr)`,
      }}
      role="grid"
      aria-label={`${size} by ${size} game board`}
    >
      {cells}
    </div>
  );
}
