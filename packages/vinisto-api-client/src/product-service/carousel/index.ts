import api from '@/api';
import {
	ProductApi,
} from '../../api-types/product-api';
import { DEFAULT_CURRENCY } from '@/shared';

// Params should be 'BundleDetailCarouselGetParameters' but it's not generated from swagger
const getSupplierBundlesCarousel = async (
	bundleId: string,
	params: Omit<
		ProductApi.BundleDetailCarouselsGetSupplierBundlesList.RequestQuery,
		'BundleId'
	>
) => {
	const response = await api.get<
		ProductApi.BundleDetailCarouselsGetSupplierBundlesList.ResponseBody,
		ProductApi.BundleDetailCarouselsGetSupplierBundlesList.RequestQuery
	>(`product-api/bundle-detail/carousels/get-supplier-bundles`, {
		BundleId: bundleId,
		...params,
		Currency: params.Currency ?? DEFAULT_CURRENCY,
	});

	return response.bundles;
};

const getBundleCarousels = async (
	bundleId: string,
	params: Omit<ProductApi.BundleDetailCarouselsList.RequestQuery, 'BundleId'>
) => {
	const response = await api.get<
		ProductApi.BundleDetailCarouselsList.ResponseBody,
		ProductApi.BundleDetailCarouselsList.RequestQuery
	>(`product-api/bundle-detail/carousels`, {
		BundleId: bundleId,
		IsCache: true,
		Currency: params.Currency,
		CountryOfSale: params.CountryOfSale,
	});
	if (response) {
		return {
			lastViewedBundles: response.lastViewedBundles ?? [],
			similarBundles: response.similarBundles ?? [],
			manufacturerBundles: response.manufacturerBundles ?? [],
		};
	}
};

const CarouselService = {
	getSupplierBundlesCarousel,
	getBundleCarousels,
};

export default CarouselService;
