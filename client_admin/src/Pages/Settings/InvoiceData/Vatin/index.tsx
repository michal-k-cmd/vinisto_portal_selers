import { FC, useCallback, useContext } from 'react';
import { SupplierDataAction } from 'Pages/Settings/SupplierDataContext/constants';
import { SupplierDataContext } from 'Pages/Settings/SupplierDataContext';
import withForm from 'Components/SingleEditForm/withForm';

import { FIELD_NAME } from './constants';
import { VatinFormFields } from './interfaces';
import VatinInput from './input';

const FormVatin = withForm<VatinFormFields>(VatinInput);

const VatinForm: FC = () => {
	const { dispatch, dic } = useContext(SupplierDataContext);

	const handleOnSubmit = useCallback(
		async (values: VatinFormFields) => {
			const submitError = await dispatch([
				SupplierDataAction.setVatin,
				values[FIELD_NAME],
			]);
			return Promise.resolve({
				[FIELD_NAME]: submitError,
			});
		},
		[dispatch]
	);

	return (
		<FormVatin
			formKey="invoiceVatin"
			onSubmit={handleOnSubmit}
			initialValues={{ [FIELD_NAME]: dic }}
			btnsClassName="single-edit-form__inline-btn-wrapper"
		/>
	);
};

export default VatinForm;
