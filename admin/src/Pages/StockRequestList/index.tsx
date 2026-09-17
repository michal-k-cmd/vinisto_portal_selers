import { FC, useContext, useEffect, useState } from 'react';
import { dayjsInstance as dayjs } from 'Services/Date';
import { useLoaderData } from 'react-router-dom';
import { IPageListTableRow } from 'Hooks/useAdminTable/interfaces';
import { TableSchema } from 'Hooks/useTableSchema/interfaces';
import {
	VinistoHelperDllEnumsStockingRequestDeliveryType,
	VinistoHelperDllEnumsStockingRequestStockingState,
	VinistoStockingRequestDllModelsApiStockingRequestStockingRequest,
} from 'vinisto_api_client/src/api-types/supplier-api';
import { CREATE_REQUEST } from 'Components/Modal/constants';
import { STOCKING_REQUESTS_URI } from 'Services/SupplierService/constants';
import useNavigateWithNewtabOption from 'Hooks/useNavigateWithNewtabOption';
import useAdminTable from 'Hooks/useAdminTable';
import { API_METHOD } from 'Hooks/useAdminTable/constants';
import useTableSchema from 'Hooks/useTableSchema';
import { AdminTableFilterType } from 'Components/AdminTable/constants';
import { StockingRequestService } from 'Services/SupplierService/StockingRequest';
import { ModalContext } from 'Components/Modal/context';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { LocalizationContext } from 'Services/LocalizationService';
import { NotificationsContext } from 'Services/NotificationService';
import AdminListPage from 'Components/AdminListPage';
import StockRequestPrint from 'Components/StockRequestPrint';
import { IBundleListRouteLoader } from 'Pages/BundleList/interfaces';
import { SUPPLIER_FILTER_NAME_MAX_LENGTH } from 'Pages/BundleList/constants';
import { RANGE_DATE_FILTER_DELIMITER } from 'Components/AdminTable/Filters/RangeDate/constants';
import PrinterIcon from 'Components/Icons/Printer';
import sortSuppliersByNameWeb from 'Helpers/sortSuppliersByNameWeb';
import { AdminTableVariants } from 'Components/AdminTable/interfaces';
import { TablePopover } from 'vinisto_ui';

import {
	DATE_RANGE_COLUMNS,
	MAP_DATE_RANGES_TO_API_PARAMS,
	stateTranslationKeys,
	STOCK_REQUEST_FILTER_COLUMN_MAP,
	STOCK_REQUEST_SORTING_COLUMN_MAP,
	StockRequestListTableKeys,
	transportMethodTranslationKeys,
} from './constants';

