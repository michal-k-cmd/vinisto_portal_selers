import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import Button from '../../components/button';

const meta = {
	title: 'Button',
	component: Button,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	args: {
		onClick: fn(),
	},
} satisfies Meta<typeof Button>;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
	args: {
		children: 'hello world',
	},
};

export default meta;
