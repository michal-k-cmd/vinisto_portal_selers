import { Column, ColumnDef, HeaderContext, Row } from '@tanstack/react-table';
import AdminTable from 'Components/AdminTable';
import { AdminTableVariants } from 'Components/AdminTable/interfaces';
import Detail from 'Components/Detail';
import useAdminTable from 'Hooks/useAdminTable';
import { LocalizationContext } from 'Services/LocalizationService';
import { Dayjs } from 'dayjs';
import { useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';

import styles from './styles.module.css';

type UserOrderDiscountCoupon = {
	id: string;
	code: string;
};

export type UserOrdersTableData = {
	id: string;
	number: string;
	dateCreated: Dayjs;
	value: number;
	itemCount: number;
	discountCoupons: UserOrderDiscountCoupon[];
	campaign: string;
};

type UserOrdersTableProps = {
	data: UserOrdersTableData[];
};

type UserOrdersTableCell = {
	row: Row<UserOrdersTableData>;
	column: Column<UserOrdersTableData, unknown>;
};

const UserOrdersTable = ({ data }: UserOrdersTableProps) => {
	const { handlers } = useAdminTable();
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();
	const activeLanguage = localizationContext.activeLanguage;

	const adminTableSchema: ColumnDef<UserOrdersTableData>[] = useMemo(
		(): ColumnDef<UserOrdersTableData>[] => [
			{
				header: `${t({ id: 'userOrdersTable.orderNumber' })}`,
				accessorKey: 'number',
				cell: ({ row }: UserOrdersTableCell) => (
					<Link to={`/order-detail/${row.original.id}`}>
						{row.original.number}
					</Link>
				),
				size: 250,
			},
			{
				header: `${t({ id: 'userOrdersTable.orderDateCreated' })}`,
				accessorKey: 'dateCreated',
				cell: ({ row }: UserOrdersTableCell) => (
					<div>{row.original.dateCreated.format('DD. MM. YYYY HH:mm:ss')}</div>
				),

				size: 250,
				enableColumnFilter: false,
				footer: () => (
					<div className={styles.sumText}>
						{t({ id: 'userOrdersTable.orderValueSum' })}
					</div>
				),
			},
			{
				header: `${t({ id: 'userOrdersTable.orderValue' })}`,
				accessorKey: 'value',
				cell: ({ row }: UserOrdersTableCell) => (
					<div>
						{row.original.value} {t({ id: 'currency' })}
					</div>
				),
				size: 250,
				enableColumnFilter: false,
				footer: (context: HeaderContext<UserOrdersTableData, unknown>) => (
					<div>
						{context.table
							.getFilteredRowModel()
							.rows.reduce(
								(total, row) => total + row.getValue<number>('value'),
								0
							)
							.toLocaleString(activeLanguage, {
								maximumFractionDigits: 2,
							})}{' '}
						{t({ id: 'currency' })}
					</div>
				),
			},
			{
				header: `${t({ id: 'userOrdersTable.orderItemCount' })}`,
				accessorKey: 'itemCount',
				size: 250,
				enableColumnFilter: false,
				footer: (context: HeaderContext<UserOrdersTableData, unknown>) =>
					context.table
						.getFilteredRowModel()
						.rows.reduce(
							(total, row) => total + row.getValue<number>('itemCount'),
							0
						),
			},
			{
				header: `${t({ id: 'userOrdersTable.orderDiscountCoupons' })}`,
				accessorKey: 'discountCoupons',
				cell: ({ row }: UserOrdersTableCell) => {
					return (
						<div>
							{row.original.discountCoupons.map((coupon) => {
								return (
									<Link
										key={coupon.id}
										to={`/discount-coupon-detail/${coupon.id}`}
									>
										{coupon.code}
									</Link>
								);
							})}
						</div>
					);
				},
				size: 250,
				enableColumnFilter: false,
			},
			{
				header: `${t({ id: 'userOrdersTable.orderCampaign' })}`,
				accessorKey: 'campaign',
				size: 500,
				enableColumnFilter: false,
				enableSorting: false,
			},
		],
		[t]
	);

	return (
		<Detail.Container>
			<Detail.Heading
				value={`${t({ id: 'admin.header.order.subTtab.list' })}`}
			/>
			<div className="table-responsive">
				<AdminTable<UserOrdersTableData>
					columns={adminTableSchema}
					{...handlers}
					data={data}
					variant={AdminTableVariants.DETAIL_STYLE}
				/>
			</div>
		</Detail.Container>
	);
};

export default UserOrdersTable;
