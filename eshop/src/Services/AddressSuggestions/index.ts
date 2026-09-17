import {
	SmartformListParams,
	VinistoSmartformDllModelsResponsePostResponse,
} from 'vinisto_api_client/src/api-types/services-api';
import api from 'vinisto_api_client/src/api';

export const AddressSuggestionsApi = {
	get: ({ SearchAddress, Country, Limit, IsCache }: SmartformListParams) => {
		return api.get('services-api/smartform', {
			SearchAddress,
			...(Country && { Country }),
			...(Limit && { Limit }),
			...(IsCache && { IsCache }),
		}) as Promise<VinistoSmartformDllModelsResponsePostResponse>;
	},
};
