const ZIP_PATTERN = /^\d{5}$/;

export const WEATHER_BY_CODE = {
  0: { label: 'Clear', icon: '☀️' },
  1: { label: 'Mostly clear', icon: '🌤' },
  2: { label: 'Partly cloudy', icon: '⛅️' },
  3: { label: 'Overcast', icon: '☁️' },
  45: { label: 'Fog', icon: '🌫' },
  48: { label: 'Icy fog', icon: '🌫' },
  51: { label: 'Light drizzle', icon: '🌦' },
  53: { label: 'Drizzle', icon: '🌦' },
  55: { label: 'Heavy drizzle', icon: '🌧' },
  56: { label: 'Freezing drizzle', icon: '🌧' },
  57: { label: 'Freezing drizzle', icon: '🌧' },
  61: { label: 'Light rain', icon: '🌧' },
  63: { label: 'Rain', icon: '🌧' },
  65: { label: 'Heavy rain', icon: '⛈️' },
  66: { label: 'Freezing rain', icon: '🌧' },
  67: { label: 'Freezing rain', icon: '🌧' },
  71: { label: 'Light snow', icon: '🌨' },
  73: { label: 'Snow', icon: '❄️' },
  75: { label: 'Heavy snow', icon: '❄️' },
  77: { label: 'Snow grains', icon: '🌨' },
  80: { label: 'Light showers', icon: '🌦' },
  81: { label: 'Showers', icon: '🌧' },
  82: { label: 'Heavy showers', icon: '⛈️' },
  85: { label: 'Snow showers', icon: '🌨' },
  86: { label: 'Heavy snow showers', icon: '❄️' },
  95: { label: 'Thunderstorm', icon: '⛈️' },
  96: { label: 'Thunderstorm', icon: '⛈️' },
  99: { label: 'Thunderstorm', icon: '⛈️' },
};

const UNKNOWN_WEATHER = { label: 'Unknown', icon: '❔' };

export function weatherInfo(code) {
  return WEATHER_BY_CODE[code] ?? UNKNOWN_WEATHER;
}

export function weatherLabel(code) {
  return weatherInfo(code).label;
}

export function weatherIcon(code) {
  return weatherInfo(code).icon;
}

export function isValidZip(zip) {
  return ZIP_PATTERN.test(zip);
}

export function displayTemp(fahrenheit, unit = 'F') {
  if (unit === 'C') {
    return Math.round((fahrenheit - 32) * (5 / 9));
  }
  return fahrenheit;
}

export function forecastTempScale(days) {
  if (!days.length) {
    return { minTemp: 0, maxTemp: 100 };
  }

  return {
    minTemp: Math.min(...days.map((day) => day.low)),
    maxTemp: Math.max(...days.map((day) => day.high)),
  };
}

export async function getLocation(zip) {
  if (!isValidZip(zip)) {
    throw new Error('Enter a valid 5-digit US ZIP code.');
  }

  const response = await fetch(`https://api.zippopotam.us/us/${zip}`);
  if (!response.ok) {
    throw new Error('ZIP code not found. Try another US ZIP.');
  }

  const data = await response.json();
  const place = data.places?.[0];
  if (!place) {
    throw new Error('ZIP code not found. Try another US ZIP.');
  }

  return {
    zip: data['post code'],
    placeName: place['place name'],
    state: place['state abbreviation'],
    latitude: Number(place.latitude),
    longitude: Number(place.longitude),
  };
}

export async function getForecast(latitude, longitude) {
  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    daily: [
      'weather_code',
      'temperature_2m_max',
      'temperature_2m_min',
      'precipitation_probability_max',
    ].join(','),
    current: 'temperature_2m',
    forecast_days: '10',
    timezone: 'auto',
    temperature_unit: 'fahrenheit',
  });

  const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`);
  if (!response.ok) {
    throw new Error('Could not load forecast. Please try again.');
  }

  const data = await response.json();
  const { daily, current } = data;
  if (!daily?.time?.length) {
    throw new Error('No forecast data available.');
  }

  const currentTemp =
    current?.temperature_2m == null ? null : Math.round(current.temperature_2m);
  const currentDate = current?.time?.slice(0, 10) ?? null;

  return daily.time.map((date, index) => {
    const weatherCode = daily.weather_code[index];
    const { label, icon } = weatherInfo(weatherCode);
    return {
      date,
      weatherCode,
      condition: label,
      icon,
      high: Math.round(daily.temperature_2m_max[index]),
      low: Math.round(daily.temperature_2m_min[index]),
      precipChance: daily.precipitation_probability_max[index] ?? 0,
      currentTemp: date === currentDate ? currentTemp : null,
    };
  });
}

export async function getWeatherForZip(zip) {
  const location = await getLocation(zip);
  const days = await getForecast(location.latitude, location.longitude);
  return { location, days };
}
