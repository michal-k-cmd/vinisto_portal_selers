import { useQuery } from '@tanstack/react-query';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { IPageListTableRow } from 'Hooks/useAdminTable/interfaces';

import api from '@/api';
import { VinistoAuthDllModelsApiUserUserReturn } from '@/api-types/user-api';

const UserCell = ({ row }: { row: IPageListTableRow }) => {
	const { loginHash: userLoginHash } = useContext(
		AuthenticationContext
	).vinistoUser;
	const userId = row.userId;
	const { data: user } = useQuery(
		['user-by-id', userId],
		async () =>
			await api
				.get<VinistoAuthDllModelsApiUserUserReturn>(
					`user-api/users/${userId}`,
					{
						userLoginHash,
					}
				)
				.then((res) => res.user)
				.catch(() => userId),
		{
			enabled: !!userId,
		}
	);

	if (!user) return null;

	return <Link to={`/user-detail/${userId}`}>{user.email}</Link>;
};

export default UserCell;
