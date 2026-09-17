export interface DeliveryList {
	transportBaseType: DeliveryListType;
}

export enum DeliveryListType {
	ESHOP = 'ESHOP',
	STOCK = 'STOCK',
}
