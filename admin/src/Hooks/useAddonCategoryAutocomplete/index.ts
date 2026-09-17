import { useCallback, useContext, useState } from 'react';
import { get, map } from 'Helpers/lodash';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { NotificationsContext } from 'Services/NotificationService';
import { AutocompleteOption } from 'Components/Form/Components/AutocompleteAsync/interfaces';

import api from '@/api';
import { VinistoProductDllModelsApiCategoryCategoriesReturn } from '@/api-types/product-api';

const useAddonCategoryAutocomplete = () => {
	const [autocompleteOptions, setAutocompleteOptions] = useState<
		AutocompleteOption[]
	>([]);
	const getLocalizedValue = useLocalizedValue();
	const { vinistoUser } = useContext(AuthenticationContext);
	const notificationsContext = useContext(NotificationsContext);

	const handleOnSearch = useCallback(
		(searchText: string) => {
			const loginHash = vinistoUser?.loginHash ?? '';

			if (!searchText) {
				setAutocompleteOptions([]);
				return;
			}

			api
				.get<VinistoProductDllModelsApiCategoryCategoriesReturn>(
					'product-api/categories',
					{
						userLoginHash: loginHash,
						//type: 'STATIC',
						searchName: searchText,
					}
				)
				.then((payload: Record<any, any>) => {
					const preparedCategories = map(
						get(payload, 'categories', []),
						(category: Record<any, any>) => ({
							value: get(category, 'id'),
							label: getLocalizedValue(get(category, 'name')),
						})
					);
					setAutocompleteOptions(preparedCategories);
				})
				.catch(() => {
					notificationsContext.handleShowErrorNotification(
						'admin.modal.addCategoryToBundle.autocomplete.error'
					);
					setAutocompleteOptions([]);
				});
		},
		[getLocalizedValue, notificationsContext, vinistoUser]
	);

	return {
		autocompleteOptions,
		handleOnSearch,
	};
};

export default useAddonCategoryAutocomplete;
