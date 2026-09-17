import { useCallback, useContext } from 'react';
import { apiServiceInstance } from 'Services/ApiService';
import { ModalContext } from 'Components/Modal/context';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { NotificationsContext } from 'Services/NotificationService';
import {
	CountrySelect,
	Form,
	Input,
	InputEmail,
	InputTextArea,
} from 'Components/Form';

const EditSupplierAddressModal = () => {
	const authenticationContext = useContext(AuthenticationContext);
	const { loginHash: userLoginHash } = authenticationContext.vinistoUser;
	const modalContext = useContext(ModalContext);
	const notificationsContext = useContext(NotificationsContext);

	const { supplier, refetch } = modalContext.data || {};
	const supplierId = supplier?.id;

	const handleOnEdit = useCallback(
		(formValues: Record<any, any>) => {
			apiServiceInstance
				.put(
					`supplier-api/suppliers/${supplierId}/address`,
					{
						userLoginHash,
						...formValues,
					},
					true
				)
				.then(() => {
					notificationsContext.handleShowSuccessNotification(
						'admin.modal.editSupplierAddress.success'
					);
					modalContext.handleCloseModal();
					refetch();
				})
				.catch(() => {
					notificationsContext.handleShowErrorNotification(
						'admin.modal.editSupplierAddress.error'
					);
				});
		},
		[supplierId, userLoginHash, notificationsContext, modalContext, refetch]
	);

	return (
		<Form
			submitCallback={handleOnEdit}
			submitText="admin.modal.editSupplierAddress.submit"
			initializationValues={{
				...(supplier.address ?? {}),
			}}
		>
			<Input
				type="text"
				name="title"
				identifier="title"
				label="admin.modal.supplier.title"
				placeholder="admin.modal.supplier.title"
			/>

			<Input
				type="text"
				name="addressee"
				identifier="addressee"
				label="admin.modal.supplier.addressee"
				placeholder="admin.modal.supplier.addressee"
			/>

			<Input
				type="text"
				name="street"
				identifier="street"
				label="admin.modal.supplier.street"
				placeholder="admin.modal.supplier.street"
			/>

			<Input
				type="text"
				name="landRegistryNumber"
				identifier="landRegistryNumber"
				label="admin.modal.supplier.landRegistryNumber"
				placeholder="admin.modal.supplier.landRegistryNumber"
			/>

			<Input
				type="text"
				name="houseNumber"
				identifier="houseNumber"
				label="admin.modal.supplier.houseNumber"
				placeholder="admin.modal.supplier.houseNumber"
			/>

			<Input
				type="text"
				name="zip"
				identifier="zip"
				label="admin.modal.supplier.zip"
				placeholder="admin.modal.supplier.zip"
			/>

			<Input
				type="text"
				name="city"
				identifier="city"
				label="admin.modal.supplier.city"
				placeholder="admin.modal.supplier.city"
			/>

			<CountrySelect
				name="countryCode"
				identifier="countryCode"
				label="admin.modal.supplier.countryCode"
			/>

			<Input
				type="phone"
				name="phone"
				identifier="phone"
				label="admin.modal.supplier.phone"
				placeholder="admin.modal.supplier.phone"
			/>

			<InputEmail
				name="email"
				identifier="email"
			/>

			<InputTextArea
				name="note"
				identifier="note"
				label="admin.modal.supplier.note"
				placeholder="admin.modal.supplier.note"
			/>
		</Form>
	);
};

export default EditSupplierAddressModal;
