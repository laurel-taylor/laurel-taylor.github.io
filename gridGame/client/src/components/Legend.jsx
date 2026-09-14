import { CELL_MARKS } from './themeMarks.js';
import './Legend.css';

const ENTRIES = [
  { kind: 'player', labelKey: 'you' },
  { kind: 'pc', labelKey: 'pc' },
  { kind: 'objective', labelKey: 'objective' },
];

export default function Legend({ theme }) {
  const Mark = CELL_MARKS[theme.id] ?? CELL_MARKS.standard;
  const copy = theme.copy;

  return (
    <ul className="legend">
      {ENTRIES.map(({ kind, labelKey }) => (
        <li key={kind}>
          <span className="legend-icon">
            <Mark kind={kind} />
          </span>
          {copy[labelKey]}
        </li>
      ))}
    </ul>
  );
}
