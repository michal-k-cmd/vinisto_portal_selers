import { HTMLProps, ReactNode } from 'react';
import cx from 'classnames';

import styles from './styles.module.css';

type ContainerHeadingProps = HTMLProps<HTMLHeadingElement> &
	(
		| {
				value?: ReactNode;
				children?: undefined;
		  }
		| {
				value?: undefined;
				children?: ReactNode;
		  }
	);

const ContainerHeading = ({
	value,
	children,
	...props
}: ContainerHeadingProps) => {
	return (
		<h5
			{...props}
			className={cx(styles.containerHeading, props.className)}
		>
			{value || children}
		</h5>
	);
};

export default ContainerHeading;
