export const getFilenameFromPath = (filename: string) => {
	const pdfDocumentName = filename.split('/').pop();
	if (pdfDocumentName) return pdfDocumentName;

	return filename;
};
