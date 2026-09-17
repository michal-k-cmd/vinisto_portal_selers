import { ReactNode } from 'react';
import { find, get, join, map } from 'Helpers/lodash';
import { SpecificationDetail } from 'Services/Specification/interfaces';
import { SpecificationType } from 'Services/Specification/constants';

export const getSpecificationValue = (
	specification: SpecificationDetail,
	yesLabel: ReactNode,
	noLabel: ReactNode,
	activeLanguageKey: string
) => {
	const specificationType = get(specification, 'definition.specificationType');
	if (specificationType === SpecificationType.MULTI_COMBO_BOX) {
		return (
			join(
				map(
					map(get(specification, 'value.selectedValuesName'), (value: string) =>
						get(specification, `definition.allowedValues.${value}.name`)
					),
					(value) =>
						get(find(value, { language: activeLanguageKey }), 'value', '')
				),
				', '
			) ?? '-'
		);
	}
	if (specificationType === SpecificationType.COMBO_BOX) {
		return get(
			find(
				get(
					specification,
					`definition.allowedValues[${get(
						specification,
						'value.selectedValueName'
					)}].name`
				),
				{ language: activeLanguageKey }
			),
			'value',
			''
		);
	}
	if (
		specificationType === SpecificationType.NUMBER ||
		specificationType === SpecificationType.DECIMAL_NUMBER
	) {
		return `${get(specification, 'value.value')} ${get(
			find(get(specification, 'definition.unit'), {
				language: activeLanguageKey,
			}),
			'value',
			''
		)}`;
	}
	if (
		specificationType === SpecificationType.NUMBER_IMPERIAL ||
		specificationType === SpecificationType.DECIMAL_NUMBER_IMPERIAL
	) {
		return `${get(specification, 'value.value')} ${get(
			find(get(specification, 'definition.unit'), {
				language: activeLanguageKey,
			}),
			'value',
			''
		)} | ${get(specification, 'value.imperialValue', '-')} ${get(
			find(get(specification, 'definition.imperialUnit'), {
				language: activeLanguageKey,
			}),
			'value',
			''
		)}`;
	}
	if (specificationType === SpecificationType.CHECK_BOX) {
		return get(specification, 'value.value') ? yesLabel : noLabel;
	}
	if (specificationType === SpecificationType.TEXT) {
		return get(
			find(get(specification, 'value.value', []), {
				language: activeLanguageKey,
			}),
			'value',
			''
		);
	}
};
