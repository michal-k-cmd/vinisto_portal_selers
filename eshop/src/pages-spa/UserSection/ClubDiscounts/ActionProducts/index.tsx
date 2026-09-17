import { useContext } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';
import Carousel from 'Components/Carousel';
import { HOME_PAGE_PRODUCTS_CAROUSEL } from 'Components/Carousel/constants';
import { CARD_TYPE } from 'Components/Carousel/interfaces';
import { QuantityBoxTypes } from 'Components/QuantityBox/constants';
import Link from 'next/link';

import styles from './styles.module.css';
import { useActionProducts } from './useActionProducts';
import { DESTILATES_URL, PRODUCT_TYPE, SETS_URL, WINES_URL } from './constants';

const ActionsProducts = () => {
	const { useFormatMessage } = useContext(LocalizationContext);
	const t = useFormatMessage();

	const winesQuery = useActionProducts(PRODUCT_TYPE.WINES);
	const destilatesQuery = useActionProducts(PRODUCT_TYPE.DESTILATES);
	const setsQuery = useActionProducts(PRODUCT_TYPE.SETS);

	return (
		<div>
			{(winesQuery.data?.length ?? 0) > 0 && (
				<>
					<div className={styles.heading}>
						<h2 className={styles.title}>
							{t({
								id: 'userSection.winesHeading',
							})}
						</h2>
						<Link
							href={WINES_URL}
							className={styles.link}
						>
							{t({
								id: 'userSection.showAllProducts',
							})}
						</Link>
					</div>
					<Carousel
						isLoading={winesQuery.isLoading}
						data={winesQuery.data}
						carouselType={HOME_PAGE_PRODUCTS_CAROUSEL}
						cardType={CARD_TYPE.CAROUSEL_CLASSIC}
						openCrossSellModal={false}
						displayPriceAsRange
						quantityBoxType={QuantityBoxTypes.DIRECT}
					/>
					<div className={styles.linkMobileWrap}>
						<Link
							href={WINES_URL}
							className={styles.linkMobile}
						>
							{t({
								id: 'userSection.showAllProducts',
							})}
						</Link>
					</div>
				</>
			)}
			{(destilatesQuery.data?.length ?? 0) > 0 && (
				<>
					<div className={styles.heading}>
						<h2 className={styles.title}>
							{t({
								id: 'userSection.destilatesHeading',
							})}
						</h2>
						<Link
							href={DESTILATES_URL}
							className={styles.link}
						>
							{t({
								id: 'userSection.showAllProducts',
							})}
						</Link>
					</div>
					<Carousel
						isLoading={destilatesQuery.isLoading}
						data={destilatesQuery.data}
						carouselType={HOME_PAGE_PRODUCTS_CAROUSEL}
						cardType={CARD_TYPE.CAROUSEL_CLASSIC}
						openCrossSellModal={false}
						displayPriceAsRange
						quantityBoxType={QuantityBoxTypes.DIRECT}
					/>
					<div className={styles.linkMobileWrap}>
						<Link
							href={DESTILATES_URL}
							className={styles.linkMobile}
						>
							{t({
								id: 'userSection.showAllProducts',
							})}
						</Link>
					</div>
				</>
			)}
			{(setsQuery.data?.length ?? 0) > 0 && (
				<>
					<div className={styles.heading}>
						<h2 className={styles.title}>
							{t({
								id: 'userSection.setsHeading',
							})}
						</h2>
						<Link
							href={SETS_URL}
							className={styles.link}
						>
							{t({
								id: 'userSection.showAllProducts',
							})}
						</Link>
					</div>
					<Carousel
						isLoading={setsQuery.isLoading}
						data={setsQuery.data}
						carouselType={HOME_PAGE_PRODUCTS_CAROUSEL}
						cardType={CARD_TYPE.CAROUSEL_CLASSIC}
						openCrossSellModal={false}
						displayPriceAsRange
						quantityBoxType={QuantityBoxTypes.DIRECT}
					/>
					<div className={styles.linkMobileWrap}>
						<Link
							href={SETS_URL}
							className={styles.linkMobile}
						>
							{t({
								id: 'userSection.showAllProducts',
							})}
						</Link>
					</div>
				</>
			)}
			{(winesQuery.data?.length ?? 0) === 0 &&
				(destilatesQuery.data?.length ?? 0) === 0 &&
				(setsQuery.data?.length ?? 0) === 0 && (
					<div className={styles.noProducts}>
						<span>
							{t({
								id: 'routes.user-section.club-coupons.action-products.empty',
							})}
						</span>
					</div>
				)}
		</div>
	);
};

export default ActionsProducts;
