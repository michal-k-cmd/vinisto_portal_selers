'use client';

import {
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import { map, range } from 'lodash-es';
import AliceCarousel from 'react-alice-carousel';
import { DeviceServiceContext } from 'Services/DeviceService';
import { useIsClient } from '@uidotdev/usehooks';
import useAnalytics from 'Hooks/useAnalytics';
import { GA_EVENT } from 'Hooks/useAnalytics/constants';
import useLocalizedValue from 'Hooks/useLocalizedValue';

import ProductBox from '../ProductBox';

import carouselsConfig from './config';
import { CARD_TYPE, ICarouselProps } from './interfaces';
import {
	SKELETONS_NUM_CLASSIC,
	SKELETONS_NUM_REVIEW_DESKTOP,
	SKELETONS_NUM_REVIEW_MOBILE,
	SKELETONS_NUM_REVIEW_TABLET,
} from './constants';
import CarouselTab from './Components/CarouselTab';
import ProducerCard from './Components/ProducerCard';
import ReviewCard from './Components/ReviewCard';

import 'react-alice-carousel/lib/alice-carousel.css';
import './styles.css';

const Carousel = ({
	carouselType,
	activeTabId,
	displayPriceAsRange = false,
	cardType,
	data,
	handleOnSelectTab,
	isCrossSell,
	isLoading = false,
	quantityBoxType,
	openCrossSellModal = true,
	showAddToBasketBtn,
	centered = false,
	analyticsListId,
	analyticsListName,
}: ICarouselProps) => {
	const { isDesktop, isMobile, isTablet } = useContext(DeviceServiceContext);
	const { sendEvent } = useAnalytics();
	const getLocalizedValue = useLocalizedValue();

	const isClient = useIsClient();
	const itemListId = analyticsListId ?? carouselType;
	const itemListName = analyticsListName ?? carouselType;

	const currentCarouselConfig = useMemo(() => {
		if (!isClient) {
			return {
				disableDotsControls: true,
			};
		}
		return carouselsConfig[carouselType];
	}, [carouselType, isClient]);

	const defaultTab = data?.[0];
	const [activeTab, setActiveTab] = useState(defaultTab?.id);

	const onSelectTab = useCallback(
		(data: any) => () => {
			if (data?.id !== activeTab) {
				setActiveTab(data?.id);
			}
		},
		[activeTab]
	);

	useEffect(() => {
		onSelectTab(defaultTab)();
	}, [defaultTab, onSelectTab]);

	useEffect(() => {
		if (cardType !== CARD_TYPE.CAROUSEL_CLASSIC || isLoading) return;
		if (!Array.isArray(data) || data.length === 0) return;

		sendEvent(GA_EVENT.VIEW_ITEM_LIST, {
			item_list_id: itemListId,
			item_list_name: itemListName,
			items: data.map((bundle: any, index) => ({
				item_id: bundle.id,
				item_name: getLocalizedValue(bundle.name),
				item_list_id: itemListId,
				item_list_name: itemListName,
				index: index + 1,
				price:
					bundle.bundlePrices?.discountedPrice?.value ??
					bundle.bundlePrices?.basePrice?.value ??
					0,
				quantity: 1,
			})),
		});
	}, [
		cardType,
		data,
		getLocalizedValue,
		isLoading,
		itemListId,
		itemListName,
		sendEvent,
	]);

	const carouselContainerRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (!(isMobile || isTablet)) {
			return;
		}

		let startX = 0;
		let startY = 0;

		function handleTouchStart(e: TouchEvent) {
			if (e.touches.length === 1) {
				startX = e.touches[0].clientX;
				startY = e.touches[0].clientY;
			}
		}

		function handleTouchMove(e: TouchEvent) {
			if (e.touches.length === 1) {
				const deltaX = Math.abs(e.touches[0].clientX - startX);
				const deltaY = Math.abs(e.touches[0].clientY - startY);
				if (deltaX > deltaY) {
					// If the movement is predominantly horizontal, prevent vertical scrolling
					e.preventDefault();
				}
			}
		}

		const el = carouselContainerRef.current;
		if (!el) {
			return;
		}
		el.addEventListener('touchstart', handleTouchStart, { passive: false });
		el.addEventListener('touchmove', handleTouchMove, { passive: false });

		return () => {
			if (el) {
				el.removeEventListener('touchstart', handleTouchStart);
				el.removeEventListener('touchmove', handleTouchMove);
			}
		};
	}, [isMobile, isTablet]);

	const MemoizedCarousel = useMemo(() => {
		const shouldCenter =
			centered && isDesktop && !isLoading && (data?.length || 0) < 6;

		return (
			<div ref={carouselContainerRef}>
				{/* CAROUSEL CLASSIC */}
				{cardType === CARD_TYPE.CAROUSEL_CLASSIC && (
					<div
						className={`v-carousel-classic ${
							shouldCenter ? 'v-carousel-classic--centered' : ''
						}`}
					>
						<AliceCarousel
							{...currentCarouselConfig}
							paddingLeft={8}
							autoHeight={false}
							ssrSilentMode
							items={
								isLoading
									? Array(SKELETONS_NUM_CLASSIC).map((index) => (
											<ProductBox
												key={'pb' + index}
												displayPriceAsRange={displayPriceAsRange}
												showAddToBasketBtn={showAddToBasketBtn ?? true}
												isLoading={true}
											/>
									  ))
									: map(data, (card, index) => (
											<div className="v-carousel-classic__item">
												<ProductBox
													key={card.id ?? 'pb' + index}
													bundleData={card}
													openCrossSellModal={openCrossSellModal}
													displayPriceAsRange={displayPriceAsRange}
													isCrossSell={isCrossSell ?? false}
													showAddToBasketBtn={showAddToBasketBtn ?? true}
													quantityBoxType={quantityBoxType}
													carouselType={carouselType}
													itemListId={itemListId}
													itemListName={itemListName}
													position={Number(index)}
												/>
											</div>
									  ))
							}
						/>
					</div>
				)}
				{/* CAROUSEL REVIEWS */}
				{cardType === CARD_TYPE.CAROUSEL_REVIEW && (
					<AliceCarousel
						{...currentCarouselConfig}
						items={
							isLoading
								? map(
										range(
											isMobile
												? SKELETONS_NUM_REVIEW_MOBILE
												: isTablet
												? SKELETONS_NUM_REVIEW_TABLET
												: SKELETONS_NUM_REVIEW_DESKTOP
										),
										(index) => (
											<ReviewCard
												key={'cd' + index}
												isLoading={true}
											/>
										)
								  )
								: map(data, (card, index) => (
										<ReviewCard
											key={'cd' + index}
											data={card}
											displayPriceAsRange={displayPriceAsRange}
										/>
								  ))
						}
					/>
				)}
				{/* CAROUSEL PRODUCERS */}
				{cardType === CARD_TYPE.CAROUSEL_PRODUCER && (
					<AliceCarousel
						{...currentCarouselConfig}
						items={
							isLoading
								? [
										<ProducerCard
											data={{
												bundles: [{ isLoading: true }, { isLoading: true }],
											}}
											isLoading={isLoading}
											key={'pc' + 0}
										/>,
								  ]
								: map(data, (card: any, index: number) => (
										<ProducerCard
											key={'pc' + index}
											data={card}
										/>
								  ))
						}
					/>
				)}
				{/* CAROUSEL TABS */}
				{cardType === CARD_TYPE.CAROUSEL_TAB && (
					<AliceCarousel
						{...currentCarouselConfig}
						items={map(isLoading ? range(5) : data, (tab, index) => (
							<div
								key={`homepage-vinisto-tab-${index}`}
								className={
									(activeTabId || activeTab) === tab.id
										? 'nav-item active'
										: 'nav-item'
								}
							>
								<CarouselTab
									key={tab.id ?? 'ct' + index}
									data={tab || {}}
									handleOnSelectTab={handleOnSelectTab ?? onSelectTab}
									isLoading={isLoading}
								/>
							</div>
						))}
					/>
				)}
			</div>
		);
	}, [
		centered,
		isDesktop,
		isLoading,
		data,
		cardType,
		currentCarouselConfig,
		isMobile,
		isTablet,
		displayPriceAsRange,
		showAddToBasketBtn,
		openCrossSellModal,
		isCrossSell,
		quantityBoxType,
		carouselType,
		itemListId,
		itemListName,
		activeTabId,
		activeTab,
		handleOnSelectTab,
		onSelectTab,
	]);

	return MemoizedCarousel;
};

export default Carousel;
