import { useCallback, useContext, useState } from 'react';
import { get, set } from 'lodash-es';
import {
	SAFE_REOPEN_TIMEOUT,
	VINISTO_PLUS_BASKET_LOGIN_MODAL,
} from 'Components/Modal/constants';
import { PASSWORD_TYPE } from 'Components/Form/Components/Password/constants';
import { requireEmail } from 'Components/Form/validators';
import { ModalContext } from 'Components/Modal/context';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { LocalizationContext } from 'Services/LocalizationService';
import {
	Form,
	InputCheckBox,
	InputEmail,
	InputPassword,
} from 'Components/Form';
import VinistoLink from 'Components/VinistoLink';
import { TEST_IDS } from 'Constants/test-ids';
import OAuthLogin from 'pages-spa/CartShippingData/Components/OAuthLogin';
import usePlatformStaticPagePath from 'Hooks/usePlatformStaticPagePath';

import styles from '../VinistoPlusBasketLogin/styles.module.css';
import VinistoPlusBasket from '../VinistoPlusBasketLogin/VinistoPlusBasket';

import { AddonResponse } from '@/api-types/addons-api';

const VinistoPlusBasketRegisterModal = () => {
	const { handleCloseModal, handleOpenModal, modalData } =
		useContext(ModalContext);
	const onRegister =
		typeof modalData?.onRegister == 'function'
			? modalData.onRegister
			: undefined;
	const authenticationContext = useContext(AuthenticationContext);
	const t = useContext(LocalizationContext).useFormatMessage();
	const termsAndConditionsPath = usePlatformStaticPagePath(
		'termsAndConditions',
		`${t({ id: 'routes.termsAndConditions.route' })}`
	);
	const privacyProtectionPath = usePlatformStaticPagePath(
		'privacyProtection',
		`${t({ id: 'routes.privacyProtection.route' })}`
	);

	const selectSubscription = modalData?.selectSubscription;
	const subscriptionType = modalData?.subscriptionType;
	const yearlySubscription = modalData?.yearlySubscription;
	const monthlySubscription = modalData?.monthlySubscription;

	const [localySelectedSubscription, setLocalySelectedSubscription] =
		useState<AddonResponse>(
			yearlySubscription?.type === subscriptionType
				? yearlySubscription
				: monthlySubscription
		);

	const handleOnRegister = (formValues: Record<any, any>) => {
		authenticationContext.handleOnRegister(
			{
				email: formValues.email,
				password: formValues.password,
				isNewsletterActive: !!formValues.isNewsletterActive,
				isAgreementCC: !!formValues.isAgreementCC,
			},
			() => {
				setTimeout(() => {
					if (typeof selectSubscription === 'function') {
						selectSubscription(localySelectedSubscription);
					}
				}, SAFE_REOPEN_TIMEOUT);
			},
			onRegister
		);
	};

	const handleOpenLogInModal = useCallback(() => {
		handleCloseModal();
		setTimeout(() => {
			handleOpenModal(VINISTO_PLUS_BASKET_LOGIN_MODAL, {
				onLogin: onRegister,
				selectSubscription,
				subscriptionType: localySelectedSubscription.type,
				yearlySubscription,
				monthlySubscription,
			});
		}, SAFE_REOPEN_TIMEOUT);
	}, [
		handleCloseModal,
		handleOpenModal,
		localySelectedSubscription.type,
		monthlySubscription,
		selectSubscription,
		yearlySubscription,
	]);

	const customRegistrationValidationFunction = (
		values: Record<any, any>
	): Record<any, any> => {
		const customValidationErrors = {};
		const isAgreementCC = get(values, 'isAgreementCC', null);

		if (!isAgreementCC) {
			set(
				customValidationErrors,
				'isAgreementCC',
				'modal.registration.isAgreementCC.requiredValidation'
			);
		}

		return customValidationErrors;
	};

	const [termsChecked, setTermsChecked] = useState<boolean>(false);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [termsClick, setTermsClick] = useState<boolean>(false);

	const handleInputOnClick = useCallback(() => {
		setTermsClick(true);
		setTermsChecked(!termsChecked);
	}, [termsChecked]);

	return (
		<div className={styles.modal}>
			<VinistoPlusBasket
				yearlySubscription={yearlySubscription}
				monthlySubscription={monthlySubscription}
				localySelectedSubscription={localySelectedSubscription}
				setLocalySelectedSubscription={setLocalySelectedSubscription}
			/>
			<div className="vinisto-popup__split">
				<div className="vinisto-popup__split__form">
					<h2 className={styles.subheading}>
						{t(
							{ id: 'modal.vinistoPlusLogin.subtitleRegister' },
							{
								vinistoplus: (
									<span
										className={styles.vinistoplus}
										key="vinistoplus"
									>
										{t({ id: 'modal.vinistoPlusLogin.subtitle.vinistoplus' })}
									</span>
								),
							}
						)}
					</h2>
					<Form
						submitCallback={handleOnRegister}
						submitText={'modal.registration.submitButtonText'}
						customValidationFunction={customRegistrationValidationFunction}
						initializationValues={{
							isAgreementCC: false,
							isNewsletterActive: false,
						}}
						submitDataTestid={TEST_IDS.REGISTRATION_SUBMIT_BUTTON}
					>
						<InputEmail
							validate={requireEmail}
							dataTestid={TEST_IDS.REGISTRATION_EMAIL_INPUT}
						/>

						<InputPassword
							type={PASSWORD_TYPE}
							dataTestid={TEST_IDS.REGISTRATION_PASSWORD_INPUT}
						/>

						<div className="vinisto-popup__checkboxes">
							<div className="d-flex mb-3">
								<InputCheckBox
									identifier={'isNewsletterActive'}
									name={'isNewsletterActive'}
									label={'modal.registration.isNewsletterActive.label'}
									isErrorVisible={false}
									dataTestid={TEST_IDS.REGISTRATION_NEWSLETTER_CHECKBOX}
								/>
							</div>
							<div className="d-flex mb-3">
								<InputCheckBox
									identifier={'isAgreementCC'}
									name={'isAgreementCC'}
									label={
										<>
											{t(
												{
													id: 'modal.registration.isAgreementCC.label',
												},
												{
													termsAndConditionsLink: (
														<VinistoLink
															to={termsAndConditionsPath}
															target="_blank"
															className="underline-item vinisto-color-success fw-normal"
															key="regtermsAndConditions"
														>
															{t({
																id: 'modal.registration.isAgreementCC.label.termsAndConditions',
															})}
														</VinistoLink>
													),
													privacyPolicyLink: (
														<VinistoLink
															to={privacyProtectionPath}
															target="_blank"
															className="underline-item vinisto-color-success fw-normal"
															key="regprivacyPolicy"
														>
															{t({
																id: 'modal.registration.isAgreementCC.label.privacyPolicy',
															})}
														</VinistoLink>
													),
												}
											)}
										</>
									}
									onClick={handleInputOnClick}
									showError
									dataTestid={TEST_IDS.REGISTRATION_TERMS_CHECKBOX}
								/>
							</div>
						</div>
					</Form>
					<OAuthLogin title={t({ id: 'modal.registration.oauth.text' })} />
				</div>
				<button
					onClick={handleOpenLogInModal}
					className="vinisto-btn vinisto-bg-outline-green mobile-only w-100"
				>
					{t({ id: 'modal.logIn.submitButtonText' })}
				</button>
				<div className="text-center desktop-only">
					<h2 className={styles.registerTitle}>
						{t({ id: 'modal.vinistoPlusLogin.loginTitle' })}
					</h2>
					<button
						onClick={handleOpenLogInModal}
						className="vinisto-btn vinisto-bg-outline-green"
					>
						{t({ id: 'modal.logIn.submitButtonText' })}
					</button>
				</div>
			</div>
		</div>
	);
};

export default VinistoPlusBasketRegisterModal;
