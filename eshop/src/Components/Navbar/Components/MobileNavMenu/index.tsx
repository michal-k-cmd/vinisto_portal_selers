import { useContext } from 'react';
import { NavbarContext } from 'Components/Navbar/context';
import MobileMenu from 'Components/MobileMenu';

import MobileMenuCategoryPage from './Pages/Category';
import MobileMenuInitialPage from './Pages/Initial';

const MobileNavMenu = () => {
	const navbarContext = useContext(NavbarContext);

	return (
		<MobileMenu
			onClose={() => navbarContext.setIsMenuOpen(false)}
			routes={[
				{
					path: '/',
					element: <MobileMenuInitialPage />,
					children: [
						{
							path: 'category/:id',
							element: <MobileMenuCategoryPage />,
						},
					],
				},
			]}
		/>
	);
};

export default MobileNavMenu;
