import TempRangeBar from './TempRangeBar';

const meta = {
  title: 'Components/TempRangeBar',
  component: TempRangeBar,
  tags: ['autodocs'],
  argTypes: {
    low: { control: { type: 'number', min: -20, max: 130 } },
    high: { control: { type: 'number', min: -20, max: 130 } },
    minTemp: { control: { type: 'number', min: -20, max: 130 } },
    maxTemp: { control: { type: 'number', min: -20, max: 130 } },
    currentTemp: { control: { type: 'number', min: -20, max: 130 } },
    unit: {
      control: { type: 'radio' },
      options: ['F', 'C'],
    },
  },
  args: {
    low: 76,
    high: 98,
    minTemp: 40,
    maxTemp: 110,
    unit: 'F',
    currentTemp: undefined,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '22rem' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

export const Playground = {};

export const CoolDay = {
  args: {
    low: 32,
    high: 48,
    minTemp: 32,
  },
};

export const HotDay = {
  args: {
    low: 92,
    high: 110,
  },
};

export const WithCurrentTemp = {
  args: {
    currentTemp: 88,
  },
};
