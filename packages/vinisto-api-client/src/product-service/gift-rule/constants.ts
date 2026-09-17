import { VinistoHelperDllEnumsGiftGiftRuleType } from '../../api-types/product-api';

export const PRODUCT_API_BASE_URI = 'product-api';
export const GIFT_RULE_URI = `${PRODUCT_API_BASE_URI}/gift-rules`;

export const createGiftRuleEndpointMap = {
  [VinistoHelperDllEnumsGiftGiftRuleType.GIFT_ORDER_PRICE_FROM]:
    'create-order-price-gift-rule',
  [VinistoHelperDllEnumsGiftGiftRuleType.GIFT_CATEGORY]:
    'create-category-gift-rule',
  [VinistoHelperDllEnumsGiftGiftRuleType.GIFT_SUPPLIER]:
    'create-supplier-gift-rule',
  [VinistoHelperDllEnumsGiftGiftRuleType.GIFT_SPECIFICATION]:
    'create-specification-gift-rule',
};

export const updateGiftRuleEndpointMap = {
  [VinistoHelperDllEnumsGiftGiftRuleType.GIFT_ORDER_PRICE_FROM]:
    'update-order-price-gift-rule',
  [VinistoHelperDllEnumsGiftGiftRuleType.GIFT_CATEGORY]:
    'update-category-gift-rule',
  [VinistoHelperDllEnumsGiftGiftRuleType.GIFT_SUPPLIER]:
    'update-supplier-gift-rule',
  [VinistoHelperDllEnumsGiftGiftRuleType.GIFT_SPECIFICATION]:
    'update-specification-gift-rule',
};
