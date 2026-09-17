import { HTMLProps, ReactNode } from 'react';
import cx from 'classnames';

import styles from './styles.module.css';

interface ICategoryHeadingProps extends HTMLProps<HTMLDivElement> {
	children: ReactNode;
}

const CategoryHeading = ({
	children,
	className,
	...rest
}: ICategoryHeadingProps) => {
	return (
		<div
			className={cx(styles.heading, className)}
			{...rest}
		>
			{children}
		</div>
	);
};

export default CategoryHeading;
