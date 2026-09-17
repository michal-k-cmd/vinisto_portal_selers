import DeleteIcon from 'Components/Icons/Delete';
import ApiService from 'Services/ApiService';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { LocalizationContext } from 'Services/LocalizationService';
import { NotificationsContext } from 'Services/NotificationService';
import { get, map } from 'Helpers/lodash';
import * as React from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { MdCategory } from 'react-icons/md';

import './styles.css';
import { VinistoSupplierDllModelsApiSupplierSupplier } from '@/api-types/user-api';

const CertificatesList = ({
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
		(certId: string) => () => {
			confirmAlert({
				title: `${t({
					id: 'admin.confirm.deleteSupplierCertificate.title',
				})}`,
				message: `${t({
					id: 'admin.confirm.deleteSupplierCertificate.message',
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
							};
							apiService
								.put(
									`supplier-api/suppliers/${supplierId}/certificate/${certId}/RemoveSupplierCertificate`,
									requestData,
									true
								)
								.then(() => {
									notificationsContext.handleShowSuccessNotification(
										'admin.deleteSupplierCertificate.success'
									);
									refetch();
								})
								.catch(() => {
									notificationsContext.handleShowErrorNotification(
										'admin.deleteSupplierCertificate.error'
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
				{t({ id: 'admin.supplierDetail.certificates' })}
			</div>
			{map(supplier.certificates ?? [], (cert, key) => {
				const certId = get(cert, 'id', '');
				const certUrl = get(cert, 'url', '');

				return (
					<div
						key={`product-category-${key}`}
						className="product-category"
					>
						<MdCategory className="product-category-icon" />
						<div className="product-category-label">
							<a
								href={certUrl}
								target="_blank"
								rel="noreferrer"
							>
								{certId}
							</a>
						</div>
						<DeleteIcon
							onClick={handleOnRemoveSupplierUser(cert.id)}
							className="bundle-detail__btn product-category-icon"
						/>
					</div>
				);
			})}
		</div>
	);
};

export default CertificatesList;
