import { useCallback, useContext } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import UserService from 'Services/UserService';
import { IAccountUpdateData } from 'Services/UserService/interfaces';

import { getUserByIdQueryFn, getUserByIdQueryKey } from './use-get-user-by-id';

import User from '@/domain/user';
import {
	UserApi,
	VinistoAuthDllModelsApiUserCompany,
	VinistoHelperDllEnumsUserUserType,
} from '@/api-types/user-api';

const useUpdateAccount = () => {
	const { vinistoUser } = useContext(AuthenticationContext);
	const queryClient = useQueryClient();

	const { id, loginHash, email, type } = vinistoUser;

	const updateCompany = useCallback(
		async (data: IAccountUpdateData): Promise<User> => {
			const queryKey = getUserByIdQueryKey(id, loginHash);

			const company = (await queryClient.fetchQuery({
				queryKey,
				queryFn: getUserByIdQueryFn(id, loginHash),
			})) as VinistoAuthDllModelsApiUserCompany;

			const payload = {
				...company,
				userLoginHash: loginHash,
				email: data.email ?? company.email,
				nickname: data.nickname ?? company.nickname,
				isNewsletterActive:
					data.isNewsletterActive ?? company.isNewsletterActive,
				isAgreementCC: data.isAgreementCC ?? company.isAgreementCC,
			} as UserApi.CompaniesUpdate.RequestBody & { userLoginHash: string };

			const { user, vinistoUser: updatedUser } =
				await UserService.updateCompany(id ?? '', payload);

			queryClient.setQueryData(queryKey, user);

			return updatedUser;
		},
		[id, loginHash, queryClient]
	);

	return useCallback(
		(data: IAccountUpdateData): Promise<User> => {
			if (type === VinistoHelperDllEnumsUserUserType.Company)
				return updateCompany(data);

			return UserService.update(id ?? '', {
				userLoginHash: loginHash,
				email: data.email ?? email ?? '',
				nickname: data.nickname,
				isNewsletterActive: data.isNewsletterActive,
				isAgreementCC: data.isAgreementCC,
			});
		},
		[type, updateCompany, id, loginHash, email]
	);
};

export default useUpdateAccount;
