import { useContext } from 'react';
import { SpecificationType } from 'Services/Specification/constants';
import { LocalizationContext } from 'Services/LocalizationService';

import useLocalizedValue from '../useLocalizedValue';

import { SpecificationDetail } from './interfaces';

export const useLocalizedSpecificationValue = () => {
	const { useFormatMessage } = useContext(LocalizationContext);
	const getLocalizedValue = useLocalizedValue();
	const t = useFormatMessage();

	const localizeSpecification = (specification: SpecificationDetail) => {
		const specificationType = specification.definition.specificationType;
		const specificationValueType = specification.value.specificationType;
		if (
			specificationType === SpecificationType.COMBO_BOX &&
			// TS unable to determine correct specification.value type w/o following check
			specificationValueType === SpecificationType.COMBO_BOX
		) {
			const allowedValues = specification.definition.allowedValues;
			if (allowedValues) {
				return getLocalizedValue(
					allowedValues[specification.value.selectedValueName]?.name
				);
			}
		} else if (
			specificationType === SpecificationType.MULTI_COMBO_BOX &&
			// TS unable to determine correct specification.value type w/o following check
			specificationValueType === SpecificationType.MULTI_COMBO_BOX
		) {
			const allowedValues = specification.definition.allowedValues;
			if (allowedValues) {
				return specification.value.selectedValuesName
					.map((value) => getLocalizedValue(allowedValues[value]?.name))
					.join(', ');
			}
		} else if (
			(specificationType === SpecificationType.NUMBER ||
				specificationType === SpecificationType.NUMBER_IMPERIAL ||
				specificationType === SpecificationType.DECIMAL_NUMBER ||
				specificationType === SpecificationType.DECIMAL_NUMBER_IMPERIAL) &&
			// TS unable to determine correct specification.value type w/o following check
			(specificationValueType === SpecificationType.NUMBER ||
				specificationValueType === SpecificationType.DECIMAL_NUMBER)
		) {
			const localizedUnit = getLocalizedValue(specification.definition.unit);
			return `${specification.value.value} ${localizedUnit}`.trimEnd();
		} else if (
			(specificationType === SpecificationType.NUMBER_IMPERIAL ||
				specificationType === SpecificationType.DECIMAL_NUMBER_IMPERIAL) &&
			// TS unable to determine correct specification.value type w/o following check
			(specificationValueType === SpecificationType.NUMBER_IMPERIAL ||
				specificationValueType === SpecificationType.DECIMAL_NUMBER_IMPERIAL)
		) {
			const { value, imperialValue } = specification.value;
			const localizedUnit = getLocalizedValue(specification.definition.unit);
			const localizedImperialUnit = getLocalizedValue(
				specification.definition.imperialUnit
			);
			return `${`${value} ${localizedUnit}`.trimEnd()} | ${`${imperialValue} ${localizedImperialUnit}`.trimEnd()}`;
		} else if (
			specificationType === SpecificationType.CHECK_BOX &&
			// TS unable to determine correct specification.value type w/o following check
			specificationValueType === SpecificationType.CHECK_BOX
		) {
			return `${t({
				id: specification.value.value
					? 'specification.yes'
					: 'specification.no',
			})}`;
		} else if (
			specificationType === SpecificationType.TEXT &&
			// TS unable to determine correct specification.value type w/o following check
			specificationValueType === SpecificationType.TEXT
		) {
			return getLocalizedValue(specification.value.value);
		}
	};

	return localizeSpecification;
};
