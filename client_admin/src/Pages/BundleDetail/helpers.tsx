import useFormatMessage from 'Hooks/useFormatMessage';
import { TopBarItem } from 'Components/TopBar/interfaces';
import { getLocalizedPrice } from 'vinisto_shared/src/price/get-localized-price';

import TopBarDiscount from './Components/TopBarDiscount';

import {
	VinistoHelperDllEnumsCurrency,
	VinistoProductDllModelsApiBundleBundle,
} from '@/api-types/product-api';
import { bundleAdapter } from '@/index';

export function getTopBarBundlePriceForRegularBundle(
	bundle: VinistoProductDllModelsApiBundleBundle,
	t: ReturnType<typeof useFormatMessage>,
	currency: VinistoHelperDllEnumsCurrency,
	currencyTitle: string,
	isSet: boolean = false
): TopBarItem | undefined {
	const bundlePrices = bundleAdapter.fromApi(bundle, {
		currency: VinistoHelperDllEnumsCurrency.CZK,
	}).bundlePrices;
	const { discountedPrice, basePrice } = bundlePrices ?? {};

	if (basePrice === undefined) return;

	if (bundlePrices.isDiscounted) {
		return {
			label: `${t({ id: 'bundleDetail.topbar.price' })}`,
			value: (
				<TopBarDiscount
					isSet={isSet}
					originalPrice={getLocalizedPrice({
						price: basePrice.valueWithVat,
						currency: basePrice.currency,
					})}
					discountValue={
						discountedPrice
							? `${getLocalizedPrice({
									price: discountedPrice.valueWithVat,
									currency: discountedPrice.currency,
							  })} ${t({
									id: 'bundleDetail.topbar.price.withVat',
							  })}`
							: ''
					}
					discountPartial={getLocalizedPrice({
						price:
							bundlePrices.isDiscounted && discountedPrice?.valueWithVat
								? basePrice?.valueWithVat - discountedPrice?.valueWithVat
								: 0,
						currency: basePrice.currency,
					})}
					discountPercentage={
						bundlePrices.isDiscounted && discountedPrice?.valueWithVat
							? Math.round(
									(basePrice?.valueWithVat - discountedPrice?.valueWithVat) /
										(basePrice?.valueWithVat / 100)
							  )
							: 0
					}
					validFrom={
						bundlePrices.isDiscounted && discountedPrice?.validFrom
							? discountedPrice?.validFrom.format('DD.MM.YYYY')
							: ''
					}
					validTo={
						bundlePrices.isDiscounted && discountedPrice?.validTo
							? discountedPrice?.validTo.format('DD.MM.YYYY')
							: ''
					}
				/>
			),
		};
	}
	return {
		label: `${t({ id: 'bundleDetail.topbar.price' })}`,
		value: `${getLocalizedPrice({
			price: basePrice.valueWithVat,
			currency: basePrice.currency,
		})} ${t({
			id: 'bundleDetail.topbar.price.withVat',
		})}`,
		className: 'value-success',
	};
}
