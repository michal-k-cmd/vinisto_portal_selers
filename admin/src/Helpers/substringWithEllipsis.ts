export const substringWithEllipsis = (
	text: string = '',
	maxLength = 16,
	ellipsis = '…'
) => {
	if (text.length <= maxLength) return text;
	return text.substring(0, maxLength) + ellipsis;
};
