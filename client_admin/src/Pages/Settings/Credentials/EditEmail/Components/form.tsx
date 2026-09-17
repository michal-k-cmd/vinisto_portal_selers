import { FC, useCallback, useContext } from 'react';
import withForm from 'Components/SingleEditForm/withForm';

import { IEditEmailForm } from '../interfaces';
import { EditEmailAction, FIELD_ID } from '../constants';
import { EditEmailContext } from '../context';

import EditEmailInput from './input';

const FormEditEmail = withForm<IEditEmailForm>(EditEmailInput);

const EditEmailForm: FC = () => {
	const { email, dispatch } = useContext(EditEmailContext);
	const handleOnSubmit = useCallback(
		async (values: IEditEmailForm) => {
			const submitError = await dispatch([
				EditEmailAction.update,
				values.userEmail,
			]);
			return Promise.resolve({
				[FIELD_ID]: submitError,
			});
		},
		[dispatch]
	);

	return (
		<FormEditEmail
			formKey="userEmail"
			onSubmit={handleOnSubmit}
			initialValues={{ [FIELD_ID]: email }}
			btnsClassName="single-edit-form__inline-btn-wrapper"
		/>
	);
};

export default EditEmailForm;
