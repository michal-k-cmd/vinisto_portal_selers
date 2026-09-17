export const RESIZE_HANDLER_DELAY = 150;
export const RESIZE_EVENT = 'resize';

export enum DIMENSIONS {
	DESKTOP_BIG = 1560,
	DESKTOP = 1200,
	TABLET = 768,
}

export enum DeviceServiceAction {
	setDeviceInfo = 'setDeviceInfo',
	setHeaderHeight = 'setHeaderHeight',
	setFooterHeight = 'setFooterHeight',
	setIsFooterInViewPort = 'setIsFooterInViewPort',
	setSellerSelectionFooterHeight = 'setSellerSelectionFooterHeight',
}
