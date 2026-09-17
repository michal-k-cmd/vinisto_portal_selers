import api from 'vinisto_api_client/src/api';
import { bundleAdapter } from 'vinisto_api_client/src/index';
import {
	B2B_NUMERIC_CODE,
	B2C_NUMERIC_CODE,
	DEFAULT_BUNDLE_API_PARAMS,
} from 'vinisto_api_client/src/shared';
import type { Bundle } from 'vinisto_api_client/src/domain/bundle';
import {
	IMAGE_SIZE_THUMB_208x240,
	IMAGE_SIZE_THUMB_368x490,
	IMAGE_SIZE_THUMB_64x80,
} from 'vinisto_api_client/src/image-service/constants';
import {
	VinistoHelperDllEnumsBundleSortableColumns,
	VinistoHelperDllEnumsCountryCode,
	VinistoHelperDllEnumsCurrency,
	VinistoHelperDllEnumsPriceLevel,
	VinistoProductDllModelsApiBundleBundle,
	VinistoProductDllModelsApiBundleBundlesReturn,
	VinistoProductDllModelsApiMultiLangValue,
} from 'vinisto_api_client/src/api-types/product-api';

import { ProductApi } from '@/api-types/product-api';

const DEFAULT_LISTING_LIMIT = 30;
const LISTING_IMAGE_SIZES = [
	IMAGE_SIZE_THUMB_64x80,
	IMAGE_SIZE_THUMB_208x240,
	IMAGE_SIZE_THUMB_368x490,
] as const;

type ListingBundleApi = VinistoProductDllModelsApiBundleBundle;

interface ListingBundleImageDto {
	id?: string | null;
	objectId: string;
	objectType: NonNullable<ListingBundleApi['images'][number]['objectType']>;
	isMain: boolean;
	domainUrls: Record<string, string>;
}

interface ListingBundleTagDto {
	id: string;
	name: string;
	color: string;
}

interface ListingBundleSupplierDto {
	id: string;
	nameWeb: string;
	countryCode?: NonNullable<ListingBundleApi['supplier']>['countryCode'];
}

interface ListingBundleSpecificationAllowedValueDto {
	name: VinistoProductDllModelsApiMultiLangValue[];
}

interface ListingBundleSpecificationDefinitionDto {
	id: string;
	name: VinistoProductDllModelsApiMultiLangValue[];
	specificationType: string;
	order?: number;
	isDetail?: true;
	unit?: VinistoProductDllModelsApiMultiLangValue[];
	allowedValues?: Record<string, ListingBundleSpecificationAllowedValueDto>;
}

interface ListingBundleSpecificationDto {
	definition: ListingBundleSpecificationDefinitionDto;
	value: unknown;
}

type ListingBundleFlagsDto = Pick<
	ListingBundleApi,
	| 'isSet'
	| 'isClearanceSale'
	| 'isDeliveryFree'
	| 'isDeleted'
	| 'isEnabled'
	| 'isForLogged'
	| 'isGift'
	| 'temporaryUnavailable'
	| 'canSendToWms'
	| 'isSaleOver'
	| 'isApproved'
> & {
	isIntangible: boolean;
};

export interface ListingBundleCardDto {
	id: string;
	name: VinistoProductDllModelsApiMultiLangValue[];
	url: VinistoProductDllModelsApiMultiLangValue[];
	prices: ListingBundleApi['prices'];
	priceDiscounts: ListingBundleApi['priceDiscounts'];
	images: ListingBundleImageDto[];
	tags: ListingBundleTagDto[];
	categoryIds: string[];
	supplier: ListingBundleSupplierDto | null;
	specificationDetails: ListingBundleSpecificationDto[];
	orderLimitation: ListingBundleApi['orderLimitation'];
	flags: ListingBundleFlagsDto;
}

export interface InitialListingBundlePage {
	bundles: ListingBundleCardDto[];
	count?: number;
	currency: VinistoHelperDllEnumsCurrency;
}

export interface FetchListingBundlePageParams {
	categoryId: string | null;
	tagId?: string | null;
	sortingColumn: VinistoHelperDllEnumsBundleSortableColumns | undefined;
	isSortingDescending?: boolean;
	page: number;
	countryOfSale: VinistoHelperDllEnumsCountryCode;
	currency: VinistoHelperDllEnumsCurrency;
	filters?: Record<string, unknown>[];
	limit?: number;
	platform: number;
	priceLevel: VinistoHelperDllEnumsPriceLevel;
}

