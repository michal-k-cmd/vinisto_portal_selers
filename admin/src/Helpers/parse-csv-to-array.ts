const parseCsvToArray = (csvString: string): string[] => {
	return csvString.split(/[,|;]/).map((s) => s.trim());
};

export default parseCsvToArray;
