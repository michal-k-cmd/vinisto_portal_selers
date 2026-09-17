import { useCallback, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { BasketContext } from 'Services/BasketService';
import { LocalizationContext } from 'Services/LocalizationService';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { SignalRErrorType } from 'Services/BasketService/interfaces';

import styles from './styles.module.css';
import CouponItem from './CouponItem';

interface CouponFormValues {
	couponCode: string;
}

const Coupon = () => {
	const t = useContext(LocalizationContext).useFormatMessage();
	const { basketState, handleOnAddCoupon } = useContext(BasketContext);
	const { basketErrorMessages, clearBasketErrorCategory } = useContext(
		AuthenticationContext
	);

	const couponErrorMessages = basketErrorMessages.Coupon;
	const hasCouponErrorMessages = couponErrorMessages.length > 0;

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
		setError,
		clearErrors,
	} = useForm<CouponFormValues>();

	const clearCouponErrorMessages = () => {
		clearBasketErrorCategory(SignalRErrorType.Coupon);
	};

	const onSubmit = async (data: CouponFormValues) => {
		clearCouponErrorMessages();

		const inputWitRemovedWhitespace = (data.couponCode ?? '').trim();
		if (
			basketState?.coupons?.some(
				(coupon) => coupon.code === inputWitRemovedWhitespace
			)
		) {
			setError('couponCode', {
				message: 'basket.discountCoupon.error.used',
			});
			return;
		}

		try {
			handleOnAddCoupon(inputWitRemovedWhitespace);
			reset();
		} catch (responseError: any) {
			setError('couponCode', {
				message: responseError?.message,
			});
		}
	};

	const getErrorMessage = useCallback(() => {
		const error = couponErrorMessages[0];
		if (error.generalError === 'ObjectNotFound')
			return t({ id: 'basket.discountCoupon.error.invalid' });
		if (error?.specificError) {
			switch (error.specificError) {
				case 'DISCOUNT_COUPON_BELOW_ORDER_PRICE_LIMIT':
					return t({
						id: 'basket.coupon.specificError.DISCOUNT_COUPON_BELOW_ORDER_PRICE_LIMIT',
					});
				case 'DISCOUNT_COUPON_NO_LONGER_ACTIVE':
					return t({
						id: 'basket.coupon.specificError.DISCOUNT_COUPON_NO_LONGER_ACTIVE',
					});
				case 'DISCOUNT_COUPON_IS_USED_IN_ANOTHER_ORDER':
					return t({
						id: 'basket.coupon.specificError.DISCOUNT_COUPON_IS_USED_IN_ANOTHER_ORDER',
					});
				case 'DISCOUNT_COUPON_IS_OUT_OF_EXPIRATION':
					return t({
						id: 'basket.coupon.specificError.DISCOUNT_COUPON_IS_OUT_OF_EXPIRATION',
					});
				case 'DISCOUNT_COUPON_IS_SCHEDULED':
					return t({
						id: 'basket.coupon.specificError.DISCOUNT_COUPON_IS_SCHEDULED',
					});
				case 'ITEMS_DOES_NOT_MATCH_DISCOUNT_COUPON_LIMITATION_REQUIREMENTS':
					return t({
						id: 'basket.coupon.specificError.ITEMS_DOES_NOT_MATCH_DISCOUNT_COUPON_LIMITATION_REQUIREMENTS',
					});
				case 'DISCOUNT_COUPON_AMOUNT_VALUE_HIGHER_THEN_ALLOWD_FROM':
					return t({
						id: 'basket.coupon.specificError.DISCOUNT_COUPON_AMOUNT_VALUE_HIGHER_THEN_ALLOWD_FROM',
					});
				case 'DISCOUNT_COUPON_PRICE_HIGHER_DISCOUNTED_PRODUCTS_PRICE':
					return t({
						id: 'basket.coupon.specificError.DISCOUNT_COUPON_PRICE_HIGHER_DISCOUNTED_PRODUCTS_PRICE',
					});
				case 'DISCOUNT_COUPON_IS_NOT_COMBINABLE':
					return t({
						id: 'basket.coupon.specificError.DISCOUNT_COUPON_IS_NOT_COMBINABLE',
					});
				case 'DISCOUNT_COUPON_IS_NOT_FOR_DISCOUNTED_ITEMS':
					return t({
						id: 'basket.coupon.specificError.DISCOUNT_COUPON_IS_NOT_FOR_DISCOUNTED_ITEMS',
					});
				case 'DISCOUNT_COUPON_ID_IS_ALREADY_IN_BASKET':
					return t({
						id: 'basket.coupon.specificError.DISCOUNT_COUPON_ID_IS_ALREADY_IN_BASKET',
					});
				case 'DISCOUNT_COUPON_NOT_APPLICABLE_IN_COUNTRY':
					return t({
						id: 'basket.coupon.specificError.DISCOUNT_COUPON_NOT_APPLICABLE_IN_COUNTRY',
					});
				case 'DISCOUNT_COUPON_IS_FOR_REGISTERED_USERS_ONLY':
					return t({
						id: 'basket.coupon.specificError.DISCOUNT_COUPON_IS_FOR_REGISTERED_USERS_ONLY',
					});

				default:
					return t({ id: 'notification.message.discountCouponAdd.error' });
			}
		}
		return t({ id: 'notification.message.discountCouponAdd.error' });
	}, [t, couponErrorMessages]);

	return (
		<>
			<div className={styles.couponsWrapper}>
				{basketState?.coupons?.map((coupon) => (
					<CouponItem
						key={coupon.couponId}
						data={coupon}
					/>
				))}
			</div>
			<div className={styles.container}>
				{/*couponErrorMessages.length > 0 && (
					<pre style={{ backgroundColor: '#ddd', fontSize: 13 }}>
						{JSON.stringify(couponErrorMessages, null, 2)}
					</pre>
				)*/}
				<div className={styles.heading}>
					{t({ id: 'basket.coupons.title' })}
				</div>

				<form
					className={styles.form}
					onSubmit={handleSubmit(onSubmit)}
				>
					<div className={styles.couponInputWrapper}>
						<input
							type="text"
							placeholder={`${t({
								id: 'basket.discountCoupon.placeholder',
							})}`}
							className={styles.couponInput}
							onInput={() => {
								clearErrors('couponCode');
								clearCouponErrorMessages();
							}}
							{...register('couponCode', {
								required: 'basket.discountCoupon.placeholder',
							})}
						/>
						<div className={styles.couponFeedback}>
							{(errors.couponCode || hasCouponErrorMessages) && (
								<span className={styles.errorMessage}>
									{errors.couponCode?.message
										? t({ id: errors.couponCode.message })
										: getErrorMessage()}
								</span>
							)}
						</div>
					</div>
					<button
						type="submit"
						className={styles.submit}
					>
						{t({ id: 'basket.discountCoupon.redeem' })}
					</button>
				</form>
			</div>
		</>
	);
};

export default Coupon;
