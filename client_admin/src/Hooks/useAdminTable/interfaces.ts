import React from 'react';
import {
	ColumnFiltersState,
	Row,
	RowSelectionState,
	SortingState,
} from '@tanstack/react-table';
import { IQueryArgument } from 'Services/ApiService/interfaces';
import { AxiosRequestConfig } from 'axios';

import { PageListAction as Action, API_METHOD } from './constants';

import useAdminTable from '.';

export interface DbEntity extends Record<any, any> {
	id: string;
}

export interface PageListTableRow extends DbEntity {
	id: string;
	expandedContent?: React.FC<Row<PageListTableRow>>;
}

export interface PageListState<T extends PageListTableRow = PageListTableRow> {
	loading: boolean;
	loaded: boolean;
	data: T[];
	loadedIds: string[];
	count: number;
	limit: number;
	offset: number;
	error: string | null;
	shouldReload: boolean;
	sorting: SortingState;
	filters: ColumnFiltersState;
	selection: RowSelectionState;
	isAllSelected: boolean;
	isSelectFutureLoaded: boolean;
}

export type PageListStateReducerAction<T extends PageListTableRow> =
	| { type: Action.reset }
	| { type: Action.setPageListState; value: Partial<PageListState<T>> }
	| { type: Action.setLoading; value: PageListState<T>['loading'] }
	| { type: Action.setLoaded; value: PageListState<T>['loaded'] }
	| { type: Action.setData; value: PageListState<T>['data'] }
	| { type: Action.addLoadedIds; value: PageListState<T>['loadedIds'] }
	| { type: Action.setCount; value: PageListState<T>['count'] }
	| { type: Action.setLimit; value: PageListState<T>['limit'] }
	| { type: Action.setOffset; value: PageListState<T>['offset'] }
	| { type: Action.setError; value: PageListState<T>['error'] }
	| { type: Action.setShouldReload; value: PageListState<T>['shouldReload'] }
	| { type: Action.setSorting; value: PageListState<T>['sorting'] }
	| { type: Action.setFilters; value: PageListState<T>['filters'] };

export type ApiGetParam = IQueryArgument;

type FetchDataMethod<TApiParams, TMethod, TData> = (
	url: string,
	apiParams: TApiParams,
	prepareData: (payload: Record<any, any>) => TData[],
	errorMsg: string,
	method: TMethod,
	options?: AxiosRequestConfig
) => void;

type FetchDataGet<TData> = FetchDataMethod<
	ApiGetParam[],
	API_METHOD.GET,
	TData
>;
type FetchDataPost<TData> = FetchDataMethod<
	Record<string, string | number | boolean>,
	API_METHOD.POST,
	TData
>;

export type FetchData<TData> = FetchDataGet<TData> | FetchDataPost<TData>;

// eslint-disable-next-line prettier/prettier
export type AdminTableVars<T extends PageListTableRow> = Omit<ReturnType<typeof useAdminTable<T>>, 'updateTableState' | 'updateCount'> & {
	updateTableState?: (data: T[]) => void;
	updateCount?: (count: number) => void;
};
