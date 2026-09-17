import type {
	VinistoCommonDllModelsApiPricesPrice,
	VinistoCommonDllModelsApiPricesPriceDiscountSet,
	VinistoCommonDllModelsApiPricesPriceDiscountSupplier,
	VinistoCommonDllModelsApiPricesPriceDiscountVinisto,
	VinistoCommonDllModelsApiPricesPriceDiscountVolume,
	VinistoProductDllModelsApiHomePageHomePageCustomCarousel,
	VinistoProductDllModelsApiMultiLangValue,
	VinistoProductDllModelsApiTagTag,
} from 'vinisto_api_client/src/api-types/product-api';

export interface TrimmedImage {
	isMain?: boolean;
	domainUrls?: {
		thumb_208x240?: string;
		thumb_368x490?: string;
	};
}

export interface TrimmedSpecificationDetail {
	definition?: {
		id?: string;
		name?: VinistoProductDllModelsApiMultiLangValue[];
		isDetail?: boolean;
		order?: number;
		allowedValues?: any;
	};
	value?: {
		specificationType?: string;
		selectedValueName?: string;
		selectedValuesName?: string[];
		value?: any;
	};
}

export interface TrimmedBundle {
	id: string;
	name: VinistoProductDllModelsApiMultiLangValue[];
	url: VinistoProductDllModelsApiMultiLangValue[];
	images: TrimmedImage[];
	tagsDetail: VinistoProductDllModelsApiTagTag[];
	specificationDetails: TrimmedSpecificationDetail[];
	prices: VinistoCommonDllModelsApiPricesPrice[];
	priceDiscounts:
		| (
				| VinistoCommonDllModelsApiPricesPriceDiscountSet
				| VinistoCommonDllModelsApiPricesPriceDiscountSupplier
				| VinistoCommonDllModelsApiPricesPriceDiscountVinisto
				| VinistoCommonDllModelsApiPricesPriceDiscountVolume
		  )[]
		| undefined;
	flags: Record<string, boolean>;
	orderLimitation?: any | null;
	categoryIds?: string[] | null;
	supplier: { id: string | null };
	isSet?: boolean;
}

export type CarouselData = {
	topCarousels: VinistoProductDllModelsApiHomePageHomePageCustomCarousel[];
	bottomCarousels: VinistoProductDllModelsApiHomePageHomePageCustomCarousel[];
};
