import { Meta, StoryObj } from '@storybook/react';

import InputRangeWithExternamControl from '../../../components/form/components/range-with-external-contol';

const meta = {
	title: 'Form/Components/Range Input (external control)',
	component: InputRangeWithExternamControl,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
	},
	decorators: [
		(Story) => (
			<div style={{ width: '300px' }}>
				<Story />
			</div>
		),
	],
} satisfies Meta<typeof InputRangeWithExternamControl>;

export default meta;

type Story = StoryObj<typeof InputRangeWithExternamControl>;

export const Default: Story = {
	args: {
		min: 0,
		max: 120,
		value: [50, 100],
		suffix: ' €',
		step: 10,
	},
};

export const Loading: Story = {
	args: {
		min: 0,
		max: 1,
		isLoading: true,
	},
};
