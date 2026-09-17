import { useContext } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';
import Link from 'next/link';
import { getLocalizedPrice } from 'vinisto_shared/src/price/get-localized-price';
import ImageLocal from 'Components/View/ImageLocal';
import { DeviceServiceContext } from 'Services/DeviceService';

import styles from '../AddonDesktop/styles.module.css';
import mobileStyles from '../ProductMobile/styles.module.css';

import { VinistoOrderDllModelsApiOrderAddonItem } from '@/api-types/order-api';
import { VinistoHelperDllEnumsCurrency } from '@/api-types/product-api';

interface SubscriptionProps {
	addonItem: VinistoOrderDllModelsApiOrderAddonItem;
}

const Subscription = ({ addonItem }: SubscriptionProps) => {
	const t = useContext(LocalizationContext).useFormatMessage();
	const { isDesktop } = useContext(DeviceServiceContext);
	const addon = addonItem.addon;

	const currency = addon?.currency ?? VinistoHelperDllEnumsCurrency.CZK;

	const actions = addon?.actions?.[0];

	const itemPriceWithVAT = actions?.price?.valueWithVat ?? 0;
	const itemPriceWithoutVAT = actions?.price?.value ?? 0;
	const totalPriceWithVAT = (itemPriceWithVAT ?? 0) * (addonItem.quantity ?? 1);
	const totalPriceWithoutVAT =
		(itemPriceWithoutVAT ?? 0) * (addonItem.quantity ?? 1);

	if (isDesktop) {
		return (
			<div className={styles.product}>
				<div className={styles.productImg}>
					<ImageLocal fileName="plus.svg" />
				</div>
				<div className={styles.secondColumn}>
					<div className={styles.productName}>
						<Link
							className={styles.overlay}
							href="/uzivatelska-sekce/vinisto-plus"
						>
							{addon?.name ?? ''}
						</Link>
					</div>
				</div>
				<div className={styles.thirdColumn}>
					<div className={styles.productPrice}>
						{getLocalizedPrice({
							price: itemPriceWithVAT,
							currency: currency,
						})}

						<div className={styles.productPriceNoVat}>
							{t(
								{
									id: 'price.withoutVAT',
								},
								{
									priceWithCurrency: (
										<span
											key={`subscription-price.withoutVAT.${addon?.id}`}
											className={styles.productPriceNoVatPrice}
										>
											{getLocalizedPrice({
												price: itemPriceWithoutVAT,
												currency: currency,
											})}
										</span>
									),
								}
							)}
						</div>
					</div>
				</div>
				<div className={styles.productCount}>
					{t(
						{ id: 'order.pcs' },
						{
							count: addonItem.quantity ?? 1,
						}
					)}
				</div>
				<div className={styles.prices}>
					celkem{' '}
					<span className={styles.productPrice}>
						{getLocalizedPrice({
							price: totalPriceWithVAT,
							currency: currency,
						})}
					</span>
					<div className={styles.productPriceNoVat}>
						{t(
							{
								id: 'userSection.order.price.totalWithoutVat',
							},
							{
								value: (
									<span
										key={`usod2-price.withoutVAT.${addon?.id}`}
										className={styles.productPriceNoVatPrice}
									>
										{getLocalizedPrice({
											price: totalPriceWithoutVAT,
											currency: currency,
										})}
									</span>
								),
							}
						)}
					</div>
				</div>
			</div>
		);
	} else {
		return (
			<div className={mobileStyles.product}>
				<div className={mobileStyles.productImg}>
					<ImageLocal fileName="plus.svg" />
				</div>
				<div className={mobileStyles.productName}>{addon?.name ?? ''}</div>
				<div className={mobileStyles.productCount}>
					{t(
						{ id: 'order.pcs' },
						{
							count: addonItem.quantity ?? 1,
						}
					)}
				</div>
				<div className={mobileStyles.productPrice}>
					{getLocalizedPrice({
						price: totalPriceWithVAT,
						currency: currency,
					})}
				</div>
				<div className={mobileStyles.productPriceNoVat}>
					{t(
						{
							id: 'userSection.order.price.totalWithoutVat',
						},
						{
							value: (
								<span className={mobileStyles.productPriceNoVatPrice}>
									{getLocalizedPrice({
										price: totalPriceWithoutVAT,
										currency: currency,
									})}
								</span>
							),
						}
					)}
				</div>
			</div>
		);
	}
};

export default Subscription;
