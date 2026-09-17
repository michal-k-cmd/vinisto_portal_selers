import { SearchResultBundleItemProps } from './SearchResultBundleItem/interfaces';
import { SEARCH_ITEM_TYPE } from './constants';

export type SearchModelBasic = {
	type: Exclude<SEARCH_ITEM_TYPE, SEARCH_ITEM_TYPE.BUNDLE>;
	text: string; // displayed in input field once selected
	url: string;
};

export type SearchModelWithImage = {
	images: Record<any, any>[];
};

export type SearchModelBundle = SearchResultBundleItemProps &
	SearchModelWithImage &
	Omit<SearchModelBasic, 'type'> & {
		type: SEARCH_ITEM_TYPE.BUNDLE;
	};

export type SearchModelCategory = SearchModelWithImage &
	Omit<SearchModelBasic, 'type'> & {
		type: SEARCH_ITEM_TYPE.CATEGORY;
	};

export type SearchModel =
	| SearchModelBasic
	| SearchModelBundle
	| SearchModelCategory;
