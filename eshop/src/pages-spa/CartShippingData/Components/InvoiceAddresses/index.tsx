import { type MouseEvent, useContext, useEffect } from 'react';
import useFormatMessage from 'Hooks/useFormatMessage';
import { useFormContext } from 'react-hook-form';
import {
	ADDRESS_INVOICE_MODAL,
	CONFIRM_DIALOG,
} from 'Components/Modal/constants';
import { INVOICE_ELEMENT_TYPE } from 'pages-spa/UserSection/Addresses/Components/AddressAdd/constants';
import { ADDRESS_INVOICE_MODAL_TYPE } from 'Components/Modal/Components/AddressInvoice/constants';
import { ModalContext } from 'Components/Modal/context';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { NotificationsContext } from 'Services/NotificationService';
import { BillingInfoApiHooks } from 'Services/Addresses/hooks';
import {
	getShippingId as findSelectedAddressIdInLocalStorage,
	setShippingId as persistSelectedAddressIdToLocalStorage,
} from 'Services/Addresses/helpers';
import { VinistoAuthDllModelsApiBillingInfoBillingInfo } from 'vinisto_api_client/src/api-types/user-api';
import AddressAdd from 'pages-spa/UserSection/Addresses/Components/AddressAdd';
import { BILLING_INFO_ID_FIELD } from 'pages-spa/CartShippingData/constants';
import api from 'vinisto_api_client/src/api';
import { usePlatformContext } from 'Services/PlatformService';

import styles from '../../styles.module.css';

import InvoiceAddressBox from './Components/InvoiceAddressBox';

const InvoiceAddresses = () => {
	const { customerId } = usePlatformContext();
	const authenticationContext = useContext(AuthenticationContext);
	const notificationContext = useContext(NotificationsContext);
	const t = useFormatMessage();
	const modalContext = useContext(ModalContext);
	const {
		vinistoUser: { id, loginHash },
	} = useContext(AuthenticationContext);
	const { setValue, watch } = useFormContext();

	const { data, isFetched, refetch } = BillingInfoApiHooks.useGetAll({
		customerId,
		billingInfoId: '',
	});

	const selectedBillingInfoId = watch(BILLING_INFO_ID_FIELD);

	useEffect(() => {
		const preferredDeliveryIdStoredInLocalStorage =
			findSelectedAddressIdInLocalStorage(BILLING_INFO_ID_FIELD);
		if (!isFetched || !data?.billingInfos?.length) return;

		const isLocalySavedPreferredDeliveryAddresFoundInServerData =
			preferredDeliveryIdStoredInLocalStorage &&
			data?.billingInfos?.some(
				(address) => address.id === preferredDeliveryIdStoredInLocalStorage
			);

		if (isLocalySavedPreferredDeliveryAddresFoundInServerData) {
			setValue(BILLING_INFO_ID_FIELD, preferredDeliveryIdStoredInLocalStorage);
		} else if (data.billingInfos[0]?.id) {
			const firstAddressID = data.billingInfos[0].id;
			persistSelectedAddressIdToLocalStorage(
				BILLING_INFO_ID_FIELD,
				firstAddressID
			);
			setValue(BILLING_INFO_ID_FIELD, firstAddressID);
		}
	}, [data?.billingInfos, isFetched, setValue]);

	const handleOnSelect = (id: string) => {
		persistSelectedAddressIdToLocalStorage(BILLING_INFO_ID_FIELD, id);
		setValue(BILLING_INFO_ID_FIELD, id);
	};

	const handleOnCreate = (id: string | null | undefined) => {
		if (!id) return;
		persistSelectedAddressIdToLocalStorage(BILLING_INFO_ID_FIELD, id);
		setValue(BILLING_INFO_ID_FIELD, id);
	};

	const handleOnEdit = ({
		data,
	}: {
		data: VinistoAuthDllModelsApiBillingInfoBillingInfo;
	}) => {
		modalContext.handleOpenModal(ADDRESS_INVOICE_MODAL, {
			modalType: ADDRESS_INVOICE_MODAL_TYPE.UPDATE,
			billingInfo: data,
			// TO FIX wrong naming here: this is edit, not create!
			onCreateCallback: async () =>
				await refetch({
					stale: true,
				}),
		});
	};

	const handleOnDelete =
		(billingInfoId: string) => (event: MouseEvent<HTMLDivElement>) => {
			event.stopPropagation();
			modalContext.handleOpenModal(CONFIRM_DIALOG, {
				title: `${t({ id: 'userSection.addresses.remove' })}`,
				text: 'userSection.addresses.billingInfo.remove.confirm',
				onConfirm: () => {
					api
						.delete(
							`user-api/users/${
								customerId ?? authenticationContext?.vinistoUser?.id
							}/billing-information/${billingInfoId}`,
							{ UserLoginHash: authenticationContext?.vinistoUser?.loginHash }
						)
						.then(() => {
							refetch();
						})
						.catch(() => {
							notificationContext.handleShowErrorNotification(
								'userSection.addresses.billingInfo.remove.error'
							);
						});
				},
			});
		};

	if (!id || !loginHash || !isFetched) {
		return null;
	}

	return (
		<div className={styles.address}>
			<div className={styles.addressHeading}>
				{t({ id: 'cartShippingData.savedBillingInfo' })}
			</div>
			<div className={styles.addressesWrap}>
				{data?.billingInfos?.map((billingInfo, index) => (
					<InvoiceAddressBox
						key={billingInfo?.id ?? 'cartinvoiceaddr' + index}
						data={billingInfo}
						handleOnEdit={() => handleOnEdit({ data: billingInfo })}
						handleOnSelect={() => handleOnSelect(billingInfo?.id)}
						handleOnDelete={(event) => handleOnDelete(billingInfo?.id)(event)}
						isSelected={selectedBillingInfoId === billingInfo?.id}
					/>
				))}
				<AddressAdd
					className="checkout"
					elementType={INVOICE_ELEMENT_TYPE}
					handleOnCreate={handleOnCreate}
				/>
			</div>
		</div>
	);
};

export default InvoiceAddresses;
