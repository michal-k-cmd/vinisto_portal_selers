import { ReactNode } from 'react';

export enum IconDefaultVariant {
	ACTIVE = 'active',
	INACTIVE = 'inactive',
}

export enum IconGiftVariant {
	SIMPLE = 'simple',
	ACTIVE = 'active',
	INACTIVE = 'inactive',
}

export enum GiftRuleType {
	GIFT_ORDER_PRICE_FROM = 'GIFT_ORDER_PRICE_FROM',
	GIFT_CATEGORY = 'GIFT_CATEGORY',
	GIFT_SUPPLIER = 'GIFT_SUPPLIER',
	GIFT_SPECIFICATION = 'GIFT_SPECIFICATION',
}

export interface IconProps {
	id?: string;
	className?: string;
	alt?: ReactNode;
	title?: ReactNode;
	fill?: string;
	stroke?: string | null;
	width?: number | string;
	height?: number | string;
	variant?: IconGiftVariant | IconDefaultVariant;
}
