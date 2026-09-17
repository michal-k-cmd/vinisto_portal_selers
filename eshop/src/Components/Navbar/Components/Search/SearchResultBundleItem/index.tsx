import { useContext, useMemo } from 'react';
import cx from 'classnames';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import getBundleImage, { IMAGE_SIZE_THUMB_64x80 } from 'Helpers/getBundleImage';
import { LocalizationContext } from 'Services/LocalizationService';
import BundleProducer from 'Components/ProductBox/Components/BundleProducer';
import getFlagSpecification from 'Helpers/getFlagSpecification';
import StockAvailability from 'Components/StockAvailability';
import { WarehouseContext } from 'Services/WarehouseService';
import { DirectQuantityBox } from 'Components/QuantityBox';
import Skeleton from 'react-loading-skeleton';
import { useDiscountCoupons } from 'pages-spa/Bundle/hooks';
import { Bundle } from 'vinisto_api_client/src/domain/bundle';
import Link from 'next/link';
import useCanSeePrices from 'Hooks/use-can-see-prices';
import removeDiacritics from 'Helpers/removeDiacritics';
import CustomHighlighter from 'Components/CustomHighlighter';
import { useIsB2b } from 'Services/PlatformService';

import Prices from './Prices';
import styles from './styles.module.css';

type Props = {
	bundle: Bundle;
	searchString?: string | null;
	className?: string;
	displayCta?: boolean;
};

const SearchResultBundleItem = ({
	bundle,
	searchString,
	className,
	displayCta = false,
}: Props) => {
	const canSeePrices = useCanSeePrices();
	const warehouseContext = useContext(WarehouseContext);
	const localizationContext = useContext(LocalizationContext);
	const isB2b = useIsB2b();

	const getLocalizedValue = useLocalizedValue();
	const t = localizationContext.useFormatMessage();

	const name = getLocalizedValue(bundle.name);

	const couponData = useDiscountCoupons({ bundle });

	const availableQuantity = [warehouseContext.getQuantity(bundle.id)].filter(
		(x): x is number => x !== undefined
	);

	const { shortVariety: producerName, component: flag } = getFlagSpecification(
		bundle?.specificationDetails ?? []
	);

	const bundlePrices = bundle.bundlePrices;

	const warehouseId = bundle.warehouseId.join(', ');

	const search = useMemo(
		() => (searchString ? [searchString] : []),
		[searchString]
	);

	return (
		<div className={cx(styles.wrapper, className)}>
			<Link
				className={styles.image}
				href={`/${t({ id: 'routes.product.route' })}/${getLocalizedValue(
					bundle.url
				)}`}
			>
				<img
					src={getBundleImage(bundle.images ?? [], IMAGE_SIZE_THUMB_64x80)}
					alt={`${t({ id: 'alt.bundleImage' })}`}
				/>
			</Link>
			<div className={styles.info}>
				<Link
					className={styles.name}
					href={`/${t({ id: 'routes.product.route' })}/${getLocalizedValue(
						bundle.url
					)}`}
				>
					<CustomHighlighter
						searchWords={search}
						textToHighlight={name}
						sanitize={removeDiacritics}
						autoEscape
					/>
				</Link>
				{warehouseId && isB2b && (
					<span className={styles.warehouseId}>
						{t(
							{ id: 'warehouseId' },
							{
								id: (
									<strong>
										<CustomHighlighter
											searchWords={search}
											textToHighlight={warehouseId}
											autoEscape
										/>
									</strong>
								),
							}
						)}
					</span>
				)}
				{producerName && (
					<BundleProducer
						flag={flag}
						name={producerName}
						className={styles.producer}
					/>
				)}
			</div>
			<div className={styles.metadata}>
				<div className={styles.stock}>
					<StockAvailability
						availableQuantity={availableQuantity}
						deliveryDate={warehouseContext.deliveryDate}
						isIntangible={bundle.flags.isIntangible}
						fallback={<Skeleton width="130px" />}
					/>
				</div>
				{canSeePrices && (
					<Prices
						bundlePrices={bundlePrices}
						isSet={bundle?.flags.isSet ?? false}
						couponData={couponData}
					/>
				)}
				{displayCta && (
					<div
						onClick={(e) => e.stopPropagation()}
						className={styles.cta}
						role="button"
						tabIndex={0}
					>
						<DirectQuantityBox bundle={bundle} />
					</div>
				)}
			</div>
		</div>
	);
};

export default SearchResultBundleItem;
