import * as React from 'react';
import { get, map } from 'Helpers/lodash';
import { confirmAlert } from 'react-confirm-alert';
import ApiService from 'Services/ApiService';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { NotificationsContext } from 'Services/NotificationService';
import { LocalizationContext } from 'Services/LocalizationService';
import { MdCategory } from 'react-icons/md';
import DeleteIcon from 'Components/Icons/Delete';

import './styles.css';
import { VinistoSupplierDllModelsApiSupplierSupplier } from '@/api-types/user-api';

const UserList = ({
	supplier,
	refetch,
}: {
	supplier: VinistoSupplierDllModelsApiSupplierSupplier;
	refetch: () => void;
}) => {
	const authenticationContext = React.useContext(AuthenticationContext);
	const notificationsContext = React.useContext(NotificationsContext);
	const localizationContext = React.useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();
	const supplierId = supplier.id;

	const handleOnRemoveSupplierUser = React.useCallback(
		(userId: string) => () => {
			confirmAlert({
				title: `${t({
					id: 'admin.confirm.deleteSupplierUser.title',
				})}`,
				message: `${t({
					id: 'admin.confirm.deleteSupplierUser.message',
				})}`,
				buttons: [
					{
						label: `${t({
							id: 'admin.confirm.yes',
						})}`,
						onClick: () => {
							const apiService = new ApiService();
							const requestData = {
								userLoginHash: authenticationContext.vinistoUser.loginHash,
								userId: userId,
							};
							apiService
								.put(
									`supplier-api/suppliers/${supplierId}/RemoveUserFromSupplier`,
									requestData,
									true
								)
								.then(() => {
									notificationsContext.handleShowSuccessNotification(
										'admin.deleteSupplierUser.success'
									);
									refetch();
								})
								.catch(() => {
									notificationsContext.handleShowErrorNotification(
										'admin.deleteSupplierUser.error'
									);
								});
						},
					},
					{
						label: `${t({
							id: 'admin.confirm.no',
						})}`,
						onClick: () => undefined,
					},
				],
			});
		},
		[
			t,
			authenticationContext.vinistoUser.loginHash,
			supplierId,
			notificationsContext,
			refetch,
		]
	);

	if (!supplier) {
		return null;
	}

	return (
		<div className="product-detail-category-list">
			<div className="detail-category-list-title">
				{t({ id: 'admin.supplierDetail.users' })}
			</div>
			{map(supplier.users ?? [], (user, key) => {
				const userEmail = get(user, 'email', '');
				return (
					<div
						key={`product-category-${key}`}
						className="product-category"
					>
						<MdCategory className="product-category-icon" />
						<div className="product-category-label">{userEmail}</div>
						<DeleteIcon
							onClick={handleOnRemoveSupplierUser(user.id)}
							className="bundle-detail__btn product-category-icon"
						/>
					</div>
				);
			})}
		</div>
	);
};

export default UserList;
