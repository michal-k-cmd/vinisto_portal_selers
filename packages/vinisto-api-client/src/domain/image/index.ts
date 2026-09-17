import { VinistoHelperDllEnumsImageImageObjectType } from '../../api-types/product-api';

interface Image {
	id: string;
	objectType?: VinistoHelperDllEnumsImageImageObjectType;
	objectId: string;
	isMain: boolean;
	//TODO: we could specify some domain urls - but certain objects based on objectType have different urls
	domainUrls: Record<string, string>;
}

type ImageObjectType = keyof typeof VinistoHelperDllEnumsImageImageObjectType;

export default Image;
export type { ImageObjectType };
