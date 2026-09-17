import { useCallback, useContext, useState } from 'react';
import { get, map } from 'Helpers/lodash';
import { apiServiceInstance } from 'Services/ApiService';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { NotificationsContext } from 'Services/NotificationService';
import { AutocompleteOption } from 'Components/Form/Components/AutocompleteAsync/interfaces';

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

			apiServiceInstance
				.getCollection(
					'order-api/discount-coupons',
					[
						{ key: 'userLoginHash', value: loginHash },
						{ key: 'limit', value: 20 },
						{ key: 'offset', value: 0 },
						{ key: 'SearchCode', value: searchText },
					],
					true
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
