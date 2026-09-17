import Skeleton from 'react-loading-skeleton';

import successStyles from '../OrderSuccess/styles.module.css';

const OrderLoading = () => {
	return (
		<div className={successStyles.wrap}>
			<Skeleton className={successStyles.icon} />
			<h1 className={successStyles.heading}>
				<Skeleton width={400} />
			</h1>
			<div>
				<Skeleton />
			</div>
			<div className={successStyles.content}>
				<p>
					<Skeleton count={2} />
				</p>
				<div className={successStyles.buttonWrap}>
					<Skeleton
						width={170}
						height={42}
					/>
				</div>
				<p className={successStyles.problemsWrap}>
					<Skeleton
						count={2}
						width={300}
					/>
				</p>
			</div>
			<Skeleton height={200} />
		</div>
	);
};

export default OrderLoading;
