import { useCallback, useContext, useState } from 'react';
import { NotificationsContext } from 'Services/NotificationService';
import { AutocompleteBundleOption } from 'Components/Form/Components/AutocompleteBundle/interfaces';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import { LocalizationContext } from 'Services/LocalizationService';

import api from '@/api';
import { bundleAdapter } from '@/index';
import { ProductApi } from '@/api-types/product-api';
import { B2B_NUMERIC_CODE, B2C_NUMERIC_CODE } from '@/shared';

type UseAutocompleteBundlesProps = {
	alreadyUsedBundleIds?: string[];
};

const AUTOCOMPLETE_LIMIT = 100;

const DEFAULT_PARAMS = {
	limit: AUTOCOMPLETE_LIMIT,
	isDeleted: false,
	isGift: false,
	filterPrices: false,
	isSaleOver: false,
};

const setApiKeyForRequestedPlatform = (platform?: number) => {
	if (platform === B2C_NUMERIC_CODE)
		return import.meta.env.VITE_INTEGRATIONS_API_KEY_B2C;
	if (platform === B2B_NUMERIC_CODE)
		return import.meta.env.VITE_INTEGRATIONS_API_KEY_B2B;
	return import.meta.env.VITE_INTEGRATIONS_API_KEY;
};

/**
 * @param alreadyUsedBundleIds list of bundleId that should be excluded from autocomplete options
 */
const useAutocompleteBundles = ({
	alreadyUsedBundleIds = [],
}: UseAutocompleteBundlesProps) => {
	const [autocompleteOptions, setAutocompleteOptions] = useState<
		AutocompleteBundleOption[]
	>([]);
	const notificationsContext = useContext(NotificationsContext);
	const localizationContext = useContext(LocalizationContext);
	const getLocalizedValue = useLocalizedValue();
	const {
		activeCurrency: { currency },
	} = localizationContext;

	const handleOnSearch = useCallback(
		(
			searchText: string,
			params: Partial<ProductApi.BundlesGetAutocompleteNamesList.RequestQuery> = {},
			platform?: number
		) => {
			api
				.get<
					ProductApi.BundlesGetAutocompleteNamesList.ResponseBody,
					ProductApi.BundlesGetAutocompleteNamesList.RequestQuery
				>(
					`product-api/bundles/get-autocomplete-names`,
					{
						...DEFAULT_PARAMS,
						...params,
						searchingNameString: searchText,
					},
					{
						headers: {
							['X-Api-Key']: setApiKeyForRequestedPlatform(platform),
						},
					}
				)
				.then((response) => {
					const bundles =
						response?.bundles?.filter(
							(bundle) => !alreadyUsedBundleIds.includes(bundle?.id ?? '')
						) || [];

					const formattedBundles = bundles.map((bundle) => {
						const { bundlePrices } = bundleAdapter.fromApi(bundle, {
							currency,
						});
						return {
							bundle: {
								...bundle,
							},
							standardPrice: bundlePrices.basePrice.value,
							discountPrice: bundlePrices.discountedPrice?.value ?? 0,
							value: bundle?.id || '',
							label: getLocalizedValue(bundle?.name || []),
						};
					});

					setAutocompleteOptions(formattedBundles);
				})
				.catch(() => {
					notificationsContext.handleShowErrorNotification(
						'admin.modal.addBundleToHomePageCustomCarousel.autocomplete.error'
					);
					setAutocompleteOptions([]);
				});
		},
		[alreadyUsedBundleIds, getLocalizedValue, notificationsContext, currency]
	);

	return {
		autocompleteOptions,
		handleOnSearch,
	};
};

export default useAutocompleteBundles;
