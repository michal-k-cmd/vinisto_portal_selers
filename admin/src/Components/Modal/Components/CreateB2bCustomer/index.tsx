import {
	Input,
	InputCheckBox,
	InputEmail,
	InputPassword,
	InputSelect,
	Validators,
} from 'Components/Form';
import MultistepForm, { Step } from 'Components/Form/Components/MultistepForm';
import { LocalizationContext } from 'Services/LocalizationService';
import { useContext } from 'react';
import { FormSpy } from 'react-final-form';
import { Link } from 'react-router-dom';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { Button } from 'react-bootstrap';
import { FormApi } from 'final-form';
import AresService from 'Services/AresService';
import { NotificationsContext } from 'Services/NotificationService';
import { ModalContext } from 'Components/Modal/context';
import useGetMerchants from 'Hooks/Queries/useGetMerchants';
// import AddressAutocomplete from 'Components/Form/Components/AddressAutocomplete';

import ContactInfoFields from './ContactInfoFields';
import BusinessInfoFields from './BusinessInfoFields';

import {
	VinistoHelperDllEnumsCountryCode,
	VinistoHelperDllEnumsUserCompanyCommunicationType,
	VinistoHelperDllEnumsUserCompanyPaymentType,
	VinistoHelperDllEnumsUserUserState,
} from '@/api-types/user-api';
import { UserApi } from '@/api-types/user-api';
import api from '@/api';

const initialValues = {
	credit: 20,
	invoiceDueDate: 7,
	billingInfo: {
		countryCode: VinistoHelperDllEnumsCountryCode.CZ,
		id: '',
		name: '',
		surname: '',
		street: '',
		landRegistryNumber: '',
		zip: '',
		city: '',
		phone: '',
	},
	deliveryAddress: {
		countryCode: VinistoHelperDllEnumsCountryCode.CZ,
		id: '',
		name: '',
		surname: '',
		street: '',
		landRegistryNumber: '',
		zip: '',
		city: '',
		phone: '',
	},
};

type Values = Partial<UserApi.CompaniesCreate.RequestBody> & {
	accountNumberAndBankCodeOrIban?: string;
	useBillingAddressAsDeliveryAddress?: boolean;
	confirmPassword?: string;
};

const DIC_PREFIX = 'CZ';

