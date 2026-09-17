import { GiftProgressBarProps } from '../../components/gift-progress-bar/types';
import { GiftPurchaseProps } from '../../components/gift-purchase/types';
import { GiftProductListViewProps } from '../gift-product-list/types';

type GiftPurchaseTranslationKeys = 'title';

type GiftPurchaseListProps = {
	translations: Record<GiftPurchaseTranslationKeys, string>;
	giftProgressBarProps: GiftProgressBarProps;
	giftPurchaseProps: GiftPurchaseProps[];
	giftProductsProps: GiftProductListViewProps;
};

export type { GiftPurchaseListProps };
