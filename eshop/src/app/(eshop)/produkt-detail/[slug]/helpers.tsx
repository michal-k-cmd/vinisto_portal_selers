'use client';

import { useContext, useEffect } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';
import { WarehouseContext } from 'Services/WarehouseService';
import { DocumentHeaderContext } from 'Components/DocumentHeader/context';
import { bundleAdapter } from 'vinisto_api_client/src/index';
import { useGetDiscountCoupons } from 'pages-spa/Bundle/hooks';
import useIdenticalBundles from 'Hooks/Queries/useIdenticalBundles';
import { useBundleCarousels } from 'Hooks/Queries/useBundleCarousels';
import { useSupplierBundlesCarousel } from 'Hooks/Queries/useSupplierBundlesCarousel';
import { useBundleMeta } from 'pages-spa/Bundle/hooks/use-bundle-detail';
import { useIsB2b } from 'Services/PlatformService';
import { AuthenticationContext } from 'Services/AuthenticationService/context';

import { Bundle } from '@/domain/bundle';
import {
	VinistoHelperDllEnumsCountryCode,
	VinistoHelperDllEnumsCurrency,
	VinistoProductDllModelsApiBundleBundle,
} from '@/api-types/product-api';

// Side effect hook for loading warehouse data
export const useBundleEnrichment = (
	bundleData: VinistoProductDllModelsApiBundleBundle
) => {
	const isB2b = useIsB2b();
	const localizationContext = useContext(LocalizationContext);
	const { dispatch: _dispatch } = useContext(DocumentHeaderContext);
	const { fetchQuantity } = useContext(WarehouseContext);
	const currency = localizationContext.activeCurrency.currency;
	const countryOfSale = localizationContext.countryOfSale;
	const { priceLevel } = useContext(AuthenticationContext).vinistoUser;
	const bundle = bundleAdapter.fromApi(bundleData, {
		currency: currency as VinistoHelperDllEnumsCurrency,
		customerPriceLevel: priceLevel,
	});

	const { data: identicalBundles } = useIdenticalBundles(bundle.id, {
		countryOfSale,
		currency,
		IsCache: true,
	});

	const { data: bundleCarouselsData } = useBundleCarousels(bundle.id, {
		Currency: currency,
		CountryOfSale: countryOfSale,
	});

	const { data: supplierBundlesCarouselData } = useSupplierBundlesCarousel(
		bundle.id,
		{
			Currency: currency,
			CountryOfSale: countryOfSale,
		}
	);

	// TODO use prefetchQuery for this?
	useGetDiscountCoupons({
		bundleId: bundle.id,
		currency: currency as VinistoHelperDllEnumsCurrency,
		countryOfSale: countryOfSale as VinistoHelperDllEnumsCountryCode,
		isB2b,
	});

	useEffect(() => {
		const extractIds = (
			bundles: VinistoProductDllModelsApiBundleBundle[] | Bundle[] | undefined
		) => {
			if (!Array.isArray(bundles)) return [];
			return bundles
				.map((bundle) => bundle.id)
				.filter((id): id is string => Boolean(id));
		};

		if (!bundleCarouselsData) return;

		const allIds = [
			bundle.id,
			...extractIds(bundleCarouselsData.similarBundles ?? []),
			...extractIds(bundleCarouselsData.manufacturerBundles ?? []),
			...extractIds(bundleCarouselsData.lastViewedBundles ?? []),
			...extractIds(supplierBundlesCarouselData ?? []),
			...(Array.isArray(identicalBundles)
				? identicalBundles.map((bundle) => bundle.id)
				: []),
		].filter((id): id is string => Boolean(id));

		if (allIds.length > 0) {
			fetchQuantity(allIds);
		}
	}, [bundleCarouselsData, identicalBundles, fetchQuantity]);
};

export const useBundleMetadata = (
	bundleData: VinistoProductDllModelsApiBundleBundle
) => {
	const localizationContext = useContext(LocalizationContext);
	const currency = localizationContext.activeCurrency.currency;
	const { priceLevel } = useContext(AuthenticationContext).vinistoUser;

	const bundle = bundleAdapter.fromApi(bundleData, {
		currency: currency as VinistoHelperDllEnumsCurrency,
		customerPriceLevel: priceLevel,
	});

	const sortedBundleImagesInOriginalFormatAndResolution =
		bundle?.images
			?.sort((a) => (a.isMain ? -1 : 1))
			.map((image) => ({
				src: image?.domainUrls?.original_png ?? '',
			})) ?? [];

	const bundleMeta = useBundleMeta(bundle);

	return {
		sortedBundleImagesInOriginalFormatAndResolution,
		bundleMeta,
	};
};
