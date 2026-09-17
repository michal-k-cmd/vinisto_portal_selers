import Detail from 'Components/Detail';
import StatusBadge from 'Components/StatusBadge';
import EditIcon from 'Components/Icons/Edit';
import { LocalizationContext } from 'Services/LocalizationService';
import { useContext } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { NotificationsContext } from 'Services/NotificationService';
import { useQueryClient } from '@tanstack/react-query';

import {
	UserApi,
	VinistoAuthDllModelsApiUserMerchant,
	VinistoHelperDllEnumsUserUserState,
} from '@/api-types/user-api';
import api from '@/api';

const MerchantHeader = ({
	merchant,
}: {
	merchant: VinistoAuthDllModelsApiUserMerchant;
}) => {
	const { loginHash: userLoginHash } = useContext(
		AuthenticationContext
	).vinistoUser;
	const t = useContext(LocalizationContext).useFormatMessage();
	const { handleShowSuccessNotification, handleShowErrorNotification } =
		useContext(NotificationsContext);
	const queryClient = useQueryClient();
	const userQueryKey = ['user', merchant.id];

	const handleToggleActiveState = () => {
		const isActive =
			merchant.state === VinistoHelperDllEnumsUserUserState.Active;

		confirmAlert({
			title: `${t({
				id: isActive
					? 'admin.merchant.deactivate.title'
					: 'admin.merchant.activate.title',
			})}`,
			message: `${t({
				id: isActive
					? 'admin.merchant.deactivate.message'
					: 'admin.merchant.activate.message',
			})}`,
			buttons: [
				{
					label: `${t({
						id: 'admin.confirm.logOut.yes',
					})}`,
					onClick: () =>
						api
							.put<
								UserApi.MerchantsUpdate.ResponseBody,
								UserApi.MerchantsUpdate.RequestBody
							>(`user-api/merchants/${merchant.id}`, undefined, {
								userLoginHash,
								email: merchant.email,
								nickname: merchant.nickname,
								firstName: merchant.firstName,
								surname: merchant.surname,
								phone: merchant.phone,
								feePercentage: merchant.feePercentage,
								startDate: merchant.startDate,
								internalNote: merchant.internalNote,
								merchantRights: merchant.merchantRights,
								userState: isActive
									? VinistoHelperDllEnumsUserUserState.Inactive
									: VinistoHelperDllEnumsUserUserState.Active,
							})
							.then(() => {
								handleShowSuccessNotification(
									isActive
										? 'admin.merchant.deactivate.success'
										: 'admin.merchant.activate.success'
								);
								queryClient.invalidateQueries(userQueryKey);
							})
							.catch(() => {
								handleShowErrorNotification(
									isActive
										? 'admin.merchant.deactivate.error'
										: 'admin.merchant.activate.error'
								);
							}),
				},
				{
					label: `${t({
						id: 'admin.confirm.logOut.no',
					})}`,
					onClick: () => null,
				},
			],
		});
	};

	return (
		<Detail.Container>
			<div className="d-flex justify-content-between align-items-center">
				<div>
					<h1 className="fs-3">{`${merchant.firstName} ${merchant.surname}`}</h1>
					<h2 className="fs-6 fw-light">
						<a href={`mailto:${merchant.email}`}>{merchant.email}</a> |{' '}
						<a href={`tel:${merchant.phone}`}>
							{merchant.phone?.replace(/(\+?\d{3})/g, '$1 ')}
						</a>
					</h2>
				</div>
				{merchant.state && (
					<div className="d-flex align-items-center gap-1">
						<StatusBadge status={merchant.state}>
							{t({ id: `admin.b2bCustomer.state.${merchant.state}` })}
						</StatusBadge>
						<button
							className={'btn p-2 d-flex align-items-center'}
							onClick={handleToggleActiveState}
						>
							<EditIcon />
						</button>
					</div>
				)}
			</div>
		</Detail.Container>
	);
};

export default MerchantHeader;
