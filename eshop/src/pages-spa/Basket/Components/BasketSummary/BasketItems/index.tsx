import { useContext } from 'react';
import { BasketContext } from 'Services/BasketService';
import { PACKAGING_BUNDLE_ID } from 'pages-spa/Basket/Components/Packaging/hooks';
import { LocalizationContext } from 'Services/LocalizationService';

import BasketCoupons from './BasketCoupons';
import BasketItem from './BasketItem';
import styles from './styles.module.css';
import BasketAddon from './BasketAddon';
import BasketSubscription from './BasketSubscription';

import { AddonType } from '@/api-types/addons-api';
import { BasketType } from '@/api-types/basket-api';

export const NICE_PACKAGING_ADDON_ID_CZ = '684bbfeff8774051dbbad5cd';
export const NICE_PACKAGING_ADDON_ID_SK = '686e868e292ad32a79bd0032';

const BasketItems = () => {
	const { basketState, basketBundles } = useContext(BasketContext);
	const {
		useFormatMessage,
		activeCurrency: { currency },
	} = useContext(LocalizationContext);

	const t = useFormatMessage();

	const subscriptionAddon = basketState?.addons?.find(
		(addon) =>
			addon.type === AddonType.SubscriptionMonth ||
			addon.type === AddonType.SubscriptionYear
	);

	return (
		<div className={styles.basketItems}>
			<p className={styles.mobileHeading}>
				{t({ id: 'basket.summaryMobile' })}
			</p>
			<div className={styles.basketItems}>
				{subscriptionAddon && (
					<BasketSubscription
						item={subscriptionAddon}
						currency={currency}
					/>
				)}
				{basketBundles
					?.filter((item) => item.itemId !== PACKAGING_BUNDLE_ID)
					.map((item) => (
						<BasketItem
							key={item.itemId}
							currency={currency}
							item={item}
							basketType={BasketType.Primary}
						/>
					))}
				{basketState?.addons
					?.filter((item) => {
						return !(
							[NICE_PACKAGING_ADDON_ID_CZ, NICE_PACKAGING_ADDON_ID_SK].includes(
								item.addonId ?? ''
							) ||
							item.type === AddonType.SubscriptionMonth ||
							item.type === AddonType.SubscriptionYear
						);
					})
					.map((item) => (
						<BasketAddon
							key={item.addonId}
							item={item}
						/>
					))}
				<BasketCoupons
					coupons={basketState?.coupons ?? []}
					currency={currency}
				/>
			</div>
		</div>
	);
};

export default BasketItems;
