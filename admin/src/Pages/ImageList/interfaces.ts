import { CmsImage, CmsImageTag } from 'Services/CmsService/interfaces';

interface CmsImageListLoader {
	cmsImages?: CmsImage[];
	cmsImageTags?: CmsImageTag[];
}

export type { CmsImageListLoader };
