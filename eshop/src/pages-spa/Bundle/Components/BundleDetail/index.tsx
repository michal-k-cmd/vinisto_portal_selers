'use client';

import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import CarouselSection from 'Components/CarouselSection';
import DeliveryMethods from 'Components/DeliveryMethods';
import BundleProducer from 'Components/ProductBox/Components/BundleProducer';
import BundleTag from 'Components/ProductBox/Components/BundleTag';
import ButtonAddToFavorites from 'Components/ProductBox/Components/ButtonAddToFavorites';
import ProductBasketCount from 'Components/ProductBox/Components/ProductBasketCount';
import { useProductBasketCount } from 'Components/ProductBox/hooks';
import Rating from 'Components/Rating';
import ContainerFullWidth from 'Components/View/ContainerFullWidth';
import BannerListProduct from 'pages-spa/Bundle/Components/BundleDetail/Components/BundleBanner';
import CustomerSupport from 'pages-spa/Bundle/Components/BundleDetail/Components/CustomerSupport';
import PaymentItem from 'pages-spa/Bundle/Components/BundleDetail/Components/PaymentItem';
import SellInfo from 'pages-spa/Bundle/Components/BundleDetail/Components/SellInfo';
import SellerInfo from 'pages-spa/Bundle/Components/BundleDetail/Components/SellerInfo';
import { BundleDetailProps } from 'pages-spa/Bundle/interfaces';
import ArticleTabs from 'pages-spa/Home/Components/ArticleTabs';
import { DeviceServiceContext } from 'Services/DeviceService';
import { DeviceServiceAction } from 'Services/DeviceService/constants';
import { LocalizationContext } from 'Services/LocalizationService';
import { WarehouseContext } from 'Services/WarehouseService';
import cx from 'classnames';
import {
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import { notFound, usePathname } from 'next/navigation';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import useFavoriteItem from 'Components/ProductBox/Components/ButtonAddToFavorites/hook';
import { SommelierRating } from 'vinisto_ui';
import { ShareProductLink } from 'vinisto_ui';
import { useQuery } from '@tanstack/react-query';
import SetBundle from 'pages-spa/Bundle/Components/BundleDetail/Components/SetBundle';
import {
	LANGUAGE,
	LIMIT,
	MYSTERY_BOX_ID,
	SOMMELIER_RATING_ID,
	TYP_PRODUKTU_ID,
} from 'pages-spa/Bundle/constants';
import SpecificationService from 'vinisto_api_client/src/product-service/specification';
import getBundleLimitPerOrder from 'Helpers/getBundleLimitPerOrder';
import {
	useDiscountCoupons,
	useFindBundleInBasket,
} from 'pages-spa/Bundle/hooks';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { ModalContext } from 'Components/Modal/context';
import { LOGIN_MODAL } from 'Components/Modal/constants';
import { useBundlesByTag } from 'Hooks/Queries/useBundlesByTag';
import getFlagSpecification from 'Helpers/getFlagSpecification';
import { useGetSetBundles } from 'pages-spa/Bundle/hooks/use-get-set-bundles';
import TextHighlighted from 'Components/View/TextHighlighted';
import BundleNotes from 'Components/BundleNotes';
import Info from 'Components/BundleNotes/Components/Info';
import { useInViewport } from 'react-in-viewport';
import { VinistoOrderDllModelsApiPaymentPayment } from 'vinisto_api_client/src/api-types/order-api';
import { Allowed_Sections } from 'vinisto_api_client/src/domain/link-widget/enums';
import {
	VinistoHelperDllEnumsBundleSortableColumns,
	VinistoHelperDllEnumsCurrency,
	VinistoProductDllModelsApiEvaluationEvaluationsReturn,
} from 'vinisto_api_client/src/api-types/product-api';
import {
	B2B_NUMERIC_CODE,
	B2C_NUMERIC_CODE,
	DEFAULT_BUNDLE_API_PARAMS,
} from 'vinisto_api_client/src/shared';
import api from 'vinisto_api_client/src/api';
import useIdenticalBundles from 'Hooks/Queries/useIdenticalBundles';
import { useBundleCarousels } from 'Hooks/Queries/useBundleCarousels';
import { useSupplierBundlesCarousel } from 'Hooks/Queries/useSupplierBundlesCarousel';
import {
	useBundleEnrichment,
	useBundleMetadata,
} from 'app/(eshop)/produkt-detail/[slug]/helpers';
import useUpdateLastViewedRecord from 'Hooks/use-update-last-viewed-record';
import useSendAnalytics from 'pages-spa/Bundle/hooks/use-send-analytics';
import LinkWidget from 'pages-spa/Home/Components/LinkWidget';
import { getBundleMetaForAnalytics } from 'Services/BasketService/helpers';
import AdmintoolsProvider from 'providers/admintools/admintools-provider';
import { useIsB2b } from 'Services/PlatformService';
import CopyValue from 'Components/CopyValue';

import DiscountCoupon from './Components/DiscountCoupon';
import BundleBreadcrumb from './Components/BundleBreadcrumb';
import OtherSellerOffers from './Components/OtherSellerOffers';
import Profile from './Components/Profile';
import ReviewSection from './Components/ReviewSection';
import RichText from './Components/RichText';
import {
	BundleItemVariants,
	QuantityBoxVariants,
} from './Components/ShopControls/Components/BundleItem/constants';
import SpecificationExplanationView from './Components/SpecificationExplanationView';
import { useSpecificationExplanation } from './Components/SpecificationExplanationView/hook';
import VolumeDiscount from './Components/VolumeDiscount';
import GiftSection from './Components/GiftSection';
import DesktopShopControlsSection from './DesktopShopControlsSection';
import BundleItem from './Components/ShopControls/Components/BundleItem';
import BlogSectionWrapper from './Components/BlogSectionWrapper';
import styles from './styles.module.css';
import { GET_BUNDLE_EVALUATIONS_QUERY_KEY } from './Components/ReviewSection/constants';
import { useDeliveriesData, usePaymentsData } from './helpers';
import BundleInSetsTop from './Components/BundleInSetsTop';
import BundleInSetsBottom from './Components/BundleInSetsBottom';
import AttributeTabs from './Components/AttributeTabs';

import { bundleAdapter } from '@/index';
import BundleService from '@/product-service/bundle';
import {
	ProductApi,
	VinistoHelperDllEnumsPriceLevel,
} from '@/api-types/product-api';

const CAROUSEL_BUNDLES_TAG_ID = '6704eab6586c877f69234616';

const BundleDetail = ({ bundleData }: BundleDetailProps) => {
	const isB2b = useIsB2b();
	const platformId = isB2b ? B2B_NUMERIC_CODE : B2C_NUMERIC_CODE;

	useBundleEnrichment(bundleData);

	// BEWARE: this sends request on every visit to the page
	useUpdateLastViewedRecord({
		bundleId: bundleData.id,
	});

	const { sortedBundleImagesInOriginalFormatAndResolution, bundleMeta } =
		useBundleMetadata(bundleData);

	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();
	const {
		activeCurrency: { currency },
		countryOfSale,
	} = localizationContext;

	const {
		footerHeight,
		headerHeight,
		dispatch,
		sellerSelectionFooterHeight,
		isMobile,
		isTablet,
		isDesktop,
	} = useContext(DeviceServiceContext);

	const { getQuantity, deliveryDate } = useContext(WarehouseContext);

	const { priceLevel: customerPriceLevel } = useContext(
		AuthenticationContext
	).vinistoUser;

	const parentRef = useRef<HTMLDivElement>(null);
	const sellerSelectionRef = useRef<HTMLDivElement>(null);
	const mobileBundleProducerRef = useRef<HTMLSpanElement>(null);
	const [topDistance, setTopDistance] = useState(0);
	const [open, setOpen] = useState(false);

	const { data: bundle, error } = useQuery({
		queryKey: [
			'bundle',
			bundleData.id,
			{
				currency,
				countryOfSale,
				isB2b,
				customerPriceLevel,
			},
		],
		queryFn: async () =>
			api
				.get<
					ProductApi.BundlesDetail.ResponseBody,
					ProductApi.BundlesDetail.RequestQuery
				>(`product-api/bundles/${bundleData.id}`, {
					currency,
					countryOfSale,
					IsCache: true,
					showHiddenSpecification: false,
					priceLevels: isB2b
						? []
						: [
								VinistoHelperDllEnumsPriceLevel.Level1,
								VinistoHelperDllEnumsPriceLevel.VinistoPlus,
						  ],
				})
				.then((res) => {
					if (res.bundle === null || res.bundle === undefined)
						throw new Error('No bundle data in response');

					return bundleAdapter.fromApi(res.bundle, {
						currency,
						customerPriceLevel,
					});
				}),
		enabled: !!bundleData.id,
		refetchOnMount: true,
		staleTime: 0,
		initialData: () =>
			bundleAdapter.fromApi(bundleData, {
				currency: currency as VinistoHelperDllEnumsCurrency,
				customerPriceLevel,
			}),
	});

	useEffect(() => {
		if (error) {
			return notFound();
		}
	}, [error]);

	const bundleTotalRatingCount =
		bundle.bundleEvaluation?.totalEvaluationCount ?? 0;

	const {
		bundleName,
		bundleShortDescription,
		bundleDescription,
		bundleImageSmall,
	} = bundleMeta;
	const { isGift, isSet, isTemporaryUnavailable, isSaleOver, isForLogged } =
		bundle.flags;

	const { data: categoriesData, isLoading: isCategoriesDataLoading } = useQuery(
		{
			queryKey: ['categories', bundle.id],
			queryFn: () => BundleService.getBundleCategories(bundle.id),
		}
	);

	const { data: identicalBundles } = useIdenticalBundles(bundle.id, {
		countryOfSale,
		currency,
		IsCache: true,
		priceLevels: isB2b
			? []
			: [
					VinistoHelperDllEnumsPriceLevel.Level1,
					VinistoHelperDllEnumsPriceLevel.VinistoPlus,
			  ],
	});

	const { data: carouselData } = useBundleCarousels(bundle.id, {
		Currency: currency,
		CountryOfSale: countryOfSale,
	});

	const { data: carouselSupplier } = useSupplierBundlesCarousel(bundle.id, {
		Currency: currency,
		CountryOfSale: countryOfSale,
	});

	const { data: deliveriesData } = useDeliveriesData({
		Language: LANGUAGE,
		Currency: currency,
		AllowedCountry: countryOfSale,
		Limit: LIMIT,
		IsForCustomerDelivery: true,
		IsForStocking: false,
		PlatformId: platformId,
		IsCache: true,
	});

	const { data: paymentsData } = usePaymentsData(
		{
			Language: LANGUAGE,
			Currency: currency,
			AllowedCountry: countryOfSale,
			IsCache: true,
		},
		platformId
	);

	const {
		shortVariety: bundleProducerName,
		varietyUrl: bundleProducerUrl,
		component: bundleFlag,
	} = getFlagSpecification(bundle.specificationDetails ?? []);

	const bundleAverageRating = (bundle.bundleEvaluation?.averageStars ?? 0) / 2;

	const { basketQuantityPopover } = useProductBasketCount(bundle);

	const lastViewedBundles = useMemo(() => {
		const id = bundle?.id ?? '';
		return carouselData?.lastViewedBundles?.filter(
			(bundle) => bundle?.id !== id
		);
	}, [bundle?.id, carouselData?.lastViewedBundles]);

	const [isStickyBarOpen, setIsStickyBarOpen] = useState(false);

	const isOnlySupplier = identicalBundles?.length === 0;

	useEffect(() => {
		setIsStickyBarOpen(isOnlySupplier ?? false);
	}, [isOnlySupplier]);

	const handleOpenGallery = useCallback(() => {
		if ((sortedBundleImagesInOriginalFormatAndResolution ?? []).length > 0) {
			setOpen(true);
		}
	}, [sortedBundleImagesInOriginalFormatAndResolution]);

	const { basePrice, discountedPrice, isDiscounted } = bundle.bundlePrices;

	const { handleAddItemToFavorites, handleRemoveItemFromFavorites } =
		useFavoriteItem(bundle.id, {
			currency:
				bundle?.prices?.[0]?.currency ?? VinistoHelperDllEnumsCurrency.CZK,
			price: (isDiscounted ? discountedPrice?.value : basePrice?.value) ?? 0,
			item_name: bundleName,
		});

	useEffect(() => {
		if (parentRef.current) {
			setTopDistance(
				window.pageYOffset + parentRef.current?.getBoundingClientRect()?.top
			);
		}
	}, [parentRef.current]);

	const pathname = usePathname();
	const isInBundleDetailPage = pathname?.startsWith(
		`/${t({ id: 'routes.product.route' })}`
	);

	useEffect(() => {
		if (!isInBundleDetailPage || !isMobile) {
			return;
		}

		const timeoutId = window.setTimeout(() => {
			const mobileBundleProducer = mobileBundleProducerRef.current;

			if (!mobileBundleProducer) {
				return;
			}

			const top =
				window.scrollY +
				mobileBundleProducer.getBoundingClientRect().top -
				headerHeight;

			window.scrollTo({
				top: Math.max(top, 0),
				left: 0,
				behavior: 'auto',
			});
		});

		return () => {
			window.clearTimeout(timeoutId);
		};
	}, [bundle.id, headerHeight, isInBundleDetailPage, isMobile]);

	useEffect(() => {
		if (!isInBundleDetailPage) {
			return;
		}

		dispatch([
			DeviceServiceAction.setSellerSelectionFooterHeight,
			(sellerSelectionRef?.current?.offsetHeight as number) + footerHeight,
		]);
	}, [
		footerHeight,
		sellerSelectionFooterHeight,
		isStickyBarOpen,
		isInBundleDetailPage,
		dispatch,
	]);

	const allBundles = [bundle, ...(identicalBundles ?? [])];

	const isQuantityLoading = allBundles?.some(
		(bundle) => getQuantity(bundle?.id ?? '') === undefined
	);

	const bundlesSortedByAvailabilityAndPrice = allBundles?.sort((a, b) => {
		const aPurchasability =
			a?.flags.isTemporaryUnavailable || a?.flags.isGift ? 1 : 0;
		const bPurchasability =
			b?.flags.isTemporaryUnavailable || b?.flags.isGift ? 1 : 0;

		const aAvailability = getQuantity(a?.id ?? '') ? 1 : 0;
		const bAvailability = getQuantity(b?.id ?? '') ? 1 : 0;

		const aLowestPriceWithVat = a.bundlePrices.isDiscounted
			? a.bundlePrices.discountedPrice?.valueWithVat ?? 0
			: a.bundlePrices.basePrice.valueWithVat;

		const bLowestPriceWithVat = b.bundlePrices.isDiscounted
			? b.bundlePrices.discountedPrice?.valueWithVat ?? 0
			: b.bundlePrices.basePrice.valueWithVat;

		const aAvailableQuantity = getQuantity(a?.id ?? '') ?? 0;
		const bAvailableQuantity = getQuantity(b?.id ?? '') ?? 0;

		return (
			// Sort by purchaseability (temporary unavailable/gift goes down the list)
			aPurchasability - bPurchasability ||
			// Sort by availability
			bAvailability - aAvailability ||
			// Sort by price
			aLowestPriceWithVat - bLowestPriceWithVat ||
			// Sort by available quantity
			bAvailableQuantity - aAvailableQuantity
		);
	});

	const { data: bundlesByTag, isLoading: isLoadingBundlesByTag } =
		useBundlesByTag(CAROUSEL_BUNDLES_TAG_ID, {
			...DEFAULT_BUNDLE_API_PARAMS,
			isInStock: true,
			sortingColumn: VinistoHelperDllEnumsBundleSortableColumns.SCORING,
			countryOfSale: countryOfSale,
			currency: currency,
		});

	// cheapestAvailableBundle can be undefined! Unchecked index access here
	const cheapestAvailableBundle = bundlesSortedByAvailabilityAndPrice[0];

	const otherBundles = bundlesSortedByAvailabilityAndPrice
		.slice(1)
		.filter(
			(bundle) => !bundle.flags.isTemporaryUnavailable && !bundle.flags.isGift
		);

	const handleScrollToProfile = (isMobile = false) => {
		const reviewSection = reviewSectionRef.current;
		const scrollOffset = isMobile ? 50 : 150;
		reviewSection &&
			window.scrollTo({
				top: reviewSection.offsetTop - scrollOffset,
				behavior: 'smooth',
			});
	};

	const bundle_set_products = useGetSetBundles({ bundle });

	const { data: sommelierRatingSpecificationValues } = useQuery(
		['bundle-specification-values', bundle.id, SOMMELIER_RATING_ID],
		() =>
			SpecificationService.getSpecificationValueForBundle(
				bundle.id,
				SOMMELIER_RATING_ID
			)
	);

	const sommelierRating = sommelierRatingSpecificationValues?.[0]?.value;

	const specificationExplanationData = useSpecificationExplanation(
		bundle.specificationDetails ?? []
	);

	const volumeDiscount = bundle.bundlePrices?.volumeDiscount;

	const bundleLimitPerOrder = getBundleLimitPerOrder(bundle?.orderLimitation);

	const { isLoggedIn, vinistoUser } = useContext(AuthenticationContext);
	const { handleOpenModal } = useContext(ModalContext);

	const bundleWarehouseQuantity = getQuantity(bundle?.id ?? '');
	const availableQuantity = bundleWarehouseQuantity ?? 0;
	const unavailableReason = isSaleOver
		? ('saleOver' as const)
		: isTemporaryUnavailable ||
		  (bundleWarehouseQuantity !== undefined && availableQuantity < 1)
		? ('temporary' as const)
		: undefined;

	const {
		isCouponAvailable,
		priceWhenCouponApplied,
		priceWhenCouponAppliedWithoutVat,
		mostValuableDiscountCouponCode,
		mostValuableDiscountCoupon,
		handleOnAddToBasketWithDiscountCoupon,
	} = useDiscountCoupons({
		bundle,
		showCouponsForRegisterdUsersIfUserIsNotLoggedIn: true,
	});

	const itemInBasket = useFindBundleInBasket({ bundleId: bundle?.id });

	const wouldApplyingExceedOrderLimitation =
		typeof bundleLimitPerOrder === 'number' &&
		bundleLimitPerOrder <= (itemInBasket?.quantity ?? 0);

	const isMostValuableCouponForRegisteredUsers = !!(
		mostValuableDiscountCoupon &&
		'isForRegisteredUsers' in mostValuableDiscountCoupon &&
		mostValuableDiscountCoupon.isForRegisteredUsers
	);

	const hasToLoginToBeAbleToPurchase =
		isMostValuableCouponForRegisteredUsers && !isLoggedIn;

	const handleOpenLoginModal = () => {
		handleOpenModal(LOGIN_MODAL);
	};

	const isSetDetailVisible = !bundle.specificationDetails?.some((spec) => {
		if (
			spec.definition.id == TYP_PRODUKTU_ID &&
			// @ts-expect-error wrongly typed specifications
			spec?.value?.selectedValuesName?.includes(MYSTERY_BOX_ID)
		) {
			return true;
		}
		return false;
	});

	useSendAnalytics({
		bundle,
		bundleMeta,
		isCategoriesDataLoading,
		categoriesData,
		currency,
		quantity: getQuantity(bundle.id) ?? 0,
	});

	/*
	 * Bundle is cached, so evaluation change would not propagate immediately as rating is updated.
	 * To show evaluating user the updated rating, we would use the request to evaluations endpoint (not cached).
	 * Is inViewport is used to optimize number of requests. Beware that due to scroll restoration, it does't work flawlessly.
	 */

	const reviewSectionRef = useRef<HTMLDivElement>(null);

	const { inViewport } = useInViewport(reviewSectionRef, {
		rootMargin: '500px',
	});

	const productId = bundle?.items?.[0]?.productId ?? '';

	const reviewsQuery = useQuery({
		queryKey: [GET_BUNDLE_EVALUATIONS_QUERY_KEY, { productId }],
		queryFn: () =>
			api.get<VinistoProductDllModelsApiEvaluationEvaluationsReturn>(
				'product-api/evaluations',
				{ productId }
			),
		enabled: !isB2b && inViewport,
	});

	const evaluationQueryAvgRating =
		(reviewsQuery.data?.evaluations?.reduce((acc, evaluation) => {
			return acc + (evaluation.stars ?? 0);
		}, 0) ?? 0) /
		(2 * (reviewsQuery.data?.count ?? 0));

	const bundleMetaForAnalytics = getBundleMetaForAnalytics(bundle);

	const warehouseId = bundle.warehouseId.join(', ');

	return (
		<section
			id="content-wrapper"
			className={styles.section}
		>
			<AdmintoolsProvider productDetailId={bundle.id} />
			<Lightbox
				carousel={{
					finite: true,
				}}
				plugins={[Zoom]}
				open={open}
				close={() => setOpen(false)}
				styles={{ container: { backgroundColor: 'rgba(#000, .5)' } }}
				slides={sortedBundleImagesInOriginalFormatAndResolution}
			/>
			<ContainerFullWidth containerClassName="mt-3 position-relative z-1">
				<div className={styles.bundle}>
					<div
						className={styles.bundleInfo}
						ref={parentRef}
					>
						<BundleBreadcrumb
							categories={categoriesData}
							bundleName={bundleName}
							className="mb-2"
						/>
						<div>
							{(isMobile || isTablet) && (
								<>
									<span
										id="product-detail-supplier-anchor"
										ref={mobileBundleProducerRef}
										className={styles.bundleVariety}
									>
										{
											<BundleProducer
												flag={bundleFlag}
												name={bundleProducerName}
											/>
										}
										<ShareProductLink
											className="h-100 mb-auto"
											bundleName={bundleName}
											isTabletMobile={isMobile || isTablet}
										/>
									</span>
									<div className={styles.bundleNameWrapper}>
										<h1
											className={styles.bundleName}
											dangerouslySetInnerHTML={{
												__html: bundleName,
											}}
										></h1>
									</div>
									{isB2b && warehouseId && (
										<div className={styles.bundleWarehouseId}>
											{t({ id: 'warehouseId' }, { id: '' })}
											<CopyValue value={warehouseId}>
												<strong>{warehouseId}</strong>
											</CopyValue>
										</div>
									)}
									<div>
										{!isB2b &&
											Boolean(
												(bundleAverageRating || evaluationQueryAvgRating) &&
													!isSet
											) && (
												<div className="d-flex align-center my-2 pe-2">
													<div className={styles.bundleRating}>
														<Rating
															defaultValue={
																evaluationQueryAvgRating || bundleAverageRating
															}
															handleOnClick={() => handleScrollToProfile(true)}
															readOnly
														/>

														<button
															className={styles.bundleRatingCount}
															onClick={() => handleScrollToProfile(true)}
														>
															(
															{reviewsQuery.data?.count ||
																bundleTotalRatingCount}
															)
														</button>
													</div>
												</div>
											)}
										{typeof sommelierRating === 'number' && (
											<SommelierRating
												rating={sommelierRating}
												label={t({ id: 'bundle.sommelierRating' })}
												className="ms-auto"
												translations={{
													info: t(
														{ id: 'sommelier.info' },
														{
															vinisto: (
																<TextHighlighted className="fw-bolder">
																	vinisto
																</TextHighlighted>
															),
														}
													),
													explanation: t({ id: 'sommelier.explanation' }),
													firstPoints: t({ id: 'sommelier.firstPoints' }),
													firstDesc: t({ id: 'sommelier.firstDesc' }),
													secondPoints: t({ id: 'sommelier.secondPoints' }),
													secondDesc: t({ id: 'sommelier.secondDesc' }),
													thirdPoints: t({ id: 'sommelier.thirdPoints' }),
													thirdDesc: t({ id: 'sommelier.thirdDesc' }),
													fourthPoints: t({ id: 'sommelier.fourthPoints' }),
													fourthDesc: t({ id: 'sommelier.fourthDesc' }),
													fifthPoints: t({ id: 'sommelier.fifthPoints' }),
													fifthDesc: t({ id: 'sommelier.fifthDesc' }),
												}}
											/>
										)}
									</div>

									<span className={cx(styles.bundleLabelsMobile)}>
										{bundle?.tags?.map((tagDetail, index) => (
											<BundleTag
												{...{ tagDetail }}
												key={`tag-desktop-${tagDetail.id ?? 'blgtag' + index}`}
												className={styles.bundleLabel}
											/>
										))}
									</span>
								</>
							)}

							<div className="position-relative">
								<button
									onClick={handleOpenGallery}
									className={styles.bundleImageWrap}
								>
									{isDesktop && bundle?.tags && bundle?.tags?.length > 0 && (
										<div
											className={cx(
												styles.bundleLabels,
												styles.bundleLabelsDesktop
											)}
										>
											{bundle?.tags?.map((tagDetail, index) => (
												<BundleTag
													{...{ tagDetail }}
													key={`tag-desktop-${
														tagDetail.id ?? 'blgtagd' + index
													}`}
													className={styles.bundleLabel}
												/>
											))}
										</div>
									)}
									<img
										className={styles.bundleImage}
										src={bundleImageSmall}
										alt={bundleName || `${t({ id: 'alt.bundleImage' })}`}
										width={368}
										height={490}
										fetchPriority="high"
									/>

									<ProductBasketCount
										text={basketQuantityPopover}
										className={styles.infoBox}
									/>
								</button>

								{!isTemporaryUnavailable && !isSaleOver && !isGift && (
									<ButtonAddToFavorites
										itemId={bundle.id ?? ''}
										addToFavorites={handleAddItemToFavorites}
										removeItemFromFavorites={handleRemoveItemFromFavorites}
										className={styles.addToFavorites}
										size="bundle"
									/>
								)}
							</div>

							{(isMobile || isTablet) && (
								<>
									{bundleShortDescription && (
										<p className={styles.bundleShortDescription}>
											{bundleShortDescription}
										</p>
									)}
									<SellInfo
										bundle={cheapestAvailableBundle}
										supplierName={bundle.supplier?.nameWeb ?? ''}
										deliveryDate={deliveryDate}
										availableQuantity={availableQuantity}
										discountCoupon={
											isCouponAvailable &&
											!wouldApplyingExceedOrderLimitation ? (
												<DiscountCoupon
													basePrice={basePrice}
													discountedPrice={discountedPrice}
													priceWhenCouponApplied={priceWhenCouponApplied}
													priceWhenCouponAppliedWithoutVat={
														priceWhenCouponAppliedWithoutVat
													}
													isDiscounted={isDiscounted}
													hasToLoginToBeAbleToPurchase={
														!!hasToLoginToBeAbleToPurchase
													}
													mostValuableDiscountCoupon={
														mostValuableDiscountCoupon
													}
													mostValuableDiscountCouponCode={
														mostValuableDiscountCouponCode
													}
													handleOnAddToBasketWithDiscountCoupon={
														handleOnAddToBasketWithDiscountCoupon
													}
													availableQuantity={availableQuantity}
													className="mt-0"
												/>
											) : null
										}
										isLoading={isQuantityLoading}
										unavailableReason={unavailableReason}
									/>
									<BundleInSetsTop bundleId={bundle.id} />
									{volumeDiscount !== null &&
										!isTemporaryUnavailable &&
										!isGift &&
										!isSaleOver && (
											<VolumeDiscount
												bundleId={bundle.id}
												bundleUrl={bundle.url}
												isForLogged={isForLogged}
												volumeDiscount={volumeDiscount}
												discountedPrice={discountedPrice}
												warehouseCount={getQuantity(bundle.id) ?? 0}
												bundleLimitPerOrder={bundleLimitPerOrder}
												bundleMetaForAnalytics={bundleMetaForAnalytics}
												className="mt-0"
											/>
										)}
									<GiftSection bundleId={bundle.id} />
								</>
							)}

							{isDesktop && (
								<>
									<div className={styles.bundleAbout}>
										<h2 className={styles.bundleHeadingMain}>
											{t({ id: 'bundle.aboutBundle' })}
										</h2>

										<RichText
											className={cx(styles.bundleAboutText)}
											content={bundleDescription}
										/>
									</div>

									{bundle.specificationDetails && (
										<div className={styles.bundleAbout}>
											<AttributeTabs data={bundle.specificationDetails} />
										</div>
									)}

									{isSet && isSetDetailVisible && (
										<div className={styles.bundleAbout}>
											<h2 className={styles.bundleHeading}>
												{t({ id: 'bundle.bundleCollection' })}
											</h2>
											<div className={styles.bundleSets}>
												{bundle_set_products.map((bundle_set, outerIndex) =>
													bundle_set.setItems.map((setItem, middleIndex) =>
														[...Array(setItem.amount)].map((_, innerIndex) => (
															<SetBundle
																{...{ ...bundle_set, setItem }}
																key={`${setItem?.id}-${outerIndex}-${middleIndex}-${innerIndex}`}
															/>
														))
													)
												)}
											</div>
										</div>
									)}
									<div id="review-section-desktop"></div>
									{!isB2b &&
										Boolean(bundle?.bundleEvaluation?.totalEvaluationCount) && (
											<Profile
												evaluation={bundle?.bundleEvaluation ?? {}}
												isLoading={false}
											/>
										)}
									{!isB2b &&
										specificationExplanationData &&
										!!specificationExplanationData.length && (
											<SpecificationExplanationView
												data={specificationExplanationData}
												className={cx({
													[styles.bundleAbout]: !isSet,
												})}
											/>
										)}
									<BundleInSetsBottom bundleId={bundle.id} />
									{!isB2b && (
										<BlogSectionWrapper
											bundleId={bundle.id}
											isNext={true}
										/>
									)}
								</>
							)}

							{isDesktop && (
								<>
									{bundle.id && vinistoUser.email && (
										<BundleNotes bundleId={bundle.id} />
									)}
									{!isLoggedIn && (
										<div className={styles.noteWrap}>
											<h2 className={styles.noteHeading}>
												{t({
													defaultMessage: 'Vaše poznámky k produktu',
													id: 'bundle.notes.form.heading',
												})}
												<Info />
											</h2>
											<p>
												{t({
													id: 'bundle.notes.loginToComment.subtitle',
												})}
											</p>
											<button
												className={cx('vinisto-btn', styles.noteBtn)}
												onClick={handleOpenLoginModal}
											>
												{t({ id: 'productDetail.btn.login' })}
											</button>
										</div>
									)}
									{isSet || isB2b ? null : (
										<ReviewSection
											bundle={bundle}
											isLoading={false}
											className={styles.bundleReview}
											reviewsSectionRef={reviewSectionRef}
											reviewsQuery={reviewsQuery}
											averageRating={evaluationQueryAvgRating}
										/>
									)}
								</>
							)}

							<div className="vinisto-right-info-tablet-mobile">
								{(isMobile || isTablet) && (
									<>
										<BannerListProduct />

										{paymentsData?.payments &&
											paymentsData?.payments?.length > 0 && (
												<>
													<p className={styles.paymentWrapperHeading}>
														{t({ id: 'productDetail.paymentMethods' })}
													</p>

													<div className="bundle-detail-payment">
														<div className={styles.paymentMethods}>
															{paymentsData.payments.map(
																(
																	payment: VinistoOrderDllModelsApiPaymentPayment
																) => (
																	<PaymentItem
																		key={'bdetailpay' + payment?.id}
																		payment={payment}
																	/>
																)
															)}
														</div>
													</div>
												</>
											)}

										{deliveriesData?.deliveries &&
											deliveriesData?.deliveries?.length > 0 && (
												<DeliveryMethods
													deliveries={deliveriesData.deliveries}
													showIcons={false}
												/>
											)}

										<CustomerSupport />

										{otherBundles.length > 0 &&
											unavailableReason === undefined && (
												<OtherSellerOffers otherOffers={otherBundles} />
											)}

										<div className="vinisto-product-detail-beseller-info">
											<SellerInfo />
										</div>

										<h2 className={styles.bundleHeadingMain}>
											{t({ id: 'bundle.aboutBundle' })}
										</h2>
										<div className={styles.bundleAboutText}>
											<RichText
												className={cx(styles.bundleAboutText)}
												content={bundleDescription}
											/>
										</div>
										{bundle.specificationDetails && (
											<div className={styles.bundleAbout}>
												<AttributeTabs data={bundle.specificationDetails} />
											</div>
										)}

										{isSet && (
											<div className={styles.bundleAbout}>
												<h2 className={styles.bundleHeading}>
													{t({ id: 'bundle.bundleCollection' })}
												</h2>
												<div className={styles.bundleSets}>
													{bundle_set_products.map((bundle_set, outerIndex) =>
														bundle_set.setItems.map((setItem, middleIndex) =>
															[...Array(setItem.amount)].map(
																(_, innerIndex) => (
																	<SetBundle
																		{...{ ...bundle_set, setItem }}
																		key={`${setItem?.id}-${outerIndex}-${middleIndex}-${innerIndex}`}
																	/>
																)
															)
														)
													)}
												</div>
											</div>
										)}

										<div id="review-section-mobile"></div>
										{!isB2b &&
											Boolean(
												bundle.bundleEvaluation?.totalEvaluationCount
											) && (
												<Profile
													evaluation={bundle?.bundleEvaluation ?? {}}
													isLoading={false}
												/>
											)}

										{!isB2b &&
											specificationExplanationData &&
											!!specificationExplanationData.length && (
												<SpecificationExplanationView
													data={specificationExplanationData}
													className={styles.bundleAbout}
												/>
											)}
										<BundleInSetsBottom bundleId={bundle.id} />
										<BlogSectionWrapper
											bundleId={bundle.id}
											isNext={true}
										/>
										{bundle.id && vinistoUser.email && (
											<BundleNotes bundleId={bundle.id} />
										)}
										{!isLoggedIn && (
											<div className={styles.noteWrap}>
												<h2 className={styles.noteHeading}>
													{t({
														defaultMessage: 'Vaše poznámky k produktu',
														id: 'bundle.notes.form.heading',
													})}
													<Info />
												</h2>
												<p>
													{t({
														id: 'bundle.notes.loginToComment.subtitle',
													})}
												</p>
												<button
													className={cx('vinisto-btn', styles.noteBtn)}
													onClick={handleOpenLoginModal}
												>
													{t({ id: 'productDetail.btn.login' })}
												</button>
											</div>
										)}
										{isSet || isB2b ? null : (
											<ReviewSection
												bundle={bundle}
												isLoading={false}
												className={cx(styles.bundleAbout, styles.reviewSection)}
												reviewsSectionRef={reviewSectionRef}
												reviewsQuery={reviewsQuery}
												averageRating={evaluationQueryAvgRating}
											/>
										)}
									</>
								)}
							</div>
						</div>
					</div>

					{isDesktop && (
						<div className={styles.bundleShopCol}>
							<div
								style={{
									position: 'sticky',
									top: topDistance,
								}}
							>
								<div className={styles.bundleVariety}>
									{
										<BundleProducer
											flag={bundleFlag}
											name={bundleProducerName}
											url={bundleProducerUrl}
										/>
									}
									<ShareProductLink
										className="h-100 mb-auto mt-0"
										bundleName={bundleName}
										isTabletMobile={isMobile || isTablet}
									/>
								</div>
								<div className={styles.bundleNameWrapper}>
									<h1
										className={styles.bundleName}
										dangerouslySetInnerHTML={{
											__html: bundleName,
										}}
									></h1>
								</div>
								{isB2b && warehouseId && (
									<div className={styles.bundleWarehouseId}>
										{t({ id: 'warehouseId' }, { id: '' })}
										<CopyValue value={warehouseId}>
											<strong>{warehouseId}</strong>
										</CopyValue>
									</div>
								)}
								<div className={styles.ratingWrap}>
									{!isB2b &&
										Boolean(
											(bundleAverageRating || evaluationQueryAvgRating) &&
												!isSet
										) && (
											<div className="pe-2">
												<div className={styles.bundleRating}>
													<Rating
														defaultValue={
															evaluationQueryAvgRating || bundleAverageRating
														}
														handleOnClick={() => handleScrollToProfile()}
														readOnly
													/>
													<button
														className={styles.bundleRatingCount}
														onClick={() => handleScrollToProfile()}
													>
														(
														{reviewsQuery.data?.count || bundleTotalRatingCount}
														)
													</button>
												</div>
											</div>
										)}
									{typeof sommelierRating === 'number' && (
										<SommelierRating
											rating={sommelierRating}
											label={t({ id: 'bundle.sommelierRating' })}
											translations={{
												info: t(
													{ id: 'sommelier.info' },
													{
														vinisto: (
															<TextHighlighted
																key="bd-sommelier-rating-vinisto"
																className="fw-bolder"
															>
																vinisto
															</TextHighlighted>
														),
													}
												),
												explanation: t({ id: 'sommelier.explanation' }),
												firstPoints: t({ id: 'sommelier.firstPoints' }),
												firstDesc: t({ id: 'sommelier.firstDesc' }),
												secondPoints: t({ id: 'sommelier.secondPoints' }),
												secondDesc: t({ id: 'sommelier.secondDesc' }),
												thirdPoints: t({ id: 'sommelier.thirdPoints' }),
												thirdDesc: t({ id: 'sommelier.thirdDesc' }),
												fourthPoints: t({ id: 'sommelier.fourthPoints' }),
												fourthDesc: t({ id: 'sommelier.fourthDesc' }),
												fifthPoints: t({ id: 'sommelier.fifthPoints' }),
												fifthDesc: t({ id: 'sommelier.fifthDesc' }),
											}}
										/>
									)}
								</div>
								{bundleShortDescription && (
									<p className={styles.bundleShortDescription}>
										{bundleShortDescription}
									</p>
								)}
								<div className="shop-controls">
									{!!cheapestAvailableBundle && (
										<DesktopShopControlsSection
											cheapestAvailableBundle={cheapestAvailableBundle}
											isQuantityLoading={isQuantityLoading}
											isIdenticalBundlesDataLoading={false}
											availableQuantity={availableQuantity}
											volumeDiscount={volumeDiscount}
											bundleMeta={bundleMeta}
											bundleLimitPerOrder={bundleLimitPerOrder}
											itemInBasket={itemInBasket}
											bundleMetaForAnalytics={bundleMetaForAnalytics}
											unavailableReason={unavailableReason}
										/>
									)}
									<GiftSection bundleId={bundle.id} />
									<BannerListProduct />

									<div
										className={cx(
											styles.paymentWrapper,
											'bundle-detail-payment'
										)}
									>
										{paymentsData?.payments &&
											paymentsData?.payments?.length > 0 && (
												<>
													<p className={styles.paymentWrapperHeading}>
														{t({ id: 'productDetail.paymentMethods' })}
													</p>
													<div className={styles.paymentMethods}>
														{paymentsData.payments.map((payment) => (
															<PaymentItem
																key={'bdetailpay2-' + payment?.id}
																payment={payment}
															/>
														))}
													</div>
												</>
											)}

										{deliveriesData?.deliveries &&
											deliveriesData?.deliveries?.length > 0 && (
												<DeliveryMethods
													deliveries={deliveriesData.deliveries}
													showIcons={false}
												/>
											)}

										<CustomerSupport />
									</div>
									{otherBundles.length > 0 &&
										unavailableReason === undefined && (
											<OtherSellerOffers otherOffers={otherBundles} />
										)}
									<div className="vinisto-product-detail-beseller-info">
										<SellerInfo />
									</div>
								</div>
							</div>
						</div>
					)}
				</div>
			</ContainerFullWidth>
			{carouselData?.similarBundles &&
				carouselData.similarBundles.length > 0 && (
					<CarouselSection
						data={carouselData?.similarBundles}
						title={`${t({
							id: 'productDetail.carouselHeading.similarProducts',
						})}`}
						isLoading={Boolean(!carouselData?.similarBundles)}
						analyticsListId="product_detail_similar_products"
					/>
				)}
			{carouselData?.manufacturerBundles?.length !== 0 && (
				<CarouselSection
					data={carouselData?.manufacturerBundles}
					title={`${t({
						id: 'productDetail.carouselHeading.manufacturerProducts',
					})}`}
					isLoading={Boolean(!carouselData?.manufacturerBundles)}
					analyticsListId="product_detail_manufacturer_products"
				/>
			)}
			{lastViewedBundles?.length !== 0 && (
				<CarouselSection
					data={carouselData?.lastViewedBundles}
					title={`${t({
						id: 'productDetail.carouselHeading.currentlyRecommended',
					})}`}
					isLoading={Boolean(!carouselData?.lastViewedBundles)}
					analyticsListId="product_detail_last_viewed"
				/>
			)}
			{bundlesByTag?.length !== 0 && (
				<CarouselSection
					data={bundlesByTag}
					title=""
					isLoading={isLoadingBundlesByTag}
					analyticsListId="product_detail_bundles_by_tag"
				/>
			)}

			{carouselSupplier?.length !== 0 && (
				<CarouselSection
					data={carouselSupplier}
					title={`${t({
						id: 'productDetail.carouselHeading.supplierProducts',
					})}`}
					isLoading={Boolean(!carouselSupplier)}
					analyticsListId="product_detail_supplier_products"
				/>
			)}
			{!isB2b && (
				<div className="container">
					<div className="row">
						<ArticleTabs />
					</div>
				</div>
			)}
			<div className={cx('container', styles.quickLinks)}>
				<LinkWidget
					itemClassName={styles.linkWidgets}
					section={
						isMobile || isTablet
							? Allowed_Sections.HOMEPAGE_MOBILE
							: Allowed_Sections.HOMEPAGE_DESKTOP
					}
				/>
			</div>
			<div
				className={styles.mobileShopBoxFloating}
				style={{ bottom: `${footerHeight}px` }}
				ref={sellerSelectionRef}
			>
				<nav className="navbar navbar-dark p-0">
					{(isMobile || isTablet) && (
						<div
							className={cx(styles.sellers, styles.isOnlySeller, {
								reset: !isOnlySupplier,
							})}
						>
							<BundleItem
								key={'bundledetailcheap' + bundle.id}
								bundle={cheapestAvailableBundle}
								variant={BundleItemVariants.COMPACT}
								isQuantityLoading={isQuantityLoading}
								quantityBox={QuantityBoxVariants.DIRECT}
								unavailableReason={unavailableReason}
							/>
						</div>
					)}
				</nav>
			</div>
		</section>
	);
};

export default BundleDetail;
