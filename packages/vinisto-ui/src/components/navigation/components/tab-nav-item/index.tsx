import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';
import cx from 'classnames';

import styles from './styles.module.css';

type TabNavItemProps<T extends ElementType = 'div'> = {
	as?: T;
	children: ReactNode;
	className?: string;
	isActive: boolean;
} & ComponentPropsWithoutRef<T>;

const TabNavItem = <T extends ElementType>({
	as,
	children,
	className,
	isActive,
	...props
}: TabNavItemProps<T>) => {
	const Component = as || 'div';
	return (
		<Component
			{...props}
			className={cx(styles.blogTag, className, isActive && styles.active)}
		>
			{children}
		</Component>
	);
};

export default TabNavItem;
