import { useCallback, useContext, useMemo } from 'react';
import { isNumber, last, range } from 'lodash-es';
import { useQuery } from '@tanstack/react-query';
import {
	BundleSorting,
	ListingType,
	TagBundlesWithFiltersProviderProps,
} from 'pages-spa/Category/Components/CategoryBundlesWithFilters/interfaces';
import removeDiacritics from 'Helpers/removeDiacritics';
import { adaptInitialListingBundlePage } from 'lib/data/listing-bundles';
import useCategoryView from 'Hooks/useCategoryView';
import useNextURLParams from 'Hooks/useNextURLParams';
import { BundlesWithFiltersContext } from 'pages-spa/Category/Components/CategoryBundlesWithFilters/context';
import { LocalizationContext } from 'Services/LocalizationService';
import {
	priceLevelEnumToIntegerMap,
	useBundleQueries,
} from 'Hooks/Queries/useBundleQueries';
import SpecificationService from 'vinisto_api_client/src/product-service/specification';
import TagService from 'vinisto_api_client/src/product-service/tag';
import {
	VinistoHelperDllEnumsCurrency,
	VinistoHelperDllEnumsTagSortableColumns,
} from 'vinisto_api_client/src/api-types/product-api';
import {
	FILTER_CODE,
	PRICE_SPECIFICATION_ID,
	SORTING,
	SORTING_DEFAULT,
	URL_PARAM_LIMIT,
	URL_PARAM_LIMIT_DEFAULT_VALUE,
	URL_PARAM_PAGE,
} from 'pages-spa/Category/Components/CategoryBundlesWithFilters/constants';
import useGetPaginatedBundleQueries from 'Hooks/Queries/useGetPaginatedBundleQueries';
import {
	calculateBundlesToLoadMore,
	generateRequestFilters,
	getPageFromParam,
	mergeSpecificationsWithBundleFilters,
} from 'pages-spa/Category/Components/CategoryBundlesWithFilters/helpers';
import useResetPaginaton from 'Hooks/useResetPagination';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { useIsB2b } from 'Services/PlatformService';

import { VinistoHelperDllEnumsPriceLevel } from '@/api-types/user-api';
import { B2B_NUMERIC_CODE, B2C_NUMERIC_CODE } from '@/shared';

const { getTagSpecifications } = SpecificationService;
const { getAll } = TagService;

