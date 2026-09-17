/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface VinistoCmsDllModelsApiCmsArticleBundleItem {
  /** @minLength 1 */
  bundleId: string;
  /** @format int32 */
  order?: number;
}

export interface VinistoCmsDllModelsApiCmsArticleCmsArticle {
  /** @minLength 1 */
  id: string;
  /** Contains list of possible languages<p>Members:</p><ul><li><i>CZECH</i> - Czech language</ li > <li><i>SLOVAK</i> - Slovak language</ li > <li><i>ENGLISH</i> - English</ li > <li><i>GERMAN</i> - German</ li > </ul> */
  language?: "CZECH" | "SLOVAK" | "ENGLISH" | "GERMAN";
  tags: string[];
  specifications: (
    | VinistoCommonDllModelsApiSpecificationsComboBoxSpecification
    | VinistoCommonDllModelsApiSpecificationsDecimalNumberSpecification
    | VinistoCommonDllModelsApiSpecificationsCheckBoxSpecification
    | VinistoCommonDllModelsApiSpecificationsMultiComboBoxSpecification
    | VinistoCommonDllModelsApiSpecificationsNumberSpecification
    | VinistoCommonDllModelsApiSpecificationsStringSpecification
    | VinistoCommonDllModelsApiSpecificationsTextSpecification
  )[];
  /** @minLength 1 */
  title: string;
  /** @minLength 1 */
  perex: string;
  /** @minLength 1 */
  metaDescription: string;
  /** @minLength 1 */
  metaTitle: string;
  /** @minLength 1 */
  url: string;
  /** @format int64 */
  updatedAt?: number;
  /** @minLength 1 */
  titleImageId: string;
  /** @minLength 1 */
  body: string;
  bundles: VinistoCmsDllModelsApiCmsArticleBundleItem[];
  authors: string[];
  /** @format int32 */
  readingTime?: number;
  /** @format int32 */
  publishDate?: number;
  /** Contains list of possible article states<p>Members:</p><ul><li><i>DRAFT</i> - Draft state (Concept)</ li > <li><i>PUBLISHED</i> - Article is published</ li > </ul> */
  state?: "DRAFT" | "PUBLISHED";
  /** Contains list of possible crousel / listing type for article<p>Members:</p><ul><li><i>NONE</i> - None carousel/listing for article</ li > <li><i>CAROUSEL_SPECIFICATIONS</i> - Carousel of specifications</ li > <li><i>CAROUSEL_BUNDLES</i> - Carousel of bundles</ li > <li><i>LISTING_SPECIFICATIONS</i> - Listing of specifications</ li > <li><i>LISTING_BUNDLES</i> - Listing of bundles</ li > </ul> */
  carouselListingType?:
    | "NONE"
    | "CAROUSEL_SPECIFICATIONS"
    | "CAROUSEL_BUNDLES"
    | "LISTING_SPECIFICATIONS"
    | "LISTING_BUNDLES";
  carouselListingTitle?: string | null;
  tagDetails?: VinistoCmsDllModelsApiCmsTagCmsTag[] | null;
  authorDetails?:
    | VinistoCmsDllModelsApiCmsArticleAuthorCmsArticleAuthor[]
    | null;
  bundleDetails?: VinistoProductDllModelsApiBundleBundle[] | null;
  specificationDetails?:
    | VinistoProductDllModelsApiSpecificationSpecificationDetail[]
    | null;
  titleImageDetail?: VinistoCmsDllModelsApiCmsImageCmsImage | null;
}

export interface VinistoCmsDllModelsApiCmsArticleAuthorCmsArticleAuthor {
  /** @minLength 1 */
  id: string;
  /** @minLength 1 */
  name: string;
}

export interface VinistoCmsDllModelsApiCmsImageCmsImage {
  /** @minLength 1 */
  id: string;
  /** @minLength 1 */
  name: string;
  alternativeText?: string | null;
  description?: string | null;
  tags?: string[] | null;
  urls: Record<string, string>;
}

export interface VinistoCmsDllModelsApiCmsTagCmsTag {
  /** @minLength 1 */
  id: string;
  name: VinistoCmsDllModelsApiMultiLangValue[];
  description: VinistoCmsDllModelsApiMultiLangValue[];
  metaDescription: VinistoCmsDllModelsApiMultiLangValue[];
  metaTitle: VinistoCmsDllModelsApiMultiLangValue[];
  url: VinistoCmsDllModelsApiMultiLangValue[];
  /** @format int64 */
  createdAt?: number;
  /** @format int64 */
  articleNumber?: number;
}

export interface VinistoCmsDllModelsApiMultiLangValue {
  /** Contains list of possible languages<p>Members:</p><ul><li><i>CZECH</i> - Czech language</ li > <li><i>SLOVAK</i> - Slovak language</ li > <li><i>ENGLISH</i> - English</ li > <li><i>GERMAN</i> - German</ li > </ul> */
  language?: "CZECH" | "SLOVAK" | "ENGLISH" | "GERMAN";
  /** @minLength 1 */
  value: string;
}

export interface VinistoCommonDllModelsApiMultiLangValues {
  /** Contains list of possible languages<p>Members:</p><ul><li><i>CZECH</i> - Czech language</ li > <li><i>SLOVAK</i> - Slovak language</ li > <li><i>ENGLISH</i> - English</ li > <li><i>GERMAN</i> - German</ li > </ul> */
  language?: "CZECH" | "SLOVAK" | "ENGLISH" | "GERMAN";
  values?: string[] | null;
}

export interface VinistoCommonDllModelsApiPricesBasePrice {
  priceId?: string | null;
  /** VatRate<p>Members:</p><ul><li><i>BaseVat</i> - Base VAT level e.g. 21%</ li > <li><i>FirstReducedVat</i> - First reduced VAT level e.g. 15%</ li > <li><i>SecondReducedVat</i> - Second reduced VAT level e.g. 10%</ li > <li><i>NoVat</i> - No VAT e.g. 0%</ li > </ul> */
  vat?: "BaseVat" | "FirstReducedVat" | "SecondReducedVat" | "NoVat";
  /** Currency<p>Members:</p><ul><li><i>CZK</i> - Czech crown</ li > <li><i>EUR</i> - Euro</ li > <li><i>USD</i> - US Dollar</ li > </ul> */
  currency?: "CZK" | "EUR" | "USD";
  /** <p>Members:</p><ul></ul> */
  level?:
    | "Level1"
    | "Level2"
    | "Level3"
    | "Level4"
    | "Level5"
    | "Level6"
    | "Level7"
    | "Level8"
    | "Level9"
    | "Level10"
    | "VinistoPlus";
  /** @format int32 */
  platformId?: number;
}

export interface VinistoCommonDllModelsApiPricesPrice {
  /** @format double */
  value?: number;
  /** @format double */
  valueWithVat?: number;
  /** @format int32 */
  vatValue?: number;
  priceId?: string | null;
  /** VatRate<p>Members:</p><ul><li><i>BaseVat</i> - Base VAT level e.g. 21%</ li > <li><i>FirstReducedVat</i> - First reduced VAT level e.g. 15%</ li > <li><i>SecondReducedVat</i> - Second reduced VAT level e.g. 10%</ li > <li><i>NoVat</i> - No VAT e.g. 0%</ li > </ul> */
  vat?: "BaseVat" | "FirstReducedVat" | "SecondReducedVat" | "NoVat";
  /** Currency<p>Members:</p><ul><li><i>CZK</i> - Czech crown</ li > <li><i>EUR</i> - Euro</ li > <li><i>USD</i> - US Dollar</ li > </ul> */
  currency?: "CZK" | "EUR" | "USD";
  /** <p>Members:</p><ul></ul> */
  level?:
    | "Level1"
    | "Level2"
    | "Level3"
    | "Level4"
    | "Level5"
    | "Level6"
    | "Level7"
    | "Level8"
    | "Level9"
    | "Level10"
    | "VinistoPlus";
  /** @format int32 */
  platformId?: number;
}

export interface VinistoCommonDllModelsApiSpecificationsBaseSpecification {
  /** @minLength 1 */
  definitionId: string;
  /** Contains list of possible specification type<p>Members:</p><ul><li><i>TEXT</i> - Text specification - free text</ li > <li><i>COMBO_BOX</i> - Selected value from predefined list of values</ li > <li><i>CHECK_BOX</i> - Checkbox - true/false</ li > <li><i>NUMBER</i> - Number value specification with possible unit specification</ li > <li><i>NUMBER_IMPERIAL</i> - Number value specification with possibility to define value in both metric and imperial units</ li > <li><i>DECIMAL_NUMBER</i> - Decimal number value with possible unit specification</ li > <li><i>DECIMAL_NUMBER_IMPERIAL</i> - Decimal number value specification with possibility to define value in both metric and imperial units</ li > <li><i>MULTI_COMBO_BOX</i> - List of selected values from predefined list of values</ li > <li><i>PRICE</i> - Price specification</ li > </ul> */
  type?:
    | "TEXT"
    | "COMBO_BOX"
    | "CHECK_BOX"
    | "NUMBER"
    | "NUMBER_IMPERIAL"
    | "DECIMAL_NUMBER"
    | "DECIMAL_NUMBER_IMPERIAL"
    | "MULTI_COMBO_BOX"
    | "PRICE";
}

export type VinistoCommonDllModelsApiSpecificationsCheckBoxSpecification =
  VinistoCommonDllModelsApiSpecificationsBaseSpecification & {
    allowedValues: boolean[];
  };

