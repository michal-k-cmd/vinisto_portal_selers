import type { ReactNode } from 'react';
import { UseStandardQuantityBoxMethods } from 'Components/QuantityBox/Variants/StandardQuantityBox/hooks';
import { Bundle } from 'vinisto_api_client/src/domain/bundle';

import {
	BundleItemQuantityBoxStyleVariants,
	BundleItemVariants,
	QuantityBoxVariants,
} from './constants';

export type BundleItemProps = {
	bundle: Bundle | undefined;
	variant?: BundleItemVariants;
	quantityBox?: QuantityBoxVariants;
	isQuantityLoading?: boolean;
	isLoading?: boolean;
	standardQuantityBoxMethods?: UseStandardQuantityBoxMethods;
	displayBargainPriceBadge?: boolean;
	hideSeller?: boolean;
	className?: string;
	showBasketShortcut?: boolean;
	quantityBoxStyleVariant?: BundleItemQuantityBoxStyleVariants;
	countInputLabel?: ReactNode;
	unavailableReason?: 'temporary' | 'saleOver';
};
