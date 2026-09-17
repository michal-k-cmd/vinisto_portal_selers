import { MutableRefObject } from 'react';
import { PopoverTypes } from 'Components/QuantityBox/constants';
import BundleOrderLimitation from 'vinisto_api_client/src/domain/bundle/order-limitation';
import { Bundle } from 'vinisto_api_client/src/domain/bundle';

import { UseStandardQuantityBoxMethods } from './hooks';

export type StandardQuantityBoxProps = {
	bundle: Bundle | null | undefined;
	shouldOpenCrossSellModal?: boolean;
	className?: string;
	isLoading?: boolean;
	ref?: MutableRefObject<HTMLDivElement | null>;
	orderLimitation?: BundleOrderLimitation | null;
	carouselType?: string;
	popoverType?: PopoverTypes;
	afterAddToBasket?: () => void;
	popoverClassname?: string;
	methods: UseStandardQuantityBoxMethods;
};
