'use client';

import {
	Fragment,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react';
import {
	every,
	find,
	get,
	isNaN,
	last,
	map,
	nth,
	range,
	some,
} from 'lodash-es';
import { useQueries, useQueryClient } from '@tanstack/react-query';
import { LocalizationContext } from 'Services/LocalizationService';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { DeviceServiceContext } from 'Services/DeviceService';
import Link from 'next/link';
import PaginationNav from 'Components/Pagination';
import userSectionStyles from 'pages-spa/UserSection/styles.module.css';
import { SortingTab, SortingTabs } from 'Components/SortingTabs';
import {
	parseAsArrayOf,
	parseAsBoolean,
	parseAsInteger,
	useQueryState,
} from 'nuqs';
import { OrderListHeaderDesktopOnly } from 'Components/OrderItem/OrderItemB2b';
import { useIsB2b } from 'Services/PlatformService';
import GreenCheckbox from 'pages-spa/Basket/Components/BasketItem/GreenCheckbox';
import Skeleton from 'react-loading-skeleton';
import OrderItemB2b from 'Components/OrderItem/OrderItemB2b';
import OrderItemB2c from 'Components/OrderItem/OrderItemB2c';

import BreadCrumbsUserSection from '../Breadcrumbs';
import OrderDetail from '../OrderDetail';

import { IOrderSorting } from './interfaces';
import { fetchOrders } from './helpers';
import {
	DEFAULT_LIMIT_PER_PAGE,
	ORDER_SORTING_COLUMNS_MOBILE,
	ORDERS_LIST_ID,
	OrderSortingColumn,
	OVERDUE_FILTER,
	QUERY_KEY,
} from './constants';
import styles from './styles.module.css';
import OrderMobile from './OrderMobile';

import { B2B_NUMERIC_CODE } from '@/shared';

const Orders = () => {
	const isB2b = useIsB2b();
	const { useFormatMessage } = useContext(LocalizationContext);
	const { vinistoUser } = useContext(AuthenticationContext);
	const { isDesktop } = useContext(DeviceServiceContext);
	const t = useFormatMessage();

	const [ordId] = useQueryState('id');

	const [isOverdue, setIsOverdue] = useQueryState('isOverdue', parseAsBoolean);

	const userLoginHash = vinistoUser.loginHash ?? '';

	const [sorting, setSorting] = useState<IOrderSorting>({
		column: OrderSortingColumn.TIME,
		isDescending: true,
	});

	const mobileSortingLabel = useMemo(() => {
		return get(
			find(
				ORDER_SORTING_COLUMNS_MOBILE,
				(sortingItem) =>
					sortingItem.column === sorting.column &&
					sortingItem.isDescending === sorting.isDescending
			),
			'label'
		);
	}, [sorting]);

	const queryClient = useQueryClient();

	const [page, setPage] = useQueryState(
		'page',
		parseAsArrayOf(parseAsInteger, '_').withDefault([1])
	);

	const currentPage = (page.length ?? 0) > 1 ? page[1] ?? 1 : page[0] ?? 1;

	const [limit] = useQueryState(
		'limit',
		parseAsInteger.withDefault(DEFAULT_LIMIT_PER_PAGE)
	);

	const queries = useMemo(() => {
		let pagesToFetch = page as number[];
		if (get(page, 'length', 0) == 2) {
			pagesToFetch = range(get(page, '[0]', 1), get(page, '[1]', 2) + 1);
		}
		return map(pagesToFetch, (pageNum: number) => ({
			queryKey: [
				QUERY_KEY,
				{
					userLoginHash,
					sortingColumn: sorting.column,
					isDescending: sorting.isDescending,
					isOverdue,
				},
				pageNum,
			],
			queryFn: () =>
				fetchOrders(
					userLoginHash,
					vinistoUser.id ?? '',
					currentPage,
					limit,
					sorting.column,
					sorting.isDescending,
					!!isOverdue
				),
			refetchOnMount: true,
			refetchOnWindowFocus: false,
			cacheTime: 1000,
			keepPreviousData: true,
		}));
	}, [
		page,
		userLoginHash,
		sorting.column,
		sorting.isDescending,
		vinistoUser.id,
		currentPage,
		limit,
		isOverdue,
	]);

	const ordersQueries = useQueries({ queries });

	const isAllQueriesFetched = ordersQueries.every((query) => query.isFetched);

	const isLoading = useMemo(
		() => some(ordersQueries, { isLoading: true }),
		[ordersQueries]
	);
	[isLoading, ordersQueries];

	const ordersCount = useMemo(
		() =>
			isLoading
				? get(nth(ordersQueries, -2), 'data.count', 0)
				: get(last(ordersQueries), 'data.count', 0),
		[isLoading, ordersQueries]
	);

	const ordersToLoadMore = useMemo(() => {
		const ordersLeft = ordersCount - currentPage * limit;
		if (ordersLeft < 1) return 0;
		if (ordersLeft > limit) return limit;
		return ordersLeft;
	}, [ordersCount, currentPage, limit]);

	const skeletonsCount = useMemo(() => {
		const ordersLeft =
			ordersCount - (currentPage === 1 ? 1 : currentPage - 1) * limit;
		if (ordersLeft < 1) return limit;
		if (ordersLeft > limit) return limit;
		return ordersLeft;
	}, [currentPage, limit, ordersCount]);

	const handleOnIncreasePage = useCallback(() => {
		setPage([currentPage + 1]);
	}, [currentPage, setPage]);

	const handleOnDecreasePage = useCallback(() => {
		currentPage > 1 && setPage([currentPage - 1]);
	}, [currentPage, setPage]);

	const handleOnLoadMore = useCallback(() => {
		setPage((oldPage) => [
			get(oldPage, '[0]', 1),
			get(oldPage, '[1]', get(oldPage, '[0]', 1)) + 1,
		]);
	}, [setPage]);

	const totalPaginationPages = Math.ceil(ordersCount / limit);
	const handleOnSelectPage = useCallback(
		(page: number) => setPage([page]),
		[setPage]
	);

	useEffect(() => {
		if (
			get(page, 'length', 0) > 2 ||
			!every(page, (pageNum) => !isNaN(pageNum)) ||
			(get(page, 'length', 0) == 2 && get(page, '[0]', 1) > get(page, '[1]', 2))
		)
			setPage([1]);
	}, [page, setPage]);

	useEffect(() => {
		queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
	}, [queryClient]);

	const handleOnSelectSorting = useCallback((eventKey: number | null) => {
		const sortingColumn = ORDER_SORTING_COLUMNS_MOBILE[eventKey ?? 0];
		if (!sortingColumn) {
			return;
		}
		setSorting({
			column: sortingColumn.column,
			isDescending: sortingColumn.isDescending,
		});
	}, []);

	if (ordId) return <OrderDetail orderId={ordId} />;

	return (
		<>
			<BreadCrumbsUserSection />

			<h1 className={userSectionStyles.userSectionMainHeader}>
				{t({ id: 'routes.user-section.myOrders.name' })}
			</h1>

			<div id={ORDERS_LIST_ID}>
				<SortingTabs>
					{ORDER_SORTING_COLUMNS_MOBILE.filter((sortingColumn) =>
						sortingColumn.label === OVERDUE_FILTER ? isB2b : true
					).map((sortingColumn, index) => {
						if (sortingColumn.label !== OVERDUE_FILTER) {
							return (
								<SortingTab
									key={'usol-' + index}
									label={`${t({ id: sortingColumn.label })}`}
									onClick={() => handleOnSelectSorting(index)}
									isActive={mobileSortingLabel === sortingColumn.label}
								/>
							);
						}
						return (
							<SortingTab
								key={'usol-' + index}
								label={`${t({ id: 'userSection.b2b.overdue.title' })}`}
								onClick={() => {
									setIsOverdue(isOverdue ? null : true);
									setPage([1]);
								}}
								isActive={!!isOverdue}
								className={styles.overdueFilter}
							>
								{(label) => (
									<div className="d-flex gap-2 align-items-center">
										<GreenCheckbox
											checked={!!isOverdue}
											setChecked={() => null}
										/>
										<span
											className={styles.label}
											data-content={label}
										>
											{label}
										</span>
									</div>
								)}
							</SortingTab>
						);
					})}
				</SortingTabs>

				{isAllQueriesFetched && ordersCount === 0 && (
					<div className={styles.noOrder}>
						<span>
							{isOverdue
								? t({ id: 'userSection.orders.overdue.empty' })
								: t(
										{ id: 'userSection.orders.empty' },
										{
											link: (
												<Link
													href="/"
													className="color-primary pointer fw-bolder"
													key="uso-startShopping"
												>
													{t({
														id: 'userSection.orders.startShopping',
													})}
												</Link>
											),
										}
								  )}
						</span>
					</div>
				)}
				<div>
					<div>
						<OrderListHeaderDesktopOnly />
						{ordersQueries.map((query) => {
							if (query.data?.orders) {
								return query.data.orders.map((order, key) => {
									const isB2bOrder = order.platformId === B2B_NUMERIC_CODE;

									return (
										<Fragment key={`uso-order-${order.id ?? key}`}>
											{isB2bOrder ? (
												<OrderItemB2b
													isLoading={isLoading}
													order={order}
													showDetailButton={true}
													orderNumberAsLink={true}
												/>
											) : isDesktop ? (
												<OrderItemB2c
													isLoading={isLoading}
													order={order}
													showDetailButton={true}
													orderNumberAsLink={true}
												/>
											) : (
												<OrderMobile
													order={order}
													isLoading={isLoading}
												/>
											)}
										</Fragment>
									);
								});
							}
							if (query.isInitialLoading)
								return Array.from({ length: skeletonsCount }).map((_, i) => (
									<Skeleton key={`skeleton-${i}`} />
								));
						})}
					</div>

					<PaginationNav
						currentPage={currentPage}
						totalPaginationPages={totalPaginationPages}
						itemsToLoadMoreCount={ordersToLoadMore}
						handleOnLoadMore={handleOnLoadMore}
						handleOnSelectPreviousPage={handleOnDecreasePage}
						handleOnSelectNextPage={handleOnIncreasePage}
						handleOnSelectPage={handleOnSelectPage}
					/>
				</div>
			</div>
		</>
	);
};

export default Orders;
