import { ButtonHTMLAttributes, forwardRef } from 'react';
import cx from 'classnames';

import styles from './styles.module.css';

export const buttonVariants = {
	BASIC: 'basic',
	GREEN_OUTLINE: 'green_outline',
	SOLID_BACKGROUND: 'solid_background',
	CTA: 'cta',
} as const;

export const buttonSizes = {
	S: 's',
	M: 'm',
} as const;

export type ButtonVariant =
	(typeof buttonVariants)[keyof typeof buttonVariants];

export type ButtonSize = (typeof buttonSizes)[keyof typeof buttonSizes];

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode;
	variant?: ButtonVariant;
	size?: ButtonSize;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			className,
			variant = buttonVariants.BASIC,
			size = buttonSizes.M,
			...props
		},
		ref
	) => {
		return (
			<button
				{...props}
				ref={ref}
				className={cx(
					styles.component,
					styles[variant],
					styles[size],
					className
				)}
			>
				{props.children}
			</button>
		);
	}
);

Button.displayName = 'Button';

export default Button;
