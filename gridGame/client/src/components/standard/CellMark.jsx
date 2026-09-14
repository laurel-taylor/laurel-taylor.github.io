export default function CellMark({ kind }) {
  if (kind === 'player') return <span className="swatch swatch-player" />;
  if (kind === 'pc') return <span className="swatch swatch-pc" />;
  if (kind === 'objective') return <span className="swatch swatch-objective" />;
  return null;
}
