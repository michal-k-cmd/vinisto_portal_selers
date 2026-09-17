// TO CONSIDER This code is not optimal and only "handleOnPayOnline" is used in one component!
// TODO refactor this code
import * as React from 'react';
import { get } from 'lodash-es';
import { NotificationsContext } from 'Services/NotificationService';
import { PreloaderContext } from 'Components/Preloader/context';
import api from 'vinisto_api_client/src/api';
import { useQueryState } from 'nuqs';

import {
	HandleOnPayOnlineParams,
	IGoPayPaymentStatusState,
	IGoPayServiceContextModel,
	IGoPayServiceProviderProps,
} from './interfaces';

import { VinistoGopayDllModelsApiPaymentReturn } from '@/api-types/services-api';

const defaultGoPayPaymentStatusState: IGoPayPaymentStatusState = {
	loadingPaymentStatus: false,
	loadedPaymentStatus: false,
	paymentStatusData: {} as Record<any, any>,
	paymentStatusError: null,
};

const defaultGoPayServiceContextModel: IGoPayServiceContextModel = {
	handleGetGoPayPaymentStatus: () => null,
	handleOnPayOnline: () => null,
	goPayPaymentStatusState: defaultGoPayPaymentStatusState,
};

export const GoPayServiceContext = React.createContext(
	defaultGoPayServiceContextModel
);

const GoPayServiceProvider = ({ children }: IGoPayServiceProviderProps) => {
	const [goPayPaymentStatusState, setGoPayPaymentStatusState] =
		React.useState<IGoPayPaymentStatusState>(defaultGoPayPaymentStatusState);
	const preloaderContext = React.useContext(PreloaderContext);
	const notificationsContext = React.useContext(NotificationsContext);

	const [id] = useQueryState('id');

	const handleGetGoPayPaymentStatus = React.useCallback(
		(goPayPaymentId: number) => {
			if (!get(goPayPaymentStatusState, 'loadingPaymentStatus') && !!id) {
				setGoPayPaymentStatusState({
					loadingPaymentStatus: true,
					loadedPaymentStatus: false,
					paymentStatusData: {},
					paymentStatusError: null,
				});
				api
					.get(`services-api/gopay/${goPayPaymentId}`)
					.then((statusResponse) => {
						setGoPayPaymentStatusState({
							loadingPaymentStatus: false,
							loadedPaymentStatus: true,
							paymentStatusData: statusResponse,
							paymentStatusError: null,
						});
					})
					.catch((error) => {
						setGoPayPaymentStatusState({
							loadingPaymentStatus: false,
							loadedPaymentStatus: true,
							paymentStatusData: {},
							paymentStatusError: get(error, 'message', ''),
						});
					});
			} else {
				setGoPayPaymentStatusState({
					loadingPaymentStatus: false,
					loadedPaymentStatus: true,
					paymentStatusData: {},
					paymentStatusError: null,
				});
			}
		},
		[goPayPaymentStatusState, id]
	);

	const handleOnPayOnline = async ({
		order,
		returnUrl,
		notificationUrl,
	}: HandleOnPayOnlineParams) => {
		if (order?.payment?.goPayId) {
			preloaderContext.togglePreloader(true);

			try {
				const data = await api.post<VinistoGopayDllModelsApiPaymentReturn>(
					'services-api/gopay/CreatePaymentFromOrder',
					undefined,
					{
						orderId: order?.id,
						notificationUrl: notificationUrl,
						returnUrl: returnUrl,
					}
				);

				if (data?.payment?.gwUrl) {
					// @ts-expect-error Should this be window.location.href? But it seems to work fine as it is
					window.location = data?.payment.gwUrl;
				} else {
					throw new Error();
				}
			} catch (err: unknown) {
				preloaderContext.togglePreloader(false);
				notificationsContext.handleShowErrorNotification(
					'userSection.order.payOnline.error'
				);
			}
		}
	};

	const goPayServiceContextModel: IGoPayServiceContextModel = {
		handleGetGoPayPaymentStatus,
		handleOnPayOnline,
		goPayPaymentStatusState,
	};

	return (
		<GoPayServiceContext.Provider value={goPayServiceContextModel}>
			{children}
		</GoPayServiceContext.Provider>
	);
};

export default GoPayServiceProvider;
