import { Banner } from 'Services/Banner/interfaces';

export interface BannerFormValues extends Omit<Banner, 'image'> {
	image: FileList;
}

export type BannerFormErrors = {
	[K in keyof BannerFormValues]?: string;
};
