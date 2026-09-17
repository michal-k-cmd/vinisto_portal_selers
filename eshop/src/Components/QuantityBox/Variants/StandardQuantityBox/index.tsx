import QuantityBox from 'Components/QuantityBox';
import {
	QuantityBoxPlusBtnVariants,
	QuantityBoxTypes,
} from 'Components/QuantityBox/constants';

import { StandardQuantityBoxProps } from './interfaces';

const StandardQuantityBox = ({
	bundle,
	className,
	isLoading = false,
	orderLimitation,
	carouselType,
	popoverType,
	afterAddToBasket,
	popoverClassname,
	methods,
}: StandardQuantityBoxProps) => {
	return (
		<QuantityBox
			type={QuantityBoxTypes.STANDARD}
			plusBtnVariant={QuantityBoxPlusBtnVariants.STANDARD}
			className={className}
			isLoading={isLoading}
			isForLogged={bundle?.flags.isForLogged ?? false}
			orderLimitation={orderLimitation}
			carouselType={carouselType}
			popoverType={popoverType}
			afterAddToBasket={afterAddToBasket}
			popoverClassname={popoverClassname}
			{...methods}
		/>
	);
};

export default StandardQuantityBox;
