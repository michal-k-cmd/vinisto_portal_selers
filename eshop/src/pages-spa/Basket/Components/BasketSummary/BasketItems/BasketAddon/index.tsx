import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import getBundleImage, { IMAGE_SIZE_THUMB_64x80 } from 'Helpers/getBundleImage';
import { LocalizationContext } from 'Services/LocalizationService';
import { getLocalizedPrice } from 'vinisto_shared/src/price/get-localized-price';
import { BundleService } from 'vinisto_api_client';
import { getLocalizedValue } from 'Hooks/useLocalizedValue';

import styles from '../BasketItem/styles.module.css';

import { BasketAddon as BasketAddonType } from '@/api-types/basket-api';
import AddonsService from '@/addons';

interface BasketAddonProps {
	item: BasketAddonType;
}

const BasketAddon = ({ item }: BasketAddonProps) => {
	const {
		activeCurrency: { currency },
		countryOfSale,
	} = useContext(LocalizationContext);

	const { data: addon, isLoading } = useQuery({
		queryKey: ['addon', item.addonId, { currency }],
		queryFn: () => AddonsService.get(item.addonId ?? ''),
		enabled: !!item.addonId,
	});

	const actions = addon?.actions?.[0];
	const itemId = actions && 'itemId' in actions ? actions.itemId : null;

	const { data: bundle, isLoading: isBundleLoading } = useQuery({
		queryKey: [
			'bundle',
			itemId,
			{
				currency,
				countryOfSale,
			},
		],
		queryFn: async () => {
			// TO CONSIDER: This is a problematic function, as it uses adapter, but does not pass customer price level nor platformId
			// Consider replacing, or calling the adapter afterwards (but is is likely being used in other apps)
			return BundleService.getBundleById(itemId ?? '', {
				currency,
				countryOfSale,
				isCache: true,
			});
		},
		enabled: !!itemId,
		refetchOnMount: true,
		staleTime: 0,
	});

	const { useFormatMessage } = useContext(LocalizationContext);
	const t = useFormatMessage();

	const prices = actions?.price;

	const priceWithVat = prices?.valueWithVat ?? 0;
	const priceWithoutVatValue = prices?.value ?? 0;

	if (isLoading || isBundleLoading || !addon) return;

	return (
		<div className={styles.wrapper}>
			<div className={styles.imageWrapper}>
				<img
					src={getBundleImage(bundle?.images ?? [], IMAGE_SIZE_THUMB_64x80)}
					alt={`${t({ id: 'alt.bundleImage' })}`}
				/>
				<span className={styles.quantity}>{item.quantity}x</span>
			</div>
			<div className={styles.itemInfo}>
				<span className={styles.title}>{getLocalizedValue(bundle?.name)}</span>
				<div className={styles.supplier}>
					<span>
						{t(
							{ id: 'bundle.supplier.name' },
							{
								name: bundle?.supplier?.nameWeb,
							}
						)}
					</span>
				</div>
			</div>
			<div className={styles.priceWrapper}>
				<div>
					<span className={styles.price}>
						{priceWithVat > 0
							? getLocalizedPrice({
									price: priceWithVat ? priceWithVat * (item.quantity ?? 1) : 0,
									currency,
							  })
							: t({ id: 'basket.summary.free' })}
					</span>
				</div>
				{priceWithVat > 0 && (
					<div className={styles.priceWithoutVat}>
						<span>{t({ id: 'basket.priceWithoutVAT' })} </span>
						{getLocalizedPrice({
							price: priceWithoutVatValue
								? priceWithoutVatValue * (item.quantity ?? 1)
								: 0,
							currency,
						})}
					</div>
				)}
			</div>
		</div>
	);
};

export default BasketAddon;
