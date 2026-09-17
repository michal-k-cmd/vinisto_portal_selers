import {
	UsersAddressesDeleteParams,
	UsersAddressesListParams,
	UsersBillingInformationDeleteParams,
	UsersBillingInformationListParams,
	VinistoAuthDllModelsApiAddressUserAddressCreateParameters,
	VinistoAuthDllModelsApiAddressUserAddressEditParameters,
	VinistoAuthDllModelsApiAddressUserAddressesReturn,
	VinistoAuthDllModelsApiAddressUserAddressReturn,
	VinistoAuthDllModelsApiBillingInfoUserBillingInfoCreateParameters,
	VinistoAuthDllModelsApiBillingInfoUserBillingInfoEditParameters,
	VinistoAuthDllModelsApiBillingInfoUserBillingInfoReturn,
	VinistoAuthDllModelsApiBillingInfoUserBillingInfosReturn,
} from 'vinisto_api_client/src/api-types/user-api';
import api from 'vinisto_api_client/src/api';

export const AddressesApi = {
	getAll: ({ userId, ...params }: UsersAddressesListParams) =>
		api.get<VinistoAuthDllModelsApiAddressUserAddressesReturn>(
			`user-api/users/${userId}/addresses`,
			params
		),
	create: ({
		userId,
		...requestData
	}: VinistoAuthDllModelsApiAddressUserAddressCreateParameters & {
		userId: string;
	}) =>
		api.post<VinistoAuthDllModelsApiAddressUserAddressReturn>(
			`user-api/users/${userId}/addresses`,
			undefined,
			requestData
		),
	update: ({
		userId,
		addressId,
		...requestData
	}: VinistoAuthDllModelsApiAddressUserAddressEditParameters & {
		userId: string;
		addressId: string;
	}) =>
		api.put<VinistoAuthDllModelsApiAddressUserAddressReturn>(
			`user-api/users/${userId}/addresses/${addressId}`,
			undefined,
			requestData
		),
	delete: ({ userId, addressId, ...params }: UsersAddressesDeleteParams) =>
		api.delete(`user-api/users/${userId}/addresses/${addressId}`, params),
};

export const BillingInfoApi = {
	getAll: ({ userId, ...params }: UsersBillingInformationListParams) =>
		api.get<VinistoAuthDllModelsApiBillingInfoUserBillingInfosReturn>(
			`user-api/users/${userId}/billing-information`,
			params
		),
	create: ({
		userId,
		...requestData
	}: VinistoAuthDllModelsApiBillingInfoUserBillingInfoCreateParameters & {
		userId: string;
	}) =>
		api.post<VinistoAuthDllModelsApiBillingInfoUserBillingInfoReturn>(
			`user-api/users/${userId}/billing-information`,
			undefined,
			requestData
		),
	update: ({
		userId,
		billingInfoId,
		...requestData
	}: VinistoAuthDllModelsApiBillingInfoUserBillingInfoEditParameters & {
		userId: string;
		billingInfoId: string;
	}) =>
		api.put<VinistoAuthDllModelsApiBillingInfoUserBillingInfoReturn>(
			`user-api/users/${userId}/billing-information/${billingInfoId}`,
			undefined,
			requestData
		),
	delete: ({
		userId,
		billingInfoId,
		...params
	}: UsersBillingInformationDeleteParams) =>
		api.delete(
			`user-api/users/${userId}/billing-information/${billingInfoId}`,
			params
		),
};
