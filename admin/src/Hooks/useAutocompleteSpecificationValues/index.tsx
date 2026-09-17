import { useCallback, useContext, useState } from 'react';
import { NotificationsContext } from 'Services/NotificationService';
import { AutocompleteOptionBase } from 'Components/Form/Components/AutocompleteAsync/interfaces';

import api from '@/api';
import {
	VinistoProductDllModelsApiSpecificationComboSpecificationAllowedValuesReturn,
	VinistoProductDllModelsApiSpecificationSpecificationsReturn,
} from '@/api-types/product-api';

interface useAutocompleteSpecificationValuesProps<
	T extends AutocompleteOptionBase
> {
	specificationId: string;
	mapOption?: (
		option: NonNullable<
			VinistoProductDllModelsApiSpecificationSpecificationsReturn['specifications']
		>[number]
	) => T;
	alreadyUsedSpecificationIds?: string[];
}

const useAutocompleteSpecificationValues = <T extends AutocompleteOptionBase>({
	specificationId,
	mapOption,
	alreadyUsedSpecificationIds = [],
}: useAutocompleteSpecificationValuesProps<T>) => {
	const [autocompleteOptions, setAutocompleteOptions] = useState<T[]>([]);
	const notificationsContext = useContext(NotificationsContext);
	const [isLoading, setIsLoading] = useState(false);

	const handleMapOption = useCallback(
		(
			option: NonNullable<
				VinistoProductDllModelsApiSpecificationComboSpecificationAllowedValuesReturn['allowedValues']
			>[number]
		): T => {
			if (mapOption) {
				return mapOption(option);
			}

			return {
				value: option?.url || '',
				label: option.value || '',
			} as T;
		},
		[mapOption]
	);

	const handleOnSearch = useCallback(
		(SearchValue: string) => {
			setIsLoading(true);
			api
				.get<VinistoProductDllModelsApiSpecificationComboSpecificationAllowedValuesReturn>(
					`product-api/specifications/${specificationId}/GetSpecificationAllowedValues`,
					{ SearchValue }
				)
				.then((response) => {
					const filteredCategories =
						response?.allowedValues?.filter(
							(specification) =>
								!alreadyUsedSpecificationIds.includes(
									specification?.value ?? ''
								)
						) || [];

					const formatteCategories = filteredCategories.map((category) =>
						handleMapOption(category)
					);

					setAutocompleteOptions(formatteCategories);
				})
				.catch((error) => {
					notificationsContext.handleShowErrorNotification(error.message);
					setAutocompleteOptions([]);
				})
				.finally(() => {
					setIsLoading(false);
				});
		},
		[
			alreadyUsedSpecificationIds,
			handleMapOption,
			notificationsContext,
			specificationId,
		]
	);

	return {
		autocompleteOptions,
		handleOnSearch,
		isLoading,
	};
};

export default useAutocompleteSpecificationValues;
