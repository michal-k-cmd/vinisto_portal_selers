import { useContext, useRef, useState } from 'react';
import { isEmpty } from 'Helpers/lodash';
import cx from 'classnames';
import { IPageListTableRow } from 'Hooks/useAdminTable/interfaces';
import { LocalizationContext } from 'Services/LocalizationService';
import { CCard, CCardBody, CCol, CRow } from '@coreui/react';
import { Button } from 'react-bootstrap';
import AdminTable from 'Components/AdminTable';
import AdminPagination from 'Components/AdminPagination';
import BatchActions from 'Components/AdminListPage/Components/BatchActions';

import { IAdminListPageProps } from './interfaces';
import FloatingScrollbar from './Components/FloatingScrollbar';

const AdminListPage = <T extends IPageListTableRow = IPageListTableRow>({
	adminTableSchema,
	handlers: {
		handleOnSortingChange,
		handleOnFiltersChange,
		handleOnPageChange,
		handleOnPageSizeChange,
		handleOnRowSelectionChange,
		handleOnToggleSelectAllRows,
	},
	handleOpenCreateModal,
	handleOnTableRowClick,
	state,
	pageCount,
	pageNumber,
	btnCreateLabel,
	batchActions,
	headerContent,
	className,
	rowsHighlight,
	onMouseEnter,
	adminTableVariant,
	defaultColumnsExcluded,
	columnOrder,
}: IAdminListPageProps<T>) => {
	const t = useContext(LocalizationContext).useFormatMessage();

	const tableWrapRef = useRef<HTMLDivElement>(null);
	const tableRef = useRef<HTMLTableElement>(null);
	const scrollbarRef = useRef<HTMLInputElement>(null);

	const [scrollLeft, setScrollLeft] = useState(0);

	const handleTableScroll = () => {
		if (tableWrapRef.current) {
			setScrollLeft(tableWrapRef.current.scrollLeft);
		}
	};

	return (
		<CRow className={className}>
			<FloatingScrollbar
				scrollbarRef={scrollbarRef}
				tableWrapRef={tableWrapRef}
				tableRef={tableRef}
				scrollLeft={scrollLeft}
				setScrollLeft={setScrollLeft}
			/>
			<CCol xs={12}>
				{handleOpenCreateModal && (
					<div
						className={cx('d-flex flex-wrap', {
							'justify-content-end': !batchActions && !headerContent,
							'justify-content-between': batchActions || headerContent,
						})}
					>
						{batchActions && (
							<BatchActions
								actions={batchActions}
								isAllowed={!isEmpty(state.selection)}
							/>
						)}
						{headerContent}
						<Button
							className="mb-2 mt-2 mt-md-0 ms-auto ms-md-0"
							onClick={handleOpenCreateModal}
						>
							{t({ id: btnCreateLabel })}
						</Button>
					</div>
				)}
				<CCard className="mb-4">
					<CCardBody className="p-0">
						{batchActions ? (
							<AdminTable
								tableWrapRef={tableWrapRef}
								tableRef={tableRef}
								onTableScroll={handleTableScroll}
								columns={adminTableSchema}
								data={state.data}
								loading={state.loading}
								onRowClick={handleOnTableRowClick}
								sorting={state.sorting}
								onSortingChange={handleOnSortingChange}
								filters={state.filters}
								onColumnFiltersChange={handleOnFiltersChange}
								selection={state.selection}
								onRowSelectionChange={handleOnRowSelectionChange}
								isAllSelected={state.isAllSelected}
								onToggleSelectAllRows={handleOnToggleSelectAllRows}
								rowsHighlight={rowsHighlight}
								onMouseEnter={onMouseEnter}
								variant={adminTableVariant}
								defaultColumnsExcluded={defaultColumnsExcluded}
								pageCount={pageCount ?? 1}
								columnOrder={columnOrder}
							/>
						) : (
							<AdminTable
								tableWrapRef={tableWrapRef}
								tableRef={tableRef}
								onTableScroll={handleTableScroll}
								columns={adminTableSchema}
								data={state.data}
								loading={state.loading}
								onRowClick={handleOnTableRowClick}
								sorting={state.sorting}
								onSortingChange={handleOnSortingChange}
								filters={state.filters}
								onColumnFiltersChange={handleOnFiltersChange}
								rowsHighlight={rowsHighlight}
								onMouseEnter={onMouseEnter}
								variant={adminTableVariant}
								defaultColumnsExcluded={defaultColumnsExcluded}
								pageCount={pageCount ?? 1}
								columnOrder={columnOrder}
							/>
						)}
						{pageCount !== undefined && state.loaded && state.count > 0 && (
							<AdminPagination
								pageCount={pageCount}
								itemsPerPage={state.limit}
								onPageChange={handleOnPageChange}
								onSizeChange={handleOnPageSizeChange}
								currentPage={pageNumber}
							/>
						)}
					</CCardBody>
				</CCard>
			</CCol>
		</CRow>
	);
};

export default AdminListPage;
