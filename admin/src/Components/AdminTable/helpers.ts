function createColumnMaps(
	columnProperties: Record<string, { filter: string; sorting: string }>
) {
	const filterColumnMap = Object.fromEntries(
		Object.entries(columnProperties).map(([key, value]) => [key, value.filter])
	);

	const sortingColumnMap = Object.fromEntries(
		Object.entries(columnProperties).map(([key, value]) => [key, value.sorting])
	);

	return { filterColumnMap, sortingColumnMap };
}

export { createColumnMaps };
