import {
	VinistoHelperDllEnumsCategoryCategoryType,
	VinistoImageDllModelsApiImageImage,
	VinistoProductDllModelsApiBundleBundle,
	VinistoProductDllModelsApiBundleItemsBundleItem,
	VinistoProductDllModelsApiBundleItemsProductItem,
	VinistoProductDllModelsApiSpecificationSpecificationDetail,
} from 'vinisto_api_client/src/api-types/product-api';
import { VinistoCommonDllModelsApiPricesPrice } from 'vinisto_api_client/src/api-types/order-api';
import { Bundle } from 'vinisto_api_client/src/domain/bundle';

export type MultiLangValue = {
	language?: string | null;
	value?: string | null;
};

export interface CategoryData {
	id: string;
	name: MultiLangValue[];
	description: MultiLangValue[];
	url: MultiLangValue[];
	images: VinistoImageDllModelsApiImageImage[];
	type: VinistoHelperDllEnumsCategoryCategoryType | undefined;
	specificationDetails:
		| VinistoProductDllModelsApiSpecificationSpecificationDetail[]
		| null;
	metaDescription?: MultiLangValue[];
}

export type BundleDataBundle = Bundle & {
	setItems: (
		| VinistoProductDllModelsApiBundleItemsBundleItem
		| VinistoProductDllModelsApiBundleItemsProductItem
	)[];
	setItem?: VinistoProductDllModelsApiBundleItemsBundleItem & {
		originalPrice?: VinistoCommonDllModelsApiPricesPrice | null | undefined;
		setPrice?: VinistoCommonDllModelsApiPricesPrice | null | undefined;
	};
};

export interface BundleCarouselsData {
	lastViewedBundles: VinistoProductDllModelsApiBundleBundle[];
	similarBundles: VinistoProductDllModelsApiBundleBundle[];
	manufacturerBundles: VinistoProductDllModelsApiBundleBundle[];
	categoryBundles?: VinistoProductDllModelsApiBundleBundle[];
}
