import { VinistoHelperDllEnumsCurrency } from './api-types/product-api';
import { DefaultBundleApiParams } from './types';

export const B2C_NUMERIC_CODE = 0;
export const B2B_NUMERIC_CODE = 1;
export const VICOM_NUMERIC_CODE = 2;

export type PlatformIdType =
	| typeof B2C_NUMERIC_CODE
	| typeof B2B_NUMERIC_CODE
	| typeof VICOM_NUMERIC_CODE;

const countryCodes = ['CZ', 'SK', 'DE', 'UK'] as const;
type CountryCode = (typeof countryCodes)[keyof typeof countryCodes];

const languages = ['CZECH', 'SLOVAK', 'ENGLISH', 'GERMAN'] as const;
type Language = (typeof languages)[keyof typeof languages];

interface LangValuePair {
	language?: string | null;
	value?: string | null;
}

interface LangValuesPair {
	language?: string | null;
	values?: string[] | null;
}

const DEFAULT_CURRENCY = VinistoHelperDllEnumsCurrency.CZK;

const DEFAULT_BUNDLE_API_PARAMS = {
	hiddenSpecification: false,
	isDeleted: false,
	isEnabled: true,
	isGift: false,
	isTemporaryUnavailable: false,
	isSaleOver: false,
} satisfies DefaultBundleApiParams;

const DEFAULT_BUNDLE_API_PARAMS_PROCESSED: any[] = [];
Object.entries(DEFAULT_BUNDLE_API_PARAMS).forEach(([key, value]) => {
	DEFAULT_BUNDLE_API_PARAMS_PROCESSED.push({ key: key, value: value });
});

type PatchField<T> = { hasValue: boolean; value: T };

function patchValue<T>(value: T | null | undefined): PatchField<T> | null {
	if (value === null || typeof value === 'undefined' || value === '') {
		return null; // Exclude from the payload
	}
	return { hasValue: true, value };
}

export {
	languages,
	DEFAULT_CURRENCY,
	countryCodes,
	DEFAULT_BUNDLE_API_PARAMS,
	DEFAULT_BUNDLE_API_PARAMS_PROCESSED,
	patchValue,
};
export type {
	Language,
	LangValuePair,
	LangValuesPair,
	CountryCode,
	PatchField,
};
