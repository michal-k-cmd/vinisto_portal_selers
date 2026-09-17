export const PAYMENT_ID_CZ = '6387b851767c6836aa561f5b';
export const PAYMENT_ID_SK = '67045ee76812ac4069f4d0a8';

export const quickPurchaseMode = {
	INITIAL: 'INITIAL',
	EDIT: 'EDIT',
} as const;

export type QuickPurchaseMode =
	(typeof quickPurchaseMode)[keyof typeof quickPurchaseMode];
