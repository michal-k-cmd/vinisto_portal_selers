import { useQuery } from '@tanstack/react-query';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { useContext } from 'react';

import api from '@/api';
import { UserApi } from '@/api-types/user-api';

export const getUserByIdQueryKey = (
	userId: string | null,
	userLoginHash: string | null
) => [`user-api/users/{userId}`, { userId, userLoginHash }];

export const getUserByIdQueryFn =
	(userId: string | null, userLoginHash: string | null) => () =>
		api
			.get<
				UserApi.UsersAuthList.ResponseBody,
				UserApi.UsersAuthList.RequestParams
			>(`user-api/users/${userId}`, { userLoginHash })
			.then((res) => {
				if (!res.user) throw new Error('No user in response');
				return res.user;
			});

const useGetUserById = () => {
	const { id: userId, loginHash: userLoginHash } = useContext(
		AuthenticationContext
	).vinistoUser;

	return useQuery({
		queryKey: getUserByIdQueryKey(userId, userLoginHash),
		queryFn: getUserByIdQueryFn(userId, userLoginHash),
		enabled: !!(userLoginHash && userId),
	});
};

export default useGetUserById;
