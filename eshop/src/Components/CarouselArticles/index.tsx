import AliceCarousel from 'react-alice-carousel';
import { BlogArticlePreview } from 'Services/ApiService/Cms/Blog/interfaces';
import carouselsConfig from 'Components/Carousel/config';

import ArticleInfo from './Components/CarouselArticleCard';

interface CarouselProps {
	carouselType: keyof typeof carouselsConfig;
	data?: BlogArticlePreview[] | undefined;
	isLoading?: boolean;
}

const CarouselArticles = ({ carouselType, data, isLoading }: CarouselProps) => {
	const currentCarouselConfig = carouselsConfig[carouselType];

	return (
		<AliceCarousel
			{...currentCarouselConfig}
			items={data?.map((card, index) => (
				<ArticleInfo
					key={'ai' + index}
					data={card}
					isLoading={isLoading}
				/>
			))}
		/>
	);
};

export default CarouselArticles;
