import { fn } from 'storybook/test';
import ZipForm from './ZipForm';

const meta = {
  title: 'Components/ZipForm',
  component: ZipForm,
  tags: ['autodocs'],
  args: {
    zip: '85204',
    onZipChange: fn(),
    onSubmit: fn((event) => event.preventDefault()),
    disabled: false,
  },
};

export default meta;

export const Default = {};

export const Disabled = {
  args: {
    disabled: true,
  },
};
