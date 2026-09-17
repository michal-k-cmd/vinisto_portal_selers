import { useCallback, useContext, useState } from 'react';
import cx from 'classnames';
import { get } from 'Helpers/lodash';
import { useNavigate } from 'react-router-dom';
import { BiLogOut } from 'react-icons/bi';
import {
	FaHome,
	FaRegUserCircle,
	FaSearch,
	FaWindowClose,
} from 'react-icons/fa';
import { confirmAlert } from 'react-confirm-alert';
import { LocalizationContext } from 'Services/LocalizationService';
import { DeviceServiceContext } from 'Services/DeviceService';
import { AuthenticationContext } from 'Services/AuthenticationService/context';

import { SideBarContext } from '../SideBar/context';

import NavTabs from './Components/Tabs';
import MainSearch from './Components/MainSearch';

import './styles.css';

/**
 * @category Component NavBar
 */
const NavBar = () => {
	const [searchOpen, setSearchOpen] = useState(false);
	const navigate = useNavigate();
	const deviceServiceContext = useContext(DeviceServiceContext);
	const authenticationContext = useContext(AuthenticationContext);
	const isMobileNavBar = get(deviceServiceContext, 'isMobile', false);
	const sideBarContext = useContext(SideBarContext);
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();

	const handleGoHome = () => {
		navigate('/');
	};

	const handleGoMyDetail = useCallback(() => {
		navigate(`/user-detail/${authenticationContext.vinistoUser.id}`);
	}, [authenticationContext]);

	const handleOnLogOut = useCallback(() => {
		confirmAlert({
			title: `${t({
				id: 'admin.confirm.logOut.title',
			})}`,
			message: `${t({
				id: 'admin.confirm.logOut.message',
			})}`,
			buttons: [
				{
					label: `${t({
						id: 'admin.confirm.logOut.yes',
					})}`,
					onClick: () => {
						sideBarContext.handleOnForceHideSideBar();
						navigate('/');
						authenticationContext.handleOnLogOut();
					},
				},
				{
					label: `${t({
						id: 'admin.confirm.logOut.no',
					})}`,
					onClick: () => {},
				},
			],
		});
	}, [authenticationContext, sideBarContext]);

	if (!authenticationContext.isLoggedIn) {
		return <></>;
	}

	const fixedWidth: Record<any, any> = sideBarContext.isOpened
		? {
				minWidth: '90px',
				maxWidth: '90px',
				width: '90px',
		  }
		: {
				minWidth: '90px',
				maxWidth: '90px',
				width: '90px',
		  };

	return (
		<div
			className={cx('vinisto-admin-navbar', {
				mobile: isMobileNavBar,
				desktop: !isMobileNavBar,
			})}
		>
			<div style={fixedWidth} />
			{!searchOpen && <NavTabs />}
			<MainSearch searchOpen={searchOpen} />
			<div
				style={{
					minWidth: '60px',
					maxWidth: '60px',
					width: '60px',
				}}
			>
				{!searchOpen ? (
					<FaSearch
						onClick={() => setSearchOpen(true)}
						className="admin-navbar-icon"
					/>
				) : (
					<FaWindowClose
						onClick={() => setSearchOpen(false)}
						className="admin-navbar-icon"
					/>
				)}
			</div>
			{!isMobileNavBar && (
				<div
					style={{
						minWidth: '60px',
						maxWidth: '60px',
						width: '60px',
					}}
				>
					<FaHome
						onClick={handleGoHome}
						className="admin-navbar-icon"
					/>
				</div>
			)}
			{!isMobileNavBar && (
				<div
					style={{
						minWidth: '60px',
						maxWidth: '60px',
						width: '60px',
					}}
				>
					<FaRegUserCircle
						onClick={handleGoMyDetail}
						className="admin-navbar-icon"
					/>
				</div>
			)}
			{!isMobileNavBar && (
				<div
					style={{
						minWidth: '60px',
						maxWidth: '60px',
						width: '60px',
					}}
				>
					<BiLogOut
						onClick={handleOnLogOut}
						className="admin-navbar-icon"
					/>
				</div>
			)}
		</div>
	);
};

export default NavBar;
