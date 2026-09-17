import { useCallback, useContext, useEffect } from 'react';
import { CellContext } from '@tanstack/react-table';
import { get, head } from 'lodash-es';
import { dayjsInstance as dayjs } from 'Services/Date';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { PageListTableRow } from 'Hooks/useAdminTable/interfaces';
import { TableSchema } from 'Hooks/useTableSchema/interfaces';
import { ModalType } from 'Components/Modal/constants';
import { API_METHOD, PageListAction } from 'Hooks/useAdminTable/constants';
import {
	BILLING_NUMBER,
	BILLING_PERIOD,
	CREATION_DATE,
	LIST_API_ENDPOINT,
	SORTING_COLUMN_MAP,
	STATE,
	TOTAL_PRICE,
} from 'Pages/BillingList/constants';
import { BillingState, TPdfType } from 'Services/BillingService/constants';
import { Device } from 'Services/DeviceService/constants';
import Config from 'Config';
import useAdminTable from 'Hooks/useAdminTable';
import useDidMountEffect from 'Hooks/useDidMountEffect';
import useTableSchema from 'Hooks/useTableSchema';
import { ModalContext } from 'Components/Modal/context';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { LocalizationContext } from 'Services/LocalizationService';
import AdminListPage from 'Components/AdminListPage';

import './styles.css';

/**
 * @description Component Billing List Page
 */
