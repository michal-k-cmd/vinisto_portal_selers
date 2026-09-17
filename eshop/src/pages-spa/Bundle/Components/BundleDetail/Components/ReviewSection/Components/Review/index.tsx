import {
	lazy,
	Suspense,
	useCallback,
	useContext,
	useEffect,
	useState,
} from 'react';
import Skeleton from 'react-loading-skeleton';
import { get, uniqueId } from 'lodash-es';
import ReactSlider from 'react-slider';
import useLocalizedDateTime from 'Hooks/useLocalizedDateTime';
import { LocalizationContext } from 'Services/LocalizationService';
import Rating from 'Components/Rating';
import Avatar from 'Components/Avatar';
import Loader from 'Components/View/Loader';
const FilterDropdownArrowIcon = lazy(
	() => import('Components/Icons/FilterDropdownArrow')
);
import FilterDropdownArrowOpenedIcon from 'Components/Icons/FilterDropdownArrowOpened';

import { IReviewProps } from './interfaces';

import './styles.css';

const Review = ({ review, isLoading = false }: IReviewProps) => {
	const localizationContext = useContext(LocalizationContext);

	const t = localizationContext.useFormatMessage();
	const getLocalizedDate = useLocalizedDateTime();

	const userNickName = review?.createdUserDetail?.nickname ?? '-';

	const [isReviewOpen, setReviewOpen] = useState(false);
	const handleOnToggleReview = useCallback(() => {
		setReviewOpen((oldState) => !oldState);
	}, []);

	useEffect(() => {
		setReviewOpen(false);
	}, [isLoading]);

	return (
		<div className="vinisto-reviews__review">
			<div className="vinisto-reviews__review__user-wrap">
				<div className="vinisto-reviews__review__icon">
					<Avatar
						name={userNickName}
						size="xl"
						isLoading={isLoading}
					/>
				</div>
				<div>
					<div className="vinisto-reviews__review__name-wrap">
						{isLoading ? (
							<Skeleton
								containerClassName="vinisto-font-18"
								style={{ margin: '1rem 0 1.5rem 0' }}
							/>
						) : (
							<div className="vinisto-reviews__review__username">
								{get(review, 'createdUserDetail.nickname', '-')}
							</div>
						)}
					</div>
					<span className="vinisto-reviews__review__wrap__header__date">
						{isLoading ? (
							<Skeleton
								width="70px"
								height="20px"
							/>
						) : (
							getLocalizedDate(get(review, 'createdAt', 0) * 1000)
						)}
					</span>
				</div>

				<div className="vinisto-reviews__review__wrap__header">
					<div className="vinisto-reviews__review__wrap__header__date-approve-wrap"></div>
					<div className="desktop-only">
						{isLoading ? (
							<Skeleton
								width="30px"
								height="30px"
								count={5}
								style={{ marginRight: '.25rem' }}
								inline
							/>
						) : (
							<Rating
								defaultValue={get(review, 'stars', 0) / 2}
								isLarge
								readOnly
							/>
						)}
					</div>
				</div>
			</div>

			<div>
				<div className="vinisto-reviews__big-mobile-stars tablet-mobile-only">
					{isLoading ? (
						<Skeleton
							width="30px"
							height="30px"
							count={5}
							style={{ marginRight: '.25rem' }}
							inline
						/>
					) : (
						<Rating
							defaultValue={get(review, 'stars', 0) / 2}
							readOnly
						/>
					)}
				</div>
				<div className="vinisto-reviews__review__wrap__body">
					<div className="vinisto-reviews__review__wrap__body__text">
						{isLoading ? <Skeleton count={3.6} /> : get(review, 'text', '-')}
					</div>
					{isReviewOpen && !isLoading ? (
						<div className="vinisto-reviews__review__wrap__body__wrap">
							<div className="row vinisto-reviews__review__properties-wrap">
								<div className="vinisto-wine-profile__property">
									<div className="vinisto-wine-profile__property__heading">
										<span>
											{t({
												id: 'productDetail.slider.sweet',
											})}
										</span>
										<span>
											{t({
												id: 'productDetail.slider.dry',
											})}
										</span>
									</div>
									<ReactSlider
										className="vinisto-slider"
										thumbClassName="vinisto-thumb"
										trackClassName="vinisto-track"
										value={get(review, 'sweetDry', 0)}
										disabled
									/>
								</div>
								<div className="vinisto-wine-profile__property">
									<div className="vinisto-wine-profile__property__heading">
										<span>
											{t({
												id: 'productDetail.slider.light',
											})}
										</span>
										<span>
											{t({
												id: 'productDetail.slider.bold',
											})}
										</span>
									</div>
									<ReactSlider
										className="vinisto-slider"
										thumbClassName="vinisto-thumb"
										trackClassName="vinisto-track"
										value={get(review, 'lightHeavy', 0)}
										disabled
									/>
								</div>
								<div className="vinisto-wine-profile__property">
									<div className="vinisto-wine-profile__property__heading">
										<span>
											{t({
												id: 'productDetail.slider.fruity',
											})}
										</span>
										<span>
											{t({
												id: 'productDetail.slider.savory',
											})}
										</span>
									</div>
									<ReactSlider
										className="vinisto-slider"
										thumbClassName="vinisto-thumb"
										trackClassName="vinisto-track"
										value={get(review, 'fruitTannic', 0)}
										disabled
									/>
								</div>
								<div className="vinisto-wine-profile__property">
									<div className="vinisto-wine-profile__property__heading">
										<span className="vinisto-wine-profile__property__min">
											{t({
												id: 'productDetail.slider.lowAcid',
											})}
										</span>
										<span className="vinisto-wine-profile__property__max">
											{t({
												id: 'productDetail.slider.highAcid',
											})}
										</span>
									</div>
									<ReactSlider
										className="vinisto-slider"
										thumbClassName="vinisto-thumb"
										trackClassName="vinisto-track"
										value={get(review, 'lowHighAccidity', 0)}
										disabled
									/>
								</div>
							</div>
						</div>
					) : null}
				</div>
				<div className="vinisto-reviews__review__wrap__footer">
					{isLoading ? (
						<Skeleton
							width="200px"
							height="22px"
						/>
					) : (
						<span
							className="vinisto-reviews__review__wrap__footer__show-more"
							role="button"
							onClick={handleOnToggleReview}
						>
							{t({
								id: isReviewOpen
									? 'productDetail.review.wineProfile.hide'
									: 'productDetail.review.wineProfile.show',
							})}
							{!isReviewOpen ? (
								<Suspense fallback={<Loader blank />}>
									<FilterDropdownArrowIcon
										id={uniqueId()}
										alt={``}
										title={``}
										className={`FilterDropdownArrowIcon`}
									/>
								</Suspense>
							) : (
								<Suspense fallback={<Loader blank />}>
									<FilterDropdownArrowOpenedIcon
										id={uniqueId()}
										alt={``}
										title={``}
										className={`FilterDropdownArrowOpenedIcon`}
									/>
								</Suspense>
							)}
						</span>
					)}
				</div>
			</div>
		</div>
	);
};

export default Review;