const BundlesWithFiltersProvider = (
	props: TagBundlesWithFiltersProviderProps
) => {
	const isB2b = useIsB2b();
	const platform = isB2b ? B2B_NUMERIC_CODE : B2C_NUMERIC_CODE;

	const tag = props.tag;

	const tagId = tag?.id ?? '';
	const isTagDataLoading = false;

	const localizationContext = useContext(LocalizationContext);
	const {
		countryOfSale,
		activeCurrency: { currency },
		convertEURtoCZK,
	} = localizationContext;
	const t = localizationContext.useFormatMessage();

	const authenticationContext = useContext(AuthenticationContext);
	const userPriceLevel =
		authenticationContext.vinistoUser.priceLevel ??
		VinistoHelperDllEnumsPriceLevel.Level1;

	const specificationsQuery = useQuery(
		['category-specifications', { tagId, currency, countryOfSale }],
		() => getTagSpecifications(tagId, { currency, countryOfSale }),
		{
			enabled: !!tagId,
		}
	);

	const tagQueryParams = {
		IsShownInFilters: true,
		IsCache: true,
		SortingColumn: VinistoHelperDllEnumsTagSortableColumns.ORDER_IN_FILTER,
		limit: 100,
		currency,
		CountryOfSale: countryOfSale,
	};
	const { data: tags } = useQuery(['tags', tagQueryParams], () =>
		getAll(tagQueryParams)
	);

	const [query, setQuery] = useNextURLParams();

	const activeSpecificationFilters = useMemo(
		() =>
			generateRequestFilters(
				specificationsQuery?.data?.specifications ?? [],
				query,
				localizationContext.activeLanguageKey,
				userPriceLevel
			),
		[
			specificationsQuery?.data?.specifications,
			query,
			localizationContext,
			userPriceLevel,
		]
	);

	const urlParamTags = `${t({ id: 'tags.urlParam' })}`;

	const activeTagFilters = useMemo(() => {
		if (!tags) return [];

		const tagFiltersAsArray: string[] = Array.isArray(query[urlParamTags])
			? query[urlParamTags]
			: [query[urlParamTags]];

		const tagFilters = tagFiltersAsArray
			.map((slug: string) => {
				return tags.find((tag) => removeDiacritics(tag.name ?? '') === slug);
			})
			.filter(
				(tag): tag is Exclude<typeof tag, undefined> => tag !== undefined
			);
		return tagFilters;
	}, [tags, query, urlParamTags]);

	const handleOnRemoveFilter = useCallback(
		(specificationName: string) => () => {
			setQuery({ [specificationName]: undefined });
		},
		[setQuery]
	);

	const sortParamUrlName = `${t({ id: 'category.sorting.urlParam' })}`;
	const sortParam = useMemo(() => {
		const urlParam = query[sortParamUrlName];
		if (urlParam === undefined) {
			return SORTING_DEFAULT;
		}
		return (
			SORTING.filter(
				(sorting) =>
					removeDiacritics(`${t({ id: sorting.title })}`) === urlParam
			)[0] ?? SORTING_DEFAULT
		);
	}, [query, sortParamUrlName, t]);

	const setSortParam = useCallback(
		(sort: BundleSorting) => {
			const sortUrlParam =
				sort === SORTING_DEFAULT
					? undefined
					: removeDiacritics(`${t({ id: sort.title })}`);
			setQuery({ [sortParamUrlName]: sortUrlParam });
		},
		[setQuery, sortParamUrlName, t]
	);

	// Category bundles view mode
	const [view, handleOnViewChange] = useCategoryView();

	const pageParam = useMemo(() => query[URL_PARAM_PAGE] ?? [1], [query]);
	const setPageParam = useCallback(
		(pageArray: [number] | [number, number] | undefined) => {
			setQuery({ [URL_PARAM_PAGE]: pageArray });
		},
		[setQuery]
	);

	useResetPaginaton(() => {
		setPageParam(undefined);
	});

	const page = useMemo(() => getPageFromParam(pageParam), [pageParam]);
	const currentPage = useMemo(() => last(page) as number, [page]);

	const limitParam = useMemo(
		() => query[URL_PARAM_LIMIT] ?? URL_PARAM_LIMIT_DEFAULT_VALUE,
		[query]
	);
	const limit = useMemo(
		() => (!isNumber(limitParam) ? URL_PARAM_LIMIT_DEFAULT_VALUE : limitParam),
		[limitParam]
	);
	const isInStockParam = `${t({ id: 'isInStock.urlParam' })}`;
	const isInStockParamRef = query[isInStockParam];

	const isDiscountedParam = `${t({ id: 'isDiscounted.urlParam' })}`;
	const isDiscountedParamRef = query[isDiscountedParam];

	const bundlesRevisitedParams = useMemo(
		() => ({
			platform,
			priceLevel: userPriceLevel,
			categoryId: null,
			tagId,
			sortingColumn: sortParam?.sortingColumn ?? '',
			isSortingDescending: sortParam?.isSortingDescending ?? false,
			countryOfSale,
			currency,
			filters: [
				...activeSpecificationFilters.map((filter) => {
					if (
						filter.specificationDefinitionId === PRICE_SPECIFICATION_ID &&
						localizationContext?.activeCurrency.currency !==
							VinistoHelperDllEnumsCurrency.CZK
					) {
						return {
							...filter,
							max: convertEURtoCZK(filter.max),
							min: convertEURtoCZK(filter.min),
							priceLevel: priceLevelEnumToIntegerMap[userPriceLevel],
						};
					}
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					const { specificationName, unit, imperialUnit, ...rest } = filter;
					return rest;
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
								isInStock: true,
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
			onError: () => {
				setPageParam([1]);
			},
		}),
		[
			platform,
			activeSpecificationFilters,
			activeTagFilters,
			convertEURtoCZK,
			countryOfSale,
			currency,
			isDiscountedParamRef,
			isInStockParamRef,
			limit,
			localizationContext?.activeCurrency.currency,
			setPageParam,
			sortParam?.isSortingDescending,
			sortParam?.sortingColumn,
			tagId,
			userPriceLevel,
		]
	);

	const pageRange = useMemo(() => {
		if (page.length === 1) return page;
		const pageRange = range(page[0], page[1] + 1);
		return pageRange;
	}, [page]);

	const initialBundlePage = useMemo(
		() =>
			props.initialBundlePage?.currency === currency
				? adaptInitialListingBundlePage(
						props.initialBundlePage,
						isB2b,
						userPriceLevel
				  )
				: undefined,
		[props.initialBundlePage, currency, isB2b, userPriceLevel]
	);

	const canUseInitialBundlePage =
		Boolean(initialBundlePage) &&
		Object.keys(query).length === 0 &&
		page.length === 1 &&
		page[0] === 1 &&
		limit === URL_PARAM_LIMIT_DEFAULT_VALUE &&
		sortParam === SORTING_DEFAULT &&
		activeSpecificationFilters.length === 0 &&
		activeTagFilters.length === 0 &&
		!isInStockParamRef &&
		!isDiscountedParamRef;

	const bundleQueries = useGetPaginatedBundleQueries(
		bundlesRevisitedParams,
		pageRange,
		canUseInitialBundlePage ? initialBundlePage : undefined
	);

	const { filtersQuery } = useBundleQueries({
		categoryId: null,
		tagId,
		sortParam,
		page,
		limit,
		activeSpecificationFilters,
		activeTagFilters,
		isInStockParamRef,
		isDiscountedParamRef,
		listingType: ListingType.Tag,
	});

	const bundlesCount = bundleQueries[0].data?.count ?? 0;

	const bundlesToLoadMoreCount = useMemo(
		() => calculateBundlesToLoadMore(bundlesCount, currentPage, limit),
		[bundlesCount, currentPage, limit]
	);

	const isInStockActive = Boolean(isInStockParamRef);
	const isDiscountedActive = Boolean(isDiscountedParamRef);

	const totalActiveFiltersCount =
		activeTagFilters.length +
		activeSpecificationFilters.length +
		(isInStockActive ? 1 : 0) +
		(isDiscountedActive ? 1 : 0);

	// This is zipping specifications data (get-category-specification, get-tag-specification) with get-avaliable-filters data
	// The resultuing object is used to render the filters. Its shape is somewhat weird and should be probably refactored
	const specificationsWithBundleFilters = useMemo(() => {
		return mergeSpecificationsWithBundleFilters(
			specificationsQuery.data?.specifications ?? [],
			filtersQuery.data?.specificationFilters ?? []
		);
	}, [
		filtersQuery.data?.specificationFilters,
		specificationsQuery.data?.specifications,
	]);

	return (
		<BundlesWithFiltersContext.Provider
			value={{
				activeSpecificationFilters,
				activeTagFilters,
				bundlesCount,
				bundlesToLoadMoreCount,
				currentPage,
				bundleQueries,
				isDataLoading: isTagDataLoading,
				handleOnRemoveFilter,
				handleOnViewChange,
				limit,
				page,
				query,
				setPageParam,
				isInStockParam,
				isInStockParamRef,
				isDiscountedParam,
				isInStockActive,
				isDiscountedActive,
				totalActiveFiltersCount,
				setQuery,
				specificationsQuery,
				specificationsWithBundleFilters,
				view,
				sorting: sortParam,
				setSorting: setSortParam,
			}}
		>
			{props.children}
		</BundlesWithFiltersContext.Provider>
	);
};

export default BundlesWithFiltersProvider;
