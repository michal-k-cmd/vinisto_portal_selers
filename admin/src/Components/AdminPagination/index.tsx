import { ChangeEvent, useCallback, useContext } from 'react';
import { CFormSelect, CPagination, CPaginationItem } from '@coreui/react';
import { PAGE_SIZES } from 'Hooks/useAdminTable/constants';
import { LocalizationContext } from 'Services/LocalizationService';
import { DeviceServiceContext } from 'Services/DeviceService';
import { useSearchParams } from 'react-router-dom';
import { MIN_PAGE_NUMBER, URL_PARAM } from 'Hooks/useAdminTable/constants';

import { IAdminPaginationProps } from './interfaces';

import './styles.css';

const AdminPagination = ({
	onSizeChange,
	onPageChange,
	pageCount,
	itemsPerPage,
	currentPage,
}: IAdminPaginationProps) => {
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();
	const { isTablet, isMobile } = useContext(DeviceServiceContext);

	const [searchParams] = useSearchParams();
	const pageNumber =
		Number(searchParams.get(URL_PARAM.PAGE)) || currentPage || MIN_PAGE_NUMBER;
	const pageRangeDisplayed = isMobile ? 2 : isTablet ? 5 : 12;
	const marginPagesDisplayed = isMobile ? 0 : 3;
	const pages = Array.from(
		{ length: Math.max(0, pageCount) },
		(_, index) => index + 1
	);
	const visiblePages = pages.filter(
		(page) =>
			page <= marginPagesDisplayed ||
			page > pageCount - marginPagesDisplayed ||
			Math.abs(page - pageNumber) <= Math.floor(pageRangeDisplayed / 2)
	);
	const paginationItems: (number | 'break')[] = [];
	visiblePages.forEach((page, index) => {
		if (index > 0 && page - visiblePages[index - 1] > 1)
			paginationItems.push('break');
		paginationItems.push(page);
	});

	const handleOnChange = useCallback(
		(event: ChangeEvent<HTMLSelectElement>) => {
			onSizeChange(parseInt(event.target.value));
		},
		[onSizeChange]
	);

	return (
		<div className="admin-pagination">
			<div className="admin-pagination__wrapper">
				{pageCount > 0 && (
					<CPagination className="pagination">
						<CPaginationItem
							aria-label="Previous page"
							disabled={pageNumber <= 1}
							onClick={() => pageNumber > 1 && onPageChange(pageNumber - 1)}
						>
							◀
						</CPaginationItem>
						{paginationItems.map((page, index) =>
							page === 'break' ? (
								<CPaginationItem
									disabled
									key={`break-${index}`}
								>
									…
								</CPaginationItem>
							) : (
								<CPaginationItem
									key={page}
									active={page === pageNumber}
									onClick={() => onPageChange(page)}
								>
									{page}
								</CPaginationItem>
							)
						)}
						<CPaginationItem
							aria-label="Next page"
							disabled={pageNumber >= pageCount}
							onClick={() =>
								pageNumber < pageCount && onPageChange(pageNumber + 1)
							}
						>
							▶
						</CPaginationItem>
					</CPagination>
				)}
			</div>
			<div className="admin-pagination__size">
				<CFormSelect
					label={`${t({ id: 'admin.pagination.itemsPerPage' })}`}
					onChange={handleOnChange}
					defaultValue={itemsPerPage}
				>
					{PAGE_SIZES.map((size, index) => (
						<option
							key={index}
							value={size}
						>
							{size}
						</option>
					))}
				</CFormSelect>
			</div>
		</div>
	);
};

export default AdminPagination;