const CreateB2bCustomer = () => {
	const { loginHash: userLoginHash } = useContext(
		AuthenticationContext
	).vinistoUser;
	const t = useContext(LocalizationContext).useFormatMessage();
	const { handleShowSuccessNotification, handleShowErrorNotification } =
		useContext(NotificationsContext);
	const modalContext = useContext(ModalContext);
	const { data: modalData } = modalContext;

	const merchantsQuery = useGetMerchants({ userLoginHash });

	const paymentTypeOptions = Object.values(
		VinistoHelperDllEnumsUserCompanyPaymentType
	).map((type) => ({
		value: type,
		label: `${t({ id: `admin.b2bCustomer.paymentMethod.${type}` })}`,
	}));

	const handleSubmit = async (formValues: Values) => {
		/* eslint-disable @typescript-eslint/no-unused-vars */
		const {
			confirmPassword,
			useBillingAddressAsDeliveryAddress,
			accountNumberAndBankCodeOrIban,
			...values
		} = formValues;
		/* eslint-enable @typescript-eslint/no-unused-vars */

		const billingInfoId = crypto.randomUUID();
		const deliveryAddressId = crypto.randomUUID();

		const deliveryAddress = formValues.useBillingAddressAsDeliveryAddress
			? {
					...values.billingInfo,
					name: formValues.firstName ?? '',
					surname: formValues.surname ?? '',
					phone: formValues.phone ?? '',
					email: formValues.companyEmail ?? '',
					id: deliveryAddressId ?? '',
			  }
			: {
					...values.deliveryAddress,
					name: formValues.firstName,
					surname: formValues.surname,
					phone: formValues.phone,
					email: formValues.companyEmail,
					id: deliveryAddressId,
			  };

		const billingInfo = {
			...values.billingInfo,
			accountNumber: formValues.accountNumberAndBankCodeOrIban?.split('/')[0],
			bankCode: formValues.accountNumberAndBankCodeOrIban?.split('/')[1],
			name: formValues.firstName,
			surname: formValues.surname,
			phone: formValues.phone,
			email: formValues.companyEmail,
			id: billingInfoId,
		};

		const requestBody = {
			...values,
			ico: formValues.billingInfo?.ico,
			email: formValues.email ?? null,
			firstName: formValues.firstName ?? null,
			surname: formValues.surname ?? null,
			phone: formValues.phone ?? null,
			companyEmail: formValues.companyEmail ?? null,
			positionInCompany: formValues.positionInCompany ?? null,
			billingInfo,
			deliveryAddress,
			userState: VinistoHelperDllEnumsUserUserState.Pending,
			userLoginHash,
		};

		api
			.post<UserApi.CompaniesCreate.ResponseBody>(
				`user-api/companies`,
				undefined,
				requestBody
			)
			.then((response) => {
				// @ts-expect-error The endpoint does not follow api constraints
				if (response.errors) {
					// @ts-expect-error The endpoint does not follow api constraints
					throw new Error(response.errors);
				}
				modalData?.resetUserList?.();
				handleShowSuccessNotification('admin.b2bCustomer.create.success');
				modalContext.handleCloseModal();
			})
			.catch((error) => {
				const message = error.message ?? '';
				handleShowErrorNotification({
					id: 'admin.b2bCustomer.create.error',
					error: message,
				});
			});
	};

	const loadDataFromAres = async (form: FormApi<Values>) => {
		const formValues = form.getState().values;
		const ico = formValues.billingInfo?.ico;
		if (!ico) return;
		try {
			const aresData = await AresService.getDataByIco(ico);
			const { setValue } = form.mutators;
			if (aresData) {
				setValue('billingInfo.company', aresData?.obchodniJmeno ?? '');
				setValue('billingInfo.street', {
					value: aresData?.sidlo?.nazevUlice ?? '',
					selectedItem: null,
				});
				setValue('billingInfo.street', aresData?.sidlo?.nazevUlice ?? '');
				setValue(
					'billingInfo.landRegistryNumber',
					aresData?.sidlo?.cisloDomovni
						? String(aresData?.sidlo?.cisloDomovni)
						: ''
				);
				setValue(
					'billingInfo.houseNumber',
					aresData?.sidlo?.cisloOrientacni
						? String(aresData?.sidlo?.cisloOrientacni)
						: ''
				);
				setValue('billingInfo.city', aresData?.sidlo.nazevObce ?? '');
				setValue(
					'billingInfo.zip',
					aresData?.sidlo?.psc ? String(aresData?.sidlo?.psc) : ''
				);
				setValue('billingInfo.dic', `${DIC_PREFIX}${ico}`);
				setValue(
					'billingInfo.countryCode',
					(aresData?.sidlo?.kodStatu as VinistoHelperDllEnumsCountryCode) ??
						VinistoHelperDllEnumsCountryCode.CZ
				);
			}
		} catch (err) {
			handleShowErrorNotification('admin.b2bCustomer.getAresData.error');
		}
	};

	return (
		<MultistepForm<Values>
			onSubmit={handleSubmit}
			initialValues={initialValues}
			mutators={{
				setValue: ([field, value], state, { changeValue }) => {
					changeValue(state, field, () => value);
				},
			}}
			renderHeader={(page) => (
				<div>
					<strong>Krok {page + 1}</strong>
				</div>
			)}
			submitText={t({ id: 'admin.b2bCustomer.create.submit' })}
		>
			<Step>
				<FormSpy subscription={{ values: true }}>
					{({ form, values }) => (
						<>
							<h2>{t({ id: 'admin.b2bCustomer.companyInfo.title' })}</h2>
							<h3>{t({ id: 'admin.b2bCustomer.companyInfo.subtitle' })}</h3>

							<Input
								label="admin.b2bCustomer.company.label"
								name="billingInfo.company"
								identifier="billingInfo.company"
								validate={Validators.required}
							/>
							<Input
								label="admin.b2bCustomer.ico.label"
								name="billingInfo.ico"
								identifier="billingInfo.ico"
								validate={Validators.required}
							/>
							<Button
								onClick={() => loadDataFromAres(form)}
								disabled={!values.billingInfo.ico}
							>
								Načíst z ARES
							</Button>
							<Input
								label="admin.b2bCustomer.dic.label"
								name="billingInfo.dic"
								identifier="billingInfo.dic"
							/>
							<Input
								label="admin.b2bCustomer.street.label"
								name="billingInfo.street"
								identifier="billingInfo.street"
								validate={Validators.required}
							/>
							{/*<AddressAutocomplete
								label="admin.b2bCustomer.street.label"
								name="billingInfo.street"
								identifier="billingInfo.street"
								validate={Validators.required}
								onSelect={(address) => {
									if (!address) return;
									const [landRegistryNumber, houseNumber] =
										address.NUMBER?.split('/') ?? [];

									form.mutators.setValue(
										'billingInfo.landRegistryNumber',
										landRegistryNumber
									);
									form.mutators.setValue(
										'billingInfo.houseNumber',
										houseNumber
									);
									form.mutators.setValue('billingInfo.street', address.STREET);
									form.mutators.setValue('billingInfo.city', address.CITY);
									form.mutators.setValue('billingInfo.zip', address.ZIP);
								}}
							/>*/}
							<Input
								label="admin.b2bCustomer.landRegistryNumber.label"
								name="billingInfo.landRegistryNumber"
								identifier="billingInfo.landRegistryNumber"
								validate={Validators.required}
							/>
							<Input
								label="admin.b2bCustomer.houseNumber.label"
								name="billingInfo.houseNumber"
								identifier="billingInfo.houseNumber"
							/>
							<Input
								label="admin.b2bCustomer.zip.label"
								name="billingInfo.zip"
								identifier="billingInfo.zip"
								validate={Validators.required}
							/>
							<Input
								label="admin.b2bCustomer.city.label"
								name="billingInfo.city"
								identifier="billingInfo.city"
								validate={Validators.required}
							/>
							<InputSelect
								label="admin.b2bCustomer.country.label"
								name="billingInfo.countryCode"
								identifier="billingInfo.countryCode"
								validate={Validators.required}
								options={Object.values(VinistoHelperDllEnumsCountryCode).map(
									(code) => ({
										value: code,
										label: `${t({ id: `country.${code}` })}`,
									})
								)}
							/>
							<Input
								label="admin.b2bCustomer.accountNumber.label"
								name="accountNumberAndBankCodeOrIban"
								identifier="accountNumberAndBankCodeOrIban"
							/>
							<hr />
							<h3>{t({ id: 'admin.b2bCustomer.deliveryAddress.title' })}</h3>
							<InputCheckBox
								label="admin.b2bCustomer.useBillingAddressAsDeliveryAddress.label"
								name="useBillingAddressAsDeliveryAddress"
								identifier="useBillingAddressAsDeliveryAddress"
							/>
							{!values.useBillingAddressAsDeliveryAddress && (
								<>
									<Input
										label="admin.b2bCustomer.street.label"
										name="deliveryAddress.street"
										identifier="deliveryAddress.street"
										validate={Validators.required}
									/>
									{/*<AddressAutocomplete
										label="admin.b2bCustomer.street.label"
										name="deliveryAddress.street"
										identifier="deliveryAddress.street"
										validate={Validators.required}
										onSelect={(address) => {
											if (!address) return;
											const [landRegistryNumber, houseNumber] =
												address.NUMBER?.split('/') ?? [];

											form.mutators.setValue(
												'deliveryAddress.landRegistryNumber',
												landRegistryNumber
											);
											form.mutators.setValue(
												'deliveryAddress.houseNumber',
												houseNumber
											);
											form.mutators.setValue(
												'deliveryAddress.street',
												address.STREET
											);
											form.mutators.setValue(
												'deliveryAddress.city',
												address.CITY
											);
											form.mutators.setValue(
												'deliveryAddress.zip',
												address.ZIP
											);
										}}
									/>*/}
									<Input
										label="admin.b2bCustomer.landRegistryNumber.label"
										name="deliveryAddress.landRegistryNumber"
										identifier="deliveryAddress.landRegistryNumber"
										validate={Validators.required}
									/>
									<Input
										label="admin.b2bCustomer.houseNumber.label"
										name="deliveryAddress.houseNumber"
										identifier="deliveryAddress.houseNumber"
									/>
									<Input
										label="admin.b2bCustomer.zip.label"
										name="deliveryAddress.zip"
										identifier="deliveryAddress.zip"
										validate={Validators.required}
									/>
									<Input
										label="admin.b2bCustomer.city.label"
										name="deliveryAddress.city"
										identifier="deliveryAddress.city"
										validate={Validators.required}
									/>
									<InputSelect
										label="admin.b2bCustomer.country.label"
										name="deliveryAddress.countryCode"
										identifier="deliveryAddress.countryCode"
										validate={Validators.required}
										options={Object.values(
											VinistoHelperDllEnumsCountryCode
										).map((code) => ({
											value: code,
											label: `${t({ id: `country.${code}` })}`,
										}))}
									/>
								</>
							)}
						</>
					)}
				</FormSpy>
			</Step>
			<Step>
				<h2>{t({ id: 'admin.b2bCustomer.companyContactInfo.title' })}</h2>
				<h3>{t({ id: 'admin.b2bCustomer.companyContactInfo.subtitle' })}</h3>

				<ContactInfoFields />
			</Step>
			<Step>
				<FormSpy subscription={{ values: true }}>
					{({ values }) => {
						return (
							<>
								<h2>{t({ id: 'admin.b2bCustomer.businessInfo.title' })}</h2>
								<h3>{t({ id: 'admin.b2bCustomer.businessInfo.subtitle' })}</h3>
								<BusinessInfoFields values={values} />
							</>
						);
					}}
				</FormSpy>
			</Step>
			<Step
				validate={(values) => {
					const errors: Partial<Values> = {};

					if (values.password !== values.confirmPassword) {
						errors.confirmPassword = `${t({
							id: 'validation.error.passwordsWontMatch',
						})}`;
					}
					return errors;
				}}
			>
				<h2>Hlavní uživatelský účet</h2>
				<h3>Vytvořte si přihlašovací údaje pro správu firemního účtu</h3>
				<InputEmail
					label="admin.b2bCustomer.loginEmail.label"
					name="email"
					identifier="email"
					validate={[Validators.required, Validators.isUniqueEmail]}
				/>
				<InputPassword
					label="admin.b2bCustomer.password.label"
					name="password"
					identifier="password"
					validate={Validators.required}
				/>
				<InputPassword
					label="admin.b2bCustomer.confirmPassword.label"
					name="confirmPassword"
					identifier="confirmPassword"
					validate={Validators.required}
				/>
				<InputSelect
					label="admin.b2bCustomer.preferredCommunicationType.label"
					name="preferredCommunicationType"
					identifier="preferredCommunicationType"
					options={Object.values(
						VinistoHelperDllEnumsUserCompanyCommunicationType
					).map((type) => ({
						value: type,
						label: `${t({
							id: `admin.b2bCustomer.preferredCommunicationType.${type}`,
						})}`,
					}))}
				/>
			</Step>
			<Step>
				<FormSpy subscription={{ values: true }}>
					{({ values }) => (
						<>
							<h2>Shrnutí registrace</h2>
							<h3>Zkontrolujte prosím zadané údaje</h3>
							<div>
								<h4>Obchodní údaje</h4>
								<dl>
									<dt>{t({ id: 'admin.b2bCustomer.priceLevel.label' })}</dt>
									<dd>{t({ id: values.priceLevel })}</dd>
									<dt>{t({ id: 'admin.b2bCustomer.merchant.label' })}</dt>
									<dd>
										{(() => {
											const merchant = merchantsQuery.data?.find(
												(merchant) => merchant.id === values.merchantId
											);
											if (!merchant) return null;
											return `${merchant.firstName} ${merchant.surname}`;
										})()}
									</dd>
									<dt>{t({ id: 'admin.b2bCustomer.paymentMethod.label' })}</dt>
									<dd>
										{
											paymentTypeOptions.find(
												(option) => option.value === values.paymentType
											)?.label
										}
									</dd>
								</dl>
							</div>
							<div>
								<h4>Firemní údaje</h4>
								<dl>
									<dt>{t({ id: 'admin.b2bCustomer.company.label' })}</dt>
									<dd>{values.billingInfo.company}</dd>

									<dt>{t({ id: 'admin.b2bCustomer.ico.label' })}</dt>
									<dd>{values.billingInfo.ico}</dd>

									<dt>{t({ id: 'admin.b2bCustomer.billingAddress.label' })}</dt>
									<dd>{`${values.billingInfo.street} ${
										values.billingInfo.landRegistryNumber
									}${
										values.billingInfo.houseNumber
											? `/${values.billingInfo.houseNumber}`
											: ''
									}, ${values.billingInfo.city}`}</dd>

									<dt>{t({ id: 'admin.b2bCustomer.zip.label' })}</dt>
									<dd>{values.billingInfo.zip}</dd>

									<dt>{t({ id: 'admin.b2bCustomer.country.label' })}</dt>
									<dd>
										{t({ id: `country.${values.billingInfo.countryCode}` })}
									</dd>

									<dt>
										{t({
											id: 'admin.b2bCustomer.accountNumber.label',
										})}
									</dt>
									<dd>{values.billingInfo.accountNumberAndBankCodeOrIban}</dd>
								</dl>
							</div>
							<div>
								<h4>Doručovací adresa</h4>
								{values.useBillingAddressAsDeliveryAddress ? (
									<dl>Shodná s fakturační adresou</dl>
								) : (
									<dl>
										<dt>{t({ id: 'admin.b2bCustomer.company.label' })}</dt>
										<dd>{values.deliveryAddress.company}</dd>

										<dt>
											{t({ id: 'admin.b2bCustomer.billingAddress.label' })}
										</dt>
										<dd>{`${values.deliveryAddress.street} ${
											values.deliveryAddress.landRegistryNumber
										}${
											values.deliveryAddress.houseNumber
												? `/${values.deliveryAddress.houseNumber}`
												: ''
										}, ${values.deliveryAddress.city}`}</dd>

										<dt>{t({ id: 'admin.b2bCustomer.zip.label' })}</dt>
										<dd>{values.deliveryAddress.zip}</dd>

										<dt>{t({ id: 'admin.b2bCustomer.country.label' })}</dt>
										{t({ id: `country.${values.deliveryAddress.countryCode}` })}
									</dl>
								)}
							</div>
							<div>
								<h4>Kontaktní osoba</h4>
								<dl>
									<dt>{t({ id: 'admin.modal.form.name' })}</dt>
									<dd>{`${values.firstName} ${values.surname}`}</dd>

									<dt>{t({ id: 'admin.b2bCustomer.companyEmail.label' })}</dt>
									<dd>{values.companyEmail}</dd>

									<dt>{t({ id: 'admin.b2bCustomer.phone.label' })}</dt>
									<dd>{values.phone}</dd>
								</dl>
							</div>
							<InputCheckBox
								label={
									<strong>
										{t(
											{ id: 'admin.b2bCustomer.isAgreementCC.label' },
											{
												ccLink: (
													<strong>
														<Link to="#">
															{t({ id: 'admin.b2bCustomer.ccLink.label' })}
														</Link>
													</strong>
												),
												gdprLink: (
													<strong>
														<Link to="#">
															{t({ id: 'admin.b2bCustomer.gdprLink.label' })}
														</Link>
													</strong>
												),
											}
										)}
									</strong>
								}
								name="isAgreementCC"
								identifier="isAgreementCC"
								validate={Validators.required}
							/>
							<InputCheckBox
								label="admin.b2bCustomer.isNewsletterActive.label"
								name="isNewsletterActive"
								identifier="isNewsletterActive"
							/>
						</>
					)}
				</FormSpy>
			</Step>
		</MultistepForm>
	);
};

export default CreateB2bCustomer;
