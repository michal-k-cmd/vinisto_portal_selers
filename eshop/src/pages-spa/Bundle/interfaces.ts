import { ReactNode } from 'react';
import { IPostPreview } from 'pages-spa/Blog/Components/Post/PostPreview';
import { BundleCarouselsData, CategoryData } from 'Services/Bundle/interfaces';
import {
	VinistoCommonDllModelsApiPricesPrice,
	VinistoProductDllModelsApiBundleBundle,
	VinistoProductDllModelsApiSpecificationSpecificationDetail,
	VinistoProductDllModelsApiTagTag,
} from 'vinisto_api_client/src/api-types/product-api';

export interface BundleMeta {
	bundleName: string;
	bundleShortDescription: string;
	bundleDescription: string;
	bundleMetaDescription: string;
	bundleImageSmall: string;
	bundleUrl: string;
}

export interface BundleDetailProps {
	bundleData: VinistoProductDllModelsApiBundleBundle;
}

export type BundleCategoryData = {
	loading: boolean;
	loaded: boolean;
	data: Record<string, any>;
	error: unknown;
};

export interface IArticlesDataProps {
	articlesList: IPostPreview[];
	loading: boolean;
}

export interface BundleCategoryProps {
	category: CategoryData | undefined;
}

export interface BundleCarouselsProps {
	carousels: BundleCarouselsData | undefined;
	isLoading: boolean;
}

export interface BundleSetDetailProps {
	id: string;
	bundleCateogryId: string;
	bundleName: string;
	bundleDescription: string;
	bundleLocalizedPrice: Record<any, any> & {
		title: any;
	};
	bundlePriceWithVAT: number;
	bundleDiscountedPriceWithVAT: number;
	bundlePriceCurrency: string;
	isOnlySupplier: boolean;
	categoryId: string;
	specificationDetails: VinistoProductDllModelsApiSpecificationSpecificationDetail[];
	bundleProducerName: string;
	bundleProducerUrl: string;
	bundleFlag: ReactNode;
	bundleImageSmall: string;
	bundleImages: {
		src: string;
	}[];
	availableQuantity: number[];
	//supplierName: string;
	bundleUrl: string;
	tagsDetail: VinistoProductDllModelsApiTagTag[] | null | undefined;
	prices?: VinistoCommonDllModelsApiPricesPrice[] | null;
	isSet: boolean;
}
