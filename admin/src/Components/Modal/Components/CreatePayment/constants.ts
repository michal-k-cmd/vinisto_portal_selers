import {
	VinistoHelperDllEnumsGoPayGoPayType,
	VinistoHelperDllEnumsOrderPaymentType,
} from 'vinisto_api_client/src/api-types/order-api/';

export const GO_PAY_TYPE = VinistoHelperDllEnumsOrderPaymentType.GO_PAY;

export const goPayPaymentTypes = [
	{
		value: VinistoHelperDllEnumsGoPayGoPayType.PAYMENT_CARD,
		label: 'Payment card',
	},
	{
		value: VinistoHelperDllEnumsGoPayGoPayType.BANK_ACCOUNT,
		label: 'Bank account',
	},
	{
		value: VinistoHelperDllEnumsGoPayGoPayType.GPAY,
		label: 'Google pay',
	},
	{
		value: VinistoHelperDllEnumsGoPayGoPayType.APPLE_PAY,
		label: 'Apple pay',
	},
	{
		value: VinistoHelperDllEnumsGoPayGoPayType.GOPAY,
		label: 'GoPay wallet',
	},
	{
		value: VinistoHelperDllEnumsGoPayGoPayType.PAYPAL,
		label: 'PayPal wallet',
	},
	{
		value: VinistoHelperDllEnumsGoPayGoPayType.MPAYMENT,
		label: 'mPlatba (mobile payment)',
	},
	{
		value: VinistoHelperDllEnumsGoPayGoPayType.PRSMS,
		label: 'Premium SMS',
	},
	{
		value: VinistoHelperDllEnumsGoPayGoPayType.PAYSAFECARD,
		label: 'PaySafeCard coupon',
	},
	{
		value: VinistoHelperDllEnumsGoPayGoPayType.BITCOIN,
		label: 'Bitcoin wallet',
	},
	{
		value: VinistoHelperDllEnumsGoPayGoPayType.CLICK_TO_PAY,
		label: 'Click to Pay',
	},
];

export const paymentTypes = [
	{
		value: GO_PAY_TYPE,
		label: 'Payment via GoPay',
	},
	{
		value: VinistoHelperDllEnumsOrderPaymentType.CASH,
		label: 'By cash',
	},
	{
		value: VinistoHelperDllEnumsOrderPaymentType.BANK_TRANSFER,
		label: 'By bank transfer (Bankovni prevod)',
	},
	{
		value: VinistoHelperDllEnumsOrderPaymentType.BY_HANDOVER,
		label: 'Hand over - dobirka',
	},
	{
		value: VinistoHelperDllEnumsOrderPaymentType.CREDIT,
		label: 'Credit',
	},
];