export type VinistoCommonDllModelsApiSpecificationsComboBoxSpecification =
  VinistoCommonDllModelsApiSpecificationsBaseSpecification & object;

export type VinistoCommonDllModelsApiSpecificationsDecimalNumberSpecification =
  VinistoCommonDllModelsApiSpecificationsBaseSpecification & {
    isImperial?: boolean;
    allowedValues: number[];
  };

export type VinistoCommonDllModelsApiSpecificationsMultiComboBoxSpecification =
  VinistoCommonDllModelsApiSpecificationsBaseSpecification & object;

export type VinistoCommonDllModelsApiSpecificationsNumberSpecification =
  VinistoCommonDllModelsApiSpecificationsBaseSpecification & {
    isImperial?: boolean;
    allowedValues: number[];
  };

export type VinistoCommonDllModelsApiSpecificationsStringSpecification =
  VinistoCommonDllModelsApiSpecificationsBaseSpecification & {
    allowedValues: string[];
  };

export type VinistoCommonDllModelsApiSpecificationsTextSpecification =
  VinistoCommonDllModelsApiSpecificationsBaseSpecification & object;

/** Base return class containing result and error information. */
export interface VinistoHelperDllBaseBaseReturn {
  /** Has occurred any error. */
  isError?: boolean;
  /** List of errors code that occurred during the api request. */
  error?: VinistoHelperDllBaseError[] | null;
}

