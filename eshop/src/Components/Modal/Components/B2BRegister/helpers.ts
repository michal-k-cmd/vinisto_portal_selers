import { v4 as uuidv4 } from 'uuid';
import {
	isApiError,
	isNetworkError,
} from 'vinisto_api_client/src/domain/error';

import { B2B_REGISTRATION_DEFAULTS, COMMUNICATION_TYPE_MAP } from './constants';
import { FormValues } from './interfaces';

import {
	UserApi,
	type VinistoHelperDllBaseError,
	VinistoHelperDllEnumsCountryCode,
	VinistoHelperDllEnumsErrorGeneralError,
	VinistoHelperDllEnumsErrorMongoObject,
	VinistoHelperDllEnumsErrorSpecificError,
} from '@/api-types/user-api';

const DEFAULT_REGISTRATION_ERROR = 'modal.b2bRegistration.registrationError';

export const getB2BRegistrationErrorMessage = (error: unknown): string => {
	if (isNetworkError(error)) {
		return 'modal.b2bRegistration.error.network';
	}

	if (!isApiError(error) || !Array.isArray(error.error)) {
		return DEFAULT_REGISTRATION_ERROR;
	}

	const apiErrors = error.error as VinistoHelperDllBaseError[];

	for (const apiError of apiErrors) {
		switch (apiError.specificError) {
			case VinistoHelperDllEnumsErrorSpecificError.USER_REGISTER_ERROR_USER_EXIST:
			case VinistoHelperDllEnumsErrorSpecificError.USER_UPDATE_USER_EMAIL_EXIST:
				return 'modal.b2bRegistration.error.emailAlreadyUsed';
			case VinistoHelperDllEnumsErrorSpecificError.ICO_NOT_PROVIDED:
				return 'modal.b2bRegistration.error.icoMissing';
			case VinistoHelperDllEnumsErrorSpecificError.USER_BILLING_INFO_NOT_FOUND:
				return 'modal.b2bRegistration.error.billingAddress';
			case VinistoHelperDllEnumsErrorSpecificError.USER_ADDRESS_NOT_FOUND:
			case VinistoHelperDllEnumsErrorSpecificError.USER_ADDRESSES_NOT_FOUND:
				return 'modal.b2bRegistration.error.deliveryAddress';
			case VinistoHelperDllEnumsErrorSpecificError.USER_REGISTER_ERROR_AGREEMENT_CC:
				return 'modal.b2bRegistration.error.agreementRequired';
			case VinistoHelperDllEnumsErrorSpecificError.USER_EMAIL_SENT_ERROR:
			case VinistoHelperDllEnumsErrorSpecificError.USER_CREATE_EMAIL_VERIFICATION_HASH_ERROR:
				return 'modal.b2bRegistration.error.activationEmail';
			case VinistoHelperDllEnumsErrorSpecificError.USER_WRONG_EMAIL:
				return 'modal.b2bRegistration.error.invalidData';
			case VinistoHelperDllEnumsErrorSpecificError.MERCHANT_ID_NOT_FOUND:
			case VinistoHelperDllEnumsErrorSpecificError.INVOICE_DUE_DATE_LESS_OR_EQUALS_ZERO:
			case VinistoHelperDllEnumsErrorSpecificError.MONTHLY_TURNOVER_LESS_OR_EQUALS_ZERO:
			case VinistoHelperDllEnumsErrorSpecificError.ORDERING_FREQUENCY_LESS_OR_EQUALS_ZERO:
			case VinistoHelperDllEnumsErrorSpecificError.CREDIT_LESS_OR_EQUALS_ZERO:
			case VinistoHelperDllEnumsErrorSpecificError.USER_LOGIN_HASH_NOT_PROVIDED:
				return 'modal.b2bRegistration.error.configuration';
		}

		if (
			apiError.generalError ===
				VinistoHelperDllEnumsErrorGeneralError.ObjectAlreadyExists &&
			apiError.mongoObject === VinistoHelperDllEnumsErrorMongoObject.User
		) {
			return 'modal.b2bRegistration.error.companyAlreadyRegistered';
		}

		if (
			(apiError.generalError ===
				VinistoHelperDllEnumsErrorGeneralError.ObjectNotFound &&
				apiError.mongoObject === VinistoHelperDllEnumsErrorMongoObject.User) ||
			apiError.generalError ===
				VinistoHelperDllEnumsErrorGeneralError.ObjectPermissionError
		) {
			return 'modal.b2bRegistration.error.configuration';
		}

		if (
			apiError.generalError ===
				VinistoHelperDllEnumsErrorGeneralError.ObjectParametersError ||
			apiError.generalError ===
				VinistoHelperDllEnumsErrorGeneralError.IncompatibleParametersError
		) {
			return 'modal.b2bRegistration.error.invalidData';
		}
	}

	return DEFAULT_REGISTRATION_ERROR;
};

