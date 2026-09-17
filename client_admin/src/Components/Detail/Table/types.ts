interface DetailTableColumn {
	/**
	 * The title of the column to be displayed.
	 */
	title: React.ReactNode;

	/**
	 * The optional width of the column.
	 */
	width?: string;

	/**
	 * The optional minimum width of the column.
	 */
	minWidth?: string;

	/**
	 * The optional maximum width of the column.
	 */
	maxWidth?: string;
}

type DetailTableData = React.ReactNode[][] | null | undefined;

interface DetailTableProps {
	/**
	 * The data to be displayed in the table.
	 */
	data: DetailTableData;

	/**
	 * The optional columns of the table, each with a title and optional width.
	 */
	columns?: DetailTableColumn[];

	/**
	 * The optional className of table
	 */
	className?: string;
}

export type { DetailTableProps, DetailTableColumn, DetailTableData };
