enum GA_EVENT {
	VIEW_ITEM_LIST = 'view_item_list',
	SELECT_ITEM = 'select_item',
	VIEW_ITEM = 'view_item',
	VIEW_CART = 'view_cart',

	ADD_TO_WISHLIST = 'add_to_wishlist',
	ADD_TO_CART = 'add_to_cart',
	REMOVE_FROM_CART = 'remove_from_cart',

	PURCHASE = 'purchase',
	VIEW_PROMOTION = 'view_promotion',
	SELECT_PROMOTION = 'select_promotion',

	SIGN_UP = 'sign_up',
	CLICK_MENU = 'click_menu',

	BEGIN_CHECKOUT = 'begin_checkout',
	ADD_PAYMENT_INFO = 'add_payment_info',
	ADD_SHIPPING_INFO = 'add_shipping_info',

	PAGE_VIEW = 'page_view',
}

const DATA_LAYER_PUSH_DEBOUNCE_TIME = 1000;

export { DATA_LAYER_PUSH_DEBOUNCE_TIME, GA_EVENT };
