import cx from 'classnames';
import { AnchorHTMLAttributes, ComponentProps, HTMLProps } from 'react';
import Link from 'next/link';

import styles from './styles.module.css';

const VinistoLink = ({
	children,
	to,
	className,
	target,
}: {
	to: string;
	className?: string;
	children: React.ReactNode;
	target?: string;
}) => {
	return (
		<Link
			href={to}
			className={cx(styles.link, className)}
			target={target}
		>
			{children}
		</Link>
	);
};

// VinistoLinkNext is now redundant since VinistoLink uses Next.js Link
// Keeping it for backward compatibility
export const VinistoLinkNext = ({
	className,
	children,
	...props
}: ComponentProps<typeof Link> & {
	className?: string;
	children: React.ReactNode;
}) => {
	return (
		<Link {...props}>
			<span className={cx(styles.link, className)}>{children}</span>
		</Link>
	);
};

type TVinistoAnchorLinkProps = AnchorHTMLAttributes<HTMLAnchorElement>;

export const VinistoAnchorLink = ({
	children,
	className,
	href,
	...props
}: TVinistoAnchorLinkProps) => {
	return (
		<a
			href={href}
			className={cx(styles.link, className)}
			{...props}
		>
			{children}
		</a>
	);
};

type TVinistoSpanLinkProps = HTMLProps<HTMLSpanElement>;

export const VinistoSpanLink = ({
	children,
	className,
	...props
}: TVinistoSpanLinkProps) => {
	return (
		<span
			className={cx(styles.link, className)}
			{...props}
		>
			{children}
		</span>
	);
};

export default VinistoLink;
