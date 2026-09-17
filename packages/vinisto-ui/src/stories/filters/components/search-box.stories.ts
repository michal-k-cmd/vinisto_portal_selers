import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import SearchBox from '../../../components/filters/components/search-box';

const meta = {
	title: 'Filters/Components/Search Box',
	component: SearchBox,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	args: {
		onSearchChange: fn(),
	},
} satisfies Meta<typeof SearchBox>;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
	args: {
		placeholder: 'Search...',
		value: '',
		name: 'basic',
	},
};

export default meta;
