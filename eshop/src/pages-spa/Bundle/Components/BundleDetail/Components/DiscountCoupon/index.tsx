'use client';

import { LocalizationContext } from 'Services/LocalizationService';
import cx from 'classnames';
import { useContext } from 'react';
import { Button, DiscountPercentage } from 'vinisto_ui';
import { getLocalizedPrice } from 'vinisto_shared/src/price/get-localized-price';
import { ModalContext } from 'Components/Modal/context';
import { LOGIN_MODAL } from 'Components/Modal/constants';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { DeviceServiceContext } from 'Services/DeviceService';
import Price from 'vinisto_api_client/src/domain/price';
import {
	VinistoOrderDllModelsApiDiscountCouponDefinitionModelsAmountDiscountCouponDefinition,
	VinistoOrderDllModelsApiDiscountCouponDefinitionModelsPercentageDiscountCouponDefinition,
} from 'vinisto_api_client/src/api-types/order-api';

import styles from './styles.module.css';

interface DiscountCouponProps {
	basePrice: Price | null;
	discountedPrice: Price | null;
	priceWhenCouponApplied: number | null;
	priceWhenCouponAppliedWithoutVat: number | null;
	isDiscounted: boolean;
	hasToLoginToBeAbleToPurchase: boolean;
	mostValuableDiscountCoupon:
		| VinistoOrderDllModelsApiDiscountCouponDefinitionModelsAmountDiscountCouponDefinition
		| VinistoOrderDllModelsApiDiscountCouponDefinitionModelsPercentageDiscountCouponDefinition
		| null;
	mostValuableDiscountCouponCode: string | null;
	handleOnAddToBasketWithDiscountCoupon: ({
		openCrossSellModal,
	}: {
		openCrossSellModal: boolean;
	}) => void;
	availableQuantity: number;
	className?: string;
}

const DiscountCoupon = ({
	basePrice,
	priceWhenCouponApplied,
	priceWhenCouponAppliedWithoutVat,
	hasToLoginToBeAbleToPurchase,
	mostValuableDiscountCoupon,
	mostValuableDiscountCouponCode,
	handleOnAddToBasketWithDiscountCoupon,
	availableQuantity,
	className,
}: DiscountCouponProps) => {
	const localizationContext = useContext(LocalizationContext);
	const {
		activeCurrency: { currency },
	} = localizationContext;
	const t = localizationContext.useFormatMessage();
	const { handleOpenModal } = useContext(ModalContext);
	const { isLoggedIn } = useContext(AuthenticationContext);
	const { isDesktop } = useContext(DeviceServiceContext);

	const isMostValuableCouponForRegisteredUsers = !!(
		mostValuableDiscountCoupon &&
		'isForRegisteredUsers' in mostValuableDiscountCoupon &&
		mostValuableDiscountCoupon.isForRegisteredUsers
	);

	const hasToLoginToBeAbleToApplyCoupon =
		isMostValuableCouponForRegisteredUsers && !isLoggedIn;

	const handleOpenLoginModal = () => {
		handleOpenModal(LOGIN_MODAL);
	};

	const handleScrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	return (
		<div
			className={cx(
				styles.wrapper,
				styles.shopWrap,
				styles.discountCoupon,
				className,
				'discount-coupon-box-wrapper'
			)}
		>
			<div className={styles.priceWithVat}>
				<div className="d-flex align-items-center gap-2 gap-xl-3 mb-1 mb-xl-0 mt-1 mt-xl-0">
					<div>
						{getLocalizedPrice({
							price: priceWhenCouponApplied ?? 0,
							currency,
						})}
					</div>
					<DiscountPercentage
						discountedPriceWithVat={priceWhenCouponApplied ?? 0}
						standardPriceWithVat={basePrice?.valueWithVat ?? 0}
						className={styles.discountPercentage}
					/>
				</div>
			</div>
			<div className={styles.priceWithoutVatValue}>
				{t(
					{ id: 'price.withoutVAT' },
					{
						priceWithCurrency: (
							<span key="dc-price.withoutVAT">
								{getLocalizedPrice({
									price: priceWhenCouponAppliedWithoutVat ?? 0,
									currency,
								})}
							</span>
						),
					}
				)}
			</div>
			<div className={styles.discountCouponInfo}>
				{t(
					hasToLoginToBeAbleToPurchase || hasToLoginToBeAbleToApplyCoupon
						? {
								id: 'basket.discountCoupon.addToBasketWithDiscount.notLoggedIn',
						  }
						: {
								id: 'basket.discountCoupon.addToBasketWithDiscount',
						  }
				)}
				<Button
					className={cx(styles.discountButton, {
						[styles.disabled]:
							!availableQuantity || hasToLoginToBeAbleToApplyCoupon,
					})}
					onClick={
						hasToLoginToBeAbleToPurchase
							? handleOpenLoginModal
							: () => {
									handleOnAddToBasketWithDiscountCoupon({
										openCrossSellModal: isDesktop,
									});
									handleScrollToTop();
							  }
					}
				>
					{mostValuableDiscountCouponCode}
				</Button>
			</div>
			{hasToLoginToBeAbleToApplyCoupon && (
				<div className={styles.discountCouponInfo}>
					{t({ id: 'basket.discountCoupon.notClubMember' })}
					<Button
						className={styles.clubLoginButton}
						onClick={handleOpenLoginModal}
						disabled={!availableQuantity}
					>
						{t({
							id: 'basket.discountCoupon.notClubMember.button',
						})}
					</Button>
				</div>
			)}
		</div>
	);
};

export default DiscountCoupon;
