import { useCallback, useContext } from 'react';
import { get } from 'Helpers/lodash';
import ApiService from 'Services/ApiService';
import { ModalContext } from 'Components/Modal/context';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { NotificationsContext } from 'Services/NotificationService';
import {
	CountrySelect,
	Form,
	Input,
	InputEmail,
	InputTextArea,
	Validators,
} from 'Components/Form';

const CreateSupplierAddressModal = () => {
	const authenticationContext = useContext(AuthenticationContext);
	const modalContext = useContext(ModalContext);
	const notificationsContext = useContext(NotificationsContext);
	const { supplier, refetch } = modalContext.data ?? {};
	const supplierId = supplier.id;

	const handleOnCreate = useCallback(
		(formValues: Record<any, any>) => {
			const loginHash = get(
				authenticationContext,
				'vinistoUser.loginHash',
				null
			);
			const apiService = new ApiService();
			apiService
				.post(
					`supplier-api/suppliers/${supplierId}/address`,
					{
						userLoginHash: loginHash,
						...formValues,
					},
					true
				)
				.then(() => {
					notificationsContext.handleShowSuccessNotification(
						'admin.modal.createSupplierAddress.success'
					);
					refetch();
					modalContext.handleCloseModal();
				})
				.catch(() => {
					notificationsContext.handleShowErrorNotification(
						'admin.modal.createSupplierAddress.error'
					);
				});
		},
		[
			authenticationContext,
			supplierId,
			notificationsContext,
			refetch,
			modalContext,
		]
	);

	return (
		<Form
			submitCallback={handleOnCreate}
			submitText="admin.modal.createSupplierAddress.submit"
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
				validate={Validators.required}
			/>

			<Input
				type="text"
				name="landRegistryNumber"
				identifier="landRegistryNumber"
				label="admin.modal.supplier.landRegistryNumber"
				placeholder="admin.modal.supplier.landRegistryNumber"
				validate={Validators.required}
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
				validate={Validators.required}
			/>

			<Input
				type="text"
				name="city"
				identifier="city"
				label="admin.modal.supplier.city"
				placeholder="admin.modal.supplier.city"
				validate={Validators.required}
			/>

			<CountrySelect
				name="countryCode"
				identifier="countryCode"
				label="admin.modal.supplier.countryCode"
				placeholder="admin.modal.supplier.countryCode"
				validate={Validators.required}
			/>

			<Input
				type="phone"
				name="phone"
				identifier="phone"
				label="admin.modal.supplier.phone"
				placeholder="admin.modal.supplier.phone"
				validate={Validators.required}
			/>

			<InputEmail
				name="email"
				identifier="email"
				validate={Validators.required}
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

export default CreateSupplierAddressModal;