export type ListingBundlePage = Omit<
	VinistoProductDllModelsApiBundleBundlesReturn,
	'bundles'
> & {
	bundles: Bundle[];
};

export type ListingBundleApiPage =
	VinistoProductDllModelsApiBundleBundlesReturn;

const isRecord = (value: unknown): value is Record<string, unknown> =>
	typeof value === 'object' && value !== null && !Array.isArray(value);

const getMultiLangValues = (
	value: unknown
): VinistoProductDllModelsApiMultiLangValue[] =>
	Array.isArray(value)
		? (value as VinistoProductDllModelsApiMultiLangValue[])
		: [];

const getSelectedSpecificationValues = (value: unknown): string[] => {
	if (!isRecord(value)) return [];

	const selectedValues = Array.isArray(value.selectedValuesName)
		? value.selectedValuesName.filter(
				(selectedValue): selectedValue is string =>
					typeof selectedValue === 'string'
		  )
		: [];

	if (typeof value.selectedValueName === 'string') {
		selectedValues.push(value.selectedValueName);
	}

	return [...new Set(selectedValues)];
};

const compactSpecificationValue = (value: unknown): unknown => {
	if (!isRecord(value)) return value;

	return Object.fromEntries(
		[
			'specificationType',
			'selectedValueName',
			'selectedValuesName',
			'value',
		].flatMap((key) => (key in value ? [[key, value[key]]] : []))
	);
};

const compactSpecification = (
	specification: ListingBundleApi['specificationDetails'][number]
): ListingBundleSpecificationDto => {
	const definition = isRecord(specification.definition)
		? specification.definition
		: {};
	const allowedValues = isRecord(definition.allowedValues)
		? definition.allowedValues
		: {};

	const selectedAllowedValues = Object.fromEntries(
		getSelectedSpecificationValues(specification.value).map((selectedValue) => {
			const allowedValue = isRecord(allowedValues[selectedValue])
				? allowedValues[selectedValue]
				: {};

			return [
				selectedValue,
				{
					name: getMultiLangValues(allowedValue.name),
				},
			];
		})
	);

	return {
		definition: {
			id: typeof definition.id === 'string' ? definition.id : '',
			name: getMultiLangValues(definition.name),
			specificationType:
				typeof definition.specificationType === 'string'
					? definition.specificationType
					: '',
			...(typeof definition.order === 'number' && definition.order !== 0
				? { order: definition.order }
				: {}),
			...(definition.isDetail === true ? { isDetail: true as const } : {}),
			...(getMultiLangValues(definition.unit).length > 0
				? { unit: getMultiLangValues(definition.unit) }
				: {}),
			...(Object.keys(selectedAllowedValues).length > 0
				? { allowedValues: selectedAllowedValues }
				: {}),
		},
		value: compactSpecificationValue(specification.value),
	};
};

const compactImage = (
	image: ListingBundleApi['images'][number]
): ListingBundleImageDto | null => {
	if (!image.objectId || image.objectType === undefined || !image.domainUrls) {
		return null;
	}

	const domainUrls = Object.fromEntries(
		LISTING_IMAGE_SIZES.flatMap((imageSize) => {
			const imageUrl = image.domainUrls?.[imageSize];
			return imageUrl ? [[imageSize, imageUrl]] : [];
		})
	);

	return {
		id: image.id,
		objectId: image.objectId,
		objectType: image.objectType,
		isMain: image.isMain ?? false,
		domainUrls,
	};
};

