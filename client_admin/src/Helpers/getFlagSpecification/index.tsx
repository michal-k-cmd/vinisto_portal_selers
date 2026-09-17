import { ReactNode } from 'react';
import Flag from 'Components/Flag';

import { countries } from './constants';

const PRODUCER = 'Výrobce';

type Country = {
	key: string;
	countryCode: string;
	component: ReactNode;
};

type FlagSpecification = {
	variety: string;
	shortVariety: string;
	country?: string;
	component?: ReactNode;
};

const getFlagSpecification = (
	// TODO Use a proper type for specificationDetails (not ready ATM)
	specificationDetails: Array<Record<string, any>>
): FlagSpecification => {
	let foundCountry: Partial<Country> = {};
	const varieties: string[] = [];
	if (!specificationDetails)
		return {
			shortVariety: '',
			variety: '',
		};

	specificationDetails.forEach((specificationDetail) => {
		const definitionName = specificationDetail.definition?.name?.[0]?.value;
		const specificationType = specificationDetail.value?.specificationType;

		if (definitionName === PRODUCER) {
			if (specificationType === 'COMBO_BOX') {
				const variety =
					specificationDetail.definition?.allowedValues?.[
						specificationDetail.value?.selectedValueName
					]?.name?.[0]?.value;
				if (variety) varieties.push(variety);
			} else if (specificationType === 'MULTI_COMBO_BOX') {
				const selectedValues =
					specificationDetail.value?.selectedValuesName || [];
				selectedValues.forEach((selectedValue: string) => {
					const value =
						specificationDetail.definition?.allowedValues?.[selectedValue]
							?.name?.[0]?.value;
					if (value) varieties.push(value);
				});
			}
		}

		const selectedValueName =
			specificationDetail.value?.selectedValueName || '';
		const country = countries.find(
			(country) => country.key === selectedValueName
		);
		if (country) {
			foundCountry = {
				...country,
				component: (
					<Flag
						code={country.countryCode}
						width="24"
						className="vinisto-flag"
					/>
				),
			};
		}
	});

	return {
		...foundCountry,
		variety: varieties.join(', '),
		shortVariety: varieties.join(', '),
	};
};

type SingleFlag = {
	component?: ReactNode;
	key?: string;
	countryCode?: string;
} | null;

export const getSingleFlag = (countrySpecification?: string): SingleFlag => {
	if (!countrySpecification) return null;
	const country = countries.find((c) => c.key === countrySpecification);
	return country
		? {
				...country,
				component: (
					<Flag
						code={country.countryCode}
						width="24"
						className="vinisto-flag"
					/>
				),
		  }
		: null;
};

export const getSingleVariety = (
	varietalSpecification?: Array<Record<string, any>>
): string => {
	if (!varietalSpecification) return '';
	return varietalSpecification.map((spec) => spec.value).join(', ');
};

export const getCountryCode = (selectedValueName: string): string => {
	return (
		countries.find(({ key }) => key === selectedValueName)?.countryCode ?? ''
	);
};

export default getFlagSpecification;
