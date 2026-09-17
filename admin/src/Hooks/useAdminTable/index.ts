import React from 'react';
import {
	ColumnFiltersState,
	RowSelectionState,
	SortingState,
} from '@tanstack/react-table';
import {
	ceil,
	difference,
	divide,
	fill,
	filter,
	get,
	map,
	size,
	union,
	zipObject,
} from 'Helpers/lodash';
import { useLocation } from 'react-router-dom';
import { NumberParam, useQueryParam, withDefault } from 'Helpers/query-params';
import {
	validatePageNumber,
	validatePageSize,
} from 'Hooks/useAdminTable/helpers';
import usePrevious from 'Hooks/usePrevious';
import { apiServiceInstance } from 'Services/ApiService';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { NotificationsContext } from 'Services/NotificationService';

import { pageListStateReducer } from './reducer';
import {
	PageListAction as Action,
	API_METHOD,
	DEFAULT_ITEMS_PER_PAGE,
	defaultPageListState,
	MIN_PAGE_NUMBER,
	URL_PARAM,
} from './constants';
import { FilterParam, SortingParam } from './queryParams';
import { FetchData, IPageListState, IPageListTableRow } from './interfaces';

const useAdminTable = <T extends IPageListTableRow = IPageListTableRow>(
	defaultSorting: SortingState = []
) => {
	const authenticationContext = React.useContext(AuthenticationContext);
	const notificationsContext = React.useContext(NotificationsContext);

	const [pageNumber, setPageNumberUrlParam] = useQueryParam(
		URL_PARAM.PAGE,
		withDefault(NumberParam, MIN_PAGE_NUMBER)
	);
	const [pageSize, setPageSizeUrlParam] = useQueryParam(
		URL_PARAM.SIZE,
		withDefault(NumberParam, DEFAULT_ITEMS_PER_PAGE)
	);
	const [sorting, setSortingUrlParam] = useQueryParam(
		URL_PARAM.SORTING,
		withDefault(SortingParam, defaultSorting)
	);
	const [filters, setFiltersUrlParam] = useQueryParam(
		URL_PARAM.FILTER,
		withDefault(FilterParam, [])
	);

	const [state, dispatch] = React.useReducer<typeof pageListStateReducer<T>>(
		pageListStateReducer,
		{
			...(defaultPageListState as IPageListState<T>),
			offset: (validatePageNumber(pageNumber) - 1) * validatePageSize(pageSize),
			limit: validatePageSize(pageSize),
			sorting: sorting ?? defaultSorting,
			filters: filters ?? [],
		}
	);

	const previousOffset = usePrevious(state.offset);
	const previousSorting = usePrevious(state.sorting);
	const previousFilters = usePrevious(state.filters);

	const locationChangedByApp = React.useRef<boolean>(true);
	const location = useLocation();

	const fetchData = async (
		...[url, apiParams, prepareData, errorMsg, method, options]: Parameters<
			FetchData<T>
		>
	) => {
		const { loginHash } = authenticationContext.vinistoUser;

		if (!loginHash) return;
		if (
			(!state.loading && !state.loaded) ||
			previousOffset !== state.offset ||
			previousSorting !== state.sorting ||
			previousFilters !== state.filters ||
			state.shouldReload
		) {
			dispatch({
				type: Action.setPageListState,
				value: {
					loading: true,
					shouldReload: false,
					error: null,
				},
			});

			let apiCall;
			if (method === API_METHOD.POST) {
				apiCall = apiServiceInstance.post(url, apiParams, true, options);
			} else {
				apiCall = apiServiceInstance.getCollection(
					url,
					apiParams,
					true,
					options
				);
			}

			apiCall
				.then(async (payload) => {
					const data = await prepareData(payload);
					const loadedIds = map(data, (user) => user.id);
					const selection = {
						...state.selection,
						...(state.isSelectFutureLoaded
							? zipObject(
									difference(loadedIds, state.loadedIds),
									fill(Array(size(data)), true)
							  )
							: {}),
					};
					dispatch({
						type: Action.setPageListState,
						value: {
							loading: false,
							loaded: true,
							data,
							loadedIds: union(state.loadedIds, loadedIds),
							count: get(payload, 'count') ?? get(payload, 'totalCount', 0),
							selection,
						},
					});
				})
				.catch((error) => {
					if (errorMsg) {
						notificationsContext.handleShowErrorNotification(errorMsg);
					}
					dispatch({
						type: Action.setPageListState,
						value: {
							loading: false,
							loaded: true,
							data: [],
							count: 0,
							offset: 0,
							error: get(error, 'message', ''),
						},
					});
				});
		}
	};

	const handleOnSortingChange = React.useCallback(
		(value: SortingState) => {
			dispatch({
				type: Action.setSorting,
				value,
			});
			setSortingUrlParam(value);
			locationChangedByApp.current = true;
		},
		[dispatch]
	);

	const handleOnFiltersChange = React.useCallback(
		(value: ColumnFiltersState) => {
			dispatch({
				type: Action.setFilters,
				value,
			});
			setFiltersUrlParam(value);
			setTimeout(() => handleOnPageChange(1), 0);
			locationChangedByApp.current = true;
		},
		[dispatch]
	);

	const handleOnRowSelectionChange = React.useCallback(
		(value: RowSelectionState) => {
			const nonEmptyKeys = filter(Object.keys(value));
			const selection = zipObject(
				nonEmptyKeys,
				fill(Array(size(nonEmptyKeys)), true)
			);
			dispatch({
				type: Action.setPageListState,
				value: {
					selection: selection,
					isAllSelected:
						state.isSelectFutureLoaded &&
						size(selection) === size(state.loadedIds),
				},
			});
		},
		[dispatch, state.loadedIds]
	);

	const handleOnToggleSelectAllRows = React.useCallback(() => {
		dispatch({
			type: Action.setPageListState,
			value: {
				isAllSelected: !state.isAllSelected,
				selection: !state.isAllSelected
					? zipObject(state.loadedIds, fill(Array(size(state.loadedIds)), true))
					: {},
				isSelectFutureLoaded: !state.isAllSelected,
			},
		});
	}, [dispatch, state.loadedIds, state.isAllSelected]);

	const handleOnPageChange = React.useCallback(
		(newPage: number) => {
			setPageNumberUrlParam(newPage);
			dispatch({
				type: Action.setOffset,
				value: (newPage - 1) * state.limit,
			});
			locationChangedByApp.current = true;
			document
				.querySelector('.admin-page-content.container-fluid')
				?.scrollTo(0, 0);
		},
		[setPageNumberUrlParam, dispatch, state.limit]
	);

	const handleOnPageSizeChange = React.useCallback(
		(size: number) => {
			const validSize = validatePageSize(size);
			dispatch({
				type: Action.setPageListState,
				value: {
					limit: validSize,
					offset: 0,
					shouldReload: true,
				},
			});
			setPageSizeUrlParam(validSize);
			setPageNumberUrlParam(1);
			locationChangedByApp.current = true;
		},
		[setPageNumberUrlParam, dispatch, state.limit]
	);

	React.useEffect(() => {
		const validPageNumber = validatePageNumber(pageNumber);
		if (pageNumber !== validPageNumber) {
			// Keep invalid URL values from persisting in browser history.
			setTimeout(() => setPageNumberUrlParam(validPageNumber, 'replaceIn'));
		}
		const validPageSize = validatePageSize(pageSize);
		if (pageSize !== validPageSize) {
			// Keep invalid URL values from persisting in browser history.
			setTimeout(() => setPageSizeUrlParam(validPageSize, 'replaceIn'));
		}
	}, []);

	React.useLayoutEffect(() => {
		if (locationChangedByApp.current) {
			locationChangedByApp.current = false;
			return;
		}
		dispatch({
			type: Action.setPageListState,
			value: {
				limit: validatePageSize(pageSize),
				offset:
					(validatePageNumber(pageNumber) - 1) * validatePageSize(pageSize),
				sorting,
				filters,
			},
		});
	}, [location]);

	const pageCount = ceil(divide(state.count, state.limit));

	return {
		fetchData,
		handlers: {
			handleOnSortingChange,
			handleOnFiltersChange,
			handleOnRowSelectionChange,
			handleOnToggleSelectAllRows,
			handleOnPageChange,
			handleOnPageSizeChange,
		},
		state,
		dispatch,
		pageNumber,
		pageCount,
	};
};

export default useAdminTable;
