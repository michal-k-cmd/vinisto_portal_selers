import {
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useTransition,
} from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { LocalizationContext } from 'Services/LocalizationService';
import { WarehouseContext } from 'Services/WarehouseService';
import CategoryBoxList from 'pages-spa/Category/Components/CategoryBoxList';
import Grid from 'pages-spa/Category/Components/CategoryBundlesWithFilters/Components/Bundles/Components/Grid';
import PaginationNav from 'Components/Pagination';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import ProductBox from 'Components/ProductBox';
import ArticleInfo from 'pages-spa/Home/Components/ArticleTabs/ArticleInfo';
import BlogService from 'Services/ApiService/Cms/Blog';
import ArticleGrid from 'pages-spa/Home/Components/ArticleTabs/ArticleGrid';
import { bundleAdapter } from 'vinisto_api_client/src/index';
import api from 'vinisto_api_client/src/api';
import useAnalytics from 'Hooks/useAnalytics';
import { GA_EVENT } from 'Hooks/useAnalytics/constants';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import {
	// This type/enum is not in the generated files for some reason
	// There are not vital, but it would be good to fix this
	//VinistoHelperDllEnumsFullSearchFullSearchCollection,
	VinistoSearchDllModelsApiFullSearchFullSearchSeparatedReturn,
} from 'vinisto_api_client/src/api-types/product-api';
import { FullSearchSearchStringSeparateResultsListParams } from 'vinisto_api_client/src/api-types/search-api';
import { useIsB2b } from 'Services/PlatformService';

import { getSearchPageHref } from '../helpers';
import type { SearchPageRange, SearchProps } from '../interfaces';

import {
	ARTICLE_LIMIT_PER_PAGE,
	BUNDLE_LIMIT_PER_PAGE,
	CATEGORIES_LIMIT_PER_PAGE,
	FIRST_SEARCH_PAGE,
} from './constants';

import { B2B_NUMERIC_CODE, B2C_NUMERIC_CODE } from '@/shared';

