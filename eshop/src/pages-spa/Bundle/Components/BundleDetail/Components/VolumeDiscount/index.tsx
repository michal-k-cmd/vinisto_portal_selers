import { BasketContext } from 'Services/BasketService';
import { DeviceServiceContext } from 'Services/DeviceService';
import { LocalizationContext } from 'Services/LocalizationService';
import { useContext } from 'react';
import { Button, buttonSizes, buttonVariants } from 'vinisto_ui';
import { VolumeDiscount } from 'vinisto_ui';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { ModalContext } from 'Components/Modal/context';
import { LOGIN_MODAL } from 'Components/Modal/constants';
import { getLocalizedPrice } from 'vinisto_shared/src/price/get-localized-price';
import {
	DiscountedPrice,
	VolumeDiscount as VolumeDiscountType,
} from 'vinisto_api_client/src/domain/price';
import { useFindBundleInBasket } from 'pages-spa/Bundle/hooks';
import { BundleMetaForAnalytics } from 'Services/BasketService/interfaces';

import styles from './styles.module.css';

import { LangValuePair } from '@/shared';

interface VolumeDiscountSectionProps {
	bundleId: string;
	bundleUrl: LangValuePair[];
	isForLogged: boolean;
	volumeDiscount: VolumeDiscountType;
	discountedPrice: DiscountedPrice | null;
	warehouseCount: number;
	bundleLimitPerOrder: number | null;
	bundleMetaForAnalytics: BundleMetaForAnalytics;
	className?: string;
}

const VolumeDiscountSection = ({
	bundleId,
	isForLogged = false,
	volumeDiscount,
	discountedPrice,
	warehouseCount,
	bundleLimitPerOrder,
	bundleMetaForAnalytics,
	className,
}: VolumeDiscountSectionProps) => {
	const t = useContext(LocalizationContext).useFormatMessage();
	const { isDesktop } = useContext(DeviceServiceContext);
	const { handleOnChangeItemQuantity, handleOnAddToBasket } =
		useContext(BasketContext);
	const authenticationContext = useContext(AuthenticationContext);
	const modalContext = useContext(ModalContext);

	const itemInBasket = useFindBundleInBasket({
		bundleId,
	});

	const quantityInBasket = itemInBasket?.quantity ?? 0;

	const getWouldExceedOrderLimitation = (quantity: number) =>
		typeof bundleLimitPerOrder === 'number' &&
		bundleLimitPerOrder <= quantity + (itemInBasket?.quantity ?? 0);

	const values = volumeDiscount.values.filter((item) => {
		if (item.quantity > warehouseCount) return false;
		if (Math.round(item.totalSavingsWithVat) < 1) return false;
		if (
			discountedPrice != null &&
			discountedPrice.valueWithVat <= item.valueWithVat
		)
			return false;
		if (getWouldExceedOrderLimitation(quantityInBasket + item.quantity))
			return false;

		return true;
	});

	const handleOnBuy = (count: number, bundleId: string) => {
		itemInBasket
			? handleOnChangeItemQuantity({
					quantity: count,
					bundleId,
					bundleMetaForAnalytics,
			  })
			: handleOnAddToBasket({
					quantity: count,
					bundleId,
					bundleMetaForAnalytics,
			  });
		if (!isDesktop) {
			window.scrollTo(0, 0);
		}
	};

	if (values.length === 0) {
		return null;
	}

	return (
		<VolumeDiscount.Container
			title={t({
				id: 'volumeDiscount.title',
			})}
			className={className}
		>
			<VolumeDiscount.List>
				{values.map((item, index) => {
					return (
						<VolumeDiscount.ListItem
							key={'bdvd' + index}
							text={t(
								{ id: 'volumeDiscount.content' },
								{
									unitPrice: (
										<VolumeDiscount.DoubleEmphasized key="bdvd-volumeDiscount.content.unitPrice">
											{getLocalizedPrice({
												price: item.valueWithVat,
												currency: volumeDiscount.currency,
											})}
										</VolumeDiscount.DoubleEmphasized>
									),
									amount: (
										<VolumeDiscount.Emphasized key="bdvd-volumeDiscount.content.amount">
											{t({ id: 'amount.pcs' }, { count: item.quantity })}
										</VolumeDiscount.Emphasized>
									),
									savings: (
										<VolumeDiscount.Emphasized key="bdvd-volumeDiscount.content.savings">
											{getLocalizedPrice({
												price: item.totalSavingsWithVat,
												currency: volumeDiscount.currency,
											})}
										</VolumeDiscount.Emphasized>
									),
								}
							)}
							cta={
								!authenticationContext.isLoggedIn && isForLogged ? (
									<Button
										variant={buttonVariants.CTA}
										size={buttonSizes.S}
										onClick={() =>
											modalContext.handleOpenModal(LOGIN_MODAL, {})
										}
										className={styles.volumeDiscountButton}
									>
										{t({ id: 'carousel.button.loginAndShop' })}
									</Button>
								) : (
									<Button
										variant={buttonVariants.CTA}
										size={buttonSizes.S}
										onClick={() =>
											handleOnBuy(quantityInBasket + item.quantity, bundleId)
										}
									>
										{t({ id: 'bundle.button.buy' })}
									</Button>
								)
							}
						/>
					);
				})}
			</VolumeDiscount.List>
		</VolumeDiscount.Container>
	);
};

export default VolumeDiscountSection;
