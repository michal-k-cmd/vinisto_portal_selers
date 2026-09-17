import { HOME_PAGE_PRODUCTS_CAROUSEL } from 'Components/Carousel/constants';
import { CARD_TYPE } from 'Components/Carousel/interfaces';
import { QuantityBoxTypes } from 'Components/QuantityBox/constants';
import { useCurrentlyRecommendedTagBundles } from 'Hooks/useCurrentlyRecommendedTagBundles';
import Carousel from 'Components/Carousel';

import styles from './styles.module.css';

const OtherPeopleBuyCarousel = () => {
	const currentlyRecommendedCarouselDataQuery =
		useCurrentlyRecommendedTagBundles();

	if (!currentlyRecommendedCarouselDataQuery.data) return null;

	return (
		<div className={styles.carouselContainer}>
			<Carousel
				isLoading={currentlyRecommendedCarouselDataQuery.isLoading}
				data={currentlyRecommendedCarouselDataQuery.data}
				carouselType={HOME_PAGE_PRODUCTS_CAROUSEL}
				cardType={CARD_TYPE.CAROUSEL_CLASSIC}
				openCrossSellModal={false}
				displayPriceAsRange
				quantityBoxType={QuantityBoxTypes.DIRECT}
			/>
		</div>
	);
};

export default OtherPeopleBuyCarousel;
