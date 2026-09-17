import {
	Fragment,
	MouseEvent,
	useCallback,
	useContext,
	useEffect,
	useLayoutEffect,
	useMemo,
	useReducer,
	useRef,
	useState,
} from 'react';
import {
	CFormCheck,
	CTable,
	CTableBody,
	CTableDataCell,
	CTableHead,
	CTableHeaderCell,
	CTableRow,
} from '@coreui/react';
import {
	Column,
	ColumnFiltersState,
	flexRender,
	getCoreRowModel,
	Row,
	RowSelectionState,
	SortingState,
	Table,
	TableOptions,
	Updater,
	useReactTable,
} from '@tanstack/react-table';
import cx from 'classnames';
import {
	debounce,
	get,
	head,
	invoke,
	isEmpty,
	map,
	reduce,
	size,
} from 'lodash-es';
import { PageListTableRow } from 'Hooks/useAdminTable/interfaces';
import { LocalizationContext } from 'Services/LocalizationService';
import { GoTriangleDown, GoTriangleUp } from 'react-icons/go';
import { VinistoHelperDllEnumsStockingRequestStockingState } from 'vinisto_api_client/src/api-types/supplier-api';
import { dayjsInstance } from 'Services/Date';
import { DISCOUNT_EXPIRING_DAYS } from 'Pages/DashBoard/discounts/constants';

import ContentPreloader from '../ContentPreloader';

import {
	AdminTableProps,
	AdminTableReducer,
	ColumnFilters,
} from './interfaces';
import {
	AdminTableAction,
	AdminTableFilterType,
	FILTER_DELAY,
	SELECT_ITEM_CELL,
} from './constants';
import { adminTableReducer } from './reducer';
import AmountFilter from './Filters/Amount';
import DropdownFilter from './Filters/Dropdown';
import TextFilter from './Filters/Text';
import DateFilter from './Filters/Date';
import RangeDateFilter from './Filters/RangeDate';

import './styles.css';
import { bundleAdapter } from '@/index';
import { VinistoHelperDllEnumsCurrency } from '@/api-types/product-api';

const isPromise = (value: any): value is Promise<any> =>
	typeof value?.then === 'function';
const stopPropagation = (event: MouseEvent) => event.stopPropagation();

