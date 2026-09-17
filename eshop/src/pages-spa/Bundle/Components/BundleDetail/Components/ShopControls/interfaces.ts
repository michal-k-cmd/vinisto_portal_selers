import { Bundle } from 'vinisto_api_client/src/domain/bundle';

import {
	BundleItemVariants,
	QuantityBoxVariants,
} from './Components/BundleItem/constants';

export type ShopControlsProps = {
	variant?: BundleItemVariants;
	bundlesToShow: Bundle | Bundle[];
	isLoading?: boolean;
	quantityBox?: QuantityBoxVariants;
};
