import { FormValues } from 'Components/Form/Components/Form/interfaces';

import { DISCOUNT_TYPE } from './constants';

export interface ICurrency {
	value: string;
	label: string;
}

export interface IVat {
	value: string;
	label: string;
}

export interface DiscountFormValues extends FormValues {
	sellingPrice: number;
	lowestPrice?: number;
	discountType: DISCOUNT_TYPE;
	partialDiscount: number;
	percentageDiscount: number;
	priceAfterDiscount: number;
	validFrom: any;
	validTo: any;
}
