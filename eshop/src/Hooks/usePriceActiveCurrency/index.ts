import { find, get } from 'lodash-es';
import * as React from 'react';
import { LocalizationContext } from 'Services/LocalizationService';
import { VinistoHelperDllEnumsCurrency } from 'vinisto_api_client/src/api-types/product-api';

const FALLBACK_CURRENCY = VinistoHelperDllEnumsCurrency.CZK;

const usePriceActiveCurrency = () => {
	const localizationContext = React.useContext(LocalizationContext);
	return React.useCallback(
		(list: Record<any, any>[]) => {
			const activeCurrency = get(
				localizationContext,
				'activeCurrency.currency',
				FALLBACK_CURRENCY
			);
			return find(
				list,
				(price: Record<any, any>) =>
					get(price, 'currency', FALLBACK_CURRENCY) === activeCurrency
			);
		},
		[localizationContext]
	);
};

export default usePriceActiveCurrency;
