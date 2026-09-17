import { isInteger } from 'lodash-es';

import createFormattedDecimalNumber from '../../Helpers/createFormattedDecimalNumber';
import removeDiacritics from '../../Helpers/removeDiacritics';

import { SpecificationParamInput, SpecificationParamValue } from './interfaces';
import {
	SPECIFICATION_TYPE_CHECK_BOX,
	SPECIFICATION_TYPE_COMBO_BOX,
	SPECIFICATION_TYPE_MULTI_COMBO_BOX,
	SPECIFICATION_TYPE_TEXT,
} from './constants';

const convertToUrlString = (value: string) =>
	removeDiacritics(value?.replaceAll(' ', '+'));

const useSpecificationParamValue = () => {
	return (param: SpecificationParamInput): SpecificationParamValue => {
		const specificationType = param?.value.specificationType;

		const url = '/products';
		const paramNameUrl = convertToUrlString(
			`/${param?.definition?.name[0].value}/`
		);

		switch (specificationType) {
			case SPECIFICATION_TYPE_MULTI_COMBO_BOX:
				return param?.value?.selectedValuesName?.map((value: string) => {
					const allowedValue = param?.definition?.allowedValues?.[value];
					const paramValue = allowedValue?.name?.[0]?.value;
					return {
						name: paramValue,
						url: `${url}${paramNameUrl}${convertToUrlString(paramValue)}`,
					};
				});
			case SPECIFICATION_TYPE_COMBO_BOX:
				return {
					name: param?.definition?.allowedValues?.[
						param?.value?.selectedValueName
					]?.[0].value,
					url: `${url}${paramNameUrl}${convertToUrlString(
						param?.definition?.allowedValues?.[
							param?.value?.selectedValueName
						]?.[0].value
					)}`,
				};
			case SPECIFICATION_TYPE_CHECK_BOX:
				return {
					name: param?.value?.value ? 'Ano' : 'Ne',
					url: `${url}${paramNameUrl}${param?.value?.value ? '1' : '0'}`,
				};
			case SPECIFICATION_TYPE_TEXT:
				return {
					name: param?.value?.value,
					url: `${url}${paramNameUrl}${convertToUrlString(
						param?.value?.value
					)}`,
				};
			default:
				return {
					name: `${
						isInteger(param?.value?.value)
							? param?.value?.value
							: createFormattedDecimalNumber(param?.value?.value)
					} ${param?.definition?.unit}`,
					url: `${url}${paramNameUrl}${`${param?.value?.value}${paramNameUrl}${param?.value?.value}`}`,
				};
		}
	};
};

export default useSpecificationParamValue;
