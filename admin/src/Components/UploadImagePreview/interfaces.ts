import useImageUpload from 'Hooks/useImageUpload';

export interface UploadImagePreviewProps
	extends ReturnType<typeof useImageUpload> {
	allowedExtensions: string[];
}
