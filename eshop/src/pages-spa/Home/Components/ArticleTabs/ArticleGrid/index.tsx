import { ReactNode } from 'react';
import cx from 'classnames';

import styles from './styles.module.css';

const ArticleGrid = ({
	children,
	className,
	isLoading,
}: {
	children: ReactNode;
	className?: string;
	isLoading?: boolean;
}) => {
	return (
		<div
			className={cx(styles.component, {
				loading: isLoading,
				...(className && { [className]: true }),
			})}
		>
			{children}
		</div>
	);
};

export default ArticleGrid;
