import { HTMLProps, MouseEvent, ReactNode, useContext } from 'react';
import { useRouter } from 'next/navigation';

import { MobileMenuContext } from '../..';

export interface IMobileMenuLinkProps extends HTMLProps<HTMLDivElement> {
	to: string;
	children: ReactNode;
	hasSubmenu?: boolean;
}

/**
 * Custom Mobile Menu Link that navigates inside mobile menu instead of browser router
 */
const MobileMenuLink = ({
	to,
	children,
	onClick,
	hasSubmenu,
	...rest
}: IMobileMenuLinkProps) => {
	const { pagePath, navigateToPage } = useContext(MobileMenuContext);
	const { closeMenu } = useContext(MobileMenuContext);
	const router = useRouter();

	const handleOnClick = (e: MouseEvent<HTMLDivElement>) => {
		if (typeof onClick === 'function') {
			onClick(e);
		}
		if (!hasSubmenu) {
			router.push(to);
			closeMenu();
		}
		if (to[0] !== '/') {
			if (pagePath[pagePath?.length - 1] !== '/') {
				navigateToPage(`${pagePath}/${to}`);
			} else {
				navigateToPage(`${pagePath}${to}`);
			}
		} else {
			navigateToPage(to);
		}
	};

	return (
		<div
			onClick={handleOnClick}
			{...rest}
		>
			{children}
		</div>
	);
};

export default MobileMenuLink;
