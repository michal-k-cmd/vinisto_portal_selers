import { memo, useCallback, useContext, useMemo } from 'react';
import { unescape } from 'lodash-es';
import { LocalizationContext } from 'Services/LocalizationService';
import userSectionStyles from 'pages-spa/UserSection/styles.module.css';
import { UseQueryResult } from '@tanstack/react-query';
import PaginationNav from 'Components/Pagination';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import Empty from 'pages-spa/UserSection/BoughtProducts/Empty';
import { SortingTab, SortingTabs } from 'Components/SortingTabs';
import {
	VinistoHelperDllEnumsUserBundleSortableColumns,
	VinistoOrderDllModelsApiReturnDataUserBundlesReturn,
} from 'vinisto_api_client/src/api-types/order-api';

import BoughtProduct from '../../BoughtProducts/BoughtProduct';

import styles from './styles.module.css';
import Review from './Review';
import {
	EVALUATED,
	EVALUATED_PRODUCTS_SORTING_COLUMNS,
	LIMITS_PER_PAGE,
} from './../constants';

interface EvaluatedBundlesListProps {
	page: (number | null)[] | number[];
	setPage: (oldPage: any) => any[];
	sorting: {
		column: VinistoHelperDllEnumsUserBundleSortableColumns;
		isDescending: boolean;
	};
	setSorting: (sorting: {
		column: VinistoHelperDllEnumsUserBundleSortableColumns;
		isDescending: boolean;
	}) => void;
	query: UseQueryResult<
		VinistoOrderDllModelsApiReturnDataUserBundlesReturn,
		unknown
	>;
	refetchCallback?: () => void;
}

const EvaluatedBundlesList = memo(
	({
		page,
		setPage,
		sorting,
		setSorting,
		query,
	}: EvaluatedBundlesListProps) => {
		const { useFormatMessage } = useContext(LocalizationContext);
		const getLocalizedValue = useLocalizedValue();
		const t = useFormatMessage();

		const currentPage = (page.length ?? 0) > 1 ? page[1] ?? 1 : page[0] ?? 1;

		const bundlesCount = query.data?.count ?? 0;

		const boughtBundlesToLoadMore = useMemo(() => {
			const ordersLeft =
				bundlesCount - currentPage * LIMITS_PER_PAGE[EVALUATED];
			if (ordersLeft < 1) return 0;
			if (ordersLeft > LIMITS_PER_PAGE[EVALUATED])
				return LIMITS_PER_PAGE[EVALUATED];
			return ordersLeft;
		}, [bundlesCount, currentPage]);

		const totalPaginationPages =
			bundlesCount <= LIMITS_PER_PAGE[EVALUATED]
				? 0
				: Math.ceil(bundlesCount / LIMITS_PER_PAGE[EVALUATED]);

		const handleOnSelectPage = useCallback(
			(page: number) => setPage([page]),
			[setPage]
		);

		const handleOnIncreasePage = useCallback(() => {
			setPage([currentPage + 1]);
		}, [currentPage, setPage]);

		const handleOnDecreasePage = useCallback(() => {
			currentPage > 1 && setPage([currentPage - 1]);
		}, [currentPage, setPage]);

		const handleOnLoadMore = useCallback(() => {
			setPage((oldPage: any) => [
				oldPage?.[0] ?? 1,
				(oldPage?.[1] ?? oldPage?.[0] ?? 1) + 1,
			]);
		}, [setPage]);

		const handleOnSelectSorting = useCallback(
			(sortingColumn: (typeof EVALUATED_PRODUCTS_SORTING_COLUMNS)[number]) => {
				setSorting({
					column: sortingColumn.column,
					isDescending: sortingColumn.isDescending,
				});
			},
			[setSorting]
		);
		return (
			<>
				<h2 className={userSectionStyles.userSectionHeader}>
					{t({ id: 'userSection.boughtProduct.evaluated' })}
				</h2>

				<SortingTabs>
					{EVALUATED_PRODUCTS_SORTING_COLUMNS.map((sortingColumn, index) => (
						<SortingTab
							key={'usrew' + index}
							label={`${t({ id: sortingColumn.label })}`}
							onClick={() => handleOnSelectSorting(sortingColumn)}
							isActive={
								sorting.column === sortingColumn.column &&
								sorting.isDescending === sortingColumn.isDescending
							}
						/>
					))}
				</SortingTabs>

				{query.isSuccess && query.data?.userBundles?.length === 0 && (
					<Empty>{t({ id: 'userSection.boughtProduct.reviews.empty' })}</Empty>
				)}

				{query.data?.userBundles?.map((userBundle, index) => (
					<BoughtProduct
						key={'usbpc' + index}
						image={userBundle.image}
						bundleId={`${userBundle.bundle?.id}`}
						// TODO solve html entities in a more robust way in the future
						bundleName={unescape(
							getLocalizedValue(userBundle.bundle?.name ?? [])
						)}
						bundleUrl={getLocalizedValue(userBundle.bundle?.url ?? [])}
						bundleSpecificationDetails={userBundle.specificationDetails}
						bundle={userBundle.bundle}
						orders={userBundle.orders}
						rating={userBundle.evaluation}
						refetchBoughtProducts={query.refetch}
						showNewNoteButton={false}
						showLastOrder={true}
						productClassName={styles.notEvaluatedProduct}
						lastOrderClassName={styles.lastOrder}
						showBuyAgainButton={false}
						showEditRatingButton={true}
						showMoreContent={
							<Review text={userBundle.evaluation?.text ?? null} />
						}
					/>
				))}

				{!!query.data?.userBundles?.length && (
					<PaginationNav
						currentPage={currentPage}
						totalPaginationPages={totalPaginationPages}
						itemsToLoadMoreCount={boughtBundlesToLoadMore}
						handleOnLoadMore={handleOnLoadMore}
						handleOnSelectPreviousPage={handleOnDecreasePage}
						handleOnSelectNextPage={handleOnIncreasePage}
						handleOnSelectPage={handleOnSelectPage}
						className="pe-1"
					/>
				)}
			</>
		);
	}
);

EvaluatedBundlesList.displayName = 'EvaluatedBundlesList';

export default EvaluatedBundlesList;
