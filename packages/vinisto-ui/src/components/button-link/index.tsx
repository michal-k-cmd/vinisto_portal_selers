import { forwardRef, HtmlHTMLAttributes } from 'react';
import cx from 'classnames';
import NextLink from 'next/link';

import {
	type ButtonSize,
	buttonSizes,
	type ButtonVariant,
	buttonVariants,
} from '../button';
import styles from '../button/styles.module.css';

interface ButtonLinkProps extends HtmlHTMLAttributes<HTMLAnchorElement> {
	children: React.ReactNode;
	variant?: ButtonVariant;
	href: string;
	size?: ButtonSize;
}

const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(
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
			<NextLink
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
			</NextLink>
		);
	}
);

ButtonLink.displayName = 'ButtonLink';

export default ButtonLink;