/** Complete Error */
export interface VinistoHelperDllBaseError {
  /** Mongo object from enum<p>Members:</p><ul><li><i>Unknown</i> - Unknown mongo object, or not mongo object at all</ li > <li><i>User</i> - User mongo object</ li > <li><i>Product</i> - Product mongo object</ li > <li><i>Category</i> - Category mongo object</ li > <li><i>CategoryHomePage</i> - Home Page Category mongo object</ li > <li><i>Bundle</i> - Bundle mongo object</ li > <li><i>Evaluation</i> - Evaluation mongo object</ li > <li><i>SpecificationDefinition</i> - Specification definition mongo object</ li > <li><i>Tag</i> - Tag mongo object</ li > <li><i>Basket</i> - Basket mongo object</ li > <li><i>Order</i> - Order mongo object</ li > <li><i>Image</i> - Image mongo object</ li > <li><i>Favorite</i> - Favorite mongo object</ li > <li><i>SpecificationValue</i> - Specification value mongo object</ li > <li><i>Delivery</i> - Delivery mongo object</ li > <li><i>DiscountCouponDefinition</i> - Discount coupon definition mongo object</ li > <li><i>Payment</i> - Payment mongo object</ li > <li><i>Supplier</i> - Supplier mongo object</ li > <li><i>WarehouseItem</i> - Warehouse item mongo object</ li > <li><i>FeeRule</i> - FeeRule item mongo object</ li > <li><i>FeeRecord</i> - FeeRecord item mongo object</ li > <li><i>Certificate</i> - Supplier certificate mongo object</ li > <li><i>OrderNumber</i> - Order number mongo object</ li > <li><i>HomePageCustomCarousel</i> - HomePageCustomCarousel mongo object</ li > <li><i>Billing</i> - Billing mongo object</ li > <li><i>BillingNumber</i> - Billing number mongo object</ li > <li><i>SliderCarousel</i> - SliderCarousel mongo object</ li > <li><i>AutomaticCoupon</i> - Automatic coupon mongo object</ li > <li><i>CmsImage</i> - CmsImage mongo object</ li > <li><i>StockingRequest</i> - StockingRequest mongo object</ li > <li><i>CmsArticle</i> - CmsArticle mongo object</ li > <li><i>CmsTag</i> - CmsTag mongo object</ li > <li><i>CmsArticleAuthor</i> - CmsArticleAuthor mongo object</ li > <li><i>GiftRule</i> - GiftRule mongo object</ li > <li><i>WarehouseChangeLog</i> - Warehouse change log mongo object</ li > <li><i>UserLog</i> - User log mongo object</ li > <li><i>SearchQuery</i> - Search query mongo object</ li > <li><i>ApplictionLog</i> - Application log</ li > </ul> */
  mongoObject?:
    | "Unknown"
    | "User"
    | "Product"
    | "Category"
    | "CategoryHomePage"
    | "Bundle"
    | "Evaluation"
    | "SpecificationDefinition"
    | "Tag"
    | "Basket"
    | "Order"
    | "Image"
    | "Favorite"
    | "SpecificationValue"
    | "Delivery"
    | "DiscountCouponDefinition"
    | "Payment"
    | "Supplier"
    | "WarehouseItem"
    | "FeeRule"
    | "FeeRecord"
    | "Certificate"
    | "OrderNumber"
    | "HomePageCustomCarousel"
    | "Billing"
    | "BillingNumber"
    | "SliderCarousel"
    | "AutomaticCoupon"
    | "CmsImage"
    | "StockingRequest"
    | "CmsArticle"
    | "CmsTag"
    | "CmsArticleAuthor"
    | "GiftRule"
    | "WarehouseChangeLog"
    | "UserLog"
    | "SearchQuery"
    | "ApplictionLog"
    | "WarehouseMovement"
    | "WarehouseBundleSnapshot"
    | "Warehouse"
    | "SupplierTag"
    | "ExchangeRate"
    | "SubscriptionVariableSymbolNumber"
    | "Subscription"
    | "VirtualCategory"
    | "Invoice"
    | "ContractWithdrawalRequest"
    | "MerchantFeeRule";
  /** General error from enum<p>Members:</p><ul><li><i>Unknown</i> - The error source is not known</ li > <li><i>SpecificError</i> - It is specific error specified in specific error field</ li > <li><i>MongoException</i> - Exception  caused by MongoDB</ li > <li><i>ObjectNotFound</i> - Requested object was not found</ li > <li><i>ObjectNotAllFound</i> - Not all requested objects were found</ li > <li><i>ObjectAlreadyExists</i> - This object is already exists</ li > <li><i>ObjectNotCreated</i> - Mongo object was not created</ li > <li><i>ObjectNotUpdated</i> - Mongo object was not updated</ li > <li><i>ObjectNotDeleted</i> - Mongo object was not deleted</ li > <li><i>ObjectPermissionError</i> - You do not have enough permissions to access the object</ li > <li><i>ObjectParametersError</i> - Not all parameters were provided</ li > <li><i>EnumLanguageError</i> - Provided language is not known</ li > <li><i>EnumCurrencyError</i> - Provided currency is not known</ li > <li><i>EnumGoPayTypeError</i> - Provided GoPay type is not known</ li > <li><i>ObjectNotActive</i> - Requested object was found, but is not enabled or is mark as deleted</ li > <li><i>EnumVatRateError</i> - Provided vat rate is not known</ li > <li><i>WarehouseNotEnoughItem</i> - There is not enough item in warehouse</ li > <li><i>WarehouseInconsistency</i> - There is inconsistency in warehouse</ li > <li><i>EnumCountryCodeError</i> - Provided country code is not known</ li > <li><i>EnumSupplierTypeError</i> - Provided supplier type is not known</ li > <li><i>NicknameAlreadyUsed</i> - Exists user with nickname;</ li > <li><i>AnyObjectNotUpdated</i> - Any mongo object was not updated</ li > <li><i>IncompatibleParametersError</i> - Provided parameters is not compatible</ li > <li><i>EnumBundleStateError</i> - Provided bundle supplier state is not known</ li > </ul> */
  generalError?:
    | "Unknown"
    | "SpecificError"
    | "MongoException"
    | "ObjectNotFound"
    | "ObjectNotAllFound"
    | "ObjectAlreadyExists"
    | "ObjectNotCreated"
    | "ObjectNotUpdated"
    | "ObjectNotDeleted"
    | "ObjectPermissionError"
    | "ObjectParametersError"
    | "EnumLanguageError"
    | "EnumCurrencyError"
    | "EnumGoPayTypeError"
    | "ObjectNotActive"
    | "EnumVatRateError"
    | "WarehouseNotEnoughItem"
    | "WarehouseInconsistency"
    | "EnumCountryCodeError"
    | "EnumSupplierTypeError"
    | "NicknameAlreadyUsed"
    | "AnyObjectNotUpdated"
    | "IncompatibleParametersError"
    | "EnumBundleStateError";
  /** Specific error from enum */
  specificError?:
    | "API_KEY_NOT_FOUND"
    | "PLATFORM_ID_NOT_FOUND"
    | "WS_ID_NOT_PROVIDED"
    | "INVALID_TIME_RANGE"
    | "INVALID_TIMESTAMP"
    | "USER_DOES_NOT_EXIST"
    | "USER_AUTH_ERROR"
    | "USER_LOGIN_ERROR"
    | "USER_REGISTER_ERROR_USER_EXIST"
    | "USER_REGISTER_ERROR_AGREEMENT_CC"
    | "USER_WRONG_OLD_PASS"
    | "USER_WRONG_HASH"
    | "USER_WRONG_EMAIL"
    | "USER_ADDRESS_NOT_FOUND"
    | "USER_ADDRESSES_NOT_FOUND"
    | "USER_UPDATE_LOG_ERROR"
    | "USER_CREATE_EMAIL_VERIFICATION_HASH_ERROR"
    | "USER_RESET_PASSWORD_HASH_ERROR"
    | "USER_UPDATE_USER_EMAIL_EXIST"
    | "USER_EMAIL_SENT_ERROR"
    | "USER_BILLING_INFO_NOT_FOUND"
    | "USER_BILLING_INFOS_NOT_FOUND"
    | "USER_INVOICE_GET_ERROR"
    | "USER_PERMISSION_IMPORT_ERROR"
    | "USER_LOGIN_HASH_NOT_PROVIDED_FOR_B2C"
    | "API_KEY_NOT_PROVIDED_FOR_EXTERNAL_PLATFORM"
    | "USER_LOGIN_ERROR_HAS_THIRD_PARTY_TOKEN"
    | "EXTERNAL_APP_TYPE_EMPTY"
    | "USER_ALREADY_HAS_DEFAULT_ADDRESS"
    | "MERCHANT_FEE_PERCENTAGE_LESS_THEN_ZERO"
    | "MERCHANT_IS_ASSIGNED_TO_COMPANY_WHICH_HAS_NOT_OTHER_MERCHANTS"
    | "MERCHANT_ID_NOT_FOUND"
    | "INVOICE_DUE_DATE_LESS_OR_EQUALS_ZERO"
    | "MONTHLY_TURNOVER_LESS_OR_EQUALS_ZERO"
    | "ORDERING_FREQUENCY_LESS_OR_EQUALS_ZERO"
    | "CREDIT_LESS_OR_EQUALS_ZERO"
    | "USER_LOGIN_HASH_NOT_PROVIDED"
    | "ICO_NOT_PROVIDED"
    | "COMPANY_OR_MERCHANT_CANNOT_HAS_CSO_OR_B2B_ORDERS_CREATE_RIGHT"
    | "COMPANY_CANNOT_PAY_BY_CREDIT"
    | "USER_NOT_FOUND"
    | "USER_IS_NOT_MERCHANT"
    | "PRODUCT_PRICE_DOES_NOT_EXIST_IN_CURRENCY"
    | "PRODUCT_NAME_DOES_NOT_EXIST_IN_LANG"
    | "CATEGORY_BUNDLES_COUNT_NOT_COUNTED"
    | "SPECIFICATION_ALLOWED_VALUES_EMPTY"
    | "CATEGORY_URL_OR_META_EMPTY"
    | "VIRTUAL_CATEGORY_NECESSARRY_PROPERTIES_EMPTY"
    | "BUNDLE_PRICE_DOES_NOT_EXIST_IN_CURRENCY"
    | "BUNDLE_NAME_DOES_NOT_EXIST_IN_LANG"
    | "BUNDLE_IS_SAME_AS_ALT_BUNDLE"
    | "BUNDLE_IS_NOT_ENABLED_OR_IS_DELETED"
    | "BUNDLE_IS_NOT_ENABLED_OR_IS_DELETED_OR_IS_FOR_LOGGED_USERS_OR_IS_NOT_ALLOWED_TO_SALE_IN_COUNTRY"
    | "BUNDLE_TAG_SYSTEM_TYPE_CANT_BE_REMOVED"
    | "DISCOUNT_PERCENTAGE_LOWER_THAN_LIMIT"
    | "DISCOUNT_PERCENTAGE_HIGHER_THAN_LIMIT"
    | "DISCOUNT_PERCENTAGE_LOWER_THAN_MINIMAL_SALE_FEE"
    | "DISCOUNT_CREATE_BUNDLE_HAS_NOT_SET_SUPPLIER"
    | "DISCOUNT_BUNDLE_HAS_NOT_BASE_PRICE"
    | "DISCOUNT_PRICE_CREATED_TO_THE_FUTURE"
    | "DISCOUNT_PRICE_TIME_FROM_GREATER"
    | "DISCOUNT_CURRENCY_NOT_EXISTS"
    | "BUNDLE_HAS_ACTIVE_DISCOUNT_PRICE"
    | "BUNDLE_MUST_CONTAIN_AT_LEAST_ONE_PRICE"
    | "PRODUCT_CANNOT_BE_DELETED"
    | "ORDER_LIMITATION_TIME_FROM_GREATER"
    | "ORDER_LIMITATION_CREATED_TO_THE_FUTURE"
    | "QUANTITY_SET_TO_ORDER_LIMITATION"
    | "ORDER_LIMITATION_EXCEEDED"
    | "BUNDLE_IS_NOT_SET"
    | "BUNDLE_IS_SET"
    | "BUNDLE_SET_PRICE_CANNOT_BE_CHANGED"
    | "BUNDLE_SUPPLIER_IS_NULL_OR_EMPTY"
    | "BUNDLE_SET_PRICE_HIGHER_STANDARD_PRICE"
    | "DEFINED_PRICE_TYPE_FOR_NON_B2B_REQUEST"
    | "NOT_DEFINED_PRICE_TYPE_FOR_B2B_REQUEST"
    | "UNSUPPORTED_PRICE_TYPE_FOR_EXTERNAL_PLATFORM_REQUEST"
    | "UNSUPPORTED_PRICE_TYPE_FOR_B2C_REQUEST"
    | "UNSUPPORTED_PRICE_TYPE"
    | "BUNDLE_IS_NOT_ALLOWED_FOR_PROVIDED_PLATFORM"
    | "BUNDLE_NO_PRICE_DEFINED"
    | "BUNDLE_PRICE_DOES_NOT_EXIST"
    | "BUNDLE_NOT_CONFIRMERD_COULD_NOT_SET_ENABLED"
    | "PRICE_NOT_DEFINED"
    | "PRICE_DEFINED"
    | "BUNDLE_AVAILABLE_ON_PLATFORMS_IS_EMPTY"
    | "BUNDLE_IS_NOT_ALLOWED_FOR_EXTERNAL_PLATFORM"
    | "BUNDLE_IS_NOT_ALLOWED_FOR_B2B"
    | "SPECIFICATION_DEFINITION_NOT_REQUIRED_SUBTYPE"
    | "SPECIFICATION_DEFINITION_ALLOWED_VALUE_NAME_NOT_FOUND"
    | "SPECIFICATION_IS_NOT_ALLOWED_TO_ADD_IMAGE"
    | "SPECIFICATION_ALLOWED_VALUE_KEY_EMPTY"
    | "SPECIFICATION_ALLOWED_VALUE_NAME_EMPTY"
    | "BASKET_DOES_NOT_HAVE_CURRENCY"
    | "BASKET_IS_EMPTY"
    | "BASKET_IS_NOT_APPROVED"
    | "ORDER_FLEXIBEE_PRICE_ITEM_CREATE_ERROR"
    | "ORDER_FLEXIBEE_INVOICE_ITEM_CREATE_ERROR"
    | "ORDER_FLEXIBEE_INVOICE_CREATE_ERROR"
    | "ORDER_FLEXIBEE_INVOICE_PDF_GENERATION_ERROR"
    | "ORDER_FLEXIBEE_INVOICE_PDF_STORE_ERROR"
    | "ORDER_FLEXIBEE_INVOICE_GET_ERROR"
    | "ORDER_FLEXIBEE_DELIVERY_CREATE_ERROR"
    | "ORDER_FLEXIBEE_PAYMENT_CREATE_ERROR"
    | "ORDER_FLEXIBEE_STORAGE_CARD_CREATE_ERROR"
    | "ORDER_FLEXIBEE_STOCK_MOVEMENT_CREATE_ERROR"
    | "ORDER_BILLING_ADDRESSESB_BOTH_NULL"
    | "ORDER_BILLING_ADDRESSES_BOTH_NOT_NULL"
    | "DISCOUNT_COUPON_INVALID_CURRENCY"
    | "DISCOUNT_COUPON_BELOW_ORDER_PRICE_LIMIT"
    | "DISCOUNT_COUPON_NO_LONGER_ACTIVE"
    | "DISCOUNT_COUPON_IS_USED_IN_ANOTHER_ORDER"
    | "DISCOUNT_COUPON_IS_OUT_OF_EXPIRATION"
    | "DISCOUNT_COUPON_IS_SCHEDULED"
    | "ORDER_CREATE_ITEM_PRODUCT_DATA_BROKEN"
    | "ORDER_CREATE_ITEM_BUNDLE_PRICE"
    | "ORDER_HAS_NOT_ORDER_NUMBER"
    | "ORDER_QR_CODE_NOT_GENERATED"
    | "ORDER_COULD_NOT_BE_CANCELLED"
    | "ORDER_COULD_NOT_BE_EDIT_ADDRESSES"
    | "DELIVERY_COSTS_LESS_ZERO"
    | "DELIVERY_NOT_SERVING_ZIP"
    | "ORDER_UNKNOWN_ORDER_STATE"
    | "ITEMS_DOES_NOT_MATCH_DISCOUNT_COUPON_LIMITATION_REQUIREMENTS"
    | "DISCOUNT_COUPON_SUPPLIER_CREATION_INSUFFICIENT_TIME_SPAN"
    | "DISCOUNT_COUPON_PERCENTAGE_VALUE_INVALD"
    | "DISCOUNT_COUPON_AMOUNT_VALUE_INVALD"
    | "DISCOUNT_COUPON_AMOUNT_VALUE_HIGHER_THEN_ALLOWD_FROM"
    | "DISCOUNT_COUPON_PRICE_HIGHER_DISCOUNTED_PRODUCTS_PRICE"
    | "DISCOUNT_COUPON_CREATED_BY_SUPPLIER_MUST_BE_VISIBLE_ON_PRODUCT_DETAIL"
    | "DELIVERY_ALTERNATIVE_NAME_MUST_NOT_BE_NULL_OR_EMPTY"
    | "DISCOUNT_COUPON_ACTIVE_CODE_ALREADY_EXISTS"
    | "DISCOUNT_COUPON_IS_NOT_COMBINABLE"
    | "DISCOUNT_COUPON_IS_NOT_FOR_DISCOUNTED_ITEMS"
    | "DISCOUNT_COUPON_ID_IS_ALREADY_IN_BASKET"
    | "ORDER_STATE_COULD_NOT_BE_CHANGED_TO_IN_WMS"
    | "ORDER_REFUND_FAIL_NOT_IN_STATE_REVERT_FINANCE_AND_FEES"
    | "ORDER_CREDIT_NOTE_ALREADY_EXISTS"
    | "ORDER_INVOICE_DOES_NOT_EXISTS"
    | "ORDER_CREDIT_NOTE_CREATION_ERROR"
    | "ORDER_CREDIT_NOTE_DICTIONARY_CREATION_ERROR"
    | "ORDER_CREDIT_NOTE_PDF_CREATION_ERROR"
    | "ORDER_ALREADY_CANCELLED"
    | "ORDER_NOT_PAID"
    | "DISCOUNT_COUPON_NOT_APPLICABLE_IN_COUNTRY"
    | "NO_LIMITATION_DEFINITION"
    | "DISCOUNT_COUPON_IS_FOR_REGISTERED_USERS_ONLY"
    | "DISCOUNT_COUPON_HAS_NOT_NAME_OR_DESCRIPTION"
    | "DISCOUNT_COUPON_IS_LIMITED_TO_CATEGORY"
    | "DISCOUNT_COUPON_IS_NOT_REUSABLE"
    | "FEE_RULE_IS_ACTIVE_OR_ENDING_SOON"
    | "FEE_RULE_CREATE_STATE_NOT_ALLOWED"
    | "FEE_RULE_EMPTY_FEE_VALUES"
    | "FEE_RULE_VALID_FROM_IS_HIGHER_THEN_VALID_TO"
    | "FEE_RULE_BUNDLE_PRICE_FROM_IS_HIGHER_THEN_BUNDLE_PRICE_TO"
    | "FEE_RULE_BUNDLE_AMOUNT_FROM_IS_HIGHER_THEN_BUNDLE_AMOUNT_TO"
    | "FEE_RULE_INVALID_TURNOVER"
    | "FEE_RULE_COULD_NOT_SET_STATE"
    | "FEE_RULE_EDIT_STATE_NOT_ALLOWED"
    | "FEE_RULE_OVERLAPPING_LOGISTIC_CONDITION"
    | "FEE_RULE_TYPE_NOT_ALLOWED"
    | "ANY_BUNDLES_NOT_MATCHING_FEE_RULES"
    | "FEE_RULE_MAIN_CONDITIONS_NULL"
    | "FEE_RULE_FOUND_FOR_ITEM"
    | "FEE_RULE_COULD_NOT_ACTIVATE_BECAUSE_IS_IN_PAST"
    | "FEE_RULE_SPECIFICATIONS_CONTAINS_NULL"
    | "FEE_RULE_BUNDLES_CONTAINS_NULL"
    | "FEE_RULE_TAGS_CONTAINS_NULL"
    | "FEE_RULE_SUPPLIERS_CONTAINS_NULL"
    | "FEE_RULE_CATEGORIES_CONTAINS_NULL"
    | "BASKET_OWNER_IS_NOT_LOGGED_USER"
    | "BASKET_OWNER_IS_NOT_SUPPORT_OR_MERCHANT_COULD_NOT_CREATE_ORDER_FOR_COMPANY"
    | "COMPANY_IS_NOT_ACTIVE"
    | "DISCOUNT_COUPON_LIMITATION_NOT_PROVIDED"
    | "FEE_LESS_THEN_ZERO"
    | "IMAGE_FILE_TYPE_NOT_SUPPORTED_ERROR"
    | "IMAGE_STORE_FILES_ERROR"
    | "SUPPLIER_DOES_NOT_EXIST"
    | "SUPPLIER_ADDRESS_NOT_FOUND"
    | "SUPPLIER_ADDRESSES_NOT_FOUND"
    | "SUPPLIER_DELETE_HAS_BUNDLE"
    | "SUPPLIER_ADD_CERTIFICATE"
    | "SUPPLIER_DELETE_CERTIFICATE"
    | "STOCKING_REQUEST_MODIFIED_BUNDLE_NOT_OWNED_BY_SUPPLIER"
    | "STOCKING_REQUEST_ADD_RECEIPT"
    | "STOCKING_REQUEST_ALREADY_SENT"
    | "STOCKING_REQUEST_DELIVERY_DATE_NOT_FUTURE"
    | "STOCKING_REQUEST_DELIVERY_TYPE_NOT_VINISTO"
    | "STOCKING_REQUEST_CANNOT_BE_SENT_CREATED_WITHOUT_BUNDLES"
    | "STOCKING_REQUEST_ALREADY_CONFIRMED"
    | "STOCKING_REQUEST_CAN_BE_CONFIRMED_IN_STATE_SENT"
    | "STOCKING_REQUEST_CANCEL_MUST_BE_IN_STATE_SENT"
    | "STOCKING_REQUEST_CANNOT_BE_CANCELED_IS_IN_STATE_WMS_DELIVERED"
    | "STOCKING_REQUEST_ALREADY_CANCELED"
    | "STOCKING_REQUEST_BUNDLE_CANNOT_BE_MODIFIED_IS_IN_STATE_WMS_DELIVERED"
    | "STOCKING_REQUEST_ALREADY_WMS_STOCKED"
    | "STOCKING_REQUEST_CANNOT_BE_WMS_STOCKED_MUST_BE_IN_STATE_WMS_DELIVERED"
    | "STOCKING_REQUEST_CANNOT_BE_DELIVERY_ORDER_MUST_BE_IN_STATE_CONFRIMED"
    | "STOCKING_REQUEST_CANNOT_BE_DELIVERY_ORDER_IS_IN_STATE_WMS_DELIVERED"
    | "STOCKING_REQUEST_CAN_BE_DELETED_TO_SENT_STATE"
    | "STOCKING_REQUEST_ALREADY_WMS_DELIVERED"
    | "STOCKING_REQUEST_NOT_BUNDLE_WITH_ONE_PRODUCT"
    | "STOCKING_REQUEST_INVALID_DELIVERY_INTERVAL"
    | "STOCKING_REQUEST_WMS_CANNOT_BE_UPDATED_MUST_BE_IN_STATE_CONFRIMED"
    | "STOCKING_REQUEST_WMS_CANNOT_BE_UPDATED_IS_IN_STATE_WMS_DELIVERED"
    | "STOCKING_REQUEST_HAS_NOT_STATE_SENT_WMS"
    | "STOCKING_REQUEST_MUST_BE_IN_STATE_SENT"
    | "SUPPLIER_COUPON_PREFIX_EXIST"
    | "SUPPLIER_UPDATE_COUPON_PREFIX_EXIST"
    | "EXTERNAL_ORDER_ID_EMPTY"
    | "APP_TYPE_MUST_NOT_BE_B2C"
    | "GOPAY_PAYMENT_CREATION_ERROR"
    | "GOPAY_PAYMENT_STATUS_ERROR"
    | "GOPAY_PAYMENT_REFUND_ERROR"
    | "GOPAY_PAYMENT_MATCHING_ORDER_GOPAY_ID_ERROR"
    | "GOPAY_CARD_INFO_ERROR"
    | "GOPAY_PAYMENT_EXECUTION_ERROR"
    | "CAROUSEL_AVAILABLE_TO_NOT_FUTURE"
    | "CAROUSEL_AVAILABLE_FROM_UNDEFINED"
    | "CAROUSEL_POSITION_UNDEFINED"
    | "CAROUSEL_URL_UNDEFINED"
    | "CAROUSEL_TYPE_UNDEFINED"
    | "CAROUSEL_AVAILABLE_FROM_GREATHER_AVAILABLE_TO"
    | "CAROUSEL_IMAGE_DELETE"
    | "ARTICLE_NO_AUTHORS"
    | "ARTICLE_NOT_ALL_AUTHORS_FOUND"
    | "ARTICLE_NOT_ALL_TAGS_FOUND"
    | "ARTICLE_NOT_FOUND_SPECIFICATIONS"
    | "ARTICLE_NO_TITLE"
    | "ARTICLE_NO_URL"
    | "AUTOMATIC_COUPON_NAME_EMPTY"
    | "AUTOMATIC_COUPON_DICSOUNT_VALUE_LESS_ZERO"
    | "AUTOMATIC_COUPON_EXPIRATION_DAYS_LESS_ZERO"
    | "AUTOMATIC_COUPON_MIN_ORDER_PRICE_LESS_ZERO"
    | "AUTOMATIC_COUPON_MAX_ORDER_PRICE_LESS_ZERO"
    | "AUTOMATIC_COUPON_MIN_ORDER_PRICE_NULL"
    | "AUTOMATIC_COUPON_MAX_ORDER_PRICE_NULL"
    | "AUTOMATIC_COUPON_MAX_ORDER_PRICE_LESS_MIN_ORDER_PRICE"
    | "AUTOMATIC_COUPON_TRIGGER_DELAY_LESS_ZERO"
    | "CHANGE_REASON_NOT_ALLOWED_FOR_ADDING"
    | "CHANGE_REASON_NOT_ALLOWED_FOR_REMOVING"
    | "GIFT_RULE_LIMIT_FROM_IS_NULL"
    | "GIFT_RULE_VALID_TO_LESS_VALID_FROM"
    | "GIFT_RULE_APPLICABLE_FROM_LESS_ONE"
    | "GIFT_RULE_PRICE_TO_LESS_PRICE_FROM"
    | "STOCKING_REQUEST_BUNDLE_WITH_CLEARANCE_SALE"
    | "SYSTEM_TAG_MANIPULATION"
    | null;
  /** Text of error message */
  message?: string | null;
}

