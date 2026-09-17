import cx from 'classnames';

import { ICardProps } from './interfaces';
import styles from './styles.module.css';

const Card = (props: ICardProps) => {
	return (
		<div className={cx(styles.card, props?.className)}>{props.children}</div>
	);
};

export default Card;