const parseStreetAndNumber = (address?: string) => {
	const value = address?.trim() ?? '';
	const numberMatch = value.match(
		/(\d+[a-zA-Z]?)(?:\s*\/\s*(\d+[a-zA-Z]?))?\s*$/
	);

	if (!numberMatch || numberMatch.index === undefined) {
		return {
			street: value,
			landRegistryNumber: '',
			houseNumber: null,
		};
	}

	return {
		street: value.slice(0, numberMatch.index).trim() || value,
		landRegistryNumber: numberMatch[1],
		houseNumber: numberMatch[2] ?? null,
	};
};

const parseBankAccount = (value?: string) => {
	const [accountNumber, bankCode] = value?.split('/', 2) ?? [];

	return {
		accountNumber: accountNumber?.trim() || null,
		bankCode: bankCode?.trim() || null,
	};
};

export const validateStreetAndNumber = (value?: string) =>
	/\d/.test(value ?? '')
		? undefined
		: 'modal.b2bRegistration.company.streetNumberRequired';

export const createB2BRegistrationRequest = (
	values: FormValues,
	registrationCountry: VinistoHelperDllEnumsCountryCode
): UserApi.CompaniesCreate.RequestBody => {
	const billingAddress = parseStreetAndNumber(values.billingStreet);
	const deliveryAddress = values.useBillingAddressForDelivery
		? billingAddress
		: parseStreetAndNumber(values.deliveryStreet);
	const bankAccount = parseBankAccount(values.accountNumberAndBankCode);
	const billingCountryCode = values.billingCountryCode ?? registrationCountry;
	const addressContact = {
		name: values.firstName ?? '',
		surname: values.surname ?? '',
		phone: values.phone ?? '',
		email: values.companyEmail ?? null,
	};

	return {
		email: values.email ?? null,
		ico: values.ico ?? null,
		firstName: values.firstName ?? null,
		surname: values.surname ?? null,
		phone: values.phone ?? null,
		companyEmail: values.companyEmail ?? null,
		positionInCompany: values.positionInCompany ?? null,
		billingInfo: {
			id: uuidv4(),
			...addressContact,
			company: values.company ?? null,
			ico: values.ico ?? null,
			dic: values.dic || null,
			...bankAccount,
			...billingAddress,
			zip: values.billingZip ?? '',
			city: values.billingCity ?? '',
			countryCode: billingCountryCode,
		},
		deliveryAddress: {
			id: uuidv4(),
			...addressContact,
			company: values.company ?? null,
			...deliveryAddress,
			zip: values.useBillingAddressForDelivery
				? values.billingZip ?? ''
				: values.deliveryZip ?? '',
			city: values.useBillingAddressForDelivery
				? values.billingCity ?? ''
				: values.deliveryCity ?? '',
			note: values.useBillingAddressForDelivery
				? null
				: values.deliveryNote || null,
			countryCode: billingCountryCode,
		},
		industryType: values.industryType,
		priceLevel: B2B_REGISTRATION_DEFAULTS.priceLevel,
		merchantId: B2B_REGISTRATION_DEFAULTS.merchantId,
		invoiceDueDate: B2B_REGISTRATION_DEFAULTS.invoiceDueDate,
		credit: B2B_REGISTRATION_DEFAULTS.credit,
		preferredCommunicationType: values.preferredCommunication
			? COMMUNICATION_TYPE_MAP[values.preferredCommunication]
			: undefined,
		userState: B2B_REGISTRATION_DEFAULTS.userState,
		password: values.password ?? null,
		hashType: B2B_REGISTRATION_DEFAULTS.hashType,
		registrationCountry,
		isNewsletterActive: !!values.isNewsletterActive,
		isAgreementCC: !!values.isAgreementCC,
	};
};
