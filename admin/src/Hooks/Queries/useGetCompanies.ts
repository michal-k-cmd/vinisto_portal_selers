import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import {
	VinistoAuthDllModelsApiUserCompany,
	VinistoHelperDllEnumsUserUserType,
} from '@/api-types/user-api';
import { UserApi } from '@/api-types/user-api';
import api from '@/api';

const useGetCompanies = (
	{
		userLoginHash,
		params,
	}: {
		userLoginHash: string;
		params?: UserApi.UsersList.RequestParams;
	},
	options: UseQueryOptions<VinistoAuthDllModelsApiUserCompany[]> = {}
) => {
	return useQuery({
		queryKey: ['getCompanies', { userLoginHash, ...params }],
		queryFn: () =>
			api
				.get<UserApi.UsersList.ResponseBody>(`user-api/users`, {
					...params,
					SearchUsersTypes: VinistoHelperDllEnumsUserUserType.Company,
					userLoginHash,
				})
				.then((res) => res.users as VinistoAuthDllModelsApiUserCompany[]),
		...options,
	});
};

export default useGetCompanies;
