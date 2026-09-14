import './Pad.css';

const BUTTONS = [
  { direction: 'nw', label: 'NW', hint: 'Q' },
  { direction: 'n', label: 'N', hint: 'W / ↑' },
  { direction: 'ne', label: 'NE', hint: 'E' },
  { direction: 'w', label: 'W', hint: 'A / ←' },
  { direction: 'stay', hint: 'Space' },
  { direction: 'e', label: 'E', hint: 'D / →' },
  { direction: 'sw', label: 'SW', hint: 'Z' },
  { direction: 's', label: 'S', hint: 'S / ↓' },
  { direction: 'se', label: 'SE', hint: 'C' },
];

export default function Pad({ onMove, disabled, stayLabel }) {
  return (
    <div className="pad" role="group" aria-label="Movement pad">
      {BUTTONS.map((button) => {
        const label = button.direction === 'stay' ? stayLabel : button.label;
        return (
          <button
            key={button.direction}
            type="button"
            className={button.direction === 'stay' ? 'pad-stay' : undefined}
            onClick={() => onMove(button.direction)}
            disabled={disabled}
            title={button.hint}
          >
            <span>{label}</span>
            <small>{button.hint}</small>
          </button>
        );
      })}
    </div>
  );
}
