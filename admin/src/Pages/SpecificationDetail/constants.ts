import { VinistoHelperDllEnumsSpecificationSpecificationType } from 'vinisto_api_client/src/api-types/product-api/';
import {
	TYPE_CHECK_BOX,
	TYPE_COMBO_BOX,
	TYPE_DECIMAL_NUMBER,
	TYPE_DECIMAL_NUMBER_IMPERIAL,
	TYPE_MULTI_COMBO_BOX,
	TYPE_NUMBER,
	TYPE_NUMBER_IMPERIAL,
	TYPE_PRICE,
	TYPE_TEXT,
} from 'Services/Specification/constants';

export const specificationTypes = [
	{
		value: VinistoHelperDllEnumsSpecificationSpecificationType.TEXT,
		label: TYPE_TEXT,
	},
	{
		value: VinistoHelperDllEnumsSpecificationSpecificationType.COMBO_BOX,
		label: TYPE_COMBO_BOX,
	},
	{
		value: VinistoHelperDllEnumsSpecificationSpecificationType.MULTI_COMBO_BOX,
		label: TYPE_MULTI_COMBO_BOX,
	},
	{
		value: VinistoHelperDllEnumsSpecificationSpecificationType.CHECK_BOX,
		label: TYPE_CHECK_BOX,
	},
	{
		value: VinistoHelperDllEnumsSpecificationSpecificationType.NUMBER,
		label: TYPE_NUMBER,
	},
	{
		value: VinistoHelperDllEnumsSpecificationSpecificationType.NUMBER_IMPERIAL,
		label: TYPE_NUMBER_IMPERIAL,
	},
	{
		value: VinistoHelperDllEnumsSpecificationSpecificationType.DECIMAL_NUMBER,
		label: TYPE_DECIMAL_NUMBER,
	},
	{
		value:
			VinistoHelperDllEnumsSpecificationSpecificationType.DECIMAL_NUMBER_IMPERIAL,
		label: TYPE_DECIMAL_NUMBER_IMPERIAL,
	},
	{
		value: VinistoHelperDllEnumsSpecificationSpecificationType.PRICE,
		label: TYPE_PRICE,
	},
];
