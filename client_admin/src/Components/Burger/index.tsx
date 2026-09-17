import { useCallback, useContext } from 'react';
import cx from 'classnames';
import { SideBarContext } from 'Components/SideBar/context';
import { AuthenticationContext } from 'Services/AuthenticationService/context';

import styles from './styles.module.css';

const Burger = () => {
	const sideBarContext = useContext(SideBarContext);
	const authenticationContext = useContext(AuthenticationContext);

	const handleOnBurgerClick = useCallback(() => {
		sideBarContext.isOpened
			? sideBarContext.handleOnForceHideSideBar()
			: sideBarContext.handleOnForceOpenSideBar();
	}, [sideBarContext]);

	if (!authenticationContext.isLoggedIn) return <></>;

	return (
		<button
			className={cx(styles.vcaNavbarBurger, {
				[styles.vcaNavbarBurgerIsOpened]: sideBarContext.isOpened,
			})}
			onClick={handleOnBurgerClick}
		/>
	);
};

export default Burger;
