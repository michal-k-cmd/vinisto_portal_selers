import { FC, useCallback, useContext } from 'react';
import { TitleFormFields } from 'Pages/Settings/Components/Title/interfaces';
import { FIELD_NAME } from 'Pages/Settings/Components/Title/constants';
import { SupplierAddressAction } from 'Pages/Settings/SupplierAddressContext/constants';
import { SupplierAddressContext } from 'Pages/Settings/SupplierAddressContext';
import AddressTitleForm from 'Pages/Settings/Components/Title';

const ContactTitleForm: FC = () => {
	const { dispatch, title } = useContext(SupplierAddressContext);

	const handleOnSubmit = useCallback(
		async (values: TitleFormFields) => {
			const submitError = await dispatch([
				SupplierAddressAction.setTitle,
				values[FIELD_NAME],
			]);
			return Promise.resolve({
				[FIELD_NAME]: submitError,
			});
		},
		[dispatch]
	);

	return (
		<AddressTitleForm
			formKey="contactTitle"
			id="contactTitle"
			onSubmit={handleOnSubmit}
			initialValue={title}
		/>
	);
};

export default ContactTitleForm;
