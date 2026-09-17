import { useContext, useLayoutEffect, useState } from 'react';
import { NavbarContext } from 'Components/Navbar/context';
import { DeviceServiceContext } from 'Services/DeviceService';

/**
 * This hook is used to get the fixed header offset based on current device.
 * It updates the offset whenever the header size changes.
 */
export const useMainHeaderHeight = () => {
	const { headerRef, isMobileHeaderVisible } = useContext(NavbarContext);
	const { layoutHeight, layoutWidth } = useContext(DeviceServiceContext);

	const [headerHeight, setHeaderHeight] = useState(0);

	useLayoutEffect(() => {
		const measuredHeaderHeight =
			headerRef.current?.getBoundingClientRect().height;

		if (measuredHeaderHeight) {
			setHeaderHeight(measuredHeaderHeight);
		}
	}, [layoutWidth, layoutHeight, isMobileHeaderVisible, headerRef]);

	return headerHeight;
};
