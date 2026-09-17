import { GiftProductProps } from '../../components/gift-product/types';

type GiftProductTranslationKeys = 'title';

type GiftProductListViewProps = {
	giftProducts: GiftProductProps[];
	translations: Record<GiftProductTranslationKeys, string>;
};

export type { GiftProductListViewProps };
