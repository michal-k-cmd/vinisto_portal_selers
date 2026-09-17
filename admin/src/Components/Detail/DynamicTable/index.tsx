import {
	Column,
	flexRender,
	HeaderGroup,
	Row,
	Table,
} from '@tanstack/react-table';
import cx from 'classnames';
import ContentPreloader from 'Components/ContentPreloader';
import { Fragment, ReactNode, useContext } from 'react';
import { FaSort, FaSortDown, FaSortUp } from 'react-icons/fa';
import { LocalizationContext } from 'Services/LocalizationService';
import AdminTable from 'Components/AdminTable';
import {
	AdminTableVariants,
	IAdminTableProps,
} from 'Components/AdminTable/interfaces';
import { IPageListTableRow } from 'Hooks/useAdminTable/interfaces';

import styles from './styles.module.css';

interface DynamicTableProps<T> extends React.HTMLAttributes<HTMLTableElement> {
	isLoading: boolean;
	headerGroups: HeaderGroup<T>[];
	getFilterComponent: (column: Column<T, unknown>) => ReactNode;
	handleOnResetFilters: () => void;
	handleOnRowClick?: (
		row: Row<T>
	) => (event: React.MouseEvent<Element, MouseEvent>) => void;
	rowsHighlight: Record<PropertyKey, unknown> | unknown[];
	table: Table<T>;
	onMouseEnter?: () => void;
	onRowClick?: ((entity: T, event: React.MouseEvent) => void) | undefined;
	data: T[];
	columnFilters: {
		[k: string]: string;
	};
}

// TODO this is a bad API (blaming myself), this should not be exposed as Detail component.
// Instead, the <AdminTable> with proper variant should be.
export const _DynamicTable = <T,>({
	isLoading,
	headerGroups,
	getFilterComponent,
	handleOnResetFilters,
	handleOnRowClick,
	rowsHighlight,
	table,
	columnFilters,
	...props
}: DynamicTableProps<T>) => {
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();

	return (
		<table
			className={cx(styles.table, props.className)}
			onMouseEnter={props.onMouseEnter}
		>
			<thead>
				{headerGroups.map((hg) => (
					<tr key={`header-row-${hg.id}`}>
						{hg.headers.map((header) => {
							const canBeSorted = header.column.getCanSort();
							const sortDirection = header.column.getIsSorted() as string;
							return (
								<th
									{...(canBeSorted && {
										role: 'button',
										tabIndex: 0,
										onClick: header.column.getToggleSortingHandler(),
									})}
									key={header.column.id}
									colSpan={header.colSpan}
									className={cx(
										'align-baseline',
										{
											pointer: canBeSorted,
										},
										header.column.columnDef.meta?.className
									)}
									style={{
										width: header.getSize(),
									}}
								>
									{header.isPlaceholder ? null : (
										<>
											<div className={cx(styles.headerCaptionContainer)}>
												<span className={cx(styles.headerCaption)}>
													{flexRender(
														header.column.columnDef.header,
														header.getContext()
													)}
												</span>
												{sortDirection === 'asc' ? (
													<FaSortUp
														className={cx(styles.sortIcon, styles.sortUp)}
													/>
												) : sortDirection === 'desc' ? (
													<FaSortDown
														className={cx(styles.sortIcon, styles.sortDown)}
													/>
												) : canBeSorted ? (
													<FaSort
														className={cx(
															styles.sortIcon,
															styles.sortUndeterminate
														)}
													/>
												) : null}
											</div>
											<div>{getFilterComponent(header.column)}</div>
										</>
									)}
								</th>
							);
						})}
					</tr>
				))}
			</thead>
			<tbody className={styles.tableBody}>
				{isLoading && (
					<tr>
						<td colSpan={headerGroups[0].headers.length}>
							<ContentPreloader />
						</td>
					</tr>
				)}
				{!isLoading && !props.data.length && (
					<tr>
						<td colSpan={headerGroups[0].headers.length}>
							{Object.values(columnFilters).reduce(
								(nonEmptyCount, columnFilter) =>
									nonEmptyCount + columnFilter.length,
								0
							) ? (
								<>
									{t({ id: 'admin.table.search.noResults' })}
									<button
										type="button"
										onClick={handleOnResetFilters}
									>
										{t({ id: 'admin.table.search.reset' })}
									</button>
								</>
							) : (
								t({ id: 'admin.table.noResults' })
							)}
						</td>
					</tr>
				)}
				{table.getRowModel().rows.map((row) => {
					const flags =
						// @ts-expect-error bundleItem is 'unknown'; not sure how to fix that, but should be safe as it is
						row.original?.flags || row.original?.bundleItem?.flags || {};

					// @ts-expect-error validationData is 'unknown'; not sure how to fix that, but should be safe as it is
					const validationData = row.original?.validationData;
					const isUnreliableVatPayer = validationData?.isVatPayer
						? !validationData?.isVatPayerTrustworthy
						: false;
					const hasIsirRecord = !!validationData?.hasRecordInIsir;

					return (
						<Fragment key={row.id}>
							<tr
								{...(handleOnRowClick && { onClick: handleOnRowClick?.(row) })}
								className={cx(styles.tableRow, {
									pointer: row.getCanExpand() || props.onRowClick,
									highlight: Array.isArray(rowsHighlight)
										? rowsHighlight.includes(row.id)
										: row.id in rowsHighlight,
									warning:
										flags?.isEnabled === false ||
										flags?.isTemporaryUnavailable ||
										flags?.isDeleted ||
										flags?.isClearanceSale ||
										isUnreliableVatPayer ||
										hasIsirRecord,
									isExpanded: row.getIsExpanded(),
								})}
							>
								{row.getVisibleCells().map((cell) => (
									<td
										key={cell.id}
										className={cx(
											cell.column.columnDef.meta?.cellClassName,
											cell.column.columnDef.meta?.className
										)}
									>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</td>
								))}
							</tr>
							{row.getCanExpand() && row.getIsExpanded() && (
								<tr>
									<td colSpan={row.getVisibleCells().length}>
										{(
											row.original as T & {
												expandedContent: (row: Row<T>) => ReactNode;
											}
										)?.expandedContent(row)}
									</td>
								</tr>
							)}
						</Fragment>
					);
				})}
			</tbody>
			{table
				.getFooterGroups()
				.map((group) =>
					group.headers.map((header) => header.column.columnDef.footer)
				)
				.flat()
				.filter(Boolean).length > 0 && (
				<tfoot>
					{table.getFooterGroups().map((footerGroup) => (
						<tr
							className={cx(styles.tableRow)}
							key={footerGroup.id}
						>
							{footerGroup.headers.map((header) => (
								<td key={header.id}>
									{header.isPlaceholder
										? null
										: flexRender(
												header.column.columnDef.footer,
												header.getContext()
										  )}
								</td>
							))}
						</tr>
					))}
				</tfoot>
			)}
		</table>
	);
};

// TODO move these things somewhwere else
const DynamicTable = <T extends IPageListTableRow = IPageListTableRow>(
	props: IAdminTableProps<T>
) => (
	<AdminTable<T>
		{...props}
		variant={AdminTableVariants.DETAIL_STYLE}
	/>
);

export default DynamicTable;
