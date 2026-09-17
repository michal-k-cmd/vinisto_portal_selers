import { useContext } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { LocalizationContext } from 'Services/LocalizationService';
import { getFormattedText } from 'Helpers/getFormattedText';
import { ModalContext } from 'Components/Modal/context';
import EditIcon from 'Components/Icons/Edit';
import DeleteIcon from 'Components/Icons/Delete';
import { EDIT_USER_ADDRESS } from 'Components/Modal/constants';
import { UseMutationResult } from '@tanstack/react-query';
import {
	VinistoAuthDllModelsApiAddressAddress,
	VinistoAuthDllModelsApiAddressUserAddressEditParameters,
} from 'vinisto_api_client/src/api-types/user-api/';

import styles from './styles.module.css';

interface UserAddresses {
	userAddress: VinistoAuthDllModelsApiAddressAddress;
	deleteUserAddressMutation: UseMutationResult<void, unknown, string, unknown>;
	updateUserAddressMutation: UseMutationResult<
		void,
		unknown,
		{
			addressId: string;
			request: VinistoAuthDllModelsApiAddressUserAddressEditParameters;
		},
		unknown
	>;
}

const AddressListItem = ({
	userAddress,
	deleteUserAddressMutation,
	updateUserAddressMutation,
}: UserAddresses) => {
	const t = useContext(LocalizationContext).useFormatMessage();
	const { handleOpenModal } = useContext(ModalContext);

	const handleOnEditAddress = () => {
		handleOpenModal(EDIT_USER_ADDRESS, {
			updateUserAddressMutation,
			userAddress,
		});
	};

	const handleOnRemoveAddress = (addressId: string) => () => {
		confirmAlert({
			title: `${t({
				id: 'admin.confirm.deleteAddressFromUser.title',
			})}`,
			message: `${t({
				id: 'admin.confirm.deleteAddressFromUser.message',
			})}`,
			buttons: [
				{
					label: `${t({
						id: 'admin.confirm.deleteAddressFromUser.yes',
					})}`,
					onClick: () => {
						deleteUserAddressMutation.mutate(addressId);
					},
				},
				{
					label: `${t({
						id: 'admin.confirm.deleteAddressFromUser.no',
					})}`,
					onClick: () => {},
				},
			],
		});
	};

	return (
		<div>
			<div className={styles.headerWrap}>
				<span className={styles.heading}>
					{userAddress.title ?? t({ id: 'admin.supplierDetail.title.noValue' })}
				</span>
				<div className={styles.actionButtons}>
					<EditIcon
						title={`${t({ id: 'admin.btn.editSupplierAddress.title' })}`}
						onClick={handleOnEditAddress}
						className="admin-item__icon admin-item__icon--btn me-1"
					/>
					<DeleteIcon
						title={`${t({ id: 'admin.btn.deleteAddress.title' })}`}
						onClick={handleOnRemoveAddress(userAddress.id)}
						className="admin-item__icon admin-item__icon--btn"
					/>
				</div>
			</div>
			<dl className={styles.address}>
				<dt>{t({ id: 'admin.userDetail.firstname.label' })}</dt>
				<dd>{userAddress.name ?? '-'}</dd>
				<dt>{t({ id: 'admin.userDetail.surname.label' })}</dt>
				<dd>{userAddress.surname ?? '-'}</dd>
				<dt>{t({ id: 'admin.userDetail.company.label' })}</dt>
				<dd>{userAddress.company ?? '-'}</dd>
				<dt>{t({ id: 'admin.userDetail.street.label' })}</dt>
				<dd>{userAddress.street ?? '-'}</dd>
				<dt>{t({ id: 'admin.userDetail.landRegistryNumber.label' })}</dt>
				<dd>{userAddress.landRegistryNumber ?? '-'}</dd>
				<dt>{t({ id: 'admin.userDetail.houseNumber.label' })}</dt>
				<dd>{userAddress.houseNumber ?? '-'}</dd>
				<dt>{t({ id: 'admin.userDetail.zip.label' })}</dt>
				<dd>{userAddress.zip ?? '-'}</dd>
				<dt>{t({ id: 'admin.userDetail.city.label' })}</dt>
				<dd>{userAddress.city ?? '-'}</dd>
				<dt>{t({ id: 'admin.userDetail.countryCode.label' })}</dt>
				<dd>{userAddress.countryCode ?? '-'}</dd>
				<dt>{t({ id: 'admin.userDetail.phone.label' })}</dt>
				<dd>{userAddress.phone ?? '-'}</dd>
				<dt>{t({ id: 'admin.userDetail.email.label' })}</dt>
				<dd>{userAddress.email ?? '-'}</dd>
				<dt>{t({ id: 'admin.userDetail.note.label' })}</dt>
				<dd>{getFormattedText(userAddress.note ?? '-')}</dd>
			</dl>
		</div>
	);
};

export default AddressListItem;
