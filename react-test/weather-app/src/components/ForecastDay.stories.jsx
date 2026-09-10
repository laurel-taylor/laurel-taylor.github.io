import '../App.css';
import { WEATHER_BY_CODE, forecastTempScale, weatherInfo } from '../api/weather';
import ForecastDay from './ForecastDay';

const weatherCodes = Object.keys(WEATHER_BY_CODE).map(Number);

const weatherLabels = Object.fromEntries(
  Object.entries(WEATHER_BY_CODE).map(([code, { label, icon }]) => [
    code,
    `${icon} ${label}`,
  ]),
);

function dayFromArgs({ weatherCode, date, high, low, precipChance, currentTemp }) {
  const { label, icon } = weatherInfo(weatherCode);
  const isoDate =
    typeof date === 'number' ? new Date(date).toISOString().slice(0, 10) : date;

  return {
    date: isoDate,
    weatherCode,
    condition: label,
    icon,
    high,
    low,
    precipChance,
    currentTemp,
  };
}

const meta = {
  title: 'Components/ForecastDay',
  component: ForecastDay,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ul className="forecast-list">
        <Story />
      </ul>
    ),
  ],
  argTypes: {
    weatherCode: {
      name: 'Weather condition',
      control: { type: 'select' },
      options: weatherCodes,
      labels: weatherLabels,
    },
    date: { control: 'date' },
    high: { control: { type: 'number', min: -20, max: 130 } },
    low: { control: { type: 'number', min: -20, max: 130 } },
    minTemp: { control: { type: 'number', min: -20, max: 130 } },
    maxTemp: { control: { type: 'number', min: -20, max: 130 } },
    precipChance: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    currentTemp: { control: { type: 'number', min: -20, max: 130 } },
    isToday: { control: 'boolean' },
    unit: {
      name: 'Temperature unit',
      control: { type: 'radio' },
      options: ['F', 'C'],
    },
    day: { table: { disable: true } },
  },
  args: {
    weatherCode: 0,
    date: '2026-09-09',
    high: 98,
    low: 76,
    minTemp: 40,
    maxTemp: 110,
    precipChance: 5,
    currentTemp: 88,
    isToday: true,
    unit: 'F',
  },
  render: (args) => (
    <ForecastDay
      day={dayFromArgs(args)}
      unit={args.unit}
      minTemp={args.minTemp}
      maxTemp={args.maxTemp}
      isToday={args.isToday}
    />
  ),
};

export default meta;

export const Playground = {};

const SAMPLE_DAYS = [
  { date: '2026-09-09', weatherCode: 0, high: 98, low: 76, precipChance: 5, currentTemp: 88 },
  { date: '2026-09-10', weatherCode: 2, high: 96, low: 74, precipChance: 10 },
  { date: '2026-09-11', weatherCode: 3, high: 94, low: 73, precipChance: 15 },
  { date: '2026-09-12', weatherCode: 61, high: 88, low: 70, precipChance: 40 },
  { date: '2026-09-13', weatherCode: 63, high: 86, low: 68, precipChance: 70 },
  { date: '2026-09-16', weatherCode: 71, high: 55, low: 40, precipChance: 80 },
];

export const TenDayScale = {
  argTypes: {
    weatherCode: { table: { disable: true } },
    date: { table: { disable: true } },
    high: { table: { disable: true } },
    low: { table: { disable: true } },
    minTemp: { table: { disable: true } },
    maxTemp: { table: { disable: true } },
    precipChance: { table: { disable: true } },
    day: { table: { disable: true } },
  },
  render: ({ unit }) => {
    const days = SAMPLE_DAYS.map((day) => {
      const { label, icon } = weatherInfo(day.weatherCode);
      return { ...day, condition: label, icon };
    });
    const { minTemp, maxTemp } = forecastTempScale(days);

    return days.map((day, index) => (
      <ForecastDay
        key={day.date}
        day={day}
        unit={unit}
        minTemp={minTemp}
        maxTemp={maxTemp}
        isToday={index === 0}
      />
    ));
  },
};
