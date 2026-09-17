export const FILTER_DELAY = 500;
export const SELECT_ITEM_CELL = 'item-selection';

export enum AdminTableAction {
	setIsLoading = 'setIsLoading',
	setIsError = 'setIsError',
	setTableData = 'setTableData',
	setAll = 'setAll',
}

export enum AdminTableFilterType {
	AMOUNT = 'AMOUNT',
	DATE = 'DATE',
	RANGE_DATE = 'RANGE_DATE',
	DROPDOWN = 'DROPDOWN',
}
