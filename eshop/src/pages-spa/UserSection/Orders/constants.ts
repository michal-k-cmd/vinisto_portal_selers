export const QUERY_KEY = 'orders';
export const DEFAULT_LIMIT_PER_PAGE = 20;

export const OVERDUE_FILTER = 'OVERDUE_FILTER';
export const ORDERS_LIST_ID = 'orders-list';

export const SKELETONS_NUM_BUNDLES = 3;

export enum OrderSortingColumn {
	ID = 'ID',
	PRICE = 'PRICE',
	TIME = 'TIME',
}

export const ORDER_SORTING_COLUMNS: { [key in OrderSortingColumn]: string } = {
	[OrderSortingColumn.ID]: 'userSection.orders.orderId',
	[OrderSortingColumn.TIME]: 'userSection.orders.date',
	[OrderSortingColumn.PRICE]: 'userSection.orders.price',
};

export const ORDER_SORTING_COLUMNS_MOBILE: {
	label: string;
	column: OrderSortingColumn;
	isDescending: boolean;
}[] = [
	{
		label: 'userSection.orders.filter.dateDesc',
		column: OrderSortingColumn.TIME,
		isDescending: true,
	},
	{
		label: 'userSection.orders.filter.dateAsc',
		column: OrderSortingColumn.TIME,
		isDescending: false,
	},
	{
		label: OVERDUE_FILTER,
		column: OrderSortingColumn.TIME,
		isDescending: false,
	},
];
