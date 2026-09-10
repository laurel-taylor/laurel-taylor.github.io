import './PrecipBar.css';

export default function PrecipBar({ chance }) {
  return (
    <span
      className="precip-bar"
      role="meter"
      aria-label="Chance of rain"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={chance}
      aria-valuetext={`${chance}%`}
    >
      <span className="precip-bar__track" aria-hidden="true">
        <span
          className="precip-bar__fill"
          style={{ '--precip': `${chance}%` }}
        />
      </span>
    </span>
  );
}
