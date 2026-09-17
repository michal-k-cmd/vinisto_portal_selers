import { GA_EVENT } from './constants';

type ItemCategory = {
	item_category?: string;
	item_category2?: string;
	item_category3?: string;
	item_category4?: string;
	item_category5?: string;
};

type Item = {
	item_id: string;
	item_name: string;

	item_list_id?: string;
	item_list_name?: string;
	item_brand?: string;

	index?: number;

	price?: number;
	discount?: number;
	quantity?: number;
} & ItemCategory;

type ViewItemListEvent = {
	item_list_id: string;
	item_list_name: string;
	items: Item[];
};

type SelectItemEvent = ViewItemListEvent;

type ViewItemEvent = {
	currency: string;
	value: number;
	items: Item[];
};

type AddToCartEvent = {
	currency: string;
	value: number;
	items: Item[];
};

type RemoveFromCartEvent = {
	currency: string;
	value: number;
	items: Item[];
};

type PurchaseEvent = {
	value: number;
	transaction_id: string;
	coupon: string;
	shipping: number;
	tax: number;
	items: Item[];
};

type AddShippingInfoEvent = {
	currency: string;
	value: number;
	coupon?: string;
	shipping_tier?: string;
	items: Item[];
};

type AddPaymentInfoEvent = {
	currency: string;
	value: number;
	coupon?: string;
	payment_type?: string;
	items: Item[];
};

type BeginCheckoutEvent = {
	currency: string;
	value: number;
	coupon?: string;
	items: Item[];
};

type SignUpEvent = {
	method: string;
	customer_type: 'b2b' | 'b2c';
	user_id: string;
	user_email: string;
};

type ClickMenuEvent = {
	menu_item_name: string;
};

type AddToWishlistEvent = {
	currency: string;
	value: number;
	items: Item[];
};

type ViewCartEvent = {
	currency: string;
	value: number;
	items: Item[];
};

type PageViewEvent = {
	page_title: string;
	page_location: string;
};

type PromotionItem = {
	promotion_id: string;
	promotion_name: string;
	creative_name?: string;
	creative_slot?: string;
	items?: Item[];
};

type PromotionEvent = PromotionItem;

type GaEventParameters =
	| ViewItemListEvent
	| SelectItemEvent
	| ViewItemEvent
	| AddToCartEvent
	| RemoveFromCartEvent
	| PurchaseEvent
	| AddShippingInfoEvent
	| AddPaymentInfoEvent
	| BeginCheckoutEvent
	| SignUpEvent
	| ClickMenuEvent
	| ViewCartEvent
	| AddToWishlistEvent
	| PageViewEvent
	| PromotionEvent;

type SendEvent = <T extends GA_EVENT>(
	eventType: T,
	parameters: EventTypeParameters<T>
) => void;

type EventTypeParameters<T> = T extends GA_EVENT.VIEW_ITEM_LIST
	? ViewItemListEvent
	: T extends GA_EVENT.SELECT_ITEM
	? SelectItemEvent
	: T extends GA_EVENT.VIEW_ITEM
	? ViewItemEvent
	: T extends GA_EVENT.ADD_TO_CART
	? AddToCartEvent
	: T extends GA_EVENT.REMOVE_FROM_CART
	? RemoveFromCartEvent
	: T extends GA_EVENT.PURCHASE
	? PurchaseEvent
	: T extends GA_EVENT.ADD_SHIPPING_INFO
	? AddShippingInfoEvent
	: T extends GA_EVENT.ADD_PAYMENT_INFO
	? AddPaymentInfoEvent
	: T extends GA_EVENT.BEGIN_CHECKOUT
	? BeginCheckoutEvent
	: T extends GA_EVENT.SIGN_UP
	? SignUpEvent
	: T extends GA_EVENT.CLICK_MENU
	? ClickMenuEvent
	: T extends GA_EVENT.ADD_TO_WISHLIST
	? AddToWishlistEvent
	: T extends GA_EVENT.VIEW_CART
	? ViewCartEvent
	: T extends GA_EVENT.PAGE_VIEW
	? PageViewEvent
	: T extends GA_EVENT.VIEW_PROMOTION
	? PromotionEvent
	: T extends GA_EVENT.SELECT_PROMOTION
	? PromotionEvent
	: never;

export type {
	Item as GaItem,
	PromotionEvent,
	SendEvent,
	ViewItemListEvent,
	ViewItemEvent as ViewItemDetailEvent,
	AddToCartEvent,
	RemoveFromCartEvent,
	PurchaseEvent,
	GaEventParameters,
};
