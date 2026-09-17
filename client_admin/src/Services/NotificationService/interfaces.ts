import { ReactNode } from 'react';
import { ToastOptions } from 'react-toastify/dist/types';

export interface INotificationsContextModel {
	handleShowErrorNotification: (
		message: string,
		customConfig?: ToastOptions<object>
	) => void;
	handleShowInfoNotification: (
		message: string,
		customConfig?: ToastOptions<object>
	) => void;
	handleShowSuccessNotification: (
		message: string,
		customConfig?: ToastOptions<object>
	) => void;
	handleShowWarningNotification: (
		message: string,
		customConfig?: ToastOptions<object>
	) => void;
	commonNotificationsConfig: ToastOptions<object>;
}

export interface NotificationsProviderProps {
	children: ReactNode;
}
