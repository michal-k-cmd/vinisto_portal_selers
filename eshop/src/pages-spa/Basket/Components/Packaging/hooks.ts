import { BundleService } from 'vinisto_api_client';
import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';
import { bundleAdapter } from 'vinisto_api_client/src/index';
import { Bundle } from 'vinisto_api_client/src/domain/bundle';
import useAddons from 'Hooks/useAddons';
import { useIsB2b } from 'Services/PlatformService';
import {
	B2B_NUMERIC_CODE,
	B2C_NUMERIC_CODE,
} from 'vinisto_api_client/src/shared';
import { AuthenticationContext } from 'Services/AuthenticationService/context';

export const PACKAGING_BUNDLE_ID = '6728bbd7e360c3401c85a378';

export const useShippingPackaging = () => {
	const isB2b = useIsB2b();
	const platformId = isB2b ? B2B_NUMERIC_CODE : B2C_NUMERIC_CODE;
	const { activeCurrency, countryOfSale } = useContext(LocalizationContext);
	const { basketAddonsQuery } = useAddons();
	const { priceLevel: customerPriceLevel } = useContext(
		AuthenticationContext
	).vinistoUser;

	return useQuery<(Bundle & { addonId: string })[]>({
		queryKey: [
			'packaging-bundles',
			activeCurrency.currency,
			countryOfSale,
			platformId,
			basketAddonsQuery.data,
		],
		queryFn: async () => {
			const { packagingAddons } = basketAddonsQuery.data ?? {};

			const { bundles: packagingBundles } =
				await BundleService.getPackagingBundles({
					countryOfSale,
					currency: activeCurrency.currency,
				});
			if (!packagingBundles) return [];

			const data = packagingAddons
				?.map((addon) => {
					const bundleId =
						addon.actions?.[0] &&
						'itemId' in addon.actions[0] &&
						addon.actions?.[0]?.itemId;
					const bundle = packagingBundles.find((b) => b.id === bundleId);
					if (!bundle) return null;
					return {
						...(bundleAdapter.fromApi(bundle, {
							currency: activeCurrency.currency,
							platformId,
							customerPriceLevel,
						}) as Bundle),
						addonId: addon.id,
					};
				})
				.filter(Boolean) as (Bundle & { addonId: string })[];

			return data;
		},
		enabled: !!basketAddonsQuery.data,
		keepPreviousData: true,
	});
};
