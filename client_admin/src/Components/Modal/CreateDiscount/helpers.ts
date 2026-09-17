import { VAT_VALUE } from './constants';

import { VinistoHelperDllEnumsVatRate } from '@/api-types/product-api';

const getVatValue = (vat: VinistoHelperDllEnumsVatRate) => {
	switch (vat) {
		case VinistoHelperDllEnumsVatRate.BaseVat:
			return VAT_VALUE.BASE_VAT;
		case VinistoHelperDllEnumsVatRate.FirstReducedVat:
			return VAT_VALUE.FIRST_REDUCED_VAT;
		case VinistoHelperDllEnumsVatRate.SecondReducedVat:
			return VAT_VALUE.SECOND_REDUCED_VAT;
		case VinistoHelperDllEnumsVatRate.NoVat:
			return VAT_VALUE.NO_VAT;
	}
};

export const getPriceFromNumber = (
	priceWithVat: number,
	value: number
): number => {
	if (!value) {
		return priceWithVat;
	} else {
		const res = priceWithVat - value;
		return Number(res.toFixed(2));
	}
};
export const getPriceWithoutVatFromNumber = (
	priceWithoutVat: number,
	priceWithVat: number,
	value: number,
	vat?: VinistoHelperDllEnumsVatRate
): number => {
	if (!value) {
		return priceWithoutVat;
	} else {
		const vatValue = 1 + (vat ? getVatValue(vat) : VAT_VALUE.NO_VAT) / 100;
		const priceAfterDiscount = priceWithVat - value;
		return priceAfterDiscount / vatValue;
	}
};

export const getPriceFromPercentage = (
	priceWithVat: number,
	value: number
): number => {
	if (!value) {
		return priceWithVat;
	} else {
		const res = priceWithVat - (priceWithVat / 100) * Number(value);
		return Number(res.toFixed(2));
	}
};

export const getPriceWithoutVatFromPercentage = (
	priceWithoutVat: number,
	priceWithVat: number,
	value: number,
	vat?: VinistoHelperDllEnumsVatRate
): number => {
	if (!value) {
		return priceWithoutVat;
	} else {
		const vatValue = 1 + (vat ? getVatValue(vat) : VAT_VALUE.NO_VAT) / 100;
		const priceAfterDiscount =
			priceWithVat - (priceWithVat / 100) * Number(value);
		return priceAfterDiscount / vatValue;
	}
};
