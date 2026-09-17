import { useCallback, useContext, useEffect, useMemo } from 'react';
import cx from 'classnames';
import { dayjsInstance as dayjs } from 'Services/Date';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { DropdownFilterProps } from 'Components/AdminTable/Filters/Dropdown/interfaces';
import { TableSchema } from 'Hooks/useTableSchema/interfaces';
import { ApiListParam } from 'Services/StockRequest/interfaces';
import { AdminTableFilterType } from 'Components/AdminTable/constants';
import { ModalType } from 'Components/Modal/constants';
import { API_METHOD, PageListAction } from 'Hooks/useAdminTable/constants';
import { Device } from 'Services/DeviceService/constants';
import {
	FILTER_COLUMN_MAP,
	SORTING_COLUMN_MAP,
	STOCK_REQUEST_API,
	STOCK_REQUEST_COLUMN,
	STOCK_REQUEST_DELIVERY_TYPE,
	STOCK_REQUEST_STATE,
} from 'Services/StockRequest/constants';
import {
	convertDeliveryType,
	getCorrespondingApiStates,
} from 'Services/StockRequest/helpers';
import useAdminTable from 'Hooks/useAdminTable';
import useDidMountEffect from 'Hooks/useDidMountEffect';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import useTableSchema from 'Hooks/useTableSchema';
import StockRequestService from 'Services/StockRequest';
import { ModalContext } from 'Components/Modal/context';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { LocalizationContext } from 'Services/LocalizationService';
import AdminListPage from 'Components/AdminListPage';

import {
	STOCK_REQUEST_STATE_CSS,
	STOCK_REQUEST_STATE_LOCALIZATION_MAP,
} from './constants';
import { StockRequestListTableRow } from './interfaces';

import './styles.css';

