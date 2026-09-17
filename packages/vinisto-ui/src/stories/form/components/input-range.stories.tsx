import { Meta, StoryObj } from '@storybook/react';

import InputRange from '../../../components/form/components/range';

const meta = {
	title: 'Form/Components/Range Input',
	component: InputRange,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
	},
	decorators: [(Story) => <div style={{ width: '300px' }}>{Story()}</div>],
} satisfies Meta<typeof InputRange>;

export default meta;

type Story = StoryObj<typeof InputRange>;

export const Default: Story = {
	args: {
		min: 0,
		max: 120,
		value: [50, 100],
		range: true,
	},
};
