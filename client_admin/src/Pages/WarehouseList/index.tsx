import { useContext, useEffect } from 'react';
import { isEmpty } from 'lodash-es';
import { useQuery } from '@tanstack/react-query';
import { CCard } from '@coreui/react';
import { TableSchema } from 'Hooks/useTableSchema/interfaces';
import { PageListAction } from 'Hooks/useAdminTable/constants';
import { Device } from 'Services/DeviceService/constants';
import useAdminTable from 'Hooks/useAdminTable';
import useDidMountEffect from 'Hooks/useDidMountEffect';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import useTableSchema from 'Hooks/useTableSchema';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { LocalizationContext } from 'Services/LocalizationService';
import AdminListPage from 'Components/AdminListPage';
import SPECIFICATION_IDS from 'Config/specificationIds';
import { NotificationsContext } from 'Services/NotificationService';
import InfoBox from 'Components/InfoBox';
import { OPEN_POSITION } from 'Components/InfoBox/constants';
import bundleListStyles from 'Pages/BundleList/styles.module.css';

import 'Pages/BundleList/styles.css';

import { BundleListTableRow } from './interfaces';
import styles from './styles.module.css';
import Overview from './Overview';
import {
	BATCH_COLUMN,
	ID_COLUMN,
	IN_STOCK_COLUMN,
	NAME_COLUMN,
	SOLD_COLUMN,
	UNPAID_COLUMN,
} from './constants';
import WarehouseLog from './WarehouseLog';

import SupplierService from '@/supplier-service';
import { AdminProductsDetailParams } from '@/api-types/supplier-api';

