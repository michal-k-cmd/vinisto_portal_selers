import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { AuthenticationContext } from 'Services/AuthenticationService/context';

import { ItemCouponConditionResponse } from '@/api-types/addons-api';
import api from '@/api';
import { OrderApi } from '@/api-types/order-api';

type Props = {
	condition: ItemCouponConditionResponse;
};

const CouponRow = (props: Props) => {
	const { condition } = props;
	const { vinistoUser } = useContext(AuthenticationContext);

	const { data: coupon } = useQuery({
		queryKey: ['coupon', condition.itemCouponId],
		queryFn: () => {
			return api.get<
				OrderApi.DiscountCouponsGetDiscountCouponList.ResponseBody,
				OrderApi.DiscountCouponsGetDiscountCouponList.RequestQuery
			>(
				`order-api/discount-coupons/${condition.itemCouponId}/GetDiscountCoupon`,
				{
					UserLoginHash: vinistoUser?.loginHash,
				}
			);
		},
		enabled: !!condition.itemCouponId,
	});

	return <div>Kupón: {coupon?.discountCoupon?.code}</div>;
};

export default CouponRow;
