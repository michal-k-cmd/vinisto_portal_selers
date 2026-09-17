export enum OrderState {
	CREATED = 'CREATED',
	PAID = 'PAID',
	IN_WMS = 'IN_WMS',
	WMS_ACCEPTED = 'WMS_ACCEPTED',
	WMS_INCOMPLETE = 'WMS_INCOMPLETE',
	WMS_READY = 'WMS_READY',
	SENT = 'SENT',
	DELIVERED = 'DELIVERED',
	CANCELLED = 'CANCELLED',
	RETURNED = 'RETURNED',
	REFUNDED = 'REFUNDED',
}

export const LIST_API_ENDPOINT = 'order-api/orders';

export const DATE_COLUMN = 'date';
export const PRICE_COLUMN = 'price';

export const SORTING_COLUMN_MAP = {
	[DATE_COLUMN]: 'TIME',
	[PRICE_COLUMN]: 'PRICE',
};
