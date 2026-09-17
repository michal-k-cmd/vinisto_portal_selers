import cx from 'classnames';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import { getShippingIconData } from 'pages-spa/CartShippingPayment/Components/ShippingItem/helpers';
import { LocalizationContext } from 'Services/LocalizationService';
import { useContext } from 'react';

import styles from './styles.module.css';

import { VinistoOrderDllModelsApiDeliveryDelivery } from '@/api-types/order-api';

interface DeliveryCardProps {
	delivery: VinistoOrderDllModelsApiDeliveryDelivery;
}

const DeliveryCard = ({ delivery }: DeliveryCardProps) => {
	const getLocalizedValue = useLocalizedValue();
	const deliveryName = getLocalizedValue(delivery.name);
	const t = useContext(LocalizationContext).useFormatMessage();

	const {
		source: iconSource,
		className: iconClassName,
		fallbackSource,
	} = getShippingIconData(deliveryName);
	return (
		<div className={styles.component}>
			<div className={cx(styles.icon, iconClassName)}>
				<img
					className="iconClassName"
					src={`/assets/checkout-icons/${iconSource}`}
					onError={(e) => {
						(
							e.target as HTMLInputElement
						).src = `/assets/checkout-icons/${fallbackSource}`;
					}}
				/>
			</div>
			<h3 className={styles.deliveryName}>
				{getLocalizedValue(delivery.name)}
			</h3>
			<p className={styles.deliveryDescription}>
				{getLocalizedValue(delivery.description)}
			</p>
			<p className={styles.deliveryPrice}>{t({ id: 'basket.price.free' })}</p>
		</div>
	);
};

export default DeliveryCard;
