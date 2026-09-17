import useImageUpload from 'Hooks/useImageUpload';

import { BannerFormValues } from '../interfaces';

export interface BannerPreviewProps
	extends React.HTMLAttributes<HTMLDivElement> {
	selectedImage: ReturnType<typeof useImageUpload>['selectedImage'] | string;
	values?: BannerFormValues;
	className?: string;
}
