import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { usePlatformContext } from 'Services/PlatformService';

import api from '@/api';
import { VinistoHelperDllEnumsUserUserType } from '@/api-types/product-api';
import {
	VinistoAuthDllModelsApiUserCompany,
	VinistoAuthDllModelsApiUserUserReturn,
} from '@/api-types/user-api';

const useGetB2bCustomer = ({ customerId }: { customerId?: string | null }) => {
	const { getIsInAdminIframe } = usePlatformContext();
	const { vinistoUser } = useContext(AuthenticationContext);
	const { loginHash: userLoginHash, id: userId } = vinistoUser;

	const companyId = getIsInAdminIframe() ? customerId : vinistoUser.id;

	const isUserSupportRole =
		vinistoUser.canCreateOrderAsSupport &&
		!vinistoUser.canCreateOrderAsMerchant;
	const isCSORole = vinistoUser.canCreateOrderAsCSO;

	return useQuery({
		queryKey: ['getCustomerById', { customerId, userLoginHash, userId }],
		queryFn: () =>
			api
				.get<VinistoAuthDllModelsApiUserUserReturn>(
					`user-api/users/${companyId}`,
					{
						userLoginHash,
						SearchUsersTypes: VinistoHelperDllEnumsUserUserType.Company,
						...(!(isUserSupportRole || isCSORole) && {
							// Merchant can see and select only his assigned companies
							SearchCompaniesByMerchantId: userId,
						}),
					}
				)
				.then(
					(response) => response.user as VinistoAuthDllModelsApiUserCompany
				),
		enabled: !!(companyId && userLoginHash),
	});
};

export default useGetB2bCustomer;
