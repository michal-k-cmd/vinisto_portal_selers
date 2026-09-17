import {
	useCallback,
	useContext,
	useEffect,
	useLayoutEffect,
	useReducer,
	useRef,
} from 'react';
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
	isEmpty,
	map,
	size,
	union,
	zipObject,
} from 'lodash-es';
import { useLocation } from 'react-router-dom';
import { NumberParam, useQueryParam, withDefault } from 'use-query-params';
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
import { FetchData, PageListState, PageListTableRow } from './interfaces';

const useAdminTable = <T extends PageListTableRow = PageListTableRow>(
	defaultSorting: SortingState = [],
	initialItemsPerPage = DEFAULT_ITEMS_PER_PAGE,
	urlPrefix?: string
) => {
	const authenticationContext = useContext(AuthenticationContext);
	const notificationsContext = useContext(NotificationsContext);

	const getQueryParamName = useCallback(
		(paramName: string) =>
			urlPrefix ? `${urlPrefix}_${paramName}` : paramName,
		[urlPrefix]
	);

	const [pageNumber, setPageNumberUrlParam] = useQueryParam(
		getQueryParamName(URL_PARAM.PAGE),
		withDefault(NumberParam, MIN_PAGE_NUMBER)
	);
	const [pageSize, setPageSizeUrlParam] = useQueryParam(
		getQueryParamName(URL_PARAM.SIZE),
		withDefault(NumberParam, initialItemsPerPage)
	);
	const [sorting, setSortingUrlParam] = useQueryParam(
		getQueryParamName(URL_PARAM.SORTING),
		withDefault(SortingParam, defaultSorting)
	);
	const [filters, setFiltersUrlParam] = useQueryParam(
		getQueryParamName(URL_PARAM.FILTER),
		withDefault(FilterParam, [])
	);

	const [state, dispatch] = useReducer<typeof pageListStateReducer<T>>(
		pageListStateReducer,
		{
			...(defaultPageListState as PageListState<T>),
			offset: (validatePageNumber(pageNumber) - 1) * validatePageSize(pageSize),
			limit: validatePageSize(pageSize),
			sorting,
			filters,
		}
	);

	const isInitialMount = useRef(true);
	const previousOffset = usePrevious(state.offset);
	const previousSorting = usePrevious(state.sorting);
	const previousFilters = usePrevious(state.filters);

	const locationChangedByApp = useRef(true);
	const location = useLocation();

	const setPageNumber = useCallback(
		(newPage: number) => {
			const validPage = validatePageNumber(newPage);
			setPageNumberUrlParam(validPage);
			dispatch({
				type: Action.setPageListState,
				value: {
					offset: (validPage - 1) * state.limit,
					shouldReload: true,
				},
			});
			locationChangedByApp.current = true;
		},
		[setPageNumberUrlParam, state.limit]
	);

	const updateTableState = useCallback(
		(data: T[]) => {
			const loadedIds = map(data, (item) => item.id);
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
					count: data.length, // Assuming data is an array
					selection,
				},
			});
		},
		[state, dispatch]
	);

	const updateCount = useCallback(
		(count: number) => {
			dispatch({
				type: Action.setPageListState,
				value: {
					count,
				},
			});
		},
		[dispatch]
	);

	const fetchData = (
		...[url, apiParams, prepareData, errorMsg, method, options]: Parameters<
			FetchData<T>
		>
	) => {
		const loginHash = get(authenticationContext, 'vinistoUser.loginHash', null);
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
				.then((payload: Record<any, any>) => {
					const data = prepareData(payload);
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
							count: get(payload, 'count', 0),
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

	const handleOnSortingChange = useCallback(
		(value: SortingState) => {
			dispatch({
				type: Action.setSorting,
				value,
			});
			setSortingUrlParam(value);
			locationChangedByApp.current = true;
		},
		[dispatch, setSortingUrlParam]
	);

	const handleOnRowSelectionChange = useCallback(
		(value: RowSelectionState) => {
			const nonEmptyKeys = filter(Object.keys(value));
			const selection = zipObject(
				nonEmptyKeys,
				fill(Array(size(nonEmptyKeys)), true)
			);
			dispatch({
				type: Action.setPageListState,
				value: {
					selection,
					isAllSelected:
						state.isSelectFutureLoaded &&
						size(selection) === size(state.loadedIds),
				},
			});
		},
		[dispatch, state.loadedIds, state.isSelectFutureLoaded]
	);

	const handleOnToggleSelectAllRows = useCallback(() => {
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

	const handleOnPageChange = useCallback(
		(newPage: number) => {
			setPageNumberUrlParam(newPage);
			dispatch({
				type: Action.setOffset,
				value: (newPage - 1) * state.limit,
			});
			locationChangedByApp.current = true;
		},
		[setPageNumberUrlParam, dispatch, state.limit]
	);

	const handleOnPageSizeChange = useCallback(
		(sizeValue: number) => {
			const validSize = validatePageSize(sizeValue);
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
		[setPageNumberUrlParam, setPageSizeUrlParam, dispatch]
	);

	const handleOnFiltersChange = useCallback(
		(value: ColumnFiltersState) => {
			dispatch({
				type: Action.setFilters,
				value,
			});
			setFiltersUrlParam(value);
			handleOnPageChange(1);
			locationChangedByApp.current = true;
		},
		[dispatch, setFiltersUrlParam, handleOnPageChange]
	);

	useEffect(() => {
		const validPageNumber = validatePageNumber(pageNumber);
		if (pageNumber !== validPageNumber) {
			// HOTFIX: https://github.com/pbeshai/use-query-params/issues/211
			setTimeout(() => setPageNumberUrlParam(validPageNumber, 'replaceIn'));
		}
		const validPageSize = validatePageSize(pageSize);
		if (pageSize !== validPageSize) {
			// HOTFIX: https://github.com/pbeshai/use-query-params/issues/211
			setTimeout(() => setPageSizeUrlParam(validPageSize, 'replaceIn'));
		}

		// Ensure filters are maintained in URL after page reload
		if (!isEmpty(filters)) {
			// Apply same HOTFIX strategy for filters
			setTimeout(() => setFiltersUrlParam(filters, 'replaceIn'));

			dispatch({
				type: Action.setFilters,
				value: filters,
			});
		}

		isInitialMount.current = false;
	}, []);

	useEffect(() => {
		if (isInitialMount.current && !isEmpty(filters)) {
			dispatch({
				type: Action.setFilters,
				value: filters,
			});
		}
	}, [filters]);

	useLayoutEffect(() => {
		if (locationChangedByApp.current) {
			locationChangedByApp.current = false;
			return;
		}

		const newState: Partial<PageListState<T>> = {
			limit: validatePageSize(pageSize),
			offset: (validatePageNumber(pageNumber) - 1) * validatePageSize(pageSize),
			sorting,
			filters,
			shouldReload: true,
		};

		dispatch({
			type: Action.setPageListState,
			value: newState,
		});
	}, [location]);

	const pageCount = ceil(divide(state.count, state.limit));

	return {
		updateTableState,
		fetchData,
		updateCount,
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
		setPageNumber,
	};
};

export default useAdminTable;
