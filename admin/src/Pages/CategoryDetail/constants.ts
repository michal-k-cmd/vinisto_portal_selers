import { ProductSelectionType } from 'Services/Category/constants';

export const PRODUCT_SELECTION_TYPE_MAP = {
	[ProductSelectionType.STATIC]:
		'admin.categoryDetail.productSelectionType.static',
	[ProductSelectionType.DYNAMIC]:
		'admin.categoryDetail.productSelectionType.dynamic',
};
