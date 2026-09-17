import React, { useContext } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import getBundleImage, {
	IMAGE_SIZE_THUMB_208x240,
} from 'Helpers/getBundleImage';
import BundleItem from 'pages-spa/Bundle/Components/BundleDetail/Components/ShopControls/Components/BundleItem';
import {
	BundleItemVariants,
	QuantityBoxVariants,
} from 'pages-spa/Bundle/Components/BundleDetail/Components/ShopControls/Components/BundleItem/constants';
import { useStandardQuantityBox } from 'Components/QuantityBox/Variants/StandardQuantityBox/hooks';
import { WarehouseContext } from 'Services/WarehouseService';
import useIdenticalBundles from 'Hooks/Queries/useIdenticalBundles';
import BundleProducer from 'Components/ProductBox/Components/BundleProducer';
import getFlagSpecification from 'Helpers/getFlagSpecification';
import { useQuery } from '@tanstack/react-query';
import { SOMMELIER_RATING_ID } from 'pages-spa/Bundle/constants';
import cx from 'classnames';

import styles from './styles.module.css';

import { Bundle } from '@/domain/bundle';
import { ContentProductsListComponent } from '@/api-types/strapi-api';
import SpecificationService from '@/product-service/specification';

type Props = {
	bundle: Bundle;
	type: ContentProductsListComponent['Product_card_style'];
};

const getWrapperClassName = (
	type: ContentProductsListComponent['Product_card_style']
) => {
	if (type === 'fill width') {
		return styles.fillWidthWrapper;
	}
	if (type === 'half width') {
		return styles.halfWidthWrapper;
	}
};

const ProductCard = ({ bundle, type }: Props) => {
	const { countryOfSale, activeCurrency, useFormatMessage } =
		useContext(LocalizationContext);
	const t = useFormatMessage();
	const getLocalizedValue = useLocalizedValue();
	const { getQuantity } = useContext(WarehouseContext);

	const standardQuantityBoxMethods = useStandardQuantityBox(bundle, true);

	const { data: identicalBundles } = useIdenticalBundles(bundle.id, {
		countryOfSale,
		currency: activeCurrency.currency,
		IsCache: true,
	});

	const { data: sommelierRatingSpecificationValues } = useQuery(
		['bundle-specification-values', bundle.id, SOMMELIER_RATING_ID],
		() =>
			SpecificationService.getSpecificationValueForBundle(
				bundle.id,
				SOMMELIER_RATING_ID
			)
	);

	const sommelierRating = sommelierRatingSpecificationValues?.[0]?.value;

	const allBundles = [bundle, ...(identicalBundles ?? [])];

	const bundlesSortedByAvailabilityAndPrice = allBundles?.sort((a, b) => {
		const aPurchasability =
			a?.flags.isTemporaryUnavailable || a?.flags.isGift ? 1 : 0;
		const bPurchasability =
			b?.flags.isTemporaryUnavailable || b?.flags.isGift ? 1 : 0;

		const aAvailability = getQuantity(a?.id ?? '') ? 1 : 0;
		const bAvailability = getQuantity(b?.id ?? '') ? 1 : 0;

		const aLowestPriceWithVat = a.bundlePrices.isDiscounted
			? a.bundlePrices.discountedPrice?.valueWithVat ?? 0
			: a.bundlePrices.basePrice.valueWithVat;

		const bLowestPriceWithVat = b.bundlePrices.isDiscounted
			? b.bundlePrices.discountedPrice?.valueWithVat ?? 0
			: b.bundlePrices.basePrice.valueWithVat;

		const aAvailableQuantity = getQuantity(a?.id ?? '') ?? 0;
		const bAvailableQuantity = getQuantity(b?.id ?? '') ?? 0;

		return (
			// Sort by purchaseability (temporary unavailable/gift goes down the list)
			aPurchasability - bPurchasability ||
			// Sort by availability
			bAvailability - aAvailability ||
			// Sort by price
			aLowestPriceWithVat - bLowestPriceWithVat ||
			// Sort by available quantity
			bAvailableQuantity - aAvailableQuantity
		);
	});

	const cheapestAvailableBundle = bundlesSortedByAvailabilityAndPrice[0];

	const {
		shortVariety: bundleProducerName,
		varietyUrl: bundleProducerUrl,
		component: bundleFlag,
	} = getFlagSpecification(bundle.specificationDetails ?? []);

	const isQuantityLoading = allBundles?.some(
		(bundle) => getQuantity(bundle?.id ?? '') === undefined
	);

	return (
		<div className={cx(styles.wrapper, getWrapperClassName(type))}>
			{bundle.images && (
				<div className={styles.imageContainer}>
					<img
						src={getBundleImage(bundle.images, IMAGE_SIZE_THUMB_208x240)}
						alt={getLocalizedValue(bundle.name) || '-'}
						className={styles.image}
					/>
				</div>
			)}
			<div className={styles.infoImageWrapper}>
				<div className={styles.info}>
					<span className={styles.name}>{getLocalizedValue(bundle.name)}</span>
					<BundleProducer
						flag={bundleFlag}
						name={bundleProducerName}
						url={bundleProducerUrl}
						className={styles.producer}
					/>
					<div className={styles.descriptionWrapper}>
						<p
							className={styles.description}
							dangerouslySetInnerHTML={{
								__html: getLocalizedValue(bundle.shortDescription),
							}}
						>
							{}
						</p>

						{!!sommelierRating && (
							<span className={styles.evaluation}>
								{t({ id: 'bundle.sommelierRating' })}: {sommelierRating}
							</span>
						)}
					</div>
				</div>
				<div className={styles.shopControlsWrapper}>
					<BundleItem
						key={cheapestAvailableBundle.id || 'lacheapest'}
						bundle={cheapestAvailableBundle}
						variant={BundleItemVariants.STANDARD}
						isQuantityLoading={isQuantityLoading}
						quantityBox={QuantityBoxVariants.DIRECT}
						standardQuantityBoxMethods={standardQuantityBoxMethods}
						displayBargainPriceBadge={false}
						hideSeller={true}
						className={styles.shopControls}
					/>
				</div>
			</div>
		</div>
	);
};

export default ProductCard;
