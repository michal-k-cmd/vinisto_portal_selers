import { FC, useCallback, useContext } from 'react';
import { NoteFormFields } from 'Pages/Settings/Components/Note/interfaces';
import { FIELD_NAME } from 'Pages/Settings/Components/Note/constants';
import { SupplierDataAction } from 'Pages/Settings/SupplierDataContext/constants';
import { SupplierDataContext } from 'Pages/Settings/SupplierDataContext';
import AddressNoteForm from 'Pages/Settings/Components/Note';

const DeliveryNoteForm: FC = () => {
	const {
		dispatch,
		pickupAddress: { note },
	} = useContext(SupplierDataContext);

	const handleOnSubmit = useCallback(
		async (values: NoteFormFields) => {
			const submitError = await dispatch([
				SupplierDataAction.setNote,
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
			formKey="deliveryNote"
			id="deliveryNote"
			onSubmit={handleOnSubmit}
			initialValue={note}
		/>
	);
};

export default DeliveryNoteForm;
