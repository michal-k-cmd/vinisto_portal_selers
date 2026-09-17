'use client';

import { toast, ToastContainer, ToastOptions } from 'react-toastify';
import { createContext, useCallback, useContext } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';

import notificationsConfig from './config';
import {
	INotificationsContextModel,
	NotificationsProviderProps,
} from './interfaces';
import ErrorIcon from './Components/ErrorIcon';
import SuccessIcon from './Components/SuccessIcon';
import styles from './styles.module.css';

export const NotificationsContext = createContext<INotificationsContextModel>({
	handleShowErrorNotification: () => null,
	handleShowInfoNotification: () => null,
	handleShowSuccessNotification: () => null,
	handleShowWarningNotification: () => null,
	commonNotificationsConfig: notificationsConfig,
});

const NotificationsServiceProvider = (props: NotificationsProviderProps) => {
	const t = useContext(LocalizationContext).useFormatMessage();
	const { children } = props;

	const handleShowErrorNotification = useCallback(
		(message: string, customConfig: ToastOptions<object> = {}) => {
			customConfig.icon = ErrorIcon;
			return toast.error(
				<div className={styles.toastBody}>{t({ id: message })}</div>,
				customConfig
			);
		},
		[t]
	);

	const handleShowInfoNotification = useCallback(
		(message: string, customConfig: ToastOptions<object> = {}) => {
			customConfig.icon = SuccessIcon;
			return toast.info(
				<div className={styles.toastBody}>{t({ id: message })}</div>,
				customConfig
			);
		},
		[t]
	);

	const handleShowSuccessNotification = useCallback(
		(message: string, customConfig: ToastOptions<object> = {}) => {
			customConfig.icon = SuccessIcon;
			return toast.success(
				<div className={styles.toastBody}>{t({ id: message })}</div>,
				customConfig
			);
		},
		[t]
	);

	const handleShowWarningNotification = useCallback(
		(message: string, customConfig: ToastOptions<object> = {}) => {
			customConfig.icon = ErrorIcon;
			return toast.warning(
				<div className={styles.toastBody}>{t({ id: message })}</div>,
				customConfig
			);
		},
		[t]
	);

	const notificationsContextModel: INotificationsContextModel = {
		handleShowErrorNotification,
		handleShowInfoNotification,
		handleShowSuccessNotification,
		handleShowWarningNotification,
		commonNotificationsConfig: notificationsConfig,
	};

	return (
		<NotificationsContext.Provider value={notificationsContextModel}>
			{children}
			<ToastContainer
				{...notificationsConfig}
				autoClose={2500}
				hideProgressBar={true}
				theme={'colored'}
				position="top-center"
			/>
		</NotificationsContext.Provider>
	);
};

export default NotificationsServiceProvider;
