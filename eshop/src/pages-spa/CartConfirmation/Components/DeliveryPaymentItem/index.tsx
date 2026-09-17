import { useContext } from 'react';
import Skeleton from 'react-loading-skeleton';
import cx from 'classnames';
import { IDeliveryPaymentProps } from 'pages-spa/CartConfirmation/Components/DeliveryPaymentItem/interfaces';
import { LangValuePair } from 'Hooks/useLocalizedValue/interfaces';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import { LocalizationContext } from 'Services/LocalizationService';
import { getLocalizedPrice } from 'vinisto_shared/src/price/get-localized-price';

import styles from './styles.module.css';

const DeliveryPaymentItem = ({ name, price }: IDeliveryPaymentProps) => {
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();
	const getLocalizedValue = useLocalizedValue();

	const itemName =
		typeof name === 'string'
			? name
			: getLocalizedValue((name as LangValuePair[]) ?? []);
	const itemPriceWithVAT = price?.valueWithVat ?? 0;
	const isLoading = name?.length === 0;

	const currency = price?.currency;

	if (!currency) return null;

	return (
		<div
			className={cx(
				'vinisto-user-orders__orders__order-body__item vinisto-cart__item vinisto-order-summary',
				styles.payment
			)}
		>
			<div className="vinisto-user-orders__orders__order-body__item__info">
				<div className={styles.name}>{isLoading ? <Skeleton /> : itemName}</div>
			</div>

			<div>
				{isLoading ? (
					<Skeleton
						count={1.6}
						width="80px"
					/>
				) : (
					<div className={styles.price}>
						{price?.valueWithVat === 0
							? t({ id: 'basket.price.free' })
							: getLocalizedPrice({
									price: itemPriceWithVAT,
									currency,
							  })}
					</div>
				)}
			</div>
		</div>
	);
};

export default DeliveryPaymentItem;
