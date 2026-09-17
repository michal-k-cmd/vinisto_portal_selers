import * as React from 'react';
// import { isMobile } from 'react-device-detect';
import { debounce, get } from 'lodash-es';

import { IDeviceServiceModel, IDeviceServiceProps } from './interfaces';

const RESIZE_HANDLER_DELAY = 150;
const RESIZE_EVENT = 'resize';

const defaultDeviceServiceModel: IDeviceServiceModel = {
	isDesktop: get(window, 'innerWidth', 0) > 1200,
	isTablet:
		get(window, 'innerWidth', 0) < 1200 && get(window, 'innerWidth', 0) > 600,
	isMobile: get(window, 'innerWidth', 0) < 600,
	layoutHeight: get(window, 'innerHeight', 0),
	layoutWidth: get(window, 'innerWidth', 0),
};

export const DeviceServiceContext = React.createContext(
	defaultDeviceServiceModel
);

/**
 *  Device Service
 * @class DeviceService
 */
const DeviceServiceProvider: React.FC<IDeviceServiceProps> = (props) => {
	const [deviceServiceModel, setDeviceServiceModel] = React.useState(
		defaultDeviceServiceModel
	);

	React.useEffect(() => {
		const handleOnResize = () => {
			setDeviceServiceModel({
				isDesktop: get(window, 'innerWidth', 0) > 1000,
				isTablet:
					get(window, 'innerWidth', 0) < 1000 &&
					get(window, 'innerWidth', 0) > 600,
				isMobile: get(window, 'innerWidth', 0) < 600,
				layoutHeight: get(window, 'innerHeight', 0),
				layoutWidth: get(window, 'innerWidth', 0),
			});
		};
		const debouncedHandler = debounce(handleOnResize, RESIZE_HANDLER_DELAY);
		window.addEventListener(RESIZE_EVENT, debouncedHandler);

		return () => {
			window.removeEventListener(RESIZE_EVENT, debouncedHandler);
		};
	}, []);

	return (
		<DeviceServiceContext.Provider value={deviceServiceModel}>
			{get(props, 'children', '')}
		</DeviceServiceContext.Provider>
	);
};

export default DeviceServiceProvider;
