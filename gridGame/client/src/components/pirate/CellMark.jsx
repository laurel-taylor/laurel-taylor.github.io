import ShipIcon from './ShipIcon.jsx';

export default function CellMark({ kind }) {
  if (kind === 'empty') return null;
  if (kind === 'objective') return <span className="mark-x">X</span>;
  return <ShipIcon enemy={kind === 'pc'} />;
}
