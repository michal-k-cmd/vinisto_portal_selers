import { ChangeEvent, useCallback, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthenticationAction } from 'Services/AuthenticationService/constants';
import { LOGIN } from 'Services/RoutingService/constants';
import { LocalStorageKeys } from 'Services/StorageService/constants';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { LocalizationContext } from 'Services/LocalizationService';
import { storageServiceInstance } from 'Services/StorageService';
import SupplierSwitch from 'Components/SupplierSwitch';
import Burger from 'Components/Burger';
import { FaUser } from 'react-icons/fa';
import { LogOutIcon, VinistoLogoEmblemIcon } from 'Components/Icons';
import InfoIcon from 'Components/Icons/InfoIcon';

import styles from './styles.module.css';

const sectionTitleActionMap: Record<
	string,
	{
		title: string;
		tutorialUrl: string;
	}
> = {
	'/bundle-list': {
		title: 'Produkty',
		tutorialUrl: 'https://www.vinisto.cz/vinisto-manual-admin-produkty',
	},
	'/stock-request-list': {
		title: 'Produkty',
		tutorialUrl: 'https://www.vinisto.cz/vinisto-manual-admin-produkty',
	},
	'/set-list': {
		title: 'Produkty',
		tutorialUrl: 'https://www.vinisto.cz/vinisto-manual-admin-produkty',
	},
	'/billing': {
		title: 'Vyúčtování prodejů',
		tutorialUrl:
			'https://www.vinisto.cz/vinisto-manual-admin-vyuctovani-prodeju',
	},
	'/discount-coupons': {
		title: 'Marketing',
		tutorialUrl: 'https://www.vinisto.cz/vinisto-manual-admin-marketing',
	},
	'/settings': {
		title: 'Nastavení',
		tutorialUrl: 'https://www.vinisto.cz/vinisto-manual-admin-nastaveni',
	},
};

const NavBar = () => {
	const { dispatch, isLoggedIn, vinistoUser } = useContext(
		AuthenticationContext
	);
	const { useFormatMessage, changeLanguage, activeLanguage } =
		useContext(LocalizationContext);
	const navigate = useNavigate();
	const { pathname } = useLocation();

	const matched = Object.entries(sectionTitleActionMap).find(([base]) =>
		pathname.startsWith(base)
	);
	const section = matched?.[1];

	const t = useFormatMessage();

	const handleLanguageSwitch = useCallback(
		(event: ChangeEvent<HTMLSelectElement>) => {
			changeLanguage(event?.target?.value ?? activeLanguage);
		},
		[activeLanguage, changeLanguage]
	);

	const handleOnLogOut = useCallback(() => {
		dispatch({
			type: AuthenticationAction.logOut,
		});

		navigate(LOGIN, { replace: true });
		storageServiceInstance.removeItem(LocalStorageKeys.LOGIN_REDIRECT_PATH);
	}, [dispatch, navigate]);

	if (!isLoggedIn) {
		return <></>;
	}

	return (
		<div className={styles.vcaNavbar}>
			<div className={styles.vcaNavbarMenuHeader}>
				<div className={styles.vcaNavbarLogo}>
					<Link
						className={styles.vcaNavbarLogoLink}
						to="/"
					>
						<VinistoLogoEmblemIcon />
					</Link>
				</div>
				<div className={styles.vcaNavbarWinery}>
					<SupplierSwitch />
				</div>
			</div>

			<div className={styles.vcaNavbarHeader}>
				<div className={styles.headerLeft}>
					<div className={styles.vcaNavbarBurgerWrap}>
						<Burger />
					</div>
				</div>

				<div className={styles.headerCenter}>
					{section ? (
						<span className={styles.sectionTitle}>
							{section.title}
							<a
								className={styles.sectionHelp}
								href={section.tutorialUrl}
								target="_blank"
								rel="noreferrer"
								aria-label="Help"
							>
								<InfoIcon />
							</a>
						</span>
					) : (
						<span></span>
					)}
				</div>

				<div className={styles.headerRight}>
					<div className={styles.vcaNavbarLanguage}>
						<select
							name="language"
							id="language"
							defaultValue={activeLanguage}
							value={activeLanguage}
							onChange={handleLanguageSwitch}
						>
							<option value="cs">🇨🇿 Čeština</option>
							<option value="en">🇺🇸 English</option>
							<option value="de">🇩🇪 Deutsch</option>
						</select>
					</div>

					<div className={styles.vcaNavbarUser}>
						<FaUser className={styles.mobileOnly} />
						<span className={styles.mobileHide}>{vinistoUser?.email}</span>
						<button
							onClick={handleOnLogOut}
							className={`${styles.vcaNavbarBtnLogout}`}
						>
							<span
								className={`${styles.vcaNavbarLogoutLabel} ${styles.mobileHide}`}
							>
								{t({ id: 'navbar.logout' })}
							</span>
							<LogOutIcon className={styles.vcaNavbarLogoutIcon} />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default NavBar;