/** Represents image in various sizes, which is assigned to an object (product, category, bundle..). */
export interface VinistoImageDllModelsApiImageImage {
  /** Id of the object the image is assigned to */
  objectId?: string | null;
  /**
   * Set of urls pointing to individual image versions of this image
   * Key - name of the image version/size
   * Value - url of the image location
   */
  domainUrls?: Record<string, string>;
  /** Id */
  id?: string | null;
  /** Identifies object type to which an image is assigned */
  objectType?:
    | "Product"
    | "Bundle"
    | "Category"
    | "Supplier"
    | "CarouselTop"
    | "CarouselBottom"
    | "CarouselProductDetail"
    | "Payment"
    | "HP_USP"
    | "ProductDetailUSP"
    | "SpecificationDefinition"
    | "SpecificationValue"
    | "Icon"
    | "CarouselProductList"
    | "DiscountCoupon";
  /** True in case the image is the main */
  isMain?: boolean;
}

/** Represents bundle */
export interface VinistoProductDllModelsApiBundleBundle {
  /**
   * Id of the bundle
   * @minLength 1
   */
  id: string;
  /** Name of the bundle - list containing language versions */
  name: VinistoProductDllModelsApiMultiLangValue[];
  /** Description of the bundle - list containing language versions */
  description: VinistoProductDllModelsApiMultiLangValue[];
  /** Meta Description (first 160 description characters) of the bundle - list containing language versions */
  metaDescription: VinistoProductDllModelsApiMultiLangValue[];
  /** Short description of the bundle - list containing language versions */
  shortDescription: VinistoProductDllModelsApiMultiLangValue[];
  /** Long text of the bundle - list containing language versions */
  text: VinistoProductDllModelsApiMultiLangValue[];
  /** Url of the bundle - list containing language versions */
  url: VinistoProductDllModelsApiMultiLangValue[];
  /** Price of the bundle - list containing various currency. */
  prices: VinistoCommonDllModelsApiPricesPrice[];
  /**
   * Lowest known price for this bundle on the internet.
   * @format double
   */
  lowestInternetPrice?: number | null;
  /** Possible price discounts for this bundle. */
  priceDiscounts?: VinistoCommonDllModelsApiPricesBasePrice[] | null;
  /** Item of the bundle - list containing various product_id and amount. */
  items: VinistoProductDllModelsApiBundleItemsBaseItem[];
  /** Images of the bundle */
  images: VinistoImageDllModelsApiImageImage[];
  /** Enabled flag - true if bundle enabled. */
  isEnabled?: boolean;
  /** Deleted flag - true if bundle deleted. */
  isDeleted?: boolean;
  /** Tags - list containing tags for this bundle. */
  tags: VinistoProductDllModelsApiBundleTag[];
  /** Tags of the bundles - list containing tag data as Tag object. */
  tagsDetail: VinistoProductDllModelsApiTagTag[];
  /** Category of the products - list containing categories id as string. */
  categories: string[];
  /** Category of the products - list containing categories data as Category object */
  categoriesDetail: VinistoProductDllModelsApiCategoryCategory[];
  /** Lang for Tags */
  language?: "CZECH" | "SLOVAK" | "ENGLISH" | "GERMAN" | null;
  /** Alternative bundles - list containing bundle id as string. */
  alternativeBundles: string[];
  /** Alternative bundles - list containing bundle id as string. */
  alternativeBundleObjects?: VinistoProductDllModelsApiBundleBundle[] | null;
  /** Specifications - list containing specifications id and value as list. */
  specificationDetails: VinistoProductDllModelsApiSpecificationSpecificationDetail[];
  /** Product of the bundles - list containing product data as Tag object. */
  productsDetail: VinistoProductDllModelsApiProductProduct[];
  /** Supplier - supplier id as string */
  supplierId?: string | null;
  /** Represents a supplier model provided in api. */
  supplier?: VinistoSupplierDllModelsApiSupplierSupplier | null;
  /**
   * Count of available bundles in warehouse
   * @format int32
   */
  availableCount?: number;
  /** Delivery flag - true if for bundle is delivery free. */
  isDeliveryFree?: boolean;
  /** Average evaluation and all evaluations for bundle */
  bundleEvaluation?: VinistoProductDllModelsApiBundleBundleEvaluation | null;
  /**
   * Finish scoring bundle - Calculated score (ScoringAdmin + ScoringDiscount) * ScoringWarehouse
   * @format int32
   */
  scoring?: number;
  /**
   * Warehouse scoring bundle (values: 0 - not in warehouse, 1 - is in warehouse)
   * @format int32
   */
  scoringWarehouse?: number;
  /**
   * Discount scoring bundle (values: 0 - no discount, 20 - has discount)
   * @format int32
   */
  scoringDiscount?: number;
  /**
   * Admin scoring bundle (range 0-50)
   * @format int32
   */
  scoringAdmin?: number;
  /** Flag to mark bundle as only for logged users */
  isForLogged?: boolean;
  /** Flag to mark bundle as temporary unavailable */
  temporaryUnavailable?: boolean;
  /** Flag to mark bundle as Gift */
  isGift?: boolean;
  /** Flag to mark bundle as Clearance sale */
  isClearanceSale?: boolean;
  /** Get all bundle flags grouped in one collection */
  flags: Record<string, boolean>;
  /** Object that limits number of pieces bundle per one order in time range */
  orderLimitation?: VinistoProductDllModelsApiBundleOrderLimitation | null;
  /** Keywords */
  keywords?: VinistoCommonDllModelsApiMultiLangValues[] | null;
  /** Flag to specify bundle with one product or with set of products */
  isSet?: boolean;
  /** If bundle is set, then here are definitions of all bundle items in set */
  setBundles?: VinistoProductDllModelsApiBundleBundle[] | null;
  /** CanSendToWms flag - false if bundle is intangible goods. */
  canSendToWms?: boolean;
  /** Flag to set bundle state sale is over */
  isSaleOver?: boolean;
  /**
   * Number of pieces per package
   * @format int32
   */
  piecesPerPackage?: number | null;
  /**
   * Number of packages on pallet
   * @format int32
   */
  packagesOnPallet?: number | null;
  /** Allowed country codes */
  allowedCountries?: ("CZ" | "SK" | "DE" | "UK" | "PL")[] | null;
  /** <p>Members:</p><ul></ul> */
  setType?:
    | "None"
    | "OnePlusOneFree"
    | "TwoPlusOneFree"
    | "ThreePlusThreeFree"
    | "FourPlusTwoFree"
    | "FivePlusOneFree"
    | "Six10Percentage";
  states?: ("Concept" | "ToConfirm" | "Confirmed" | "Rejected")[] | null;
  /** IsApproved flag - false if bundle is not approve. */
  isApproved?: boolean;
  warehouseId?: string[] | null;
  /** Bundle is available on these platforms */
  availableOnPlatforms?: number[] | null;
}

