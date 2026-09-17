/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, useState } from 'react';
import { usePathname } from 'next/navigation';

import ItemLink from './Components/ItemLink';
import MobileMenuItem from './Components/Item';
import MobileMenuLink from './Components/Link';
import MobileMenuItemLink from './Components/MenuItemLink';
import MobileMenuPage from './Components/Page';

export const MobileMenuContext = createContext({
	pagePath: '/',
	params: {} as Record<string, string>,
	navigateToPage: (_: string) => {},
	closeMenu: () => {},
});

type TRoute = {
	path: string;
	element: React.ReactNode;
	children?: TRoute[];
};

type TMobileMenuProps = {
	onClose: () => void;
	routes: TRoute[];
};

const MobileMenu = ({ onClose, routes }: TMobileMenuProps) => {
	const [pagePath, setPagePath] = useState('/');
	const pathname = usePathname();

	// Simple route matching logic
	const matchedRoute = routes.find((route) => {
		// Convert route path pattern to regex for matching
		const pattern = route.path.replace(/:[^/]+/g, '([^/]+)');
		const regex = new RegExp(`^${pattern}$`);
		return regex.test(pagePath);
	});

	// Extract params from path
	const params: Record<string, string> = {};
	if (matchedRoute) {
		const pathParts = pagePath.split('/');
		const routeParts = matchedRoute.path.split('/');

		routeParts.forEach((part, index) => {
			if (part.startsWith(':')) {
				const paramName = part.substring(1);
				params[paramName] = pathParts[index] || '';
			}
		});
	}

	return (
		<MobileMenuContext.Provider
			value={{
				pagePath,
				params,
				navigateToPage: (pagePath: string) => setPagePath(pagePath),
				closeMenu: onClose,
			}}
		>
			{matchedRoute ? matchedRoute.element : <></>}
		</MobileMenuContext.Provider>
	);
};

MobileMenu.Page = MobileMenuPage;
MobileMenu.Link = MobileMenuLink;
MobileMenu.MenuItemLink = MobileMenuItemLink;
MobileMenu.Item = MobileMenuItem;
MobileMenu.ItemLink = ItemLink;

export default MobileMenu;
