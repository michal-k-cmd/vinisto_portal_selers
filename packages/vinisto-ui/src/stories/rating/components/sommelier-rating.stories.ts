import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import SommelierRating from '../../../components/ratings/components/sommelier-rating';

const meta = {
	title: 'Rating/Components/Sommelier rating',
	component: SommelierRating,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	args: {
		onClick: fn(),
	},
} satisfies Meta<typeof SommelierRating>;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
	args: {
		label: 'hodnocení sommeliéra:',
		rating: 87,
	},
};

export default meta;
