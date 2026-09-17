import type Image from '../image';
import type Price from '../price';
import type { Language, LangValuePair } from '../../shared';
import type ProductTag from '../tag';
import { ProductPrice } from '../price';
import { BundleSpecificationDetails } from '../bundle/specification-details';

type ProductFlags = 'isDeleted' | 'isEnabled' | 'isForLogged';

interface Product {
	id: string;
	name: LangValuePair[];
	url: LangValuePair[];
	description: LangValuePair[];
	text: LangValuePair[];
	prices: Price[];
	productPrices: ProductPrice;
	images?: Image[];
	flags?: Record<ProductFlags, boolean>;
	tags?: ProductTag[];
	categoryIds?: string[];
	specificationDetails?: BundleSpecificationDetails[];
	language: Language;
	warehouseId: string;
	ean?: string;
}

export default Product;
