import { AbstractAdapter } from '../abstract-adapter';
import { languages } from '../../shared';

import Product from '.';

import { imageAdapter, priceAdapter, tagAdapter } from '../../index';
import {
	VinistoHelperDllEnumsPriceLevel,
	VinistoProductDllModelsApiProductProduct,
} from '../../api-types/product-api';

const mapApiPricesToProductPrices = (
	apiData: VinistoProductDllModelsApiProductProduct
) => {
	const { prices } = apiData;

	const basePrice = prices.filter(
		(price) =>
			price.level === VinistoHelperDllEnumsPriceLevel.Level1 &&
			price.platformId === 0
	)[0];

	return {
		basePrice: priceAdapter.fromApi(basePrice),
	};
};

class ProductAdapter extends AbstractAdapter<
	Product,
	VinistoProductDllModelsApiProductProduct
> {
	fromApi(apiData: VinistoProductDllModelsApiProductProduct): Product {
		const id = apiData.id;
		const warehouseId = apiData.warehouseId;

		if (!id) throw new Error('No id in product');

		if (!warehouseId) throw new Error(`No warehouseId in product ${id}`);
		if (!apiData.prices) throw new Error(`No prices in bundle ${id}`);

		return {
			id,
			name: this.convertMultiLangValue(apiData.name),
			description: this.convertMultiLangValue(apiData.description),
			text: this.convertMultiLangValue(apiData.text),
			url: this.convertMultiLangValue(apiData.url),
			language: apiData.language ?? languages[0],
			ean: apiData.ean ?? '',
			prices: apiData.prices?.map((price) => priceAdapter.fromApi(price)),
			// productPrices: testData,
			productPrices: mapApiPricesToProductPrices(apiData),
			warehouseId,
			images: apiData.images?.map((image) => imageAdapter.fromApi(image)),
			tags: apiData.tagsDetail?.map((tag) => tagAdapter.fromApi(tag)),
			specificationDetails: apiData.specificationDetails,
			flags: {
				isDeleted: apiData.isDeleted ?? false,
				isEnabled: apiData.isEnabled ?? false,
				isForLogged: apiData.isForLogged ?? false,
			},
		};
	}
}

export default ProductAdapter;
