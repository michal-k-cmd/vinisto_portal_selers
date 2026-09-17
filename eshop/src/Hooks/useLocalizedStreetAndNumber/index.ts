import * as React from 'react';
import { get } from 'lodash-es';
import { LocalizationContext } from 'Services/LocalizationService';

const useLocalizedStreetAndNumber = () => {
	const localizationContext = React.useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();
	return React.useCallback(
		(address: Record<any, any>) => {
			const houseNumber = get(address, 'houseNumber', '');
			const houseNumberSuffix = houseNumber ? `/${houseNumber}` : '';
			return t(
				{ id: 'address.streetAndNumber' },
				{
					street: get(address, 'street', ''),
					landRegistryNumber: get(address, 'landRegistryNumber', ''),
					houseNumberSuffix,
				}
			);
		},
		[t]
	);
};

export default useLocalizedStreetAndNumber;
