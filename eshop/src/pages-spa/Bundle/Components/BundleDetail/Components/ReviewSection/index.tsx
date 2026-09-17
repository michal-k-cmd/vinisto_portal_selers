import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import cx from 'classnames';
import Skeleton from 'react-loading-skeleton';
import { get, head, includes, map } from 'lodash-es';
import { usePathname } from 'next/navigation';
import ReactSlider from 'react-slider';
import { DEFAULT_STAR_COUNT } from 'Components/Rating/constants';
import createFormattedDecimalNumber from 'Helpers/createFormattedDecimalNumber';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { LocalizationContext } from 'Services/LocalizationService';
import { ModalContext } from 'Components/Modal/context';
import { NotificationsContext } from 'Services/NotificationService';
import { DeviceServiceContext } from 'Services/DeviceService';
import {
	ADD_TO_BASKET_MODAL,
	FILL_NICKNAME_MODAL,
	LOGIN_MODAL,
	REVIEW_MODAL,
} from 'Components/Modal/constants';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import Rating from 'Components/Rating';
import api from 'vinisto_api_client/src/api';

import { API_EVALUATIONS_URL } from './constants';
import { ReviewSectionProps } from './interfaces';
import Review from './Components/Review';
import styles from './styles.module.css';
import './styles.css';
import Info from './Components/Info';