/** Represents data about average evaluation and all evaluations for bundle */
export interface VinistoProductDllModelsApiBundleBundleEvaluation {
  /**
   * Average evaluation in stars. Rounded to number, for example 7
   * @format int32
   */
  averageStars?: number | null;
  /**
   * Average evaluation in start. Real evaluation, for example 3.6
   * @format float
   */
  averageStarsDecimal?: number | null;
  /**
   * Average sweet or dry level in evaluation
   * @format float
   */
  averageSweetDry?: number | null;
  /**
   * Average light or heavy level in evaluation
   * @format float
   */
  averageLightHeavy?: number | null;
  /**
   * Average fruit or tanic level in evaluation
   * @format float
   */
  averageFruitTannic?: number | null;
  /**
   * Average low or high accidity level in evaluation
   * @format float
   */
  averageLowHighAccidity?: number | null;
  /**
   * Total evaluations count
   * @format int32
   */
  totalEvaluationCount?: number | null;
  /** Evaluations count for star category */
  starCategoryEvaluationCount?: Record<string, number>;
}

/** Represents base item object to specify bundle items by his type. */
export interface VinistoProductDllModelsApiBundleItemsBaseItem {
  itemId?: string | null;
  /** @format int32 */
  amount?: number;
}

/** Represents OrderLimitation object containing Limit, ValidFrom and ValidTo */
export interface VinistoProductDllModelsApiBundleOrderLimitation {
  /**
   * Maximum number of bundles in one order
   * @format int32
   */
  limit?: number;
  /**
   * Limit is valid from
   * @format int32
   */
  validFrom?: number;
  /**
   * Limit is valid to
   * @format int32
   */
  validTo?: number | null;
}

export interface VinistoProductDllModelsApiBundleTag {
  /** Tag id for bundle. */
  tagId?: string | null;
  /** Allowed tag countries of sale for current bundle. */
  countriesOfSale?: ("CZ" | "SK" | "DE" | "UK" | "PL")[] | null;
}

