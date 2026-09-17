import cx from 'classnames';

import { ProductBasketCountProps } from './interfaces';
import styles from './styles.module.css';

const ProductBasketCount = ({ text, className }: ProductBasketCountProps) => {
	if (!text) return <></>;
	return <div className={cx(styles.infoBox, className)}>{text}</div>;
};

export default ProductBasketCount;
