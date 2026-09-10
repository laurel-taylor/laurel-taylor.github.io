import PrecipBar from './PrecipBar';
import TempRangeBar from './TempRangeBar';
import './ForecastDay.css';

function formatDate(isoDate) {
  const date = new Date(`${isoDate}T12:00:00`);
  return date.toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}

export default function ForecastDay({
  day,
  unit = 'F',
  minTemp = day.low,
  maxTemp = day.high,
  isToday = false,
}) {
  return (
    <li className="forecast-day">
      <span className="forecast-day__date">
        {isToday ? 'Today' : formatDate(day.date)}
      </span>
      <span className="forecast-day__condition">
        <span className="forecast-day__icon" aria-hidden="true">
          {day.icon}
        </span>
        {day.condition}
      </span>
      <TempRangeBar
        low={day.low}
        high={day.high}
        minTemp={minTemp}
        maxTemp={maxTemp}
        unit={unit}
        currentTemp={day.currentTemp}
      />
      <PrecipBar chance={day.precipChance} />
    </li>
  );
}
