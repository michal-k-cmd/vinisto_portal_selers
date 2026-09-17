import type { ReactNode } from 'react';
import BundleOrderLimitation from 'vinisto_api_client/src/domain/bundle/order-limitation';

import {
	PopoverTypes,
	QuantityBoxPlusBtnTypes,
	QuantityBoxPlusBtnVariants,
	QuantityBoxTypes,
} from './constants';

export type QuantityBoxProps = {
	productId?: string;
	type: QuantityBoxTypes;
	plusBtnVariant: QuantityBoxPlusBtnVariants;
	plusBtnType?: QuantityBoxPlusBtnTypes;
	popoverType?: PopoverTypes;
	count: number;
	quantityInBasket: number;
	availableCount: number | undefined;
	onIncrement: (callback?: () => void) => void;
	onDecrement: (callback?: () => void) => void;
	onCountChange: (value: string, callback?: () => void) => void;
	onAddToBasket: (callback?: () => void) => Promise<void>;
	afterAddToBasket?: () => void;
	onBlur: (callback?: () => void) => void;
	className?: string;
	isLoading?: boolean;
	bundlePriceWithVat?: number;
	isForLogged: boolean;
	orderLimitation?: BundleOrderLimitation | null;
	ref?: HTMLElement | null;
	countPopover?: boolean;
	carouselType?: string;
	popoverClassname?: string;
	isBasket?: boolean;
	countInputLabel?: ReactNode;
	// basketId is used on other than primary (e.g., user defined) baskets
	basketId?: string;
};
