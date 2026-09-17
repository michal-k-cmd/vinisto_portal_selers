import { useContext } from 'react';
import { BasketContext } from 'Services/BasketService';
import { LocalizationContext } from 'Services/LocalizationService';
import { Button, buttonVariants } from 'vinisto_ui';
import { getBundleMetaForAnalytics } from 'Services/BasketService/helpers';
import getBundleImage, {
	IMAGE_SIZE_THUMB_88x138,
} from 'Helpers/getBundleImage';
import { getLocalizedValue } from 'Hooks/useLocalizedValue';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { getLocalizedPrice } from 'vinisto_shared/src/price/get-localized-price';
import getFlagSpecification from 'Helpers/getFlagSpecification';
import BundleProducer from 'Components/ProductBox/Components/BundleProducer';
import { useFindBundleInBasket } from 'pages-spa/Bundle/hooks';
import { ModalContext } from 'Components/Modal/context';
import { useIsB2b } from 'Services/PlatformService';
import { LOGIN_MODAL } from 'Components/Modal/constants';

import styles from './styles.module.css';

import { Bundle } from '@/domain/bundle';
import {
	VinistoHelperDllEnumsPriceLevel,
	VinistoHelperDllEnumsUserUserType,
} from '@/api-types/product-api';

interface PriceGuaranteeBundleInfoProps {
	bundle: Bundle;
}

const PriceGuaranteeBundleInfo = ({
	bundle,
}: PriceGuaranteeBundleInfoProps) => {
	const isB2b = useIsB2b();
	const { handleOnAddToBasket, handleOnChangeItemQuantity } =
		useContext(BasketContext);
	const { vinistoUser } = useContext(AuthenticationContext);
	const { handleCloseModal, handleOpenModal } = useContext(ModalContext);

	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();
	const {
		activeCurrency: { currency },
	} = localizationContext;

	const { id } = bundle;
	const bundleMetaForAnalytics = getBundleMetaForAnalytics(bundle);

	const item = useFindBundleInBasket({
		bundleId: bundle?.id,
	});

	const quantityInBasket = item?.quantity ?? 0;

	const isUserVinistoPlusSubscriber =
		vinistoUser.priceLevel === VinistoHelperDllEnumsPriceLevel.VinistoPlus;

	const {
		basePrice,
		discountedPrice,
		isDiscounted,
		vinistoPlusPriceOrDiscount,
	} = bundle.bundlePrices;

	const price = (() => {
		if (isUserVinistoPlusSubscriber && vinistoPlusPriceOrDiscount)
			return vinistoPlusPriceOrDiscount;
		return isDiscounted ? discountedPrice : basePrice;
	})();

	const {
		shortVariety: bundleProducerName,
		varietyUrl: bundleProducerUrl,
		component: bundleFlag,
	} = getFlagSpecification(bundle.specificationDetails ?? []);

	const handleOnButtonClick = () => {
		if (quantityInBasket > 0) {
			return handleOnChangeItemQuantity({
				quantity: quantityInBasket + 1,
				bundleId: id,
				bundleMetaForAnalytics,
			});
		}
		return handleOnAddToBasket({
			quantity: quantityInBasket + 1,
			bundleId: id,
			bundleItem: bundle,
			bundleMetaForAnalytics,
			openCrossSellModal: true,
		});
	};

	const isB2bAndUserIsNotACompany =
		isB2b && vinistoUser.type !== VinistoHelperDllEnumsUserUserType.Company;

	if (!price) return null;

	return (
		<div className={styles.component}>
			<img
				height={138}
				width={88}
				src={getBundleImage(bundle?.images ?? [], IMAGE_SIZE_THUMB_88x138)}
				alt={`${t({ id: 'alt.bundleImage' })}`}
				className={styles.bundleImage}
			/>
			<div className={styles.bundleName}>{getLocalizedValue(bundle.name)}</div>
			<BundleProducer
				className={styles.bundleProducer}
				flag={bundleFlag}
				url={bundleProducerUrl}
				name={bundleProducerName}
				onClick={() => handleCloseModal()}
			/>
			<div className={styles.infoBox}>
				<span className="d-block">
					{t({ id: 'bundle.priceGuarantee.betterPriceText.infoBoxText.line1' })}
				</span>
				<span className="d-block">
					{t(
						{ id: 'bundle.priceGuarantee.betterPriceText.infoBoxText.line2' },
						{
							emphasized: (
								<strong key="emphasized">
									{t({
										id: 'bundle.priceGuarantee.betterPriceText.infoBoxText.emphasized',
									})}
								</strong>
							),
						}
					)}
				</span>
			</div>
			<div className={styles.ctaBox}>
				<div>
					<div className={styles.priceTitle}>
						{t({ id: 'bundle.priceGuarantee.betterPriceText.vinistoPrice' })}
					</div>
					<div className={styles.priceWithVat}>
						{getLocalizedPrice({
							price: isB2b ? price.value : price.valueWithVat,
							currency,
						})}
					</div>
					<div className={styles.price}>
						{t(
							{
								id: isB2b
									? 'carousel.info.withVAT'
									: 'carousel.info.withoutVAT',
							},
							{
								priceWithCurrency: getLocalizedPrice({
									price: isB2b ? price.valueWithVat : price.value,
									currency,
								}),
							}
						)}
					</div>
				</div>
				<div>
					<Button
						className={styles.ctaButton}
						variant={buttonVariants.CTA}
						onClick={
							isB2bAndUserIsNotACompany
								? () => handleOpenModal(LOGIN_MODAL)
								: handleOnButtonClick
						}
					>
						{t({ id: 'bundle.button.buy' })}
					</Button>
				</div>
			</div>
		</div>
	);
};

export default PriceGuaranteeBundleInfo;