const StockRequestListPage = () => {
	const { activeSupplierId, vinistoUser } = useContext(AuthenticationContext);
	const { useFormatMessage } = useContext(LocalizationContext);
	const { handleOpenModal } = useContext(ModalContext);

	const t = useFormatMessage();
	const getLocalizedValue = useLocalizedValue();
	const getTableSchema = useTableSchema<StockRequestListTableRow>();
	const { fetchData, handlers, state, pageNumber, pageCount, dispatch } =
		useAdminTable<StockRequestListTableRow>([
			{
				id: STOCK_REQUEST_COLUMN.REQUEST_NUMBER,
				desc: true,
			},
		]);

	const handleOnClickConfirm = useCallback(
		(request: StockRequestListTableRow) => () => {
			handleOpenModal(
				request.isSelfDelivered
					? ModalType.STOCK_REQUEST_CONFIRMATION_SHIPPING
					: ModalType.STOCK_REQUEST_CONFIRMATION_PICKUP,
				{
					stockRequestId: request.id,
					reloadData: () => {
						dispatch({
							type: PageListAction.setShouldReload,
							value: true,
						});
					},
				}
			);
		},
		[handleOpenModal, dispatch]
	);

	const transportTypeFilterOptions: DropdownFilterProps['options'] = useMemo(
		() => [
			[
				String(STOCK_REQUEST_DELIVERY_TYPE.SUPPLIER_DELIVERY),
				`${t({ id: 'stockRequest.list.transportType.supplier' })}`,
			],
			[
				String(STOCK_REQUEST_DELIVERY_TYPE.VINISTO_DELIVERY),
				`${t({ id: 'stockRequest.list.transportType.vinisto' })}`,
			],
		],
		[t]
	);

	const stateFilterOptions: DropdownFilterProps['options'] = useMemo(
		() =>
			[
				STOCK_REQUEST_STATE.SENT,
				STOCK_REQUEST_STATE.CANCELLED,
				STOCK_REQUEST_STATE.CONFIRMED,
				STOCK_REQUEST_STATE.WMS_STOCKED,
			].map((state) => [
				String(state),
				`${t({ id: STOCK_REQUEST_STATE_LOCALIZATION_MAP[state] })}`,
			]),
		[t]
	);

	const tableSchema: TableSchema<StockRequestListTableRow> = [
		{
			header: `${t({ id: 'stockRequest.list.requestId' })}`,
			id: STOCK_REQUEST_COLUMN.REQUEST_NUMBER,
			accessorKey: STOCK_REQUEST_COLUMN.REQUEST_NUMBER,
			devices: [Device.MOBILE, Device.TABLET, Device.DESKTOP],
		},
		{
			header: `${t({ id: 'stockRequest.list.dateIssued' })}`,
			id: STOCK_REQUEST_COLUMN.DATE_ISSUED,
			accessorFn: (row) =>
				dayjs(row.dateIssued).format(`${t({ id: 'dateFormat' })}`),
			devices: [Device.MOBILE, Device.TABLET, Device.DESKTOP],
			meta: {
				filterType: AdminTableFilterType.DATE,
			},
		},
		{
			header: `${t({ id: 'stockRequest.list.transportType' })}`,
			id: STOCK_REQUEST_COLUMN.DELIVERY_TYPE,
			accessorFn: (row) =>
				t({
					id: row.isSelfDelivered
						? 'stockRequest.list.transportType.supplier'
						: 'stockRequest.list.transportType.vinisto',
				}),
			devices: [Device.MOBILE, Device.TABLET, Device.DESKTOP],
			meta: {
				filterType: AdminTableFilterType.DROPDOWN,
				filterOptions: transportTypeFilterOptions,
			},
		},
		{
			header: `${t({ id: 'stockRequest.list.transporter' })}`,
			cell: ({
				cell: {
					row: { original: row },
				},
			}) =>
				row.transporterName ? (
					<>
						{getLocalizedValue(row.transporterName)}
						{row.trackingId && row.trackingUrl && (
							<>
								<br />
								<a href={`//${row.trackingUrl}${row.trackingId}`}>
									{row.trackingId}
								</a>
							</>
						)}
					</>
				) : (
					''
				),
			enableColumnFilter: false,
			enableSorting: false,
			devices: [Device.MOBILE, Device.TABLET, Device.DESKTOP],
			meta: {
				className: 'vinisto-admin-table__header-top',
			},
		},
		{
			header: `${t({ id: 'stockRequest.list.dateStocked' })}`,
			id: STOCK_REQUEST_COLUMN.DATE_STOCKED,
			accessorFn: (row) =>
				row.dateStocked
					? dayjs(row.dateStocked).format(`${t({ id: 'dateFormat' })}`)
					: '',
			devices: [Device.MOBILE, Device.TABLET, Device.DESKTOP],
			meta: {
				filterType: AdminTableFilterType.DATE,
			},
		},
		{
			header: `${t({ id: 'stockRequest.list.state' })}`,
			id: STOCK_REQUEST_COLUMN.STATE,
			accessorKey: 'state',
			cell: ({
				cell: {
					row: { original: row },
				},
			}) => (
				<span className={cx('fw-bold', STOCK_REQUEST_STATE_CSS[row.state])}>
					{t({ id: STOCK_REQUEST_STATE_LOCALIZATION_MAP[row.state] })}
				</span>
			),
			devices: [Device.MOBILE, Device.TABLET, Device.DESKTOP],
			meta: {
				filterType: AdminTableFilterType.DROPDOWN,
				filterOptions: stateFilterOptions,
			},
		},
		{
			header: '',
			id: 'placeholder',
			cell: ({
				cell: {
					row: { original: row },
				},
			}) => (
				<div className="d-flex gap-2 justify-content-end">
					{row.state === STOCK_REQUEST_STATE.SENT && (
						<Button
							className="btn btn-ok"
							onClick={handleOnClickConfirm(row)}
						>
							{t({ id: 'stockRequest.btn.confirmRequest' })}
						</Button>
					)}
					<Link
						to={`/stock-request-detail/${row.id}`}
						className="btn btn-primary"
					>
						{t({ id: 'stockRequest.list.btn.detail' })}
					</Link>
				</div>
			),
			enableColumnFilter: false,
			enableSorting: false,
			devices: [Device.TABLET, Device.DESKTOP],
		},
	];

	const adminTableSchema = getTableSchema(tableSchema);

	useEffect(() => {
		const apiParams: ApiListParam[] = [
			{
				key: 'Limit',
				value: state.limit,
			},
			{
				key: 'Offset',
				value: state.offset,
			},
			{
				key: 'IsSent',
				value: true,
			},
			{
				key: 'SearchSupplierId',
				value: activeSupplierId,
			},
			{
				key: 'UserLoginHash',
				value: vinistoUser?.loginHash ?? '',
			},
		];
		const [sortByColumn] = state.sorting;
		if (Object.hasOwn(SORTING_COLUMN_MAP, sortByColumn?.id)) {
			apiParams.push({
				key: 'SortingColumn',
				value: SORTING_COLUMN_MAP[sortByColumn.id],
			});
			apiParams.push({
				key: 'IsSortingDescending',
				value: sortByColumn.desc,
			});
		}
		state.filters?.forEach((filter) => {
			const filterId = filter.id as keyof typeof FILTER_COLUMN_MAP; // TS needs this to know value below
			switch (filterId) {
				case STOCK_REQUEST_COLUMN.DATE_ISSUED:
				case STOCK_REQUEST_COLUMN.DATE_STOCKED:
					apiParams.push({
						key: FILTER_COLUMN_MAP[filterId],
						value: Number(filter.value),
					});
					break;
				case STOCK_REQUEST_COLUMN.STATE:
					getCorrespondingApiStates(
						filter.value as STOCK_REQUEST_STATE
					).forEach((state) => {
						apiParams.push({
							key: FILTER_COLUMN_MAP[filterId],
							value: state,
						});
					});
					break;
				case STOCK_REQUEST_COLUMN.DELIVERY_TYPE:
					apiParams.push({
						key: FILTER_COLUMN_MAP[filterId],
						value: convertDeliveryType(
							filter.value as STOCK_REQUEST_DELIVERY_TYPE
						),
					});
					break;
				default:
					if (Object.hasOwn(FILTER_COLUMN_MAP, filterId)) {
						apiParams.push({
							key: FILTER_COLUMN_MAP[filterId],
							value: String(filter.value),
						});
					}
					break;
			}
		});

		fetchData(
			STOCK_REQUEST_API,
			apiParams,
			(payload) => {
				if (!Array.isArray(payload.stockingRequests)) return [];
				return payload.stockingRequests.map(StockRequestService.mapApiToModel);
			},
			'stockRequest.list.loadingError',
			API_METHOD.GET
		);
	}, [
		fetchData,
		vinistoUser?.loginHash,
		state.limit,
		state.offset,
		state.sorting,
		state.filters,
		state.shouldReload,
		activeSupplierId,
	]);

	useDidMountEffect(() => {
		dispatch({
			type: PageListAction.setShouldReload,
			value: true,
		});
	}, [activeSupplierId]);

	return (
		<AdminListPage<StockRequestListTableRow>
			adminTableSchema={adminTableSchema}
			handlers={handlers}
			state={state}
			pageCount={pageCount}
			pageNumber={pageNumber}
		/>
	);
};

export default StockRequestListPage;
