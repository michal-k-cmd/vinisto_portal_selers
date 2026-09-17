export interface IPagingProps {
	currentPage: number;
	pageCount: number;
	itemsPerPage: number;
}

export interface IPagingEventHandlers {
	onPageChange: (page: number) => void;
	onSizeChange: (size: number) => void;
}

export type IAdminPaginationProps = IPagingProps & IPagingEventHandlers;
