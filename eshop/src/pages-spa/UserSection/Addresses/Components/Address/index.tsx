import { useContext } from 'react';
import { get } from 'lodash-es';
import Skeleton from 'react-loading-skeleton';
import { ADDRESS_DELIVERY_MODAL_TYPE } from 'Components/Modal/Components/AddressDelivery/constants';
import { ADDRESS_INVOICE_MODAL_TYPE } from 'Components/Modal/Components/AddressInvoice/constants';
import {
	ADDRESS_DELIVERY_MODAL,
	ADDRESS_INVOICE_MODAL,
	CONFIRM_DIALOG,
} from 'Components/Modal/constants';
import {
	AddressesApiHooks,
	BillingInfoApiHooks,
} from 'Services/Addresses/hooks';
import { ModalContext } from 'Components/Modal/context';
import { LocalizationContext } from 'Services/LocalizationService';
import { NotificationsContext } from 'Services/NotificationService';
import LoadingSpinner from 'Components/Preloader/Components/LoadingSpinner';
import EditIcon from 'Components/Icons/Edit';
import DeleteIcon from 'Components/Icons/Delete';
import { VinistoHelperDllEnumsCountryCode } from 'vinisto_api_client/src/api-types/product-api';
import { usePlatformContext } from 'Services/PlatformService';

import { ADDRESS_TYPE, IAddressProps } from './interfaces';
import styles from './styles.module.css';

const Address = ({ address, addressType, isLoading }: IAddressProps) => {
	const { customerId } = usePlatformContext();
	const { handleShowErrorNotification } = useContext(NotificationsContext);
	const { handleOpenModal } = useContext(ModalContext);
	const t = useContext(LocalizationContext).useFormatMessage();

	const {
		mutate: deleteDeliveryAddress,
		isLoading: isDeletingDeliveryAddress,
	} = AddressesApiHooks.useDelete();
	const { refetch: refetchDeliveryAddresses } = AddressesApiHooks.useGetAll({
		customerId,
	});

	const { mutate: deleteBillingInfo, isLoading: isDeletingBillingInfo } =
		BillingInfoApiHooks.useDelete();
	const { refetch: refetchBillingAddresses } = BillingInfoApiHooks.useGetAll({
		customerId,
		billingInfoId: '',
	});

	const isDeleting = isDeletingDeliveryAddress || isDeletingBillingInfo;

	const handleOnDelete = () => {
		if (addressType === ADDRESS_TYPE.DELIVERY) {
			handleOpenModal(CONFIRM_DIALOG, {
				title: `${t({ id: 'userSection.addresses.remove' })}`,
				text: 'userSection.addresses.remove.confirm',
				onConfirm: () => {
					deleteDeliveryAddress(
						{ addressId: address?.id ?? '', customerId },
						{
							onError: () => {
								handleShowErrorNotification(
									'userSection.addresses.remove.error'
								);
							},
						}
					);
				},
			});
		} else if (addressType === ADDRESS_TYPE.INVOICE) {
			handleOpenModal(CONFIRM_DIALOG, {
				title: `${t({ id: 'userSection.addresses.remove' })}`,
				text: 'userSection.addresses.billingInfo.remove.confirm',
				onConfirm: () => {
					deleteBillingInfo(
						{ billingInfoId: address?.id ?? '', customerId },
						{
							onError: () => {
								handleShowErrorNotification(
									'userSection.addresses.billingInfo.remove.error'
								);
							},
						}
					);
				},
			});
		}
	};

	const openAddressModal = () => {
		if (addressType === ADDRESS_TYPE.DELIVERY) {
			handleOpenModal(ADDRESS_DELIVERY_MODAL, {
				modalType: ADDRESS_DELIVERY_MODAL_TYPE.UPDATE,
				address,
				onCreateCallback: async () =>
					await refetchDeliveryAddresses({
						stale: true,
					}),
			});
		} else if (addressType === ADDRESS_TYPE.INVOICE) {
			handleOpenModal(ADDRESS_INVOICE_MODAL, {
				modalType: ADDRESS_INVOICE_MODAL_TYPE.UPDATE,
				billingInfo: address,
				onCreateCallback: async () =>
					await refetchBillingAddresses({
						stale: true,
					}),
			});
		}
	};

	const handleOnEditClick = () => {
		openAddressModal();
	};

	const {
		name,
		surname,
		email,
		phone,
		street,
		landRegistryNumber,
		houseNumber,
		company,
		ico,
		dic,
		city,
		title,
		zip,
		countryCode,
	} = address;

	return (
		<div
			className={styles.address}
			key={`vinisto-address-info-${get(address, 'id', '')}`}
		>
			<div className={styles.addressHeader}>
				<div>
					{isLoading ? (
						<Skeleton
							width="140px"
							height="16px"
						/>
					) : (
						title
					)}
				</div>
				<div className={styles.editDeleteWrap}>
					{isLoading ? (
						<Skeleton
							width="50px"
							height="20px"
						/>
					) : (
						<button
							onClick={handleOnEditClick}
							onKeyDown={handleOnEditClick}
						>
							<EditIcon />
						</button>
					)}
					{isLoading ? (
						<Skeleton
							width="20px"
							height="20px"
						/>
					) : (
						<button
							onClick={handleOnDelete}
							onKeyDown={handleOnDelete}
						>
							<DeleteIcon />
						</button>
					)}
				</div>
			</div>
			{isLoading ? (
				<Skeleton
					count={5.6}
					width="75%"
				/>
			) : (
				<>
					{ico && <div>{ico}</div>}
					{company && <div>{company}</div>}
					<div>{`${name} ${surname}`}</div>
					{email && <div>{email}</div>}
					<div>{(phone ?? '').replace(/(\+?\d{3})/g, '$1 ')}</div>
					<div>
						{`${street} ${
							houseNumber
								? landRegistryNumber + '/' + houseNumber
								: landRegistryNumber
						}`}
					</div>
					<div>{city}</div>
					<div>{zip}</div>
					{dic && <div>{dic}</div>}
					<div>
						{countryCode && countryCode == VinistoHelperDllEnumsCountryCode.CZ
							? t({ id: 'addressForm.countryCode.CZ.label' })
							: t({ id: 'addressForm.countryCode.SK.label' })}
					</div>
				</>
			)}

			{isDeleting && (
				<div className={styles.deleted}>
					<LoadingSpinner />
				</div>
			)}
		</div>
	);
};

export default Address;
