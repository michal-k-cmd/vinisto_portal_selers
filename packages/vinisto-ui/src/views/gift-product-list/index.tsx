import GiftProductProps from '../../components/gift-product';
import GiftIcon from '../../components/icons/Gift2';

import { GiftProductListViewProps } from './types';
import styles from './styles.module.css';

const GiftProductListView = ({
	giftProducts,
	translations,
}: GiftProductListViewProps) => {
	return (
		<div className={styles.giftProductListWrapper}>
			<div className={styles.giftsWrapper}>
				{giftProducts.map((giftProduct) => (
					<GiftProductProps
						key={giftProduct.bundleName}
						{...giftProduct}
						title={
							<p className={styles.giftHeading}>
								{translations.title}
								<GiftIcon />
							</p>
						}
					/>
				))}
			</div>
		</div>
	);
};

export default GiftProductListView;
