'use client';

import { useContext, useLayoutEffect, useRef } from 'react';
import { DeviceServiceAction } from 'Services/DeviceService/constants';
import useOnClickOutside from 'Hooks/useOnClickOutside';
import { DeviceServiceContext } from 'Services/DeviceService';
import BasketHeader from 'Components/Navbar/Components/BasketHeader';
import useWebSectionNext from 'Hooks/use-web-section';
import { usePlatformContext } from 'Services/PlatformService';

import useStaticCategories from './useStaticCategories';
import { NavbarContext } from './context';
import './styles.css';
import DesktopNavbar from './DesktopNavbar';
import MobileNavbar from './MobileNavbar';
import MobileNavMenu from './Components/MobileNavMenu';
import styles from './styles.module.css';

const Navbar = () => {
	const isInAdminIframe = usePlatformContext().getIsInAdminIframe();
	const {
		isMobile,
		isTablet,
		layoutHeight,
		layoutWidth,
		dispatch,
		footerHeight,
	} = useContext(DeviceServiceContext);

	const navbarContext = useContext(NavbarContext);

	const menuRef = navbarContext?.menuRef;

	const headerRef = useRef<HTMLElement>(null);
	const menuBtnRef = useRef<HTMLDivElement>(null);

	const { desktopMenu } = useStaticCategories();
	const { isCheckout } = useWebSectionNext();

	useOnClickOutside([menuBtnRef, menuRef], navbarContext.handleOnCloseMenu);

	useLayoutEffect(() => {
		const activeHeaderRef = isCheckout ? headerRef : navbarContext.headerRef;
		const headerHeight =
			activeHeaderRef.current?.getBoundingClientRect().height;

		if (headerHeight) {
			dispatch([DeviceServiceAction.setHeaderHeight, headerHeight]);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isCheckout, layoutWidth, layoutHeight, navbarContext.headerRef]);

	if (isInAdminIframe) return null;

	if (isCheckout) {
		return (
			<>
				<header
					ref={headerRef}
					className={styles.cartHeader}
				>
					<BasketHeader />
				</header>
				{(isMobile || isTablet) && navbarContext.isMenuOpen && (
					<div
						className="basket-mobile-menu"
						style={{
							height: layoutHeight - footerHeight,
						}}
					>
						<MobileNavMenu />
					</div>
				)}
			</>
		);
	}

	if (isMobile || isTablet) {
		return <MobileNavbar />;
	}

	return <DesktopNavbar staticCategories={desktopMenu} />;
};

export default Navbar;
