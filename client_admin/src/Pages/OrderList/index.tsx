import { useCallback, useContext, useEffect } from 'react';
import { CellContext } from '@tanstack/react-table';
import { head } from 'lodash-es';
import { dayjsInstance as dayjs } from 'Services/Date';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { PageListTableRow } from 'Hooks/useAdminTable/interfaces';
import { TableSchema } from 'Hooks/useTableSchema/interfaces';
import {
	IAIPRequestQueryOptions,
	IAPIOrdersListResponse,
	QueryParamsKeys,
} from 'Services/OrderService/interfaces';
import { API_METHOD, PageListAction } from 'Hooks/useAdminTable/constants';
import { Device } from 'Services/DeviceService/constants';
import {
	DATE_COLUMN,
	LIST_API_ENDPOINT,
	PRICE_COLUMN,
	SORTING_COLUMN_MAP,
} from 'Services/OrderService/constants';
import useAdminTable from 'Hooks/useAdminTable';
import useDidMountEffect from 'Hooks/useDidMountEffect';
import useTableSchema from 'Hooks/useTableSchema';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { LocalizationContext } from 'Services/LocalizationService';
import { mapApiOrdersList } from 'Services/OrderService/mapper';
import AdminListPage from 'Components/AdminListPage';

const OrderListPage = () => {
	const authenticationContext = useContext(AuthenticationContext);
	const localizationContext = useContext(LocalizationContext);

	const t = localizationContext.useFormatMessage();
	const navigate = useNavigate();
	const getTableSchema = useTableSchema();

	const { fetchData, handlers, state, pageNumber, pageCount, dispatch } =
		useAdminTable([
			{
				id: DATE_COLUMN,
				desc: true,
			},
		]);

	const userLoginHash = authenticationContext?.vinistoUser?.loginHash || '';

	const handleOpenDetail = useCallback(
		(id: string) => () => {
			navigate(`/order/${id}`);
		},
		[navigate]
	);

	const cellDate = (table: CellContext<PageListTableRow, unknown>) => {
		const date = dayjs(table.row.original.date);
		return `${date.format('D. M. YYYY')}`;
	};

	const cellStatus = (table: CellContext<PageListTableRow, unknown>) => {
		const states = table.row.original.state.split(', ');

		return states
			?.map((state: string) => {
				return t({ id: `admin.orders.status.${state}` });
			})
			.join(', ');
	};

	const cellTotalSum = (table: CellContext<PageListTableRow, unknown>) => {
		return <span>{table.row.original.orderPriceWithVat?.toFixed(2)} Kč</span>;
	};

	const cellActionButtons = (table: CellContext<PageListTableRow, unknown>) => {
		return (
			<Button
				size="sm"
				className="vinisto-admin-order-action-btn"
				onClick={handleOpenDetail(table.row.original.id)}
			>
				{t({ id: 'admin.orders.orderDetail' })}
			</Button>
		);
	};

	const tableSchema: TableSchema = [
		{
			id: 'orderNumber',
			header: `${t({ id: 'admin.orders.orderNumber' })}`,
			accessorKey: 'orderNumber',
			enableColumnFilter: false,
			enableSorting: false,
			devices: [Device.DESKTOP, Device.TABLET, Device.MOBILE],
		},
		{
			id: DATE_COLUMN,
			header: `${t({ id: 'admin.orders.orderDate' })}`,
			accessorKey: 'date',
			cell: cellDate,
			enableColumnFilter: false,
			enableSorting: true,
			devices: [Device.DESKTOP, Device.TABLET, Device.MOBILE],
		},
		{
			id: 'order_status',
			header: `${t({ id: 'admin.orders.orderStatus' })}`,
			accessorKey: 'order_status',
			cell: cellStatus,
			enableColumnFilter: false,
			enableSorting: false,
			devices: [Device.DESKTOP, Device.TABLET, Device.MOBILE],
		},
		{
			id: PRICE_COLUMN,
			header: `${t({ id: 'admin.orders.totalPrice' })}`,
			accessorKey: 'orderPriceWithVat',
			cell: cellTotalSum,
			enableColumnFilter: false,
			enableSorting: false,
			devices: [Device.DESKTOP, Device.TABLET, Device.MOBILE],
		},
		{
			id: 'action',
			header: '',
			cell: cellActionButtons,
			devices: [Device.DESKTOP, Device.TABLET, Device.MOBILE],
		},
	];

	const adminTableSchema = getTableSchema(tableSchema);

	// TODO: Endpoint needs to be changed as it becomes available
	useEffect(() => {
		// Do not trigger fetch if unauthenticated
		if (userLoginHash === '') return;

		const apiParams: IAIPRequestQueryOptions = [
			{
				key: QueryParamsKeys.Limit,
				value: state.limit,
			},
			{
				key: QueryParamsKeys.Offset,
				value: state.offset,
			},
			{
				key: QueryParamsKeys.UserLoginHash,
				value: userLoginHash,
			},
			// TODO: add SupplierId once implemented on backend
		];

		const sortByColumn = head(state.sorting);
		if (sortByColumn?.id) {
			apiParams.push({
				key: QueryParamsKeys.SortingColumn,
				value:
					SORTING_COLUMN_MAP[
						sortByColumn?.id as keyof typeof SORTING_COLUMN_MAP
					],
			});
			apiParams.push({
				key: QueryParamsKeys.IsSortingDescending,
				value: String(sortByColumn.desc),
			});
		}

		fetchData(
			LIST_API_ENDPOINT,
			apiParams,
			(payload) => mapApiOrdersList(payload as IAPIOrdersListResponse),
			'orderList.loadingError',
			API_METHOD.GET
		);
	}, [userLoginHash, state.sorting, state.limit, state.offset, fetchData]); // Also triggers refetch page change

	useDidMountEffect(() => {
		dispatch({
			type: PageListAction.setShouldReload,
			value: true,
		});
	}, [authenticationContext.activeSupplierId]);

	return (
		<AdminListPage
			adminTableSchema={adminTableSchema}
			handlers={handlers}
			state={state}
			pageCount={pageCount}
			pageNumber={pageNumber}
		/>
	);
};

export default OrderListPage;
