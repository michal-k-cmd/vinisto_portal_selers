import {
	VinistoHelperDllEnumsCompanyUserIndustryType,
	VinistoHelperDllEnumsCountryCode,
	VinistoHelperDllEnumsPriceLevel,
	VinistoHelperDllEnumsUserCompanyCommunicationType,
	VinistoHelperDllEnumsUserLoginHashType,
	VinistoHelperDllEnumsUserUserState,
} from '@/api-types/user-api';

export const STEPS = [
	'modal.b2bRegistration.step.account',
	'modal.b2bRegistration.step.company',
	'modal.b2bRegistration.step.contact',
	'modal.b2bRegistration.step.complete',
];

export const CONTACT_STEP = STEPS.length - 1;
export const SUMMARY_STEP = STEPS.length;
export const LAST_FORM_STEP = SUMMARY_STEP;
export const COMPLETE_STEP = LAST_FORM_STEP + 1;

export const B2B_REGISTRATION_DEFAULTS = {
	merchantId: null,
	priceLevel: VinistoHelperDllEnumsPriceLevel.Level1,
	invoiceDueDate: 7,
	credit: 20,
	userState: VinistoHelperDllEnumsUserUserState.Active,
	hashType: VinistoHelperDllEnumsUserLoginHashType.SHOP,
};

export const COUNTRY_OPTIONS = Object.values(VinistoHelperDllEnumsCountryCode);

export const INDUSTRY_TYPE_OPTIONS = [
	{
		value: VinistoHelperDllEnumsCompanyUserIndustryType.Retail,
		labelId: 'modal.b2bRegistration.contact.industryType.retail',
	},
	{
		value: VinistoHelperDllEnumsCompanyUserIndustryType.Wholesale,
		labelId: 'modal.b2bRegistration.contact.industryType.wholesale',
	},
	{
		value: VinistoHelperDllEnumsCompanyUserIndustryType.Production,
		labelId: 'modal.b2bRegistration.contact.industryType.production',
	},
	{
		value: VinistoHelperDllEnumsCompanyUserIndustryType.Construction,
		labelId: 'modal.b2bRegistration.contact.industryType.construction',
	},
	{
		value: VinistoHelperDllEnumsCompanyUserIndustryType.Services,
		labelId: 'modal.b2bRegistration.contact.industryType.services',
	},
	{
		value: VinistoHelperDllEnumsCompanyUserIndustryType.Others,
		labelId: 'modal.b2bRegistration.contact.industryType.others',
	},
];

export const COMMUNICATION_TYPE_MAP: Record<
	string,
	VinistoHelperDllEnumsUserCompanyCommunicationType
> = {
	email: VinistoHelperDllEnumsUserCompanyCommunicationType.Email,
	phone: VinistoHelperDllEnumsUserCompanyCommunicationType.Phone,
	emailAndPhone:
		VinistoHelperDllEnumsUserCompanyCommunicationType.EmailAndPhone,
};
