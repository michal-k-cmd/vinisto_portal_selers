import api from '@/api';
import {
	DiscountCouponsListParams,
	VinistoHelperDllBaseBaseReturn,
	VinistoHelperDllEnumsDiscountCouponDiscountCouponType,
	VinistoOrderDllModelsApiDiscountCouponDefinitionModelsAmountDiscountCouponDefinition,
	VinistoOrderDllModelsApiDiscountCouponDefinitionModelsBaseDiscountCouponDefinition,
	VinistoOrderDllModelsApiDiscountCouponDefinitionModelsPercentageDiscountCouponDefinition,
	VinistoOrderDllModelsApiReturnDataDiscountCouponsReturn,
} from '@/api-types/order-api';

const isAmountTypeDiscountCoupon = (
  coupon:
    | VinistoOrderDllModelsApiDiscountCouponDefinitionModelsBaseDiscountCouponDefinition
    | VinistoOrderDllModelsApiDiscountCouponDefinitionModelsAmountDiscountCouponDefinition
    | VinistoOrderDllModelsApiDiscountCouponDefinitionModelsPercentageDiscountCouponDefinition
    | undefined
    | null
): coupon is VinistoOrderDllModelsApiDiscountCouponDefinitionModelsAmountDiscountCouponDefinition =>
  coupon?.discountCouponType ===
  VinistoHelperDllEnumsDiscountCouponDiscountCouponType.AMOUNT;

const isPercentageTypeDiscountCoupon = (
  coupon:
    | VinistoOrderDllModelsApiDiscountCouponDefinitionModelsBaseDiscountCouponDefinition
    | VinistoOrderDllModelsApiDiscountCouponDefinitionModelsAmountDiscountCouponDefinition
    | VinistoOrderDllModelsApiDiscountCouponDefinitionModelsPercentageDiscountCouponDefinition
    | undefined
    | null
): coupon is VinistoOrderDllModelsApiDiscountCouponDefinitionModelsPercentageDiscountCouponDefinition =>
  coupon?.discountCouponType ===
  VinistoHelperDllEnumsDiscountCouponDiscountCouponType.PERCENTAGE;

const getAll = async (params?: DiscountCouponsListParams) => {
	const res =
		await api.get<VinistoOrderDllModelsApiReturnDataDiscountCouponsReturn>(
			'order-api/discount-coupons',
			params
		);

	if (res.discountCoupons === null || res.discountCoupons === undefined) {
		throw new Error('No discount coupons data in response');
	}

	return res.discountCoupons;
};

const GetSupplierCoupons = async (params?: DiscountCouponsListParams) => {
  const res =
		await api.get<VinistoOrderDllModelsApiReturnDataDiscountCouponsReturn>(
			'order-api/discount-coupons',
			{...params, IsSupplierDiscount: true}
		);

	if (res.discountCoupons === null || res.discountCoupons === undefined) {
		throw new Error('No discount coupons data in response');
	}

	return res.discountCoupons;
}

const activateCoupon = async (discountCouponId: string, userLoginHash: string) => {
  const res =
		await api.put<VinistoHelperDllBaseBaseReturn>(
			`order-api/discount-coupons/${discountCouponId}/activate`,
			{ discountCouponId: discountCouponId},
			{ userLoginHash: userLoginHash}
		);

	if (res.isError) {
		throw new Error('Error activating discount coupon');
	}

	return res;
}

/*
 Note: part of the coupon functionality (adding, removing, etc.) part of the basket service
(This is due to the fact it was structured this way in the api layer)
*/
const DiscountCouponService = {
  isAmountTypeDiscountCoupon,
  isPercentageTypeDiscountCoupon,
	getAll,
  GetSupplierCoupons,
	activateCoupon,
};

export default DiscountCouponService;
