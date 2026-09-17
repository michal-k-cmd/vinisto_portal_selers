import { useContext, useEffect } from 'react';
import cx from 'classnames';
import { get } from 'lodash-es';
import Animate from 'react-moving-text';
import usePrevious from 'Hooks/usePrevious';
import { DeviceServiceContext } from 'Services/DeviceService';
import { AuthenticationContext } from 'Services/AuthenticationService/context';

import { SideBarContext } from './context';
import SideBarContent from './Components/SideBarContent';
import SideBarFooter from './Components/SideBarFooter';

import './styles.css';

/**
 * @category Component SideBar
 */
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
		sideBarContext,
	]);

	if (
		!authenticationContext.isLoggedIn ||
		!get(sideBarContext, 'isOpened', false)
	) {
		return <></>;
	}

	if (deviceServiceContext.isTablet) {
		const animationStyleObject: Record<any, any> = {
			height: '100%',
		};
		return (
			<div
				className={cx('vca-sidebar', {
					mobile: false,
					desktop: false,
					tablet: true,
				})}
			>
				<Animate
					type="fadeInFromLeft"
					duration="800ms"
					delay="0ms"
					direction="normal"
					timing="ease"
					iteration="1"
					fillMode="none"
					style={animationStyleObject}
				>
					<div className="sidebar-wrap">
						<SideBarContent />
						<SideBarFooter />
					</div>
				</Animate>
			</div>
		);
	}

	if (deviceServiceContext.isDesktop) {
		return (
			<div
				className={cx('vca-sidebar', {
					mobile: false,
					desktop: true,
					tablet: false,
				})}
			>
				<div className="sidebar-wrap">
					<SideBarContent />
					<SideBarFooter />
				</div>
			</div>
		);
	}

	if (deviceServiceContext.isMobile) {
		return (
			<div
				className={cx('vca-sidebar', {
					mobile: true,
					desktop: false,
					tablet: false,
				})}
			>
				<div className="sidebar-wrap">
					<SideBarContent />
					<SideBarFooter />
				</div>
			</div>
		);
	}

	return <></>;
};

export default SideBar;
