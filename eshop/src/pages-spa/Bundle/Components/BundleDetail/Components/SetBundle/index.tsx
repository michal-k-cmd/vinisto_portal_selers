import { useStringifySetBundleParams } from 'pages-spa/Bundle/hooks';
import { DiscountPercentage, SetItem } from 'vinisto_ui';
import BundleInfoParams from 'pages-spa/Bundle/Components/BundleDetail/Components/BundleInfoParams';
import { BundleDataBundle } from 'Services/Bundle/interfaces';
import { useContext } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';
import { useBundleMeta } from 'pages-spa/Bundle/hooks/use-bundle-detail';
import { useIsB2b } from 'Services/PlatformService';
import { AuthenticationContext } from 'Services/AuthenticationService/context';

/**
 * Threshold for determining if there is a meaningful price difference between original and discounted prices
 */
const PRICE_DIFFERENCE_THRESHOLD = 0.01;

const SetBundle = (set_data: BundleDataBundle) => {
	const isB2b = useIsB2b();
	const { isLoggedIn } = useContext(AuthenticationContext);
	const getBundleSetParamsShort = useStringifySetBundleParams;

	const { bundleName, bundleDescription, bundleImageSmall } =
		useBundleMeta(set_data);

	const bundleImage =
		(set_data?.images ?? []).find((image) => image.isMain) ??
		set_data?.images?.[0];

	const bundle_set_product = set_data;
	const activeCurrency = useContext(LocalizationContext).activeCurrency;
	const currency = activeCurrency?.currency;

	const { basePrice, discountedPrice } = bundle_set_product.bundlePrices;

	const basePriceWithVat = Math.max(
		basePrice?.valueWithVat ?? 0,
		set_data.setItem?.originalPrice?.valueWithVat ?? 0
	);
	const basePriceWithoutVat = Math.max(
		basePrice?.value ?? 0,
		set_data.setItem?.originalPrice?.value ?? 0
	);

	const discountedOrBasePriceWithoutVat =
		discountedPrice?.value ?? basePrice?.value ?? 0;
	const discountedOrBasePriceWithVat =
		discountedPrice?.valueWithVat ?? basePrice?.valueWithVat ?? 0;

	const set_price_WithoutVat = Number(
		(set_data.setItem?.setPrice?.value ?? 0).toFixed(2)
	);
	const set_price = Number(
		(set_data.setItem?.setPrice?.valueWithVat ?? 0).toFixed(2)
	);

	const set_params_short = getBundleSetParamsShort(
		set_data.specificationDetails ?? []
	);

	const hasSetItemBundleDiscount =
		Math.abs(
			(basePriceWithVat ?? 0) - (set_data.setItem?.setPrice?.valueWithVat ?? 0)
		) > PRICE_DIFFERENCE_THRESHOLD;

	const hasSetItemSetDiscount =
		Math.abs(
			(set_data.setItem?.setPrice?.valueWithVat ?? 0) -
				discountedOrBasePriceWithVat
		) > PRICE_DIFFERENCE_THRESHOLD;

	const isSetItemDiscounted =
		(hasSetItemBundleDiscount || hasSetItemSetDiscount) &&
		new Set([set_price, basePriceWithVat, discountedOrBasePriceWithVat]).size >
			1;

	const getOriginalPrice = () => {
		if (isB2b) {
			return Math.min(discountedOrBasePriceWithoutVat, basePriceWithoutVat) <
				set_price_WithoutVat
				? null
				: isSetItemDiscounted
				? basePriceWithoutVat ?? discountedOrBasePriceWithoutVat
				: null;
		}
		return Math.min(discountedOrBasePriceWithVat, basePriceWithVat) < set_price
			? null
			: isSetItemDiscounted
			? basePriceWithVat ?? discountedOrBasePriceWithVat
			: null;
	};

	const canDisplayPrice = isB2b ? isLoggedIn : true;

	return (
		<SetItem
			imageUrl={bundleImageSmall}
			bundleImage={bundleImage}
			bundleName={bundleName}
			basicInfo={set_params_short}
			seller={bundle_set_product.supplier?.nameWeb ?? ''}
			canDisplayPrice={canDisplayPrice}
			price={isB2b ? set_price_WithoutVat : set_price}
			discountPercent={
				isSetItemDiscounted && (
					<DiscountPercentage
						discountedPriceWithVat={
							set_data.setItem?.setPrice?.valueWithVat ??
							discountedOrBasePriceWithVat
						}
						standardPriceWithVat={
							basePriceWithVat ?? discountedOrBasePriceWithVat
						}
					/>
				)
			}
			originalPrice={getOriginalPrice()}
			bundleInfo={bundleDescription}
			params={
				<BundleInfoParams
					bundleParams={bundle_set_product?.specificationDetails ?? []}
				/>
			}
			translations={{
				seller: 'prodejce',
				more: 'Více',
				less: 'Méně',
				currency,
			}}
		/>
	);
};
export default SetBundle;
