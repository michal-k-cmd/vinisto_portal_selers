import { debounce, get } from 'Helpers/lodash';
import { createContext, FC, useEffect, useState } from 'react';

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

export const DeviceServiceContext = createContext(defaultDeviceServiceModel);

/**
 *  Device Service
 * @class DeviceService
 */
const DeviceServiceProvider: FC<IDeviceServiceProps> = (props): JSX.Element => {
	const [deviceServiceModel, setDeviceServiceModel] = useState(
		defaultDeviceServiceModel
	);

	useEffect(() => {
		const handleOnResize = () => {
			setDeviceServiceModel({
				isDesktop: get(window, 'innerWidth', 0) > 1000,
				isTablet:
					get(window, 'innerWidth', 0) <= 1000 &&
					get(window, 'innerWidth', 0) > 600,
				isMobile: get(window, 'innerWidth', 0) <= 600,
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
