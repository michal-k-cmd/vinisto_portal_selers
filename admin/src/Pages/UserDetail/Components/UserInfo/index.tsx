import { MutableRefObject, useContext } from 'react';
import Detail from 'Components/Detail';
import { LocalizationContext } from 'Services/LocalizationService';
import {
	UserApi,
	VinistoAuthDllModelsApiPermissionUserPermissionDeleteParameters,
	VinistoAuthDllModelsApiUserChangePasswordParameters,
	VinistoAuthDllModelsApiUserUser,
	VinistoHelperDllEnumsCountryCode,
	VinistoHelperDllEnumsUserUserRights,
} from 'vinisto_api_client/src/api-types/user-api/';
import {
	VinistoSupplierDllModelsApiSupplierSupplierAddUserParameters,
	VinistoSupplierDllModelsApiSupplierSupplierRemoveUserParameters,
} from 'vinisto_api_client/src/api-types/supplier-api/';
import ActionButton from 'Components/AdminDetail/Components/ActionButton';
import {
	useMutation,
	UseMutationResult,
	useQueryClient,
} from '@tanstack/react-query';
import { confirmAlert } from 'react-confirm-alert';
import { ModalContext } from 'Components/Modal/context';
import {
	ADD_SUPPLIER_TO_USER,
	EDIT_USER_PASSWORD,
	EDIT_USER_REGISTRATION_COUNTRY,
	PERMISSIONS,
} from 'Components/Modal/constants';
import DeleteIcon from 'Components/Icons/Delete';
import { countryCodeToCountryNameMap } from 'Pages/BundleDetail/constants';
import EditIcon from 'Components/Icons/Edit';
import { apiServiceInstance } from 'Services/ApiService';
import { NotificationsContext } from 'Services/NotificationService';

import styles from './styles.module.css';
import SubscriptionInfo from './subscription-info';

import { VinistoHelperDllEnumsUserUserType } from '@/api-types/product-api';

interface UserInfoProps {
	registrationCountry: VinistoAuthDllModelsApiUserUser['registrationCountry'];
	isEmailVerified: VinistoAuthDllModelsApiUserUser['isEmailVerified'];
	isNewsletterActive: VinistoAuthDllModelsApiUserUser['isNewsletterActive'];
	isAgreementCC: VinistoAuthDllModelsApiUserUser['isAgreementCC'];
	suppliers: VinistoAuthDllModelsApiUserUser['suppliers'];
	setRandomPasswordMutation: UseMutationResult<
		VinistoAuthDllModelsApiUserChangePasswordParameters,
		unknown,
		void,
		unknown
	>;
	setPasswordMutation: UseMutationResult<
		VinistoAuthDllModelsApiUserChangePasswordParameters,
		unknown,
		string,
		unknown
	>;
	addSupplierToUserMutation: UseMutationResult<
		VinistoSupplierDllModelsApiSupplierSupplierAddUserParameters,
		unknown,
		string,
		unknown
	>;
	removeSupplierFromUserMutation: UseMutationResult<
		VinistoSupplierDllModelsApiSupplierSupplierRemoveUserParameters,
		unknown,
		string,
		unknown
	>;
	userId: string;
	addPermissionMutation: UseMutationResult<
		VinistoAuthDllModelsApiPermissionUserPermissionDeleteParameters,
		unknown,
		VinistoHelperDllEnumsUserUserRights,
		unknown
	>;
	deletePermissionMutation: UseMutationResult<
		VinistoAuthDllModelsApiPermissionUserPermissionDeleteParameters,
		unknown,
		VinistoHelperDllEnumsUserUserRights,
		unknown
	>;
	canEditPermissions: boolean;
	userPermissions: VinistoHelperDllEnumsUserUserRights[];
	skipPermissionToast: MutableRefObject<boolean>;
	handleShowSuccessNotification: (id: string) => void;
	handleShowErrorNotification: (id: string) => void;
	userType: VinistoHelperDllEnumsUserUserType;
}

