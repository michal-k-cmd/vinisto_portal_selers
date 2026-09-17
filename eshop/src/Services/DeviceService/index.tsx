'use client';

import { createContext, useEffect, useMemo, useReducer } from 'react';
import { debounce, noop } from 'lodash-es';

import { IDeviceServiceModel, IDeviceServiceProps } from './interfaces';
import {
	DeviceServiceAction,
	DIMENSIONS,
	RESIZE_EVENT,
	RESIZE_HANDLER_DELAY,
} from './constants';
import { DeviceServiceModelReducer } from './reducer';

// Function to get initial device state based on deviceType
const getInitialDeviceState = (
	deviceType: 'desktop' | 'mobile'
): Pick<
	IDeviceServiceModel,
	'isDesktopBig' | 'isDesktop' | 'isTablet' | 'isMobile'
> => {
	if (deviceType === 'desktop') {
		return {
			isDesktopBig: true,
			isDesktop: true,
			isTablet: false,
			isMobile: false,
		};
	} else {
		// mobile
		return {
			isDesktopBig: false,
			isDesktop: false,
			isTablet: true,
			isMobile: true,
		};
	}
};

// Get client dimensions safely (will be 0 on server)
const clientWidth =
	typeof document !== 'undefined' ? document.documentElement.clientWidth : 0;
const clientHeight =
	typeof document !== 'undefined' ? document.documentElement.clientHeight : 0;

// Create a base model that will be used for both server and client initial state
const createBaseDeviceServiceModel = (
	deviceType?: 'desktop' | 'mobile'
): IDeviceServiceModel => {
	// Default client-side model
	const baseModel: IDeviceServiceModel = {
		isDesktopBig: clientWidth >= DIMENSIONS.DESKTOP_BIG,
		isDesktop: clientWidth >= DIMENSIONS.DESKTOP,
		isTablet:
			clientWidth < DIMENSIONS.DESKTOP && clientWidth >= DIMENSIONS.TABLET,
		isMobile: clientWidth < DIMENSIONS.TABLET,
		layoutHeight: clientHeight,
		layoutWidth: clientWidth,
		headerHeight: 0,
		footerHeight: 0,
		isFooterInViewPort: false,
		sellerSelectionFooterHeight: 0,
		dispatch: noop,
	};

	// If deviceType is provided and we're in a server context (or initial render)
	if (deviceType && typeof window === 'undefined') {
		const deviceState = getInitialDeviceState(deviceType);

		return {
			...baseModel,
			...deviceState,
			// Set layout dimensions to 0 on server
			layoutHeight: 0,
			layoutWidth: 0,
		};
	}

	return baseModel;
};

// Default model for context creation
const defaultDeviceServiceModel = createBaseDeviceServiceModel();

export const DeviceServiceContext = createContext(defaultDeviceServiceModel);

const vinistoEshopRoot =
	typeof document !== 'undefined' &&
	document.getElementById('vinisto_eshop_root');

const DeviceServiceProvider = ({
	children,
	deviceType,
}: IDeviceServiceProps) => {
	// Create the initial state directly using the deviceType
	// This works for both server and client initial render
	const initialDeviceModel = createBaseDeviceServiceModel(deviceType);

	const [deviceServiceModel, dispatch] = useReducer(
		DeviceServiceModelReducer,
		initialDeviceModel
	);

	useEffect(() => {
		const handleOnResize = () => {
			const clientWidth = document.documentElement.clientWidth;
			const clientHeight = document.documentElement.clientHeight;

			dispatch([
				DeviceServiceAction.setDeviceInfo,
				{
					isDesktopBig: clientWidth >= DIMENSIONS.DESKTOP_BIG,
					isDesktop: clientWidth >= DIMENSIONS.DESKTOP,
					isTablet:
						clientWidth < DIMENSIONS.DESKTOP &&
						clientWidth >= DIMENSIONS.TABLET,
					isMobile: clientWidth < DIMENSIONS.TABLET,
					layoutHeight: clientHeight,
					layoutWidth: clientWidth,
				},
			]);
		};

		// Initial client-side calculation to ensure we have accurate values
		handleOnResize();

		const debouncedHandler = debounce(handleOnResize, RESIZE_HANDLER_DELAY);
		window.addEventListener(RESIZE_EVENT, debouncedHandler);

		return () => {
			window.removeEventListener(RESIZE_EVENT, debouncedHandler);
		};
	}, []);

	useEffect(() => {
		const { isMobile, isTablet, footerHeight, sellerSelectionFooterHeight } =
			deviceServiceModel;
		if (!vinistoEshopRoot) return;
		if (!isMobile && !isTablet) {
			vinistoEshopRoot.style.paddingBottom = '';
			return;
		}
		if (footerHeight) {
			vinistoEshopRoot.style.paddingBottom = `${sellerSelectionFooterHeight}px`;
		}
	}, [deviceServiceModel]);

	const deviceContextModel: IDeviceServiceModel = useMemo(
		() => ({
			...deviceServiceModel,
			dispatch,
		}),
		[deviceServiceModel]
	);

	return (
		<DeviceServiceContext.Provider value={deviceContextModel}>
			{children}
		</DeviceServiceContext.Provider>
	);
};

export default DeviceServiceProvider;
