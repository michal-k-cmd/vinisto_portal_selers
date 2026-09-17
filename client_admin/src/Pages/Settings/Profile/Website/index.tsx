import { FC, useCallback, useContext } from 'react';
import { SupplierDataAction } from 'Pages/Settings/SupplierDataContext/constants';
import { SupplierDataContext } from 'Pages/Settings/SupplierDataContext';
import withForm from 'Components/SingleEditForm/withForm';

import { FIELD_NAME } from './constants';
import { WebsiteFormFields } from './interfaces';
import WebsiteInput from './input';

const FormWebsite = withForm<WebsiteFormFields>(WebsiteInput);

const WebsiteForm: FC = () => {
	const { dispatch, web } = useContext(SupplierDataContext);

	const handleOnSubmit = useCallback(
		async (values: WebsiteFormFields) => {
			const submitError = await dispatch([
				SupplierDataAction.setWebsite,
				values[FIELD_NAME],
			]);
			return Promise.resolve({
				[FIELD_NAME]: submitError,
			});
		},
		[dispatch]
	);

	return (
		<FormWebsite
			formKey="website"
			onSubmit={handleOnSubmit}
			initialValues={{ [FIELD_NAME]: web }}
			btnsClassName="single-edit-form__inline-btn-wrapper"
		/>
	);
};

export default WebsiteForm;
