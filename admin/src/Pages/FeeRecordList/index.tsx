import { useContext, useEffect } from 'react';
import { get } from 'Helpers/lodash';
import { dayjsInstance as dayjs } from 'Services/Date';
import { Button } from 'react-bootstrap';
import useNavigateWithNewtabOption from 'Hooks/useNavigateWithNewtabOption';
import { IPageListTableRow } from 'Hooks/useAdminTable/interfaces';
import { TableSchema } from 'Hooks/useTableSchema/interfaces';
import { AdminTableFilterType } from 'Components/AdminTable/constants';
import { API_METHOD, PageListAction } from 'Hooks/useAdminTable/constants';
import {
	CREATE_FEE_RECORDS,
	CREATE_FEE_RECORDS_FROM_ORDER,
} from 'Components/Modal/constants';
import useAdminTable from 'Hooks/useAdminTable';
import useTableSchema from 'Hooks/useTableSchema';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { LocalizationContext } from 'Services/LocalizationService';
import { ModalContext } from 'Components/Modal/context';
import AdminListPage from 'Components/AdminListPage';
import { RANGE_DATE_FILTER_DELIMITER } from 'Components/AdminTable/Filters/RangeDate/constants';
import { feeRecordTypeTranslationMap } from 'Pages/FeeRecordDetail/constants';
import { AdminTableVariants } from 'Components/AdminTable/interfaces';

import {
	EMPTY_OID,
	FeeRecordListTableKeys,
	FILTER_COLUMN_MAP,
	SORTING_COLUMN_MAP,
} from './constants';

