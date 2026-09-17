import { useContext } from 'react';
import { get } from 'Helpers/lodash';
import { dayjsInstance as dayjs } from 'Services/Date';
import { Button } from 'react-bootstrap';
import { CellContext } from '@tanstack/react-table';
import useNavigateWithNewtabOption from 'Hooks/useNavigateWithNewtabOption';
import { IPageListTableRow } from 'Hooks/useAdminTable/interfaces';
import { TableSchema } from 'Hooks/useTableSchema/interfaces';
import { AdminTableFilterType } from 'Components/AdminTable/constants';
import { PageListAction } from 'Hooks/useAdminTable/constants';
import {
	CREATE_FEE_RECORDS,
	CREATE_FEE_RECORDS_FROM_ORDER,
} from 'Components/Modal/constants';
import useTableSchema from 'Hooks/useTableSchema';
import { LocalizationContext } from 'Services/LocalizationService';
import { ModalContext } from 'Components/Modal/context';
import AdminListPage from 'Components/AdminListPage';
import { feeRecordTypeTranslationMap } from 'Pages/FeeRecordDetail/constants';
import { AdminTableVariants } from 'Components/AdminTable/interfaces';

import { EMPTY_OID, FeeRecordListTableKeys } from '../FeeRecordList/constants';

import SupplierNameCell from './Components/SupplierNameCell';
import BundleNameCell from './Components/BundleNameCell';
import OrderNumberCell from './Components/OrderNumberCell';
import useFeeRecordNamedList from './useFeeRecordNamedList';

/**
 * Fee-record list that shows supplier / bundle names and order numbers instead
 * of raw ids (displayed as "Provize - NEW beta"). Data fetching lives in
 * `useFeeRecordNamedList`; this component only defines and renders the table.
 *
 * Names/numbers are resolved per-cell on the FE as a stopgap — see
 * docs/backend-fee-records-named-endpoint.md for the backend endpoint that
 * should replace it.
 */
const FeeRecordNamedList = () => {
	const localizationContext = useContext(LocalizationContext);
	const modalContext = useContext(ModalContext);

	const t = localizationContext.useFormatMessage();
	const navigateWithNewtabOption = useNavigateWithNewtabOption();
	const getTableSchema = useTableSchema();

	const { handlers, state, dispatch, pageNumber, pageCount } =
		useFeeRecordNamedList();

	const tableSchema: TableSchema = [
		{
			header: `${t({ id: 'feeRecord.named.supplier.header' })}`,
			id: FeeRecordListTableKeys.SUPPLIER_ID,
			accessorKey: FeeRecordListTableKeys.SUPPLIER_ID,
			cell: (context: CellContext<IPageListTableRow, unknown>) => {
				const supplierId = context.row.original.supplierId as
					| string
					| undefined;
				if (!supplierId) return '';
				return <SupplierNameCell id={supplierId} />;
			},
			size: 150,
			meta: {
				filterType: AdminTableFilterType.SUPPLIER_AUTOCOMPLETE,
			},
		},
		{
			header: `${t({ id: 'feeRecord.named.bundle.header' })}`,
			id: FeeRecordListTableKeys.BUNDLE_ID,
			accessorKey: FeeRecordListTableKeys.BUNDLE_ID,
			cell: (context: CellContext<IPageListTableRow, unknown>) => {
				const bundleId = context.row.original.bundleId as string | undefined;
				if (!bundleId) return '';
				return <BundleNameCell id={bundleId} />;
			},
			size: 250,
			meta: {
				filterType: AdminTableFilterType.BUNDLE_AUTOCOMPLETE,
			},
		},
		{
			header: `${t({ id: 'feeRecord.named.order.header' })}`,
			id: FeeRecordListTableKeys.ORDER_ID,
			accessorKey: FeeRecordListTableKeys.ORDER_ID,
			cell: ({ row }) => {
				const rawOrderId =
					!row.original.orderId || row.original.orderId === EMPTY_OID
						? ''
						: (row.original.orderId as string);
				return (
					<OrderNumberCell
						id={rawOrderId}
						externalOrderId={row.original.externalOrderId as string | undefined}
					/>
				);
			},
			meta: {
				filterType: AdminTableFilterType.ORDER_NUMBER_AUTOCOMPLETE,
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

export default FeeRecordNamedList;
