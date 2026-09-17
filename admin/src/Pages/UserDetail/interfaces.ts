import { VinistoAuthDllModelsApiUserUser } from 'vinisto_api_client/src/api-types/user-api/';

export interface IUserDetailProps {
	detailSchema: IUserDetailProps[];
}

export interface UserDetailState {
	loading?: boolean;
	loaded?: boolean;
	userDetailData?: VinistoAuthDllModelsApiUserUser;
	userAddresses?: any[];
	userBillingInfo?: any[];
	error?: unknown;
}
