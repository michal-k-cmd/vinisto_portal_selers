import {
	VinistoProductDllModelsApiBundleBundle,
	VinistoProductDllModelsApiBundleBundleEvaluation,
	VinistoProductDllModelsApiBundleItemsBundleItem,
	VinistoProductDllModelsApiBundleItemsProductItem,
	VinistoProductDllModelsApiProductProduct,
	VinistoProductDllModelsApiTagTag,
	VinistoSupplierDllModelsApiCertificateCertificate,
	VinistoSupplierDllModelsApiSupplierUser,
} from 'vinisto_api_client/src/api-types/product-api';

import { ProductSpecification } from './Components/Specifications/interfaces';

export interface AdvisedBundlesProps {
	economicBundles: VinistoProductDllModelsApiBundleBundle[];
	standardBundles: VinistoProductDllModelsApiBundleBundle[];
	premiumBundles: VinistoProductDllModelsApiBundleBundle[];
}

export interface AdvisedBundleProps {
	bundle: VinistoProductDllModelsApiBundleBundle | null;
	isLoading: boolean;
	isActive?: boolean;
	skeletonAnimationEnable?: boolean;
}

export interface AdvisedBundle {
	id?: string | null;
	name?: MultiLangValue[];
	description?: MultiLangValue[];
	text?: MultiLangValue[];
	url?: MultiLangValue[];
	prices?: BundlePrice[];
	items?: (
		| VinistoProductDllModelsApiBundleItemsBundleItem
		| VinistoProductDllModelsApiBundleItemsProductItem
	)[];
	images?: BundleImage[];
	isEnabled?: boolean;
	isDeleted?: boolean;
	tags?: string[];
	tagsDetail?: VinistoProductDllModelsApiTagTag[];
	categories?: string[];
	language?: string | null;
	alternativeBundles?: string[];
	alternativeBundleObjects?: VinistoProductDllModelsApiBundleBundle[] | null;
	specificationDetails?: ProductSpecification[] | null;
	identicalBundles?: VinistoProductDllModelsApiBundleBundle[];
	productsDetail?: VinistoProductDllModelsApiProductProduct[];
	supplierId?: string;
	supplier?: SupplierDetail;
	availableCount?: number;
	isDeliveryFree?: boolean;
	bundleEvaluation?: VinistoProductDllModelsApiBundleBundleEvaluation | null;
	isMain?: boolean;
	scoring?: number;
	scoringWarehouse?: number;
	scoringDiscount?: number;
	scoringAdmin?: number;
	isForLogged?: boolean;
}

export interface MultiLangValue {
	language?: string;
	value?: string | null;
}

export interface BundlePrice {
	value?: number;
	vat?: string;
	valueWithVat?: number;
	vatValue?: number;
	currency?: string | null;
	type?: string;
	validFrom?: number | null;
	validTo?: number | null;
}

export interface BundleImage {
	id?: string | null;
	objectType?: string;
	objectId?: string | null;
	isMain?: boolean;
	domainUrls?: Record<string, string>;
}

export interface SupplierDetail {
	id?: string | null;
	nameWeb?: string | null;
	nameBilling?: string | null;
	ico?: string | null;
	dic?: string | null;
	address?: AddressDetail;
	countryCode?: string;
	userIds?: string[] | null;
	users?: VinistoSupplierDllModelsApiSupplierUser[] | null;
	supplierType?: string;
	isShipping?: boolean;
	web?: MultiLangValue[] | null;
	companyDescription?: MultiLangValue[] | null;
	mainProfile?: MultiLangValue[] | null;
	wineRegion?: MultiLangValue[] | null;
	couponPrefix?: string | null;
	logo?: ImageDetail;
	baseImage?: ImageDetail;
	certificates?: VinistoSupplierDllModelsApiCertificateCertificate[] | null;
	pickupAddress?: AddressDetail | null;
	bankAccountNumber?: string | null;
}

export interface AddressDetail {
	street: string;
	landRegistryNumber: string;
	houseNumber?: string | null;
	zip: string;
	city: string;
	phone: string;
	email?: string | null;
	note?: string | null;
	title?: string | null;
	countryCode: string;
	addressee?: string | null;
}

export interface ImageDetail {
	id?: string | null;
	objectType?: string;
	objectId?: string | null;
	isMain?: boolean;
	domainUrls?: Record<string, string>;
}

export enum carouselType {
	ECONOMIC = 'ECONOMIC',
	STANDARD = 'STANDARD',
	PREMIUM = 'PREMIUM',
}
