import {
	entriesIn,
	filter,
	find,
	first,
	flatten,
	forEach,
	get,
	isArray,
	isNumber,
	last,
	map,
	omit,
} from 'lodash-es';
import removeDiacritics from 'Helpers/removeDiacritics';
import { UseQueryResult } from '@tanstack/react-query';
import { Specification } from 'vinisto_api_client/src/domain/specification/schema';
import { priceLevelEnumToIntegerMap } from 'Hooks/Queries/useBundleQueries';

import { AvailableTagFilter } from './interfaces';
import {
	FILTER_TYPE,
	SPECIFICATION_TYPE_CHECK_BOX,
	SPECIFICATION_TYPE_COMBO_BOX,
	SPECIFICATION_TYPE_DECIMAL_NUMBER,
	SPECIFICATION_TYPE_DECIMAL_NUMBER_IMPERIAL,
	SPECIFICATION_TYPE_MULTI_COMBO_BOX,
	SPECIFICATION_TYPE_NUMBER,
	SPECIFICATION_TYPE_NUMBER_IMPERIAL,
	SPECIFICATION_TYPE_PRICE,
	SPECIFICATION_TYPE_TEXT,
	// URL_PARAM_LIMIT_DEFAULT_VALUE,
} from './constants';
import { MappedVinistoProductDllModelsApiBundleBundlesReturn } from './context';

import { VinistoHelperDllEnumsPriceLevel } from '@/api-types/product-api';

export const isTextSpecification = (specificationType: string) =>
	specificationType === SPECIFICATION_TYPE_TEXT;
export const isMultiComboBoxSpecification = (specificationType: string) =>
	specificationType === SPECIFICATION_TYPE_MULTI_COMBO_BOX;
export const isComboBoxSpecification = (specificationType: string) =>
	specificationType === SPECIFICATION_TYPE_COMBO_BOX;
export const isCheckboxSpecification = (specificationType: string) =>
	specificationType === SPECIFICATION_TYPE_CHECK_BOX;
export const isNumberSpecification = (specificationType: string) =>
	specificationType === SPECIFICATION_TYPE_NUMBER;
export const isNumberImperialSpecification = (specificationType: string) =>
	specificationType === SPECIFICATION_TYPE_NUMBER_IMPERIAL;
export const isDecimalNumberSpecification = (specificationType: string) =>
	specificationType === SPECIFICATION_TYPE_DECIMAL_NUMBER;
export const isDecimalNumberImperialSpecification = (
	specificationType: string
) => specificationType === SPECIFICATION_TYPE_DECIMAL_NUMBER_IMPERIAL;
export const isPriceSpecification = (specificationType: string) =>
	specificationType === SPECIFICATION_TYPE_PRICE;

export const mergeSpecificationsWithBundleFilters = (
	specifications: Specification[],
	filters: Record<string, any>[],
	exclude: {
		tags?: string[];
	} = { tags: [] }
) => {
	const tagFilters =
		filters?.find((spec) => spec?.filterType === FILTER_TYPE.TAG)?.tags ?? [];
	const supplierFilters =
		filters?.find((spec) => spec?.filterType === FILTER_TYPE.SUPPLIER)
			?.suppliers ?? [];
	const isInStockFilters =
		filters?.find((spec) => spec?.filterType === FILTER_TYPE.STOCK)
			?.isInStock ?? [];
	const isDiscountedFilters =
		filters?.find((spec) => spec?.filterType === FILTER_TYPE.DISCOUNT)
			?.isDicounted ?? [];

	const specificationFilters: Omit<Specification, 'specificationId'>[] = [];
	specifications.forEach((specification) => {
		// @ts-expect-error broken zod types?
		if (isTextSpecification(specification.type)) return;

		const bundleFilter = find(filters, {
			specificationDefinitionId: specification?.id ?? null,
		});

		const updatedSpecification = bundleFilter
			? { ...specification, values: bundleFilter }
			: specification;

		specificationFilters.push(
			omit(updatedSpecification, 'values.specificationDefinitionId')
		);
	});
	const result = {
		specificationFilters,
		tagFilters: tagFilters.filter(
			(tag: AvailableTagFilter) => !exclude.tags?.includes(tag.id)
		),
		supplierFilters,
		isInStockFilters,
		isDiscountedFilters,
	};

	return result;
};

export const getPageFromParam = (
	pageParam: any[]
): [number] | [number, number] => {
	if (!Array.isArray(pageParam) && typeof pageParam === 'number')
		return [pageParam];
	if (
		!pageParam ||
		pageParam.length === 0 ||
		pageParam.some((pageNum) => isNaN(pageNum)) ||
		(pageParam[0] ?? 1) > (pageParam[pageParam.length - 1] ?? 2)
	)
		return [1];
	return pageParam as [number] | [number, number];
};

export const calculateBundlesToLoadMore = (
	bundlesCount: number,
	currentPage: number,
	limit = 10
) => {
	const bundlesLeft = bundlesCount - currentPage * limit;
	if (bundlesLeft < 1) return 0;
	if (bundlesLeft > limit) return limit;
	return bundlesLeft;
};

