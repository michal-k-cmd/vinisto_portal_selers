'use client';

import cx from 'classnames';
import { useContext } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';
import NewsletterService from 'Services/NewsletterService';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import UserService from 'Services/UserService';
import { NotificationsContext } from 'Services/NotificationService';
import { useMutation } from '@tanstack/react-query';
import EnvelopeIcon from 'Components/Icons/Envelope';
import LoadingSpinner from 'Components/Preloader/Components/LoadingSpinner';

import styles from './styles.module.css';

import {
	ContentNewsletterFormComponent,
	Landing,
} from '@/api-types/strapi-api';
import { VinistoHelperDllEnumsEcoMailRegistrationType } from '@/api-types/services-api';

const NewsletterForm = (
	params: ContentNewsletterFormComponent & { type?: Landing['Type'] }
) => {
	const { useFormatMessage } = useContext(LocalizationContext);
	const t = useFormatMessage();
	const { isLoggedIn, vinistoUser, saveVinistoUser } = useContext(
		AuthenticationContext
	);
	const { handleShowSuccessNotification, handleShowErrorNotification } =
		useContext(NotificationsContext);

	const subsrcibeToNewsletterMutation = useMutation({
		mutationFn: (emailAddress: string) =>
			NewsletterService.subscribe({
				email: emailAddress,
				type: VinistoHelperDllEnumsEcoMailRegistrationType.VINISTO_LANDING,
			}).then((result) => {
				if (!result) throw new Error();
				if (!isLoggedIn || emailAddress !== vinistoUser.email) {
					// if user is not logged in or email address is different - we need to update him anyway by calling the API
					// but we don't need to update the user in the context - because it is a different user
					UserService.addEmailToNewsletter(emailAddress);
					return;
				}
				UserService.update(vinistoUser.id ?? '', {
					email: vinistoUser.email ?? '',
					userLoginHash: vinistoUser.loginHash ?? '',
					isNewsletterActive: true,
				}).then((newVinistoUser) => {
					saveVinistoUser(newVinistoUser);
				});
			}),
		onError: () => {
			handleShowErrorNotification('footer.newsletter.error');
		},
		onSuccess: () => {
			handleShowSuccessNotification('footer.newsletter.success');
		},
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const emailInput = e.currentTarget.querySelector(
			'input[type="email"]'
		) as HTMLInputElement;
		const emailAddress = emailInput.value;
		if (emailAddress) {
			subsrcibeToNewsletterMutation.mutate(emailAddress);
			emailInput.value = '';
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.contentWrapper}>
				<div className={styles.textContainer}>
					{(params.Title || params.Description) && (
						<>
							{params.Title && (
								<span className={styles.title}>{params.Title}</span>
							)}
							{params.Description && (
								<p className={styles.description}>{params.Description}</p>
							)}
						</>
					)}
				</div>
				<form
					className={styles.formContainer}
					onSubmit={handleSubmit}
				>
					<div className={styles.inputGroup}>
						<EnvelopeIcon className={styles.envelopeIcon} />
						<input
							type="email"
							placeholder={
								params.Placeholder ??
								`${t({
									id: 'producer.newsletter.placeholder',
									defaultMessage: 'Zde zadejte váš email',
								})}`
							}
							className={styles.emailInput}
							required
							aria-label={
								params.Placeholder ??
								`${t({
									id: 'producer.newsletter.placeholder',
									defaultMessage: 'Zde zadejte váš email',
								})}`
							}
							aria-required="true"
						/>
						<button
							className={styles.submitButton}
							type="submit"
							disabled={subsrcibeToNewsletterMutation.isLoading}
						>
							{subsrcibeToNewsletterMutation.isLoading && (
								<LoadingSpinner
									height={20}
									width={20}
									strokeWidth={3}
									wrapperClass="h-100"
									visible={subsrcibeToNewsletterMutation.isLoading}
								/>
							)}
							<span
								className={cx({
									invisible: subsrcibeToNewsletterMutation.isLoading,
								})}
							>
								{params.CTA ??
									t({
										id: 'producer.newsletter.submit',
										defaultMessage: 'Přihlásit k odběru',
									})}
							</span>
						</button>
					</div>
					<span className={styles.disclaimer}>
						&#x2a;{` `}
						{t({
							id: 'producer.newsletter.disclaimer',
							defaultMessage: 'Odběr aktualit lze kdykoliv zrušit',
						})}
					</span>
				</form>
			</div>
			<div className={styles.wineImageContainer}>
				<img
					src="/assets/images/newsletter-wine.png"
					alt="Wine bottles"
					className={styles.imageStyles}
				/>
			</div>
			<div className={styles.maskImageContainer}>
				<img
					src="/assets/images/newsletter-mask.png"
					alt="Decorative mask"
					className={styles.imageStyles}
				/>
			</div>
		</div>
	);
};

export default NewsletterForm;
