import { useContext, useEffect } from 'react';
import { get } from 'Helpers/lodash';
import { useLoaderData } from 'react-router-dom';
import { IPageListTableRow } from 'Hooks/useAdminTable/interfaces';
import { TableSchema } from 'Hooks/useTableSchema/interfaces';
import { API_METHOD } from 'Hooks/useAdminTable/constants';
import { AdminTableFilterType } from 'Components/AdminTable/constants';
import useAdminTable from 'Hooks/useAdminTable';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import useTableSchema from 'Hooks/useTableSchema';
import { LocalizationContext } from 'Services/LocalizationService';
import AdminListPage from 'Components/AdminListPage';
import sortSuppliersByNameWeb from 'Helpers/sortSuppliersByNameWeb';
import useNavigateWithNewtabOption from 'Hooks/useNavigateWithNewtabOption';
import { AdminTableVariants } from 'Components/AdminTable/interfaces';

import { IBundleListRouteLoader } from '../BundleList/interfaces';
import {
	BundleListTableKeys,
	FILTER_COLUMN_MAP,
	LIST_API_ENDPOINT,
	SORTING_COLUMN_MAP,
	SUPPLIER_FILTER_NAME_MAX_LENGTH,
} from '../BundleList/constants';

import { SET_STATE_LOCALIZATION_MAP } from './constants';

import { VinistoHelperDllEnumsBundleBundleState } from '@/api-types/product-api';

const BundleHallwayList = () => {
	const { useFormatMessage } = useContext(LocalizationContext);

	const t = useFormatMessage();
	const getTableSchema = useTableSchema();
	const getLocalizedValue = useLocalizedValue();
	const { fetchData, handlers, state, pageNumber, pageCount } = useAdminTable();
	const data = useLoaderData() as IBundleListRouteLoader;
	const navigateWithNewtabOption = useNavigateWithNewtabOption();

	const tableSchema: TableSchema = [
		{
			header: `${t({ id: 'admin.bundleDetail.name.label' })}`,
			id: BundleListTableKeys.NAME,
			accessorFn: (row) => getLocalizedValue(row.name ?? []),
		},
		{
			header: `${t({ id: 'admin.bundleDetail.supplier.label' })}`,
			id: BundleListTableKeys.SUPPLIER,
			accessorFn: (row) => get(row, 'supplier.nameWeb', ''),
			enableSorting: false,
			meta: {
				filterType: AdminTableFilterType.MULTISELECT,
				dropDownFilterOptions:
					data?.suppliers !== undefined
						? Array.from(data.suppliers)
								.sort(sortSuppliersByNameWeb)
								.map(({ id, nameWeb }) => [
									id ?? '',
									nameWeb
										? nameWeb.substring(0, SUPPLIER_FILTER_NAME_MAX_LENGTH)
										: '',
								])
						: [],
			},
		},
		{
			header: `${t({ id: 'admin.bundleDetail.warehouseId.label' })}`,
			id: BundleListTableKeys.WAREHOUSE_ID,
			cell: ({ row }) => {
				return (
					row?.original?.warehouseId?.length > 0 &&
					row.original.warehouseId.join(', ')
				);
			},
		},
		{
			header: `${t({ id: 'admin.bundleDetail.isSet.label' })}`,
			id: BundleListTableKeys.IS_SET,
			enableSorting: false,
			accessorFn: (row) => row.isSet,
			cell: (row) =>
				row.getValue() ? t({ id: 'admin.yes' }) : t({ id: 'admin.no' }),
			meta: {
				filterType: AdminTableFilterType.YES_NO,
			},
		},
		{
			header: `${t({ id: 'admin.sideBar.hallwayBundleList.state' })}`,
			id: BundleListTableKeys.STATES,
			accessorFn: (row) => row.states ?? {},
			cell: (context) => {
				return (
					<div className="flex flex-col">
						{Object.entries(context?.row?.original?.states).map(
							([key, value]) => {
								return value ? (
									<div key={key}>
										{t({
											id: SET_STATE_LOCALIZATION_MAP[
												value as VinistoHelperDllEnumsBundleBundleState
											],
										})}
									</div>
								) : null;
							}
						)}
					</div>
				);
			},
			meta: {
				filterType: AdminTableFilterType.MULTISELECT,
				dropDownFilterOptions: Object.entries(SET_STATE_LOCALIZATION_MAP).map(
					([value, label]) => [value, t({ id: label }) as string]
				),
			},
			enableSorting: false,
		},
	];

	const adminTableSchema = getTableSchema(tableSchema);

	const handleOnTableRowClick = (
		entity: IPageListTableRow,
		event: React.MouseEvent
	) => {
		navigateWithNewtabOption(`/bundle-detail/${entity.id}`, event);
	};

	useEffect(() => {
		const apiParams: Record<string, any> = {
			limit: state.limit,
			offset: state.offset,
			includeDeleted: true,
			includeDisabled: true,
			hiddenSpecification: true,
			IsHiddenTags: true,
			isEnabled: null,
		};

		const [sortByColumn] = state.sorting;

		if (sortByColumn?.id) {
			apiParams.sortingColumn = get(SORTING_COLUMN_MAP, `[${sortByColumn.id}]`);
			apiParams.isSortingDescending = sortByColumn?.desc;
		}

		state.filters?.forEach(({ id, value }) => {
			if (id === 'bundleStates' && typeof value === 'string') {
				const states = value.split(',');
				apiParams['bundleStates'] = states;
			} else if (id == 'suppliers' && typeof value === 'string') {
				const suppliers = value.split(',');
				apiParams['supplierIds'] = suppliers;
			} else if (typeof value === 'string') {
				const filterColumn = get(FILTER_COLUMN_MAP, `[${id}]`);
				if (filterColumn) {
					apiParams[filterColumn] = value;
				}
			}
		});

		if (!apiParams.bundleStates) {
			apiParams.bundleStates = [
				VinistoHelperDllEnumsBundleBundleState.ToConfirm,
			];
		}

		fetchData(
			LIST_API_ENDPOINT,
			apiParams,
			(payload) => payload?.bundles ?? [],
			'admin.bundleList.loadingError',
			API_METHOD.POST
		);
	}, [fetchData, state]);
	return (
		<AdminListPage
			adminTableSchema={adminTableSchema}
			handleOnTableRowClick={handleOnTableRowClick}
			handlers={handlers}
			state={state}
			pageCount={pageCount}
			pageNumber={pageNumber}
			adminTableVariant={AdminTableVariants.DYNAMIC_COLUMNS}
			columnOrder={[
				BundleListTableKeys.NAME,
				BundleListTableKeys.SUPPLIER,
				BundleListTableKeys.URL,
				BundleListTableKeys.IS_SET,
				BundleListTableKeys.STATES,
			]}
		/>
	);
};

export default BundleHallwayList;
