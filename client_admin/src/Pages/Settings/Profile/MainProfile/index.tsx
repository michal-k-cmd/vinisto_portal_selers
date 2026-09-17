import { FC, useCallback, useContext } from 'react';
import { SupplierDataAction } from 'Pages/Settings/SupplierDataContext/constants';
import { SupplierDataContext } from 'Pages/Settings/SupplierDataContext';
import withForm from 'Components/SingleEditForm/withForm';

import { FIELD_NAME } from './constants';
import { MainProfileFormFields } from './interfaces';
import MainProfileInput from './input';

const FormMainProfile = withForm<MainProfileFormFields>(MainProfileInput);

const MainProfileForm: FC = () => {
	const { dispatch, mainProfile } = useContext(SupplierDataContext);

	const handleOnSubmit = useCallback(
		async (values: MainProfileFormFields) => {
			const submitError = await dispatch([
				SupplierDataAction.setMainProfile,
				values[FIELD_NAME],
			]);
			return Promise.resolve({
				[FIELD_NAME]: submitError,
			});
		},
		[dispatch]
	);

	return (
		<FormMainProfile
			formKey="mainProfile"
			onSubmit={handleOnSubmit}
			initialValues={{ [FIELD_NAME]: mainProfile }}
			btnsClassName="single-edit-form__inline-btn-wrapper"
		/>
	);
};

export default MainProfileForm;
