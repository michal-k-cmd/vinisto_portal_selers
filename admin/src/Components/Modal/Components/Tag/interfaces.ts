import { TagModalMode } from 'Pages/TagDetail/constants';

import { VinistoHelperDllEnumsCountryCode } from '@/api-types/user-api';
import {
	VinistoHelperDllEnumsTagTagType,
	VinistoProductDllModelsApiTagTagSlugMain,
} from '@/api-types/product-api';

export interface ProductTagFormValues {
	id?: string;
	name: string;
	slugs?: VinistoProductDllModelsApiTagTagSlugMain[] | string;
	description?: string | null;
	metaDescription?: string | null;
	metaTitle?: string | null;
	color?: CmsBlogTagColor;
	validFrom?: Date | null;
	validTo?: Date | null;
	countryOfSale: VinistoHelperDllEnumsCountryCode;
	isVisibleInFilters: boolean;
	orderInFilters?: number;
	type: VinistoHelperDllEnumsTagTagType;
}

export interface CmsBlogTagColor {
	hex: string;
}

export interface TagModalData {
	id?: string;
	name?: string;
	slugs?: VinistoProductDllModelsApiTagTagSlugMain[];
	description?: string | null;
	metaDescription?: string | null;
	metaTitle?: string | null;
	color?: CmsBlogTagColor;
	validFrom?: Date | null;
	validTo?: Date | null;
	countryOfSale: VinistoHelperDllEnumsCountryCode;
	isVisibleInFilters?: boolean;
	orderInFilters?: number;
	handleClose: () => void;
	resetTagList: () => void;
	mode: TagModalMode;
	type?: VinistoHelperDllEnumsTagTagType;
}
