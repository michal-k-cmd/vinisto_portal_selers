import { useContext } from 'react';
import { ModalContext } from 'Components/Modal/context';
import { VinistoAuthDllModelsApiAddressUserAddressCreateParameters } from 'vinisto_api_client/src/api-types/user-api/';
import {
	CountrySelect,
	Form,
	Input,
	InputEmail,
	InputTextArea,
	Validators,
} from 'Components/Form';

const CreateUserAddressModal = () => {
	const { data, handleCloseModal } = useContext(ModalContext);

	const { createUserAddressMutation } = data ?? {};

	const handleOnCreate = (
		formValues: VinistoAuthDllModelsApiAddressUserAddressCreateParameters
	) => {
		createUserAddressMutation.mutate(formValues);
		handleCloseModal();
	};

	return (
		<Form
			submitCallback={handleOnCreate}
			submitText="admin.modal.createUserAddress.submit"
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
				validate={Validators.required}
			/>

			<Input
				type="text"
				name="surname"
				identifier="surname"
				label="admin.modal.userDetail.surname"
				placeholder="admin.modal.userDetail.surname"
				validate={Validators.required}
			/>

			<Input
				type="text"
				name="street"
				identifier="street"
				label="admin.modal.userDetail.street"
				placeholder="admin.modal.userDetail.street"
				validate={Validators.required}
			/>

			<Input
				type="text"
				name="landRegistryNumber"
				identifier="landRegistryNumber"
				label="admin.modal.userDetail.landRegistryNumber"
				placeholder="admin.modal.userDetail.landRegistryNumber"
				validate={Validators.required}
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
				validate={Validators.required}
			/>

			<Input
				type="text"
				name="city"
				identifier="city"
				label="admin.modal.userDetail.city"
				placeholder="admin.modal.userDetail.city"
				validate={Validators.required}
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
				validate={[Validators.required, Validators.validatePhone]}
			/>

			<InputEmail
				name="email"
				identifier="email"
				validate={Validators.validateEmail}
			/>

			<InputTextArea
				name="note"
				identifier="note"
				label="admin.modal.userDetail.note"
				placeholder="admin.modal.userDetail.note"
			/>
		</Form>
	);
};

export default CreateUserAddressModal;
