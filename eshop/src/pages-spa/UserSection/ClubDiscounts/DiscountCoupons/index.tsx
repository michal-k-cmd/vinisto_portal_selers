import { useCallback, useContext, useMemo } from 'react';
import cx from 'classnames';
import { LocalizationContext } from 'Services/LocalizationService';
import PaginationNav from 'Components/Pagination';
import { useQuery } from '@tanstack/react-query';
import { parseAsArrayOf, parseAsInteger, useQueryState } from 'nuqs';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import Skeleton from 'react-loading-skeleton';
import getBundleImage, {
	IMAGE_SIZE_THUMB_368x490,
} from 'Helpers/getBundleImage';
import { NotificationsContext } from 'Services/NotificationService';
import CopyIcon from 'vinisto_ui/src/components/icons/Copy';
import { useRouter } from 'next/navigation';
import api from 'vinisto_api_client/src/api';
import {
	DiscountCouponsGetUserAvailableDiscountCouponsListParams,
	VinistoHelperDllEnumsDiscountCouponLimitationType,
	VinistoOrderDllModelsApiReturnDataDiscountCouponsReturn,
} from 'vinisto_api_client/src/api-types/order-api';
import { VinistoProductDllModelsApiMultiLangValue } from 'vinisto_api_client/src/api-types/product-api';
import { CategoryService } from 'vinisto_api_client';

import { DEFAULT_LIMIT_PER_PAGE } from './constants';
import styles from './styles.module.css';
import { DiscountCoupon } from './interfaces';

const getDiscountCouponLimitationCategoryId = (
	discountCoupon: DiscountCoupon
): string | null => {
	const limitationDefinition = discountCoupon.limitationDefinition;
	if (
		limitationDefinition?.limitationType ===
			VinistoHelperDllEnumsDiscountCouponLimitationType.CATEGORY_LIMITATION &&
		'categoryId' in limitationDefinition &&
		limitationDefinition.categoryId
	) {
		return limitationDefinition.categoryId;
	}

	return null;
};

