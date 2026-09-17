import { getLocalizedPrice } from 'vinisto_shared/src/price/get-localized-price';

import {
	Currency,
	MinOrderPriceConditionResponse,
} from '@/api-types/addons-api';

type Props = {
	condition: MinOrderPriceConditionResponse;
	currency: Currency;
};

const CategoryRow = (props: Props) => {
	if (!props.condition.minOrderPrice) return null;

	return (
		<div>
			Hodnota objednávky: nad{' '}
			{getLocalizedPrice({
				price: props.condition.minOrderPrice,
				currency: props.currency,
			})}
		</div>
	);
};

export default CategoryRow;
