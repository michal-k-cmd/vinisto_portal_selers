import { apiServiceInstance } from 'Services/ApiService';
import transformParamsToQueryArgs from 'Helpers/transform-params-to-query-args';
import {
	VinistoAuthDllModelsApiAddressUserAddressCreateParameters,
	VinistoAuthDllModelsApiAddressUserAddressEditParameters,
	VinistoAuthDllModelsApiAddressUserAddressesReturn,
	VinistoAuthDllModelsApiAddressUserAddressReturn,
	VinistoAuthDllModelsApiBillingInfoUserBillingInfoCreateParameters,
	VinistoAuthDllModelsApiBillingInfoUserBillingInfoEditParameters,
	VinistoAuthDllModelsApiBillingInfoUserBillingInfoReturn,
	VinistoAuthDllModelsApiBillingInfoUserBillingInfosReturn,
	VinistoAuthDllModelsApiPermissionUserPermissionAddParameters,
	VinistoAuthDllModelsApiPermissionUserPermissionDeleteParameters,
	VinistoAuthDllModelsApiUserChangePasswordParameters,
	VinistoAuthDllModelsApiUserUserReturn,
	VinistoHelperDllBaseBaseReturn,
} from 'vinisto_api_client/src/api-types/user-api';

import { USER_API_BASE_URI } from '../constants';

const getUserById = async (
	userId: string,
	request: { userId: string; UserLoginHash: string }
) => {
	const queryArgs = transformParamsToQueryArgs(request);

	const res =
		await apiServiceInstance.get<VinistoAuthDllModelsApiUserUserReturn>(
			`${USER_API_BASE_URI}/users/${userId}`,
			undefined,
			undefined,
			queryArgs
		);

	return res;
};

const setRandomPassword = async (
	request: VinistoAuthDllModelsApiUserChangePasswordParameters
) => {
	const res =
		await apiServiceInstance.put<VinistoAuthDllModelsApiUserChangePasswordParameters>(
			`${USER_API_BASE_URI}/users/auth/ChangePassword`,
			request
		);

	return res;
};

const setPassword = async (
	request: VinistoAuthDllModelsApiUserChangePasswordParameters
) => {
	const res =
		await apiServiceInstance.put<VinistoAuthDllModelsApiUserChangePasswordParameters>(
			`${USER_API_BASE_URI}/users/auth/ChangePassword`,
			request
		);

	return res;
};

const addPermission = async (
	userId: string,
	request: VinistoAuthDllModelsApiPermissionUserPermissionAddParameters
) => {
	const res =
		await apiServiceInstance.put<VinistoAuthDllModelsApiPermissionUserPermissionAddParameters>(
			`${USER_API_BASE_URI}/users/${userId}/AddPermission`,
			request
		);

	return res;
};

const deletePermission = async (
	userId: string,
	request: VinistoAuthDllModelsApiPermissionUserPermissionDeleteParameters
) => {
	const res =
		await apiServiceInstance.put<VinistoAuthDllModelsApiPermissionUserPermissionDeleteParameters>(
			`${USER_API_BASE_URI}/users/${userId}/DeletePermission`,
			request
		);

	return res;
};

const getUserAddresses = async (
	userId: string,
	request: { userId: string; UserLoginHash: string; deliveryId?: string }
) => {
	const queryArgs = transformParamsToQueryArgs(request);

	const res =
		await apiServiceInstance.get<VinistoAuthDllModelsApiAddressUserAddressesReturn>(
			`${USER_API_BASE_URI}/users/${userId}/addresses`,
			undefined,
			undefined,
			queryArgs
		);

	return res;
};

const getUserBillingAddresses = async (
	userId: string,
	request: { userId: string; UserLoginHash: string }
) => {
	const queryArgs = transformParamsToQueryArgs(request);

	const res =
		await apiServiceInstance.get<VinistoAuthDllModelsApiBillingInfoUserBillingInfosReturn>(
			`${USER_API_BASE_URI}/users/${userId}/billing-information`,
			undefined,
			undefined,
			queryArgs
		);

	return res;
};

const createUserAddress = async (
	userId: string,
	request: VinistoAuthDllModelsApiAddressUserAddressCreateParameters
) => {
	await apiServiceInstance.post<VinistoAuthDllModelsApiAddressUserAddressCreateParameters>(
		`${USER_API_BASE_URI}/users/${userId}/addresses`,
		request
	);
};

const createUserBillingAddress = async (
	userId: string,
	request: VinistoAuthDllModelsApiBillingInfoUserBillingInfoCreateParameters
) => {
	await apiServiceInstance.post<VinistoAuthDllModelsApiBillingInfoUserBillingInfoReturn>(
		`${USER_API_BASE_URI}/users/${userId}/billing-information`,
		request
	);
};

const deleteUserAddress = async (
	userId: string,
	addressId: string,
	UserLoginHash: string
) => {
	const queryArgs = transformParamsToQueryArgs({
		userId,
		addressId,
		UserLoginHash,
	});

	await apiServiceInstance.delete(
		`${USER_API_BASE_URI}/users/${userId}/addresses/${addressId}`,
		undefined,
		true,
		queryArgs
	);
};

const deleteUserBillingAddress = async (
	userId: string,
	billingInfoId: string,
	UserLoginHash: string
) => {
	const queryArgs = transformParamsToQueryArgs({
		userId,
		billingInfoId,
		UserLoginHash,
	});

	await apiServiceInstance.delete<VinistoHelperDllBaseBaseReturn>(
		`${USER_API_BASE_URI}/users/${userId}/billing-information/${billingInfoId}`,
		undefined,
		true,
		queryArgs
	);
};

const updateUserAddress = async (
	userId: string,
	addressId: string,
	request: VinistoAuthDllModelsApiAddressUserAddressEditParameters
) => {
	const res =
		await apiServiceInstance.put<VinistoAuthDllModelsApiAddressUserAddressReturn>(
			`${USER_API_BASE_URI}/users/${userId}/addresses/${addressId}`,
			request
		);

	return res;
};

const updateUserBillingAddress = async (
	userId: string,
	billingInfoId: string,
	request: VinistoAuthDllModelsApiBillingInfoUserBillingInfoEditParameters
) => {
	const res =
		await apiServiceInstance.put<VinistoAuthDllModelsApiBillingInfoUserBillingInfoReturn>(
			`${USER_API_BASE_URI}/users/${userId}/billing-information/${billingInfoId}`,
			request
		);

	return res;
};

export const UserService = {
	getUserById,
	setRandomPassword,
	setPassword,
	addPermission,
	deletePermission,
	getUserAddresses,
	createUserAddress,
	deleteUserAddress,
	updateUserAddress,
	getUserBillingAddresses,
	createUserBillingAddress,
	deleteUserBillingAddress,
	updateUserBillingAddress,
};