const ReviewSection = ({
	isLoading,
	bundle,
	className,
	reviewsSectionRef,
	reviewsQuery,
	averageRating,
}: ReviewSectionProps) => {
	const authenticationContext = useContext(AuthenticationContext);
	const localizationContext = useContext(LocalizationContext);
	const modalContext = useContext(ModalContext);
	const notificationsContext = useContext(NotificationsContext);
	const deviceContext = useContext(DeviceServiceContext);

	const t = localizationContext.useFormatMessage();
	const getLocalizedValue = useLocalizedValue();

	const bundleId = bundle?.id;
	const productId = bundle?.items?.[0]?.productId ?? '';
	const bundleName = getLocalizedValue(get(bundle, 'name', []));

	const pathname = usePathname();

	const ratingCounts = useMemo(() => {
		// TO CONSIDER What about zero stars?
		const counts: Record<string, number> = {
			1: 0,
			2: 0,
			3: 0,
			4: 0,
			5: 0,
		};
		reviewsQuery.data?.evaluations?.forEach((evaluation) => {
			const stars = Math.ceil((evaluation.stars ?? 0) / 2);
			if (stars && stars in counts) {
				counts[stars] += 1;
			}
		});
		return Object.values(counts).reverse();
	}, [reviewsQuery.data?.evaluations]);

	const reviewCount = reviewsQuery.data?.count ?? 0;

	const showReviewModal = useCallback(() => {
		api
			.get('product-api/evaluations/CanEvaluate', {
				UserLoginHash: get(authenticationContext, 'vinistoUser.loginHash', ''),
				bundleId: bundleId,
			})
			.then((response: Record<string, any>) => {
				if (get(response, 'result', false)) {
					api
						.get(API_EVALUATIONS_URL, {
							UserId: get(authenticationContext, 'vinistoUser.id', ''),
							ProductId: productId,
						})
						.then((response: Record<string, any>) => {
							const reviewData = head(get(response, 'evaluations', []));
							modalContext.handleOpenModal(REVIEW_MODAL, {
								bundleId,
								forceReload: async () => {
									reviewsQuery.refetch();
								},
								title: t(
									{ id: 'modal.review.modalTitle' },
									{ name: bundleName }
								),
								reviewData,
								bundleData: bundle,
							});
						});
				} else {
					modalContext.handleOpenModal(ADD_TO_BASKET_MODAL, {
						bundleData: bundle,
					});
				}
			})
			.catch(() => {
				notificationsContext.handleShowErrorNotification(
					'notification.message.bundleDetail.canComment.error'
				);
			});
	}, [
		authenticationContext,
		bundle,
		bundleId,
		bundleName,
		modalContext,
		notificationsContext,
		productId,
		reviewsQuery,
		t,
	]);

	const [openReviewModalAfterLogin, setOpenReviewModalAfterLogin] =
		useState(false);
	const handleOnOpenReviewModal = useCallback(() => {
		if (!authenticationContext.isLoggedIn) {
			modalContext.handleOpenModal(LOGIN_MODAL);
			setOpenReviewModalAfterLogin(true);
		} else if (get(authenticationContext, 'vinistoUser.nickname', null)) {
			showReviewModal();
		} else {
			modalContext.handleOpenModal(FILL_NICKNAME_MODAL, {
				showReviewModal,
			});
		}
	}, [authenticationContext, modalContext, showReviewModal]);

	useEffect(() => {
		if (openReviewModalAfterLogin && authenticationContext.isLoggedIn) {
			handleOnOpenReviewModal();
			setOpenReviewModalAfterLogin(false);
		}
	}, [
		openReviewModalAfterLogin,
		authenticationContext.isLoggedIn,
		handleOnOpenReviewModal,
	]);

	useEffect(() => {
		if (reviewsSectionRef?.current && includes(pathname, 'vinisto-reviews')) {
			const y =
				reviewsSectionRef.current?.getBoundingClientRect()?.top +
				window.scrollY;
			window.scrollTo({ top: y - 200, left: 0, behavior: 'smooth' });
		}
	}, [pathname, reviewsSectionRef]);

	const isAlreadyRatedByUser = useMemo(() => {
		const userId = authenticationContext.vinistoUser.id;
		const userReview = reviewsQuery?.data?.evaluations?.find(
			(review) =>
				review && 'createdUserId' in review && review?.createdUserId === userId
		);

		return !!userReview;
	}, [authenticationContext.vinistoUser.id, reviewsQuery?.data?.evaluations]);

	return (
		<div className={className}>
			<div
				className={cx(styles.reviewSection)}
				ref={reviewsSectionRef}
				style={{ transform: 'scale(0.85)', transformOrigin: 'left top' }}
			>
				{!isAlreadyRatedByUser && (
					<div className={styles.ratingMainHeadingWrap}>
						<h2 className={styles.ratingMainHeading}>
							{t({
								id:
									reviewCount > 0
										? 'productDetail.rating.heading'
										: 'productDetail.rating.noRating',
							})}
						</h2>
						<Info />
					</div>
				)}

				{reviewCount > 0 ? (
					<div className={styles.ratingSummaryContainer}>
						<div className={styles.ratingSummary}>
							<p className={styles.ratingSummaryTotalScore}>
								{isLoading ? (
									<Skeleton />
								) : (
									createFormattedDecimalNumber(averageRating, 1)
								)}
							</p>
							{isLoading ? (
								<Skeleton
									width="13px"
									count={DEFAULT_STAR_COUNT}
									style={{ margin: '0 .125rem' }}
									inline
								/>
							) : (
								<div className={styles.ratingSummaryStars}>
									<Rating
										defaultValue={averageRating}
										readOnly
									/>
								</div>
							)}
							<p className={styles.ratingSummaryCount}>
								{isLoading ? (
									<Skeleton />
								) : (
									t(
										{ id: 'productDetail.rating.rating' },
										{
											count: reviewCount,
										}
									)
								)}
							</p>

							<div>
								{isLoading ? (
									<Skeleton
										width="170px"
										height="30px"
									/>
								) : (
									<button
										className={cx('vinisto-btn', styles.reviewBtn)}
										onClick={handleOnOpenReviewModal}
									>
										{t({
											id: isAlreadyRatedByUser
												? 'productDetail.btn.updateReview'
												: 'productDetail.btn.giveReview',
										})}
									</button>
								)}
							</div>
						</div>
						<div className={styles.ratingTable}>
							{map(ratingCounts, (count, index) => (
								<div
									className={styles.ratingTableRow}
									key={'bdrewi' + index}
								>
									{isLoading ? (
										<Skeleton width="30px" />
									) : (
										<span className={styles.ratingDescription}>
											{DEFAULT_STAR_COUNT - index}
										</span>
									)}
									{isLoading ? (
										<div style={{ minWidth: 'max-content' }}>
											<Skeleton
												width="15px"
												style={{ margin: '0 .125rem' }}
												inline
											/>
										</div>
									) : (
										<Rating
											starCount={1}
											defaultValue={DEFAULT_STAR_COUNT - index}
											readOnly
										/>
									)}
									{isLoading ? (
										<Skeleton
											width="175px"
											style={{ margin: '0 .125rem' }}
										/>
									) : (
										<ReactSlider
											className={cx('vinisto-slider', styles.ratingSlider)}
											thumbClassName={count > 0 ? styles.ratingSliderThumb : ''}
											trackClassName={styles.ratingSliderTrack}
											value={count}
											max={reviewCount}
											key={`rating-slider-${index}-${ratingCounts.join()}`}
											disabled
										/>
									)}
									{isLoading ? (
										<Skeleton width="30px" />
									) : (
										<span className={styles.ratingDescription}>
											{count} &times;{' '}
										</span>
									)}
								</div>
							))}
						</div>
					</div>
				) : (
					<div
						className={styles.ratingSummaryContainer}
						style={{ marginTop: '0.5rem' }}
					>
						<div
							className={styles.ratingSummaryStars}
							style={{
								transform: 'scale(1.875)',
								transformOrigin: 'left center',
								marginRight: '5rem',
								paddingTop: '0.2rem',
							}}
						>
							<Rating
								defaultValue={0}
								readOnly
							/>
						</div>
						<button
							className={cx('vinisto-btn', styles.reviewBtn)}
							onClick={handleOnOpenReviewModal}
						>
							{t({
								id: isAlreadyRatedByUser
									? 'productDetail.btn.updateReview'
									: 'productDetail.btn.giveReview',
							})}
						</button>
					</div>
				)}

				<div
					className={cx('col-12 py-0', {
						'tabs-content rounded-tab-content-corners mt-0':
							!(deviceContext.isMobile || deviceContext.isTablet) &&
							reviewCount > 0,
						'mt-3': deviceContext.isMobile || deviceContext.isTablet,
					})}
				>
					<ul className="px-0 my-0 d-flex flex-column">
						{reviewsQuery.data?.evaluations?.map((review, key) => (
							<li
								key={`bd-product-review-${key}`}
								className="vinisto-reviews__review-wrap"
							>
								<Review
									review={review}
									isLoading={!!reviewsQuery.isLoading}
								/>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default ReviewSection;
