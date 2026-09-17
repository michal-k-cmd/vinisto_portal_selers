import { FC, useCallback, useContext } from 'react';
import { SupplierDataAction } from 'Pages/Settings//SupplierDataContext/constants';
import { SupplierDataContext } from 'Pages/Settings//SupplierDataContext';
import withForm from 'Components/SingleEditForm/withForm';

import { FIELD_NAME } from './constants';
import { IdNumberFormFields } from './interfaces';
import IdNumberInput from './input';

const FormIdNumber = withForm<IdNumberFormFields>(IdNumberInput);

const IdNumberForm: FC = () => {
	const { dispatch, ico } = useContext(SupplierDataContext);

	const handleOnSubmit = useCallback(
		async (values: IdNumberFormFields) => {
			const submitError = await dispatch([
				SupplierDataAction.setIdNumber,
				values[FIELD_NAME],
			]);
			return Promise.resolve({
				[FIELD_NAME]: submitError,
			});
		},
		[dispatch]
	);

	return (
		<FormIdNumber
			formKey="invoiceIdNumber"
			onSubmit={handleOnSubmit}
			initialValues={{ [FIELD_NAME]: ico }}
			btnsClassName="single-edit-form__inline-btn-wrapper"
		/>
	);
};

export default IdNumberForm;
