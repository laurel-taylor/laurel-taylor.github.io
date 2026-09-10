import { fn } from 'storybook/test';
import UnitToggle from './UnitToggle';

const meta = {
  title: 'Components/UnitToggle',
  component: UnitToggle,
  tags: ['autodocs'],
  args: {
    unit: 'F',
    onUnitChange: fn(),
  },
};

export default meta;

export const Fahrenheit = {};

export const Celsius = {
  args: {
    unit: 'C',
  },
};
