import { ReactNode, useContext } from 'react';
import Link from 'next/link';
import { LocalizationContext } from 'Services/LocalizationService';
import BundleProducer from 'Components/ProductBox/Components/BundleProducer';
import getBundleImage, { IMAGE_SIZE_THUMB_64x80 } from 'Helpers/getBundleImage';
import { getLocalizedPrice } from 'vinisto_shared/src/price/get-localized-price';
import { VinistoOrderDllModelsApiOrderOrderItem } from 'vinisto_api_client/src/api-types/order-api';
import { VinistoHelperDllEnumsCurrency } from 'vinisto_api_client/src/api-types/product-api';

import styles from './styles.module.css';

interface ProductMobileProps {
	isLoading: boolean;
	orderItem: VinistoOrderDllModelsApiOrderOrderItem;
	index: number;
	url: string;
	flagComponent: ReactNode;
	producerSpecification: string;
	quantity: number;
	totalPriceWithVAT: number;
	totalPriceWithoutVAT: number;
	orderCurrency: VinistoHelperDllEnumsCurrency;
	itemPriceWithVAT: number;
	itemPriceWithoutVAT: number;
	isB2bOrder: boolean;
}

const ProductDesktop = ({
	orderItem,
	url,
	flagComponent,
	producerSpecification,
	quantity,
	totalPriceWithVAT,
	totalPriceWithoutVAT,
	orderCurrency,
	itemPriceWithVAT,
	itemPriceWithoutVAT,
	isB2bOrder,
}: ProductMobileProps) => {
	const t = useContext(LocalizationContext).useFormatMessage();

	return (
		<div className={styles.product}>
			<div className={styles.productImg}>
				<img
					src={getBundleImage(
						[orderItem.bundle.mainImage ?? {}],
						IMAGE_SIZE_THUMB_64x80
					)}
					alt={`${t({
						id: 'alt.bundleImage',
					})}`}
				/>
			</div>
			<div className={styles.secondColumn}>
				<div className={styles.productName}>
					<Link
						className={styles.overlay}
						href={`/${t({
							id: 'routes.product.route',
						})}/${url}`}
					>
						{orderItem.bundle.name ?? ''}
					</Link>
				</div>
				<div className={styles.productProducer}>
					<BundleProducer
						flag={flagComponent}
						name={producerSpecification}
					/>
				</div>
			</div>
			<div className={styles.thirdColumn}>
				<div className={styles.productPrice}>
					{getLocalizedPrice({
						price: isB2bOrder ? itemPriceWithoutVAT : itemPriceWithVAT,
						currency: orderCurrency,
					})}

					<div className={styles.productPriceNoVat}>
						{t(
							{
								id: isB2bOrder ? 'price.withVAT' : 'price.withoutVAT',
							},
							{
								priceWithCurrency: (
									<span
										key={`usod-price.withoutVAT.${orderItem.bundle.id}`}
										className={styles.productPriceNoVatPrice}
									>
										{getLocalizedPrice({
											price: isB2bOrder
												? itemPriceWithVAT
												: itemPriceWithoutVAT,
											currency: orderCurrency,
										})}
									</span>
								),
							}
						)}
					</div>
				</div>
				<div className={styles.productSeller}>
					prodejce:{' '}
					<span className={styles.sellerName}>
						{orderItem?.bundle?.supplierDetail?.nameWeb ?? ''}
					</span>
				</div>
			</div>
			<div className={styles.productCount}>
				{t(
					{ id: 'order.pcs' },
					{
						count: quantity,
					}
				)}
			</div>
			<div className={styles.prices}>
				celkem{' '}
				<span className={styles.productPrice}>
					{getLocalizedPrice({
						price: isB2bOrder ? totalPriceWithoutVAT : totalPriceWithVAT,
						currency: orderCurrency,
					})}
				</span>
				<div className={styles.productPriceNoVat}>
					{t(
						{
							id: isB2bOrder
								? 'userSection.order.price.totalWithVat'
								: 'userSection.order.price.totalWithoutVat',
						},
						{
							value: (
								<span
									key={`usod2-price.withoutVAT.${orderItem.bundle.id}`}
									className={styles.productPriceNoVatPrice}
								>
									{getLocalizedPrice({
										price: isB2bOrder
											? totalPriceWithVAT
											: totalPriceWithoutVAT,
										currency: orderCurrency,
									})}
								</span>
							),
						}
					)}
				</div>
			</div>
		</div>
	);
};

export default ProductDesktop;
