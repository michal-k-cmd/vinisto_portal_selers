import { lazy, Suspense, useContext, useMemo } from 'react';
import { map, uniqueId } from 'lodash-es';
import { CARD_TYPE } from 'Components/Carousel/interfaces';
import { HOME_PAGE_REVIEWS_CAROUSEL } from 'Components/Carousel/constants';
import { DeviceServiceContext } from 'Services/DeviceService';
import { LocalizationContext } from 'Services/LocalizationService';
import ContainerFullWidth from 'Components/View/ContainerFullWidth';
import Card from 'Components/View/Card';
import Loader from 'Components/View/Loader';
import Carousel from 'Components/Carousel';
import ReviewCard from 'Components/Carousel/Components/ReviewCard';
const DotsIcon = lazy(() => import('Components/Icons/Dots'));

import { SKELETONS_NUM_REVIEWS } from './constants';
import { RecensionsPanelProps } from './interfaces';

import './styles.css';

const RecensionsPanel = ({ data, isLoading }: RecensionsPanelProps) => {
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();
	const { isMobile, isTablet } = useContext(DeviceServiceContext);

	const ReviewsDataSliced = useMemo(() => {
		if (isLoading) return map(Array(SKELETONS_NUM_REVIEWS), () => null);
		return data?.slice(0, SKELETONS_NUM_REVIEWS) || [];
	}, [data, isLoading]);

	return (
		<>
			{isMobile || isTablet ? (
				<ContainerFullWidth>
					<Card className="position-relative overflow-hidden p-2 pb-0">
						<div className="vinisto-card__header">
							<p className="h2 vinisto-card__heading pb-md-0 h-custom-padding">
								{t({
									id: 'carousel.heading.inspireCarousel',
								})}
							</p>
							<span className="vinisto-card__show-more mobile-hide"></span>
						</div>
						<div className="col-12 px-xl-1 px-0">
							<div className="row">
								<Carousel
									isLoading={isLoading}
									carouselType={HOME_PAGE_REVIEWS_CAROUSEL}
									cardType={CARD_TYPE.CAROUSEL_REVIEW}
									data={ReviewsDataSliced}
									showAddToBasketBtn={true}
								/>
							</div>
						</div>
					</Card>
				</ContainerFullWidth>
			) : (
				<ContainerFullWidth>
					<div className="vinisto-card__header">
						<p className="h2 vinisto-card__heading pb-md-0 pb-2">
							{t({
								id: 'carousel.heading.inspireCarousel',
							})}
						</p>
						<span className="vinisto-card__show-more mobile-hide"></span>
					</div>
					<div className="col-12 px-xl-1 px-0">
						<div className="row">
							{map(ReviewsDataSliced, (item, key) => (
								<ReviewCard
									key={'recerewcard' + key}
									data={item}
									isLoading={isLoading}
								/>
							))}
						</div>
					</div>
					<div className="tablet-mobile-only text-center mt-3 d-flex flex-column flex-wrap">
						<Suspense fallback={<Loader blank />}>
							<DotsIcon
								id={uniqueId()}
								className={`DotsIcon`}
							/>
						</Suspense>
						<div className="text-center"></div>
					</div>
				</ContainerFullWidth>
			)}
		</>
	);
};

export default RecensionsPanel;
