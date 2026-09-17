import { Form } from 'react-final-form';
import {
	CountrySelect,
	Input,
	InputEmail,
	InputTextArea,
} from 'Components/Form';
import { useContext } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';

import type { OrderAddressFormProps } from '../interfaces';

const ShippingAddressForm = ({
	initialValues,
	handleSubmit,
}: OrderAddressFormProps) => {
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();

	return (
		<Form
			onSubmit={handleSubmit}
			initialValues={initialValues}
		>
			{({ handleSubmit }) => (
				<form
					onSubmit={handleSubmit}
					className="align-self-start"
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

					<InputTextArea
						name="note"
						identifier="note"
						label="admin.modal.userDetail.note"
						placeholder="admin.modal.userDetail.note"
					/>
					<button
						type="submit"
						className="btn btn-primary"
					>
						{t({ id: 'admin.modal.editUserAddress.submit' })}
					</button>
				</form>
			)}
		</Form>
	);
};

export default ShippingAddressForm;
