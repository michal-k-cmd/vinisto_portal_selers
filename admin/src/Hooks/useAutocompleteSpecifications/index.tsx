import { useCallback, useContext, useState } from 'react';
import { NotificationsContext } from 'Services/NotificationService';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import { AutocompleteOptionBase } from 'Components/Form/Components/AutocompleteAsync/interfaces';

import api from '@/api';
import { VinistoProductDllModelsApiSpecificationSpecificationsReturn } from '@/api-types/product-api';

interface useAutocompleteSpecificationsProps<T extends AutocompleteOptionBase> {
	mapOption?: (
		option: NonNullable<
			VinistoProductDllModelsApiSpecificationSpecificationsReturn['specifications']
		>[number]
	) => T;
	alreadyUsedSpecificationIds?: string[];
}

const useAutocompleteSpecifications = <T extends AutocompleteOptionBase>({
	mapOption,
	alreadyUsedSpecificationIds = [],
}: useAutocompleteSpecificationsProps<T>) => {
	const [autocompleteOptions, setAutocompleteOptions] = useState<T[]>([]);
	const notificationsContext = useContext(NotificationsContext);
	const getLocalizedValue = useLocalizedValue();

	const handleMapOption = useCallback(
		(
			option: NonNullable<
				VinistoProductDllModelsApiSpecificationSpecificationsReturn['specifications']
			>[number]
		): T => {
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
				.get<VinistoProductDllModelsApiSpecificationSpecificationsReturn>(
					'product-api/categories',
					{ SearchName, params }
				)
				.then((response) => {
					const filteredCategories =
						response?.specifications?.filter(
							(specification) =>
								!alreadyUsedSpecificationIds.includes(specification?.id ?? '')
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
		[alreadyUsedSpecificationIds, handleMapOption, notificationsContext]
	);

	return {
		autocompleteOptions,
		handleOnSearch,
	};
};

export default useAutocompleteSpecifications;
