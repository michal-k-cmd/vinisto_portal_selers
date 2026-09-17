import { FC, useCallback, useContext } from 'react';
import { get, invoke } from 'Helpers/lodash';
import { apiServiceInstance } from 'Services/ApiService';
import { ModalContext } from 'Components/Modal/context';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { NotificationsContext } from 'Services/NotificationService';
import {
	Form,
	InputEmail,
	InputPassword,
	InputSwitch,
	Validators,
} from 'Components/Form';

/**
 * @category Component Create User Modal Content
 */
const CreateUserModal: FC = () => {
	const notificationsContext = useContext(NotificationsContext);
	const modalContext = useContext(ModalContext);
	const authenticationContext = useContext(AuthenticationContext);

	const handleOnCreateUser = useCallback(
		(formValues: Record<any, any>) => {
			const loginHash = get(
				authenticationContext,
				'vinistoUser.loginHash',
				null
			);
			apiServiceInstance
				.post(
					'user-api/users',
					{
						email: get(formValues, 'email'),
						password: get(formValues, 'password'),
						isNewsletterActive: get(formValues, 'isNewsletterActive', false),
						isAgreementCC: get(formValues, 'isAgreementCC', false),
						userLoginHash: loginHash,
					},
					true
				)
				.then(() => {
					modalContext.handleCloseModal();
					notificationsContext.handleShowSuccessNotification(
						'admin.modal.createUser.success'
					);
					invoke(modalContext, 'data.resetUserList');
				})
				.catch(() => {
					notificationsContext.handleShowErrorNotification(
						'admin.modal.createUser.error'
					);
				});
		},
		[authenticationContext]
	);

	return (
		<Form
			submitCallback={handleOnCreateUser}
			submitText={'admin.modal.createUser'}
		>
			<InputEmail
				name="email"
				identifier="email"
				validate={[Validators.requireEmail, Validators.validateEmail]}
			/>

			<InputPassword
				name="password"
				identifier="password"
				label="form.input.password.label"
				placeholder="form.input.password.placeholder"
				validate={Validators.validatePassword}
			/>

			<InputSwitch
				name="isAgreementCC"
				identifier="isAgreementCC"
				label="admin.modal.createUser.isAgreementCC.label"
				validate={Validators.required}
			/>

			<InputSwitch
				label="admin.modal.createUser.isNewsletterActive.label"
				name="isNewsletterActive"
				identifier="isNewsletterActive"
			/>
		</Form>
	);
};

export default CreateUserModal;
