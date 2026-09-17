import { LangValuePair } from 'Hooks/useLocalizedValue/interfaces';
import {
	VinistoImageDllModelsApiImageImage,
	VinistoImageDllModelsApiImageSvgImage,
} from 'vinisto_api_client/src/api-types/image-api/';

import { SpecificationType } from './constants';

interface SpecificationAllovedValues {
	name: LangValuePair[];
	score: number;
	description: LangValuePair[];
	metaDescription: LangValuePair[];
	imageId: LangValuePair[];
	iconId: LangValuePair[];
	images: VinistoImageDllModelsApiImageImage[];
	icons: VinistoImageDllModelsApiImageSvgImage[];
}

interface SpecificationDefinitionBase {
	id: string;
	name: LangValuePair[];
	specificationType: SpecificationType;
	allowedValues?: Record<string, SpecificationAllovedValues>;
	availableValues?: number[] | string[];
	order?: number;
	orderDetail?: number;
	isHidden?: boolean;
	isDetail?: boolean;
	url: unknown[];
	description: LangValuePair[];
	metaDescription: LangValuePair[];
	imageId: LangValuePair[];
	images: VinistoImageDllModelsApiImageImage[];
	productAttributeTabs: typeof import('vinisto_api_client/src/product-service/specification/constants').PRODUCT_ATTRIBUTE_TABS[number][];
}

export interface SpecificationDefinitionNumeric
	extends SpecificationDefinitionBase {
	specificationType:
		| SpecificationType.DECIMAL_NUMBER
		| SpecificationType.DECIMAL_NUMBER_IMPERIAL
		| SpecificationType.NUMBER
		| SpecificationType.NUMBER_IMPERIAL;
	availableValues?: number[];
	unit?: LangValuePair[];
}

export interface SpecificationDefinitionString
	extends SpecificationDefinitionBase {
	specificationType:
		| SpecificationType.TEXT
		| SpecificationType.COMBO_BOX
		| SpecificationType.MULTI_COMBO_BOX;
	availableValues?: string[];
}

export interface SpecificationDefinitionBoolean
	extends SpecificationDefinitionBase {
	specificationType: SpecificationType.CHECK_BOX;
	availableValues?: string[];
}

export type SpecificationDefinition =
	| SpecificationDefinitionBoolean
	| SpecificationDefinitionNumeric
	| SpecificationDefinitionString;

export interface SpecificationValue {
	allowedValues?: number[] | string[] | boolean[];
}

export interface SpecificationDetail {
	definition: SpecificationDefinition;
	value: SpecificationValue;
	specification?: SpecificationDefinition;
}

// specification filter types (i.e. category, blog article...)
export type CheckBoxSpecification = Omit<
	SpecificationDefinition,
	'specificationType'
> & { specificationType: SpecificationType.CHECK_BOX };
export type CheckBoxSpecificationValue = {
	specification: CheckBoxSpecification;
	value: boolean[];
};
export type MultiComboBoxSpecification = Omit<
	SpecificationDefinition,
	'specificationType'
> & { specificationType: SpecificationType.MULTI_COMBO_BOX };
export type MultiComboBoxSpecificationValue = {
	specification: MultiComboBoxSpecification;
	value: string[];
};
export type ComboBoxSpecification = Omit<
	SpecificationDefinition,
	'specificationType'
> & { specificationType: SpecificationType.COMBO_BOX };
export type ComboBoxSpecificationValue = {
	specification: ComboBoxSpecification;
	value: string[];
};
export type NumberSpecification = Omit<
	SpecificationDefinition,
	'specificationType'
> & { specificationType: SpecificationType.NUMBER };
export type NumberSpecificationValue = {
	specification: NumberSpecification;
	value: number[];
};
export type NumberImperialSpecification = Omit<
	SpecificationDefinition,
	'specificationType'
> & { specificationType: SpecificationType.NUMBER_IMPERIAL };
export type NumberImperialSpecificationValue = {
	specification: NumberImperialSpecification;
	value: number[];
};
export type DecimalNumberSpecification = Omit<
	SpecificationDefinition,
	'specificationType'
> & { specificationType: SpecificationType.DECIMAL_NUMBER };
export type DecimalNumberSpecificationValue = {
	specification: DecimalNumberSpecification;
	value: number[];
};
export type DecimalNumberImperialSpecification = Omit<
	SpecificationDefinition,
	'specificationType'
> & { specificationType: SpecificationType.DECIMAL_NUMBER_IMPERIAL };
export type DecimalNumberImperialSpecificationValue = {
	specification: DecimalNumberImperialSpecification;
	value: number[];
};
export type TextSpecification = Omit<
	SpecificationDefinition,
	'specificationType'
> & { specificationType: SpecificationType.TEXT };
export type TextSpecificationValue = {
	specification: TextSpecification;
	value: string[];
};

export type SpecificationParams =
	| CheckBoxSpecificationValue
	| MultiComboBoxSpecificationValue
	| ComboBoxSpecificationValue
	| NumberSpecificationValue
	| NumberImperialSpecificationValue
	| DecimalNumberSpecificationValue
	| DecimalNumberImperialSpecificationValue
	| TextSpecificationValue;
