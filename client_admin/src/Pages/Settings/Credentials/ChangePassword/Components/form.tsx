import { FC, useCallback, useContext } from 'react';
import withForm from 'Components/SingleEditForm/withForm';

import { IChangePasswordForm } from '../interfaces';
import {
	ChangePasswordAction,
	CURRENT_PASSWORD_FIELD,
	PASSWORD_PLACEHOLDER_FIELD,
} from '../constants';
import { ChangePasswordContext } from '../context';

import ChangePasswordInput from './input';

const FormChangePassword = withForm<IChangePasswordForm>(ChangePasswordInput);

const ChangePasswordForm: FC = () => {
	const { dispatch } = useContext(ChangePasswordContext);
	const handleOnSubmit = useCallback(
		async (values: IChangePasswordForm) => {
			const submitError = await dispatch([
				ChangePasswordAction.change,
				{
					currentPassword: values.currentPassword,
					newPassword: values.newPassword,
				},
			]);
			return Promise.resolve({
				[CURRENT_PASSWORD_FIELD]: submitError,
			});
		},
		[dispatch]
	);

	return (
		<FormChangePassword
			formKey="userPassword"
			onSubmit={handleOnSubmit}
			initialValues={{ [PASSWORD_PLACEHOLDER_FIELD]: '*****' }}
			btnsClassName="single-edit-form__inline-btn-wrapper"
		/>
	);
};

export default ChangePasswordForm;
