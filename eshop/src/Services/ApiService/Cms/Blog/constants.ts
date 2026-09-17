import {
	VinistoHelperDllEnumsCmsArticleState as ArticleState,
	VinistoHelperDllEnumsCmsArticleCarouselListingType as ProductType,
	VinistoHelperDllEnumsCmsArticleSortableColumns as SortableColumns,
} from 'vinisto_api_client/src/api-types/cms-api';

export const BUNDLE_COUNT_API_ENDPOINT = `cms-api/articles/GetArticleBundlesCount`;

export enum ARTICLE_PRODUCT_TYPE {
	NONE = 'NONE',
	CAROUSEL_SPECIFICATION = 'CAROUSEL_SPECIFICATION',
	CAROUSEL_MANUAL = 'CAROUSEL_MANUAL',
	LIST_SPECIFICATION = 'LIST_SPECIFICATION',
	LIST_MANUAL = 'LIST_MANUAL',
}

export const ARTICLE_PRODUCT_TYPE_VALUES_MAP: {
	[key in ARTICLE_PRODUCT_TYPE]: ProductType;
} = {
	[ARTICLE_PRODUCT_TYPE.NONE]: ProductType.NONE,
	[ARTICLE_PRODUCT_TYPE.CAROUSEL_MANUAL]: ProductType.CAROUSEL_BUNDLES,
	[ARTICLE_PRODUCT_TYPE.CAROUSEL_SPECIFICATION]:
		ProductType.CAROUSEL_SPECIFICATIONS,
	[ARTICLE_PRODUCT_TYPE.LIST_MANUAL]: ProductType.LISTING_BUNDLES,
	[ARTICLE_PRODUCT_TYPE.LIST_SPECIFICATION]: ProductType.LISTING_SPECIFICATIONS,
};

export const ARTICLE_PRODUCT_TYPE_LOCALIZATION_MAP: {
	[key in ARTICLE_PRODUCT_TYPE]: string;
} = {
	[ARTICLE_PRODUCT_TYPE.NONE]: 'admin.cms.article.productType.none',
	[ARTICLE_PRODUCT_TYPE.CAROUSEL_MANUAL]:
		'admin.cms.article.productType.carouselManual',
	[ARTICLE_PRODUCT_TYPE.CAROUSEL_SPECIFICATION]:
		'admin.cms.article.productType.carouselSpecification',
	[ARTICLE_PRODUCT_TYPE.LIST_MANUAL]:
		'admin.cms.article.productType.listManual',
	[ARTICLE_PRODUCT_TYPE.LIST_SPECIFICATION]:
		'admin.cms.article.productType.listSpecification',
};

export enum ARTICLE_STATE {
	CONCEPT = 'CONCEPT',
	PUBLISHED = 'PUBLISHED',
}

export const ARTICLE_STATE_VALUES_MAP: {
	[key in ARTICLE_STATE]: ArticleState;
} = {
	[ARTICLE_STATE.CONCEPT]: ArticleState.DRAFT,
	[ARTICLE_STATE.PUBLISHED]: ArticleState.PUBLISHED,
};

export const ARTICLE_STATE_LOCALIZATION_MAP: {
	[key in ARTICLE_STATE]: string;
} = {
	[ARTICLE_STATE.CONCEPT]: 'admin.cms.article.state.concept',
	[ARTICLE_STATE.PUBLISHED]: 'admin.cms.article.state.published',
};

export enum COLUMN {
	TITLE = 'title',
	LANGUAGE = 'language',
	TAGS = 'tags',
	URL = 'url',
	PUBLISH_DATE = 'publishDate',
	STATE = 'state',
}

export const SORTING_COLUMN_MAP: { [key: string]: SortableColumns } = {
	[COLUMN.TITLE]: SortableColumns.TITLE,
	[COLUMN.LANGUAGE]: SortableColumns.LANGUAGE,
	[COLUMN.URL]: SortableColumns.URL,
	[COLUMN.PUBLISH_DATE]: SortableColumns.PUBLISH_DATE,
	[COLUMN.STATE]: SortableColumns.STATE,
};

export const FILTER_COLUMN_MAP = {
	[COLUMN.TITLE]: 'SearchTitle',
	[COLUMN.LANGUAGE]: 'SearchLanguage',
	[COLUMN.TAGS]: 'SearchTags',
	[COLUMN.URL]: 'SearchUrl',
	[COLUMN.STATE]: 'SearchState',
};
