import { useContext } from 'react';

import { MAX_ADDITIONAL_PERCENTAGE_DISCOUNT_FOR_MERCHANT } from './constants';

import { BasketContext } from '.';

const useIsFeeOverLimit = () => {
	const { basketState } = useContext(BasketContext);
	const isFeeOverLimit = basketState?.items?.some(
		(item) =>
			item &&
			'additionalPercentageDiscount' in item &&
			typeof item.additionalPercentageDiscount === 'number' &&
			item.additionalPercentageDiscount >
				MAX_ADDITIONAL_PERCENTAGE_DISCOUNT_FOR_MERCHANT
	);
	return isFeeOverLimit;
};

export default useIsFeeOverLimit;
