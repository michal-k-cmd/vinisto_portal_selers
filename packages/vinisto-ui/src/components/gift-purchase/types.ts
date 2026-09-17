import { PURCHASE_GIFT_TYPES } from '../gift-progress-bar/types';

type GiftPurchaseBundle = {
	type: typeof PURCHASE_GIFT_TYPES.bundle;
	imageUrl: string;
};

type GiftPurchaseTransport = {
	type: typeof PURCHASE_GIFT_TYPES.transport;
	imageUrl?: undefined;
};

type GiftPurchaseProps = {
	isFulfilled: boolean;
	text: string;
	orderPriceLimitFrom: number;
} & (GiftPurchaseBundle | GiftPurchaseTransport);

type PurchaseGiftUnfulfilledProps = {
	imageUrl: string;
	text: string;
};

type PurchaseGiftProps = {
	text: string;
};

export type {
	GiftPurchaseBundle,
	GiftPurchaseTransport,
	GiftPurchaseProps,
	PurchaseGiftUnfulfilledProps,
	PurchaseGiftProps,
};
