type TUsePaginationProps = {
	page: [number, number];
	totalItemsCount: number;
	limit: number;
};

const usePagination = ({
	page,
	totalItemsCount,
	limit,
}: TUsePaginationProps) => {
	const currentPage = page[1];
	const totalItemsLeft = totalItemsCount - currentPage * limit;
	const itemsLeft = totalItemsLeft > 0 ? totalItemsLeft : 0;

	return {
		startPage: page[0],
		currentPage,
		totalPages: Math.ceil(totalItemsCount / limit),
		itemsLeft,
		itemsLeftOnNextPage: itemsLeft > limit ? limit : itemsLeft,
	};
};

export default usePagination;
