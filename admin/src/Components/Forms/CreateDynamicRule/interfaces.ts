import {
	VinistoFeeSystemModelsFeeRuleTag,
	VinistoFeeSystemModelsFeeRuleTurnoverValue,
	VinistoHelperDllEnumsFeeRuleFeeRuleState,
} from '@/api-types/supplier-api';
import { VinistoHelperDllEnumsCountryCode } from '@/api-types/user-api';

export interface CreateDynamicRuleFromProps {
	initialValues: Partial<DynamicFeeRuleFormValues>;
	handleSubmit: (data: DynamicFeeRuleFormValues) => void;
}

export type DynamicFeeRuleFormValues = {
	id?: string;
	/** Only ACTIVE or CONCEPT states are allowed. */
	state: VinistoHelperDllEnumsFeeRuleFeeRuleState;
	originCountry: VinistoHelperDllEnumsCountryCode;
	destinationCountry: VinistoHelperDllEnumsCountryCode;
	originFees: {
		vinistoB2cLevel1: {
			fixedPrice?: number | null;
			percentage?: number | null;
		} | null;
		vinistoB2bLevel1: {
			fixedPrice?: number | null;
			percentage?: number | null;
		} | null;
	};
	destinationFees: {
		vinistoB2cLevel1: {
			fixedPrice?: number | null;
			percentage?: number | null;
		} | null;
		vinistoB2bLevel1: {
			fixedPrice?: number | null;
			percentage?: number | null;
		} | null;
	};
	name: string | null;
	validFrom?: Date | null;
	validTo?: Date | null;
	supplierIds?: string[] | null;
	supplierNames?: string[] | null;
	specifications?: any[] | null;
	tags?: VinistoFeeSystemModelsFeeRuleTag[] | null;
	categoryIds?: string[] | null;
	categoryNames?: string[] | null;
	bundleIds?: string[] | null;
	bundleNames?: string[] | null;
	bundlePriceFrom?: number | null;
	bundlePriceTo?: number | null;
	bundleAmountFrom?: number | null;
	bundleAmountTo?: number | null;
	turnover?: VinistoFeeSystemModelsFeeRuleTurnoverValue | null;
	note?: string | null;

	productType?: string | null;
	kind?: string | null;
	flags?: {
		save: boolean;
	};
};
