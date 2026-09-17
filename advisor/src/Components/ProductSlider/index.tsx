import { FC, useState } from 'react';
import cx from 'classnames';
import { useSwipeable } from 'react-swipeable';

import { BundleContextStates, useBundleContext } from '../../App/bundleContext';

import { AdvisedBundlesProps, carouselType } from './interfaces';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './style.module.css';
import ProductItem from './Components/ProductItem';

const ProductSlider: FC<AdvisedBundlesProps> = ({
	economicBundles: economicProducts,
	standardBundles: standardProducts,
	premiumBundles: premiumProducts,
}) => {
	const [activeEconomicSlide, setActiveEconomicSlide] = useState<number>(0);
	const [activeStandardSlide, setActiveStandardSlide] = useState<number>(0);
	const [activePremiumSlide, setActivePremiumSlide] = useState<number>(0);

	const { state } = useBundleContext();
	const { currentState } = state;
	const isLoading = currentState === BundleContextStates.LOADING;

	const economicBundlesEmpty = economicProducts.length === 0;
	const standardBundlesEmpty = standardProducts.length === 0;
	const premiumBundlesEmpty = premiumProducts.length === 0;

	const handleOnMoveSlider = (index: number, sliderType: carouselType) => {
		if (sliderType === carouselType.ECONOMIC) {
			setActiveEconomicSlide(index);
		}
		if (sliderType === carouselType.STANDARD) {
			setActiveStandardSlide(index);
		}
		if (sliderType === carouselType.PREMIUM) {
			setActivePremiumSlide(index);
		}
	};

	const handlersEconomic = useSwipeable({
		onSwipedRight: () =>
			handleOnMoveSlider(
				activeEconomicSlide > 0 ? activeEconomicSlide - 1 : 0,
				carouselType.ECONOMIC
			),
		onSwipedLeft: () => {
			handleOnMoveSlider(
				activeEconomicSlide < economicProducts.length - 1
					? activeEconomicSlide + 1
					: economicProducts.length - 1,
				carouselType.ECONOMIC
			);
		},
	});

	const handlersStandard = useSwipeable({
		onSwipedRight: () =>
			handleOnMoveSlider(
				activeStandardSlide > 0 ? activeStandardSlide - 1 : 0,
				carouselType.STANDARD
			),
		onSwipedLeft: () =>
			handleOnMoveSlider(
				activeStandardSlide < standardProducts.length - 1
					? activeStandardSlide + 1
					: standardProducts.length - 1,
				carouselType.STANDARD
			),
	});

	const handlersPremium = useSwipeable({
		onSwipedRight: () =>
			handleOnMoveSlider(
				activePremiumSlide > 0 ? activePremiumSlide - 1 : 0,
				carouselType.PREMIUM
			),
		onSwipedLeft: () =>
			handleOnMoveSlider(
				activePremiumSlide < premiumProducts.length - 1
					? activePremiumSlide + 1
					: premiumProducts.length - 1,
				carouselType.PREMIUM
			),
	});

	return (
		<div className={styles.mainWrapper}>
			<div
				className={styles.economicWrapper}
				{...handlersEconomic}
			>
				<div className={styles.adviseDescription}>
					<div className={styles.adviseHeader}>Ekonomická volba</div>
					<div className={styles.adviseContent}>
						Chutná avšak levnější vína, která jsou skvělou branou do světa světa
						hroznů.
					</div>
				</div>
				<div
					className={`${styles.productsWrapper} ${styles.productsWrapperEconomic}`}
				>
					<div className={styles.slickWrapper}>
						{isLoading || economicBundlesEmpty ? (
							<ProductItem
								bundle={null}
								isLoading={true}
								skeletonAnimationEnable={isLoading}
							/>
						) : (
							<>
								<div className={styles.slickBundleWrapper}>
									{economicProducts.map((bundle, index) => {
										return (
											<button
												key={bundle?.id}
												className={styles.slickBundleItem}
												onClick={(event) => {
													event?.preventDefault();
													handleOnMoveSlider(index, carouselType.ECONOMIC);
												}}
											>
												<ProductItem
													key={index}
													bundle={bundle}
													isLoading={false}
													isActive={activeEconomicSlide === index}
												/>
											</button>
										);
									})}
								</div>
								<div className={styles.slickDots}>
									{economicProducts.map((bundle, index) => {
										return (
											<button
												key={bundle?.id}
												className={cx(styles.slickDot, {
													[styles.slickDotInactive]:
														activeEconomicSlide !== index,
												})}
												onClick={(event) => {
													event?.preventDefault();
													handleOnMoveSlider(index, carouselType.ECONOMIC);
												}}
											>
												&#x2022;
											</button>
										);
									})}
								</div>
							</>
						)}
					</div>
				</div>
			</div>

			<div
				className={styles.standardWrapper}
				{...handlersStandard}
			>
				<div className={styles.adviseDescription}>
					<div className={styles.adviseHeader}>Zlatá střední cesta</div>
					<div className={styles.adviseContent}>
						Nejlepší poměr ceny a kvality. Kvalitní vína, mnohdy výherci soutěží
						se sympatickou cenovkou.
					</div>
				</div>
				<div className={styles.productsWrapper}>
					<div className={styles.slickWrapper}>
						{isLoading || standardBundlesEmpty ? (
							<ProductItem
								bundle={null}
								isLoading={true}
								skeletonAnimationEnable={isLoading}
							/>
						) : (
							<>
								<div className={styles.slickBundleWrapper}>
									{standardProducts.map((bundle, index) => {
										return (
											<button
												key={bundle?.id}
												className={styles.slickBundleItem}
												onClick={(event) => {
													event?.preventDefault();
													handleOnMoveSlider(index, carouselType.STANDARD);
												}}
											>
												<ProductItem
													key={index}
													bundle={bundle}
													isLoading={false}
													isActive={activeStandardSlide === index}
												/>
											</button>
										);
									})}
								</div>
								<div className={styles.slickDots}>
									{standardProducts.map((bundle, index) => {
										return (
											<button
												key={bundle?.id}
												className={cx(styles.slickDot, {
													[styles.slickDotInactive]:
														activeStandardSlide !== index,
												})}
												onClick={(event) => {
													event?.preventDefault();
													handleOnMoveSlider(index, carouselType.STANDARD);
												}}
											>
												&#x2022;
											</button>
										);
									})}
								</div>
							</>
						)}
					</div>
				</div>
			</div>

			<div
				className={styles.premiumWrapper}
				{...handlersPremium}
			>
				<div className={styles.adviseDescription}>
					<div className={styles.adviseHeader}>Prémiová vína</div>
					<div className={styles.adviseContent}>
						Absolutní špička oceňovaná na veletrzích a u profesionálních
						konzumentů, která si svou cenu snadno obhájí.
					</div>
				</div>
				<div
					className={`${styles.productsWrapper} ${styles.productsWrapperPremium}`}
				>
					<div className={styles.slickWrapper}>
						{isLoading || premiumBundlesEmpty ? (
							<ProductItem
								bundle={null}
								isLoading={true}
								skeletonAnimationEnable={isLoading}
							/>
						) : (
							<>
								<div className={styles.slickBundleWrapper}>
									{premiumProducts.map((bundle, index) => {
										return (
											<button
												key={bundle?.id}
												className={styles.slickBundleItem}
												onClick={(event) => {
													event?.preventDefault();
													handleOnMoveSlider(index, carouselType.PREMIUM);
												}}
											>
												<ProductItem
													key={index}
													bundle={bundle}
													isLoading={false}
													isActive={activePremiumSlide === index}
												/>
											</button>
										);
									})}
								</div>
								<div className={styles.slickDots}>
									{premiumProducts.map((bundle, index) => {
										return (
											<button
												key={bundle?.id}
												className={cx(styles.slickDot, {
													[styles.slickDotInactive]:
														activePremiumSlide !== index,
												})}
												onClick={(event) => {
													event?.preventDefault();
													handleOnMoveSlider(index, carouselType.PREMIUM);
												}}
											>
												&#x2022;
											</button>
										);
									})}
								</div>
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductSlider;
