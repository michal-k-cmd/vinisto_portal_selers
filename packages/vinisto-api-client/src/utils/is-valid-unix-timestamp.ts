const isValidUnixTimestamp = (timestamp: number): boolean => {
	const date = new Date(timestamp * 1000);
	return date.getTime() > 0 && date.getFullYear() > 1970;
};

export default isValidUnixTimestamp;
