import { useContext, useEffect, useRef, useState } from 'react';
import { get, invoke, set } from 'lodash-es';
import { Form } from 'react-final-form';
import { LocalizationContext } from 'Services/LocalizationService';
import { NotificationsContext } from 'Services/NotificationService';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { PreloaderContext } from 'Components/Preloader/context';
import { InputPassword } from 'Components/Form';
import { LOGIN_PASSWORD_TYPE } from 'Components/Form/Components/Password/constants';
import EditIcon from 'Components/Icons/Edit';
import api from 'vinisto_api_client/src/api';

import SaveButton from '../SaveButton';
import DiscardButton from '../DiscardButton';

import { IPasswordEditFields, IPasswordEditProps } from './interfaces';
import {
	USER_API_CHANGE_PASSWORD_PATH,
	USER_WRONG_OLD_PASS,
} from './constants';
import styles from './styles.module.css';

const PasswordEdit = ({ value }: IPasswordEditProps) => {
	const { handleShowErrorNotification, handleShowSuccessNotification } =
		useContext(NotificationsContext);
	const { vinistoUser } = useContext(AuthenticationContext);
	const t = useContext(LocalizationContext).useFormatMessage();
	const { togglePreloader } = useContext(PreloaderContext);
	const formReference = useRef();

	const [isEditing, setIsEditing] = useState<boolean>(false);

	const handleOnSetEditing = (editing: boolean) => () => {
		setIsEditing(editing);
	};

	const handleOnSubmit = (values: IPasswordEditFields) => {
		togglePreloader(true);
		api
			.put(USER_API_CHANGE_PASSWORD_PATH, undefined, {
				userLoginHash: vinistoUser.loginHash ?? '',
				oldPassword: values.currentPassword,
				newPassword: values.newPassword,
			})
			.then(() => {
				handleOnSetEditing(false)();
				handleShowSuccessNotification(
					'notification.message.userSection.settings.loginCredentials.success'
				);
			})
			.catch((specificError: Error) => {
				if (get(specificError, 'message') === USER_WRONG_OLD_PASS) {
					invoke(
						formReference,
						'current.mutators.updateChangePasswordFormWithApiError'
					)('userSettings.wrongOldPassword.error');
				} else {
					handleShowErrorNotification(
						'notification.message.userSection.settings.loginCredentials.error'
					);
				}
			})
			.finally(() => {
				togglePreloader(false);
			});
	};

	const passwordChangeMutators = {
		updateChangePasswordFormWithApiError:
			(_: [], state: Record<string, any>) => (apiError: string) => {
				state.formState.errors = {
					...state.formState.errors,
					currentPassword: apiError,
				};
				invoke(state, 'fields.currentPassword.blur');
			},
	};

	const handleOnDiscard = () => {
		invoke(formReference, 'current.reset');
		handleOnSetEditing(false)();
	};

	return (
		<Form
			initialValues={{
				password: value,
				currentPassword: '',
				newPassword: '',
			}}
			mutators={passwordChangeMutators}
			onSubmit={handleOnSubmit}
			render={(formRenderPropTypes: Record<any, any>) => {
				const { handleSubmit, form } = formRenderPropTypes;
				// TODO remove this abomination
				useEffect(() => {
					set(formReference, 'current', form);
				}, [form]);

				return (
					<form
						className={styles.passwordEditForm}
						onSubmit={handleSubmit}
					>
						<div>
							{!isEditing ? (
								<InputPassword
									label={
										<>
											{t({ id: 'form.input.password.label' })}
											<EditIcon
												onClick={handleOnSetEditing(!isEditing)}
												className={styles.editIcon}
											/>
										</>
									}
									readOnly={true}
									showPasswordToggle={false}
									className={styles.passwordInput}
									classNameLabel={styles.passwordLabel}
								/>
							) : (
								<>
									<InputPassword
										label={t({
											id: 'form.input.currentPassword.label',
										})}
										name={'currentPassword'}
										id={'currentPassword'}
										type={LOGIN_PASSWORD_TYPE}
										className={styles.passwordInput}
										classNameLabel={styles.passwordLabel}
									/>
									<div>
										<InputPassword
											label={t({
												id: 'form.input.newPassword.label',
											})}
											name={'newPassword'}
											id={'newPassword'}
											className={styles.passwordInput}
											classNameLabel={styles.passwordLabel}
										/>
									</div>
									<div className={styles.buttonsWrap}>
										<DiscardButton onClick={handleOnDiscard} />
										<SaveButton />
									</div>
								</>
							)}
						</div>
					</form>
				);
			}}
		/>
	);
};

export default PasswordEdit;
