import cx from 'classnames';
import Skeleton from 'react-loading-skeleton';

import styles from '../styles.module.css';

interface LoadingProps {
	isDesktop: boolean;
	className?: string;
}

const Loading = ({ isDesktop, className }: LoadingProps) => {
	if (isDesktop)
		return (
			<div className={cx(styles.orderDesktop, className)}>
				<div className={styles.orderNumber}>
					Objednávka č. <Skeleton width="100px" />
				</div>
				<div className={styles.orderState}>
					<Skeleton width="120px" />
				</div>
				<div className={styles.orderCreatedAtDate}>
					<Skeleton width="120px" />
				</div>
				<div className={styles.orderPriceWrapper}>
					Celková cena{' '}
					<span className={styles.orderPrice}>
						<Skeleton width="120px" />
					</span>
				</div>
				<div className={styles.buttons}>
					<Skeleton width="120px" />
					<Skeleton width="120px" />
				</div>
			</div>
		);

	return (
		<>
			<div className={styles.orderGrid}>
				<div>
					<div className={styles.orderNumber}>
						Objednávka č. <Skeleton width="80px" />
					</div>
					<div className={styles.orderPriceWrapper}>
						Celková cena <Skeleton width="180px" />
					</div>
				</div>
				<div>
					<div className={styles.orderState}>
						<Skeleton width="180px" />
					</div>
					<div className={styles.orderCreatedAtDate}>
						<Skeleton width="180px" />
					</div>
				</div>
			</div>
			<div className={styles.buttons}>
				<Skeleton width="180px" />
				<Skeleton width="180px" />
			</div>
		</>
	);
};
export default Loading;
