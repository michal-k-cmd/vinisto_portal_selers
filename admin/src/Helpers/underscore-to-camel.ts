const underscoreToCamel = (str: string) => {
	return str
		.toLowerCase()
		.replace(/_./g, (match) => match.charAt(1).toUpperCase());
};

export default underscoreToCamel;
