import { useCallback, useContext, useState } from 'react';
import { LoginFormData } from 'Components/Modal/Components/Login/interfaces';
import { LOGIN_PASSWORD_TYPE } from 'Components/Form/Components/Password/constants';
import { requireEmail } from 'Components/Form/validators';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { LocalizationContext } from 'Services/LocalizationService';
import { Form, InputEmail, InputPassword } from 'Components/Form';
import { VinistoSpanLink } from 'Components/VinistoLink';
import { useRouter } from 'next/navigation';
import OAuthLogin from 'pages-spa/CartShippingData/Components/OAuthLogin';

import { ModalContext } from '../../context';
import {
	FORGOTTEN_PASSWORD_MODAL,
	SAFE_REOPEN_TIMEOUT,
	VINISTO_PLUS_BASKET_REGISTER_MODAL,
} from '../../constants';

import styles from './styles.module.css';
import VinistoPlusBasket from './VinistoPlusBasket';

import { AddonResponse } from '@/api-types/addons-api';

const VinistoPlusBasketLoginModal = () => {
	const { modalData, handleCloseModal, handleOpenModal } =
		useContext(ModalContext);
	const authenticationContext = useContext(AuthenticationContext);
	const { useFormatMessage } = useContext(LocalizationContext);
	const t = useFormatMessage();
	const onCloseCallback = modalData?.onCloseCallback;

	const onRegister = modalData?.onRegister;

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

	const onForgottenPasswordClick = modalData?.onForgottenPasswordClick;

	const router = useRouter();

	const handleOnLogIn = useCallback(
		(formValues: LoginFormData) => {
			authenticationContext.handleOnLogIn(
				{
					email: formValues.email,
					password: formValues.password,
				},
				() => {
					setTimeout(() => {
						if (typeof selectSubscription === 'function') {
							selectSubscription(localySelectedSubscription);
						}
					}, SAFE_REOPEN_TIMEOUT);
				}
			);
		},
		[authenticationContext, selectSubscription, localySelectedSubscription]
	);

	const handleOpenRegistrationModal = useCallback(() => {
		handleCloseModal();
		if (typeof onCloseCallback === 'function') {
			router.back();
		}
		setTimeout(() => {
			handleOpenModal(VINISTO_PLUS_BASKET_REGISTER_MODAL, {
				onRegister,
				selectSubscription,
				subscriptionType: localySelectedSubscription.type,
				yearlySubscription,
				monthlySubscription,
			});
		}, SAFE_REOPEN_TIMEOUT);
	}, [
		handleCloseModal,
		onCloseCallback,
		router,
		handleOpenModal,
		selectSubscription,
		localySelectedSubscription.type,
		yearlySubscription,
		monthlySubscription,
	]);

	const handleOpenForgottenModal = useCallback(() => {
		if (typeof onForgottenPasswordClick === 'function') {
			onForgottenPasswordClick();
			return;
		}

		handleCloseModal();
		if (typeof onCloseCallback === 'function') {
			router.back();
		}
		setTimeout(() => {
			handleOpenModal(FORGOTTEN_PASSWORD_MODAL, {});
		}, SAFE_REOPEN_TIMEOUT);
	}, [
		handleCloseModal,
		handleOpenModal,
		router,
		onCloseCallback,
		onForgottenPasswordClick,
	]);

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
							{ id: 'modal.vinistoPlusLogin.subtitle' },
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
						submitCallback={handleOnLogIn}
						submitText={'modal.logIn.submitButtonText'}
						initializationValues={{
							email: modalData?.email ?? '',
						}}
					>
						<div className="mb-3">
							<InputEmail validate={requireEmail} />
							<InputPassword type={LOGIN_PASSWORD_TYPE} />
						</div>
					</Form>
					<button
						onClick={handleOpenRegistrationModal}
						className="vinisto-btn vinisto-bg-outline-green tablet-mobile-only w-100 mt-3"
					>
						{t({ id: 'modal.registration.submitButtonText' })}
					</button>
					<OAuthLogin title={t({ id: 'modal.logIn.oauth.text' })} />

					<div className="vinisto-popup__links vinisto-popup__links--login">
						<VinistoSpanLink
							className="vinisto-popup__link--gray"
							onClick={handleOpenForgottenModal}
						>
							{t({ id: 'modal.logIn.moveForgottenPasswordButton' })}
						</VinistoSpanLink>
					</div>
				</div>
				<div className="text-center desktop-only">
					<h2 className={styles.registerTitle}>
						{t({ id: 'modal.vinistoPlusLogin.registerTitle' })}
					</h2>
					<button
						onClick={handleOpenRegistrationModal}
						className="vinisto-btn vinisto-bg-outline-green"
					>
						{t({ id: 'modal.registration.submitButtonText' })}
					</button>
				</div>
			</div>
		</div>
	);
};

export default VinistoPlusBasketLoginModal;
