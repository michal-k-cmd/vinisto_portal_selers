import { FC, useCallback, useContext } from 'react';
import { TitleFormFields } from 'Pages/Settings/Components/Title/interfaces';
import { FIELD_NAME } from 'Pages/Settings/Components/Title/constants';
import { SupplierDataAction } from 'Pages/Settings/SupplierDataContext/constants';
import { SupplierDataContext } from 'Pages/Settings/SupplierDataContext';
import AddressTitleForm from 'Pages/Settings/Components/Title';

const DeliveryTitleForm: FC = () => {
	const {
		dispatch,
		pickupAddress: { title },
	} = useContext(SupplierDataContext);

	const handleOnSubmit = useCallback(
		async (values: TitleFormFields) => {
			const submitError = await dispatch([
				SupplierDataAction.setTitle,
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
			formKey="deliveryTitle"
			id="deliveryTitle"
			onSubmit={handleOnSubmit}
			initialValue={title}
		/>
	);
};

export default DeliveryTitleForm;
