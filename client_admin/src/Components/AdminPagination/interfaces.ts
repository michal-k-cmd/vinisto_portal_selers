export interface PaginationProps {
	currentPage: number;
	pageCount: number;
	onPageChange: (page: number) => void;
	className?: string;
}

type AllowsPageSizeChange =
	| {
			itemsPerPage: number;
			onSizeChange: (size: number) => void;
	  }
	| {
			itemsPerPage?: never;
			onSizeChange?: never;
	  };

export type AdminPaginationProps = PaginationProps & AllowsPageSizeChange;
