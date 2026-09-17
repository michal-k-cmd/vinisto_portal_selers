import { useContext } from 'react';
import { ModalContext } from 'Components/Modal/context';
import { NotificationsContext } from 'Services/NotificationService';
import { CountrySelect, Form, Input, InputEmail } from 'Components/Form';

import userBillingInfoFormSchema, {
	UserBillingInfoFormValues,
} from '../CreateUserBillingInfo/schema';

const EditUserBillingInfoModal = () => {
	const { handleCloseModal, data } = useContext(ModalContext);

	const { billingAddress, updateUserBillingAddressMutation } = data ?? {};
	const notificationsContext = useContext(NotificationsContext);

	const handleOnEditBillingAddress = (
		formValues: UserBillingInfoFormValues
	) => {
		const validationResult = userBillingInfoFormSchema.safeParse(formValues);
		if (!validationResult.success) {
			notificationsContext.handleShowErrorNotification('validation.error');
			return;
		}

		formValues = validationResult.data;

		updateUserBillingAddressMutation.mutate({
			billingInfoId: billingAddress.id,
			request: formValues,
		});
		handleCloseModal();
	};

	return (
		<Form
			submitCallback={handleOnEditBillingAddress}
			submitText="admin.modal.editUserBillingInfo.submit"
			initializationValues={billingAddress}
		>
			<Input
				type="text"
				name="title"
				identifier="title"
				label="admin.modal.userDetail.title"
				placeholder="admin.modal.userDetail.title"
			/>

			<Input
				type="text"
				name="name"
				identifier="name"
				label="admin.modal.userDetail.firstname"
				placeholder="admin.modal.userDetail.firstname"
			/>

			<Input
				type="text"
				name="surname"
				identifier="surname"
				label="admin.modal.userDetail.surname"
				placeholder="admin.modal.userDetail.surname"
			/>

			<Input
				type="text"
				name="company"
				identifier="company"
				label="admin.modal.userDetail.company"
				placeholder="admin.modal.userDetail.company"
			/>

			<Input
				type="text"
				name="ico"
				identifier="ico"
				label="admin.modal.userDetail.ico"
				placeholder="admin.modal.userDetail.ico"
			/>

			<Input
				type="text"
				name="dic"
				identifier="street"
				label="admin.modal.userDetail.dic"
				placeholder="admin.modal.userDetail.dic"
			/>

			<Input
				type="text"
				name="street"
				identifier="street"
				label="admin.modal.userDetail.street"
				placeholder="admin.modal.userDetail.street"
			/>

			<Input
				type="text"
				name="landRegistryNumber"
				identifier="landRegistryNumber"
				label="admin.modal.userDetail.landRegistryNumber"
				placeholder="admin.modal.userDetail.landRegistryNumber"
			/>

			<Input
				type="text"
				name="houseNumber"
				identifier="houseNumber"
				label="admin.modal.userDetail.houseNumber"
				placeholder="admin.modal.userDetail.houseNumber"
			/>

			<Input
				type="text"
				name="zip"
				identifier="zip"
				label="admin.modal.userDetail.zip"
				placeholder="admin.modal.userDetail.zip"
			/>

			<Input
				type="text"
				name="city"
				identifier="city"
				label="admin.modal.userDetail.city"
				placeholder="admin.modal.userDetail.city"
			/>

			<Input
				type="text"
				name="accountNumber"
				identifier="accountNumber"
				label="admin.modal.userDetail.accountNumber"
				placeholder="admin.modal.userDetail.accountNumber"
			/>

			<Input
				type="text"
				name="bankCode"
				identifier="bankCode"
				label="admin.modal.userDetail.bankCode"
				placeholder="admin.modal.userDetail.bankCode"
			/>

			<CountrySelect
				name="countryCode"
				identifier="countryCode"
				label="admin.modal.userDetail.countryCode"
			/>

			<Input
				type="phone"
				name="phone"
				identifier="phone"
				label="admin.modal.userDetail.phone"
				placeholder="admin.modal.userDetail.phone"
			/>

			<InputEmail
				name="email"
				identifier="email"
			/>
		</Form>
	);
};

export default EditUserBillingInfoModal;
