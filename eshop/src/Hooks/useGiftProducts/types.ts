import { VinistoHelperDllEnumsGiftGiftRuleType } from 'vinisto_api_client/src/api-types/product-api';

type GiftBundleName = {
	language?: 'CZECH' | 'SLOVAK' | 'ENGLISH' | 'GERMAN';
	value: string;
};

type GiftBundleImageUrl = {
	thumb_64x80: string;
};

type GiftBundleImage = {
	domainUrls?: GiftBundleImageUrl;
};

type GiftBundleValues = {
	name: GiftBundleName[];
	images: GiftBundleImage[];
};

type GiftBundle = {
	bundle: GiftBundleValues;
};

export enum GiftType {
	ASSIGNED_GIFT = 'assigned_gift',
	POSSIBLE_GIFT = 'possible_gift',
}

type ProductGift = {
	leftToSpent: number;
	orderPriceLimitFrom: number;
	bundles: GiftBundle[];
	ruleType: VinistoHelperDllEnumsGiftGiftRuleType;
};

export type { ProductGift };
