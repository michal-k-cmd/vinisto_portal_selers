import { useQuery } from '@tanstack/react-query';

import {
	VinistoAuthDllModelsApiUserMerchant,
	VinistoHelperDllEnumsUserUserType,
} from '@/api-types/user-api';
import { UserApi } from '@/api-types/user-api';
import api from '@/api';

const useGetMerchants = ({
	userLoginHash,
	params,
}: {
	userLoginHash: string;
	params?: UserApi.UsersList.RequestParams;
}) => {
	return useQuery({
		queryKey: ['getMerchants', { userLoginHash, ...params }],
		queryFn: () =>
			api
				.get<UserApi.UsersList.ResponseBody>(`user-api/users`, {
					...params,
					SearchUsersTypes: VinistoHelperDllEnumsUserUserType.Merchant,
					userLoginHash,
				})
				.then((res) => res.users as VinistoAuthDllModelsApiUserMerchant[]),
	});
};

export default useGetMerchants;
