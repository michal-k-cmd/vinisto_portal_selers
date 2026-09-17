import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { AuthenticationContext } from 'Services/AuthenticationService/context';

import { VinistoAuthDllModelsApiUserCompanyValidationReturn } from '@/api-types/user-api';
import api from '@/api';

const useVerifyCompanyCreditPayment = ({
	customerId,
}: {
	customerId: string | null | undefined;
}) => {
	const { loginHash: userLoginHash } = useContext(
		AuthenticationContext
	).vinistoUser;
	return useQuery({
		queryKey: [
			'verifyCompanyCreditPayment',
			customerId,
			{
				userLoginHash,
			},
		],
		queryFn: () =>
			api.get<VinistoAuthDllModelsApiUserCompanyValidationReturn>(
				`user-api/companies/${customerId}/verify-company-credit-payment`,
				{
					userLoginHash,
				}
			),
		enabled: !!(userLoginHash && customerId),
	});
};
export default useVerifyCompanyCreditPayment;
