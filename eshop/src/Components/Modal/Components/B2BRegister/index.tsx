'use client';

import { useCallback, useContext, useState } from 'react';
import { FormApi } from 'final-form';
import { Form } from 'react-final-form';
import cx from 'classnames';
import { isFunction } from 'lodash-es';
import { Spinner } from 'react-bootstrap';
import Button from 'Components/Button';
import { LOGIN_MODAL, SAFE_REOPEN_TIMEOUT } from 'Components/Modal/constants';
import { ModalContext } from 'Components/Modal/context';
import { LocalizationContext } from 'Services/LocalizationService';
import { NotificationsContext } from 'Services/NotificationService';
import B2BRegistrationService from 'Services/B2BRegistrationService';
import useAnalytics from 'Hooks/useAnalytics';
import { GA_EVENT } from 'Hooks/useAnalytics/constants';

import AccountStep from './Components/AccountStep';
import CompanyStep from './Components/CompanyStep';
import CompleteStep from './Components/CompleteStep';
import ContactStep from './Components/ContactStep';
import SummaryStep from './Components/SummaryStep';
import {
	COMPLETE_STEP,
	CONTACT_STEP,
	LAST_FORM_STEP,
	STEPS,
	SUMMARY_STEP,
} from './constants';
import { FormValues } from './interfaces';
import {
	createB2BRegistrationRequest,
	getB2BRegistrationErrorMessage,
} from './helpers';
import styles from './styles.module.css';

import { VinistoHelperDllEnumsCountryCode } from '@/api-types/user-api';

const B2BRegisterModal = () => {
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();
	const { handleShowErrorNotification } = useContext(NotificationsContext);
	const modalContext = useContext(ModalContext);
	const { sendEvent } = useAnalytics();
	const [currentStep, setCurrentStep] = useState(1);
	const [isStepLoading, setIsStepLoading] = useState(false);
	const onRegister = modalContext.modalData?.onRegister;

	const handleSubmit = useCallback(
		async (values: FormValues, form: FormApi<FormValues>) => {
			if (currentStep < LAST_FORM_STEP) {
				if (currentStep === CONTACT_STEP - 1 && !values.companyEmail) {
					form.change('companyEmail', values.email);
				}
				setCurrentStep((step) => step + 1);
				return;
			}

			try {
				const requestBody = createB2BRegistrationRequest(
					values,
					localizationContext.countryOfSale
				);
				const registrationResult = await B2BRegistrationService.register(
					requestBody
				);
				const registeredUser = registrationResult.user;

				if (registeredUser?.id && registeredUser.email) {
					sendEvent(GA_EVENT.SIGN_UP, {
						method: 'email',
						customer_type: 'b2b',
						user_id: registeredUser.id,
						user_email: registeredUser.email,
					});
				}
				if (isFunction(onRegister)) onRegister();
				setCurrentStep(COMPLETE_STEP);
			} catch (error) {
				handleShowErrorNotification(getB2BRegistrationErrorMessage(error));
			}
		},
		[
			currentStep,
			handleShowErrorNotification,
			localizationContext.countryOfSale,
			onRegister,
			sendEvent,
		]
	);

	const handleBack = useCallback(() => {
		setCurrentStep((step) => Math.max(1, step - 1));
	}, []);

	const handleOpenLogin = useCallback(() => {
		modalContext.handleCloseModal();
		setTimeout(() => {
			modalContext.handleOpenModal(LOGIN_MODAL);
		}, SAFE_REOPEN_TIMEOUT);
	}, [modalContext]);

	return (
		<div className={styles.registration}>
			<header className={styles.intro}>
				<span className={styles.badge}>
					{t({ id: 'modal.b2bRegistration.badge' })}
				</span>
				<h3>{t({ id: 'modal.b2bRegistration.title' })}</h3>
				<p>{t({ id: 'modal.b2bRegistration.subtitle' })}</p>
			</header>

			<ol
				className={styles.steps}
				aria-label={
					t({ id: 'modal.b2bRegistration.progressLabel' })?.toString() ??
					undefined
				}
			>
				{STEPS.map((step, index) => {
					const stepNumber = index + 1;
					const isActive = stepNumber === currentStep;
					const isComplete = stepNumber < currentStep;

					return (
						<li
							key={step}
							className={cx(styles.step, {
								[styles.stepActive]: isActive,
								[styles.stepComplete]: isComplete,
							})}
							aria-current={isActive ? 'step' : undefined}
						>
							<span>{stepNumber}</span>
							<strong>{t({ id: step })}</strong>
						</li>
					);
				})}
			</ol>

			<Form<FormValues>
				onSubmit={handleSubmit}
				initialValues={{
					preferredCommunication: 'emailAndPhone',
					billingCountryCode: VinistoHelperDllEnumsCountryCode.CZ,
					useBillingAddressForDelivery: true,
					isNewsletterActive: false,
					isAgreementCC: false,
				}}
				render={({
					form,
					handleSubmit: submitForm,
					invalid,
					submitting,
					validating,
					values,
				}) => (
					<form
						className={styles.form}
						onSubmit={submitForm}
					>
						{currentStep === 1 && <AccountStep />}
						{currentStep === 2 && (
							<CompanyStep
								form={form}
								onLoadingChange={setIsStepLoading}
								useBillingAddressForDelivery={
									!!values.useBillingAddressForDelivery
								}
							/>
						)}
						{currentStep === CONTACT_STEP && <ContactStep />}
						{currentStep === SUMMARY_STEP && <SummaryStep values={values} />}
						{currentStep === COMPLETE_STEP && (
							<CompleteStep onLogin={handleOpenLogin} />
						)}

						{currentStep <= LAST_FORM_STEP && (
							<footer className={styles.actions}>
								{currentStep > 1 && (
									<Button
										type="button"
										className={styles.secondaryButton}
										onClick={handleBack}
									>
										{t({ id: 'modal.b2bRegistration.back' })}
									</Button>
								)}
								<Button
									type="submit"
									className="vinisto-bg-green"
									disabled={
										invalid || isStepLoading || submitting || validating
									}
								>
									{(isStepLoading || submitting || validating) && (
										<span className={styles.delayedSpinner}>
											<Spinner size="sm" />
										</span>
									)}
									{t({
										id:
											currentStep === LAST_FORM_STEP
												? 'modal.b2bRegistration.submit'
												: 'modal.b2bRegistration.continue',
									})}
								</Button>
							</footer>
						)}
					</form>
				)}
			/>
		</div>
	);
};

export default B2BRegisterModal;
