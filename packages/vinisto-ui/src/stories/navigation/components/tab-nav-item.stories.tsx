import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import TabNavItem from '../../../components/navigation/components/tab-nav-item';

const meta: Meta = {
	title: 'Navigation/Components/Tab nav item',
	component: TabNavItem,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	args: {
		// onClick: fn(),
	},
} satisfies Meta<typeof TabNavItem>;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
	args: {
		as: 'div',
		children: 'Tab 1',
	},
};

export const AsButton: Story = {
	args: {
		as: 'button',
		children: <span>Click me</span>,
		onClick: fn(),
	},
};

export const AsAnchor: Story = {
	args: {
		as: 'a',
		href: '#',
		children: 'Tab 1',
	},
};

export default meta;
