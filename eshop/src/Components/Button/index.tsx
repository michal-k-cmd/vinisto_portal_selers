import { ComponentPropsWithRef } from 'react';
import cx from 'classnames';

export type IButtonProps = ComponentPropsWithRef<'button'>;

const Button = ({ children, className, ...rest }: IButtonProps) => {
	return (
		<button
			className={cx('vinisto-btn vinisto-bg', className)}
			{...rest}
		>
			{children}
		</button>
	);
};

export default Button;
