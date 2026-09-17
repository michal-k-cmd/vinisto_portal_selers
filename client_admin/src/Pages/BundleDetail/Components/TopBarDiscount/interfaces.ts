export interface TopBarDiscountProps {
	isSet: boolean;
	discountValue: string;
	discountPartial: string;
	discountPercentage: number;
	validFrom?: string;
	validTo?: string;
	originalPrice: string;
}
