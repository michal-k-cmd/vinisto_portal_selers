import {
	VinistoProductDllModelsApiBundleBundle,
	VinistoProductDllModelsApiCategoryCategory,
	VinistoProductDllModelsApiProductProduct,
	VinistoProductDllModelsApiTagTag,
} from 'vinisto_api_client/src/api-types/product-api';

import BundleItem from '@/domain/bundle/item';
import ProductTag from '@/domain/tag';
import { LangValuePair } from '@/shared';

type BundleApiModelAllRequired =
	Required<VinistoProductDllModelsApiBundleBundle>;

export type BundleCategory = {
	id: NonNullable<VinistoProductDllModelsApiCategoryCategory['id']>;
	name: LangValuePair[];
	description: LangValuePair[];
	url: LangValuePair[];
	images: NonNullable<VinistoProductDllModelsApiCategoryCategory['images']>;
};

export type Bundle = {
	id: string;
	name: LangValuePair[];
	description: LangValuePair[];
	prices: BundleApiModelAllRequired['prices'];
	priceDiscounts: BundleApiModelAllRequired['priceDiscounts'];
	images: BundleApiModelAllRequired['images'];
	specificationDetails: BundleApiModelAllRequired['specificationDetails'];
	categories: BundleCategory[];
	isGift: boolean;
	temporaryUnavailable: boolean;
	isClearanceSale: boolean;
	isSaleOver?: boolean;
	isSet: boolean;
	setBundles?: {
		id: string;
		name: LangValuePair[];
	}[];
	shortDescription?: LangValuePair[];
	text?: LangValuePair[];
	url?: LangValuePair[];
	items?: BundleItem[];
	tags?: ProductTag[];
	alternativeBundles?: Bundle[];
	flags?: Record<string, boolean>;
	tagsDetail?: VinistoProductDllModelsApiTagTag[] | null;
	categoriesDetail?: VinistoProductDllModelsApiCategoryCategory[];
	productsDetail?: VinistoProductDllModelsApiProductProduct[] | null;
	warehouseId?: string[];
};
