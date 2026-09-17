import { FC, useCallback, useContext } from 'react';
import { SupplierDataAction } from 'Pages/Settings/SupplierDataContext/constants';
import { SupplierDataContext } from 'Pages/Settings/SupplierDataContext';
import withForm from 'Components/SingleEditForm/withForm';

import { FIELD_NAME } from './constants';
import { SupplierNameFormFields } from './interfaces';
import SupplierNameWebInput from './input';

const FormSupplierName = withForm<SupplierNameFormFields>(SupplierNameWebInput);

const SupplierNameWebForm: FC = () => {
	const { dispatch, nameWeb } = useContext(SupplierDataContext);

	const handleOnSubmit = useCallback(
		async (values: SupplierNameFormFields) => {
			const submitError = await dispatch([
				SupplierDataAction.setSupplierNameWeb,
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
			formKey="profileSupplierNameWeb"
			onSubmit={handleOnSubmit}
			initialValues={{ [FIELD_NAME]: nameWeb }}
			btnsClassName="single-edit-form__inline-btn-wrapper"
		/>
	);
};

export default SupplierNameWebForm;
