'use client';

import { useContext } from 'react';
import cx from 'classnames';
import { MenuLink } from 'vinisto_api_client/src/api-types/linkwidgets-api';
import Container from 'Components/View/Container';
import { useIsB2b } from 'Services/PlatformService';

import Basket from '../Components/NavBasket';
import CategoryLinkList from '../Components/CategoryLinkList';
import Favorites from '../Components/Favorites';
import Logo from '../Components/Logo';
import UserMenu from '../Components/UserMenu';
import Search from '../Components/Search';
import { NavbarContext } from '../context';
import LanguagesSwitcher from '../Components/LanguageSwitcher';

import styles from './styles.module.css';

interface DesktopNavbarProps {
	staticCategories: MenuLink[];
}

const DesktopNavbar = ({ staticCategories }: DesktopNavbarProps) => {
	const isB2b = useIsB2b();
	const { headerRef } = useContext(NavbarContext);

	return (
		<header
			className={cx(styles.mainHeader, 'd-print-none')}
			ref={headerRef}
		>
			<Container>
				<div className={styles.headerWrapper}>
					<div className={styles.logoWrapper}>
						<Logo />
					</div>
					{!isB2b && (
						<div className={styles.languagesSwitcherCol}>
							<LanguagesSwitcher />
						</div>
					)}
					<div className={cx(styles.searchWrapper, 'search-wrapper')}>
						<Search />
					</div>
					<div className={styles.functionButtonWrapper}>
						<Favorites />
						<UserMenu />
						{!isB2b && (
							<a
								className={styles.b2bLink}
								href={process.env.NEXT_PUBLIC_B2B_URI ?? '#'}
							>
								Nakupuji jako firma
							</a>
						)}
						<Basket />
					</div>
				</div>
			</Container>

			<CategoryLinkList links={staticCategories} />
		</header>
	);
};

export default DesktopNavbar;
