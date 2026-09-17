import { useContext } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';
import { getLocalizedPrice } from 'vinisto_shared/src/price/get-localized-price';
import Flag from 'Components/Flag';
import { useQuery } from '@tanstack/react-query';
import Skeleton from 'react-loading-skeleton';

import styles from '../BasketItem/styles.module.css';

import { BasketAddon } from '@/api-types/basket-api';
import { VinistoHelperDllEnumsCurrency } from '@/api-types/product-api';
import AddonsService from '@/addons';

interface BasketSubscriptionProps {
	item: BasketAddon;
	currency: VinistoHelperDllEnumsCurrency;
}

const BasketSubscription = ({ item, currency }: BasketSubscriptionProps) => {
	const { useFormatMessage } = useContext(LocalizationContext);
	const t = useFormatMessage();

	const { data: addon, isLoading } = useQuery({
		queryKey: ['addon', item.addonId, { currency }],
		queryFn: () => AddonsService.get(item.addonId ?? ''),
		enabled: !!item.addonId,
	});

	const priceWithoutVat = item.price;
	const priceWithVat = item.priceWithVat;
	const quantity = item.quantity ?? 1;

	return (
		<div className={styles.wrapper}>
			<div className={styles.imageWrapper}>
				<img
					src="/assets/images/vinisto-plus-logo.svg"
					alt={`${t({
						id: 'userSection.vinistoplus.becomeMember.info.vinistoplus',
					})}`}
				/>
			</div>
			<div className={styles.itemInfo}>
				<span className={styles.title}>
					{isLoading ? <Skeleton /> : addon?.name}
				</span>
				<div className={styles.producer}>
					<Flag
						code={'cz'}
						width="19"
						height="14"
						className="vinisto-flag"
						loading="lazy"
					/>
					<span>vinisto</span>
				</div>
				<div className={styles.supplier}>
					<span>
						{t(
							{ id: 'bundle.supplier.name' },
							{
								name: 'vinisto',
							}
						)}
					</span>
				</div>
			</div>
			<div className={styles.priceWrapper}>
				<div>
					<span className={styles.price}>
						{getLocalizedPrice({
							price: priceWithVat ? priceWithVat * quantity : 0,
							currency,
						})}
					</span>
				</div>
				<div className={styles.priceWithoutVat}>
					<span>{t({ id: 'basket.priceWithoutVAT' })} </span>
					{getLocalizedPrice({
						price: priceWithoutVat ? priceWithoutVat * quantity : 0,
						currency,
					})}
				</div>
			</div>
		</div>
	);
};

export default BasketSubscription;
