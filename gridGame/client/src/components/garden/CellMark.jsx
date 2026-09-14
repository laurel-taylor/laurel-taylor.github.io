function BeeIcon() {
  return (
    <svg className="cell-icon" viewBox="0 0 32 32" aria-hidden="true">
      <ellipse cx="11" cy="12" rx="5" ry="3.5" fill="#f4f4f0" opacity="0.9" />
      <ellipse cx="21" cy="12" rx="5" ry="3.5" fill="#f4f4f0" opacity="0.9" />
      <ellipse cx="16" cy="18" rx="8" ry="6" fill="#f0c84a" />
      <rect x="12" y="13" width="2.2" height="10" fill="#2a2208" />
      <rect x="17.8" y="13" width="2.2" height="10" fill="#2a2208" />
      <circle cx="16" cy="13" r="2.4" fill="#2a2208" />
    </svg>
  );
}

function WaspIcon() {
  return (
    <svg className="cell-icon" viewBox="0 0 32 32" aria-hidden="true">
      <ellipse cx="10" cy="11" rx="4.5" ry="3" fill="#e8e8e0" opacity="0.85" />
      <ellipse cx="22" cy="11" rx="4.5" ry="3" fill="#e8e8e0" opacity="0.85" />
      <ellipse cx="16" cy="17" rx="6" ry="5" fill="#e07a28" />
      <polygon points="16,21 13,28 19,28" fill="#2a2208" />
      <rect x="13.5" y="13" width="1.8" height="8" fill="#2a2208" />
      <rect x="16.7" y="13" width="1.8" height="8" fill="#2a2208" />
      <circle cx="16" cy="12" r="2.2" fill="#2a2208" />
    </svg>
  );
}

function FlowerIcon() {
  return (
    <svg className="cell-icon" viewBox="0 0 32 32" aria-hidden="true">
      <circle cx="16" cy="9" r="4" fill="#f0a0c0" />
      <circle cx="23" cy="16" r="4" fill="#f0a0c0" />
      <circle cx="16" cy="23" r="4" fill="#f0a0c0" />
      <circle cx="9" cy="16" r="4" fill="#f0a0c0" />
      <circle cx="21" cy="11" r="4" fill="#e890b4" />
      <circle cx="21" cy="21" r="4" fill="#e890b4" />
      <circle cx="11" cy="21" r="4" fill="#e890b4" />
      <circle cx="11" cy="11" r="4" fill="#e890b4" />
      <circle cx="16" cy="16" r="4" fill="#f5d24a" />
    </svg>
  );
}

export default function CellMark({ kind }) {
  if (kind === 'player') return <BeeIcon />;
  if (kind === 'pc') return <WaspIcon />;
  if (kind === 'objective') return <FlowerIcon />;
  return null;
}
