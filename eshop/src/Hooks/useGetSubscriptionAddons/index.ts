import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { useContext } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';

import api, { BaseResponse } from '@/api';
import {
	AddonResponse,
	AddonsListParams,
	AddonsResponse,
	AddonType,
} from '@/api-types/addons-api';

const useGetSubscriptionAddons = ({
	options = {},
	params = {},
}: {
	options?: Omit<
		| UseQueryOptions<
				{
					monthlySubscription: AddonResponse | undefined;
					yearlySubscription: AddonResponse | undefined;
				},
				unknown,
				{
					monthlySubscription: AddonResponse | undefined;
					yearlySubscription: AddonResponse | undefined;
				}
		  >
		| undefined,
		'queryKey' | 'queryFn'
	>;
	params?: AddonsListParams;
} = {}) => {
	const {
		countryOfSale,
		activeCurrency: { currency },
	} = useContext(LocalizationContext);

	return useQuery<{
		monthlySubscription: AddonResponse | undefined;
		yearlySubscription: AddonResponse | undefined;
	}>({
		...options,
		queryKey: ['subscriptionAddons', { countryOfSale, currency, ...params }],
		queryFn: async () => {
			const response = await api.get<AddonsResponse & BaseResponse>(
				`addons-api/Addons`,
				{
					Types: [AddonType.SubscriptionMonth, AddonType.SubscriptionYear],
					CountryOfSale: countryOfSale,
					Currency: currency,
					IsCache: true,
					...params,
				}
			);

			const addons = response.addons ?? [];

			return {
				monthlySubscription: addons.find(
					(addon) => addon.type === AddonType.SubscriptionMonth
				),
				yearlySubscription: addons.find(
					(addon) => addon.type === AddonType.SubscriptionYear
				),
			};
		},
	});
};

export default useGetSubscriptionAddons;