const UserInfo = ({
	isEmailVerified,
	isNewsletterActive,
	isAgreementCC,
	suppliers,
	setRandomPasswordMutation,
	setPasswordMutation,
	addSupplierToUserMutation,
	removeSupplierFromUserMutation,
	userId,
	addPermissionMutation,
	deletePermissionMutation,
	canEditPermissions,
	userPermissions,
	skipPermissionToast,
	handleShowSuccessNotification,
	handleShowErrorNotification,
	registrationCountry,
	userType,
}: UserInfoProps) => {
	const modalContext = useContext(ModalContext);
	const t = useContext(LocalizationContext).useFormatMessage();
	const queryClient = useQueryClient();
	const notificationContext = useContext(NotificationsContext);

	const handleGeneratePassword = () => {
		confirmAlert({
			title: `${t({
				id: 'admin.popups.newPassword.title',
			})}`,
			message: `${t({
				id: 'admin.popups.newPassword.description',
			})}`,
			buttons: [
				{
					label: `${t({
						id: 'admin.popups.newPassword.yes',
					})}`,
					onClick: () => {
						setRandomPasswordMutation.mutate();
					},
				},
				{
					label: `${t({
						id: 'admin.popups.newPassword.no',
					})}`,
				},
			],
		});
	};

	const handleNewPassword = () => {
		const modalData = {
			setPasswordMutation,
		};
		modalContext.handleOpenModal(EDIT_USER_PASSWORD, modalData);
	};

	const handleAddSupplier = () => {
		const modalData = {
			addSupplierToUserMutation,
			userId,
		};
		modalContext.handleOpenModal(ADD_SUPPLIER_TO_USER, modalData);
	};

	const handleEditPermissions = () => {
		const modalData = {
			addPermissionMutation,
			deletePermissionMutation,
			userId,
			userPermissions,
			skipPermissionToast,
			handleShowSuccessNotification,
			handleShowErrorNotification,
		};
		modalContext.handleOpenModal(PERMISSIONS, modalData);
	};

	const handleRemoveSupplierFromUser = (supplierId: string) => {
		removeSupplierFromUserMutation.mutate(supplierId);
	};

	const { mutate: updateUserRegistrationCountryMutation } = useMutation({
		mutationFn: (
			request: UserApi.UsersChangeRegistrationCountryPartialUpdate.RequestBody
		) => {
			return apiServiceInstance.patch<UserApi.UsersChangeRegistrationCountryPartialUpdate.ResponseBody>(
				`user-api/users/${userId}/change-registration-country`,
				request
			);
		},
		onSuccess: () => {
			notificationContext.handleShowSuccessNotification(
				'admin.modal.editUserRegistrationCountry.success'
			);
			queryClient.refetchQueries({
				queryKey: ['user', userId],
			});
		},
		onError: () => {
			notificationContext.handleShowErrorNotification(
				'admin.modal.editUserRegistrationCountry.error'
			);
		},
	});

	const handleEditRegistrationCountry = () => {
		modalContext.handleOpenModal(EDIT_USER_REGISTRATION_COUNTRY, {
			registrationCountry,
			updateUserRegistrationCountryMutation,
		});
	};

	return (
		<>
			<Detail.Container>
				<Detail.Heading
					value={`${t({ id: 'admin.userDetail.info.heading' })}`}
				/>
				<Detail.Columns>
					<div className={styles.wrapper}>
						<div>
							<Detail.Subheading
								value={t({
									id: 'admin.userDetail.info.subscriptionAndConsents',
								})}
							/>
							<Detail.InfoWithLabel
								label={t({ id: 'admin.userDetail.info.verifiedEmail' }) + ':'}
								value={
									isEmailVerified
										? t({ id: 'admin.yes' })
										: t({ id: 'admin.no' })
								}
							/>
							<Detail.InfoWithLabel
								label={t({ id: 'admin.userDetail.info.newsletter' }) + ':'}
								value={
									isNewsletterActive
										? t({ id: 'admin.yes' })
										: t({ id: 'admin.no' })
								}
							/>
							<Detail.InfoWithLabel
								label={t({ id: 'admin.userDetail.info.agreeCC' }) + ':'}
								value={
									isAgreementCC ? t({ id: 'admin.yes' }) : t({ id: 'admin.no' })
								}
							/>
						</div>
						<div>
							<ActionButton
								onClick={handleGeneratePassword}
								label={'admin.detail.actionButtons.generatePassword.label'}
								disabled={false}
							/>
							<ActionButton
								onClick={handleNewPassword}
								label={'admin.detail.actionButtons.editPassword.label'}
								disabled={false}
							/>
						</div>
					</div>
					<div className={styles.wrapper}>
						<div>
							<Detail.Subheading
								value={<>{t({ id: 'admin.userDetail.info.sellers' })}</>}
							/>
							<Detail.InfoWithLabel
								label={t({ id: 'admin.userDetail.info.activeSellers' }) + ':'}
								value={
									suppliers?.length
										? suppliers.map((supplier, key) => (
												<div
													key={key}
													className={styles.supplierWrap}
												>
													<span>{supplier.nameWeb}</span>
													<DeleteIcon
														onClick={() =>
															handleRemoveSupplierFromUser(supplier.id)
														}
														className="bundle-detail__btn supplier-close-icon ms-3"
													/>
												</div>
										  ))
										: '-'
								}
							/>
						</div>
						<div>
							<ActionButton
								className={
									userType !== VinistoHelperDllEnumsUserUserType.B2C
										? 'invisible'
										: ''
								}
								onClick={handleAddSupplier}
								label={'admin.detail.actionButtons.supplier.label'}
								disabled={userType !== VinistoHelperDllEnumsUserUserType.B2C}
							/>
							{canEditPermissions && (
								<ActionButton
									onClick={handleEditPermissions}
									label={'admin.detail.actionButtons.rights.label'}
									disabled={false}
								/>
							)}
						</div>
					</div>
					<div className={styles.wrapper}>
						<div>
							<Detail.Subheading
								value={
									<>{t({ id: 'admin.userDetail.info.registrationCountry' })}</>
								}
							/>
							<div className={styles.detailRow}>
								{registrationCountry &&
									`${t({
										id: countryCodeToCountryNameMap[
											registrationCountry as VinistoHelperDllEnumsCountryCode
										],
									})}`}
								<EditIcon
									onClick={handleEditRegistrationCountry}
									className="bundle-detail__btn"
								/>
							</div>
						</div>
					</div>
					<SubscriptionInfo userId={userId} />
				</Detail.Columns>
			</Detail.Container>
			<div></div>
		</>
	);
};

export default UserInfo;
