import { ReactNode } from 'react';
import { FormApi } from 'final-form';

import {
	VinistoHelperDllEnumsCompanyUserIndustryType,
	VinistoHelperDllEnumsCountryCode,
} from '@/api-types/user-api';

export interface FormValues {
	email?: string;
	password?: string;
	preferredCommunication?: string;
	ico?: string;
	company?: string;
	dic?: string;
	billingStreet?: string;
	billingCity?: string;
	billingZip?: string;
	billingCountryCode?: VinistoHelperDllEnumsCountryCode;
	accountNumberAndBankCode?: string;
	useBillingAddressForDelivery?: boolean;
	deliveryStreet?: string;
	deliveryCity?: string;
	deliveryZip?: string;
	deliveryNote?: string;
	firstName?: string;
	surname?: string;
	positionInCompany?: string;
	companyEmail?: string;
	phone?: string;
	industryType?: VinistoHelperDllEnumsCompanyUserIndustryType;
	isNewsletterActive?: boolean;
	isAgreementCC?: boolean;
}

export interface StepPanelProps {
	titleId: string;
	subtitleId: string;
	children: ReactNode;
}

export interface CompanyStepProps {
	form: FormApi<FormValues>;
	useBillingAddressForDelivery: boolean;
	onLoadingChange: (isLoading: boolean) => void;
}

export interface CompleteStepProps {
	onLogin: () => void;
}

export interface SummaryStepProps {
	values: FormValues;
}

export interface SummarySectionProps {
	titleId: string;
	children: ReactNode;
}
