import { toast, ToastContainer, ToastOptions } from 'react-toastify';
import { createContext, useCallback, useContext } from 'react';
import Config from 'Config';

import { LocalizationContext } from '../LocalizationService';

import {
	INotificationsContextModel,
	NotificationsProviderProps,
} from './interfaces';

const NotificationsDefaultConfig = Config.notifications;

export const NotificationsContext = createContext<INotificationsContextModel>({
	handleShowErrorNotification: () => null,
	handleShowInfoNotification: () => null,
	handleShowSuccessNotification: () => null,
	handleShowWarningNotification: () => null,
	commonNotificationsConfig: NotificationsDefaultConfig,
});

const NotificationsServiceProvider = (props: NotificationsProviderProps) => {
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();
	const { children } = props;

	const handleShowErrorNotification = useCallback(
		(
			message: string | { id: string; [key: string]: any },
			customConfig: ToastOptions<object> = {}
		) => {
			if (typeof message === 'string')
				return toast.error(t({ id: message }), customConfig);
			if (typeof message == 'object' && 'id' in message) {
				const { id, ...values } = message;
				return toast.error(t({ id }, { ...values }), customConfig);
			}
		},
		[t]
	);

	const handleShowInfoNotification = useCallback(
		(message: string, customConfig: ToastOptions<object> = {}) => {
			toast.info(t({ id: message }), customConfig);
		},
		[t]
	);

	const handleShowSuccessNotification = useCallback(
		(message: string, customConfig: ToastOptions<object> = {}) => {
			toast.success(t({ id: message }), customConfig);
		},
		[t]
	);

	const handleShowWarningNotification = useCallback(
		(message: string, customConfig: ToastOptions<object> = {}) => {
			toast.warning(t({ id: message }), customConfig);
		},
		[t]
	);

	const notificationsContextModel: INotificationsContextModel = {
		handleShowErrorNotification,
		handleShowInfoNotification,
		handleShowSuccessNotification,
		handleShowWarningNotification,
		commonNotificationsConfig: NotificationsDefaultConfig,
	};

	return (
		<NotificationsContext.Provider value={notificationsContextModel}>
			{children}
			<ToastContainer
				{...NotificationsDefaultConfig}
				autoClose={2500}
				hideProgressBar={true}
				theme={'colored'}
				position="top-center"
			/>
		</NotificationsContext.Provider>
	);
};

export default NotificationsServiceProvider;
