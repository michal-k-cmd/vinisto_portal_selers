import { LangValuePair } from 'Hooks/useLocalizedValue/interfaces';
import {
	VinistoImageDllModelsApiImageImage,
	VinistoImageDllModelsApiImageSvgImage,
} from 'vinisto_api_client/src/api-types/image-api';

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
}

export interface SpecificationDefinitionNumeric
	extends SpecificationDefinitionBase {
	specificationType:
		| SpecificationType.DECIMAL_NUMBER
		| SpecificationType.NUMBER;
	unit: LangValuePair[];
}

export interface SpecificationDefinitionNumericImperial
	extends SpecificationDefinitionBase {
	specificationType:
		| SpecificationType.DECIMAL_NUMBER_IMPERIAL
		| SpecificationType.NUMBER_IMPERIAL;
	unit: LangValuePair[];
	imperialUnit: LangValuePair[];
}

export interface SpecificationDefinitionString
	extends SpecificationDefinitionBase {
	specificationType:
		| SpecificationType.TEXT
		| SpecificationType.COMBO_BOX
		| SpecificationType.MULTI_COMBO_BOX;
	allowedValues?: Record<string, SpecificationAllovedValues>;
}

export interface SpecificationDefinitionBoolean
	extends SpecificationDefinitionBase {
	specificationType: SpecificationType.CHECK_BOX;
}

export interface SpecificationDefinitionComboBox
	extends SpecificationDefinitionString {
	specificationType: SpecificationType.COMBO_BOX;
}

export interface SpecificationValueComboBox {
	specificationType: SpecificationType.COMBO_BOX;
	selectedValueName: string;
}

export interface SpecificationComboBox {
	definition: SpecificationDefinitionComboBox;
	value: SpecificationValueComboBox;
}

export interface SpecificationDefinitionMultiComboBox
	extends SpecificationDefinitionString {
	specificationType: SpecificationType.MULTI_COMBO_BOX;
}

export interface SpecificationValueMultiComboBox {
	specificationType: SpecificationType.MULTI_COMBO_BOX;
	selectedValuesName: string[];
}

export interface SpecificationMultiComboBox {
	definition: SpecificationDefinitionMultiComboBox;
	value: SpecificationValueMultiComboBox;
}

export interface SpecificationValueNumber {
	specificationType:
		| SpecificationType.DECIMAL_NUMBER
		| SpecificationType.NUMBER;
	value: number;
}

export interface SpecificationNumber {
	definition: SpecificationDefinitionNumeric;
	value: SpecificationValueNumber;
}

export interface SpecificationValueNumberImperial {
	specificationType:
		| SpecificationType.DECIMAL_NUMBER_IMPERIAL
		| SpecificationType.NUMBER_IMPERIAL;
	value: number;
	imperialValue: number;
}

export interface SpecificationNumberImperial {
	definition: SpecificationDefinitionNumericImperial;
	value: SpecificationValueNumberImperial | SpecificationValueNumber;
}

export interface SpecificationValueCheckBox {
	specificationType: SpecificationType.CHECK_BOX;
	value: boolean;
}

export interface SpecificationCheckBox {
	definition: SpecificationDefinitionBoolean;
	value: SpecificationValueCheckBox;
}

export interface SpecificationDefinitionText
	extends SpecificationDefinitionString {
	specificationType: SpecificationType.TEXT;
}

export interface SpecificationValueText {
	specificationType: SpecificationType.TEXT;
	value: LangValuePair[];
}

export interface SpecificationText {
	definition: SpecificationDefinitionText;
	value: SpecificationValueText;
}

export type SpecificationDetail =
	| SpecificationComboBox
	| SpecificationMultiComboBox
	| SpecificationNumber
	| SpecificationNumberImperial
	| SpecificationCheckBox
	| SpecificationText;
