import { SpecificationType } from 'Services/Specification/constants';

export enum ProductSelectionType {
	STATIC = 'STATIC',
	DYNAMIC = 'DYNAMIC',
}

export const CATEGORY_API_ENDPOINT = 'product-api/categories';

export const SPECIFICATION_API_ENDPOINT_MAP = {
	[SpecificationType.CHECK_BOX]: 'AddCheckBoxSpecification',
	[SpecificationType.MULTI_COMBO_BOX]: 'AddMultiComboBoxSpecification',
	[SpecificationType.COMBO_BOX]: 'AddComboBoxSpecification',
	[SpecificationType.NUMBER]: 'AddNumberSpecification',
	[SpecificationType.NUMBER_IMPERIAL]: 'AddNumberImperialSpecification',
	[SpecificationType.DECIMAL_NUMBER]: 'AddDecimalNumberSpecification',
	[SpecificationType.DECIMAL_NUMBER_IMPERIAL]:
		'AddDecimalNumberImperialSpecification',
	[SpecificationType.TEXT]: 'AddTextSpecification',
};