const compactListingBundle = (
	bundle: ListingBundleApi
): ListingBundleCardDto => ({
	id: bundle.id,
	name: bundle.name,
	url: bundle.url,
	prices: bundle.prices,
	priceDiscounts: bundle.priceDiscounts,
	images: (bundle.images ?? [])
		.filter((image) => image.isMain)
		.map(compactImage)
		.filter((image): image is ListingBundleImageDto => image !== null),
	tags: (bundle.tagsDetail ?? []).map(({ id, name, color }) => ({
		id,
		name,
		color,
	})),
	categoryIds: bundle.categories ?? [],
	supplier: bundle.supplier
		? {
				id: bundle.supplier.id,
				nameWeb: bundle.supplier.nameWeb,
				countryCode: bundle.supplier.countryCode,
		  }
		: null,
	specificationDetails: (bundle.specificationDetails ?? []).map(
		compactSpecification
	),
	orderLimitation: bundle.orderLimitation,
	flags: {
		isSet: bundle.isSet,
		isClearanceSale: bundle.isClearanceSale,
		isDeliveryFree: bundle.isDeliveryFree,
		isDeleted: bundle.isDeleted,
		isEnabled: bundle.isEnabled,
		isForLogged: bundle.isForLogged,
		isGift: bundle.isGift,
		temporaryUnavailable: bundle.temporaryUnavailable,
		isIntangible: bundle.flags?.isIntangible ?? false,
		canSendToWms: bundle.canSendToWms,
		isSaleOver: bundle.isSaleOver,
		isApproved: bundle.isApproved,
	},
});

export const compactInitialListingBundlePage = (
	bundlesData: ListingBundleApiPage,
	currency: VinistoHelperDllEnumsCurrency
): InitialListingBundlePage => ({
	count: bundlesData.count,
	bundles: bundlesData.bundles?.map(compactListingBundle) ?? [],
	currency,
});

const expandSpecification = (
	specification: ListingBundleSpecificationDto
): ListingBundleApi['specificationDetails'][number] => {
	const { definition } = specification;
	const commonDefinition = {
		id: definition.id,
		orderDetail: 0,
		order: definition.order ?? 0,
		name: definition.name,
		isHidden: false,
		isDetail: definition.isDetail ?? false,
		description: [],
		metaDescription: [],
		unit: definition.unit ?? [],
		productAttributeTabs: [],
		specificationType: definition.specificationType,
	};

	const expandedDefinition = (() => {
		if (
			definition.specificationType === 'COMBO_BOX' ||
			definition.specificationType === 'MULTI_COMBO_BOX'
		) {
			return {
				...commonDefinition,
				allowedValues: Object.fromEntries(
					Object.entries(definition.allowedValues ?? {}).map(
						([key, allowedValue]) => [
							key,
							{
								name: allowedValue.name,
								description: [],
								metaDescription: [],
								score: 0,
								images: [],
							},
						]
					)
				),
			};
		}

		if (definition.specificationType === 'PRICE') {
			return {
				...commonDefinition,
				min: 0,
				max: 0,
			};
		}

		return {
			...commonDefinition,
			availableValues: [],
			imperialUnit: [],
		};
	})();

	return {
		definition: expandedDefinition,
		value: specification.value,
	};
};

const expandListingBundle = (
	bundle: ListingBundleCardDto,
	currency: VinistoHelperDllEnumsCurrency,
	isB2b: boolean,
	customerPriceLevel: VinistoHelperDllEnumsPriceLevel
): Bundle => {
	const apiBundle: ListingBundleApi = {
		id: bundle.id,
		name: bundle.name,
		description: [],
		metaDescription: [],
		shortDescription: [],
		text: [],
		url: bundle.url,
		prices: bundle.prices,
		priceDiscounts: bundle.priceDiscounts,
		items: [],
		images: bundle.images,
		isEnabled: bundle.flags.isEnabled,
		isDeleted: bundle.flags.isDeleted,
		tags: [],
		tagsDetail: bundle.tags.map(({ id, name, color }) => ({
			id,
			name,
			color,
			slugs: [],
			bundles: [],
			specificationDetails: [],
		})),
		categories: bundle.categoryIds,
		categoriesDetail: [],
		alternativeBundles: [],
		specificationDetails: bundle.specificationDetails.map(expandSpecification),
		productsDetail: [],
		supplierId: bundle.supplier?.id,
		supplier: null,
		isDeliveryFree: bundle.flags.isDeliveryFree,
		isForLogged: bundle.flags.isForLogged,
		temporaryUnavailable: bundle.flags.temporaryUnavailable,
		isGift: bundle.flags.isGift,
		isClearanceSale: bundle.flags.isClearanceSale,
		flags: {
			isIntangible: bundle.flags.isIntangible,
		},
		orderLimitation: bundle.orderLimitation,
		isSet: bundle.flags.isSet,
		canSendToWms: bundle.flags.canSendToWms,
		isSaleOver: bundle.flags.isSaleOver,
		isApproved: bundle.flags.isApproved,
	};

	const adaptedBundle = bundleAdapter.fromApi(apiBundle, {
		currency,
		platformId: isB2b ? B2B_NUMERIC_CODE : B2C_NUMERIC_CODE,
		customerPriceLevel,
	});

	return {
		...adaptedBundle,
		supplier: bundle.supplier
			? {
					id: bundle.supplier.id,
					nameWeb: bundle.supplier.nameWeb,
					nameBilling: '',
					ico: '',
					address: {},
					users: [],
					isShipping: false,
					web: [],
					companyDescription: [],
					mainProfile: [],
					wineRegion: [],
					logo: {
						id: '',
						objectId: '',
						isMain: false,
						domainUrls: {},
					},
					baseImage: {
						id: '',
						objectId: '',
						isMain: false,
						domainUrls: {},
					},
					certificates: [],
					countryCode: bundle.supplier.countryCode,
			  }
			: null,
	};
};

