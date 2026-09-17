import { FC, useCallback, useContext } from 'react';
import { SupplierDataAction } from 'Pages/Settings/SupplierDataContext/constants';
import { SupplierDataContext } from 'Pages/Settings/SupplierDataContext';
import withForm from 'Components/SingleEditForm/withForm';

import { FIELD_NAME } from './constants';
import { SupplierNameFormFields } from './interfaces';
import SupplierNameInput from './input';

const FormSupplierName = withForm<SupplierNameFormFields>(SupplierNameInput);

const SupplierNameForm: FC = () => {
	const { dispatch, nameBilling } = useContext(SupplierDataContext);

	const handleOnSubmit = useCallback(
		async (values: SupplierNameFormFields) => {
			const submitError = await dispatch([
				SupplierDataAction.setSupplierName,
				values[FIELD_NAME],
			]);
			return Promise.resolve({
				[FIELD_NAME]: submitError,
			});
		},
		[dispatch]
	);

	return (
		<FormSupplierName
			formKey="invoiceSupplierName"
			onSubmit={handleOnSubmit}
			initialValues={{ [FIELD_NAME]: nameBilling }}
			btnsClassName="single-edit-form__inline-btn-wrapper"
		/>
	);
};

export default SupplierNameForm;
