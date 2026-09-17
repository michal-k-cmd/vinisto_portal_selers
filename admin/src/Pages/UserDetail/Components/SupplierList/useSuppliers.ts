import { useContext, useEffect, useState } from 'react';
import { get } from 'Helpers/lodash';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import ApiService from 'Services/ApiService';

import { mapResponseToUserSuppliers } from './mapper';
import { Supplier } from './types';

const useSuppliers = () => {
	const authenticationContext = useContext(AuthenticationContext);

	const [suppliers, setSuppliers] = useState<Supplier[]>([]);
	const [refreshKey, setRefreshKey] = useState<number>(0);

	const loginHash = get(authenticationContext, 'vinistoUser.loginHash', '');

	useEffect(() => {
		new ApiService()
			.getCollection(
				'supplier-api/suppliers',
				[
					{ key: 'UserLoginHash', value: loginHash },
					{ key: 'Limit', value: 0 },
				],
				true
			)
			.then((response: unknown) => {
				const userSuppliers = mapResponseToUserSuppliers(response);
				setSuppliers(userSuppliers);
			})
			.catch((error: unknown) => {
				setSuppliers([]);
				// eslint-disable-next-line no-console
				console.error('Error fetching user supplier data:', error);
			});
	}, [loginHash, refreshKey]);

	return {
		suppliers,
		refreshSuppliers: () => setRefreshKey((prevKey) => prevKey + 1),
	};
};

export default useSuppliers;
