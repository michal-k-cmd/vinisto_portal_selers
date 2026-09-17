'use client';

import { useCallback, useContext, useEffect, useMemo } from 'react';
import { ceil, first, last } from 'lodash-es';
import cx from 'classnames';
import { DeviceServiceContext } from 'Services/DeviceService';
import PaginationNav from 'Components/Pagination';
import { useQuery } from '@tanstack/react-query';
import BannerService from 'Services/Banner';
import { BANNER_POSITION } from 'Services/Banner/constants';
import { Banner } from 'Services/Banner/interfaces';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import ProductBox from 'Components/ProductBox';
import { Bundle } from 'vinisto_api_client/src/domain/bundle';
import { useProgress } from 'contexts/ProgressContext';
import useAnalytics from 'Hooks/useAnalytics';
import { GA_EVENT } from 'Hooks/useAnalytics/constants';

import {
	BANNER_OBJECT,
	URL_PARAM_LIMIT_UNLIMITED_VALUE,
} from '../../constants';
import { BundlesWithFiltersContext } from '../../context';

import Grid from './Components/Grid';
import CategoryView from './Components/CategoryView';
import SortingTabs from './Components/SortingTabs';
import styles from './styles.module.css';
import TrackedProductListingBanner from './Components/TrackedProductListingBanner';