const FeeRecordListPage = () => {
	const authenticationContext = useContext(AuthenticationContext);
	const localizationContext = useContext(LocalizationContext);
	const modalContext = useContext(ModalContext);

	const t = localizationContext.useFormatMessage();
	const navigateWithNewtabOption = useNavigateWithNewtabOption();
	const getTableSchema = useTableSchema();
	const { fetchData, handlers, state, dispatch, pageNumber, pageCount } =
		useAdminTable();

	const tableSchema: TableSchema = [
		{
			header: `${t({ id: 'feeRecord.supplier.header' })}`,
			id: FeeRecordListTableKeys.SUPPLIER_ID,
			accessorKey: FeeRecordListTableKeys.SUPPLIER_ID,
		},
		{
			header: `${t({ id: 'feeRecord.bundle.header' })}`,
			id: FeeRecordListTableKeys.BUNDLE_ID,
			accessorKey: FeeRecordListTableKeys.BUNDLE_ID,
		},
		{
			header: `${t({ id: 'feeRecord.order.label' })}`,
			id: FeeRecordListTableKeys.ORDER_ID,
			accessorKey: FeeRecordListTableKeys.ORDER_ID,
			cell: ({ row }) => {
				const orderId =
					!row.original.orderId || row.original.orderId === EMPTY_OID
						? ''
						: row.original.orderId;
				const externalOrderId = row.original.externalOrderId
					? `${row.original.externalOrderId} (externí č. o.)`
					: '';
				// In theory, feeRecord should have only one id,
				// but in case something unpredictable happens:
				const displayValue = [orderId, externalOrderId]
					.filter(Boolean)
					.join(', ');
				return <div>{displayValue}</div>;
			},
		},
		{
			header: `${t({ id: 'admin.feeRecord.time.label' })}`,
			id: FeeRecordListTableKeys.CREATED_AT,
			accessorKey: FeeRecordListTableKeys.CREATED_AT,
			accessorFn: (row) =>
				dayjs
					.unix(get(row, 'createdAt', 0))
					.format(`${t({ id: 'admin.dateTimeFormat' })}`),
			meta: {
				filterType: AdminTableFilterType.RANGE_DATE,
			},
		},
		{
			header: `${t({ id: 'admin.feeRecord.type.label' })}`,
			id: FeeRecordListTableKeys.TYPE,
			accessorKey: FeeRecordListTableKeys.TYPE,
			meta: {
				filterType: AdminTableFilterType.DROPDOWN,
				dropDownFilterOptions: Object.entries(feeRecordTypeTranslationMap).map(
					([key, value]) => [key, `${t({ id: value })}`]
				),
			},
		},
		{
			header: `${t({ id: 'admin.feeRecord.itemPrice.label' })}`,
			id: FeeRecordListTableKeys.PRICE,
			accessorKey: FeeRecordListTableKeys.PRICE,
			accessorFn: (row) => {
				const { isSupplierDiscount, itemPrice, originalPrice } = row;

				return `${
					isSupplierDiscount
						? Number(itemPrice?.value).toFixed(2)
						: Number(originalPrice?.value).toFixed(2)
				} ${get(itemPrice, 'currency', '')}`;
			},
			enableColumnFilter: false,
		},
		{
			header: `${t({ id: 'admin.feeRecord.isPaidOut.label' })}`,
			id: FeeRecordListTableKeys.IS_PAID_OUT,
			accessorKey: FeeRecordListTableKeys.IS_PAID_OUT,
			cell: (cell) =>
				cell.getValue() ? t({ id: 'admin.yes' }) : t({ id: 'admin.no' }),
			meta: {
				filterType: AdminTableFilterType.YES_NO,
			},
		},
	];

	const adminTableSchema = getTableSchema(tableSchema);

	const handleOnTableRowClick = (
		entity: IPageListTableRow,
		event: React.MouseEvent
	) => navigateWithNewtabOption(`/fee-record-detail/${entity.id}`, event);

	const handleOpenCreateModal = () => {
		modalContext.handleOpenModal(CREATE_FEE_RECORDS, {
			resetFeeRecordList: () => dispatch({ type: PageListAction.reset }),
		});
	};

	const handleOpenCreateFromOrderModal = () => {
		modalContext.handleOpenModal(CREATE_FEE_RECORDS_FROM_ORDER, {
			resetFeeRecordList: () => dispatch({ type: PageListAction.reset }),
		});
	};

	useEffect(() => {
		const apiParams: { key: string; value: any }[] = [
			{ key: 'limit', value: state.limit },
			{ key: 'offset', value: state.offset },
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
		state.filters?.forEach(({ id, value }) => {
			if (
				id === FeeRecordListTableKeys.CREATED_AT &&
				typeof value === 'string'
			) {
				const [dateFrom = '', dateTo = ''] = value.split(
					RANGE_DATE_FILTER_DELIMITER
				);
				apiParams.push({ key: 'TimeFrom', value: dateFrom });
				apiParams.push({ key: 'TimeTo', value: dateTo });
			} else if (Object.hasOwn(FILTER_COLUMN_MAP, id)) {
				apiParams.push({ key: FILTER_COLUMN_MAP[id], value });
			}
		});

		fetchData(
			'supplier-api/fee-records',
			apiParams,
			(payload) => get(payload, 'feeRecords', []) ?? [],
			'admin.feeRecordList.loadingError',
			API_METHOD.GET
		);
	}, [fetchData, state, authenticationContext]);

	return (
		<AdminListPage
			adminTableSchema={adminTableSchema}
			handleOpenCreateModal={handleOpenCreateFromOrderModal}
			btnCreateLabel="admin.feeRecordList.createFeeRecordFromOrder"
			handleOnTableRowClick={handleOnTableRowClick}
			handlers={handlers}
			state={state}
			pageCount={pageCount}
			pageNumber={pageNumber}
			headerContent={
				<div className="d-flex flex-grow-1 justify-content-end">
					<Button
						className="mb-2 me-2"
						onClick={handleOpenCreateModal}
					>
						{t({ id: 'admin.feeRecordList.createFeeRecords' })}
					</Button>
				</div>
			}
			adminTableVariant={AdminTableVariants.DYNAMIC_COLUMNS}
			columnOrder={[
				FeeRecordListTableKeys.SUPPLIER_ID,
				FeeRecordListTableKeys.BUNDLE_ID,
				FeeRecordListTableKeys.ORDER_ID,
				FeeRecordListTableKeys.CREATED_AT,
				FeeRecordListTableKeys.TYPE,
				FeeRecordListTableKeys.PRICE,
				FeeRecordListTableKeys.IS_PAID_OUT,
			]}
		/>
	);
};

export default FeeRecordListPage;
