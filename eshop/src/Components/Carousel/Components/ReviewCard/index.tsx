import * as React from 'react';
import Skeleton from 'react-loading-skeleton';
import { get, head, size } from 'lodash-es';
import { LocalizationContext } from 'Services/LocalizationService';
import ProductBox from 'Components/ProductBox';
import Rating from 'Components/Rating';
import VinistoLink from 'Components/VinistoLink';
import useLocalizedDateTime from 'Hooks/useLocalizedDateTime';
import useLocalizedValue from 'Hooks/useLocalizedValue';

import User from './Components/User';
import { ReviewCardProps } from './interfaces';

import './styles.css';

const ReviewCard = (props: ReviewCardProps) => {
	const localizationContext = React.useContext(LocalizationContext);
	const getLocalizedDate = useLocalizedDateTime();
	const getLocalizedValue = useLocalizedValue();
	const t = localizationContext.useFormatMessage();
	const isLoading = get(props, 'isLoading', false);
	const displayPriceAsRange = get(props, 'displayPriceAsRange', false);

	const bundleEvaluation = props.data?.bundleEvaluation;
	const evaluations = props.data?.evaluations;

	const isLoadingEvaluations = size(evaluations) === 0;
	const bundleAvgRating = (bundleEvaluation?.averageStars ?? 0) / 2;
	const userNickname = get(
		get(head(get(evaluations, 'evaluations', [])), 'createdUserDetail', []),
		'nickname',
		''
	);
	const reviewText = get(head(get(evaluations, 'evaluations', [])), 'text', '');
	const createdTime = get(
		head(get(evaluations, 'evaluations', [])),
		'createdAt',
		''
	);

	return (
		<div className="vinisto-recension margin-custom">
			{props?.data && !isLoading ? (
				<ProductBox
					bundleData={props.data}
					displayPriceAsRange={displayPriceAsRange}
					showAddToBasketBtn={true}
					isLoading={false}
				/>
			) : (
				<ProductBox
					bundleData={null}
					displayPriceAsRange={displayPriceAsRange}
					showAddToBasketBtn={true}
					isLoading={true}
				/>
			)}

			<div className="vinisto-recension__right">
				<User
					nickname={userNickname}
					isLoading={isLoadingEvaluations}
				/>
				<div className="vinisto-recension__date-likes">
					{isLoadingEvaluations ? (
						<Skeleton
							width="70px"
							height="25px"
						/>
					) : (
						<div className="vinsto-recension__date">
							{getLocalizedDate(Number(createdTime) * 1000)}
						</div>
					)}
					{isLoadingEvaluations ? (
						<Skeleton
							width="50px"
							height="25px"
						/>
					) : null}
				</div>
				{isLoadingEvaluations ? (
					<Skeleton
						containerClassName="vinisto-recension__stars"
						width="163px"
						height="26px"
					/>
				) : (
					<div className="vinisto-recension__stars">
						<Rating
							defaultValue={bundleAvgRating}
							readOnly
						/>
					</div>
				)}
				{isLoadingEvaluations ? (
					<Skeleton
						containerClassName="vinisto-recension__text w-100"
						count={5.6}
						height="12px"
					/>
				) : (
					<div className="vinisto-recension__text vinisto-font-18 max-lines--12">
						„{reviewText}&quot;
					</div>
				)}
				<div className="vinisto-recension__detail">
					{isLoadingEvaluations ? (
						<Skeleton
							containerClassName="vinisto-recension__detail__link"
							width="45%"
						/>
					) : (
						<VinistoLink
							to={`/${t({
								id: 'routes.product.route',
							})}/${getLocalizedValue(get(props?.data, 'url', []))}`}
							className="vinisto-recension__detail__link vinisto-font-18"
						>
							{t({ id: 'carousel.card.link.openDetail' })} &gt;
						</VinistoLink>
					)}
				</div>
			</div>
		</div>
	);
};

export default ReviewCard;
