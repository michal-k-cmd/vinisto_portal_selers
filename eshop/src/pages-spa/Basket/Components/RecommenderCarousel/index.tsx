import { useContext } from 'react';
import { HOME_PAGE_PRODUCTS_CAROUSEL } from 'Components/Carousel/constants';
import { CARD_TYPE } from 'Components/Carousel/interfaces';
import { QuantityBoxTypes } from 'Components/QuantityBox/constants';
import {
	RecommenderName,
	useExternalRecommendedBundles,
} from 'Hooks/useExternalRecommendedBundles';
import Carousel from 'Components/Carousel';
import { LocalizationContext } from 'Services/LocalizationService';

import styles from './styles.module.css';

const RecommenderCarousel = () => {
	const t = useContext(LocalizationContext).useFormatMessage();

	const externalRecommendedCarouselDataQuery = useExternalRecommendedBundles({
		type: RecommenderName.Basket,
	});

	if (!externalRecommendedCarouselDataQuery.data) return null;

	return (
		<div className={styles.carouselContainer}>
			<p className={styles.carouselHeading}>{t({ id: 'basket.buyOthers' })}</p>
			<Carousel
				isLoading={externalRecommendedCarouselDataQuery.isLoading}
				data={externalRecommendedCarouselDataQuery.data?.bundles}
				carouselType={HOME_PAGE_PRODUCTS_CAROUSEL}
				cardType={CARD_TYPE.CAROUSEL_CLASSIC}
				openCrossSellModal={false}
				displayPriceAsRange
				quantityBoxType={QuantityBoxTypes.DIRECT}
				analyticsListId="recommendation_basket"
				analyticsListName="Recommendation"
			/>
		</div>
	);
};

export default RecommenderCarousel;
