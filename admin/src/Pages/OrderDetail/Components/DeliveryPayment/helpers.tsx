import {
	VinistoHelperDllEnumsCountryCode,
	VinistoSupplierDllModelsApiAddressAddress,
} from '@/api-types/order-api';

const countryCodeToCzechName: Record<VinistoHelperDllEnumsCountryCode, string> =
	{
		[VinistoHelperDllEnumsCountryCode.CZ]: 'Česká republika',
		[VinistoHelperDllEnumsCountryCode.SK]: 'Slovensko',
		[VinistoHelperDllEnumsCountryCode.DE]: 'Německo',
		[VinistoHelperDllEnumsCountryCode.UK]: 'Spojené království',
		[VinistoHelperDllEnumsCountryCode.PL]: 'Polsko',
	};

export const composeURLEncodedAddress = (
	address: VinistoSupplierDllModelsApiAddressAddress
): string => {
	const street: string = address.street?.trim() ?? '';
	const city: string = address.city?.trim() ?? '';
	const zip: string = address.zip?.trim() ?? '';

	const houseNumber: string = address.houseNumber?.toString().trim() ?? '';
	const landRegistryNumber: string =
		address.landRegistryNumber?.toString().trim() ?? '';

	let numberSegment = '';
	if (houseNumber && landRegistryNumber) {
		numberSegment = `${houseNumber}/${landRegistryNumber}`;
	} else if (!houseNumber && landRegistryNumber) {
		numberSegment = landRegistryNumber;
	} else if (houseNumber && !landRegistryNumber) {
		numberSegment = houseNumber;
	}

	const streetSegment = numberSegment ? `${street} ${numberSegment}` : street;

	const countryName = countryCodeToCzechName[address.countryCode];

	const composed = [streetSegment, city, zip, countryName]
		.filter(Boolean)
		.join(' ')
		.replace(/\s+/g, ' ')
		.trim();

	return encodeURIComponent(composed);
};
