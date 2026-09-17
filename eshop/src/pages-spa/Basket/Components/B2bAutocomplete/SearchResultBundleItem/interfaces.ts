import { ProductSpecification } from 'Components/ProductBox/Components/Specifications/interfaces';
import { LangValuePair } from 'Hooks/useLocalizedValue/interfaces';

export interface SearchResultBundleItemProps {
	id: string;
	name?: LangValuePair[];
	url: LangValuePair[];
	prices: Record<PropertyKey, any>[];
	specificationDetails: ProductSpecification[];
	bundleEvaluation: Record<PropertyKey, any[]>;
	alwaysRedirectToDetail?: boolean;
	onClick?: () => void;
	images: Record<any, any>[];
	temporaryUnavailable?: boolean;
	isGift?: boolean;
	isSet: boolean;
}
