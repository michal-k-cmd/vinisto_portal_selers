import { useContext } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { LocalizationContext } from 'Services/LocalizationService';
import { ModalContext } from 'Components/Modal/context';
import DeleteIcon from 'Components/Icons/Delete';
import EditIcon from 'Components/Icons/Edit';
import { EDIT_USER_BILLING_INFO } from 'Components/Modal/constants';
import {
	VinistoAuthDllModelsApiBillingInfoBillingInfo,
	VinistoAuthDllModelsApiBillingInfoUserBillingInfoEditParameters,
} from 'vinisto_api_client/src/api-types/user-api/';
import { UseMutationResult } from '@tanstack/react-query';

import styles from '../AddressListItem/styles.module.css';

interface AddressListItemProps {
	billingAddress: VinistoAuthDllModelsApiBillingInfoBillingInfo;
	deleteUserBillingAddressMutation: UseMutationResult<
		void,
		unknown,
		string,
		unknown
	>;
	updateUserBillingAddressMutation: UseMutationResult<
		void,
		unknown,
		{
			billingInfoId: string;
			request: VinistoAuthDllModelsApiBillingInfoUserBillingInfoEditParameters;
		},
		unknown
	>;
}

const AddressListItem = ({
	billingAddress,
	deleteUserBillingAddressMutation,
	updateUserBillingAddressMutation,
}: AddressListItemProps) => {
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();
	const modalContext = useContext(ModalContext);

	const handleEditAddress = () => {
		modalContext.handleOpenModal(EDIT_USER_BILLING_INFO, {
			billingAddress,
			updateUserBillingAddressMutation,
		});
	};

	const handleRemoveAddress = (billingInfoId: string) => () => {
		confirmAlert({
			title: `${t({
				id: 'admin.confirm.deleteBillingInfoFromUser.title',
			})}`,
			message: `${t({
				id: 'admin.confirm.deleteBillingInfoFromUser.message',
			})}`,
			buttons: [
				{
					label: `${t({
						id: 'admin.confirm.deleteBillingInfoFromUser.yes',
					})}`,
					onClick: () => {
						deleteUserBillingAddressMutation.mutate(billingInfoId);
					},
				},
				{
					label: `${t({
						id: 'admin.confirm.deleteBillingInfoFromUser.no',
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
					{billingAddress.title ??
						t({ id: 'admin.supplierDetail.title.noValue' })}
				</span>
				<div className={styles.actionButtons}>
					<EditIcon
						title={`${t({ id: 'admin.btn.editUserBillingInfo.title' })}`}
						onClick={handleEditAddress}
						className="admin-item__icon admin-item__icon--btn me-1"
					/>
					<DeleteIcon
						title={`${t({ id: 'admin.btn.deleteBillingInfo.title' })}`}
						onClick={handleRemoveAddress(billingAddress.id)}
						className="admin-item__icon admin-item__icon--btn"
					/>
				</div>
			</div>
			<dl className={styles.address}>
				<dt>{t({ id: 'admin.userDetail.firstname.label' })}</dt>
				<dd>{billingAddress.name ?? '-'}</dd>
				<dt>{t({ id: 'admin.userDetail.surname.label' })}</dt>
				<dd>{billingAddress.surname ?? '-'}</dd>
				<dt>{t({ id: 'admin.userDetail.company.label' })}</dt>
				<dd>{billingAddress.company ?? '-'}</dd>
				<dt>{t({ id: 'admin.userDetail.ico.label' })}</dt>
				<dd>{billingAddress.ico ?? '-'}</dd>
				<dt>{t({ id: 'admin.userDetail.dic.label' })}</dt>
				<dd>{billingAddress.dic ?? '-'}</dd>
				<dt>{t({ id: 'admin.userDetail.street.label' })}</dt>
				<dd>{billingAddress.street ?? '-'}</dd>
				<dt>{t({ id: 'admin.userDetail.landRegistryNumber.label' })}</dt>
				<dd>{billingAddress.landRegistryNumber ?? '-'}</dd>
				<dt>{t({ id: 'admin.userDetail.houseNumber.label' })}</dt>
				<dd>{billingAddress.houseNumber ?? '-'}</dd>
				<dt>{t({ id: 'admin.userDetail.zip.label' })}</dt>
				<dd>{billingAddress.zip ?? '-'}</dd>
				<dt>{t({ id: 'admin.userDetail.city.label' })}</dt>
				<dd>{billingAddress.city ?? '-'}</dd>

				<dt>{t({ id: 'admin.userDetail.accountNumber.label' })}</dt>
				<dd>{billingAddress.accountNumber ?? '-'}</dd>
				<dt>{t({ id: 'admin.userDetail.bankCode.label' })}</dt>
				<dd>{billingAddress.bankCode ?? '-'}</dd>

				<dt>{t({ id: 'admin.userDetail.countryCode.label' })}</dt>
				<dd>{billingAddress.countryCode ?? '-'}</dd>
				<dt>{t({ id: 'admin.userDetail.phone.label' })}</dt>
				<dd>{billingAddress.phone ?? '-'}</dd>
				<dt>{t({ id: 'admin.userDetail.email.label' })}</dt>
				<dd>{billingAddress.email ?? '-'}</dd>
			</dl>
		</div>
	);
};

export default AddressListItem;
