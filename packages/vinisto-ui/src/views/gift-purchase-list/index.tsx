'use client';

import GiftProgressBar from '../../components/gift-progress-bar';
import GiftPurchase from '../../components/gift-purchase';
import GiftProductListView from '../gift-product-list';
import { HorizontalRule } from '../../..';

import { GiftPurchaseListProps } from './types';
import styles from './styles.module.css';

const GiftPurchaseListView = ({
	translations,
	giftProductsProps,
	giftProgressBarProps,
	giftPurchaseProps,
}: GiftPurchaseListProps) => {
	return (
		<div>
			{giftProductsProps?.giftProducts.length > 0 ? (
				<GiftProductListView
					giftProducts={giftProductsProps?.giftProducts ?? []}
					translations={{ title: giftProductsProps.translations.title }}
				/>
			) : (
				<HorizontalRule className="mt-1 mb-3 tablet-mobile-only" />
			)}
			<div className={styles.giftWrapper}>
				<p className={styles.giftHeading}>{translations.title}</p>
				<GiftProgressBar
					{...giftProgressBarProps}
					className={styles.sliderWrap}
				/>
			</div>
			<div className={styles.listWrapper}>
				{giftPurchaseProps.map((giftPurchaseProps, key) => (
					<GiftPurchase
						{...giftPurchaseProps}
						key={key}
					/>
				))}
			</div>
		</div>
	);
};

export default GiftPurchaseListView;
