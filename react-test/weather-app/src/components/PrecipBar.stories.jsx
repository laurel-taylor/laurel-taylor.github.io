import PrecipBar from './PrecipBar';

const meta = {
  title: 'Components/PrecipBar',
  component: PrecipBar,
  tags: ['autodocs'],
  argTypes: {
    chance: { control: { type: 'range', min: 0, max: 100, step: 1 } },
  },
  args: {
    chance: 40,
  },
};

export default meta;

export const Playground = {};

export const Dry = {
  args: { chance: 0 },
};

export const Likely = {
  args: { chance: 70 },
};

export const Certain = {
  args: { chance: 100 },
};
