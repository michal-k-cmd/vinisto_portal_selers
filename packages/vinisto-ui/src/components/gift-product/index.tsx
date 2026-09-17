import { GiftProductProps } from './types';
import styles from './styles.module.css';

const GiftProduct = ({ imageUrl, bundleName, title }: GiftProductProps) => {
	return (
		<div className={styles.wrapper}>
			<img
				src={imageUrl}
				alt={bundleName}
				className={styles.giftImage}
			/>
			<div className={styles.texts}>
				{title}
				<div className={styles.textWrapper}>{bundleName}</div>
			</div>
		</div>
	);
};

export default GiftProduct;
