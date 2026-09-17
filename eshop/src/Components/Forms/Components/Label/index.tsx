import { ForwardedRef, forwardRef, HTMLProps } from 'react';
import cx from 'classnames';

import styles from './styles.module.css';

type TLabelProps = HTMLProps<HTMLLabelElement> & {
	isRequired?: boolean;
};

const Label = forwardRef(
	(
		{ children, className, isRequired, ...props }: TLabelProps,
		ref: ForwardedRef<HTMLLabelElement>
	) => {
		return (
			<label
				ref={ref}
				className={cx(
					styles.label,
					{ [styles.isRequired]: isRequired },
					className
				)}
				{...props}
			>
				{children}
			</label>
		);
	}
);

Label.displayName = 'Label';

export default Label;
