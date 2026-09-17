import { useCallback, useContext } from 'react';
import cx from 'classnames';
import { get } from 'Helpers/lodash';
import { SideBarContext } from 'Components/SideBar/context';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { DeviceServiceContext } from 'Services/DeviceService';

import './styles.css';
import styles from './styles.module.css';

const Burger = () => {
	const sideBarContext = useContext(SideBarContext);
	const authenticationContext = useContext(AuthenticationContext);
	const deviceServiceContext = useContext(DeviceServiceContext);

	const handleOnBurgerClick = useCallback(() => {
		if (!get(sideBarContext, 'isOpened', false)) {
			sideBarContext.handleOnForceOpenSideBar();
		}
		if (get(sideBarContext, 'isOpened', true)) {
			sideBarContext.handleOnForceHideSideBar();
		}
	}, [sideBarContext]);

	if (!authenticationContext.isLoggedIn) {
		return null;
	}

	const getLeft = () => {
		if (deviceServiceContext.isDesktop) {
			if (get(sideBarContext, 'isOpened', true)) {
				return '310px';
			}
			if (!get(sideBarContext, 'isOpened', true)) {
				return '6px';
			}
		}
		if (!deviceServiceContext.isDesktop) {
			if (get(sideBarContext, 'isOpened', true)) {
				return 'auto';
			}
			if (!get(sideBarContext, 'isOpened', true)) {
				return '6px';
			}
		}

		return 'auto';
	};

	const getRight = () => {
		if (!deviceServiceContext.isDesktop) {
			if (get(sideBarContext, 'isOpened', true)) {
				return '6px';
			}
			if (!get(sideBarContext, 'isOpened', true)) {
				return 'auto';
			}
		}

		return 'auto';
	};

	return (
		<div
			className={cx('vinisto-admin-burger', {
				'is-opened': get(sideBarContext, 'isOpened', true),
			})}
			style={{
				left: getLeft(),
				right: getRight(),
			}}
			onClick={handleOnBurgerClick}
		>
			<HamburgerIcon
				isActive={sideBarContext.isOpened}
				className={styles.hamburgerIcon}
			/>
		</div>
	);
};

export default Burger;

const HamburgerIcon = ({
	isActive,
	className = '',
	...props
}: {
	isActive: boolean;
	className?: string;
	props?: any;
}) => {
	return (
		<div
			className={`${styles.hamburgerIcon} ${
				isActive ? styles.active : ''
			} ${className}`}
			{...props}
		>
			<div className={`${styles.line} ${styles.top}`}></div>
			<div className={`${styles.line} ${styles.middle}`}></div>
			<div className={`${styles.line} ${styles.bottom}`}></div>
		</div>
	);
};
