import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import SelectableOption from '../../../components/filters/components/selectable-option';

const meta = {
	title: 'Filters/Components/Selectable Option',
	component: SelectableOption,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	args: {
		onChange: fn(),
	},
} satisfies Meta<typeof SelectableOption>;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
	args: {
		name: 'Basic',
		checked: true,
		labelProps: {
			placeholder: '–',
			prefix: 'pre',
			suffix: 'suff',
		},
	},
};

export const NotSelected: Story = {
	args: {
		name: 'NotSelected',
		labelProps: {
			placeholder: '',
			value: 'Bourbon',
			prefix: '',
			suffix: '(42)',
		},
	},
};

export default meta;
