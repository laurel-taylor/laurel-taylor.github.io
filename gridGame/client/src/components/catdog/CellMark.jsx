import { CatIcon } from '../catmouse/CellMark.jsx';

function DogIcon() {
  return (
    <svg className="cell-icon" viewBox="0 0 32 32" aria-hidden="true">
      <path d="M9 11 Q5 12 4 21 Q7 19 10 15 Z" fill="#6b4423" />
      <path d="M23 11 Q27 12 28 21 Q25 19 22 15 Z" fill="#6b4423" />
      <circle cx="16" cy="15" r="7.5" fill="#c4a06a" />
      <ellipse cx="16" cy="20" rx="5" ry="4" fill="#e0c090" />
      <ellipse cx="16" cy="18.2" rx="2" ry="1.4" fill="#2a1a10" />
      <circle cx="12.5" cy="13.5" r="1.2" fill="#2a1a10" />
      <circle cx="19.5" cy="13.5" r="1.2" fill="#2a1a10" />
      <ellipse cx="16" cy="24" rx="1.6" ry="2.2" fill="#e07070" />
    </svg>
  );
}

function FishIcon() {
  return (
    <svg className="cell-icon" viewBox="0 0 32 32" aria-hidden="true">
      <ellipse cx="15" cy="16" rx="9" ry="6" fill="#4a9fd4" />
      <polygon points="24,16 30,10 30,22" fill="#3a7fb0" />
      <polygon points="12,10 15,6 18,10" fill="#5ab0e0" />
      <circle cx="11" cy="15" r="1.5" fill="#1a3040" />
      <circle cx="11.4" cy="14.6" r="0.5" fill="#e8f4fc" />
    </svg>
  );
}

export default function CellMark({ kind }) {
  if (kind === 'player') return <CatIcon />;
  if (kind === 'pc') return <DogIcon />;
  if (kind === 'objective') return <FishIcon />;
  return null;
}
