import QuantityBox from 'Components/QuantityBox';
import {
	PopoverTypes,
	QuantityBoxPlusBtnTypes,
	QuantityBoxPlusBtnVariants,
	QuantityBoxTypes,
} from 'Components/QuantityBox/constants';
import type { MutableRefObject, ReactNode } from 'react';
import { Bundle } from 'vinisto_api_client/src/domain/bundle';
import BundleOrderLimitation from 'vinisto_api_client/src/domain/bundle/order-limitation';

import { useDirectQuantityBox } from './hooks';

export type DirectQuantityBoxProps = {
	bundle: Bundle | null | undefined;
	className?: string;
	isLoading?: boolean;
	plusBtnType?: QuantityBoxPlusBtnTypes;
	ref?: MutableRefObject<HTMLDivElement | null>;
	orderLimitation?: BundleOrderLimitation | null;
	countPopover?: boolean;
	popoverType?: PopoverTypes;
	popoverClassname?: string;
	carouselType?: string;
	afterAddToBasket?: () => void;
	isBasket?: boolean;
	// basketId is used on other than primary (e.g., user defined) baskets
	userOrSystemBasketId?: string;
	// basketId is used on related product item
	parentItemId?: string;
	baseQuantity?: number;
	shouldOpenCrossSellModal?: boolean;
	countInputLabel?: ReactNode;
};

const DirectQuantityBox = ({
	bundle,
	className,
	isLoading = false,
	plusBtnType = QuantityBoxPlusBtnTypes.STANDARD,
	orderLimitation,
	popoverType = PopoverTypes.COMPONENT,
	popoverClassname,
	countPopover,
	carouselType,
	afterAddToBasket,
	isBasket = false,
	userOrSystemBasketId,
	parentItemId,
	baseQuantity = 1,
	shouldOpenCrossSellModal = false,
	countInputLabel,
}: DirectQuantityBoxProps) => {
	const methods = useDirectQuantityBox({
		bundle,
		userOrSystemBasketId,
		parentItemId,
		showStandaloneQuantity: isBasket && !parentItemId,
		baseQuantity,
		shouldOpenCrossSellModal,
	});

	return (
		<QuantityBox
			productId={bundle?.id}
			type={QuantityBoxTypes.DIRECT}
			plusBtnVariant={QuantityBoxPlusBtnVariants.SUCCESS}
			plusBtnType={plusBtnType}
			className={className}
			isLoading={isLoading}
			isForLogged={bundle?.flags.isForLogged ?? false}
			orderLimitation={orderLimitation}
			popoverType={popoverType}
			popoverClassname={popoverClassname}
			countPopover={countPopover}
			carouselType={carouselType}
			afterAddToBasket={afterAddToBasket}
			isBasket={isBasket}
			countInputLabel={countInputLabel}
			{...methods}
		/>
	);
};

export default DirectQuantityBox;
