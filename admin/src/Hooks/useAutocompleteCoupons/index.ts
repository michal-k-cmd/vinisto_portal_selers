import { useCallback, useContext, useState } from 'react';
import { get, map } from 'Helpers/lodash';
import { apiServiceInstance } from 'Services/ApiService';
import { NotificationsContext } from 'Services/NotificationService';
import { AutocompleteOption } from 'Components/Form/Components/AutocompleteAsync/interfaces';

import { VinistoOrderDllModelsApiReturnDataDiscountCouponsReturn } from '@/api-types/order-api';

const useAutocompleteCoupons = () => {
	const [autocompleteOptions, setAutocompleteOptions] = useState<
		AutocompleteOption[]
	>([]);
	const notificationsContext = useContext(NotificationsContext);

	const handleOnSearch = useCallback(
		(searchText: string) => {
			if (!searchText) {
				setAutocompleteOptions([]);
				return;
			}

			apiServiceInstance
				.getCollection<VinistoOrderDllModelsApiReturnDataDiscountCouponsReturn>(
					'order-api/discount-coupons',
					[
						{ key: 'SearchCode', value: searchText },
						{ key: 'IsSearchCodeAutocomplete', value: true },
						{ key: 'Limit', value: 20 },
					],
					true
				)
				.then((payload) => {
					const preparedCoupons = map(
						get(payload, 'discountCoupons', []),
						(coupon) => ({
							value: get(coupon, 'id'),
							label: get(coupon, 'code', ''),
						})
					);
					setAutocompleteOptions(preparedCoupons as AutocompleteOption[]);
				})
				.catch(() => {
					notificationsContext.handleShowErrorNotification(
						'admin.createEditAddon.coupons.autocomplete.error'
					);
					setAutocompleteOptions([]);
				});
		},
		[notificationsContext]
	);

	return {
		autocompleteOptions,
		handleOnSearch,
	};
};

export default useAutocompleteCoupons;
