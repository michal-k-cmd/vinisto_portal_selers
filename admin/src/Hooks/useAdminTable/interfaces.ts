import { FC } from 'react';
import {
	ColumnFiltersState,
	Row,
	RowSelectionState,
	SortingState,
} from '@tanstack/react-table';
import { HttpRequestConfig as AxiosRequestConfig } from 'Services/ApiService/http';

import { PageListAction as Action, API_METHOD } from './constants';

import useAdminTable from '.';

export interface IDbEntity extends Record<any, any> {
	id: string;
}

export interface IPageListTableRow extends IDbEntity {
	id: string;
	expandedContent?: FC<Row<IPageListTableRow>>;
}

export interface IPageListState<
	T extends IPageListTableRow = IPageListTableRow
> {
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

export type IPageListStateReducerAction<T extends IPageListTableRow> =
	| { type: Action.reset }
	| { type: Action.setPageListState; value: Partial<IPageListState<T>> }
	| { type: Action.setLoading; value: IPageListState<T>['loading'] }
	| { type: Action.setLoaded; value: IPageListState<T>['loaded'] }
	| { type: Action.setData; value: IPageListState<T>['data'] }
	| { type: Action.addLoadedIds; value: IPageListState<T>['loadedIds'] }
	| { type: Action.setCount; value: IPageListState<T>['count'] }
	| { type: Action.setLimit; value: IPageListState<T>['limit'] }
	| { type: Action.setOffset; value: IPageListState<T>['offset'] }
	| { type: Action.setError; value: IPageListState<T>['error'] }
	| { type: Action.setShouldReload; value: IPageListState<T>['shouldReload'] }
	| { type: Action.setSorting; value: IPageListState<T>['sorting'] }
	| { type: Action.setFilters; value: IPageListState<T>['filters'] };

export type ApiGetParam = { key: string; value: string | number | boolean };

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
export type AdminTableVars<T extends IPageListTableRow> = ReturnType<
	typeof useAdminTable<T>
>;
