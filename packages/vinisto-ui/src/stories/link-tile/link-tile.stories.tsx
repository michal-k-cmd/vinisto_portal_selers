import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import LinkTile from '../../components/link-tile';

const meta = {
	title: 'LinkTile',
	component: LinkTile,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	args: {
		onClick: fn(),
	},
} satisfies Meta<typeof LinkTile>;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
	args: {
		img: {
			src: 'https://via.placeholder.com/64x80',
			alt: 'Sample alt',
		},
		title: 'Sample title',
	},
};

export default meta;
