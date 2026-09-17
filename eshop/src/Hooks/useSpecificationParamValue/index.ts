import { useContext } from 'react';
import {
	SPECIFICATION_TYPE_CHECK_BOX,
	SPECIFICATION_TYPE_COMBO_BOX,
	SPECIFICATION_TYPE_MULTI_COMBO_BOX,
	SPECIFICATION_TYPE_TEXT,
} from 'pages-spa/Category/Components/CategoryBundlesWithFilters/constants';
import createFormattedDecimalNumber from 'Helpers/createFormattedDecimalNumber';
import removeDiacritics from 'Helpers/removeDiacritics';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import { LocalizationContext } from 'Services/LocalizationService';

import { SpecificationParamInput, SpecificationParamValue } from './interfaces';

const convertToUrlString = (value: string, delimiter: '+' | '-' = '-') =>
	removeDiacritics(value?.replace(/\s/g, delimiter));

const useSpecificationParamValue = () => {
	const localizationContext = useContext(LocalizationContext);

	const t = localizationContext.useFormatMessage();
	const getLocalizedValue = useLocalizedValue();
	return (param: SpecificationParamInput): SpecificationParamValue => {
		const specificationType = param?.value.specificationType;
		const url = `/${t({ id: 'routes.products.route' })}`;
		const paramNameUrl = convertToUrlString(
			`/${getLocalizedValue(param?.definition?.name)}/`,
			'+'
		);

		switch (specificationType) {
			case SPECIFICATION_TYPE_MULTI_COMBO_BOX:
				return param?.value?.selectedValuesName?.map((value: string) => {
					const paramValue = getLocalizedValue(
						param?.definition?.allowedValues?.[value]?.name
					);
					return {
						name: paramValue,
						url: `${url}${paramNameUrl}${convertToUrlString(paramValue)}`,
					};
				});
			case SPECIFICATION_TYPE_COMBO_BOX:
				return {
					name: getLocalizedValue(
						param?.definition?.allowedValues?.[param?.value?.selectedValueName]
							?.name
					),
					url: `${url}${paramNameUrl}${param.value.selectedValueName}`,
				};
			case SPECIFICATION_TYPE_CHECK_BOX:
				return {
					name: param?.value?.value
						? `${t({ id: 'category.filter.checkbox.yes' })}`
						: `${t({ id: 'category.filter.checkbox.no' })}`,
					url: `${url}${paramNameUrl}${param?.value?.value ? '1' : '0'}`,
				};
			case SPECIFICATION_TYPE_TEXT:
				return {
					name: getLocalizedValue(param?.value?.value),
					url: '',
				};
			default:
				return {
					name: `${
						Number.isInteger(param?.value?.value)
							? param?.value?.value
							: createFormattedDecimalNumber(param?.value?.value)
					} ${getLocalizedValue(param?.definition?.unit)}`,
					url: `${url}${paramNameUrl}${`${param?.value?.value}${paramNameUrl}${param?.value?.value}`}`,
				};
		}
	};
};

export default useSpecificationParamValue;
