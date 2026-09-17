import { Combobox } from '@headlessui/react';
import { useQuery } from '@tanstack/react-query';
import CloseIcon from 'Components/Icons/Close';
import { NavbarContext } from 'Components/Navbar/context';
import LoadingSpinner from 'Components/Preloader/Components/LoadingSpinner';
import Loader from 'Components/View/Loader';
import { TEST_IDS } from 'Constants/test-ids';
import useDebounce from 'Hooks/useDebounce';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import useOnClickOutside from 'Hooks/useOnClickOutside';
import { VinistoProductDllModelsApiCategoryCategory } from 'vinisto_api_client/src/api-types/product-api';
import { DeviceServiceContext } from 'Services/DeviceService';
import { LocalizationContext } from 'Services/LocalizationService';
import { WarehouseContext } from 'Services/WarehouseService';
import { useIsB2b } from 'Services/PlatformService';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import cx from 'classnames';
import {
	ChangeEvent,
	KeyboardEventHandler,
	Suspense,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import Link from 'next/link';
import { LinkTile } from 'vinisto_ui';
import useSectionLinkWidgetsQuery from 'Hooks/use-section-link-widgets-query';
// import { useLastViewedBundles } from 'Hooks/useLastViewedBundles';
import {
	RecommenderName,
	useExternalRecommendedBundles,
} from 'Hooks/useExternalRecommendedBundles';
import getBundleImage, { IMAGE_SIZE_THUMB_64x80 } from 'Helpers/getBundleImage';
import usePreventScroll from 'Hooks/usePreventScroll';
import { Allowed_Sections } from 'vinisto_api_client/src/domain/link-widget/enums';
import { bundleAdapter } from 'vinisto_api_client/src/index';
import { Bundle } from 'vinisto_api_client/src/domain/bundle';
import { useRouter } from 'next/navigation';
import ProductBox from 'Components/ProductBox';

import { MIN_SEARCH_LENGTH } from './constants';
import SearchResultBundleItem from './SearchResultBundleItem';
import styles from './styles.module.css';

import './styles.css';
import StrapiService from '@/strapi-service';
import { SearchApi } from '@/api-types/search-api';
import api from '@/api';

interface SearchProps {
	onToggleResult?: (value: boolean) => void;
}

const Search = ({ onToggleResult }: SearchProps) => {
	const isB2b = useIsB2b();
	const { isMobile, isTablet, layoutHeight, footerHeight } =
		useContext(DeviceServiceContext);
	const localizationContext = useContext(LocalizationContext);
	const {
		activeCurrency: { currency },
		countryOfSale,
	} = localizationContext;
	const t = localizationContext.useFormatMessage();
	const warehouseContext = useContext(WarehouseContext);
	const { push } = useRouter();
	const getLocalizedValue = useLocalizedValue();
	const { priceLevel: customerPriceLevel, loginHash: userLoginHash } =
		useContext(AuthenticationContext).vinistoUser;

	const [isFocused, setIsFocused] = useState(false);
	const [search, setSearch] = useState('');

	// `encodeURIComponent` by itself won't work here. React-router is using its own non-standard way of encoding / decoding route segments,
	// so the resulting route would differ and using `decodeURIComponent` on the destination route would likely crash the app.
	const encodedSearch = encodeURIComponent(search.trim());

	const debouncedSearch = useDebounce(search, 600);

	// TODO: Switch back to useLastViewedBundles once last viewed will be fixed (api returns 'null' atm)
	//const { data: lastViewedBundles } = useLastViewedBundles();
	const { data: { bundles: lastViewedBundles } = {} } =
		useExternalRecommendedBundles({
			type: RecommenderName.Autocomplete_popup,
			isB2b,
		});
	const { filteredLinks: recommendedCategories } = useSectionLinkWidgetsQuery(
		Allowed_Sections.SEARCH
	);

	const inputRef = useRef<HTMLInputElement>(null);
	const searchButtonRef = useRef<HTMLButtonElement>(null);
	const { menuRef } = useContext(NavbarContext);

	const mobileHeaderHeight = 38;

	const searchResultsHeight =
		isMobile || isTablet
			? layoutHeight - mobileHeaderHeight - footerHeight
			: 'auto';

	useOnClickOutside([menuRef], () => setIsFocused(false));

	const collections: ('BUNDLE' | 'CATEGORY' | 'CMS_ARTICLE')[] = isB2b
		? ['BUNDLE', 'CATEGORY']
		: ['BUNDLE', 'CATEGORY', 'CMS_ARTICLE'];

	const query = useQuery({
		queryKey: [
			'search-bundles',
			debouncedSearch,
			{ currency, countryOfSale, customerPriceLevel, isB2b, collections },
		],
		queryFn: () =>
			api
				.get<
					SearchApi.FullSearchSearchStringSeparateResultsList.ResponseBody,
					SearchApi.FullSearchSearchStringSeparateResultsList.RequestQuery
				>(`search-api/full-search/search-string-separate-results`, {
					Collections: collections,
					UserLoginHash: userLoginHash,
					SearchString: debouncedSearch,
					Limit: 15,
					IsMainImagesOnly: true,
				})
				.then((data) => {
					const bundleIds = data?.bundles
						?.map((b) => b?.id)
						.filter((id): id is string => id !== null && id !== undefined);

					if (bundleIds && bundleIds.length > 0)
						warehouseContext.fetchQuantity(bundleIds);

					const bundles = (data?.bundles ?? []).map((bundle) =>
						// @ts-expect-error Types from search-api and product-api are slightly different
						bundleAdapter.fromApi(bundle, {
							currency,
							customerPriceLevel,
						})
					);

					// This seem like a bad practice, but while rendering Combobox.Options directly from 'data' did work,
					// it caused an annoying Combobox.Options flickering on every new search request.
					// @ts-expect-error Types from search-api and product-api are slightly different
					setCategoriesList(data?.categories ?? []);
					setBundlesList(bundles);
					setArticlesList(data?.articles ?? []);
					return data;
				})
				.catch((e) => {
					return Promise.reject(e);
				}),
		cacheTime: 0,
		staleTime: 0,
		enabled: debouncedSearch?.length >= MIN_SEARCH_LENGTH && isFocused,
	});

	const strapiLandingsQuery = useQuery({
		queryKey: ['search-strapi-landings', debouncedSearch],
		queryFn: () =>
			StrapiService.searchForStringInLanding(debouncedSearch).then(
				(res) => res.data.data ?? []
			),
		enabled: debouncedSearch?.length >= MIN_SEARCH_LENGTH && isFocused,
	});

	const showLoadingSpinner =
		query.isLoading &&
		debouncedSearch?.length >= MIN_SEARCH_LENGTH &&
		isFocused;

	const [bundlesList, setBundlesList] = useState<Bundle[]>([]);

	const [categoriesList, setCategoriesList] = useState<
		VinistoProductDllModelsApiCategoryCategory[]
	>([]);

	const [articlesList, setArticlesList] = useState<any[]>([]);

	const showNothingFoundMessage =
		bundlesList?.length === 0 &&
		categoriesList?.length === 0 &&
		articlesList?.length === 0 &&
		search.length >= MIN_SEARCH_LENGTH;

	const areThereCategoriesToShow = useMemo(() => {
		return (
			(categoriesList?.length > 0 && search.length >= MIN_SEARCH_LENGTH) ||
			(search.length < MIN_SEARCH_LENGTH &&
				recommendedCategories &&
				recommendedCategories.length > 0)
		);
	}, [categoriesList, recommendedCategories, search]);

	const areThereBundlesToShow = useMemo(() => {
		return (
			bundlesList?.length > 0 ||
			(search.length < MIN_SEARCH_LENGTH &&
				lastViewedBundles &&
				lastViewedBundles.length > 0)
		);
	}, [bundlesList, lastViewedBundles, search]);

	const areThereArticlesToShow = useMemo(() => {
		return articlesList?.length > 0 && search.length >= MIN_SEARCH_LENGTH;
	}, [articlesList, search]);

	const areThereStrapiandingsToShow = useMemo(() => {
		return (
			!!strapiLandingsQuery.data?.length && search.length >= MIN_SEARCH_LENGTH
		);
	}, [search.length, strapiLandingsQuery.data?.length]);

	usePreventScroll({ isScrollDisabled: isFocused });

	useEffect(() => {
		if (isFocused) {
			onToggleResult?.(true);
		}
	}, [isFocused, onToggleResult]);

	useEffect(() => {
		document.addEventListener('keydown', closeMenuOnEscape);
		return () => {
			document.removeEventListener('keydown', closeMenuOnEscape);
		};
	}, []);

	const closeMenuOnEscape = (e: KeyboardEvent) => {
		if (e.key === 'Escape') {
			setIsFocused(false);
			setSearch('');
		}
	};

	const unfocus = () => {
		if (document.activeElement instanceof HTMLElement) {
			document.activeElement.blur();
		}
	};

	const openSearchResults = () => {
		if (!isFocused) {
			setIsFocused(true);
		}

		inputRef.current?.dispatchEvent(new Event('input', { bubbles: true }));
	};

	const clearSearchInput = (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		event.stopPropagation();
		setSearch('');
		requestAnimationFrame(() => {
			inputRef.current?.focus();
		});
	};

	const handleClearButtonInteraction = (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		if (isMobile || isTablet) {
			// For mobile and tablet, use onMouseDown
			clearSearchInput(event);
		} else {
			// For desktop, use onClick (which will be triggered after onMouseDown)
			if (event.type === 'click') {
				clearSearchInput(event);
			}
		}
	};

	const closeSearchResults = () => {
		if (isFocused) {
			setIsFocused(false);
		}
	};

	const handleOnItemClick = (item: Record<string, any>) => {
		closeSearchResults();
		const newSearchValue = getLocalizedValue(item?.name ?? []);
		if (newSearchValue) {
			setSearch(newSearchValue);
		}
	};

	const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
		openSearchResults();
		setSearch(e.target.value);
	};

	const handleOnSelect = (item: any) => {
		unfocus();
		closeSearchResults();

		if (typeof item === 'object') {
			const newSearchValue = getLocalizedValue(item?.name ?? []);
			setSearch(newSearchValue);
			if (item?.type === 'bundle') {
				push(
					`/${t({ id: 'routes.product.route' })}/${getLocalizedValue(
						item?.url ?? []
					)}`
				);
			} else if (item?.type === 'category') {
				push(
					`/${t({ id: 'routes.category.route' })}/${getLocalizedValue(
						item?.url ?? []
					)}`
				);
			} else if (item?.type === 'article') {
				push(`/${t({ id: 'routes.blog.route' })}/${item?.url}`);
			}
		} else {
			push(`/${t({ id: 'routes.search.route' })}/${encodedSearch}`);
		}
	};

	const handleOnKeyDown = (
		event:
			| (KeyboardEventHandler<HTMLInputElement> & { key: string })
			| undefined,
		activeOption: any
	) => {
		if (event?.key !== 'Enter' || !activeOption) return;
		return handleOnSelect(activeOption);
	};

	const handleOnSearchButtonClick = () => {
		if (search?.length >= MIN_SEARCH_LENGTH) {
			closeSearchResults();
			push(`/${t({ id: 'routes.search.route' })}/${encodedSearch}`);
			setTimeout(() => unfocus(), 10);
		}
	};

	return (
		<div className={styles.relativeWrapperForCloseSearch}>
			{isFocused && <div className={styles.searchResultsBackdrop}></div>}
			<Combobox
				value={search}
				onChange={handleOnSelect}
			>
				{({ activeOption }) => {
					return (
						<div
							className={cx(styles.searchWrapper, isFocused && styles.maximize)}
							ref={menuRef}
						>
							<Combobox.Label className={styles.searchLabel}>
								{showLoadingSpinner && (
									<LoadingSpinner wrapperClass={styles.loadingSpinner} />
								)}
								<Combobox.Input
									className={styles.searchInput}
									placeholder={`${t({
										id: 'search.placeholder',
									})}`}
									onChange={handleOnChange}
									onClick={openSearchResults}
									// @ts-expect-error wrong React types for event
									onKeyDown={(e) => handleOnKeyDown(e, open, activeOption)}
									autoComplete="off"
									ref={inputRef}
									value={search}
								/>
								{search.length > 0 && (
									<button
										// On mobile and tablet, onClick just blurs the input, so we need to use onMouseDown
										onClick={handleClearButtonInteraction}
										onMouseDown={handleClearButtonInteraction}
										className={styles.closeSearch}
										style={{
											'--submit-btn-width': `${
												searchButtonRef.current?.offsetWidth ?? 0
											}p`,
										}}
									>
										<Suspense fallback={<Loader blank />}>
											<CloseIcon className={styles.closeSearchIcon} />
										</Suspense>
									</button>
								)}
							</Combobox.Label>
							{isFocused && (
								<Combobox.Options
									className={styles.searchResults}
									style={{
										height: searchResultsHeight,
									}}
									static
								>
									<div className="position-relative">
										<button
											className={cx(styles.closeSearch, {
												[styles.quicklyVisualyCenterWhenResultsAreEmpty]: !(
													areThereCategoriesToShow ||
													areThereBundlesToShow ||
													areThereArticlesToShow
												),
											})}
											onClick={closeSearchResults}
										>
											<Suspense fallback={<Loader blank />}>
												<CloseIcon className={styles.closeSearchIcon} />
											</Suspense>
										</button>
									</div>

									<Combobox.Option value="showMoreBtn" />
									{!showNothingFoundMessage ? (
										<>
											{areThereCategoriesToShow && (
												<div
													className={styles.searchResultsHeader}
													role="heading"
													aria-level={1}
												>
													{t({
														id: 'search.popup.categoriesHeader',
													})}
												</div>
											)}
											<div className={styles.categoriesContainer}>
												{search.length < MIN_SEARCH_LENGTH &&
													recommendedCategories?.map((category) => (
														<Combobox.Option
															value={{
																...category,
																type: 'category',
															}}
															key={category?.id || 'navrecom'}
														>
															{() => (
																<Link
																	href={category.url ?? ''}
																	onClick={() => handleOnItemClick(category)}
																	className={cx(
																		styles.searchResultsCategoryItem
																	)}
																>
																	<LinkTile
																		title={category.name ?? ''}
																		img={{
																			src: category.imageLocator ?? '',
																			alt: category.name ?? '',
																		}}
																	/>
																</Link>
															)}
														</Combobox.Option>
													))}
												{search.length >= MIN_SEARCH_LENGTH &&
													categoriesList?.map(
														(
															category: VinistoProductDllModelsApiCategoryCategory
														) => (
															<Combobox.Option
																value={{
																	...category,
																	type: 'category',
																}}
																key={category?.id || 'navsearchcb'}
															>
																{() => (
																	<Link
																		href={`/${t({
																			id: 'routes.category.route',
																		})}/${getLocalizedValue(
																			category?.url ?? []
																		)}`}
																		onClick={() => handleOnItemClick(category)}
																		className={cx(
																			styles.searchResultsCategoryItem
																		)}
																	>
																		<LinkTile
																			title={getLocalizedValue(
																				category?.name ?? []
																			)}
																			img={{
																				src: getBundleImage(
																					category.images,
																					IMAGE_SIZE_THUMB_64x80
																				),
																				alt: getLocalizedValue(
																					category?.name ?? []
																				),
																			}}
																		/>
																	</Link>
																)}
															</Combobox.Option>
														)
													)}
											</div>
											{areThereBundlesToShow && (
												<div
													className={styles.searchResultsHeader}
													role="heading"
													aria-level={1}
												>
													{t({
														id: 'search.popup.bundlesHeader',
													})}
												</div>
											)}
											<div className={styles.bundlesContainer}>
												{(search.length < MIN_SEARCH_LENGTH
													? lastViewedBundles
													: bundlesList
												)?.map((bundle) => (
													<Combobox.Option
														className={styles.searchResultsBundleItem}
														value={{
															...bundle,
															type: 'bundle',
														}}
														key={bundle?.id || 'navsearchbundlecb'}
													>
														{() => {
															return (
																<div
																	className={cx(
																		'vinisto-search-productbox',
																		styles.searchResultsBundleItem
																	)}
																	onClick={() => {
																		setIsFocused(false);
																	}}
																	onKeyDown={() => setIsFocused(false)}
																	role="button"
																	tabIndex={0}
																>
																	{isMobile ? (
																		<div className="vinisto-search-productbox">
																			<ProductBox
																				bundleData={bundle}
																				showAddToBasketBtn={isB2b}
																				showSpecifications={false}
																				showProducer={true}
																				showAddToFavoritesBtn={false}
																				searchString={search}
																			/>
																		</div>
																	) : (
																		<div className={styles.hasHover}>
																			<SearchResultBundleItem
																				bundle={bundle}
																				searchString={search}
																				displayCta={isB2b}
																			/>
																		</div>
																	)}
																</div>
															);
														}}
													</Combobox.Option>
												))}
											</div>
											{areThereArticlesToShow && (
												<div
													className={styles.searchResultsHeader}
													role="heading"
													aria-level={1}
												>
													{t({
														id: 'search.popup.articlesHeader',
													})}
												</div>
											)}
											<div className={styles.articlesContainer}>
												{articlesList?.slice(0, 4).map((article) => (
													<Combobox.Option
														value={{
															...article,
															type: 'article',
														}}
														key={article?.id || 'navsearchart'}
													>
														{() => (
															<Link
																href={`/${t({
																	id: 'routes.blog.route',
																})}/${article.url}`}
																className={cx(
																	styles.searchResultsArticleItem,
																	styles.hasHover
																)}
																onClick={closeSearchResults}
															>
																{article.title}
															</Link>
														)}
													</Combobox.Option>
												))}
											</div>
											{areThereStrapiandingsToShow && (
												<div
													className={styles.searchResultsHeader}
													role="heading"
													aria-level={1}
												>
													{t({
														id: 'search.popup.strapiLandingsHeader',
													})}
												</div>
											)}
											<div className={styles.articlesContainer}>
												{strapiLandingsQuery.data?.map((landing) => (
													<Combobox.Option
														value={{
															...landing,
															type: 'strapiLanding',
														}}
														key={landing?.id || 'navsearchstraplanding'}
													>
														{() => (
															<Link
																href={`/${landing.slug}`}
																className={cx(
																	styles.searchResultsArticleItem,
																	styles.hasHover
																)}
																onClick={closeSearchResults}
															>
																{landing.Title}
															</Link>
														)}
													</Combobox.Option>
												))}
											</div>
											{search.length >= MIN_SEARCH_LENGTH && (
												<Combobox.Option value="showMoreBtn">
													{({ active }) => (
														<Link
															href={`/${t({
																id: 'routes.search.route',
															})}/${search}`}
															className={cx(styles.searchResultsShowAllBtn, {
																[styles.searchResultsShowAllBtnActive]: active,
															})}
															key={'viewAllButtonmore'}
															onClick={closeSearchResults}
														>
															{t({
																id: 'search.popup.viewAll',
															})}
														</Link>
													)}
												</Combobox.Option>
											)}
										</>
									) : (
										search.length >= MIN_SEARCH_LENGTH && (
											<div className={styles.searchNoResults}>
												<Link
													href={`/${t({
														id: 'routes.search.route',
													})}/${search}`}
													className={cx(styles.searchResultsShowAllBtn)}
													key={'viewAllButtonsearch'}
													onClick={closeSearchResults}
												>
													{t({
														id: 'search.popup.viewAll',
													})}
												</Link>
											</div>
										)
									)}
								</Combobox.Options>
							)}
							<Combobox.Button
								ref={searchButtonRef}
								className={cx(
									'vinisto-btn vinisto-bg-green',
									styles.searchButton
								)}
								onClick={handleOnSearchButtonClick}
								data-testid={TEST_IDS.MAIN_SEARCH_BUTTON_DESKTOP}
							>
								{t({ id: 'search' })}
							</Combobox.Button>
						</div>
					);
				}}
			</Combobox>
		</div>
	);
};

export default Search;
