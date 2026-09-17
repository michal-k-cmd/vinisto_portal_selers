import ProductBox from 'Components/ProductBox';

import {
	fakeProduct,
	fakeProductNoImages,
	fakeProductNoPrice,
	fakeProductNoSpecifications,
	fakeProductNoTags,
} from './constants';
import styles from './styles.module.css';

const ComponentTestingPage = () => {
	return (
		<section id="content-wrapper">
			<div className={styles.wrapper}>
				<ProductBox
					displayPriceAsRange={false}
					showAddToBasketBtn={true}
					isLoading={true}
				/>
				<ProductBox
					// @ts-expect-error bundleData type is not compatible
					bundleData={fakeProductNoTags}
					displayPriceAsRange={true}
					showAddToBasketBtn={true}
					isLoading={false}
				/>
				<ProductBox
					// @ts-expect-error bundleData type is not compatible
					bundleData={fakeProductNoSpecifications}
					displayPriceAsRange={true}
					showAddToBasketBtn={true}
					isLoading={false}
				/>
				<ProductBox
					// @ts-expect-error bundleData type is not compatible
					bundleData={fakeProductNoImages}
					displayPriceAsRange={true}
					showAddToBasketBtn={true}
					isLoading={false}
				/>
				<ProductBox
					// @ts-expect-error bundleData type is not compatible
					bundleData={fakeProductNoPrice}
					displayPriceAsRange={true}
					showAddToBasketBtn={true}
					isLoading={false}
				/>
				<ProductBox
					// @ts-expect-error bundleData type is not compatible
					bundleData={fakeProductNoPrice}
					displayPriceAsRange={true}
					showAddToBasketBtn={true}
					isLoading={false}
				/>
				<ProductBox
					// @ts-expect-error bundleData type is not compatible
					bundleData={fakeProduct}
					displayPriceAsRange={true}
					showAddToBasketBtn={true}
					isLoading={false}
					showProducer={false}
				/>
				<ProductBox
					// @ts-expect-error bundleData type is not compatible
					bundleData={{ ...fakeProduct, isForLogged: true }}
					displayPriceAsRange={true}
					showAddToBasketBtn={true}
					isLoading={false}
				/>
				<ProductBox
					// @ts-expect-error bundleData type is not compatible
					bundleData={fakeProduct}
					displayPriceAsRange={true}
					showAddToBasketBtn={true}
					isLoading={false}
				/>
			</div>
		</section>
	);
};

export default ComponentTestingPage;
