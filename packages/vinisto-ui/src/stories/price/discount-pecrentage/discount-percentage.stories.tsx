import type { Meta, StoryObj } from '@storybook/react';

import DiscountPercentage from '../../../components/price/components/discount-percentage';

const meta = {
	title: 'Price/Components/Discount Percentage',
	component: DiscountPercentage,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
	},
} satisfies Meta<typeof DiscountPercentage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
	args: {
		discountedFromPriceVat: 99,
		priceWithVat: 100,
	},
};

export const Padded: Story = {
	args: {
		discountedFromPriceVat: 99,
		priceWithVat: 100,
		options: {
			padTargetLength: 3,
		},
	},
};

export const PaddedWithSpace: Story = {
	args: {
		discountedFromPriceVat: 99,
		priceWithVat: 100,
		options: {
			padTargetLength: 3,
			padString: ' ',
		},
	},
};
