import { dayjsInstance } from 'Services/Date';

import { CreateOrUpdateDiscountCouponFormValues } from './interfaces';

import {
	DiscountCouponsSuppliersCreatePayload,
	VinistoHelperDllEnumsCurrency,
	VinistoHelperDllEnumsDiscountCouponDiscountCouponType,
} from '@/api-types/order-api';

export const transformRequestBody = (
	values: CreateOrUpdateDiscountCouponFormValues,
	userLoginHash?: string | null
): DiscountCouponsSuppliersCreatePayload => {
	const validFrom = dayjsInstance(values.validFrom).unix() ?? -1;
	const validTo = dayjsInstance(values.validTo).unix() ?? -1;

	const requestData: DiscountCouponsSuppliersCreatePayload = {
		isSupplierDiscount: true,
		userLoginHash: userLoginHash ?? '',
		validFrom: validFrom,
		validTo: validTo,
		discountCouponType: values.discountCouponType,

		code: values.code,
		isReusable: values.isReusable === 'true' ? true : false,
	};
	if (
		values.discountCouponType ===
			VinistoHelperDllEnumsDiscountCouponDiscountCouponType.AMOUNT &&
		values.amountDiscount
	) {
		requestData.amountDiscount = {
			value: parseInt(values.amountDiscount),
			currency: VinistoHelperDllEnumsCurrency.CZK,
		};
	} else if (
		values.discountCouponType ===
			VinistoHelperDllEnumsDiscountCouponDiscountCouponType.PERCENTAGE &&
		values.percentageDiscount
	) {
		requestData.percentageDiscount = parseInt(values.percentageDiscount);
	}
	if (values.isAlowedFrom && values.allowedFrom) {
		requestData.allowedFrom = {
			value: parseInt(values.allowedFrom),
			currency: VinistoHelperDllEnumsCurrency.CZK,
		};
	}

	return requestData;
};