/** Represents category of a product. */
export interface VinistoProductDllModelsApiCategoryCategory {
  /**
   * Id of the category.
   * @minLength 1
   */
  id: string;
  /** Name of the category - list containing language versions. */
  name: VinistoProductDllModelsApiMultiLangValue[];
  /** Description of the category - list containing language versions. */
  description: VinistoProductDllModelsApiMultiLangValue[];
  /** Url to category - list containing language versions. */
  url: VinistoProductDllModelsApiMultiLangValue[];
  /** Images of the category. */
  images: VinistoImageDllModelsApiImageImage[];
  /** Category type = STATIC / DYNAMIC. */
  type?: "STATIC" | "DYNAMIC";
  /** Specifications - list containing specifications id and value as list. */
  specificationDetails: VinistoProductDllModelsApiSpecificationSpecificationDetail[];
  /** Meta Description (first 160 description characters) of the category - list containing language versions. */
  metaDescription: VinistoProductDllModelsApiMultiLangValue[];
  /** Meta Title of the category - list containing language versions. */
  metaTitle: VinistoProductDllModelsApiMultiLangValue[];
  /** Keywords. */
  keywords?: VinistoCommonDllModelsApiMultiLangValues[] | null;
  /**
   * Country codes for which this category is allowed to be searched in elasticsearch.
   * VWA-2486
   */
  allowedSearchCountries?: ("CZ" | "SK" | "DE" | "UK" | "PL")[] | null;
  /** Id of the category parent. */
  parentId?: string | null;
  /** Id of the category parent. */
  breadcrumbs?:
    | VinistoProductDllModelsApiCategoryCategoryBreadcrumbItem[]
    | null;
  /** Tags. */
  tags?: VinistoProductDllModelsApiCategoryTag[] | null;
  /** Detail of the tags. */
  tagsDetail?: VinistoProductDllModelsApiTagTag[] | null;
  /** Suppliers. */
  suppliers?: string[] | null;
  /** Detail of the suppliers. */
  suppliersDetail?: VinistoSupplierDllModelsApiSupplierSupplier[] | null;
  /** Category is available on these platforms. */
  availableOnPlatforms?: number[] | null;
  /** Discount filter applied by default when listing bundles in this category. */
  bundleDiscountFilter?: "ALL" | "DISCOUNTED_ONLY" | "NON_DISCOUNTED_ONLY";
}

/** Represents category item in breadcrumbs */
export interface VinistoProductDllModelsApiCategoryCategoryBreadcrumbItem {
  /** @minLength 1 */
  id: string;
  name: VinistoProductDllModelsApiMultiLangValue[];
  url: VinistoProductDllModelsApiMultiLangValue[];
}

/** Represents Tag of a category. */
export interface VinistoProductDllModelsApiCategoryTag {
  /** Tag id for category. */
  tagId?: string | null;
  /** Allowed tag countries of sale for current category. */
  countriesOfSale?: ("CZ" | "SK" | "DE" | "UK" | "PL")[] | null;
}

/** Class for objects which required to store value in various languages. */
export interface VinistoProductDllModelsApiMultiLangValue {
  /** Language of the value */
  language?: "CZECH" | "SLOVAK" | "ENGLISH" | "GERMAN";
  /**
   * Value
   * @minLength 1
   */
  value: string;
}

/** Represents product. */
export interface VinistoProductDllModelsApiProductProduct {
  /**
   * Id of the product
   * @minLength 1
   */
  id: string;
  /** Url of the product - list containing language versions */
  url: VinistoProductDllModelsApiMultiLangValue[];
  /** Name of the product - list containing language versions */
  name: VinistoProductDllModelsApiMultiLangValue[];
  /** Description of the product - list containing language versions */
  description: VinistoProductDllModelsApiMultiLangValue[];
  /** Long text of the product - list containing language versions */
  text: VinistoProductDllModelsApiMultiLangValue[];
  /** Price of the bundle - list containing various currency. */
  prices: VinistoCommonDllModelsApiPricesPrice[];
  /** Images of the product */
  images: VinistoImageDllModelsApiImageImage[];
  /** Enabled flag - true if product enabled. */
  isEnabled?: boolean;
  /** Deleted flag - true if product deleted. */
  isDeleted?: boolean;
  /** Category of the products - list containing categories id as string. */
  categories: string[];
  /** Tags - list containing tags for this product. */
  tags: VinistoProductDllModelsApiProductTag[];
  /** Tags of the products - list containing tag data as Tag object. */
  tagsDetail: VinistoProductDllModelsApiTagTag[];
  /** Specifications - list containing specifications id and value as list. */
  specificationDetails: VinistoProductDllModelsApiSpecificationSpecificationDetail[];
  /** Language for Tags */
  language?: "CZECH" | "SLOVAK" | "ENGLISH" | "GERMAN" | null;
  /**
   * Count of available products in warehouse
   * @format int32
   */
  availableCount?: number;
  /**
   * WarehouseId - product identifier in warehouse database
   * @minLength 1
   */
  warehouseId: string;
  /** EAN - universal European product indentifier */
  ean?: string | null;
  /** Flag to mark product as only for logged users */
  isForLogged?: boolean;
}

export interface VinistoProductDllModelsApiProductTag {
  /** Tag id for bundle. */
  tagId?: string | null;
  /** Allowed tag countries of sale for current bundle. */
  countriesOfSale?: ("CZ" | "SK" | "DE" | "UK" | "PL")[] | null;
}

/** Represents value base specification value, which reference a specification definition and contains respective value */
export interface VinistoProductDllModelsApiSpecificationSpecificationDetail {
  /**
   * Specification definition object - BaseSpecificationDefinition type.
   * It is object due to proper serialization to json
   */
  definition: any;
  /**
   * Specification value object - BaseSpecificationValue type or BaseSpecification type
   * It is object due to proper serialization to json
   */
  value: any;
}

/** Base object of tag slug. */
export interface VinistoProductDllModelsApiTagBaseTagSlug {
  value?: string | null;
}

/** Represents tag of a product. */
export interface VinistoProductDllModelsApiTagTag {
  /** @minLength 1 */
  id: string;
  /** @minLength 1 */
  name: string;
  description?: string | null;
  metaDescription?: string | null;
  metaTitle?: string | null;
  slugs: VinistoProductDllModelsApiTagBaseTagSlug[];
  /**
   * Tag color in RGB ("#000000")
   * @minLength 1
   */
  color: string;
  isEnabled?: boolean;
  isOnHomepage?: boolean;
  bundles: VinistoProductDllModelsApiBundleBundle[];
  isDisplayBundles?: boolean;
  isVisibleInFilters?: boolean;
  /** @format int32 */
  orderInFilters?: number;
  /** Types of tag.<p>Members:</p><ul><li><i>User</i> - User tag type can be edited by admin.</ li > <li><i>System</i> - System tag type is triggered by automatic systems and can't be manually changed.</ li > <li><i>Personalized</i> - Personalized tag types are created by user behaviour.</ li > </ul> */
  type?: "User" | "System" | "Personalized";
  /**
   * Optional tag validity from.
   * @format int64
   */
  validFrom?: number | null;
  /**
   * Optional tag validity to.
   * @format int64
   */
  validTo?: number | null;
  /** List of possible allowed specifications */
  specifications?:
    | (
        | VinistoCommonDllModelsApiSpecificationsComboBoxSpecification
        | VinistoCommonDllModelsApiSpecificationsDecimalNumberSpecification
        | VinistoCommonDllModelsApiSpecificationsCheckBoxSpecification
        | VinistoCommonDllModelsApiSpecificationsMultiComboBoxSpecification
        | VinistoCommonDllModelsApiSpecificationsNumberSpecification
        | VinistoCommonDllModelsApiSpecificationsStringSpecification
        | VinistoCommonDllModelsApiSpecificationsTextSpecification
      )[]
    | null;
  /** Specifications - list containing specifications id and value as list. */
  specificationDetails: VinistoProductDllModelsApiSpecificationSpecificationDetail[];
}

/** One item of full search. */
export interface VinistoSearchDllModelsApiFullSearchFullSearchItem {
  /**
   * Id of an object where text was found.
   * @minLength 1
   */
  id: string;
  /** Type of an object where */
  type?: "BUNDLE" | "CATEGORY" | "CMS_ARTICLE";
  /**
   * concatenation of all searched columns of document.
   * @minLength 1
   */
  searchedString: string;
}

/** Results of full search. */
export interface VinistoSearchDllModelsApiFullSearchFullSearchReturn {
  /** List of item as a result of full search. */
  items?: VinistoSearchDllModelsApiFullSearchFullSearchItem[] | null;
  /**
   * Total count of available objects in respective collection.
   * @format int64
   */
  count?: number;
  /** Has occurred any error. */
  isError?: boolean;
  /** List of errors code that occurred during the api request. */
  error?: VinistoHelperDllBaseError[] | null;
}

/** Results of full search. */
export interface VinistoSearchDllModelsApiFullSearchFullSearchSeparatedReturn {
  /** List of found Bundles */
  bundles?: VinistoProductDllModelsApiBundleBundle[] | null;
  /**
   * Total number of found bundles
   * @format int64
   */
  bundlesCount?: number;
  /** List of found Categories */
  categories?: VinistoProductDllModelsApiCategoryCategory[] | null;
  /**
   * Total number of found categories
   * @format int64
   */
  categoriesCount?: number;
  /** List of found CmsArticles */
  articles?: VinistoCmsDllModelsApiCmsArticleCmsArticle[] | null;
  /**
   * Total number of found cms articles
   * @format int64
   */
  articlesCount?: number;
  /**
   * Total count of available objects in respective collection.
   * @format int64
   */
  count?: number;
  /** Has occurred any error. */
  isError?: boolean;
  /** List of errors code that occurred during the api request. */
  error?: VinistoHelperDllBaseError[] | null;
}

