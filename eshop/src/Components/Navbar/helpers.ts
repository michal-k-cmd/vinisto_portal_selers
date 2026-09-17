export const formatPhoneNumber = (phoneNum: string) => {
	return [
		phoneNum.slice(0, 4),
		' ',
		phoneNum.slice(4, 7),
		' ',
		phoneNum.slice(7, 10),
		' ',
		phoneNum.slice(10),
	].join('');
};
