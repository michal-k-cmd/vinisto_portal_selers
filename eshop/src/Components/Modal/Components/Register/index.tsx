import { useCallback, useContext, useState } from 'react';
import { get, set } from 'lodash-es';
import { LOGIN_MODAL, SAFE_REOPEN_TIMEOUT } from 'Components/Modal/constants';
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
import Link from 'next/link';
import usePlatformStaticPagePath from 'Hooks/usePlatformStaticPagePath';

const RegistrationModal = () => {
	const modalContext = useContext(ModalContext);
	const onRegister =
		typeof modalContext.modalData?.onRegister == 'function'
			? modalContext.modalData.onRegister
			: undefined;
	const authenticationContext = useContext(AuthenticationContext);
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();
	const termsAndConditionsPath = usePlatformStaticPagePath(
		'termsAndConditions',
		`${t({ id: 'routes.termsAndConditions.route' })}`
	);
	const privacyProtectionPath = usePlatformStaticPagePath(
		'privacyProtection',
		`${t({ id: 'routes.privacyProtection.route' })}`
	);

	const handleOnRegister = (formValues: Record<any, any>) => {
		authenticationContext.handleOnRegister(
			{
				email: formValues.email,
				password: formValues.password,
				isNewsletterActive: !!formValues.isNewsletterActive,
				isAgreementCC: !!formValues.isAgreementCC,
			},
			onRegister
		);
	};

	const handleOpenLogInModal = useCallback(() => {
		modalContext.handleCloseModal();
		setTimeout(() => {
			modalContext.handleOpenModal(LOGIN_MODAL, { onLogin: onRegister });
		}, SAFE_REOPEN_TIMEOUT);
	}, [modalContext]);

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
		<div className="vinisto-popup__split">
			<div className="vinisto-popup__split__form">
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
			<div className="vinisto-popup__split__cta">
				<ul className="vinisto-popup__usp">
					<li>
						{t(
							{
								id: 'modal.registration.usp1.label',
							},
							{
								specialProducts: (
									<span className="fw-bold">
										{t({
											id: 'modal.registration.usp1.label.specialProducts',
										})}
									</span>
								),
								prices: (
									<span className="fw-bold">
										{t({
											id: 'modal.registration.usp1.label.prices',
										})}
									</span>
								),
								club: (
									<Link
										href="/vinistoplus"
										className="fw-bold vinisto-color-success"
									>
										{t({
											id: 'modal.registration.usp1.label.club',
										})}
									</Link>
								),
							}
						)}
					</li>
					<li>
						{t(
							{
								id: 'modal.registration.usp2.label',
							},
							{
								status: (
									<span className="fw-bold">
										{t({
											id: 'modal.registration.usp2.label.status',
										})}
									</span>
								),
							}
						)}
					</li>
					<li>
						{t(
							{
								id: 'modal.registration.usp3.label',
							},
							{
								contests: (
									<span className="fw-bold">
										{t({
											id: 'modal.registration.usp3.label.contests',
										})}
									</span>
								),
								first: (
									<span className="fw-bold">
										{t({
											id: 'modal.registration.usp3.label.first',
										})}
									</span>
								),
							}
						)}
					</li>
				</ul>
				<div className="text-end desktop-only">
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

export default RegistrationModal;
