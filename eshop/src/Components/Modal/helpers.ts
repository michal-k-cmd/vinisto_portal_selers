import { FC } from 'react';
import BasketWaitinForApprovalModal from 'Components/BasketWaitingForApproval';

import modalsConfig from './config';
import LoginModal from './Components/Login';
import RegistrationModal from './Components/Registration';
import ForgottenPasswordModal from './Components/ForgottenPassword';
import RegistrationConfirmModal from './Components/RegisterConfirm';
import ForgottenConfirmModal from './Components/ForgottenConfirm';
import AddressInvoice from './Components/AddressInvoice';
import AddressDelivery from './Components/AddressDelivery';
import ReviewModal from './Components/Review';
import FillNicknameModal from './Components/FillNickname';
import PaymentModal from './Components/Payment';
import AddToBasketModal from './Components/AddToBasket';
import ConfirmDialog from './Components/ConfirmDialog';
import ZasilkovnaModal from './Components/Zasilkovna';
import PPLModal from './Components/PPL';
import DPDModal from './Components/DPD';
import CancelOrderConfirm from './Components/CancelOrderConfirm';
import CrossSellModal from './Components/CrossSell';
import BasketShareModal from './Components/BasketShare';
import {
	ADD_TO_BASKET_MODAL,
	ADDRESS_DELIVERY_MODAL,
	ADDRESS_INVOICE_MODAL,
	BASKET_SHARE_MODAL,
	BASKET_WAITING_FOR_APPROVAL_CONFIRM_MODAL,
	CANCEL_ORDER_CONFIRM_MODAL,
	CONFIRM_DIALOG,
	CROSS_SELL_MODAL,
	DPD_MODAL,
	FILL_NICKNAME_MODAL,
	FORGOTTEN_PASSWORD_CONFIRM_MODAL,
	FORGOTTEN_PASSWORD_MODAL,
	GUARANTEE_OK_MODAL,
	GUARANTEE_PRICE_MODAL,
	JOIN_VINISTO_PLUS_MODAL,
	LOGIN_MODAL,
	PAYMENT_MODAL,
	PLATFORM_MISMATCH_MODAL,
	PPL_MODAL,
	QUICK_PURCHASE_MODAL,
	REGISTRATION_CONFIRM_MODAL,
	REGISTRATION_MODAL,
	REQUEST_CREDIT_INCREASE_MODAL,
	REVIEW_MODAL,
	VINISTO_PLUS_BASKET_LOGIN_MODAL,
	VINISTO_PLUS_BASKET_REGISTER_MODAL,
	ZASILKOVNA_MODAL,
} from './constants';
import QuickPurchaseModal from './Components/VinistoPlus/QuickPurchase';
import JoinVinistoPlusModal from './Components/JoinVinistoPlus';
import GuaranteePriceModal from './Components/GuaranteePrice';
import GuaranteeOkModal from './Components/GuaranteeOk';
import VinistoPlusBasketLoginModal from './Components/VinistoPlusBasketLogin';
import VinistoPlusBasketRegisterModal from './Components/VinistoPlusBasketRegister';
import RequestCreditIncrease from './Components/RequestCreditIncrease';
import PlatformMismatchModal from './Components/PlatformMismatch';

