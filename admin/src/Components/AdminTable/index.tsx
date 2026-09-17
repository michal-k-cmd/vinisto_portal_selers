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
	getExpandedRowModel,
	getFilteredRowModel,
	getSortedRowModel,
	Header,
	Row,
	RowSelectionState,
	SortingState,
	TableOptions,
	Updater,
	useReactTable,
} from '@tanstack/react-table';
import { IPageListTableRow } from 'Hooks/useAdminTable/interfaces';
import { LocalizationContext } from 'Services/LocalizationService';
import cx from 'classnames';
import exportToExcelCsv from 'vinisto_shared/src/export-to-csv';
import {
	debounce,
	forEach,
	get,
	head,
	invoke,
	isEmpty,
	map,
	reduce,
	size,
} from 'Helpers/lodash';
import {
	CSSProperties,
	Fragment,
	MouseEvent,
	ReactNode,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import { useLocation } from 'react-router-dom';
import { _DynamicTable } from 'Components/Detail/DynamicTable';
import {
	closestCenter,
	DndContext,
	type DragEndEvent,
	KeyboardSensor,
	MouseSensor,
	TouchSensor,
	useSensor,
	useSensors,
} from '@dnd-kit/core';
import { restrictToHorizontalAxis } from '@dnd-kit/modifiers';
import {
	arrayMove,
	horizontalListSortingStrategy,
	SortableContext,
} from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { StorageContext } from 'Services/StorageService/context';
import useOnClickOutside from 'Hooks/useOnClickOutside';
import { LocalStorageKey } from 'Services/StorageService/constants';
import { MdDragIndicator } from 'react-icons/md';

import ContentPreloader from '../ContentPreloader';

import AmountFilter from './Filters/Amount';
import DateFilter from './Filters/Date';
import DropdownFilter from './Filters/Dropdown';
import MultiSelectFilter from './Filters/Multiselect';
import Range from './Filters/Range';
import RangeDateFilter from './Filters/RangeDate';
import TextFilter from './Filters/Text';
import YesNoFilter from './Filters/YesNo';
import {
	AdminTableFilterType,
	FILTER_DELAY,
	SELECT_ITEM_CELL,
} from './constants';
import {
	AdminTableVariants,
	ColumnFilters,
	IAdminTableProps,
} from './interfaces';
import './styles.css';
import ColumnFilter from './ColumnFilter';
import SortButton from './SortButton';
import SpecificationsFilter from './Filters/Specification';
import { specificationFilterParams } from './Filters/Specification/constants';
import BundleAutocompleteFilter from './Filters/BundleAutocomplete';
import OrderNumberAutocompleteFilter from './Filters/OrderNumberAutocomplete';
import SupplierAutocompleteFilter from './Filters/SupplierAutocomplete';

const DraggableTableHeader = <T,>({
	header,
}: {
	header: Header<T, unknown>;
}) => {
	const { attributes, isDragging, listeners, setNodeRef, transform } =
		useSortable({
			id: header.column.id,
		});

	const style: CSSProperties = {
		display: 'flex',
		alignItems: 'flex-start',
		gap: '0.125rem',
		opacity: isDragging ? 0.8 : 1,
		position: 'relative',
		transform: CSS.Translate.toString(transform), // translate instead of transform to avoid squishing
		transition: 'width transform 0.2s ease-in-out',
		width: header.column.getSize(),
		zIndex: isDragging ? 1 : 0,
	};

	return (
		<div
			ref={setNodeRef}
			style={style}
		>
			<button
				className="vinisto-admin-table__drag-handle"
				{...attributes}
				{...listeners}
			>
				<MdDragIndicator />
			</button>
			<span className="vinisto-admin-table__header-caption">
				{header.isPlaceholder
					? null
					: flexRender(header.column.columnDef.header, header.getContext())}
			</span>
		</div>
	);
};

const AdminTable = <T extends IPageListTableRow = IPageListTableRow>(
	props: IAdminTableProps<T>
) => {
	const t = useContext(LocalizationContext).useFormatMessage();
	const [columns] = useState(get(props, 'columns', []));
	const [columnOrder, setColumnOrder] = useState<string[]>(() => {
		if (props.variant !== AdminTableVariants.DYNAMIC_COLUMNS) return [];
		return get(props, 'columnOrder', []);
	});

	const [isColumnFilterOpen, setIsColumnFilterOpen] = useState(false);
	const [pageExportCount, setPageExportCount] = useState<number>(
		props.pageCount ?? 1
	);

	const isLoading = props.loading ?? false;
	const rowsHighlight = props?.rowsHighlight ?? {};
	const isDynamicColumnsVariant =
		props.variant === AdminTableVariants.DYNAMIC_COLUMNS;

	const storageContext = useContext(StorageContext);
	const location = useLocation();

	const pathSuffix = useMemo(
		() => location?.pathname.slice(1) ?? 'dashboard',
		[location?.pathname]
	);

	const defaultColumnsExcluded = useMemo(
		() =>
			props.defaultColumnsExcluded?.reduce<{
				[key: string]: boolean;
			}>((acc, column) => {
				acc[column] = false;
				return acc;
			}, {}),
		[props.defaultColumnsExcluded]
	);

	const [columnVisibility, setColumnVisibility] = useState(
		() => defaultColumnsExcluded ?? {}
	);

	const loadFromLocalStorage = (
		key: LocalStorageKey,
		setter: (value: any) => void
	) => {
		const savedItem = storageContext.StorageService.getStorageItem(key);
		if (savedItem) {
			setter(savedItem);
		}
	};

	useEffect(() => {
		loadFromLocalStorage(
			`adminTableVisibleColumns-${pathSuffix}`,
			setColumnVisibility
		);
		loadFromLocalStorage(
			`adminTableColumnsOrder-${pathSuffix}`,
			setColumnOrder
		);
	}, []);

	useEffect(() => {
		storageContext.StorageService.setItem(
			`adminTableVisibleColumns-${pathSuffix}`,
			columnVisibility
		);
	}, [columnVisibility, pathSuffix, storageContext.StorageService]);

	useEffect(() => {
		storageContext.StorageService.setItem(
			`adminTableColumnsOrder-${pathSuffix}`,
			columnOrder
		);
	}, [columnOrder, pathSuffix, storageContext.StorageService]);

	const stopPropagation = useCallback((event: MouseEvent) => {
		event.stopPropagation();
	}, []);

	const handleOnSelectRow = useCallback(
		(row: Row<T>) => (event: MouseEvent) => {
			stopPropagation(event);
			row.getToggleSelectedHandler()(event);
		},
		[stopPropagation]
	);

	useEffect(() => {
		loadFromLocalStorage(
			`adminTableVisibleColumns-${pathSuffix}`,
			setColumnVisibility
		);
		loadFromLocalStorage(
			`adminTableColumnsOrder-${pathSuffix}`,
			setColumnOrder
		);
	}, []);

	useEffect(() => {
		storageContext.StorageService.setItem(
			`adminTableVisibleColumns-${pathSuffix}`,
			columnVisibility
		);
	}, [columnVisibility, pathSuffix, storageContext.StorageService]);

	useEffect(() => {
		storageContext.StorageService.setItem(
			`adminTableColumnsOrder-${pathSuffix}`,
			columnOrder
		);
	}, [columnOrder, pathSuffix, storageContext.StorageService]);

	const tableProps = useMemo(() => {
		const tableProps: TableOptions<T> = {
			columns: columns,
			data: get(props, 'data', []),
			getCoreRowModel: getCoreRowModel(),
			...(!props.filters && { getFilteredRowModel: getFilteredRowModel() }),
			...(!props.sorting && { getSortedRowModel: getSortedRowModel() }),
			getExpandedRowModel: getExpandedRowModel(),
			manualSorting: !!props.filters,
			manualFiltering: !!props.sorting,
			enableExpanding: true,
			getRowId: (originalRow: T, index: number) => originalRow.id ?? index,
			getSubRows: (row) => (row.expandedContent ? [{ ...row }] : undefined),
			onColumnOrderChange: setColumnOrder,
			onColumnVisibilityChange: setColumnVisibility,
			state: {
				columnOrder,
				columnVisibility,
			},
		};

		if (props.selection !== undefined) {
			tableProps.columns = [
				{
					id: SELECT_ITEM_CELL,
					header: ({ table }) => (
						<CFormCheck
							checked={props.isAllSelected}
							indeterminate={
								!props.isAllSelected && size(table.getState().rowSelection) > 0
							}
							onChange={props.onToggleSelectAllRows}
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
				rowSelection: props.selection,
			};
			tableProps.onRowSelectionChange = (
				updater: Updater<RowSelectionState>
			) => {
				props.onRowSelectionChange(
					updater instanceof Function
						? updater(table.getState().rowSelection)
						: updater
				);
			};
		}
		// This condition has to resolve to false to enable inner/auto sorting
		if (props.onSortingChange !== undefined && props.sorting !== undefined) {
			tableProps.state = {
				...tableProps.state,
				sorting: props.sorting,
			};

			tableProps.onSortingChange = (updater: Updater<SortingState>) => {
				props.onSortingChange(
					updater instanceof Function
						? updater(table.getState().sorting)
						: updater
				);
			};
		}
		if (props.filters !== undefined) {
			tableProps.state = {
				...tableProps.state,
				columnFilters: props.filters,
			};
			tableProps.onColumnFiltersChange = (
				updater: Updater<ColumnFiltersState>
			) => {
				props.onColumnFiltersChange(
					updater instanceof Function
						? updater(table.getState().columnFilters)
						: updater
				);
			};
		}
		return tableProps;
	}, [columnOrder, columnVisibility, columns, handleOnSelectRow, props]);

	const table = useReactTable(tableProps);

	const emptyFilterValues = useCallback(
		(filters: ColumnFilters) => {
			forEach(table.getAllColumns(), (column: Column<T>) => {
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
			emptyFilterValues(currentColumnFilters);
			forEach(props.filters, (filter: ColumnFiltersState[number]) => {
				currentColumnFilters[filter.id] = filter.value as string;
			});
			return currentColumnFilters;
		});
	}, [setColumnFilters, emptyFilterValues, props.filters, table]);

	const handleOnRowClick = useCallback(
		(row: Row<T>) => (event: React.MouseEvent) => {
			if (event) {
				event.stopPropagation();
			}
			if (row.getCanExpand()) {
				row.getToggleExpandedHandler()();
			} else {
				props.onRowClick?.(row.original, event);
			}
		},
		[props.onRowClick]
	);

	const setDataFilter = useCallback(
		debounce(
			(column: Column<T>, value: string) => {
				column.setFilterValue(value);
			},
			props.filters ? FILTER_DELAY : 0
		),
		[]
	);

	const setFilterValue = useCallback(
		(column: Column<T>) => (valueOrValues: string | string[]) => {
			let value: string;

			if (Array.isArray(valueOrValues)) {
				value = valueOrValues.join(',');
			} else {
				value = valueOrValues;
			}
			setColumnFilters((currentColumnFilters) => ({
				...currentColumnFilters,
				[column.id]: value,
			}));
			setDataFilter(column, value);
		},
		[setColumnFilters, setDataFilter]
	);

	const url = new URL(window.location.href);

	const hasSpecificationFilterParamsInUrl = specificationFilterParams.some(
		(param) => url.searchParams.has(param)
	);

	const handleOnResetFilters = useCallback(() => {
		table.resetColumnFilters(true);

		// Ths is a moderately workaround to clear filters while specification filters are not
		// being stored in the table state (it currently supports only strings or arrays of strings)
		if (hasSpecificationFilterParamsInUrl) {
			window.location.replace(
				window.location.href.replace(location.search, '')
			);
		}

		setColumnFilters((currentColumnFilters) => {
			return emptyFilterValues(currentColumnFilters);
		});
	}, [
		table,
		hasSpecificationFilterParamsInUrl,
		location.search,
		emptyFilterValues,
	]);

	const exportTableData = async (numPages: number) => {
		let allData: Record<string, unknown>[] = [];
		let pagesProcessed = 0;

		const processCurrentPageData = () => {
			const rows = table.getCoreRowModel().rows;

			const exportData = rows.map((row) =>
				row.getVisibleCells().reduce((acc, cell) => {
					const cellJsx = cell.column.columnDef.cell
						? //@ts-expect-error cell may not exist on every columnDef, but that's ok
						  cell.column.columnDef.cell(cell.getContext())
						: cell.getValue();

					// @ts-expect-error idk how to type this, indexing works
					acc[cell.column.id] = cellJsx;
					return acc;
				}, {})
			);

			allData = [...allData, ...exportData];
		};

		// Paginate by clicking the "Next" button in DOM
		const paginateNextPages = async () => {
			while (pagesProcessed < numPages) {
				processCurrentPageData();

				const nextButton = document.querySelector<HTMLAnchorElement>(
					'a[aria-label="Next page"]'
				);

				if (
					!nextButton ||
					nextButton.getAttribute('aria-disabled') === 'true'
				) {
					break;
				}

				nextButton.click();

				// Wait for the page to load (adjust delay if necessary)
				await new Promise((resolve) => setTimeout(resolve, 1000));

				pagesProcessed++;
			}
		};

		await paginateNextPages();

		exportToExcelCsv(allData);
	};

	const headerGroups = table.getHeaderGroups();
	const getFilterComponent = (column: Column<T, unknown>): ReactNode => {
		if (!column.getCanFilter()) return <></>;
		switch (column.columnDef.meta?.filterType) {
			case AdminTableFilterType.AMOUNT:
				return (
					<AmountFilter
						onClick={stopPropagation}
						column={column}
						setColumnFilters={setColumnFilters}
						setDataFilter={setDataFilter}
						value={columnFilters[column.id]}
					/>
				);
			case AdminTableFilterType.DROPDOWN:
				return (
					<DropdownFilter
						onClick={stopPropagation}
						onChange={setFilterValue(column)}
						value={columnFilters[column.id]}
						options={column.columnDef.meta?.dropDownFilterOptions ?? []}
					/>
				);
			case AdminTableFilterType.DATE:
				return (
					<DateFilter
						onClick={stopPropagation}
						onChange={setFilterValue(column)}
						value={columnFilters[column.id]}
						column={column}
					/>
				);
			case AdminTableFilterType.RANGE_DATE:
				return (
					<RangeDateFilter
						onClick={stopPropagation}
						onChange={setFilterValue(column)}
						value={columnFilters[column.id]}
						column={column}
					/>
				);
			case AdminTableFilterType.YES_NO:
				return (
					<YesNoFilter
						onClick={stopPropagation}
						onChange={setFilterValue(column)}
						value={columnFilters[column.id]}
					/>
				);
			case AdminTableFilterType.NUMERIC:
				return (
					<Range
						onClick={stopPropagation}
						onChange={setFilterValue(column)}
						value={columnFilters[column.id]}
						column={column}
					/>
				);
			case AdminTableFilterType.MULTISELECT: {
				const valuesTolabelsMap = Object.fromEntries(
					column.columnDef.meta?.dropDownFilterOptions ?? []
				);

				return (
					<MultiSelectFilter
						onChange={setFilterValue(column)}
						options={
							column.columnDef.meta?.dropDownFilterOptions?.map(
								([value, label]) => ({ value, label })
							) ?? []
						}
						selected={
							columnFilters[column.id]
								? columnFilters[column.id].split(',').map((value) => ({
										value,
										label: valuesTolabelsMap[value] ?? value,
								  }))
								: []
						}
					/>
				);
			}
			case AdminTableFilterType.SPECIFICATION: {
				return <SpecificationsFilter />;
			}
			case AdminTableFilterType.BUNDLE_AUTOCOMPLETE:
				return (
					<BundleAutocompleteFilter
						onClick={stopPropagation}
						onChange={setFilterValue(column)}
						value={columnFilters[column.id]}
					/>
				);
			case AdminTableFilterType.ORDER_NUMBER_AUTOCOMPLETE:
				return (
					<OrderNumberAutocompleteFilter
						onClick={stopPropagation}
						onChange={setFilterValue(column)}
						value={columnFilters[column.id]}
					/>
				);
			case AdminTableFilterType.SUPPLIER_AUTOCOMPLETE:
				return (
					<SupplierAutocompleteFilter
						onClick={stopPropagation}
						onChange={setFilterValue(column)}
						value={columnFilters[column.id]}
					/>
				);
			default:
				return (
					<TextFilter
						onClick={stopPropagation}
						onChange={setFilterValue(column)}
						value={columnFilters[column.id]}
					/>
				);
		}
	};

	const handleDragEnd = useCallback((event: DragEndEvent) => {
		const { active, over } = event;
		if (active && over && active.id !== over.id) {
			setColumnOrder((columnOrder) => {
				const oldIndex = columnOrder.indexOf(active.id as string);
				const newIndex = columnOrder.indexOf(over.id as string);
				return arrayMove(columnOrder, oldIndex, newIndex);
			});
		}
	}, []);

	const sensors = useSensors(
		useSensor(MouseSensor, {}),
		useSensor(TouchSensor, {}),
		useSensor(KeyboardSensor, {})
	);

	const columnFiltersRef = useRef<HTMLDivElement>(null);
	const dynamicTableHeaderRef = useRef<HTMLDivElement>(null);

	useOnClickOutside<HTMLDivElement>(
		[columnFiltersRef, dynamicTableHeaderRef],
		() => setIsColumnFilterOpen(false)
	);

	if (props.variant === AdminTableVariants.DETAIL_STYLE) {
		return (
			<_DynamicTable<T>
				isLoading={isLoading}
				headerGroups={headerGroups}
				getFilterComponent={getFilterComponent}
				handleOnResetFilters={handleOnResetFilters}
				handleOnRowClick={handleOnRowClick}
				rowsHighlight={rowsHighlight}
				table={table}
				columnFilters={columnFilters}
				{...props}
			/>
		);
	}
	return (
		<DndContext
			collisionDetection={closestCenter}
			modifiers={[restrictToHorizontalAxis]}
			onDragEnd={handleDragEnd}
			sensors={sensors}
		>
			{isDynamicColumnsVariant && (
				<div
					className={
						'd-flex justify-content-end position-relative align-items-center'
					}
					ref={dynamicTableHeaderRef}
				>
					<div className="d-flex align-items-center lh-1 gap-2 my-3 my-md-0">
						<label
							htmlFor="page-export-count"
							style={{ fontSize: '0.875rem' }}
						>
							{t({ id: 'admin.table.exportCount' })}
						</label>
						<input
							id="page-export-count"
							type="number"
							min={1}
							max={props.pageCount}
							value={pageExportCount}
							onChange={(e) => setPageExportCount(Number(e.target.value))}
							className="form-control"
						/>
					</div>

					<button
						type="button"
						className="btn btn-secondary btn-sm  m-0 m-md-2"
						onClick={() => exportTableData(pageExportCount)}
					>
						{t({ id: 'admin.table.export' })}
					</button>
					{isColumnFilterOpen && (
						<button
							type="button"
							className="btn btn-secondary btn-sm m-2"
							onClick={() => {
								setColumnVisibility(defaultColumnsExcluded ?? {});
								setColumnOrder((props.columns ?? []).map((c) => `${c.id}`));
							}}
						>
							{t({ id: 'admin.table.columnsReset' })}
						</button>
					)}
					<button
						type="button"
						className="btn btn-secondary btn-sm m-2"
						onClick={() => setIsColumnFilterOpen(!isColumnFilterOpen)}
					>
						{t({ id: 'admin.table.columns' })}
					</button>
					<ColumnFilter
						onClickOutsideRef={columnFiltersRef}
						isColumnFilterOpen={isColumnFilterOpen}
						table={table}
					/>
				</div>
			)}

			<div
				className="table-responsive"
				{...(props.tableWrapRef ? { ref: props.tableWrapRef } : {})}
				{...(props.onTableScroll ? { onScroll: props.onTableScroll } : {})}
			>
				<CTable
					striped
					bordered
					hover
					className={cx('vinisto-admin-table', props.className, {
						'vinisto-admin-table--loading': isLoading,
					})}
					onMouseEnter={props.onMouseEnter}
					{...(props.tableRef ? { ref: props.tableRef } : {})}
				>
					<CTableHead>
						{map(headerGroups, (hg) => (
							<SortableContext
								items={columnOrder}
								strategy={horizontalListSortingStrategy}
								key={`sortable-context-${hg.id}`}
							>
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
												style={{
													width: header.getSize(),
													maxWidth: header.getSize(),
												}}
											>
												{header.isPlaceholder ? null : (
													<div className="d-flex justify-content-between flex-column h-100">
														<div className="vinisto-admin-table__header-cell">
															{isDynamicColumnsVariant ? (
																<DraggableTableHeader
																	key={header.column.id}
																	header={header}
																/>
															) : (
																<span className="vinisto-admin-table__header-caption">
																	{flexRender(
																		header.column.columnDef.header,
																		header.getContext()
																	)}
																</span>
															)}
															<SortButton
																sortDirection={sortDirection}
																getCanSort={header.column.getCanSort}
															/>
														</div>
														<div className="d-flex">
															{getFilterComponent(header.column)}
														</div>
													</div>
												)}
											</CTableHeaderCell>
										);
									})}
								</CTableRow>
							</SortableContext>
						))}
					</CTableHead>
					<CTableBody className="position-relative">
						{isLoading && (
							<CTableRow>
								<CTableDataCell
									colSpan={size(get(head(headerGroups), 'headers'))}
									className="vinisto-admin-table__loading-overlay"
								>
									<ContentPreloader />
								</CTableDataCell>
							</CTableRow>
						)}
						{!isLoading && isEmpty(props.data) && (
							<CTableRow>
								<CTableDataCell
									colSpan={size(get(head(headerGroups), 'headers'))}
									className="align-middle text-center"
								>
									{reduce(
										Object.values(columnFilters),
										(nonEmptyCount: number, columnFilter: string) =>
											nonEmptyCount + columnFilter.length,
										0
									) || hasSpecificationFilterParamsInUrl ? (
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
										t({ id: 'admin.table.noResults' })
									)}
								</CTableDataCell>
							</CTableRow>
						)}
						{table.getRowModel().rows.map((row) => {
							const flags =
								row.original?.flags || row.original?.bundleItem?.flags || {};

							const validationData = row.original?.validationData;
							const isUnreliableVatPayer = validationData?.isVatPayer
								? !validationData?.isVatPayerTrustworthy
								: false;
							const hasIsirRecord = !!validationData?.hasRecordInIsir;

							return (
								<Fragment key={row.id}>
									<CTableRow
										onMouseUp={handleOnRowClick(row)}
										className={cx(
											{
												pointer: row.getCanExpand() || props.onRowClick,
												highlight: Array.isArray(rowsHighlight)
													? rowsHighlight.includes(row?.id)
													: row.id in rowsHighlight,
												warning:
													flags?.isEnabled === false ||
													flags?.isTemporaryUnavailable ||
													flags?.isDeleted ||
													flags?.isClearanceSale ||
													isUnreliableVatPayer ||
													hasIsirRecord,
												alert: flags?.isSaleOver || flags?.isApproved === false,
												isExpanded: row.getIsExpanded(),
											},
											row.original?.rowClassName
										)}
									>
										{map(row.getVisibleCells(), (cell) => {
											return (
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
													{flexRender(
														cell.column.columnDef.cell,
														cell.getContext()
													)}
												</CTableDataCell>
											);
										})}
									</CTableRow>
									{row.getCanExpand() && row.getIsExpanded() && (
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
			</div>
		</DndContext>
	);
};

export default AdminTable;
