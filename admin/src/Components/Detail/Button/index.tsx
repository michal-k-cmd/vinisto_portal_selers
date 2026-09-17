import { ComponentPropsWithoutRef, ElementType } from 'react';
import cx from 'classnames';

import styles from './styles.module.css';

type ButtonProps<T extends ElementType = 'button'> = {
	as?: T;
	children: React.ReactNode;
} & ComponentPropsWithoutRef<T>;

const DetailButton = <C extends ElementType>({
	as,
	className,
	...props
}: ButtonProps<C>) => {
	const Component = as || 'button';
	return (
		<Component
			{...props}
			className={cx(styles.button, className)}
		>
			{props.children}
		</Component>
	);
};

export default DetailButton;
