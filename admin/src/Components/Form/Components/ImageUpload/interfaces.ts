import useImageUpload from 'Hooks/useImageUpload';
import { ImageError } from 'Hooks/useImageUpload/interfaces';

export interface FileUploadProps {
	name: string;
	handleOnUpload: ReturnType<typeof useImageUpload>['handleOnUpload'];
	imgInputRef: ReturnType<typeof useImageUpload>['imgInputRef'];
	selectedImage: ReturnType<typeof useImageUpload>['selectedImage'] | string;
	allowedTypes: string[];
	imageError: ImageError | null;
	selectLabel?: string;
	changeLabel?: string;
	label?: string | { id: string; [key: string]: any };
	labelClassname?: string;
	buttonWrapperClassname?: string;
}
