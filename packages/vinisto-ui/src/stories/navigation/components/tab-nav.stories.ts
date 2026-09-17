import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import TabNav from '../../../components/navigation/components/tab-nav-item-list';

const meta: Meta = {
	title: 'Navigation/Components/Tab nav',
	component: TabNav,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	args: {
		onClick: fn(),
	},
} satisfies Meta<typeof TabNav>;

type Story = StoryObj<typeof meta>;

const tabs = [
	{ id: 'tab1', label: 'Tab 1', as: 'button', onClick: fn() },
	{
		id: 'tab2',
		label: 'Tab 2',
		as: 'button',
		isActive: true,
	},
	{ id: 'tab3', label: 'Tab 3', as: 'button', onClick: fn() },
];

export const Basic: Story = {
	args: {
		tabs: tabs,
		activeTab: tabs[1],
	},
};
export default meta;
