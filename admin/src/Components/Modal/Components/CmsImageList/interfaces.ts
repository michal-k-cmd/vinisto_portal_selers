import { CmsImage, CmsImageTag } from 'Services/CmsService/interfaces';

interface CmsImageListModalData {
	cmsImageTags?: CmsImageTag[];
	selectedImageId?: string;
	selectedImageUrl?: string;
	onSelect: (
		imageUrl: string,
		description: string,
		imageAltText: string,
		imageId: string
	) => void;
}

interface CmsImageListLoader {
	cmsImages?: CmsImage[];
	cmsImageTags?: CmsImageTag[];
}

export type { CmsImageListModalData, CmsImageListLoader };
