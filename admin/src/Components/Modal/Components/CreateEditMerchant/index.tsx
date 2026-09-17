import {
	CountrySelect,
	Input,
	InputCheckBox,
	InputDatePicker,
	InputNumber,
	InputPassword,
	InputTextArea,
	Validators,
} from 'Components/Form';
import { ModalContext } from 'Components/Modal/context';
import { useContext } from 'react';
import { Form } from 'react-final-form';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { LocalizationContext } from 'Services/LocalizationService';
import { Button } from 'react-bootstrap';
import { NotificationsContext } from 'Services/NotificationService';
import { dayjsInstance as dayjs } from 'Services/Date';
import { ActionTypes } from 'Constants/actionTypes';
import { useQueryClient } from '@tanstack/react-query';

import {
	UserApi,
	VinistoAuthDllModelsApiUserMerchant,
	VinistoHelperDllEnumsUserCompanyMerchantRights,
	VinistoHelperDllEnumsUserUserState,
} from '@/api-types/user-api';
import api from '@/api';

type FormValues = UserApi.MerchantsCreate.RequestBody & {
	__confirmPassword: string;
};

const CreateEditMerchant = () => {
	const { loginHash: userLoginHash } = useContext(
		AuthenticationContext
	).vinistoUser;
	const t = useContext(LocalizationContext).useFormatMessage();
	const modalContext = useContext(ModalContext);
	const { handleShowErrorNotification, handleShowSuccessNotification } =
		useContext(NotificationsContext);

	const { data: modalData } = modalContext ?? {};
	const mode = modalData?.mode;
	const isEditMode = mode === ActionTypes.EDIT;
	const merchant: VinistoAuthDllModelsApiUserMerchant =
		modalData?.merchant ?? {};

	const merchantWithTransformedPermissions = {
		...merchant,
		merchantRights: isEditMode
			? Object.fromEntries(
					merchant.merchantRights?.map((permission) => [permission, true]) ?? []
			  )
			: {
					[VinistoHelperDllEnumsUserCompanyMerchantRights.OrdersCreation]: true,
					[VinistoHelperDllEnumsUserCompanyMerchantRights.OrdersConfirmation]:
						true,
					[VinistoHelperDllEnumsUserCompanyMerchantRights.UsersManagement]:
						true,
			  },
		startDate: merchant.startDate
			? dayjs.unix(merchant.startDate).toDate()
			: null,
	};

	const queryClient = useQueryClient();
	const userQueryKey = ['user', merchant.id];

	const createMerchant = (formValues: FormValues) => {
		const { __confirmPassword, ...values } = formValues;

		api
			.post(`user-api/merchants`, undefined, {
				userLoginHash,
				...values,
				startDate: dayjs(formValues.startDate).unix(),
				merchantRights: Object.keys(values.merchantRights ?? {}).filter(
					(key) =>
						values.merchantRights?.[key as keyof FormValues['merchantRights']]
				),
				userState: VinistoHelperDllEnumsUserUserState.Active,
			})
			.then(() => {
				handleShowSuccessNotification('admin.merchant.create.success');
				modalData?.resetUserList();
				queryClient.invalidateQueries(['getMerchants']);
				modalContext.handleCloseModal();
			})
			.catch(() => {
				handleShowErrorNotification('admin.merchant.create.error');
			});
	};

	const editMerchant = (formValues: FormValues) => {
		const {
			email,
			nickname,
			firstName,
			surname,
			phone,
			feePercentage,
			internalNote,
			userState,
		} = formValues;
		api
			.put(`user-api/merchants/${merchant.id}`, undefined, {
				userLoginHash,
				email,
				nickname,
				firstName,
				surname,
				phone,
				feePercentage,
				startDate: dayjs(formValues.startDate).unix(),
				internalNote,
				merchantRights: Object.keys(formValues.merchantRights ?? {}).filter(
					(key) =>
						formValues.merchantRights?.[
							key as keyof FormValues['merchantRights']
						]
				),
				userState,
			})
			.then(() => {
				handleShowSuccessNotification('admin.merchant.edit.success');
				queryClient.invalidateQueries(userQueryKey);
				modalContext.handleCloseModal();
			})
			.catch(() => {
				handleShowErrorNotification('admin.merchant.edit.error');
			});
	};

	return (
		<Form
			initialValues={merchantWithTransformedPermissions}
			onSubmit={isEditMode ? editMerchant : createMerchant}
			validate={(values) => {
				const errors: Partial<FormValues> = {};

				if (values.password !== values.__confirmPassword) {
					errors.__confirmPassword = `${t({
						id: 'validation.error.passwordsWontMatch',
					})}`;
				}
				return errors;
			}}
			render={({ handleSubmit }) => (
				<form onSubmit={handleSubmit}>
					<h3>{t({ id: 'admin.merchant.personalInfo.title' })}</h3>
					<div className="d-flex gap-2">
						<Input
							label="admin.merchant.firstName.label"
							name="firstName"
							identifier="firstName"
							validate={Validators.required}
						/>
						<Input
							label="admin.merchant.surname.label"
							name="surname"
							identifier="surname"
							validate={Validators.required}
						/>
					</div>
					<div className="d-flex gap-2">
						<Input
							label="admin.merchant.email.label"
							name="email"
							identifier="email"
							validate={Validators.required}
						/>
						<Input
							label="admin.merchant.phone.label"
							name="phone"
							identifier="phone"
							validate={Validators.required}
						/>
					</div>
					<CountrySelect
						label="admin.merchant.registrationCountry.label"
						name="registrationCountry"
						identifier="registrationCountry"
						validate={Validators.required}
					/>

					<h3>{t({ id: 'admin.merchant.businessInfo.title' })}</h3>
					{/*<Input
						label="admin.merchant.region.label"
						name="region"
						identifier="region"
						validate={Validators.required}
					/>*/}
					<div className="d-flex gap-2">
						<InputNumber
							label="admin.merchant.feePercentage.label"
							name="feePercentage"
							identifier="feePercentage"
							validate={Validators.required}
							max={100}
						/>
						<InputDatePicker
							label="admin.merchant.startDate.label"
							name="startDate"
							identifier="startDate"
							validate={Validators.required}
						/>
					</div>
					{!isEditMode && (
						<>
							<h3>{t({ id: 'admin.merchant.authenticationInfo.title' })}</h3>
							<InputPassword
								label="admin.merchant.password.label"
								name="password"
								identifier="password"
								validate={Validators.required}
							/>
							<InputPassword
								label="admin.merchant.confirmPassword.label"
								name="__confirmPassword"
								identifier="__confirmPassword"
								validate={Validators.required}
							/>
						</>
					)}
					<h3>{t({ id: 'admin.merchant.permissions.title' })}</h3>
					{Object.values(VinistoHelperDllEnumsUserCompanyMerchantRights)
						.filter(
							(merchantPermission) =>
								merchantPermission !==
								VinistoHelperDllEnumsUserCompanyMerchantRights.ReportsAccess
						)
						.map((merchantPermission) => (
							<InputCheckBox
								key={merchantPermission}
								label={
									<label htmlFor={`merchantRights.${merchantPermission}`}>
										<div>
											{t({
												id: `admin.merchant.permissions.${merchantPermission}.label`,
											})}
										</div>
										<small>
											{t({
												id: `admin.merchant.permissions.${merchantPermission}.legend`,
											})}
										</small>
									</label>
								}
								name={`merchantRights.${merchantPermission}`}
								identifier={`merchantRights.${merchantPermission}`}
							/>
						))}
					<h3>{t({ id: 'admin.merchant.notes.title' })}</h3>
					<InputTextArea
						label="admin.merchant.internalNote.label"
						name="internalNote"
						identifier="internalNote"
					/>
					<Button type="submit">
						{t({
							id: isEditMode
								? 'admin.merchant.edit.title'
								: 'admin.merchant.create.title',
						})}
					</Button>
				</form>
			)}
		></Form>
	);
};

export default CreateEditMerchant;
