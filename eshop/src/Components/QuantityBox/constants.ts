export enum ShoppingIssues {
	PRODUCT_NOT_AVAILABLE = 'PRODUCT_NOT_AVAILABLE',
	MAXIMUM_QUANTITY_REACHED = 'MAXIMUM_QUANTITY_REACHED',
	ORDER_LIMIT_REACHED = 'ORDER_LIMIT_REACHED',
}

enum SuccessNotifications {
	ADDED_TO_BASKET = 'ADDED_TO_BASKET',
}

export const Popovers = { ...SuccessNotifications, ...ShoppingIssues };

export enum QuantityBoxTypes {
	STANDARD = 'STANDARD',
	DIRECT = 'DIRECT',
}

export enum QuantityBoxPlusBtnVariants {
	STANDARD = 'STANDARD',
	SUCCESS = 'SUCCESS',
}

export enum QuantityBoxPlusBtnTypes {
	STANDARD = 'STANDARD',
	EXTENDED = 'EXTENDED',
}

export enum PopoverTypes {
	COMPONENT = 'COMPONENT',
	WINDOW = 'WINDOW',
}

export const FALLBACK_CARD_HEIGHT = 500;
