import './UnitToggle.css';

const UNITS = ['F', 'C'];

export default function UnitToggle({ unit, onUnitChange }) {
  return (
    <div className="unit-toggle" role="radiogroup" aria-label="Temperature unit">
      {UNITS.map((value) => (
        <label
          key={value}
          className={
            unit === value
              ? 'unit-toggle__option unit-toggle__option--active'
              : 'unit-toggle__option'
          }
        >
          <input
            className="unit-toggle__input"
            type="radio"
            name="temperature-unit"
            value={value}
            checked={unit === value}
            onChange={() => onUnitChange(value)}
          />
          °{value}
        </label>
      ))}
    </div>
  );
}
