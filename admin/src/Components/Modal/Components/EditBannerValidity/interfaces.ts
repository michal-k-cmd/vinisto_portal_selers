import { Banner } from 'Services/Banner/interfaces';

export interface BannerFormValues
	extends Pick<Banner, 'validFrom' | 'validTo'> {
	image: FileList;
}
