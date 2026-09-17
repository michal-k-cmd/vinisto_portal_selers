import { IQueryArgument } from 'Services/ApiService/interfaces';
import {
	SmartformListParams,
	VinistoSmartformDllModelsResponsePostResponse,
} from 'vinisto_api_client/src/api-types/services-api/';
import { apiServiceInstance } from 'Services/ApiService';

const getAddress = ({
	SearchAddress,
	Country,
	Limit,
	IsCache,
}: SmartformListParams) => {
	const params: IQueryArgument[] = [
		{ key: 'SearchAddress', value: SearchAddress },
		...(Country ? [{ key: 'Country', value: Country }] : []),
		...(Limit ? [{ key: 'Limit', value: Limit }] : []),
		...(IsCache ? [{ key: 'IsCache', value: IsCache }] : []),
	];

	return apiServiceInstance.get(
		'services-api/smartform',
		true,
		undefined,
		params
	) as Promise<VinistoSmartformDllModelsResponsePostResponse>;
};

const SmartFormService = {
	getAddress,
};

export default SmartFormService;
