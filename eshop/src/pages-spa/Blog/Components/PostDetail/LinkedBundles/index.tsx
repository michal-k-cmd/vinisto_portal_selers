import { ARTICLE_PRODUCT_TYPE } from 'Services/ApiService/Cms/Blog/constants';
import ProductBox from 'Components/ProductBox';
import ContainerFullWidth from 'Components/View/ContainerFullWidth';
import AliceCarousel from 'react-alice-carousel';
import { Bundle } from 'vinisto_api_client/src/domain/bundle';

import styles from './styles.module.css';

const PostLinkedBundles = ({
	bundles,
	listingType,
	bundlesTitle,
}: {
	bundles: Bundle[];
	listingType?: ARTICLE_PRODUCT_TYPE;
	bundlesTitle: string;
}) => {
	if (!listingType || listingType == ARTICLE_PRODUCT_TYPE.NONE) return null;

	const items = bundles.map((bundle, index) => (
		<div
			className="v-carousel-classic__item"
			key={'blgpostbundles' + index}
		>
			<ProductBox bundleData={bundle} />
		</div>
	));

	const responsive = {
		'0': {
			items: 1,
		},
		'360': {
			items: 2,
		},
		'510': {
			items: 3,
		},
		'670': {
			items: 4,
		},
	};

	if (
		listingType == ARTICLE_PRODUCT_TYPE.CAROUSEL_SPECIFICATION ||
		listingType == ARTICLE_PRODUCT_TYPE.CAROUSEL_MANUAL
	) {
		return (
			<div className={styles.linkedBundlesCarousel}>
				<ContainerFullWidth>
					<div className="position-relative">
						<p className="h2 vinisto-card__heading">{bundlesTitle}</p>
						<div className={styles.carousel}>
							<AliceCarousel
								disableDotsControls={true}
								mouseTracking={true}
								responsive={responsive}
								paddingLeft={8}
								autoHeight={false}
								items={items}
							/>
						</div>
					</div>
				</ContainerFullWidth>
			</div>
		);
	}
	return (
		bundles?.length > 0 && (
			<div className={styles.linkedBundlesWrapper}>
				<h2 className={styles.linkedBundlesTitle}>{bundlesTitle}</h2>
				<div className={styles.linkedBundles}>
					{bundles.map((bundle) => (
						<ProductBox
							bundleData={bundle}
							key={'blgpostbundlesdonw' + bundle.id}
							showAddToBasketBtn={true}
						/>
					))}
				</div>
			</div>
		)
	);
};

export default PostLinkedBundles;
