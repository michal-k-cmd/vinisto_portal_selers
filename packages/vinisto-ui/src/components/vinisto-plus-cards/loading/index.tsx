import cx from 'classnames';
import Skeleton from 'react-loading-skeleton';

import styles from '../styles.module.css';

interface LoadingProps {
	subscriptionsClassName?: string;
}

const Loading = ({ subscriptionsClassName }: LoadingProps) => {
	return (
		<div className={cx(styles.subscriptions, subscriptionsClassName)}>
			<div className={styles.subscriptionCard}>
				<p className={styles.name}>
					<Skeleton />
				</p>
				<p className={styles.description}>
					<Skeleton />
				</p>
				<p className={styles.priceWithVat}>
					<Skeleton />
				</p>
				<p className={styles.priceWithoutVat}>
					<Skeleton />
				</p>
				<p className={styles.typeInfo}>
					<Skeleton />
				</p>
				<Skeleton className={styles.subscribeButton} />
			</div>
			<div className={styles.subscriptionCard}>
				<p className={styles.name}>
					<Skeleton />
				</p>
				<p className={styles.description}>
					<Skeleton />
				</p>
				<p className={styles.priceWithVat}>
					<Skeleton />
				</p>
				<p className={styles.priceWithoutVat}>
					<Skeleton />
				</p>
				<p className={styles.typeInfo}>
					<Skeleton />
				</p>
				<Skeleton className={styles.subscribeButton} />
			</div>
		</div>
	);
};
export default Loading;
