import { ModalConfiguration } from './interfaces';
import BillingQuoteModal from './BillingQuote';
import CreateDiscountModal from './CreateDiscount';
import ForgottenPasswordModal from './ForgottenPassword';
import StockRequestChatModal from './StockRequestChat';
import StockRequestConfirmationModal from './StockRequestConfirmation';
import CreateVinistoPlusPrice from './CreateVinistoPlusPrice';

export enum ModalType {
	FORGOTTEN_PASSWORD_MODAL = 'FORGOTTEN_PASSWORD_MODAL',
	BILLING_QUOTE = 'BILLING_QUOTE',
	CREATE_B2B_DISCOUNT = 'CREATE_B2B_DISCOUNT',
	CREATE_B2C_DISCOUNT = 'CREATE_B2C_DISCOUNT',
	STOCK_REQUEST_CHAT_MODAL = 'STOCK_REQUEST_CHAT_MODAL',
	STOCK_REQUEST_CONFIRMATION_PICKUP = 'STOCK_REQUEST_CONFIRMATION_PICKUP',
	STOCK_REQUEST_CONFIRMATION_SHIPPING = 'STOCK_REQUEST_CONFIRMATION_SHIPPING',
	CREATE_VINISTO_PLUS_PRICE = 'CREATE_VINISTO_PLUS_PRICE',
}

export const MODAL_CONFIGURATION: ModalConfiguration = {
	[ModalType.FORGOTTEN_PASSWORD_MODAL]: [
		'modal.forgottenPassword.modalTitle',
		ForgottenPasswordModal,
	],
	[ModalType.BILLING_QUOTE]: [
		'modal.billing.billingQuote.modalTitle',
		BillingQuoteModal,
	],
	[ModalType.CREATE_B2C_DISCOUNT]: [
		'admin.modal.createB2CDiscount',
		CreateDiscountModal,
	],
	[ModalType.CREATE_B2B_DISCOUNT]: [
		'admin.modal.createB2BDiscount',
		CreateDiscountModal,
	],
	[ModalType.STOCK_REQUEST_CONFIRMATION_PICKUP]: [
		'modal.stockRequestConfirm.pickup.title',
		StockRequestConfirmationModal,
	],
	[ModalType.STOCK_REQUEST_CONFIRMATION_SHIPPING]: [
		'modal.stockRequestConfirm.shipping.title',
		StockRequestConfirmationModal,
	],
	[ModalType.STOCK_REQUEST_CHAT_MODAL]: [
		'modal.stockRequestList.modalTitle',
		StockRequestChatModal,
	],
	[ModalType.CREATE_VINISTO_PLUS_PRICE]: [
		'modal.addToVinistoPlus.modalTitle',
		CreateVinistoPlusPrice,
	],
};
