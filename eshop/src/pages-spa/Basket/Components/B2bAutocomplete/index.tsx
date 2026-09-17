import { Combobox } from '@headlessui/react';
import { useQuery } from '@tanstack/react-query';
import CloseIcon from 'Components/Icons/Close';
import { NavbarContext } from 'Components/Navbar/context';
import LoadingSpinner from 'Components/Preloader/Components/LoadingSpinner';
import Loader from 'Components/View/Loader';
import useDebounce from 'Hooks/useDebounce';
import useOnClickOutside from 'Hooks/useOnClickOutside';
import { DeviceServiceContext } from 'Services/DeviceService';
import { LocalizationContext } from 'Services/LocalizationService';
import { WarehouseContext } from 'Services/WarehouseService';
import { usePlatformContext } from 'Services/PlatformService';
import cx from 'classnames';
import {
	ChangeEvent,
	Suspense,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import {
	RecommenderName,
	useExternalRecommendedBundles,
} from 'Hooks/useExternalRecommendedBundles';
import usePreventScroll from 'Hooks/usePreventScroll';
import ProductBox from 'Components/ProductBox';
import useGetB2bCustomer from 'Hooks/useGetB2bCustomer';
import { AuthenticationContext } from 'Services/AuthenticationService/context';

import { MIN_SEARCH_LENGTH } from './constants';
import SearchResultBundleItem from './SearchResultBundleItem';
import styles from './styles.module.css';

import api from '@/api';
import { bundleAdapter } from '@/index';
import { VinistoHelperDllEnumsPriceLevel } from '@/api-types/product-api';
import { SearchApi } from '@/api-types/search-api';
import { B2B_NUMERIC_CODE } from '@/shared';

interface SearchProps {
	onToggleResult?: (value: boolean) => void;
}

const B2bAutocomplete = ({ onToggleResult }: SearchProps) => {
	const { customerId } = usePlatformContext();
	const { isMobile, isTablet, layoutHeight, footerHeight } =
		useContext(DeviceServiceContext);
	const localizationContext = useContext(LocalizationContext);
	const {
		activeCurrency: { currency },
		countryOfSale,
	} = localizationContext;
	const t = localizationContext.useFormatMessage();
	const warehouseContext = useContext(WarehouseContext);
	const { loginHash: userLoginHash } = useContext(
		AuthenticationContext
	).vinistoUser;

	const [isFocused, setIsFocused] = useState(false);
	const [search, setSearch] = useState('');

	const debouncedSearch = useDebounce(search, 600);

	const b2bCustomerQuery = useGetB2bCustomer({ customerId });

	const customerPriceLevel =
		b2bCustomerQuery.data?.priceLevel ?? VinistoHelperDllEnumsPriceLevel.Level1;

	// TODO: Switch back to useLastViewedBundles once last viewed will be fixed (api returns 'null' atm)
	//const { data: lastViewedBundles } = useLastViewedBundles();
	const { data: { bundles: lastViewedBundles } = {} } =
		useExternalRecommendedBundles({
			type: RecommenderName.Autocomplete_popup,
			isB2b: true,
		});

	const inputRef = useRef<HTMLInputElement>(null);
	const searchButtonRef = useRef<HTMLButtonElement>(null);
	const { menuRef } = useContext(NavbarContext);

	const mobileHeaderHeight = 38;

	const searchResultsHeight =
		isMobile || isTablet
			? layoutHeight - mobileHeaderHeight - footerHeight
			: 'auto';

	useOnClickOutside([menuRef], () => setIsFocused(false));

	const query = useQuery({
		queryKey: [
			'search-bundles-b2b',
			debouncedSearch,
			{ currency, countryOfSale, customerPriceLevel },
		],
		queryFn: () =>
			api
				.get<
					SearchApi.FullSearchSearchStringSeparateResultsList.ResponseBody,
					SearchApi.FullSearchSearchStringSeparateResultsList.RequestQuery
				>(`search-api/full-search/search-string-separate-results`, {
					Collections: ['BUNDLE'],
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

					const bundles = (data?.bundles ?? []).flatMap((bundle) => {
						const hasB2bPrice = bundle.prices?.some(
							(price) =>
								price.currency === currency &&
								price.platformId === B2B_NUMERIC_CODE &&
								price.level !== VinistoHelperDllEnumsPriceLevel.VinistoPlus
						);

						if (!hasB2bPrice) return [];

						return [
							// @ts-expect-error The 'language' field is enum on product-api, union on search-api
							bundleAdapter.fromApi(bundle, {
								currency,
								customerPriceLevel,
							}),
						];
					});
					return bundles;
				})
				.catch((e) => {
					return Promise.reject(e);
				}),
		cacheTime: 0,
		staleTime: 0,
		enabled: debouncedSearch?.length >= MIN_SEARCH_LENGTH && isFocused,
	});

	const showLoadingSpinner =
		query.isLoading &&
		debouncedSearch?.length >= MIN_SEARCH_LENGTH &&
		isFocused;

	const showNothingFoundMessage =
		query.data?.length === 0 && search.length >= MIN_SEARCH_LENGTH;

	const areThereBundlesToShow = useMemo(() => {
		return (
			!!query.data?.length ||
			(search.length < MIN_SEARCH_LENGTH &&
				lastViewedBundles &&
				lastViewedBundles.length > 0)
		);
	}, [query, lastViewedBundles, search]);

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

	const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
		openSearchResults();
		setSearch(e.target.value);
	};

	return (
		<div className={cx('my-3')}>
			<div className={styles.relativeWrapperForCloseSearch}>
				{isFocused && <div className={styles.searchResultsBackdrop}></div>}
				<Combobox value={search}>
					{() => {
						return (
							<div
								className={cx(
									styles.searchWrapper,
									isFocused && styles.maximize
								)}
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
												}px`,
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
											...(!areThereBundlesToShow && { padding: 0 }),
										}}
										static
									>
										<div className="position-relative">
											<button
												className={cx(styles.closeSearch, {
													[styles.quicklyVisualyCenterWhenResultsAreEmpty]:
														!areThereBundlesToShow,
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
														: query.data
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
																			<div
																				className={cx(
																					'vinisto-search-productbox',
																					'h-100 d-flex'
																				)}
																			>
																				<ProductBox
																					bundleData={bundle}
																					showAddToBasketBtn={true}
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
																					displayCta={true}
																					searchString={search}
																				/>
																			</div>
																		)}
																	</div>
																);
															}}
														</Combobox.Option>
													))}
												</div>
											</>
										) : null}
									</Combobox.Options>
								)}
							</div>
						);
					}}
				</Combobox>
			</div>
		</div>
	);
};

export default B2bAutocomplete;
