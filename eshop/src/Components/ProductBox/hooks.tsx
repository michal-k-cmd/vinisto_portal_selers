import { useContext } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';
import { BasketContext } from 'Services/BasketService';
// import { getDiscountPriceValues } from 'vinisto_shared/src/price/get-discount-prices';
import { getLocalizedPrice } from 'vinisto_shared/src/price/get-localized-price';
import { Bundle } from 'vinisto_api_client/src/domain/bundle';
import { useFindBundleInBasket } from 'pages-spa/Bundle/hooks';
import { useIsB2b } from 'Services/PlatformService';

export const useProductBasketCount = (bundle: Bundle | null) => {
	const isB2b = useIsB2b();
	const localizationContext = useContext(LocalizationContext);
	const basketContext = useContext(BasketContext);
	const t = localizationContext.useFormatMessage();

	const item = useFindBundleInBasket({
		bundleId: bundle?.id,
	});

	const quantityInBasket = item?.quantity ?? 0;

	if (!bundle || !quantityInBasket) return { basketQuantityPopover: null };

	// BEWARE! Discounted price can be actually higher than the original price
	// If discounted price exists, it is always used for the total price calculation
	const priceWithVat = item?.discountPriceWithVat ?? item?.priceWithVat;
	const price = item?.discountPrice ?? item?.price;

	if (!priceWithVat)
		return {
			basketQuantityPopover: t(
				{ id: 'popover.addingToBasket' },
				{
					quantity: (
						<strong key="popover.addedToBasket.quantity">
							{quantityInBasket}
						</strong>
					),
				}
			),
		};

	const basketBundlesPriceWithCurrency =
		((isB2b ? price : priceWithVat) ?? 0) * quantityInBasket;

	const currency = basketContext.basketState?.currency;

	const basketBundlesPriceWithCurrencyLocalized = getLocalizedPrice({
		price: basketBundlesPriceWithCurrency,
		currency,
	});

	const basketQuantityPopover = t(
		{ id: 'popover.addedToBasket' },
		{
			quantity: (
				<strong key="popover.addedToBasket.quantity">{quantityInBasket}</strong>
			),
			priceWithCurrency: (
				<strong key="popover.addedToBasket.priceWithCurrency">
					{basketBundlesPriceWithCurrencyLocalized}
				</strong>
			),
		}
	);

	return {
		basketQuantityPopover,
	};
};
