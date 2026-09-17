import { useContext, useEffect, useRef, useState } from 'react';
import { invoke, set, size, unset } from 'lodash-es';
import { Form } from 'react-final-form';
import { MutableState } from 'final-form';
import { required } from 'Components/Form/validators';
import useUpdateAccount from 'Hooks/use-update-account';
import { LocalizationContext } from 'Services/LocalizationService';
import { NotificationsContext } from 'Services/NotificationService';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { PreloaderContext } from 'Components/Preloader/context';
import { InputText } from 'Components/Form';
import EditIcon from 'Components/Icons/Edit';

import SaveButton from '../SaveButton';
import DiscardButton from '../DiscardButton';

import {
	FIELD_NAME,
	MIN_LENGTH,
	NICKNAME_ALREADY_USED_ERROR,
} from './constants';
import styles from './styles.module.css';

interface NicknameEditProps {
	value: string;
}

const NicknameEdit = ({ value }: NicknameEditProps) => {
	const { handleShowErrorNotification, handleShowSuccessNotification } =
		useContext(NotificationsContext);

	const { vinistoUser, saveVinistoUser } = useContext(AuthenticationContext);
	const { loginHash } = vinistoUser;
	const updateAccount = useUpdateAccount();

	const { togglePreloader } = useContext(PreloaderContext);
	const t = useContext(LocalizationContext).useFormatMessage();

	const formReference = useRef();

	const [isEditing, setIsEditing] = useState<boolean>(false);

	const handleOnSetEditing = (editing: boolean) => () => {
		setIsEditing(editing);
	};

	const handleOnSubmit = async (values: any) => {
		return new Promise((resolve, reject) => {
			togglePreloader(true);
			updateAccount({ nickname: values[FIELD_NAME] || '' })
				.then((newVinistoUser) => {
					saveVinistoUser({
						...newVinistoUser,
						loginHash,
					});
					handleOnSetEditing(false)();
					handleShowSuccessNotification(
						'notification.message.userSection.settings.loginCredentials.success'
					);
					resolve({});
				})
				.catch((error) => {
					if (error.message === NICKNAME_ALREADY_USED_ERROR) {
						resolve({
							[FIELD_NAME]: 'userSection.settings.nickname.error.alreadyUsed',
						});
						return;
					}
					handleShowErrorNotification(
						'notification.message.userSection.settings.loginCredentials.error'
					);
					reject({});
				})
				.finally(() => {
					togglePreloader(false);
				});
		});
	};

	const handleOnDiscard = () => {
		invoke(formReference, 'current.reset');
		handleOnSetEditing(false)();
	};

	const validateNickname = (value: any) => {
		if (size(value) < MIN_LENGTH) {
			return 'form.input.nickname.error.tooShort';
		}
	};

	const mutators = {
		clearSubmissionState: (_: [], state: MutableState<Record<any, any>>) => {
			unset(state, `formState.submitErrors[${FIELD_NAME}]`);
		},
	};

	return (
		<Form
			{...{
				mutators,
				initialValues: {
					[FIELD_NAME]: value,
				},
				onSubmit: handleOnSubmit,
			}}
			render={(formRenderPropTypes) => {
				const { handleSubmit, form } = formRenderPropTypes;
				useEffect(() => {
					set(formReference, 'current', form);
				}, [form]);

				return (
					<form
						className={styles.nicknameEditForm}
						onSubmit={handleSubmit}
					>
						<InputText
							identifier="nickname"
							name={FIELD_NAME}
							placeholder="form.input.nickname.placeholder"
							customLabel={
								<>
									{`${t({
										id: 'form.input.nickname.label',
									})}`}
									<EditIcon
										onClick={handleOnSetEditing(!isEditing)}
										className={styles.editIcon}
									/>
								</>
							}
							readOnly={!isEditing}
							validate={[required, validateNickname]}
							onChange={() => form.mutators.clearSubmissionState([])}
							labelClassName={styles.nicknameLabel}
							className={styles.nicknameInput}
							classNameWrapper={styles.nicknameWrapper}
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

export default NicknameEdit;
