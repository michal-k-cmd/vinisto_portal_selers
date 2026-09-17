'server only';
import { QueryClient } from '@tanstack/react-query';
import { unescape } from 'lodash-es';
import { BundleService } from 'vinisto_api_client';
import { fetchCategoryByUrl } from 'pages-spa/Category/helpers';
import { unstable_cache as cache } from 'next/cache';
import { LinkWidget as LinkWidgetType } from 'vinisto_api_client/src/domain/link-widget';
import linkWidgetService, {
	linkWidgetAdapter,
} from 'vinisto_api_client/src/link-widget-service';

import {
	VinistoCommonDllModelsApiMultiLangValues,
	VinistoProductDllModelsApiCategoryCategory,
	VinistoProductDllModelsApiMultiLangValue,
	VinistoProductDllModelsApiVirtualCategoryVirtualCategory,
} from '@/api-types/product-api';
import { Allowed_Sections } from '@/domain/link-widget/enums';
import { LinksListParams } from '@/api-types/linkwidgets-api';

const DEFAULT_LINK_WIDGET_LIMIT = 100; // Or adjust as needed

// NOTE this is the same implementation as the one used in adapters
// But as it is a protected property on an abstract class, it cannot be used as a standalone function
export const convertMultiLangValues = (
	multiLangValues: VinistoCommonDllModelsApiMultiLangValues[] | null | undefined
) => {
	if (!Array.isArray(multiLangValues)) {
		return [];
	}

	return multiLangValues?.map((item) => ({
		language: item.language || '',
		values:
			item.values?.filter((e) => e !== '').map((e) => unescape(e || '')) ?? [],
	}));
};

const hasMultiLangValue = (
	values: VinistoProductDllModelsApiMultiLangValue[] | null | undefined
) =>
	Array.isArray(values) && values.some((item) => Boolean(item.value?.trim()));

const firstNonEmptyMultiLangValue = (
	...values: (VinistoProductDllModelsApiMultiLangValue[] | null | undefined)[]
) => values.find(hasMultiLangValue) ?? [];

interface CategoryData {
	category: VinistoProductDllModelsApiCategoryCategory | null;
	virtualCategory: VinistoProductDllModelsApiVirtualCategoryVirtualCategory | null;
}

export const getCategoryData = async (
	categoryUrl: string
): Promise<CategoryData> => {
	const categoryBaseUrl = categoryUrl.split('/')[0];
	const fullUrl = encodeURIComponent(`/kategorie/${categoryUrl}`);
	const queryClient = new QueryClient();

	const [categoryRes, virtualRes] = await Promise.all([
		queryClient
			.fetchQuery({
				queryKey: ['category', { categoryBaseUrl }],
				queryFn: () => fetchCategoryByUrl({ categoryUrl: categoryBaseUrl }),
			})
			.catch(() => {
				return { category: null };
			}),
		queryClient
			.fetchQuery({
				queryKey: ['virtualCategory', { fullUrl }],
				queryFn: () =>
					BundleService.getVirtualCategoryByUrl({
						virtualCategoryUrl: fullUrl,
					}),
			})
			.catch(() => ({ virtualCategory: null })),
	]);

	const category = categoryRes.category || null;
	const virtualCategory = virtualRes?.virtualCategory || null;

	return { category, virtualCategory };
};

interface CategoryWithMetaData {
	category: VinistoProductDllModelsApiCategoryCategory | null;
	categoryWithVirtualData: VinistoProductDllModelsApiCategoryCategory | null;
	categoryWithVirtualMetaData: VinistoProductDllModelsApiCategoryCategory | null;
}

export const getCategoryWithVirtualCategory = async (
	categoryUrl: string
): Promise<CategoryWithMetaData> => {
	const { category, virtualCategory } = await getCategoryData(categoryUrl);

	if (!category) {
		return {
			category: null,
			categoryWithVirtualData: null,
			categoryWithVirtualMetaData: null,
		};
	}

	if (!virtualCategory) {
		return {
			category: category,
			categoryWithVirtualData: null,
			categoryWithVirtualMetaData: {
				...category,
				description: firstNonEmptyMultiLangValue(
					category.metaDescription,
					category.description
				),
				name: firstNonEmptyMultiLangValue(category.metaTitle, category.name),
			},
		};
	}

	const mergedCategory = {
		...category,
		description: virtualCategory.contentHtml || category.description,
		name: virtualCategory.titleH1 || category.name,
	};

	const mergedCategoryMetaData = {
		...category,
		description: firstNonEmptyMultiLangValue(
			virtualCategory.seoDescription,
			category.metaDescription,
			category.description
		),
		name: firstNonEmptyMultiLangValue(
			virtualCategory.seoTitle,
			category.metaTitle,
			category.name
		),
	};

	return {
		category: category,
		categoryWithVirtualData: mergedCategory,
		categoryWithVirtualMetaData: mergedCategoryMetaData,
	};
};

export const getCategoryLinkWidgets = cache(
	async ({
		pathname,
		availableOnPlatform,
		limit = DEFAULT_LINK_WIDGET_LIMIT,
	}: {
		pathname?: string;
		availableOnPlatform: number;
		limit?: number;
	}): Promise<LinkWidgetType[]> => {
		const getRelevantUrlSlice = (url: string) =>
			url.split('/').slice(0, 1).join('/');

		const req: LinksListParams = {
			Sort: 'order',
			PathId: `/kategorie/${getRelevantUrlSlice(pathname ?? '/')}|${
				Allowed_Sections.CATEGORY
			}`,
			Limit: limit,
			AvailableOnPlatform: availableOnPlatform,
		};

		try {
			const response = await linkWidgetService.linksList(req);
			const adaptedLinks = response.data.map(linkWidgetAdapter.fromApi);

			return adaptedLinks.slice(0, limit);
		} catch (error) {
			return [];
		}
	},
	['category-link-widgets'],
	{ revalidate: 3600 }
);
