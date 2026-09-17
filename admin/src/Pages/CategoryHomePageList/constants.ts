import { map } from 'Helpers/lodash';

enum HpCategoryType {
	HEAD = 'HEAD',
	BLOCK = 'BLOCK',
}

const hpCategoryTypeOptions = map(HpCategoryType, (type) => ({
	value: type,
	label: type,
}));

const hpCategoryListTableKeys = {
	ID_DB_COLUMN: 'id',
	NAME_DB_COLUMN: 'name',
	ORDER_DB_COLUMN: 'sequenceNumber',
};

const COLUMN_PROPERTIES = {
	[hpCategoryListTableKeys.ORDER_DB_COLUMN]: {
		filter: 'SearchSequenceNumber',
		sorting: 'SEQUENCE_NUMBER',
	},
};

const FILTER_COLUMN_MAP = Object.fromEntries(
	Object.entries(COLUMN_PROPERTIES).map(([key, value]) => [key, value.filter])
);

const SORTING_COLUMN_MAP = Object.fromEntries(
	Object.entries(COLUMN_PROPERTIES).map(([key, value]) => [key, value.sorting])
);

export {
	HpCategoryType,
	hpCategoryTypeOptions,
	hpCategoryListTableKeys,
	FILTER_COLUMN_MAP,
	SORTING_COLUMN_MAP,
};
