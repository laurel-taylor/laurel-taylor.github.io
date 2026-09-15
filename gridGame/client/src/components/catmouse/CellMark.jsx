export function CatIcon() {
  return (
    <svg className="cell-icon" viewBox="0 0 32 32" aria-hidden="true">
      <polygon points="8,14 11,3 16,12" fill="#d98a3a" />
      <polygon points="16,12 21,3 24,14" fill="#d98a3a" />
      <circle cx="16" cy="19" r="9" fill="#e29a4a" />
      <circle cx="13" cy="18" r="1.3" fill="#2a1a10" />
      <circle cx="19" cy="18" r="1.3" fill="#2a1a10" />
      <polygon points="16,20 14.5,22.5 17.5,22.5" fill="#c45c3a" />
    </svg>
  );
}

function MouseIcon() {
  return (
    <svg className="cell-icon" viewBox="0 0 32 32" aria-hidden="true">
      <path d="M6 22 Q4 12 12 14" fill="none" stroke="#8a6a5a" strokeWidth="1.6" />
      <ellipse cx="18" cy="19" rx="8" ry="7" fill="#c4b4a4" />
      <circle cx="13" cy="12" r="3.2" fill="#b8a494" />
      <circle cx="22" cy="12" r="3.2" fill="#b8a494" />
      <circle cx="16" cy="18" r="1.1" fill="#2a1a10" />
      <circle cx="21" cy="18" r="1.1" fill="#2a1a10" />
    </svg>
  );
}

function CheeseIcon() {
  return (
    <svg className="cell-icon" viewBox="0 0 32 32" aria-hidden="true">
      <polygon points="6,24 16,6 26,24" fill="#f0c84a" stroke="#c9a028" strokeWidth="1" />
      <circle cx="14" cy="16" r="1.6" fill="#e0a830" />
      <circle cx="19" cy="20" r="2" fill="#e0a830" />
      <circle cx="16" cy="21" r="1.2" fill="#e0a830" />
    </svg>
  );
}

export default function CellMark({ kind }) {
  if (kind === 'player') return <MouseIcon />;
  if (kind === 'pc') return <CatIcon />;
  if (kind === 'objective') return <CheeseIcon />;
  return null;
}
