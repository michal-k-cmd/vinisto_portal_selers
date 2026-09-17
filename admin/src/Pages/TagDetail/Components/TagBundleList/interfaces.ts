import { VinistoHelperDllEnumsTagTagType } from '@/api-types/product-api';
import { CountryCode } from '@/shared';

export interface TagBundleListProps {
	tagId: string;
	tagType?: VinistoHelperDllEnumsTagTagType;
	countryOfSale: CountryCode;
}
