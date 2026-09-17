import useAdminTable from 'Hooks/useAdminTable';
import { useContext, useEffect, useMemo } from 'react';
import { PageListAction } from 'Hooks/useAdminTable/constants';
import { useQuery } from '@tanstack/react-query';
import warehouseServiceInstance from 'Services/WarehouseService';
import { WAREHOUSE_QUANTITY_QUERY_KEY } from 'Services/WarehouseService/constants';
import { AuthenticationContext } from 'Services/AuthenticationService/context';

import { SET_LIST_COLUMN, SetListTableRow } from './interfaces';

import {
	VinistoHelperDllEnumsCurrency,
	VinistoProductDllModelsApiBundleBundlesGetParameters,
	VinistoProductDllModelsApiBundleBundlesReturn,
} from '@/api-types/product-api';
import api from '@/api';
import { bundleAdapter } from '@/index';

export const useBundlesTableData = ({
	searchName = '',
}: {
	searchName: string;
}) => {
	const { activeSupplierId } = useContext(AuthenticationContext);

	const { handlers, state, pageNumber, pageCount, dispatch, setPageNumber } =
		useAdminTable<SetListTableRow>([
			{
				id: SET_LIST_COLUMN.ID,
				desc: true,
			},
		]);

	useEffect(() => {
		if (state.data.length === 0) {
			setPageNumber(1);
		}
	}, [pageNumber, state.data, setPageNumber]);

	const displayedBundleIds = useMemo(
		() => state.data.map((row) => row.id).sort(),
		[state.data]
	);
	const { data: stockData, isLoading: isStockDataLoading } = useQuery({
		queryKey: [WAREHOUSE_QUANTITY_QUERY_KEY, String(displayedBundleIds)],
		queryFn: () =>
			warehouseServiceInstance.getBundleQuantities(displayedBundleIds),
		enabled: Boolean(displayedBundleIds.length),
	});

	const apiParams: VinistoProductDllModelsApiBundleBundlesGetParameters = {
		limit: state.limit,
		offset: state.offset,
		isSet: false,
		supplierIds: [activeSupplierId],
		searchName,
		filterPrices: false,
	};

	const bundlesQuery = useQuery(['GetBundles to Bundle[]', apiParams], () =>
		api
			.post<VinistoProductDllModelsApiBundleBundlesReturn>(
				`product-api/bundles/get-bundles`,
				undefined,
				apiParams
			)
			.then((response) => ({
				count: response.count,
				bundles:
					response.bundles?.map((bundle) =>
						bundleAdapter.fromApi(bundle, {
							currency: VinistoHelperDllEnumsCurrency.CZK,
						})
					) ?? [],
			}))
	);

	useEffect(() => {
		if (bundlesQuery.isSuccess) {
			const bundles = bundlesQuery.data.bundles || [];
			dispatch({
				type: PageListAction.setPageListState,
				value: {
					data: bundles,
					count: bundlesQuery.data.count || 0,
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
		stockData,
		isStockDataLoading,
	};
};