const BillingListPage = () => {
	const authenticationContext = useContext(AuthenticationContext);
	const localizationContext = useContext(LocalizationContext);
	const modalContext = useContext(ModalContext);

	const t = localizationContext.useFormatMessage();
	const navigate = useNavigate();
	const getTableSchema = useTableSchema();

	const { fetchData, handlers, state, pageNumber, pageCount, dispatch } =
		useAdminTable([
			{
				id: CREATION_DATE,
				desc: true,
			},
		]);

	const userLoginHash = authenticationContext?.vinistoUser?.loginHash ?? '';

	const handleOpenModal = () => {
		modalContext.handleOpenModal(ModalType.BILLING_QUOTE);
	};

	const handleOpenDetail = useCallback(
		(id: string) => () => {
			navigate(`/billing/${id}`);
		},
		[navigate]
	);

	const cellDate = (table: CellContext<PageListTableRow, unknown>) => {
		return dayjs(table.row.original.createdAt * 1000).format(
			`${t({ id: 'dateFormat' })}`
		);
	};

	const cellTotalSum = (table: CellContext<PageListTableRow, unknown>) => {
		return <span>{table.row.original.totalSum.toFixed(2)} Kč</span>;
	};

	const cellTimeRange = (table: CellContext<PageListTableRow, unknown>) => {
		const from = dayjs.unix(table.row.original.timeFrom);
		const to = dayjs.unix(table.row.original.timeTo);
		const fromFormat =
			from.month() === to.month() ? 'dateTimeDay' : 'dateTimeDayMonth';
		return `${from.format(`${t({ id: fromFormat })}`)} - ${to.format(
			`${t({ id: 'dateFormat' })}`
		)}`;
	};

	const cellStatus = (table: CellContext<PageListTableRow, unknown>) => {
		return (
			<span
				className={`vinisto-admin-billing-status ${table.row.original.state}`}
			>
				{t({ id: `admin.billing.status.${table.row.original.state}` })}
			</span>
		);
	};

	const cellDocuments = (table: CellContext<PageListTableRow, unknown>) => {
		const billingPdf = table.row.original.pdf;

		if (billingPdf === null) return;

		return (
			<div className="d-flex">
				<button
					onClick={() => {
						const searchParams = new URLSearchParams([
							['UserLoginHash', userLoginHash],
							['PdfType', TPdfType.BILLING],
						]);
						const url = new URL(
							`${Config.apiUrl}order-api/billings/${
								table.row.original.id
							}/DownloadPdf?${String(searchParams)}`
						);
						return window.open(url);
					}}
					className="vinisto-admin-billing-table-icon"
				>
					<img
						src="/assets/images/pdf.svg"
						alt="PDF"
					/>
				</button>
				<button
					onClick={() => {
						const searchParams = new URLSearchParams([
							['UserLoginHash', userLoginHash],
						]);
						const url = new URL(
							`${Config.apiUrl}order-api/billings/${
								table.row.original.id
							}/GenerateXls?${String(searchParams)}`
						);
						return window.open(url);
					}}
					className="vinisto-admin-billing-table-icon"
				>
					<img
						src="/assets/images/xls.svg"
						alt="XLS"
					/>
				</button>
			</div>
		);
	};

	const cellInvoice = (table: CellContext<PageListTableRow, unknown>) => {
		const status = table.row.original.state as string;
		const invoiceFile = table.row.original.invoicePdf;

		if (status === BillingState.IN_ISSUE || !invoiceFile) return;

		return (
			<button
				onClick={() => {
					const searchParams = new URLSearchParams([
						['UserLoginHash', userLoginHash],
						['PdfType', TPdfType.INVOICE],
					]);
					const url = new URL(
						`${Config.apiUrl}order-api/billings/${
							table.row.original.id
						}/DownloadPdf?${String(searchParams)}`
					);
					return window.open(url);
				}}
				className="vinisto-admin-billing-table-icon"
			>
				<img
					src="/assets/images/pdf.svg"
					alt="PDF"
				/>
			</button>
		);
	};

	const cellActionButtons = (table: CellContext<PageListTableRow, unknown>) => {
		return (
			<div className="vinisto-buttons-gap">
				<Button
					size="sm"
					className="vinisto-admin-billing-action-btn"
					onClick={() => handleOpenModal()}
				>
					{t({ id: 'admin.billing.billingQuote' })}
				</Button>
				<Button
					size="sm"
					className="vinisto-admin-billing-action-btn"
					onClick={handleOpenDetail(table.row.original.id)}
				>
					{t({ id: 'admin.billing.billingDetail' })}
				</Button>
			</div>
		);
	};

	const tableSchema: TableSchema = [
		{
			header: `${t({ id: 'admin.billing.number' })}`,
			accessorKey: BILLING_NUMBER,
			enableColumnFilter: false,
			enableSorting: true,
			devices: [Device.MOBILE, Device.TABLET, Device.DESKTOP],
		},
		{
			header: `${t({ id: 'admin.billing.timeRange' })}`,
			accessorKey: BILLING_PERIOD,
			cell: cellTimeRange,
			enableColumnFilter: false,
			enableSorting: true,
			devices: [Device.MOBILE, Device.TABLET, Device.DESKTOP],
		},
		{
			header: `${t({ id: 'admin.billing.date' })}`,
			accessorKey: CREATION_DATE,
			cell: cellDate,
			enableColumnFilter: false,
			enableSorting: true,
			devices: [Device.MOBILE, Device.TABLET, Device.DESKTOP],
		},
		{
			header: `${t({ id: 'admin.billing.sumTotal' })}`,
			accessorKey: TOTAL_PRICE,
			cell: cellTotalSum,
			enableColumnFilter: false,
			enableSorting: true,
			devices: [Device.MOBILE, Device.TABLET, Device.DESKTOP],
		},
		{
			header: `${t({ id: 'admin.billing.status' })}`,
			accessorKey: STATE,
			cell: cellStatus,
			enableColumnFilter: false,
			enableSorting: true,
			devices: [Device.MOBILE, Device.TABLET, Device.DESKTOP],
		},
		{
			header: `${t({ id: 'admin.billing.billings' })}`,
			cell: cellDocuments,
			enableColumnFilter: false,
			enableSorting: false,
			devices: [Device.MOBILE, Device.TABLET, Device.DESKTOP],
		},
		{
			header: `${t({ id: 'admin.billing.invoice' })}`,
			cell: cellInvoice,
			accessorKey: 'invoice',
			enableColumnFilter: false,
			enableSorting: false,
			devices: [Device.MOBILE, Device.TABLET, Device.DESKTOP],
		},
		{
			header: '',
			id: 'action',
			cell: cellActionButtons,
			devices: [Device.MOBILE, Device.TABLET, Device.DESKTOP],
		},
	];

	const adminTableSchema = getTableSchema(tableSchema);

	useEffect(() => {
		const apiParams: { key: string; value: any }[] = [
			{ key: 'Limit', value: state.limit },
			{ key: 'Offset', value: state.offset },
			{ key: 'UserLoginHash', value: userLoginHash },
			{ key: 'SupplierId', value: authenticationContext.activeSupplierId },
		];

		const sortByColumn = head(state.sorting);
		if (sortByColumn?.id) {
			apiParams.push({
				key: 'SortingColumn',
				value:
					SORTING_COLUMN_MAP[
						sortByColumn?.id as keyof typeof SORTING_COLUMN_MAP
					],
			});
			apiParams.push({ key: 'IsSortingDescending', value: sortByColumn.desc });
		}

		fetchData(
			LIST_API_ENDPOINT,
			apiParams,
			(payload) => get(payload, 'billings', []) ?? [],
			'admin.billing.loadingError',
			API_METHOD.GET
		);
	}, [
		fetchData,
		state.limit,
		state.offset,
		state.sorting,
		state.shouldReload,
		authenticationContext.activeSupplierId,
		userLoginHash,
	]);

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

export default BillingListPage;
