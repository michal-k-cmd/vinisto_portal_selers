export const ORDER_DOES_NOT_EXIST = 'ObjectNotFound';
export const OBJECT_PERMISSION_ERROR = 'ObjectPermissionError';
export const GOPAY_PAYMENT_STATUS_ERROR = 'GOPAY_PAYMENT_STATUS_ERROR';
export const NO_INVOICE_IN_ORDER = 'NO_INVOICE_IN_ORDER';

export enum ORDER_STATE {
	CREATED = 'CREATED',
	PAID = 'PAID',
}

export enum PAYMENT_STATE {
	CREATED = 'CREATED',
	PAID = 'PAID',
	CANCELED = 'CANCELED',
}

export const NOT_FOUND = -1;
export const ORDER_QUERY_RETRY_BASETIME = 500;
export const ORDER_QUERY_RETRY_LIMIT = 10;
