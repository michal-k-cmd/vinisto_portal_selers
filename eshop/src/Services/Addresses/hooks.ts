import { useContext } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
	UsersAddressesDeleteParams,
	UsersAddressesListParams,
	UsersBillingInformationDeleteParams,
	UsersBillingInformationDetailParams,
	VinistoAuthDllModelsApiAddressAddress,
	VinistoAuthDllModelsApiAddressUserAddressesReturn,
	VinistoAuthDllModelsApiBillingInfoBillingInfo,
	VinistoAuthDllModelsApiBillingInfoUserBillingInfosReturn,
} from 'vinisto_api_client/src/api-types/user-api';
import {
	DELIVERY_ADDRESSES_QUERY_KEY,
	INVOICE_ADDRESSES_QUERY_KEY,
} from 'Services/Addresses/constants';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { OrderContext } from 'Services/OrderService/context';

import { AddressesApi, BillingInfoApi } from '.';

export const AddressesApiHooks = {
	useGetAll: (
		params?: Omit<UsersAddressesListParams, 'userId' | 'UserLoginHash'> & {
			customerId?: string | null;
		}
	) => {
		const customerId = params?.customerId;

		const { vinistoUser } = useContext(AuthenticationContext);
		const { deliveryMethod } = useContext(OrderContext);
		return useQuery<VinistoAuthDllModelsApiAddressUserAddressesReturn>(
			[DELIVERY_ADDRESSES_QUERY_KEY, { deliveryMethod, customerId }],
			() =>
				AddressesApi.getAll({
					UserLoginHash: vinistoUser?.loginHash,
					userId: customerId ?? vinistoUser?.id ?? '',
					deliveryId: deliveryMethod?.id ?? '',
					...params,
				}),
			{
				cacheTime: 0,
				staleTime: 0,
				enabled: !!vinistoUser?.id && !!vinistoUser?.loginHash,
			}
		);
	},
	useCreate: ({
		onCreateCallback,
		customerId,
	}: {
		onCreateCallback: (id: string | null | undefined) => void;
		customerId?: string | null;
	}) => {
		const queryClient = useQueryClient();
		const { deliveryMethod } = useContext(OrderContext);
		const authenticationContext = useContext(AuthenticationContext);

		return useMutation(
			// TODO: come up with a better type, omitting id property is a workaround
			(address: Omit<VinistoAuthDllModelsApiAddressAddress, 'id'>) =>
				AddressesApi.create({
					...address,
					userId: customerId ?? authenticationContext?.vinistoUser?.id ?? '',
					userLoginHash: authenticationContext?.vinistoUser?.loginHash,
				}),
			{
				onSuccess: (data) => {
					const address = data.address;
					if (address != null) {
						queryClient.setQueryData<VinistoAuthDllModelsApiAddressUserAddressesReturn>(
							[DELIVERY_ADDRESSES_QUERY_KEY, { deliveryMethod, customerId }],
							(prev) => {
								return {
									...prev,
									addresses: [...(prev?.addresses ?? []), address],
								};
							}
						);
					}
					onCreateCallback(data?.address?.id);
					queryClient.invalidateQueries([DELIVERY_ADDRESSES_QUERY_KEY]);
				},
			}
		);
	},
	useUpdate: ({
		addressId,
		customerId,
	}: {
		addressId: string;
		customerId?: string | null;
	}) => {
		const queryClient = useQueryClient();
		const authenticationContext = useContext(AuthenticationContext);

		return useMutation(
			// TODO: come up with a better type, omitting id property is a workaround
			(address: Omit<VinistoAuthDllModelsApiAddressAddress, 'id'>) =>
				AddressesApi.update({
					...address,
					userId: customerId ?? authenticationContext?.vinistoUser?.id ?? '',
					userLoginHash: authenticationContext?.vinistoUser?.loginHash,
					addressId,
				}),
			{
				onSuccess: () => {
					queryClient.invalidateQueries([DELIVERY_ADDRESSES_QUERY_KEY]);
				},
			}
		);
	},
	useDelete: () => {
		const queryClient = useQueryClient();
		const { vinistoUser } = useContext(AuthenticationContext);
		return useMutation(
			(
				params: Omit<UsersAddressesDeleteParams, 'userId' | 'UserLoginHash'> & {
					customerId?: string | null;
				}
			) =>
				AddressesApi.delete({
					userId: params.customerId ?? vinistoUser?.id ?? '',
					UserLoginHash: vinistoUser?.loginHash,
					...params,
				}),
			{
				onSuccess: () => {
					queryClient.invalidateQueries([DELIVERY_ADDRESSES_QUERY_KEY]);
				},
			}
		);
	},
};

