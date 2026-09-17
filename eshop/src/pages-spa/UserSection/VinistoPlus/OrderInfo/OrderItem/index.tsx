import ImageLocal from 'Components/View/ImageLocal';
import { getLocalizedPrice } from 'vinisto_shared/src/price/get-localized-price';

import styles from './styles.module.css';

import {
	VinistoHelperDllEnumsCurrency,
	VinistoOrderDllModelsApiOrderAddonItem,
} from '@/api-types/order-api';

interface OrderItemProps {
	addonItem: VinistoOrderDllModelsApiOrderAddonItem;
}

const OrderItem = ({ addonItem }: OrderItemProps) => {
	const addon = addonItem.addon;

	if (!addonItem.addon || !addon) return null;

	const price = addon.actions?.[0]?.price?.valueWithVat;
	const currency = addon.actions?.[0]?.price?.currency;

	return (
		<div className={styles.item}>
			<div className={styles.imgWrap}>
				<ImageLocal
					fileName="plus.svg"
					className={styles.icon}
					alt={addon.name || ''}
				/>
			</div>
			<div className={styles.name}>{addon.name}</div>
			<div className={styles.price}>
				{getLocalizedPrice({
					price: price ?? 0,
					currency: currency || VinistoHelperDllEnumsCurrency.CZK,
				})}
			</div>
		</div>
	);
};

export default OrderItem;
