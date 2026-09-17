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

/** Represents base for application image. */
export interface VinistoImageDllModelsApiImageBaseImage {
  /** Id */
  id?: string | null;
  /** Identifies object type to which an image is assigned<p>Members:</p><ul><li><i>Product</i> - Type for Product object</ li > <li><i>Bundle</i> - Type for Bundle object</ li > <li><i>Category</i> - Type for Category object</ li > <li><i>Supplier</i> - Type for Supplier object</ li > <li><i>CarouselTop</i> - Type for Slider carousel object of type HP_TOP</ li > <li><i>CarouselBottom</i> - Type for Slider carousel object of type HP_BOTTOM</ li > <li><i>CarouselProductDetail</i> - Type for Slider carousel object of type PRODUCT_DETAIL</ li > <li><i>Payment</i> - Type for Payment object</ li > <li><i>HP_USP</i> - Represents Slider carousel USP Banner</ li > <li><i>ProductDetailUSP</i> - Represents Slider carousel product detail USP Banner</ li > <li><i>SpecificationDefinition</i> - Represents Specification definition object</ li > <li><i>SpecificationValue</i> - Represents Specification allowed value object</ li > <li><i>Icon</i> - Represents icon in svg format</ li > <li><i>CarouselProductList</i> - Type for Slider carousel object of type PRODUCT_LIST</ li > <li><i>DiscountCoupon</i> - Type for Discount coupon object</ li > </ul> */
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

/** Represents image in various sizes, which is assigned to an object (product, category, bundle..). */
export type VinistoImageDllModelsApiImageImage =
  VinistoImageDllModelsApiImageBaseImage & {
    /** Id of the object the image is assigned to */
    objectId?: string | null;
  };

/** Represents svg image */
export type VinistoImageDllModelsApiImageSvgImage =
  VinistoImageDllModelsApiImageBaseImage & {
    /** Url of the svg image location */
    url?: string | null;
  };

/** Represents svg image for several entities in project, e.g. HP_USP banners, PRODUCT_DETAIL_USP banners, etc. */
export type VinistoImageDllModelsApiImageSvgObjectImage =
  VinistoImageDllModelsApiImageBaseImage & {
    /** Id of the object the image is assigned to */
    itemId?: string | null;
  };

/** Represents image in various sizes. */
export type VinistoImageDllModelsApiImageUrlsImage =
  VinistoImageDllModelsApiImageBaseImage & {
    /**
     * Set of urls pointing to individual image versions of this image
     * Key - name of the image version/size
     * Value - url of the image location
     */
    domainUrls?: Record<string, string>;
  };

/** Return API object for Image */
export interface VinistoImageDllModelsApiReturnDataImageReturn {
  /** List of Images */
  images?:
    | (
        | VinistoImageDllModelsApiImageUrlsImage
        | VinistoImageDllModelsApiImageImage
        | VinistoImageDllModelsApiImageSvgImage
        | VinistoImageDllModelsApiImageSvgObjectImage
      )[]
    | null;
  /** Has occurred any error. */
  isError?: boolean;
  /** List of errors code that occurred during the api request. */
  error?: VinistoHelperDllBaseError[] | null;
}

export interface GeneralImagesCreatePayload {
  /** @format binary */
  imageFile?: File;
}

export interface GeneralImagesCreateParams {
  /** Where image will go (under products, bundles, categories) */
  ItemType:
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
  /** If true, it use Rapid api service to remove background from the provided picture */
  RemoveBackground: boolean;
  /** If true, the set background color is added to the picture. */
  AddBackground: boolean;
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
}

export interface ImagesCreatePayload {
  /** @format binary */
  imageFile?: File;
}

export interface ImagesCreateParams {
  /** Id of the bundle the image is assigned to */
  ItemId: string;
  /** True in case this is the main image */
  IsMain?: boolean;
  /** Where image will go (under products, bundles, categories) */
  ItemType:
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
  /** If true, it use Rapid api service to remove background from the provided picture */
  RemoveBackground: boolean;
  /** If true, the set background color is added to the picture. */
  AddBackground: boolean;
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
}

export interface ImagesListParams {
  /** Purpose of an image: for product, for bundle, for category */
  ItemType:
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
  /** Id of an item this image belongs to */
  ItemId: string;
  IsCache?: boolean;
}

export interface ImagesDeleteParams {
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
  /** Id of the image to be deleted */
  imageId: string;
}

export interface ImagesUpdateParams {
  /** Where image will go (under products, bundles, categories ...) */
  ItemType:
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
  /** Id of the item (product, bundle, category ...) the image is assigned to */
  ItemId: string;
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
  /** Id of the image to set as main */
  imageId: string;
}

export namespace ImageApi {
  /**
 * No description
 * @tags GeneralImages
 * @name GeneralImagesCreate
 * @summary Load provided image.
If is provided non svg image, then create all configured thumbnails and store it together with the original file to predefined locations.
If is provided svg image, then store original file to predefined locations.
 * @request POST:/image-api/general-images
*/
  export namespace GeneralImagesCreate {
    export type RequestParams = {};
    export type RequestQuery = {
      /** Where image will go (under products, bundles, categories) */
      ItemType:
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
      /** If true, it use Rapid api service to remove background from the provided picture */
      RemoveBackground: boolean;
      /** If true, the set background color is added to the picture. */
      AddBackground: boolean;
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
    };
    export type RequestBody = GeneralImagesCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoImageDllModelsApiReturnDataImageReturn;
  }

