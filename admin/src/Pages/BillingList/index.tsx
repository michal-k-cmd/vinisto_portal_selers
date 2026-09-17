import { useCallback, useContext, useEffect } from 'react';
import { dayjsInstance as dayjs } from 'Services/Date';
import { Button } from 'react-bootstrap';
import { TableSchema } from 'Hooks/useTableSchema/interfaces';
import { AdminTableFilterType } from 'Components/AdminTable/constants';
import { API_METHOD } from 'Hooks/useAdminTable/constants';
import useAdminTable from 'Hooks/useAdminTable';
import useTableSchema from 'Hooks/useTableSchema';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { LocalizationContext } from 'Services/LocalizationService';
import AdminListPage from 'Components/AdminListPage';
import {
	BILLING_URI,
	BillingState,
	TPdfType,
} from 'Services/OrderService/constants';
import Config from 'Config';
import { useNavigate } from 'react-router-dom';
import BillingService from 'Services/OrderService/Billing';
import {
	getSecondsString,
	getSecondsStringOfTomorrow,
} from 'Components/AdminTable/Filters/Date/helpers';
import {
	VinistoHelperDllEnumsCurrency,
	VinistoOrderDllModelsApiBillingBilling,
} from 'vinisto_api_client/src/api-types/order-api/';
import { RANGE_DATE_FILTER_DELIMITER } from 'Components/AdminTable/Filters/RangeDate/constants';
import { AdminTableVariants } from 'Components/AdminTable/interfaces';
import { getLocalizedPrice } from 'vinisto_shared/src/price/get-localized-price';

import { BillingListTableRow } from './interfaces';
import {
	BillingListTableKeys,
	DEFAULT_SORT,
	SORTING_COLUMN_MAP,
} from './constants';

import './styles.css';

