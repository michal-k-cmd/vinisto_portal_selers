'use client';

import { useContext, useEffect, useMemo } from 'react';
import Skeleton from 'react-loading-skeleton';
import { get, isNaN } from 'lodash-es';
import { FavoritesContext } from 'Services/FavoritesService';
import { LocalizationContext } from 'Services/LocalizationService';
import { DeviceServiceContext } from 'Services/DeviceService';
import PaginationNav from 'Components/Pagination';
import { parseAsArrayOf, parseAsInteger, useQueryState } from 'nuqs';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import userSectionStyles from 'pages-spa/UserSection/styles.module.css';

import UserSectionClubDiscounts from '../ClubDiscounts';
import BreadCrumbsUserSection from '../Breadcrumbs';

import ListDesktop from './ListDesktop';
import ListMobile from './ListMobile';
import styles from './styles.module.css';

import './styles.css';

const Favorites = () => {
	const t = useContext(LocalizationContext).useFormatMessage();
	const { favoriteItemsWithTemp, favoritesState } =
		useContext(FavoritesContext);
	const { isMobile, isTablet } = useContext(DeviceServiceContext);
	const { isLoggedIn } = useContext(AuthenticationContext);

	const isLoading = favoritesState.loading;

	const [page, setPage] = useQueryState(
		'page',
		parseAsArrayOf(parseAsInteger, '_').withDefault([1])
	);

	const currentPage =
		get(page, 'length', 0) > 1 ? get(page, '[1]', 1) : get(page, '[0]', 1);

	const [limit] = useQueryState('limit', parseAsInteger.withDefault(20));

	const bundlesCount = favoritesState.favoritesData.length;
	const bundlesCountWithTemp = favoriteItemsWithTemp.length;

	const bundlesToLoadMore = () => {
		const bundlesLeft = bundlesCountWithTemp - currentPage * limit;
		if (bundlesLeft < 1) return 0;
		if (bundlesLeft > limit) return limit;
		return bundlesLeft;
	};

	const bundles = useMemo(() => {
		if (isLoading)
			return Array.from({ length: limit }, () => ({ isLoading: true }));

		const start = ((page[0] ?? 1) - 1) * limit;
		const end = (page[page.length - 1] ?? page[0] ?? 1) * limit;
		return favoriteItemsWithTemp.slice(start, end);
	}, [favoriteItemsWithTemp, isLoading, limit, page]);

	useEffect(() => {
		if (
			page.length > 2 ||
			page.some((pageNum) => isNaN(pageNum)) ||
			(page.length === 2 && (page[0] ?? 1) > (page[1] ?? 2))
		) {
			setPage([1]);
		}
	}, [page, setPage]);

	const handleOnLoadMore = () =>
		setPage([page[0] ?? 1, (page[1] ?? page[0] ?? 1) + 1]);
	const handleOnSelectNextPage = () => setPage([currentPage + 1]);
	const handleOnSelectPreviousPage = () =>
		currentPage > 1 && setPage([currentPage - 1]);
	const totalPaginationPages = Math.ceil(bundlesCountWithTemp / limit);
	const handleOnSelectPage = (page: number) => setPage([page]);

	return (
		<>
			<BreadCrumbsUserSection />
			<div className="vinisto-user-orders">
				<div className={styles.header}>
					<h1
						className={`${userSectionStyles.userSectionMainHeader} ${styles.title}`}
					>
						{t({ id: 'routes.user-section.favorites.name' })}
					</h1>
					<div className={styles.count}>
						{isLoading ? (
							<Skeleton width="90px" />
						) : (
							t(
								{
									id: 'userSection.favorites.itemsCounter',
								},
								{ count: bundlesCount }
							)
						)}
					</div>
				</div>

				{bundlesCountWithTemp === 0 && !isLoading && (
					<div className="vinisto-user-orders__no-order text-center">
						<span>
							{t({ id: 'userSection.favorites.noFavorites' })}
							<br />
							{t({
								id: 'userSection.favorites.saveToFavorites',
							})}
						</span>
					</div>
				)}

				{isMobile || isTablet ? (
					<ListMobile favoritesData={bundles} />
				) : (
					<ListDesktop favoritesData={bundles} />
				)}

				<PaginationNav
					currentPage={currentPage}
					itemsToLoadMoreCount={bundlesToLoadMore()}
					handleOnLoadMore={handleOnLoadMore}
					handleOnSelectPreviousPage={handleOnSelectPreviousPage}
					handleOnSelectNextPage={handleOnSelectNextPage}
					totalPaginationPages={totalPaginationPages}
					handleOnSelectPage={handleOnSelectPage}
				/>

				{!isLoggedIn && (
					<UserSectionClubDiscounts isBreadCrumbsUserSection={false} />
				)}
			</div>
		</>
	);
};

export default Favorites;
