import { BundleMetaForAnalytics } from 'Services/BasketService/interfaces';

import { Bundle } from '@/domain/bundle';

export interface IButtonAddToBasketProps {
	count: number;
	availableCount: number;
	bundleId: string;
	bundleItem?: Bundle;
	bundleMetaForAnalytics: BundleMetaForAnalytics;
	openCrossSellModal?: boolean;
	disabled?: boolean;
	className?: string;
}