const StockRequestListPage: FC = () => {
	const authenticationContext = useContext(AuthenticationContext);
	const { loginHash: userLoginHash } = authenticationContext.vinistoUser;

	const localizationContext = useContext(LocalizationContext);
	const modalContext = useContext(ModalContext);
	const notificationsContext = useContext(NotificationsContext);

	const t = localizationContext.useFormatMessage();
	const navigateWithNewtabOption = useNavigateWithNewtabOption();
	const getTableSchema = useTableSchema();

	const { fetchData, handlers, state, pageNumber, pageCount } = useAdminTable();
	const data = useLoaderData() as IBundleListRouteLoader;

	const tableSchema: TableSchema = [
		{
			header: `${t({ id: 'admin.stockRequestList.identifier.label' })}`,
			id: StockRequestListTableKeys.REQUEST_NUMBER,
			accessorKey: StockRequestListTableKeys.REQUEST_NUMBER,
			cell: ({ row }) => {
				if (row.original.adminNote) {
					const name = row.original.requestNumber;
					const note = row.original.adminNote;

					return (
						<TablePopover
							name={name ?? ''}
							note={note}
						/>
					);
				}

				return <div>{row.original.requestNumber}</div>;
			},
		},
		{
			header: `${t({ id: 'admin.stockRequestList.datePosted.label' })}`,
			id: StockRequestListTableKeys.CREATED_AT,
			accessorKey: StockRequestListTableKeys.CREATED_AT,
			accessorFn: (entity: IPageListTableRow) => {
				if (!entity[StockRequestListTableKeys.CREATED_AT]) return '';
				return dayjs
					.unix(entity[StockRequestListTableKeys.CREATED_AT])
					.format(`${t({ id: 'admin.dateFormat' })}`);
			},
			meta: {
				filterType: AdminTableFilterType.RANGE_DATE,
			},
		},
		{
			header: `${t({ id: 'admin.stockRequestList.seller.label' })}`,
			id: StockRequestListTableKeys.SUPPLIER,
			accessorKey: StockRequestListTableKeys.SUPPLIER,
			accessorFn: (entity: IPageListTableRow) => {
				const supplier = entity[StockRequestListTableKeys.SUPPLIER];
				return supplier ? supplier.nameWeb : '';
			},
			meta: {
				filterType: AdminTableFilterType.DROPDOWN,
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
			enableSorting: false,
		},
		{
			header: `${t({ id: 'admin.stockRequestList.transportMethod.label' })}`,
			id: StockRequestListTableKeys.DELIVERY_TYPE,
			accessorKey: StockRequestListTableKeys.DELIVERY_TYPE,
			accessorFn: (entity: IPageListTableRow) => {
				const method: VinistoHelperDllEnumsStockingRequestDeliveryType =
					entity[StockRequestListTableKeys.DELIVERY_TYPE];
				return method ? t({ id: transportMethodTranslationKeys[method] }) : '';
			},
			enableColumnFilter: false,
			enableSorting: false,
		},
		{
			header: `${t({ id: 'admin.stockRequestList.state.label' })}`,
			id: StockRequestListTableKeys.STATE,
			accessorKey: StockRequestListTableKeys.STATE,
			accessorFn: (entity: IPageListTableRow) => {
				const state: VinistoHelperDllEnumsStockingRequestStockingState =
					entity[StockRequestListTableKeys.STATE];
				return state ? t({ id: stateTranslationKeys[state] }) : '';
			},
			meta: {
				filterType: AdminTableFilterType.DROPDOWN,
				dropDownFilterOptions: Object.values(
					VinistoHelperDllEnumsStockingRequestStockingState
				).map((value) => [
					value,
					`${t({
						id: stateTranslationKeys[value],
					})}`,
				]),
			},
			enableSorting: false,
		},
		{
			header: `${t({ id: 'admin.stockRequestList.carrier.label' })}`,
			id: StockRequestListTableKeys.CARRIER,
			accessorKey: StockRequestListTableKeys.CARRIER,
			enableColumnFilter: false,
			enableSorting: false,
		},
		{
			header: `${t({ id: 'admin.stockRequestList.dateUnloading.label' })}`,
			id: StockRequestListTableKeys.DATE_DELIVERY,
			accessorKey: StockRequestListTableKeys.DATE_DELIVERY,
			accessorFn: (entity: IPageListTableRow) => {
				if (!entity[StockRequestListTableKeys.DATE_DELIVERY]) return '';
				return dayjs
					.unix(entity[StockRequestListTableKeys.DATE_DELIVERY])
					.format(`${t({ id: 'admin.dateFormat' })}`);
			},
			meta: {
				filterType: AdminTableFilterType.RANGE_DATE,
			},
		},
		{
			header: `${t({ id: 'admin.stockRequestList.dateReceived.label' })}`,
			id: StockRequestListTableKeys.DATE_STOCKING,
			accessorKey: StockRequestListTableKeys.DATE_STOCKING,
			accessorFn: (entity: IPageListTableRow) => {
				if (!entity[StockRequestListTableKeys.DATE_STOCKING]) return '';
				return dayjs
					.unix(entity[StockRequestListTableKeys.DATE_STOCKING])
					.format(`${t({ id: 'admin.dateFormat' })}`);
			},
			meta: {
				filterType: AdminTableFilterType.RANGE_DATE,
			},
		},
		{
			header: `${t({ id: 'admin.stockRequestList.print.label' })}`,
			id: StockRequestListTableKeys.PRINT,
			cell: ({
				row: {
					id,
					original: { stockingState },
				},
			}) => {
				if (
					stockingState ===
					VinistoHelperDllEnumsStockingRequestStockingState.CREATED
				)
					return;
				return (
					<button
						className="btn p-0 border-0"
						onClick={(e) => {
							e.stopPropagation();
							handleOnPrint(id);
						}}
					>
						<PrinterIcon />
					</button>
				);
			},
			enableColumnFilter: false,
			enableSorting: false,
		},
	];

	const adminTableSchema = getTableSchema(tableSchema);

	const handleOnTableRowClick = (
		entity: IPageListTableRow,
		event: React.MouseEvent
	) => navigateWithNewtabOption(`/stock-request-detail/${entity.id}`, event);

	const handleOnClickCreate = () => {
		modalContext.handleOpenModal(CREATE_REQUEST);
	};

	const [stockRequestToPrint, setStockRequestToPrint] =
		useState<VinistoStockingRequestDllModelsApiStockingRequestStockingRequest>();
	const handleOnPrint = (stockRequestId: string) => {
		StockingRequestService.getById(stockRequestId, [
			{
				key: 'UserLoginHash',
				value: userLoginHash,
			},
		]).then((res) => {
			if (!res.stockingRequest) {
				notificationsContext.handleShowErrorNotification(
					'admin.stockRequestDetail.error'
				);
				return;
			}

			setStockRequestToPrint(res.stockingRequest);
		});
	};

	useEffect(() => {
		if (stockRequestToPrint === undefined) return;
		window.print();
	}, [stockRequestToPrint]);

	useEffect(() => {
		const apiParams: { key: string; value: any }[] = [
			{ key: 'userLoginHash', value: userLoginHash },
			{ key: 'Limit', value: state.limit },
			{ key: 'Offset', value: state.offset },
		];

		const [sortByColumn] = state.sorting;

		if (Object.hasOwn(STOCK_REQUEST_SORTING_COLUMN_MAP, sortByColumn?.id)) {
			apiParams.push({
				key: 'SortingColumn',
				value: STOCK_REQUEST_SORTING_COLUMN_MAP[sortByColumn.id],
			});
			apiParams.push({ key: 'IsSortingDescending', value: sortByColumn.desc });
		}

		state.filters?.forEach((filter) => {
			const { id, value } = filter;
			if (DATE_RANGE_COLUMNS.includes(id) && typeof value === 'string') {
				const [dateFrom = '', dateTo = ''] = value.split(
					RANGE_DATE_FILTER_DELIMITER
				);
				apiParams.push({
					key: MAP_DATE_RANGES_TO_API_PARAMS[id].FROM,
					value: dateFrom,
				});
				apiParams.push({
					key: MAP_DATE_RANGES_TO_API_PARAMS[id].TO,
					value: dateTo,
				});
			} else if (Object.hasOwn(STOCK_REQUEST_FILTER_COLUMN_MAP, filter.id)) {
				apiParams.push({
					key: STOCK_REQUEST_FILTER_COLUMN_MAP[filter.id],
					value: filter.value,
				});
			}
		});

		fetchData(
			STOCKING_REQUESTS_URI,
			apiParams,
			(payload) => payload.stockingRequests ?? [],
			'admin.stockRequestList.loadingError',
			API_METHOD.GET
		);
	}, [fetchData, userLoginHash, state]);

	return (
		<>
			<AdminListPage
				className="d-print-none"
				adminTableSchema={adminTableSchema}
				handleOpenCreateModal={handleOnClickCreate}
				btnCreateLabel="admin.stockRequestList.stockRequestCreate.label"
				handleOnTableRowClick={handleOnTableRowClick}
				handlers={handlers}
				state={state}
				pageCount={pageCount}
				pageNumber={pageNumber}
				adminTableVariant={AdminTableVariants.DYNAMIC_COLUMNS}
				columnOrder={[
					StockRequestListTableKeys.REQUEST_NUMBER,
					StockRequestListTableKeys.CREATED_AT,
					StockRequestListTableKeys.SUPPLIER,
					StockRequestListTableKeys.DELIVERY_TYPE,
					StockRequestListTableKeys.STATE,
					StockRequestListTableKeys.CARRIER,
					StockRequestListTableKeys.DATE_DELIVERY,
					StockRequestListTableKeys.DATE_STOCKING,
					StockRequestListTableKeys.PRINT,
				]}
			/>
			{stockRequestToPrint !== undefined && (
				<StockRequestPrint stockRequest={stockRequestToPrint} />
			)}
		</>
	);
};

export default StockRequestListPage;
