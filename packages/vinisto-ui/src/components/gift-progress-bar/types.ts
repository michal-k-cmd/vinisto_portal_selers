import { MarkObj } from 'rc-slider/lib/Marks';

import { GiftRuleType } from '../icons/interfaces';

const PURCHASE_GIFT_TYPES = {
	bundle: 'bundle',
	transport: 'transport',
} as const;

type Gift = {
	orderPriceLimitFrom: number;
	ruleType: GiftRuleType;
	leftToSpent: number;
	isGift?: boolean;
};

type FreeDeliveryGift = {
	minimalPriceForFreeDelivery: number;
};

type GiftProgressBarProps = {
	progressMarks: Record<string | number, React.ReactNode | MarkObj>;
	maxValue: number;
	totalMoneySpent: number;
	className?: string;
};

type GiftMark = {
	[x: string]: JSX.Element;
};

export type { GiftProgressBarProps, Gift, FreeDeliveryGift, GiftMark };
export { PURCHASE_GIFT_TYPES };
