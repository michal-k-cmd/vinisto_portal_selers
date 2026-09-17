'use client';

import { useContext } from 'react';
import { Bundle } from 'vinisto_api_client/src/domain/bundle';
import { AuthenticationContext } from 'Services/AuthenticationService/context';

import { VinistoHelperDllEnumsPriceLevel } from '@/api-types/product-api';

export const useGetSetBundles = ({ bundle }: { bundle: Bundle | null }) => {
	const { priceLevel: userPriceLevel } =
		useContext(AuthenticationContext).vinistoUser ?? {};

	if (!bundle) return [];

	const setBundles =
		bundle.setBundles?.map((setBundle) => {
			const items = bundle.items.filter(
				(item) => item.productId === setBundle.id
			);

			const shouldShowVinistoPlusPrice =
				userPriceLevel === VinistoHelperDllEnumsPriceLevel.VinistoPlus &&
				'vinistoPlusSetItemPrices' in bundle.bundlePrices;

			return {
				...setBundle,
				setItems: items.map((item) => ({
					...item,
					...('id' in item && item.id
						? {
								originalPrice:
									bundle.bundlePrices[
										shouldShowVinistoPlusPrice
											? 'vinistoPlusSetItemPrices'
											: 'setItemsPrices'
									]?.[item.id]?.originalPrice,
								setPrice:
									bundle.bundlePrices[
										shouldShowVinistoPlusPrice
											? 'vinistoPlusSetItemPrices'
											: 'setItemsPrices'
									]?.[item.id]?.setPrice,
						  }
						: {}),
				})),
			};
		}) ?? [];

	return setBundles;
};
