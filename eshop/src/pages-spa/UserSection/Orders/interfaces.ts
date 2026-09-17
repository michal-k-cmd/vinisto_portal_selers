import { OrderSortingColumn } from './constants';

export interface IOrderSorting {
	column: OrderSortingColumn;
	isDescending: boolean;
}
