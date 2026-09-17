import { Suspense, useContext } from 'react';
import cx from 'classnames';
import { DeviceServiceContext } from 'Services/DeviceService';
import NextLink from 'next/link';
import BurgerMenuIcon from 'Components/Icons/BurgerMenu';
import Basket from 'Components/Basket';
import Loader from 'Components/View/Loader';
import { NavbarContext } from 'Components/Navbar/context';
import { LocalizationContext } from 'Services/LocalizationService';
import { BasketContext } from 'Services/BasketService';
import { useIsB2b } from 'Services/PlatformService';

import MobileNavMenu from '../Components/MobileNavMenu';
import Search from '../Components/Search';
import Logo from '../Components/Logo';
import LanguagesSwitcher from '../Components/LanguageSwitcher';

import styles from './styles.module.css';

const MobileNavbar = () => {
	const isB2b = useIsB2b();
	const { footerHeight, layoutHeight } = useContext(DeviceServiceContext);
	const { useFormatMessage } = useContext(LocalizationContext);
	const { itemsQuantity } = useContext(BasketContext);

	const t = useFormatMessage();

	const {
		setIsMobileHeaderVisible,
		isMobileHeaderVisible,
		menuRef,
		isMenuOpen,
		handleOnToggleMenu,
		headerRef,
	} = useContext(NavbarContext);

	const handleSearchResultVisibility = (isVisible: boolean) => {
		if (isMenuOpen) return;
		if (isVisible) setIsMobileHeaderVisible(false);
	};

	return (
		<header
			className={cx(
				styles.mainHeader,
				isMobileHeaderVisible && styles.full,
				'd-print-none'
			)}
			ref={headerRef}
		>
			<div className={styles.fullTopMenu}>
				<button
					//@ts-expect-error Assuming HTMLDivElement ref will be compatible here
					ref={menuRef}
					onClick={handleOnToggleMenu}
					className={styles.burgerMenu}
				>
					<Suspense fallback={<Loader blank />}>
						<BurgerMenuIcon id="top-burger" />
					</Suspense>
				</button>
				<Logo />
				<div className={styles.basketWrapWrap}>
					<div className={styles.basketWrap}>
						<NextLink
							href={`/${t({ id: 'routes.cart.route' })}`}
							className="bottom-navigation-links__link pb-0"
						>
							<Basket
								showCount={itemsQuantity !== 0}
								size="sm"
								className="pb-0"
								isNavBottom
							/>
						</NextLink>
					</div>
				</div>
			</div>
			<div className={styles.searchBasketWrap}>
				<div className="search-wrapper">
					<Search onToggleResult={handleSearchResultVisibility} />
				</div>
			</div>
			{isMenuOpen && (
				<div
					ref={menuRef}
					style={{
						height: layoutHeight - footerHeight,
					}}
					className={styles.mobileNavMenuWrapper}
				>
					<MobileNavMenu />
				</div>
			)}
			{!isB2b && (
				<LanguagesSwitcher
					className={cx(
						styles.switcher,
						isMobileHeaderVisible && styles.visibleSwitcher
					)}
				/>
			)}
		</header>
	);
};

export default MobileNavbar;