const Bundles = () => {
	const getLocalizedValue = useLocalizedValue();
	const { isTablet, isMobile } = useContext(DeviceServiceContext);
	const { start, done } = useProgress();
	const { sendEvent } = useAnalytics();

	const {
		bundlesCount,
		bundlesToLoadMoreCount,
		currentPage,
		isDataLoading,
		limit,
		page,
		setPageParam,
		bundleQueries,
	} = useContext(BundlesWithFiltersContext);

	const isInitialLoading = bundleQueries.every(
		(query) => query.isInitialLoading
	);

	const bundles = bundleQueries
		.flatMap((query) => query.data?.bundles)
		.filter((item) => item !== undefined);

	const isSomeQueryFetching = bundleQueries.some((query) => query.isFetching);

	useEffect(() => {
		isSomeQueryFetching ? start() : done();
	}, [bundleQueries, done, isSomeQueryFetching, start]);

	const isFirstPage = page[0] === 1;

	const bannerService = useMemo(
		() => new BannerService(getLocalizedValue),
		[getLocalizedValue]
	);

	const { data: banners } = useQuery(
		['BannersProductListing'],
		bannerService.fetch(
			BANNER_POSITION.PRODUCT_LIST,
			URL_PARAM_LIMIT_UNLIMITED_VALUE
		),
		{
			enabled: isFirstPage,
		}
	);

	const totalPaginationPages = ceil(bundlesCount / limit);

	const scrollToTop = useCallback(() => {
		handleScrollToView('category-top');
	}, []);

	const handleOnSelectPage = useCallback(
		(page: number) => {
			setPageParam([page]);
			scrollToTop();
		},
		[scrollToTop, setPageParam]
	);
	const handleOnSelectNextPage = useCallback(() => {
		setPageParam([currentPage + 1]);
		scrollToTop();
	}, [currentPage, scrollToTop, setPageParam]);

	const handleOnSelectPreviousPage = useCallback(() => {
		if (currentPage <= 1) {
			return;
		}
		setPageParam([currentPage - 1]);
		scrollToTop();
	}, [currentPage, scrollToTop, setPageParam]);

	const handleScrollToView = (elementSelector: string) => {
		const element = document.getElementById(elementSelector);

		if (element) {
			setTimeout(() => {
				element.scrollIntoView({ behavior: 'smooth', block: 'center' });
			}, 100);
		}
	};

	const handleOnLoadMore = useCallback(() => {
		setPageParam([first(page) ?? 1, (last(page) ?? 1) + 1]);
	}, [page, setPageParam]);

	const bannersCount = banners?.length ?? 0;

	const totalSlotsForBundles = Math.max(
		limit * ((page[1] ?? 1) - (page[0] ?? 1) + 1),
		limit
	);

	type Merged =
		| (Banner & {
				type: string;
				id: undefined;
		  })
		| (Bundle & {
				type?: undefined;
		  });

	const bannersAndBundlesMerged: Merged[] = useMemo(() => {
		if (isInitialLoading) return [];
		if (!isFirstPage) return bundles;
		if (!banners) return bundles;

		const merged: Merged[] = new Array(bannersCount + totalSlotsForBundles);

		banners.forEach((banner) => {
			merged[Math.min(banner.order, merged.length)] = {
				type: BANNER_OBJECT,
				id: undefined,
				...banner,
			};
		});

		let lastCheckedIndex = 0;
		let bundleIndex = 0;
		while (bundleIndex < bundles.length) {
			if (merged[lastCheckedIndex] === undefined) {
				merged[lastCheckedIndex] = bundles[bundleIndex];
				bundleIndex++;
				lastCheckedIndex++;
			} else {
				lastCheckedIndex++;
			}
		}

		return merged;
	}, [
		bundles,
		isInitialLoading,
		isFirstPage,
		banners,
		bannersCount,
		totalSlotsForBundles,
	]);

	useEffect(() => {
		const listedBundles = bannersAndBundlesMerged.filter(
			(item): item is Bundle => 'id' in item && item.id !== undefined
		);

		if (listedBundles.length === 0) return;

		sendEvent(GA_EVENT.VIEW_ITEM_LIST, {
			item_list_id: 'category_product_list',
			item_list_name: 'Category product list',
			items: listedBundles.map((bundle, index) => ({
				item_id: bundle.id,
				item_name: getLocalizedValue(bundle.name),
				item_list_id: 'category_product_list',
				item_list_name: 'Category product list',
				index: index + 1,
				price:
					bundle.bundlePrices?.discountedPrice?.value ??
					bundle.bundlePrices?.basePrice?.value ??
					0,
				quantity: 1,
			})),
		});
	}, [bannersAndBundlesMerged, getLocalizedValue, sendEvent]);

	const LoadingSlots = useMemo(() => {
		const loadersCount = Math.max(
			0,
			limit * ((page[1] ?? 1) - (page[0] ?? 1) + 1)
		);
		const loaders = new Array(loadersCount).fill({
			isLoading: true,
			type: undefined,
			id: undefined,
		});
		return loaders.map((_, i) => (
			<ProductBox
				bundleData={null}
				key={`category-grid-bundle-item-loading-${i}`}
				isLoading={true}
				page={page[0]}
			/>
		));
	}, [limit, page]);

	let bundleCount = 0;

	return (
		<>
			<div>
				{isMobile || isTablet ? (
					<div className="vinisto-card px-2 px-xl-3">
						<CategoryView
							bundlesCount={bundlesCount}
							isLoading={isDataLoading}
						/>
						<SortingTabs />
					</div>
				) : (
					<div className="d-flex justify-content-between align-items-center ps-3">
						<SortingTabs />
						<CategoryView
							bundlesCount={bundlesCount}
							isLoading={isDataLoading}
							className="pb-0"
						/>
					</div>
				)}
			</div>
			<div
				className={cx(
					isMobile || isTablet
						? 'vinisto-card'
						: 'tabs-content rounded-tab-content-corners p-3',
					{
						[styles.isBundlesLoading]: isSomeQueryFetching && page.length < 2,
					}
				)}
			>
				<div className="col-12">
					<div
						id="category-top"
						aria-hidden="true"
					></div>
					<Grid>
						{bannersAndBundlesMerged.map((item, i) => {
							if ('type' in item && item.type === BANNER_OBJECT) {
								return (
									<TrackedProductListingBanner
										banner={item}
										key={`category-grid-banner-item-${i}`}
										index={i}
									/>
								);
							}

							if ('id' in item && item.id !== undefined) {
								const productIndex = bundleCount;
								bundleCount += 1;

								return (
									<ProductBox
										bundleData={item}
										key={`category-grid-bundle-item-${item?.id ?? i}`}
										position={productIndex}
										isLoading={false}
										page={page[0]}
										itemListId="category_product_list"
										itemListName="Category product list"
									/>
								);
							}
							return null;
						})}
						{isInitialLoading && LoadingSlots}
					</Grid>
				</div>
				<div className="col-12">
					{bundlesCount > 0 && (
						<PaginationNav
							currentPage={currentPage}
							totalPaginationPages={totalPaginationPages}
							itemsToLoadMoreCount={bundlesToLoadMoreCount}
							handleOnLoadMore={handleOnLoadMore}
							isMoreItemsLoading={isSomeQueryFetching && page.length > 1}
							handleOnSelectPreviousPage={handleOnSelectPreviousPage}
							handleOnSelectNextPage={handleOnSelectNextPage}
							handleOnSelectPage={handleOnSelectPage}
						/>
					)}
				</div>
			</div>
		</>
	);
};

export default Bundles;