export const adaptInitialListingBundlePage = (
	bundlesData: InitialListingBundlePage,
	isB2b: boolean,
	customerPriceLevel: VinistoHelperDllEnumsPriceLevel
): ListingBundlePage => ({
	count: bundlesData.count,
	bundles: bundlesData.bundles.map((bundle) =>
		expandListingBundle(bundle, bundlesData.currency, isB2b, customerPriceLevel)
	),
});

export const adaptListingBundlePage = (
	bundlesData: ListingBundleApiPage,
	currency: VinistoHelperDllEnumsCurrency,
	customerPriceLevel: VinistoHelperDllEnumsPriceLevel
): ListingBundlePage => ({
	...bundlesData,
	bundles:
		bundlesData.bundles?.map((bundle) =>
			bundleAdapter.fromApi(bundle, { currency, customerPriceLevel })
		) ?? [],
});

export const fetchListingBundlePageApi = async ({
	categoryId,
	tagId,
	page,
	limit = DEFAULT_LISTING_LIMIT,
	sortingColumn,
	isSortingDescending = false,
	countryOfSale,
	currency,
	platform,
	// This is not actually used anywhere in the call site
	// priceLevel,
	filters = [],
}: FetchListingBundlePageParams): Promise<ListingBundleApiPage> => {
	const offset = (page - 1) * limit;

	const isB2b = platform === B2B_NUMERIC_CODE;

	return api.post<
		ProductApi.BundlesGetBundlesCreate.ResponseBody,
		ProductApi.BundlesGetBundlesCreate.RequestBody
	>(
		'product-api/bundles/get-bundles',
		undefined,
		{
			...DEFAULT_BUNDLE_API_PARAMS,
			categoryId,
			sortingColumn,
			isSortingDescending,
			limit,
			offset,
			countryOfSale,
			currency,
			filters,
			tagId,
			isInImperialUnits: false,
			isCache: true,
			platform,
			priceLevels: isB2b
				? []
				: [
						VinistoHelperDllEnumsPriceLevel.Level1,
						VinistoHelperDllEnumsPriceLevel.VinistoPlus,
				  ],
		},
		{
			headers: {
				['X-Api-Key']:
					(isB2b
						? process.env.NEXT_PUBLIC_INTEGRATIONS_API_KEY_B2B
						: process.env.NEXT_PUBLIC_INTEGRATIONS_API_KEY) ?? '',
			},
		}
	);
};

export const fetchInitialListingBundlePage = async (
	params: FetchListingBundlePageParams
): Promise<InitialListingBundlePage> => {
	const bundlesData = await fetchListingBundlePageApi(params);
	return compactInitialListingBundlePage(bundlesData, params.currency);
};

export const fetchListingBundlePage = async (
	params: FetchListingBundlePageParams
): Promise<ListingBundlePage> => {
	const bundlesData = await fetchListingBundlePageApi(params);
	return adaptListingBundlePage(
		bundlesData,
		params.currency,
		params.priceLevel
	);
};
