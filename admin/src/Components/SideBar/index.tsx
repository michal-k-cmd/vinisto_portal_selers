import cx from 'classnames';
import { useContext, useEffect } from 'react';
import usePrevious from 'Hooks/usePrevious';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { DeviceServiceContext } from 'Services/DeviceService';

import Animate from './Animated';
import SideBarContent from './Components/SideBarContent';
import SideBarFooter from './Components/SideBarFooter';
import SideBarHeader from './Components/SideBarHeader';
import { SideBarContext } from './context';

import './styles.css';

const SideBar = () => {
	const deviceServiceContext = useContext(DeviceServiceContext);
	const authenticationContext = useContext(AuthenticationContext);
	const sideBarContext = useContext(SideBarContext);
	const isDesktop = deviceServiceContext.isDesktop;
	const previousIsDesktop = usePrevious(isDesktop);
	const isMobile = deviceServiceContext.isMobile;
	const previousIsMobile = usePrevious(isMobile);
	const isTablet = deviceServiceContext.isTablet;
	const previousIsTablet = usePrevious(isTablet);

	useEffect(() => {
		if (previousIsDesktop && !isDesktop) {
			sideBarContext.handleOnForceHideSideBar();
		}
		if (previousIsTablet && !isTablet) {
			sideBarContext.handleOnForceHideSideBar();
		}
		if (previousIsMobile && !isMobile) {
			sideBarContext.handleOnForceHideSideBar();
		}
	}, [
		isDesktop,
		previousIsDesktop,
		isMobile,
		previousIsMobile,
		isTablet,
		previousIsTablet,
	]);

	useEffect(() => {
		if (!deviceServiceContext.isDesktop && sideBarContext.isOpened) {
			sideBarContext.handleOnForceHideSideBar();
		}
	}, []);

	if (!authenticationContext.isLoggedIn || !sideBarContext.isOpened) {
		return null;
	}

	if (deviceServiceContext.isTablet) {
		const animationStyleObject: Record<any, any> = {
			height: '100%',
		};
		return (
			<div
				className={cx('vinisto-admin-sidebar', {
					mobile: false,
					desktop: false,
					tablet: true,
				})}
			>
				<Animate
					type="fadeInFromLeft"
					duration="800ms"
					delay="0ms"
					style={animationStyleObject}
				>
					<div className="sidebar-wrap">
						<SideBarHeader />
						<SideBarContent />
						<SideBarFooter />
					</div>
				</Animate>
			</div>
		);
	}

	if (deviceServiceContext.isDesktop) {
		const animationStyle: Record<any, any> = {
			height: '100%',
		};
		return (
			<div
				className={cx('vinisto-admin-sidebar', {
					mobile: false,
					desktop: true,
					tablet: false,
				})}
			>
				<Animate
					type="fadeInFromLeft"
					duration="800ms"
					delay="0ms"
					style={animationStyle}
				>
					<div className="sidebar-wrap">
						<SideBarHeader />
						<SideBarContent />
					</div>
				</Animate>
			</div>
		);
	}

	if (deviceServiceContext.isMobile) {
		return (
			<div
				className={cx('vinisto-admin-sidebar', {
					mobile: true,
					desktop: false,
					tablet: false,
				})}
			>
				<div className="sidebar-wrap">
					<SideBarHeader />
					<SideBarContent />
					<SideBarFooter />
				</div>
			</div>
		);
	}

	return null;
};

export default SideBar;
