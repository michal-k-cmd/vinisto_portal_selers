import { dayjsInstance as dayjs } from 'Services/Date';
import removeDiacritics from 'Helpers/removeDiacritics';

export const formatTime = (timeStr: string) => {
	const [hours, minutes] = timeStr.split(':');
	// TODO: Implement other formats by active language
	return dayjs()
		.hours(parseInt(hours))
		.minutes(parseInt(minutes))
		.format('H:mm');
};

export function getLocationNumbersFromStreet(street: string, city: string) {
	const streetNumbers = removeDiacritics(street)?.match(
		// Protect this regex at all costs
		// Matches:
		// Street 124
		// Street 124/56
		// Street 124/ 56
		// Street 124 /56
		// Street 124  / 56
		/(\d)+([ \t]+[/]|[/])+([ \t]+\d+|\d+)([a-zA-Z]+)?|(?![a-zA-Z]+\s)\d+/g
	);
	const landRegistryNumber = Array.isArray(streetNumbers)
		? streetNumbers[streetNumbers?.length - 1]?.split('/')?.[0] ?? ''
		: '';
	const houseNumber = Array.isArray(streetNumbers)
		? streetNumbers[streetNumbers?.length - 1]?.split('/')?.[1] ?? null
		: null;

	const formattedStreet = Array.isArray(streetNumbers)
		? street?.replace(streetNumbers[streetNumbers?.length - 1], '')?.trim()
		: street;

	return {
		landRegistryNumber,
		houseNumber,
		street: formattedStreet ? formattedStreet : city,
	};
}
export function getLocationNumbersFromDPDHouseNumber(mixedNumber: string) {
	const mixedNumbers = removeDiacritics(mixedNumber)?.match(
		// Protect this regex at all costs
		// Matches:
		// Street 124
		// Street 124/56
		// Street 124/ 56
		// Street 124 /56
		// Street 124  / 56
		/(\d)+([ \t]+[/]|[/])+([ \t]+\d+|\d+)([a-zA-Z]+)?|(?![a-zA-Z]+\s)\d+/g
	);
	const landRegistryNumber = Array.isArray(mixedNumbers)
		? mixedNumbers[mixedNumbers?.length - 1]?.split('/')?.[0] ?? ''
		: '';
	const houseNumber = Array.isArray(mixedNumbers)
		? mixedNumbers[mixedNumbers?.length - 1]?.split('/')?.[1] ?? null
		: null;

	return {
		landRegistryNumber,
		houseNumber,
	};
}
