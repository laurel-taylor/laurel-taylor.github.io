import { useEffect, useState } from 'react';
import { forecastTempScale, getWeatherForZip, isValidZip } from './api/weather';
import ForecastDay from './components/ForecastDay';
import UnitToggle from './components/UnitToggle';
import ZipForm from './components/ZipForm';
import { timeOfDayFromDate } from './timeOfDay';
import './App.css';

const DEFAULT_ZIP = '85204';

function App({ timeOfDay }) {
  const [zipInput, setZipInput] = useState(DEFAULT_ZIP);
  const [activeZip, setActiveZip] = useState(DEFAULT_ZIP);
  const [location, setLocation] = useState(null);
  const [days, setDays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [unit, setUnit] = useState('F');
  const period = timeOfDay ?? timeOfDayFromDate();

  useEffect(() => {
    document.documentElement.dataset.timeOfDay = period;
    return () => {
      delete document.documentElement.dataset.timeOfDay;
    };
  }, [period]);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);

      try {
        const result = await getWeatherForZip(activeZip);
        if (cancelled) return;
        setLocation(result.location);
        setDays(result.days);
      } catch (err) {
        if (cancelled) return;
        setLocation(null);
        setDays([]);
        setError(err.message || 'Something went wrong.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [activeZip]);

  function handleSubmit(event) {
    event.preventDefault();
    if (!isValidZip(zipInput)) {
      setError('Enter a valid 5-digit US ZIP code.');
      return;
    }
    setActiveZip(zipInput);
  }

  const placeLabel = location
    ? `${location.placeName}, ${location.state} ${location.zip}`
    : null;
  const { minTemp, maxTemp } = forecastTempScale(days);

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">Weather</h1>
        <p className="app__subtitle">10-day forecast by US ZIP code</p>
      </header>

      <ZipForm
        zip={zipInput}
        onZipChange={setZipInput}
        onSubmit={handleSubmit}
        disabled={loading}
      />

      {loading && <p className="app__status">Loading forecast...</p>}
      {error && !loading && <p className="app__error" role="alert">{error}</p>}

      {!loading && !error && placeLabel && (
        <>
          <div className="app__place-row">
            <h2 className="app__place">{placeLabel}</h2>
            <UnitToggle unit={unit} onUnitChange={setUnit} />
          </div>
          <ul className="forecast-list">
            {days.map((day, index) => (
              <ForecastDay
                key={day.date}
                day={day}
                unit={unit}
                minTemp={minTemp}
                maxTemp={maxTemp}
                isToday={index === 0}
              />
            ))}
          </ul>
        </>
      )}

      <a
        className="app__about"
        href="https://github.com/laurel-taylor/laurel-taylor.github.io/blob/master/react-test/weather-app/README.md"
        target="_blank"
        rel="noopener noreferrer"
      >
        About
      </a>
    </div>
  );
}

export default App;
