import { useQuery } from '@tanstack/react-query';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { useContext } from 'react';

import { VinistoHelperDllEnumsCountryCode } from '@/api-types/product-api';
import { VinistoHelperDllEnumsCurrency } from '@/api-types/product-api';
import { VinistoHelperDllEnumsLanguage } from '@/api-types/product-api';
import { bundleAdapter } from '@/index';
import CarouselService from '@/product-service/carousel';

export const useSupplierBundlesCarousel = (
	bundleId: string,
	params: {
		Language?: VinistoHelperDllEnumsLanguage;
		Currency?: VinistoHelperDllEnumsCurrency;
		CountryOfSale?: VinistoHelperDllEnumsCountryCode;
		IsCache?: boolean;
	}
) => {
	const { priceLevel } = useContext(AuthenticationContext).vinistoUser;

	return useQuery({
		queryKey: ['supplier-bundles-carousel', bundleId, priceLevel, params],
		queryFn: async () => {
			return CarouselService.getSupplierBundlesCarousel(bundleId, {
				...params,
			})
				.then((result) =>
					Array.isArray(result)
						? result.map((bundle) =>
								bundleAdapter.fromApi(bundle, {
									currency:
										params?.Currency ?? VinistoHelperDllEnumsCurrency.CZK,
									customerPriceLevel: priceLevel,
								})
						  )
						: []
				)
				.catch(() => []);
		},
		enabled: !!bundleId,
	});
};
