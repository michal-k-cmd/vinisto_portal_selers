import { SpecificationType } from 'Services/Specification/constants';

export const specificationTypeToRequestParam: Record<string, string> = {
	[SpecificationType.CHECK_BOX]: 'checkBoxSpecificationRequest',
	[SpecificationType.COMBO_BOX]: 'comboBoxSpecificationRequest',
	[SpecificationType.MULTI_COMBO_BOX]: 'multiComboBoxSpecificationRequest',
	[SpecificationType.NUMBER_IMPERIAL]: 'decimalNumberSpecificationRequest',
	[SpecificationType.DECIMAL_NUMBER]: 'decimalNumberSpecificationRequest',
	[SpecificationType.DECIMAL_NUMBER_IMPERIAL]:
		'decimalNumberSpecificationRequest',
	[SpecificationType.NUMBER]: 'numberSpecificationRequest',
	[SpecificationType.TEXT]: 'textSpecificationRequest',
};
