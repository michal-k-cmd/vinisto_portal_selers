import { IPageListState } from './interfaces';

export const NOT_FOUND = -1;
export const MIN_PAGE_NUMBER = 1;
export const DEFAULT_ITEMS_PER_PAGE = 25;
export const PAGE_SIZES = [10, 20, 25, 50, 100];
export enum URL_PARAM {
	PAGE = 'page',
	SIZE = 'size',
	SORTING = 'sorting',
	FILTER = 'filter',
}
export const PARAM_ARRAY_DELIMITER = ',';
export enum PARAM_SORTING_DIRECTION {
	ASC = 'ASC',
	DESC = 'DESC',
}

export const defaultPageListState: IPageListState = {
	loading: false,
	loaded: false,
	data: [],
	loadedIds: [],
	count: 0,
	limit: DEFAULT_ITEMS_PER_PAGE,
	offset: 0,
	error: null,
	shouldReload: false,
	sorting: [],
	filters: [],
	selection: {},
	isAllSelected: false,
	isSelectFutureLoaded: false,
};

export enum PageListAction {
	reset,
	setPageListState,
	setLoading,
	setLoaded,
	setData,
	addLoadedIds,
	setCount,
	setLimit,
	setOffset,
	setError,
	setShouldReload,
	setSorting,
	setFilters,
}

export enum API_METHOD {
	GET = 'GET',
	POST = 'POST',
}
