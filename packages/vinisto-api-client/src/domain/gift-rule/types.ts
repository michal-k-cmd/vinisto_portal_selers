import {
	VinistoHelperDllEnumsCountryCode,
	VinistoHelperDllEnumsGiftGiftRuleType,
	VinistoProductDllModelsApiBundleBundle,
} from '../../api-types/product-api';
import { SpecificationType } from '@/domain/specification/schema';

/**
 * @deprecated Use addons.
 */
export interface ToApiSpecification {
	allowedValues: (string | number)[];
	definitionId?: undefined;
	specificationDefinitionId: string;
	specificationType: SpecificationType;
	type?: undefined;
}

/**
 * @deprecated Use addons.
 */
export interface FromApiSpecification {
	allowedValues: (string | number)[];
	definitionId: string;
	specificationDefinitionId?: undefined;
	specificationType?: undefined;
	type: SpecificationType;
}

/**
 * @deprecated Use addons. (Gift type)
 */
interface GiftRule {
	id?: string;
	name: string;
	description?: string;
	allowedCountry?: VinistoHelperDllEnumsCountryCode;
	validFrom: Date;
	validTo?: Date | null;
	applicableLimit?: number;
	applicableLimitCounter?: number;
	ruleType: VinistoHelperDllEnumsGiftGiftRuleType;
	bundles?: GiftRuleBundle[];
	isActive?: boolean;
	orderPriceLimitFrom: number;
	orderPriceLimitTo: number;
	userLoginHash?: string;
	categoryId?: string;
	specification?: FromApiSpecification | ToApiSpecification | null;
	supplierId?: string;
	isVisibleOnDetail?: boolean;
}

/**
 * @deprecated Use addons.
 */
interface GiftRuleBundle {
	bundleId: string;
	amount: number;
	bundle?: VinistoProductDllModelsApiBundleBundle | null;
}

export type { GiftRule, GiftRuleBundle };
