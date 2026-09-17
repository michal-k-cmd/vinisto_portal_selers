import useFileUpload from 'Hooks/useFileUpload';

export interface UploadFile {
	name: string;
	handleOnUpload: ReturnType<typeof useFileUpload>['handleOnUpload'];
	fileInputRef: ReturnType<typeof useFileUpload>['fileInputRef'];
	selectedFile: ReturnType<typeof useFileUpload>['selectedFile'] | string;
	allowedTypes: string[];
	fileError: string | null;
}
