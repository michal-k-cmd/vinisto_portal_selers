import { ChangeEvent, useContext } from 'react';
import cx from 'classnames';
import NewsletterService from 'Services/NewsletterService';
import useUpdateAccount from 'Hooks/use-update-account';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { LocalizationContext } from 'Services/LocalizationService';
import { NotificationsContext } from 'Services/NotificationService';

import styles from './styles.module.css';

const Newsletter = () => {
	const { vinistoUser, saveVinistoUser } = useContext(AuthenticationContext);
	const updateAccount = useUpdateAccount();
	const t = useContext(LocalizationContext).useFormatMessage();
	const { handleShowSuccessNotification, handleShowErrorNotification } =
		useContext(NotificationsContext);

	const isNewsletterActive = vinistoUser.isNewsletterActive ?? '';
	const userEmail = vinistoUser.email ?? '';
	const userLoginHash = vinistoUser.loginHash;

	const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
		const isChecked = event.target.checked;
		new Promise<string>((resolve, reject) => {
			if (!isNewsletterActive) {
				NewsletterService.subscribe({ email: userEmail })
					.then((result) => {
						if (!result as boolean) throw new Error();
						resolve('userSection.settings.newsletter.subscribe.success');
					})
					.catch(() => {
						reject('userSection.settings.newsletter.subscribe.error');
					});
			} else {
				NewsletterService.unsubscribe(userEmail)
					.then((result) => {
						if (!result as boolean) throw new Error();
						resolve('userSection.settings.newsletter.delete.success');
					})
					.catch(() => {
						reject('userSection.settings.newsletter.delete.error');
					});
			}
		})
			.then(
				(successMsg) => {
					updateAccount({
						isNewsletterActive: isChecked,
						isAgreementCC: true,
					}).then((newVinistoUser) => {
						saveVinistoUser({
							...newVinistoUser,
							loginHash: userLoginHash,
						});
						handleShowSuccessNotification(successMsg);
					});
				},
				(errorMsg) => {
					handleShowErrorNotification(errorMsg);
				}
			)
			.catch(() => {
				handleShowErrorNotification('userSection.settings.newsletter.error');
			});
	};

	return (
		<div className={cx('vinisto-popup__checkbox', styles.checkbox)}>
			<label className={styles.newsletterLabel}>
				<input
					type="checkbox"
					onChange={handleOnChange}
					checked={isNewsletterActive}
					className="vinisto-popup__checkmark"
				></input>
				<span className="vinisto-popup__checkmark vinisto-popup__checkmark--checkbox"></span>
				{t({
					id: 'modal.registration.isNewsletterActive.label',
				})}
			</label>
		</div>
	);
};

export default Newsletter;
