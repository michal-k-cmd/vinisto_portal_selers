export const PRODUCT_API_BASE_URI = 'product-api';

export const PRODUCT_ATTRIBUTE_TABS = [ 'Property', 'NutritionalValue', 'Composition' ] as const;

export type ProductAttributeTab = (typeof PRODUCT_ATTRIBUTE_TABS)[number];
