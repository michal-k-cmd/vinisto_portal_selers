import { ReactNode, useContext } from 'react';
import Link from 'next/link';
import cx from 'classnames';
import { MobileMenuContext } from 'Components/MobileMenu';

import styles from './styles.module.css';

interface TItemLinkProps {
	children: ReactNode;
	to: string;
	className?: string;
	[key: string]: any;
}

/**
 * Styled Mobile Menu Link that navigates in browser router and closes menu after click
 */
const ItemLink = ({ children, to, className, ...rest }: TItemLinkProps) => {
	const { closeMenu } = useContext(MobileMenuContext);

	return (
		<Link
			href={to}
			onClick={closeMenu}
			className={cx(styles.itemLink, className)}
			{...rest}
		>
			{children}
		</Link>
	);
};

export default ItemLink;
