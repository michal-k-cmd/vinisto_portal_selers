import cx from 'classnames';
import { getLocalizedPrice } from 'vinisto_shared/src/price/get-localized-price';

import sharedStyles from './../ItemToApprove/styles.module.css';
import styles from './styles.module.css';

import { BasketItemB2B } from '@/api-types/basket-api';
import { Bundle } from '@/domain/bundle';
import { Currency } from '@/api-types/addons-api';
import { VinistoHelperDllEnumsCurrency } from '@/api-types/user-api';

interface Props {
	mergedBasketItems: (BasketItemB2B & { bundle: Bundle | undefined })[];
	basketCurrency: Currency | VinistoHelperDllEnumsCurrency;
}

const Summary = ({ mergedBasketItems, basketCurrency }: Props) => {
	const totalLoss = mergedBasketItems.reduce((acc, item) => {
		const priceWithoutAdditionalDisount = item.discountPrice ?? item.price ?? 0;
		const priceWithAdditionalDisount =
			item.discountPriceAdditionalPercentageDiscount ?? 0;
		return (
			acc +
			(priceWithoutAdditionalDisount - priceWithAdditionalDisount) *
				(item.quantity ?? 1)
		);
	}, 0);

	return (
		<div className={cx(sharedStyles.itemToApprove, styles.summary)}>
			<div className={styles.label}>Celková ztráta z dodatečné slevy</div>
			<div></div>
			<div></div>
			<div className={cx(sharedStyles.price, styles.totalPrice)}>
				{getLocalizedPrice({
					price: totalLoss,
					currency: basketCurrency,
				})}
			</div>
		</div>
	);
};

export default Summary;