/** Represents supplier address */
export interface VinistoSupplierDllModelsApiAddressAddress {
  /**
   * Addressee
   * @minLength 1
   */
  addressee: string;
  /** @minLength 1 */
  street: string;
  /** @minLength 1 */
  landRegistryNumber: string;
  houseNumber?: string | null;
  /** @minLength 1 */
  zip: string;
  /** @minLength 1 */
  city: string;
  /** @minLength 1 */
  phone: string;
  email?: string | null;
  note?: string | null;
  title?: string | null;
  /** Identifies type of the country<p>Members:</p><ul><li><i>CZ</i> - Czech Republic</ li > <li><i>SK</i> - Slovakia</ li > <li><i>DE</i> - Germany</ li > <li><i>UK</i> - United Kingdom</ li > <li><i>PL</i> - Poland</ li > </ul> */
  countryCode: "CZ" | "SK" | "DE" | "UK" | "PL";
}

/** Represents supplier certificate */
export interface VinistoSupplierDllModelsApiCertificateCertificate {
  /**
   * Id of the supplier certificate
   * @minLength 1
   */
  id: string;
  /**
   * Id of the object the certificate is assigned to
   * @minLength 1
   */
  objectId: string;
  /**
   * Url to get supplier certificate
   * @minLength 1
   */
  url: string;
}

/** Class for objects which required to store value in various languages. */
export interface VinistoSupplierDllModelsApiMultiLangValue {
  /** Language of the value */
  language?: "CZECH" | "SLOVAK" | "ENGLISH" | "GERMAN";
  /**
   * Value
   * @minLength 1
   */
  value: string;
}

/** Represents a supplier model provided in api. */
export interface VinistoSupplierDllModelsApiSupplierSupplier {
  /**
   * Id of the supplier.
   * @minLength 1
   */
  id: string;
  /**
   * Web name of the supplier.
   * @minLength 1
   */
  nameWeb: string;
  /**
   * Billing name of the supplier.
   * @minLength 1
   */
  nameBilling: string;
  /** Supplier abbreviation in flexibee - for automatic invoice matching during import. */
  abbreviationInFlexibee?: string | null;
  /**
   * Company Identification Number of the supplier.
   * @minLength 1
   */
  ico: string;
  /** VAT (value-added tax) number of the supplier. */
  dic?: string | null;
  /** Supplier billing address. */
  address: VinistoSupplierDllModelsApiAddressAddress;
  /** Supplier country code. */
  countryCode?: "CZ" | "SK" | "DE" | "UK" | "PL";
  /** List of user ids that can edit supplier data. */
  userIds: string[];
  /** List of user objects that can edit supplier data. */
  users: VinistoSupplierDllModelsApiSupplierUser[];
  /** List of supplier tag ids assigned to this supplier. */
  supplierTagIds?: string[] | null;
  /** List of supplier tags assigned to this supplier. */
  supplierTags?: VinistoSupplierDllModelsApiSupplierTagGetSupplierTag[] | null;
  /** Type of the supplier. */
  supplierType?: "PRODUCER" | "IMPORTER";
  /** IsShipping. It is necessary for fee calculation. */
  isShipping?: boolean;
  /** Supplier web. */
  web: VinistoSupplierDllModelsApiMultiLangValue[];
  /** Supplier company description. */
  companyDescription: VinistoSupplierDllModelsApiMultiLangValue[];
  /** Supplier main profile. */
  mainProfile: VinistoSupplierDllModelsApiMultiLangValue[];
  /** Supplier wine region. */
  wineRegion: VinistoSupplierDllModelsApiMultiLangValue[];
  /** Supplier logo. */
  logo: VinistoImageDllModelsApiImageImage;
  /** Supplier base image. */
  baseImage: VinistoImageDllModelsApiImageImage;
  /** List of supplier certificates. */
  certificates: VinistoSupplierDllModelsApiCertificateCertificate[];
  /** Address of the pick up. Is used to specify pick up point when IsShipping = false. */
  pickupAddress?: VinistoSupplierDllModelsApiAddressAddress | null;
  /** Bank account number of the supplier. */
  bankAccountNumber?: string | null;
  /** Coupon prefix. */
  couponPrefix?: string | null;
  /** Internal supplier note. */
  internalSupplierNote?: string | null;
  /**
   * Maximum possible supplier discount in percent.
   * @format double
   */
  maxPossibleSupplierDiscountPercentage?: number | null;
  /**
   * Maximum percentage by which the B2B price can be lower than the B2C price.
   * @format double
   */
  maxB2cB2bPriceDifferencePercentage?: number | null;
  /**
   * Date and time when the supplier was created, as a Unix timestamp.
   * @format int64
   */
  createdAt?: number;
  /**
   * Maximum discount for a supplier B2C promotion in percent.
   * @format double
   */
  maxB2cPromotionDiscountPercentage?: number | null;
  /**
   * Maximum number of supplier B2C promotions per year.
   * @format int32
   */
  maxB2cPromotionsPerYear?: number | null;
}

/** Represents a user. */
export interface VinistoSupplierDllModelsApiSupplierUser {
  /** @minLength 1 */
  id: string;
  /**
   * Email of the user.
   * @minLength 1
   */
  email: string;
  /** @minLength 1 */
  userLoginHash: string;
}

export interface VinistoSupplierDllModelsApiSupplierTagGetSupplierTag {
  id?: string | null;
  name?: VinistoSupplierDllModelsApiMultiLangValue[] | null;
  description?: VinistoSupplierDllModelsApiMultiLangValue[] | null;
  metaDescription?: VinistoSupplierDllModelsApiMultiLangValue[] | null;
  url?: VinistoSupplierDllModelsApiMultiLangValue[] | null;
  color?: string | null;
  /** @format int64 */
  createdAt?: number;
  isDeleted?: boolean;
}

export interface BundlesListParams {
  language?: "CZECH" | "SLOVAK" | "ENGLISH" | "GERMAN";
  searchingNameString?: string;
  IsCache?: boolean;
  priceLevels?: (
    | "Level1"
    | "Level2"
    | "Level3"
    | "Level4"
    | "Level5"
    | "Level6"
    | "Level7"
    | "Level8"
    | "Level9"
    | "Level10"
    | "VinistoPlus"
  )[];
  /**
   * @format int32
   * @default 5
   */
  limit?: number;
  /** @default false */
  hiddenSpecification?: boolean;
  /** @default false */
  isDeleted?: boolean;
  /** @default true */
  isEnabled?: boolean;
  /** @default false */
  isGift?: boolean;
  isTemporaryUnavailable?: boolean;
  isSet?: boolean;
  isSaleOver?: boolean;
  /**
   * Identifies type of the country<p>Members:</p><ul><li><i>CZ</i> - Czech Republic</ li > <li><i>SK</i> - Slovakia</ li > <li><i>DE</i> - Germany</ li > <li><i>UK</i> - United Kingdom</ li > <li><i>PL</i> - Poland</ li > </ul>
   * @default "CZ"
   */
  countryOfSale?: "CZ" | "SK" | "DE" | "UK" | "PL";
  /**
   * Currency<p>Members:</p><ul><li><i>CZK</i> - Czech crown</ li > <li><i>EUR</i> - Euro</ li > <li><i>USD</i> - US Dollar</ li > </ul>
   * @default "CZK"
   */
  currency?: "CZK" | "EUR" | "USD";
}

export interface FullSearchListParams {
  /**
   * Collections to be included in full search.
   * The order of the collections in the list determines the search order.
   * If no collection is specified then all collection are included in this order: BUNDLE, CATEGORY.
   */
  Collections?: ("BUNDLE" | "CATEGORY" | "CMS_ARTICLE")[];
  /**
   * Is set automatically by endpoint api key.
   * @format int32
   */
  PlatformId?: number;
  /** User used for search log */
  UserLoginHash?: string;
  /** String to find (full search searches only for whole words). */
  SearchString?: string;
  /**
   * Searched language. If provided only string of selected laguaged are searched.
   * Otherwise all laguages are searched.
   */
  Language?: "CZECH" | "SLOVAK" | "ENGLISH" | "GERMAN";
  /** Return prices in target currency, otherwise return default CZK. */
  Currency?: "CZK" | "EUR" | "USD";
  /**
   * Number of records to be retrieved. if not provided default value is 10.
   * Limited by Maximum number of records in EnvironmentConstants
   * @format int32
   */
  Limit?: number;
  /**
   * Number of records to be skipped. If not provided default value is 0
   * @format int32
   */
  Offset?: number;
  /** If true then returns only main images, returns all images otherwise */
  IsMainImagesOnly?: boolean;
  /** Filter by country of sale. Default: CZ. Returns Bundles, Categories that are set as allowed in the provided country. */
  CountryOfSale?: "CZ" | "SK" | "DE" | "UK" | "PL";
  IsCache?: boolean;
}

