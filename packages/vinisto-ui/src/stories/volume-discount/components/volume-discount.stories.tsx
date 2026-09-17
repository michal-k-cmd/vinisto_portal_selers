import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { VolumeDiscount } from '../../../..';
import Button, {
	buttonSizes,
	buttonVariants,
} from '../../../components/button';

const list = (
	<VolumeDiscount.List>
		{Array.from({ length: 3 }).map((_, i) => (
			<VolumeDiscount.ListItem
				key={i}
				text={
					<span>
						<VolumeDiscount.Emphasized>6 ks</VolumeDiscount.Emphasized> za{' '}
						<VolumeDiscount.DoubleEmphasized>
							1 000 Kč
						</VolumeDiscount.DoubleEmphasized>
						. Celkem ušetříte{' '}
						<VolumeDiscount.Emphasized>200 Kč</VolumeDiscount.Emphasized>.
					</span>
				}
				cta={
					<Button
						variant={buttonVariants.CTA}
						size={buttonSizes.S}
					>
						Do košíku
					</Button>
				}
			/>
		))}
	</VolumeDiscount.List>
);

const meta = {
	title: 'Volume disount/Components/Volume Discount',
	component: VolumeDiscount.Container,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	args: {
		onClick: fn(),
	},
} satisfies Meta<typeof VolumeDiscount.Container>;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
	args: {
		title: 'Výhodný nákup',
		children: list,
	},
};

export default meta;
