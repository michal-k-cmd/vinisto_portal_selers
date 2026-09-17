'use client';

import { useCallback, useContext, useMemo } from 'react';
import { unescape } from 'lodash-es';
import { LocalizationContext } from 'Services/LocalizationService';
import Link from 'next/link';
import userSectionStyles from 'pages-spa/UserSection/styles.module.css';
import PaginationNav from 'Components/Pagination';
import { useQuery } from '@tanstack/react-query';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import { WarehouseContext } from 'Services/WarehouseService';
import { useGetAllUserNotes } from 'Components/BundleNotes/hooks';
import { SortingTab, SortingTabs } from 'Components/SortingTabs';
import api from 'vinisto_api_client/src/api';
import {
	UserBundlesListParams,
	VinistoHelperDllEnumsUserBundleSortableColumns,
	VinistoOrderDllModelsApiReturnDataUserBundlesReturn,
} from 'vinisto_api_client/src/api-types/order-api';
import { BundleNote } from 'vinisto_api_client/src/api-types/strapi-api';
import {
	parseAsArrayOf,
	parseAsBoolean,
	parseAsInteger,
	parseAsStringEnum,
	useQueryState,
	useQueryStates,
} from 'nuqs';

import BreadCrumbsUserSection from '../Breadcrumbs';

import BoughtProduct from './BoughtProduct';
import {
	BOUGHT_PRODUCT_SORTING_COLUMNS,
	DEFAULT_LIMIT_PER_PAGE,
} from './BoughtProduct/constants';
import Empty from './Empty';

const BoughtProducts = () => {
	const { useFormatMessage } = useContext(LocalizationContext);
	const t = useFormatMessage();
	const getLocalizedValue = useLocalizedValue();
	const { loginHash } = useContext(AuthenticationContext).vinistoUser;
	const language = useContext(LocalizationContext).activeLanguageKey;
	const warehouseContext = useContext(WarehouseContext);

	const userNotesQuery = useGetAllUserNotes();

	const [page, setPage] = useQueryState(
		'page',
		parseAsArrayOf(parseAsInteger, '_').withDefault([1])
	);

	const [sorting, setSorting] = useQueryStates({
		column: parseAsStringEnum<VinistoHelperDllEnumsUserBundleSortableColumns>(
			Object.values(VinistoHelperDllEnumsUserBundleSortableColumns)
		).withDefault(VinistoHelperDllEnumsUserBundleSortableColumns.BUNDLE_NAME),
		isDescending: parseAsBoolean.withDefault(false),
	});

	const params: UserBundlesListParams = {
		UserLoginHash: loginHash,
		Language: language,
		SortingColumn: sorting.column,
		IsSortingDescending: sorting.isDescending,
		Offset: (Number(page[0]) - 1) * DEFAULT_LIMIT_PER_PAGE,
		Limit:
			page.length === 1
				? DEFAULT_LIMIT_PER_PAGE
				: (Number(page[1]) - Number(page[0]) + 1) * DEFAULT_LIMIT_PER_PAGE,
	};

	const boughtProductsQuery = useQuery(
		['boughtProducts', params, page],
		async () => {
			const response =
				await api.get<VinistoOrderDllModelsApiReturnDataUserBundlesReturn>(
					'order-api/user-bundles',
					params
				);

			if (response) {
				const bundleIds = response.userBundles
					?.map((userBundle) => userBundle.bundle?.id)
					.filter((id): id is string => id !== null && id !== undefined);

				if (bundleIds && bundleIds.length > 0)
					warehouseContext.fetchQuantity(bundleIds);
				return response;
			}
		},
		{
			keepPreviousData: true,
			refetchOnWindowFocus: true,
		}
	);

	const currentPage = (page.length ?? 0) > 1 ? page[1] ?? 1 : page[0] ?? 1;

	const bundlesCount = boughtProductsQuery.data?.count ?? 0;

	const boughtBundlesToLoadMore = useMemo(() => {
		const bundlesLeft = bundlesCount - currentPage * DEFAULT_LIMIT_PER_PAGE;
		if (bundlesLeft < 1) return 0;
		if (bundlesLeft > DEFAULT_LIMIT_PER_PAGE) return DEFAULT_LIMIT_PER_PAGE;
		return bundlesLeft;
	}, [bundlesCount, currentPage]);

	const totalPaginationPages =
		bundlesCount <= DEFAULT_LIMIT_PER_PAGE
			? 0
			: Math.ceil(bundlesCount / DEFAULT_LIMIT_PER_PAGE);

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
		setPage((oldPage) => [
			oldPage?.[0] ?? 1,
			(oldPage?.[1] ?? oldPage?.[0] ?? 1) + 1,
		]);
	}, [setPage]);

	const handleOnSelectSorting = useCallback(
		(sortingColumn: (typeof BOUGHT_PRODUCT_SORTING_COLUMNS)[number]) => {
			setSorting({
				column: sortingColumn.column,
				isDescending: sortingColumn.isDescending,
			});
		},
		[setSorting]
	);

	const userNotes = useMemo(() => {
		const userNotes = userNotesQuery.data ?? [];
		const notesByBundleId = new Map<string, BundleNote[]>();
		userNotes.forEach((note) => {
			const notes = notesByBundleId.get(note.bundleId) ?? [];
			notes.push(note);
			notesByBundleId.set(note.bundleId, notes);
		});
		return notesByBundleId;
	}, [userNotesQuery.data]);

	return (
		<>
			<BreadCrumbsUserSection />
			<h1 className={userSectionStyles.userSectionMainHeader}>
				{t({ id: 'routes.user-section.bought-products.name' })}
			</h1>
			<div>
				<SortingTabs>
					{BOUGHT_PRODUCT_SORTING_COLUMNS.map((sortingColumn, index) => (
						<SortingTab
							key={'usbought' + index}
							label={`${t({ id: sortingColumn.label })}`}
							onClick={() => handleOnSelectSorting(sortingColumn)}
							isActive={
								sorting.column === sortingColumn.column &&
								sorting.isDescending === sortingColumn.isDescending
							}
						/>
					))}
				</SortingTabs>

				{boughtProductsQuery.isSuccess &&
					(boughtProductsQuery.data?.userBundles?.length ?? 0) === 0 && (
						<Empty>
							<span>
								{t(
									{ id: 'userSection.bought-products.empty' },
									{
										link: (
											<Link
												href="/"
												className="color-primary fw-bolder"
											>
												{t({
													id: 'userSection.bought-products.startShopping',
												})}
											</Link>
										),
									}
								)}
							</span>
						</Empty>
					)}
				{boughtProductsQuery.data?.userBundles?.map((userBundle, index) => (
					<BoughtProduct
						key={'usboughtpr' + index}
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
						notes={userNotes.get(userBundle.bundle?.id ?? '') ?? []}
						refetchBoughtProducts={boughtProductsQuery.refetch}
						refetchBundleNotes={userNotesQuery.refetch}
					/>
				))}

				{!!boughtProductsQuery.data?.userBundles?.length && (
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
			</div>
		</>
	);
};

export default BoughtProducts;
