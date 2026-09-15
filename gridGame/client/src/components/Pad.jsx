import './Pad.css';

const BUTTONS = [
  { direction: 'nw', label: 'NW', hint: 'Q' },
  { direction: 'n', label: 'N', hint: 'W / ↑' },
  { direction: 'ne', label: 'NE', hint: 'E' },
  { direction: 'w', label: 'W', hint: 'A / ←' },
  null,
  { direction: 'e', label: 'E', hint: 'D / →' },
  { direction: 'sw', label: 'SW', hint: 'Z' },
  { direction: 's', label: 'S', hint: 'S / ↓' },
  { direction: 'se', label: 'SE', hint: 'C' },
];

export default function Pad({ onMove, disabled }) {
  return (
    <div className="pad" role="group" aria-label="Movement pad">
      {BUTTONS.map((button) => {
        if (!button) {
          return <div key="spacer" className="pad-spacer" aria-hidden="true" />;
        }
        return (
          <button
            key={button.direction}
            type="button"
            onClick={() => onMove(button.direction)}
            disabled={disabled}
            title={button.hint}
          >
            <span>{button.label}</span>
            <small>{button.hint}</small>
          </button>
        );
      })}
    </div>
  );
}
