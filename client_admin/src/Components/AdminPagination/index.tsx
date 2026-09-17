import { CFormSelect } from '@coreui/react';
import { PAGE_SIZES } from 'Hooks/useAdminTable/constants';
import { DeviceServiceContext } from 'Services/DeviceService';
import { LocalizationContext } from 'Services/LocalizationService';
import cx from 'classnames';
import { map } from 'lodash-es';
import { ChangeEvent, FC, useCallback, useContext } from 'react';
import ReactPaginate from 'react-paginate';
import { NumberParam, useQueryParam, withDefault } from 'use-query-params';
import { MIN_PAGE_NUMBER, URL_PARAM } from 'Hooks/useAdminTable/constants';

import { AdminPaginationProps } from './interfaces';

import './styles.css';

const AdminPagination: FC<AdminPaginationProps> = ({
	pageCount,
	itemsPerPage,
	onSizeChange,
	onPageChange,
	className,
}) => {
	const { isTablet, isMobile } = useContext(DeviceServiceContext);
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();

	const [pageNumber] = useQueryParam(
		URL_PARAM.PAGE,
		withDefault(NumberParam, MIN_PAGE_NUMBER)
	);

	const handleOnChange = useCallback(
		(event: ChangeEvent<HTMLSelectElement>) => {
			if (onSizeChange === undefined) return;
			onSizeChange(parseInt(event.target.value));
		},
		[onSizeChange]
	);

	return (
		<div
			className={cx('admin-pagination', className, {
				'admin-pagination--page-size': onSizeChange !== undefined,
			})}
		>
			<div className="admin-pagination__wrapper">
				<ReactPaginate
					previousLabel={`${t({ id: 'pagination.previous.btnLabel' })}`}
					nextLabel={`${t({ id: 'pagination.next.btnLabel' })}`}
					breakLabel="..."
					onPageChange={(item: { selected: number }) =>
						onPageChange(item.selected + 1)
					}
					pageRangeDisplayed={isMobile ? 2 : isTablet ? 3 : 5}
					pageCount={pageCount}
					renderOnZeroPageCount={null}
					containerClassName="pagination"
					pageClassName="page-item"
					pageLinkClassName="page-link"
					activeClassName="active"
					previousClassName="page-item previous"
					nextClassName="page-item next"
					breakLinkClassName="page-link"
					forcePage={pageNumber - 1}
				/>
			</div>
			{onSizeChange !== undefined && (
				<div className="admin-pagination__size">
					<CFormSelect
						label={`${t({ id: 'pagination.itemsPerPage' })}`}
						onChange={handleOnChange}
						defaultValue={itemsPerPage}
						className="form-control"
					>
						{map(PAGE_SIZES, (size, index) => (
							<option
								key={index}
								value={size}
							>
								{size}
							</option>
						))}
					</CFormSelect>
				</div>
			)}
		</div>
	);
};

export default AdminPagination;
