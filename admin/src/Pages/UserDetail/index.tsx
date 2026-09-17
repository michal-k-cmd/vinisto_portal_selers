import { useContext, useMemo, useRef } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { NotificationsContext } from 'Services/NotificationService';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import {
	VinistoAuthDllModelsApiAddressUserAddressCreateParameters,
	VinistoAuthDllModelsApiAddressUserAddressEditParameters,
	VinistoAuthDllModelsApiBillingInfoUserBillingInfoCreateParameters,
	VinistoAuthDllModelsApiBillingInfoUserBillingInfoEditParameters,
	VinistoHelperDllEnumsUserCompanyMerchantRights,
	VinistoHelperDllEnumsUserUserRights,
	VinistoHelperDllEnumsUserUserType,
} from 'vinisto_api_client/src/api-types/user-api/';
import { USER_ADMIN_PERMISSION } from 'Services/AuthorizationService/Components/RequirePermissions/constants';
import DetailView from 'Components/Detail/View';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { UserService } from 'Services/UserService/User';
import SupplierService from 'Services/SupplierService/Supplier';
import { apiServiceInstance } from 'Services/ApiService';
import { LocalizationContext } from 'Services/LocalizationService';
import { VinistoOrderDllModelsApiReturnDataOrdersReturn } from 'vinisto_api_client/src/api-types/order-api/';

import { UserHeader } from './Components/Header';
import BillingInfoList from './Components/BillingInfoList';
import AddressList from './Components/AddressList';
import { generateRandomPassword, mapUserOrders } from './helpers';
import UserInfo from './Components/UserInfo';
import UserOrdersTable from './Components/Table';
import useUserSubscriptionsQuery from './Hooks/useUserSubscriptionsQuery';
import CompanyInfo from './Components/CompanyInfo';
import MerchantInfo from './Components/MerchantInfo';
import CompanyHeader from './Components/CompanyHeader';
import MerchantHeader from './Components/MerchantHeader';
import UserBasket from './Components/UserBasket';
import styles from './styles.module.css';

import { SubscriptionState } from '@/api-types/subscription-api';

type UserDetailTab = 'overview' | 'addresses' | 'orders' | 'basket';

const {
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
} = UserService;

