import Price from '@/domain/price';

export interface AddPricesProps {
	disabled: boolean;
	addBundlePriceFunction: (isVinistoPlus: boolean) => void;
	addBundleDiscountPriceFunction: (isVinistoPlus: boolean) => void;
	bundlePrices: Price[];
}
