import { type MouseEvent, useContext, useEffect } from 'react';
import useFormatMessage from 'Hooks/useFormatMessage';
import { useFormContext } from 'react-hook-form';
import {
	ADDRESS_DELIVERY_MODAL,
	CONFIRM_DIALOG,
} from 'Components/Modal/constants';
import { DELIVERY_ELEMENT_TYPE } from 'pages-spa/UserSection/Addresses/Components/AddressAdd/constants';
import { ADDRESS_DELIVERY_MODAL_TYPE } from 'Components/Modal/Components/AddressDelivery/constants';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { NotificationsContext } from 'Services/NotificationService';
import { ModalContext } from 'Components/Modal/context';
import { AddressesApiHooks } from 'Services/Addresses/hooks';
import {
	getShippingId as findSelectedAddressIdInLocalStorage,
	setShippingId as persistSelectedAddressIdToLocalStorage,
} from 'Services/Addresses/helpers';
import { VinistoAuthDllModelsApiAddressAddress } from 'vinisto_api_client/src/api-types/user-api';
import AddressAdd from 'pages-spa/UserSection/Addresses/Components/AddressAdd';
import { DELIVERY_ADDRESS_ID_FIELD } from 'pages-spa/CartShippingData/constants';
import { LocalizationContext } from 'Services/LocalizationService';
import Form from 'Components/Forms';
import { VinistoHelperDllEnumsCurrency } from 'vinisto_api_client/src/api-types/product-api';
import api from 'vinisto_api_client/src/api';
import { usePlatformContext } from 'Services/PlatformService';

import styles from '../../styles.module.css';

import DeliveryAddressBox from './Components/DeliveryAddressBox';

const DeliveryAddresses = () => {
	const { customerId } = usePlatformContext();
	const authenticationContext = useContext(AuthenticationContext);
	const notificationContext = useContext(NotificationsContext);
	const modalContext = useContext(ModalContext);
	const {
		activeCurrency: { currency },
	} = useContext(LocalizationContext);

	const t = useFormatMessage();
	const {
		vinistoUser: { id, loginHash },
	} = useContext(AuthenticationContext);

	const { setValue, trigger, watch } = useFormContext();
	const { data, isFetched, refetch } = AddressesApiHooks.useGetAll({
		customerId,
	});

	const selectedDeliveryAddressId = watch(DELIVERY_ADDRESS_ID_FIELD);

	useEffect(() => {
		const preferredDeliveryIdStoredInLocalStorage =
			findSelectedAddressIdInLocalStorage(DELIVERY_ADDRESS_ID_FIELD);
		if (!isFetched || !data?.addresses?.length) return;

		const isLocalySavedPreferredDeliveryAddresFoundInServerData =
			preferredDeliveryIdStoredInLocalStorage &&
			data?.addresses?.some(
				(address) => address.id === preferredDeliveryIdStoredInLocalStorage
			);

		if (isLocalySavedPreferredDeliveryAddresFoundInServerData) {
			setValue(
				DELIVERY_ADDRESS_ID_FIELD,
				preferredDeliveryIdStoredInLocalStorage
			);
		} else if (data.addresses[0]?.id) {
			const firstAddressID = data.addresses[0].id;
			persistSelectedAddressIdToLocalStorage(
				DELIVERY_ADDRESS_ID_FIELD,
				firstAddressID
			);
			setValue(DELIVERY_ADDRESS_ID_FIELD, firstAddressID);
		}
	}, [data?.addresses, isFetched, setValue, selectedDeliveryAddressId]);

	const handleOnSelect = (id: string) => {
		persistSelectedAddressIdToLocalStorage(DELIVERY_ADDRESS_ID_FIELD, id);
		setValue(DELIVERY_ADDRESS_ID_FIELD, id);
	};

	const handleOnCreate = (id: string | null | undefined) => {
		if (!id) return;
		persistSelectedAddressIdToLocalStorage(DELIVERY_ADDRESS_ID_FIELD, id);
		setValue(DELIVERY_ADDRESS_ID_FIELD, id);
	};

	const handleOnEdit = ({
		data,
	}: {
		data: VinistoAuthDllModelsApiAddressAddress;
	}) => {
		modalContext.handleOpenModal(ADDRESS_DELIVERY_MODAL, {
			modalType: ADDRESS_DELIVERY_MODAL_TYPE.UPDATE,
			address: data,
			onCreateCallback: async () =>
				await refetch({
					stale: true,
				}),
		});
	};

	const handleOnDelete =
		(addressId: string) => (event: MouseEvent<HTMLDivElement>) => {
			event.stopPropagation();
			modalContext.handleOpenModal(CONFIRM_DIALOG, {
				title: `${t({ id: 'userSection.addresses.remove' })}`,
				text: 'userSection.addresses.remove.confirm',
				onConfirm: () => {
					api
						.delete(
							`user-api/users/${
								customerId ?? authenticationContext?.vinistoUser?.id
							}/addresses/${addressId}`,
							{ UserLoginHash: authenticationContext?.vinistoUser?.loginHash }
						)
						.then(() => {
							refetch();
						})
						.catch(() => {
							notificationContext.handleShowErrorNotification(
								'userSection.addresses.remove.error'
							);
						});
				},
			});
		};

	const activeDeliveryAddressZipCode = data?.addresses?.find(
		({ id }) =>
			id === findSelectedAddressIdInLocalStorage(DELIVERY_ADDRESS_ID_FIELD)
	)?.zip;

	useEffect(() => {
		if (activeDeliveryAddressZipCode) {
			setValue('zip.delivery', activeDeliveryAddressZipCode);
			trigger('zip.delivery');
		}
	}, [activeDeliveryAddressZipCode, setValue, trigger]);

	if (!id || !loginHash || !isFetched) {
		return null;
	}

	return (
		<div className={styles.address}>
			<div className={styles.addressHeading}>
				{t({ id: 'cartShippingData.savedDeliveryDetails' })}
			</div>
			<div className={styles.addressesWrap}>
				{data?.addresses?.map((address, index) => (
					<DeliveryAddressBox
						key={address?.id ?? 'cartdeladdr' + index}
						data={address}
						handleOnEdit={() => handleOnEdit({ data: address })}
						handleOnSelect={() => handleOnSelect(address?.id as string)}
						handleOnDelete={(event) =>
							handleOnDelete(address?.id as string)(event)
						}
						isSelected={selectedDeliveryAddressId === address?.id}
					/>
				))}
				<AddressAdd
					className="checkout"
					elementType={DELIVERY_ELEMENT_TYPE}
					handleOnCreate={handleOnCreate}
				/>
			</div>
			<Form.InputField
				id="delivery.zip"
				name="zip.delivery"
				label={`${t({ id: 'cartShippingData.form.zipField.label' })}`}
				placeholder={`${t({
					id: 'cartShippingData.form.zipField.placeholder',
				})}`}
				type="text"
				inputClassName="d-none"
				labelClassName="d-none"
				rules={{
					pattern: {
						value:
							currency === VinistoHelperDllEnumsCurrency.CZK
								? /^[1-7]/
								: VinistoHelperDllEnumsCurrency.EUR
								? /^[8-9|0]/
								: /^[1-7]/,
						message: `${t({
							id: 'cartShippingData.form.zipField.countryError',
						})}`,
					},
				}}
			/>
		</div>
	);
};

export default DeliveryAddresses;
