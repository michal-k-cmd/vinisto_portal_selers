import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import api from 'vinisto_api_client/src/api';
import {
	OrderApi,
	PaymentsGetAllowedPaymentsListParams,
	VinistoHelperDllEnumsLanguage,
	VinistoOrderDllModelsApiDeliveryDeliveryGetByConditionsParameters,
	VinistoOrderDllModelsApiReturnDataDeliveriesReturn,
	VinistoOrderDllModelsApiReturnDataPaymentsReturn,
} from 'vinisto_api_client/src/api-types/order-api';
import { ApiError } from 'vinisto_api_client/src/domain/error';
import {
	VinistoOrderDllModelsApiDeliveryDelivery,
	VinistoOrderDllModelsApiPaymentPayment,
} from 'vinisto_api_client/src/api-types/order-api';

export const useGetDeliveriesByBasket = (
	params: VinistoOrderDllModelsApiDeliveryDeliveryGetByConditionsParameters,
	options?: Omit<
		UseQueryOptions<
			VinistoOrderDllModelsApiDeliveryDelivery[] | null | undefined,
			ApiError,
			VinistoOrderDllModelsApiDeliveryDelivery[] | null | undefined
		>,
		'queryKey'
	>
) => {
	const getDeliveriesByBasketQuery = useQuery(
		['GetDeliveriesByBasket', { ...params }],
		async () => {
			const requestBody: VinistoOrderDllModelsApiDeliveryDeliveryGetByConditionsParameters =
				{
					...params,
					language: params.language ?? VinistoHelperDllEnumsLanguage.CZECH,
				};

			const response =
				await api.post<VinistoOrderDllModelsApiReturnDataDeliveriesReturn>(
					'order-api/deliveries/GetDeliveriesByBasket',
					undefined,
					requestBody
				);

			return response.deliveries;
		},
		options
	);

	return getDeliveriesByBasketQuery;
};

export const useGetAllowedPayments = (
	params: PaymentsGetAllowedPaymentsListParams,
	options?: Omit<
		UseQueryOptions<
			VinistoOrderDllModelsApiPaymentPayment[] | null | undefined,
			ApiError,
			VinistoOrderDllModelsApiPaymentPayment[] | null | undefined
		>,
		'queryKey'
	>
) => {
	const getActivePaymentsQuery = useQuery(
		['GetAllowedPayments', { ...params }],
		async () => {
			const response =
				await api.get<VinistoOrderDllModelsApiReturnDataPaymentsReturn>(
					'order-api/payments/GetAllowedPayments',
					{
						...params,
						Language: params.Language ?? VinistoHelperDllEnumsLanguage.CZECH,
					}
				);

			return response.payments;
		},
		options
	);

	return getActivePaymentsQuery;
};

export const useGetAllDeliveries = (
	params: OrderApi.DeliveriesList.RequestQuery,
	options?: Omit<
		UseQueryOptions<
			VinistoOrderDllModelsApiDeliveryDelivery[] | null | undefined,
			ApiError,
			VinistoOrderDllModelsApiDeliveryDelivery[] | null | undefined
		>,
		'queryKey'
	>
) => {
	const getAllDeliveriesQuery = useQuery(
		['GetAllDeliveries', { ...params }],
		async () => {
			const query: OrderApi.DeliveriesList.RequestQuery = {
				...params,
				Language: params.Language ?? VinistoHelperDllEnumsLanguage.CZECH,
			};

			const response = await api.get<OrderApi.DeliveriesList.ResponseBody>(
				'order-api/deliveries',
				query
			);

			return response.deliveries;
		},
		options
	);

	return getAllDeliveriesQuery;
};

export const useGetAllPayments = (
	params: OrderApi.PaymentsList.RequestQuery,
	options?: Omit<
		UseQueryOptions<
			VinistoOrderDllModelsApiPaymentPayment[] | null | undefined,
			ApiError,
			VinistoOrderDllModelsApiPaymentPayment[] | null | undefined
		>,
		'queryKey'
	>
) => {
	const getActivePaymentsQuery = useQuery(
		['GetAllowedPayments', { ...params }],
		async () => {
			const response = await api.get<OrderApi.PaymentsList.ResponseBody>(
				'order-api/payments',
				{
					...params,
					Language: params.Language ?? VinistoHelperDllEnumsLanguage.CZECH,
				}
			);

			return response.payments;
		},
		options
	);

	return getActivePaymentsQuery;
};
