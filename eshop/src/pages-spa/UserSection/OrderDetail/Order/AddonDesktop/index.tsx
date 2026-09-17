import { useContext } from 'react';
import Link from 'next/link';
import { LocalizationContext } from 'Services/LocalizationService';
import getBundleImage, { IMAGE_SIZE_THUMB_64x80 } from 'Helpers/getBundleImage';
import BundleProducer from 'Components/ProductBox/Components/BundleProducer';
import useBundleData from 'pages-spa/UserSection/Orders/Hooks/useBundleData';

import styles from './styles.module.css';

import { VinistoOrderDllModelsApiOrderAddon } from '@/api-types/order-api';

interface GiftDesktopProps {
	isLoading: boolean;
	addonItem: VinistoOrderDllModelsApiOrderAddon;
	index: number;
	url: string;
	quantity: number;
}

const AddonDesktop = ({
	isLoading,
	addonItem,
	url,
	quantity,
}: GiftDesktopProps) => {
	const t = useContext(LocalizationContext).useFormatMessage();

	const getBundleData = useBundleData();

	const actions = addonItem?.actions?.[0];
	// @ts-expect-error TS error: Property 'bundle' does not exist on type 'VinistoOrderDllModelsApiOrderAddonItem'.
	const bundle = actions?.bundle ?? null;

	const { flagComponent, producerSpecification } = getBundleData(actions ?? {});

	return (
		<div className={styles.product}>
			{!isLoading && (
				<Link
					className={styles.overlay}
					href={`/${t({
						id: 'routes.product.route',
					})}/${url}`}
				/>
			)}
			<div className={styles.productImg}>
				<img
					src={getBundleImage(
						[bundle?.mainImage ?? {}],
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
						{bundle?.name ?? ''}
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
				<div className={styles.productPrice}>zdarma</div>
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
				<div className={styles.productPrice}>zdarma</div>
			</div>
		</div>
	);
};

export default AddonDesktop;
