const formatDigits = (value: number): string => {
	const stringValue = value.toString();

	const [integerPart, decimalPart] = stringValue.split('.');

	const integerPartGroups = integerPart.split(/(?=(?:...)*$)/);

	const formattedIntegerPart = integerPartGroups.join(' ');

	return decimalPart
		? `${formattedIntegerPart}.${decimalPart}`
		: formattedIntegerPart;
};

export default formatDigits;
