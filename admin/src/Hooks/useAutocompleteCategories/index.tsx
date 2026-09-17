import { useCallback, useContext, useState } from 'react';
import { NotificationsContext } from 'Services/NotificationService';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import { AutocompleteOptionBase } from 'Components/Form/Components/AutocompleteAsync/interfaces';

import api from '@/api';
import {
	VinistoProductDllModelsApiCategoryCategoriesReturn,
	VinistoProductDllModelsApiCategoryCategory,
} from '@/api-types/product-api';

interface useAutocompleteCategoriesProps<T extends AutocompleteOptionBase> {
	mapOption?: (option: VinistoProductDllModelsApiCategoryCategory) => T;
	alreadyUsedCategoryIds?: string[];
}

const useAutocompleteCategories = <T extends AutocompleteOptionBase>({
	mapOption,
	alreadyUsedCategoryIds = [],
}: useAutocompleteCategoriesProps<T>) => {
	const [autocompleteOptions, setAutocompleteOptions] = useState<T[]>([]);
	const notificationsContext = useContext(NotificationsContext);
	const getLocalizedValue = useLocalizedValue();

	const handleMapOption = useCallback(
		(option: VinistoProductDllModelsApiCategoryCategory): T => {
			if (mapOption) {
				return mapOption(option);
			}

			return {
				value: option?.id || '',
				label: getLocalizedValue(option?.name) || '',
			} as T;
		},
		[getLocalizedValue, mapOption]
	);

	const handleOnSearch = useCallback(
		(SearchName: string, params = {}) => {
			api
				.get<VinistoProductDllModelsApiCategoryCategoriesReturn>(
					'product-api/categories',
					{ SearchName, params }
				)
				.then((response) => {
					const filteredCategories =
						response?.categories?.filter(
							(bundle) => !alreadyUsedCategoryIds.includes(bundle?.id ?? '')
						) || [];

					const formatteCategories = filteredCategories.map((category) =>
						handleMapOption(category)
					);

					setAutocompleteOptions(formatteCategories);
				})
				.catch((error) => {
					notificationsContext.handleShowErrorNotification(error.message);
					setAutocompleteOptions([]);
				});
		},
		[alreadyUsedCategoryIds, handleMapOption, notificationsContext]
	);

	return {
		autocompleteOptions,
		handleOnSearch,
	};
};

export default useAutocompleteCategories;