const DiscountCoupons = () => {
	const { useFormatMessage } = useContext(LocalizationContext);
	const { handleShowSuccessNotification } = useContext(NotificationsContext);

	const t = useFormatMessage();
	const getLocalizedValue = useLocalizedValue();
	const router = useRouter();

	const [page, setPage] = useQueryState(
		'page',
		parseAsArrayOf(parseAsInteger, '_').withDefault([1])
	);

	const params: DiscountCouponsGetUserAvailableDiscountCouponsListParams = {
		Offset: (Number(page[0]) - 1) * DEFAULT_LIMIT_PER_PAGE,
		Limit:
			page.length === 1
				? DEFAULT_LIMIT_PER_PAGE
				: (Number(page[1]) - Number(page[0]) + 1) * DEFAULT_LIMIT_PER_PAGE,
	};

	const availableDiscountQuery = useQuery(
		['boughtProducts', params, page],
		async () => {
			const response =
				await api.get<VinistoOrderDllModelsApiReturnDataDiscountCouponsReturn>(
					'order-api/discount-coupons/get-user-available-discount-coupons',
					params
				);

			if (response) {
				return response;
			}
		},
		{
			keepPreviousData: true,
			refetchOnWindowFocus: true,
		}
	);

	const isLoading = availableDiscountQuery.isLoading;

	const discountCoupons = useMemo(
		() => availableDiscountQuery.data?.discountCoupons ?? [],
		[availableDiscountQuery.data?.discountCoupons]
	);

	const limitationCategoryIds = useMemo(
		() =>
			Array.from(
				new Set(
					discountCoupons
						.filter(
							(discountCoupon) =>
								!(
									'category' in discountCoupon &&
									discountCoupon.category?.url?.length
								)
						)
						.map(getDiscountCouponLimitationCategoryId)
						.filter((categoryId): categoryId is string => Boolean(categoryId))
				)
			),
		[discountCoupons]
	);

	const discountCouponCategoryUrlsQuery = useQuery(
		['discountCouponCategoryUrls', limitationCategoryIds],
		async () =>
			Object.fromEntries(
				await Promise.all(
					limitationCategoryIds.map(async (categoryId) => {
						const { category } = await CategoryService.getCategoryById({
							categoryId,
						});

						return [
							categoryId,
							category?.url?.length ? category.url : null,
						] as const;
					})
				)
			),
		{
			enabled: limitationCategoryIds.length > 0,
			refetchOnWindowFocus: false,
		}
	);

	const currentPage = (page.length ?? 0) > 1 ? page[1] ?? 1 : page[0] ?? 1;

	const discountCount = availableDiscountQuery.data?.count ?? 0;

	const boughtBundlesToLoadMore = useMemo(() => {
		const ordersLeft = discountCount - currentPage * DEFAULT_LIMIT_PER_PAGE;
		if (ordersLeft < 1) return 0;
		if (ordersLeft > DEFAULT_LIMIT_PER_PAGE) return DEFAULT_LIMIT_PER_PAGE;
		return ordersLeft;
	}, [discountCount, currentPage]);

	const totalPaginationPages =
		discountCount <= DEFAULT_LIMIT_PER_PAGE
			? 0
			: Math.ceil(discountCount / DEFAULT_LIMIT_PER_PAGE);

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

	const handleOnRedirectToCategory = useCallback(
		(categoryUrl: VinistoProductDllModelsApiMultiLangValue[]) => () => {
			const url = getLocalizedValue(categoryUrl);
			if (url) router.push(`/${t({ id: 'routes.category.route' })}/${url}`);
		},
		[getLocalizedValue, router, t]
	);

	const handleOnClickCopy = useCallback(
		(couponCode: string) => () => {
			navigator.clipboard.writeText(couponCode);
			handleShowSuccessNotification(
				'routes.user-section.club-coupons.action-products.coupon-code-copied'
			);
		},
		[handleShowSuccessNotification]
	);

	if (isLoading) {
		return (
			<div className={styles.loading}>
				<Skeleton height={200} />
				<Skeleton height={200} />
				<Skeleton height={200} />
				<Skeleton height={200} />
			</div>
		);
	}

	return (
		<div>
			{(!availableDiscountQuery.data?.discountCoupons ||
				availableDiscountQuery.data?.discountCoupons?.length === 0) && (
				<div className={styles.noProducts}>
					<span>{t({ id: 'routes.user-section.club-coupons.empty' })}</span>
				</div>
			)}
			<div className={styles.coupons}>
				{discountCoupons.map((discountCoupon, index) => {
					const limitationCategoryId =
						getDiscountCouponLimitationCategoryId(discountCoupon);
					const limitationCategoryUrl = limitationCategoryId
						? discountCouponCategoryUrlsQuery.data?.[limitationCategoryId] ??
						  null
						: null;
					const categoryUrl =
						'category' in discountCoupon && discountCoupon.category?.url?.length
							? discountCoupon.category.url
							: limitationCategoryUrl;

					return (
						<div
							key={'usbclbdiscscpn' + index}
							className={styles.coupon}
						>
							<div className={styles.imageWrap}>
								<img
									src={getBundleImage(
										discountCoupon.images ?? [],
										IMAGE_SIZE_THUMB_368x490,
										false,
										true
									)}
									alt={getLocalizedValue(discountCoupon.name ?? [])}
									className={styles.image}
								/>
							</div>
							<div className={styles.info}>
								<div>
									<div className={styles.name}>
										{getLocalizedValue(discountCoupon.name ?? [])}
									</div>
									<div className={cx(styles.description, 'max-lines--2')}>
										{getLocalizedValue(discountCoupon.shortDescription ?? [])}
									</div>
								</div>
								<div className={styles.buttonWrap}>
									<button
										onClick={handleOnClickCopy(discountCoupon.code ?? '')}
										className={styles.copyButton}
									>
										{t({
											id: 'routes.user-section.club-coupons.action-products.coupon-code',
										})}
										: <span className={styles.code}>{discountCoupon.code}</span>
										<CopyIcon className={styles.copy} />
									</button>
									{categoryUrl !== null && (
										<button
											onClick={handleOnRedirectToCategory(categoryUrl)}
											className={styles.link}
										>
											{t({
												id: 'routes.user-section.club-coupons.action-products.buy-with-discount',
											})}
										</button>
									)}
								</div>
							</div>
						</div>
					);
				})}
			</div>

			{!!availableDiscountQuery.data?.discountCoupons?.length && (
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
	);
};

export default DiscountCoupons;
