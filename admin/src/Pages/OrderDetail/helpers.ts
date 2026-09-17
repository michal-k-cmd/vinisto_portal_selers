import {
	VinistoApplicationLogDllModelsApiApplicationLogApplicationLogReturn,
	VinistoApplicationLogDllModelsApiApplicationLogOrderApplicationLog,
	VinistoHelperDllEnumsActionLogApplicationLogType,
	VinistoHelperDllEnumsOrderOrderState,
} from 'vinisto_api_client/src/api-types/order-api';

export const getFilenameFromPath = (pdfDocumentUrl: string) => {
	const pdfDocumentName = pdfDocumentUrl.split('/').pop();
	if (pdfDocumentName) return pdfDocumentName;

	return pdfDocumentUrl;
};

export const handleCreateDownloadPdf = (data: string, documentUrl: string) => {
	const byteCharacters = window.atob(data);
	const byteNumbers = new Array(byteCharacters.length);
	for (let i = 0; i < byteCharacters.length; i += 1) {
		byteNumbers[i] = byteCharacters.charCodeAt(i);
	}
	const byteArray = new Uint8Array(byteNumbers);
	const file = new Blob([byteArray], { type: 'application/pdf;base64' });
	const fileURL = URL.createObjectURL(file);

	const link = document.createElement('a');
	link.href = fileURL;
	link.download = getFilenameFromPath(documentUrl);
	link.click();

	URL.revokeObjectURL(fileURL);
};

export type ChangeLogData = {
	changeTime: number;
	state: VinistoHelperDllEnumsActionLogApplicationLogType;
	userId?: string;
	userEmail?: string;
	emailTemplateName?: string;
	emailData?: string;
	stateChangedTo?: VinistoHelperDllEnumsOrderOrderState | null;
};

export const getOrderLogData = (
	logData: VinistoApplicationLogDllModelsApiApplicationLogApplicationLogReturn
) => {
	// we assert type cause currently swagger also defines (incorrectly) BundleApplicationLog as possible type.
	const applicationLogs = (logData?.applicationLogs ??
		[]) as VinistoApplicationLogDllModelsApiApplicationLogOrderApplicationLog[];

	const changelogData: ChangeLogData[] =
		applicationLogs.map((log) => ({
			changeTime: log.time,
			state: log.action,
			userId: log.executorUserId ?? '',
			userEmail: log.user?.email ?? '',
			emailTemplateName: log.emailTemplate ?? '',
			emailData: log.emailData ?? '',
			stateChangedTo: log.orderState || null,
		})) ?? [];

	return changelogData;
};
