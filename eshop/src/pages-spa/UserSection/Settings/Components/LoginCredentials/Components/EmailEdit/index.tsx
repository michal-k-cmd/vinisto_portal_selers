import { useContext, useEffect, useRef, useState } from 'react';
import { get, invoke, set } from 'lodash-es';
import { Form } from 'react-final-form';
import { requireEmail } from 'Components/Form/validators';
import useUpdateAccount from 'Hooks/use-update-account';
import { LocalizationContext } from 'Services/LocalizationService';
import { NotificationsContext } from 'Services/NotificationService';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { PreloaderContext } from 'Components/Preloader/context';
import { InputEmail } from 'Components/Form';
import EditIcon from 'Components/Icons/Edit';

import SaveButton from '../SaveButton';
import DiscardButton from '../DiscardButton';

import { USER_UPDATE_USER_EMAIL_EXIST } from './constants';
import { IEmailEditFields, IEmailEditProps } from './interfaces';
import styles from './styles.module.css';

const EmailEdit = ({ value }: IEmailEditProps) => {
	const { handleShowErrorNotification, handleShowSuccessNotification } =
		useContext(NotificationsContext);
	const { saveVinistoUser } = useContext(AuthenticationContext);
	const updateAccount = useUpdateAccount();
	const formReference = useRef();
	const t = useContext(LocalizationContext).useFormatMessage();
	const preloaderContext = useContext(PreloaderContext);

	const [isEditing, setIsEditing] = useState<boolean>(false);

	const handleOnSetEditing = (editing: boolean) => () => {
		setIsEditing(editing);
	};

	const handleOnSubmit = (values: IEmailEditFields) => {
		preloaderContext.togglePreloader(true);
		updateAccount({ email: values.email })
			.then((newVinistoUser) => {
				saveVinistoUser(newVinistoUser);
				handleOnSetEditing(false)();
				handleShowSuccessNotification(
					'notification.message.userSection.settings.loginCredentials.success'
				);
			})
			.catch((specificError: Error) => {
				if (get(specificError, 'message') === USER_UPDATE_USER_EMAIL_EXIST) {
					invoke(
						formReference,
						'current.mutators.updateChangeEmailFormWithApiError'
					)('userSettings.emailExist.error');
				} else {
					handleShowErrorNotification(
						'notification.message.userSection.settings.loginCredentials.error'
					);
				}
			})
			.finally(() => {
				preloaderContext.togglePreloader(false);
			});
	};

	const handleOnDiscard = () => {
		invoke(formReference, 'current.reset');
		handleOnSetEditing(false)();
	};

	const emailChangeMutators = {
		updateChangeEmailFormWithApiError:
			(_: [], state: Record<any, any>) => (apiError: string) => {
				state.formState.errors = {
					...state.formState.errors,
					email: apiError,
				};
				invoke(state, 'fields.email.blur');
			},
	};

	return (
		<Form
			initialValues={{
				email: value,
			}}
			mutators={emailChangeMutators}
			onSubmit={handleOnSubmit}
			render={(formRenderPropTypes: Record<any, any>) => {
				const { handleSubmit, form } = formRenderPropTypes;
				useEffect(() => {
					set(formReference, 'current', form);
				}, [form]);

				return (
					<form
						className={styles.emailEditForm}
						onSubmit={handleSubmit}
					>
						<InputEmail
							label={
								<>
									{t({ id: 'form.input.email.label' })}
									<EditIcon
										onClick={handleOnSetEditing(!isEditing)}
										className={styles.editIcon}
									/>
								</>
							}
							validate={requireEmail}
							readOnly={!isEditing}
							classNameLabel={styles.emailLabel}
							className={styles.emailInput}
							classNameWrapper={styles.emailWrapper}
						/>
						{isEditing && (
							<div className={styles.buttonsWrap}>
								<DiscardButton onClick={handleOnDiscard} />
								<SaveButton />
							</div>
						)}
					</form>
				);
			}}
		/>
	);
};

export default EmailEdit;
