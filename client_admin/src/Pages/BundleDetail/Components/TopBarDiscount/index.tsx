import { FC, useContext } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';

import { TopBarDiscountProps } from './interfaces';

import './styles.css';

const TopBarDiscount: FC<TopBarDiscountProps> = ({
	isSet,
	originalPrice,
	discountValue,
	discountPartial,
	discountPercentage,
	validFrom,
	validTo,
}) => {
	const { useFormatMessage } = useContext(LocalizationContext);
	const t = useFormatMessage();

	return (
		<>
			<span className="text-decoration-line-through fw-normal">
				{originalPrice}
			</span>
			<span
				className="item-value tooltip-span mb-0 pe-5 value-success"
				data-tooltip={
					isSet
						? t(
								{ id: 'topbar.priceTooltip.bundleSetDiscount' },
								{ discountPercentage, discountPartial }
						  )
						: t(
								{ id: 'topbar.priceTooltip.currentDiscount' },
								{ discountPercentage, discountPartial, validFrom, validTo }
						  )
				}
			>
				{discountValue}
			</span>
		</>
	);
};

export default TopBarDiscount;