export const getModalTitleLocalization = (
	modalType: string | null
): string | null => {
	if (modalType === LOGIN_MODAL) {
		return 'modal.logIn.modalTitle';
	} else if (modalType === REGISTRATION_MODAL) {
		return 'modal.registration.modalTitle';
	} else if (modalType === FORGOTTEN_PASSWORD_MODAL) {
		return 'modal.forgottenPassword.modalTitle';
	} else if (modalType === REGISTRATION_CONFIRM_MODAL) {
		return 'modal.registrationConfirm.modalTitle';
	} else if (modalType === FORGOTTEN_PASSWORD_CONFIRM_MODAL) {
		return 'modal.forgottenPasswordConfirm.modalTitle';
	} else if (modalType === ADDRESS_INVOICE_MODAL) {
		return 'modal.invoiceAddress.modalTitle';
	} else if (modalType === ADDRESS_DELIVERY_MODAL) {
		return 'modal.deliveryAddress.modalTitle';
	} else if (modalType === FILL_NICKNAME_MODAL) {
		return 'modal.fillNickname.modalTitle';
	} else if (modalType === PAYMENT_MODAL) {
		return 'modal.payment.modalTitle';
	} else if (modalType === ADD_TO_BASKET_MODAL) {
		return 'modal.addToBasket.modalTitle';
	} else if (modalType === CONFIRM_DIALOG) {
		return 'modal.confirmDialog.modalTitle';
	} else if (modalType === CANCEL_ORDER_CONFIRM_MODAL) {
		return 'modal.cancelOrderConfirm.modalTitle';
	} else if (modalType === CROSS_SELL_MODAL) {
		return 'modal.crossSell.modalTitle';
	} else if (modalType === BASKET_SHARE_MODAL) {
		return 'modal.basketShare.modalTitle';
	} else if (modalType === QUICK_PURCHASE_MODAL) {
		return 'vinistoPlus.quickPurchaseModal.title';
	} else if (modalType === BASKET_WAITING_FOR_APPROVAL_CONFIRM_MODAL) {
		return 'modal.basketWaitingForApprovalConfirm.title';
	} else if (modalType === REQUEST_CREDIT_INCREASE_MODAL) {
		return 'modal.requestCreditIncrease.title';
	} else if (modalType === PLATFORM_MISMATCH_MODAL) {
		return 'modal.platformMismatch.modalTitle';
	}

	return null;
};

export const getModalComponent = (modalType: string | null): FC | null => {
	if (modalType === LOGIN_MODAL) {
		return LoginModal;
	} else if (modalType === REGISTRATION_MODAL) {
		return RegistrationModal;
	} else if (modalType === FORGOTTEN_PASSWORD_MODAL) {
		return ForgottenPasswordModal;
	} else if (modalType === REGISTRATION_CONFIRM_MODAL) {
		return RegistrationConfirmModal;
	} else if (modalType === FORGOTTEN_PASSWORD_CONFIRM_MODAL) {
		return ForgottenConfirmModal;
	} else if (modalType === ADDRESS_INVOICE_MODAL) {
		return AddressInvoice;
	} else if (modalType === ADDRESS_DELIVERY_MODAL) {
		return AddressDelivery;
	} else if (modalType === REVIEW_MODAL) {
		return ReviewModal;
	} else if (modalType === FILL_NICKNAME_MODAL) {
		return FillNicknameModal;
	} else if (modalType === PAYMENT_MODAL) {
		return PaymentModal;
	} else if (modalType === ADD_TO_BASKET_MODAL) {
		return AddToBasketModal;
	} else if (modalType === CONFIRM_DIALOG) {
		return ConfirmDialog;
	} else if (modalType === ZASILKOVNA_MODAL) {
		return ZasilkovnaModal;
	} else if (modalType === PPL_MODAL) {
		return PPLModal;
	} else if (modalType === DPD_MODAL) {
		return DPDModal;
	} else if (modalType === CANCEL_ORDER_CONFIRM_MODAL) {
		return CancelOrderConfirm;
	} else if (modalType === CROSS_SELL_MODAL) {
		return CrossSellModal;
	} else if (modalType === BASKET_SHARE_MODAL) {
		return BasketShareModal;
	} else if (modalType === QUICK_PURCHASE_MODAL) {
		return QuickPurchaseModal;
	} else if (modalType === JOIN_VINISTO_PLUS_MODAL) {
		return JoinVinistoPlusModal;
	} else if (modalType === GUARANTEE_PRICE_MODAL) {
		return GuaranteePriceModal;
	} else if (modalType === GUARANTEE_OK_MODAL) {
		return GuaranteeOkModal;
	} else if (modalType === VINISTO_PLUS_BASKET_LOGIN_MODAL) {
		return VinistoPlusBasketLoginModal;
	} else if (modalType === VINISTO_PLUS_BASKET_REGISTER_MODAL) {
		return VinistoPlusBasketRegisterModal;
	} else if (modalType === BASKET_WAITING_FOR_APPROVAL_CONFIRM_MODAL) {
		return BasketWaitinForApprovalModal;
	} else if (modalType === REQUEST_CREDIT_INCREASE_MODAL) {
		return RequestCreditIncrease;
	} else if (modalType === PLATFORM_MISMATCH_MODAL) {
		return PlatformMismatchModal;
	}

	return null;
};

export const getModalConfigByType = (
	modalType: keyof typeof modalsConfig | null
) => {
	const currentModalConfig = modalType ? modalsConfig[modalType] : {};

	return currentModalConfig;
};
