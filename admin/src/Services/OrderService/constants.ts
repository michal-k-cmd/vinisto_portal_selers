export const ORDER_API_BASE_URI = 'order-api';

export const ORDER_URI = `${ORDER_API_BASE_URI}/orders`;
export const APPLICATION_LOG_URI = `${ORDER_API_BASE_URI}/application-log`;
export const DELIVERY_URI = `${ORDER_API_BASE_URI}/deliveries`;
export const DISCOUNT_COUPON_URI = `${ORDER_API_BASE_URI}/discount-coupons`;
export const BILLING_URI = `${ORDER_API_BASE_URI}/billings`;
export const BILLING_ORDERS_URI = `${ORDER_URI}/billing-orders`;
export const CSV_EXPORT_SUPPLIER_URI = `${BILLING_URI}/csv-export`;

export enum BillingState {
	CREATED = 'CREATED',
	IN_ISSUE = 'IN_ISSUE',
	PAYMENT_IN_PROCCESS = 'PAYMENT_IN_PROCCESS',
	PAID = 'PAID',
	CANCELLED = 'CANCELLED',
}

export enum TPdfType {
	BILLING = 'Billing',
	INVOICE = 'Invoice',
}
