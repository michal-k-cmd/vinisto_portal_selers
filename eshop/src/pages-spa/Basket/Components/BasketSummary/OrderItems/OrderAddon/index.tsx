import React, { useContext } from 'react';
import getBundleImage, { IMAGE_SIZE_THUMB_64x80 } from 'Helpers/getBundleImage';
import { LocalizationContext } from 'Services/LocalizationService';
import Flag from 'Components/Flag';
import { getCountryCode } from 'Helpers/getFlagSpecification';
import { getLocalizedPrice } from 'vinisto_shared/src/price/get-localized-price';

import styles from '../OrderItem/styles.module.css';

import {
	VinistoOrderDllModelsApiOrderAddonItem,
	VinistoOrderDllModelsApiOrderBundle,
} from '@/api-types/order-api';

interface OrderItemProps {
	item: VinistoOrderDllModelsApiOrderAddonItem;
}

const OrderAddon = ({ item }: OrderItemProps) => {
	const { useFormatMessage } = useContext(LocalizationContext);
	const t = useFormatMessage();

	const addon = item.addon ?? null;
	const actions = addon?.actions?.[0];
	const prices = actions?.price;

	const bundle =
		actions && 'bundle' in actions
			? // This is sketchy as swagger does not allow this, but it should work like this
			  (actions?.bundle as VinistoOrderDllModelsApiOrderBundle)
			: null;

	const priceWithVat = prices?.valueWithVat ?? 0;
	const priceWithoutVatValue = prices?.value ?? 0;
	const currency = prices?.currency ?? 'CZK';

	return (
		<div className={styles.wrapper}>
			<div className={styles.imageWrapper}>
				<img
					src={getBundleImage(
						[bundle?.mainImage ?? {}],
						IMAGE_SIZE_THUMB_64x80
					)}
					alt={`${t({ id: 'alt.bundleImage' })}`}
				/>
				<span className={styles.quantity}>{item.quantity}x</span>
			</div>
			<div className={styles.itemInfo}>
				<span className={styles.title}>{addon?.name}</span>
				<div className={styles.producer}>
					<Flag
						code={getCountryCode(bundle?.countrySpecification ?? '')}
						width="19"
						height="14"
						className="vinisto-flag"
						loading="lazy"
					/>
					<span>{bundle?.producerSpecification?.value}</span>
				</div>
				<div className={styles.supplier}>
					<span>
						{t(
							{ id: 'bundle.supplier.name' },
							{
								name: bundle?.supplierDetail?.nameWeb,
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

export default OrderAddon;
