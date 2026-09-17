import { useContext } from 'react';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import useGetCompanies from 'Hooks/Queries/useGetCompanies';
import { mapB2bCustomerToString } from 'Pages/UserDetail/helpers';

import { VinistoAuthDllModelsApiUserMerchant } from '@/api-types/user-api';

const B2bCustomerCell = ({
	merchant,
}: {
	merchant: VinistoAuthDllModelsApiUserMerchant;
}) => {
	const { loginHash: userLoginHash } = useContext(
		AuthenticationContext
	).vinistoUser;
	const { data: b2bCustomers } = useGetCompanies({ userLoginHash });

	return (
		// eslint-disable-next-line react/jsx-no-useless-fragment
		<>
			{merchant.companies?.map((id) => {
				const b2bCustomer = b2bCustomers?.find(
					(customer) => customer.id === id
				);
				return b2bCustomer ? (
					<div key={b2bCustomer.id}>{mapB2bCustomerToString(b2bCustomer)}</div>
				) : null;
			})}
		</>
	);
};

export default B2bCustomerCell;
