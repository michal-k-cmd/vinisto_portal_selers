import { type ReactNode } from 'react';
import cx from 'classnames';
import Skeleton from 'react-loading-skeleton';

import styles from './styles.module.css';

interface FilterHeadingProps {
	children: ReactNode;
	isLoading: boolean;
}

const Heading = ({ children, isLoading }: FilterHeadingProps) => {
	return (
		<div>
			{isLoading ? (
				<Skeleton containerClassName={cx(styles.legend, styles.skeleton)} />
			) : (
				<legend className={styles.legend}>{children}</legend>
			)}
		</div>
	);
};

export default Heading;
