import {
	QueryOptions,
	useQueries,
	UseQueryResult,
} from '@tanstack/react-query';

const usePaginatedQuery = (
	[startPage, endPage]: [number, number],
	queryCallback: (page: number) => QueryOptions
): [UseQueryResult<any>[], { isLoading: boolean; isFetched: boolean }] => {
	const pagesArray =
		startPage < endPage
			? Array.from(
					{ length: endPage - startPage + 1 },
					(_, index) => startPage + index
			  )
			: startPage === endPage
			? [startPage]
			: [];
	const queries = useQueries({
		queries: pagesArray?.map((page) => queryCallback(page)),
	});

	return [
		queries,
		{
			isLoading: queries?.some((query) => query.isLoading),
			isFetched: queries?.every((query) => query.isFetched),
		},
	];
};

export default usePaginatedQuery;
