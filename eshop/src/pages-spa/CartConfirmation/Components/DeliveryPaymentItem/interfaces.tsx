import {
	VinistoCommonDllModelsApiPricesPrice,
	VinistoOrderDllModelsApiCommonMultiLangValue,
} from 'vinisto_api_client/src/api-types/order-api';

export interface IDeliveryPaymentProps {
	name: VinistoOrderDllModelsApiCommonMultiLangValue[] | string | undefined;
	price: VinistoCommonDllModelsApiPricesPrice | undefined;
}
