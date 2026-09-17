'use client';

import Carousel from 'Components/Carousel';
import { HOME_PAGE_PRODUCTS_CAROUSEL } from 'Components/Carousel/constants';
import { CARD_TYPE, ICarouselProps } from 'Components/Carousel/interfaces';
import ContainerFullWidth from 'Components/View/ContainerFullWidth';
import { Bundle } from 'vinisto_api_client/src/domain/bundle';
import { useIsClient } from '@uidotdev/usehooks';
import { useEffect, useState } from 'react';

type TCarouselSectionProps = {
	data: Bundle[] | undefined;
	title: string;
	isLoading?: boolean;
	centered?: boolean;
} & Partial<ICarouselProps>;

const CarouselSection = ({
	data,
	title,
	centered = false,
	...carouselProps
}: TCarouselSectionProps) => {
	const isClient = useIsClient();
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (isClient) {
			setIsLoading(false);
		}
	}, [isClient]);

	return data && data.length > 0 ? (
		<ContainerFullWidth>
			<div
				className="position-relative"
				// This should probably not be in every carousel section!
				data-scroll-target="temporary_unavailable_cta"
			>
				<p className="h2 vinisto-card__heading">{title}</p>
				<Carousel
					{...carouselProps}
					isLoading={isLoading}
					data={data}
					carouselType={HOME_PAGE_PRODUCTS_CAROUSEL}
					cardType={CARD_TYPE.CAROUSEL_CLASSIC}
					showAddToBasketBtn={true}
					centered={centered}
					analyticsListName={carouselProps.analyticsListName ?? title}
				/>
			</div>
		</ContainerFullWidth>
	) : null;
};

export default CarouselSection;