const Products = ({
	searchTerm,
	section,
	page = FIRST_SEARCH_PAGE,
}: SearchProps) => {
	const router = useRouter();
	const [isBundlePagePending, startBundlePageTransition] = useTransition();
	const [isArticlePagePending, startArticlePageTransition] = useTransition();
	const showCategories = section === undefined;
	const showProducts = section === undefined || section === 'produkty';
	const showArticles = section === undefined || section === 'clanky';
	const isB2b = useIsB2b();
	const { loginHash, priceLevel } = useContext(
		AuthenticationContext
	).vinistoUser;
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();
	const warehouseContext = useContext(WarehouseContext);
	const { sendEvent } = useAnalytics();
	const getLocalizedValue = useLocalizedValue();
	const {
		activeCurrency: { currency },
		countryOfSale,
	} = localizationContext;

	const categoriesFullSearchParams = {
		UserLoginHash: loginHash,
		SearchString: searchTerm,
		//Collections: [VinistoHelperDllEnumsFullSearchFullSearchCollection.CATEGORY],
		Collections: ['CATEGORY'],
		Offset: 0,
		Limit: CATEGORIES_LIMIT_PER_PAGE,
		Currency: currency,
		CountryOfSale: countryOfSale,
		PlatformId: isB2b ? B2B_NUMERIC_CODE : B2C_NUMERIC_CODE,
	} satisfies FullSearchSearchStringSeparateResultsListParams;

	const categoriesFullSearchQuery = useQuery(
		['full-search', 'categories', categoriesFullSearchParams],
		() =>
			api
				.get<VinistoSearchDllModelsApiFullSearchFullSearchSeparatedReturn>(
					`search-api/full-search/search-string-separate-results`,
					categoriesFullSearchParams
				)
				.then((response) => {
					return response?.categories ?? [];
				}),
		{
			enabled: showCategories,
			keepPreviousData: true,
		}
	);

	const bundlePage = section === 'produkty' ? page : FIRST_SEARCH_PAGE;
	const setBundlePage = useCallback(
		(nextPage: SearchPageRange) => {
			startBundlePageTransition(() => {
				router.push(getSearchPageHref(searchTerm, 'produkty', nextPage), {
					scroll: section !== 'produkty' || nextPage.length === 1,
				});
			});
		},
		[router, searchTerm, section, startBundlePageTransition]
	);

	const bundlesFullSearchParams = {
		UserLoginHash: loginHash,
		SearchString: searchTerm,
		// Collections: [VinistoHelperDllEnumsFullSearchFullSearchCollection.BUNDLE],
		Collections: ['BUNDLE'],
		Offset: (bundlePage[0] - 1) * BUNDLE_LIMIT_PER_PAGE,
		Limit:
			bundlePage.length === 1
				? BUNDLE_LIMIT_PER_PAGE
				: (bundlePage[1] - bundlePage[0] + 1) * BUNDLE_LIMIT_PER_PAGE,
		Currency: currency,
		CountryOfSale: countryOfSale,
		PlatformId: isB2b ? B2B_NUMERIC_CODE : B2C_NUMERIC_CODE,
	} satisfies FullSearchSearchStringSeparateResultsListParams;

	const bundlesFullSearchQuery = useQuery(
		['full-search', 'bundles', bundlesFullSearchParams],
		() =>
			api
				.get<VinistoSearchDllModelsApiFullSearchFullSearchSeparatedReturn>(
					`search-api/full-search/search-string-separate-results`,
					bundlesFullSearchParams
				)
				.then((response) => {
					const bundleIds = response?.bundles
						?.map((b) => b?.id)
						.filter((id): id is string => id !== null && id !== undefined);

					if (bundleIds && bundleIds.length > 0)
						warehouseContext.fetchQuantity(bundleIds);

					return {
						bundles:
							response?.bundles?.map((bundle) =>
								bundleAdapter.fromApi(bundle, {
									currency,
									customerPriceLevel: priceLevel,
								})
							) ?? [],
						bundleCount: response?.bundlesCount ?? 0,
					};
				}),
		{
			enabled: showProducts,
			keepPreviousData: true,
		}
	);

	const bundlesCount = bundlesFullSearchQuery.data?.bundleCount ?? 0;

	const currentBundlePage = bundlePage[1] ?? bundlePage[0];

	const bundlesToLoadMore = useMemo(() => {
		const bundlesLeft =
			bundlesCount - currentBundlePage * BUNDLE_LIMIT_PER_PAGE;
		if (bundlesLeft < 1) return 0;
		if (bundlesLeft > BUNDLE_LIMIT_PER_PAGE) return BUNDLE_LIMIT_PER_PAGE;
		return bundlesLeft;
	}, [bundlesCount, currentBundlePage]);

	const totalBundlePaginationPages =
		bundlesCount <= BUNDLE_LIMIT_PER_PAGE
			? 0
			: Math.ceil(bundlesCount / BUNDLE_LIMIT_PER_PAGE);

	const handleOnSelectBundlePage = useCallback(
		(bundlePage: number) => setBundlePage([bundlePage]),
		[setBundlePage]
	);

	const handleOnIncreaseBundlePage = useCallback(() => {
		setBundlePage([currentBundlePage + 1]);
	}, [currentBundlePage, setBundlePage]);

	const handleOnDecreaseBundlePage = useCallback(() => {
		currentBundlePage > 1 && setBundlePage([currentBundlePage - 1]);
	}, [currentBundlePage, setBundlePage]);

	const handleOnLoadMoreBundles = useCallback(() => {
		setBundlePage([bundlePage[0], currentBundlePage + 1]);
	}, [bundlePage, currentBundlePage, setBundlePage]);

	const numberOfBundleSkeletonsToShowWhenLoadingMore =
		bundlesToLoadMore >= BUNDLE_LIMIT_PER_PAGE
			? BUNDLE_LIMIT_PER_PAGE
			: bundlesCount % BUNDLE_LIMIT_PER_PAGE;

	const shouldShowBundleSkeletonsAsideFetchedBundles =
		bundlesFullSearchQuery.isFetching && bundlePage.length > 1;

	useEffect(() => {
		const bundles = bundlesFullSearchQuery.data?.bundles;
		if (!showProducts || !bundles?.length) return;

		sendEvent(GA_EVENT.VIEW_ITEM_LIST, {
			item_list_id: 'search_results',
			item_list_name: 'Search results',
			items: bundles.map((bundle, index) => ({
				item_id: bundle.id,
				item_name: getLocalizedValue(bundle.name),
				item_list_id: 'search_results',
				item_list_name: 'Search results',
				index: index + 1,
				price:
					bundle.bundlePrices?.discountedPrice?.value ??
					bundle.bundlePrices?.basePrice?.value ??
					0,
				quantity: 1,
			})),
		});
	}, [
		bundlesFullSearchQuery.data?.bundles,
		getLocalizedValue,
		sendEvent,
		showProducts,
	]);

	const articlePage = section === 'clanky' ? page : FIRST_SEARCH_PAGE;
	const setArticlePage = useCallback(
		(nextPage: SearchPageRange) => {
			startArticlePageTransition(() => {
				router.push(getSearchPageHref(searchTerm, 'clanky', nextPage), {
					scroll: section !== 'clanky' || nextPage.length === 1,
				});
			});
		},
		[router, searchTerm, section, startArticlePageTransition]
	);

	const articlesFullSearchParams = {
		UserLoginHash: loginHash,
		SearchString: searchTerm,
		// Collections: [
		//	VinistoHelperDllEnumsFullSearchFullSearchCollection.CMS_ARTICLE,
		//],
		Collections: ['CMS_ARTICLE'],
		Offset: (articlePage[0] - 1) * ARTICLE_LIMIT_PER_PAGE,
		Limit:
			articlePage.length === 1
				? ARTICLE_LIMIT_PER_PAGE
				: (articlePage[1] - articlePage[0] + 1) * ARTICLE_LIMIT_PER_PAGE,
		Currency: currency,
		CountryOfSale: countryOfSale,
		PlatformId: isB2b ? B2B_NUMERIC_CODE : B2C_NUMERIC_CODE,
	} satisfies FullSearchSearchStringSeparateResultsListParams;

	const articlesFullSearchQuery = useQuery(
		['full-search', 'articles', articlesFullSearchParams],
		() =>
			api
				.get<VinistoSearchDllModelsApiFullSearchFullSearchSeparatedReturn>(
					`search-api/full-search/search-string-separate-results`,
					articlesFullSearchParams
				)
				.then((response) => {
					return {
						articles:
							response.articles?.map((article) =>
								BlogService.mapApiToDomain(article)
							) ?? [],
						articlesCount: response?.articlesCount ?? 0,
					};
				}),
		{
			enabled: showArticles,
			keepPreviousData: true,
		}
	);

	const articlesCount = articlesFullSearchQuery.data?.articlesCount ?? 0;

	const currentArticlePage = articlePage[1] ?? articlePage[0];

	const articlesToLoadMore = useMemo(() => {
		const articlesLeft =
			articlesCount - currentArticlePage * ARTICLE_LIMIT_PER_PAGE;
		if (articlesLeft < 1) return 0;
		if (articlesLeft > ARTICLE_LIMIT_PER_PAGE) return ARTICLE_LIMIT_PER_PAGE;
		return articlesLeft;
	}, [articlesCount, currentArticlePage]);

	const totalArticlePaginationPages =
		articlesCount <= ARTICLE_LIMIT_PER_PAGE
			? 0
			: Math.ceil(articlesCount / ARTICLE_LIMIT_PER_PAGE);

	const handleOnSelectArticlePage = useCallback(
		(articlePage: number) => setArticlePage([articlePage]),
		[setArticlePage]
	);

	const handleOnIncreaseArticlePage = useCallback(() => {
		setArticlePage([currentArticlePage + 1]);
	}, [currentArticlePage, setArticlePage]);

	const handleOnDecreaseArticlePage = useCallback(() => {
		currentArticlePage > 1 && setArticlePage([currentArticlePage - 1]);
	}, [currentArticlePage, setArticlePage]);

	const handleOnLoadMoreArticles = useCallback(() => {
		setArticlePage([articlePage[0], currentArticlePage + 1]);
	}, [articlePage, currentArticlePage, setArticlePage]);

	const numberOfArticleSkeletonsToShowWhenLoadingMore =
		articlesToLoadMore >= ARTICLE_LIMIT_PER_PAGE
			? ARTICLE_LIMIT_PER_PAGE
			: articlesCount % ARTICLE_LIMIT_PER_PAGE;

	const shouldShowArticleSkeletonsAsideFetchedArticles =
		articlesFullSearchQuery.isFetching && articlePage.length > 1;

	const notAnyResultsFound =
		section === undefined &&
		[
			categoriesFullSearchQuery,
			bundlesFullSearchQuery,
			articlesFullSearchQuery,
		].every((query) => query.isFetched) &&
		!categoriesFullSearchQuery.data?.length &&
		!bundlesFullSearchQuery.data?.bundles.length &&
		!articlesFullSearchQuery.data?.articles.length;

	if (notAnyResultsFound) {
		return (
			<div className="container pt-1">
				<div className="row">
					<div className="col">
						<div className="vinisto-card">
							<h1 className="vinisto-category-header__heading">
								{t(
									{ id: 'search.page.header' },
									{
										category: t({
											id: 'search.page.category.categoriesAndProducts',
										}),
										term: searchTerm,
									}
								)}
							</h1>
							<p className="mt-3">{t({ id: 'search.page.empty' })}</p>
						</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="container pt-1">
			{showCategories && !categoriesFullSearchQuery.isInitialLoading && (
				<div className="row">
					<div className="col">
						<div className="vinisto-card vinisto-category-header">
							<h2 className="vinisto-category-header__heading">
								{t(
									{ id: 'search.page.header' },
									{
										category: t({
											id: 'search.page.category.categories',
										}),
										term: searchTerm,
									}
								)}
							</h2>
							{!categoriesFullSearchQuery.data?.length && (
								<p className="mt-3">{t({ id: 'search.page.empty' })}</p>
							)}

							{!!categoriesFullSearchQuery.data?.length && (
								<CategoryBoxList categories={categoriesFullSearchQuery.data} />
							)}
						</div>
					</div>
				</div>
			)}

			{showProducts && (
				<div className="row">
					<div className="col">
						<div className="vinisto-card">
							{bundlesFullSearchQuery.isFetched &&
								!bundlesFullSearchQuery.data?.bundles.length && (
									<>
										<h2 className="vinisto-category-header__heading">
											{t(
												{
													id: 'search.page.header',
												},
												{
													category: t({
														id: 'search.page.category.products',
													}),
													term: searchTerm,
												}
											)}
										</h2>
										<p className="mt-3">{t({ id: 'search.page.empty' })}</p>
									</>
								)}
							{bundlesFullSearchQuery.isLoading && (
								<div className="col-12">
									<div className="vinisto-wide-wine-wrap vinisto-wide-wine-wrap--category mt-2">
										{[...Array(BUNDLE_LIMIT_PER_PAGE)].map((_, i) => (
											<ProductBox
												bundleData={null}
												key={'searchpbload' + i}
												isLoading={true}
											/>
										))}
									</div>
								</div>
							)}
							{!!bundlesFullSearchQuery.data?.bundles.length && (
								<>
									<div className="vinisto-wide-wine-tabs vinisto-wide-wine-tabs--category">
										<nav className="navbar navbar-expand navbar-light p-0 justify-content-between">
											<h2 className="vinisto-category-header__heading">
												{t(
													{
														id: 'search.page.header',
													},
													{
														category: t({
															id: 'search.page.category.products',
														}),
														term: searchTerm,
													}
												)}
											</h2>
											<div className="vinisto-wine-tabs--category__right">
												<div className="vinisto-wine-tabs--category__right__count d-flex text-nowrap">
													{t(
														{
															id: 'search.page.bundles.count',
														},
														{
															count: bundlesFullSearchQuery.data?.bundleCount,
														}
													)}
												</div>
											</div>
										</nav>
									</div>
									<div className="col-12">
										<Grid>
											{bundlesFullSearchQuery.data?.bundles.map((bundle, i) => (
												<ProductBox
													bundleData={bundle}
													key={`category-grid-bundle-item-${
														bundle?.id ?? 'searchpbgrid' + i
													}`}
													isLoading={!bundle}
													itemListId="search_results"
													itemListName="Search results"
													position={i}
												/>
											))}
											{shouldShowBundleSkeletonsAsideFetchedBundles &&
												Array.from({
													length: numberOfBundleSkeletonsToShowWhenLoadingMore,
												}).map((_, i) => (
													<ProductBox
														bundleData={null}
														key={`category-grid-bundle-item-${i}`}
														isLoading={true}
													/>
												))}
										</Grid>
									</div>

									<div className="col-12">
										<PaginationNav
											currentPage={currentBundlePage}
											showLoadMore={section !== undefined}
											itemsToLoadMoreCount={bundlesToLoadMore}
											isMoreItemsLoading={
												isBundlePagePending || bundlesFullSearchQuery.isFetching
											}
											handleOnLoadMore={handleOnLoadMoreBundles}
											handleOnSelectPreviousPage={handleOnDecreaseBundlePage}
											handleOnSelectNextPage={handleOnIncreaseBundlePage}
											totalPaginationPages={totalBundlePaginationPages}
											handleOnSelectPage={handleOnSelectBundlePage}
										/>
									</div>
								</>
							)}
						</div>
					</div>
				</div>
			)}

			{showArticles && (
				<div className="row">
					<div className="col">
						<div className="vinisto-card">
							{!articlesFullSearchQuery.isInitialLoading && (
								<>
									<h2 className="vinisto-category-header__heading">
										{t(
											{ id: 'search.page.header' },
											{
												category: t({
													id: 'search.page.category.articles',
												}),
												term: searchTerm,
											}
										)}
									</h2>
									{!articlesFullSearchQuery.data?.articles.length && (
										<p className="mt-3">{t({ id: 'search.page.empty' })}</p>
									)}
								</>
							)}
							<ArticleGrid>
								{articlesFullSearchQuery.isLoading &&
									Array.from({ length: ARTICLE_LIMIT_PER_PAGE }).map((_, i) => (
										<ArticleInfo
											data={null}
											key={`category-grid-article-item-${i}`}
											isImageLoading={true}
											isLoading={true}
										/>
									))}

								{!!articlesFullSearchQuery.data?.articles.length &&
									articlesFullSearchQuery.data?.articles.map(
										(article, index) => (
											<ArticleInfo
												data={article}
												key={'searcharticleinfoi' + index}
												imageData={{ image: article.image }}
											/>
										)
									)}
								{shouldShowArticleSkeletonsAsideFetchedArticles &&
									Array.from({
										length: numberOfArticleSkeletonsToShowWhenLoadingMore,
									}).map((_, i) => (
										<ArticleInfo
											data={null}
											key={`category-grid-article-item2-${i}`}
											isImageLoading={true}
											isLoading={true}
										/>
									))}
							</ArticleGrid>
							<div className="col-12">
								<PaginationNav
									currentPage={currentArticlePage}
									showLoadMore={section !== undefined}
									itemsToLoadMoreCount={articlesToLoadMore}
									isMoreItemsLoading={
										isArticlePagePending || articlesFullSearchQuery.isFetching
									}
									handleOnLoadMore={handleOnLoadMoreArticles}
									handleOnSelectPreviousPage={handleOnDecreaseArticlePage}
									handleOnSelectNextPage={handleOnIncreaseArticlePage}
									totalPaginationPages={totalArticlePaginationPages}
									handleOnSelectPage={handleOnSelectArticlePage}
								/>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Products;
