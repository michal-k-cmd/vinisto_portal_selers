import { union } from 'lodash-es';

import {
	PageListState,
	PageListStateReducerAction,
	PageListTableRow,
} from './interfaces';
import { PageListAction as Action, defaultPageListState } from './constants';

export const pageListStateReducer = <
	T extends PageListTableRow = PageListTableRow
>(
	state: PageListState<T>,
	action: PageListStateReducerAction<T>
): PageListState<T> => {
	switch (action.type) {
		case Action.reset:
			return {
				...(defaultPageListState as PageListState<T>),
				// keep properties set by URL params
				limit: state.limit,
				offset: state.offset,
				sorting: state.sorting,
				filters: state.filters,
			};
		case Action.setPageListState:
			return {
				...state,
				...action.value,
			};
		case Action.setLoading:
			return {
				...state,
				loading: action.value,
			};
		case Action.setLoaded:
			return {
				...state,
				loaded: action.value,
			};
		case Action.setData:
			return {
				...state,
				data: action.value,
			};
		case Action.addLoadedIds:
			return {
				...state,
				loadedIds: union(state.loadedIds, action.value),
			};
		case Action.setCount:
			return {
				...state,
				count: action.value,
			};
		case Action.setLimit:
			return {
				...state,
				limit: action.value,
			};
		case Action.setOffset:
			return {
				...state,
				offset: action.value,
			};
		case Action.setError:
			return {
				...state,
				error: action.value,
			};
		case Action.setShouldReload:
			return {
				...state,
				shouldReload: action.value,
			};
		case Action.setSorting:
			return {
				...state,
				sorting: action.value,
			};
		case Action.setFilters:
			return {
				...state,
				filters: action.value,
			};
	}
};
