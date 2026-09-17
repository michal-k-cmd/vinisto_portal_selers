import getBundleImage, {
	IMAGE_SIZE_THUMB_368x490,
} from 'Helpers/getBundleImage';
import purgeHTML from 'Helpers/purgeHTML';
import { getLocalizedValue } from 'Hooks/useLocalizedValue';
import { useMemo } from 'react';
import { Bundle } from 'vinisto_api_client/src/domain/bundle';

import { VinistoProductDllModelsApiBundleBundle } from '@/api-types/product-api';

export const useBundleMeta = (bundle: Bundle | null) => {
	const bundleName = getLocalizedValue(bundle?.name ?? []);
	const bundleShortDescription = getLocalizedValue(
		bundle?.shortDescription ?? []
	);
	const bundleDescription = getLocalizedValue(bundle?.description ?? []);
	const bundleMetaDescription =
		purgeHTML(getLocalizedValue(bundle?.metaDescription ?? [])) ||
		purgeHTML(bundleDescription);
	const bundleUrl = getLocalizedValue(bundle?.url ?? []);
	const bundleImageSmall = getBundleImage(
		bundle?.images ?? [],
		IMAGE_SIZE_THUMB_368x490
	);

	return useMemo(
		() => ({
			bundleName,
			bundleShortDescription,
			bundleDescription,
			bundleMetaDescription,
			bundleImageSmall,
			bundleUrl,
		}),
		[
			bundleName,
			bundleShortDescription,
			bundleDescription,
			bundleMetaDescription,
			bundleImageSmall,
			bundleUrl,
		]
	);
};

export const getBundleMetaServerSide = (
	bundle: VinistoProductDllModelsApiBundleBundle | null
) => {
	const bundleName = getLocalizedValue(bundle?.name ?? []);
	const bundleShortDescription = getLocalizedValue(
		bundle?.shortDescription ?? []
	);
	const bundleDescription = getLocalizedValue(bundle?.description ?? []);
	const bundleMetaDescription =
		purgeHTML(getLocalizedValue(bundle?.metaDescription ?? [])) ||
		purgeHTML(bundleDescription);
	const bundleUrl = getLocalizedValue(bundle?.url ?? []);
	const bundleImageSmall = getBundleImage(
		bundle?.images ?? [],
		IMAGE_SIZE_THUMB_368x490
	);

	return {
		bundleName,
		bundleShortDescription,
		bundleDescription,
		bundleMetaDescription,
		bundleImageSmall,
		bundleUrl,
	};
};