const UserDetailPage = ({
	userType,
}: {
	userType: VinistoHelperDllEnumsUserUserType;
}) => {
	const { id: userId } = useParams();
	if (!userId) throw new Error('Missing userId');
	const [searchParams, setSearchParams] = useSearchParams();

	const { handleShowErrorNotification, handleShowSuccessNotification } =
		useContext(NotificationsContext);
	const t = useContext(LocalizationContext).useFormatMessage();
	const {
		loginHash: userLoginHash,
		permissions,
		merchantRights,
	} = useContext(AuthenticationContext).vinistoUser;

	const queryClient = useQueryClient();
	const skipPermissionToast = useRef(false);

	const userQueryKey = ['user', userId];
	const addressQueryKey = ['address', userId];
	const billingAddressQueryKey = ['billing-address', userId];

	const { addSupplierToUser, removeSupplierFromUser } = SupplierService;

	const { data: userData, isFetched: isUserDataFetched } = useQuery(
		userQueryKey,
		async () =>
			await getUserById(userId, {
				userId,
				UserLoginHash: userLoginHash,
			})
	);

	const { data: userAddresses } = useQuery(
		addressQueryKey,
		async () =>
			await getUserAddresses(userId, {
				userId,
				UserLoginHash: userLoginHash,
			})
	);

	const { data: billingAddresses } = useQuery(
		billingAddressQueryKey,
		async () =>
			await getUserBillingAddresses(userId, {
				userId,
				UserLoginHash: userLoginHash,
			})
	);

	const userEmail = userData?.user?.email;

	const userOrdersQueryKey = ['user-orders', userId, userEmail];

	const { data: userOrders } = useQuery(
		userOrdersQueryKey,
		async () => {
			const data =
				await apiServiceInstance.get<VinistoOrderDllModelsApiReturnDataOrdersReturn>(
					`order-api/orders`,
					true,
					undefined,
					[
						...(userType === VinistoHelperDllEnumsUserUserType.Company
							? [
									{
										key: 'UsersIds',
										value: userId,
									},
							  ]
							: []),
						...(userType === VinistoHelperDllEnumsUserUserType.B2C
							? [
									{
										key: 'UserEmail',
										value: userEmail ?? '',
									},
							  ]
							: []),
						{
							key: 'UserLoginHash',
							value: userLoginHash,
						},
						{
							key: 'limit',
							value: 50,
						},
					]
				);

			return data;
		},
		{
			enabled: isUserDataFetched,
		}
	);

	const orders = useMemo(() => {
		return userOrders?.orders ?? [];
	}, [userOrders]);

	const setRandomPasswordMutation = useMutation(
		async () =>
			await setRandomPassword({
				userId,
				newPassword: generateRandomPassword(),
				userLoginHash,
			}),
		{
			onSuccess: () => {
				handleShowSuccessNotification(
					'admin.userDetail.changeUserPassword.success'
				);
			},
			onError: () => {
				handleShowErrorNotification(
					'admin.userDetail.changeUserPassword.error'
				);
			},
		}
	);

	const setPasswordMutation = useMutation(
		async (newPassword: string) =>
			await setPassword({
				userId,
				newPassword,
				userLoginHash,
			}),
		{
			onSuccess: () => {
				handleShowSuccessNotification('admin.editPassword.success');
			},
			onError: () => {
				handleShowErrorNotification('admin.editPassword.error');
			},
		}
	);

	const addSupplierToUserMutation = useMutation(
		async (supplierId: string) =>
			await addSupplierToUser(supplierId, {
				userId,
				userLoginHash,
			}),
		{
			onSuccess: () => {
				queryClient.invalidateQueries(userQueryKey);
				handleShowSuccessNotification('admin.addSupplierToUser.success');
			},
			onError: () => {
				handleShowErrorNotification('admin.addSupplierToUser.error');
			},
		}
	);

	const removeSupplierFromUserMutation = useMutation(
		async (supplierId: string) =>
			await removeSupplierFromUser(supplierId, {
				userId,
				userLoginHash,
			}),
		{
			onSuccess: () => {
				queryClient.invalidateQueries(userQueryKey);
				handleShowSuccessNotification('admin.removeSupplierFromUser.success');
			},
			onError: () => {
				handleShowErrorNotification('admin.removeSupplierFromUser.error');
			},
		}
	);

	const addPermissionMutation = useMutation(
		async (permissionId: VinistoHelperDllEnumsUserUserRights) =>
			await addPermission(userId, {
				permissionId,
				userLoginHash,
			}),
		{
			onSuccess: () => {
				queryClient.invalidateQueries(userQueryKey);
				if (!skipPermissionToast.current) {
					handleShowSuccessNotification('admin.modal.changeRights.success');
				}
			},
			onError: () => {
				if (!skipPermissionToast.current) {
					handleShowErrorNotification('admin.modal.changeRights.error');
				}
			},
		}
	);

	const deletePermissionMutation = useMutation(
		async (permissionId: VinistoHelperDllEnumsUserUserRights) =>
			await deletePermission(userId, {
				permissionId,
				userLoginHash,
			}),
		{
			onSuccess: () => {
				queryClient.invalidateQueries(userQueryKey);
				if (!skipPermissionToast.current) {
					handleShowSuccessNotification('admin.modal.changeRights.success');
				}
			},
			onError: () => {
				if (!skipPermissionToast.current) {
					handleShowErrorNotification('admin.modal.changeRights.error');
				}
			},
		}
	);

	const createUserAddressMutation = useMutation(
		async (
			request: VinistoAuthDllModelsApiAddressUserAddressCreateParameters
		) => await createUserAddress(userId, { ...request, userLoginHash }),
		{
			onSuccess: () => {
				queryClient.invalidateQueries(addressQueryKey);
				handleShowSuccessNotification('admin.modal.createUserAddress.success');
			},
			onError: () => {
				handleShowErrorNotification('admin.modal.createUserAddress.error');
			},
		}
	);

	const createUserBillingAddressMutation = useMutation(
		async (
			request: VinistoAuthDllModelsApiBillingInfoUserBillingInfoCreateParameters
		) => await createUserBillingAddress(userId, { ...request, userLoginHash }),
		{
			onSuccess: () => {
				queryClient.invalidateQueries(billingAddressQueryKey);
				handleShowSuccessNotification(
					'admin.modal.createUserBillingInfo.success'
				);
			},
			onError: () => {
				handleShowErrorNotification('admin.modal.createUserBillingInfo.error');
			},
		}
	);

	const deleteUserAddressMutation = useMutation(
		async (addressId: string) => {
			await deleteUserAddress(userId, addressId, userLoginHash);
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries(addressQueryKey);
				handleShowSuccessNotification('admin.deleteAddressFromUser.success');
			},
			onError: () => {
				handleShowErrorNotification('admin.deleteAddressFromUser.error');
			},
		}
	);

	const deleteUserBillingAddressMutation = useMutation(
		async (billingInfoId: string) => {
			await deleteUserBillingAddress(userId, billingInfoId, userLoginHash);
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries(billingAddressQueryKey);
				handleShowSuccessNotification(
					'admin.deleteBillingInfoFromUser.success'
				);
			},
			onError: () => {
				handleShowErrorNotification('admin.deleteBillingInfoFromUser.error');
			},
		}
	);

	const updateUserAddressMutation = useMutation({
		mutationKey: addressQueryKey,
		mutationFn: async ({
			addressId,
			request,
		}: {
			addressId: string;
			request: VinistoAuthDllModelsApiAddressUserAddressEditParameters;
		}) => {
			await updateUserAddress(userId, addressId, {
				...request,
				userLoginHash,
			});
		},
		onSuccess: () => {
			queryClient.invalidateQueries(addressQueryKey);
			handleShowSuccessNotification('admin.modal.editUserAddress.success');
		},
		onError: () => {
			handleShowErrorNotification('admin.modal.editUserAddress.error');
		},
	});

	const updateUserBillingAddressMutation = useMutation({
		mutationKey: billingAddressQueryKey,
		mutationFn: async ({
			billingInfoId,
			request,
		}: {
			billingInfoId: string;
			request: VinistoAuthDllModelsApiBillingInfoUserBillingInfoEditParameters;
		}) => {
			await updateUserBillingAddress(userId, billingInfoId, {
				...request,
				userLoginHash,
			});
		},
		onSuccess: () => {
			queryClient.invalidateQueries(billingAddressQueryKey);
			handleShowSuccessNotification('admin.modal.editUserBillingInfo.success');
		},
		onError: () => {
			handleShowErrorNotification('admin.modal.editUserBillingInfo.error');
		},
	});

	const canEditPermissions: boolean = useMemo(() => {
		return permissions.includes(USER_ADMIN_PERMISSION);
	}, [permissions]);

	const subscriptionQuery = useUserSubscriptionsQuery(userId);
	const subscriptionType = subscriptionQuery.data?.data?.subscriptions?.find(
		(sub) => sub.state === SubscriptionState.Active
	)?.type;

	const user = userData?.user;

	const canSeeOrders =
		permissions.includes(
			VinistoHelperDllEnumsUserUserRights.USER_ADMIN_ORDER
		) ||
		merchantRights.some(
			(merchantRight) =>
				merchantRight ===
					VinistoHelperDllEnumsUserCompanyMerchantRights.OrdersCreation ||
				merchantRight ===
					VinistoHelperDllEnumsUserCompanyMerchantRights.OrdersConfirmation
		);

	const tabs: { id: UserDetailTab; label: string }[] = [
		{ id: 'overview' as const, label: 'admin.userDetail.tabs.overview' },
		{ id: 'addresses' as const, label: 'admin.userDetail.tabs.addresses' },
		...(canSeeOrders
			? [{ id: 'orders' as const, label: 'admin.userDetail.tabs.orders' }]
			: []),
		{ id: 'basket' as const, label: 'admin.userDetail.tabs.basket' },
	];

	const requestedTab = searchParams.get('tab');
	const activeTab = tabs.some((tab) => tab.id === requestedTab)
		? (requestedTab as UserDetailTab)
		: 'overview';

	const handleTabChange = (tab: UserDetailTab) => {
		const nextSearchParams = new URLSearchParams(searchParams);

		if (tab === 'overview') {
			nextSearchParams.delete('tab');
		} else {
			nextSearchParams.set('tab', tab);
		}

		setSearchParams(nextSearchParams);
	};

	return (
		<DetailView>
			{user && userType === VinistoHelperDllEnumsUserUserType.B2C && (
				<UserHeader
					email={user?.email ?? '-'}
					createdAt={user?.createdAt}
					lastLoginTime={user?.lastLoginTime}
					subscriptionType={subscriptionType}
				/>
			)}

			{user && userType === VinistoHelperDllEnumsUserUserType.Company && (
				<CompanyHeader company={user} />
			)}

			{user && userType === VinistoHelperDllEnumsUserUserType.Merchant && (
				<MerchantHeader merchant={user} />
			)}

			<div
				className={styles.tabs}
				role="tablist"
			>
				{tabs.map((tab) => (
					<button
						key={tab.id}
						type="button"
						role="tab"
						aria-selected={activeTab === tab.id}
						className={`${styles.tab} ${
							activeTab === tab.id ? styles.activeTab : ''
						}`}
						onClick={() => handleTabChange(tab.id)}
					>
						{t({ id: tab.label })}
					</button>
				))}
			</div>

			<div
				className={styles.tabContent}
				role="tabpanel"
			>
				{activeTab === 'overview' && (
					<>
						{user && userType === VinistoHelperDllEnumsUserUserType.Company && (
							<CompanyInfo company={user} />
						)}
						{user &&
							userType === VinistoHelperDllEnumsUserUserType.Merchant && (
								<MerchantInfo merchant={user} />
							)}
						<UserInfo
							isEmailVerified={user?.isEmailVerified}
							isNewsletterActive={
								user && 'isNewsletterActive' in user
									? user.isNewsletterActive
									: false
							}
							isAgreementCC={
								user && 'isAgreementCC' in user ? user.isAgreementCC : false
							}
							suppliers={user && 'suppliers' in user ? user.suppliers : []}
							setRandomPasswordMutation={setRandomPasswordMutation}
							setPasswordMutation={setPasswordMutation}
							addSupplierToUserMutation={addSupplierToUserMutation}
							userId={userId}
							addPermissionMutation={addPermissionMutation}
							removeSupplierFromUserMutation={removeSupplierFromUserMutation}
							deletePermissionMutation={deletePermissionMutation}
							canEditPermissions={canEditPermissions}
							skipPermissionToast={skipPermissionToast}
							handleShowSuccessNotification={handleShowSuccessNotification}
							handleShowErrorNotification={handleShowErrorNotification}
							userPermissions={user?.permissions ?? []}
							registrationCountry={user?.registrationCountry}
							userType={userType}
						/>
					</>
				)}
				{activeTab === 'addresses' && (
					<>
						<AddressList
							userAddresses={userAddresses?.addresses ?? []}
							createUserAddressMutation={createUserAddressMutation}
							deleteUserAddressMutation={deleteUserAddressMutation}
							updateUserAddressMutation={updateUserAddressMutation}
						/>
						<BillingInfoList
							billingAddresses={billingAddresses?.billingInfos ?? []}
							createUserBillingAddressMutation={
								createUserBillingAddressMutation
							}
							deleteUserBillingAddressMutation={
								deleteUserBillingAddressMutation
							}
							updateUserBillingAddressMutation={
								updateUserBillingAddressMutation
							}
						/>
					</>
				)}
				{activeTab === 'orders' && canSeeOrders && (
					<UserOrdersTable data={mapUserOrders(orders)} />
				)}
				{activeTab === 'basket' && (
					<UserBasket
						userId={userId}
						userType={userType}
					/>
				)}
			</div>
		</DetailView>
	);
};

export default UserDetailPage;
