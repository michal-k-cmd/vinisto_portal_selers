import { useContext, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { omit } from 'lodash-es';
import {
	VinistoHelperDllEnumsCurrency,
	VinistoHelperDllEnumsPriceLevel,
	VinistoProductDllModelsApiBundleBundlesGetParameters,
} from 'vinisto_api_client/src/api-types/product-api';
import { BundleService } from 'vinisto_api_client';
import {
	BundleSorting,
	ListingType,
} from 'pages-spa/Category/Components/CategoryBundlesWithFilters/interfaces';
import {
	FILTER_CODE,
	PRICE_SPECIFICATION_ID,
} from 'pages-spa/Category/Components/CategoryBundlesWithFilters/constants';
import { LocalizationContext } from 'Services/LocalizationService';
import ProductTag from 'vinisto_api_client/src/domain/tag';
import { AuthenticationContext } from 'Services/AuthenticationService/context';

interface UseBundleQueriesParams {
	categoryId: string | null;
	tagId: string | null;
	sortParam: BundleSorting | null;
	page: number[];
	limit: number;
	activeSpecificationFilters: Record<string, any>[];
	activeTagFilters: ProductTag[];
	isInStockParamRef: { filterType: number; isInStock: boolean }[];
	isDiscountedParamRef: { filterType: number; isDiscounted: boolean }[];
	isEnabled?: boolean;
	isCache?: boolean;
	isInImperialUnits?: boolean;
	isDeleted?: boolean;
	isGift?: boolean;
	isTemporaryUnavailable?: boolean;
	listingType: ListingType;
}

export const priceLevelEnumToIntegerMap: Record<
	VinistoHelperDllEnumsPriceLevel,
	number
> = {
	[VinistoHelperDllEnumsPriceLevel.Level1]: 0,
	[VinistoHelperDllEnumsPriceLevel.Level2]: 1,
	[VinistoHelperDllEnumsPriceLevel.Level3]: 2,
	[VinistoHelperDllEnumsPriceLevel.Level4]: 3,
	[VinistoHelperDllEnumsPriceLevel.Level5]: 4,
	[VinistoHelperDllEnumsPriceLevel.Level6]: 5,
	[VinistoHelperDllEnumsPriceLevel.Level7]: 6,
	[VinistoHelperDllEnumsPriceLevel.Level8]: 7,
	[VinistoHelperDllEnumsPriceLevel.Level9]: 8,
	[VinistoHelperDllEnumsPriceLevel.Level10]: 9,
	[VinistoHelperDllEnumsPriceLevel.VinistoPlus]: 10,
};

export const useBundleQueries = ({
	categoryId = null,
	tagId = null,
	sortParam,
	// page,
	limit,
	activeSpecificationFilters,
	activeTagFilters,
	isInStockParamRef,
	isDiscountedParamRef,
	isCache = true,
	isInImperialUnits = false,
	listingType,
}: UseBundleQueriesParams) => {
	const t = useContext(LocalizationContext).useFormatMessage();
	const localizationContext = useContext(LocalizationContext);
	const {
		activeCurrency: { currency },
		countryOfSale,
		convertEURtoCZK,
	} = localizationContext;
	const authenticationContext = useContext(AuthenticationContext);
	const userPriceLevel =
		authenticationContext.vinistoUser.priceLevel ??
		VinistoHelperDllEnumsPriceLevel.Level1;

	const queryParams = useMemo(() => {
		const processedParams = {
			hiddenSpecification: false,
			isDeleted: false,
			isEnabled: true,
			isGift: false,
			isTemporaryUnavailable: false,
			isSaleOver: false,
		};

		return {
			...processedParams,
			isCache,
			categoryId,
			tagId,
			sortingColumn: sortParam?.sortingColumn,
			isSortingDescending: sortParam?.isSortingDescending ?? false,
			// TODO check if page is actually needed here (it is not a part of the params interface)
			// page,
			currency,
			countryOfSale,
			platform: 0,
			filters: [
				...activeSpecificationFilters.map((filter) => {
					if (
						filter.specificationDefinitionId === PRICE_SPECIFICATION_ID &&
						currency !== VinistoHelperDllEnumsCurrency.CZK
					) {
						return {
							...filter,
							max: convertEURtoCZK(filter.max),
							min: convertEURtoCZK(filter.min),
							priceLevel: priceLevelEnumToIntegerMap[userPriceLevel],
						};
					}
					return omit(filter, ['specificationName', 'unit', 'imperialUnit']);
				}),
				...(activeTagFilters.length
					? [
							{
								filterType: FILTER_CODE.TAG,
								countryOfSale: countryOfSale,
								tags: activeTagFilters.map((filter) => filter.id),
							},
					  ]
					: []),
				...(isInStockParamRef
					? [
							{
								filterType: FILTER_CODE.STOCK,
								isInStock: isInStockParamRef === t({ id: 'yes' }),
							},
					  ]
					: []),
				...(isDiscountedParamRef
					? [
							{
								filterType: FILTER_CODE.DISCOUNT,
								countryOfSale,
								isDiscounted: true,
							},
					  ]
					: []),
			],
			limit,
			isInImperialUnits,
		} satisfies VinistoProductDllModelsApiBundleBundlesGetParameters;
	}, [
		isCache,
		categoryId,
		tagId,
		sortParam?.sortingColumn,
		sortParam?.isSortingDescending,
		// page,
		currency,
		countryOfSale,
		activeSpecificationFilters,
		activeTagFilters,
		isInStockParamRef,
		t,
		isDiscountedParamRef,
		limit,
		isInImperialUnits,
		convertEURtoCZK,
		userPriceLevel,
	]);

	const filtersQuery = useQuery(
		['available-filters', { queryParams }, listingType],
		() => {
			return BundleService.getAvailableFilters(queryParams);
		},
		{
			keepPreviousData: true,
			enabled:
				(listingType === ListingType.Category && !!categoryId) ||
				(listingType === ListingType.Tag && !!tagId) ||
				listingType === ListingType.All,
		}
	);

	return {
		filtersQuery,
		// queryParams,
	};
};
