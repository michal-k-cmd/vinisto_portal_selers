import { ReactNode } from 'react';

export interface IDeviceServiceModel {
	isMobile: boolean;
	isTablet: boolean;
	isDesktop: boolean;
	layoutWidth: number;
	layoutHeight: number;
}

export interface IDeviceServiceProps {
	children: ReactNode;
}
