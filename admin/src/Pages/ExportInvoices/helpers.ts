import { dayjsInstance as dayjs } from 'Services/Date';

export const getValidDate = (date: string) => {
	if (!date) {
		return false;
	}
	const dateObject = dayjs(date);
	if (!dateObject.isValid()) {
		return false;
	}
	return dateObject;
};

export const downloadBase64Xml = (data: string | null) => {
	if (data === null) return;

	const xmlData = window.atob(data);
	const file = new Blob([xmlData], { type: 'application/xml' });
	const fileURL = URL.createObjectURL(file);

	window.open(fileURL);
};
