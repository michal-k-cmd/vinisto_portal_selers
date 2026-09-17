const HPCarouselListTableKeys = {
	ID_DB_COLUMN: 'id',
	AVAILABLE_ON_PLATFORMS_COLUMN: 'availableOnPlatform',
	NAME_DB_COLUMN: 'name',
	ORDER_DB_COLUMN: 'sequenceNumber',
	IS_ENABLED_DB_COLUMN: 'isEnabled',
};

const COLUMN_PROPERTIES = {
	[HPCarouselListTableKeys.NAME_DB_COLUMN]: {
		filter: 'SearchName',
		sorting: 'NAME',
	},
	[HPCarouselListTableKeys.AVAILABLE_ON_PLATFORMS_COLUMN]: {
		filter: 'AvailableOnPlatform',
		sorting: '',
	},
	[HPCarouselListTableKeys.ORDER_DB_COLUMN]: {
		filter: '',
		sorting: 'SEQUENCE_NUMBER',
	},
};

const FILTER_COLUMN_MAP = Object.fromEntries(
	Object.entries(COLUMN_PROPERTIES).map(([key, value]) => [key, value.filter])
);

const SORTING_COLUMN_MAP = Object.fromEntries(
	Object.entries(COLUMN_PROPERTIES).map(([key, value]) => [key, value.sorting])
);

export { HPCarouselListTableKeys, FILTER_COLUMN_MAP, SORTING_COLUMN_MAP };
