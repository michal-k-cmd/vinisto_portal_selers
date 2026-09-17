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

/** Contains list of possible virtual category states<p>Members:</p><ul></ul> */
export enum VinistoHelperDllEnumsVirtualCategoryState {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
}

/** Contains list of possible columns for sorting.<p>Members:</p><ul></ul> */
export enum VinistoHelperDllEnumsVirtualCategorySortableColumns {
  ID = "ID",
  Group = "Group",
  Url = "Url",
  State = "State",
}

/** VatRate<p>Members:</p><ul><li><i>BaseVat</i> - Base VAT level e.g. 21%</ li > <li><i>FirstReducedVat</i> - First reduced VAT level e.g. 15%</ li > <li><i>SecondReducedVat</i> - Second reduced VAT level e.g. 10%</ li > <li><i>NoVat</i> - No VAT e.g. 0%</ li > </ul> */
export enum VinistoHelperDllEnumsVatRate {
  BaseVat = "BaseVat",
  FirstReducedVat = "FirstReducedVat",
  SecondReducedVat = "SecondReducedVat",
  NoVat = "NoVat",
}

/** Contains list of possible types User types.<p>Members:</p><ul><li><i>Company</i> - Main b2b company.</ li > <li><i>Merchant</i> - User assigned to the company which has right to the purchase.</ li > </ul> */
export enum VinistoHelperDllEnumsUserUserType {
  B2C = "B2c",
  Company = "Company",
  Merchant = "Merchant",
}

/** Contains list of possible company states.<p>Members:</p><ul></ul> */
export enum VinistoHelperDllEnumsUserUserState {
  Active = "Active",
  Inactive = "Inactive",
  Pending = "Pending",
}

/** Represents various user rights<p>Members:</p><ul><li><i>UNKNOWN</i> - UNDEFINED right</ li > <li><i>USER_ADMIN_USER</i> - Has manipulation access to other users</ li > <li><i>USER_SUPPLIER</i> - Has write access to suppliers</ li > <li><i>USER_CUSTOMER</i> - Has write access to users</ li > <li><i>USER_ADMIN_CATEGORY</i> - Has write access to categories</ li > <li><i>USER_ADMIN_EVALUATION</i> - Has write access to evaluations</ li > <li><i>USER_ADMIN</i> - Admin</ li > <li><i>USER_ADMIN_PRODUCT</i> - Has write access to products</ li > <li><i>USER_ADMIN_BUNDLE</i> - Has write access to bundles</ li > <li><i>USER_ADMIN_HOMEPAGE</i> - Has write access to homepage</ li > <li><i>USER_ADMIN_TAG</i> - Has write access to tags</ li > <li><i>USER_ADMIN_SPECIFICATION</i> - Has write access to specifications</ li > <li><i>USER_ADMIN_IMAGE</i> - Has write access to images</ li > <li><i>USER_ADMIN_ORDER</i> - Has write access to orders</ li > <li><i>USER_ADMIN_WAREHOUSE</i> - Has manipulation access to warehouse</ li > <li><i>USER_ADMIN_CACHE</i> - Has manipulation access to cache (used only for clear in present time)</ li > <li><i>USER_ADMIN_FEE_RULE</i> - Has manipulation access for fee rules</ li > <li><i>USER_ADMIN_SUPPLIER_CERTIFICATES</i> - Has manipulation access for supplier certificates</ li > <li><i>USER_ADMIN_FEE_RECORD</i> - Has manipulation access for fee record</ li > <li><i>USER_ADMIN_DISCOUNT</i> - Has manipulation access for discount price</ li > <li><i>USER_ADMIN_BILLING</i> - Has manipulation access for billing</ li > <li><i>USER_ADMIN_IMPORTER</i> - Has manipulation access for import</ li > <li><i>USER_FLEXI_BEE_EXPORT_ADMIN</i> - Has accees for export orders to flexibee</ li > <li><i>USER_BANNER_EDITOR</i> - Has manipulation access for slider carousels</ li > <li><i>USER_COUPON_EDITOR</i> - Has manipulation access for coupons</ li > <li><i>USER_ORDER_STORNO</i> - Has access to order storno</ li > <li><i>USER_ADMIN_CMS</i> - Has access to CMS</ li > <li><i>USER_ADMIN_STOCKING</i> - Has access to STOCKING</ li > <li><i>USER_RUN_CRON</i> - Has access to run crons via API</ li > <li><i>USER_ADMIN_CMS_TAGS</i> - Has access to CMS TAGS</ li > <li><i>USER_ADMIN_GIFT_RULE</i> - Has access to Gift rules</ li > <li><i>USER_ADMIN_PERMISSION</i> - Has access to change user permission</ li > <li><i>USER_ADMIN_SUPPLIER_TAGS</i> - Has access to Supplier Tags</ li > <li><i>USER_SELLER_COUPON_EDITOR</i> - Has access to create supplier coupon</ li > <li><i>USER_ADMIN_DYNAMIC_FEE_RULE</i> - Has admin access to dynamic fee rules</ li > <li><i>USER_ADMIN_ORDER_FEES</i> - Has admin access to sale fee rules</ li > <li><i>USER_ADMIN_SUBSCRIPTION</i> - Has admin access to subscriptions</ li > <li><i>USER_ESHOP_ADMIN_TOOLBAR</i> - Has access to admin toolbar on eshop</ li > <li><i>USER_B2B_ORDERS_CREATE</i> - Can create b2b orders.</ li > <li><i>USER_CSO</i> - CSO user. Can approve b2b orders etc.</ li > <li><i>USER_EDIT_USER_ADDRESSES</i> - Has access to edit user addresses.</ li > <li><i>USER_ADMIN_CONTRACT_WITHDRAWAL_REQUEST</i> - Has access to contract withdrawal requests</ li > <li><i>USER_ADMIN_MERCHANT_FEE_RULES</i> - Has access to merchant fee rules</ li > </ul> */
export enum VinistoHelperDllEnumsUserUserRights {
  UNKNOWN = "UNKNOWN",
  USER_ADMIN_USER = "USER_ADMIN_USER",
  USER_SUPPLIER = "USER_SUPPLIER",
  USER_CUSTOMER = "USER_CUSTOMER",
  USER_ADMIN_CATEGORY = "USER_ADMIN_CATEGORY",
  USER_ADMIN_EVALUATION = "USER_ADMIN_EVALUATION",
  USER_ADMIN = "USER_ADMIN",
  USER_ADMIN_PRODUCT = "USER_ADMIN_PRODUCT",
  USER_ADMIN_BUNDLE = "USER_ADMIN_BUNDLE",
  USER_ADMIN_HOMEPAGE = "USER_ADMIN_HOMEPAGE",
  USER_ADMIN_TAG = "USER_ADMIN_TAG",
  USER_ADMIN_SPECIFICATION = "USER_ADMIN_SPECIFICATION",
  USER_ADMIN_IMAGE = "USER_ADMIN_IMAGE",
  USER_ADMIN_ORDER = "USER_ADMIN_ORDER",
  USER_ADMIN_WAREHOUSE = "USER_ADMIN_WAREHOUSE",
  USER_ADMIN_CACHE = "USER_ADMIN_CACHE",
  USER_ADMIN_FEE_RULE = "USER_ADMIN_FEE_RULE",
  USER_ADMIN_SUPPLIER_CERTIFICATES = "USER_ADMIN_SUPPLIER_CERTIFICATES",
  USER_ADMIN_FEE_RECORD = "USER_ADMIN_FEE_RECORD",
  USER_ADMIN_DISCOUNT = "USER_ADMIN_DISCOUNT",
  USER_ADMIN_BILLING = "USER_ADMIN_BILLING",
  USER_ADMIN_IMPORTER = "USER_ADMIN_IMPORTER",
  USER_FLEXI_BEE_EXPORT_ADMIN = "USER_FLEXI_BEE_EXPORT_ADMIN",
  USER_BANNER_EDITOR = "USER_BANNER_EDITOR",
  USER_COUPON_EDITOR = "USER_COUPON_EDITOR",
  USER_ORDER_STORNO = "USER_ORDER_STORNO",
  USER_ADMIN_CMS = "USER_ADMIN_CMS",
  USER_ADMIN_STOCKING = "USER_ADMIN_STOCKING",
  USER_RUN_CRON = "USER_RUN_CRON",
  USER_ADMIN_CMS_TAGS = "USER_ADMIN_CMS_TAGS",
  USER_ADMIN_GIFT_RULE = "USER_ADMIN_GIFT_RULE",
  USER_ADMIN_PERMISSION = "USER_ADMIN_PERMISSION",
  USER_ADMIN_SUPPLIER_TAGS = "USER_ADMIN_SUPPLIER_TAGS",
  USER_SELLER_COUPON_EDITOR = "USER_SELLER_COUPON_EDITOR",
  USER_ADMIN_DYNAMIC_FEE_RULE = "USER_ADMIN_DYNAMIC_FEE_RULE",
  USER_ADMIN_ORDER_FEES = "USER_ADMIN_ORDER_FEES",
  USER_ADMIN_SUBSCRIPTION = "USER_ADMIN_SUBSCRIPTION",
  USER_ESHOP_ADMIN_TOOLBAR = "USER_ESHOP_ADMIN_TOOLBAR",
  USER_B2B_ORDERS_CREATE = "USER_B2B_ORDERS_CREATE",
  USER_CSO = "USER_CSO",
  USER_EDIT_USER_ADDRESSES = "USER_EDIT_USER_ADDRESSES",
  USER_ADMIN_CONTRACT_WITHDRAWAL_REQUEST = "USER_ADMIN_CONTRACT_WITHDRAWAL_REQUEST",
  USER_ADMIN_MERCHANT_FEE_RULES = "USER_ADMIN_MERCHANT_FEE_RULES",
}

/** Types of tag.<p>Members:</p><ul><li><i>User</i> - User tag type can be edited by admin.</ li > <li><i>System</i> - System tag type is triggered by automatic systems and can't be manually changed.</ li > <li><i>Personalized</i> - Personalized tag types are created by user behaviour.</ li > </ul> */
export enum VinistoHelperDllEnumsTagTagType {
  User = "User",
  System = "System",
  Personalized = "Personalized",
}

/** Contains list of possible columns for sorting<p>Members:</p><ul></ul> */
export enum VinistoHelperDllEnumsTagSortableColumns {
  ID = "ID",
  NAME = "NAME",
  URL = "URL",
  ORDER_IN_FILTER = "ORDER_IN_FILTER",
}

/** Contains list of possible supplier type<p>Members:</p><ul><li><i>PRODUCER</i> - Supplier type - producer</ li > <li><i>IMPORTER</i> - Supplier type - importer</ li > </ul> */
export enum VinistoHelperDllEnumsSupplierSupplierType {
  PRODUCER = "PRODUCER",
  IMPORTER = "IMPORTER",
}

/** Contains list of possible specification type<p>Members:</p><ul><li><i>TEXT</i> - Text specification - free text</ li > <li><i>COMBO_BOX</i> - Selected value from predefined list of values</ li > <li><i>CHECK_BOX</i> - Checkbox - true/false</ li > <li><i>NUMBER</i> - Number value specification with possible unit specification</ li > <li><i>NUMBER_IMPERIAL</i> - Number value specification with possibility to define value in both metric and imperial units</ li > <li><i>DECIMAL_NUMBER</i> - Decimal number value with possible unit specification</ li > <li><i>DECIMAL_NUMBER_IMPERIAL</i> - Decimal number value specification with possibility to define value in both metric and imperial units</ li > <li><i>MULTI_COMBO_BOX</i> - List of selected values from predefined list of values</ li > <li><i>PRICE</i> - Price specification</ li > </ul> */
export enum VinistoHelperDllEnumsSpecificationSpecificationType {
  TEXT = "TEXT",
  COMBO_BOX = "COMBO_BOX",
  CHECK_BOX = "CHECK_BOX",
  NUMBER = "NUMBER",
  NUMBER_IMPERIAL = "NUMBER_IMPERIAL",
  DECIMAL_NUMBER = "DECIMAL_NUMBER",
  DECIMAL_NUMBER_IMPERIAL = "DECIMAL_NUMBER_IMPERIAL",
  MULTI_COMBO_BOX = "MULTI_COMBO_BOX",
  PRICE = "PRICE",
}

/** Contains list of possible columns for sorting<p>Members:</p><ul><li><i>VALUE</i> - Display value in a language of the combobox allowed value</ li > <li><i>URL</i> - Name of the value</ li > <li><i>LANGUAGE</i> - Language version of the value</ li > <li><i>SCORE</i> - Score of the value</ li > </ul> */
export enum VinistoHelperDllEnumsSpecificationSortableColumnsComboValues {
  VALUE = "VALUE",
  URL = "URL",
  LANGUAGE = "LANGUAGE",
  SCORE = "SCORE",
}

/** Contains list of possible columns for sorting<p>Members:</p><ul></ul> */
export enum VinistoHelperDllEnumsSpecificationSortableColumns {
  ID = "ID",
  NAME = "NAME",
  ORDER = "ORDER",
  ORDER_DETAIL = "ORDER_DETAIL",
  HIDDEN = "HIDDEN",
  SPECIFICATION_TYPE = "SPECIFICATION_TYPE",
}

/** <p>Members:</p><ul></ul> */
export enum VinistoHelperDllEnumsSpecificationProductAttributeTab {
  Property = "Property",
  NutritionalValue = "NutritionalValue",
  Composition = "Composition",
}

/** Contains list of possible columns for sorting<p>Members:</p><ul><li><i>IS_FOR_LOGGED_USER</i> - Sort by Product.IsForLogged property</ li > <li><i>WAREHOUSE_ID</i> - Sort by Product.WarehouseId property</ li > </ul> */
export enum VinistoHelperDllEnumsProductSortableColumns {
  ID = "ID",
  NAME = "NAME",
  URL = "URL",
  LAST_VIEWED = "LAST_VIEWED",
  IS_DELETED = "IS_DELETED",
  IS_ENABLED = "IS_ENABLED",
  IS_FOR_LOGGED_USER = "IS_FOR_LOGGED_USER",
  WAREHOUSE_ID = "WAREHOUSE_ID",
}

/** Contains list of possible types Product API - Category Homepage<p>Members:</p><ul><li><i>HEAD</i> - Represents place in HomePage</ li > <li><i>BLOCK</i> - Represents place in HomePage</ li > </ul> */
export enum VinistoHelperDllEnumsProductHomePageCategoryType {
  HEAD = "HEAD",
  BLOCK = "BLOCK",
}

/** <p>Members:</p><ul></ul> */
export enum VinistoHelperDllEnumsPriceLevel {
  Level1 = "Level1",
  Level2 = "Level2",
  Level3 = "Level3",
  Level4 = "Level4",
  Level5 = "Level5",
  Level6 = "Level6",
  Level7 = "Level7",
  Level8 = "Level8",
  Level9 = "Level9",
  Level10 = "Level10",
  VinistoPlus = "VinistoPlus",
}

/** <p>Members:</p><ul></ul> */
export enum VinistoHelperDllEnumsPriceDiscountType {
  VinistoDiscount = "VinistoDiscount",
  SupplierDiscount = "SupplierDiscount",
  VolumeDiscount = "VolumeDiscount",
  GroupDiscount = "GroupDiscount",
  SetDiscount = "SetDiscount",
}

/** State of the order<p>Members:</p><ul><li><i>NONE</i> - No state</ li > <li><i>CREATED</i> - Newly created order</ li > <li><i>PAID</i> - Order is in process</ li > <li><i>IN_WMS</i> - Order is handed over to wms</ li > <li><i>WMS_ACCEPTED</i> - WMS accepted the order and started to process it</ li > <li><i>WMS_INCOMPLETE</i> - Order is not possible to deliver, not all products are available in warehouse</ li > <li><i>WMS_READY</i> - Order is prepared and ready to sent</ li > <li><i>SENT</i> - Order was sent</ li > <li><i>DELIVERED</i> - Order was delivered</ li > <li><i>CANCELLED</i> - Order was cancelled</ li > <li><i>RETURNED</i> - Ordered was returned back</ li > <li><i>REFUNDED</i> - Order is refunded</ li > <li><i>REVERT_FINANCE_AND_FEES</i> - Order is refunded</ li > <li><i>RETURNING_GOODS</i> - Returning goods from order</ li > <li><i>LOSS_EVENT</i> - Order canceled as loss event</ li > <li><i>DONE</i> - Order is completed.</ li > </ul> */
export enum VinistoHelperDllEnumsOrderOrderState {
  NONE = "NONE",
  CREATED = "CREATED",
  PAID = "PAID",
  IN_WMS = "IN_WMS",
  WMS_ACCEPTED = "WMS_ACCEPTED",
  WMS_INCOMPLETE = "WMS_INCOMPLETE",
  WMS_READY = "WMS_READY",
  SENT = "SENT",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
  RETURNED = "RETURNED",
  REFUNDED = "REFUNDED",
  REVERT_FINANCE_AND_FEES = "REVERT_FINANCE_AND_FEES",
  RETURNING_GOODS = "RETURNING_GOODS",
  LOSS_EVENT = "LOSS_EVENT",
  DONE = "DONE",
}

/** Contains list of possible languages<p>Members:</p><ul><li><i>CZECH</i> - Czech language</ li > <li><i>SLOVAK</i> - Slovak language</ li > <li><i>ENGLISH</i> - English</ li > <li><i>GERMAN</i> - German</ li > </ul> */
export enum VinistoHelperDllEnumsLanguage {
  CZECH = "CZECH",
  SLOVAK = "SLOVAK",
  ENGLISH = "ENGLISH",
  GERMAN = "GERMAN",
}

/** Identifies object type to which an image is assigned<p>Members:</p><ul><li><i>Product</i> - Type for Product object</ li > <li><i>Bundle</i> - Type for Bundle object</ li > <li><i>Category</i> - Type for Category object</ li > <li><i>Supplier</i> - Type for Supplier object</ li > <li><i>CarouselTop</i> - Type for Slider carousel object of type HP_TOP</ li > <li><i>CarouselBottom</i> - Type for Slider carousel object of type HP_BOTTOM</ li > <li><i>CarouselProductDetail</i> - Type for Slider carousel object of type PRODUCT_DETAIL</ li > <li><i>Payment</i> - Type for Payment object</ li > <li><i>HP_USP</i> - Represents Slider carousel USP Banner</ li > <li><i>ProductDetailUSP</i> - Represents Slider carousel product detail USP Banner</ li > <li><i>SpecificationDefinition</i> - Represents Specification definition object</ li > <li><i>SpecificationValue</i> - Represents Specification allowed value object</ li > <li><i>Icon</i> - Represents icon in svg format</ li > <li><i>CarouselProductList</i> - Type for Slider carousel object of type PRODUCT_LIST</ li > <li><i>DiscountCoupon</i> - Type for Discount coupon object</ li > </ul> */
export enum VinistoHelperDllEnumsImageImageObjectType {
  Product = "Product",
  Bundle = "Bundle",
  Category = "Category",
  Supplier = "Supplier",
  CarouselTop = "CarouselTop",
  CarouselBottom = "CarouselBottom",
  CarouselProductDetail = "CarouselProductDetail",
  Payment = "Payment",
  HP_USP = "HP_USP",
  ProductDetailUSP = "ProductDetailUSP",
  SpecificationDefinition = "SpecificationDefinition",
  SpecificationValue = "SpecificationValue",
  Icon = "Icon",
  CarouselProductList = "CarouselProductList",
  DiscountCoupon = "DiscountCoupon",
}

/** Contains list of possible columns for sorting<p>Members:</p><ul></ul> */
export enum VinistoHelperDllEnumsHomePageCustomCarouselSortableColumnsDetail {
  BUNDLE_NAME = "BUNDLE_NAME",
  BUNDLE_SEQUENCE_NUMBER = "BUNDLE_SEQUENCE_NUMBER",
}

/** Contains list of possible columns for sorting<p>Members:</p><ul></ul> */
export enum VinistoHelperDllEnumsHomePageCustomCarouselSortableColumns {
  ID = "ID",
  NAME = "NAME",
  SEQUENCE_NUMBER = "SEQUENCE_NUMBER",
}

/** Contains list of possible columns for sorting<p>Members:</p><ul></ul> */
export enum VinistoHelperDllEnumsHomePageCategorySortableColumns {
  ID = "ID",
  SEQUENCE_NUMBER = "SEQUENCE_NUMBER",
}

/** Contains list of possible columns for sorting<p>Members:</p><ul><li><i>ID</i> - Sort by GiftRules.Id property</ li > <li><i>NAME</i> - Sort by GiftRules.Name property</ li > <li><i>VALID_FROM</i> - Sort by GiftRules.ValidFrom property</ li > <li><i>VALID_TO</i> - Sort by GiftRules.ValidTo property</ li > <li><i>GIFT_RULE_TYPE</i> - Sort by GiftRules.RuleType property</ li > <li><i>IS_ACTIVE</i> - Sort by GiftRules.IsActive property</ li > </ul> */
export enum VinistoHelperDllEnumsGiftSortableColumns {
  ID = "ID",
  NAME = "NAME",
  VALID_FROM = "VALID_FROM",
  VALID_TO = "VALID_TO",
  GIFT_RULE_TYPE = "GIFT_RULE_TYPE",
  IS_ACTIVE = "IS_ACTIVE",
}

/** Contains list of possible gift rule types<p>Members:</p><ul><li><i>GIFT_ORDER_PRICE_FROM</i> - Gift rule from price</ li > <li><i>GIFT_CATEGORY</i> - Gift rule for products with category</ li > <li><i>GIFT_SUPPLIER</i> - Gift rule for products from supplier</ li > <li><i>GIFT_SPECIFICATION</i> - Gift rule for products with specification</ li > </ul> */
export enum VinistoHelperDllEnumsGiftGiftRuleType {
  GIFT_ORDER_PRICE_FROM = "GIFT_ORDER_PRICE_FROM",
  GIFT_CATEGORY = "GIFT_CATEGORY",
  GIFT_SUPPLIER = "GIFT_SUPPLIER",
  GIFT_SPECIFICATION = "GIFT_SPECIFICATION",
}

/** Contains list of possible columns for sorting<p>Members:</p><ul></ul> */
export enum VinistoHelperDllEnumsEvaluationSortableColumns {
  ID = "ID",
  PRODUCT_ID = "PRODUCT_ID",
  USER_ID = "USER_ID",
  TIME = "TIME",
  STARS = "STARS",
}

/**
 * Contains a list of all available specific error codes<p>Members:</p><ul><li><i>API_KEY_NOT_FOUND</i> - Platform id not found.</ li > <li><i>PLATFORM_ID_NOT_FOUND</i> - Platform id not found.</ li > <li><i>WS_ID_NOT_PROVIDED</i> - Web socket id is not provided.</ li > <li><i>INVALID_TIME_RANGE</i> - Co-dependent data time data is invalid (e.g. timeFrom > timeTo)</ li > <li><i>INVALID_TIMESTAMP</i> - Value is not a valid unix timestamp</ li > <li><i>USER_DOES_NOT_EXIST</i> - Requested user does not exists</ li > <li><i>USER_AUTH_ERROR</i> - Authorization error - requested user login hash was not found</ li > <li><i>USER_LOGIN_ERROR</i> - Login error - user could not be logged with provided userName and password</ li > <li><i>USER_REGISTER_ERROR_USER_EXIST</i> - Could not register user - already exists (same email already used)</ li > <li><i>USER_REGISTER_ERROR_AGREEMENT_CC</i> - Could not register user, BC was not checked</ li > <li><i>USER_WRONG_OLD_PASS</i> - Could not change password - old password is wrong</ li > <li><i>USER_WRONG_HASH</i> - Could not get user by hash - hash was wrong</ li > <li><i>USER_WRONG_EMAIL</i> - Could not get user by email - wrong email</ li > <li><i>USER_ADDRESS_NOT_FOUND</i> - Provided user addressId was not found</ li > <li><i>USER_ADDRESSES_NOT_FOUND</i> - Provided user addressIds was not found</ li > <li><i>USER_UPDATE_LOG_ERROR</i> - Error during updating user log</ li > <li><i>USER_CREATE_EMAIL_VERIFICATION_HASH_ERROR</i> - Error during creating email verification hash</ li > <li><i>USER_RESET_PASSWORD_HASH_ERROR</i> - Error during reseting user password - wrong hash</ li > <li><i>USER_UPDATE_USER_EMAIL_EXIST</i> - Cannot update user email - this email is already used by other user</ li > <li><i>USER_EMAIL_SENT_ERROR</i> - Error during sending an email</ li > <li><i>USER_BILLING_INFO_NOT_FOUND</i> - Could not found requested billing information</ li > <li><i>USER_BILLING_INFOS_NOT_FOUND</i> - Could not found requested billing information</ li > <li><i>USER_INVOICE_GET_ERROR</i> - Error during creating an invoice</ li > <li><i>USER_PERMISSION_IMPORT_ERROR</i> - Error during import from csv</ li > <li><i>USER_LOGIN_HASH_NOT_PROVIDED_FOR_B2C</i> - User login hash is not provided when create request from B2C</ li > <li><i>API_KEY_NOT_PROVIDED_FOR_EXTERNAL_PLATFORM</i> - Api key is not provided when create request from B2B</ li > <li><i>USER_LOGIN_ERROR_HAS_THIRD_PARTY_TOKEN</i> - Login error - user could not be logged with provided userName and password, but has access third-party auth token from previous login.</ li > <li><i>EXTERNAL_APP_TYPE_EMPTY</i> - External app type is empty.</ li > <li><i>USER_ALREADY_HAS_DEFAULT_ADDRESS</i> - user already has default address.</ li > <li><i>MERCHANT_FEE_PERCENTAGE_LESS_THEN_ZERO</i> - Merchant fee percentage is less then zero. Must be greater or equals to zero.</ li > <li><i>MERCHANT_IS_ASSIGNED_TO_COMPANY_WHICH_HAS_NOT_OTHER_MERCHANTS</i> - Merchant deletion is allowed, when merchant is not assigned to any company or each company where merchant is assigned has other merchants.</ li > <li><i>MERCHANT_ID_NOT_FOUND</i> - Merchant id is not set.</ li > <li><i>INVOICE_DUE_DATE_LESS_OR_EQUALS_ZERO</i> - Invoice due date must be greater then zero.</ li > <li><i>MONTHLY_TURNOVER_LESS_OR_EQUALS_ZERO</i> - Monthly turnover must be greater then zero.</ li > <li><i>ORDERING_FREQUENCY_LESS_OR_EQUALS_ZERO</i> - Ordering frequency must be greater then zero.</ li > <li><i>CREDIT_LESS_OR_EQUALS_ZERO</i> - Credit must be greater then zero.</ li > <li><i>USER_LOGIN_HASH_NOT_PROVIDED</i> - User login hash not provided.</ li > <li><i>ICO_NOT_PROVIDED</i> - Ico not provided.</ li > <li><i>COMPANY_OR_MERCHANT_CANNOT_HAS_CSO_OR_B2B_ORDERS_CREATE_RIGHT</i> - Ico not provided.</ li > <li><i>COMPANY_CANNOT_PAY_BY_CREDIT</i> - Company cannot pay by credit.</ li > <li><i>USER_NOT_FOUND</i> - User not found.</ li > <li><i>USER_IS_NOT_MERCHANT</i> - User is not merchant.</ li > <li><i>PRODUCT_PRICE_DOES_NOT_EXIST_IN_CURRENCY</i> - Product does not contain price in provided currency</ li > <li><i>PRODUCT_NAME_DOES_NOT_EXIST_IN_LANG</i> - Requested product does not hav a name in provided language</ li > <li><i>CATEGORY_BUNDLES_COUNT_NOT_COUNTED</i> - Bundles count for dynamic category was not counted.</ li > <li><i>SPECIFICATION_ALLOWED_VALUES_EMPTY</i> - Allowed values for specification are null or empty.</ li > <li><i>CATEGORY_URL_OR_META_EMPTY</i> - Category url or meta description is null or empty</ li > <li><i>VIRTUAL_CATEGORY_NECESSARRY_PROPERTIES_EMPTY</i> - Some from necessary virtual category properties (url, titleH1, seo title or seo description) is empty.</ li > <li><i>BUNDLE_PRICE_DOES_NOT_EXIST_IN_CURRENCY</i> - Requested bundle does not have price in provided currency</ li > <li><i>BUNDLE_NAME_DOES_NOT_EXIST_IN_LANG</i> - Requested bundle does not have name in provided language</ li > <li><i>BUNDLE_IS_SAME_AS_ALT_BUNDLE</i> - Cannot add alternative bundle as it is the same one</ li > <li><i>BUNDLE_IS_NOT_ENABLED_OR_IS_DELETED</i> - Requested package does not have the "Is Enabled" flag set to true or the "Is Deleted" flag set to false</ li > <li><i>BUNDLE_IS_NOT_ENABLED_OR_IS_DELETED_OR_IS_FOR_LOGGED_USERS_OR_IS_NOT_ALLOWED_TO_SALE_IN_COUNTRY</i> - Requested package does not have the "Is Enabled" flag set to true or the "Is Deleted" flag set to false OR the "IsForLogged" flag set to true</ li > <li><i>BUNDLE_TAG_SYSTEM_TYPE_CANT_BE_REMOVED</i> - Tag with System type can't be removed from bundle.</ li > <li><i>DISCOUNT_PERCENTAGE_LOWER_THAN_LIMIT</i> - Discount percentage is lower than minimal allowed discount</ li > <li><i>DISCOUNT_PERCENTAGE_HIGHER_THAN_LIMIT</i> - Discount percentage is higher than maximal allowed discount</ li > <li><i>DISCOUNT_PERCENTAGE_LOWER_THAN_MINIMAL_SALE_FEE</i> - Discount percentage is lower than minimal allowed fee</ li > <li><i>DISCOUNT_CREATE_BUNDLE_HAS_NOT_SET_SUPPLIER</i> - Create discount price with type SUPPLIER_DISCOUNT, but bundle has not set supplier.</ li > <li><i>DISCOUNT_BUNDLE_HAS_NOT_BASE_PRICE</i> - Bundle does not have base price for discount price currency</ li > <li><i>DISCOUNT_PRICE_CREATED_TO_THE_FUTURE</i> - Discount price must be created to the future</ li > <li><i>DISCOUNT_PRICE_TIME_FROM_GREATER</i> - Discount price time from is greater then time to</ li > <li><i>DISCOUNT_CURRENCY_NOT_EXISTS</i> - Currency not exists</ li > <li><i>BUNDLE_HAS_ACTIVE_DISCOUNT_PRICE</i> - Bundle already has active discount price</ li > <li><i>BUNDLE_MUST_CONTAIN_AT_LEAST_ONE_PRICE</i> - Bundle must contain at least one price</ li > <li><i>PRODUCT_CANNOT_BE_DELETED</i> - There is only one product in the Bundle, it cannot be deleted</ li > <li><i>ORDER_LIMITATION_TIME_FROM_GREATER</i> - OrderLimitation time valid from is greater then time valid to</ li > <li><i>ORDER_LIMITATION_CREATED_TO_THE_FUTURE</i> - OrderLimitation must be created to the future</ li > <li><i>QUANTITY_SET_TO_ORDER_LIMITATION</i> - Quantity bundle in one order was set to order limitation for this bundle</ li > <li><i>ORDER_LIMITATION_EXCEEDED</i> - Quantity bundle in one order is greater than the order limitation for this bundle</ li > <li><i>BUNDLE_IS_NOT_SET</i> - Bundle is not expected set</ li > <li><i>BUNDLE_IS_SET</i> - Bundle is unexpectedly set to type SET</ li > <li><i>BUNDLE_SET_PRICE_CANNOT_BE_CHANGED</i> - Bundle is SET type and its price cannot be changed (it will be calculated by sum of prices of individual bundles in set)</ li > <li><i>BUNDLE_SUPPLIER_IS_NULL_OR_EMPTY</i> - Bundle is not set and supplier is null or empty</ li > <li><i>BUNDLE_SET_PRICE_HIGHER_STANDARD_PRICE</i> - Bundle price in set is higher then bundle standard price</ li > <li><i>DEFINED_PRICE_TYPE_FOR_NON_B2B_REQUEST</i> - Price type is defined when request is created from b2c</ li > <li><i>NOT_DEFINED_PRICE_TYPE_FOR_B2B_REQUEST</i> - Price type is not defined when request is created from b2b</ li > <li><i>UNSUPPORTED_PRICE_TYPE_FOR_EXTERNAL_PLATFORM_REQUEST</i> - Unsupported price type when request is created from b2b</ li > <li><i>UNSUPPORTED_PRICE_TYPE_FOR_B2C_REQUEST</i> - Unsupported price type when request is created from b2c</ li > <li><i>UNSUPPORTED_PRICE_TYPE</i> - Unsupported price type</ li > <li><i>BUNDLE_IS_NOT_ALLOWED_FOR_PROVIDED_PLATFORM</i> - Bundle is not available for provided platform</ li > <li><i>BUNDLE_NO_PRICE_DEFINED</i> - There is no base or discount price defined for provided level.</ li > <li><i>BUNDLE_PRICE_DOES_NOT_EXIST</i> - Price by given id does not exists</ li > <li><i>BUNDLE_NOT_CONFIRMERD_COULD_NOT_SET_ENABLED</i> - Could not set bundle as enabled because bundle state is not empty and current bundle state is not confirmed</ li > <li><i>PRICE_NOT_DEFINED</i> - Price is not defined when create fee record from non platform request.</ li > <li><i>PRICE_DEFINED</i> - Price is defined when create fee record from platform request.</ li > <li><i>BUNDLE_AVAILABLE_ON_PLATFORMS_IS_EMPTY</i> - Array of available of platforms could not be empty</ li > <li><i>BUNDLE_IS_NOT_ALLOWED_FOR_EXTERNAL_PLATFORM</i> - Bundle is not allowed for external platform.</ li > <li><i>BUNDLE_IS_NOT_ALLOWED_FOR_B2B</i> - Bundle is not allowed for b2b.</ li > <li><i>SPECIFICATION_DEFINITION_NOT_REQUIRED_SUBTYPE</i> - Provided specification definition is not in requested Type/Subtype. e.g wrong specification type</ li > <li><i>SPECIFICATION_DEFINITION_ALLOWED_VALUE_NAME_NOT_FOUND</i> - specified allowed value not found. E.g. combobox has named allowed value identified by valueName. And provided value
 *             does not exist for respective combo specification.</ li > <li><i>SPECIFICATION_IS_NOT_ALLOWED_TO_ADD_IMAGE</i> - Specifiation is not allowed to add image. Only MultiCombobox and Combobox specification are allowed to add image.</ li > <li><i>SPECIFICATION_ALLOWED_VALUE_KEY_EMPTY</i> - Specifiation allowd value key is null or empty.</ li > <li><i>SPECIFICATION_ALLOWED_VALUE_NAME_EMPTY</i> - Specifiation allowd value name is null or empty.</ li > <li><i>BASKET_DOES_NOT_HAVE_CURRENCY</i> - Basket does not have defined currency</ li > <li><i>BASKET_IS_EMPTY</i> - Basket is empty</ li > <li><i>BASKET_IS_NOT_APPROVED</i> - Basket is not approved.</ li > <li><i>ORDER_FLEXIBEE_PRICE_ITEM_CREATE_ERROR</i> - Could not create price item in FlexiBee</ li > <li><i>ORDER_FLEXIBEE_INVOICE_ITEM_CREATE_ERROR</i> - Could not create an invoice item in FlexiBee</ li > <li><i>ORDER_FLEXIBEE_INVOICE_CREATE_ERROR</i> - Could not create an invoice in FlexiBee</ li > <li><i>ORDER_FLEXIBEE_INVOICE_PDF_GENERATION_ERROR</i> - Could not generate a PDF invoice in FlexiBee</ li > <li><i>ORDER_FLEXIBEE_INVOICE_PDF_STORE_ERROR</i> - Could not store generated PDF invoice to the disc</ li > <li><i>ORDER_FLEXIBEE_INVOICE_GET_ERROR</i> - Could not get invoice from Flexibee server</ li > <li><i>ORDER_FLEXIBEE_DELIVERY_CREATE_ERROR</i> - Could not create delivery in FlexiBee</ li > <li><i>ORDER_FLEXIBEE_PAYMENT_CREATE_ERROR</i> - Error creating payment in flexibee</ li > <li><i>ORDER_FLEXIBEE_STORAGE_CARD_CREATE_ERROR</i> - Error creating storage card in flexibee</ li > <li><i>ORDER_FLEXIBEE_STOCK_MOVEMENT_CREATE_ERROR</i> - Error creating stock movement in flexibee</ li > <li><i>ORDER_BILLING_ADDRESSESB_BOTH_NULL</i> - Error when creating order and billingAddressId and billingAddress are null</ li > <li><i>ORDER_BILLING_ADDRESSES_BOTH_NOT_NULL</i> - Error when creating order and billingAddressId and billingAddress are both not null</ li > <li><i>DISCOUNT_COUPON_INVALID_CURRENCY</i> - Discount coupon order price has invalid currency</ li > <li><i>DISCOUNT_COUPON_BELOW_ORDER_PRICE_LIMIT</i> - Discount coupon is below of order total price limit</ li > <li><i>DISCOUNT_COUPON_NO_LONGER_ACTIVE</i> - Discount coupon is no longer active</ li > <li><i>DISCOUNT_COUPON_IS_USED_IN_ANOTHER_ORDER</i> - Discount coupon is used in another order</ li > <li><i>DISCOUNT_COUPON_IS_OUT_OF_EXPIRATION</i> - Discount coupon is out of expiration</ li > <li><i>DISCOUNT_COUPON_IS_SCHEDULED</i> - Discount coupon is scheduled</ li > <li><i>ORDER_CREATE_ITEM_PRODUCT_DATA_BROKEN</i> - When create order items, product does not have defined all neccessary data</ li > <li><i>ORDER_CREATE_ITEM_BUNDLE_PRICE</i> - When create order items, bundle does not have price</ li > <li><i>ORDER_HAS_NOT_ORDER_NUMBER</i> - Order has not generated order number</ li > <li><i>ORDER_QR_CODE_NOT_GENERATED</i> - Order has not generated qr code</ li > <li><i>ORDER_COULD_NOT_BE_CANCELLED</i> - Order could not be cancelled</ li > <li><i>ORDER_COULD_NOT_BE_EDIT_ADDRESSES</i> - Order could not be edit Addresses</ li > <li><i>DELIVERY_COSTS_LESS_ZERO</i> - Delivery costs are less then zero</ li > <li><i>DELIVERY_NOT_SERVING_ZIP</i> - Delivery is not serving provided address</ li > <li><i>ORDER_UNKNOWN_ORDER_STATE</i> - Unkonwn order state for order change</ li > <li><i>ITEMS_DOES_NOT_MATCH_DISCOUNT_COUPON_LIMITATION_REQUIREMENTS</i> - Order does not match discnout coupon limitation requirements</ li > <li><i>DISCOUNT_COUPON_SUPPLIER_CREATION_INSUFFICIENT_TIME_SPAN</i> - Discount coupon created by a supplier has >= 14 day TimeSpan between ValidFrom and ValidTo.</ li > <li><i>DISCOUNT_COUPON_PERCENTAGE_VALUE_INVALD</i> - Discount coupon percentage value is lower then 0 or higher then 100</ li > <li><i>DISCOUNT_COUPON_AMOUNT_VALUE_INVALD</i> - Discount coupon amount value is lower then 0</ li > <li><i>DISCOUNT_COUPON_AMOUNT_VALUE_HIGHER_THEN_ALLOWD_FROM</i> - Discount coupon amount value is higher then allowed from price</ li > <li><i>DISCOUNT_COUPON_PRICE_HIGHER_DISCOUNTED_PRODUCTS_PRICE</i> - Discount coupon price is higher then products price to discount</ li > <li><i>DISCOUNT_COUPON_CREATED_BY_SUPPLIER_MUST_BE_VISIBLE_ON_PRODUCT_DETAIL</i> - If discount coupon is created by the supplier (IsSupplierDiscount is true),
 *             it must always be displayed on product detail (IsVisibleOnProductDetail must be set to true)</ li > <li><i>DELIVERY_ALTERNATIVE_NAME_MUST_NOT_BE_NULL_OR_EMPTY</i> - If flag IsOnProductDetail is true that alternativeName must not be null or empty</ li > <li><i>DISCOUNT_COUPON_ACTIVE_CODE_ALREADY_EXISTS</i> - If active discount code within creation and expiration date already exists, you can't activate another one with same code</ li > <li><i>DISCOUNT_COUPON_IS_NOT_COMBINABLE</i> - If discount code is not combinable, you can't use it with another discount coupon in same basket</ li > <li><i>DISCOUNT_COUPON_IS_NOT_FOR_DISCOUNTED_ITEMS</i> - If discount code is not for discounted items, discount is not calculated for items on sale</ li > <li><i>DISCOUNT_COUPON_ID_IS_ALREADY_IN_BASKET</i> - If discount coupon is already in basket, you can't add same discount coupon again</ li > <li><i>ORDER_STATE_COULD_NOT_BE_CHANGED_TO_IN_WMS</i> - Order could not be set as IN WMS</ li > <li><i>ORDER_REFUND_FAIL_NOT_IN_STATE_REVERT_FINANCE_AND_FEES</i> - Could not refund order because order is not in state REVERT_FINANCE_AND_FEES</ li > <li><i>ORDER_CREDIT_NOTE_ALREADY_EXISTS</i> - Credit note already exists</ li > <li><i>ORDER_INVOICE_DOES_NOT_EXISTS</i> - Order invoice does not exist. It has to be created to create credit note.</ li > <li><i>ORDER_CREDIT_NOTE_CREATION_ERROR</i> - Error during generation credit note</ li > <li><i>ORDER_CREDIT_NOTE_DICTIONARY_CREATION_ERROR</i> - Error during generation credit note</ li > <li><i>ORDER_CREDIT_NOTE_PDF_CREATION_ERROR</i> - Error during generation credit note</ li > <li><i>ORDER_ALREADY_CANCELLED</i> - Order already cancelled</ li > <li><i>ORDER_NOT_PAID</i> - Order not paid, StateChangeRecords does not contain PAID state</ li > <li><i>DISCOUNT_COUPON_NOT_APPLICABLE_IN_COUNTRY</i> - Discount coupon is not applicable in country of sale</ li > <li><i>NO_LIMITATION_DEFINITION</i> - No limitation definition</ li > <li><i>DISCOUNT_COUPON_IS_FOR_REGISTERED_USERS_ONLY</i> - Discount coupon can be used only by registered and logged in user.</ li > <li><i>DISCOUNT_COUPON_HAS_NOT_NAME_OR_DESCRIPTION</i> - Discount coupon has not name or description</ li > <li><i>DISCOUNT_COUPON_IS_LIMITED_TO_CATEGORY</i> - Discount coupon is limited to category.</ li > <li><i>DISCOUNT_COUPON_IS_NOT_REUSABLE</i> - Discount coupon is not reusable.</ li > <li><i>FEE_RULE_IS_ACTIVE_OR_ENDING_SOON</i> - Could not edit fee rule because is in state active or ending soon.</ li > <li><i>FEE_RULE_CREATE_STATE_NOT_ALLOWED</i> - State is not active or concept when create fee rule.</ li > <li><i>FEE_RULE_EMPTY_FEE_VALUES</i> - Origin or destination fees are empty.</ li > <li><i>FEE_RULE_VALID_FROM_IS_HIGHER_THEN_VALID_TO</i> - Valid from is higher then valid to.</ li > <li><i>FEE_RULE_BUNDLE_PRICE_FROM_IS_HIGHER_THEN_BUNDLE_PRICE_TO</i> - Bundle price from is higher then bundle price to.</ li > <li><i>FEE_RULE_BUNDLE_AMOUNT_FROM_IS_HIGHER_THEN_BUNDLE_AMOUNT_TO</i> - Bundle amount from is higher then bundle amount to.</ li > <li><i>FEE_RULE_INVALID_TURNOVER</i> - Invalid turnover.</ li > <li><i>FEE_RULE_COULD_NOT_SET_STATE</i> - Could not set state.</ li > <li><i>FEE_RULE_EDIT_STATE_NOT_ALLOWED</i> - State is not active or inactive or concept when edit fee rule.</ li > <li><i>FEE_RULE_OVERLAPPING_LOGISTIC_CONDITION</i> - Logistic fee rule has overlapping logistic condition with other logistic fee rule.</ li > <li><i>FEE_RULE_TYPE_NOT_ALLOWED</i> - Type is not sale or logistic when check bundles for fee rule.</ li > <li><i>ANY_BUNDLES_NOT_MATCHING_FEE_RULES</i> - It exists some bundles not matching any fee rule currently.</ li > <li><i>FEE_RULE_MAIN_CONDITIONS_NULL</i> - Main conditions (BundleIds, SupplierIds, Specifications, Tags, CategoryIds) for dynamic rule are null.</ li > <li><i>FEE_RULE_FOUND_FOR_ITEM</i> - Exists fee rule in states active or ending soon for provided item.</ li > <li><i>FEE_RULE_COULD_NOT_ACTIVATE_BECAUSE_IS_IN_PAST</i> - Could not activate fee rule because is valid in past.</ li > <li><i>FEE_RULE_SPECIFICATIONS_CONTAINS_NULL</i> - Fee rule specifications contains null in values.</ li > <li><i>FEE_RULE_BUNDLES_CONTAINS_NULL</i> - Fee rule bundles contains null in values.</ li > <li><i>FEE_RULE_TAGS_CONTAINS_NULL</i> - Fee rule tags contains null in values.</ li > <li><i>FEE_RULE_SUPPLIERS_CONTAINS_NULL</i> - Fee rule suppliers contains null in values.</ li > <li><i>FEE_RULE_CATEGORIES_CONTAINS_NULL</i> - Fee rule categories contains null in values.</ li > <li><i>BASKET_OWNER_IS_NOT_LOGGED_USER</i> - Basket owner is not logged user.</ li > <li><i>BASKET_OWNER_IS_NOT_SUPPORT_OR_MERCHANT_COULD_NOT_CREATE_ORDER_FOR_COMPANY</i> - Basket owner is not support or merchant could not create order for company.</ li > <li><i>COMPANY_IS_NOT_ACTIVE</i> - Company is active.</ li > <li><i>DISCOUNT_COUPON_LIMITATION_NOT_PROVIDED</i> - Discount coupon limitation must be provided for non gift coupons.</ li > <li><i>FEE_LESS_THEN_ZERO</i> - Fee value is less then zero.</ li > <li><i>IMAGE_FILE_TYPE_NOT_SUPPORTED_ERROR</i> - Provided file type is not supported</ li > <li><i>IMAGE_STORE_FILES_ERROR</i> - Could not store the image to the disc</ li > <li><i>SUPPLIER_DOES_NOT_EXIST</i> - Requested supplier does not exists</ li > <li><i>SUPPLIER_ADDRESS_NOT_FOUND</i> - Requested supplier address could not be found</ li > <li><i>SUPPLIER_ADDRESSES_NOT_FOUND</i> - Requested supplier addresses could not be found</ li > <li><i>SUPPLIER_DELETE_HAS_BUNDLE</i> - Supplier has bundle</ li > <li><i>SUPPLIER_ADD_CERTIFICATE</i> - Supplier Add certificate</ li > <li><i>SUPPLIER_DELETE_CERTIFICATE</i> - Supplier Delete certificate</ li > <li><i>STOCKING_REQUEST_MODIFIED_BUNDLE_NOT_OWNED_BY_SUPPLIER</i> - Supplier not own bundle to modify in stocking request</ li > <li><i>STOCKING_REQUEST_ADD_RECEIPT</i> - Supplier stocking request add receipt</ li > <li><i>STOCKING_REQUEST_ALREADY_SENT</i> - Stocking request was already sent to supplier</ li > <li><i>STOCKING_REQUEST_DELIVERY_DATE_NOT_FUTURE</i> - Delivery date is not in future</ li > <li><i>STOCKING_REQUEST_DELIVERY_TYPE_NOT_VINISTO</i> - Delivery can by modified only for stocking request with type VINISTO_DELIVERY</ li > <li><i>STOCKING_REQUEST_CANNOT_BE_SENT_CREATED_WITHOUT_BUNDLES</i> - Stocking request cannot be sent because is created withou bundles</ li > <li><i>STOCKING_REQUEST_ALREADY_CONFIRMED</i> - Stocking request was already confirmed by supplier or administrator</ li > <li><i>STOCKING_REQUEST_CAN_BE_CONFIRMED_IN_STATE_SENT</i> - Stocking request can be confirmed only in state SENT</ li > <li><i>STOCKING_REQUEST_CANCEL_MUST_BE_IN_STATE_SENT</i> - To stocking request cancel must be request in state SENT</ li > <li><i>STOCKING_REQUEST_CANNOT_BE_CANCELED_IS_IN_STATE_WMS_DELIVERED</i> - Stocking request cannot be canceled in state WMS_DELIVERED</ li > <li><i>STOCKING_REQUEST_ALREADY_CANCELED</i> - Stocking request was already canceled</ li > <li><i>STOCKING_REQUEST_BUNDLE_CANNOT_BE_MODIFIED_IS_IN_STATE_WMS_DELIVERED</i> - Bundle in stocking request cannot be modified because is in state WMS_DELIVERED</ li > <li><i>STOCKING_REQUEST_ALREADY_WMS_STOCKED</i> - Stocking request was already WMS_STOCKED</ li > <li><i>STOCKING_REQUEST_CANNOT_BE_WMS_STOCKED_MUST_BE_IN_STATE_WMS_DELIVERED</i> - Stocking request cannot be closed because must be in state WMS_DELIVERED</ li > <li><i>STOCKING_REQUEST_CANNOT_BE_DELIVERY_ORDER_MUST_BE_IN_STATE_CONFRIMED</i> - Stocking request cannot be delivery order because must be in state CONFIRMED</ li > <li><i>STOCKING_REQUEST_CANNOT_BE_DELIVERY_ORDER_IS_IN_STATE_WMS_DELIVERED</i> - Stocking request cannot be delivery order becaouse request is in state WMS_DELIVERED</ li > <li><i>STOCKING_REQUEST_CAN_BE_DELETED_TO_SENT_STATE</i> - Stocking request can be delted to sent state</ li > <li><i>STOCKING_REQUEST_ALREADY_WMS_DELIVERED</i> - Stocking request was already in state WMS_DELIVERED</ li > <li><i>STOCKING_REQUEST_NOT_BUNDLE_WITH_ONE_PRODUCT</i> - To stocking request can be added only bundle with one product</ li > <li><i>STOCKING_REQUEST_INVALID_DELIVERY_INTERVAL</i> - Delivery inerval is null or is not defined</ li > <li><i>STOCKING_REQUEST_WMS_CANNOT_BE_UPDATED_MUST_BE_IN_STATE_CONFRIMED</i> - WMS for stocking request cannot be updated because must be in state CONFIRMED</ li > <li><i>STOCKING_REQUEST_WMS_CANNOT_BE_UPDATED_IS_IN_STATE_WMS_DELIVERED</i> - WMS for stocking request cannot be updated becaouse request is in state WMS_DELIVERED</ li > <li><i>STOCKING_REQUEST_HAS_NOT_STATE_SENT_WMS</i> - Stocking request has not SENT_WMS</ li > <li><i>STOCKING_REQUEST_MUST_BE_IN_STATE_SENT</i> - Stocking request must be in state SENT</ li > <li><i>SUPPLIER_COUPON_PREFIX_EXIST</i> - Cannot create supplier - coupon prefix already exists</ li > <li><i>SUPPLIER_UPDATE_COUPON_PREFIX_EXIST</i> - Cannot update supplier - this coupon prefix is already used by other supplier</ li > <li><i>EXTERNAL_ORDER_ID_EMPTY</i> - External order id is null or empty.</ li > <li><i>APP_TYPE_MUST_NOT_BE_B2C</i> - App type must not be Vinisto_B2c.</ li > <li><i>GOPAY_PAYMENT_CREATION_ERROR</i> - Could not create GOPay payment</ li > <li><i>GOPAY_PAYMENT_STATUS_ERROR</i> - Error during requesting GoPay statues</ li > <li><i>GOPAY_PAYMENT_REFUND_ERROR</i> - Error during refunding in GoPay</ li > <li><i>GOPAY_PAYMENT_MATCHING_ORDER_GOPAY_ID_ERROR</i> - Could not find order and assign GoPay id to it</ li > <li><i>GOPAY_CARD_INFO_ERROR</i> - Could not get info about card.</ li > <li><i>GOPAY_PAYMENT_EXECUTION_ERROR</i> - Error throwed when execute payment.</ li > <li><i>CAROUSEL_AVAILABLE_TO_NOT_FUTURE</i> - Available to parameter is not in future</ li > <li><i>CAROUSEL_AVAILABLE_FROM_UNDEFINED</i> - Available from parameter is undefined</ li > <li><i>CAROUSEL_POSITION_UNDEFINED</i> - Position parameter is undefined</ li > <li><i>CAROUSEL_URL_UNDEFINED</i> - Url parameter is undefined</ li > <li><i>CAROUSEL_TYPE_UNDEFINED</i> - Type parameter is undefined</ li > <li><i>CAROUSEL_AVAILABLE_FROM_GREATHER_AVAILABLE_TO</i> - Available from parameter greather then available to parameter</ li > <li><i>CAROUSEL_IMAGE_DELETE</i> - Fail when delete image for slider carousel</ li > <li><i>ARTICLE_NO_AUTHORS</i> - Article without authors</ li > <li><i>ARTICLE_NOT_ALL_AUTHORS_FOUND</i> - Any authors for article was not found</ li > <li><i>ARTICLE_NOT_ALL_TAGS_FOUND</i> - Any tag for article was not found</ li > <li><i>ARTICLE_NOT_FOUND_SPECIFICATIONS</i> - No specifications for article</ li > <li><i>ARTICLE_NO_TITLE</i> - Try set no title to article</ li > <li><i>ARTICLE_NO_URL</i> - Try set no url to article</ li > <li><i>AUTOMATIC_COUPON_NAME_EMPTY</i> - Name parameter is empty</ li > <li><i>AUTOMATIC_COUPON_DICSOUNT_VALUE_LESS_ZERO</i> - Discount value parameter is less then zero</ li > <li><i>AUTOMATIC_COUPON_EXPIRATION_DAYS_LESS_ZERO</i> - Expiration days parameter is less then zero</ li > <li><i>AUTOMATIC_COUPON_MIN_ORDER_PRICE_LESS_ZERO</i> - Min order price parameter is less then zero</ li > <li><i>AUTOMATIC_COUPON_MAX_ORDER_PRICE_LESS_ZERO</i> - Max order price parameter is less then zero</ li > <li><i>AUTOMATIC_COUPON_MIN_ORDER_PRICE_NULL</i> - Min order price parameter is null</ li > <li><i>AUTOMATIC_COUPON_MAX_ORDER_PRICE_NULL</i> - Max order price parameter is null</ li > <li><i>AUTOMATIC_COUPON_MAX_ORDER_PRICE_LESS_MIN_ORDER_PRICE</i> - Max order price parameter is less then min order price</ li > <li><i>AUTOMATIC_COUPON_TRIGGER_DELAY_LESS_ZERO</i> - Trigger delay parameter is less than zero</ li > <li><i>CHANGE_REASON_NOT_ALLOWED_FOR_ADDING</i> - Quantity change reason is not allowed for adding quantity</ li > <li><i>CHANGE_REASON_NOT_ALLOWED_FOR_REMOVING</i> - Quantity change reason is not allowed for removing quantity</ li > <li><i>GIFT_RULE_LIMIT_FROM_IS_NULL</i> - Gift rule order limit from is null</ li > <li><i>GIFT_RULE_VALID_TO_LESS_VALID_FROM</i> - Gift rule valid to param is less then valid from param</ li > <li><i>GIFT_RULE_APPLICABLE_FROM_LESS_ONE</i> - Gift rule applicable from param is less then 1</ li > <li><i>GIFT_RULE_PRICE_TO_LESS_PRICE_FROM</i> - Gift rule order price from is grather then order price to</ li > <li><i>STOCKING_REQUEST_BUNDLE_WITH_CLEARANCE_SALE</i> - To stocking request can be added only bundle which is not on clearance sale</ li > <li><i>SYSTEM_TAG_MANIPULATION</i> - System tag manipulation is not allowed</ li > </ul>
 */
export enum VinistoHelperDllEnumsErrorSpecificError {
  API_KEY_NOT_FOUND = "API_KEY_NOT_FOUND",
  PLATFORM_ID_NOT_FOUND = "PLATFORM_ID_NOT_FOUND",
  WS_ID_NOT_PROVIDED = "WS_ID_NOT_PROVIDED",
  INVALID_TIME_RANGE = "INVALID_TIME_RANGE",
  INVALID_TIMESTAMP = "INVALID_TIMESTAMP",
  USER_DOES_NOT_EXIST = "USER_DOES_NOT_EXIST",
  USER_AUTH_ERROR = "USER_AUTH_ERROR",
  USER_LOGIN_ERROR = "USER_LOGIN_ERROR",
  USER_REGISTER_ERROR_USER_EXIST = "USER_REGISTER_ERROR_USER_EXIST",
  USER_REGISTER_ERROR_AGREEMENT_CC = "USER_REGISTER_ERROR_AGREEMENT_CC",
  USER_WRONG_OLD_PASS = "USER_WRONG_OLD_PASS",
  USER_WRONG_HASH = "USER_WRONG_HASH",
  USER_WRONG_EMAIL = "USER_WRONG_EMAIL",
  USER_ADDRESS_NOT_FOUND = "USER_ADDRESS_NOT_FOUND",
  USER_ADDRESSES_NOT_FOUND = "USER_ADDRESSES_NOT_FOUND",
  USER_UPDATE_LOG_ERROR = "USER_UPDATE_LOG_ERROR",
  USER_CREATE_EMAIL_VERIFICATION_HASH_ERROR = "USER_CREATE_EMAIL_VERIFICATION_HASH_ERROR",
  USER_RESET_PASSWORD_HASH_ERROR = "USER_RESET_PASSWORD_HASH_ERROR",
  USER_UPDATE_USER_EMAIL_EXIST = "USER_UPDATE_USER_EMAIL_EXIST",
  USER_EMAIL_SENT_ERROR = "USER_EMAIL_SENT_ERROR",
  USER_BILLING_INFO_NOT_FOUND = "USER_BILLING_INFO_NOT_FOUND",
  USER_BILLING_INFOS_NOT_FOUND = "USER_BILLING_INFOS_NOT_FOUND",
  USER_INVOICE_GET_ERROR = "USER_INVOICE_GET_ERROR",
  USER_PERMISSION_IMPORT_ERROR = "USER_PERMISSION_IMPORT_ERROR",
  USER_LOGIN_HASH_NOT_PROVIDED_FOR_B2C = "USER_LOGIN_HASH_NOT_PROVIDED_FOR_B2C",
  API_KEY_NOT_PROVIDED_FOR_EXTERNAL_PLATFORM = "API_KEY_NOT_PROVIDED_FOR_EXTERNAL_PLATFORM",
  USER_LOGIN_ERROR_HAS_THIRD_PARTY_TOKEN = "USER_LOGIN_ERROR_HAS_THIRD_PARTY_TOKEN",
  EXTERNAL_APP_TYPE_EMPTY = "EXTERNAL_APP_TYPE_EMPTY",
  USER_ALREADY_HAS_DEFAULT_ADDRESS = "USER_ALREADY_HAS_DEFAULT_ADDRESS",
  MERCHANT_FEE_PERCENTAGE_LESS_THEN_ZERO = "MERCHANT_FEE_PERCENTAGE_LESS_THEN_ZERO",
  MERCHANT_IS_ASSIGNED_TO_COMPANY_WHICH_HAS_NOT_OTHER_MERCHANTS = "MERCHANT_IS_ASSIGNED_TO_COMPANY_WHICH_HAS_NOT_OTHER_MERCHANTS",
  MERCHANT_ID_NOT_FOUND = "MERCHANT_ID_NOT_FOUND",
  INVOICE_DUE_DATE_LESS_OR_EQUALS_ZERO = "INVOICE_DUE_DATE_LESS_OR_EQUALS_ZERO",
  MONTHLY_TURNOVER_LESS_OR_EQUALS_ZERO = "MONTHLY_TURNOVER_LESS_OR_EQUALS_ZERO",
  ORDERING_FREQUENCY_LESS_OR_EQUALS_ZERO = "ORDERING_FREQUENCY_LESS_OR_EQUALS_ZERO",
  CREDIT_LESS_OR_EQUALS_ZERO = "CREDIT_LESS_OR_EQUALS_ZERO",
  USER_LOGIN_HASH_NOT_PROVIDED = "USER_LOGIN_HASH_NOT_PROVIDED",
  ICO_NOT_PROVIDED = "ICO_NOT_PROVIDED",
  COMPANY_OR_MERCHANT_CANNOT_HAS_CSO_OR_B2B_ORDERS_CREATE_RIGHT = "COMPANY_OR_MERCHANT_CANNOT_HAS_CSO_OR_B2B_ORDERS_CREATE_RIGHT",
  COMPANY_CANNOT_PAY_BY_CREDIT = "COMPANY_CANNOT_PAY_BY_CREDIT",
  USER_NOT_FOUND = "USER_NOT_FOUND",
  USER_IS_NOT_MERCHANT = "USER_IS_NOT_MERCHANT",
  PRODUCT_PRICE_DOES_NOT_EXIST_IN_CURRENCY = "PRODUCT_PRICE_DOES_NOT_EXIST_IN_CURRENCY",
  PRODUCT_NAME_DOES_NOT_EXIST_IN_LANG = "PRODUCT_NAME_DOES_NOT_EXIST_IN_LANG",
  CATEGORY_BUNDLES_COUNT_NOT_COUNTED = "CATEGORY_BUNDLES_COUNT_NOT_COUNTED",
  SPECIFICATION_ALLOWED_VALUES_EMPTY = "SPECIFICATION_ALLOWED_VALUES_EMPTY",
  CATEGORY_URL_OR_META_EMPTY = "CATEGORY_URL_OR_META_EMPTY",
  VIRTUAL_CATEGORY_NECESSARRY_PROPERTIES_EMPTY = "VIRTUAL_CATEGORY_NECESSARRY_PROPERTIES_EMPTY",
  BUNDLE_PRICE_DOES_NOT_EXIST_IN_CURRENCY = "BUNDLE_PRICE_DOES_NOT_EXIST_IN_CURRENCY",
  BUNDLE_NAME_DOES_NOT_EXIST_IN_LANG = "BUNDLE_NAME_DOES_NOT_EXIST_IN_LANG",
  BUNDLE_IS_SAME_AS_ALT_BUNDLE = "BUNDLE_IS_SAME_AS_ALT_BUNDLE",
  BUNDLE_IS_NOT_ENABLED_OR_IS_DELETED = "BUNDLE_IS_NOT_ENABLED_OR_IS_DELETED",
  BUNDLE_IS_NOT_ENABLED_OR_IS_DELETED_OR_IS_FOR_LOGGED_USERS_OR_IS_NOT_ALLOWED_TO_SALE_IN_COUNTRY = "BUNDLE_IS_NOT_ENABLED_OR_IS_DELETED_OR_IS_FOR_LOGGED_USERS_OR_IS_NOT_ALLOWED_TO_SALE_IN_COUNTRY",
  BUNDLE_TAG_SYSTEM_TYPE_CANT_BE_REMOVED = "BUNDLE_TAG_SYSTEM_TYPE_CANT_BE_REMOVED",
  DISCOUNT_PERCENTAGE_LOWER_THAN_LIMIT = "DISCOUNT_PERCENTAGE_LOWER_THAN_LIMIT",
  DISCOUNT_PERCENTAGE_HIGHER_THAN_LIMIT = "DISCOUNT_PERCENTAGE_HIGHER_THAN_LIMIT",
  DISCOUNT_PERCENTAGE_LOWER_THAN_MINIMAL_SALE_FEE = "DISCOUNT_PERCENTAGE_LOWER_THAN_MINIMAL_SALE_FEE",
  DISCOUNT_CREATE_BUNDLE_HAS_NOT_SET_SUPPLIER = "DISCOUNT_CREATE_BUNDLE_HAS_NOT_SET_SUPPLIER",
  DISCOUNT_BUNDLE_HAS_NOT_BASE_PRICE = "DISCOUNT_BUNDLE_HAS_NOT_BASE_PRICE",
  DISCOUNT_PRICE_CREATED_TO_THE_FUTURE = "DISCOUNT_PRICE_CREATED_TO_THE_FUTURE",
  DISCOUNT_PRICE_TIME_FROM_GREATER = "DISCOUNT_PRICE_TIME_FROM_GREATER",
  DISCOUNT_CURRENCY_NOT_EXISTS = "DISCOUNT_CURRENCY_NOT_EXISTS",
  BUNDLE_HAS_ACTIVE_DISCOUNT_PRICE = "BUNDLE_HAS_ACTIVE_DISCOUNT_PRICE",
  BUNDLE_MUST_CONTAIN_AT_LEAST_ONE_PRICE = "BUNDLE_MUST_CONTAIN_AT_LEAST_ONE_PRICE",
  PRODUCT_CANNOT_BE_DELETED = "PRODUCT_CANNOT_BE_DELETED",
  ORDER_LIMITATION_TIME_FROM_GREATER = "ORDER_LIMITATION_TIME_FROM_GREATER",
  ORDER_LIMITATION_CREATED_TO_THE_FUTURE = "ORDER_LIMITATION_CREATED_TO_THE_FUTURE",
  QUANTITY_SET_TO_ORDER_LIMITATION = "QUANTITY_SET_TO_ORDER_LIMITATION",
  ORDER_LIMITATION_EXCEEDED = "ORDER_LIMITATION_EXCEEDED",
  BUNDLE_IS_NOT_SET = "BUNDLE_IS_NOT_SET",
  BUNDLE_IS_SET = "BUNDLE_IS_SET",
  BUNDLE_SET_PRICE_CANNOT_BE_CHANGED = "BUNDLE_SET_PRICE_CANNOT_BE_CHANGED",
  BUNDLE_SUPPLIER_IS_NULL_OR_EMPTY = "BUNDLE_SUPPLIER_IS_NULL_OR_EMPTY",
  BUNDLE_SET_PRICE_HIGHER_STANDARD_PRICE = "BUNDLE_SET_PRICE_HIGHER_STANDARD_PRICE",
  DEFINED_PRICE_TYPE_FOR_NON_B2B_REQUEST = "DEFINED_PRICE_TYPE_FOR_NON_B2B_REQUEST",
  NOT_DEFINED_PRICE_TYPE_FOR_B2B_REQUEST = "NOT_DEFINED_PRICE_TYPE_FOR_B2B_REQUEST",
  UNSUPPORTED_PRICE_TYPE_FOR_EXTERNAL_PLATFORM_REQUEST = "UNSUPPORTED_PRICE_TYPE_FOR_EXTERNAL_PLATFORM_REQUEST",
  UNSUPPORTED_PRICE_TYPE_FOR_B2C_REQUEST = "UNSUPPORTED_PRICE_TYPE_FOR_B2C_REQUEST",
  UNSUPPORTED_PRICE_TYPE = "UNSUPPORTED_PRICE_TYPE",
  BUNDLE_IS_NOT_ALLOWED_FOR_PROVIDED_PLATFORM = "BUNDLE_IS_NOT_ALLOWED_FOR_PROVIDED_PLATFORM",
  BUNDLE_NO_PRICE_DEFINED = "BUNDLE_NO_PRICE_DEFINED",
  BUNDLE_PRICE_DOES_NOT_EXIST = "BUNDLE_PRICE_DOES_NOT_EXIST",
  BUNDLE_NOT_CONFIRMERD_COULD_NOT_SET_ENABLED = "BUNDLE_NOT_CONFIRMERD_COULD_NOT_SET_ENABLED",
  PRICE_NOT_DEFINED = "PRICE_NOT_DEFINED",
  PRICE_DEFINED = "PRICE_DEFINED",
  BUNDLE_AVAILABLE_ON_PLATFORMS_IS_EMPTY = "BUNDLE_AVAILABLE_ON_PLATFORMS_IS_EMPTY",
  BUNDLE_IS_NOT_ALLOWED_FOR_EXTERNAL_PLATFORM = "BUNDLE_IS_NOT_ALLOWED_FOR_EXTERNAL_PLATFORM",
  BUNDLE_IS_NOT_ALLOWED_FOR_B2B = "BUNDLE_IS_NOT_ALLOWED_FOR_B2B",
  SPECIFICATION_DEFINITION_NOT_REQUIRED_SUBTYPE = "SPECIFICATION_DEFINITION_NOT_REQUIRED_SUBTYPE",
  SPECIFICATION_DEFINITION_ALLOWED_VALUE_NAME_NOT_FOUND = "SPECIFICATION_DEFINITION_ALLOWED_VALUE_NAME_NOT_FOUND",
  SPECIFICATION_IS_NOT_ALLOWED_TO_ADD_IMAGE = "SPECIFICATION_IS_NOT_ALLOWED_TO_ADD_IMAGE",
  SPECIFICATION_ALLOWED_VALUE_KEY_EMPTY = "SPECIFICATION_ALLOWED_VALUE_KEY_EMPTY",
  SPECIFICATION_ALLOWED_VALUE_NAME_EMPTY = "SPECIFICATION_ALLOWED_VALUE_NAME_EMPTY",
  BASKET_DOES_NOT_HAVE_CURRENCY = "BASKET_DOES_NOT_HAVE_CURRENCY",
  BASKET_IS_EMPTY = "BASKET_IS_EMPTY",
  BASKET_IS_NOT_APPROVED = "BASKET_IS_NOT_APPROVED",
  ORDER_FLEXIBEE_PRICE_ITEM_CREATE_ERROR = "ORDER_FLEXIBEE_PRICE_ITEM_CREATE_ERROR",
  ORDER_FLEXIBEE_INVOICE_ITEM_CREATE_ERROR = "ORDER_FLEXIBEE_INVOICE_ITEM_CREATE_ERROR",
  ORDER_FLEXIBEE_INVOICE_CREATE_ERROR = "ORDER_FLEXIBEE_INVOICE_CREATE_ERROR",
  ORDER_FLEXIBEE_INVOICE_PDF_GENERATION_ERROR = "ORDER_FLEXIBEE_INVOICE_PDF_GENERATION_ERROR",
  ORDER_FLEXIBEE_INVOICE_PDF_STORE_ERROR = "ORDER_FLEXIBEE_INVOICE_PDF_STORE_ERROR",
  ORDER_FLEXIBEE_INVOICE_GET_ERROR = "ORDER_FLEXIBEE_INVOICE_GET_ERROR",
  ORDER_FLEXIBEE_DELIVERY_CREATE_ERROR = "ORDER_FLEXIBEE_DELIVERY_CREATE_ERROR",
  ORDER_FLEXIBEE_PAYMENT_CREATE_ERROR = "ORDER_FLEXIBEE_PAYMENT_CREATE_ERROR",
  ORDER_FLEXIBEE_STORAGE_CARD_CREATE_ERROR = "ORDER_FLEXIBEE_STORAGE_CARD_CREATE_ERROR",
  ORDER_FLEXIBEE_STOCK_MOVEMENT_CREATE_ERROR = "ORDER_FLEXIBEE_STOCK_MOVEMENT_CREATE_ERROR",
  ORDER_BILLING_ADDRESSESB_BOTH_NULL = "ORDER_BILLING_ADDRESSESB_BOTH_NULL",
  ORDER_BILLING_ADDRESSES_BOTH_NOT_NULL = "ORDER_BILLING_ADDRESSES_BOTH_NOT_NULL",
  DISCOUNT_COUPON_INVALID_CURRENCY = "DISCOUNT_COUPON_INVALID_CURRENCY",
  DISCOUNT_COUPON_BELOW_ORDER_PRICE_LIMIT = "DISCOUNT_COUPON_BELOW_ORDER_PRICE_LIMIT",
  DISCOUNT_COUPON_NO_LONGER_ACTIVE = "DISCOUNT_COUPON_NO_LONGER_ACTIVE",
  DISCOUNT_COUPON_IS_USED_IN_ANOTHER_ORDER = "DISCOUNT_COUPON_IS_USED_IN_ANOTHER_ORDER",
  DISCOUNT_COUPON_IS_OUT_OF_EXPIRATION = "DISCOUNT_COUPON_IS_OUT_OF_EXPIRATION",
  DISCOUNT_COUPON_IS_SCHEDULED = "DISCOUNT_COUPON_IS_SCHEDULED",
  ORDER_CREATE_ITEM_PRODUCT_DATA_BROKEN = "ORDER_CREATE_ITEM_PRODUCT_DATA_BROKEN",
  ORDER_CREATE_ITEM_BUNDLE_PRICE = "ORDER_CREATE_ITEM_BUNDLE_PRICE",
  ORDER_HAS_NOT_ORDER_NUMBER = "ORDER_HAS_NOT_ORDER_NUMBER",
  ORDER_QR_CODE_NOT_GENERATED = "ORDER_QR_CODE_NOT_GENERATED",
  ORDER_COULD_NOT_BE_CANCELLED = "ORDER_COULD_NOT_BE_CANCELLED",
  ORDER_COULD_NOT_BE_EDIT_ADDRESSES = "ORDER_COULD_NOT_BE_EDIT_ADDRESSES",
  DELIVERY_COSTS_LESS_ZERO = "DELIVERY_COSTS_LESS_ZERO",
  DELIVERY_NOT_SERVING_ZIP = "DELIVERY_NOT_SERVING_ZIP",
  ORDER_UNKNOWN_ORDER_STATE = "ORDER_UNKNOWN_ORDER_STATE",
  ITEMS_DOES_NOT_MATCH_DISCOUNT_COUPON_LIMITATION_REQUIREMENTS = "ITEMS_DOES_NOT_MATCH_DISCOUNT_COUPON_LIMITATION_REQUIREMENTS",
  DISCOUNT_COUPON_SUPPLIER_CREATION_INSUFFICIENT_TIME_SPAN = "DISCOUNT_COUPON_SUPPLIER_CREATION_INSUFFICIENT_TIME_SPAN",
  DISCOUNT_COUPON_PERCENTAGE_VALUE_INVALD = "DISCOUNT_COUPON_PERCENTAGE_VALUE_INVALD",
  DISCOUNT_COUPON_AMOUNT_VALUE_INVALD = "DISCOUNT_COUPON_AMOUNT_VALUE_INVALD",
  DISCOUNT_COUPON_AMOUNT_VALUE_HIGHER_THEN_ALLOWD_FROM = "DISCOUNT_COUPON_AMOUNT_VALUE_HIGHER_THEN_ALLOWD_FROM",
  DISCOUNT_COUPON_PRICE_HIGHER_DISCOUNTED_PRODUCTS_PRICE = "DISCOUNT_COUPON_PRICE_HIGHER_DISCOUNTED_PRODUCTS_PRICE",
  DISCOUNT_COUPON_CREATED_BY_SUPPLIER_MUST_BE_VISIBLE_ON_PRODUCT_DETAIL = "DISCOUNT_COUPON_CREATED_BY_SUPPLIER_MUST_BE_VISIBLE_ON_PRODUCT_DETAIL",
  DELIVERY_ALTERNATIVE_NAME_MUST_NOT_BE_NULL_OR_EMPTY = "DELIVERY_ALTERNATIVE_NAME_MUST_NOT_BE_NULL_OR_EMPTY",
  DISCOUNT_COUPON_ACTIVE_CODE_ALREADY_EXISTS = "DISCOUNT_COUPON_ACTIVE_CODE_ALREADY_EXISTS",
  DISCOUNT_COUPON_IS_NOT_COMBINABLE = "DISCOUNT_COUPON_IS_NOT_COMBINABLE",
  DISCOUNT_COUPON_IS_NOT_FOR_DISCOUNTED_ITEMS = "DISCOUNT_COUPON_IS_NOT_FOR_DISCOUNTED_ITEMS",
  DISCOUNT_COUPON_ID_IS_ALREADY_IN_BASKET = "DISCOUNT_COUPON_ID_IS_ALREADY_IN_BASKET",
  ORDER_STATE_COULD_NOT_BE_CHANGED_TO_IN_WMS = "ORDER_STATE_COULD_NOT_BE_CHANGED_TO_IN_WMS",
  ORDER_REFUND_FAIL_NOT_IN_STATE_REVERT_FINANCE_AND_FEES = "ORDER_REFUND_FAIL_NOT_IN_STATE_REVERT_FINANCE_AND_FEES",
  ORDER_CREDIT_NOTE_ALREADY_EXISTS = "ORDER_CREDIT_NOTE_ALREADY_EXISTS",
  ORDER_INVOICE_DOES_NOT_EXISTS = "ORDER_INVOICE_DOES_NOT_EXISTS",
  ORDER_CREDIT_NOTE_CREATION_ERROR = "ORDER_CREDIT_NOTE_CREATION_ERROR",
  ORDER_CREDIT_NOTE_DICTIONARY_CREATION_ERROR = "ORDER_CREDIT_NOTE_DICTIONARY_CREATION_ERROR",
  ORDER_CREDIT_NOTE_PDF_CREATION_ERROR = "ORDER_CREDIT_NOTE_PDF_CREATION_ERROR",
  ORDER_ALREADY_CANCELLED = "ORDER_ALREADY_CANCELLED",
  ORDER_NOT_PAID = "ORDER_NOT_PAID",
  DISCOUNT_COUPON_NOT_APPLICABLE_IN_COUNTRY = "DISCOUNT_COUPON_NOT_APPLICABLE_IN_COUNTRY",
  NO_LIMITATION_DEFINITION = "NO_LIMITATION_DEFINITION",
  DISCOUNT_COUPON_IS_FOR_REGISTERED_USERS_ONLY = "DISCOUNT_COUPON_IS_FOR_REGISTERED_USERS_ONLY",
  DISCOUNT_COUPON_HAS_NOT_NAME_OR_DESCRIPTION = "DISCOUNT_COUPON_HAS_NOT_NAME_OR_DESCRIPTION",
  DISCOUNT_COUPON_IS_LIMITED_TO_CATEGORY = "DISCOUNT_COUPON_IS_LIMITED_TO_CATEGORY",
  DISCOUNT_COUPON_IS_NOT_REUSABLE = "DISCOUNT_COUPON_IS_NOT_REUSABLE",
  FEE_RULE_IS_ACTIVE_OR_ENDING_SOON = "FEE_RULE_IS_ACTIVE_OR_ENDING_SOON",
  FEE_RULE_CREATE_STATE_NOT_ALLOWED = "FEE_RULE_CREATE_STATE_NOT_ALLOWED",
  FEE_RULE_EMPTY_FEE_VALUES = "FEE_RULE_EMPTY_FEE_VALUES",
  FEE_RULE_VALID_FROM_IS_HIGHER_THEN_VALID_TO = "FEE_RULE_VALID_FROM_IS_HIGHER_THEN_VALID_TO",
  FEE_RULE_BUNDLE_PRICE_FROM_IS_HIGHER_THEN_BUNDLE_PRICE_TO = "FEE_RULE_BUNDLE_PRICE_FROM_IS_HIGHER_THEN_BUNDLE_PRICE_TO",
  FEE_RULE_BUNDLE_AMOUNT_FROM_IS_HIGHER_THEN_BUNDLE_AMOUNT_TO = "FEE_RULE_BUNDLE_AMOUNT_FROM_IS_HIGHER_THEN_BUNDLE_AMOUNT_TO",
  FEE_RULE_INVALID_TURNOVER = "FEE_RULE_INVALID_TURNOVER",
  FEE_RULE_COULD_NOT_SET_STATE = "FEE_RULE_COULD_NOT_SET_STATE",
  FEE_RULE_EDIT_STATE_NOT_ALLOWED = "FEE_RULE_EDIT_STATE_NOT_ALLOWED",
  FEE_RULE_OVERLAPPING_LOGISTIC_CONDITION = "FEE_RULE_OVERLAPPING_LOGISTIC_CONDITION",
  FEE_RULE_TYPE_NOT_ALLOWED = "FEE_RULE_TYPE_NOT_ALLOWED",
  ANY_BUNDLES_NOT_MATCHING_FEE_RULES = "ANY_BUNDLES_NOT_MATCHING_FEE_RULES",
  FEE_RULE_MAIN_CONDITIONS_NULL = "FEE_RULE_MAIN_CONDITIONS_NULL",
  FEE_RULE_FOUND_FOR_ITEM = "FEE_RULE_FOUND_FOR_ITEM",
  FEE_RULE_COULD_NOT_ACTIVATE_BECAUSE_IS_IN_PAST = "FEE_RULE_COULD_NOT_ACTIVATE_BECAUSE_IS_IN_PAST",
  FEE_RULE_SPECIFICATIONS_CONTAINS_NULL = "FEE_RULE_SPECIFICATIONS_CONTAINS_NULL",
  FEE_RULE_BUNDLES_CONTAINS_NULL = "FEE_RULE_BUNDLES_CONTAINS_NULL",
  FEE_RULE_TAGS_CONTAINS_NULL = "FEE_RULE_TAGS_CONTAINS_NULL",
  FEE_RULE_SUPPLIERS_CONTAINS_NULL = "FEE_RULE_SUPPLIERS_CONTAINS_NULL",
  FEE_RULE_CATEGORIES_CONTAINS_NULL = "FEE_RULE_CATEGORIES_CONTAINS_NULL",
  BASKET_OWNER_IS_NOT_LOGGED_USER = "BASKET_OWNER_IS_NOT_LOGGED_USER",
  BASKET_OWNER_IS_NOT_SUPPORT_OR_MERCHANT_COULD_NOT_CREATE_ORDER_FOR_COMPANY = "BASKET_OWNER_IS_NOT_SUPPORT_OR_MERCHANT_COULD_NOT_CREATE_ORDER_FOR_COMPANY",
  COMPANY_IS_NOT_ACTIVE = "COMPANY_IS_NOT_ACTIVE",
  DISCOUNT_COUPON_LIMITATION_NOT_PROVIDED = "DISCOUNT_COUPON_LIMITATION_NOT_PROVIDED",
  FEE_LESS_THEN_ZERO = "FEE_LESS_THEN_ZERO",
  IMAGE_FILE_TYPE_NOT_SUPPORTED_ERROR = "IMAGE_FILE_TYPE_NOT_SUPPORTED_ERROR",
  IMAGE_STORE_FILES_ERROR = "IMAGE_STORE_FILES_ERROR",
  SUPPLIER_DOES_NOT_EXIST = "SUPPLIER_DOES_NOT_EXIST",
  SUPPLIER_ADDRESS_NOT_FOUND = "SUPPLIER_ADDRESS_NOT_FOUND",
  SUPPLIER_ADDRESSES_NOT_FOUND = "SUPPLIER_ADDRESSES_NOT_FOUND",
  SUPPLIER_DELETE_HAS_BUNDLE = "SUPPLIER_DELETE_HAS_BUNDLE",
  SUPPLIER_ADD_CERTIFICATE = "SUPPLIER_ADD_CERTIFICATE",
  SUPPLIER_DELETE_CERTIFICATE = "SUPPLIER_DELETE_CERTIFICATE",
  STOCKING_REQUEST_MODIFIED_BUNDLE_NOT_OWNED_BY_SUPPLIER = "STOCKING_REQUEST_MODIFIED_BUNDLE_NOT_OWNED_BY_SUPPLIER",
  STOCKING_REQUEST_ADD_RECEIPT = "STOCKING_REQUEST_ADD_RECEIPT",
  STOCKING_REQUEST_ALREADY_SENT = "STOCKING_REQUEST_ALREADY_SENT",
  STOCKING_REQUEST_DELIVERY_DATE_NOT_FUTURE = "STOCKING_REQUEST_DELIVERY_DATE_NOT_FUTURE",
  STOCKING_REQUEST_DELIVERY_TYPE_NOT_VINISTO = "STOCKING_REQUEST_DELIVERY_TYPE_NOT_VINISTO",
  STOCKING_REQUEST_CANNOT_BE_SENT_CREATED_WITHOUT_BUNDLES = "STOCKING_REQUEST_CANNOT_BE_SENT_CREATED_WITHOUT_BUNDLES",
  STOCKING_REQUEST_ALREADY_CONFIRMED = "STOCKING_REQUEST_ALREADY_CONFIRMED",
  STOCKING_REQUEST_CAN_BE_CONFIRMED_IN_STATE_SENT = "STOCKING_REQUEST_CAN_BE_CONFIRMED_IN_STATE_SENT",
  STOCKING_REQUEST_CANCEL_MUST_BE_IN_STATE_SENT = "STOCKING_REQUEST_CANCEL_MUST_BE_IN_STATE_SENT",
  STOCKING_REQUEST_CANNOT_BE_CANCELED_IS_IN_STATE_WMS_DELIVERED = "STOCKING_REQUEST_CANNOT_BE_CANCELED_IS_IN_STATE_WMS_DELIVERED",
  STOCKING_REQUEST_ALREADY_CANCELED = "STOCKING_REQUEST_ALREADY_CANCELED",
  STOCKING_REQUEST_BUNDLE_CANNOT_BE_MODIFIED_IS_IN_STATE_WMS_DELIVERED = "STOCKING_REQUEST_BUNDLE_CANNOT_BE_MODIFIED_IS_IN_STATE_WMS_DELIVERED",
  STOCKING_REQUEST_ALREADY_WMS_STOCKED = "STOCKING_REQUEST_ALREADY_WMS_STOCKED",
  STOCKING_REQUEST_CANNOT_BE_WMS_STOCKED_MUST_BE_IN_STATE_WMS_DELIVERED = "STOCKING_REQUEST_CANNOT_BE_WMS_STOCKED_MUST_BE_IN_STATE_WMS_DELIVERED",
  STOCKING_REQUEST_CANNOT_BE_DELIVERY_ORDER_MUST_BE_IN_STATE_CONFRIMED = "STOCKING_REQUEST_CANNOT_BE_DELIVERY_ORDER_MUST_BE_IN_STATE_CONFRIMED",
  STOCKING_REQUEST_CANNOT_BE_DELIVERY_ORDER_IS_IN_STATE_WMS_DELIVERED = "STOCKING_REQUEST_CANNOT_BE_DELIVERY_ORDER_IS_IN_STATE_WMS_DELIVERED",
  STOCKING_REQUEST_CAN_BE_DELETED_TO_SENT_STATE = "STOCKING_REQUEST_CAN_BE_DELETED_TO_SENT_STATE",
  STOCKING_REQUEST_ALREADY_WMS_DELIVERED = "STOCKING_REQUEST_ALREADY_WMS_DELIVERED",
  STOCKING_REQUEST_NOT_BUNDLE_WITH_ONE_PRODUCT = "STOCKING_REQUEST_NOT_BUNDLE_WITH_ONE_PRODUCT",
  STOCKING_REQUEST_INVALID_DELIVERY_INTERVAL = "STOCKING_REQUEST_INVALID_DELIVERY_INTERVAL",
  STOCKING_REQUEST_WMS_CANNOT_BE_UPDATED_MUST_BE_IN_STATE_CONFRIMED = "STOCKING_REQUEST_WMS_CANNOT_BE_UPDATED_MUST_BE_IN_STATE_CONFRIMED",
  STOCKING_REQUEST_WMS_CANNOT_BE_UPDATED_IS_IN_STATE_WMS_DELIVERED = "STOCKING_REQUEST_WMS_CANNOT_BE_UPDATED_IS_IN_STATE_WMS_DELIVERED",
  STOCKING_REQUEST_HAS_NOT_STATE_SENT_WMS = "STOCKING_REQUEST_HAS_NOT_STATE_SENT_WMS",
  STOCKING_REQUEST_MUST_BE_IN_STATE_SENT = "STOCKING_REQUEST_MUST_BE_IN_STATE_SENT",
  SUPPLIER_COUPON_PREFIX_EXIST = "SUPPLIER_COUPON_PREFIX_EXIST",
  SUPPLIER_UPDATE_COUPON_PREFIX_EXIST = "SUPPLIER_UPDATE_COUPON_PREFIX_EXIST",
  EXTERNAL_ORDER_ID_EMPTY = "EXTERNAL_ORDER_ID_EMPTY",
  APP_TYPE_MUST_NOT_BE_B2C = "APP_TYPE_MUST_NOT_BE_B2C",
  GOPAY_PAYMENT_CREATION_ERROR = "GOPAY_PAYMENT_CREATION_ERROR",
  GOPAY_PAYMENT_STATUS_ERROR = "GOPAY_PAYMENT_STATUS_ERROR",
  GOPAY_PAYMENT_REFUND_ERROR = "GOPAY_PAYMENT_REFUND_ERROR",
  GOPAY_PAYMENT_MATCHING_ORDER_GOPAY_ID_ERROR = "GOPAY_PAYMENT_MATCHING_ORDER_GOPAY_ID_ERROR",
  GOPAY_CARD_INFO_ERROR = "GOPAY_CARD_INFO_ERROR",
  GOPAY_PAYMENT_EXECUTION_ERROR = "GOPAY_PAYMENT_EXECUTION_ERROR",
  CAROUSEL_AVAILABLE_TO_NOT_FUTURE = "CAROUSEL_AVAILABLE_TO_NOT_FUTURE",
  CAROUSEL_AVAILABLE_FROM_UNDEFINED = "CAROUSEL_AVAILABLE_FROM_UNDEFINED",
  CAROUSEL_POSITION_UNDEFINED = "CAROUSEL_POSITION_UNDEFINED",
  CAROUSEL_URL_UNDEFINED = "CAROUSEL_URL_UNDEFINED",
  CAROUSEL_TYPE_UNDEFINED = "CAROUSEL_TYPE_UNDEFINED",
  CAROUSEL_AVAILABLE_FROM_GREATHER_AVAILABLE_TO = "CAROUSEL_AVAILABLE_FROM_GREATHER_AVAILABLE_TO",
  CAROUSEL_IMAGE_DELETE = "CAROUSEL_IMAGE_DELETE",
  ARTICLE_NO_AUTHORS = "ARTICLE_NO_AUTHORS",
  ARTICLE_NOT_ALL_AUTHORS_FOUND = "ARTICLE_NOT_ALL_AUTHORS_FOUND",
  ARTICLE_NOT_ALL_TAGS_FOUND = "ARTICLE_NOT_ALL_TAGS_FOUND",
  ARTICLE_NOT_FOUND_SPECIFICATIONS = "ARTICLE_NOT_FOUND_SPECIFICATIONS",
  ARTICLE_NO_TITLE = "ARTICLE_NO_TITLE",
  ARTICLE_NO_URL = "ARTICLE_NO_URL",
  AUTOMATIC_COUPON_NAME_EMPTY = "AUTOMATIC_COUPON_NAME_EMPTY",
  AUTOMATIC_COUPON_DICSOUNT_VALUE_LESS_ZERO = "AUTOMATIC_COUPON_DICSOUNT_VALUE_LESS_ZERO",
  AUTOMATIC_COUPON_EXPIRATION_DAYS_LESS_ZERO = "AUTOMATIC_COUPON_EXPIRATION_DAYS_LESS_ZERO",
  AUTOMATIC_COUPON_MIN_ORDER_PRICE_LESS_ZERO = "AUTOMATIC_COUPON_MIN_ORDER_PRICE_LESS_ZERO",
  AUTOMATIC_COUPON_MAX_ORDER_PRICE_LESS_ZERO = "AUTOMATIC_COUPON_MAX_ORDER_PRICE_LESS_ZERO",
  AUTOMATIC_COUPON_MIN_ORDER_PRICE_NULL = "AUTOMATIC_COUPON_MIN_ORDER_PRICE_NULL",
  AUTOMATIC_COUPON_MAX_ORDER_PRICE_NULL = "AUTOMATIC_COUPON_MAX_ORDER_PRICE_NULL",
  AUTOMATIC_COUPON_MAX_ORDER_PRICE_LESS_MIN_ORDER_PRICE = "AUTOMATIC_COUPON_MAX_ORDER_PRICE_LESS_MIN_ORDER_PRICE",
  AUTOMATIC_COUPON_TRIGGER_DELAY_LESS_ZERO = "AUTOMATIC_COUPON_TRIGGER_DELAY_LESS_ZERO",
  CHANGE_REASON_NOT_ALLOWED_FOR_ADDING = "CHANGE_REASON_NOT_ALLOWED_FOR_ADDING",
  CHANGE_REASON_NOT_ALLOWED_FOR_REMOVING = "CHANGE_REASON_NOT_ALLOWED_FOR_REMOVING",
  GIFT_RULE_LIMIT_FROM_IS_NULL = "GIFT_RULE_LIMIT_FROM_IS_NULL",
  GIFT_RULE_VALID_TO_LESS_VALID_FROM = "GIFT_RULE_VALID_TO_LESS_VALID_FROM",
  GIFT_RULE_APPLICABLE_FROM_LESS_ONE = "GIFT_RULE_APPLICABLE_FROM_LESS_ONE",
  GIFT_RULE_PRICE_TO_LESS_PRICE_FROM = "GIFT_RULE_PRICE_TO_LESS_PRICE_FROM",
  STOCKING_REQUEST_BUNDLE_WITH_CLEARANCE_SALE = "STOCKING_REQUEST_BUNDLE_WITH_CLEARANCE_SALE",
  SYSTEM_TAG_MANIPULATION = "SYSTEM_TAG_MANIPULATION",
}

/** Contains list of all available mongo objects<p>Members:</p><ul><li><i>Unknown</i> - Unknown mongo object, or not mongo object at all</ li > <li><i>User</i> - User mongo object</ li > <li><i>Product</i> - Product mongo object</ li > <li><i>Category</i> - Category mongo object</ li > <li><i>CategoryHomePage</i> - Home Page Category mongo object</ li > <li><i>Bundle</i> - Bundle mongo object</ li > <li><i>Evaluation</i> - Evaluation mongo object</ li > <li><i>SpecificationDefinition</i> - Specification definition mongo object</ li > <li><i>Tag</i> - Tag mongo object</ li > <li><i>Basket</i> - Basket mongo object</ li > <li><i>Order</i> - Order mongo object</ li > <li><i>Image</i> - Image mongo object</ li > <li><i>Favorite</i> - Favorite mongo object</ li > <li><i>SpecificationValue</i> - Specification value mongo object</ li > <li><i>Delivery</i> - Delivery mongo object</ li > <li><i>DiscountCouponDefinition</i> - Discount coupon definition mongo object</ li > <li><i>Payment</i> - Payment mongo object</ li > <li><i>Supplier</i> - Supplier mongo object</ li > <li><i>WarehouseItem</i> - Warehouse item mongo object</ li > <li><i>FeeRule</i> - FeeRule item mongo object</ li > <li><i>FeeRecord</i> - FeeRecord item mongo object</ li > <li><i>Certificate</i> - Supplier certificate mongo object</ li > <li><i>OrderNumber</i> - Order number mongo object</ li > <li><i>HomePageCustomCarousel</i> - HomePageCustomCarousel mongo object</ li > <li><i>Billing</i> - Billing mongo object</ li > <li><i>BillingNumber</i> - Billing number mongo object</ li > <li><i>SliderCarousel</i> - SliderCarousel mongo object</ li > <li><i>AutomaticCoupon</i> - Automatic coupon mongo object</ li > <li><i>CmsImage</i> - CmsImage mongo object</ li > <li><i>StockingRequest</i> - StockingRequest mongo object</ li > <li><i>CmsArticle</i> - CmsArticle mongo object</ li > <li><i>CmsTag</i> - CmsTag mongo object</ li > <li><i>CmsArticleAuthor</i> - CmsArticleAuthor mongo object</ li > <li><i>GiftRule</i> - GiftRule mongo object</ li > <li><i>WarehouseChangeLog</i> - Warehouse change log mongo object</ li > <li><i>UserLog</i> - User log mongo object</ li > <li><i>SearchQuery</i> - Search query mongo object</ li > <li><i>ApplictionLog</i> - Application log</ li > </ul> */
export enum VinistoHelperDllEnumsErrorMongoObject {
  Unknown = "Unknown",
  User = "User",
  Product = "Product",
  Category = "Category",
  CategoryHomePage = "CategoryHomePage",
  Bundle = "Bundle",
  Evaluation = "Evaluation",
  SpecificationDefinition = "SpecificationDefinition",
  Tag = "Tag",
  Basket = "Basket",
  Order = "Order",
  Image = "Image",
  Favorite = "Favorite",
  SpecificationValue = "SpecificationValue",
  Delivery = "Delivery",
  DiscountCouponDefinition = "DiscountCouponDefinition",
  Payment = "Payment",
  Supplier = "Supplier",
  WarehouseItem = "WarehouseItem",
  FeeRule = "FeeRule",
  FeeRecord = "FeeRecord",
  Certificate = "Certificate",
  OrderNumber = "OrderNumber",
  HomePageCustomCarousel = "HomePageCustomCarousel",
  Billing = "Billing",
  BillingNumber = "BillingNumber",
  SliderCarousel = "SliderCarousel",
  AutomaticCoupon = "AutomaticCoupon",
  CmsImage = "CmsImage",
  StockingRequest = "StockingRequest",
  CmsArticle = "CmsArticle",
  CmsTag = "CmsTag",
  CmsArticleAuthor = "CmsArticleAuthor",
  GiftRule = "GiftRule",
  WarehouseChangeLog = "WarehouseChangeLog",
  UserLog = "UserLog",
  SearchQuery = "SearchQuery",
  ApplictionLog = "ApplictionLog",
  WarehouseMovement = "WarehouseMovement",
  WarehouseBundleSnapshot = "WarehouseBundleSnapshot",
  Warehouse = "Warehouse",
  SupplierTag = "SupplierTag",
  ExchangeRate = "ExchangeRate",
  SubscriptionVariableSymbolNumber = "SubscriptionVariableSymbolNumber",
  Subscription = "Subscription",
  VirtualCategory = "VirtualCategory",
  Invoice = "Invoice",
  ContractWithdrawalRequest = "ContractWithdrawalRequest",
  MerchantFeeRule = "MerchantFeeRule",
}

/** Contains a list of all available general errors<p>Members:</p><ul><li><i>Unknown</i> - The error source is not known</ li > <li><i>SpecificError</i> - It is specific error specified in specific error field</ li > <li><i>MongoException</i> - Exception  caused by MongoDB</ li > <li><i>ObjectNotFound</i> - Requested object was not found</ li > <li><i>ObjectNotAllFound</i> - Not all requested objects were found</ li > <li><i>ObjectAlreadyExists</i> - This object is already exists</ li > <li><i>ObjectNotCreated</i> - Mongo object was not created</ li > <li><i>ObjectNotUpdated</i> - Mongo object was not updated</ li > <li><i>ObjectNotDeleted</i> - Mongo object was not deleted</ li > <li><i>ObjectPermissionError</i> - You do not have enough permissions to access the object</ li > <li><i>ObjectParametersError</i> - Not all parameters were provided</ li > <li><i>EnumLanguageError</i> - Provided language is not known</ li > <li><i>EnumCurrencyError</i> - Provided currency is not known</ li > <li><i>EnumGoPayTypeError</i> - Provided GoPay type is not known</ li > <li><i>ObjectNotActive</i> - Requested object was found, but is not enabled or is mark as deleted</ li > <li><i>EnumVatRateError</i> - Provided vat rate is not known</ li > <li><i>WarehouseNotEnoughItem</i> - There is not enough item in warehouse</ li > <li><i>WarehouseInconsistency</i> - There is inconsistency in warehouse</ li > <li><i>EnumCountryCodeError</i> - Provided country code is not known</ li > <li><i>EnumSupplierTypeError</i> - Provided supplier type is not known</ li > <li><i>NicknameAlreadyUsed</i> - Exists user with nickname;</ li > <li><i>AnyObjectNotUpdated</i> - Any mongo object was not updated</ li > <li><i>IncompatibleParametersError</i> - Provided parameters is not compatible</ li > <li><i>EnumBundleStateError</i> - Provided bundle supplier state is not known</ li > </ul> */
export enum VinistoHelperDllEnumsErrorGeneralError {
  Unknown = "Unknown",
  SpecificError = "SpecificError",
  MongoException = "MongoException",
  ObjectNotFound = "ObjectNotFound",
  ObjectNotAllFound = "ObjectNotAllFound",
  ObjectAlreadyExists = "ObjectAlreadyExists",
  ObjectNotCreated = "ObjectNotCreated",
  ObjectNotUpdated = "ObjectNotUpdated",
  ObjectNotDeleted = "ObjectNotDeleted",
  ObjectPermissionError = "ObjectPermissionError",
  ObjectParametersError = "ObjectParametersError",
  EnumLanguageError = "EnumLanguageError",
  EnumCurrencyError = "EnumCurrencyError",
  EnumGoPayTypeError = "EnumGoPayTypeError",
  ObjectNotActive = "ObjectNotActive",
  EnumVatRateError = "EnumVatRateError",
  WarehouseNotEnoughItem = "WarehouseNotEnoughItem",
  WarehouseInconsistency = "WarehouseInconsistency",
  EnumCountryCodeError = "EnumCountryCodeError",
  EnumSupplierTypeError = "EnumSupplierTypeError",
  NicknameAlreadyUsed = "NicknameAlreadyUsed",
  AnyObjectNotUpdated = "AnyObjectNotUpdated",
  IncompatibleParametersError = "IncompatibleParametersError",
  EnumBundleStateError = "EnumBundleStateError",
}

/** Currency<p>Members:</p><ul><li><i>CZK</i> - Czech crown</ li > <li><i>EUR</i> - Euro</ li > <li><i>USD</i> - US Dollar</ li > </ul> */
export enum VinistoHelperDllEnumsCurrency {
  CZK = "CZK",
  EUR = "EUR",
  USD = "USD",
}

/** Contains list of possible crons in product api<p>Members:</p><ul><li><i>GENERATE_HEUREKA</i> - Cron to generate heureka and megrado feeds</ li > <li><i>CHECK_BUNDLE_CATEGORIES</i> - Cron to check bundles for dynamic categories</ li > <li><i>CHECK_DISCOUNT_PRICE</i> - Cron to check discount price for bundles</ li > <li><i>CHECK_BUNDLE_IS_FOR_LOGGED</i> - Cron to check IsForLogged property in bundles</ li > <li><i>CHECK_BUNDLE_SET_SCORING</i> - Cron to set scoring to bundles</ li > <li><i>ALL_BUNDLE_MODIFY</i> - Cron to execute all crons to modify bundles</ li > </ul> */
export enum VinistoHelperDllEnumsCronsProductApiCronType {
  GENERATE_HEUREKA = "GENERATE_HEUREKA",
  CHECK_BUNDLE_CATEGORIES = "CHECK_BUNDLE_CATEGORIES",
  CHECK_DISCOUNT_PRICE = "CHECK_DISCOUNT_PRICE",
  CHECK_BUNDLE_IS_FOR_LOGGED = "CHECK_BUNDLE_IS_FOR_LOGGED",
  CHECK_BUNDLE_SET_SCORING = "CHECK_BUNDLE_SET_SCORING",
  ALL_BUNDLE_MODIFY = "ALL_BUNDLE_MODIFY",
}

/** Identifies type of the country<p>Members:</p><ul><li><i>CZ</i> - Czech Republic</ li > <li><i>SK</i> - Slovakia</ li > <li><i>DE</i> - Germany</ li > <li><i>UK</i> - United Kingdom</ li > <li><i>PL</i> - Poland</ li > </ul> */
export enum VinistoHelperDllEnumsCountryCode {
  CZ = "CZ",
  SK = "SK",
  DE = "DE",
  UK = "UK",
  PL = "PL",
}

/** Contains list of possible article states<p>Members:</p><ul><li><i>DRAFT</i> - Draft state (Concept)</ li > <li><i>PUBLISHED</i> - Article is published</ li > </ul> */
export enum VinistoHelperDllEnumsCmsArticleState {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
}

/** Contains list of possible crousel / listing type for article<p>Members:</p><ul><li><i>NONE</i> - None carousel/listing for article</ li > <li><i>CAROUSEL_SPECIFICATIONS</i> - Carousel of specifications</ li > <li><i>CAROUSEL_BUNDLES</i> - Carousel of bundles</ li > <li><i>LISTING_SPECIFICATIONS</i> - Listing of specifications</ li > <li><i>LISTING_BUNDLES</i> - Listing of bundles</ li > </ul> */
export enum VinistoHelperDllEnumsCmsArticleCarouselListingType {
  NONE = "NONE",
  CAROUSEL_SPECIFICATIONS = "CAROUSEL_SPECIFICATIONS",
  CAROUSEL_BUNDLES = "CAROUSEL_BUNDLES",
  LISTING_SPECIFICATIONS = "LISTING_SPECIFICATIONS",
  LISTING_BUNDLES = "LISTING_BUNDLES",
}

/** Contains list of possible columns for sorting<p>Members:</p><ul></ul> */
export enum VinistoHelperDllEnumsCategorySortableColumns {
  ID = "ID",
  NAME = "NAME",
  URL = "URL",
}

/** Contains list of possible category types<p>Members:</p><ul><li><i>STATIC</i> - Static category.</ li > <li><i>DYNAMIC</i> - Dynamic category. Bundles are select by specification</ li > </ul> */
export enum VinistoHelperDllEnumsCategoryCategoryType {
  STATIC = "STATIC",
  DYNAMIC = "DYNAMIC",
}

/** Category bundle listing discount filter.<p>Members:</p><ul></ul> */
export enum VinistoHelperDllEnumsCategoryCategoryBundleDiscountFilter {
  ALL = "ALL",
  DISCOUNTED_ONLY = "DISCOUNTED_ONLY",
  NON_DISCOUNTED_ONLY = "NON_DISCOUNTED_ONLY",
}

/** Contains list of possible columns for sorting when get bundles for stocking<p>Members:</p><ul><li><i>NAME</i> - Sort by Bundle.Name property</ li > <li><i>WAREHOUSE_ID</i> - Sort by Product.WarehouseId property</ li > <li><i>WAREHOUSE_AMOUNT</i> - Sort by WarehouseItem.Quantity property</ li > </ul> */
export enum VinistoHelperDllEnumsBundleSortableColumnsStocking {
  NAME = "NAME",
  WAREHOUSE_ID = "WAREHOUSE_ID",
  WAREHOUSE_AMOUNT = "WAREHOUSE_AMOUNT",
}

/** Contains list of possible columns for sorting when get bundles for supplier sets<p>Members:</p><ul><li><i>ID</i> - Sort by Bundle.Id property</ li > <li><i>NAME</i> - Sort by Bundle.Name property</ li > <li><i>PRICE</i> - Sort by Bundle.Price property</ li > <li><i>WAREHOUSE_AMOUNT</i> - Sort by WarehouseItem.Quantity property</ li > <li><i>STATES</i> - Sort by Bundle.States property</ li > <li><i>SET_TYPE</i> - Sort by Bundle.SetType property</ li > </ul> */
export enum VinistoHelperDllEnumsBundleSortableColumnsSet {
  ID = "ID",
  NAME = "NAME",
  PRICE = "PRICE",
  WAREHOUSE_AMOUNT = "WAREHOUSE_AMOUNT",
  STATES = "STATES",
  SET_TYPE = "SET_TYPE",
}

/** Contains list of possible columns for sorting<p>Members:</p><ul><li><i>ID</i> - Sort by Bundle.Id property</ li > <li><i>NAME</i> - Sort by Bundle.Name property</ li > <li><i>URL</i> - Sort by Bundle.Url property</ li > <li><i>LAST_VIEWED</i> - Sort by Bundle.LastViewed property</ li > <li><i>PRICE</i> - Sort by Bundle.Price property</ li > <li><i>EVALUATION</i> - Sort by Bundle.Evaluation property</ li > <li><i>SCORING</i> - Sort by Bundle.Scoring property</ li > <li><i>SCORING_PRICE</i> - Sort by Bundle.ScoringPrice property</ li > <li><i>IS_DELETED</i> - Sort by Bundle.IsDeleted property</ li > <li><i>IS_ENABLED</i> - Sort by Bundle.IsEnabled property</ li > <li><i>IS_FOR_LOGGED_USER</i> - Sort by Bundle.IsForLogged property</ li > <li><i>PRODUCT_ID_SCORING</i> - Sort by Bundle.Items.ProductId and Bundle.Scoring properties</ li > <li><i>PRICE_DISCOUNT_EXPIRATION_DATE</i> - Sort by discount expiration date</ li > <li><i>SUPPLIER_NAME</i> - Sort by supplier name</ li > <li><i>WAREHOUSE_ID</i> - Sort by product warehouse id</ li > </ul> */
export enum VinistoHelperDllEnumsBundleSortableColumns {
  ID = "ID",
  NAME = "NAME",
  URL = "URL",
  LAST_VIEWED = "LAST_VIEWED",
  PRICE = "PRICE",
  EVALUATION = "EVALUATION",
  SCORING = "SCORING",
  SCORING_PRICE = "SCORING_PRICE",
  IS_DELETED = "IS_DELETED",
  IS_ENABLED = "IS_ENABLED",
  IS_FOR_LOGGED_USER = "IS_FOR_LOGGED_USER",
  PRODUCT_ID_SCORING = "PRODUCT_ID_SCORING",
  PRICE_DISCOUNT_EXPIRATION_DATE = "PRICE_DISCOUNT_EXPIRATION_DATE",
  SUPPLIER_NAME = "SUPPLIER_NAME",
  WAREHOUSE_ID = "WAREHOUSE_ID",
}

/** <p>Members:</p><ul></ul> */
export enum VinistoHelperDllEnumsBundleSetType {
  None = "None",
  OnePlusOneFree = "OnePlusOneFree",
  TwoPlusOneFree = "TwoPlusOneFree",
  ThreePlusThreeFree = "ThreePlusThreeFree",
  FourPlusTwoFree = "FourPlusTwoFree",
  FivePlusOneFree = "FivePlusOneFree",
  Six10Percentage = "Six10Percentage",
}

/**
 * Contains list of possible flag for bundle.
 * Is used for transfering flag to RBMQ<p>Members:</p><ul><li><i>DELETE</i> - Flag delete</ li > <li><i>GIFT</i> - Fĺag gift</ li > <li><i>TEMPORARY_UNAVAILABILITY</i> - Fĺag temporary unavailability</ li > <li><i>CLEARANCE_SALE</i> - Flag clearance sale</ li > </ul>
 */
export enum VinistoHelperDllEnumsBundleFlag {
  DELETE = "DELETE",
  GIFT = "GIFT",
  TEMPORARY_UNAVAILABILITY = "TEMPORARY_UNAVAILABILITY",
  CLEARANCE_SALE = "CLEARANCE_SALE",
}

/**
 * Enum which specifies what extra data should be returned for bundle.
 * Used in LoadDataApiService bundle methods.<p>Members:</p><ul></ul>
 */
export enum VinistoHelperDllEnumsBundleExtraBundleData {
  None = "None",
  ImagesToSpecifications = "ImagesToSpecifications",
  ImagesToSpecificationsAllowedValues = "ImagesToSpecificationsAllowedValues",
  AverageEvaluation = "AverageEvaluation",
  SetBundles = "SetBundles",
  ProductsWarehouseId = "ProductsWarehouseId",
  Specifications = "Specifications",
  BundleImages = "BundleImages",
  Tags = "Tags",
  ProductsDetail = "ProductsDetail",
  Supplier = "Supplier",
  AlternativeBundles = "AlternativeBundles",
  All = "All",
}

/** <p>Members:</p><ul></ul> */
export enum VinistoHelperDllEnumsBundleBundleState {
  Concept = "Concept",
  ToConfirm = "ToConfirm",
  Confirmed = "Confirmed",
  Rejected = "Rejected",
}

/** Contains list of possible filters for amount<p>Members:</p><ul><li><i>LESS</i> - LESS filter</ li > <li><i>EQUALS</i> - EQUALS filter</ li > <li><i>GREATER</i> - GREATER filter</ li > </ul> */
export enum VinistoHelperDllEnumsBundleAmountFilter {
  LESS = "LESS",
  EQUALS = "EQUALS",
  GREATER = "GREATER",
}

/** Contains list of possible columns for sorting<p>Members:</p><ul><li><i>ID</i> - Default sorting by ID</ li > <li><i>TIME</i> - Sorting by action time</ li > <li><i>CREATED_AT</i> - Sorting by createdAt</ li > </ul> */
export enum VinistoHelperDllEnumsActionLogSortableColumns {
  ID = "ID",
  TIME = "TIME",
  CREATED_AT = "CREATED_AT",
}

/** Possible application log types<p>Members:</p><ul><li><i>ORDER_EMAIL_SENT</i> - Log with email information. Contains information about template name and email data</ li > <li><i>ORDER_DELIVERY_ADDRESS_CHANGED</i> - Logs order change caused by delivery address change</ li > <li><i>ORDER_BILLING_ADDRESS_CHANGED</i> - Logs order change caused by billing address change</ li > <li><i>ORDER_INVOICE_GENERATED</i> - Logs order change caused by invoice generating</ li > <li><i>ORDER_WMS_STATE_CHANGED</i> - Logs order change caused by order state change from wms</ li > <li><i>ORDER_MANUAL_STATE_CHANGED</i> - Logs order change caused by manual order state change</ li > <li><i>ORDER_GOPAY_STATE_CHANGED</i> - Logs order change caused by order state change from gopay</ li > <li><i>ORDER_BANK_STATE_CHANGED</i> - Logs order change caused by order state change from bank</ li > <li><i>ORDER_AUTOMATIC_STATE_CHANGED</i> - Logs order change caused by automatic order state change</ li > <li><i>ORDER_CRON_WMS_STATE_CHANGED</i> - Logs order change caused by order state change from sending order to wms</ li > <li><i>BUNDLE_PRICE_ADDED</i> - Logs when price is added to bundle</ li > <li><i>BUNDLE_PRICE_REMOVED</i> - Logs when price is removed from bundle</ li > <li><i>BUNDLE_PRICE_CHANGED_BY_IMPORT</i> - Logs when bundle price is changed by Vicom import</ li > <li><i>ORDER_GOODS_RETURNED</i> - Goods from order was returned to platform stock</ li > <li><i>ORDER_CANCELLED_BY_CUSTOMER_REQUEST</i> - Order canceled by customer request</ li > <li><i>ORDER_CANCELLED_LACK_OF_GOODS</i> - Order canceled due to lack of goods</ li > <li><i>CONTRACT_WITHDRAWAL_REQUEST_CREATE</i> - Create new contract withdrawal request.</ li > <li><i>CONTRACT_WITHDRAWAL_REQUEST_STATE_CHANGE</i> - Change contract withdrawal request state.</ li > </ul> */
export enum VinistoHelperDllEnumsActionLogApplicationLogType {
  ORDER_EMAIL_SENT = "ORDER_EMAIL_SENT",
  ORDER_DELIVERY_ADDRESS_CHANGED = "ORDER_DELIVERY_ADDRESS_CHANGED",
  ORDER_BILLING_ADDRESS_CHANGED = "ORDER_BILLING_ADDRESS_CHANGED",
  ORDER_INVOICE_GENERATED = "ORDER_INVOICE_GENERATED",
  ORDER_WMS_STATE_CHANGED = "ORDER_WMS_STATE_CHANGED",
  ORDER_MANUAL_STATE_CHANGED = "ORDER_MANUAL_STATE_CHANGED",
  ORDER_GOPAY_STATE_CHANGED = "ORDER_GOPAY_STATE_CHANGED",
  ORDER_BANK_STATE_CHANGED = "ORDER_BANK_STATE_CHANGED",
  ORDER_AUTOMATIC_STATE_CHANGED = "ORDER_AUTOMATIC_STATE_CHANGED",
  ORDER_CRON_WMS_STATE_CHANGED = "ORDER_CRON_WMS_STATE_CHANGED",
  BUNDLE_PRICE_ADDED = "BUNDLE_PRICE_ADDED",
  BUNDLE_PRICE_REMOVED = "BUNDLE_PRICE_REMOVED",
  BUNDLE_PRICE_CHANGED_BY_IMPORT = "BUNDLE_PRICE_CHANGED_BY_IMPORT",
  ORDER_GOODS_RETURNED = "ORDER_GOODS_RETURNED",
  ORDER_CANCELLED_BY_CUSTOMER_REQUEST = "ORDER_CANCELLED_BY_CUSTOMER_REQUEST",
  ORDER_CANCELLED_LACK_OF_GOODS = "ORDER_CANCELLED_LACK_OF_GOODS",
  CONTRACT_WITHDRAWAL_REQUEST_CREATE = "CONTRACT_WITHDRAWAL_REQUEST_CREATE",
  CONTRACT_WITHDRAWAL_REQUEST_STATE_CHANGE = "CONTRACT_WITHDRAWAL_REQUEST_STATE_CHANGE",
}

export interface VinistoApplicationLogDllModelsApiApplicationLogApplicationLogReturn {
  applicationLogs?:
    | (
        | VinistoApplicationLogDllModelsApiApplicationLogOrderApplicationLog
        | VinistoApplicationLogDllModelsApiApplicationLogBundleApplicationLog
      )[]
    | null;
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

export interface VinistoApplicationLogDllModelsApiApplicationLogBaseApplicationLog {
  /** @minLength 1 */
  id: string;
  /** @minLength 1 */
  itemId: string;
  executorUserId?: string | null;
  /** @format int64 */
  time: number;
  /** Possible application log types */
  action: VinistoHelperDllEnumsActionLogApplicationLogType;
  user?: VinistoAuthDllModelsApiUserBaseUser | null;
}

export type VinistoApplicationLogDllModelsApiApplicationLogBundleApplicationLog =
  VinistoApplicationLogDllModelsApiApplicationLogBaseApplicationLog & {
    /** @format double */
    newPriceValue?: number | null;
    newPriceVat?: VinistoHelperDllEnumsVatRate | null;
    newPriceCurrency?: VinistoHelperDllEnumsCurrency | null;
    priceDiscountType?: VinistoHelperDllEnumsPriceDiscountType | null;
    priceLevel?: VinistoHelperDllEnumsPriceLevel | null;
    /** @format double */
    oldPriceValue?: number | null;
    oldPriceVat?: VinistoHelperDllEnumsVatRate | null;
    oldPriceCurrency?: VinistoHelperDllEnumsCurrency | null;
    bundleName?: string | null;
  };

export type VinistoApplicationLogDllModelsApiApplicationLogOrderApplicationLog =
  VinistoApplicationLogDllModelsApiApplicationLogBaseApplicationLog & {
    orderState?: VinistoHelperDllEnumsOrderOrderState | null;
    emailTemplate?: string | null;
    emailData?: string | null;
  };

export interface VinistoAuthDllModelsApiUserBaseUser {
  /** @minLength 1 */
  id: string;
  /** Contains list of possible types User types. */
  type?: VinistoHelperDllEnumsUserUserType;
  /** @minLength 1 */
  email: string;
  /** @minLength 1 */
  loginKey: string;
  passwordHash?: string | null;
  loginHash?: string | null;
  /** @format int64 */
  createdAt?: number;
  /** @format int64 */
  lastLoginTime?: number | null;
  isEmailVerified?: boolean;
  permissions: VinistoHelperDllEnumsUserUserRights[];
  isSuperAdmin?: boolean;
  nickname?: string | null;
  /** Identifies type of the country */
  registrationCountry?: VinistoHelperDllEnumsCountryCode;
  priceLevel?: VinistoHelperDllEnumsPriceLevel | null;
  /** Contains list of possible company states. */
  state?: VinistoHelperDllEnumsUserUserState;
}

export interface VinistoCmsDllModelsApiCmsArticleBundleItem {
  /** @minLength 1 */
  bundleId: string;
  /** @format int32 */
  order?: number;
}

export interface VinistoCmsDllModelsApiCmsArticleCmsArticle {
  /** @minLength 1 */
  id: string;
  /** Contains list of possible languages */
  language?: VinistoHelperDllEnumsLanguage;
  tags: string[];
  specifications: VinistoCommonDllModelsApiSpecificationsBaseSpecification[];
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
  /** Contains list of possible article states */
  state?: VinistoHelperDllEnumsCmsArticleState;
  /** Contains list of possible crousel / listing type for article */
  carouselListingType?: VinistoHelperDllEnumsCmsArticleCarouselListingType;
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
  /** Contains list of possible languages */
  language?: VinistoHelperDllEnumsLanguage;
  /** @minLength 1 */
  value: string;
}

export interface VinistoCommonDllModelsApiMultiLangValues {
  /** Contains list of possible languages */
  language?: VinistoHelperDllEnumsLanguage;
  values?: string[] | null;
}

export interface VinistoCommonDllModelsApiPricesBasePrice {
  priceId?: string | null;
  /** VatRate */
  vat?: VinistoHelperDllEnumsVatRate;
  /** Currency */
  currency?: VinistoHelperDllEnumsCurrency;
  level?: VinistoHelperDllEnumsPriceLevel;
  /** @format int32 */
  platformId?: number;
}

export type VinistoCommonDllModelsApiPricesPrice =
  VinistoCommonDllModelsApiPricesBasePrice & {
    /** @format double */
    value?: number;
    /** @format double */
    valueWithVat?: number;
    /** @format int32 */
    vatValue?: number;
  };

export type VinistoCommonDllModelsApiPricesPriceDiscountSet =
  VinistoCommonDllModelsApiPricesBasePrice & {
    /** @format double */
    value?: number;
    /** @format double */
    valueWithVat?: number;
    values?: Record<string, VinistoCommonDllModelsApiPricesSetItemPrice>;
  };

export type VinistoCommonDllModelsApiPricesPriceDiscountSupplier =
  VinistoCommonDllModelsApiPricesBasePrice & {
    /** @format double */
    value?: number;
    /** @format double */
    valueWithVat?: number;
  };

export type VinistoCommonDllModelsApiPricesPriceDiscountVinisto =
  VinistoCommonDllModelsApiPricesBasePrice & {
    /** @format double */
    value?: number;
    /** @format double */
    valueWithVat?: number;
  };

export type VinistoCommonDllModelsApiPricesPriceDiscountVolume =
  VinistoCommonDllModelsApiPricesBasePrice & {
    values?: Record<string, number>;
    isSupplierDiscount?: boolean;
  };

export interface VinistoCommonDllModelsApiPricesSetItemPrice {
  setPrice?: VinistoCommonDllModelsApiPricesPrice | null;
  originalPrice?: VinistoCommonDllModelsApiPricesPrice | null;
  isSupplierDiscount?: boolean;
}

export interface VinistoCommonDllModelsApiRemoveLanguageParameters {
  /** Contains list of possible languages */
  language?: VinistoHelperDllEnumsLanguage;
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

export interface VinistoCommonDllModelsApiSpecificationsBaseSpecification {
  /** @minLength 1 */
  definitionId: string;
  /** Contains list of possible specification type */
  type?: VinistoHelperDllEnumsSpecificationSpecificationType;
}

export interface VinistoCommonDllModelsApiSpecificationsValueParametersCheckBoxSpecificationValuesParameters {
  allowedValues: boolean[];
  /** @minLength 1 */
  specificationDefinitionId: string;
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

export interface VinistoCommonDllModelsApiSpecificationsValueParametersComboBoxSpecificationValuesParameters {
  allowedValues: string[];
  /** @minLength 1 */
  specificationDefinitionId: string;
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

export interface VinistoCommonDllModelsApiSpecificationsValueParametersDecimalNumberSpecificationValuesParameters {
  allowedValues: number[];
  /** @minLength 1 */
  specificationDefinitionId: string;
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

export interface VinistoCommonDllModelsApiSpecificationsValueParametersMultiComboBoxSpecificationValuesParameters {
  allowedValues: string[];
  /** @minLength 1 */
  specificationDefinitionId: string;
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

export interface VinistoCommonDllModelsApiSpecificationsValueParametersNumberSpecificationValuesParameters {
  allowedNumberValues: number[];
  /** @minLength 1 */
  specificationDefinitionId: string;
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

export interface VinistoCommonDllModelsApiSpecificationsValueParametersTextSpecificationValuesParameters {
  allowedValues: string[];
  /** @minLength 1 */
  specificationDefinitionId: string;
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

export interface VinistoEmailDllModelBaseSendEmailParameters {
  subject: string | null;
  body: string | null;
}

export interface VinistoGiftsDllModelsApiGiftRuleBaseBundleItem {
  bundleId?: string | null;
  /** @format int32 */
  amount?: number;
}

export interface VinistoGiftsDllModelsApiGiftRuleBaseGiftRule {
  id?: string | null;
  name?: string | null;
  nameNormalized?: string | null;
  description?: string | null;
  /** Identifies type of the country */
  countryCode?: VinistoHelperDllEnumsCountryCode;
  /** @format int32 */
  validFrom?: number;
  /** @format int32 */
  validTo?: number | null;
  /** @format int32 */
  applicableLimit?: number | null;
  /** @format int32 */
  applicableLimitCounter?: number | null;
  /** Contains list of possible gift rule types */
  ruleType?: VinistoHelperDllEnumsGiftGiftRuleType;
  isActive?: boolean;
  bundles?: VinistoGiftsDllModelsApiGiftRuleBundleItem[] | null;
}

export interface VinistoGiftsDllModelsApiGiftRuleBundleItem {
  /** Represents bundle */
  bundle?: VinistoProductDllModelsApiBundleBundle | null;
  bundleId?: string | null;
  /** @format int32 */
  amount?: number;
}

export type VinistoGiftsDllModelsApiGiftRuleCategoryGiftRule =
  VinistoGiftsDllModelsApiGiftRuleBaseGiftRule & {
    categoryId?: string | null;
  };

export interface VinistoGiftsDllModelsApiGiftRuleGiftRuleCategoryManipulationParameters {
  isShowOnDetail: boolean;
  /** @minLength 1 */
  categoryId: string;
  /** Identifies type of the country */
  allowedCountry: VinistoHelperDllEnumsCountryCode;
  /** Contains list of possible gift rule types */
  ruleType: VinistoHelperDllEnumsGiftGiftRuleType;
  bundles: VinistoGiftsDllModelsApiGiftRuleBaseBundleItem[];
  /** @minLength 1 */
  name: string;
  /** @minLength 1 */
  description: string;
  /** @format int32 */
  validFrom: number;
  /** @format int32 */
  validTo?: number | null;
  /** @format int32 */
  applicableLimit?: number | null;
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

export interface VinistoGiftsDllModelsApiGiftRuleGiftRuleOrderPriceCreateParameter {
  /** @format double */
  orderPriceLimitFrom?: number;
  /** @format double */
  orderPriceLimitTo?: number | null;
  /** Currency */
  currency?: VinistoHelperDllEnumsCurrency;
  /** Identifies type of the country */
  allowedCountry: VinistoHelperDllEnumsCountryCode;
  /** Contains list of possible gift rule types */
  ruleType: VinistoHelperDllEnumsGiftGiftRuleType;
  bundles: VinistoGiftsDllModelsApiGiftRuleBaseBundleItem[];
  /** @minLength 1 */
  name: string;
  /** @minLength 1 */
  description: string;
  /** @format int32 */
  validFrom: number;
  /** @format int32 */
  validTo?: number | null;
  /** @format int32 */
  applicableLimit?: number | null;
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

export interface VinistoGiftsDllModelsApiGiftRuleGiftRuleOrderPriceUpdateParameter {
  /** @format double */
  orderPriceLimitFrom?: number | null;
  /** @format double */
  orderPriceLimitTo?: number | null;
  /** Currency */
  currency?: VinistoHelperDllEnumsCurrency;
  /** @minLength 1 */
  name: string;
  /** @minLength 1 */
  description: string;
  /** @format int32 */
  validFrom: number;
  /** @format int32 */
  validTo?: number | null;
  /** @format int32 */
  applicableLimit?: number | null;
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

export interface VinistoGiftsDllModelsApiGiftRuleGiftRuleReturn {
  giftRule?:
    | VinistoGiftsDllModelsApiGiftRuleOrderPriceGiftRule
    | VinistoGiftsDllModelsApiGiftRuleCategoryGiftRule
    | VinistoGiftsDllModelsApiGiftRuleSpecificationGiftRule
    | VinistoGiftsDllModelsApiGiftRuleSupplierGiftRule
    | null;
  /** Has occurred any error. */
  isError?: boolean;
  /** List of errors code that occurred during the api request. */
  error?: VinistoHelperDllBaseError[] | null;
}

export interface VinistoGiftsDllModelsApiGiftRuleGiftRuleSpecificationManipulationParameters {
  isShowOnDetail: boolean;
  specification?: any;
  /** Identifies type of the country */
  allowedCountry: VinistoHelperDllEnumsCountryCode;
  /** Contains list of possible gift rule types */
  ruleType: VinistoHelperDllEnumsGiftGiftRuleType;
  bundles: VinistoGiftsDllModelsApiGiftRuleBaseBundleItem[];
  /** @minLength 1 */
  name: string;
  /** @minLength 1 */
  description: string;
  /** @format int32 */
  validFrom: number;
  /** @format int32 */
  validTo?: number | null;
  /** @format int32 */
  applicableLimit?: number | null;
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

export interface VinistoGiftsDllModelsApiGiftRuleGiftRuleSupplierManipulationParameters {
  isShowOnDetail: boolean;
  /** @minLength 1 */
  supplierId: string;
  /** Identifies type of the country */
  allowedCountry: VinistoHelperDllEnumsCountryCode;
  /** Contains list of possible gift rule types */
  ruleType: VinistoHelperDllEnumsGiftGiftRuleType;
  bundles: VinistoGiftsDllModelsApiGiftRuleBaseBundleItem[];
  /** @minLength 1 */
  name: string;
  /** @minLength 1 */
  description: string;
  /** @format int32 */
  validFrom: number;
  /** @format int32 */
  validTo?: number | null;
  /** @format int32 */
  applicableLimit?: number | null;
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

export interface VinistoGiftsDllModelsApiGiftRuleGiftRulesReturn {
  giftRules?:
    | (
        | VinistoGiftsDllModelsApiGiftRuleOrderPriceGiftRule
        | VinistoGiftsDllModelsApiGiftRuleCategoryGiftRule
        | VinistoGiftsDllModelsApiGiftRuleSpecificationGiftRule
        | VinistoGiftsDllModelsApiGiftRuleSupplierGiftRule
      )[]
    | null;
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

export type VinistoGiftsDllModelsApiGiftRuleOrderPriceGiftRule =
  VinistoGiftsDllModelsApiGiftRuleBaseGiftRule & {
    /** @format double */
    orderPriceLimitFrom?: number;
    /** @format double */
    orderPriceLimitTo?: number | null;
    /** @format double */
    leftToSpent?: number;
    /** Currency */
    currency?: VinistoHelperDllEnumsCurrency;
  };

export type VinistoGiftsDllModelsApiGiftRuleSpecificationGiftRule =
  VinistoGiftsDllModelsApiGiftRuleBaseGiftRule & {
    specification?: VinistoCommonDllModelsApiSpecificationsBaseSpecification | null;
  };

export type VinistoGiftsDllModelsApiGiftRuleSupplierGiftRule =
  VinistoGiftsDllModelsApiGiftRuleBaseGiftRule & {
    supplierId?: string | null;
  };

/** Class containing parameters for user authorization */
export interface VinistoHelperDllBaseAuthorizationParameters {
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

/** Base return class containing result and error information. */
export interface VinistoHelperDllBaseBaseReturn {
  /** Has occurred any error. */
  isError?: boolean;
  /** List of errors code that occurred during the api request. */
  error?: VinistoHelperDllBaseError[] | null;
}

/** Return object with bool value */
export interface VinistoHelperDllBaseBoolReturn {
  /** Bool object */
  result?: boolean | null;
  /** Has occurred any error. */
  isError?: boolean;
  /** List of errors code that occurred during the api request. */
  error?: VinistoHelperDllBaseError[] | null;
}

/** Complete Error */
export interface VinistoHelperDllBaseError {
  /** Mongo object from enum */
  mongoObject?: VinistoHelperDllEnumsErrorMongoObject;
  /** General error from enum */
  generalError?: VinistoHelperDllEnumsErrorGeneralError;
  /** Specific error from enum */
  specificError?: VinistoHelperDllEnumsErrorSpecificError | null;
  /** Text of error message */
  message?: string | null;
}

/** Parameters used for assigning one object to another */
export interface VinistoHelperDllBaseItemAssignParameters {
  /**
   * Id of an object which is being assigned to a different object
   * @minLength 1
   */
  itemId: string;
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

/** Parameters used for assigning one object to another by country. */
export interface VinistoHelperDllBaseItemAssignWithCountryParameters {
  /**
   * Id of an object which is being assigned to a different object.
   * @minLength 1
   */
  itemId: string;
  /** Identifies type of the country */
  countryOfSale?: VinistoHelperDllEnumsCountryCode;
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

/** Parameters used for assigning one object to another objects */
export interface VinistoHelperDllBaseItemsAssignParameters {
  /** Id of objects to update */
  objectIds: string[];
  /**
   * Id of an object which is being assigned to a different object
   * @minLength 1
   */
  itemId: string;
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
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
  objectType?: VinistoHelperDllEnumsImageImageObjectType;
  /** True in case the image is the main */
  isMain?: boolean;
}

/** Represents svg image */
export interface VinistoImageDllModelsApiImageSvgImage {
  /** Url of the svg image location */
  url?: string | null;
  /** Id */
  id?: string | null;
  /** Identifies object type to which an image is assigned */
  objectType?: VinistoHelperDllEnumsImageImageObjectType;
  /** True in case the image is the main */
  isMain?: boolean;
}

/** Represents image in various sizes. */
export interface VinistoImageDllModelsApiImageUrlsImage {
  /**
   * Set of urls pointing to individual image versions of this image
   * Key - name of the image version/size
   * Value - url of the image location
   */
  domainUrls?: Record<string, string>;
  /** Id */
  id?: string | null;
  /** Identifies object type to which an image is assigned */
  objectType?: VinistoHelperDllEnumsImageImageObjectType;
  /** True in case the image is the main */
  isMain?: boolean;
}

/** Represents Bundle item object containing product id and amount */
export interface VinistoMongoConnectorModelsBundleItemsProductItem {
  itemId?: string | null;
  /** @format int32 */
  amount?: number;
}

/** Represents admin bundle API object. */
export interface VinistoProductDllModelsApiAdminBundle {
  name?: string | null;
  nameNormalized?: string | null;
  description?: string | null;
  metaDescription?: string | null;
  shortDescription?: string | null;
  text?: string | null;
  url?: string | null;
  prices?: VinistoCommonDllModelsApiPricesPrice[] | null;
  /** @format double */
  lowestInternetPrice?: number | null;
  priceDiscounts?:
    | (
        | VinistoCommonDllModelsApiPricesPriceDiscountSet
        | VinistoCommonDllModelsApiPricesPriceDiscountSupplier
        | VinistoCommonDllModelsApiPricesPriceDiscountVinisto
        | VinistoCommonDllModelsApiPricesPriceDiscountVolume
        | VinistoCommonDllModelsApiPricesPrice
      )[]
    | null;
  isEnabled?: boolean;
  isDeleted?: boolean;
  tagNames?: string[] | null;
  categoryNames?: string[] | null;
  /** @format int32 */
  lastView?: number | null;
  supplierName?: string | null;
  isDeliveryFree?: boolean;
  /** @format int32 */
  scoring?: number;
  /** @format int32 */
  scoringWarehouse?: number;
  /** @format int32 */
  scoringDiscount?: number;
  /** @format int32 */
  scoringAdmin?: number;
  isForLogged?: boolean;
  temporaryUnavailable?: boolean;
  isGift?: boolean;
  isClearanceSale?: boolean;
  isSet?: boolean;
  canSendToWms?: boolean;
  isSaleOver?: boolean;
  /** @format int32 */
  piecesPerPackage?: number;
  /** @format int32 */
  packagesOnPallet?: number;
  allowedCountries?: VinistoHelperDllEnumsCountryCode[] | null;
  setType?: VinistoHelperDllEnumsBundleSetType;
  states?: VinistoHelperDllEnumsBundleBundleState[] | null;
  isApproved?: boolean;
  availableOnPlatforms?: number[] | null;
}

/** Represents admin bundles API object including total count. */
export interface VinistoProductDllModelsApiAdminBundlesReturn {
  bundles?: VinistoProductDllModelsApiAdminBundle[] | null;
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

/** Represents Custom Carousel on HomePage for admin (simplified). */
export interface VinistoProductDllModelsApiAdminHomepageCustomCarousel {
  /** Id of the custom carousel on HomePage */
  id?: string | null;
  /** Name carousel on Homepage - list containing language versions */
  name?: VinistoProductDllModelsApiMultiLangValue[] | null;
  /**
   * SequenceNumber carousel in homepage
   * @format int32
   */
  sequenceNumber?: number;
  /** Enabled flag - true if carousel enabled. */
  isEnabled?: boolean;
  /** @format int32 */
  availableOnPlatform?: number;
}

/** Return API object for HomepageCustomCarousel in admin (simplified) */
export interface VinistoProductDllModelsApiAdminHomepageCustomCarouselsReturn {
  /** Return Custom Carousels in HomePage in admin (simplified) */
  homepageCustomCarousels?:
    | VinistoProductDllModelsApiAdminHomepageCustomCarousel[]
    | null;
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

/** Return API object for Specification with count of all object */
export interface VinistoProductDllModelsApiAdminSpecificationsReturn {
  /** Return list Specifications */
  specifications?:
    | VinistoProductDllModelsApiSpecificationDefinitionModelsBaseSpecificationDefinition[]
    | null;
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

/** Parameters for editing bundle in SET */
export interface VinistoProductDllModelsApiBundleBundlEditItemParameters {
  /** @minLength 1 */
  itemId: string;
  /** @format int32 */
  oldAmount: number;
  /** @format int32 */
  newAmount: number;
  oldPrices: VinistoCommonDllModelsApiPricesPrice[];
  newPrices: VinistoCommonDllModelsApiPricesPrice[];
  /** Identifies type of the country */
  countryOfSale?: VinistoHelperDllEnumsCountryCode;
  discountCostsSupplier?: boolean | null;
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
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
  priceDiscounts?:
    | (
        | VinistoCommonDllModelsApiPricesPriceDiscountSet
        | VinistoCommonDllModelsApiPricesPriceDiscountSupplier
        | VinistoCommonDllModelsApiPricesPriceDiscountVinisto
        | VinistoCommonDllModelsApiPricesPriceDiscountVolume
        | VinistoCommonDllModelsApiPricesPrice
      )[]
    | null;
  /** Item of the bundle - list containing various product_id and amount. */
  items: (
    | VinistoProductDllModelsApiBundleItemsBundleItem
    | VinistoProductDllModelsApiBundleItemsProductItem
  )[];
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
  language?: VinistoHelperDllEnumsLanguage | null;
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
  allowedCountries?: VinistoHelperDllEnumsCountryCode[] | null;
  setType?: VinistoHelperDllEnumsBundleSetType;
  states?: VinistoHelperDllEnumsBundleBundleState[] | null;
  /** IsApproved flag - false if bundle is not approve. */
  isApproved?: boolean;
  warehouseId?: string[] | null;
  /** Bundle is available on these platforms */
  availableOnPlatforms?: number[] | null;
}

/** Parameters for assigning bundle to bundle SET and setting discount set price. */
export interface VinistoProductDllModelsApiBundleBundleAssignParameters {
  /** @format int32 */
  amount: number;
  prices: VinistoCommonDllModelsApiPricesPrice[] | null;
  /** Identifies type of the country */
  countryOfSale?: VinistoHelperDllEnumsCountryCode;
  discountCostsSupplier?: boolean;
  /**
   * Id of an object which is being assigned to a different object
   * @minLength 1
   */
  itemId: string;
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

/** Parameters provided to endpoint for change of bundles CanSendToWms */
export interface VinistoProductDllModelsApiBundleBundleCanSendToWmsParameters {
  /** Bundle CanSendToWms - true/false */
  canSendToWms: boolean;
  /** Identifies type of the country */
  countryOfSale?: VinistoHelperDllEnumsCountryCode;
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

/** Return API object of Categories assigned to Bundle. */
export interface VinistoProductDllModelsApiBundleBundleCategoriesReturn {
  /** List of categories. */
  categories?: VinistoProductDllModelsApiCategoryCategory[] | null;
  /** Has occurred any error. */
  isError?: boolean;
  /** List of errors code that occurred during the api request. */
  error?: VinistoHelperDllBaseError[] | null;
}

/** Parameters provided to endpoint for creating bundle */
export interface VinistoProductDllModelsApiBundleBundleCreateParameters {
  /** Flag if bundle will be set as Set type, default false */
  isSet: boolean;
  /** List of product items in bundle (required only if bundle not set as Set type - i.e. isSet = false) */
  items?: VinistoMongoConnectorModelsBundleItemsProductItem[] | null;
  /** Price of bundle (required only if bundle not set as Set type - i.e. isSet = false) */
  price?: VinistoCommonDllModelsApiPricesPrice | null;
  /** Bundle is available on these platforms */
  availableOnPlatforms?: number[] | null;
  /** Contains list of possible languages */
  language: VinistoHelperDllEnumsLanguage;
  /** Identifies type of the country */
  countryOfSale: VinistoHelperDllEnumsCountryCode;
  /**
   * Name of the bundle in provided language
   * @minLength 1
   */
  name: string;
  /**
   * Description for the bundle in provided language
   * @minLength 1
   */
  description: string;
  /** Meta Description for the bundle in provided language */
  metaDescription?: string | null;
  /** Short description for the bundle in provided language */
  shortDescription?: string | null;
  /** Text for the bundle in provided language */
  text?: string | null;
  /** Url of the bundle in provided language. If not provided, it wil be generated automatically */
  url?: string | null;
  /** Supplier of the bundle */
  supplier?: string | null;
  /**
   * Ádmin score of the bundle
   * @format int32
   * @default 1
   */
  scoringAdmin: number;
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
  /** Keywords */
  keywords?: string[] | null;
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

/** Return API object for Bundle detail Carousels */
export interface VinistoProductDllModelsApiBundleBundleDetailCarouselReturn {
  /** Return list last viewed bundles */
  lastViewedBundles?: VinistoProductDllModelsApiBundleBundle[] | null;
  /** Return list similar bundles - same variety, type and kind as original bundle */
  similarBundles?: VinistoProductDllModelsApiBundleBundle[] | null;
  /** Return list manufacturer bundles - same producer specification value as original bundle */
  manufacturerBundles?: VinistoProductDllModelsApiBundleBundle[] | null;
  /** Has occurred any error. */
  isError?: boolean;
  /** List of errors code that occurred during the api request. */
  error?: VinistoHelperDllBaseError[] | null;
}

/** Parameters provided to endpoint for editing bundle */
export interface VinistoProductDllModelsApiBundleBundleEditParameters {
  /** Contains list of possible languages */
  language: VinistoHelperDllEnumsLanguage;
  /** Identifies type of the country */
  countryOfSale: VinistoHelperDllEnumsCountryCode;
  /**
   * Name of the bundle in provided language
   * @minLength 1
   */
  name: string;
  /**
   * Description for the bundle in provided language
   * @minLength 1
   */
  description: string;
  /** Meta Description for the bundle in provided language */
  metaDescription?: string | null;
  /** Short description for the bundle in provided language */
  shortDescription?: string | null;
  /** Text for the bundle in provided language */
  text?: string | null;
  /** Url of the bundle in provided language. If not provided, it wil be generated automatically */
  url?: string | null;
  /** Supplier of the bundle */
  supplier?: string | null;
  /**
   * Ádmin score of the bundle
   * @format int32
   * @default 1
   */
  scoringAdmin: number;
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
  /** Keywords */
  keywords?: string[] | null;
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
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

/** Return list string (id of bundle) */
export interface VinistoProductDllModelsApiBundleBundleIdsReturn {
  /** List string as id of bundles */
  bundleSetIds?: string[] | null;
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

/** Parameters provided to endpoint for changing flag is approved */
export interface VinistoProductDllModelsApiBundleBundleIsApprovedParameters {
  /** Bundle is approved - true/false */
  isApproved?: boolean;
  /** Identifies type of the country */
  countryOfSale?: VinistoHelperDllEnumsCountryCode;
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

/** Parameters provided to endpoint for change of bundles IsClearanceSale */
export interface VinistoProductDllModelsApiBundleBundleIsClearanceSaleParameters {
  /** Bundle IsClearanceSale - true/false */
  isClearanceSale: boolean;
  /** Identifies type of the country */
  countryOfSale?: VinistoHelperDllEnumsCountryCode;
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

/** Parameters provided to endpoint for change of bundles IsGift */
export interface VinistoProductDllModelsApiBundleBundleIsGiftParameters {
  /** Bundle IsGift - true/false */
  isGift: boolean;
  /** Identifies type of the country */
  countryOfSale?: VinistoHelperDllEnumsCountryCode;
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

/** Parameters which is possible to provided to api to specify request for add not allowed country to bundle */
export interface VinistoProductDllModelsApiBundleBundleManipulationCountryParameters {
  /** Identifies type of the country */
  country: VinistoHelperDllEnumsCountryCode;
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

/** Return API object for Bundle */
export interface VinistoProductDllModelsApiBundleBundleReturn {
  /** List of bundles */
  bundle?: VinistoProductDllModelsApiBundleBundle | null;
  /** Has occurred any error. */
  isError?: boolean;
  /** List of errors code that occurred during the api request. */
  error?: VinistoHelperDllBaseError[] | null;
}

/** Parameters provided to endpoint for changing state sale is over of bundle */
export interface VinistoProductDllModelsApiBundleBundleSaleOverParameters {
  /** Bundle sell over - true/false */
  isSaleOver: boolean;
  /** Identifies type of the country */
  countryOfSale?: VinistoHelperDllEnumsCountryCode;
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

/** Parameters provided to endpoint for changing state for supplier set bundle */
export interface VinistoProductDllModelsApiBundleBundleSupplierSetChangeStateParameters {
  /** Changed state */
  bundleSupplierState: VinistoHelperDllEnumsBundleBundleState;
  /** Identifies type of the country */
  countryOfSale?: VinistoHelperDllEnumsCountryCode;
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

export interface VinistoProductDllModelsApiBundleBundleSupplierSetManipulationParameters {
  name?: string | null;
  shortDescription?: string | null;
  description?: string | null;
  supplierId?: string | null;
  setType?: VinistoHelperDllEnumsBundleSetType;
  /** Contains list of possible languages */
  language?: VinistoHelperDllEnumsLanguage;
  /** Identifies type of the country */
  countryOfSale?: VinistoHelperDllEnumsCountryCode;
  paidBundles?: string[] | null;
  freeBundles?: string[] | null;
  /** @format double */
  percentageDiscountValue?: number;
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

/** Parameters provided to endpoint for change of bundles temporary unavailability */
export interface VinistoProductDllModelsApiBundleBundleTemporaryUnavailabilityParameters {
  /** Bundle temporary unavailable - true/false */
  temporaryUnavailable: boolean;
  /** Identifies type of the country */
  countryOfSale?: VinistoHelperDllEnumsCountryCode;
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

/**
 * Parameters for usassigning bundle from bundle SET.
 * Multiple same ItemIds in bundle set can exists, so Amount and Price help us to identify correct item.
 */
export interface VinistoProductDllModelsApiBundleBundleUnassignParameters {
  /** @minLength 1 */
  itemId: string;
  /** @format int32 */
  amount: number;
  price: VinistoCommonDllModelsApiPricesPrice;
  /** Identifies type of the country */
  countryOfSale?: VinistoHelperDllEnumsCountryCode;
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

/** Parameters provided to endpoint for batch changing of bundles availability */
export interface VinistoProductDllModelsApiBundleBundlesAvailabilityParameters {
  /** List of bundle ids */
  bundleIds: string[];
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

/** Return API object for Bundle */
export interface VinistoProductDllModelsApiBundleBundlesFilterReturn {
  /** List of available filters with their available values for provided returned bundles */
  specificationFilters?: any[] | null;
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

/** Common parameters which is possible to provided to api to specify which bundles are requested */
export interface VinistoProductDllModelsApiBundleBundlesGetCommonParameters {
  cacheMethodKey?: string | null;
  /** If true search only between mark as deleted bundles, if false search only between mark as not deleted bundles, if not provided search all bundles */
  isDeleted?: boolean | null;
  /** If true search only between enabled bundles, if false search only between disabled bundles, if null search all bundles. */
  isEnabled?: boolean | null;
  /**
   * If true search only between mark as IsGift bundles, if false search only between mark as not IsGift bundles, if not provided search all bundles
   * If is true, then return bundles with property IsGift = true.
   * If is false, then return bundles with property IsGift = false.
   * Default is null and return all bundles (IsGift = true or IsGift = false)
   */
  isGift?: boolean | null;
  /**
   * If true search only between mark as IsClearanceSale bundles, if false search only between mark as not IsClearanceSale bundles, if not provided search all bundles
   * If is true, then return bundles with property IsClearanceSale = true.
   * If is false, then return bundles with property IsClearanceSale = false.
   * Default is null and return all bundles (IsClearanceSale = true or IsClearanceSale = false)
   */
  isClearanceSale?: boolean | null;
  /** If true search only between mark as temporary unavailable bundles, if false search only between mark as not temporary unavailable bundles, if not provided search all bundles */
  isTemporaryUnavailable?: boolean | null;
  /**
   * If true search only between mark as only for logged users bundles, if false search only between mark as not only for logged users bundles, if not provided search all bundles
   * If is true, then return bundles with property IsForLogged = true.
   * If is false, then return bundles with property IsForLogged = false.
   * Default is null and return all bundles (IsForLogged = true or IsForLogged = false)
   */
  isForLoggedUsers?: boolean | null;
  /** If true search only between mark as IsSaleOver bundles, if false search only between mark as not IsSaleBundles bundles, if not provided search all bundles */
  isSaleOver?: boolean | null;
  /**
   * Flag to get in stock bundles.
   * If false, then all bundles are provided.
   * If true, then only bundles with quantity in stock grather then zero are provided
   * Default = false
   */
  isInStock?: boolean | null;
  /** Contains list of possible columns for sorting */
  sortingColumn?: VinistoHelperDllEnumsBundleSortableColumns;
  /** True in case that sorting shall be done in descending order */
  isSortingDescending?: boolean;
  /** True in case that filters are in imperial units. */
  isInImperialUnits?: boolean;
  /** Filters which are provided to filter values of provided specifications or bundles propeties. */
  filters?: any[] | null;
  /** Currency */
  currency?: VinistoHelperDllEnumsCurrency;
  /** Identifies type of the country */
  countryOfSale?: VinistoHelperDllEnumsCountryCode;
  /**
   * If true search only between mark as IsApproved bundles
   * If false search only between mark as not IsApproved bundles
   * If not provided search all bundles
   */
  isApproved?: boolean | null;
  /** Filter bundles by ids which are defined for shipping packaging. If true, then shipping packaging bundles are allowed in response, else are removed from response. Default is fale (are not in response) */
  searchIsBundleShippingPackaging?: boolean;
  /**
   * Filter bundles by price parameter.
   * If true, return bundles with at least one price.
   * If false, return all bundles.
   */
  isPriceRequired?: boolean;
  /**
   * Filter prices and discountPrices by price levels.
   * Only prices for specified PriceLevels will be returned.
   */
  priceLevels?: VinistoHelperDllEnumsPriceLevel[] | null;
  isCache?: boolean;
}

/** Parameters which is possible to provided to api to specify which bundles are requested */
export interface VinistoProductDllModelsApiBundleBundlesGetParameters {
  cacheMethodKey?: string | null;
  /**
   * Number of records to be retrieved. if not provided default value is 10.
   * Limited by Maximum number of records in EnvironmentConstants
   * @format int32
   */
  limit?: number;
  /**
   * Number of records to be skipped. If not provided default value is 0
   * @format int32
   */
  offset?: number;
  /**
   * Flag to show tags by IsEnabled in bundles response.
   * If IsHiddenTags = false, then show only tags with IsEnabled = true.
   * If IsHiddenTags = true, then show all tags.
   */
  isHiddenTags?: boolean;
  /**
   * Flag to enable / disable prices filtering in bundle response.
   * Default is ture = prices are filtered by platform id and levels.
   */
  filterPrices?: boolean;
  /** If provided search by url in products */
  searchUrl?: string | null;
  /** If provided search by name in products */
  searchName?: string | null;
  /** If true, searchName is used as StartWith instead of Contains */
  isSearchNameAutocomplete?: boolean;
  /**
   * Language of the requested category
   * Language version - if provided, all bundles will be only in selected language.
   * Sorting and searching will be according to the specified language
   * Otherwise all language version will be provided and sorting and searching will be according to the default language (CZECH).
   */
  language?: VinistoHelperDllEnumsLanguage | null;
  /** Filter bundles by category */
  categoryId?: string | null;
  /** Filter bundles by tag */
  tagId?: string | null;
  /** Filter bundles by whether they don't have provided tag yet */
  noTagId?: string | null;
  /** Filter bundles by suppliers id */
  supplierIds?: string[] | null;
  /**
   * Minimum limit for scoring. If not provided default value is 0
   * @format int32
   */
  scoringMin?: number;
  /**
   * Maximum limit for scoring. if not provided default value is null
   * @format int32
   */
  scoringMax?: number | null;
  /** If true then returns only main images, returns all images otherwise */
  isMainImagesOnly?: boolean;
  /** Flag to get hidden specification */
  hiddenSpecification?: boolean;
  /** Flag to get unique bundles by scoring */
  isOnlyHighestScore?: boolean;
  /**
   * Flag to get is bundles in active discounted.
   * If false, then only bundles without active discounted are provided
   * If true, then only bundles with active discounted are provided
   * (exists price with type 1 -  VINISTO_DISCOUNT or 2 - SUPPLIER_DISCOUNT and current time for discount price is between valid_from and valid_to)
   * If not provided, then all bundles are provided.
   */
  isDiscounted?: boolean | null;
  /**
   * If provided, sorting will be done according to this column. If selected PriceLevel STANDARD returns all bundles
   * If not provided, default sorting is done by Id
   */
  priceLevel?: VinistoHelperDllEnumsPriceLevel | null;
  /** Number of records to be skipped. If not provided default value is 0 */
  sortingPriceLevel?: VinistoHelperDllEnumsPriceLevel;
  /** If provided, response will be filtered by active discount type. If not provided, filter will not be applied. */
  priceType?: VinistoHelperDllEnumsPriceDiscountType | null;
  /**
   * Flag to search bundles by tag IsSet
   * If IsBundleSet = null, then return all bundles.
   * If IsBundleSet = false, then return bundles with flag IsSet = false.
   * If IsBundleSet = true, then return bundles with flag IsSet = true.
   */
  isSet?: boolean | null;
  /**
   * Flag to search bundles by platform
   * If Platform = null, then return all bundles.
   * @format int32
   */
  platform?: number;
  /**
   * Flag to search bundles by states
   * If BundleStates = null, then return all confirmed bundles.
   * If BundleStates.Count > 0, then return bundles with state in states.
   */
  bundleStates?: VinistoHelperDllEnumsBundleBundleState[] | null;
  /** Filter bundles by connected product warehouse id. Product warehouse id must be exactly equals to this parameter value. */
  searchWarehouseId?: string | null;
  /**
   * If true search only between mark as intangible bundles, if false search only between mark as intangible bundles, if not provided search all bundles
   * If is true, then return bundles with property CanSendToWms = false.
   * If is false, then return bundles with property CanSendToWms = true.
   * Default is null and return all bundles (CanSendToWms = true or CanSendToWms = false)
   */
  isIntangible?: boolean | null;
  /**
   * If true search only between mark as is delivery free bundles, if false search only between mark as not is delivery free bundles, if not provided search all bundles
   * If is true, then return bundles with property IsDeliveryFree = true.
   * If is false, then return bundles with property IsDeliveryFree = false.
   * Default is null and return all bundles (IsDeliveryFree = true or IsDeliveryFree = false)
   */
  isDeliveryFree?: boolean | null;
  /** If true search only between mark as deleted bundles, if false search only between mark as not deleted bundles, if not provided search all bundles */
  isDeleted?: boolean | null;
  /** If true search only between enabled bundles, if false search only between disabled bundles, if null search all bundles. */
  isEnabled?: boolean | null;
  /**
   * If true search only between mark as IsGift bundles, if false search only between mark as not IsGift bundles, if not provided search all bundles
   * If is true, then return bundles with property IsGift = true.
   * If is false, then return bundles with property IsGift = false.
   * Default is null and return all bundles (IsGift = true or IsGift = false)
   */
  isGift?: boolean | null;
  /**
   * If true search only between mark as IsClearanceSale bundles, if false search only between mark as not IsClearanceSale bundles, if not provided search all bundles
   * If is true, then return bundles with property IsClearanceSale = true.
   * If is false, then return bundles with property IsClearanceSale = false.
   * Default is null and return all bundles (IsClearanceSale = true or IsClearanceSale = false)
   */
  isClearanceSale?: boolean | null;
  /** If true search only between mark as temporary unavailable bundles, if false search only between mark as not temporary unavailable bundles, if not provided search all bundles */
  isTemporaryUnavailable?: boolean | null;
  /**
   * If true search only between mark as only for logged users bundles, if false search only between mark as not only for logged users bundles, if not provided search all bundles
   * If is true, then return bundles with property IsForLogged = true.
   * If is false, then return bundles with property IsForLogged = false.
   * Default is null and return all bundles (IsForLogged = true or IsForLogged = false)
   */
  isForLoggedUsers?: boolean | null;
  /** If true search only between mark as IsSaleOver bundles, if false search only between mark as not IsSaleBundles bundles, if not provided search all bundles */
  isSaleOver?: boolean | null;
  /**
   * Flag to get in stock bundles.
   * If false, then all bundles are provided.
   * If true, then only bundles with quantity in stock grather then zero are provided
   * Default = false
   */
  isInStock?: boolean | null;
  /** Contains list of possible columns for sorting */
  sortingColumn?: VinistoHelperDllEnumsBundleSortableColumns;
  /** True in case that sorting shall be done in descending order */
  isSortingDescending?: boolean;
  /** True in case that filters are in imperial units. */
  isInImperialUnits?: boolean;
  /** Filters which are provided to filter values of provided specifications or bundles propeties. */
  filters?: any[] | null;
  /** Currency */
  currency?: VinistoHelperDllEnumsCurrency;
  /** Identifies type of the country */
  countryOfSale?: VinistoHelperDllEnumsCountryCode;
  /**
   * If true search only between mark as IsApproved bundles
   * If false search only between mark as not IsApproved bundles
   * If not provided search all bundles
   */
  isApproved?: boolean | null;
  /** Filter bundles by ids which are defined for shipping packaging. If true, then shipping packaging bundles are allowed in response, else are removed from response. Default is fale (are not in response) */
  searchIsBundleShippingPackaging?: boolean;
  /**
   * Filter bundles by price parameter.
   * If true, return bundles with at least one price.
   * If false, return all bundles.
   */
  isPriceRequired?: boolean;
  /**
   * Filter prices and discountPrices by price levels.
   * Only prices for specified PriceLevels will be returned.
   */
  priceLevels?: VinistoHelperDllEnumsPriceLevel[] | null;
  isCache?: boolean;
}

/** Base class for parameters without limit which is possible to provided to api to specify which bundles are requested */
export interface VinistoProductDllModelsApiBundleBundlesGetWithoutLimitParameters {
  cacheMethodKey?: string | null;
  /** If provided search by url in products */
  searchUrl?: string | null;
  /** If provided search by name in products */
  searchName?: string | null;
  /** If true, searchName is used as StartWith instead of Contains */
  isSearchNameAutocomplete?: boolean;
  /**
   * Language of the requested category
   * Language version - if provided, all bundles will be only in selected language.
   * Sorting and searching will be according to the specified language
   * Otherwise all language version will be provided and sorting and searching will be according to the default language (CZECH).
   */
  language?: VinistoHelperDllEnumsLanguage | null;
  /** Filter bundles by category */
  categoryId?: string | null;
  /** Filter bundles by tag */
  tagId?: string | null;
  /** Filter bundles by whether they don't have provided tag yet */
  noTagId?: string | null;
  /** Filter bundles by suppliers id */
  supplierIds?: string[] | null;
  /**
   * Minimum limit for scoring. If not provided default value is 0
   * @format int32
   */
  scoringMin?: number;
  /**
   * Maximum limit for scoring. if not provided default value is null
   * @format int32
   */
  scoringMax?: number | null;
  /** If true then returns only main images, returns all images otherwise */
  isMainImagesOnly?: boolean;
  /** Flag to get hidden specification */
  hiddenSpecification?: boolean;
  /** Flag to get unique bundles by scoring */
  isOnlyHighestScore?: boolean;
  /**
   * Flag to get is bundles in active discounted.
   * If false, then only bundles without active discounted are provided
   * If true, then only bundles with active discounted are provided
   * (exists price with type 1 -  VINISTO_DISCOUNT or 2 - SUPPLIER_DISCOUNT and current time for discount price is between valid_from and valid_to)
   * If not provided, then all bundles are provided.
   */
  isDiscounted?: boolean | null;
  /**
   * If provided, sorting will be done according to this column. If selected PriceLevel STANDARD returns all bundles
   * If not provided, default sorting is done by Id
   */
  priceLevel?: VinistoHelperDllEnumsPriceLevel | null;
  /** Number of records to be skipped. If not provided default value is 0 */
  sortingPriceLevel?: VinistoHelperDllEnumsPriceLevel;
  /** If provided, response will be filtered by active discount type. If not provided, filter will not be applied. */
  priceType?: VinistoHelperDllEnumsPriceDiscountType | null;
  /**
   * Flag to search bundles by tag IsSet
   * If IsBundleSet = null, then return all bundles.
   * If IsBundleSet = false, then return bundles with flag IsSet = false.
   * If IsBundleSet = true, then return bundles with flag IsSet = true.
   */
  isSet?: boolean | null;
  /**
   * Flag to search bundles by platform
   * If Platform = null, then return all bundles.
   * @format int32
   */
  platform?: number;
  /**
   * Flag to search bundles by states
   * If BundleStates = null, then return all confirmed bundles.
   * If BundleStates.Count > 0, then return bundles with state in states.
   */
  bundleStates?: VinistoHelperDllEnumsBundleBundleState[] | null;
  /** Filter bundles by connected product warehouse id. Product warehouse id must be exactly equals to this parameter value. */
  searchWarehouseId?: string | null;
  /**
   * If true search only between mark as intangible bundles, if false search only between mark as intangible bundles, if not provided search all bundles
   * If is true, then return bundles with property CanSendToWms = false.
   * If is false, then return bundles with property CanSendToWms = true.
   * Default is null and return all bundles (CanSendToWms = true or CanSendToWms = false)
   */
  isIntangible?: boolean | null;
  /**
   * If true search only between mark as is delivery free bundles, if false search only between mark as not is delivery free bundles, if not provided search all bundles
   * If is true, then return bundles with property IsDeliveryFree = true.
   * If is false, then return bundles with property IsDeliveryFree = false.
   * Default is null and return all bundles (IsDeliveryFree = true or IsDeliveryFree = false)
   */
  isDeliveryFree?: boolean | null;
  /** If true search only between mark as deleted bundles, if false search only between mark as not deleted bundles, if not provided search all bundles */
  isDeleted?: boolean | null;
  /** If true search only between enabled bundles, if false search only between disabled bundles, if null search all bundles. */
  isEnabled?: boolean | null;
  /**
   * If true search only between mark as IsGift bundles, if false search only between mark as not IsGift bundles, if not provided search all bundles
   * If is true, then return bundles with property IsGift = true.
   * If is false, then return bundles with property IsGift = false.
   * Default is null and return all bundles (IsGift = true or IsGift = false)
   */
  isGift?: boolean | null;
  /**
   * If true search only between mark as IsClearanceSale bundles, if false search only between mark as not IsClearanceSale bundles, if not provided search all bundles
   * If is true, then return bundles with property IsClearanceSale = true.
   * If is false, then return bundles with property IsClearanceSale = false.
   * Default is null and return all bundles (IsClearanceSale = true or IsClearanceSale = false)
   */
  isClearanceSale?: boolean | null;
  /** If true search only between mark as temporary unavailable bundles, if false search only between mark as not temporary unavailable bundles, if not provided search all bundles */
  isTemporaryUnavailable?: boolean | null;
  /**
   * If true search only between mark as only for logged users bundles, if false search only between mark as not only for logged users bundles, if not provided search all bundles
   * If is true, then return bundles with property IsForLogged = true.
   * If is false, then return bundles with property IsForLogged = false.
   * Default is null and return all bundles (IsForLogged = true or IsForLogged = false)
   */
  isForLoggedUsers?: boolean | null;
  /** If true search only between mark as IsSaleOver bundles, if false search only between mark as not IsSaleBundles bundles, if not provided search all bundles */
  isSaleOver?: boolean | null;
  /**
   * Flag to get in stock bundles.
   * If false, then all bundles are provided.
   * If true, then only bundles with quantity in stock grather then zero are provided
   * Default = false
   */
  isInStock?: boolean | null;
  /** Contains list of possible columns for sorting */
  sortingColumn?: VinistoHelperDllEnumsBundleSortableColumns;
  /** True in case that sorting shall be done in descending order */
  isSortingDescending?: boolean;
  /** True in case that filters are in imperial units. */
  isInImperialUnits?: boolean;
  /** Filters which are provided to filter values of provided specifications or bundles propeties. */
  filters?: any[] | null;
  /** Currency */
  currency?: VinistoHelperDllEnumsCurrency;
  /** Identifies type of the country */
  countryOfSale?: VinistoHelperDllEnumsCountryCode;
  /**
   * If true search only between mark as IsApproved bundles
   * If false search only between mark as not IsApproved bundles
   * If not provided search all bundles
   */
  isApproved?: boolean | null;
  /** Filter bundles by ids which are defined for shipping packaging. If true, then shipping packaging bundles are allowed in response, else are removed from response. Default is fale (are not in response) */
  searchIsBundleShippingPackaging?: boolean;
  /**
   * Filter bundles by price parameter.
   * If true, return bundles with at least one price.
   * If false, return all bundles.
   */
  isPriceRequired?: boolean;
  /**
   * Filter prices and discountPrices by price levels.
   * Only prices for specified PriceLevels will be returned.
   */
  priceLevels?: VinistoHelperDllEnumsPriceLevel[] | null;
  isCache?: boolean;
}

/** Return API object for Bundle */
export interface VinistoProductDllModelsApiBundleBundlesReturn {
  /** List of bundles */
  bundles?: VinistoProductDllModelsApiBundleBundle[] | null;
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

/** Represents base item object to specify bundle items by his type. */
export interface VinistoProductDllModelsApiBundleItemsBaseItem {
  itemId?: string | null;
  /** @format int32 */
  amount?: number;
}

/** Represents Bundle item object containing bundle id, amount and price */
export type VinistoProductDllModelsApiBundleItemsBundleItem =
  VinistoProductDllModelsApiBundleItemsBaseItem & {
    id?: string | null;
  };

/** Represents Bundle item object containing product id and amount */
export type VinistoProductDllModelsApiBundleItemsProductItem =
  VinistoProductDllModelsApiBundleItemsBaseItem & object;

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

/** Parameters provided to endpoint for set order limitation bundle */
export interface VinistoProductDllModelsApiBundleOrderLimitationParameters {
  /**
   * Maximum number of bundles in one order
   * @format int32
   */
  limit: number;
  /**
   * Limit is valid from
   * @format int64
   */
  validFrom: number;
  /**
   * Limit is valid to
   * @format int64
   */
  validTo?: number | null;
  /** Identifies type of the country */
  countryOfSale?: VinistoHelperDllEnumsCountryCode;
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

/** Parameters provided to endpoint for set order limitation bundles */
export interface VinistoProductDllModelsApiBundleOrderLimitationsParameters {
  /** List of bundle ids */
  bundleIds: string[];
  /**
   * Maximum number of bundles in one order
   * @format int32
   */
  limit: number;
  /**
   * Limit is valid from
   * @format int64
   */
  validFrom: number;
  /**
   * Limit is valid to
   * @format int64
   */
  validTo?: number | null;
  /** Identifies type of the country */
  countryOfSale?: VinistoHelperDllEnumsCountryCode;
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

/** Parameters provided to endpoint for set order limitation bundles */
export interface VinistoProductDllModelsApiBundleOrderLimitationsRemoveParameters {
  /** List of bundle ids */
  bundleIds: string[];
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

/** Parameters used for creating discount price for bundle */
export interface VinistoProductDllModelsApiBundlePriceBundleDiscountPriceCreateParameters {
  /**
   * Value - price - for type discount Vinisto and Supplier
   * @format double
   */
  value?: number;
  /** Currency */
  currency: VinistoHelperDllEnumsCurrency;
  /** Identifies type of the country */
  countryOfSale?: VinistoHelperDllEnumsCountryCode;
  /**
   * Price validity from
   * @format int32
   */
  validFrom?: number | null;
  /**
   * Price validity to
   * @format int32
   */
  validTo?: number | null;
  /** Create discount price by discount type. */
  discountType?: VinistoHelperDllEnumsPriceDiscountType;
  /** Price type for discount type. */
  priceLevel?: VinistoHelperDllEnumsPriceLevel;
  /** @format int32 */
  platformId: number;
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

/** Parameters used for editing discount price for bundle */
export interface VinistoProductDllModelsApiBundlePriceBundleDiscountPriceEditParameters {
  /** Id of the discount price */
  id?: string | null;
  /**
   * Value - price - for type discount Vinisto and Supplier
   * @format double
   */
  value?: number;
  /** Currency */
  currency: VinistoHelperDllEnumsCurrency;
  /** Identifies type of the country */
  countryOfSale?: VinistoHelperDllEnumsCountryCode;
  /**
   * Price validity from
   * @format int32
   */
  validFrom?: number | null;
  /**
   * Price validity to
   * @format int32
   */
  validTo?: number | null;
  /** Create discount price by discount type. */
  discountType?: VinistoHelperDllEnumsPriceDiscountType;
  /** Price type for discount type. */
  priceLevel?: VinistoHelperDllEnumsPriceLevel;
  /** @format int32 */
  platformId: number;
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

/** Parameters used for creating volume discount price for bundle */
export interface VinistoProductDllModelsApiBundlePriceBundleDiscountVolumePriceCreateParameters {
  /** Value - for type Volume */
  values?: Record<string, number>;
  /** Currency */
  currency: VinistoHelperDllEnumsCurrency;
  /** Identifies type of the country */
  countryOfSale?: VinistoHelperDllEnumsCountryCode;
  /**
   * Price validity from
   * @format int32
   */
  validFrom?: number | null;
  /**
   * Price validity to
   * @format int32
   */
  validTo?: number | null;
  /** Price type for discount type. */
  priceLevel?: VinistoHelperDllEnumsPriceLevel;
  /** If true the volume discount will be set as supplier. */
  isSupplierDiscount?: boolean;
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

/** Parameters used for creating volume discount price for bundle */
export interface VinistoProductDllModelsApiBundlePriceBundleDiscountVolumePriceEditParameters {
  /** Id of the discount price */
  id?: string | null;
  /** Value - for type Volume */
  values?: Record<string, number>;
  /** Currency */
  currency: VinistoHelperDllEnumsCurrency;
  /** Identifies type of the country */
  countryOfSale?: VinistoHelperDllEnumsCountryCode;
  /**
   * Price validity from
   * @format int32
   */
  validFrom?: number | null;
  /**
   * Price validity to
   * @format int32
   */
  validTo?: number | null;
  /** Price type for discount type. */
  priceLevel?: VinistoHelperDllEnumsPriceLevel;
  /** If true the volume discount will be set as supplier. */
  isSupplierDiscount?: boolean;
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

/** Return API object for Prices in Bundle */
export interface VinistoProductDllModelsApiBundlePricesReturn {
  /** List of price */
  prices?: VinistoCommonDllModelsApiPricesPrice[] | null;
  discountPrices?:
    | (
        | VinistoCommonDllModelsApiPricesPriceDiscountSet
        | VinistoCommonDllModelsApiPricesPriceDiscountSupplier
        | VinistoCommonDllModelsApiPricesPriceDiscountVinisto
        | VinistoCommonDllModelsApiPricesPriceDiscountVolume
        | VinistoCommonDllModelsApiPricesPrice
      )[]
    | null;
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

/** Represents set supplier bundle */
export interface VinistoProductDllModelsApiBundleSetBundleSupplier {
  /**
   * Id of the bundle
   * @minLength 1
   */
  id: string;
  /** Name of the bundle - list containing language versions */
  name: VinistoProductDllModelsApiMultiLangValue[];
  /** Description of the bundle - list containing language versions */
  description: VinistoProductDllModelsApiMultiLangValue[];
  /** Short description of the bundle - list containing language versions */
  shortDescription: VinistoProductDllModelsApiMultiLangValue[];
  /**
   * Total set price. Sum of all set items price.
   * @format double
   */
  totalSetPrice: number;
  /** Definitions of all paid bundles. */
  paidBundles: VinistoProductDllModelsApiBundleBundle[];
  /** Definitions of all free bundles */
  freeBundles: VinistoProductDllModelsApiBundleBundle[];
  /** Current set type (template) */
  setType: VinistoHelperDllEnumsBundleSetType;
  /** Current bundle state */
  states: VinistoHelperDllEnumsBundleBundleState[];
  /**
   * Count of available bundles in warehouse
   * @format int32
   */
  availableCount?: number;
}

/** Return API object for Bundle */
export interface VinistoProductDllModelsApiBundleSetSupplierBundleReturn {
  /** Supplier set bundle */
  bundle?: VinistoProductDllModelsApiBundleSetBundleSupplier | null;
  /** Has occurred any error. */
  isError?: boolean;
  /** List of errors code that occurred during the api request. */
  error?: VinistoHelperDllBaseError[] | null;
}

/** Return API object for Supplier sets */
export interface VinistoProductDllModelsApiBundleSetsSupplierBundleReturn {
  /** Supplier sets with bundle */
  supplierSets?: VinistoProductDllModelsApiBundleSetBundleSupplier[] | null;
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

export interface VinistoProductDllModelsApiBundleTag {
  /** Tag id for bundle. */
  tagId?: string | null;
  /** Allowed tag countries of sale for current bundle. */
  countriesOfSale?: VinistoHelperDllEnumsCountryCode[] | null;
}

export interface VinistoProductDllModelsApiCategoryBasketCategoriesReturn {
  categories?: VinistoProductDllModelsApiCategoryBasketCategoryReturn[] | null;
  /** Has occurred any error. */
  isError?: boolean;
  /** List of errors code that occurred during the api request. */
  error?: VinistoHelperDllBaseError[] | null;
}

export interface VinistoProductDllModelsApiCategoryBasketCategoryReturn {
  id?: string | null;
  url?: string | null;
  name?: string | null;
}

/** Return API object for Category with count of all object */
export interface VinistoProductDllModelsApiCategoryCategoriesReturn {
  /** List of categories */
  categories?: VinistoProductDllModelsApiCategoryCategory[] | null;
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
  /** Contains list of possible category types */
  type?: VinistoHelperDllEnumsCategoryCategoryType;
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
  allowedSearchCountries?: VinistoHelperDllEnumsCountryCode[] | null;
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
  /** Category bundle listing discount filter. */
  bundleDiscountFilter?: VinistoHelperDllEnumsCategoryCategoryBundleDiscountFilter;
}

/** Represents category item in breadcrumbs */
export interface VinistoProductDllModelsApiCategoryCategoryBreadcrumbItem {
  /** @minLength 1 */
  id: string;
  name: VinistoProductDllModelsApiMultiLangValue[];
  url: VinistoProductDllModelsApiMultiLangValue[];
}

/** Return API object for category breadcrumbs */
export interface VinistoProductDllModelsApiCategoryCategoryBreadcrumbsReturn {
  breadcrumbs?:
    | VinistoProductDllModelsApiCategoryCategoryBreadcrumbItem[]
    | null;
  /** Has occurred any error. */
  isError?: boolean;
  /** List of errors code that occurred during the api request. */
  error?: VinistoHelperDllBaseError[] | null;
}

/** Parameters used for creating new category */
export interface VinistoProductDllModelsApiCategoryCategoryCreateParameters {
  /** Contains list of possible category types */
  type?: VinistoHelperDllEnumsCategoryCategoryType;
  /** Category is available on these platforms */
  availableOnPlatforms?: number[] | null;
  /** Contains list of possible languages */
  language: VinistoHelperDllEnumsLanguage;
  /**
   * Name of the category in provided language
   * @minLength 1
   */
  name: string;
  /**
   * Description fo the category in provided language
   * @minLength 1
   */
  description: string;
  /** Url of the category in provided language. If not provided, it wil be generated automatically */
  url?: string | null;
  /** Meta Description fo the category in provided language */
  metaDescription?: string | null;
  /** Meta Title of the category in provided language */
  metaTitle?: string | null;
  /** Keywords */
  keywords?: string[] | null;
  /**
   * Country codes for which this category is allowed to be searched in elasticsearch.
   * VWA-2486
   */
  allowedSearchCountries?: VinistoHelperDllEnumsCountryCode[] | null;
  /** Discount filter applied by default when listing bundles in this category. */
  bundleDiscountFilter?: VinistoHelperDllEnumsCategoryCategoryBundleDiscountFilter | null;
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

/** Parameters used for editing category */
export interface VinistoProductDllModelsApiCategoryCategoryEditParameters {
  /** Contains list of possible languages */
  language: VinistoHelperDllEnumsLanguage;
  /**
   * Name of the category in provided language
   * @minLength 1
   */
  name: string;
  /**
   * Description fo the category in provided language
   * @minLength 1
   */
  description: string;
  /** Url of the category in provided language. If not provided, it wil be generated automatically */
  url?: string | null;
  /** Meta Description fo the category in provided language */
  metaDescription?: string | null;
  /** Meta Title of the category in provided language */
  metaTitle?: string | null;
  /** Keywords */
  keywords?: string[] | null;
  /**
   * Country codes for which this category is allowed to be searched in elasticsearch.
   * VWA-2486
   */
  allowedSearchCountries?: VinistoHelperDllEnumsCountryCode[] | null;
  /** Discount filter applied by default when listing bundles in this category. */
  bundleDiscountFilter?: VinistoHelperDllEnumsCategoryCategoryBundleDiscountFilter | null;
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

/** Return API object for Category */
export interface VinistoProductDllModelsApiCategoryCategoryReturn {
  /** Category */
  category?: VinistoProductDllModelsApiCategoryCategory | null;
  /** Has occurred any error. */
  isError?: boolean;
  /** List of errors code that occurred during the api request. */
  error?: VinistoHelperDllBaseError[] | null;
}

export interface VinistoProductDllModelsApiCategoryGetBasketCategoriesByIdsParameters {
  categoryIds?: string[] | null;
  language?: VinistoHelperDllEnumsLanguage | null;
}

/** Parameters provided to endpoint to change parent of category */
export interface VinistoProductDllModelsApiCategoryModifyParentCategoryParameters {
  /**
   * Id of the parent category
   * @minLength 1
   */
  parentCategoryId: string;
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

/** Represents Tag of a category. */
export interface VinistoProductDllModelsApiCategoryTag {
  /** Tag id for category. */
  tagId?: string | null;
  /** Allowed tag countries of sale for current category. */
  countriesOfSale?: VinistoHelperDllEnumsCountryCode[] | null;
}

/** Return API object for bundles count */
export interface VinistoProductDllModelsApiCommonBundlesCountReturn {
  /**
   * Bundles count
   * @format int64
   */
  bundlesCount?: number | null;
  /** Has occurred any error. */
  isError?: boolean;
  /** List of errors code that occurred during the api request. */
  error?: VinistoHelperDllBaseError[] | null;
}

/** Parameters used for price manipulation in product/bundle */
export interface VinistoProductDllModelsApiCommonPriceEditParameters {
  /** @format double */
  price: number;
  /** Currency */
  currency: VinistoHelperDllEnumsCurrency;
  /** VatRate */
  vat: VinistoHelperDllEnumsVatRate;
  /** Identifies type of the country */
  countryOfSale?: VinistoHelperDllEnumsCountryCode;
  priceLevel?: VinistoHelperDllEnumsPriceLevel;
  /** @format int32 */
  platformId?: number;
  userLoginHash?: string | null;
}

/** Represents Evaluation of a bundle. */
export interface VinistoProductDllModelsApiEvaluationEvaluation {
  /**
   * Id of the evaluation
   * @minLength 1
   */
  id: string;
  /**
   * Text of the evaluation
   * @minLength 1
   */
  text: string;
  /**
   * Who creates that evaluation
   * @minLength 1
   */
  createdUserId: string;
  /**
   * Product for which is evaluation
   * @minLength 1
   */
  productId: string;
  /**
   * Evaluation creation time
   * @format int64
   */
  createdAt?: number;
  /**
   * Overall evaluation in stars
   * @format int32
   */
  stars?: number;
  /**
   * Sweet or dry level in evaluation
   * @format int32
   */
  sweetDry?: number;
  /**
   * Light or heavy level in evaluation
   * @format int32
   */
  lightHeavy?: number;
  /**
   * Fruit or tanic level in evaluation
   * @format int32
   */
  fruitTannic?: number;
  /**
   * Low or high accidity level in evaluation
   * @format int32
   */
  lowHighAccidity?: number;
  /** User details of evaluation */
  createdUserDetail?: VinistoProductDllModelsApiEvaluationUserEvaluation | null;
  /** Created by admin flag - true if yes, default false */
  createdByAdmin?: boolean;
}

/** Parameters used for creating a evaluation */
export interface VinistoProductDllModelsApiEvaluationEvaluationCreateParameters {
  /**
   * Id of bundle to which a evaluation will be assigned
   * @minLength 1
   */
  bundleId: string;
  /**
   * Text of the evaluation
   * @minLength 1
   */
  text: string;
  /**
   * Overall evaluation in stars. Allowed values: 1 - 10.
   * @format int32
   */
  stars: number;
  /**
   * Sweet or dry level in evaluation. Allowed values: 0 - 100.
   * @format int32
   */
  sweetDry: number;
  /**
   * Light or heavy level in evaluation. Allowed values: 0 - 100.
   * @format int32
   */
  lightHeavy: number;
  /**
   * Fruit or tanic level in evaluation. Allowed values: 0 - 100.
   * @format int32
   */
  fruitTannic: number;
  /**
   * Low or high accidity level in evaluation. Allowed values: 0 - 100.
   * @format int32
   */
  lowHighAccidity: number;
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

/** Return API object for Evaluation */
export interface VinistoProductDllModelsApiEvaluationEvaluationReturn {
  /** Return Evaluation */
  evaluation?: VinistoProductDllModelsApiEvaluationEvaluation | null;
  /** Has occurred any error. */
  isError?: boolean;
  /** List of errors code that occurred during the api request. */
  error?: VinistoHelperDllBaseError[] | null;
}

/** Return API object for Evaluation with count of all object */
export interface VinistoProductDllModelsApiEvaluationEvaluationsReturn {
  /** Return list Evaluations */
  evaluations?: VinistoProductDllModelsApiEvaluationEvaluation[] | null;
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

/** Represents User in Evaluation object */
export interface VinistoProductDllModelsApiEvaluationUserEvaluation {
  /**
   * Id of the user
   * @minLength 1
   */
  id: string;
  /** User nickname */
  nickname?: string | null;
  /**
   * Count of user evaluations
   * @format int32
   */
  evaluationsCount?: number | null;
}

/** Represents Item object containing category and sequence number */
export interface VinistoProductDllModelsApiHomePageCategoryItem {
  /**
   * Category id on Homepage
   * @minLength 1
   */
  categoryId: string;
  /**
   * SequenceNumber category on Homepage
   * @format int32
   */
  sequenceNumber?: number;
}

/** Represents CategoryHomePage of a product. */
export interface VinistoProductDllModelsApiHomePageHomePageCategory {
  /**
   * Id of the category HomePage
   * @minLength 1
   */
  id: string;
  /** Contains list of possible types Product API - Category Homepage */
  type?: VinistoHelperDllEnumsProductHomePageCategoryType;
  /** Lang on Homepage */
  language?: VinistoHelperDllEnumsLanguage | null;
  /** CategoryHomePage of the products - list containing categories id as string. */
  categories: VinistoProductDllModelsApiHomePageCategoryItem[];
  /** CategoryHomePage of the products - list containing categories data as string - name, description, url. */
  categoriesDetail: VinistoProductDllModelsApiCategoryCategory[];
}

/** Parameters provided to endpoint for creating and editing category on Homepage */
export interface VinistoProductDllModelsApiHomePageHomePageCategoryManipulationParameters {
  /** Contains list of possible types Product API - Category Homepage */
  homePageCategoryType: VinistoHelperDllEnumsProductHomePageCategoryType;
  /**
   * Id of an object which is being assigned to a different object
   * @minLength 1
   */
  categoryId: string;
  /**
   * SequenceNumber category in homepage
   * @format int32
   */
  sequenceNumber: number;
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

/** Return API object for CategoryHomePage */
export interface VinistoProductDllModelsApiHomePageHomePageCategoryReturn {
  /** Return Categories in CategoryHomePage */
  homePageCategory?: VinistoProductDllModelsApiHomePageHomePageCategory | null;
  /** Has occurred any error. */
  isError?: boolean;
  /** List of errors code that occurred during the api request. */
  error?: VinistoHelperDllBaseError[] | null;
}

/** Represents Custom Carousel on HomePage. */
export interface VinistoProductDllModelsApiHomePageHomePageCustomCarousel {
  /**
   * Id of the custom carousel on HomePage
   * @minLength 1
   */
  id: string;
  /** Name carousel on HomePage - list containing language versions */
  name: VinistoProductDllModelsApiMultiLangValue[];
  /**
   * SequenceNumber carousel in homepage
   * @format int32
   */
  sequenceNumber?: number;
  /** HomePageCustomCarousel items - list containing bundle items (bundle id + sequence number). */
  items?: VinistoProductDllModelsApiHomePageItem[] | null;
  /** HomePageCustomCarousel bundles - list containing bundle objects. */
  bundles?: VinistoProductDllModelsApiBundleBundle[] | null;
  /** Enabled flag - true if carousel enabled. */
  isEnabled?: boolean;
  /** @format int32 */
  availableOnPlatform?: number;
}

/** Parameters provided to endpoint for creating bundle */
export interface VinistoProductDllModelsApiHomePageHomePageCustomCarouselAddBundleParameters {
  /**
   * Bundle id in Custom carousel
   * @minLength 1
   */
  bundleId: string;
  /**
   * SequenceNumber bundle in custom carousel
   * @format int32
   */
  sequenceNumber: number;
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

/** Parameters provided to endpoint for creating custom carousel */
export interface VinistoProductDllModelsApiHomePageHomePageCustomCarouselCreateParameters {
  /** @format int32 */
  availableOnPlatform: number;
  /** Contains list of possible languages */
  language: VinistoHelperDllEnumsLanguage;
  /**
   * Name of the custom carousel in provided language
   * @minLength 1
   */
  name: string;
  /**
   * SequenceNumber carousel in homepage
   * @format int32
   */
  sequenceNumber: number;
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

/** Parameters provided to endpoint for editing custom carousel */
export interface VinistoProductDllModelsApiHomePageHomePageCustomCarouselEditParameters {
  /** Enabled flag parameters - true if carousel enabled. */
  isEnabled: boolean;
  /** @format int32 */
  availableOnPlatform?: number | null;
  /** Contains list of possible languages */
  language: VinistoHelperDllEnumsLanguage;
  /**
   * Name of the custom carousel in provided language
   * @minLength 1
   */
  name: string;
  /**
   * SequenceNumber carousel in homepage
   * @format int32
   */
  sequenceNumber: number;
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

/** Return API object for HomePageCustomCarousel */
export interface VinistoProductDllModelsApiHomePageHomePageCustomCarouselReturn {
  /** Return Custom Carousel in HomePage */
  homePageCustomCarousel?: VinistoProductDllModelsApiHomePageHomePageCustomCarousel | null;
  /** Has occurred any error. */
  isError?: boolean;
  /** List of errors code that occurred during the api request. */
  error?: VinistoHelperDllBaseError[] | null;
}

/** Return API object for HomePageCustomCarousel */
export interface VinistoProductDllModelsApiHomePageHomePageCustomCarouselsReturn {
  /** Return Custom Carousels in HomePage */
  homePageCustomCarousels?:
    | VinistoProductDllModelsApiHomePageHomePageCustomCarousel[]
    | null;
  /** Has occurred any error. */
  isError?: boolean;
  /** List of errors code that occurred during the api request. */
  error?: VinistoHelperDllBaseError[] | null;
}

/** Return API object for HomePage Inspire bundles Carousel */
export interface VinistoProductDllModelsApiHomePageHomePageInspireCarouselReturn {
  /** Return list Inspire bundles */
  inspireBundles?: VinistoProductDllModelsApiBundleBundle[] | null;
  /** Has occurred any error. */
  isError?: boolean;
  /** List of errors code that occurred during the api request. */
  error?: VinistoHelperDllBaseError[] | null;
}

/** Return API object for HomePage Interesting bundles Carousel */
export interface VinistoProductDllModelsApiHomePageHomePageInterestingCarouselReturn {
  /** Return list Interesting bundles */
  interestingBundles?: VinistoProductDllModelsApiBundleBundle[] | null;
  /** Has occurred any error. */
  isError?: boolean;
  /** List of errors code that occurred during the api request. */
  error?: VinistoHelperDllBaseError[] | null;
}

/** Return API object for HomePage Tag Carousel */
export interface VinistoProductDllModelsApiHomePageHomePageTagCarouselReturn {
  /** Return list Tags */
  tags?: VinistoProductDllModelsApiTagTag[] | null;
  /** Has occurred any error. */
  isError?: boolean;
  /** List of errors code that occurred during the api request. */
  error?: VinistoHelperDllBaseError[] | null;
}

/** Represents Item object containing bundle and sequence number */
export interface VinistoProductDllModelsApiHomePageItem {
  /**
   * Bundle id in Custom carousel
   * @minLength 1
   */
  bundleId: string;
  /**
   * SequenceNumber bundle in custom carousel
   * @format int32
   */
  sequenceNumber?: number;
}

/** Class for objects which required to store value in various languages. */
export interface VinistoProductDllModelsApiMultiLangValue {
  /** Contains list of possible languages */
  language?: VinistoHelperDllEnumsLanguage;
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
  language?: VinistoHelperDllEnumsLanguage | null;
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

/** Parameters provided to endpoint for creating product */
export interface VinistoProductDllModelsApiProductProductCreateParameters {
  /** Flag to mark product as only for logged users */
  isForLogged?: boolean;
  /** Contains list of possible languages */
  language: VinistoHelperDllEnumsLanguage;
  /** Identifies type of the country */
  countryOfSale?: VinistoHelperDllEnumsCountryCode;
  /**
   * Name of the product in provided language
   * @minLength 1
   */
  name: string;
  /**
   * Description fo the product in provided language
   * @minLength 1
   */
  description: string;
  /**
   * Text fo the product in provided language
   * @minLength 1
   */
  text: string;
  /** Url of the product in provided language. If not provided, it wil be generated automatically */
  url?: string | null;
  /**
   * WarehouseId - product identifier in warehouse database
   * @minLength 1
   */
  warehouseId: string;
  /** EAN - universal European product indentifier */
  ean?: string | null;
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

/** Parameters provided to endpoint for editing product */
export interface VinistoProductDllModelsApiProductProductEditParameters {
  /** Flag to mark product as only for logged users */
  isForLogged?: boolean | null;
  /** Contains list of possible languages */
  language: VinistoHelperDllEnumsLanguage;
  /** Identifies type of the country */
  countryOfSale?: VinistoHelperDllEnumsCountryCode;
  /**
   * Name of the product in provided language
   * @minLength 1
   */
  name: string;
  /**
   * Description fo the product in provided language
   * @minLength 1
   */
  description: string;
  /**
   * Text fo the product in provided language
   * @minLength 1
   */
  text: string;
  /** Url of the product in provided language. If not provided, it wil be generated automatically */
  url?: string | null;
  /**
   * WarehouseId - product identifier in warehouse database
   * @minLength 1
   */
  warehouseId: string;
  /** EAN - universal European product indentifier */
  ean?: string | null;
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

/** Return API object for Product */
export interface VinistoProductDllModelsApiProductProductReturn {
  /** Product to return */
  product?: VinistoProductDllModelsApiProductProduct | null;
  /** Has occurred any error. */
  isError?: boolean;
  /** List of errors code that occurred during the api request. */
  error?: VinistoHelperDllBaseError[] | null;
}

/** Parameters provided to endpoint for batch changing of products availability */
export interface VinistoProductDllModelsApiProductProductsAvailabilityParameters {
  /** List of product ids */
  productIds: string[];
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

/** Return API object for Product */
export interface VinistoProductDllModelsApiProductProductsReturn {
  /** List of products */
  products?: VinistoProductDllModelsApiProductProduct[] | null;
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

export interface VinistoProductDllModelsApiProductTag {
  /** Tag id for bundle. */
  tagId?: string | null;
  /** Allowed tag countries of sale for current bundle. */
  countriesOfSale?: VinistoHelperDllEnumsCountryCode[] | null;
}

export interface VinistoProductDllModelsApiSpecificationBasketSpecificationReturn {
  id?: string | null;
  url?: string | null;
  name?: string | null;
}

export interface VinistoProductDllModelsApiSpecificationBasketSpecificationsReturn {
  specifications?:
    | VinistoProductDllModelsApiSpecificationBasketSpecificationReturn[]
    | null;
  /** Has occurred any error. */
  isError?: boolean;
  /** List of errors code that occurred during the api request. */
  error?: VinistoHelperDllBaseError[] | null;
}

/** Allowed value for a combo specification in specified language */
export interface VinistoProductDllModelsApiSpecificationComboSpecificationAllowedValue {
  /**
   * Value
   * @minLength 1
   */
  value: string;
  /**
   * Identification of the value
   * @minLength 1
   */
  url: string;
  /** Contains list of possible languages */
  language: VinistoHelperDllEnumsLanguage;
  /**
   * Score of the value
   * @format int32
   */
  score: number;
  /** Description of the specification allowed value in provided language */
  description?: string | null;
  /** Meta description of the specification allowed value in provided language */
  metaDescription?: string | null;
  /** Image id of the specification allowed value in provided language */
  imageId?: string | null;
  /** Icon id of the specification allowed value in provided language */
  iconId?: string | null;
  /** Represents image in various sizes. */
  image?: VinistoImageDllModelsApiImageUrlsImage | null;
  /** Represents svg image */
  icon?: VinistoImageDllModelsApiImageSvgImage | null;
}

/** Return API object for Specification */
export interface VinistoProductDllModelsApiSpecificationComboSpecificationAllowedValuesReturn {
  /** Return allowed values */
  allowedValues?:
    | VinistoProductDllModelsApiSpecificationComboSpecificationAllowedValue[]
    | null;
  /**
   * Number of found results
   * @format int32
   */
  count?: number;
  /** Has occurred any error. */
  isError?: boolean;
  /** List of errors code that occurred during the api request. */
  error?: VinistoHelperDllBaseError[] | null;
}

/** Represents base specification definition. */
export interface VinistoProductDllModelsApiSpecificationDefinitionModelsBaseSpecificationDefinition {
  /** Tabs in which this specification is shown. */
  productAttributeTabs?:
    | VinistoHelperDllEnumsSpecificationProductAttributeTab[]
    | null;
  /**
   * Id of the specification
   * @minLength 1
   */
  id: string;
  /** Contains list of possible specification type */
  specificationType?: VinistoHelperDllEnumsSpecificationSpecificationType;
  /** Name of the specification - list containing language versions */
  name: VinistoProductDllModelsApiMultiLangValue[];
  /** URL of the specification - list containing language versions */
  url?: VinistoProductDllModelsApiMultiLangValue[] | null;
  /** Description of the specification - list containing language versions */
  description?: VinistoProductDllModelsApiMultiLangValue[] | null;
  /** Meta description of the specification - list containing language versions */
  metaDescription?: VinistoProductDllModelsApiMultiLangValue[] | null;
  /** Image of the specification - list containing language versions for image id */
  imageId?: VinistoProductDllModelsApiMultiLangValue[] | null;
  /**
   * Order number which can be used for specifies number according which the specification can be ordered.
   * @format int32
   */
  order?: number;
  /**
   * Order number which can be used for specifies number according which the specification can be ordered in bundle or product detail
   * @format int32
   */
  orderDetail?: number;
  /** Flag for hide specification */
  isHidden?: boolean;
  /** Flag for show/hide specification in product detail */
  isDetail?: boolean;
  /** Images of the specification - list containing image definitions */
  images?: VinistoImageDllModelsApiImageUrlsImage[] | null;
}

/** Parameters used for manipulation specification */
export interface VinistoProductDllModelsApiSpecificationDefinitionParametersBaseSpecificationCreateParameters {
  /** Contains list of possible specification type */
  specificationType: VinistoHelperDllEnumsSpecificationSpecificationType;
  /** Flag to hide specification */
  isHidden: boolean;
  /** Flag to show / hide specification on product detail card */
  isDetail: boolean;
  /** Contains list of possible languages */
  language: VinistoHelperDllEnumsLanguage;
  /**
   * Name of the specification in provided language
   * @minLength 1
   */
  name: string;
  /**
   * Order number according to which specification could be ordered
   * @format int32
   */
  order: number;
  /**
   * Order number according to which specification could be ordered in bundle or poduct detail
   * @format int32
   */
  orderDetail: number;
  /** URL of the specification in provided language */
  url?: string | null;
  /** Description of the specification in provided language */
  description?: string | null;
  /** Meta description of the specification in provided language */
  metaDescription?: string | null;
  /** Image id of the specification in provided language */
  imageId?: string | null;
  /** Specification unit. */
  unit?: string | null;
  /** List of tabs in which this specification is shown. */
  productAttributeTabs?:
    | VinistoHelperDllEnumsSpecificationProductAttributeTab[]
    | null;
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

/** Parameters used for manipulation specification */
export interface VinistoProductDllModelsApiSpecificationDefinitionParametersBaseSpecificationEditParameters {
  /** Flag to hide specification */
  isHidden?: boolean | null;
  /** Flag to show / hide specification on product detail card */
  isDetail?: boolean | null;
  /** Contains list of possible languages */
  language: VinistoHelperDllEnumsLanguage;
  /**
   * Name of the specification in provided language
   * @minLength 1
   */
  name: string;
  /**
   * Order number according to which specification could be ordered
   * @format int32
   */
  order: number;
  /**
   * Order number according to which specification could be ordered in bundle or poduct detail
   * @format int32
   */
  orderDetail: number;
  /** URL of the specification in provided language */
  url?: string | null;
  /** Description of the specification in provided language */
  description?: string | null;
  /** Meta description of the specification in provided language */
  metaDescription?: string | null;
  /** Image id of the specification in provided language */
  imageId?: string | null;
  /** Specification unit. */
  unit?: string | null;
  /** List of tabs in which this specification is shown. */
  productAttributeTabs?:
    | VinistoHelperDllEnumsSpecificationProductAttributeTab[]
    | null;
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

/** Parameters used for adding allowed values to combobox specification in provided language */
export interface VinistoProductDllModelsApiSpecificationDefinitionParametersComboBoxSpecificationEditParameters {
  /** Contains list of possible languages */
  language: VinistoHelperDllEnumsLanguage;
  /**
   * Name of the value - string index of allowed value
   * @minLength 1
   */
  valueName: string;
  /**
   * Score of the value - allow us to sort it according to the score.
   * Score is shared for all language values, if it is provided overrides the current one.
   * @format int32
   */
  score?: number | null;
  /**
   * Name of the specification value in provided language
   * @minLength 1
   */
  name: string;
  /** Description of the specification value in provided language */
  description?: string | null;
  /** Meta Description of the specification value in provided language */
  metaDescription?: string | null;
  /** Image id of the specification value in provided language */
  imageId?: string | null;
  /** Icon id of the specification value in provided language */
  iconId?: string | null;
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

/** Parameters used for removing allowed values from combobox specification */
export interface VinistoProductDllModelsApiSpecificationDefinitionParametersComboBoxSpecificationRemoveParameters {
  /**
   * Name of the value - string index of allowed value
   * @minLength 1
   */
  valueName: string;
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

/** Parameters used for editing score for provided combobox or multicombobox specification */
export interface VinistoProductDllModelsApiSpecificationDefinitionParametersComboBoxValueScoreEditParameters {
  /** Identification of the combo value */
  valueName?: string | null;
  /**
   * Score to set
   * @format int32
   */
  score?: number;
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

export interface VinistoProductDllModelsApiSpecificationDefinitionParametersGetBasketSpecificationsByIdsParameters {
  specificationIds?: string[] | null;
  language?: VinistoHelperDllEnumsLanguage | null;
}

/** Parameters used for adding allowed values to multicombobox specification in provided language */
export interface VinistoProductDllModelsApiSpecificationDefinitionParametersMultiComboBoxSpecificationEditParameters {
  /** Contains list of possible languages */
  language: VinistoHelperDllEnumsLanguage;
  /**
   * Name of the value - string index of allowed value
   * @minLength 1
   */
  valueName: string;
  /**
   * Score of the value - allow us to sort it according to the score.
   * Score is shared for all language values, if it is provided overrides the current one.
   * @format int32
   */
  score?: number | null;
  /**
   * Name of the specification value in provided language
   * @minLength 1
   */
  name: string;
  /** Description of the specification value in provided language */
  description?: string | null;
  /** Meta Description of the specification value in provided language */
  metaDescription?: string | null;
  /** Image id of the specification value in provided language */
  imageId?: string | null;
  /** Icon id of the specification value in provided language */
  iconId?: string | null;
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

/** Parameters used for removing allowed values from multicombobox specification */
export interface VinistoProductDllModelsApiSpecificationDefinitionParametersMultiComboBoxSpecificationRemoveParameters {
  /**
   * Name of the value - string index of allowed value
   * @minLength 1
   */
  valueName: string;
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

/** Parameters used for adding unit values to number specification in provided language */
export interface VinistoProductDllModelsApiSpecificationDefinitionParametersNumberImperialSpecificationEditParameters {
  /**
   * Imperial Unit value in provided language
   * @minLength 1
   */
  imperialUnit: string;
  /** Contains list of possible languages */
  language: VinistoHelperDllEnumsLanguage;
  /**
   * Unit value in provided language
   * @minLength 1
   */
  unit: string;
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

/** Parameters used for adding unit values to number specification in provided language */
export interface VinistoProductDllModelsApiSpecificationDefinitionParametersNumberSpecificationEditParameters {
  /** Contains list of possible languages */
  language: VinistoHelperDllEnumsLanguage;
  /**
   * Unit value in provided language
   * @minLength 1
   */
  unit: string;
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

/** Parameters used for remove language from specification allowed values */
export interface VinistoProductDllModelsApiSpecificationDefinitionParametersRemoveAllowedValueLanguageParameters {
  /**
   * Name of the value - string index of allowed value
   * @minLength 1
   */
  valueName: string;
  /** Contains list of possible languages */
  language?: VinistoHelperDllEnumsLanguage;
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
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

/** Return API object for Specification */
export interface VinistoProductDllModelsApiSpecificationSpecificationReturn {
  /** Return one specification */
  specification?: any;
  /** Has occurred any error. */
  isError?: boolean;
  /** List of errors code that occurred during the api request. */
  error?: VinistoHelperDllBaseError[] | null;
}

/** Return API object for Specification used values */
export interface VinistoProductDllModelsApiSpecificationSpecificationValuesReturn {
  /**
   * Return object represents uesd values in specification.
   * Can be one from these types:
   * List of bool, List of int, List of float or List of string
   */
  specificationValues?: any;
  /** Has occurred any error. */
  isError?: boolean;
  /** List of errors code that occurred during the api request. */
  error?: VinistoHelperDllBaseError[] | null;
}

/** Return API object for Specification with count of all object */
export interface VinistoProductDllModelsApiSpecificationSpecificationsReturn {
  /** Return list Specifications */
  specifications?: any[] | null;
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

/** Defines parameters required to set CheckBox specification value */
export interface VinistoProductDllModelsApiSpecificationValueParametersCheckBoxSpecificationValueParameters {
  /** bool value */
  isChecked: boolean;
  /**
   * ID of the specification definition
   * @minLength 1
   */
  specificationDefinitionId: string;
  /** Identifies type of the country */
  countryOfSale?: VinistoHelperDllEnumsCountryCode;
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

/** Defines parameters required to set ComboBox specification value */
export interface VinistoProductDllModelsApiSpecificationValueParametersComboBoxSpecificationValueParameters {
  /**
   * Name of selected value. list of names defined in combobox definition
   * @minLength 1
   */
  selectedValueName: string;
  /**
   * ID of the specification definition
   * @minLength 1
   */
  specificationDefinitionId: string;
  /** Identifies type of the country */
  countryOfSale?: VinistoHelperDllEnumsCountryCode;
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

/** Defines parameters required to set Decimal number with imperial units specification value */
export interface VinistoProductDllModelsApiSpecificationValueParametersDecimalNumberImperialSpecificationValueParameters {
  /**
   * Decimal number value in defined imperial units
   * @format float
   */
  imperialDecimalNumberValue: number;
  /**
   * Number value of in given language
   * @format float
   */
  decimalNumberValue: number;
  /**
   * ID of the specification definition
   * @minLength 1
   */
  specificationDefinitionId: string;
  /** Identifies type of the country */
  countryOfSale?: VinistoHelperDllEnumsCountryCode;
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

/** Defines parameters required to set Decimal number specification value */
export interface VinistoProductDllModelsApiSpecificationValueParametersDecimalNumberSpecificationValueParameters {
  /**
   * Number value of in given language
   * @format float
   */
  decimalNumberValue: number;
  /**
   * ID of the specification definition
   * @minLength 1
   */
  specificationDefinitionId: string;
  /** Identifies type of the country */
  countryOfSale?: VinistoHelperDllEnumsCountryCode;
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

/** Defines parameters required to set MultiComboBox specification value */
export interface VinistoProductDllModelsApiSpecificationValueParametersMultiComboBoxSpecificationValueParameters {
  /** Name of selected values. List of names defined in multicombobox definition */
  selectedValuesName: string[];
  /**
   * ID of the specification definition
   * @minLength 1
   */
  specificationDefinitionId: string;
  /** Identifies type of the country */
  countryOfSale?: VinistoHelperDllEnumsCountryCode;
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

/** Defines parameters required to set Number imperial specification value */
export interface VinistoProductDllModelsApiSpecificationValueParametersNumberImperialSpecificationValueParameters {
  /**
   * Imperial Number value of in given language
   * @format int32
   */
  imperialNumberValue: number;
  /**
   * Number value of in given language
   * @format int32
   */
  numberValue: number;
  /**
   * ID of the specification definition
   * @minLength 1
   */
  specificationDefinitionId: string;
  /** Identifies type of the country */
  countryOfSale?: VinistoHelperDllEnumsCountryCode;
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

/** Defines parameters required to set Number specification value */
export interface VinistoProductDllModelsApiSpecificationValueParametersNumberSpecificationValueParameters {
  /**
   * Number value of in given language
   * @format int32
   */
  numberValue: number;
  /**
   * ID of the specification definition
   * @minLength 1
   */
  specificationDefinitionId: string;
  /** Identifies type of the country */
  countryOfSale?: VinistoHelperDllEnumsCountryCode;
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

/** Defines parameters required to set Free text specification value in provided language */
export interface VinistoProductDllModelsApiSpecificationValueParametersTextSpecificationValueParameters {
  /**
   * Text value of in given language
   * @minLength 1
   */
  textValue: string;
  /** Contains list of possible languages */
  language: VinistoHelperDllEnumsLanguage;
  /**
   * ID of the specification definition
   * @minLength 1
   */
  specificationDefinitionId: string;
  /** Identifies type of the country */
  countryOfSale?: VinistoHelperDllEnumsCountryCode;
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
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
  slugs: VinistoProductDllModelsApiTagTagSlugMain[];
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
  /** Types of tag. */
  type?: VinistoHelperDllEnumsTagTagType;
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
    | VinistoCommonDllModelsApiSpecificationsBaseSpecification[]
    | null;
  /** Specifications - list containing specifications id and value as list. */
  specificationDetails: VinistoProductDllModelsApiSpecificationSpecificationDetail[];
}

/** Parameters used for creating new tag */
export interface VinistoProductDllModelsApiTagTagCreateParameters {
  /** Types of tag. */
  type: VinistoHelperDllEnumsTagTagType;
  /** Identifies type of the country */
  countryOfSale?: VinistoHelperDllEnumsCountryCode;
  /**
   * Name of the tag in provided language
   * @minLength 1
   */
  name: string;
  /** Url of the tag in provided language. If not provided, it wil be generated automatically */
  url?: string | null;
  /**
   * Tag color in RGB ("#000000")
   * @minLength 1
   */
  color: string;
  /**
   * Tag description
   * @minLength 1
   */
  description: string;
  /** Meta Tag description */
  metaDescription?: string | null;
  /** Meta Tag title */
  metaTitle?: string | null;
  isVisibleInFilters: boolean;
  /** @format int32 */
  orderInFilters?: number;
  /** @format int64 */
  validFrom?: number | null;
  /** @format int64 */
  validTo?: number | null;
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

/** Parameters used for creating new tag */
export interface VinistoProductDllModelsApiTagTagEditParameters {
  /** Identifies type of the country */
  countryOfSale?: VinistoHelperDllEnumsCountryCode;
  /** Name of the tag in provided language */
  name?: string | null;
  /** Slugs of the tag in provided language. */
  slugs?: any[] | null;
  /** Tag color in RGB ("#000000") */
  color?: string | null;
  /** Tag description */
  description?: string | null;
  /** Meta Tag description */
  metaDescription?: string | null;
  /** Meta Tag title */
  metaTitle?: string | null;
  isVisibleInFilters?: boolean | null;
  /** @format int32 */
  orderInFilters?: number | null;
  /** @format int64 */
  validFrom?: number | null;
  /** @format int64 */
  validTo?: number | null;
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

/** Parameters provided to endpoint for change of bundles IsGift */
export interface VinistoProductDllModelsApiTagTagEnableParameters {
  /** Identifies type of the country */
  countryOfSale?: VinistoHelperDllEnumsCountryCode;
  /** Tag IsEnabled - true/false. */
  isEnabled: boolean;
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

/** Return API object for Tag */
export interface VinistoProductDllModelsApiTagTagReturn {
  /** Return tag */
  tag?: VinistoProductDllModelsApiTagTag | null;
  /** Has occurred any error. */
  isError?: boolean;
  /** List of errors code that occurred during the api request. */
  error?: VinistoHelperDllBaseError[] | null;
}

/** Extended object of tag slug to mark main slug. */
export type VinistoProductDllModelsApiTagTagSlugMain =
  VinistoProductDllModelsApiTagBaseTagSlug & {
    isMain?: boolean;
  };

/** Return API object for Tag with count of all object */
export interface VinistoProductDllModelsApiTagTagsReturn {
  /** Return list Tags */
  tags?: VinistoProductDllModelsApiTagTag[] | null;
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

/** Return API object for VirtualCategory with count of all object */
export interface VinistoProductDllModelsApiVirtualCategoryVirtualCategoriesReturn {
  virtualCategories?:
    | VinistoProductDllModelsApiVirtualCategoryVirtualCategory[]
    | null;
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

/** Represents a virtual category. */
export interface VinistoProductDllModelsApiVirtualCategoryVirtualCategory {
  id?: string | null;
  group?: string | null;
  url?: string | null;
  titleH1?: VinistoProductDllModelsApiMultiLangValue[] | null;
  seoTitle?: VinistoProductDllModelsApiMultiLangValue[] | null;
  seoDescription?: VinistoProductDllModelsApiMultiLangValue[] | null;
  contentHtml?: VinistoProductDllModelsApiMultiLangValue[] | null;
  /** Contains list of possible virtual category states */
  state?: VinistoHelperDllEnumsVirtualCategoryState;
}

export interface VinistoProductDllModelsApiVirtualCategoryVirtualCategoryCreateParameters {
  group: string | null;
  url: string | null;
  titleH1: VinistoProductDllModelsApiMultiLangValue[] | null;
  seoTitle: VinistoProductDllModelsApiMultiLangValue[] | null;
  seoDescription: VinistoProductDllModelsApiMultiLangValue[] | null;
  contentHtml?: VinistoProductDllModelsApiMultiLangValue[] | null;
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

export interface VinistoProductDllModelsApiVirtualCategoryVirtualCategoryEditParameters {
  group?: string | null;
  url?: string | null;
  titleH1?: VinistoProductDllModelsApiMultiLangValue[] | null;
  seoTitle?: VinistoProductDllModelsApiMultiLangValue[] | null;
  seoDescription?: VinistoProductDllModelsApiMultiLangValue[] | null;
  contentHtml?: VinistoProductDllModelsApiMultiLangValue[] | null;
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

/** Return API object for VirtualCategory. */
export interface VinistoProductDllModelsApiVirtualCategoryVirtualCategoryReturn {
  /** Represents a virtual category. */
  virtualCategory?: VinistoProductDllModelsApiVirtualCategoryVirtualCategory | null;
  /** Has occurred any error. */
  isError?: boolean;
  /** List of errors code that occurred during the api request. */
  error?: VinistoHelperDllBaseError[] | null;
}

export interface VinistoSearchDllModelsApiFullSearchFullSearchSeparatedReturn {
  bundles?: VinistoProductDllModelsApiBundleBundle[] | null;
  /** @format int64 */
  bundlesCount?: number;
  categories?: VinistoProductDllModelsApiCategoryCategory[] | null;
  /** @format int64 */
  categoriesCount?: number;
  articles?: VinistoCmsDllModelsApiCmsArticleCmsArticle[] | null;
  /** @format int64 */
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
  /** Identifies type of the country */
  countryCode: VinistoHelperDllEnumsCountryCode;
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
  language?: VinistoHelperDllEnumsLanguage;
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
  countryCode?: VinistoHelperDllEnumsCountryCode;
  /** List of user ids that can edit supplier data. */
  userIds: string[];
  /** List of user objects that can edit supplier data. */
  users: VinistoSupplierDllModelsApiSupplierUser[];
  /** List of supplier tag ids assigned to this supplier. */
  supplierTagIds?: string[] | null;
  /** List of supplier tags assigned to this supplier. */
  supplierTags?: VinistoSupplierDllModelsApiSupplierTagGetSupplierTag[] | null;
  /** Type of the supplier. */
  supplierType?: VinistoHelperDllEnumsSupplierSupplierType;
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

export interface AdminBundlesListParams {
  Filter?: string;
  Sort?: string;
  UserLoginHash?: string;
  /** @format int32 */
  Limit?: number;
  /** @format int32 */
  Offset?: number;
}

export interface AdminHomepageCustomCarouselsListParams {
  /** If provided search by name in custom carousel */
  SearchName?: string;
  /** Bundle temporary unavailable - true/false */
  TemporaryUnavailable?: boolean;
  /** If true search only between mark as enabled carousels, if false search only between mark as not enabled carousels, if not provided search all carousels */
  IsEnabled?: boolean;
  /** Language version - if provided, all custom carousels will be only in selected language. */
  Language?: VinistoHelperDllEnumsLanguage;
  /** Return prices in target currency, otherwise return default CZK. */
  Currency?: VinistoHelperDllEnumsCurrency;
  /** If provided, sorting will be done according to this column. if not provided, default sorting is done by ID */
  SortingColumn?: VinistoHelperDllEnumsHomePageCustomCarouselSortableColumns;
  /** True in case that sorting shall be done in descending order */
  IsSortingDescending?: boolean;
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
  /** Country of sale. Default is CZ. All bundles which are returned must be allowed to sale in country. */
  CountryOfSale?: VinistoHelperDllEnumsCountryCode;
  PriceLevels?: VinistoHelperDllEnumsPriceLevel[];
  /** @format int32 */
  AvailableOnPlatform?: number;
  IsCache?: boolean;
}

export interface AdminSpecificationsListParams {
  /** If provided search by name in specifications */
  SearchName?: string;
  /** If true, searchName is used as StartWith instead of Contains */
  IsSearchNameAutocomplete?: boolean;
  /**
   * Language of the requested category
   * Language version - if provided, all specifications will be only in selected language.
   * Sorting and searching will be according to the specified language
   * Otherwise all language version will be provided and sorting and searching will be according to the default language (CZECH).
   */
  Language?: VinistoHelperDllEnumsLanguage;
  /** If true search only between hidden specifications, if false search only between active specifications, if not provided search all specifications */
  ShowHidden?: boolean;
  /** If provided search by type in specifications */
  SpecificationType?: VinistoHelperDllEnumsSpecificationSpecificationType;
  /** If provided, sorting will be done according to this column. if not provided, default sorting is done by Id */
  SortingColumn?: VinistoHelperDllEnumsSpecificationSortableColumns;
  /** True in case that sorting shall be done in descending order */
  IsSortingDescending?: boolean;
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
  /** Currency to get min and max price value */
  currency?: VinistoHelperDllEnumsCurrency;
  IsCache?: boolean;
}

export interface ApplicationLogAllBundlesListParams {
  BundleId?: string;
  /** Contains list of possible columns for sorting */
  SortingColumn?: VinistoHelperDllEnumsActionLogSortableColumns;
  IsSortingDescending?: boolean;
  ApplicationLogType?: VinistoHelperDllEnumsActionLogApplicationLogType;
  /** @format int32 */
  TimeFrom?: number;
  /** @format int32 */
  TimeTo?: number;
  /** @format int64 */
  CreatedFrom?: number;
  /** @format int64 */
  CreatedTo?: number;
  ExecutorUserId?: string;
  /** @format int32 */
  Limit?: number;
  /** @format int32 */
  Offset?: number;
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
}

export type BasketCategoriesByIdsCreatePayload =
  VinistoProductDllModelsApiCategoryGetBasketCategoriesByIdsParameters;

export type BasketSpecificationsByIdsCreatePayload =
  VinistoProductDllModelsApiSpecificationDefinitionParametersGetBasketSpecificationsByIdsParameters;

/** Parameters used for assigning one object to another */
export type BundlesAlternativeBundlesCreatePayload =
  VinistoHelperDllBaseItemAssignParameters;

export interface BundlesAlternativeBundlesCreateParams {
  /**
   * Identifies type of the country
   * @default "CZ"
   */
  countryCode?: VinistoHelperDllEnumsCountryCode;
  /** Id of the main bundle */
  bundleId: string;
}

export interface BundlesAlternativeBundlesDeleteParams {
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
  /**
   * Identifies type of the country
   * @default "CZ"
   */
  countryCode?: VinistoHelperDllEnumsCountryCode;
  /** Id of the main bundle */
  bundleId: string;
  /** Id of alternative bundle which is removed from the main bundle */
  alternativeBundleId: string;
}

export interface ApplicationLogDetailParams {
  /** Contains list of possible columns for sorting */
  SortingColumn?: VinistoHelperDllEnumsActionLogSortableColumns;
  IsSortingDescending?: boolean;
  ApplicationLogType?: VinistoHelperDllEnumsActionLogApplicationLogType;
  /** @format int32 */
  TimeFrom?: number;
  /** @format int32 */
  TimeTo?: number;
  /** @format int64 */
  CreatedFrom?: number;
  /** @format int64 */
  CreatedTo?: number;
  ExecutorUserId?: string;
  /** @format int32 */
  Limit?: number;
  /** @format int32 */
  Offset?: number;
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
  /** bundle id */
  bundleId: string;
}

export interface BundleDetailCarouselsListParams {
  /** Bundle id for return data from cache. */
  BundleId: string;
  /**
   * Language version. If provided, all tag and bundles in carousels will be only in selected language.
   * Otherwise all language version will be provided.
   */
  Language?: VinistoHelperDllEnumsLanguage;
  /** In what currency prices will be returned. */
  Currency?: VinistoHelperDllEnumsCurrency;
  /** Filter by country of sale. Default is set to CZ and are returned bundles allowed to sale in provided country. */
  CountryOfSale?: VinistoHelperDllEnumsCountryCode;
  /**
   * PlatformId is automatically set by id which is selected by request api key.
   * @format int32
   */
  PlatformId?: number;
  IsCache?: boolean;
}

export interface HeadProductApiParams {
  /** Bundle id for return data from cache. */
  BundleId: string;
  /**
   * Language version. If provided, all tag and bundles in carousels will be only in selected language.
   * Otherwise all language version will be provided.
   */
  Language?: VinistoHelperDllEnumsLanguage;
  /** In what currency prices will be returned. */
  Currency?: VinistoHelperDllEnumsCurrency;
  /** Filter by country of sale. Default is set to CZ and are returned bundles allowed to sale in provided country. */
  CountryOfSale?: VinistoHelperDllEnumsCountryCode;
  /**
   * PlatformId is automatically set by id which is selected by request api key.
   * @format int32
   */
  PlatformId?: number;
  IsCache?: boolean;
}

export interface BundleDetailCarouselsGetSimilarBundlesListParams {
  /** Bundle id for return data from cache. */
  BundleId: string;
  /**
   * Language version. If provided, all tag and bundles in carousels will be only in selected language.
   * Otherwise all language version will be provided.
   */
  Language?: VinistoHelperDllEnumsLanguage;
  /** In what currency prices will be returned. */
  Currency?: VinistoHelperDllEnumsCurrency;
  /** Filter by country of sale. Default is set to CZ and are returned bundles allowed to sale in provided country. */
  CountryOfSale?: VinistoHelperDllEnumsCountryCode;
  /**
   * PlatformId is automatically set by id which is selected by request api key.
   * @format int32
   */
  PlatformId?: number;
  IsCache?: boolean;
}

export interface BundleDetailCarouselsGetSupplierBundlesListParams {
  /** Bundle id for return data from cache. */
  BundleId: string;
  /**
   * Language version. If provided, all tag and bundles in carousels will be only in selected language.
   * Otherwise all language version will be provided.
   */
  Language?: VinistoHelperDllEnumsLanguage;
  /** In what currency prices will be returned. */
  Currency?: VinistoHelperDllEnumsCurrency;
  /** Filter by country of sale. Default is set to CZ and are returned bundles allowed to sale in provided country. */
  CountryOfSale?: VinistoHelperDllEnumsCountryCode;
  /**
   * PlatformId is automatically set by id which is selected by request api key.
   * @format int32
   */
  PlatformId?: number;
  IsCache?: boolean;
}

/** Class containing parameters for user authorization */
export type BundlesEnableBundleUpdatePayload =
  VinistoHelperDllBaseAuthorizationParameters;

/** Class containing parameters for user authorization */
export type BundlesDisableBundleUpdatePayload =
  VinistoHelperDllBaseAuthorizationParameters;

/** Parameters provided to endpoint for editing bundle */
export type BundlesEditBundleUpdatePayload =
  VinistoProductDllModelsApiBundleBundleEditParameters;

/**
 * Lowest known internet price, or null
 * @format double
 */
export type BundlesSetLowestInternetPriceUpdatePayload = number;

/** BundleSupplierSetManipulationParameters - Bundle edit parameters */
export type BundlesEditSupplierSetBundleUpdatePayload =
  VinistoProductDllModelsApiBundleBundleSupplierSetManipulationParameters;

/** Class containing parameters for user authorization */
export type BundlesActivateDeliveryFreeBundleUpdatePayload =
  VinistoHelperDllBaseAuthorizationParameters;

/** Class containing parameters for user authorization */
export type BundlesDeactivateDeliveryFreeBundleUpdatePayload =
  VinistoHelperDllBaseAuthorizationParameters;

/** Parameters used for price manipulation in product/bundle */
export type BundlesPricesCreatePayload =
  VinistoProductDllModelsApiCommonPriceEditParameters;

export interface BundlesPricesDeleteParams {
  /** Currency in which the price will be edited */
  Currency: VinistoHelperDllEnumsCurrency;
  /** Price type for delete price. */
  PriceLevel?: VinistoHelperDllEnumsPriceLevel;
  /** Price type for delete price. */
  PriceDiscountType?: VinistoHelperDllEnumsPriceDiscountType;
  /** Identifies type of the country */
  CountryOfSale?: VinistoHelperDllEnumsCountryCode;
  /** Id of discount price. If not set, id is ignored. */
  DiscountId?: string;
  /** @format int32 */
  PlatformId?: number;
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
  /** Id of the bundle */
  bundleId: string;
}

/** Parameters used for assigning one object to another by country. */
export type BundlesTagsCreatePayload =
  VinistoHelperDllBaseItemAssignWithCountryParameters;

export interface BundlesTagsDeleteParams {
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
  /**
   * Identifies type of the country
   * @default "CZ"
   */
  countryCode?: VinistoHelperDllEnumsCountryCode;
  /** Id of the main bundle */
  bundleId: string;
  /** Id of tag which is removed from the main bundle */
  tagId: string;
}

/** Parameters for assigning bundle to bundle SET and setting discount set price. */
export type BundlesBundlesCreatePayload =
  VinistoProductDllModelsApiBundleBundleAssignParameters;

/**
 * Parameters for usassigning bundle from bundle SET.
 * Multiple same ItemIds in bundle set can exists, so Amount and Price help us to identify correct item.
 */
export type BundlesBundlesDeletePayload =
  VinistoProductDllModelsApiBundleBundleUnassignParameters;

/** Parameters for editing bundle in SET */
export type BundlesEditSetBundleItemCreatePayload =
  VinistoProductDllModelsApiBundleBundlEditItemParameters;

/** Parameters used for assigning one object to another */
export type BundlesCategoriesCreatePayload =
  VinistoHelperDllBaseItemAssignParameters;

export interface BundlesCategoriesCreateParams {
  /**
   * Identifies type of the country
   * @default "CZ"
   */
  countryCode?: VinistoHelperDllEnumsCountryCode;
  bundleId: string;
}

export interface BundlesCategoriesDeleteParams {
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
  /**
   * Identifies type of the country
   * @default "CZ"
   */
  countryCode?: VinistoHelperDllEnumsCountryCode;
  /** Id of the main bundle */
  bundleId: string;
  /** Id of tag which is removed from the main bundle */
  categoryId: string;
}

/** Parameters used for creating discount price for bundle */
export type BundlesCreateDiscountPriceCreatePayload =
  VinistoProductDllModelsApiBundlePriceBundleDiscountPriceCreateParameters;

/** Parameters used for editing discount price for bundle */
export type BundlesEditDiscountPriceUpdatePayload =
  VinistoProductDllModelsApiBundlePriceBundleDiscountPriceEditParameters;

/** Parameters used for creating volume discount price for bundle */
export type BundlesCreateVolumeDiscountPriceCreatePayload =
  VinistoProductDllModelsApiBundlePriceBundleDiscountVolumePriceCreateParameters;

/** Parameters used for creating volume discount price for bundle */
export type BundlesEditVolumeDiscountPriceUpdatePayload =
  VinistoProductDllModelsApiBundlePriceBundleDiscountVolumePriceEditParameters;

export interface BundlesDeleteDiscountPriceDeleteParams {
  /** Currency in which the price will be edited */
  Currency: VinistoHelperDllEnumsCurrency;
  /** Price type for delete price. */
  PriceLevel?: VinistoHelperDllEnumsPriceLevel;
  /** Price type for delete price. */
  PriceDiscountType?: VinistoHelperDllEnumsPriceDiscountType;
  /** Identifies type of the country */
  CountryOfSale?: VinistoHelperDllEnumsCountryCode;
  /** Id of discount price. If not set, id is ignored. */
  DiscountId?: string;
  /** @format int32 */
  PlatformId?: number;
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
  /** Id of the product */
  bundleId: string;
}

export interface BundlesGetPricesListParams {
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
  /**
   * Currency
   * @default "CZK"
   */
  currency?: VinistoHelperDllEnumsCurrency;
  bundleId: string;
}

/** Parameters provided to endpoint for change of bundles temporary unavailability */
export type BundlesSetTemporaryUnavailabilityUpdatePayload =
  VinistoProductDllModelsApiBundleBundleTemporaryUnavailabilityParameters;

/** Parameters provided to endpoint for change of bundles IsGift */
export type BundlesSetIsGiftUpdatePayload =
  VinistoProductDllModelsApiBundleBundleIsGiftParameters;

/** Parameters provided to endpoint for change of bundles IsClearanceSale */
export type BundlesSetIsClearanceSaleUpdatePayload =
  VinistoProductDllModelsApiBundleBundleIsClearanceSaleParameters;

export interface BundlesValidateCompatibleStatesListParams {
  /**
   * Contains list of possible flag for bundle.
   * Is used for transfering flag to RBMQ
   */
  flag?: VinistoHelperDllEnumsBundleFlag;
  /** Id of the bundle which has checking */
  bundleId: string;
}

/** Class containing parameters for user authorization */
export type BundlesRestoreBundleUpdatePayload =
  VinistoHelperDllBaseAuthorizationParameters;

/** Parameters provided to endpoint for set order limitation bundle */
export type BundlesSetOrderLimitationUpdatePayload =
  VinistoProductDllModelsApiBundleOrderLimitationParameters;

/** Class containing parameters for user authorization */
export type BundlesRemoveOrderLimitationUpdatePayload =
  VinistoHelperDllBaseAuthorizationParameters;

export interface BundlesRemoveOrderLimitationUpdateParams {
  /**
   * Identifies type of the country
   * @default "CZ"
   */
  countryCode?: VinistoHelperDllEnumsCountryCode;
  /** Id of the bundle to remove order limitation */
  bundleId: string;
}

/** Parameters provided to endpoint for change of bundles CanSendToWms */
export type BundlesSetCanSendToWmsUpdatePayload =
  VinistoProductDllModelsApiBundleBundleCanSendToWmsParameters;

export interface BundlesAddPlatformPartialUpdateParams {
  /**
   * Platform to manipulation available on platforms for bundle
   * @format int32
   */
  PlatformId?: number;
  /** Country code for return result in specific country */
  CountryOfSale?: VinistoHelperDllEnumsCountryCode;
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
  /** Id of the bundle */
  bundleId: string;
}

export interface BundlesRemovePlatformPartialUpdateParams {
  /**
   * Platform to manipulation available on platforms for bundle
   * @format int32
   */
  PlatformId?: number;
  /** Country code for return result in specific country */
  CountryOfSale?: VinistoHelperDllEnumsCountryCode;
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
  /** Id of the bundle */
  bundleId: string;
}

/** Parameters provided to endpoint for changing state sale is over of bundle */
export type BundlesSetSellOverUpdatePayload =
  VinistoProductDllModelsApiBundleBundleSaleOverParameters;

/** Parameters which is possible to provided to api to specify request for add not allowed country to bundle */
export type BundlesAddAllowedCountryCreatePayload =
  VinistoProductDllModelsApiBundleBundleManipulationCountryParameters;

export interface BundlesRemoveAllowedCountryDeleteParams {
  /** Country code for allowed country */
  Country: VinistoHelperDllEnumsCountryCode;
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
  /** Id of the delivery */
  bundleId: string;
}

/** Parameters provided to endpoint for changing state for supplier set bundle */
export type BundlesBundleSupplierSetChangeStateUpdatePayload =
  VinistoProductDllModelsApiBundleBundleSupplierSetChangeStateParameters;

/** Parameters provided to endpoint for changing flag is approved */
export type BundlesSetIsApprovedUpdatePayload =
  VinistoProductDllModelsApiBundleBundleIsApprovedParameters;

export interface BundlesDeleteSupplierSetDeleteParams {
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
  /** Id of the bundle */
  bundleId: string;
}

/** Defines parameters required to set CheckBox specification value */
export type BundlesSpecificationsAddCheckBoxSpecificationCreatePayload =
  VinistoProductDllModelsApiSpecificationValueParametersCheckBoxSpecificationValueParameters;

/** Defines parameters required to set MultiComboBox specification value */
export type BundlesSpecificationsAddMultiComboBoxSpecificationCreatePayload =
  VinistoProductDllModelsApiSpecificationValueParametersMultiComboBoxSpecificationValueParameters;

/** Defines parameters required to set ComboBox specification value */
export type BundlesSpecificationsAddComboBoxSpecificationCreatePayload =
  VinistoProductDllModelsApiSpecificationValueParametersComboBoxSpecificationValueParameters;

/** Defines parameters required to set Number specification value */
export type BundlesSpecificationsAddNumberSpecificationCreatePayload =
  VinistoProductDllModelsApiSpecificationValueParametersNumberSpecificationValueParameters;

/** Defines parameters required to set Number imperial specification value */
export type BundlesSpecificationsAddNumberImperialSpecificationCreatePayload =
  VinistoProductDllModelsApiSpecificationValueParametersNumberImperialSpecificationValueParameters;

/** Defines parameters required to set Decimal number specification value */
export type BundlesSpecificationsAddDecimalNumberSpecificationCreatePayload =
  VinistoProductDllModelsApiSpecificationValueParametersDecimalNumberSpecificationValueParameters;

/** Defines parameters required to set Decimal number with imperial units specification value */
export type BundlesSpecificationsAddDecimalNumberImperialSpecificationCreatePayload =
  VinistoProductDllModelsApiSpecificationValueParametersDecimalNumberImperialSpecificationValueParameters;

/** Defines parameters required to set Free text specification value in provided language */
export type BundlesSpecificationsAddTextSpecificationCreatePayload =
  VinistoProductDllModelsApiSpecificationValueParametersTextSpecificationValueParameters;

export interface BundlesSpecificationsDeleteParams {
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
  /**
   * Identifies type of the country
   * @default "CZ"
   */
  countryOfSale?: VinistoHelperDllEnumsCountryCode;
  bundleId: string;
  specificationId: string;
}

/** Parameters which is possible to provided to api to specify which bundles are requested */
export type BundlesGetBundlesCreatePayload =
  VinistoProductDllModelsApiBundleBundlesGetParameters;

export interface BundlesGetAutocompleteNamesListParams {
  /** Language identifying product lang version. */
  language?: VinistoHelperDllEnumsLanguage;
  /** Searching string in provided language. */
  searchingNameString?: string;
  IsCache?: boolean;
  /** Specify requested price levels to be loaded for all requested platforms. */
  priceLevels?: VinistoHelperDllEnumsPriceLevel[];
  /**
   * Currency
   * @default "CZK"
   */
  currency?: VinistoHelperDllEnumsCurrency;
  /**
   * Number of returned items
   * @format int32
   * @default 5
   */
  limit?: number;
  /**
   * Flag to get hidden specification
   * @default false
   */
  hiddenSpecification?: boolean;
  /**
   * If true search only between mark as deleted bundles, if false search only between mark as not deleted bundles, if not provided search all bundles
   * @default false
   */
  isDeleted?: boolean;
  /**
   * If true search only between mark as active bundles, if false search only between mark as not active bundles, if not provided search all bundles
   * @default true
   */
  isEnabled?: boolean;
  /**
   * If true search only between mark as gift bundles, if false search only between mark as not gift bundles, if not provided search all bundles
   * @default false
   */
  isGift?: boolean;
  /** If true search only between mark as temporary unavailable bundles, if false search only between mark as not temporary unavailable bundles, if not provided search all bundles */
  isTemporaryUnavailable?: boolean;
  /** If true search only between mark as set bundles, if false search only between mark as not set bundles, if not provided search all bundles */
  isSet?: boolean;
  /** If true search only between mark as is sale over bundles, if false search only between mark as is not sale over bundles, if not provided search all bundles */
  isSaleOver?: boolean;
  /** If true search only between mark as is approved bundles, if false search only between mark as is not is approved bundles, if not provided search all bundles */
  isApproved?: boolean;
  /**
   * Filter bundles by ids which are defined for shipping packaging. If true, then shipping packaging bundles are allowed in response, else are removed from response. Default is false (are not in response)
   * @default false
   */
  searchIsBundleShippingPackaging?: boolean;
  /**
   * Flag to enable / disable prices filtering in bundle response. Default is true = prices are filtered by platform id and levels.
   * @default true
   */
  filterPrices?: boolean;
}

export interface BundlesDetailParams {
  /** Language in which the bundle will be received...can be omitted in this case all language versions will ve returned */
  language?: VinistoHelperDllEnumsLanguage;
  IsCache?: boolean;
  /** Specify requested price levels to be loaded for all requested platforms. */
  priceLevels?: VinistoHelperDllEnumsPriceLevel[];
  /**
   * Currency
   * @default "CZK"
   */
  currency?: VinistoHelperDllEnumsCurrency;
  /**
   * Flag to show tags by IsEnabled in bundles response. If isHiddenTags = false, then show only tags with IsEnabled = true. If IsHiddenTags = true, then show all tags.
   * @default false
   */
  isHiddenTags?: boolean;
  /** If provided then returned bundle must be allowed to sale in country. Default is null, all bundles can be returned. */
  countryOfSale?: VinistoHelperDllEnumsCountryCode;
  /**
   * Filter bundles by ids which are defined for shipping packaging. If true, then shipping packaging bundles are allowed in response, else are removed from response. Default is false (are not in response)
   * @default false
   */
  searchIsBundleShippingPackaging?: boolean;
  /**
   * Flag to whether include hidden specifications. By default set to True.
   * @default true
   */
  showHiddenSpecification?: boolean;
  /** Id of the bundle to get */
  bundleId: string;
}

export interface BundlesDeleteParams {
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
  /** Id of the bundle */
  bundleId: string;
}

export interface BundlesGetSetBundleListParams {
  /**
   * Contains list of possible languages
   * @default "CZECH"
   */
  language?: VinistoHelperDllEnumsLanguage;
  /**
   * Currency
   * @default "CZK"
   */
  currency?: VinistoHelperDllEnumsCurrency;
  /** Id of the bundle to get */
  bundleId: string;
}

export interface BundlesGetSupplierSetsListParams {
  /** Filter bundle sets by suppliers id */
  SupplierId: string;
  /** If provided search by bundle name */
  BundleName?: string;
  /**
   * Flag to search bundles by states
   * If BundleStates = null, then return all confirmed bundles.
   * If BundleStates.Count > 0, then return bundles with state in states.
   */
  BundleStates?: VinistoHelperDllEnumsBundleBundleState[];
  /**
   * Flag to search bundles by states
   * If BundleStates = null, then return all bundles.
   * If BundleStates.Count > 0, then return bundles with state in states.
   */
  SetType?: VinistoHelperDllEnumsBundleSetType;
  /**
   * Language version - if provided, all bundles will be only in selected language.
   * Sorting and searching will be according to the specified language
   * Otherwise all language version will be provided and sorting and searching will be according to the default language (CZECH).
   */
  Language?: VinistoHelperDllEnumsLanguage;
  /** Return currency in target currency, otherwise return default CZK. */
  Currency?: VinistoHelperDllEnumsCurrency;
  /** If provided, sorting will be done according to this column. if not provided, default sorting is done by Id */
  SortingColumn?: VinistoHelperDllEnumsBundleSortableColumnsSet;
  /** True in case that sorting shall be done in descending order */
  IsSortingDescending?: boolean;
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
  /** Define price level when sort bundles by price */
  SortingPriceLevel?: VinistoHelperDllEnumsPriceLevel;
  /**
   * Only for cache purposes. Is set automatically by endpoint api key.
   * @format int32
   */
  PlatformId?: number;
  IsCache?: boolean;
}

export interface BundlesGetSpecifcationsStringListParams {
  /**
   * Contains list of possible languages
   * @default "CZECH"
   */
  language?: VinistoHelperDllEnumsLanguage;
  /** Id of the bundle to get */
  bundleId: string;
}

export interface BundlesGetOtherSuppliersListParams {
  IsCache?: boolean;
  /**
   * Currency
   * @default "CZK"
   */
  currency?: VinistoHelperDllEnumsCurrency;
  /**
   * Identifies type of the country
   * @default "CZ"
   */
  countryOfSale?: VinistoHelperDllEnumsCountryCode;
  /** Id of the bundle */
  bundleId: string;
}

export interface BundlesGetBundleByUrlListParams {
  /** Language in which the bundle will be received. Returns all languages if not provided. */
  language?: VinistoHelperDllEnumsLanguage;
  /** Specify requested price levels to be loaded for all requested platforms. */
  priceLevels?: VinistoHelperDllEnumsPriceLevel[];
  IsCache?: boolean;
  /**
   * Currency
   * @default "CZK"
   */
  currency?: VinistoHelperDllEnumsCurrency;
  /**
   * Identifies type of the country
   * @default "CZ"
   */
  countryOfSale?: VinistoHelperDllEnumsCountryCode;
  /**
   * Filter bundles by ids which are defined for shipping packaging. If true, then shipping packaging bundles are allowed in response, else are removed from response. Default is false (are not in response)
   * @default false
   */
  searchIsBundleShippingPackaging?: boolean;
  /**
   * Flag to whether include hidden specifications. By default set to False.
   * @default false
   */
  showHiddenSpecification?: boolean;
  /**
   * Enum which specifies what extra data should be returned for bundle.
   * Used in LoadDataApiService bundle methods.
   * @default "All"
   */
  extraData?: VinistoHelperDllEnumsBundleExtraBundleData;
  /** URL of the bundle to get */
  bundleUrl: string;
}

/** Parameters provided to endpoint for creating bundle */
export type BundlesCreatePayload =
  VinistoProductDllModelsApiBundleBundleCreateParameters;

/** BundleSupplierSetCreateParameters - Parameters for creating supplier set bundle */
export type BundlesCreateSupplierSetBundleCreatePayload =
  VinistoProductDllModelsApiBundleBundleSupplierSetManipulationParameters;

export interface BundlesGetBundlesByFullSearchListParams {
  UserLoginHash?: string;
  SearchString?: string;
  Language?: VinistoHelperDllEnumsLanguage;
  /** Currency */
  Currency?: VinistoHelperDllEnumsCurrency;
  /** @format int32 */
  Limit?: number;
  /** @format int32 */
  Offset?: number;
  IsMainImagesOnly?: boolean;
  /** Identifies type of the country */
  CountryOfSale?: VinistoHelperDllEnumsCountryCode;
  IsCache?: boolean;
}

export interface BundlesGetLastViewedListParams {
  IsCache?: boolean;
  /** Specify requested price levels to be loaded for all requested platforms. */
  priceLevels?: VinistoHelperDllEnumsPriceLevel[];
  /**
   * Currency
   * @default "CZK"
   */
  currency?: VinistoHelperDllEnumsCurrency;
  /**
   * Shift direction
   * @default true
   */
  isSortingDescending?: boolean;
  /**
   * Number of records to be retrieved
   * @format int32
   * @default 10
   */
  limit?: number;
  /**
   * Number of records to be skipped
   * @format int32
   * @default 0
   */
  offset?: number;
  /**
   * Flag to select bundles in stock (stock quantity greater than zero). Default is true
   * @default true
   */
  isInStock?: boolean;
  /**
   * Flag to filter response by IsDeleted
   * @default false
   */
  isDeleted?: boolean;
  /**
   * Flag to filter response by IsEnabled
   * @default true
   */
  isEnabled?: boolean;
  /** Flag to filter response by IsGift */
  isGIft?: boolean;
  /** Flag to filter response by TemporaryUnavailable */
  isTemporaryUnavailable?: boolean;
  /** Flag to filter response by IsSaleOver */
  isSaleOver?: boolean;
  /**
   * Identifies type of the country
   * @default "CZ"
   */
  countryOfSale?: VinistoHelperDllEnumsCountryCode;
  /**
   * Filter bundles by ids which are defined for shipping packaging. If true, then shipping packaging bundles are allowed in response, else are removed from response. Default is false (are not in response)
   * @default false
   */
  searchIsBundleShippingPackaging?: boolean;
}

export interface BundlesGetBundlesStockingListParams {
  /** If provided search by warehouseId in product */
  SearchWarehouseId?: string;
  /** If provided search by name in bundles */
  SearchName?: string;
  /** If provided search by supplier id in bundles */
  SearchSupplierId?: string;
  /**
   * Language of the requested category
   * Language version - if provided, all bundles will be only in selected language.
   * Sorting and searching will be according to the specified language
   * Otherwise all language version will be provided and sorting and searching will be according to the default language (CZECH).
   */
  Language?: VinistoHelperDllEnumsLanguage;
  /** In what currency prices will be returned. */
  Currency?: VinistoHelperDllEnumsCurrency;
  /** If provided search by batch in bundles specification "Šarže" */
  SearchBatch?: string;
  /** If provided search by kind in bundles specification "Druh" */
  SearchKind?: string;
  /** If provided search by type in bundles specification "Typ" */
  SearchType?: string;
  /** If provided search by categorization in bundles specification "Kategorizace" */
  SearchCategorization?: string;
  /**
   * If provided search by warehouse amount
   * @format int32
   */
  SearchAmount?: number;
  /**
   * Flag to filter bundles by IsDelted.
   * If true, then return bundles with IsDeleted = true.
   * If false, then return bundles with IsDelted = false.
   */
  IsDeleted?: boolean;
  /**
   * Flag to filter bundles by IsEnabled.
   * If true, then return bundles with IsEnabled = true.
   * If false, then return bundles with IsEnabled = false.
   */
  IsEnabled?: boolean;
  /** Search by amount filter type in warehouse */
  AmountFilter?: VinistoHelperDllEnumsBundleAmountFilter;
  /** If provided, sorting will be done according to this column. if not provided, default sorting is done by Id */
  SortingColumn?: VinistoHelperDllEnumsBundleSortableColumnsStocking;
  /** True in case that sorting shall be done in descending order */
  IsSortingDescending?: boolean;
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
  /** Flag to get data from cache */
  IsCache?: boolean;
  /** Filter bundles by ids which are defined for shipping packaging. If true, then shipping packaging bundles are allowed in response, else are removed from response. Default is fale (are not in response) */
  SearchIsBundleShippingPackaging?: boolean;
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
}

/** Parameters provided to endpoint for batch changing of bundles availability */
export type BundlesEnableBundlesUpdatePayload =
  VinistoProductDllModelsApiBundleBundlesAvailabilityParameters;

/** Parameters provided to endpoint for batch changing of bundles availability */
export type BundlesDisableBundlesUpdatePayload =
  VinistoProductDllModelsApiBundleBundlesAvailabilityParameters;

export interface BundlesGetIdenticalBundlesListParams {
  /** Contains list of possible languages */
  Language?: VinistoHelperDllEnumsLanguage;
  IsCache?: boolean;
  /** Specify requested price levels to be loaded for all requested platforms. */
  priceLevels?: VinistoHelperDllEnumsPriceLevel[];
  /**
   * Currency
   * @default "CZK"
   */
  currency?: VinistoHelperDllEnumsCurrency;
  /** If defined, then return identical bundles allowed to sale in provided country. If not set (default), then return all identical bundles. */
  countryOfSale?: VinistoHelperDllEnumsCountryCode;
  bundleId: string;
}

/** Common parameters which is possible to provided to api to specify which bundles are requested */
export type BundlesGetUniqueBundlesByScoringCreatePayload =
  VinistoProductDllModelsApiBundleBundlesGetCommonParameters;

/** Base class for parameters without limit which is possible to provided to api to specify which bundles are requested */
export type BundlesGetAvailableFiltersCreatePayload =
  VinistoProductDllModelsApiBundleBundlesGetWithoutLimitParameters;

/** Base class for parameters without limit which is possible to provided to api to specify which bundles are requested */
export type BundlesGetBundlesCategoriesCreatePayload =
  VinistoProductDllModelsApiBundleBundlesGetWithoutLimitParameters;

/** Parameters provided to endpoint for set order limitation bundles */
export type BundlesSetOrderLimitationsUpdatePayload =
  VinistoProductDllModelsApiBundleOrderLimitationsParameters;

/** Parameters provided to endpoint for set order limitation bundles */
export type BundlesRemoveOrderLimitationsUpdatePayload =
  VinistoProductDllModelsApiBundleOrderLimitationsRemoveParameters;

export interface BundlesGetBundleGiftsListParams {
  /**
   * Currency
   * @default "CZK"
   */
  currency?: VinistoHelperDllEnumsCurrency;
  /**
   * Identifies type of the country
   * @default "CZ"
   */
  countryOfSale?: VinistoHelperDllEnumsCountryCode;
  bundleId: string;
}

export interface BundlesGetSpecificationValuesListParams {
  specificationId?: string;
  bundleId: string;
}

export interface BundlesByProductDetailParams {
  /** Contains list of possible languages */
  Language?: VinistoHelperDllEnumsLanguage;
  IsCache?: boolean;
  /**
   * Currency
   * @default "CZK"
   */
  currency?: VinistoHelperDllEnumsCurrency;
  /**
   * Identifies type of the country
   * @default "CZ"
   */
  countryOfSale?: VinistoHelperDllEnumsCountryCode;
  /** Id of the product that should be contained in bundles */
  productId: string;
}

export interface BundlesByIdsListParams {
  /** List of bundle id */
  bundleIds?: string[];
  /** Specify requested price levels to be loaded for all requested platforms. */
  priceLevels?: VinistoHelperDllEnumsPriceLevel[];
  /**
   * Currency
   * @default "CZK"
   */
  currency?: VinistoHelperDllEnumsCurrency;
  /** If provided only specific language will be return */
  language?: VinistoHelperDllEnumsLanguage;
  /**
   * If provided hidden tags will be added
   * @default false
   */
  isHiddenTags?: boolean;
  /**
   * If true, only main images will be loaded
   * @default false
   */
  isMainImagesOnly?: boolean;
  /**
   * Identifies type of the country
   * @default "CZ"
   */
  countryOfSale?: VinistoHelperDllEnumsCountryCode;
  /**
   * Enum which specifies what extra data should be returned for bundle.
   * Used in LoadDataApiService bundle methods.
   * @default "All"
   */
  extraData?: VinistoHelperDllEnumsBundleExtraBundleData;
}

export interface BundlesGetBundleVolumeDiscountListParams {
  /**
   * Currency
   * @default "CZK"
   */
  currency?: VinistoHelperDllEnumsCurrency;
  /** User login hash. If is provided, then return price for signed user price level. Otherwise return price for level B2cLevel1. */
  userLoginHash?: string;
  /** Bundle id */
  bundleId: string;
}

export interface BundlesGetShippingPackagingBundlesListParams {
  /**
   * Currency
   * @default "CZK"
   */
  currency?: VinistoHelperDllEnumsCurrency;
  /**
   * Identifies type of the country
   * @default "CZ"
   */
  countryOfSale?: VinistoHelperDllEnumsCountryCode;
}

export interface BundlesGetBundlesForBasketValidationListParams {
  /** List of bundle id for basket validation. */
  bundleIds?: string[];
}

/** BaseSendEmailParameters - contains email subject and body. */
export type BundlesSendEmailToSupplierCreatePayload =
  VinistoEmailDllModelBaseSendEmailParameters;

export interface CategoriesListParams {
  /** If provided search by url in categories */
  SearchUrl?: string;
  /** If provided search by name in categories */
  SearchName?: string;
  /** If true, searchName is used as StartWith instead of Contains */
  IsSearchNameAutocomplete?: boolean;
  /**
   * Language of the requested category
   * Language version - if provided, all categories will be only in selected language.
   * Sorting and searching will be according to the specified language
   * Otherwise all language version will be provided and sorting and searching will be according to the default language (CZECH).
   */
  Language?: VinistoHelperDllEnumsLanguage;
  /**
   * Can filter category type Static/Dynamic
   * if it is null, all are returned, if one is selected, only categories with selected types are returned.
   */
  Type?: VinistoHelperDllEnumsCategoryCategoryType;
  /** If provided, sorting will be done according to this column. if not provided, default sorting is done by Id */
  SortingColumn?: VinistoHelperDllEnumsCategorySortableColumns;
  /** True in case that sorting shall be done in descending order */
  IsSortingDescending?: boolean;
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
  /**
   * Flag to search categories by platform
   * If Platform = null, then return all categories.
   * @format int32
   */
  Platform?: number;
  /**
   * Filter by country of sale.
   * If provided, only categories with this country in AllowedSearchCountries are returned.
   */
  CountryOfSale?: VinistoHelperDllEnumsCountryCode;
  IsCache?: boolean;
}

/** Parameters used for creating new category */
export type CategoriesCreatePayload =
  VinistoProductDllModelsApiCategoryCategoryCreateParameters;

export interface CategoriesGetCategoriesByIdsListParams {
  /** Search all categories by provided category ids */
  CategoryIds?: string[];
  /**
   * Language of the requested category
   * Language version - if provided, all categories will be only in selected language.
   * Sorting and searching will be according to the specified language
   * Otherwise all language version will be provided and sorting and searching will be according to the default language (CZECH).
   */
  Language?: VinistoHelperDllEnumsLanguage;
  /** If provided, sorting will be done according to this column. if not provided, default sorting is done by Id */
  SortingColumn?: VinistoHelperDllEnumsCategorySortableColumns;
  /** True in case that sorting shall be done in descending order */
  IsSortingDescending?: boolean;
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
  IsCache?: boolean;
}

export interface CategoriesGetAutocompleteNamesListParams {
  /** Contains list of possible languages */
  language?: VinistoHelperDllEnumsLanguage;
  /** Searching string in provided language. */
  searchingNameString?: string;
  IsCache?: boolean;
}

export interface CategoriesGetCategoriesByFullSearchListParams {
  UserLoginHash?: string;
  SearchString?: string;
  Language?: VinistoHelperDllEnumsLanguage;
  /** Currency */
  Currency?: VinistoHelperDllEnumsCurrency;
  /** @format int32 */
  Limit?: number;
  /** @format int32 */
  Offset?: number;
  IsMainImagesOnly?: boolean;
  /** Identifies type of the country */
  CountryOfSale?: VinistoHelperDllEnumsCountryCode;
  IsCache?: boolean;
}

export interface CategoriesDetailParams {
  /** Language in which the category will be received */
  language?: VinistoHelperDllEnumsLanguage;
  IsCache?: boolean;
  /**
   * Flag to show tags by IsEnabled in category response. If isHiddenTags = false, then show only tags with IsEnabled = true. If IsHiddenTags = true, then show all tags.
   * @default false
   */
  isHiddenTags?: boolean;
  /** Id of the category to get */
  categoryId: string;
}

/** Parameters used for editing category */
export type CategoriesUpdatePayload =
  VinistoProductDllModelsApiCategoryCategoryEditParameters;

export interface CategoriesDeleteParams {
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
  /** Id of the category */
  categoryId: string;
}

export interface CategoriesGetCategoryByUrlListParams {
  /** Language in which the category will be received */
  language?: VinistoHelperDllEnumsLanguage;
  IsCache?: boolean;
  /** URL of the category to get */
  categoryUrl: string;
}

export interface CategoriesSpecificationsListParams {
  IsCache?: boolean;
  /**
   * Flag to get hidden specifications
   * @default false
   */
  hiddenSpecification?: boolean;
  /**
   * Currency
   * @default "CZK"
   */
  currency?: VinistoHelperDllEnumsCurrency;
  /**
   * Price level for loading prices to specification
   * @default "Level1"
   */
  priceLevel?: VinistoHelperDllEnumsPriceLevel;
  /** Id of the category to get all specifications */
  categoryId: string;
}

export interface CategoriesSubcategoriesListParams {
  IsCache?: boolean;
  /** Id of the category to get all subcategories */
  categoryId: string;
}

export interface CategoriesAddPlatformPartialUpdateParams {
  /**
   * Platform to manipulation available on platforms for category
   * @format int32
   */
  Platform?: number;
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
  /** Id of the category */
  categoryId: string;
}

export interface CategoriesRemovePlatformPartialUpdateParams {
  /**
   * Platform to manipulation available on platforms for category
   * @format int32
   */
  Platform?: number;
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
  /** Id of the categoryId */
  categoryId: string;
}

export interface CategoriesBundleDiscountFilterPartialUpdateParams {
  /** Discount filter applied by default when listing bundles in this category. */
  BundleDiscountFilter?: VinistoHelperDllEnumsCategoryCategoryBundleDiscountFilter;
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
  /** Id of the category */
  categoryId: string;
}

export interface CategoriesAddAllowedSearchCountryPartialUpdateParams {
  /** List of country codes for which this category is allowed to be searched in elasticsearch. */
  AllowedSearchCountries: VinistoHelperDllEnumsCountryCode[];
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
  /** Id of the category */
  categoryId: string;
}

export interface CategoriesRemoveAllowedSearchCountryPartialUpdateParams {
  /** List of country codes for which this category is allowed to be searched in elasticsearch. */
  AllowedSearchCountries: VinistoHelperDllEnumsCountryCode[];
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
  /** Id of the category */
  categoryId: string;
}

export interface CategoriesBundlescountListParams {
  /** If is provided, then return bundles count allowed to sale in provided country. Default is null. */
  countryOfSale?: VinistoHelperDllEnumsCountryCode;
  /** Id of the category to get bundles count */
  categoryId: string;
}

/** Parameters to remove language values */
export type CategoriesRemoveLanguageUpdatePayload =
  VinistoCommonDllModelsApiRemoveLanguageParameters;

/** Parameters provided to endpoint to change parent of category */
export type CategoriesModifyCategoryParentUpdatePayload =
  VinistoProductDllModelsApiCategoryModifyParentCategoryParameters;

/** Class containing parameters for user authorization */
export type CategoriesRemoveCategoryParentDeletePayload =
  VinistoHelperDllBaseAuthorizationParameters;

export interface CategoriesCategoryBradcrumbsListParams {
  /** Contains list of possible languages */
  Language?: VinistoHelperDllEnumsLanguage;
  IsCache?: boolean;
  /** Id of the category */
  categoryId: string;
}

/** CheckBoxSpecificationValueParameters - Specifies specification to be added */
export type CategoriesSpecificationsAddCheckBoxSpecificationCreatePayload =
  VinistoCommonDllModelsApiSpecificationsValueParametersCheckBoxSpecificationValuesParameters;

/** MultiComboBoxSpecificationValuesParameters - Specifies specification to be added */
export type CategoriesSpecificationsAddMultiComboBoxSpecificationCreatePayload =
  VinistoCommonDllModelsApiSpecificationsValueParametersMultiComboBoxSpecificationValuesParameters;

/** ComboBoxSpecificationValuesParameters - Specifies specification to be added */
export type CategoriesSpecificationsAddComboBoxSpecificationCreatePayload =
  VinistoCommonDllModelsApiSpecificationsValueParametersComboBoxSpecificationValuesParameters;

/** NumberSpecificationValueParameters - Specifies specification to be added */
export type CategoriesSpecificationsAddNumberSpecificationCreatePayload =
  VinistoCommonDllModelsApiSpecificationsValueParametersNumberSpecificationValuesParameters;

/** NumberSpecificationValuesParameters - Specifies specification to be added */
export type CategoriesSpecificationsAddNumberImperialSpecificationCreatePayload =
  VinistoCommonDllModelsApiSpecificationsValueParametersNumberSpecificationValuesParameters;

/** DecimalNumberSpecificationValuesParameters - Specifies specification to be added */
export type CategoriesSpecificationsAddDecimalNumberSpecificationCreatePayload =
  VinistoCommonDllModelsApiSpecificationsValueParametersDecimalNumberSpecificationValuesParameters;

/** DecimalNumberSpecificationValuesParameters - Specifies specification to be added */
export type CategoriesSpecificationsAddDecimalNumberImperialSpecificationCreatePayload =
  VinistoCommonDllModelsApiSpecificationsValueParametersDecimalNumberSpecificationValuesParameters;

/** TextSpecificationValuesParameters - Specifies specification to be added */
export type CategoriesSpecificationsAddTextSpecificationCreatePayload =
  VinistoCommonDllModelsApiSpecificationsValueParametersTextSpecificationValuesParameters;

export interface CategoriesSpecificationsDeleteParams {
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
  categoryId: string;
  specificationId: string;
}

/** Class containing parameters for user authorization */
export type CategoriesSuppliersCreatePayload =
  VinistoHelperDllBaseAuthorizationParameters;

export interface CategoriesSuppliersDeleteParams {
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
  categoryId: string;
  supplierId: string;
}

/** Class containing parameters for user authorization */
export type CategoriesTagsCreatePayload =
  VinistoHelperDllBaseAuthorizationParameters;

export interface CategoriesTagsCreateParams {
  /**
   * Identifies type of the country
   * @default "CZ"
   */
  countryOfSale?: VinistoHelperDllEnumsCountryCode;
  /** Category id as string. */
  categoryId: string;
  /** Tag id as string. */
  tagId: string;
}

export interface CategoriesTagsDeleteParams {
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
  /**
   * Identifies type of the country
   * @default "CZ"
   */
  countryOfSale?: VinistoHelperDllEnumsCountryCode;
  categoryId: string;
  /** Tag id as string. */
  tagId: string;
}

export interface EvaluationsDetailParams {
  IsCache?: boolean;
  /** Id of the evaluation */
  evaluationId: string;
}

export interface EvaluationsDeleteParams {
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
  /** Id evaluation as string to delete */
  evaluationId: string;
}

export interface EvaluationsListParams {
  /** Evaluations only for provided user id */
  UserId?: string;
  /** Evaluations only for provided product id */
  ProductId?: string;
  /** If provided, sorting will be done according to this column. if not provided, default sorting is done by Id */
  SortingColumn?: VinistoHelperDllEnumsEvaluationSortableColumns;
  /** True in case that sorting shall be done in descending order */
  IsSortingDescending?: boolean;
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
  IsCache?: boolean;
}

/** Parameters used for creating a evaluation */
export type EvaluationsCreatePayload =
  VinistoProductDllModelsApiEvaluationEvaluationCreateParameters;

export interface EvaluationsCanEvaluateListParams {
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
  bundleId?: string;
}

export interface GiftRulesDetailParams {
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
  /**
   * Currency
   * @default "CZK"
   */
  currency?: VinistoHelperDllEnumsCurrency;
  /** Gift rule id */
  giftRuleId: string;
}

/** GiftRuleOrderPriceUpdateParameter - Parameters for updating gift rule */
export type GiftRulesUpdateOrderPriceGiftRuleUpdatePayload =
  VinistoGiftsDllModelsApiGiftRuleGiftRuleOrderPriceUpdateParameter;

/** GiftRuleCategoryManipulationParameters - Parameters for updating category gift rule */
export type GiftRulesUpdateCategoryGiftRuleUpdatePayload =
  VinistoGiftsDllModelsApiGiftRuleGiftRuleCategoryManipulationParameters;

/** GiftRuleSupplierManipulationParameters - Parameters for updating supplier gift rule */
export type GiftRulesUpdateSupplierGiftRuleUpdatePayload =
  VinistoGiftsDllModelsApiGiftRuleGiftRuleSupplierManipulationParameters;

/** GiftRuleSpecificationManipulationParameters - Parameters for updating specification gift rule */
export type GiftRulesUpdateSpecificationGiftRuleUpdatePayload =
  VinistoGiftsDllModelsApiGiftRuleGiftRuleSpecificationManipulationParameters;

/** Class containing parameters for user authorization */
export type GiftRulesActivateGiftRuleUpdatePayload =
  VinistoHelperDllBaseAuthorizationParameters;

/** Class containing parameters for user authorization */
export type GiftRulesDeactivateGiftRuleUpdatePayload =
  VinistoHelperDllBaseAuthorizationParameters;

export interface GiftRulesListParams {
  SearchName?: string;
  /** @format int64 */
  ValidFrom?: number;
  /** @format int64 */
  ValidTo?: number;
  RuleType?: VinistoHelperDllEnumsGiftGiftRuleType;
  IsActive?: boolean;
  /** Currency */
  Currency?: VinistoHelperDllEnumsCurrency;
  /** Contains list of possible columns for sorting */
  SortingColumn?: VinistoHelperDllEnumsGiftSortableColumns;
  IsSortingDescending?: boolean;
  /** @format int32 */
  Limit?: number;
  /** @format int32 */
  Offset?: number;
  IsCache?: boolean;
}

export interface HeadProductApi2Params {
  SearchName?: string;
  /** @format int64 */
  ValidFrom?: number;
  /** @format int64 */
  ValidTo?: number;
  RuleType?: VinistoHelperDllEnumsGiftGiftRuleType;
  IsActive?: boolean;
  /** Currency */
  Currency?: VinistoHelperDllEnumsCurrency;
  /** Contains list of possible columns for sorting */
  SortingColumn?: VinistoHelperDllEnumsGiftSortableColumns;
  IsSortingDescending?: boolean;
  /** @format int32 */
  Limit?: number;
  /** @format int32 */
  Offset?: number;
  IsCache?: boolean;
}

/** GiftRuleOrderPriceCreateParameter - Parameters for creating gift rule */
export type GiftRulesCreateOrderPriceGiftRuleCreatePayload =
  VinistoGiftsDllModelsApiGiftRuleGiftRuleOrderPriceCreateParameter;

/** GiftRuleCategoryManipulationParameter - Parameters for creating category gift rule */
export type GiftRulesCreateCategoryGiftRuleCreatePayload =
  VinistoGiftsDllModelsApiGiftRuleGiftRuleCategoryManipulationParameters;

/** GiftRuleSupplierManipulationParameters - Parameters for creating supplier gift rule */
export type GiftRulesCreateSupplierGiftRuleCreatePayload =
  VinistoGiftsDllModelsApiGiftRuleGiftRuleSupplierManipulationParameters;

/** GiftRuleSpecificationManipulationParameters - Parameters for creating specification gift rule */
export type GiftRulesCreateSpecificationGiftRuleCreatePayload =
  VinistoGiftsDllModelsApiGiftRuleGiftRuleSpecificationManipulationParameters;

export interface HomePageCarouselsGetTagCarouselListParams {
  /**
   * Language version. If provided, all tag and bundles in carousels will be only in selected language.
   * Otherwise all language version will be provided.
   */
  Language?: VinistoHelperDllEnumsLanguage;
  /** Return prices in requested currency, otherwise return default CZK. */
  Currency?: VinistoHelperDllEnumsCurrency;
  /** Country of sale. Default is CZ. All bundles which are returned must be allowed to sale in country. */
  CountryOfSale?: VinistoHelperDllEnumsCountryCode;
  IsCache?: boolean;
}

export interface HomePageCarouselsGetInterestingCarouselListParams {
  /**
   * Language version. If provided, all tag and bundles in carousels will be only in selected language.
   * Otherwise all language version will be provided.
   */
  Language?: VinistoHelperDllEnumsLanguage;
  /** Return prices in requested currency, otherwise return default CZK. */
  Currency?: VinistoHelperDllEnumsCurrency;
  /** Country of sale. Default is CZ. All bundles which are returned must be allowed to sale in country. */
  CountryOfSale?: VinistoHelperDllEnumsCountryCode;
  IsCache?: boolean;
}

export interface HomePageCarouselsGetInspireCarouselListParams {
  /**
   * Language version. If provided, all tag and bundles in carousels will be only in selected language.
   * Otherwise all language version will be provided.
   */
  Language?: VinistoHelperDllEnumsLanguage;
  /** Return prices in requested currency, otherwise return default CZK. */
  Currency?: VinistoHelperDllEnumsCurrency;
  /** Country of sale. Default is CZ. All bundles which are returned must be allowed to sale in country. */
  CountryOfSale?: VinistoHelperDllEnumsCountryCode;
  IsCache?: boolean;
}

export interface HomePageCategoriesDetailParams {
  /** If provided search by category name in homepage category */
  CategoryName?: string;
  /** If provided, sorting will be done according to this column. if not provided, default sorting is done by Id */
  SortingColumn?: VinistoHelperDllEnumsHomePageCategorySortableColumns;
  /** True in case that sorting shall be done in descending order */
  IsSortingDescending?: boolean;
  /**
   * Language of the requested category
   * Language version - if provided, all products will be only in selected language.
   * Sorting and searching will be according to the specified language
   * Otherwise all language version will be provided and sorting and searching will be according to the default language (CZECH).
   */
  Language?: VinistoHelperDllEnumsLanguage;
  /** Contains list of possible types Product API - Category Homepage */
  homePageCategoryType: VinistoHelperDllEnumsProductHomePageCategoryType;
}

/** Parameters provided to endpoint for creating and editing category on Homepage */
export type HomePageCategoriesCreatePayload =
  VinistoProductDllModelsApiHomePageHomePageCategoryManipulationParameters;

/** Parameters provided to endpoint for creating and editing category on Homepage */
export type HomePageCategoriesUpdatePayload =
  VinistoProductDllModelsApiHomePageHomePageCategoryManipulationParameters;

export interface HomePageCategoriesDeleteParams {
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
  /** Contains list of possible types Product API - Category Homepage */
  homePageCategoryType: VinistoHelperDllEnumsProductHomePageCategoryType;
  /** Id of the */
  categoryId: string;
}

export interface HomePageCustomCarouselsDetailParams {
  /** If provided filters out bundles in the carousel which is matching provided bundle name */
  SearchBundleName?: string;
  /** Language version - if provided, all bundles in custom carousels will be only in selected language. */
  Language?: VinistoHelperDllEnumsLanguage;
  /** Return prices in target currency, otherwise return default CZK. */
  Currency?: VinistoHelperDllEnumsCurrency;
  /** If provided, bundles in home page carousels sorting will be done according to this column. if not provided, default sorting is done by ID */
  SortingColumn?: VinistoHelperDllEnumsHomePageCustomCarouselSortableColumnsDetail;
  /** True in case that sorting of bundles in the carousel shall be done in descending order */
  IsSortingDescending?: boolean;
  /** Country of sale. Default is CZ. All bundles which are returned must be allowed to sale in country. */
  CountryOfSale?: VinistoHelperDllEnumsCountryCode;
  /** Id of the custom carousel to get */
  customCarouselId: string;
}

/** Parameters provided to endpoint for editing custom carousel */
export type HomePageCustomCarouselsUpdatePayload =
  VinistoProductDllModelsApiHomePageHomePageCustomCarouselEditParameters;

export interface HomePageCustomCarouselsDeleteParams {
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
  /** Id of the custom carousel for remove */
  customCarouselId: string;
}

/** Parameters provided to endpoint for creating bundle */
export type HomePageCustomCarouselsBundlesCreatePayload =
  VinistoProductDllModelsApiHomePageHomePageCustomCarouselAddBundleParameters;

export interface HomePageCustomCarouselsBundlesDeleteParams {
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
  /** Type of the category on HomePage */
  customCarouselId: string;
  /** Id of the */
  bundleId: string;
}

export interface HomePageCustomCarouselsListParams {
  /** If provided search by name in custom carousel */
  SearchName?: string;
  /** Bundle temporary unavailable - true/false */
  TemporaryUnavailable?: boolean;
  /** If true search only between mark as enabled carousels, if false search only between mark as not enabled carousels, if not provided search all carousels */
  IsEnabled?: boolean;
  /** Language version - if provided, all custom carousels will be only in selected language. */
  Language?: VinistoHelperDllEnumsLanguage;
  /** Return prices in target currency, otherwise return default CZK. */
  Currency?: VinistoHelperDllEnumsCurrency;
  /** If provided, sorting will be done according to this column. if not provided, default sorting is done by ID */
  SortingColumn?: VinistoHelperDllEnumsHomePageCustomCarouselSortableColumns;
  /** True in case that sorting shall be done in descending order */
  IsSortingDescending?: boolean;
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
  /** Country of sale. Default is CZ. All bundles which are returned must be allowed to sale in country. */
  CountryOfSale?: VinistoHelperDllEnumsCountryCode;
  PriceLevels?: VinistoHelperDllEnumsPriceLevel[];
  /** @format int32 */
  AvailableOnPlatform?: number;
  IsCache?: boolean;
}

/** Parameters provided to endpoint for creating custom carousel */
export type HomePageCustomCarouselsCreatePayload =
  VinistoProductDllModelsApiHomePageHomePageCustomCarouselCreateParameters;

/** Parameters used for assigning one object to another */
export type HomePageTagsCreatePayload =
  VinistoHelperDllBaseItemAssignParameters;

export interface HomePageTagsCreateParams {
  /** Country of Sale. Default is CZ. */
  countryOfSale?: VinistoHelperDllEnumsCountryCode;
}

export interface HomePageTagsDeleteParams {
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
  /** Country of Sale. Default is CZ. */
  countryOfSale?: VinistoHelperDllEnumsCountryCode;
  /** Id of the Tag */
  tagId: string;
}

export interface ImportProductsBundlesCreatePayload {
  /** @format binary */
  csv?: File;
}

export interface ImportProductsBundlesCreateParams {
  /** Language of the import */
  Language: VinistoHelperDllEnumsLanguage;
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
}

export interface ImportSpecificationsCreatePayload {
  /** @format binary */
  csv?: File;
}

export interface ImportSpecificationsCreateParams {
  /** Language of the import */
  Language: VinistoHelperDllEnumsLanguage;
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
}

export interface ImportWarehouseCreatePayload {
  /** @format binary */
  csv?: File;
}

export interface ImportWarehouseCreateParams {
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
}

export interface ImportWarehouseVicomCreatePayload {
  /** @format binary */
  csv?: File;
}

export interface ImportWarehouseVicomCreateParams {
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
}

export interface CronsListParams {
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
  /** Contains list of possible crons in product api */
  cronType?: VinistoHelperDllEnumsCronsProductApiCronType;
}

/** Class containing parameters for user authorization */
export type ProductsEnableProductUpdatePayload =
  VinistoHelperDllBaseAuthorizationParameters;

export interface ProductsEnableProductUpdateParams {
  /** Identifies type of the country */
  countryOfSale?: VinistoHelperDllEnumsCountryCode;
  /** Id of the product */
  productId: string;
}

/** Class containing parameters for user authorization */
export type ProductsDisableProductUpdatePayload =
  VinistoHelperDllBaseAuthorizationParameters;

export interface ProductsDisableProductUpdateParams {
  /**
   * Identifies type of the country
   * @default "CZ"
   */
  countryOfSale?: VinistoHelperDllEnumsCountryCode;
  /** Id of the product */
  productId: string;
}

/** Class containing parameters for user authorization */
export type ProductsEnableProductForLoggedUsersOnlyUpdatePayload =
  VinistoHelperDllBaseAuthorizationParameters;

export interface ProductsEnableProductForLoggedUsersOnlyUpdateParams {
  /**
   * Identifies type of the country
   * @default "CZ"
   */
  countryOfSale?: VinistoHelperDllEnumsCountryCode;
  /** Id of the product */
  productId: string;
}

/** Class containing parameters for user authorization */
export type ProductsDisableProductForLoggedUsersOnlyUpdatePayload =
  VinistoHelperDllBaseAuthorizationParameters;

export interface ProductsDisableProductForLoggedUsersOnlyUpdateParams {
  /**
   * Identifies type of the country
   * @default "CZ"
   */
  countryOfSale?: VinistoHelperDllEnumsCountryCode;
  /** Id of the product */
  productId: string;
}

/** Parameters provided to endpoint for editing product */
export type ProductsEditProductUpdatePayload =
  VinistoProductDllModelsApiProductProductEditParameters;

/** Parameters used for price manipulation in product/bundle */
export type ProductsPricesCreatePayload =
  VinistoProductDllModelsApiCommonPriceEditParameters;

export interface ProductsPricesDeleteParams {
  /** Currency in which the price will be edited */
  Currency: VinistoHelperDllEnumsCurrency;
  /** Price type for delete price. */
  PriceLevel?: VinistoHelperDllEnumsPriceLevel;
  /** Price type for delete price. */
  PriceDiscountType?: VinistoHelperDllEnumsPriceDiscountType;
  /** Identifies type of the country */
  CountryOfSale?: VinistoHelperDllEnumsCountryCode;
  /** Id of discount price. If not set, id is ignored. */
  DiscountId?: string;
  /** @format int32 */
  PlatformId?: number;
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
  /** Id of the product */
  productId: string;
}

/** Parameters used for assigning one object to another */
export type ProductsTagsCreatePayload =
  VinistoHelperDllBaseItemAssignParameters;

export interface ProductsTagsCreateParams {
  /**
   * Identifies type of the country
   * @default "CZ"
   */
  countryOfSale?: VinistoHelperDllEnumsCountryCode;
  productId: string;
}

export interface ProductsTagsDeleteParams {
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
  /**
   * Identifies type of the country
   * @default "CZ"
   */
  countryOfSale?: VinistoHelperDllEnumsCountryCode;
  /** Id of the main product */
  productId: string;
  /** Id of tag which is removed from the main product */
  tagId: string;
}

/** Parameters used for assigning one object to another */
export type ProductsCategoriesCreatePayload =
  VinistoHelperDllBaseItemAssignParameters;

export interface ProductsCategoriesCreateParams {
  /**
   * Identifies type of the country
   * @default "CZ"
   */
  countryOfSale?: VinistoHelperDllEnumsCountryCode;
  /** Id of the product */
  productId: string;
}

export interface ProductsCategoriesDeleteParams {
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
  /**
   * Identifies type of the country
   * @default "CZ"
   */
  countryOfSale?: VinistoHelperDllEnumsCountryCode;
  /** Id of the product */
  productId: string;
  /** Id of the category */
  categoryId: string;
}

/** Defines parameters required to set CheckBox specification value */
export type ProductsSpecificationsAddCheckBoxSpecificationCreatePayload =
  VinistoProductDllModelsApiSpecificationValueParametersCheckBoxSpecificationValueParameters;

/** Defines parameters required to set MultiComboBox specification value */
export type ProductsSpecificationsAddMultiComboBoxSpecificationCreatePayload =
  VinistoProductDllModelsApiSpecificationValueParametersMultiComboBoxSpecificationValueParameters;

/** Defines parameters required to set ComboBox specification value */
export type ProductsSpecificationsAddComboBoxSpecificationCreatePayload =
  VinistoProductDllModelsApiSpecificationValueParametersComboBoxSpecificationValueParameters;

/** Defines parameters required to set Number specification value */
export type ProductsSpecificationsAddNumberSpecificationCreatePayload =
  VinistoProductDllModelsApiSpecificationValueParametersNumberSpecificationValueParameters;

/** Defines parameters required to set Number imperial specification value */
export type ProductsSpecificationsAddNumberImperialSpecificationCreatePayload =
  VinistoProductDllModelsApiSpecificationValueParametersNumberImperialSpecificationValueParameters;

/** Defines parameters required to set Decimal number specification value */
export type ProductsSpecificationsAddDecimalNumberSpecificationCreatePayload =
  VinistoProductDllModelsApiSpecificationValueParametersDecimalNumberSpecificationValueParameters;

/** Defines parameters required to set Decimal number with imperial units specification value */
export type ProductsSpecificationsAddDecimalNumberImperialSpecificationCreatePayload =
  VinistoProductDllModelsApiSpecificationValueParametersDecimalNumberImperialSpecificationValueParameters;

/** Defines parameters required to set Free text specification value in provided language */
export type ProductsSpecificationsAddTextSpecificationCreatePayload =
  VinistoProductDllModelsApiSpecificationValueParametersTextSpecificationValueParameters;

export interface ProductsSpecificationsDeleteParams {
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
  /** Identifies type of the country */
  countryOfSale?: VinistoHelperDllEnumsCountryCode;
  productId: string;
  specificationId: string;
}

export interface ProductsListParams {
  /** If true search only between mark as deleted products, if false search only between mark as not deleted products, if not provided search all products */
  IsDeleted?: boolean;
  /** If true search only between mark as active products, if false search only between mark as not active products, if not provided search all products */
  IsEnabled?: boolean;
  /**
   * If true search only between mark as only for logged users bundles, if false search only between mark as not only for logged users bundles, if not provided search all bundles
   * If is true, then return products with property IsForLogged = true.
   * If is false, then return products with property IsForLogged = false.
   * Default is null and return all products (IsForLogged = true or IsForLogged = false)
   */
  IsForLoggedUsers?: boolean;
  /** If provided search by url in products */
  SearchUrl?: string;
  /** If provided search by name in products */
  SearchName?: string;
  /** If provided search by warehouse id */
  SearchWarehouseId?: string;
  /** If true, searchName is used as StartWith instead of Contains */
  IsSearchNameAutocomplete?: boolean;
  /**
   * Language of the requested category
   * Language version - if provided, all products will be only in selected language.
   * Sorting and searching will be according to the specified language
   * Otherwise all language version will be provided and sorting and searching will be according to the default language (CZECH).
   */
  Language?: VinistoHelperDllEnumsLanguage;
  /** Return prices in target currency, otherwise return default CZK. */
  Currency?: VinistoHelperDllEnumsCurrency;
  /** Contry of sale. Default is CZ. */
  CountryOfSale?: VinistoHelperDllEnumsCountryCode;
  /** Filter products by category */
  CategoryId?: string;
  /** Filter products by EAN */
  Ean?: string;
  /** If provided, sorting will be done according to this column. if not provided, default sorting is done by Id */
  SortingColumn?: VinistoHelperDllEnumsProductSortableColumns;
  /** True in case that sorting shall be done in descending order */
  IsSortingDescending?: boolean;
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
  IsCache?: boolean;
}

/** Parameters provided to endpoint for creating product */
export type ProductsCreatePayload =
  VinistoProductDllModelsApiProductProductCreateParameters;

export interface ProductsGetAutocompleteNamesListParams {
  /** Contains list of possible languages */
  language?: VinistoHelperDllEnumsLanguage;
  /** Searching string in provided language. */
  searchingNameString?: string;
  IsCache?: boolean;
  /**
   * Currency
   * @default "CZK"
   */
  currency?: VinistoHelperDllEnumsCurrency;
  /**
   * Number of returned items
   * @format int32
   * @default 5
   */
  limit?: number;
}

export interface ProductsDetailParams {
  /** Language in which the product will be received...can be omitted in this case all language versions will ve returned */
  language?: VinistoHelperDllEnumsLanguage;
  IsCache?: boolean;
  /**
   * Currency
   * @default "CZK"
   */
  currency?: VinistoHelperDllEnumsCurrency;
  /**
   * Identifies type of the country
   * @default "CZ"
   */
  countryOfSale?: VinistoHelperDllEnumsCountryCode;
  /** Id of the product to get */
  productId: string;
}

export interface ProductsDeleteParams {
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
  /** Id of the product */
  productId: string;
}

export interface ProductsGetProductByUrlListParams {
  /** Language in which the product will be received...can be omitted in this case all language versions will ve returned */
  language?: VinistoHelperDllEnumsLanguage;
  IsCache?: boolean;
  /**
   * Currency
   * @default "CZK"
   */
  currency?: VinistoHelperDllEnumsCurrency;
  /**
   * Identifies type of the country
   * @default "CZ"
   */
  countryOfSale?: VinistoHelperDllEnumsCountryCode;
  /** Url of the product to get */
  productUrl: string;
}

/** Parameters used for assigning one object to another objects */
export type ProductsCategoriesCreate2Payload =
  VinistoHelperDllBaseItemsAssignParameters;

/** Parameters used for assigning one object to another objects */
export type ProductsAddProductsTagUpdatePayload =
  VinistoHelperDllBaseItemsAssignParameters;

export interface ProductsAddProductsTagUpdateParams {
  /**
   * Identifies type of the country
   * @default "CZ"
   */
  countryOfSale?: VinistoHelperDllEnumsCountryCode;
}

/** Parameters provided to endpoint for batch changing of products availability */
export type ProductsEnableProductsUpdatePayload =
  VinistoProductDllModelsApiProductProductsAvailabilityParameters;

/** Parameters provided to endpoint for batch changing of products availability */
export type ProductsDisableProductsUpdatePayload =
  VinistoProductDllModelsApiProductProductsAvailabilityParameters;

export interface SpecificationsGetSpecificationListParams {
  /** Language identifying specification lang version. If not provided all version will be returned */
  language?: VinistoHelperDllEnumsLanguage;
  /** Currency to load price specification values */
  currency?: VinistoHelperDllEnumsCurrency;
  IsCache?: boolean;
  /**
   * Price level for loading prices to specification.
   * @default "Level1"
   */
  priceLevel?: VinistoHelperDllEnumsPriceLevel;
  /** Id of the specification */
  specificationId: string;
}

export interface SpecificationsGetSpecificationAllowedValuesListParams {
  /** Filter by value */
  SearchValue?: string;
  /** Filter by url */
  SearchUrl?: string;
  /** Filter by language */
  Language?: VinistoHelperDllEnumsLanguage;
  /** If provided, primary sorting will be done according to this column. If not provided Primary sorting is done according to score */
  SortingPrimaryColumn?: VinistoHelperDllEnumsSpecificationSortableColumnsComboValues;
  /** True in case that sorting shall be done in descending order */
  IsSortingPrimaryDescending?: boolean;
  /** If provided, secondary sorting will be done according to this column. If not provided Primary sorting is done according to score */
  SortingSecondaryColumn?: VinistoHelperDllEnumsSpecificationSortableColumnsComboValues;
  /** True in case that sorting shall be done in descending order */
  IsSortingSecondaryDescending?: boolean;
  /**
   * Number of records to be retrieved. if not provided default value is 10.
   * @format int32
   */
  Limit?: number;
  /**
   * Number of records to be skipped. If not provided default value is 0
   * @format int32
   */
  Offset?: number;
  IsCache?: boolean;
  /** Id of the specification */
  specificationId: string;
}

/** Parameters used for manipulation specification */
export type SpecificationsUpdateSpecificationDefinitionUpdatePayload =
  VinistoProductDllModelsApiSpecificationDefinitionParametersBaseSpecificationEditParameters;

/** Parameters to remove language values */
export type SpecificationsRemoveLanguageValueUpdatePayload =
  VinistoCommonDllModelsApiRemoveLanguageParameters;

/** Parameters used for remove language from specification allowed values */
export type SpecificationsRemoveAllowedValueLanguageUpdatePayload =
  VinistoProductDllModelsApiSpecificationDefinitionParametersRemoveAllowedValueLanguageParameters;

/** Parameters used for adding allowed values to multicombobox specification in provided language */
export type SpecificationsMultiComboBoxSpecificationEditAllowedValuesUpdatePayload =
  VinistoProductDllModelsApiSpecificationDefinitionParametersMultiComboBoxSpecificationEditParameters;

/** Parameters used for editing score for provided combobox or multicombobox specification */
export type SpecificationsComboBoxEditValueScoreUpdatePayload =
  VinistoProductDllModelsApiSpecificationDefinitionParametersComboBoxValueScoreEditParameters;

/** Parameters used for editing score for provided combobox or multicombobox specification */
export type SpecificationsMultiComboBoxEditValueScoreUpdatePayload =
  VinistoProductDllModelsApiSpecificationDefinitionParametersComboBoxValueScoreEditParameters;

/** Parameters used for removing allowed values from multicombobox specification */
export type SpecificationsMultiComboBoxSpecificationRemoveAllowedValuesUpdatePayload =
  VinistoProductDllModelsApiSpecificationDefinitionParametersMultiComboBoxSpecificationRemoveParameters;

/** Parameters used for adding allowed values to combobox specification in provided language */
export type SpecificationsComboBoxSpecificationEditAllowedValuesUpdatePayload =
  VinistoProductDllModelsApiSpecificationDefinitionParametersComboBoxSpecificationEditParameters;

/** Parameters used for removing allowed values from combobox specification */
export type SpecificationsComboBoxSpecificationRemoveAllowedValuesUpdatePayload =
  VinistoProductDllModelsApiSpecificationDefinitionParametersComboBoxSpecificationRemoveParameters;

/** Parameters used for adding unit values to number specification in provided language */
export type SpecificationsNumberSpecificationEditUnitUpdatePayload =
  VinistoProductDllModelsApiSpecificationDefinitionParametersNumberSpecificationEditParameters;

/** Parameters used for adding unit values to number specification in provided language */
export type SpecificationsNumberImperialSpecificationEditUnitsUpdatePayload =
  VinistoProductDllModelsApiSpecificationDefinitionParametersNumberImperialSpecificationEditParameters;

export interface SpecificationsDeleteParams {
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
  /** Id of the specification */
  specificationId: string;
}

export interface SpecificationsGetSpecificationUsedValuesListParams {
  IsCache?: boolean;
  /**
   * Contains list of possible languages
   * @default "CZECH"
   */
  language?: VinistoHelperDllEnumsLanguage;
  /** Id of the specification */
  specificationId: string;
}

export interface SpecificationsListParams {
  /** If provided search by name in specifications */
  SearchName?: string;
  /** If true, searchName is used as StartWith instead of Contains */
  IsSearchNameAutocomplete?: boolean;
  /**
   * Language of the requested category
   * Language version - if provided, all specifications will be only in selected language.
   * Sorting and searching will be according to the specified language
   * Otherwise all language version will be provided and sorting and searching will be according to the default language (CZECH).
   */
  Language?: VinistoHelperDllEnumsLanguage;
  /** If true search only between hidden specifications, if false search only between active specifications, if not provided search all specifications */
  ShowHidden?: boolean;
  /** If provided search by type in specifications */
  SpecificationType?: VinistoHelperDllEnumsSpecificationSpecificationType;
  /** If provided, sorting will be done according to this column. if not provided, default sorting is done by Id */
  SortingColumn?: VinistoHelperDllEnumsSpecificationSortableColumns;
  /** True in case that sorting shall be done in descending order */
  IsSortingDescending?: boolean;
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
  /** Currency to get min and max price value */
  currency?: VinistoHelperDllEnumsCurrency;
  IsCache?: boolean;
}

/** Parameters used for manipulation specification */
export type SpecificationsCreatePayload =
  VinistoProductDllModelsApiSpecificationDefinitionParametersBaseSpecificationCreateParameters;

export interface SpecificationsGetAutocompleteNamesListParams {
  /** Contains list of possible languages */
  language?: VinistoHelperDllEnumsLanguage;
  /** Searching string in provided language. */
  searchingNameString?: string;
}

export interface TagsDetailParams {
  IsCache?: boolean;
  /**
   * Identifies type of the country
   * @default "CZ"
   */
  countryOfSale?: VinistoHelperDllEnumsCountryCode;
  /**
   * Currency
   * @default "CZK"
   */
  currency?: VinistoHelperDllEnumsCurrency;
  /**
   * Flag specifies loading specifications details to tag. Default is false - not load specifications details.
   * @default false
   */
  includeSpecifications?: boolean;
  /** Id of the tag to get */
  tagId: string;
}

/** Parameters used for creating new tag */
export type TagsPartialUpdatePayload =
  VinistoProductDllModelsApiTagTagEditParameters;

export interface TagsDeleteParams {
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
  /**
   * Identifies type of the country
   * @default "CZ"
   */
  countryOfSale?: VinistoHelperDllEnumsCountryCode;
  /** Id of the tag */
  tagId: string;
}

/** Parameters provided to endpoint for change of bundles IsGift */
export type TagsSetEnableUpdatePayload =
  VinistoProductDllModelsApiTagTagEnableParameters;

export interface TagsSpecificationsListParams {
  /**
   * Flag to get hidden specifications
   * @default false
   */
  hiddenSpecification?: boolean;
  /**
   * Identifies type of the country
   * @default "CZ"
   */
  countryOfSale?: VinistoHelperDllEnumsCountryCode;
  /**
   * Currency
   * @default "CZK"
   */
  currency?: VinistoHelperDllEnumsCurrency;
  /**
   * Price level for loading prices to specification
   * @default "Level1"
   */
  priceLevel?: VinistoHelperDllEnumsPriceLevel;
  /** Id of the tag to get all specifications */
  tagId: string;
}

export interface TagsGetBundlesCountForTagListParams {
  /**
   * Identifies type of the country
   * @default "CZ"
   */
  countryOfSale?: VinistoHelperDllEnumsCountryCode;
  /** Id of the tag to get all specifications */
  tagId: string;
}

export interface TagsListParams {
  /** If provided search by url in categories */
  SearchUrl?: string;
  /** If provided search by name in categories */
  SearchName?: string;
  /** If provided search by IsInHomePage */
  IsInHomePage?: boolean;
  /** If provided search by IsEnabled */
  IsEnabled?: boolean;
  /** If true, searchName is used as StartWith instead of Contains */
  IsSearchNameAutocomplete?: boolean;
  /** What currency is requested. Default value is CZK. */
  Currency?: VinistoHelperDllEnumsCurrency;
  /** If provided, sorting will be done according to this column. if not provided, default sorting is done by Id */
  SortingColumn?: VinistoHelperDllEnumsTagSortableColumns;
  /** True in case that sorting shall be done in descending order */
  IsSortingDescending?: boolean;
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
  /** If true, then return only allowed tags for filtering. If false, then return only no allowed tags for filtering. If not provided, then return all tags. */
  IsShownInFilters?: boolean;
  /** Country of sale. Default is CZ. All bundles which are returned must be allowed to sale in country and specify language version of tag. */
  CountryOfSale?: VinistoHelperDllEnumsCountryCode;
  /**
   * Filter only active tags (current timestamp is between ValidFrom and ValidTo).
   * If is null, then are filtered all tags.
   * If is true, then only active tags, otherwise not active tags.
   */
  IsTagActive?: boolean;
  /**
   * By default is true, return all type tags.
   * If false, return all non-system type tags.
   */
  IncludeSystemTypeTags?: boolean;
  IsCache?: boolean;
}

/** Parameters used for creating new tag */
export type TagsCreatePayload =
  VinistoProductDllModelsApiTagTagCreateParameters;

export interface TagsGetAutocompleteNamesListParams {
  /** Searching string in provided language. */
  searchingNameString?: string;
  IsCache?: boolean;
  /**
   * Identifies type of the country
   * @default "CZ"
   */
  countryOfSale?: VinistoHelperDllEnumsCountryCode;
  /**
   * Currency
   * @default "CZK"
   */
  currency?: VinistoHelperDllEnumsCurrency;
  /**
   * By default is true, return all type tags. If false, return all non-system type tags.
   * @default true
   */
  includeSystemTypeTags?: boolean;
}

export interface TagsGetTagByUrlListParams {
  IsCache?: boolean;
  /**
   * Identifies type of the country
   * @default "CZ"
   */
  countryOfSale?: VinistoHelperDllEnumsCountryCode;
  /**
   * Currency
   * @default "CZK"
   */
  currency?: VinistoHelperDllEnumsCurrency;
  /**
   * Flag specifies loading specifications details to tag. Default is false - not load specifications details.
   * @default false
   */
  includeSpecifications?: boolean;
  /** Url of the tag to get */
  tagUrl: string;
}

/** Parameters used for creating new tag */
export type TagsCreateTagLanguageVersionCreatePayload =
  VinistoProductDllModelsApiTagTagCreateParameters;

/** CheckBoxSpecificationValueParameters - Specifies specification to be added */
export type TagsSpecificationsAddCheckboxSpecificationCreatePayload =
  VinistoCommonDllModelsApiSpecificationsValueParametersCheckBoxSpecificationValuesParameters;

/** MultiComboBoxSpecificationValuesParameters - Specifies specification to be added */
export type TagsSpecificationsAddMultiComboboxSpecificationCreatePayload =
  VinistoCommonDllModelsApiSpecificationsValueParametersMultiComboBoxSpecificationValuesParameters;

/** ComboBoxSpecificationValuesParameters - Specifies specification to be added */
export type TagsSpecificationsAddComboboxSpecificationCreatePayload =
  VinistoCommonDllModelsApiSpecificationsValueParametersComboBoxSpecificationValuesParameters;

/** NumberSpecificationValueParameters - Specifies specification to be added */
export type TagsSpecificationsAddNumberSpecificationCreatePayload =
  VinistoCommonDllModelsApiSpecificationsValueParametersNumberSpecificationValuesParameters;

/** NumberSpecificationValuesParameters - Specifies specification to be added */
export type TagsSpecificationsAddNumberImperialSpecificationCreatePayload =
  VinistoCommonDllModelsApiSpecificationsValueParametersNumberSpecificationValuesParameters;

/** DecimalNumberSpecificationValuesParameters - Specifies specification to be added */
export type TagsSpecificationsAddDecimalNumberSpecificationCreatePayload =
  VinistoCommonDllModelsApiSpecificationsValueParametersDecimalNumberSpecificationValuesParameters;

/** DecimalNumberSpecificationValuesParameters - Specifies specification to be added */
export type TagsSpecificationsAddDecimalNumberImperialSpecificationCreatePayload =
  VinistoCommonDllModelsApiSpecificationsValueParametersDecimalNumberSpecificationValuesParameters;

/** TextSpecificationValuesParameters - Specifies specification to be added */
export type TagsSpecificationsAddTextSpecificationCreatePayload =
  VinistoCommonDllModelsApiSpecificationsValueParametersTextSpecificationValuesParameters;

export interface TagsSpecificationsDeleteParams {
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
  tagId: string;
  /** Identifies type of the country */
  countryOfSale: VinistoHelperDllEnumsCountryCode;
  specificationId: string;
}

export interface VirtualCategoriesListParams {
  /** If provided search by url. */
  SearchUrl?: string;
  /** If provided search by group. */
  SearchGroup?: string;
  /** If provided search by group. */
  SearchTitleH1?: string;
  /** If provided search by group. */
  SearchState?: VinistoHelperDllEnumsVirtualCategoryState;
  /**
   * Language of the requested virtual category.
   * Language version - if provided, all categories will be only in selected language.
   * Sorting and searching will be according to the specified language.
   * Otherwise all language version will be provided and sorting and searching will be according to the default language (CZECH).
   */
  Language?: VinistoHelperDllEnumsLanguage;
  /** If provided, sorting will be done according to this column. if not provided, default sorting is done by Id */
  SortingColumn?: VinistoHelperDllEnumsVirtualCategorySortableColumns;
  /** True in case that sorting shall be done in descending order */
  IsSortingDescending?: boolean;
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
  IsCache?: boolean;
}

/** VirtualCategoryCreateParameters - Parameters for create of the virtual category */
export type VirtualCategoriesCreatePayload =
  VinistoProductDllModelsApiVirtualCategoryVirtualCategoryCreateParameters;

export interface VirtualCategoriesDetailParams {
  IsCache?: boolean;
  /** Id of the virtual category to get */
  virtualCategoryId: string;
}

/** VirtualCategoryEditParameters - Parameters for update of the virtual category */
export type VirtualCategoriesUpdatePayload =
  VinistoProductDllModelsApiVirtualCategoryVirtualCategoryEditParameters;

export interface VirtualCategoriesDeleteParams {
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
  /** Id of the virtual category */
  virtualCategoryId: string;
}

export interface VirtualCategoriesGetVirtualCategoryByUrlListParams {
  /** Language in which the virtual category will be received */
  language?: VinistoHelperDllEnumsLanguage;
  IsCache?: boolean;
  /** URL of the virtual category to get */
  virtualCategoryUrl: string;
}

export interface VirtualCategoriesSwitchStatePartialUpdateParams {
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
  /** Id of the virtual category */
  virtualCategoryId: string;
}

export namespace ProductApi {
  /**
   * No description
   * @tags Admin
   * @name AdminBundlesList
   * @summary Get filtered and sorted list of bundles for admin section.
   * @request GET:/product-api/admin/bundles
   * @secure
   */
  export namespace AdminBundlesList {
    export type RequestParams = {};
    export type RequestQuery = {
      Filter?: string;
      Sort?: string;
      UserLoginHash?: string;
      /** @format int32 */
      Limit?: number;
      /** @format int32 */
      Offset?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiAdminBundlesReturn;
  }

  /**
   * No description
   * @tags Admin
   * @name AdminHomepageCustomCarouselsList
   * @summary Get all available custom carousels for Homepage in admin
   * @request GET:/product-api/admin/homepage-custom-carousels
   * @secure
   */
  export namespace AdminHomepageCustomCarouselsList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** If provided search by name in custom carousel */
      SearchName?: string;
      /** Bundle temporary unavailable - true/false */
      TemporaryUnavailable?: boolean;
      /** If true search only between mark as enabled carousels, if false search only between mark as not enabled carousels, if not provided search all carousels */
      IsEnabled?: boolean;
      /** Language version - if provided, all custom carousels will be only in selected language. */
      Language?: VinistoHelperDllEnumsLanguage;
      /** Return prices in target currency, otherwise return default CZK. */
      Currency?: VinistoHelperDllEnumsCurrency;
      /** If provided, sorting will be done according to this column. if not provided, default sorting is done by ID */
      SortingColumn?: VinistoHelperDllEnumsHomePageCustomCarouselSortableColumns;
      /** True in case that sorting shall be done in descending order */
      IsSortingDescending?: boolean;
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
      /** Country of sale. Default is CZ. All bundles which are returned must be allowed to sale in country. */
      CountryOfSale?: VinistoHelperDllEnumsCountryCode;
      PriceLevels?: VinistoHelperDllEnumsPriceLevel[];
      /** @format int32 */
      AvailableOnPlatform?: number;
      IsCache?: boolean;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoProductDllModelsApiAdminHomepageCustomCarouselsReturn;
  }

  /**
 * No description
 * @tags Admin
 * @name AdminSpecificationsList
 * @summary Gets the specifications by provided limit and offset sorted by the provided sortByColumn parameter, the sort direction is determined by the sortDesc parameter.
If searchName was specified, specifications will be searched according to these specified parameters.
 * @request GET:/product-api/admin/specifications
 * @secure
*/
  export namespace AdminSpecificationsList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** If provided search by name in specifications */
      SearchName?: string;
      /** If true, searchName is used as StartWith instead of Contains */
      IsSearchNameAutocomplete?: boolean;
      /**
       * Language of the requested category
       * Language version - if provided, all specifications will be only in selected language.
       * Sorting and searching will be according to the specified language
       * Otherwise all language version will be provided and sorting and searching will be according to the default language (CZECH).
       */
      Language?: VinistoHelperDllEnumsLanguage;
      /** If true search only between hidden specifications, if false search only between active specifications, if not provided search all specifications */
      ShowHidden?: boolean;
      /** If provided search by type in specifications */
      SpecificationType?: VinistoHelperDllEnumsSpecificationSpecificationType;
      /** If provided, sorting will be done according to this column. if not provided, default sorting is done by Id */
      SortingColumn?: VinistoHelperDllEnumsSpecificationSortableColumns;
      /** True in case that sorting shall be done in descending order */
      IsSortingDescending?: boolean;
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
      /** Currency to get min and max price value */
      currency?: VinistoHelperDllEnumsCurrency;
      IsCache?: boolean;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoProductDllModelsApiAdminSpecificationsReturn;
  }

  /**
   * No description
   * @tags AllBundlesApplicationLog
   * @name ApplicationLogAllBundlesList
   * @request GET:/product-api/application-log/all-bundles
   * @secure
   */
  export namespace ApplicationLogAllBundlesList {
    export type RequestParams = {};
    export type RequestQuery = {
      BundleId?: string;
      /** Contains list of possible columns for sorting */
      SortingColumn?: VinistoHelperDllEnumsActionLogSortableColumns;
      IsSortingDescending?: boolean;
      ApplicationLogType?: VinistoHelperDllEnumsActionLogApplicationLogType;
      /** @format int32 */
      TimeFrom?: number;
      /** @format int32 */
      TimeTo?: number;
      /** @format int64 */
      CreatedFrom?: number;
      /** @format int64 */
      CreatedTo?: number;
      ExecutorUserId?: string;
      /** @format int32 */
      Limit?: number;
      /** @format int32 */
      Offset?: number;
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoApplicationLogDllModelsApiApplicationLogApplicationLogReturn;
  }

  /**
   * No description
   * @tags Basket
   * @name BasketCategoriesByIdsCreate
   * @summary Retrieves categories for basket by provided parameters. Returns only Id, url and name.
   * @request POST:/product-api/basket/categories/by-ids
   * @secure
   */
  export namespace BasketCategoriesByIdsCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BasketCategoriesByIdsCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoProductDllModelsApiCategoryBasketCategoriesReturn;
  }

  /**
   * No description
   * @tags Basket
   * @name BasketSpecificationsByIdsCreate
   * @summary Retrieves specifications for basket by provided parameters. Returns only Id, url and name.
   * @request POST:/product-api/basket/specifications/by-ids
   * @secure
   */
  export namespace BasketSpecificationsByIdsCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BasketSpecificationsByIdsCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoProductDllModelsApiSpecificationBasketSpecificationsReturn;
  }

  /**
 * No description
 * @tags BundleAlternative
 * @name BundlesAlternativeBundlesCreate
 * @summary Adds alternative bundle to bundle. Both bundle and alternative are found by provided ids.
If one of the bundle is not found or are the same. Operation is not done.
 * @request POST:/product-api/bundles/{bundleId}/alternative-bundles
 * @secure
*/
  export namespace BundlesAlternativeBundlesCreate {
    export type RequestParams = {
      /** Id of the main bundle */
      bundleId: string;
    };
    export type RequestQuery = {
      /**
       * Identifies type of the country
       * @default "CZ"
       */
      countryCode?: VinistoHelperDllEnumsCountryCode;
    };
    export type RequestBody = BundlesAlternativeBundlesCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiBundleBundleReturn;
  }

  /**
   * No description
   * @tags BundleAlternative
   * @name BundlesAlternativeBundlesDelete
   * @summary Removes alternative bundle from bundle.
   * @request DELETE:/product-api/bundles/{bundleId}/alternative-bundles/{alternativeBundleId}
   * @secure
   */
  export namespace BundlesAlternativeBundlesDelete {
    export type RequestParams = {
      /** Id of the main bundle */
      bundleId: string;
      /** Id of alternative bundle which is removed from the main bundle */
      alternativeBundleId: string;
    };
    export type RequestQuery = {
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
      /**
       * Identifies type of the country
       * @default "CZ"
       */
      countryCode?: VinistoHelperDllEnumsCountryCode;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiBundleBundleReturn;
  }

  /**
   * No description
   * @tags BundleApplicationLog
   * @name ApplicationLogDetail
   * @summary Get application logs for bundle
   * @request GET:/product-api/application-log/{bundleId}
   * @secure
   */
  export namespace ApplicationLogDetail {
    export type RequestParams = {
      /** bundle id */
      bundleId: string;
    };
    export type RequestQuery = {
      /** Contains list of possible columns for sorting */
      SortingColumn?: VinistoHelperDllEnumsActionLogSortableColumns;
      IsSortingDescending?: boolean;
      ApplicationLogType?: VinistoHelperDllEnumsActionLogApplicationLogType;
      /** @format int32 */
      TimeFrom?: number;
      /** @format int32 */
      TimeTo?: number;
      /** @format int64 */
      CreatedFrom?: number;
      /** @format int64 */
      CreatedTo?: number;
      ExecutorUserId?: string;
      /** @format int32 */
      Limit?: number;
      /** @format int32 */
      Offset?: number;
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoApplicationLogDllModelsApiApplicationLogApplicationLogReturn;
  }

  /**
 * No description
 * @tags BundleDetailCarousels
 * @name BundleDetailCarouselsList
 * @summary Get data for 3 carousels in Detail bundles:
1. LastViewed bundles
2. Similar bundles - same variety, type and kind as original bundle
3. Manufacturer bundles - same producer specification value as original bundle
 * @request GET:/product-api/bundle-detail/carousels
 * @secure
*/
  export namespace BundleDetailCarouselsList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** Bundle id for return data from cache. */
      BundleId: string;
      /**
       * Language version. If provided, all tag and bundles in carousels will be only in selected language.
       * Otherwise all language version will be provided.
       */
      Language?: VinistoHelperDllEnumsLanguage;
      /** In what currency prices will be returned. */
      Currency?: VinistoHelperDllEnumsCurrency;
      /** Filter by country of sale. Default is set to CZ and are returned bundles allowed to sale in provided country. */
      CountryOfSale?: VinistoHelperDllEnumsCountryCode;
      /**
       * PlatformId is automatically set by id which is selected by request api key.
       * @format int32
       */
      PlatformId?: number;
      IsCache?: boolean;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoProductDllModelsApiBundleBundleDetailCarouselReturn;
  }

  /**
 * No description
 * @tags BundleDetailCarousels
 * @name HeadProductApi
 * @summary Get data for 3 carousels in Detail bundles:
1. LastViewed bundles
2. Similar bundles - same variety, type and kind as original bundle
3. Manufacturer bundles - same producer specification value as original bundle
 * @request HEAD:/product-api/bundle-detail/carousels
 * @secure
*/
  export namespace HeadProductApi {
    export type RequestParams = {};
    export type RequestQuery = {
      /** Bundle id for return data from cache. */
      BundleId: string;
      /**
       * Language version. If provided, all tag and bundles in carousels will be only in selected language.
       * Otherwise all language version will be provided.
       */
      Language?: VinistoHelperDllEnumsLanguage;
      /** In what currency prices will be returned. */
      Currency?: VinistoHelperDllEnumsCurrency;
      /** Filter by country of sale. Default is set to CZ and are returned bundles allowed to sale in provided country. */
      CountryOfSale?: VinistoHelperDllEnumsCountryCode;
      /**
       * PlatformId is automatically set by id which is selected by request api key.
       * @format int32
       */
      PlatformId?: number;
      IsCache?: boolean;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoProductDllModelsApiBundleBundleDetailCarouselReturn;
  }

  /**
   * No description
   * @tags BundleDetailCarousels
   * @name BundleDetailCarouselsGetSimilarBundlesList
   * @summary Get data for Similar bundles:
   * @request GET:/product-api/bundle-detail/carousels/GetSimilarBundles
   * @secure
   */
  export namespace BundleDetailCarouselsGetSimilarBundlesList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** Bundle id for return data from cache. */
      BundleId: string;
      /**
       * Language version. If provided, all tag and bundles in carousels will be only in selected language.
       * Otherwise all language version will be provided.
       */
      Language?: VinistoHelperDllEnumsLanguage;
      /** In what currency prices will be returned. */
      Currency?: VinistoHelperDllEnumsCurrency;
      /** Filter by country of sale. Default is set to CZ and are returned bundles allowed to sale in provided country. */
      CountryOfSale?: VinistoHelperDllEnumsCountryCode;
      /**
       * PlatformId is automatically set by id which is selected by request api key.
       * @format int32
       */
      PlatformId?: number;
      IsCache?: boolean;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiBundleBundlesReturn;
  }

  /**
   * No description
   * @tags BundleDetailCarousels
   * @name BundleDetailCarouselsGetSupplierBundlesList
   * @summary Get carousel data with bundles from same supplier
   * @request GET:/product-api/bundle-detail/carousels/get-supplier-bundles
   * @secure
   */
  export namespace BundleDetailCarouselsGetSupplierBundlesList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** Bundle id for return data from cache. */
      BundleId: string;
      /**
       * Language version. If provided, all tag and bundles in carousels will be only in selected language.
       * Otherwise all language version will be provided.
       */
      Language?: VinistoHelperDllEnumsLanguage;
      /** In what currency prices will be returned. */
      Currency?: VinistoHelperDllEnumsCurrency;
      /** Filter by country of sale. Default is set to CZ and are returned bundles allowed to sale in provided country. */
      CountryOfSale?: VinistoHelperDllEnumsCountryCode;
      /**
       * PlatformId is automatically set by id which is selected by request api key.
       * @format int32
       */
      PlatformId?: number;
      IsCache?: boolean;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiBundleBundlesReturn;
  }

  /**
   * No description
   * @tags BundleEdit
   * @name BundlesEnableBundleUpdate
   * @summary Enable provided bundle
   * @request PUT:/product-api/bundles/{bundleId}/EnableBundle
   * @secure
   */
  export namespace BundlesEnableBundleUpdate {
    export type RequestParams = {
      /** Id of the bundle */
      bundleId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = BundlesEnableBundleUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiBundleBundleReturn;
  }

  /**
   * No description
   * @tags BundleEdit
   * @name BundlesDisableBundleUpdate
   * @summary Disable provided bundle
   * @request PUT:/product-api/bundles/{bundleId}/DisableBundle
   * @secure
   */
  export namespace BundlesDisableBundleUpdate {
    export type RequestParams = {
      /** Id of the bundle */
      bundleId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = BundlesDisableBundleUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiBundleBundleReturn;
  }

  /**
   * No description
   * @tags BundleEdit
   * @name BundlesEditBundleUpdate
   * @summary Updates bundle
   * @request PUT:/product-api/bundles/{bundleId}/EditBundle
   * @secure
   */
  export namespace BundlesEditBundleUpdate {
    export type RequestParams = {
      /** Id of the bundle to update */
      bundleId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = BundlesEditBundleUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiBundleBundleReturn;
  }

  /**
   * No description
   * @tags BundleEdit
   * @name BundlesSetLowestInternetPriceUpdate
   * @summary Set the lowest known internet price for a bundle. Send null to clear the value.
   * @request PUT:/product-api/bundles/{bundleId}/set-lowest-internet-price
   * @secure
   */
  export namespace BundlesSetLowestInternetPriceUpdate {
    export type RequestParams = {
      /** Id of the bundle to update */
      bundleId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = BundlesSetLowestInternetPriceUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiBundleBundleReturn;
  }

  /**
   * No description
   * @tags BundleEdit
   * @name BundlesEditSupplierSetBundleUpdate
   * @summary Update set bundle by supplier
   * @request PUT:/product-api/bundles/{bundleId}/edit-supplier-set-bundle
   * @secure
   */
  export namespace BundlesEditSupplierSetBundleUpdate {
    export type RequestParams = {
      /** Id of the bundle to update */
      bundleId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = BundlesEditSupplierSetBundleUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiBundleBundleReturn;
  }

  /**
   * No description
   * @tags BundleEdit
   * @name BundlesSetLastViewBundleUpdate
   * @summary Set LastView for bundle
   * @request PUT:/product-api/bundles/{bundleId}/SetLastViewBundle
   * @secure
   */
  export namespace BundlesSetLastViewBundleUpdate {
    export type RequestParams = {
      /** Id of the bundle to update */
      bundleId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoHelperDllBaseBaseReturn;
  }

  /**
   * No description
   * @tags BundleEdit
   * @name BundlesActivateDeliveryFreeBundleUpdate
   * @summary Activate delivery free bundle
   * @request PUT:/product-api/bundles/{bundleId}/ActivateDeliveryFreeBundle
   * @secure
   */
  export namespace BundlesActivateDeliveryFreeBundleUpdate {
    export type RequestParams = {
      /** Id of the bundle */
      bundleId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = BundlesActivateDeliveryFreeBundleUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiBundleBundleReturn;
  }

  /**
   * No description
   * @tags BundleEdit
   * @name BundlesDeactivateDeliveryFreeBundleUpdate
   * @summary Deactivate delivery free bundle
   * @request PUT:/product-api/bundles/{bundleId}/DeactivateDeliveryFreeBundle
   * @secure
   */
  export namespace BundlesDeactivateDeliveryFreeBundleUpdate {
    export type RequestParams = {
      /** Id of the bundle */
      bundleId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = BundlesDeactivateDeliveryFreeBundleUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiBundleBundleReturn;
  }

  /**
 * No description
 * @tags BundleEdit
 * @name BundlesPricesCreate
 * @summary Add price to provided bundle. If price with given currency already exists, it is overwritten.
If bundle type is SET (isSet = true), price cannot be adjusted
(it will be calculated from prices of individual assigned bundles)
 * @request POST:/product-api/bundles/{bundleId}/prices
 * @secure
*/
  export namespace BundlesPricesCreate {
    export type RequestParams = {
      /** Id of the bundle */
      bundleId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = BundlesPricesCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiBundleBundleReturn;
  }

  /**
 * No description
 * @tags BundleEdit
 * @name BundlesPricesDelete
 * @summary Remove price from bundle
If bundle type is SET (isSet = true), price cannot be remove
(it will be calculated from prices of individual assigned bundles)
 * @request DELETE:/product-api/bundles/{bundleId}/prices
 * @secure
*/
  export namespace BundlesPricesDelete {
    export type RequestParams = {
      /** Id of the bundle */
      bundleId: string;
    };
    export type RequestQuery = {
      /** Currency in which the price will be edited */
      Currency: VinistoHelperDllEnumsCurrency;
      /** Price type for delete price. */
      PriceLevel?: VinistoHelperDllEnumsPriceLevel;
      /** Price type for delete price. */
      PriceDiscountType?: VinistoHelperDllEnumsPriceDiscountType;
      /** Identifies type of the country */
      CountryOfSale?: VinistoHelperDllEnumsCountryCode;
      /** Id of discount price. If not set, id is ignored. */
      DiscountId?: string;
      /** @format int32 */
      PlatformId?: number;
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiBundleBundleReturn;
  }

  /**
   * No description
   * @tags BundleEdit
   * @name BundlesTagsCreate
   * @summary Add tag to provided bundle.
   * @request POST:/product-api/bundles/{bundleId}/tags
   * @secure
   */
  export namespace BundlesTagsCreate {
    export type RequestParams = {
      bundleId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = BundlesTagsCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiBundleBundleReturn;
  }

  /**
   * No description
   * @tags BundleEdit
   * @name BundlesTagsDelete
   * @summary Removes tag from bundle.
   * @request DELETE:/product-api/bundles/{bundleId}/tags/{tagId}
   * @secure
   */
  export namespace BundlesTagsDelete {
    export type RequestParams = {
      /** Id of the main bundle */
      bundleId: string;
      /** Id of tag which is removed from the main bundle */
      tagId: string;
    };
    export type RequestQuery = {
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
      /**
       * Identifies type of the country
       * @default "CZ"
       */
      countryCode?: VinistoHelperDllEnumsCountryCode;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiBundleBundleReturn;
  }

  /**
 * No description
 * @tags BundleEdit
 * @name BundlesBundlesCreate
 * @summary Assigns provided bundle to provided SET bundle. Both bundle and SET bundle identified by Id.
If bundle or SET bundle is not found, operation is cancelled.
 * @request POST:/product-api/bundles/{bundleId}/bundles
 * @secure
*/
  export namespace BundlesBundlesCreate {
    export type RequestParams = {
      /** Id of SET bundle */
      bundleId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = BundlesBundlesCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiBundleBundleReturn;
  }

  /**
   * No description
   * @tags BundleEdit
   * @name BundlesBundlesDelete
   * @summary Removes bundle from SET bundle
   * @request DELETE:/product-api/bundles/{bundleId}/bundles
   * @secure
   */
  export namespace BundlesBundlesDelete {
    export type RequestParams = {
      /** Id of SET bundle */
      bundleId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = BundlesBundlesDeletePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiBundleBundleReturn;
  }

  /**
   * No description
   * @tags BundleEdit
   * @name BundlesEditSetBundleItemCreate
   * @summary Edit provided bundle (defined by ID, old amount and old price) in Set.
   * @request POST:/product-api/bundles/{bundleId}/edit-set-bundle-item
   * @secure
   */
  export namespace BundlesEditSetBundleItemCreate {
    export type RequestParams = {
      /** Id of SET bundle */
      bundleId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = BundlesEditSetBundleItemCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiBundleBundleReturn;
  }

  /**
   * No description
   * @tags BundleEdit
   * @name BundlesCategoriesCreate
   * @summary Assign category to the bundle
   * @request POST:/product-api/bundles/{bundleId}/categories
   * @secure
   */
  export namespace BundlesCategoriesCreate {
    export type RequestParams = {
      bundleId: string;
    };
    export type RequestQuery = {
      /**
       * Identifies type of the country
       * @default "CZ"
       */
      countryCode?: VinistoHelperDllEnumsCountryCode;
    };
    export type RequestBody = BundlesCategoriesCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiBundleBundleReturn;
  }

  /**
   * No description
   * @tags Bundles
   * @name BundlesCategoriesList
   * @summary Get all categories for bundle.
   * @request GET:/product-api/bundles/{bundleId}/categories
   * @secure
   */
  export namespace BundlesCategoriesList {
    export type RequestParams = {
      /** If platform = null, then return all categories for bundle. */
      bundleId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoProductDllModelsApiBundleBundleCategoriesReturn;
  }

  /**
   * No description
   * @tags BundleEdit
   * @name BundlesCategoriesDelete
   * @summary Removes tag from bundle.
   * @request DELETE:/product-api/bundles/{bundleId}/categories/{categoryId}
   * @secure
   */
  export namespace BundlesCategoriesDelete {
    export type RequestParams = {
      /** Id of the main bundle */
      bundleId: string;
      /** Id of tag which is removed from the main bundle */
      categoryId: string;
    };
    export type RequestQuery = {
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
      /**
       * Identifies type of the country
       * @default "CZ"
       */
      countryCode?: VinistoHelperDllEnumsCountryCode;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiBundleBundleReturn;
  }

  /**
   * No description
   * @tags BundleEdit
   * @name BundlesCreateDiscountPriceCreate
   * @summary Create discount price in bundle
   * @request POST:/product-api/bundles/{bundleId}/CreateDiscountPrice
   * @secure
   */
  export namespace BundlesCreateDiscountPriceCreate {
    export type RequestParams = {
      bundleId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = BundlesCreateDiscountPriceCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiBundleBundleReturn;
  }

  /**
   * No description
   * @tags BundleEdit
   * @name BundlesEditDiscountPriceUpdate
   * @summary Edit discount price in bundle
   * @request PUT:/product-api/bundles/{bundleId}/EditDiscountPrice
   * @secure
   */
  export namespace BundlesEditDiscountPriceUpdate {
    export type RequestParams = {
      bundleId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = BundlesEditDiscountPriceUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiBundleBundleReturn;
  }

  /**
   * No description
   * @tags BundleEdit
   * @name BundlesCreateVolumeDiscountPriceCreate
   * @summary Create volume discount price in bundle
   * @request POST:/product-api/bundles/{bundleId}/CreateVolumeDiscountPrice
   * @secure
   */
  export namespace BundlesCreateVolumeDiscountPriceCreate {
    export type RequestParams = {
      bundleId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = BundlesCreateVolumeDiscountPriceCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiBundleBundleReturn;
  }

  /**
   * No description
   * @tags BundleEdit
   * @name BundlesEditVolumeDiscountPriceUpdate
   * @summary Edit volume discount price in bundle
   * @request PUT:/product-api/bundles/{bundleId}/EditVolumeDiscountPrice
   * @secure
   */
  export namespace BundlesEditVolumeDiscountPriceUpdate {
    export type RequestParams = {
      bundleId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = BundlesEditVolumeDiscountPriceUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiBundleBundleReturn;
  }

  /**
   * No description
   * @tags BundleEdit
   * @name BundlesDeleteDiscountPriceDelete
   * @summary Delete discount price in bundle
   * @request DELETE:/product-api/bundles/{bundleId}/DeleteDiscountPrice
   * @secure
   */
  export namespace BundlesDeleteDiscountPriceDelete {
    export type RequestParams = {
      /** Id of the product */
      bundleId: string;
    };
    export type RequestQuery = {
      /** Currency in which the price will be edited */
      Currency: VinistoHelperDllEnumsCurrency;
      /** Price type for delete price. */
      PriceLevel?: VinistoHelperDllEnumsPriceLevel;
      /** Price type for delete price. */
      PriceDiscountType?: VinistoHelperDllEnumsPriceDiscountType;
      /** Identifies type of the country */
      CountryOfSale?: VinistoHelperDllEnumsCountryCode;
      /** Id of discount price. If not set, id is ignored. */
      DiscountId?: string;
      /** @format int32 */
      PlatformId?: number;
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiBundleBundleReturn;
  }

  /**
   * No description
   * @tags BundleEdit
   * @name BundlesGetPricesList
   * @summary Get prices for provided bundleId in target currency (default is CZK).
   * @request GET:/product-api/bundles/{bundleId}/GetPrices
   * @secure
   */
  export namespace BundlesGetPricesList {
    export type RequestParams = {
      bundleId: string;
    };
    export type RequestQuery = {
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
      /**
       * Currency
       * @default "CZK"
       */
      currency?: VinistoHelperDllEnumsCurrency;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiBundlePricesReturn;
  }

  /**
   * No description
   * @tags BundleEdit
   * @name BundlesSetTemporaryUnavailabilityUpdate
   * @summary Set bundle temporary unavailability
   * @request PUT:/product-api/bundles/{bundleId}/set-temporary-unavailability
   * @secure
   */
  export namespace BundlesSetTemporaryUnavailabilityUpdate {
    export type RequestParams = {
      /** Id of the bundle which has changed */
      bundleId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = BundlesSetTemporaryUnavailabilityUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiBundleBundleReturn;
  }

  /**
   * No description
   * @tags BundleEdit
   * @name BundlesSetIsGiftUpdate
   * @summary Set bundle as Gift
   * @request PUT:/product-api/bundles/{bundleId}/set-is-gift
   * @secure
   */
  export namespace BundlesSetIsGiftUpdate {
    export type RequestParams = {
      /** Id of the bundle which has changed */
      bundleId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = BundlesSetIsGiftUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiBundleBundleReturn;
  }

  /**
   * No description
   * @tags BundleEdit
   * @name BundlesSetIsClearanceSaleUpdate
   * @summary Set bundle as ClearanceSale
   * @request PUT:/product-api/bundles/{bundleId}/set-is-clearance-sale
   * @secure
   */
  export namespace BundlesSetIsClearanceSaleUpdate {
    export type RequestParams = {
      /** Id of the bundle which has changed */
      bundleId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = BundlesSetIsClearanceSaleUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiBundleBundleReturn;
  }

  /**
   * No description
   * @tags BundleEdit
   * @name BundlesValidateCompatibleStatesList
   * @summary Validate compatible states for bundle with bundleId and type Flag
   * @request GET:/product-api/bundles/{bundleId}/validate-compatible-states
   * @secure
   */
  export namespace BundlesValidateCompatibleStatesList {
    export type RequestParams = {
      /** Id of the bundle which has checking */
      bundleId: string;
    };
    export type RequestQuery = {
      /**
       * Contains list of possible flag for bundle.
       * Is used for transfering flag to RBMQ
       */
      flag?: VinistoHelperDllEnumsBundleFlag;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoHelperDllBaseBoolReturn;
  }

  /**
   * No description
   * @tags BundleEdit
   * @name BundlesRestoreBundleUpdate
   * @summary Restore provided bundle (mark id_deleted = false)
   * @request PUT:/product-api/bundles/{bundleId}/restore-bundle
   * @secure
   */
  export namespace BundlesRestoreBundleUpdate {
    export type RequestParams = {
      /** Id of the bundle */
      bundleId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = BundlesRestoreBundleUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoHelperDllBaseBaseReturn;
  }

  /**
   * No description
   * @tags BundleEdit
   * @name BundlesSetOrderLimitationUpdate
   * @summary Set order limitation for this bundle
   * @request PUT:/product-api/bundles/{bundleId}/set-order-limitation
   * @secure
   */
  export namespace BundlesSetOrderLimitationUpdate {
    export type RequestParams = {
      /** Id of the bundle to set order limitation */
      bundleId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = BundlesSetOrderLimitationUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiBundleBundleReturn;
  }

  /**
   * No description
   * @tags BundleEdit
   * @name BundlesRemoveOrderLimitationUpdate
   * @summary Remove order limitation from this bundle
   * @request PUT:/product-api/bundles/{bundleId}/remove-order-limitation
   * @secure
   */
  export namespace BundlesRemoveOrderLimitationUpdate {
    export type RequestParams = {
      /** Id of the bundle to remove order limitation */
      bundleId: string;
    };
    export type RequestQuery = {
      /**
       * Identifies type of the country
       * @default "CZ"
       */
      countryCode?: VinistoHelperDllEnumsCountryCode;
    };
    export type RequestBody = BundlesRemoveOrderLimitationUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiBundleBundleReturn;
  }

  /**
   * No description
   * @tags BundleEdit
   * @name BundlesSetCanSendToWmsUpdate
   * @summary Set bundle as CanSendToWms
   * @request PUT:/product-api/bundles/{bundleId}/set-can-send-to-wms
   * @secure
   */
  export namespace BundlesSetCanSendToWmsUpdate {
    export type RequestParams = {
      /** Id of the bundle which has changed */
      bundleId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = BundlesSetCanSendToWmsUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiBundleBundleReturn;
  }

  /**
   * No description
   * @tags BundleEdit
   * @name BundlesAddPlatformPartialUpdate
   * @summary Add available platform to bundle
   * @request PATCH:/product-api/bundles/{bundleId}/add-platform
   * @secure
   */
  export namespace BundlesAddPlatformPartialUpdate {
    export type RequestParams = {
      /** Id of the bundle */
      bundleId: string;
    };
    export type RequestQuery = {
      /**
       * Platform to manipulation available on platforms for bundle
       * @format int32
       */
      PlatformId?: number;
      /** Country code for return result in specific country */
      CountryOfSale?: VinistoHelperDllEnumsCountryCode;
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiBundleBundleReturn;
  }

  /**
   * No description
   * @tags BundleEdit
   * @name BundlesRemovePlatformPartialUpdate
   * @summary Remove available platform from bundle
   * @request PATCH:/product-api/bundles/{bundleId}/remove-platform
   * @secure
   */
  export namespace BundlesRemovePlatformPartialUpdate {
    export type RequestParams = {
      /** Id of the bundle */
      bundleId: string;
    };
    export type RequestQuery = {
      /**
       * Platform to manipulation available on platforms for bundle
       * @format int32
       */
      PlatformId?: number;
      /** Country code for return result in specific country */
      CountryOfSale?: VinistoHelperDllEnumsCountryCode;
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiBundleBundleReturn;
  }

  /**
   * No description
   * @tags BundleEdit
   * @name BundlesSetSellOverUpdate
   * @summary Set the sale is over for bundle with provided  id
   * @request PUT:/product-api/bundles/{bundleId}/set-sell-over
   * @secure
   */
  export namespace BundlesSetSellOverUpdate {
    export type RequestParams = {
      /** Id of the bundle which has changed */
      bundleId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = BundlesSetSellOverUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiBundleBundleReturn;
  }

  /**
   * No description
   * @tags BundleEdit
   * @name BundlesAddAllowedCountryCreate
   * @summary Add allowed country to bundle
   * @request POST:/product-api/bundles/{bundleId}/add-allowed-country
   * @secure
   */
  export namespace BundlesAddAllowedCountryCreate {
    export type RequestParams = {
      /** Id of the bundle */
      bundleId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = BundlesAddAllowedCountryCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiBundleBundleReturn;
  }

  /**
   * No description
   * @tags BundleEdit
   * @name BundlesRemoveAllowedCountryDelete
   * @summary Remove allowed country from bundle
   * @request DELETE:/product-api/bundles/{bundleId}/remove-allowed-country
   * @secure
   */
  export namespace BundlesRemoveAllowedCountryDelete {
    export type RequestParams = {
      /** Id of the delivery */
      bundleId: string;
    };
    export type RequestQuery = {
      /** Country code for allowed country */
      Country: VinistoHelperDllEnumsCountryCode;
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiBundleBundleReturn;
  }

  /**
   * No description
   * @tags BundleEdit
   * @name BundlesBundleSupplierSetChangeStateUpdate
   * @summary Change bundle supplier set state by provided state
   * @request PUT:/product-api/bundles/{bundleId}/bundle-supplier-set-change-state
   * @secure
   */
  export namespace BundlesBundleSupplierSetChangeStateUpdate {
    export type RequestParams = {
      /** Id of the bundle which has changed */
      bundleId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = BundlesBundleSupplierSetChangeStateUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiBundleBundleReturn;
  }

  /**
   * No description
   * @tags BundleEdit
   * @name BundlesSetIsApprovedUpdate
   * @summary Set flag IsApproved for provided bundle
   * @request PUT:/product-api/bundles/{bundleId}/set-is-approved
   * @secure
   */
  export namespace BundlesSetIsApprovedUpdate {
    export type RequestParams = {
      /** Id of the bundle */
      bundleId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = BundlesSetIsApprovedUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiBundleBundleReturn;
  }

  /**
 * No description
 * @tags BundleEdit
 * @name BundlesDeleteSupplierSetDelete
 * @summary Delete supplier set in state concept.
Mandatory conditions: IsSet = true, SetType != None, States.Count > 0, States.Contains(BundleState.Concept)
 * @request DELETE:/product-api/bundles/{bundleId}/delete-supplier-set
 * @secure
*/
  export namespace BundlesDeleteSupplierSetDelete {
    export type RequestParams = {
      /** Id of the bundle */
      bundleId: string;
    };
    export type RequestQuery = {
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoHelperDllBaseBaseReturn;
  }

  /**
 * No description
 * @tags BundleEditSpecification
 * @name BundlesSpecificationsAddCheckBoxSpecificationCreate
 * @summary CheckBox Specification
Add new specification or edit specification value for the provided bundle.
 * @request POST:/product-api/bundles/{bundleId}/specifications/AddCheckBoxSpecification
 * @secure
*/
  export namespace BundlesSpecificationsAddCheckBoxSpecificationCreate {
    export type RequestParams = {
      /** Bundle id as string */
      bundleId: string;
    };
    export type RequestQuery = {};
    export type RequestBody =
      BundlesSpecificationsAddCheckBoxSpecificationCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiBundleBundleReturn;
  }

  /**
 * No description
 * @tags BundleEditSpecification
 * @name BundlesSpecificationsAddMultiComboBoxSpecificationCreate
 * @summary MultiComboBox Specification
Add new specification or edit specification values for the provided bundle.
 * @request POST:/product-api/bundles/{bundleId}/specifications/AddMultiComboBoxSpecification
 * @secure
*/
  export namespace BundlesSpecificationsAddMultiComboBoxSpecificationCreate {
    export type RequestParams = {
      /** Bundle id as string */
      bundleId: string;
    };
    export type RequestQuery = {};
    export type RequestBody =
      BundlesSpecificationsAddMultiComboBoxSpecificationCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiBundleBundleReturn;
  }

  /**
 * No description
 * @tags BundleEditSpecification
 * @name BundlesSpecificationsAddComboBoxSpecificationCreate
 * @summary ComboBox Specification
Add new specification or edit specification value for the provided bundle.
 * @request POST:/product-api/bundles/{bundleId}/specifications/AddComboBoxSpecification
 * @secure
*/
  export namespace BundlesSpecificationsAddComboBoxSpecificationCreate {
    export type RequestParams = {
      /** Bundle id as string */
      bundleId: string;
    };
    export type RequestQuery = {};
    export type RequestBody =
      BundlesSpecificationsAddComboBoxSpecificationCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiBundleBundleReturn;
  }

  /**
 * No description
 * @tags BundleEditSpecification
 * @name BundlesSpecificationsAddNumberSpecificationCreate
 * @summary Number Specification
Add new specification or edit specification value for the provided bundle.
 * @request POST:/product-api/bundles/{bundleId}/specifications/AddNumberSpecification
 * @secure
*/
  export namespace BundlesSpecificationsAddNumberSpecificationCreate {
    export type RequestParams = {
      /** Bundle id as string */
      bundleId: string;
    };
    export type RequestQuery = {};
    export type RequestBody =
      BundlesSpecificationsAddNumberSpecificationCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiBundleBundleReturn;
  }

  /**
 * No description
 * @tags BundleEditSpecification
 * @name BundlesSpecificationsAddNumberImperialSpecificationCreate
 * @summary Imperial Number Specification
Add new specification or edit specification value for the provided bundle.
 * @request POST:/product-api/bundles/{bundleId}/specifications/AddNumberImperialSpecification
 * @secure
*/
  export namespace BundlesSpecificationsAddNumberImperialSpecificationCreate {
    export type RequestParams = {
      /** Bundle id as string */
      bundleId: string;
    };
    export type RequestQuery = {};
    export type RequestBody =
      BundlesSpecificationsAddNumberImperialSpecificationCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiBundleBundleReturn;
  }

  /**
 * No description
 * @tags BundleEditSpecification
 * @name BundlesSpecificationsAddDecimalNumberSpecificationCreate
 * @summary Decimal Number Specification
Add new specification or edit specification value for the provided bundle.
 * @request POST:/product-api/bundles/{bundleId}/specifications/AddDecimalNumberSpecification
 * @secure
*/
  export namespace BundlesSpecificationsAddDecimalNumberSpecificationCreate {
    export type RequestParams = {
      /** Bundle id as string */
      bundleId: string;
    };
    export type RequestQuery = {};
    export type RequestBody =
      BundlesSpecificationsAddDecimalNumberSpecificationCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiBundleBundleReturn;
  }

  /**
 * No description
 * @tags BundleEditSpecification
 * @name BundlesSpecificationsAddDecimalNumberImperialSpecificationCreate
 * @summary Imperial Decimal Number Specification
Add new specification or edit specification value for the provided bundle.
 * @request POST:/product-api/bundles/{bundleId}/specifications/AddDecimalNumberImperialSpecification
 * @secure
*/
  export namespace BundlesSpecificationsAddDecimalNumberImperialSpecificationCreate {
    export type RequestParams = {
      /** Bundle id as string */
      bundleId: string;
    };
    export type RequestQuery = {};
    export type RequestBody =
      BundlesSpecificationsAddDecimalNumberImperialSpecificationCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiBundleBundleReturn;
  }

  /**
 * No description
 * @tags BundleEditSpecification
 * @name BundlesSpecificationsAddTextSpecificationCreate
 * @summary Text Specification
Add new specification or edit specification value for the provided bundle.
 * @request POST:/product-api/bundles/{bundleId}/specifications/AddTextSpecification
 * @secure
*/
  export namespace BundlesSpecificationsAddTextSpecificationCreate {
    export type RequestParams = {
      /** Bundle id as string */
      bundleId: string;
    };
    export type RequestQuery = {};
    export type RequestBody =
      BundlesSpecificationsAddTextSpecificationCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiBundleBundleReturn;
  }

  /**
   * No description
   * @tags BundleEditSpecification
   * @name BundlesSpecificationsDelete
   * @summary Delete specification from provided bundle.
   * @request DELETE:/product-api/bundles/{bundleId}/specifications/{specificationId}
   * @secure
   */
  export namespace BundlesSpecificationsDelete {
    export type RequestParams = {
      bundleId: string;
      specificationId: string;
    };
    export type RequestQuery = {
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
      /**
       * Identifies type of the country
       * @default "CZ"
       */
      countryOfSale?: VinistoHelperDllEnumsCountryCode;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiBundleBundleReturn;
  }

  /**
   * No description
   * @tags Bundles
   * @name BundlesGetBundlesCreate
   * @summary Get Bundles according to provided parameters
   * @request POST:/product-api/bundles/get-bundles
   * @secure
   */
  export namespace BundlesGetBundlesCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BundlesGetBundlesCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiBundleBundlesReturn;
  }

  /**
 * No description
 * @tags Bundles
 * @name BundlesGetAutocompleteNamesList
 * @summary Find and get bundles, bundles will be searched according to the entered letters (min. 3)
It will return bundle only in provided language.
 * @request GET:/product-api/bundles/get-autocomplete-names
 * @secure
*/
  export namespace BundlesGetAutocompleteNamesList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** Language identifying product lang version. */
      language?: VinistoHelperDllEnumsLanguage;
      /** Searching string in provided language. */
      searchingNameString?: string;
      IsCache?: boolean;
      /** Specify requested price levels to be loaded for all requested platforms. */
      priceLevels?: VinistoHelperDllEnumsPriceLevel[];
      /**
       * Currency
       * @default "CZK"
       */
      currency?: VinistoHelperDllEnumsCurrency;
      /**
       * Number of returned items
       * @format int32
       * @default 5
       */
      limit?: number;
      /**
       * Flag to get hidden specification
       * @default false
       */
      hiddenSpecification?: boolean;
      /**
       * If true search only between mark as deleted bundles, if false search only between mark as not deleted bundles, if not provided search all bundles
       * @default false
       */
      isDeleted?: boolean;
      /**
       * If true search only between mark as active bundles, if false search only between mark as not active bundles, if not provided search all bundles
       * @default true
       */
      isEnabled?: boolean;
      /**
       * If true search only between mark as gift bundles, if false search only between mark as not gift bundles, if not provided search all bundles
       * @default false
       */
      isGift?: boolean;
      /** If true search only between mark as temporary unavailable bundles, if false search only between mark as not temporary unavailable bundles, if not provided search all bundles */
      isTemporaryUnavailable?: boolean;
      /** If true search only between mark as set bundles, if false search only between mark as not set bundles, if not provided search all bundles */
      isSet?: boolean;
      /** If true search only between mark as is sale over bundles, if false search only between mark as is not sale over bundles, if not provided search all bundles */
      isSaleOver?: boolean;
      /** If true search only between mark as is approved bundles, if false search only between mark as is not is approved bundles, if not provided search all bundles */
      isApproved?: boolean;
      /**
       * Filter bundles by ids which are defined for shipping packaging. If true, then shipping packaging bundles are allowed in response, else are removed from response. Default is false (are not in response)
       * @default false
       */
      searchIsBundleShippingPackaging?: boolean;
      /**
       * Flag to enable / disable prices filtering in bundle response. Default is true = prices are filtered by platform id and levels.
       * @default true
       */
      filterPrices?: boolean;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoSearchDllModelsApiFullSearchFullSearchSeparatedReturn;
  }

  /**
   * No description
   * @tags Bundles
   * @name BundlesDetail
   * @summary Get bundle for provided ID
   * @request GET:/product-api/bundles/{bundleId}
   * @secure
   */
  export namespace BundlesDetail {
    export type RequestParams = {
      /** Id of the bundle to get */
      bundleId: string;
    };
    export type RequestQuery = {
      /** Language in which the bundle will be received...can be omitted in this case all language versions will ve returned */
      language?: VinistoHelperDllEnumsLanguage;
      IsCache?: boolean;
      /** Specify requested price levels to be loaded for all requested platforms. */
      priceLevels?: VinistoHelperDllEnumsPriceLevel[];
      /**
       * Currency
       * @default "CZK"
       */
      currency?: VinistoHelperDllEnumsCurrency;
      /**
       * Flag to show tags by IsEnabled in bundles response. If isHiddenTags = false, then show only tags with IsEnabled = true. If IsHiddenTags = true, then show all tags.
       * @default false
       */
      isHiddenTags?: boolean;
      /** If provided then returned bundle must be allowed to sale in country. Default is null, all bundles can be returned. */
      countryOfSale?: VinistoHelperDllEnumsCountryCode;
      /**
       * Filter bundles by ids which are defined for shipping packaging. If true, then shipping packaging bundles are allowed in response, else are removed from response. Default is false (are not in response)
       * @default false
       */
      searchIsBundleShippingPackaging?: boolean;
      /**
       * Flag to whether include hidden specifications. By default set to True.
       * @default true
       */
      showHiddenSpecification?: boolean;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiBundleBundleReturn;
  }

  /**
   * No description
   * @tags Bundles
   * @name BundlesDelete
   * @summary Delete provided bundle (mark as deleted)
   * @request DELETE:/product-api/bundles/{bundleId}
   * @secure
   */
  export namespace BundlesDelete {
    export type RequestParams = {
      /** Id of the bundle */
      bundleId: string;
    };
    export type RequestQuery = {
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoHelperDllBaseBaseReturn;
  }

  /**
   * No description
   * @tags Bundles
   * @name BundlesGetSetBundleList
   * @summary Get necessary bundle properties to show detail when create bundle
   * @request GET:/product-api/bundles/{bundleId}/get-set-bundle
   * @secure
   */
  export namespace BundlesGetSetBundleList {
    export type RequestParams = {
      /** Id of the bundle to get */
      bundleId: string;
    };
    export type RequestQuery = {
      /**
       * Contains list of possible languages
       * @default "CZECH"
       */
      language?: VinistoHelperDllEnumsLanguage;
      /**
       * Currency
       * @default "CZK"
       */
      currency?: VinistoHelperDllEnumsCurrency;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoProductDllModelsApiBundleSetSupplierBundleReturn;
  }

  /**
   * No description
   * @tags Bundles
   * @name BundlesGetSupplierSetsList
   * @summary Get all supplier sets with necessary bundles properties that were created by supplier
   * @request GET:/product-api/bundles/get-supplier-sets
   * @secure
   */
  export namespace BundlesGetSupplierSetsList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** Filter bundle sets by suppliers id */
      SupplierId: string;
      /** If provided search by bundle name */
      BundleName?: string;
      /**
       * Flag to search bundles by states
       * If BundleStates = null, then return all confirmed bundles.
       * If BundleStates.Count > 0, then return bundles with state in states.
       */
      BundleStates?: VinistoHelperDllEnumsBundleBundleState[];
      /**
       * Flag to search bundles by states
       * If BundleStates = null, then return all bundles.
       * If BundleStates.Count > 0, then return bundles with state in states.
       */
      SetType?: VinistoHelperDllEnumsBundleSetType;
      /**
       * Language version - if provided, all bundles will be only in selected language.
       * Sorting and searching will be according to the specified language
       * Otherwise all language version will be provided and sorting and searching will be according to the default language (CZECH).
       */
      Language?: VinistoHelperDllEnumsLanguage;
      /** Return currency in target currency, otherwise return default CZK. */
      Currency?: VinistoHelperDllEnumsCurrency;
      /** If provided, sorting will be done according to this column. if not provided, default sorting is done by Id */
      SortingColumn?: VinistoHelperDllEnumsBundleSortableColumnsSet;
      /** True in case that sorting shall be done in descending order */
      IsSortingDescending?: boolean;
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
      /** Define price level when sort bundles by price */
      SortingPriceLevel?: VinistoHelperDllEnumsPriceLevel;
      /**
       * Only for cache purposes. Is set automatically by endpoint api key.
       * @format int32
       */
      PlatformId?: number;
      IsCache?: boolean;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoProductDllModelsApiBundleSetsSupplierBundleReturn;
  }

  /**
   * No description
   * @tags Bundles
   * @name BundlesGetSpecifcationsStringList
   * @summary Get bundle specifications as string
   * @request GET:/product-api/bundles/{bundleId}/get-specifcations-string
   * @secure
   */
  export namespace BundlesGetSpecifcationsStringList {
    export type RequestParams = {
      /** Id of the bundle to get */
      bundleId: string;
    };
    export type RequestQuery = {
      /**
       * Contains list of possible languages
       * @default "CZECH"
       */
      language?: VinistoHelperDllEnumsLanguage;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = string;
  }

  /**
   * No description
   * @tags Bundles
   * @name BundlesGetOtherSuppliersList
   * @summary Get bundles with same products for provided bundle ID
   * @request GET:/product-api/bundles/{bundleId}/GetOtherSuppliers
   * @secure
   */
  export namespace BundlesGetOtherSuppliersList {
    export type RequestParams = {
      /** Id of the bundle */
      bundleId: string;
    };
    export type RequestQuery = {
      IsCache?: boolean;
      /**
       * Currency
       * @default "CZK"
       */
      currency?: VinistoHelperDllEnumsCurrency;
      /**
       * Identifies type of the country
       * @default "CZ"
       */
      countryOfSale?: VinistoHelperDllEnumsCountryCode;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiBundleBundlesReturn;
  }

  /**
   * No description
   * @tags Bundles
   * @name BundlesGetBundleByUrlList
   * @summary Get bundle for provided url
   * @request GET:/product-api/bundles/{bundleUrl}/get-bundle-by-url
   * @secure
   */
  export namespace BundlesGetBundleByUrlList {
    export type RequestParams = {
      /** URL of the bundle to get */
      bundleUrl: string;
    };
    export type RequestQuery = {
      /** Language in which the bundle will be received. Returns all languages if not provided. */
      language?: VinistoHelperDllEnumsLanguage;
      /** Specify requested price levels to be loaded for all requested platforms. */
      priceLevels?: VinistoHelperDllEnumsPriceLevel[];
      IsCache?: boolean;
      /**
       * Currency
       * @default "CZK"
       */
      currency?: VinistoHelperDllEnumsCurrency;
      /**
       * Identifies type of the country
       * @default "CZ"
       */
      countryOfSale?: VinistoHelperDllEnumsCountryCode;
      /**
       * Filter bundles by ids which are defined for shipping packaging. If true, then shipping packaging bundles are allowed in response, else are removed from response. Default is false (are not in response)
       * @default false
       */
      searchIsBundleShippingPackaging?: boolean;
      /**
       * Flag to whether include hidden specifications. By default set to False.
       * @default false
       */
      showHiddenSpecification?: boolean;
      /**
       * Enum which specifies what extra data should be returned for bundle.
       * Used in LoadDataApiService bundle methods.
       * @default "All"
       */
      extraData?: VinistoHelperDllEnumsBundleExtraBundleData;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiBundleBundleReturn;
  }

  /**
   * No description
   * @tags Bundles
   * @name BundlesCreate
   * @summary Create new bundle from provided parameters
   * @request POST:/product-api/bundles
   * @secure
   */
  export namespace BundlesCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BundlesCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiBundleBundleReturn;
  }

  /**
   * No description
   * @tags Bundles
   * @name BundlesCreateSupplierSetBundleCreate
   * @summary Create new supplier set bundle from provided parameters
   * @request POST:/product-api/bundles/CreateSupplierSetBundle
   * @secure
   */
  export namespace BundlesCreateSupplierSetBundleCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BundlesCreateSupplierSetBundleCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiBundleBundleReturn;
  }

  /**
   * No description
   * @tags Bundles
   * @name BundlesGetBundlesByFullSearchList
   * @summary Search text in all text columns of Bundle collection.
   * @request GET:/product-api/bundles/GetBundlesByFullSearch
   * @secure
   */
  export namespace BundlesGetBundlesByFullSearchList {
    export type RequestParams = {};
    export type RequestQuery = {
      UserLoginHash?: string;
      SearchString?: string;
      Language?: VinistoHelperDllEnumsLanguage;
      /** Currency */
      Currency?: VinistoHelperDllEnumsCurrency;
      /** @format int32 */
      Limit?: number;
      /** @format int32 */
      Offset?: number;
      IsMainImagesOnly?: boolean;
      /** Identifies type of the country */
      CountryOfSale?: VinistoHelperDllEnumsCountryCode;
      IsCache?: boolean;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiBundleBundlesReturn;
  }

  /**
   * No description
   * @tags Bundles
   * @name BundlesGetLastViewedList
   * @summary Find and get all bundles sorted by lastView
   * @request GET:/product-api/bundles/get-last-viewed
   * @secure
   */
  export namespace BundlesGetLastViewedList {
    export type RequestParams = {};
    export type RequestQuery = {
      IsCache?: boolean;
      /** Specify requested price levels to be loaded for all requested platforms. */
      priceLevels?: VinistoHelperDllEnumsPriceLevel[];
      /**
       * Currency
       * @default "CZK"
       */
      currency?: VinistoHelperDllEnumsCurrency;
      /**
       * Shift direction
       * @default true
       */
      isSortingDescending?: boolean;
      /**
       * Number of records to be retrieved
       * @format int32
       * @default 10
       */
      limit?: number;
      /**
       * Number of records to be skipped
       * @format int32
       * @default 0
       */
      offset?: number;
      /**
       * Flag to select bundles in stock (stock quantity greater than zero). Default is true
       * @default true
       */
      isInStock?: boolean;
      /**
       * Flag to filter response by IsDeleted
       * @default false
       */
      isDeleted?: boolean;
      /**
       * Flag to filter response by IsEnabled
       * @default true
       */
      isEnabled?: boolean;
      /** Flag to filter response by IsGift */
      isGIft?: boolean;
      /** Flag to filter response by TemporaryUnavailable */
      isTemporaryUnavailable?: boolean;
      /** Flag to filter response by IsSaleOver */
      isSaleOver?: boolean;
      /**
       * Identifies type of the country
       * @default "CZ"
       */
      countryOfSale?: VinistoHelperDllEnumsCountryCode;
      /**
       * Filter bundles by ids which are defined for shipping packaging. If true, then shipping packaging bundles are allowed in response, else are removed from response. Default is false (are not in response)
       * @default false
       */
      searchIsBundleShippingPackaging?: boolean;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiBundleBundlesReturn;
  }

  /**
   * No description
   * @tags Bundles
   * @name BundlesGetBundlesStockingList
   * @summary Find and get all bundles for stocking
   * @request GET:/product-api/bundles/GetBundlesStocking
   * @secure
   */
  export namespace BundlesGetBundlesStockingList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** If provided search by warehouseId in product */
      SearchWarehouseId?: string;
      /** If provided search by name in bundles */
      SearchName?: string;
      /** If provided search by supplier id in bundles */
      SearchSupplierId?: string;
      /**
       * Language of the requested category
       * Language version - if provided, all bundles will be only in selected language.
       * Sorting and searching will be according to the specified language
       * Otherwise all language version will be provided and sorting and searching will be according to the default language (CZECH).
       */
      Language?: VinistoHelperDllEnumsLanguage;
      /** In what currency prices will be returned. */
      Currency?: VinistoHelperDllEnumsCurrency;
      /** If provided search by batch in bundles specification "Šarže" */
      SearchBatch?: string;
      /** If provided search by kind in bundles specification "Druh" */
      SearchKind?: string;
      /** If provided search by type in bundles specification "Typ" */
      SearchType?: string;
      /** If provided search by categorization in bundles specification "Kategorizace" */
      SearchCategorization?: string;
      /**
       * If provided search by warehouse amount
       * @format int32
       */
      SearchAmount?: number;
      /**
       * Flag to filter bundles by IsDelted.
       * If true, then return bundles with IsDeleted = true.
       * If false, then return bundles with IsDelted = false.
       */
      IsDeleted?: boolean;
      /**
       * Flag to filter bundles by IsEnabled.
       * If true, then return bundles with IsEnabled = true.
       * If false, then return bundles with IsEnabled = false.
       */
      IsEnabled?: boolean;
      /** Search by amount filter type in warehouse */
      AmountFilter?: VinistoHelperDllEnumsBundleAmountFilter;
      /** If provided, sorting will be done according to this column. if not provided, default sorting is done by Id */
      SortingColumn?: VinistoHelperDllEnumsBundleSortableColumnsStocking;
      /** True in case that sorting shall be done in descending order */
      IsSortingDescending?: boolean;
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
      /** Flag to get data from cache */
      IsCache?: boolean;
      /** Filter bundles by ids which are defined for shipping packaging. If true, then shipping packaging bundles are allowed in response, else are removed from response. Default is fale (are not in response) */
      SearchIsBundleShippingPackaging?: boolean;
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiBundleBundlesReturn;
  }

  /**
   * No description
   * @tags Bundles
   * @name BundlesEnableBundlesUpdate
   * @summary Enable provided bundles
   * @request PUT:/product-api/bundles/EnableBundles
   * @secure
   */
  export namespace BundlesEnableBundlesUpdate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BundlesEnableBundlesUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiBundleBundlesReturn;
  }

  /**
   * No description
   * @tags Bundles
   * @name BundlesDisableBundlesUpdate
   * @summary Disable provided bundles
   * @request PUT:/product-api/bundles/DisableBundles
   * @secure
   */
  export namespace BundlesDisableBundlesUpdate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BundlesDisableBundlesUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiBundleBundlesReturn;
  }

  /**
   * No description
   * @tags Bundles
   * @name BundlesGetIdenticalBundlesList
   * @summary Load identical bundles (bundles with same products and amounts) for bundle by id.
   * @request GET:/product-api/bundles/{bundleId}/get-identical-bundles
   * @secure
   */
  export namespace BundlesGetIdenticalBundlesList {
    export type RequestParams = {
      bundleId: string;
    };
    export type RequestQuery = {
      /** Contains list of possible languages */
      Language?: VinistoHelperDllEnumsLanguage;
      IsCache?: boolean;
      /** Specify requested price levels to be loaded for all requested platforms. */
      priceLevels?: VinistoHelperDllEnumsPriceLevel[];
      /**
       * Currency
       * @default "CZK"
       */
      currency?: VinistoHelperDllEnumsCurrency;
      /** If defined, then return identical bundles allowed to sale in provided country. If not set (default), then return all identical bundles. */
      countryOfSale?: VinistoHelperDllEnumsCountryCode;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiBundleBundlesReturn;
  }

  /**
 * No description
 * @tags Bundles
 * @name BundlesGetUniqueBundlesByScoringCreate
 * @summary Get unique bundles.
Uniqueness is ensured by grouping by bundle.items (productId and quantity) and subsequent selection of bundles with the highest scoring from the given groups.
 * @request POST:/product-api/bundles/get-unique-bundles-by-scoring
 * @secure
*/
  export namespace BundlesGetUniqueBundlesByScoringCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BundlesGetUniqueBundlesByScoringCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiBundleBundlesReturn;
  }

  /**
   * No description
   * @tags Bundles
   * @name BundlesGetAvailableFiltersCreate
   * @summary Get available filters
   * @request POST:/product-api/bundles/get-available-filters
   * @secure
   */
  export namespace BundlesGetAvailableFiltersCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BundlesGetAvailableFiltersCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoProductDllModelsApiBundleBundlesFilterReturn;
  }

  /**
   * No description
   * @tags Bundles
   * @name BundlesGetBundlesCategoriesCreate
   * @summary Get categories for bundles
   * @request POST:/product-api/bundles/get-bundles-categories
   * @secure
   */
  export namespace BundlesGetBundlesCategoriesCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BundlesGetBundlesCategoriesCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoProductDllModelsApiCategoryCategoriesReturn;
  }

  /**
   * No description
   * @tags Bundles
   * @name BundlesSetOrderLimitationsUpdate
   * @summary Set OrderLimitation for provided bundles
   * @request PUT:/product-api/bundles/set-order-limitations
   * @secure
   */
  export namespace BundlesSetOrderLimitationsUpdate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BundlesSetOrderLimitationsUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiBundleBundlesReturn;
  }

  /**
   * No description
   * @tags Bundles
   * @name BundlesRemoveOrderLimitationsUpdate
   * @summary Remove OrderLimitation for provided bundles
   * @request PUT:/product-api/bundles/remove-order-limitations
   * @secure
   */
  export namespace BundlesRemoveOrderLimitationsUpdate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BundlesRemoveOrderLimitationsUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiBundleBundlesReturn;
  }

  /**
   * No description
   * @tags Bundles
   * @name BundlesGetBundleGiftsList
   * @summary Get gifts for bundle based of bundle categories / specifications / supplier in target currency.
   * @request GET:/product-api/bundles/{bundleId}/get-bundle-gifts
   * @secure
   */
  export namespace BundlesGetBundleGiftsList {
    export type RequestParams = {
      bundleId: string;
    };
    export type RequestQuery = {
      /**
       * Currency
       * @default "CZK"
       */
      currency?: VinistoHelperDllEnumsCurrency;
      /**
       * Identifies type of the country
       * @default "CZ"
       */
      countryOfSale?: VinistoHelperDllEnumsCountryCode;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoGiftsDllModelsApiGiftRuleGiftRulesReturn;
  }

  /**
   * No description
   * @tags Bundles
   * @name BundlesGetSpecificationValuesList
   * @summary Get specification values for bundle
   * @request GET:/product-api/bundles/{bundleId}/get-specification-values
   * @secure
   */
  export namespace BundlesGetSpecificationValuesList {
    export type RequestParams = {
      bundleId: string;
    };
    export type RequestQuery = {
      specificationId?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoProductDllModelsApiSpecificationSpecificationValuesReturn;
  }

  /**
   * No description
   * @tags Bundles
   * @name BundlesByProductDetail
   * @summary Get all bundles which contains given product
   * @request GET:/product-api/bundles/by-product/{productId}
   * @secure
   */
  export namespace BundlesByProductDetail {
    export type RequestParams = {
      /** Id of the product that should be contained in bundles */
      productId: string;
    };
    export type RequestQuery = {
      /** Contains list of possible languages */
      Language?: VinistoHelperDllEnumsLanguage;
      IsCache?: boolean;
      /**
       * Currency
       * @default "CZK"
       */
      currency?: VinistoHelperDllEnumsCurrency;
      /**
       * Identifies type of the country
       * @default "CZ"
       */
      countryOfSale?: VinistoHelperDllEnumsCountryCode;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiBundleBundlesReturn;
  }

  /**
   * No description
   * @tags Bundles
   * @name BundlesByIdsList
   * @summary Get bundles for provided bundle ids. No authorization.
   * @request GET:/product-api/bundles/by-ids
   * @secure
   */
  export namespace BundlesByIdsList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** List of bundle id */
      bundleIds?: string[];
      /** Specify requested price levels to be loaded for all requested platforms. */
      priceLevels?: VinistoHelperDllEnumsPriceLevel[];
      /**
       * Currency
       * @default "CZK"
       */
      currency?: VinistoHelperDllEnumsCurrency;
      /** If provided only specific language will be return */
      language?: VinistoHelperDllEnumsLanguage;
      /**
       * If provided hidden tags will be added
       * @default false
       */
      isHiddenTags?: boolean;
      /**
       * If true, only main images will be loaded
       * @default false
       */
      isMainImagesOnly?: boolean;
      /**
       * Identifies type of the country
       * @default "CZ"
       */
      countryOfSale?: VinistoHelperDllEnumsCountryCode;
      /**
       * Enum which specifies what extra data should be returned for bundle.
       * Used in LoadDataApiService bundle methods.
       * @default "All"
       */
      extraData?: VinistoHelperDllEnumsBundleExtraBundleData;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiBundleBundlesReturn;
  }

  /**
   * No description
   * @tags Bundles
   * @name BundlesGetBundleVolumeDiscountList
   * @summary Get volume discount price from bundle for user price level.
   * @request GET:/product-api/bundles/{bundleId}/get-bundle-volume-discount
   * @secure
   */
  export namespace BundlesGetBundleVolumeDiscountList {
    export type RequestParams = {
      /** Bundle id */
      bundleId: string;
    };
    export type RequestQuery = {
      /**
       * Currency
       * @default "CZK"
       */
      currency?: VinistoHelperDllEnumsCurrency;
      /** User login hash. If is provided, then return price for signed user price level. Otherwise return price for level B2cLevel1. */
      userLoginHash?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiBundleBundlesReturn;
  }

  /**
   * No description
   * @tags Bundles
   * @name BundlesGetShippingPackagingBundlesList
   * @summary Get bundles for shipping packaging.
   * @request GET:/product-api/bundles/get-shipping-packaging-bundles
   * @secure
   */
  export namespace BundlesGetShippingPackagingBundlesList {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * Currency
       * @default "CZK"
       */
      currency?: VinistoHelperDllEnumsCurrency;
      /**
       * Identifies type of the country
       * @default "CZ"
       */
      countryOfSale?: VinistoHelperDllEnumsCountryCode;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiBundleBundlesReturn;
  }

  /**
   * No description
   * @tags Bundles
   * @name BundlesGetBundlesForBasketValidationList
   * @summary Get Bundles for basket validation.
   * @request GET:/product-api/bundles/get-bundles-for-basket-validation
   * @secure
   */
  export namespace BundlesGetBundlesForBasketValidationList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** List of bundle id for basket validation. */
      bundleIds?: string[];
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiBundleBundlesReturn;
  }

  /**
   * No description
   * @tags Bundles
   * @name BundlesSetsList
   * @summary Gets list of bundle ids that have the parameter "is_set:true" and contain specified bundleId (in items property).
   * @request GET:/product-api/bundles/{bundleId}/sets
   * @secure
   */
  export namespace BundlesSetsList {
    export type RequestParams = {
      /** Bundle id. */
      bundleId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiBundleBundleIdsReturn;
  }

  /**
   * No description
   * @tags Bundles
   * @name BundlesSendEmailToSupplierCreate
   * @summary Send email to bundle supplier.
   * @request POST:/product-api/bundles/{bundleId}/send-email-to-supplier
   * @secure
   */
  export namespace BundlesSendEmailToSupplierCreate {
    export type RequestParams = {
      /** Bundle id. */
      bundleId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = BundlesSendEmailToSupplierCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoHelperDllBaseBoolReturn;
  }

  /**
   * No description
   * @tags Categories
   * @name CategoriesList
   * @summary Get Categories according to provided parameters
   * @request GET:/product-api/categories
   * @secure
   */
  export namespace CategoriesList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** If provided search by url in categories */
      SearchUrl?: string;
      /** If provided search by name in categories */
      SearchName?: string;
      /** If true, searchName is used as StartWith instead of Contains */
      IsSearchNameAutocomplete?: boolean;
      /**
       * Language of the requested category
       * Language version - if provided, all categories will be only in selected language.
       * Sorting and searching will be according to the specified language
       * Otherwise all language version will be provided and sorting and searching will be according to the default language (CZECH).
       */
      Language?: VinistoHelperDllEnumsLanguage;
      /**
       * Can filter category type Static/Dynamic
       * if it is null, all are returned, if one is selected, only categories with selected types are returned.
       */
      Type?: VinistoHelperDllEnumsCategoryCategoryType;
      /** If provided, sorting will be done according to this column. if not provided, default sorting is done by Id */
      SortingColumn?: VinistoHelperDllEnumsCategorySortableColumns;
      /** True in case that sorting shall be done in descending order */
      IsSortingDescending?: boolean;
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
      /**
       * Flag to search categories by platform
       * If Platform = null, then return all categories.
       * @format int32
       */
      Platform?: number;
      /**
       * Filter by country of sale.
       * If provided, only categories with this country in AllowedSearchCountries are returned.
       */
      CountryOfSale?: VinistoHelperDllEnumsCountryCode;
      IsCache?: boolean;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoProductDllModelsApiCategoryCategoriesReturn;
  }

  /**
   * No description
   * @tags Categories
   * @name CategoriesCreate
   * @summary Create new category with provided parameters
   * @request POST:/product-api/categories
   * @secure
   */
  export namespace CategoriesCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CategoriesCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiCategoryCategoryReturn;
  }

  /**
   * No description
   * @tags Categories
   * @name CategoriesGetCategoriesByIdsList
   * @summary Get Categories by provided category ids
   * @request GET:/product-api/categories/GetCategoriesByIds
   * @secure
   */
  export namespace CategoriesGetCategoriesByIdsList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** Search all categories by provided category ids */
      CategoryIds?: string[];
      /**
       * Language of the requested category
       * Language version - if provided, all categories will be only in selected language.
       * Sorting and searching will be according to the specified language
       * Otherwise all language version will be provided and sorting and searching will be according to the default language (CZECH).
       */
      Language?: VinistoHelperDllEnumsLanguage;
      /** If provided, sorting will be done according to this column. if not provided, default sorting is done by Id */
      SortingColumn?: VinistoHelperDllEnumsCategorySortableColumns;
      /** True in case that sorting shall be done in descending order */
      IsSortingDescending?: boolean;
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
      IsCache?: boolean;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoProductDllModelsApiCategoryCategoriesReturn;
  }

  /**
 * No description
 * @tags Categories
 * @name CategoriesGetAutocompleteNamesList
 * @summary Find and get categories, categories will be searched according to the entered letters (min. 3)
It will return categories only in provided language.
 * @request GET:/product-api/categories/GetAutocompleteNames
 * @secure
*/
  export namespace CategoriesGetAutocompleteNamesList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** Contains list of possible languages */
      language?: VinistoHelperDllEnumsLanguage;
      /** Searching string in provided language. */
      searchingNameString?: string;
      IsCache?: boolean;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoProductDllModelsApiCategoryCategoriesReturn;
  }

  /**
   * No description
   * @tags Categories
   * @name CategoriesGetCategoriesByFullSearchList
   * @summary Search text in all text columns of Category collection.
   * @request GET:/product-api/categories/GetCategoriesByFullSearch
   * @secure
   */
  export namespace CategoriesGetCategoriesByFullSearchList {
    export type RequestParams = {};
    export type RequestQuery = {
      UserLoginHash?: string;
      SearchString?: string;
      Language?: VinistoHelperDllEnumsLanguage;
      /** Currency */
      Currency?: VinistoHelperDllEnumsCurrency;
      /** @format int32 */
      Limit?: number;
      /** @format int32 */
      Offset?: number;
      IsMainImagesOnly?: boolean;
      /** Identifies type of the country */
      CountryOfSale?: VinistoHelperDllEnumsCountryCode;
      IsCache?: boolean;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoProductDllModelsApiCategoryCategoriesReturn;
  }

  /**
   * No description
   * @tags Category
   * @name CategoriesDetail
   * @summary Get category for provided ID
   * @request GET:/product-api/categories/{categoryId}
   * @secure
   */
  export namespace CategoriesDetail {
    export type RequestParams = {
      /** Id of the category to get */
      categoryId: string;
    };
    export type RequestQuery = {
      /** Language in which the category will be received */
      language?: VinistoHelperDllEnumsLanguage;
      IsCache?: boolean;
      /**
       * Flag to show tags by IsEnabled in category response. If isHiddenTags = false, then show only tags with IsEnabled = true. If IsHiddenTags = true, then show all tags.
       * @default false
       */
      isHiddenTags?: boolean;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiCategoryCategoryReturn;
  }

  /**
   * No description
   * @tags Category
   * @name CategoriesUpdate
   * @summary Update category
   * @request PUT:/product-api/categories/{categoryId}
   * @secure
   */
  export namespace CategoriesUpdate {
    export type RequestParams = {
      /** Id of the category */
      categoryId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = CategoriesUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiCategoryCategoryReturn;
  }

  /**
   * No description
   * @tags Category
   * @name CategoriesDelete
   * @summary Deletes category identified by category id
   * @request DELETE:/product-api/categories/{categoryId}
   * @secure
   */
  export namespace CategoriesDelete {
    export type RequestParams = {
      /** Id of the category */
      categoryId: string;
    };
    export type RequestQuery = {
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoHelperDllBaseBaseReturn;
  }

  /**
   * No description
   * @tags Category
   * @name CategoriesGetCategoryByUrlList
   * @summary Get category for provided URL
   * @request GET:/product-api/categories/{categoryUrl}/GetCategoryByUrl
   * @secure
   */
  export namespace CategoriesGetCategoryByUrlList {
    export type RequestParams = {
      /** URL of the category to get */
      categoryUrl: string;
    };
    export type RequestQuery = {
      /** Language in which the category will be received */
      language?: VinistoHelperDllEnumsLanguage;
      IsCache?: boolean;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiCategoryCategoryReturn;
  }

  /**
   * No description
   * @tags Category
   * @name CategoriesSpecificationsList
   * @summary Get all specifications for provided category
   * @request GET:/product-api/categories/{categoryId}/specifications
   * @secure
   */
  export namespace CategoriesSpecificationsList {
    export type RequestParams = {
      /** Id of the category to get all specifications */
      categoryId: string;
    };
    export type RequestQuery = {
      IsCache?: boolean;
      /**
       * Flag to get hidden specifications
       * @default false
       */
      hiddenSpecification?: boolean;
      /**
       * Currency
       * @default "CZK"
       */
      currency?: VinistoHelperDllEnumsCurrency;
      /**
       * Price level for loading prices to specification
       * @default "Level1"
       */
      priceLevel?: VinistoHelperDllEnumsPriceLevel;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoProductDllModelsApiSpecificationSpecificationsReturn;
  }

  /**
   * No description
   * @tags Category
   * @name CategoriesSubcategoriesList
   * @summary Get all subcategories for provided category
   * @request GET:/product-api/categories/{categoryId}/subcategories
   * @secure
   */
  export namespace CategoriesSubcategoriesList {
    export type RequestParams = {
      /** Id of the category to get all subcategories */
      categoryId: string;
    };
    export type RequestQuery = {
      IsCache?: boolean;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoProductDllModelsApiCategoryCategoriesReturn;
  }

  /**
   * No description
   * @tags Category
   * @name CategoriesAddPlatformPartialUpdate
   * @summary Add available platform to category
   * @request PATCH:/product-api/categories/{categoryId}/add-platform
   * @secure
   */
  export namespace CategoriesAddPlatformPartialUpdate {
    export type RequestParams = {
      /** Id of the category */
      categoryId: string;
    };
    export type RequestQuery = {
      /**
       * Platform to manipulation available on platforms for category
       * @format int32
       */
      Platform?: number;
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiCategoryCategoryReturn;
  }

  /**
   * No description
   * @tags Category
   * @name CategoriesRemovePlatformPartialUpdate
   * @summary Remove available platform from bundle
   * @request PATCH:/product-api/categories/{categoryId}/remove-platform
   * @secure
   */
  export namespace CategoriesRemovePlatformPartialUpdate {
    export type RequestParams = {
      /** Id of the categoryId */
      categoryId: string;
    };
    export type RequestQuery = {
      /**
       * Platform to manipulation available on platforms for category
       * @format int32
       */
      Platform?: number;
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiCategoryCategoryReturn;
  }

  /**
   * No description
   * @tags Category
   * @name CategoriesBundleDiscountFilterPartialUpdate
   * @summary Change category bundle listing discount filter.
   * @request PATCH:/product-api/categories/{categoryId}/bundle-discount-filter
   * @secure
   */
  export namespace CategoriesBundleDiscountFilterPartialUpdate {
    export type RequestParams = {
      /** Id of the category */
      categoryId: string;
    };
    export type RequestQuery = {
      /** Discount filter applied by default when listing bundles in this category. */
      BundleDiscountFilter?: VinistoHelperDllEnumsCategoryCategoryBundleDiscountFilter;
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiCategoryCategoryReturn;
  }

  /**
   * No description
   * @tags Category
   * @name CategoriesAddAllowedSearchCountryPartialUpdate
   * @summary Add allowed search countries to category
   * @request PATCH:/product-api/categories/{categoryId}/add-allowed-search-country
   * @secure
   */
  export namespace CategoriesAddAllowedSearchCountryPartialUpdate {
    export type RequestParams = {
      /** Id of the category */
      categoryId: string;
    };
    export type RequestQuery = {
      /** List of country codes for which this category is allowed to be searched in elasticsearch. */
      AllowedSearchCountries: VinistoHelperDllEnumsCountryCode[];
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiCategoryCategoryReturn;
  }

  /**
   * No description
   * @tags Category
   * @name CategoriesRemoveAllowedSearchCountryPartialUpdate
   * @summary Remove allowed search countries from category
   * @request PATCH:/product-api/categories/{categoryId}/remove-allowed-search-country
   * @secure
   */
  export namespace CategoriesRemoveAllowedSearchCountryPartialUpdate {
    export type RequestParams = {
      /** Id of the category */
      categoryId: string;
    };
    export type RequestQuery = {
      /** List of country codes for which this category is allowed to be searched in elasticsearch. */
      AllowedSearchCountries: VinistoHelperDllEnumsCountryCode[];
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiCategoryCategoryReturn;
  }

  /**
   * No description
   * @tags Category
   * @name CategoriesBundlescountList
   * @summary Get count of bundles for category
   * @request GET:/product-api/categories/{categoryId}/bundlescount
   * @secure
   */
  export namespace CategoriesBundlescountList {
    export type RequestParams = {
      /** Id of the category to get bundles count */
      categoryId: string;
    };
    export type RequestQuery = {
      /** If is provided, then return bundles count allowed to sale in provided country. Default is null. */
      countryOfSale?: VinistoHelperDllEnumsCountryCode;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoProductDllModelsApiCommonBundlesCountReturn;
  }

  /**
   * No description
   * @tags Category
   * @name CategoriesRemoveLanguageUpdate
   * @summary Remove values for language from category
   * @request PUT:/product-api/categories/{categoryId}/remove-language
   * @secure
   */
  export namespace CategoriesRemoveLanguageUpdate {
    export type RequestParams = {
      /** Id of the category */
      categoryId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = CategoriesRemoveLanguageUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoHelperDllBaseBaseReturn;
  }

  /**
   * No description
   * @tags Category
   * @name CategoriesModifyCategoryParentUpdate
   * @summary Add / edit parent category to provided category defined by id. If category has parent, then parent is overwritten.
   * @request PUT:/product-api/categories/{categoryId}/modify-category-parent
   * @secure
   */
  export namespace CategoriesModifyCategoryParentUpdate {
    export type RequestParams = {
      /** Id of the category */
      categoryId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = CategoriesModifyCategoryParentUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiCategoryCategoryReturn;
  }

  /**
   * No description
   * @tags Category
   * @name CategoriesRemoveCategoryParentDelete
   * @summary Remove parent category from provided category defined by id.
   * @request DELETE:/product-api/categories/{categoryId}/remove-category-parent
   * @secure
   */
  export namespace CategoriesRemoveCategoryParentDelete {
    export type RequestParams = {
      /** Id of the category */
      categoryId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = CategoriesRemoveCategoryParentDeletePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiCategoryCategoryReturn;
  }

  /**
   * No description
   * @tags Category
   * @name CategoriesCategoryBradcrumbsList
   * @summary Get breadcrumbs to provided category
   * @request GET:/product-api/categories/{categoryId}/category-bradcrumbs
   * @secure
   */
  export namespace CategoriesCategoryBradcrumbsList {
    export type RequestParams = {
      /** Id of the category */
      categoryId: string;
    };
    export type RequestQuery = {
      /** Contains list of possible languages */
      Language?: VinistoHelperDllEnumsLanguage;
      IsCache?: boolean;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoProductDllModelsApiCategoryCategoryBreadcrumbsReturn;
  }

  /**
 * No description
 * @tags CategorySpecifications
 * @name CategoriesSpecificationsAddCheckBoxSpecificationCreate
 * @summary CheckBox Specification
Add new specification or edit specification value for the provided category.
 * @request POST:/product-api/categories/{categoryId}/specifications/AddCheckBoxSpecification
 * @secure
*/
  export namespace CategoriesSpecificationsAddCheckBoxSpecificationCreate {
    export type RequestParams = {
      /** Category id as string */
      categoryId: string;
    };
    export type RequestQuery = {};
    export type RequestBody =
      CategoriesSpecificationsAddCheckBoxSpecificationCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiCategoryCategoryReturn;
  }

  /**
 * No description
 * @tags CategorySpecifications
 * @name CategoriesSpecificationsAddMultiComboBoxSpecificationCreate
 * @summary MultiComboBox Specification
Add new specification or edit specification values for the provided category.
 * @request POST:/product-api/categories/{categoryId}/specifications/AddMultiComboBoxSpecification
 * @secure
*/
  export namespace CategoriesSpecificationsAddMultiComboBoxSpecificationCreate {
    export type RequestParams = {
      /** Category id as string */
      categoryId: string;
    };
    export type RequestQuery = {};
    export type RequestBody =
      CategoriesSpecificationsAddMultiComboBoxSpecificationCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiCategoryCategoryReturn;
  }

  /**
 * No description
 * @tags CategorySpecifications
 * @name CategoriesSpecificationsAddComboBoxSpecificationCreate
 * @summary ComboBox Specification
Add new specification or edit specification value for the provided category.
 * @request POST:/product-api/categories/{categoryId}/specifications/AddComboBoxSpecification
 * @secure
*/
  export namespace CategoriesSpecificationsAddComboBoxSpecificationCreate {
    export type RequestParams = {
      /** Category id as string */
      categoryId: string;
    };
    export type RequestQuery = {};
    export type RequestBody =
      CategoriesSpecificationsAddComboBoxSpecificationCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiCategoryCategoryReturn;
  }

  /**
 * No description
 * @tags CategorySpecifications
 * @name CategoriesSpecificationsAddNumberSpecificationCreate
 * @summary Number Specification
Add new specification or edit specification value for the provided category.
 * @request POST:/product-api/categories/{categoryId}/specifications/AddNumberSpecification
 * @secure
*/
  export namespace CategoriesSpecificationsAddNumberSpecificationCreate {
    export type RequestParams = {
      /** Category id as string */
      categoryId: string;
    };
    export type RequestQuery = {};
    export type RequestBody =
      CategoriesSpecificationsAddNumberSpecificationCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiCategoryCategoryReturn;
  }

  /**
 * No description
 * @tags CategorySpecifications
 * @name CategoriesSpecificationsAddNumberImperialSpecificationCreate
 * @summary Imperial Number Specification
Add new specification or edit specification value for the provided category.
 * @request POST:/product-api/categories/{categoryId}/specifications/AddNumberImperialSpecification
 * @secure
*/
  export namespace CategoriesSpecificationsAddNumberImperialSpecificationCreate {
    export type RequestParams = {
      /** Category id as string */
      categoryId: string;
    };
    export type RequestQuery = {};
    export type RequestBody =
      CategoriesSpecificationsAddNumberImperialSpecificationCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiCategoryCategoryReturn;
  }

  /**
 * No description
 * @tags CategorySpecifications
 * @name CategoriesSpecificationsAddDecimalNumberSpecificationCreate
 * @summary Decimal Number Specification
Add new specification or edit specification value for the provided category.
 * @request POST:/product-api/categories/{categoryId}/specifications/AddDecimalNumberSpecification
 * @secure
*/
  export namespace CategoriesSpecificationsAddDecimalNumberSpecificationCreate {
    export type RequestParams = {
      /** Category id as string */
      categoryId: string;
    };
    export type RequestQuery = {};
    export type RequestBody =
      CategoriesSpecificationsAddDecimalNumberSpecificationCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiCategoryCategoryReturn;
  }

  /**
 * No description
 * @tags CategorySpecifications
 * @name CategoriesSpecificationsAddDecimalNumberImperialSpecificationCreate
 * @summary Imperial Decimal Number Specification
Add new specification or edit specification value for the provided category.
 * @request POST:/product-api/categories/{categoryId}/specifications/AddDecimalNumberImperialSpecification
 * @secure
*/
  export namespace CategoriesSpecificationsAddDecimalNumberImperialSpecificationCreate {
    export type RequestParams = {
      /** Category id as string */
      categoryId: string;
    };
    export type RequestQuery = {};
    export type RequestBody =
      CategoriesSpecificationsAddDecimalNumberImperialSpecificationCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiCategoryCategoryReturn;
  }

  /**
 * No description
 * @tags CategorySpecifications
 * @name CategoriesSpecificationsAddTextSpecificationCreate
 * @summary Text Specification
Add new specification or edit specification value for the provided category.
 * @request POST:/product-api/categories/{categoryId}/specifications/AddTextSpecification
 * @secure
*/
  export namespace CategoriesSpecificationsAddTextSpecificationCreate {
    export type RequestParams = {
      /** Category id as string */
      categoryId: string;
    };
    export type RequestQuery = {};
    export type RequestBody =
      CategoriesSpecificationsAddTextSpecificationCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiCategoryCategoryReturn;
  }

  /**
   * No description
   * @tags CategorySpecifications
   * @name CategoriesSpecificationsDelete
   * @summary Delete specification from provided category.
   * @request DELETE:/product-api/categories/{categoryId}/specifications/{specificationId}
   * @secure
   */
  export namespace CategoriesSpecificationsDelete {
    export type RequestParams = {
      categoryId: string;
      specificationId: string;
    };
    export type RequestQuery = {
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiCategoryCategoryReturn;
  }

  /**
   * No description
   * @tags CategorySuppliers
   * @name CategoriesSuppliersCreate
   * @summary Add existing supplier to provided category.
   * @request POST:/product-api/categories/{categoryId}/suppliers/{supplierId}
   * @secure
   */
  export namespace CategoriesSuppliersCreate {
    export type RequestParams = {
      /** Category id as string */
      categoryId: string;
      /** Supplier id as string */
      supplierId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = CategoriesSuppliersCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiCategoryCategoryReturn;
  }

  /**
   * No description
   * @tags CategorySuppliers
   * @name CategoriesSuppliersDelete
   * @summary Delete supplier from provided category.
   * @request DELETE:/product-api/categories/{categoryId}/suppliers/{supplierId}
   * @secure
   */
  export namespace CategoriesSuppliersDelete {
    export type RequestParams = {
      categoryId: string;
      supplierId: string;
    };
    export type RequestQuery = {
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiCategoryCategoryReturn;
  }

  /**
   * No description
   * @tags CategoryTags
   * @name CategoriesTagsCreate
   * @summary Add existing tag to provided category.
   * @request POST:/product-api/categories/{categoryId}/tags/{tagId}
   * @secure
   */
  export namespace CategoriesTagsCreate {
    export type RequestParams = {
      /** Category id as string. */
      categoryId: string;
      /** Tag id as string. */
      tagId: string;
    };
    export type RequestQuery = {
      /**
       * Identifies type of the country
       * @default "CZ"
       */
      countryOfSale?: VinistoHelperDllEnumsCountryCode;
    };
    export type RequestBody = CategoriesTagsCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiCategoryCategoryReturn;
  }

  /**
   * No description
   * @tags CategoryTags
   * @name CategoriesTagsDelete
   * @summary Delete tag from provided category.
   * @request DELETE:/product-api/categories/{categoryId}/tags/{tagId}
   * @secure
   */
  export namespace CategoriesTagsDelete {
    export type RequestParams = {
      categoryId: string;
      /** Tag id as string. */
      tagId: string;
    };
    export type RequestQuery = {
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
      /**
       * Identifies type of the country
       * @default "CZ"
       */
      countryOfSale?: VinistoHelperDllEnumsCountryCode;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiCategoryCategoryReturn;
  }

  /**
   * No description
   * @tags Evaluation
   * @name EvaluationsDetail
   * @summary Get evaluation by ID
   * @request GET:/product-api/evaluations/{evaluationId}
   * @secure
   */
  export namespace EvaluationsDetail {
    export type RequestParams = {
      /** Id of the evaluation */
      evaluationId: string;
    };
    export type RequestQuery = {
      IsCache?: boolean;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoProductDllModelsApiEvaluationEvaluationReturn;
  }

  /**
   * No description
   * @tags Evaluation
   * @name EvaluationsDelete
   * @summary Delete evaluation for provided evaluation id.
   * @request DELETE:/product-api/evaluations/{evaluationId}
   * @secure
   */
  export namespace EvaluationsDelete {
    export type RequestParams = {
      /** Id evaluation as string to delete */
      evaluationId: string;
    };
    export type RequestQuery = {
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoHelperDllBaseBaseReturn;
  }

  /**
   * No description
   * @tags Evaluations
   * @name EvaluationsList
   * @summary Get all evaluations for provided parameters
   * @request GET:/product-api/evaluations
   * @secure
   */
  export namespace EvaluationsList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** Evaluations only for provided user id */
      UserId?: string;
      /** Evaluations only for provided product id */
      ProductId?: string;
      /** If provided, sorting will be done according to this column. if not provided, default sorting is done by Id */
      SortingColumn?: VinistoHelperDllEnumsEvaluationSortableColumns;
      /** True in case that sorting shall be done in descending order */
      IsSortingDescending?: boolean;
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
      IsCache?: boolean;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoProductDllModelsApiEvaluationEvaluationsReturn;
  }

  /**
   * No description
   * @tags Evaluations
   * @name EvaluationsCreate
   * @summary Creates new evaluation from provided parameters. If exists evaluation for provided bundle and user, than is evaluation updated by provided values.
   * @request POST:/product-api/evaluations
   * @secure
   */
  export namespace EvaluationsCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = EvaluationsCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoProductDllModelsApiEvaluationEvaluationReturn;
  }

  /**
   * No description
   * @tags Evaluations
   * @name EvaluationsCanEvaluateList
   * @summary Check user can evaluate a bundle
   * @request GET:/product-api/evaluations/CanEvaluate
   * @secure
   */
  export namespace EvaluationsCanEvaluateList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
      bundleId?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoHelperDllBaseBoolReturn;
  }

  /**
   * No description
   * @tags GiftRule
   * @name GiftRulesDetail
   * @summary Get gift rule by id
   * @request GET:/product-api/gift-rules/{giftRuleId}
   * @secure
   */
  export namespace GiftRulesDetail {
    export type RequestParams = {
      /** Gift rule id */
      giftRuleId: string;
    };
    export type RequestQuery = {
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
      /**
       * Currency
       * @default "CZK"
       */
      currency?: VinistoHelperDllEnumsCurrency;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoGiftsDllModelsApiGiftRuleGiftRuleReturn;
  }

  /**
   * No description
   * @tags GiftRule
   * @name GiftRulesUpdateOrderPriceGiftRuleUpdate
   * @summary Update order price gift rule from provided parameters
   * @request PUT:/product-api/gift-rules/{giftRuleId}/update-order-price-gift-rule
   * @secure
   */
  export namespace GiftRulesUpdateOrderPriceGiftRuleUpdate {
    export type RequestParams = {
      /** Gift rule id */
      giftRuleId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = GiftRulesUpdateOrderPriceGiftRuleUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoGiftsDllModelsApiGiftRuleGiftRuleReturn;
  }

  /**
   * No description
   * @tags GiftRule
   * @name GiftRulesUpdateCategoryGiftRuleUpdate
   * @summary Update category gift rule from provided parameters
   * @request PUT:/product-api/gift-rules/{giftRuleId}/update-category-gift-rule
   * @secure
   */
  export namespace GiftRulesUpdateCategoryGiftRuleUpdate {
    export type RequestParams = {
      /** Gift rule id */
      giftRuleId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = GiftRulesUpdateCategoryGiftRuleUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoGiftsDllModelsApiGiftRuleGiftRuleReturn;
  }

  /**
   * No description
   * @tags GiftRule
   * @name GiftRulesUpdateSupplierGiftRuleUpdate
   * @summary Update supplier gift rule from provided parameters
   * @request PUT:/product-api/gift-rules/{giftRuleId}/update-supplier-gift-rule
   * @secure
   */
  export namespace GiftRulesUpdateSupplierGiftRuleUpdate {
    export type RequestParams = {
      /** Gift rule id */
      giftRuleId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = GiftRulesUpdateSupplierGiftRuleUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoGiftsDllModelsApiGiftRuleGiftRuleReturn;
  }

  /**
   * No description
   * @tags GiftRule
   * @name GiftRulesUpdateSpecificationGiftRuleUpdate
   * @summary Update specification gift rule from provided parameters
   * @request PUT:/product-api/gift-rules/{giftRuleId}/update-specification-gift-rule
   * @secure
   */
  export namespace GiftRulesUpdateSpecificationGiftRuleUpdate {
    export type RequestParams = {
      /** Gift rule id */
      giftRuleId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = GiftRulesUpdateSpecificationGiftRuleUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoGiftsDllModelsApiGiftRuleGiftRuleReturn;
  }

  /**
   * No description
   * @tags GiftRule
   * @name GiftRulesActivateGiftRuleUpdate
   * @summary Activate provided gift rule
   * @request PUT:/product-api/gift-rules/{giftRuleId}/activate-gift-rule
   * @secure
   */
  export namespace GiftRulesActivateGiftRuleUpdate {
    export type RequestParams = {
      /** Id of the gift rule */
      giftRuleId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = GiftRulesActivateGiftRuleUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoHelperDllBaseBaseReturn;
  }

  /**
   * No description
   * @tags GiftRule
   * @name GiftRulesDeactivateGiftRuleUpdate
   * @summary Deactivate provided gift rule
   * @request PUT:/product-api/gift-rules/{giftRuleId}/deactivate-gift-rule
   * @secure
   */
  export namespace GiftRulesDeactivateGiftRuleUpdate {
    export type RequestParams = {
      /** Id of the gift rule */
      giftRuleId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = GiftRulesDeactivateGiftRuleUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoHelperDllBaseBaseReturn;
  }

  /**
   * No description
   * @tags GiftRules
   * @name GiftRulesList
   * @summary Get Gift rules according to provided parameters
   * @request GET:/product-api/gift-rules
   * @secure
   */
  export namespace GiftRulesList {
    export type RequestParams = {};
    export type RequestQuery = {
      SearchName?: string;
      /** @format int64 */
      ValidFrom?: number;
      /** @format int64 */
      ValidTo?: number;
      RuleType?: VinistoHelperDllEnumsGiftGiftRuleType;
      IsActive?: boolean;
      /** Currency */
      Currency?: VinistoHelperDllEnumsCurrency;
      /** Contains list of possible columns for sorting */
      SortingColumn?: VinistoHelperDllEnumsGiftSortableColumns;
      IsSortingDescending?: boolean;
      /** @format int32 */
      Limit?: number;
      /** @format int32 */
      Offset?: number;
      IsCache?: boolean;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoGiftsDllModelsApiGiftRuleGiftRulesReturn;
  }

  /**
   * No description
   * @tags GiftRules
   * @name HeadProductApi2
   * @summary Get Gift rules according to provided parameters
   * @request HEAD:/product-api/gift-rules
   * @originalName headProductApi
   * @duplicate
   * @secure
   */
  export namespace HeadProductApi2 {
    export type RequestParams = {};
    export type RequestQuery = {
      SearchName?: string;
      /** @format int64 */
      ValidFrom?: number;
      /** @format int64 */
      ValidTo?: number;
      RuleType?: VinistoHelperDllEnumsGiftGiftRuleType;
      IsActive?: boolean;
      /** Currency */
      Currency?: VinistoHelperDllEnumsCurrency;
      /** Contains list of possible columns for sorting */
      SortingColumn?: VinistoHelperDllEnumsGiftSortableColumns;
      IsSortingDescending?: boolean;
      /** @format int32 */
      Limit?: number;
      /** @format int32 */
      Offset?: number;
      IsCache?: boolean;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoGiftsDllModelsApiGiftRuleGiftRulesReturn;
  }

  /**
   * No description
   * @tags GiftRules
   * @name GiftRulesCreateOrderPriceGiftRuleCreate
   * @summary Create new order price gift rule from provided parameters
   * @request POST:/product-api/gift-rules/create-order-price-gift-rule
   * @secure
   */
  export namespace GiftRulesCreateOrderPriceGiftRuleCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = GiftRulesCreateOrderPriceGiftRuleCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoGiftsDllModelsApiGiftRuleGiftRuleReturn;
  }

  /**
   * No description
   * @tags GiftRules
   * @name GiftRulesCreateCategoryGiftRuleCreate
   * @summary Create new category gift rule from provided parameters
   * @request POST:/product-api/gift-rules/create-category-gift-rule
   * @secure
   */
  export namespace GiftRulesCreateCategoryGiftRuleCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = GiftRulesCreateCategoryGiftRuleCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoGiftsDllModelsApiGiftRuleGiftRuleReturn;
  }

  /**
   * No description
   * @tags GiftRules
   * @name GiftRulesCreateSupplierGiftRuleCreate
   * @summary Create new supplier gift rule from provided parameters
   * @request POST:/product-api/gift-rules/create-supplier-gift-rule
   * @secure
   */
  export namespace GiftRulesCreateSupplierGiftRuleCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = GiftRulesCreateSupplierGiftRuleCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoGiftsDllModelsApiGiftRuleGiftRuleReturn;
  }

  /**
   * No description
   * @tags GiftRules
   * @name GiftRulesCreateSpecificationGiftRuleCreate
   * @summary Create new specification gift rule from provided parameters
   * @request POST:/product-api/gift-rules/create-specification-gift-rule
   * @secure
   */
  export namespace GiftRulesCreateSpecificationGiftRuleCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = GiftRulesCreateSpecificationGiftRuleCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoGiftsDllModelsApiGiftRuleGiftRuleReturn;
  }

  /**
   * No description
   * @tags HomePageCarousels
   * @name HomePageCarouselsGetTagCarouselList
   * @summary Get data for HomePage tag carousel.
   * @request GET:/product-api/home-page/carousels/GetTagCarousel
   * @secure
   */
  export namespace HomePageCarouselsGetTagCarouselList {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * Language version. If provided, all tag and bundles in carousels will be only in selected language.
       * Otherwise all language version will be provided.
       */
      Language?: VinistoHelperDllEnumsLanguage;
      /** Return prices in requested currency, otherwise return default CZK. */
      Currency?: VinistoHelperDllEnumsCurrency;
      /** Country of sale. Default is CZ. All bundles which are returned must be allowed to sale in country. */
      CountryOfSale?: VinistoHelperDllEnumsCountryCode;
      IsCache?: boolean;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoProductDllModelsApiHomePageHomePageTagCarouselReturn;
  }

  /**
   * No description
   * @tags HomePageCarousels
   * @name HomePageCarouselsGetInterestingCarouselList
   * @summary Get data for HomePage interesting carousel.
   * @request GET:/product-api/home-page/carousels/GetInterestingCarousel
   * @secure
   */
  export namespace HomePageCarouselsGetInterestingCarouselList {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * Language version. If provided, all tag and bundles in carousels will be only in selected language.
       * Otherwise all language version will be provided.
       */
      Language?: VinistoHelperDllEnumsLanguage;
      /** Return prices in requested currency, otherwise return default CZK. */
      Currency?: VinistoHelperDllEnumsCurrency;
      /** Country of sale. Default is CZ. All bundles which are returned must be allowed to sale in country. */
      CountryOfSale?: VinistoHelperDllEnumsCountryCode;
      IsCache?: boolean;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoProductDllModelsApiHomePageHomePageInterestingCarouselReturn;
  }

  /**
   * No description
   * @tags HomePageCarousels
   * @name HomePageCarouselsGetInspireCarouselList
   * @summary Get data for HomePage inspire carousel.
   * @request GET:/product-api/home-page/carousels/GetInspireCarousel
   * @secure
   */
  export namespace HomePageCarouselsGetInspireCarouselList {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * Language version. If provided, all tag and bundles in carousels will be only in selected language.
       * Otherwise all language version will be provided.
       */
      Language?: VinistoHelperDllEnumsLanguage;
      /** Return prices in requested currency, otherwise return default CZK. */
      Currency?: VinistoHelperDllEnumsCurrency;
      /** Country of sale. Default is CZ. All bundles which are returned must be allowed to sale in country. */
      CountryOfSale?: VinistoHelperDllEnumsCountryCode;
      IsCache?: boolean;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoProductDllModelsApiHomePageHomePageInspireCarouselReturn;
  }

  /**
   * No description
   * @tags HomePageCategories
   * @name HomePageCategoriesDetail
   * @summary Get all available categories for Homepage in provided parameters
   * @request GET:/product-api/home-page/categories/{homePageCategoryType}
   * @secure
   */
  export namespace HomePageCategoriesDetail {
    export type RequestParams = {
      /** Contains list of possible types Product API - Category Homepage */
      homePageCategoryType: VinistoHelperDllEnumsProductHomePageCategoryType;
    };
    export type RequestQuery = {
      /** If provided search by category name in homepage category */
      CategoryName?: string;
      /** If provided, sorting will be done according to this column. if not provided, default sorting is done by Id */
      SortingColumn?: VinistoHelperDllEnumsHomePageCategorySortableColumns;
      /** True in case that sorting shall be done in descending order */
      IsSortingDescending?: boolean;
      /**
       * Language of the requested category
       * Language version - if provided, all products will be only in selected language.
       * Sorting and searching will be according to the specified language
       * Otherwise all language version will be provided and sorting and searching will be according to the default language (CZECH).
       */
      Language?: VinistoHelperDllEnumsLanguage;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoProductDllModelsApiHomePageHomePageCategoryReturn;
  }

  /**
 * No description
 * @tags HomePageCategories
 * @name HomePageCategoriesCreate
 * @summary Add new category with category ID an sequence number to object Category HomePage for provided typeCategoryHomePage.
If Category HomePage for provided typeCategoryHomePage no exists, will be created.
 * @request POST:/product-api/home-page/categories
 * @secure
*/
  export namespace HomePageCategoriesCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = HomePageCategoriesCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoProductDllModelsApiHomePageHomePageCategoryReturn;
  }

  /**
   * No description
   * @tags HomePageCategories
   * @name HomePageCategoriesUpdate
   * @summary Update sequence number category for category ID to object Category HomePage for provided typeCategoryHomePage.
   * @request PUT:/product-api/home-page/categories
   * @secure
   */
  export namespace HomePageCategoriesUpdate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = HomePageCategoriesUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoProductDllModelsApiHomePageHomePageCategoryReturn;
  }

  /**
   * No description
   * @tags HomePageCategories
   * @name HomePageCategoriesDelete
   * @summary Deleted category from Category HomePage for provided type.
   * @request DELETE:/product-api/home-page/categories/{homePageCategoryType}/{categoryId}
   * @secure
   */
  export namespace HomePageCategoriesDelete {
    export type RequestParams = {
      /** Contains list of possible types Product API - Category Homepage */
      homePageCategoryType: VinistoHelperDllEnumsProductHomePageCategoryType;
      /** Id of the */
      categoryId: string;
    };
    export type RequestQuery = {
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoProductDllModelsApiHomePageHomePageCategoryReturn;
  }

  /**
   * No description
   * @tags HomePageCustomCarousel
   * @name HomePageCustomCarouselsDetail
   * @summary Get custom carousel by provided customCarouselId
   * @request GET:/product-api/home-page/custom-carousels/{customCarouselId}
   * @secure
   */
  export namespace HomePageCustomCarouselsDetail {
    export type RequestParams = {
      /** Id of the custom carousel to get */
      customCarouselId: string;
    };
    export type RequestQuery = {
      /** If provided filters out bundles in the carousel which is matching provided bundle name */
      SearchBundleName?: string;
      /** Language version - if provided, all bundles in custom carousels will be only in selected language. */
      Language?: VinistoHelperDllEnumsLanguage;
      /** Return prices in target currency, otherwise return default CZK. */
      Currency?: VinistoHelperDllEnumsCurrency;
      /** If provided, bundles in home page carousels sorting will be done according to this column. if not provided, default sorting is done by ID */
      SortingColumn?: VinistoHelperDllEnumsHomePageCustomCarouselSortableColumnsDetail;
      /** True in case that sorting of bundles in the carousel shall be done in descending order */
      IsSortingDescending?: boolean;
      /** Country of sale. Default is CZ. All bundles which are returned must be allowed to sale in country. */
      CountryOfSale?: VinistoHelperDllEnumsCountryCode;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoProductDllModelsApiHomePageHomePageCustomCarouselReturn;
  }

  /**
   * No description
   * @tags HomePageCustomCarousel
   * @name HomePageCustomCarouselsUpdate
   * @summary Edit custom carousel by provided customCarouselId
   * @request PUT:/product-api/home-page/custom-carousels/{customCarouselId}
   * @secure
   */
  export namespace HomePageCustomCarouselsUpdate {
    export type RequestParams = {
      /** Id of the custom carousel for editi */
      customCarouselId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = HomePageCustomCarouselsUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoProductDllModelsApiHomePageHomePageCustomCarouselReturn;
  }

  /**
   * No description
   * @tags HomePageCustomCarousel
   * @name HomePageCustomCarouselsDelete
   * @summary Remove custom carousel by provided customCarouselId.
   * @request DELETE:/product-api/home-page/custom-carousels/{customCarouselId}
   * @secure
   */
  export namespace HomePageCustomCarouselsDelete {
    export type RequestParams = {
      /** Id of the custom carousel for remove */
      customCarouselId: string;
    };
    export type RequestQuery = {
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoHelperDllBaseBaseReturn;
  }

  /**
   * No description
   * @tags HomePageCustomCarousel
   * @name HomePageCustomCarouselsBundlesCreate
   * @summary Add or update bundle for provided carousel id and bundle data
   * @request POST:/product-api/home-page/custom-carousels/{customCarouselId}/bundles
   * @secure
   */
  export namespace HomePageCustomCarouselsBundlesCreate {
    export type RequestParams = {
      /** Custom carousel id */
      customCarouselId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = HomePageCustomCarouselsBundlesCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoProductDllModelsApiHomePageHomePageCustomCarouselReturn;
  }

  /**
   * No description
   * @tags HomePageCustomCarousel
   * @name HomePageCustomCarouselsBundlesDelete
   * @summary Remove bundle for provided carousel id and bundle id
   * @request DELETE:/product-api/home-page/custom-carousels/{customCarouselId}/bundles/{bundleId}
   * @secure
   */
  export namespace HomePageCustomCarouselsBundlesDelete {
    export type RequestParams = {
      /** Type of the category on HomePage */
      customCarouselId: string;
      /** Id of the */
      bundleId: string;
    };
    export type RequestQuery = {
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoProductDllModelsApiHomePageHomePageCustomCarouselReturn;
  }

  /**
   * No description
   * @tags HomePageCustomCarousels
   * @name HomePageCustomCarouselsList
   * @summary Get all available custom carousels for Homepage
   * @request GET:/product-api/home-page/custom-carousels
   * @secure
   */
  export namespace HomePageCustomCarouselsList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** If provided search by name in custom carousel */
      SearchName?: string;
      /** Bundle temporary unavailable - true/false */
      TemporaryUnavailable?: boolean;
      /** If true search only between mark as enabled carousels, if false search only between mark as not enabled carousels, if not provided search all carousels */
      IsEnabled?: boolean;
      /** Language version - if provided, all custom carousels will be only in selected language. */
      Language?: VinistoHelperDllEnumsLanguage;
      /** Return prices in target currency, otherwise return default CZK. */
      Currency?: VinistoHelperDllEnumsCurrency;
      /** If provided, sorting will be done according to this column. if not provided, default sorting is done by ID */
      SortingColumn?: VinistoHelperDllEnumsHomePageCustomCarouselSortableColumns;
      /** True in case that sorting shall be done in descending order */
      IsSortingDescending?: boolean;
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
      /** Country of sale. Default is CZ. All bundles which are returned must be allowed to sale in country. */
      CountryOfSale?: VinistoHelperDllEnumsCountryCode;
      PriceLevels?: VinistoHelperDllEnumsPriceLevel[];
      /** @format int32 */
      AvailableOnPlatform?: number;
      IsCache?: boolean;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoProductDllModelsApiHomePageHomePageCustomCarouselsReturn;
  }

  /**
   * No description
   * @tags HomePageCustomCarousels
   * @name HomePageCustomCarouselsCreate
   * @summary Create new custom carousel for homepage
   * @request POST:/product-api/home-page/custom-carousels
   * @secure
   */
  export namespace HomePageCustomCarouselsCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = HomePageCustomCarouselsCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoProductDllModelsApiHomePageHomePageCustomCarouselReturn;
  }

  /**
   * No description
   * @tags HomePageTags
   * @name HomePageTagsCreate
   * @summary Add provided tag to display on the HomePage.
   * @request POST:/product-api/home-page/tags
   * @secure
   */
  export namespace HomePageTagsCreate {
    export type RequestParams = {};
    export type RequestQuery = {
      /** Country of Sale. Default is CZ. */
      countryOfSale?: VinistoHelperDllEnumsCountryCode;
    };
    export type RequestBody = HomePageTagsCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiTagTagReturn;
  }

  /**
   * No description
   * @tags HomePageTags
   * @name HomePageTagsDelete
   * @summary Delete provided tag from the HomePage display.
   * @request DELETE:/product-api/home-page/tags/{tagId}
   * @secure
   */
  export namespace HomePageTagsDelete {
    export type RequestParams = {
      /** Id of the Tag */
      tagId: string;
    };
    export type RequestQuery = {
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
      /** Country of Sale. Default is CZ. */
      countryOfSale?: VinistoHelperDllEnumsCountryCode;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiTagTagReturn;
  }

  /**
   * No description
   * @tags Import
   * @name ImportProductsBundlesCreate
   * @summary Import products and bundles from provided csv file
   * @request POST:/product-api/import/products-bundles
   * @secure
   */
  export namespace ImportProductsBundlesCreate {
    export type RequestParams = {};
    export type RequestQuery = {
      /** Language of the import */
      Language: VinistoHelperDllEnumsLanguage;
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
    };
    export type RequestBody = ImportProductsBundlesCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoHelperDllBaseBaseReturn;
  }

  /**
   * No description
   * @tags Import
   * @name ImportSpecificationsCreate
   * @summary Import specifications to products and bundles from provided csv file.
   * @request POST:/product-api/import/specifications
   * @secure
   */
  export namespace ImportSpecificationsCreate {
    export type RequestParams = {};
    export type RequestQuery = {
      /** Language of the import */
      Language: VinistoHelperDllEnumsLanguage;
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
    };
    export type RequestBody = ImportSpecificationsCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoHelperDllBaseBaseReturn;
  }

  /**
   * No description
   * @tags Import
   * @name ImportWarehouseCreate
   * @summary Import warehouse quantity from provided csv file
   * @request POST:/product-api/import/warehouse
   * @secure
   */
  export namespace ImportWarehouseCreate {
    export type RequestParams = {};
    export type RequestQuery = {
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
    };
    export type RequestBody = ImportWarehouseCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoHelperDllBaseBaseReturn;
  }

  /**
   * No description
   * @tags Import
   * @name ImportWarehouseVicomCreate
   * @summary Import warehouse quantity from provided csv file
   * @request POST:/product-api/import/warehouse/vicom
   * @secure
   */
  export namespace ImportWarehouseVicomCreate {
    export type RequestParams = {};
    export type RequestQuery = {
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
    };
    export type RequestBody = ImportWarehouseVicomCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoHelperDllBaseBaseReturn;
  }

  /**
   * No description
   * @tags ProductApiCron
   * @name CronsList
   * @summary Execute cron service based on cronType property
   * @request GET:/product-api/crons
   * @secure
   */
  export namespace CronsList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
      /** Contains list of possible crons in product api */
      cronType?: VinistoHelperDllEnumsCronsProductApiCronType;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoHelperDllBaseBaseReturn;
  }

  /**
   * No description
   * @tags ProductEdit
   * @name ProductsEnableProductUpdate
   * @summary Enable provided product
   * @request PUT:/product-api/products/{productId}/EnableProduct
   * @secure
   */
  export namespace ProductsEnableProductUpdate {
    export type RequestParams = {
      /** Id of the product */
      productId: string;
    };
    export type RequestQuery = {
      /** Identifies type of the country */
      countryOfSale?: VinistoHelperDllEnumsCountryCode;
    };
    export type RequestBody = ProductsEnableProductUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiProductProductReturn;
  }

  /**
   * No description
   * @tags ProductEdit
   * @name ProductsDisableProductUpdate
   * @summary Disable provided product
   * @request PUT:/product-api/products/{productId}/DisableProduct
   * @secure
   */
  export namespace ProductsDisableProductUpdate {
    export type RequestParams = {
      /** Id of the product */
      productId: string;
    };
    export type RequestQuery = {
      /**
       * Identifies type of the country
       * @default "CZ"
       */
      countryOfSale?: VinistoHelperDllEnumsCountryCode;
    };
    export type RequestBody = ProductsDisableProductUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiProductProductReturn;
  }

  /**
   * No description
   * @tags ProductEdit
   * @name ProductsEnableProductForLoggedUsersOnlyUpdate
   * @summary Enable provided product only for logged users
   * @request PUT:/product-api/products/{productId}/EnableProductForLoggedUsersOnly
   * @secure
   */
  export namespace ProductsEnableProductForLoggedUsersOnlyUpdate {
    export type RequestParams = {
      /** Id of the product */
      productId: string;
    };
    export type RequestQuery = {
      /**
       * Identifies type of the country
       * @default "CZ"
       */
      countryOfSale?: VinistoHelperDllEnumsCountryCode;
    };
    export type RequestBody =
      ProductsEnableProductForLoggedUsersOnlyUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiProductProductReturn;
  }

  /**
   * No description
   * @tags ProductEdit
   * @name ProductsDisableProductForLoggedUsersOnlyUpdate
   * @summary Disable provided product only for logged users
   * @request PUT:/product-api/products/{productId}/DisableProductForLoggedUsersOnly
   * @secure
   */
  export namespace ProductsDisableProductForLoggedUsersOnlyUpdate {
    export type RequestParams = {
      /** Id of the product */
      productId: string;
    };
    export type RequestQuery = {
      /**
       * Identifies type of the country
       * @default "CZ"
       */
      countryOfSale?: VinistoHelperDllEnumsCountryCode;
    };
    export type RequestBody =
      ProductsDisableProductForLoggedUsersOnlyUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiProductProductReturn;
  }

  /**
   * No description
   * @tags ProductEdit
   * @name ProductsEditProductUpdate
   * @summary Updates product
   * @request PUT:/product-api/products/{productId}/EditProduct
   * @secure
   */
  export namespace ProductsEditProductUpdate {
    export type RequestParams = {
      /** Id of the product to update */
      productId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = ProductsEditProductUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiProductProductReturn;
  }

  /**
   * No description
   * @tags ProductEdit
   * @name ProductsPricesCreate
   * @summary Add price to provided product. If price with given currency already exists, it is overwritten
   * @request POST:/product-api/products/{productId}/prices
   * @secure
   */
  export namespace ProductsPricesCreate {
    export type RequestParams = {
      /** Id of the product */
      productId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = ProductsPricesCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiProductProductReturn;
  }

  /**
   * No description
   * @tags ProductEdit
   * @name ProductsPricesDelete
   * @summary Remove price from bundle
   * @request DELETE:/product-api/products/{productId}/prices
   * @secure
   */
  export namespace ProductsPricesDelete {
    export type RequestParams = {
      /** Id of the product */
      productId: string;
    };
    export type RequestQuery = {
      /** Currency in which the price will be edited */
      Currency: VinistoHelperDllEnumsCurrency;
      /** Price type for delete price. */
      PriceLevel?: VinistoHelperDllEnumsPriceLevel;
      /** Price type for delete price. */
      PriceDiscountType?: VinistoHelperDllEnumsPriceDiscountType;
      /** Identifies type of the country */
      CountryOfSale?: VinistoHelperDllEnumsCountryCode;
      /** Id of discount price. If not set, id is ignored. */
      DiscountId?: string;
      /** @format int32 */
      PlatformId?: number;
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiProductProductReturn;
  }

  /**
   * No description
   * @tags ProductEdit
   * @name ProductsTagsCreate
   * @summary Add tag to provided product.
   * @request POST:/product-api/products/{productId}/tags
   * @secure
   */
  export namespace ProductsTagsCreate {
    export type RequestParams = {
      productId: string;
    };
    export type RequestQuery = {
      /**
       * Identifies type of the country
       * @default "CZ"
       */
      countryOfSale?: VinistoHelperDllEnumsCountryCode;
    };
    export type RequestBody = ProductsTagsCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiProductProductReturn;
  }

  /**
   * No description
   * @tags ProductEdit
   * @name ProductsTagsDelete
   * @summary Removes tag from product.
   * @request DELETE:/product-api/products/{productId}/tags/{tagId}
   * @secure
   */
  export namespace ProductsTagsDelete {
    export type RequestParams = {
      /** Id of the main product */
      productId: string;
      /** Id of tag which is removed from the main product */
      tagId: string;
    };
    export type RequestQuery = {
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
      /**
       * Identifies type of the country
       * @default "CZ"
       */
      countryOfSale?: VinistoHelperDllEnumsCountryCode;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiProductProductReturn;
  }

  /**
 * No description
 * @tags ProductEdit
 * @name ProductsCategoriesCreate
 * @summary Assigns provided category to provided product. Both category and product identified by Id.
If product or category is not found, operation is cancelled.
 * @request POST:/product-api/products/{productId}/categories
 * @secure
*/
  export namespace ProductsCategoriesCreate {
    export type RequestParams = {
      /** Id of the product */
      productId: string;
    };
    export type RequestQuery = {
      /**
       * Identifies type of the country
       * @default "CZ"
       */
      countryOfSale?: VinistoHelperDllEnumsCountryCode;
    };
    export type RequestBody = ProductsCategoriesCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiProductProductReturn;
  }

  /**
   * No description
   * @tags ProductEdit
   * @name ProductsCategoriesDelete
   * @summary Removes category from product
   * @request DELETE:/product-api/products/{productId}/categories/{categoryId}
   * @secure
   */
  export namespace ProductsCategoriesDelete {
    export type RequestParams = {
      /** Id of the product */
      productId: string;
      /** Id of the category */
      categoryId: string;
    };
    export type RequestQuery = {
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
      /**
       * Identifies type of the country
       * @default "CZ"
       */
      countryOfSale?: VinistoHelperDllEnumsCountryCode;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiProductProductReturn;
  }

  /**
 * No description
 * @tags ProductEditSpecification
 * @name ProductsSpecificationsAddCheckBoxSpecificationCreate
 * @summary CheckBox Specification
Add new specification or edit specification value for the provided product.
 * @request POST:/product-api/products/{productId}/specifications/AddCheckBoxSpecification
 * @secure
*/
  export namespace ProductsSpecificationsAddCheckBoxSpecificationCreate {
    export type RequestParams = {
      /** Product id as string */
      productId: string;
    };
    export type RequestQuery = {};
    export type RequestBody =
      ProductsSpecificationsAddCheckBoxSpecificationCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiProductProductReturn;
  }

  /**
 * No description
 * @tags ProductEditSpecification
 * @name ProductsSpecificationsAddMultiComboBoxSpecificationCreate
 * @summary MultiComboBox Specification
Add new specification or edit specification values for the provided product.
 * @request POST:/product-api/products/{productId}/specifications/AddMultiComboBoxSpecification
 * @secure
*/
  export namespace ProductsSpecificationsAddMultiComboBoxSpecificationCreate {
    export type RequestParams = {
      /** Product id as string */
      productId: string;
    };
    export type RequestQuery = {};
    export type RequestBody =
      ProductsSpecificationsAddMultiComboBoxSpecificationCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiProductProductReturn;
  }

  /**
 * No description
 * @tags ProductEditSpecification
 * @name ProductsSpecificationsAddComboBoxSpecificationCreate
 * @summary ComboBox Specification
Add new specification or edit specification value for the provided product.
 * @request POST:/product-api/products/{productId}/specifications/AddComboBoxSpecification
 * @secure
*/
  export namespace ProductsSpecificationsAddComboBoxSpecificationCreate {
    export type RequestParams = {
      /** Product id as string */
      productId: string;
    };
    export type RequestQuery = {};
    export type RequestBody =
      ProductsSpecificationsAddComboBoxSpecificationCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiProductProductReturn;
  }

  /**
 * No description
 * @tags ProductEditSpecification
 * @name ProductsSpecificationsAddNumberSpecificationCreate
 * @summary Number Specification
Add new specification or edit specification value for the provided product.
 * @request POST:/product-api/products/{productId}/specifications/AddNumberSpecification
 * @secure
*/
  export namespace ProductsSpecificationsAddNumberSpecificationCreate {
    export type RequestParams = {
      /** Product id as string */
      productId: string;
    };
    export type RequestQuery = {};
    export type RequestBody =
      ProductsSpecificationsAddNumberSpecificationCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiProductProductReturn;
  }

  /**
 * No description
 * @tags ProductEditSpecification
 * @name ProductsSpecificationsAddNumberImperialSpecificationCreate
 * @summary Imperial Number Specification
Add new specification or edit specification value for the provided product.
 * @request POST:/product-api/products/{productId}/specifications/AddNumberImperialSpecification
 * @secure
*/
  export namespace ProductsSpecificationsAddNumberImperialSpecificationCreate {
    export type RequestParams = {
      /** Product id as string */
      productId: string;
    };
    export type RequestQuery = {};
    export type RequestBody =
      ProductsSpecificationsAddNumberImperialSpecificationCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiProductProductReturn;
  }

  /**
 * No description
 * @tags ProductEditSpecification
 * @name ProductsSpecificationsAddDecimalNumberSpecificationCreate
 * @summary Decimal Number Specification
Add new specification or edit specification value for the provided product.
 * @request POST:/product-api/products/{productId}/specifications/AddDecimalNumberSpecification
 * @secure
*/
  export namespace ProductsSpecificationsAddDecimalNumberSpecificationCreate {
    export type RequestParams = {
      /** Product id as string */
      productId: string;
    };
    export type RequestQuery = {};
    export type RequestBody =
      ProductsSpecificationsAddDecimalNumberSpecificationCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiProductProductReturn;
  }

  /**
 * No description
 * @tags ProductEditSpecification
 * @name ProductsSpecificationsAddDecimalNumberImperialSpecificationCreate
 * @summary Imperial Decimal Number Specification
Add new specification or edit specification value for the provided product.
 * @request POST:/product-api/products/{productId}/specifications/AddDecimalNumberImperialSpecification
 * @secure
*/
  export namespace ProductsSpecificationsAddDecimalNumberImperialSpecificationCreate {
    export type RequestParams = {
      /** Product id as string */
      productId: string;
    };
    export type RequestQuery = {};
    export type RequestBody =
      ProductsSpecificationsAddDecimalNumberImperialSpecificationCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiProductProductReturn;
  }

  /**
 * No description
 * @tags ProductEditSpecification
 * @name ProductsSpecificationsAddTextSpecificationCreate
 * @summary Text Specification
Add new specification or edit specification value for the provided product.
 * @request POST:/product-api/products/{productId}/specifications/AddTextSpecification
 * @secure
*/
  export namespace ProductsSpecificationsAddTextSpecificationCreate {
    export type RequestParams = {
      /** Product id as string */
      productId: string;
    };
    export type RequestQuery = {};
    export type RequestBody =
      ProductsSpecificationsAddTextSpecificationCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiProductProductReturn;
  }

  /**
   * No description
   * @tags ProductEditSpecification
   * @name ProductsSpecificationsDelete
   * @summary Delete specification from provided product.
   * @request DELETE:/product-api/products/{productId}/specifications/{specificationId}
   * @secure
   */
  export namespace ProductsSpecificationsDelete {
    export type RequestParams = {
      productId: string;
      specificationId: string;
    };
    export type RequestQuery = {
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
      /** Identifies type of the country */
      countryOfSale?: VinistoHelperDllEnumsCountryCode;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiProductProductReturn;
  }

  /**
   * No description
   * @tags Products
   * @name ProductsList
   * @summary Get Products according to provided parameters.
   * @request GET:/product-api/products
   * @secure
   */
  export namespace ProductsList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** If true search only between mark as deleted products, if false search only between mark as not deleted products, if not provided search all products */
      IsDeleted?: boolean;
      /** If true search only between mark as active products, if false search only between mark as not active products, if not provided search all products */
      IsEnabled?: boolean;
      /**
       * If true search only between mark as only for logged users bundles, if false search only between mark as not only for logged users bundles, if not provided search all bundles
       * If is true, then return products with property IsForLogged = true.
       * If is false, then return products with property IsForLogged = false.
       * Default is null and return all products (IsForLogged = true or IsForLogged = false)
       */
      IsForLoggedUsers?: boolean;
      /** If provided search by url in products */
      SearchUrl?: string;
      /** If provided search by name in products */
      SearchName?: string;
      /** If provided search by warehouse id */
      SearchWarehouseId?: string;
      /** If true, searchName is used as StartWith instead of Contains */
      IsSearchNameAutocomplete?: boolean;
      /**
       * Language of the requested category
       * Language version - if provided, all products will be only in selected language.
       * Sorting and searching will be according to the specified language
       * Otherwise all language version will be provided and sorting and searching will be according to the default language (CZECH).
       */
      Language?: VinistoHelperDllEnumsLanguage;
      /** Return prices in target currency, otherwise return default CZK. */
      Currency?: VinistoHelperDllEnumsCurrency;
      /** Contry of sale. Default is CZ. */
      CountryOfSale?: VinistoHelperDllEnumsCountryCode;
      /** Filter products by category */
      CategoryId?: string;
      /** Filter products by EAN */
      Ean?: string;
      /** If provided, sorting will be done according to this column. if not provided, default sorting is done by Id */
      SortingColumn?: VinistoHelperDllEnumsProductSortableColumns;
      /** True in case that sorting shall be done in descending order */
      IsSortingDescending?: boolean;
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
      IsCache?: boolean;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiProductProductsReturn;
  }

  /**
   * No description
   * @tags Products
   * @name ProductsCreate
   * @summary Creates product according to provided parameters.
   * @request POST:/product-api/products
   * @secure
   */
  export namespace ProductsCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ProductsCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiProductProductReturn;
  }

  /**
 * No description
 * @tags Products
 * @name ProductsGetAutocompleteNamesList
 * @summary Find and get products, products will be searched according to the entered letters (min. 3)
It will return product only in provided language and target currency.
 * @request GET:/product-api/products/GetAutocompleteNames
 * @secure
*/
  export namespace ProductsGetAutocompleteNamesList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** Contains list of possible languages */
      language?: VinistoHelperDllEnumsLanguage;
      /** Searching string in provided language. */
      searchingNameString?: string;
      IsCache?: boolean;
      /**
       * Currency
       * @default "CZK"
       */
      currency?: VinistoHelperDllEnumsCurrency;
      /**
       * Number of returned items
       * @format int32
       * @default 5
       */
      limit?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiProductProductsReturn;
  }

  /**
   * No description
   * @tags Products
   * @name ProductsDetail
   * @summary Get product for provided ID
   * @request GET:/product-api/products/{productId}
   * @secure
   */
  export namespace ProductsDetail {
    export type RequestParams = {
      /** Id of the product to get */
      productId: string;
    };
    export type RequestQuery = {
      /** Language in which the product will be received...can be omitted in this case all language versions will ve returned */
      language?: VinistoHelperDllEnumsLanguage;
      IsCache?: boolean;
      /**
       * Currency
       * @default "CZK"
       */
      currency?: VinistoHelperDllEnumsCurrency;
      /**
       * Identifies type of the country
       * @default "CZ"
       */
      countryOfSale?: VinistoHelperDllEnumsCountryCode;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiProductProductReturn;
  }

  /**
   * No description
   * @tags Products
   * @name ProductsDelete
   * @summary Delete provided product (mark as deleted)
   * @request DELETE:/product-api/products/{productId}
   * @secure
   */
  export namespace ProductsDelete {
    export type RequestParams = {
      /** Id of the product */
      productId: string;
    };
    export type RequestQuery = {
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoHelperDllBaseBaseReturn;
  }

  /**
   * No description
   * @tags Products
   * @name ProductsGetProductByUrlList
   * @summary Get product for provided url
   * @request GET:/product-api/products/{productUrl}/GetProductByUrl
   * @secure
   */
  export namespace ProductsGetProductByUrlList {
    export type RequestParams = {
      /** Url of the product to get */
      productUrl: string;
    };
    export type RequestQuery = {
      /** Language in which the product will be received...can be omitted in this case all language versions will ve returned */
      language?: VinistoHelperDllEnumsLanguage;
      IsCache?: boolean;
      /**
       * Currency
       * @default "CZK"
       */
      currency?: VinistoHelperDllEnumsCurrency;
      /**
       * Identifies type of the country
       * @default "CZ"
       */
      countryOfSale?: VinistoHelperDllEnumsCountryCode;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiProductProductReturn;
  }

  /**
 * No description
 * @tags Products
 * @name ProductsCategoriesCreate2
 * @summary Assigns provided category to provided products.
If products are provided, then category is added to provided products which not contains category.
If category is not found, operation is cancelled.
 * @request POST:/product-api/products/categories
 * @originalName productsCategoriesCreate
 * @duplicate
 * @secure
*/
  export namespace ProductsCategoriesCreate2 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ProductsCategoriesCreate2Payload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiProductProductsReturn;
  }

  /**
 * No description
 * @tags Products
 * @name ProductsAddProductsTagUpdate
 * @summary Assigns provided tag to provided products.
If products are provided, then tag is added to provided products which not contains tag.
If tag is not found, operation is cancelled.
 * @request PUT:/product-api/products/AddProductsTag
 * @secure
*/
  export namespace ProductsAddProductsTagUpdate {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * Identifies type of the country
       * @default "CZ"
       */
      countryOfSale?: VinistoHelperDllEnumsCountryCode;
    };
    export type RequestBody = ProductsAddProductsTagUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiProductProductsReturn;
  }

  /**
   * No description
   * @tags Products
   * @name ProductsEnableProductsUpdate
   * @summary Enable provided products
   * @request PUT:/product-api/products/EnableProducts
   * @secure
   */
  export namespace ProductsEnableProductsUpdate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ProductsEnableProductsUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiProductProductsReturn;
  }

  /**
   * No description
   * @tags Products
   * @name ProductsDisableProductsUpdate
   * @summary Disable provided products
   * @request PUT:/product-api/products/DisableProducts
   * @secure
   */
  export namespace ProductsDisableProductsUpdate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ProductsDisableProductsUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiProductProductsReturn;
  }

  /**
 * No description
 * @tags Specification
 * @name SpecificationsGetSpecificationList
 * @summary Get specification with values according to provided specificationId.
If language is provided, it will return specification only in provided language.
Otherwise all language versions will be provided.
 * @request GET:/product-api/specifications/{specificationId}/GetSpecification
 * @secure
*/
  export namespace SpecificationsGetSpecificationList {
    export type RequestParams = {
      /** Id of the specification */
      specificationId: string;
    };
    export type RequestQuery = {
      /** Language identifying specification lang version. If not provided all version will be returned */
      language?: VinistoHelperDllEnumsLanguage;
      /** Currency to load price specification values */
      currency?: VinistoHelperDllEnumsCurrency;
      IsCache?: boolean;
      /**
       * Price level for loading prices to specification.
       * @default "Level1"
       */
      priceLevel?: VinistoHelperDllEnumsPriceLevel;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoProductDllModelsApiSpecificationSpecificationReturn;
  }

  /**
   * No description
   * @tags Specification
   * @name SpecificationsGetSpecificationAllowedValuesList
   * @summary Allows to filter allowed values of combobox specification
   * @request GET:/product-api/specifications/{specificationId}/GetSpecificationAllowedValues
   * @secure
   */
  export namespace SpecificationsGetSpecificationAllowedValuesList {
    export type RequestParams = {
      /** Id of the specification */
      specificationId: string;
    };
    export type RequestQuery = {
      /** Filter by value */
      SearchValue?: string;
      /** Filter by url */
      SearchUrl?: string;
      /** Filter by language */
      Language?: VinistoHelperDllEnumsLanguage;
      /** If provided, primary sorting will be done according to this column. If not provided Primary sorting is done according to score */
      SortingPrimaryColumn?: VinistoHelperDllEnumsSpecificationSortableColumnsComboValues;
      /** True in case that sorting shall be done in descending order */
      IsSortingPrimaryDescending?: boolean;
      /** If provided, secondary sorting will be done according to this column. If not provided Primary sorting is done according to score */
      SortingSecondaryColumn?: VinistoHelperDllEnumsSpecificationSortableColumnsComboValues;
      /** True in case that sorting shall be done in descending order */
      IsSortingSecondaryDescending?: boolean;
      /**
       * Number of records to be retrieved. if not provided default value is 10.
       * @format int32
       */
      Limit?: number;
      /**
       * Number of records to be skipped. If not provided default value is 0
       * @format int32
       */
      Offset?: number;
      IsCache?: boolean;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoProductDllModelsApiSpecificationComboSpecificationAllowedValuesReturn;
  }

  /**
   * No description
   * @tags Specification
   * @name SpecificationsUpdateSpecificationDefinitionUpdate
   * @summary Edit provided specification object in provided lang (change only name by lang)
   * @request PUT:/product-api/specifications/{specificationId}/UpdateSpecificationDefinition
   * @secure
   */
  export namespace SpecificationsUpdateSpecificationDefinitionUpdate {
    export type RequestParams = {
      /** Id of the specification */
      specificationId: string;
    };
    export type RequestQuery = {};
    export type RequestBody =
      SpecificationsUpdateSpecificationDefinitionUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoProductDllModelsApiSpecificationSpecificationReturn;
  }

  /**
   * No description
   * @tags Specification
   * @name SpecificationsRemoveLanguageValueUpdate
   * @summary Remove values for language from specification definition
   * @request PUT:/product-api/specifications/{specificationId}/remove-language-value
   * @secure
   */
  export namespace SpecificationsRemoveLanguageValueUpdate {
    export type RequestParams = {
      /** Id of the specification */
      specificationId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = SpecificationsRemoveLanguageValueUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoHelperDllBaseBaseReturn;
  }

  /**
   * No description
   * @tags Specification
   * @name SpecificationsRemoveAllowedValueLanguageUpdate
   * @summary Remove values for language from specification allowed value
   * @request PUT:/product-api/specifications/{specificationId}/remove-allowed-value-language
   * @secure
   */
  export namespace SpecificationsRemoveAllowedValueLanguageUpdate {
    export type RequestParams = {
      /** Id of the specification */
      specificationId: string;
    };
    export type RequestQuery = {};
    export type RequestBody =
      SpecificationsRemoveAllowedValueLanguageUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoHelperDllBaseBaseReturn;
  }

  /**
   * No description
   * @tags Specification
   * @name SpecificationsMultiComboBoxSpecificationEditAllowedValuesUpdate
   * @summary Add or update value in provided multi-combobox specification object in selected language.
   * @request PUT:/product-api/specifications/{specificationId}/MultiComboBoxSpecificationEditAllowedValues
   * @secure
   */
  export namespace SpecificationsMultiComboBoxSpecificationEditAllowedValuesUpdate {
    export type RequestParams = {
      /** Id of the specification */
      specificationId: string;
    };
    export type RequestQuery = {};
    export type RequestBody =
      SpecificationsMultiComboBoxSpecificationEditAllowedValuesUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoProductDllModelsApiSpecificationSpecificationReturn;
  }

  /**
   * No description
   * @tags Specification
   * @name SpecificationsComboBoxEditValueScoreUpdate
   * @summary Edit score for specified combo box allowed value score
   * @request PUT:/product-api/specifications/{specificationId}/ComboBoxEditValueScore
   * @secure
   */
  export namespace SpecificationsComboBoxEditValueScoreUpdate {
    export type RequestParams = {
      /** Id of the specification */
      specificationId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = SpecificationsComboBoxEditValueScoreUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoProductDllModelsApiSpecificationSpecificationReturn;
  }

  /**
   * No description
   * @tags Specification
   * @name SpecificationsMultiComboBoxEditValueScoreUpdate
   * @summary Edit score for specified multi combo box value
   * @request PUT:/product-api/specifications/{specificationId}/MultiComboBoxEditValueScore
   * @secure
   */
  export namespace SpecificationsMultiComboBoxEditValueScoreUpdate {
    export type RequestParams = {
      /** Id of the specification */
      specificationId: string;
    };
    export type RequestQuery = {};
    export type RequestBody =
      SpecificationsMultiComboBoxEditValueScoreUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoProductDllModelsApiSpecificationSpecificationReturn;
  }

  /**
   * No description
   * @tags Specification
   * @name SpecificationsMultiComboBoxSpecificationRemoveAllowedValuesUpdate
   * @summary Remove allowed value in provided multicombobox specification object in selected language.
   * @request PUT:/product-api/specifications/{specificationId}/MultiComboBoxSpecificationRemoveAllowedValues
   * @secure
   */
  export namespace SpecificationsMultiComboBoxSpecificationRemoveAllowedValuesUpdate {
    export type RequestParams = {
      /** Id of the specification */
      specificationId: string;
    };
    export type RequestQuery = {};
    export type RequestBody =
      SpecificationsMultiComboBoxSpecificationRemoveAllowedValuesUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoProductDllModelsApiSpecificationSpecificationReturn;
  }

  /**
   * No description
   * @tags Specification
   * @name SpecificationsComboBoxSpecificationEditAllowedValuesUpdate
   * @summary Add or update value in provided combobox specification object in selected language.
   * @request PUT:/product-api/specifications/{specificationId}/ComboBoxSpecificationEditAllowedValues
   * @secure
   */
  export namespace SpecificationsComboBoxSpecificationEditAllowedValuesUpdate {
    export type RequestParams = {
      /** Id of the specification */
      specificationId: string;
    };
    export type RequestQuery = {};
    export type RequestBody =
      SpecificationsComboBoxSpecificationEditAllowedValuesUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoProductDllModelsApiSpecificationSpecificationReturn;
  }

  /**
   * No description
   * @tags Specification
   * @name SpecificationsComboBoxSpecificationRemoveAllowedValuesUpdate
   * @summary Remove allowed value in provided combobox specification object in selected language.
   * @request PUT:/product-api/specifications/{specificationId}/ComboBoxSpecificationRemoveAllowedValues
   * @secure
   */
  export namespace SpecificationsComboBoxSpecificationRemoveAllowedValuesUpdate {
    export type RequestParams = {
      /** Id of the specification */
      specificationId: string;
    };
    export type RequestQuery = {};
    export type RequestBody =
      SpecificationsComboBoxSpecificationRemoveAllowedValuesUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoProductDllModelsApiSpecificationSpecificationReturn;
  }

  /**
   * No description
   * @tags Specification
   * @name SpecificationsNumberSpecificationEditUnitUpdate
   * @summary Update unit in provided number specification object in selected language.
   * @request PUT:/product-api/specifications/{specificationId}/NumberSpecificationEditUnit
   * @secure
   */
  export namespace SpecificationsNumberSpecificationEditUnitUpdate {
    export type RequestParams = {
      /** Id of the specification */
      specificationId: string;
    };
    export type RequestQuery = {};
    export type RequestBody =
      SpecificationsNumberSpecificationEditUnitUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoProductDllModelsApiSpecificationSpecificationReturn;
  }

  /**
   * No description
   * @tags Specification
   * @name SpecificationsNumberImperialSpecificationEditUnitsUpdate
   * @summary Update unit and imperial unit in provided number imperial specification object in selected language.
   * @request PUT:/product-api/specifications/{specificationId}/NumberImperialSpecificationEditUnits
   * @secure
   */
  export namespace SpecificationsNumberImperialSpecificationEditUnitsUpdate {
    export type RequestParams = {
      /** Id of the specification */
      specificationId: string;
    };
    export type RequestQuery = {};
    export type RequestBody =
      SpecificationsNumberImperialSpecificationEditUnitsUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoProductDllModelsApiSpecificationSpecificationReturn;
  }

  /**
   * No description
   * @tags Specification
   * @name SpecificationsDelete
   * @summary Deletes specification identified by specification id
   * @request DELETE:/product-api/specifications/{specificationId}
   * @secure
   */
  export namespace SpecificationsDelete {
    export type RequestParams = {
      /** Id of the specification */
      specificationId: string;
    };
    export type RequestQuery = {
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoHelperDllBaseBaseReturn;
  }

  /**
   * No description
   * @tags Specification
   * @name SpecificationsGetSpecificationUsedValuesList
   * @summary Get used values for specification.
   * @request GET:/product-api/specifications/{specificationId}/GetSpecificationUsedValues
   * @secure
   */
  export namespace SpecificationsGetSpecificationUsedValuesList {
    export type RequestParams = {
      /** Id of the specification */
      specificationId: string;
    };
    export type RequestQuery = {
      IsCache?: boolean;
      /**
       * Contains list of possible languages
       * @default "CZECH"
       */
      language?: VinistoHelperDllEnumsLanguage;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoProductDllModelsApiSpecificationSpecificationValuesReturn;
  }

  /**
 * No description
 * @tags Specifications
 * @name SpecificationsList
 * @summary Gets the specifications by provided limit and offset sorted by the provided sortByColumn parameter, the sort direction is determined by the sortDesc parameter.
If searchName was specified, specifications will be searched according to these specified parameters.
 * @request GET:/product-api/specifications
 * @secure
*/
  export namespace SpecificationsList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** If provided search by name in specifications */
      SearchName?: string;
      /** If true, searchName is used as StartWith instead of Contains */
      IsSearchNameAutocomplete?: boolean;
      /**
       * Language of the requested category
       * Language version - if provided, all specifications will be only in selected language.
       * Sorting and searching will be according to the specified language
       * Otherwise all language version will be provided and sorting and searching will be according to the default language (CZECH).
       */
      Language?: VinistoHelperDllEnumsLanguage;
      /** If true search only between hidden specifications, if false search only between active specifications, if not provided search all specifications */
      ShowHidden?: boolean;
      /** If provided search by type in specifications */
      SpecificationType?: VinistoHelperDllEnumsSpecificationSpecificationType;
      /** If provided, sorting will be done according to this column. if not provided, default sorting is done by Id */
      SortingColumn?: VinistoHelperDllEnumsSpecificationSortableColumns;
      /** True in case that sorting shall be done in descending order */
      IsSortingDescending?: boolean;
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
      /** Currency to get min and max price value */
      currency?: VinistoHelperDllEnumsCurrency;
      IsCache?: boolean;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoProductDllModelsApiSpecificationSpecificationsReturn;
  }

  /**
   * No description
   * @tags Specifications
   * @name SpecificationsCreate
   * @summary Creates new specification object from provided parameters.
   * @request POST:/product-api/specifications
   * @secure
   */
  export namespace SpecificationsCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SpecificationsCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoProductDllModelsApiSpecificationSpecificationReturn;
  }

  /**
 * No description
 * @tags Specifications
 * @name SpecificationsGetAutocompleteNamesList
 * @summary Find and get specifications, specifications will be searched according to the entered letters (min. 3)
It will return specifications only in provided language.
 * @request GET:/product-api/specifications/GetAutocompleteNames
 * @secure
*/
  export namespace SpecificationsGetAutocompleteNamesList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** Contains list of possible languages */
      language?: VinistoHelperDllEnumsLanguage;
      /** Searching string in provided language. */
      searchingNameString?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoProductDllModelsApiSpecificationSpecificationsReturn;
  }

  /**
   * No description
   * @tags Tag
   * @name TagsDetail
   * @summary Get tag for provided ID
   * @request GET:/product-api/tags/{tagId}
   * @secure
   */
  export namespace TagsDetail {
    export type RequestParams = {
      /** Id of the tag to get */
      tagId: string;
    };
    export type RequestQuery = {
      IsCache?: boolean;
      /**
       * Identifies type of the country
       * @default "CZ"
       */
      countryOfSale?: VinistoHelperDllEnumsCountryCode;
      /**
       * Currency
       * @default "CZK"
       */
      currency?: VinistoHelperDllEnumsCurrency;
      /**
       * Flag specifies loading specifications details to tag. Default is false - not load specifications details.
       * @default false
       */
      includeSpecifications?: boolean;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiTagTagReturn;
  }

  /**
   * No description
   * @tags Tag
   * @name TagsPartialUpdate
   * @summary Update tag
   * @request PATCH:/product-api/tags/{tagId}
   * @secure
   */
  export namespace TagsPartialUpdate {
    export type RequestParams = {
      /** Id of the tag */
      tagId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = TagsPartialUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiTagTagReturn;
  }

  /**
   * No description
   * @tags Tag
   * @name TagsDelete
   * @summary Deletes tag identified by tag id
   * @request DELETE:/product-api/tags/{tagId}
   * @secure
   */
  export namespace TagsDelete {
    export type RequestParams = {
      /** Id of the tag */
      tagId: string;
    };
    export type RequestQuery = {
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
      /**
       * Identifies type of the country
       * @default "CZ"
       */
      countryOfSale?: VinistoHelperDllEnumsCountryCode;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoHelperDllBaseBaseReturn;
  }

  /**
   * No description
   * @tags Tag
   * @name TagsSetEnableUpdate
   * @summary Update tag enable value
   * @request PUT:/product-api/tags/{tagId}/set-enable
   * @secure
   */
  export namespace TagsSetEnableUpdate {
    export type RequestParams = {
      /** Id of the tag */
      tagId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = TagsSetEnableUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiTagTagReturn;
  }

  /**
   * No description
   * @tags Tag
   * @name TagsSpecificationsList
   * @summary Get all specifications for provided tag
   * @request GET:/product-api/tags/{tagId}/specifications
   * @secure
   */
  export namespace TagsSpecificationsList {
    export type RequestParams = {
      /** Id of the tag to get all specifications */
      tagId: string;
    };
    export type RequestQuery = {
      /**
       * Flag to get hidden specifications
       * @default false
       */
      hiddenSpecification?: boolean;
      /**
       * Identifies type of the country
       * @default "CZ"
       */
      countryOfSale?: VinistoHelperDllEnumsCountryCode;
      /**
       * Currency
       * @default "CZK"
       */
      currency?: VinistoHelperDllEnumsCurrency;
      /**
       * Price level for loading prices to specification
       * @default "Level1"
       */
      priceLevel?: VinistoHelperDllEnumsPriceLevel;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoProductDllModelsApiSpecificationSpecificationsReturn;
  }

  /**
   * No description
   * @tags Tag
   * @name TagsGetBundlesCountForTagList
   * @summary Get bundles count for tag based on tag specifications
   * @request GET:/product-api/tags/{tagId}/get-bundles-count-for-tag
   * @secure
   */
  export namespace TagsGetBundlesCountForTagList {
    export type RequestParams = {
      /** Id of the tag to get all specifications */
      tagId: string;
    };
    export type RequestQuery = {
      /**
       * Identifies type of the country
       * @default "CZ"
       */
      countryOfSale?: VinistoHelperDllEnumsCountryCode;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoProductDllModelsApiSpecificationSpecificationsReturn;
  }

  /**
   * No description
   * @tags Tags
   * @name TagsList
   * @summary Get Tags according to provided parameters
   * @request GET:/product-api/tags
   * @secure
   */
  export namespace TagsList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** If provided search by url in categories */
      SearchUrl?: string;
      /** If provided search by name in categories */
      SearchName?: string;
      /** If provided search by IsInHomePage */
      IsInHomePage?: boolean;
      /** If provided search by IsEnabled */
      IsEnabled?: boolean;
      /** If true, searchName is used as StartWith instead of Contains */
      IsSearchNameAutocomplete?: boolean;
      /** What currency is requested. Default value is CZK. */
      Currency?: VinistoHelperDllEnumsCurrency;
      /** If provided, sorting will be done according to this column. if not provided, default sorting is done by Id */
      SortingColumn?: VinistoHelperDllEnumsTagSortableColumns;
      /** True in case that sorting shall be done in descending order */
      IsSortingDescending?: boolean;
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
      /** If true, then return only allowed tags for filtering. If false, then return only no allowed tags for filtering. If not provided, then return all tags. */
      IsShownInFilters?: boolean;
      /** Country of sale. Default is CZ. All bundles which are returned must be allowed to sale in country and specify language version of tag. */
      CountryOfSale?: VinistoHelperDllEnumsCountryCode;
      /**
       * Filter only active tags (current timestamp is between ValidFrom and ValidTo).
       * If is null, then are filtered all tags.
       * If is true, then only active tags, otherwise not active tags.
       */
      IsTagActive?: boolean;
      /**
       * By default is true, return all type tags.
       * If false, return all non-system type tags.
       */
      IncludeSystemTypeTags?: boolean;
      IsCache?: boolean;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiTagTagsReturn;
  }

  /**
   * No description
   * @tags Tags
   * @name TagsCreate
   * @summary Create new tag with provided parameters
   * @request POST:/product-api/tags
   * @secure
   */
  export namespace TagsCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = TagsCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiTagTagReturn;
  }

  /**
 * No description
 * @tags Tags
 * @name TagsGetAutocompleteNamesList
 * @summary Find and get tags, tags will be searched according to the entered letters (min. 3)
It will return tags only in provided language.
 * @request GET:/product-api/tags/GetAutocompleteNames
 * @secure
*/
  export namespace TagsGetAutocompleteNamesList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** Searching string in provided language. */
      searchingNameString?: string;
      IsCache?: boolean;
      /**
       * Identifies type of the country
       * @default "CZ"
       */
      countryOfSale?: VinistoHelperDllEnumsCountryCode;
      /**
       * Currency
       * @default "CZK"
       */
      currency?: VinistoHelperDllEnumsCurrency;
      /**
       * By default is true, return all type tags. If false, return all non-system type tags.
       * @default true
       */
      includeSystemTypeTags?: boolean;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiTagTagsReturn;
  }

  /**
   * No description
   * @tags Tags
   * @name TagsGetTagByUrlList
   * @summary Get tag for provided url
   * @request GET:/product-api/tags/{tagUrl}/GetTagByUrl
   * @secure
   */
  export namespace TagsGetTagByUrlList {
    export type RequestParams = {
      /** Url of the tag to get */
      tagUrl: string;
    };
    export type RequestQuery = {
      IsCache?: boolean;
      /**
       * Identifies type of the country
       * @default "CZ"
       */
      countryOfSale?: VinistoHelperDllEnumsCountryCode;
      /**
       * Currency
       * @default "CZK"
       */
      currency?: VinistoHelperDllEnumsCurrency;
      /**
       * Flag specifies loading specifications details to tag. Default is false - not load specifications details.
       * @default false
       */
      includeSpecifications?: boolean;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiTagTagReturn;
  }

  /**
   * No description
   * @tags Tags
   * @name TagsCreateTagLanguageVersionCreate
   * @summary Create new tag language version for provided tag id by parameters
   * @request POST:/product-api/tags/{tagId}/create-tag-language-version
   * @secure
   */
  export namespace TagsCreateTagLanguageVersionCreate {
    export type RequestParams = {
      /** Base tag */
      tagId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = TagsCreateTagLanguageVersionCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiTagTagReturn;
  }

  /**
 * No description
 * @tags TagSpecifications
 * @name TagsSpecificationsAddCheckboxSpecificationCreate
 * @summary CheckBox Specification
Add new specification or edit specification value for the provided tag.
 * @request POST:/product-api/tags/{tagId}/{countryOfSale}/specifications/add-checkbox-specification
 * @secure
*/
  export namespace TagsSpecificationsAddCheckboxSpecificationCreate {
    export type RequestParams = {
      /** Tag id as string */
      tagId: string;
      /** Identifies type of the country */
      countryOfSale: VinistoHelperDllEnumsCountryCode;
    };
    export type RequestQuery = {};
    export type RequestBody =
      TagsSpecificationsAddCheckboxSpecificationCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiCategoryCategoryReturn;
  }

  /**
 * No description
 * @tags TagSpecifications
 * @name TagsSpecificationsAddMultiComboboxSpecificationCreate
 * @summary MultiComboBox Specification
Add new specification or edit specification values for the provided tag.
 * @request POST:/product-api/tags/{tagId}/{countryOfSale}/specifications/add-multi-combobox-specification
 * @secure
*/
  export namespace TagsSpecificationsAddMultiComboboxSpecificationCreate {
    export type RequestParams = {
      /** Tag id as string */
      tagId: string;
      /** Identifies type of the country */
      countryOfSale: VinistoHelperDllEnumsCountryCode;
    };
    export type RequestQuery = {};
    export type RequestBody =
      TagsSpecificationsAddMultiComboboxSpecificationCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiCategoryCategoryReturn;
  }

  /**
 * No description
 * @tags TagSpecifications
 * @name TagsSpecificationsAddComboboxSpecificationCreate
 * @summary ComboBox Specification
Add new specification or edit specification value for the provided tag.
 * @request POST:/product-api/tags/{tagId}/{countryOfSale}/specifications/add-combobox-specification
 * @secure
*/
  export namespace TagsSpecificationsAddComboboxSpecificationCreate {
    export type RequestParams = {
      /** Tag id as string */
      tagId: string;
      /** Identifies type of the country */
      countryOfSale: VinistoHelperDllEnumsCountryCode;
    };
    export type RequestQuery = {};
    export type RequestBody =
      TagsSpecificationsAddComboboxSpecificationCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiCategoryCategoryReturn;
  }

  /**
 * No description
 * @tags TagSpecifications
 * @name TagsSpecificationsAddNumberSpecificationCreate
 * @summary Number Specification
Add new specification or edit specification value for the provided tag.
 * @request POST:/product-api/tags/{tagId}/{countryOfSale}/specifications/add-number-specification
 * @secure
*/
  export namespace TagsSpecificationsAddNumberSpecificationCreate {
    export type RequestParams = {
      /** Tag id as string */
      tagId: string;
      /** Identifies type of the country */
      countryOfSale: VinistoHelperDllEnumsCountryCode;
    };
    export type RequestQuery = {};
    export type RequestBody =
      TagsSpecificationsAddNumberSpecificationCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiCategoryCategoryReturn;
  }

  /**
 * No description
 * @tags TagSpecifications
 * @name TagsSpecificationsAddNumberImperialSpecificationCreate
 * @summary Imperial Number Specification
Add new specification or edit specification value for the provided tag.
 * @request POST:/product-api/tags/{tagId}/{countryOfSale}/specifications/add-number-imperial-specification
 * @secure
*/
  export namespace TagsSpecificationsAddNumberImperialSpecificationCreate {
    export type RequestParams = {
      /** Tag id as string */
      tagId: string;
      /** Identifies type of the country */
      countryOfSale: VinistoHelperDllEnumsCountryCode;
    };
    export type RequestQuery = {};
    export type RequestBody =
      TagsSpecificationsAddNumberImperialSpecificationCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiCategoryCategoryReturn;
  }

  /**
 * No description
 * @tags TagSpecifications
 * @name TagsSpecificationsAddDecimalNumberSpecificationCreate
 * @summary Decimal Number Specification
Add new specification or edit specification value for the provided tag.
 * @request POST:/product-api/tags/{tagId}/{countryOfSale}/specifications/add-decimal-number-specification
 * @secure
*/
  export namespace TagsSpecificationsAddDecimalNumberSpecificationCreate {
    export type RequestParams = {
      /** Tag id as string */
      tagId: string;
      /** Identifies type of the country */
      countryOfSale: VinistoHelperDllEnumsCountryCode;
    };
    export type RequestQuery = {};
    export type RequestBody =
      TagsSpecificationsAddDecimalNumberSpecificationCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiCategoryCategoryReturn;
  }

  /**
 * No description
 * @tags TagSpecifications
 * @name TagsSpecificationsAddDecimalNumberImperialSpecificationCreate
 * @summary Imperial Decimal Number Specification
Add new specification or edit specification value for the provided tag.
 * @request POST:/product-api/tags/{tagId}/{countryOfSale}/specifications/add-decimal-number-imperial-specification
 * @secure
*/
  export namespace TagsSpecificationsAddDecimalNumberImperialSpecificationCreate {
    export type RequestParams = {
      /** Tag id as string */
      tagId: string;
      /** Identifies type of the country */
      countryOfSale: VinistoHelperDllEnumsCountryCode;
    };
    export type RequestQuery = {};
    export type RequestBody =
      TagsSpecificationsAddDecimalNumberImperialSpecificationCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiCategoryCategoryReturn;
  }

  /**
 * No description
 * @tags TagSpecifications
 * @name TagsSpecificationsAddTextSpecificationCreate
 * @summary Text Specification
Add new specification or edit specification value for the provided tag.
 * @request POST:/product-api/tags/{tagId}/{countryOfSale}/specifications/add-text-specification
 * @secure
*/
  export namespace TagsSpecificationsAddTextSpecificationCreate {
    export type RequestParams = {
      /** Tag id as string */
      tagId: string;
      /** Identifies type of the country */
      countryOfSale: VinistoHelperDllEnumsCountryCode;
    };
    export type RequestQuery = {};
    export type RequestBody =
      TagsSpecificationsAddTextSpecificationCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiCategoryCategoryReturn;
  }

  /**
   * No description
   * @tags TagSpecifications
   * @name TagsSpecificationsDelete
   * @summary Delete specification from provided tag.
   * @request DELETE:/product-api/tags/{tagId}/{countryOfSale}/specifications/{specificationId}
   * @secure
   */
  export namespace TagsSpecificationsDelete {
    export type RequestParams = {
      tagId: string;
      /** Identifies type of the country */
      countryOfSale: VinistoHelperDllEnumsCountryCode;
      specificationId: string;
    };
    export type RequestQuery = {
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoProductDllModelsApiCategoryCategoryReturn;
  }

  /**
   * No description
   * @tags VirtualCategories
   * @name VirtualCategoriesList
   * @summary Get virtual categories filtered and sorted by provided parameters.
   * @request GET:/product-api/virtual-categories
   * @secure
   */
  export namespace VirtualCategoriesList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** If provided search by url. */
      SearchUrl?: string;
      /** If provided search by group. */
      SearchGroup?: string;
      /** If provided search by group. */
      SearchTitleH1?: string;
      /** If provided search by group. */
      SearchState?: VinistoHelperDllEnumsVirtualCategoryState;
      /**
       * Language of the requested virtual category.
       * Language version - if provided, all categories will be only in selected language.
       * Sorting and searching will be according to the specified language.
       * Otherwise all language version will be provided and sorting and searching will be according to the default language (CZECH).
       */
      Language?: VinistoHelperDllEnumsLanguage;
      /** If provided, sorting will be done according to this column. if not provided, default sorting is done by Id */
      SortingColumn?: VinistoHelperDllEnumsVirtualCategorySortableColumns;
      /** True in case that sorting shall be done in descending order */
      IsSortingDescending?: boolean;
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
      IsCache?: boolean;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoProductDllModelsApiVirtualCategoryVirtualCategoriesReturn;
  }

  /**
   * No description
   * @tags VirtualCategories
   * @name VirtualCategoriesCreate
   * @summary Create virtual category.
   * @request POST:/product-api/virtual-categories
   * @secure
   */
  export namespace VirtualCategoriesCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = VirtualCategoriesCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoProductDllModelsApiVirtualCategoryVirtualCategoryReturn;
  }

  /**
   * No description
   * @tags VirtualCategory
   * @name VirtualCategoriesDetail
   * @summary Get virtual category for provided ID.
   * @request GET:/product-api/virtual-categories/{virtualCategoryId}
   * @secure
   */
  export namespace VirtualCategoriesDetail {
    export type RequestParams = {
      /** Id of the virtual category to get */
      virtualCategoryId: string;
    };
    export type RequestQuery = {
      IsCache?: boolean;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoProductDllModelsApiVirtualCategoryVirtualCategoryReturn;
  }

  /**
   * No description
   * @tags VirtualCategory
   * @name VirtualCategoriesUpdate
   * @summary Update virtual category.
   * @request PUT:/product-api/virtual-categories/{virtualCategoryId}
   * @secure
   */
  export namespace VirtualCategoriesUpdate {
    export type RequestParams = {
      /** Id of the virtual category */
      virtualCategoryId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = VirtualCategoriesUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoProductDllModelsApiVirtualCategoryVirtualCategoryReturn;
  }

  /**
   * No description
   * @tags VirtualCategory
   * @name VirtualCategoriesDelete
   * @summary Deletes virtual category.
   * @request DELETE:/product-api/virtual-categories/{virtualCategoryId}
   * @secure
   */
  export namespace VirtualCategoriesDelete {
    export type RequestParams = {
      /** Id of the virtual category */
      virtualCategoryId: string;
    };
    export type RequestQuery = {
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoProductDllModelsApiVirtualCategoryVirtualCategoryReturn;
  }

  /**
   * No description
   * @tags VirtualCategory
   * @name VirtualCategoriesGetVirtualCategoryByUrlList
   * @summary Get virtual category for provided URL. Virtual category must be published.
   * @request GET:/product-api/virtual-categories/{virtualCategoryUrl}/get-virtual-category-by-url
   * @secure
   */
  export namespace VirtualCategoriesGetVirtualCategoryByUrlList {
    export type RequestParams = {
      /** URL of the virtual category to get */
      virtualCategoryUrl: string;
    };
    export type RequestQuery = {
      /** Language in which the virtual category will be received */
      language?: VinistoHelperDllEnumsLanguage;
      IsCache?: boolean;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoProductDllModelsApiVirtualCategoryVirtualCategoryReturn;
  }

  /**
   * No description
   * @tags VirtualCategory
   * @name VirtualCategoriesSwitchStatePartialUpdate
   * @summary Publish a virtual category.
   * @request PATCH:/product-api/virtual-categories/{virtualCategoryId}/switch-state
   * @secure
   */
  export namespace VirtualCategoriesSwitchStatePartialUpdate {
    export type RequestParams = {
      /** Id of the virtual category */
      virtualCategoryId: string;
    };
    export type RequestQuery = {
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoProductDllModelsApiVirtualCategoryVirtualCategoryReturn;
  }
}
