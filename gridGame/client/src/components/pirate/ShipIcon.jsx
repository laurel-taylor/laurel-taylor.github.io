export default function ShipIcon({ enemy }) {
  const hull = enemy ? '#5c1a1a' : '#1b3a4d';
  const sail = enemy ? '#2b0f0f' : '#f4efe4';
  const trim = enemy ? '#c45c3a' : '#d9c48a';
  return (
    <svg className="cell-icon" viewBox="0 0 32 32" aria-hidden="true">
      <rect x="15" y="6" width="2" height="14" fill={trim} />
      <polygon points="17,7 17,18 26,16" fill={sail} />
      <polygon points="15,8 15,16 8,15" fill={sail} opacity="0.85" />
      <path d="M6 22 L10 26 H22 L26 22 Z" fill={hull} />
      <path d="M8 22 H24" stroke={trim} strokeWidth="1.5" />
    </svg>
  );
}
