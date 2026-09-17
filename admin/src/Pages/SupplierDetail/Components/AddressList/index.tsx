import * as React from 'react';
import { get, size } from 'Helpers/lodash';
import { confirmAlert } from 'react-confirm-alert';
import {
	CREATE_SUPPLIER_ADDRESS,
	EDIT_SUPPLIER_ADDRESS,
} from 'Components/Modal/constants';
import { getFormattedText } from 'Helpers/getFormattedText';
import ApiService from 'Services/ApiService';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { LocalizationContext } from 'Services/LocalizationService';
import { ModalContext } from 'Components/Modal/context';
import { NotificationsContext } from 'Services/NotificationService';
import { DeviceServiceContext } from 'Services/DeviceService';
import ActionButton from 'Components/AdminDetail/Components/ActionButton';
import { BsSignpost2Fill } from 'react-icons/bs';
import { MdAdd } from 'react-icons/md';
import EditIcon from 'Components/Icons/Edit';
import DeleteIcon from 'Components/Icons/Delete';

import './styles.css';
import { VinistoSupplierDllModelsApiSupplierSupplier } from '@/api-types/user-api';

const AddressList = ({
	supplier,
	isLoading,
	refetch,
}: {
	supplier: VinistoSupplierDllModelsApiSupplierSupplier;
	isLoading: boolean;
	refetch: () => void;
}) => {
	const authenticationContext = React.useContext(AuthenticationContext);
	const modalContext = React.useContext(ModalContext);
	const notificationsContext = React.useContext(NotificationsContext);
	const localizationContext = React.useContext(LocalizationContext);
	const deviceServiceContext = React.useContext(DeviceServiceContext);
	const t = localizationContext.useFormatMessage();

	const supplierId = supplier.id;
	const supplierAddress = supplier.address ?? {};
	const isMobile = deviceServiceContext.isMobile;

	const handleOnRemove = React.useCallback(() => {
		confirmAlert({
			title: `${t({
				id: 'admin.confirm.deleteAddress.title',
			})}`,
			message: `${t({
				id: 'admin.confirm.deleteAddress.message',
			})}`,
			buttons: [
				{
					label: `${t({
						id: 'admin.confirm.yes',
					})}`,
					onClick: () => {
						const apiService = new ApiService();
						apiService
							.delete(
								`supplier-api/suppliers/${supplierId}/address`,
								undefined,
								true,
								[
									{
										key: 'UserLoginHash',
										value: get(authenticationContext, 'vinistoUser.loginHash'),
									},
								]
							)
							.then(() => {
								notificationsContext.handleShowSuccessNotification(
									'admin.deleteAddress.success'
								);
								refetch();
							})
							.catch(() => {
								notificationsContext.handleShowErrorNotification(
									'admin.deleteAddress.error'
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
	}, [t, supplierId, authenticationContext, notificationsContext, refetch]);

	const handleOnCreateBtnClick = React.useCallback(() => {
		modalContext.handleOpenModal(CREATE_SUPPLIER_ADDRESS, {
			supplier,
			refetch,
		});
	}, [modalContext, supplier, refetch]);

	const handleOnEditBtnClick = React.useCallback(() => {
		modalContext.handleOpenModal(EDIT_SUPPLIER_ADDRESS, {
			supplier,
			refetch,
		});
	}, [modalContext, supplier, refetch]);

	return (
		<div className={`admin-item-list ${isMobile ? 'flex-column' : ''}`}>
			<div className="admin-item-list__title">
				{t({ id: 'admin.supplierDetail.address.label' })}
			</div>
			{supplier && size(supplierAddress) > 0 && (
				<div className={`admin-item-list__container ${isMobile ? 'm-0' : ''}`}>
					<div className={`admin-item ${isMobile ? 'w-100' : ''}`}>
						<div className="admin-item__top-panel">
							<BsSignpost2Fill className="admin-item__icon" />
							<span className="admin-item__title">
								{get(supplierAddress, 'title') ??
									t({ id: 'admin.supplierDetail.title.noValue' })}
							</span>
							<EditIcon
								title={`${t({ id: 'admin.btn.editSupplierAddress.title' })}`}
								onClick={handleOnEditBtnClick}
								className="admin-item__icon admin-item__icon--btn pointer me-1"
							/>
							<DeleteIcon
								title={`${t({ id: 'admin.btn.deleteAddress.title' })}`}
								onClick={handleOnRemove}
								className="admin-item__icon admin-item__icon--btn pointer"
							/>
						</div>
						<dl className="admin-item__specs">
							<dt>{t({ id: 'admin.supplierDetail.addressee.label' })}</dt>
							<dd>{get(supplierAddress, 'addressee') ?? '-'}</dd>
							<dt>{t({ id: 'admin.supplierDetail.street.label' })}</dt>
							<dd>{get(supplierAddress, 'street') ?? '-'}</dd>
							<dt>
								{t({ id: 'admin.supplierDetail.landRegistryNumber.label' })}
							</dt>
							<dd>{get(supplierAddress, 'landRegistryNumber') ?? '-'}</dd>
							<dt>{t({ id: 'admin.supplierDetail.houseNumber.label' })}</dt>
							<dd>{get(supplierAddress, 'houseNumber') ?? '-'}</dd>
							<dt>{t({ id: 'admin.supplierDetail.zip.label' })}</dt>
							<dd>{get(supplierAddress, 'zip') ?? '-'}</dd>
							<dt>{t({ id: 'admin.supplierDetail.city.label' })}</dt>
							<dd>{get(supplierAddress, 'city') ?? '-'}</dd>
							<dt>{t({ id: 'admin.supplierDetail.countryCode.label' })}</dt>
							<dd>{get(supplierAddress, 'countryCode') ?? '-'}</dd>
							<dt>{t({ id: 'admin.supplierDetail.phone.label' })}</dt>
							<dd>{get(supplierAddress, 'phone') ?? '-'}</dd>
							<dt>{t({ id: 'admin.supplierDetail.email.label' })}</dt>
							<dd>{get(supplierAddress, 'email') ?? '-'}</dd>
							<dt>{t({ id: 'admin.supplierDetail.note.label' })}</dt>
							<dd>{getFormattedText(get(supplierAddress, 'note') ?? '-')}</dd>
						</dl>
					</div>
				</div>
			)}
			{supplier && !size(supplierAddress) && (
				<ActionButton
					onClick={handleOnCreateBtnClick}
					label="admin.btn.createSupplierAddress"
					icon={MdAdd}
					disabled={isLoading}
				/>
			)}
		</div>
	);
};

export default AddressList;
