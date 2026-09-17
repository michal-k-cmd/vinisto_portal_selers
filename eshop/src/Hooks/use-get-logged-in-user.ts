import { useQuery } from '@tanstack/react-query';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { useContext } from 'react';

import api from '@/api';
import { UserApi } from '@/api-types/user-api';

const useGetLoggedInUser = () => {
	const { loginHash } = useContext(AuthenticationContext).vinistoUser;

	return useQuery({
		queryKey: [`user-api/users/auth`, loginHash],
		queryFn: () =>
			api
				.get<
					UserApi.UsersAuthList.ResponseBody,
					UserApi.UsersAuthList.RequestParams
				>(`user-api/users/auth`, { userLoginHash: loginHash })
				.then((res) => {
					if (!res.user) throw new Error('No user in response');
					return res.user;
				}),
		enabled: !!loginHash,
	});
};

export default useGetLoggedInUser;
