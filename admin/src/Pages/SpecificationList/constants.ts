const SpecificationListTableKeys = {
	ID_DB_COLUMN: 'id',
	NAME_DB_COLUMN: 'name',
	SPECIFICATION_TYPE_DB_COLUMN: 'specificationType',
	ORDER_DB_COLUMN: 'order',
	ORDER_DETAIL_DB_COLUMN: 'orderDetail',
	IS_HIDDEN_DB_COLUMN: 'isHidden',
	IS_DETAIL_DB_COLUMN: 'isDetail',
};

const COLUMN_PROPERTIES = {
	[SpecificationListTableKeys.ID_DB_COLUMN]: {
		filter: 'SearchId',
		sorting: 'ID',
	},
	[SpecificationListTableKeys.NAME_DB_COLUMN]: {
		filter: 'SearchName',
		sorting: 'NAME',
	},
	[SpecificationListTableKeys.SPECIFICATION_TYPE_DB_COLUMN]: {
		filter: 'SpecificationType',
		sorting: 'SPECIFICATION_TYPE',
	},
	[SpecificationListTableKeys.ORDER_DB_COLUMN]: {
		filter: 'SearchOrder',
		sorting: 'ORDER',
	},
	[SpecificationListTableKeys.ORDER_DETAIL_DB_COLUMN]: {
		filter: 'SearchOrderDetail',
		sorting: 'ORDER_DETAIL',
	},
	[SpecificationListTableKeys.IS_HIDDEN_DB_COLUMN]: {
		filter: 'ShowHidden',
		sorting: 'HIDDEN',
	},
};

const FILTER_COLUMN_MAP = Object.fromEntries(
	Object.entries(COLUMN_PROPERTIES).map(([key, { filter }]) => [key, filter])
);

const SORTING_COLUMN_MAP = Object.fromEntries(
	Object.entries(COLUMN_PROPERTIES).map(([key, { sorting }]) => [key, sorting])
);

export { SpecificationListTableKeys, FILTER_COLUMN_MAP, SORTING_COLUMN_MAP };