  /**
 * No description
 * @tags Images
 * @name ImagesCreate
 * @summary Load provided image, create all configured thumbnails and store it together with the original file to predefined locations.
Create image object holding all the urls of stored images, store it to mongo and return as result.
 * @request POST:/image-api/images
*/
  export namespace ImagesCreate {
    export type RequestParams = {};
    export type RequestQuery = {
      /** Id of the bundle the image is assigned to */
      ItemId: string;
      /** True in case this is the main image */
      IsMain?: boolean;
      /** Where image will go (under products, bundles, categories) */
      ItemType:
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
      /** If true, it use Rapid api service to remove background from the provided picture */
      RemoveBackground: boolean;
      /** If true, the set background color is added to the picture. */
      AddBackground: boolean;
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
    };
    export type RequestBody = ImagesCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoImageDllModelsApiReturnDataImageReturn;
  }

  /**
   * No description
   * @tags Images
   * @name ImagesList
   * @summary Get all images assigned to the provided bundle.
   * @request GET:/image-api/images
   */
  export namespace ImagesList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** Purpose of an image: for product, for bundle, for category */
      ItemType:
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
      /** Id of an item this image belongs to */
      ItemId: string;
      IsCache?: boolean;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoImageDllModelsApiReturnDataImageReturn;
  }

  /**
   * No description
   * @tags Images
   * @name ImagesDelete
   * @summary Delete image by imageId.
   * @request DELETE:/image-api/images/{imageId}
   */
  export namespace ImagesDelete {
    export type RequestParams = {
      /** Id of the image to be deleted */
      imageId: string;
    };
    export type RequestQuery = {
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoImageDllModelsApiReturnDataImageReturn;
  }

  /**
   * No description
   * @tags Images
   * @name ImagesUpdate
   * @summary Set image as main.
   * @request PUT:/image-api/images/{imageId}
   */
  export namespace ImagesUpdate {
    export type RequestParams = {
      /** Id of the image to set as main */
      imageId: string;
    };
    export type RequestQuery = {
      /** Where image will go (under products, bundles, categories ...) */
      ItemType:
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
      /** Id of the item (product, bundle, category ...) the image is assigned to */
      ItemId: string;
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoImageDllModelsApiReturnDataImageReturn;
  }
}
