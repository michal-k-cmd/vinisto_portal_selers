import useAdminTable from 'Hooks/useAdminTable';
import { useContext, useEffect } from 'react';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { PageListAction } from 'Hooks/useAdminTable/constants';
import { get } from 'lodash-es';
import { useQuery } from '@tanstack/react-query';
import { NotificationsContext } from 'Services/NotificationService';

import { SET_LIST_COLUMN, SetListTableRow } from './interfaces';
import { FILTER_COLUMN_MAP, SORTING_COLUMN_MAP } from './constants';

import { BundlesGetSupplierSetsListParams } from '@/api-types/product-api';
import supplierSetService from '@/supplier-set-service';

export const useSetListTableData = () => {
	const { activeSupplierId } = useContext(AuthenticationContext);
	const notificationsContext = useContext(NotificationsContext);

	const { handlers, state, pageNumber, pageCount, dispatch } =
		useAdminTable<SetListTableRow>([
			{
				id: SET_LIST_COLUMN.ID,
				desc: true,
			},
		]);

	const apiParams: BundlesGetSupplierSetsListParams = {
		Limit: state.limit,
		Offset: state.offset,
		SupplierId: activeSupplierId,
	};

	const [sortByColumn] = state.sorting;

	if (sortByColumn?.id) {
		apiParams.SortingColumn = SORTING_COLUMN_MAP[sortByColumn.id];
		apiParams.IsSortingDescending = sortByColumn?.desc;
	}

	state.filters?.forEach(({ id, value }) => {
		if (typeof value === 'string' || Array.isArray(value)) {
			const filterColumn = get(FILTER_COLUMN_MAP, `[${id}]`);
			if (filterColumn) {
				// @ts-expect-error - fix later or let be
				apiParams[filterColumn] = value;
			}
		}
	});

	const bundlesQuery = useQuery(
		['product-api/bundles/get-supplier-sets', apiParams],
		() =>
			supplierSetService
				.getSupplierSets(apiParams)
				.then((res) => res)
				.catch(() => {
					notificationsContext.handleShowErrorNotification(
						'Failed to fetch supplier sets'
					);
					return null;
				}),
		{ enabled: !!apiParams.BundleStates, refetchOnMount: true }
	);

	useEffect(() => {
		if (bundlesQuery.isSuccess) {
			const supplierSets = bundlesQuery.data?.supplierSets || [];
			dispatch({
				type: PageListAction.setPageListState,
				value: {
					data: supplierSets,
					count: bundlesQuery.data?.count || 0,
					loaded: true,
				},
			});
		}
	}, [bundlesQuery.data, bundlesQuery.isSuccess, dispatch]);

	return {
		state,
		pageCount,
		pageNumber,
		handlers,
	};
};
