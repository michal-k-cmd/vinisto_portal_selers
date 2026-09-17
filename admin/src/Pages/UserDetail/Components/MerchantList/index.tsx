import { Link } from 'react-router-dom';
import DeleteIcon from 'Components/Icons/Delete';
import { confirmAlert } from 'react-confirm-alert';
import { LocalizationContext } from 'Services/LocalizationService';
import { useContext } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { NotificationsContext } from 'Services/NotificationService';

import { VinistoAuthDllModelsApiUserMerchant } from '@/api-types/user-api';
import api from '@/api';

const MerchantsList = ({
	merchants,
	companyId,
}: {
	merchants: VinistoAuthDllModelsApiUserMerchant[];
	companyId: string;
}) => {
	const t = useContext(LocalizationContext).useFormatMessage();
	const { loginHash: userLoginHash } = useContext(
		AuthenticationContext
	).vinistoUser;
	const queryClient = useQueryClient();
	const { handleShowErrorNotification, handleShowSuccessNotification } =
		useContext(NotificationsContext);

	const userQueryKey = ['user', companyId];

	const unAssignMerchantMutation = useMutation({
		mutationFn: (params: { merchantId: string }) =>
			api.patch(`user-api/companies/${companyId}/remove-merchant`, undefined, {
				merchantId: params.merchantId,
				userLoginHash,
			}),
		onSuccess: () => {
			handleShowSuccessNotification('admin.merchant.assign.success');
			queryClient.invalidateQueries(userQueryKey);
		},
		onError: () => {
			handleShowErrorNotification('admin.merchant.assign.error');
		},
	});

	const handleUnAssignMerchant = (
		merchant: VinistoAuthDllModelsApiUserMerchant
	) =>
		confirmAlert({
			title: `${t({
				id: 'admin.merchant.unAssign.label',
			})}`,
			message: `${t(
				{
					id: 'admin.merchant.unAssign.message',
				},
				{
					merchant: `${merchant.firstName} ${merchant.surname}`,
				}
			)}`,
			buttons: [
				{
					label: `${t({
						id: 'admin.yes',
					})}`,
					onClick: () =>
						unAssignMerchantMutation.mutate({ merchantId: merchant.id }),
				},
				{
					label: `${t({
						id: 'admin.no',
					})}`,
					onClick: () => null,
				},
			],
		});

	return (
		<ul className="bundle-detail__list mt-1 mb-2">
			{merchants.map((merchant) => (
				<li
					key={merchant.id}
					className="d-flex gap-1 align-items-center"
				>
					<Link
						to={`/merchant-detail/${merchant.id}`}
					>{`${merchant.firstName} ${merchant.surname}`}</Link>
					<button
						className="btn py-0 px-1"
						onClick={() => handleUnAssignMerchant(merchant)}
					>
						<DeleteIcon />
					</button>
				</li>
			))}
		</ul>
	);
};

export default MerchantsList;