const BillingListPage = () => {
	const localizationContext = useContext(LocalizationContext);
	const authenticationContext = useContext(AuthenticationContext);
	const navigate = useNavigate();

	const t = localizationContext.useFormatMessage();
	const getTableSchema = useTableSchema<BillingListTableRow>();
	const { fetchData, handlers, state, pageNumber, pageCount } =
		useAdminTable<BillingListTableRow>(DEFAULT_SORT);

	const userLoginHash = authenticationContext?.vinistoUser?.loginHash ?? '';

	const handleOpenDetail = useCallback(
		(id: string) => () => {
			navigate(`/billing-detail/${id}`);
		},
		[navigate]
	);

	const handleOpenFeeRecords =
		(billingDate: Date, supplierId: string) => () => {
			const filterStartDate: Date = new Date(
				billingDate.getFullYear(),
				billingDate.getMonth() - 1,
				1
			);
			const filterStartDateSeconds = getSecondsString(filterStartDate);
			const filterEndDate: Date = new Date(
				billingDate.getFullYear(),
				billingDate.getMonth(),
				0
			);
			const filterEndDateSeconds = getSecondsStringOfTomorrow(filterEndDate);

			navigate(
				`/fee-record-list?filter=time,${filterStartDateSeconds}:${filterEndDateSeconds},supplierId,${supplierId}`
			);
		};

	const handleDownloadXls = (billingId: string) => () => {
		const searchParams = new URLSearchParams([
			['UserLoginHash', userLoginHash],
		]);
		const url = new URL(
			`${Config.apiUrl}order-api/billings/${billingId}/GenerateXls?${String(
				searchParams
			)}`
		);
		return window.open(url);
	};

	const handleDownloadDpf = (billingId: string, pdfType: TPdfType) => () => {
		const searchParams = new URLSearchParams([
			['UserLoginHash', userLoginHash],
			['PdfType', pdfType],
		]);
		const url = new URL(
			`${Config.apiUrl}order-api/billings/${billingId}/DownloadPdf?${String(
				searchParams
			)}`
		);
		return window.open(url);
	};

	const tableSchema: TableSchema<BillingListTableRow> = [
		{
			header: `${t({ id: 'admin.billing.number' })}`,
			id: BillingListTableKeys.BILLING_NUMBER,
			accessorKey: BillingListTableKeys.BILLING_NUMBER,
		},
		{
			header: `${t({ id: 'admin.billing.supplierName' })}`,
			id: BillingListTableKeys.SUPPLIER_NAME,
			accessorKey: BillingListTableKeys.SUPPLIER_NAME,
		},
		{
			header: `${t({ id: 'admin.billing.date' })}`,
			id: BillingListTableKeys.CREATED_AT,
			accessorKey: BillingListTableKeys.CREATED_AT,
			accessorFn: (row) => {
				return dayjs(row.createdAt).format(`${t({ id: 'admin.dateFormat' })}`);
			},
			meta: {
				filterType: AdminTableFilterType.RANGE_DATE,
			},
		},
		{
			header: `${t({ id: 'admin.billing.sumTotal' })}`,
			id: BillingListTableKeys.TOTAL_PRICE,
			accessorKey: BillingListTableKeys.TOTAL_PRICE,
			accessorFn: (row) => {
				return getLocalizedPrice({
					price: row.totalSum ?? 0,
					currency: VinistoHelperDllEnumsCurrency.CZK,
					decimalPlaces: 2,
				});
			},
			enableColumnFilter: false,
		},
		{
			header: `${t({ id: 'admin.billing.status' })}`,
			id: BillingListTableKeys.STATE,
			accessorKey: BillingListTableKeys.STATE,
			enableColumnFilter: false,
			cell: (table) => {
				return (
					<span
						className={`vinisto-admin-billing-status ${table.row.original.state}`}
					>
						{t({ id: `admin.billing.status.${table.row.original.state}` })}
					</span>
				);
			},
		},
		{
			header: `${t({ id: 'admin.billing.billings' })}`,
			id: BillingListTableKeys.BILLING,
			enableColumnFilter: false,
			cell: (table) => {
				const billingPdf = table.row.original.pdf;

				if (billingPdf === null) return;
				return (
					<div className="d-flex">
						<button
							onClick={handleDownloadDpf(
								table.row.original.id,
								TPdfType.BILLING
							)}
							className="vinisto-admin-billing-table-icon"
						>
							<img
								src="/assets/images/pdf.svg"
								alt="PDF"
							/>
						</button>
						<button
							onClick={handleDownloadXls(table.row.original.id)}
							className="vinisto-admin-billing-table-icon"
						>
							<img
								src="/assets/images/xls.svg"
								alt="XLS"
							/>
						</button>
					</div>
				);
			},
		},
		{
			header: `${t({ id: 'admin.billing.Invoice' })}`,
			id: BillingListTableKeys.INVOICE,
			cell: (table) => {
				const status = table.row.original.state as string;
				const invoiceFile = table.row.original.invoicePdf;

				if (status === BillingState.IN_ISSUE || !invoiceFile) return;

				return (
					<button
						onClick={handleDownloadDpf(table.row.original.id, TPdfType.INVOICE)}
						className="vinisto-admin-billing-table-icon"
					>
						<img
							src="/assets/images/pdf.svg"
							alt="PDF"
						/>
					</button>
				);
			},
			enableColumnFilter: false,
		},
		{
			header: `${t({ id: 'admin.billing.akce' })}`,
			id: BillingListTableKeys.BUTTON,
			enableColumnFilter: false,
			enableSorting: false,
			cell: (table) => {
				const billingDate = table.row.original.createdAt;
				const supplierId = table.row.original.supplierId;

				return (
					<div className="d-flex gap-2 text-end flex-nowrap">
						<Button onClick={handleOpenDetail(table.row.original.id)}>
							{t({ id: 'admin.billing.billingDetail' })}
						</Button>
						<Button onClick={handleOpenFeeRecords(billingDate, supplierId)}>
							{t({ id: 'admin.billing.navigateFeeRecords' })}
						</Button>
					</div>
				);
			},
		},
	];

	const adminTableSchema = getTableSchema(tableSchema);

	useEffect(() => {
		const apiParams: { key: string; value: any }[] = [
			{ key: 'Limit', value: state.limit },
			{ key: 'Offset', value: state.offset },
			{
				key: 'UserLoginHash',
				value: authenticationContext.vinistoUser?.loginHash,
			},
		];
		const [sortByColumn] = state.sorting;

		if (Object.hasOwn(SORTING_COLUMN_MAP, sortByColumn?.id)) {
			apiParams.push({
				key: 'SortingColumn',
				value: SORTING_COLUMN_MAP[sortByColumn.id],
			});
			apiParams.push({ key: 'IsSortingDescending', value: sortByColumn.desc });
		}
		state.filters?.forEach((filter) => {
			if (
				filter.id === BillingListTableKeys.BILLING_NUMBER &&
				typeof filter.value === 'string' &&
				filter.value.trim()
			) {
				apiParams.push({
					key: 'BillingNumber',
					value: filter.value.trim(),
				});
			}
			if (filter.id === BillingListTableKeys.SUPPLIER_NAME) {
				apiParams.push({
					key: BillingListTableKeys.SUPPLIER_NAME,
					value: filter.value,
				});
			}
			if (filter.id === BillingListTableKeys.CREATED_AT) {
				if (typeof filter.value === 'string') {
					const dateFrom =
						filter.value.split(RANGE_DATE_FILTER_DELIMITER)[0] ?? '';
					const dateTo =
						filter.value.split(RANGE_DATE_FILTER_DELIMITER)[1] ?? '';
					apiParams.push({ key: 'TimeFrom', value: dateFrom });
					apiParams.push({ key: 'TimeTo', value: dateTo });
				}
			}
		});
		fetchData(
			BILLING_URI,
			apiParams,
			(payload) =>
				Array.isArray(payload?.billings)
					? payload.billings.map(
							(billing: VinistoOrderDllModelsApiBillingBilling) =>
								BillingService.mapApiToEntity(billing)
					  )
					: [],
			'admin.billing.loadingError',
			API_METHOD.GET
		);
	}, [fetchData, state]);

	return (
		<AdminListPage<BillingListTableRow>
			adminTableSchema={adminTableSchema}
			handleOnTableRowClick={() => undefined}
			handlers={{
				...handlers,
			}}
			state={state}
			pageCount={pageCount}
			pageNumber={pageNumber}
			adminTableVariant={AdminTableVariants.DYNAMIC_COLUMNS}
			columnOrder={[
				BillingListTableKeys.BILLING_NUMBER,
				BillingListTableKeys.SUPPLIER_NAME,
				BillingListTableKeys.CREATED_AT,
				BillingListTableKeys.TOTAL_PRICE,
				BillingListTableKeys.STATE,
				BillingListTableKeys.BILLING,
				BillingListTableKeys.INVOICE,
				BillingListTableKeys.BUTTON,
			]}
		/>
	);
};

export default BillingListPage;