export interface FullSearchSearchStringSeparateResultsListParams {
  /**
   * Collections to be included in full search.
   * The order of the collections in the list determines the search order.
   * If no collection is specified then all collection are included in this order: BUNDLE, CATEGORY.
   */
  Collections?: ("BUNDLE" | "CATEGORY" | "CMS_ARTICLE")[];
  /**
   * Is set automatically by endpoint api key.
   * @format int32
   */
  PlatformId?: number;
  /** User used for search log */
  UserLoginHash?: string;
  /** String to find (full search searches only for whole words). */
  SearchString?: string;
  /**
   * Searched language. If provided only string of selected laguaged are searched.
   * Otherwise all laguages are searched.
   */
  Language?: "CZECH" | "SLOVAK" | "ENGLISH" | "GERMAN";
  /** Return prices in target currency, otherwise return default CZK. */
  Currency?: "CZK" | "EUR" | "USD";
  /**
   * Number of records to be retrieved. if not provided default value is 10.
   * Limited by Maximum number of records in EnvironmentConstants
   * @format int32
   */
  Limit?: number;
  /**
   * Number of records to be skipped. If not provided default value is 0
   * @format int32
   */
  Offset?: number;
  /** If true then returns only main images, returns all images otherwise */
  IsMainImagesOnly?: boolean;
  /** Filter by country of sale. Default: CZ. Returns Bundles, Categories that are set as allowed in the provided country. */
  CountryOfSale?: "CZ" | "SK" | "DE" | "UK" | "PL";
  IsCache?: boolean;
}

export interface CronsListParams {
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
  /** Contains list of possible crons in search api<p>Members:</p><ul><li><i>IMPORT_CATEGORIES_TO_ELASTIC</i> - Cron to import categories from mongo to elasticsearch</ li > <li><i>IMPORT_BUNDLES_TO_ELASTIC</i> - Cron to import bundles from mongo to elasticsearch</ li > <li><i>DELETE_BUNDLES_FROM_ELASTIC</i> - Cron to delete bundles from elasticsearch</ li > <li><i>DELETE_CATEGORIES_FROM_ELASTIC</i> - Cron to delete categories from elasticsearch</ li > <li><i>IMPORT_CMS_ARTICLES_TO_ELASTIC</i> - Cron to import cms articles from mongo to elasticsearch</ li > <li><i>DELETE_CMS_ARTICLES_FROM_ELASTIC</i> - Cron to delete cms articles from elasticsearch</ li > </ul> */
  cronType?:
    | "IMPORT_CATEGORIES_TO_ELASTIC"
    | "IMPORT_BUNDLES_TO_ELASTIC"
    | "DELETE_BUNDLES_FROM_ELASTIC"
    | "DELETE_CATEGORIES_FROM_ELASTIC"
    | "IMPORT_CMS_ARTICLES_TO_ELASTIC"
    | "DELETE_CMS_ARTICLES_FROM_ELASTIC";
}

export namespace SearchApi {
  /**
   * No description
   * @tags Bundles
   * @name BundlesList
   * @request GET:/search-api/bundles
   * @secure
   */
  export namespace BundlesList {
    export type RequestParams = {};
    export type RequestQuery = {
      language?: "CZECH" | "SLOVAK" | "ENGLISH" | "GERMAN";
      searchingNameString?: string;
      IsCache?: boolean;
      priceLevels?: (
        | "Level1"
        | "Level2"
        | "Level3"
        | "Level4"
        | "Level5"
        | "Level6"
        | "Level7"
        | "Level8"
        | "Level9"
        | "Level10"
        | "VinistoPlus"
      )[];
      /**
       * @format int32
       * @default 5
       */
      limit?: number;
      /** @default false */
      hiddenSpecification?: boolean;
      /** @default false */
      isDeleted?: boolean;
      /** @default true */
      isEnabled?: boolean;
      /** @default false */
      isGift?: boolean;
      isTemporaryUnavailable?: boolean;
      isSet?: boolean;
      isSaleOver?: boolean;
      /**
       * Identifies type of the country<p>Members:</p><ul><li><i>CZ</i> - Czech Republic</ li > <li><i>SK</i> - Slovakia</ li > <li><i>DE</i> - Germany</ li > <li><i>UK</i> - United Kingdom</ li > <li><i>PL</i> - Poland</ li > </ul>
       * @default "CZ"
       */
      countryOfSale?: "CZ" | "SK" | "DE" | "UK" | "PL";
      /**
       * Currency<p>Members:</p><ul><li><i>CZK</i> - Czech crown</ li > <li><i>EUR</i> - Euro</ li > <li><i>USD</i> - US Dollar</ li > </ul>
       * @default "CZK"
       */
      currency?: "CZK" | "EUR" | "USD";
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoSearchDllModelsApiFullSearchFullSearchSeparatedReturn;
  }

  /**
   * No description
   * @tags FullSearch
   * @name FullSearchList
   * @request GET:/search-api/full-search
   * @secure
   */
  export namespace FullSearchList {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * Collections to be included in full search.
       * The order of the collections in the list determines the search order.
       * If no collection is specified then all collection are included in this order: BUNDLE, CATEGORY.
       */
      Collections?: ("BUNDLE" | "CATEGORY" | "CMS_ARTICLE")[];
      /**
       * Is set automatically by endpoint api key.
       * @format int32
       */
      PlatformId?: number;
      /** User used for search log */
      UserLoginHash?: string;
      /** String to find (full search searches only for whole words). */
      SearchString?: string;
      /**
       * Searched language. If provided only string of selected laguaged are searched.
       * Otherwise all laguages are searched.
       */
      Language?: "CZECH" | "SLOVAK" | "ENGLISH" | "GERMAN";
      /** Return prices in target currency, otherwise return default CZK. */
      Currency?: "CZK" | "EUR" | "USD";
      /**
       * Number of records to be retrieved. if not provided default value is 10.
       * Limited by Maximum number of records in EnvironmentConstants
       * @format int32
       */
      Limit?: number;
      /**
       * Number of records to be skipped. If not provided default value is 0
       * @format int32
       */
      Offset?: number;
      /** If true then returns only main images, returns all images otherwise */
      IsMainImagesOnly?: boolean;
      /** Filter by country of sale. Default: CZ. Returns Bundles, Categories that are set as allowed in the provided country. */
      CountryOfSale?: "CZ" | "SK" | "DE" | "UK" | "PL";
      IsCache?: boolean;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoSearchDllModelsApiFullSearchFullSearchReturn;
  }

  /**
   * No description
   * @tags FullSearch
   * @name FullSearchSearchStringSeparateResultsList
   * @request GET:/search-api/full-search/search-string-separate-results
   * @secure
   */
  export namespace FullSearchSearchStringSeparateResultsList {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * Collections to be included in full search.
       * The order of the collections in the list determines the search order.
       * If no collection is specified then all collection are included in this order: BUNDLE, CATEGORY.
       */
      Collections?: ("BUNDLE" | "CATEGORY" | "CMS_ARTICLE")[];
      /**
       * Is set automatically by endpoint api key.
       * @format int32
       */
      PlatformId?: number;
      /** User used for search log */
      UserLoginHash?: string;
      /** String to find (full search searches only for whole words). */
      SearchString?: string;
      /**
       * Searched language. If provided only string of selected laguaged are searched.
       * Otherwise all laguages are searched.
       */
      Language?: "CZECH" | "SLOVAK" | "ENGLISH" | "GERMAN";
      /** Return prices in target currency, otherwise return default CZK. */
      Currency?: "CZK" | "EUR" | "USD";
      /**
       * Number of records to be retrieved. if not provided default value is 10.
       * Limited by Maximum number of records in EnvironmentConstants
       * @format int32
       */
      Limit?: number;
      /**
       * Number of records to be skipped. If not provided default value is 0
       * @format int32
       */
      Offset?: number;
      /** If true then returns only main images, returns all images otherwise */
      IsMainImagesOnly?: boolean;
      /** Filter by country of sale. Default: CZ. Returns Bundles, Categories that are set as allowed in the provided country. */
      CountryOfSale?: "CZ" | "SK" | "DE" | "UK" | "PL";
      IsCache?: boolean;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoSearchDllModelsApiFullSearchFullSearchSeparatedReturn;
  }

  /**
   * No description
   * @tags SearchApiCron
   * @name CronsList
   * @request GET:/search-api/crons
   * @secure
   */
  export namespace CronsList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
      /** Contains list of possible crons in search api<p>Members:</p><ul><li><i>IMPORT_CATEGORIES_TO_ELASTIC</i> - Cron to import categories from mongo to elasticsearch</ li > <li><i>IMPORT_BUNDLES_TO_ELASTIC</i> - Cron to import bundles from mongo to elasticsearch</ li > <li><i>DELETE_BUNDLES_FROM_ELASTIC</i> - Cron to delete bundles from elasticsearch</ li > <li><i>DELETE_CATEGORIES_FROM_ELASTIC</i> - Cron to delete categories from elasticsearch</ li > <li><i>IMPORT_CMS_ARTICLES_TO_ELASTIC</i> - Cron to import cms articles from mongo to elasticsearch</ li > <li><i>DELETE_CMS_ARTICLES_FROM_ELASTIC</i> - Cron to delete cms articles from elasticsearch</ li > </ul> */
      cronType?:
        | "IMPORT_CATEGORIES_TO_ELASTIC"
        | "IMPORT_BUNDLES_TO_ELASTIC"
        | "DELETE_BUNDLES_FROM_ELASTIC"
        | "DELETE_CATEGORIES_FROM_ELASTIC"
        | "IMPORT_CMS_ARTICLES_TO_ELASTIC"
        | "DELETE_CMS_ARTICLES_FROM_ELASTIC";
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoHelperDllBaseBaseReturn;
  }
}
