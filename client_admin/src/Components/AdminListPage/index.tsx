import { useContext } from 'react';
import { CCard, CCardBody, CCol, CRow } from '@coreui/react';
import cx from 'classnames';
import { isEmpty } from 'lodash-es';
import { Button } from 'react-bootstrap';
import { PageListTableRow } from 'Hooks/useAdminTable/interfaces';
import { LocalizationContext } from 'Services/LocalizationService';
import BatchActions from 'Components/AdminListPage/Components/BatchActions';
import AdminPagination from 'Components/AdminPagination';
import AdminTable from 'Components/AdminTable';

import { AdminListPageProps } from './interfaces';

const AdminListPage = <T extends PageListTableRow = PageListTableRow>({
	adminTableSchema,
	handlers: {
		handleOnSortingChange,
		handleOnFiltersChange,
		handleOnPageChange,
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
	tableClassName,
}: AdminListPageProps<T>) => {
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();

	return (
		<CRow>
			<CCol xs={12}>
				{handleOpenCreateModal && (
					<div
						className={cx('d-flex', {
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
							className="mb-2"
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
								className={tableClassName}
							/>
						) : (
							<AdminTable
								columns={adminTableSchema}
								data={state.data}
								loading={state.loading}
								onRowClick={handleOnTableRowClick}
								sorting={state.sorting}
								onSortingChange={handleOnSortingChange}
								filters={state.filters}
								onColumnFiltersChange={handleOnFiltersChange}
								className={tableClassName}
							/>
						)}
						{pageCount !== undefined && state.loaded && state.count > 0 && (
							<AdminPagination
								pageCount={pageCount}
								onPageChange={handleOnPageChange}
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
