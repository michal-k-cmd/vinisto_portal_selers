import { VinistoHelperDllEnumsTagTagType, VinistoProductDllModelsApiTagBaseTagSlug } from '@/api-types/product-api';
import { Dayjs } from 'dayjs';

interface ProductTag {
	id: string;
	name: string;
	description?: string | null;
	metaDescription?: string | null;
	color: string;
	isEnabled?: boolean;
	isOnHomepage?: boolean;
	isDisplayBundles?: boolean;
	isVisibleInFilters: boolean;
	orderInFilters: number | null;
	type: VinistoHelperDllEnumsTagTagType | null
	validFrom: Dayjs | null;
	validTo: Dayjs | null;
	url: string | null;
}

export default ProductTag;
