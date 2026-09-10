import { displayTemp } from '../api/weather';
import './TempRangeBar.css';

const TEMP_COLOR_STOPS = [
  { temp: 0, color: '#c5e8f7' },
  { temp: 32, color: '#9fd4f2' },
  { temp: 50, color: '#7eb6ea' },
  { temp: 70, color: '#e8c4a0' },
  { temp: 85, color: '#e07a4a' },
  { temp: 100, color: '#c4332a' },
  { temp: 115, color: '#7a1414' },
];

function hexToRgb(hex) {
  const value = Number.parseInt(hex.slice(1), 16);
  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255,
  };
}

function rgbToHex({ r, g, b }) {
  return `#${[r, g, b]
    .map((channel) => Math.round(channel).toString(16).padStart(2, '0'))
    .join('')}`;
}

function tempColor(fahrenheit) {
  const first = TEMP_COLOR_STOPS[0];
  const last = TEMP_COLOR_STOPS[TEMP_COLOR_STOPS.length - 1];
  if (fahrenheit <= first.temp) return first.color;
  if (fahrenheit >= last.temp) return last.color;

  const endIndex = TEMP_COLOR_STOPS.findIndex((stop) => fahrenheit <= stop.temp);
  const from = TEMP_COLOR_STOPS[endIndex - 1];
  const to = TEMP_COLOR_STOPS[endIndex];
  const t = (fahrenheit - from.temp) / (to.temp - from.temp);
  const start = hexToRgb(from.color);
  const end = hexToRgb(to.color);

  return rgbToHex({
    r: start.r + (end.r - start.r) * t,
    g: start.g + (end.g - start.g) * t,
    b: start.b + (end.b - start.b) * t,
  });
}

function clampPercent(value) {
  return Math.min(100, Math.max(0, value));
}

function rangeStyle(low, high, minTemp, maxTemp) {
  const range = maxTemp - minTemp;
  const mid = (low + high) / 2;
  const background = `linear-gradient(90deg, ${tempColor(low)}, ${tempColor(mid)}, ${tempColor(high)})`;

  if (range <= 0) {
    return { left: '0%', width: '100%', background };
  }

  const start = clampPercent(((low - minTemp) / range) * 100);
  const end = clampPercent(((high - minTemp) / range) * 100);
  const width = Math.max(end - start, 2);

  return {
    left: `${start}%`,
    width: `${Math.min(width, 100 - start)}%`,
    background,
  };
}

function nowStyle(currentTemp, minTemp, maxTemp) {
  const range = maxTemp - minTemp;
  const percent =
    range <= 0 ? 50 : clampPercent(((currentTemp - minTemp) / range) * 100);

  return { left: `${percent}%` };
}

export default function TempRangeBar({
  low,
  high,
  minTemp,
  maxTemp,
  unit = 'F',
  currentTemp,
}) {
  const lowLabel = `${displayTemp(low, unit)}°`;
  const highLabel = `${displayTemp(high, unit)}°`;
  const currentLabel =
    currentTemp == null ? null : `${displayTemp(currentTemp, unit)}°`;

  return (
    <span
      className="temp-range"
      role="meter"
      aria-label="Temperature range"
      aria-valuemin={displayTemp(minTemp, unit)}
      aria-valuemax={displayTemp(maxTemp, unit)}
      aria-valuetext={
        currentLabel
          ? `${lowLabel} to ${highLabel}, currently ${currentLabel}`
          : `${lowLabel} to ${highLabel}`
      }
    >
      <span className="temp-range__low">{lowLabel}</span>
      <span className="temp-range__track" aria-hidden="true">
        <span
          className="temp-range__fill"
          style={rangeStyle(low, high, minTemp, maxTemp)}
        />
        {currentTemp != null && (
          <span
            className="temp-range__now"
            style={nowStyle(currentTemp, minTemp, maxTemp)}
          />
        )}
      </span>
      <span className="temp-range__high">{highLabel}</span>
    </span>
  );
}
