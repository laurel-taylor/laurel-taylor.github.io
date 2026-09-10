import { useEffect } from 'react';
import App from './App';
import { TIME_OF_DAY } from './timeOfDay';

function FetchRestore({ originalFetch, children }) {
  useEffect(() => {
    return () => {
      globalThis.fetch = originalFetch;
    };
  }, [originalFetch]);

  return children;
}

function jsonResponse(data, status = 200) {
  return Promise.resolve(
    new Response(JSON.stringify(data), {
      status,
      headers: { 'Content-Type': 'application/json' },
    }),
  );
}

const MOCK_LOCATION = {
  'post code': '85204',
  places: [
    {
      'place name': 'Mesa',
      'state abbreviation': 'AZ',
      latitude: '33.3992',
      longitude: '-111.7896',
    },
  ],
};

const MOCK_FORECAST = {
  daily: {
    time: [
      '2026-09-09',
      '2026-09-10',
      '2026-09-11',
      '2026-09-12',
      '2026-09-13',
      '2026-09-14',
      '2026-09-15',
      '2026-09-16',
      '2026-09-17',
      '2026-09-18',
    ],
    weather_code: [0, 2, 3, 61, 63, 80, 95, 71, 1, 0],
    temperature_2m_max: [98, 96, 94, 88, 86, 90, 92, 55, 97, 99],
    temperature_2m_min: [76, 74, 73, 70, 68, 72, 74, 40, 75, 77],
    precipitation_probability_max: [5, 10, 15, 40, 70, 55, 65, 80, 8, 3],
  },
  current: {
    time: '2026-09-09T12:00',
    temperature_2m: 88,
  },
};

function stubFetch(handler) {
  return (Story) => {
    const originalFetch = globalThis.fetch;
    globalThis.fetch = handler;

    return (
      <FetchRestore originalFetch={originalFetch}>
        <Story />
      </FetchRestore>
    );
  };
}

const meta = {
  title: 'App',
  component: App,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    timeOfDay: {
      control: 'radio',
      options: TIME_OF_DAY,
    },
  },
  decorators: [
    stubFetch((url) => {
      const href = String(url);

      if (href.includes('zippopotam.us')) {
        return jsonResponse(MOCK_LOCATION);
      }

      if (href.includes('open-meteo.com')) {
        return jsonResponse(MOCK_FORECAST);
      }

      return Promise.reject(new TypeError(`Unexpected fetch: ${href}`));
    }),
  ],
};

export default meta;

export const Default = {};

export const Morning = {
  args: {
    timeOfDay: 'morning',
  },
};

export const Daytime = {
  args: {
    timeOfDay: 'daytime',
  },
};

export const Evening = {
  args: {
    timeOfDay: 'evening',
  },
};

export const Night = {
  args: {
    timeOfDay: 'night',
  },
};

export const Loading = {
  decorators: [
    stubFetch(() => new Promise(() => {})),
  ],
};

export const Error = {
  decorators: [
    stubFetch(() => Promise.reject(new TypeError('Failed to fetch'))),
  ],
};
