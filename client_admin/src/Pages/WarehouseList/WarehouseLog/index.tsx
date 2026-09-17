import { useContext, useEffect } from 'react';
import cx from 'classnames';
import { isEmpty } from 'lodash-es';
import { CCard } from '@coreui/react';
import { LocalizationContext } from 'Services/LocalizationService';
import bundleListStyles from 'Pages/BundleList/styles.module.css';
import AdminListPage from 'Components/AdminListPage';
import useAdminTable from 'Hooks/useAdminTable';
import useTableSchema from 'Hooks/useTableSchema';
import { TableSchema } from 'Hooks/useTableSchema/interfaces';
import { Device } from 'Services/DeviceService/constants';
import { PageListAction } from 'Hooks/useAdminTable/constants';
import useDidMountEffect from 'Hooks/useDidMountEffect';
import { useQuery } from '@tanstack/react-query';
import { NotificationsContext } from 'Services/NotificationService';
import { dayjsInstance as dayjs } from 'Services/Date';
import useLocalizedValue from 'Hooks/useLocalizedValue';

import { BundleListTableRow } from './interfaces';
import {
	ACTION_COLUMN,
	BUNDLE_NAME_COLUMN,
	COUNT_COLUMN,
	DATE_COLUMN,
} from './constants';

import WarehouseService from '@/warehouse-service';
import { ChangeReasonLocaleMap } from '@/warehouse-service/constants';
import {
	ChangeLogSupplierDetailParams,
	VinistoHelperDllEnumsWarehouseChangeLogSortableColumns,
} from '@/api-types/warehouse-api';

const WarehouseLog = ({ supplierId }: { supplierId: string }) => {
	const t = useContext(LocalizationContext).useFormatMessage();
	const { handleShowErrorNotification } = useContext(NotificationsContext);
	const getLocalizedValue = useLocalizedValue();

	const LOGS_PER_PAGE = 10;

	const getTableSchema = useTableSchema<BundleListTableRow>();
	const { handlers, state, pageNumber, pageCount, dispatch } =
		useAdminTable<BundleListTableRow>([], LOGS_PER_PAGE, 'warehouseLog');

	const tableSchema: TableSchema<BundleListTableRow> = [
		{
			header: '',
			accessorKey: DATE_COLUMN,
			id: DATE_COLUMN,
			accessorFn: (row) => dayjs.unix(row.createdAt).format('DD.MM.YYYY'),
			enableSorting: false,
			enableColumnFilter: false,
			devices: [Device.MOBILE, Device.TABLET, Device.DESKTOP],
		},
		{
			header: '',
			accessorKey: ACTION_COLUMN,
			id: ACTION_COLUMN,
			accessorFn: (row) => {
				const translateKey = ChangeReasonLocaleMap.find(
					(item) => item.value === row.changeReason
				)?.label;

				return translateKey ? `${t({ id: `${translateKey}` })}` : '-';
			},
			enableSorting: false,
			enableColumnFilter: false,
			devices: [Device.MOBILE, Device.TABLET, Device.DESKTOP],
		},
		{
			header: '',
			accessorKey: BUNDLE_NAME_COLUMN,
			id: BUNDLE_NAME_COLUMN,
			accessorFn: (row) => getLocalizedValue(row.bundleName),
			enableSorting: false,
			enableColumnFilter: false,
			devices: [Device.MOBILE, Device.TABLET, Device.DESKTOP],
		},
		{
			header: '',
			accessorKey: COUNT_COLUMN,
			id: COUNT_COLUMN,
			accessorFn: (row) => `${row.quantity} ${t({ id: 'warehouseList.pcs' })}`,
			cell: ({ row }) => (
				<span className="text-nowrap text-end d-block">
					{row?.original?.quantity} {t({ id: 'warehouseList.pcs' })}
				</span>
			),
			enableSorting: false,
			enableColumnFilter: false,
			devices: [Device.MOBILE, Device.TABLET, Device.DESKTOP],
		},
	];

	const adminTableSchema = getTableSchema(tableSchema);

	const apiParams: ChangeLogSupplierDetailParams = {
		Limit: state.limit,
		Offset: state.offset,
		SortingColumn:
			VinistoHelperDllEnumsWarehouseChangeLogSortableColumns.CREATED_AT,
		IsSortingDescending: true,
		supplierId,
	};

	const bundlesLogQuery = useQuery(
		['supplierBundlesLog', supplierId, apiParams],
		() => WarehouseService.getSupplierChangeLog(apiParams)
	);

	useEffect(() => {
		if (!isEmpty(state.filters)) {
			dispatch({
				type: PageListAction.setShouldReload,
				value: true,
			});
		}
	}, []);

	useEffect(() => {
		if (bundlesLogQuery.isSuccess) {
			const bundles = bundlesLogQuery.data.changeLogItems || [];

			dispatch({
				type: PageListAction.setPageListState,
				value: {
					//@ts-ignore
					data: bundles,
					count: bundlesLogQuery.data.count || 0,
					loaded: true,
				},
			});
		}
		if (bundlesLogQuery.isError) {
			handleShowErrorNotification('bundleList.loadingError');
		}
	}, [
		bundlesLogQuery.data,
		bundlesLogQuery.isSuccess,
		bundlesLogQuery.isError,
		dispatch,
		handleShowErrorNotification,
	]);

	useDidMountEffect(() => {
		dispatch({
			type: PageListAction.setShouldReload,
			value: true,
		});
	}, [supplierId]);

	useEffect(() => {
		dispatch({
			type: PageListAction.setPageListState,
			value: {
				loading: bundlesLogQuery.isFetching,
			},
		});
	}, [bundlesLogQuery.isFetching, dispatch]);

	return (
		<CCard className="m-0">
			<h2 className={cx(bundleListStyles.mainHeading, 'mb-0')}>
				{t({ id: 'warehouseList.stockHeading' })}
			</h2>
			<AdminListPage<BundleListTableRow>
				adminTableSchema={adminTableSchema}
				handlers={handlers}
				state={state}
				pageCount={pageCount}
				pageNumber={pageNumber}
			/>
		</CCard>
	);
};

export default WarehouseLog;
