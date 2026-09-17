import { MouseEvent, useCallback, useContext } from 'react';
import { get } from 'lodash-es';
import cx from 'classnames';
import { BasketContext } from 'Services/BasketService';
import { LocalizationContext } from 'Services/LocalizationService';

import { MIN_QUANTITY } from '../QuantityBox/constants';

import { IButtonAddToBasketProps } from './interfaces';

const ButtonAddToBasket = (props: IButtonAddToBasketProps) => {
	const t = useContext(LocalizationContext).useFormatMessage();
	const { handleOnAddToBasket } = useContext(BasketContext);

	const bundleId = get(props, 'bundleId');
	const bundleItem = get(props, 'bundleItem');
	const bundleMetaForAnalytics = props.bundleMetaForAnalytics;
	const availableCount = get(props, 'availableCount', 0);
	const minAllowedQuantity = Math.min(availableCount, MIN_QUANTITY);
	const quantity = get(props, 'count', minAllowedQuantity);
	const openCrossSellModal = get(props, 'openCrossSellModal', true);
	const isDisabled = get(props, 'disabled', false);

	const handleAddToBasket = useCallback(
		(event: MouseEvent<HTMLButtonElement>) => {
			if (event) {
				event.stopPropagation();
				event.preventDefault();
			}
			handleOnAddToBasket({
				quantity,
				bundleId,
				bundleMetaForAnalytics,
				bundleItem,
				availableCount,
				openCrossSellModal,
			});
		},
		[
			handleOnAddToBasket,
			quantity,
			bundleId,
			bundleMetaForAnalytics,
			bundleItem,
			availableCount,
			openCrossSellModal,
		]
	);

	return (
		<button
			className={cx(
				'vinisto-wine__add-to-cart__button',
				'vinisto-bg-green vinisto-btn',
				props.className
			)}
			onClick={handleAddToBasket}
			disabled={isDisabled}
		>
			{t({ id: 'carousel.button.addToBasket' })}
		</button>
	);
};

export default ButtonAddToBasket;
