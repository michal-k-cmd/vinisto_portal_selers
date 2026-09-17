import { useContext } from 'react';
import cx from 'classnames';
import Pagination from 'react-responsive-pagination';
import { LocalizationContext } from 'Services/LocalizationService';
import ItemCardSCrollArrowIcon from 'Components/Icons/ItemCardScrollArrow';
import { DeviceServiceContext } from 'Services/DeviceService';
import LoadingSpinner from 'Components/Preloader/Components/LoadingSpinner';

import styles from './styles.module.css';

export interface PaginationProps {
	className?: string;
	currentPage: number;
	totalPaginationPages: number;
	itemsToLoadMoreCount: number;
	showLoadMore?: boolean;
	isMoreItemsLoading?: boolean;
	handleOnLoadMore: () => void;
	handleOnSelectPreviousPage: () => void;
	handleOnSelectNextPage: () => void;
	handleOnSelectPage: (page: number) => void;
}
const PaginationNav = ({
	className,
	currentPage,
	totalPaginationPages,
	itemsToLoadMoreCount,
	showLoadMore = true,
	isMoreItemsLoading = false,
	handleOnLoadMore,
	handleOnSelectPreviousPage,
	handleOnSelectNextPage,
	handleOnSelectPage,
}: PaginationProps) => {
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();
	const previousButtonDisabled = currentPage <= 1;
	const { layoutWidth } = useContext(DeviceServiceContext);

	return (
		<div className={`${className} ${styles.loadMore}`}>
			<div className={styles.empty}></div>
			<div className={`moreBtnWrap ${styles.moreBtnWrap}`}>
				{totalPaginationPages > 1 && (
					<button
						className={styles.previousPage}
						onClick={handleOnSelectPreviousPage}
						disabled={previousButtonDisabled}
					>
						<ItemCardSCrollArrowIcon
							id="category-pagination-next-ico"
							alt={t({
								id: 'pagination.previousPage',
							})}
							title={``}
							className={styles.arrow}
						/>
					</button>
				)}
				{itemsToLoadMoreCount !== 0 && (
					<>
						{showLoadMore && (
							<button
								className={cx(styles.moreBtn, 'vinisto-btn vinisto-bg-green')}
								onClick={() => handleOnLoadMore()}
								disabled={isMoreItemsLoading}
							>
								{isMoreItemsLoading && (
									<LoadingSpinner
										height={20}
										width={20}
										strokeWidth={3}
										wrapperClass={styles.loadingSpinner}
										visible={isMoreItemsLoading}
									/>
								)}
								<span
									className={cx(styles.loadMoreText, {
										invisible: isMoreItemsLoading,
									})}
								>
									{t(
										{
											id: 'pagination.loadAnother',
										},
										{
											count: itemsToLoadMoreCount,
										}
									)}
								</span>
							</button>
						)}

						<button
							className={styles.nextPage}
							onClick={() => handleOnSelectNextPage()}
						>
							<ItemCardSCrollArrowIcon
								id="category-pagination-next-ico"
								alt={t({
									id: 'pagination.previousPage',
								})}
								title={``}
								className={styles.arrow}
							/>
						</button>
					</>
				)}
			</div>
			<div
				className={cx(
					styles.paginationWrap,
					{ [styles.paginationWrapMobile]: !showLoadMore },
					className
				)}
			>
				<Pagination
					className={styles.paging}
					pageItemClassName={styles.pagingItem}
					activeItemClassName={styles.active}
					pageLinkClassName={styles.pagingLink}
					disabledItemClassName={styles.pagingDisabled}
					renderNav={false}
					srOnlyClassName=""
					a11yActiveLabel={`${currentPage}`}
					ariaCurrentAttr={true}
					narrowStrategy={['dropNav', 'dropEllipsis']}
					current={currentPage}
					total={totalPaginationPages}
					onPageChange={handleOnSelectPage}
					maxWidth={layoutWidth < 500 ? undefined : 450}
				/>
			</div>
		</div>
	);
};

export default PaginationNav;
