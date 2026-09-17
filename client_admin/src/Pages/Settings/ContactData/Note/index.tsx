import { FC, useCallback, useContext } from 'react';
import { NoteFormFields } from 'Pages/Settings/Components/Note/interfaces';
import { FIELD_NAME } from 'Pages/Settings/Components/Note/constants';
import { SupplierAddressAction } from 'Pages/Settings/SupplierAddressContext/constants';
import { SupplierAddressContext } from 'Pages/Settings/SupplierAddressContext';
import AddressNoteForm from 'Pages/Settings/Components/Note';

const ContactNoteForm: FC = () => {
	const { dispatch, note } = useContext(SupplierAddressContext);

	const handleOnSubmit = useCallback(
		async (values: NoteFormFields) => {
			const submitError = await dispatch([
				SupplierAddressAction.setNote,
				values[FIELD_NAME],
			]);
			return Promise.resolve({
				[FIELD_NAME]: submitError,
			});
		},
		[dispatch]
	);

	return (
		<AddressNoteForm
			formKey="contactNote"
			id="contactNote"
			onSubmit={handleOnSubmit}
			initialValue={note}
		/>
	);
};

export default ContactNoteForm;
