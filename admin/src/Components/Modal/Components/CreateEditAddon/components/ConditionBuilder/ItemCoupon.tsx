import React, { useContext } from 'react';
import { useField } from 'react-final-form';
import { head } from 'Helpers/lodash';
import { InputAutocompleteAsync, Validators } from 'Components/Form';
import useAutocompleteCoupons from 'Hooks/useAutocompleteCoupons';
import { AutocompleteOption } from 'Components/Form/Components/AutocompleteAsync/interfaces';
import { useQuery } from '@tanstack/react-query';
import { AuthenticationContext } from 'Services/AuthenticationService/context';

import { ConditionRequest } from '@/api-types/addons-api';
import { OrderApi } from '@/api-types/order-api';
import api from '@/api';

interface ItemCouponProps {
	name: string;
	initialConditions: ConditionRequest;
}

const ItemCoupon = ({ name, initialConditions }: ItemCouponProps) => {
	const { input } = useField(name, {
		subscription: { value: true },
	});

	const {
		autocompleteOptions: couponAutocompleteOptions,
		handleOnSearch: handleOnCouponSearch,
	} = useAutocompleteCoupons();

	const couponInitialValue = initialConditions?.itemCouponConditionRequest;

	const { vinistoUser } = useContext(AuthenticationContext);

	const { data: initialCoupon } = useQuery({
		queryKey: ['coupon', couponInitialValue?.itemCouponId],
		queryFn: () => {
			return api.get<
				OrderApi.DiscountCouponsGetDiscountCouponList.ResponseBody,
				OrderApi.DiscountCouponsGetDiscountCouponList.RequestQuery
			>(
				`order-api/discount-coupons/${couponInitialValue?.itemCouponId}/GetDiscountCoupon`,
				{
					UserLoginHash: vinistoUser?.loginHash,
				}
			);
		},
		enabled: !!couponInitialValue?.itemCouponId,
	});

	return (
		<InputAutocompleteAsync
			options={couponAutocompleteOptions}
			defaultInputValue={initialCoupon?.discountCoupon?.code ?? ''}
			label="Kupón"
			placeholder="Najít kupón"
			name={name}
			identifier={name}
			validate={Validators.required}
			onChange={(selectedCoupons: AutocompleteOption[]) => {
				const couponId = head(selectedCoupons)?.value;
				if (couponId) {
					input.onChange({ itemCouponId: couponId });
				} else {
					input.onChange(null);
				}
			}}
			onSearchCallback={handleOnCouponSearch}
		/>
	);
};

export default ItemCoupon;
