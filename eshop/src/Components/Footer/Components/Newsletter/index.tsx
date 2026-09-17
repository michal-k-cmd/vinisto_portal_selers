'use client';

import React from 'react';
import { get, invoke, set, unset } from 'lodash-es';
import { Form, FormRenderProps } from 'react-final-form';
import { FormApi, MutableState } from 'final-form';
import { useInViewport } from 'react-in-viewport';
import { FIELD_NAME as EMAIL_FIELD_NAME } from 'Components/Form/Components/Email/constants';
import { requireEmail } from 'Components/Form/validators';
import NewsletterService from 'Services/NewsletterService';
import UserService from 'Services/UserService';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { LocalizationContext } from 'Services/LocalizationService';
import { NotificationsContext } from 'Services/NotificationService';
import { InputEmail } from 'Components/Form';

import { CLEAR_ERROR_DELAY } from './constants';

const Newsletter = ({ title }: { title: React.ReactNode }) => {
	const authenticationContext = React.useContext(AuthenticationContext);
	const localizationContext = React.useContext(LocalizationContext);
	const notificationsContext = React.useContext(NotificationsContext);

	const t = localizationContext.useFormatMessage();

	const handleOnSubmit = React.useCallback(
		(formValues: Record<any, any>, form: FormApi) => {
			const emailError = requireEmail(formValues[EMAIL_FIELD_NAME]);
			if (emailError) {
				return { [EMAIL_FIELD_NAME]: emailError };
			}
			const emailAddress = get(formValues, EMAIL_FIELD_NAME, '');
			NewsletterService.subscribe({ email: emailAddress })
				.then((result) => {
					// result is boolean
					if (!result) throw new Error();
					new Promise<void>((resolve) => {
						if (
							!authenticationContext.isLoggedIn ||
							emailAddress !== get(authenticationContext, 'vinistoUser.email')
						) {
							// if user is not logged in or email address is different - we need to update him anyway by calling the API
							// but we don't need to update the user in the context - because it is a different user
							UserService.addEmailToNewsletter(emailAddress);
							resolve();
							return;
						}
						UserService.update(
							get(authenticationContext, 'vinistoUser.id', ''),
							{
								email: get(authenticationContext, 'vinistoUser.email', ''),
								userLoginHash: get(
									authenticationContext,
									'vinistoUser.loginHash',
									''
								),
								isNewsletterActive: true,
							}
						).then((newVinistoUser) => {
							authenticationContext.saveVinistoUser(newVinistoUser);
							resolve();
						});
					}).then(() => {
						notificationsContext.handleShowSuccessNotification(
							'footer.newsletter.success'
						);
						form.restart();
					});
				})
				.catch(() => {
					notificationsContext.handleShowErrorNotification(
						'footer.newsletter.error'
					);
				});
		},
		[
			authenticationContext.isLoggedIn,
			authenticationContext?.vinistoUser?.email,
		]
	);

	const mutators = {
		clearSubmissionState: (_: [], state: MutableState<Record<any, any>>) => {
			unset(state, `formState.submitErrors[${EMAIL_FIELD_NAME}]`);
		},
	};
	const mutatorsRef = React.useRef({});
	const formRef = React.useRef<typeof Form>(null);
	const formElRef = React.useRef<HTMLFormElement>(null);
	const { inViewport } = useInViewport(formElRef);

	React.useEffect(() => {
		const emailSubmitError = get(
			invoke(formRef, 'current.getFieldState', EMAIL_FIELD_NAME),
			'submitError'
		);
		if (!emailSubmitError || inViewport) {
			return;
		}

		const timeout = window.setTimeout(() => {
			invoke(mutatorsRef, 'current.clearSubmissionState');
		}, CLEAR_ERROR_DELAY);

		return () => {
			if (timeout) {
				clearTimeout(timeout);
			}
		};
	}, [inViewport, formRef]);

	return (
		<Form
			{...{
				mutators,
				onSubmit: handleOnSubmit,
			}}
		>
			{(props: FormRenderProps) => {
				const form = get(props, 'form');
				const formMutators = get(form, 'mutators');
				React.useEffect(() => {
					set(mutatorsRef, 'current', formMutators);
					set(formRef, 'current', form);
				}, [formMutators, form]);

				return (
					<form
						onSubmit={props.handleSubmit}
						className="vinisto-ft-newsletter"
						ref={formElRef}
					>
						<label
							htmlFor="email"
							className="newsletter-h5 h5"
						>
							{title}
						</label>
						<div className="vinisto-ft-newsletter-input-button-wrapper">
							<InputEmail
								className="newsletter-vinisto"
								classNameWrapper="vinisto-ft-newsletter__email-wrapper"
								label={false}
							/>
							<button
								className="vinisto-bg-green vinisto-btn vinisto-ft-newsletter__btn text-nowrap"
								type="submit"
							>
								{t({ id: 'footer.newsletter.button' })}
							</button>
						</div>
					</form>
				);
			}}
		</Form>
	);
};

export default Newsletter;
