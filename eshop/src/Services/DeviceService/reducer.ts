import { DeviceServiceAction } from './constants';
import {
	IDeviceServiceModel,
	IDeviceServiceModelReducerAction,
} from './interfaces';

export const DeviceServiceModelReducer = (
	state: IDeviceServiceModel,
	[action, value]: IDeviceServiceModelReducerAction
): IDeviceServiceModel => {
	switch (action) {
		case DeviceServiceAction.setDeviceInfo:
			return {
				...state,
				...value,
			};
		case DeviceServiceAction.setHeaderHeight:
			return {
				...state,
				headerHeight: value,
			};
		case DeviceServiceAction.setFooterHeight:
			return {
				...state,
				footerHeight: value,
			};
		case DeviceServiceAction.setIsFooterInViewPort:
			return {
				...state,
				isFooterInViewPort: value,
			};
		case DeviceServiceAction.setSellerSelectionFooterHeight:
			return {
				...state,
				sellerSelectionFooterHeight: value,
			};
	}
};
