import { FC, useCallback, useContext } from 'react';
import { SupplierDataAction } from 'Pages/Settings/SupplierDataContext/constants';
import { SupplierDataContext } from 'Pages/Settings/SupplierDataContext';
import withForm from 'Components/SingleEditForm/withForm';

import { FIELD_NAME } from './constants';
import { CompanyDescriptionFormFields } from './interfaces';
import CompanyDescriptionInput from './input';

const FormCompanyDescription = withForm<CompanyDescriptionFormFields>(
	CompanyDescriptionInput
);

const CompanyDescriptionForm: FC = () => {
	const { dispatch, companyDescription } = useContext(SupplierDataContext);

	const handleOnSubmit = useCallback(
		async (values: CompanyDescriptionFormFields) => {
			const submitError = await dispatch([
				SupplierDataAction.setCompanyDescription,
				values[FIELD_NAME],
			]);
			return Promise.resolve({
				[FIELD_NAME]: submitError,
			});
		},
		[dispatch]
	);

	return (
		<FormCompanyDescription
			formKey="companyDescription"
			onSubmit={handleOnSubmit}
			initialValues={{ [FIELD_NAME]: companyDescription }}
			btnsClassName="single-edit-form__inline-btn-wrapper"
		/>
	);
};

export default CompanyDescriptionForm;