export const generateBundlesToShow = (
	categoryId: string,
	bundlesData: UseQueryResult<
		MappedVinistoProductDllModelsApiBundleBundlesReturn,
		unknown
	>[],
	bundlesCount: number,
	currentPage: number,
	limit = 10,
	isLoading = false
) => {
	if (!categoryId) {
		return map(Array(limit), () => ({ isLoading: true }));
	}
	const bundles = filter(
		flatten(map(bundlesData, (page) => get(page, 'data.bundles', [])))
	);
	if (isLoading) {
		let bundlesLeft =
			bundlesCount - (currentPage === 1 ? 1 : currentPage - 1) * limit;
		if (bundlesLeft < 1) bundlesLeft = limit;
		if (bundlesLeft > limit) bundlesLeft = limit;
		return [
			...bundles,
			...map(Array(bundlesLeft), () => ({ isLoading: true })),
		];
	}
	return bundles;
};

const parseRangeValues = (
	rawValue: string | string[] | number | number[]
): { min: number; max: number } | null => {
	if (!rawValue) return null;

	let parsedValues = isArray(rawValue) ? rawValue : [rawValue];

	if (typeof rawValue === 'string' && rawValue.includes('-')) {
		parsedValues = rawValue.split('-').map((val) => Number(val));
	}

	const min = Number(first(parsedValues));
	const max = Number(last(parsedValues));

	if (isNumber(min) && !isNaN(min) && isNumber(max) && !isNaN(max)) {
		return { min, max };
	}

	return null;
};

export const generateRequestFilters = (
	specificationsWithBundleFilters: Specification[] | undefined,
	query: Record<any, any>,
	language: string,
	userPriceLevel: VinistoHelperDllEnumsPriceLevel
) => {
	const filters: Record<any, any>[] = [];
	forEach(specificationsWithBundleFilters, (specification) => {
		const specificationName = removeDiacritics(
			get(find(get(specification, 'name', []), { language }), 'value', '')
		);
		if (!specificationName) return;
		if (
			(isComboBoxSpecification(get(specification, 'specificationType', '')) ||
				isMultiComboBoxSpecification(
					get(specification, 'specificationType', '')
				)) &&
			get(query, specificationName)
		) {
			const selectedValues = map(
				isArray(get(query, specificationName))
					? get(query, specificationName)
					: [get(query, specificationName, '')?.toLowerCase()],
				(selectedValue) => {
					const allowedValue = filter(
						entriesIn(get(specification, 'allowedValues')),
						([value]: [string, Record<string, any>[]]) => {
							return (
								removeDiacritics(value).toLowerCase() ==
								selectedValue?.toLowerCase().replace(/\s+/g, '-')
							);
						}
					);
					const keys = map(allowedValue, (value) =>
						get(value, '[0]', '').toLowerCase()
					);
					return keys;
				}
			);
			filters.push({
				specificationName: get(specification, 'name', []),
				specificationDefinitionId: get(specification, 'id', ''),
				selectedValues: flatten(selectedValues),
				order: specification?.order ?? 0,
				priceLevel: priceLevelEnumToIntegerMap[userPriceLevel],
			});
		} else if (
			isCheckboxSpecification(get(specification, 'specificationType', '')) &&
			get(query, specificationName) !== undefined
		) {
			filters.push({
				specificationName: get(specification, 'name', []),
				specificationDefinitionId: get(specification, 'id', ''),
				isChecked: get(query, specificationName) ? true : false,
				order: specification?.order ?? 0,
				priceLevel: priceLevelEnumToIntegerMap[userPriceLevel],
			});
		} else if (
			get(query, specificationName) &&
			(isNumberSpecification(get(specification, 'specificationType', '')) ||
				isNumberImperialSpecification(
					get(specification, 'specificationType', '')
				) ||
				isDecimalNumberSpecification(
					get(specification, 'specificationType', '')
				) ||
				isDecimalNumberImperialSpecification(
					get(specification, 'specificationType', '')
				))
		) {
			const range = parseRangeValues(get(query, specificationName));
			if (range) {
				filters.push({
					specificationName: get(specification, 'name', []),
					specificationDefinitionId: get(specification, 'id', ''),
					unit: get(specification, 'unit', []),
					imperialUnit: get(specification, 'imperialUnit', []),
					min: range.min,
					max: range.max,
					isImperial: false,
					order: specification?.order ?? 0,
					priceLevel: priceLevelEnumToIntegerMap[userPriceLevel],
				});
			}
		} else if (
			isPriceSpecification(get(specification, 'specificationType', ''))
		) {
			const range = parseRangeValues(get(query, specificationName));
			if (range) {
				filters.push({
					specificationName: get(specification, 'name', []),
					specificationDefinitionId: get(specification, 'id', ''),
					min: range.min,
					max: range.max,
					currency: 1,
					order: specification?.order ?? 0,
					priceLevel: priceLevelEnumToIntegerMap[userPriceLevel],
				});
			}
		}
	});
	return filters;
};