export const BillingInfoApiHooks = {
	useGetAll: (
		params?: Omit<
			UsersBillingInformationDetailParams,
			'userId' | 'UserLoginHash'
		> & { customerId?: string | null }
	) => {
		const customerId = params?.customerId;
		const { vinistoUser } = useContext(AuthenticationContext);
		return useQuery<VinistoAuthDllModelsApiBillingInfoUserBillingInfosReturn>(
			[INVOICE_ADDRESSES_QUERY_KEY, { customerId }],
			() =>
				BillingInfoApi.getAll({
					UserLoginHash: vinistoUser?.loginHash,
					userId: customerId ?? vinistoUser?.id ?? '',
					...params,
				}),
			{
				cacheTime: 0,
				staleTime: 0,
				enabled: !!vinistoUser?.id && !!vinistoUser?.loginHash,
			}
		);
	},
	useCreate: ({
		onCreateCallback,
		customerId,
	}: {
		onCreateCallback: (id: string | null | undefined) => void;
		customerId?: string | null;
	}) => {
		const queryClient = useQueryClient();
		const authenticationContext = useContext(AuthenticationContext);

		return useMutation(
			(address: Omit<VinistoAuthDllModelsApiBillingInfoBillingInfo, 'id'>) =>
				BillingInfoApi.create({
					...address,
					userId: customerId ?? authenticationContext?.vinistoUser?.id ?? '',
					userLoginHash: authenticationContext?.vinistoUser?.loginHash,
				}),
			{
				onSuccess: (data) => {
					const address = data.billingInfo;
					if (address != null) {
						queryClient.setQueryData<VinistoAuthDllModelsApiBillingInfoUserBillingInfosReturn>(
							[INVOICE_ADDRESSES_QUERY_KEY, { customerId }],
							(prev) => {
								return {
									...prev,
									addresses: [...(prev?.billingInfos ?? []), address],
								};
							}
						);
					}
					onCreateCallback(data?.billingInfo?.id);
					queryClient.invalidateQueries([INVOICE_ADDRESSES_QUERY_KEY]);
				},
			}
		);
	},
	useUpdate: ({
		billingInfoId,
		customerId,
	}: {
		billingInfoId: string;
		customerId?: string | null;
	}) => {
		const queryClient = useQueryClient();
		const authenticationContext = useContext(AuthenticationContext);

		return useMutation(
			(address: Omit<VinistoAuthDllModelsApiBillingInfoBillingInfo, 'id'>) =>
				BillingInfoApi.update({
					...address,
					userId: customerId ?? authenticationContext?.vinistoUser?.id ?? '',
					userLoginHash: authenticationContext?.vinistoUser?.loginHash,
					billingInfoId,
				}),
			{
				onSuccess: () => {
					queryClient.invalidateQueries([INVOICE_ADDRESSES_QUERY_KEY]);
				},
			}
		);
	},
	useDelete: () => {
		const queryClient = useQueryClient();
		const { vinistoUser } = useContext(AuthenticationContext);

		return useMutation(
			(
				params: Omit<
					UsersBillingInformationDeleteParams,
					'userId' | 'UserLoginHash'
				> & { customerId?: string | null }
			) =>
				BillingInfoApi.delete({
					userId: params?.customerId ?? vinistoUser?.id ?? '',
					UserLoginHash: vinistoUser?.loginHash,
					...params,
				}),
			{
				onSuccess: () => {
					queryClient.invalidateQueries([INVOICE_ADDRESSES_QUERY_KEY]);
				},
			}
		);
	},
};
