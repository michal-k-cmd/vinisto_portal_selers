import { ReactNode } from 'react';
import Flag from 'Components/Flag';

import { countriesAndTerritoriesDictionary } from './constants';

const PRODUCER = 'Výrobce';

type Country = {
	key: string;
	countryCode: string;
	component: ReactNode;
};

type FlagSpecification = {
	variety: string;
	varietyUrl: string;
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
	const varietiesUrl: string[] = [];
	if (!specificationDetails)
		return {
			shortVariety: '',
			variety: '',
			varietyUrl: '',
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
			if (specificationDetail.value?.selectedValueName)
				varietiesUrl.push(specificationDetail.value?.selectedValueName);
		}

		const selectedValueName =
			specificationDetail.value?.selectedValueName || '';

		const countryCode = getCountryCode(selectedValueName);

		if (countryCode) {
			foundCountry = {
				key: selectedValueName,
				countryCode: countryCode,
				component: (
					<Flag
						code={countryCode}
						width="19"
						height="14"
						className="vinisto-flag"
						loading="lazy"
					/>
				),
			};
		}
	});

	return {
		...foundCountry,
		variety: varieties.join(', '),
		varietyUrl: varietiesUrl.join(', '),
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
	const countryCode = getCountryCode(countrySpecification);

	return countryCode
		? {
				key: countrySpecification,
				countryCode: countryCode,
				component: (
					<Flag
						code={countryCode}
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
	const countryCode =
		countriesAndTerritoriesDictionary[
			selectedValueName as keyof typeof countriesAndTerritoriesDictionary
		];

	return countryCode || '';
};

export default getFlagSpecification;
