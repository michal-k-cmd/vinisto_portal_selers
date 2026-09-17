import useGetMerchants from 'Hooks/Queries/useGetMerchants';
import { useContext } from 'react';
import { AuthenticationContext } from 'Services/AuthenticationService/context';

import { VinistoAuthDllModelsApiUserCompany } from '@/api-types/user-api';

const MerchatCell = ({
	company,
}: {
	company: VinistoAuthDllModelsApiUserCompany;
}) => {
	const { loginHash: userLoginHash } = useContext(
		AuthenticationContext
	).vinistoUser;
	const { data: merchants } = useGetMerchants({ userLoginHash });

	return (
		// eslint-disable-next-line react/jsx-no-useless-fragment
		<>
			{company.users?.map((user) => {
				const merchant = merchants?.find(
					(merchant) => merchant.id === user.userId
				);
				return merchant ? (
					<div
						key={merchant.id}
					>{`${merchant.firstName} ${merchant.surname}`}</div>
				) : null;
			})}
		</>
	);
};

export default MerchatCell;
