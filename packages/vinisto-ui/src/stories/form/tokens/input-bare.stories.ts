import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import InputBare from '../../../components/form/tokens/input-bare';

const meta: Meta = {
	title: 'Form/Tokens/Bare input',
	component: InputBare,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	args: {
		onChange: fn(),
	},
};

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
	args: {
		placeholder: 'hello world',
	},
};

export default meta;
