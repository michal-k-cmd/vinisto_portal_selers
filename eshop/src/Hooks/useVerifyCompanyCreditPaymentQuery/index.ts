import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { usePlatformContext } from 'Services/PlatformService';
import { AuthenticationContext } from 'Services/AuthenticationService/context';

import { VinistoAuthDllModelsApiUserCompanyValidationReturn } from '@/api-types/user-api';
import api from '@/api';

const useVerifyCompanyCreditPaymentQuery = () => {
	const { isB2b, customerId, getIsInAdminIframe } = usePlatformContext();
	const { vinistoUser } = useContext(AuthenticationContext);

	const isAdminIframe = getIsInAdminIframe();

	const companyId = isAdminIframe ? customerId : vinistoUser.id;

	return useQuery({
		queryKey: [
			'verifyCompanyCreditPayment',
			companyId,
			{
				userLoginHash: vinistoUser.loginHash,
			},
		],
		queryFn: () =>
			api.get<VinistoAuthDllModelsApiUserCompanyValidationReturn>(
				`user-api/companies/${companyId}/verify-company-credit-payment`,
				{
					userLoginHash: vinistoUser.loginHash,
				}
			),
		enabled: !!(isB2b && vinistoUser.loginHash && companyId),
	});
};

export default useVerifyCompanyCreditPaymentQuery;
