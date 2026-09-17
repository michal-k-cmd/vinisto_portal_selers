import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import CheckboxBare from '../../../components/form/tokens/checkbox-bare';

const meta: Meta = {
	title: 'Form/Tokens/Bare Checkbox',
	component: CheckboxBare,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	args: {
		onChange: fn(),
	},
} satisfies Meta<typeof CheckboxBare>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		checked: true,
	},
};

export default meta;