const AdminTable = <T extends PageListTableRow = PageListTableRow>({
	selection,
	loading,
	errorMessage,
	columns = [],
	data,
	isAllSelected,
	onToggleSelectAllRows,
	onRowSelectionChange,
	filters,
	onColumnFiltersChange,
	sorting,
	onSortingChange,
	onRowClick,
	className,
}: AdminTableProps<T>) => {
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();

	const handleOnSelectRow = useCallback(
		(row: Row<T>) => (event: MouseEvent) => {
			stopPropagation(event);
			row.getToggleSelectedHandler()(event);
		},
		[]
	);

	const handleOnRowClick = useCallback(
		(row: Row<T>) => (event: MouseEvent) => {
			if (event) {
				event.preventDefault();
				event.stopPropagation();
			}
			if (row.getCanExpand()) {
				row.getToggleExpandedHandler()();
			} else if (onRowClick !== undefined) {
				onRowClick(row.original);
			}
		},
		[onRowClick]
	);

	const [state, dispatch] = useReducer<AdminTableReducer<T>>(
		adminTableReducer,
		{
			isLoading: loading ?? false,
			isError: false,
			tableData: [],
		}
	);

	useLayoutEffect(() => {
		dispatch([AdminTableAction.setIsLoading, loading ?? false]);
	}, [loading]);

	useLayoutEffect(() => {
		if (!isPromise(data)) {
			dispatch([AdminTableAction.setTableData, data ?? []]);
			return;
		}
		data
			.then((result) => {
				dispatch([AdminTableAction.setTableData, result]);
			})
			.catch(() => {
				dispatch([AdminTableAction.setIsError, true]);
			})
			.finally(() => {
				dispatch([AdminTableAction.setIsLoading, false]);
			});
		dispatch([
			AdminTableAction.setAll,
			{
				isError: false,
				isLoading: true,
				tableData: [],
			},
		]);
	}, [data]);

	const table = useRef<Table<T>>();
	const tableProps = useMemo(() => {
		const tableProps: TableOptions<T> = {
			columns,
			data: state.tableData,
			getCoreRowModel: getCoreRowModel(),
			manualSorting: true,
			manualFiltering: true,
			getRowId: (originalRow: T, index: number) => originalRow.id ?? index,
			// returning non-empty array allows row to be expanded
			getSubRows: (row) => (row.expandedContent ? [{ ...row }] : undefined),
		};
		if (selection !== undefined) {
			tableProps.columns = [
				{
					id: SELECT_ITEM_CELL,
					header: ({ table }) => (
						<CFormCheck
							checked={isAllSelected}
							indeterminate={
								!isAllSelected && size(table.getState().rowSelection) > 0
							}
							onChange={onToggleSelectAllRows}
						/>
					),
					cell: ({ row }) => (
						<div
							className="vinisto-admin-table__selection"
							onClick={handleOnSelectRow(row)}
						>
							<CFormCheck
								checked={row.getIsSelected()}
								indeterminate={row.getIsSomeSelected()}
								onChange={row.getToggleSelectedHandler()}
							/>
						</div>
					),
				},
				...tableProps.columns,
			];
			tableProps.state = {
				...tableProps.state,
				rowSelection: selection,
			};
			tableProps.onRowSelectionChange = (
				updater: Updater<RowSelectionState>
			) => {
				onRowSelectionChange(
					updater instanceof Function
						? updater(table.current?.getState().rowSelection ?? {})
						: updater
				);
			};
		}
		if (onSortingChange !== undefined) {
			tableProps.state = {
				...tableProps.state,
				sorting,
			};
			tableProps.onSortingChange = (updater: Updater<SortingState>) => {
				onSortingChange(
					updater instanceof Function
						? updater(table.current?.getState().sorting ?? [])
						: updater
				);
			};
		}
		if (filters !== undefined) {
			tableProps.state = {
				...tableProps.state,
				columnFilters: filters,
			};
			tableProps.onColumnFiltersChange = (
				updater: Updater<ColumnFiltersState>
			) => {
				onColumnFiltersChange(
					updater instanceof Function
						? updater(table.current?.getState().columnFilters ?? [])
						: updater
				);
			};
		}
		return tableProps;
	}, [
		selection,
		columns,
		state.tableData,
		isAllSelected,
		onToggleSelectAllRows,
		onRowSelectionChange,
		filters,
		onColumnFiltersChange,
		sorting,
		onSortingChange,
		handleOnSelectRow,
	]);
	table.current = useReactTable(tableProps);

	const emptyFilterValues = useCallback(
		(filters: ColumnFilters) => {
			table.current?.getAllColumns().forEach((column) => {
				if (column.getCanFilter()) {
					filters[column.id] = '';
				}
			});
			return filters;
		},
		[table]
	);

	const [columnFilters, setColumnFilters] = useState(emptyFilterValues({}));

	useEffect(() => {
		setColumnFilters((currentColumnFilters) => {
			const newColumnFilters = { ...currentColumnFilters };

			emptyFilterValues(newColumnFilters);

			if (filters?.length) {
				filters.forEach((filter) => {
					if (filter && filter.id && filter.value !== undefined) {
						newColumnFilters[filter.id] = filter.value as string;
					}
				});
			}

			return newColumnFilters;
		});
	}, [filters, emptyFilterValues]);

	const setDataFilter = useMemo(
		() =>
			debounce((column: Column<T>, value: string) => {
				column.setFilterValue(value);
			}, FILTER_DELAY),
		[]
	);

	const setFilterValue = useCallback(
		(column: Column<T>) => (value: string) => {
			setColumnFilters((currentColumnFilters) => ({
				...currentColumnFilters,
				[column.id]: value,
			}));
			column.setFilterValue(value);
		},
		[setColumnFilters]
	);

	const handleOnResetFilters = useCallback(() => {
		table.current?.resetColumnFilters(true);
		setColumnFilters((currentColumnFilters) => {
			return emptyFilterValues(currentColumnFilters);
		});
	}, [table, setColumnFilters, emptyFilterValues]);

	const headerGroups = table.current?.getHeaderGroups();

	const getFilterComponent = (column: Column<T, unknown>) => {
		if (column.getCanFilter() === false) return <></>;

		const filterValue =
			(filters?.find((f) => f.id === column.id)?.value as string) || '';

		switch (column.columnDef.meta?.filterType) {
			case AdminTableFilterType.AMOUNT:
				return (
					<AmountFilter
						column={column}
						onClick={stopPropagation}
						setColumnFilters={setColumnFilters}
						setDataFilter={setDataFilter}
						value={columnFilters[column.id] || filterValue}
					/>
				);
			case AdminTableFilterType.DATE:
				return (
					<DateFilter
						onClick={stopPropagation}
						onChange={setFilterValue(column)}
						value={columnFilters[column.id] || filterValue}
					/>
				);
			case AdminTableFilterType.RANGE_DATE:
				return (
					<RangeDateFilter
						onClick={stopPropagation}
						onChange={setFilterValue(column)}
						value={columnFilters[column.id] || filterValue}
					/>
				);
			case AdminTableFilterType.DROPDOWN:
				return (
					<DropdownFilter
						options={column.columnDef.meta?.filterOptions ?? []}
						onClick={stopPropagation}
						onChange={setFilterValue(column)}
						value={columnFilters[column.id] || filterValue}
					/>
				);
			default:
				return (
					<TextFilter
						onClick={stopPropagation}
						onChange={setFilterValue(column)}
						value={columnFilters[column.id] || filterValue}
					/>
				);
		}
	};

	return (
		<CTable
			striped
			responsive
			hover
			className={cx('vinisto-admin-table', className, {
				'vinisto-admin-table--loading': state.isLoading,
			})}
		>
			<CTableHead>
				{map(headerGroups, (hg) => (
					<CTableRow key={`header-row-${hg.id}`}>
						{map(hg.headers, (header) => {
							const sortDirection = header.column.getIsSorted() as string;
							return (
								<CTableHeaderCell
									scope="col"
									key={header.column.id}
									colSpan={header.colSpan}
									className={cx(
										'align-top',
										{
											pointer: header.column.getCanSort(),
										},
										header.column.columnDef.meta?.className
									)}
									onClick={header.column.getToggleSortingHandler()}
								>
									{header.isPlaceholder ? null : (
										<div className="vinisto-admin-table__header-cell">
											{flexRender(
												header.column.columnDef.header,
												header.getContext()
											)}
											{sortDirection === 'asc' ? (
												<GoTriangleUp className="vinisto-admin-table__sorting-ico" />
											) : sortDirection === 'desc' ? (
												<GoTriangleDown className="vinisto-admin-table__sorting-ico" />
											) : header.column.getCanSort() ? (
												<GoTriangleDown className="vinisto-admin-table__sorting-ico vinisto-admin-table__sorting-ico--faded" />
											) : null}
											{getFilterComponent(header.column)}
										</div>
									)}
								</CTableHeaderCell>
							);
						})}
					</CTableRow>
				))}
			</CTableHead>
			<CTableBody className="position-relative">
				{state.isLoading && (
					<CTableRow>
						<CTableDataCell
							colSpan={size(get(head(headerGroups), 'headers'))}
							className="vinisto-admin-table__loading-overlay"
						>
							<ContentPreloader />
						</CTableDataCell>
					</CTableRow>
				)}
				{!state.isLoading && isEmpty(state.tableData) && (
					<CTableRow>
						<CTableDataCell
							colSpan={size(get(head(headerGroups), 'headers'))}
							className="align-middle text-center"
						>
							{reduce(
								Object.values(columnFilters),
								(nonEmptyCount, columnFilter: string) =>
									nonEmptyCount + columnFilter.length,
								0
							) ? (
								<>
									{t({ id: 'admin.table.search.noResults' })}
									<button
										type="button"
										className="btn btn-secondary btn-sm m-2"
										onClick={handleOnResetFilters}
									>
										{t({ id: 'admin.table.search.reset' })}
									</button>
								</>
							) : (
								t({
									id:
										state.isError && errorMessage
											? errorMessage
											: 'admin.table.noResults',
								})
							)}
						</CTableDataCell>
					</CTableRow>
				)}
				{map(table.current?.getRowModel().rows, (row) => {
					let diff = 0;
					try {
						const bundlePrices = bundleAdapter.fromApi(
							// @ts-expect-error row is Row<T> but we need Bundle
							row.original,
							{ currency: VinistoHelperDllEnumsCurrency.CZK }
						).bundlePrices;
						const { discountedPrice } = bundlePrices ?? {};
						diff =
							bundlePrices.isDiscounted && discountedPrice?.validTo
								? discountedPrice.validTo.diff(dayjsInstance(), 'days')
								: 0;
					} catch (e) {
						diff = 0;
					}

					return (
						<Fragment key={row.id}>
							<CTableRow
								onClick={handleOnRowClick(row)}
								className={cx({
									pointer: row.getCanExpand() || onRowClick,
									highlight:
										row.original.stockingState === diff &&
										(VinistoHelperDllEnumsStockingRequestStockingState.SENT ||
											diff < DISCOUNT_EXPIRING_DAYS),
								})}
							>
								{map(row.getVisibleCells(), (cell) => (
									<CTableDataCell
										key={cell.id}
										className={cx(
											{
												'vinisto-admin-table__selection-cell':
													cell.column.id === SELECT_ITEM_CELL,
											},
											cell.column.columnDef.meta?.cellClassName,
											cell.column.columnDef.meta?.className
										)}
									>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</CTableDataCell>
								))}
							</CTableRow>
							{row.getIsExpanded() && (
								<CTableRow>
									<CTableDataCell colSpan={row.getVisibleCells().length}>
										{invoke(row.original, 'expandedContent', row)}
									</CTableDataCell>
								</CTableRow>
							)}
						</Fragment>
					);
				})}
			</CTableBody>
		</CTable>
	);
};

export default AdminTable;