const WarehouseListPage = () => {
	const { activeSupplierId } = useContext(AuthenticationContext);
	const t = useContext(LocalizationContext).useFormatMessage();
	const { handleShowErrorNotification } = useContext(NotificationsContext);

	const PRODUCTS_PER_PAGE = 10;

	const getTableSchema = useTableSchema<BundleListTableRow>();
	const getLocalizedValue = useLocalizedValue();
	const { handlers, state, pageNumber, pageCount, dispatch } =
		useAdminTable<BundleListTableRow>([], PRODUCTS_PER_PAGE);

	const tableSchema: TableSchema<BundleListTableRow> = [
		{
			header: `${t({ id: 'bundleList.identifier.warehouse' })}`,
			accessorKey: ID_COLUMN,
			id: ID_COLUMN,
			accessorFn: (row) => row.warehouseIds?.join(', '),
			enableSorting: false,
			enableColumnFilter: true,
			devices: [Device.MOBILE, Device.TABLET, Device.DESKTOP],
		},
		{
			header: `${t({ id: 'bundleList.name' })}`,
			id: NAME_COLUMN,
			enableSorting: false,
			accessorFn: (row) => getLocalizedValue(row.bundleName ?? []),
			cell: ({ row }) => {
				const bundleName = row?.original?.bundleName ?? [];

				return (
					<span
						dangerouslySetInnerHTML={{
							__html:
								getLocalizedValue(bundleName).length > 0
									? getLocalizedValue(bundleName)
									: bundleName[0].value,
						}}
					></span>
				);
			},
			devices: [Device.MOBILE, Device.TABLET, Device.DESKTOP],
		},
		{
			header: `${t({ id: 'bundleList.batch' })}`,
			id: BATCH_COLUMN,
			accessorFn: (row) => {
				const specificationDetail = row?.specifications?.find(
					(detail) => detail.value.definitionId === SPECIFICATION_IDS.BATCH
				);
				return specificationDetail
					? getLocalizedValue(specificationDetail.value.value)
					: null;
			},
			enableSorting: false,
			enableColumnFilter: false,
			devices: [Device.MOBILE, Device.TABLET, Device.DESKTOP],
		},
		{
			header: `${t({ id: 'bundleList.inStock' })}`,
			id: IN_STOCK_COLUMN,
			cell: ({ row }) => (
				<span className="fw-bolder">
					{row?.original?.warehouseCount}{' '}
					{t({
						id: 'warehouseList.pcs',
					})}
				</span>
			),
			enableSorting: false,
			enableColumnFilter: false,
			devices: [Device.MOBILE, Device.TABLET, Device.DESKTOP],
		},
		{
			header: `${t({ id: 'warehouseList.soldColumn' })}`,
			id: SOLD_COLUMN,
			cell: ({ row }) => {
				const soldLastMonth = row?.original?.soldLastMonth ?? '-';
				const soldThisMonth = row?.original?.soldThisMonth ?? '-';

				return `${soldLastMonth} ${t({
					id: 'warehouseList.pcs',
				})} / ${soldThisMonth} ${t({
					id: 'warehouseList.pcs',
				})}`;
			},
			enableSorting: false,
			enableColumnFilter: false,
			devices: [Device.MOBILE, Device.TABLET, Device.DESKTOP],
		},
		{
			header: () => (
				<div className={styles.notPaid}>
					{t({ id: 'warehouseList.notPaid' })}
					<InfoBox
						content={t({ id: 'warehouseList.notPaidTooltip' })}
						position={OPEN_POSITION.BOTTOM_LEFT}
						className="position-relative"
						contentClassName={styles.notPaidTooltipContent}
					/>
				</div>
			),
			id: UNPAID_COLUMN,
			cell: ({ row }) => {
				const countInUnpaidOrders = row?.original?.countInUnpaidOrders ?? '-';

				return `${countInUnpaidOrders} ${t({
					id: 'warehouseList.pcs',
				})}`;
			},
			enableSorting: false,
			enableColumnFilter: false,
			devices: [Device.MOBILE, Device.TABLET, Device.DESKTOP],
		},
	];

	const adminTableSchema = getTableSchema(tableSchema);

	const apiParams: AdminProductsDetailParams = {
		Limit: state.limit,
		Offset: state.offset,
		supplierId: activeSupplierId,
	};

	state.filters?.forEach((filter) => {
		if (filter.id === NAME_COLUMN) {
			apiParams.SearchBundleName = String(filter.value);
		}
		if (filter.id === ID_COLUMN) {
			apiParams.SearchProductWarehouseId = String(filter.value);
		}
	});

	const bundlesQuery = useQuery(
		['supplierBundles', activeSupplierId, apiParams],
		() => SupplierService.getSupplierProducts(apiParams)
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
		if (bundlesQuery.isSuccess) {
			const bundles = bundlesQuery.data.products || [];

			dispatch({
				type: PageListAction.setPageListState,
				value: {
					//@ts-ignore
					data: bundles,
					count: bundlesQuery.data.count || 0,
					loaded: true,
				},
			});
		}
		if (bundlesQuery.isError) {
			handleShowErrorNotification('bundleList.loadingError');
		}
	}, [
		bundlesQuery.data,
		bundlesQuery.isSuccess,
		bundlesQuery.isError,
		dispatch,
		handleShowErrorNotification,
	]);

	useDidMountEffect(() => {
		dispatch({
			type: PageListAction.setShouldReload,
			value: true,
		});
	}, [activeSupplierId]);

	useEffect(() => {
		dispatch({
			type: PageListAction.setPageListState,
			value: {
				loading: bundlesQuery.isFetching,
			},
		});
	}, [bundlesQuery.isFetching, dispatch]);

	return (
		<div className="p-3">
			<h1 className={styles.h1Heading}>
				{t({ id: 'warehouseList.overview' })}
			</h1>

			<Overview supplierId={activeSupplierId} />

			<CCard className="m-0 mb-4">
				<h2 className={bundleListStyles.mainHeading}>
					{t({ id: 'warehouseList.heading' })}
				</h2>
				<AdminListPage<BundleListTableRow>
					adminTableSchema={adminTableSchema}
					handlers={handlers}
					state={state}
					pageCount={pageCount}
					pageNumber={pageNumber}
				/>
			</CCard>

			<WarehouseLog supplierId={activeSupplierId} />
		</div>
	);
};

export default WarehouseListPage;
