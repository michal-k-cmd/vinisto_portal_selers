import { useContext } from 'react';
import { BasketContext } from 'Services/BasketService';
import { Button, buttonSizes, buttonVariants } from 'vinisto_ui';
import {
	useFindBundleInBasket,
	useIsBasketLockedForEdit,
} from 'pages-spa/Bundle/hooks';
import { getLocalizedPrice } from 'vinisto_shared/src/price/get-localized-price';
import WarningIcon from 'Components/Icons/Warning';
import { MultiplatformBasketItem } from 'Services/BasketService/interfaces';
import {
	ADDITIONAL_PERCENTAGE_DISCOUNT_VALUES,
	MAX_ADDITIONAL_PERCENTAGE_DISCOUNT_FOR_MERCHANT,
} from 'Services/BasketService/constants';
import { AuthenticationContext } from 'Services/AuthenticationService/context';

import styles from './styles.module.css';

import { Bundle } from '@/domain/bundle';
import { BasketApprovalState } from '@/api-types/basket-api';
import { VinistoHelperDllEnumsCurrency } from '@/api-types/product-api';
// import { VinistoHelperDllEnumsUserUserType } from '@/api-types/user-api';

const AdditionalPercentageDiscountSelect = ({
	item,
}: {
	item: MultiplatformBasketItem & {
		bundle?: Bundle;
	};
}) => {
	const { basketState, handleChangeAdditionalPercentageDiscount } =
		useContext(BasketContext);
	const itemInBasket = useFindBundleInBasket({ bundleId: item.itemId ?? '' });
	const itemInBasketQuantity = itemInBasket?.quantity ?? 1;
	const { vinistoUser } = useContext(AuthenticationContext);

	const isBasketLockedForEdit = useIsBasketLockedForEdit();

	if (!itemInBasket) return null;

	const itemFee =
		'fee' in itemInBasket && itemInBasket.fee ? itemInBasket.fee : 0;

	const itemFeeLoss =
		'feeLoss' in itemInBasket && itemInBasket.feeLoss
			? itemInBasket.feeLoss
			: 0;

	const isfeeLoss = Math.round(itemFeeLoss * itemInBasketQuantity) > 0;

	const isOffLimitFeeLockedForEdit = (value: number) =>
		basketState?.approvalState === BasketApprovalState.WAITING_FOR_APPROVAL &&
		value > MAX_ADDITIONAL_PERCENTAGE_DISCOUNT_FOR_MERCHANT;

	const isUserSupportRole =
		vinistoUser.canCreateOrderAsSupport &&
		!vinistoUser.canCreateOrderAsMerchant;

	return (
		<div className={styles.container}>
			<div></div>
			<div className="d-flex gap-2">
				{ADDITIONAL_PERCENTAGE_DISCOUNT_VALUES.map((value) => (
					<Button
						key={value}
						variant={
							item.additionalPercentageDiscount === value
								? buttonVariants.CTA
								: buttonVariants.GREEN_OUTLINE
						}
						size={buttonSizes.S}
						disabled={
							isBasketLockedForEdit ||
							// isActingAsUserSupportRole ||
							isOffLimitFeeLockedForEdit(value)
						}
						onClick={() =>
							handleChangeAdditionalPercentageDiscount({
								bundleId: item.itemId,
								additionalPercentageDiscount: value,
							})
						}
					>{`${value > 0 ? `-` : ``}${value}%`}</Button>
				))}
			</div>
			{!isUserSupportRole && (
				<div className="my-1 d-flex align-items-center">
					{isfeeLoss && <WarningIcon />}
					<small>
						{' '}
						Provize:{' '}
						{getLocalizedPrice({
							price: itemFee * itemInBasketQuantity,
							currency:
								basketState?.currency ?? VinistoHelperDllEnumsCurrency.CZK,
						})}
						{isfeeLoss &&
							` (ztráta ${getLocalizedPrice({
								price: itemFeeLoss * itemInBasketQuantity,
								currency:
									basketState?.currency ?? VinistoHelperDllEnumsCurrency.CZK,
							})})`}
					</small>
				</div>
			)}
		</div>
	);
};

export default AdditionalPercentageDiscountSelect;
