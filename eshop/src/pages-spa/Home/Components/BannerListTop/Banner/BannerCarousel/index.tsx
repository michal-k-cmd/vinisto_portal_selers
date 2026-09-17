'use client';

import {
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import cx from 'classnames';
import AliceCarousel from 'react-alice-carousel';
import { DeviceServiceContext } from 'Services/DeviceService';
import carouselConfig from 'Components/Carousel/config';
import { Banner } from 'Services/Banner/interfaces';

import TopBanner from '..';

import { CAROUSEL_MODE_BREAKPOINT, CONTAINER_PADDING_X } from './constants';
import styles from './styles.module.css';

interface CarouselProps {
	carouselType: keyof typeof carouselConfig;
	data?: Banner[] | undefined;
	isLoading?: boolean;
}

const emptyConfig = {};

const BannerCarousel = ({ carouselType, data }: CarouselProps) => {
	const { layoutWidth } = useContext(DeviceServiceContext);
	const [isBeingClientRendered, setIsBeingClientRendered] = useState(false);

	useEffect(() => {
		setIsBeingClientRendered(true);
	}, []);

	const isMatchingNarrowestBreakpoint = layoutWidth <= 500;

	// Reference: https://maxmarinich.github.io/react-alice-carousel/#stage-padding-percents
	const section = useRef<HTMLDivElement | null>(null);
	const [padding, setPadding] = useState(0);
	const [loadedImages, setLoadedImages] = useState(() =>
		(data ?? []).map(() => false)
	);

	const syncState = useCallback(() => {
		const { current } = section;
		if (current) {
			setPadding(
				(current.offsetWidth - CAROUSEL_MODE_BREAKPOINT + CONTAINER_PADDING_X) /
					2
			);
		}
	}, []);

	useEffect(syncState, [syncState]);

	const currentCarouselConfig = carouselConfig[carouselType] ?? emptyConfig;

	const handleOnLoadImage = useCallback(
		(i: number) => () => {
			setLoadedImages((prev) =>
				prev.map((loaded, index) => (index === i ? true : loaded))
			);
		},
		[]
	);

	const items = useMemo(() => {
		return (
			data?.map((banner, index) => (
				<TopBanner
					{...banner}
					key={`${banner.title}-${banner.position}-${index}`}
					cardOrder={index + 1}
					isMatchingNarrowestBreakpoint={isMatchingNarrowestBreakpoint}
					setLoadedImages={handleOnLoadImage(index)}
				/>
			)) ?? []
		);
	}, [data, isMatchingNarrowestBreakpoint, handleOnLoadImage]);

	const isAllImagesLoaded = loadedImages.every(Boolean);

	const memoizedCarousel = useMemo(
		() =>
			isBeingClientRendered ? (
				<AliceCarousel
					{...currentCarouselConfig}
					disableDotsControls={false}
					mouseTracking
					controlsStrategy="alternate"
					infinite
					paddingRight={isMatchingNarrowestBreakpoint ? undefined : padding}
					paddingLeft={isMatchingNarrowestBreakpoint ? undefined : padding}
					onResized={syncState}
					items={items}
					autoPlay={isAllImagesLoaded}
				/>
			) : (
				<div className="alice-carousel">
					<div className="alice-carousel__stage">
						{items.map((item, index) => (
							<div
								key={`top-carousel-item-${index}`}
								className="alice-carousel__stage-item"
							>
								{item}
							</div>
						))}
					</div>
					<div
						className="alice-carousel__dots"
						style={{ minHeight: 19.2 }}
					></div>
				</div>
			),
		[
			isBeingClientRendered,
			currentCarouselConfig,
			isMatchingNarrowestBreakpoint,
			padding,
			syncState,
			items,
			isAllImagesLoaded,
		]
	);

	return (
		<div
			ref={section}
			className={cx('TopBannerCarousel', styles.topBannerCarousel)}
		>
			{memoizedCarousel}
		</div>
	);
};

export default BannerCarousel;
