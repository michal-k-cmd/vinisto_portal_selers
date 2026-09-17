import React, { ReactNode } from 'react';

import { DeviceServiceAction } from './constants';

export interface IDeviceServiceModel {
	isMobile: boolean;
	isTablet: boolean;
	isDesktop: boolean;
	isDesktopBig: boolean;
	layoutWidth: number;
	layoutHeight: number;
	headerHeight: number;
	footerHeight: number;
	isFooterInViewPort: boolean;
	sellerSelectionFooterHeight: number;
	dispatch: React.Dispatch<IDeviceServiceModelReducerAction>;
}

export interface IDeviceServiceProps {
	children: ReactNode;
	deviceType: 'desktop' | 'mobile';
}

export type IDeviceServiceModelReducerAction =
	| [
			DeviceServiceAction.setDeviceInfo,
			Pick<
				IDeviceServiceModel,
				| 'isMobile'
				| 'isTablet'
				| 'isDesktop'
				| 'isDesktopBig'
				| 'layoutWidth'
				| 'layoutHeight'
			>
	  ]
	| [DeviceServiceAction.setHeaderHeight, IDeviceServiceModel['headerHeight']]
	| [DeviceServiceAction.setFooterHeight, IDeviceServiceModel['footerHeight']]
	| [
			DeviceServiceAction.setIsFooterInViewPort,
			IDeviceServiceModel['isFooterInViewPort']
	  ]
	| [
			DeviceServiceAction.setSellerSelectionFooterHeight,
			IDeviceServiceModel['sellerSelectionFooterHeight']
	  ];
