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

/** VatRate<p>Members:</p><ul><li><i>BaseVat</i> - Base VAT level e.g. 21%</ li > <li><i>FirstReducedVat</i> - First reduced VAT level e.g. 15%</ li > <li><i>SecondReducedVat</i> - Second reduced VAT level e.g. 10%</ li > <li><i>NoVat</i> - No VAT e.g. 0%</ li > </ul> */
export enum VinistoHelperDllEnumsVatRate {
  BaseVat = "BaseVat",
  FirstReducedVat = "FirstReducedVat",
  SecondReducedVat = "SecondReducedVat",
  NoVat = "NoVat",
}

/** Contains list of possible columns for sorting<p>Members:</p><ul><li><i>ID</i> - Default sorting by ID</ li > <li><i>TIME</i> - Sorting by action time</ li > </ul> */
export enum VinistoHelperDllEnumsUserLogSortableColumns {
  ID = "ID",
  TIME = "TIME",
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

/** Contains list of possible apps to user login<p>Members:</p><ul></ul> */
export enum VinistoHelperDllEnumsUserTokenType {
  Facebook = "Facebook",
  Google = "Google",
  Apple = "Apple",
  Seznam = "Seznam",
}

/** Contains list of possible columns for sorting<p>Members:</p><ul></ul> */
export enum VinistoHelperDllEnumsUserSortableColumns {
  ID = "ID",
  EMAIL = "EMAIL",
  CREATED_AT = "CREATED_AT",
  LAST_LOGIN_TIME = "LAST_LOGIN_TIME",
  IS_IN_SUPPLIER = "IS_IN_SUPPLIER",
  IS_SUPER_ADMIN = "IS_SUPER_ADMIN",
  COMPANY_NAME = "COMPANY_NAME",
}

/** Contains list of possible types User API hashs<p>Members:</p><ul><li><i>SHOP</i> - Shop login hash</ li > <li><i>ADMIN</i> - Admin login hash</ li > <li><i>CLIENT</i> - Client login hash</ li > </ul> */
export enum VinistoHelperDllEnumsUserLoginHashType {
  SHOP = "SHOP",
  ADMIN = "ADMIN",
  CLIENT = "CLIENT",
}

/** Identifies preferred company payment type.<p>Members:</p><ul></ul> */
export enum VinistoHelperDllEnumsUserCompanyPaymentType {
  CARD = "CARD",
  CASH = "CASH",
  BANK_TRANSFER = "BANK_TRANSFER",
  BY_HANDOVER = "BY_HANDOVER",
  INVOICE = "INVOICE",
  PROFORMA_INVOICE = "PROFORMA_INVOICE",
}

/** Identifies merchant rights.<p>Members:</p><ul></ul> */
export enum VinistoHelperDllEnumsUserCompanyMerchantRights {
  OrdersConfirmation = "OrdersConfirmation",
  UsersManagement = "UsersManagement",
  OrdersCreation = "OrdersCreation",
  ReportsAccess = "ReportsAccess",
  MerchantListAccess = "MerchantListAccess",
}

/** Identifies company user rights.<p>Members:</p><ul></ul> */
export enum VinistoHelperDllEnumsUserCompanyCompanyUserRights {
  Admin = "Admin",
  Reader = "Reader",
  Merchant = "Merchant",
  Buyer = "Buyer",
}

/** Identifies preferred communication types.<p>Members:</p><ul></ul> */
export enum VinistoHelperDllEnumsUserCompanyCommunicationType {
  Email = "Email",
  Phone = "Phone",
  EmailAndPhone = "EmailAndPhone",
}

/** Types of tag.<p>Members:</p><ul><li><i>User</i> - User tag type can be edited by admin.</ li > <li><i>System</i> - System tag type is triggered by automatic systems and can't be manually changed.</ li > <li><i>Personalized</i> - Personalized tag types are created by user behaviour.</ li > </ul> */
export enum VinistoHelperDllEnumsTagTagType {
  User = "User",
  System = "System",
  Personalized = "Personalized",
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

/** Identifies type of the country<p>Members:</p><ul><li><i>CZ</i> - Czech Republic</ li > <li><i>SK</i> - Slovakia</ li > <li><i>DE</i> - Germany</ li > <li><i>UK</i> - United Kingdom</ li > <li><i>PL</i> - Poland</ li > </ul> */
export enum VinistoHelperDllEnumsCountryCode {
  CZ = "CZ",
  SK = "SK",
  DE = "DE",
  UK = "UK",
  PL = "PL",
}

/** Identifies preferred company payment type.<p>Members:</p><ul></ul> */
export enum VinistoHelperDllEnumsCompanyUserIndustryType {
  Retail = "Retail",
  Wholesale = "Wholesale",
  Production = "Production",
  Construction = "Construction",
  Services = "Services",
  Others = "Others",
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

/** <p>Members:</p><ul></ul> */
export enum VinistoHelperDllEnumsBundleBundleState {
  Concept = "Concept",
  ToConfirm = "ToConfirm",
  Confirmed = "Confirmed",
  Rejected = "Rejected",
}

/** Represents user address */
export interface VinistoAuthDllModelsApiAddressAddress {
  /**
   * Id of the Address
   * @minLength 1
   */
  id: string;
  /**
   * Name of the addressee
   * @minLength 1
   */
  name: string;
  /**
   * Surname of the addressee
   * @minLength 1
   */
  surname: string;
  /** Company */
  company?: string | null;
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

/** Parameters used for creating new address */
export type VinistoAuthDllModelsApiAddressUserAddressCreateParameters =
  VinistoAuthDllModelsApiAddressUserAddressManipulationParameters & object;

/** Parameters used for editing user address */
export type VinistoAuthDllModelsApiAddressUserAddressEditParameters =
  VinistoAuthDllModelsApiAddressUserAddressManipulationParameters & object;

/** Parameters used for manipulation user address */
export interface VinistoAuthDllModelsApiAddressUserAddressManipulationParameters {
  /**
   * Name of the addressee
   * @minLength 1
   */
  name: string;
  /**
   * Surname of the addressee
   * @minLength 1
   */
  surname: string;
  /** Company */
  company?: string | null;
  isDefault?: boolean;
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
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

/** Return object from user address controllers */
export interface VinistoAuthDllModelsApiAddressUserAddressReturn {
  /** Found Address */
  address?: VinistoAuthDllModelsApiAddressAddress | null;
  /** Has occurred any error. */
  isError?: boolean;
  /** List of errors code that occurred during the api request. */
  error?: VinistoHelperDllBaseError[] | null;
}

/** Return object from user address controllers */
export interface VinistoAuthDllModelsApiAddressUserAddressesReturn {
  /** List of found Addresses */
  addresses?: VinistoAuthDllModelsApiAddressAddress[] | null;
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

/** Represents user billing information */
export interface VinistoAuthDllModelsApiBillingInfoBillingInfo {
  /**
   * Id of the Billing Information
   * @minLength 1
   */
  id: string;
  /**
   * Person's first name
   * @minLength 1
   */
  name: string;
  /**
   * Person's second name
   * @minLength 1
   */
  surname: string;
  /** Name of the company */
  company?: string | null;
  /** Personal Identification Number */
  ico?: string | null;
  /** VAT (value-added tax) number */
  dic?: string | null;
  /** Account number (without bank code) */
  accountNumber?: string | null;
  /** Bank code */
  bankCode?: string | null;
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

/** Parameters used for creating new user billing info */
export type VinistoAuthDllModelsApiBillingInfoUserBillingInfoCreateParameters =
  VinistoAuthDllModelsApiBillingInfoUserBillingInfoManipulationParameters &
    object;

/** Parameters used for editing user billing info */
export type VinistoAuthDllModelsApiBillingInfoUserBillingInfoEditParameters =
  VinistoAuthDllModelsApiBillingInfoUserBillingInfoManipulationParameters &
    object;

/** Parameters used for manipulation billing info */
export interface VinistoAuthDllModelsApiBillingInfoUserBillingInfoManipulationParameters {
  /**
   * Person's first name
   * @minLength 1
   */
  name: string;
  /**
   * Person's second name
   * @minLength 1
   */
  surname: string;
  /** Name of the company */
  company?: string | null;
  /** Personal Identification Number */
  ico?: string | null;
  /** VAT (value-added tax) number */
  dic?: string | null;
  /** Account number (without bank code) */
  accountNumber?: string | null;
  /** Bank code */
  bankCode?: string | null;
  isDefault?: boolean;
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
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

/** Return object of the user billing information controllers */
export interface VinistoAuthDllModelsApiBillingInfoUserBillingInfoReturn {
  /** Billing Information object */
  billingInfo?: VinistoAuthDllModelsApiBillingInfoBillingInfo | null;
  /** Has occurred any error. */
  isError?: boolean;
  /** List of errors code that occurred during the api request. */
  error?: VinistoHelperDllBaseError[] | null;
}

/** Return object of the user billing information controllers */
export interface VinistoAuthDllModelsApiBillingInfoUserBillingInfosReturn {
  /** List of Billing Information */
  billingInfos?: VinistoAuthDllModelsApiBillingInfoBillingInfo[] | null;
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

/** Represents favorite */
export interface VinistoAuthDllModelsApiFavoriteFavorite {
  /**
   * Id of favorite
   * @minLength 1
   */
  id: string;
  /** Id of logged user */
  userId?: string | null;
  /** Id of anonymous user */
  anonymousUserId?: string | null;
  /** List of items favorite by user */
  items: (
    | VinistoAuthDllModelsApiFavoriteFavoriteItem
    | VinistoAuthDllModelsApiFavoriteFavoriteBundle
  )[];
}

/** Represents favorited bundle */
export type VinistoAuthDllModelsApiFavoriteFavoriteBundle =
  VinistoAuthDllModelsApiFavoriteFavoriteItem & {
    /** Bundle in Favorite */
    bundle: VinistoProductDllModelsApiBundleBundle;
  };

/** Represents favorite item */
export interface VinistoAuthDllModelsApiFavoriteFavoriteItem {
  /**
   * Id of the item
   * @minLength 1
   */
  itemId: string;
}

/** Parameters used for creating new favorite item */
export type VinistoAuthDllModelsApiFavoriteUserFavoriteCreateParameters =
  VinistoAuthDllModelsApiFavoriteUserFavoriteManipulationParameters & object;

/** Parameters used to delete favorite or favorites by not null parameter */
export type VinistoAuthDllModelsApiFavoriteUserFavoriteDeleteParameters =
  VinistoAuthDllModelsApiFavoriteUserFavoriteManipulationBaseParameters &
    object;

/** Parameters used for editing favorite item */
export type VinistoAuthDllModelsApiFavoriteUserFavoriteEditParameters =
  VinistoAuthDllModelsApiFavoriteUserFavoriteManipulationParameters & object;

/** Parameters used to merge favorites items of a logged-in and anonymous user */
export type VinistoAuthDllModelsApiFavoriteUserFavoriteGetParameters =
  VinistoAuthDllModelsApiFavoriteUserFavoriteManipulationBaseParameters & {
    /** Identifies type of the country */
    countryOfSale?: VinistoHelperDllEnumsCountryCode;
    /** Currency */
    currency?: VinistoHelperDllEnumsCurrency;
  };

/** Parameters used for manipulation favorite item */
export interface VinistoAuthDllModelsApiFavoriteUserFavoriteManipulationBaseParameters {
  /** User hash to authorize operation */
  userLoginHash?: string | null;
  /** Id of anonymous user */
  anonymousUserId?: string | null;
}

/** Parameters used for manipulation favorite item */
export type VinistoAuthDllModelsApiFavoriteUserFavoriteManipulationParameters =
  VinistoAuthDllModelsApiFavoriteUserFavoriteManipulationBaseParameters & {
    /**
     * Id of the item
     * @minLength 1
     */
    itemId: string;
  };

/** Parameters used to merge favorites items of a logged-in and anonymous user */
export type VinistoAuthDllModelsApiFavoriteUserFavoriteMergeParameters =
  VinistoAuthDllModelsApiFavoriteUserFavoriteManipulationBaseParameters &
    object;

/** Return API object for Favorite */
export interface VinistoAuthDllModelsApiFavoriteUserFavoriteReturn {
  /** Favorite object */
  favorite?: VinistoAuthDllModelsApiFavoriteFavorite | null;
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

/** Parameters used to add permission to user */
export type VinistoAuthDllModelsApiPermissionUserPermissionAddParameters =
  VinistoAuthDllModelsApiPermissionUserPermissionManipulationParameters &
    object;

/** Parameters used to delete permission from user */
export type VinistoAuthDllModelsApiPermissionUserPermissionDeleteParameters =
  VinistoAuthDllModelsApiPermissionUserPermissionManipulationParameters &
    object;

/** Parameters used for manipulation user */
export interface VinistoAuthDllModelsApiPermissionUserPermissionManipulationParameters {
  /** Represents various user rights */
  permissionId: VinistoHelperDllEnumsUserUserRights;
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

export type VinistoAuthDllModelsApiPermissionUserPermissionValidationParameters =
  VinistoAuthDllModelsApiPermissionUserPermissionManipulationParameters &
    object;

/** Parameters used for adding merchant to the company. */
export interface VinistoAuthDllModelsApiUserAddMerchantToCompanyParameters {
  merchantId: string | null;
  /** Identifies company user rights. */
  right: VinistoHelperDllEnumsUserCompanyCompanyUserRights;
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

/** Represents a buyer user. */
export type VinistoAuthDllModelsApiUserBaseBuyerUser =
  VinistoAuthDllModelsApiUserBaseUser & {
    /** Agreement of credential conditions is confirmed */
    isAgreementCC?: boolean;
    /**
     * Time of the CC (credential conditions) agreement - timestamp in seconds from 1.1.1970
     * @format int64
     */
    agreementCCTime?: number | null;
    /** Flag for sending newsletter */
    isNewsletterActive?: boolean;
    /**
     * Time of  agreement sending newsletter - timestamp in seconds from 1.1.1970
     * @format int64
     */
    isNewsletterActiveTime?: number | null;
  };

export interface VinistoAuthDllModelsApiUserBaseUser {
  /**
   * Id of the User
   * @minLength 1
   */
  id: string;
  /** Contains list of possible types User types. */
  type?: VinistoHelperDllEnumsUserUserType;
  /**
   * Email of the user
   * @minLength 1
   */
  email: string;
  /**
   * Login key
   * @minLength 1
   */
  loginKey: string;
  /** Password hash */
  passwordHash?: string | null;
  /** Login hash */
  loginHash?: string | null;
  /**
   * Time of the registration - timestamp in seconds from 1.1.1970
   * @format int64
   */
  createdAt?: number;
  /**
   * Time of the last login - timestamp in seconds from 1.1.1970
   * @format int64
   */
  lastLoginTime?: number | null;
  /** Is email verified */
  isEmailVerified?: boolean;
  /** List of available user permissions */
  permissions: VinistoHelperDllEnumsUserUserRights[];
  /** Is user who can assign rights to other users */
  isSuperAdmin?: boolean;
  nickname?: string | null;
  /** Identifies type of the country */
  registrationCountry?: VinistoHelperDllEnumsCountryCode;
  priceLevel?: VinistoHelperDllEnumsPriceLevel | null;
  /** Contains list of possible company states. */
  state?: VinistoHelperDllEnumsUserUserState;
}

/** Parameters used for change password */
export interface VinistoAuthDllModelsApiUserChangePasswordParameters {
  /** Old password in plaintext */
  oldPassword?: string | null;
  /**
   * New password in plaintext
   * @minLength 1
   */
  newPassword: string;
  /**
   * The ID of the user whose password is being changed, unless the user logged in using LoginHash
   * changes his or her own password
   */
  userId?: string | null;
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

/** Represents a company. Includes main company data. */
export type VinistoAuthDllModelsApiUserCompany =
  VinistoAuthDllModelsApiUserBaseBuyerUser & {
    firstName?: string | null;
    surname?: string | null;
    phone?: string | null;
    companyEmail?: string | null;
    positionInCompany?: string | null;
    name?: string | null;
    ico?: string | null;
    /** @format int64 */
    customerFrom?: number;
    bankAccount?: string | null;
    /** @format int32 */
    invoiceDueDate?: number;
    /** @format double */
    credit?: number;
    /** Identifies preferred company payment type. */
    paymentMethod?: VinistoHelperDllEnumsUserCompanyPaymentType;
    /** Identifies preferred company payment type. */
    industryType?: VinistoHelperDllEnumsCompanyUserIndustryType;
    /** @format double */
    monthlyTurnover?: number;
    /** @format int32 */
    orderingFrequency?: number;
    users?: VinistoAuthDllModelsApiUserCompanyUser[] | null;
    /** Default or first billing address. */
    billingAddress?: VinistoAuthDllModelsApiBillingInfoBillingInfo | null;
    agreementCCNote?: string | null;
    /** Contains data obtained form ares and mfcr. */
    validationData?: VinistoAuthDllModelsApiUserCompanyValidationData | null;
  };

/** Represents a company user. */
export interface VinistoAuthDllModelsApiUserCompanyUser {
  userId?: string | null;
  /** Identifies company user rights. */
  right?: VinistoHelperDllEnumsUserCompanyCompanyUserRights;
  /** Represents a company user detail with necessary data. */
  companyUserDetail?: VinistoAuthDllModelsApiUserCompanyUserDetail | null;
}

/** Represents a company user detail with necessary data. */
export interface VinistoAuthDllModelsApiUserCompanyUserDetail {
  firstName?: string | null;
  surname?: string | null;
  phone?: string | null;
  email?: string | null;
}

/** Contains data obtained form ares and mfcr. */
export interface VinistoAuthDllModelsApiUserCompanyValidationData {
  companyName?: string | null;
  companyType?: string | null;
  /** @format int64 */
  creationDate?: number;
  /** @format int32 */
  companyAgeInMonths?: number;
  dic?: string | null;
  isVatPayer?: boolean;
  isVatPayerTrustworthy?: boolean | null;
  hasRecordInIsir?: boolean;
  /** @format int64 */
  lastValidatedAt?: number;
  hasEnableCreditPayment?: boolean;
}

/** Represents a user model provided in api */
export interface VinistoAuthDllModelsApiUserCompanyValidationResponse {
  hasUserNonPaidInvoiceOrInvoiceWithStateOverdue?: boolean;
  /** @format double */
  totalAmountNonPaidInvoices?: number | null;
  isVatPayer?: boolean | null;
  isVatPayerTrustworthy?: boolean | null;
  hasRecordInIsir?: boolean | null;
  canPayByCredit?: boolean;
  /** @format int32 */
  totalInvoiceOverdue?: number | null;
  /** @format double */
  totalAmountNonPaidInvoicesOverdue?: number | null;
  /** @format double */
  totalAmountWithVatNonPaidInvoicesOverdue?: number | null;
  /** @format int32 */
  nonPaidInvoicesOverdue?: number | null;
}

/** Return object for company credit payment validation */
export interface VinistoAuthDllModelsApiUserCompanyValidationReturn {
  /** Represents a user model provided in api */
  result?: VinistoAuthDllModelsApiUserCompanyValidationResponse | null;
  /** Has occurred any error. */
  isError?: boolean;
  /** List of errors code that occurred during the api request. */
  error?: VinistoHelperDllBaseError[] | null;
}

/** Parameters used for email verify */
export interface VinistoAuthDllModelsApiUserEmailAuthParameters {
  /**
   * Hash for email verify
   * @minLength 1
   */
  hash: string;
  /** Currency */
  currency?: VinistoHelperDllEnumsCurrency;
  /** Identifies type of the country */
  countryOfSale?: VinistoHelperDllEnumsCountryCode;
  /** Contains list of possible languages */
  language?: VinistoHelperDllEnumsLanguage;
}

/** Parameters to user login by external app */
export interface VinistoAuthDllModelsApiUserLoginExternalAppParameters {
  /** @minLength 1 */
  token: string;
  /** Contains list of possible apps to user login */
  loginExternalAppType: VinistoHelperDllEnumsUserTokenType;
  /** Contains list of possible types User API hashs */
  hashType: VinistoHelperDllEnumsUserLoginHashType;
  /** Currency */
  currency?: VinistoHelperDllEnumsCurrency;
  /** Identifies type of the country */
  countryOfSale?: VinistoHelperDllEnumsCountryCode;
  /** Contains list of possible languages */
  language?: VinistoHelperDllEnumsLanguage;
}

/** Parameters used for login */
export interface VinistoAuthDllModelsApiUserLoginParameters {
  /**
   * Email login address
   * @minLength 1
   */
  email: string;
  /**
   * Password in plaintext
   * @minLength 1
   */
  password: string;
  /** Contains list of possible types User API hashs */
  hashType: VinistoHelperDllEnumsUserLoginHashType;
}

/** Parameters used for logout */
export interface VinistoAuthDllModelsApiUserLogoutParameters {
  /** Contains list of possible types User API hashs */
  hashType: VinistoHelperDllEnumsUserLoginHashType;
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

/** Represents a company. Includes main company data. */
export type VinistoAuthDllModelsApiUserMerchant =
  VinistoAuthDllModelsApiUserBaseUser & {
    firstName?: string | null;
    surname?: string | null;
    phone?: string | null;
    /** @format int32 */
    feePercentage?: number;
    /** @format int64 */
    startDate?: number;
    internalNote?: string | null;
    merchantRights?: VinistoHelperDllEnumsUserCompanyMerchantRights[] | null;
    companies?: string[] | null;
    /** Default or first billing address. */
    billingAddress?: VinistoAuthDllModelsApiBillingInfoBillingInfo | null;
  };

/** Parameters used to remove merchant from the company. */
export interface VinistoAuthDllModelsApiUserRemoveMerchantFromCompanyParameters {
  merchantId: string | null;
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

/** Parameters used for reset password */
export interface VinistoAuthDllModelsApiUserResetPasswordParameters {
  /**
   * Reset hash by which is the user identified
   * @minLength 1
   */
  resetHash: string;
  /**
   * New password in plaintext
   * @minLength 1
   */
  newPassword: string;
}

/** Represents a user model provided in api */
export type VinistoAuthDllModelsApiUserUser =
  VinistoAuthDllModelsApiUserBaseBuyerUser & {
    /** List of available user permissions */
    suppliers: VinistoSupplierDllModelsApiSupplierSupplier[];
  };

/** Parameters used for changing user registration country */
export interface VinistoAuthDllModelsApiUserUserChangeRegistrationCountryParameters {
  /** Registration country. */
  registrationCountry?: VinistoHelperDllEnumsCountryCode | null;
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

/** Parameters used for creating new company. */
export type VinistoAuthDllModelsApiUserUserCompanyCreateParameters =
  VinistoAuthDllModelsApiUserUserManipulationParameters & {
    ico: string | null;
    firstName: string | null;
    surname: string | null;
    phone: string | null;
    companyEmail: string | null;
    positionInCompany?: string | null;
    /** Represents user billing information */
    billingInfo: VinistoAuthDllModelsApiBillingInfoBillingInfo | null;
    /** Represents user address */
    deliveryAddress: VinistoAuthDllModelsApiAddressAddress | null;
    /** Identifies preferred company payment type. */
    industryType?: VinistoHelperDllEnumsCompanyUserIndustryType;
    priceLevel: VinistoHelperDllEnumsPriceLevel;
    merchantId?: string | null;
    /** @format int32 */
    invoiceDueDate?: number | null;
    /** Identifies preferred company payment type. */
    paymentMethod?: VinistoHelperDllEnumsUserCompanyPaymentType;
    /** @format double */
    monthlyTurnover?: number | null;
    /** @format double */
    credit?: number;
    /** @format int32 */
    orderingFrequency?: number | null;
    agreementCCNote?: string | null;
    /** Identifies preferred communication types. */
    preferredCommunicationType?: VinistoHelperDllEnumsUserCompanyCommunicationType;
    /** Contains list of possible company states. */
    userState?: VinistoHelperDllEnumsUserUserState;
    /** Password of the user */
    password: string | null;
    /** Contains list of possible types User API hashs */
    hashType: VinistoHelperDllEnumsUserLoginHashType;
    /** Identifies type of the country */
    registrationCountry: VinistoHelperDllEnumsCountryCode;
    isNewsletterActive: boolean;
    isAgreementCC: boolean;
  };

/** Parameters used for creating new company. */
export type VinistoAuthDllModelsApiUserUserCompanyEditParameters =
  VinistoAuthDllModelsApiUserUserManipulationParameters & {
    ico?: string | null;
    firstName?: string | null;
    surname?: string | null;
    phone?: string | null;
    companyEmail?: string | null;
    positionInCompany?: string | null;
    industryType?: VinistoHelperDllEnumsCompanyUserIndustryType | null;
    priceLevel?: VinistoHelperDllEnumsPriceLevel | null;
    /** @format int32 */
    invoiceDueDate?: number | null;
    paymentMethod?: VinistoHelperDllEnumsUserCompanyPaymentType | null;
    /** @format double */
    monthlyTurnover?: number | null;
    /** @format double */
    credit?: number | null;
    /** @format int32 */
    orderingFrequency?: number | null;
    agreementCCNote?: string | null;
    preferredCommunicationType?: VinistoHelperDllEnumsUserCompanyCommunicationType | null;
    isNewsletterActive?: boolean | null;
    isAgreementCC?: boolean | null;
  };

/** Parameters used for creating new user */
export type VinistoAuthDllModelsApiUserUserCreateParameters =
  VinistoAuthDllModelsApiUserUserManipulationParameters & {
    /** Use MasterPassword to create user with super admin right */
    masterPassword?: string | null;
    /**
     * Password of the user
     * @minLength 1
     */
    password: string;
    /** Flag for sending newsletter */
    isNewsletterActive?: boolean;
    /** Agreement of credential conditions is confirmed */
    isAgreementCC: boolean;
    /** Contains list of possible types User API hashs */
    hashType: VinistoHelperDllEnumsUserLoginHashType;
    /** Identifies type of the country */
    registrationCountry?: VinistoHelperDllEnumsCountryCode;
  };

/** Parameters used for editing user */
export type VinistoAuthDllModelsApiUserUserEditParameters =
  VinistoAuthDllModelsApiUserUserManipulationParameters & {
    /** Flag for sending newsletter */
    isNewsletterActive?: boolean | null;
    /** Agreement of credential conditions is confirmed */
    isAgreementCC?: boolean | null;
  };

/** Parameters used for manipulation user */
export interface VinistoAuthDllModelsApiUserUserManipulationParameters {
  /** User hash to authorize operation */
  userLoginHash?: string | null;
  /** Email of the user */
  email: string | null;
  /** User nickname */
  nickname?: string | null;
}

/** Parameters used for creating new user */
export type VinistoAuthDllModelsApiUserUserMerchantCreateParameters =
  VinistoAuthDllModelsApiUserUserManipulationParameters & {
    firstName: string | null;
    surname: string | null;
    phone: string | null;
    /** @format int32 */
    feePercentage: number;
    /** @format int64 */
    startDate: number;
    internalNote?: string | null;
    merchantRights?: VinistoHelperDllEnumsUserCompanyMerchantRights[] | null;
    /** Contains list of possible company states. */
    userState?: VinistoHelperDllEnumsUserUserState;
    /** Password of the user */
    password: string | null;
    /** Contains list of possible types User API hashs */
    hashType: VinistoHelperDllEnumsUserLoginHashType;
    /** Identifies type of the country */
    registrationCountry: VinistoHelperDllEnumsCountryCode;
  };

/** Parameters used for to merchant edit. */
export type VinistoAuthDllModelsApiUserUserMerchantEditParameters =
  VinistoAuthDllModelsApiUserUserManipulationParameters & {
    firstName?: string | null;
    surname?: string | null;
    phone?: string | null;
    /** @format int32 */
    feePercentage?: number | null;
    /** @format int64 */
    startDate?: number | null;
    internalNote?: string | null;
    merchantRights?: VinistoHelperDllEnumsUserCompanyMerchantRights[] | null;
    userState?: VinistoHelperDllEnumsUserUserState | null;
  };

/** Return object from User Controllers */
export interface VinistoAuthDllModelsApiUserUserReturn {
  /** User object */
  user?:
    | VinistoAuthDllModelsApiUserBaseBuyerUser
    | VinistoAuthDllModelsApiUserCompany
    | VinistoAuthDllModelsApiUserMerchant
    | VinistoAuthDllModelsApiUserUser
    | null;
  /** Has occurred any error. */
  isError?: boolean;
  /** List of errors code that occurred during the api request. */
  error?: VinistoHelperDllBaseError[] | null;
}

/** Return list object from User Controllers */
export interface VinistoAuthDllModelsApiUserUsersReturn {
  /** List of User object */
  users?:
    | (
        | VinistoAuthDllModelsApiUserBaseBuyerUser
        | VinistoAuthDllModelsApiUserCompany
        | VinistoAuthDllModelsApiUserMerchant
        | VinistoAuthDllModelsApiUserUser
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

/** Represents a user log api object */
export interface VinistoAuthDllModelsApiUserLogUserLog {
  /**
   * Id
   * @minLength 1
   */
  id: string;
  /**
   * User id
   * @minLength 1
   */
  userId: string;
  /**
   * Time of the log - timestamp in seconds from 1.1.1970
   * @format int64
   */
  createdAt: number;
  /**
   * The IP Address from which the action was done.
   * @minLength 1
   */
  ipAddress: string;
  /**
   * The action which is logged
   * @minLength 1
   */
  action: string;
  /** Note to the logged action */
  note?: string | null;
}

/** Return list object from User Logs Controller */
export interface VinistoAuthDllModelsApiUserLogUserLogsReturn {
  /** List of UserLog object */
  userLogs?: VinistoAuthDllModelsApiUserLogUserLog[] | null;
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

export type VinistoCommonDllModelsApiPricesOrderConditionPrice =
  VinistoCommonDllModelsApiPricesPrice & {
    /** @format double */
    minOrderPrice?: number;
    /** @format double */
    maxOrderPrice?: number;
  };

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
  VinistoCommonDllModelsApiPricesTimeLimitedPriceDiscount & {
    /** @format double */
    value?: number;
    /** @format double */
    valueWithVat?: number;
    values?: Record<string, VinistoCommonDllModelsApiPricesSetItemPrice>;
  };

export type VinistoCommonDllModelsApiPricesPriceDiscountSupplier =
  VinistoCommonDllModelsApiPricesTimeLimitedPriceDiscount & {
    /** @format double */
    value?: number;
    /** @format double */
    valueWithVat?: number;
  };

export type VinistoCommonDllModelsApiPricesPriceDiscountVinisto =
  VinistoCommonDllModelsApiPricesTimeLimitedPriceDiscount & {
    /** @format double */
    value?: number;
    /** @format double */
    valueWithVat?: number;
  };

export type VinistoCommonDllModelsApiPricesPriceDiscountVolume =
  VinistoCommonDllModelsApiPricesTimeLimitedPriceDiscount & {
    values?: Record<string, number>;
    isSupplierDiscount?: boolean;
  };

export interface VinistoCommonDllModelsApiPricesSetItemPrice {
  setPrice?:
    | VinistoCommonDllModelsApiPricesPrice
    | VinistoCommonDllModelsApiPricesOrderConditionPrice
    | null;
  originalPrice?:
    | VinistoCommonDllModelsApiPricesPrice
    | VinistoCommonDllModelsApiPricesOrderConditionPrice
    | null;
  isSupplierDiscount?: boolean;
}

export type VinistoCommonDllModelsApiPricesTimeLimitedPriceDiscount =
  VinistoCommonDllModelsApiPricesBasePrice & {
    type?: VinistoHelperDllEnumsPriceDiscountType;
    /** @format int64 */
    validFrom?: number | null;
    /** @format int64 */
    validTo?: number | null;
  };

export interface VinistoCommonDllModelsApiSpecificationsBaseSpecification {
  /** @minLength 1 */
  definitionId: string;
  /** Contains list of possible specification type */
  type?: VinistoHelperDllEnumsSpecificationSpecificationType;
}

export type VinistoCommonDllModelsApiSpecificationsCheckBoxSpecification =
  VinistoCommonDllModelsApiSpecificationsBaseSpecification & {
    allowedValues: boolean[];
  };

export type VinistoCommonDllModelsApiSpecificationsComboBoxSpecification =
  VinistoCommonDllModelsApiSpecificationsStringSpecification & object;

export type VinistoCommonDllModelsApiSpecificationsDecimalNumberSpecification =
  VinistoCommonDllModelsApiSpecificationsBaseSpecification & {
    isImperial?: boolean;
    allowedValues: number[];
  };

export type VinistoCommonDllModelsApiSpecificationsMultiComboBoxSpecification =
  VinistoCommonDllModelsApiSpecificationsStringSpecification & object;

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
  VinistoCommonDllModelsApiSpecificationsStringSpecification & object;

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

/** Base return class containing count of items in result. */
export type VinistoHelperDllBaseBaseReturnWithCount =
  VinistoHelperDllBaseBaseReturn & {
    /**
     * Total count of available objects in respective collection.
     * @format int64
     */
    count?: number;
  };

/** Return object with bool value */
export type VinistoHelperDllBaseBoolReturn = VinistoHelperDllBaseBaseReturn & {
  /** Bool object */
  result?: boolean | null;
};

/** Return object with decimal value */
export type VinistoHelperDllBaseDecimalReturn =
  VinistoHelperDllBaseBaseReturn & {
    /** @format double */
    result?: number | null;
  };

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
export type VinistoHelperDllBaseItemAssignParameters =
  VinistoHelperDllBaseAuthorizationParameters & {
    /**
     * Id of an object which is being assigned to a different object
     * @minLength 1
     */
    itemId: string;
  };

/** Parameters used for assigning one object to another by country. */
export type VinistoHelperDllBaseItemAssignWithCountryParameters =
  VinistoHelperDllBaseAuthorizationParameters & {
    /**
     * Id of an object which is being assigned to a different object.
     * @minLength 1
     */
    itemId: string;
    /** Identifies type of the country */
    countryOfSale?: VinistoHelperDllEnumsCountryCode;
  };

/** Parameters used for assigning one object to another objects */
export type VinistoHelperDllBaseItemsAssignParameters =
  VinistoHelperDllBaseAuthorizationParameters & {
    /** Id of objects to update */
    objectIds: string[];
    /**
     * Id of an object which is being assigned to a different object
     * @minLength 1
     */
    itemId: string;
  };

/** Parameters used for assigning one object by country to another objects. */
export type VinistoHelperDllBaseItemsAssignWithCountryParameters =
  VinistoHelperDllBaseAuthorizationParameters & {
    /** Id of objects to update */
    objectIds: string[];
    /**
     * Id of an object which is being assigned to a different object
     * @minLength 1
     */
    itemId: string;
    /** Identifies type of the country */
    countryOfSale?: VinistoHelperDllEnumsCountryCode;
  };

/** Return object with bool value */
export type VinistoHelperDllBaseStringReturn =
  VinistoHelperDllBaseBaseReturn & {
    /** String result */
    result?: string | null;
  };

export interface VinistoImageDllModelsApiImageBaseImage {
  id?: string | null;
  /** Identifies object type to which an image is assigned */
  objectType?: VinistoHelperDllEnumsImageImageObjectType;
  isMain?: boolean;
}

export type VinistoImageDllModelsApiImageImage =
  VinistoImageDllModelsApiImageUrlsImage & {
    objectId?: string | null;
  };

export type VinistoImageDllModelsApiImageSvgImage =
  VinistoImageDllModelsApiImageBaseImage & {
    url?: string | null;
  };

export type VinistoImageDllModelsApiImageSvgObjectImage =
  VinistoImageDllModelsApiImageSvgImage & {
    itemId?: string | null;
  };

export type VinistoImageDllModelsApiImageUrlsImage =
  VinistoImageDllModelsApiImageBaseImage & {
    domainUrls?: Record<string, string>;
  };

export interface VinistoProductDllModelsApiBundleBundle {
  /** @minLength 1 */
  id: string;
  name: VinistoProductDllModelsApiMultiLangValue[];
  description: VinistoProductDllModelsApiMultiLangValue[];
  metaDescription: VinistoProductDllModelsApiMultiLangValue[];
  shortDescription: VinistoProductDllModelsApiMultiLangValue[];
  text: VinistoProductDllModelsApiMultiLangValue[];
  url: VinistoProductDllModelsApiMultiLangValue[];
  prices: (
    | VinistoCommonDllModelsApiPricesPrice
    | VinistoCommonDllModelsApiPricesOrderConditionPrice
  )[];
  /** @format double */
  lowestInternetPrice?: number | null;
  priceDiscounts?:
    | (
        | VinistoCommonDllModelsApiPricesOrderConditionPrice
        | VinistoCommonDllModelsApiPricesPrice
        | VinistoCommonDllModelsApiPricesPriceDiscountSet
        | VinistoCommonDllModelsApiPricesPriceDiscountSupplier
        | VinistoCommonDllModelsApiPricesPriceDiscountVinisto
        | VinistoCommonDllModelsApiPricesPriceDiscountVolume
        | VinistoCommonDllModelsApiPricesTimeLimitedPriceDiscount
      )[]
    | null;
  items: (
    | VinistoProductDllModelsApiBundleItemsBundleItem
    | VinistoProductDllModelsApiBundleItemsProductItem
  )[];
  images: VinistoImageDllModelsApiImageImage[];
  isEnabled?: boolean;
  isDeleted?: boolean;
  tags: VinistoProductDllModelsApiBundleTag[];
  tagsDetail: VinistoProductDllModelsApiTagTag[];
  categories: string[];
  categoriesDetail: VinistoProductDllModelsApiCategoryCategory[];
  language?: VinistoHelperDllEnumsLanguage | null;
  alternativeBundles: string[];
  alternativeBundleObjects?: VinistoProductDllModelsApiBundleBundle[] | null;
  specificationDetails: VinistoProductDllModelsApiSpecificationSpecificationDetail[];
  productsDetail: VinistoProductDllModelsApiProductProduct[];
  supplierId?: string | null;
  supplier?: VinistoSupplierDllModelsApiSupplierSupplier | null;
  /** @format int32 */
  availableCount?: number;
  isDeliveryFree?: boolean;
  bundleEvaluation?: VinistoProductDllModelsApiBundleBundleEvaluation | null;
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
  flags: Record<string, boolean>;
  orderLimitation?: VinistoProductDllModelsApiBundleOrderLimitation | null;
  keywords?: VinistoCommonDllModelsApiMultiLangValues[] | null;
  isSet?: boolean;
  setBundles?: VinistoProductDllModelsApiBundleBundle[] | null;
  canSendToWms?: boolean;
  isSaleOver?: boolean;
  /** @format int32 */
  piecesPerPackage?: number | null;
  /** @format int32 */
  packagesOnPallet?: number | null;
  allowedCountries?: VinistoHelperDllEnumsCountryCode[] | null;
  setType?: VinistoHelperDllEnumsBundleSetType;
  states?: VinistoHelperDllEnumsBundleBundleState[] | null;
  isApproved?: boolean;
  warehouseId?: string[] | null;
  availableOnPlatforms?: number[] | null;
}

export interface VinistoProductDllModelsApiBundleBundleEvaluation {
  /** @format int32 */
  averageStars?: number | null;
  /** @format float */
  averageStarsDecimal?: number | null;
  /** @format float */
  averageSweetDry?: number | null;
  /** @format float */
  averageLightHeavy?: number | null;
  /** @format float */
  averageFruitTannic?: number | null;
  /** @format float */
  averageLowHighAccidity?: number | null;
  /** @format int32 */
  totalEvaluationCount?: number | null;
  starCategoryEvaluationCount?: Record<string, number>;
}

export interface VinistoProductDllModelsApiBundleItemsBaseItem {
  itemId?: string | null;
  /** @format int32 */
  amount?: number;
}

export type VinistoProductDllModelsApiBundleItemsBundleItem =
  VinistoProductDllModelsApiBundleItemsBaseItem & {
    id?: string | null;
  };

export type VinistoProductDllModelsApiBundleItemsProductItem =
  VinistoProductDllModelsApiBundleItemsBaseItem & object;

export interface VinistoProductDllModelsApiBundleOrderLimitation {
  /** @format int32 */
  limit?: number;
  /** @format int32 */
  validFrom?: number;
  /** @format int32 */
  validTo?: number | null;
}

export interface VinistoProductDllModelsApiBundleTag {
  tagId?: string | null;
  countriesOfSale?: VinistoHelperDllEnumsCountryCode[] | null;
}

export interface VinistoProductDllModelsApiCategoryCategory {
  /** @minLength 1 */
  id: string;
  name: VinistoProductDllModelsApiMultiLangValue[];
  description: VinistoProductDllModelsApiMultiLangValue[];
  url: VinistoProductDllModelsApiMultiLangValue[];
  images: VinistoImageDllModelsApiImageImage[];
  /** Contains list of possible category types */
  type?: VinistoHelperDllEnumsCategoryCategoryType;
  specificationDetails: VinistoProductDllModelsApiSpecificationSpecificationDetail[];
  metaDescription: VinistoProductDllModelsApiMultiLangValue[];
  metaTitle: VinistoProductDllModelsApiMultiLangValue[];
  keywords?: VinistoCommonDllModelsApiMultiLangValues[] | null;
  allowedSearchCountries?: VinistoHelperDllEnumsCountryCode[] | null;
  parentId?: string | null;
  breadcrumbs?:
    | VinistoProductDllModelsApiCategoryCategoryBreadcrumbItem[]
    | null;
  tags?: VinistoProductDllModelsApiCategoryTag[] | null;
  tagsDetail?: VinistoProductDllModelsApiTagTag[] | null;
  suppliers?: string[] | null;
  suppliersDetail?: VinistoSupplierDllModelsApiSupplierSupplier[] | null;
  availableOnPlatforms?: number[] | null;
  /** Category bundle listing discount filter. */
  bundleDiscountFilter?: VinistoHelperDllEnumsCategoryCategoryBundleDiscountFilter;
}

export interface VinistoProductDllModelsApiCategoryCategoryBreadcrumbItem {
  /** @minLength 1 */
  id: string;
  name: VinistoProductDllModelsApiMultiLangValue[];
  url: VinistoProductDllModelsApiMultiLangValue[];
}

export interface VinistoProductDllModelsApiCategoryTag {
  tagId?: string | null;
  countriesOfSale?: VinistoHelperDllEnumsCountryCode[] | null;
}

export interface VinistoProductDllModelsApiMultiLangValue {
  /** Contains list of possible languages */
  language?: VinistoHelperDllEnumsLanguage;
  /** @minLength 1 */
  value: string;
}

export interface VinistoProductDllModelsApiProductProduct {
  /** @minLength 1 */
  id: string;
  url: VinistoProductDllModelsApiMultiLangValue[];
  name: VinistoProductDllModelsApiMultiLangValue[];
  description: VinistoProductDllModelsApiMultiLangValue[];
  text: VinistoProductDllModelsApiMultiLangValue[];
  prices: (
    | VinistoCommonDllModelsApiPricesPrice
    | VinistoCommonDllModelsApiPricesOrderConditionPrice
  )[];
  images: VinistoImageDllModelsApiImageImage[];
  isEnabled?: boolean;
  isDeleted?: boolean;
  categories: string[];
  tags: VinistoProductDllModelsApiProductTag[];
  tagsDetail: VinistoProductDllModelsApiTagTag[];
  specificationDetails: VinistoProductDllModelsApiSpecificationSpecificationDetail[];
  language?: VinistoHelperDllEnumsLanguage | null;
  /** @format int32 */
  availableCount?: number;
  /** @minLength 1 */
  warehouseId: string;
  ean?: string | null;
  isForLogged?: boolean;
}

export interface VinistoProductDllModelsApiProductTag {
  tagId?: string | null;
  countriesOfSale?: VinistoHelperDllEnumsCountryCode[] | null;
}

export interface VinistoProductDllModelsApiSpecificationSpecificationDetail {
  definition: any;
  value: any;
}

export interface VinistoProductDllModelsApiTagBaseTagSlug {
  value?: string | null;
}

export interface VinistoProductDllModelsApiTagTag {
  /** @minLength 1 */
  id: string;
  /** @minLength 1 */
  name: string;
  description?: string | null;
  metaDescription?: string | null;
  metaTitle?: string | null;
  slugs: VinistoProductDllModelsApiTagTagSlugMain[];
  /** @minLength 1 */
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
  /** @format int64 */
  validFrom?: number | null;
  /** @format int64 */
  validTo?: number | null;
  specifications?:
    | (
        | VinistoCommonDllModelsApiSpecificationsCheckBoxSpecification
        | VinistoCommonDllModelsApiSpecificationsComboBoxSpecification
        | VinistoCommonDllModelsApiSpecificationsDecimalNumberSpecification
        | VinistoCommonDllModelsApiSpecificationsMultiComboBoxSpecification
        | VinistoCommonDllModelsApiSpecificationsNumberSpecification
        | VinistoCommonDllModelsApiSpecificationsStringSpecification
        | VinistoCommonDllModelsApiSpecificationsTextSpecification
      )[]
    | null;
  specificationDetails: VinistoProductDllModelsApiSpecificationSpecificationDetail[];
}

export type VinistoProductDllModelsApiTagTagSlugMain =
  VinistoProductDllModelsApiTagBaseTagSlug & {
    isMain?: boolean;
  };

export interface VinistoSupplierDllModelsApiAddressAddress {
  /** @minLength 1 */
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

export interface VinistoSupplierDllModelsApiCertificateCertificate {
  /** @minLength 1 */
  id: string;
  /** @minLength 1 */
  objectId: string;
  /** @minLength 1 */
  url: string;
}

export interface VinistoSupplierDllModelsApiMultiLangValue {
  /** Contains list of possible languages */
  language?: VinistoHelperDllEnumsLanguage;
  /** @minLength 1 */
  value: string;
}

export interface VinistoSupplierDllModelsApiSupplierSupplier {
  /** @minLength 1 */
  id: string;
  /** @minLength 1 */
  nameWeb: string;
  /** @minLength 1 */
  nameBilling: string;
  abbreviationInFlexibee?: string | null;
  /** @minLength 1 */
  ico: string;
  dic?: string | null;
  address: VinistoSupplierDllModelsApiAddressAddress;
  /** Identifies type of the country */
  countryCode?: VinistoHelperDllEnumsCountryCode;
  userIds: string[];
  users: VinistoSupplierDllModelsApiSupplierUser[];
  supplierTagIds?: string[] | null;
  supplierTags?: VinistoSupplierDllModelsApiSupplierTagGetSupplierTag[] | null;
  /** Contains list of possible supplier type */
  supplierType?: VinistoHelperDllEnumsSupplierSupplierType;
  isShipping?: boolean;
  web: VinistoSupplierDllModelsApiMultiLangValue[];
  companyDescription: VinistoSupplierDllModelsApiMultiLangValue[];
  mainProfile: VinistoSupplierDllModelsApiMultiLangValue[];
  wineRegion: VinistoSupplierDllModelsApiMultiLangValue[];
  logo: VinistoImageDllModelsApiImageImage;
  baseImage: VinistoImageDllModelsApiImageImage;
  certificates: VinistoSupplierDllModelsApiCertificateCertificate[];
  pickupAddress?: VinistoSupplierDllModelsApiAddressAddress | null;
  bankAccountNumber?: string | null;
  couponPrefix?: string | null;
  internalSupplierNote?: string | null;
  /** @format double */
  maxPossibleSupplierDiscountPercentage?: number | null;
  /** @format double */
  maxB2cB2bPriceDifferencePercentage?: number | null;
  /** @format int64 */
  createdAt?: number;
  /** @format double */
  maxB2cPromotionDiscountPercentage?: number | null;
  /** @format int32 */
  maxB2cPromotionsPerYear?: number | null;
}

export interface VinistoSupplierDllModelsApiSupplierUser {
  /** @minLength 1 */
  id: string;
  /** @minLength 1 */
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

export interface ForgottenPasswordListParams {
  /** Email of the user */
  email?: string;
}

/** Parameters used for reset password */
export type ForgottenPasswordUpdatePayload =
  VinistoAuthDllModelsApiUserResetPasswordParameters;

export interface UsersAddressesListParams {
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
  IsCache?: boolean;
  /** If provided deliveryId, it will filter user addresses which can be used for the provided delivery */
  deliveryId?: string;
  /** User ID for operations with its data */
  userId: string;
}

export interface HeadUserApiParams {
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
  IsCache?: boolean;
  /** If provided deliveryId, it will filter user addresses which can be used for the provided delivery */
  deliveryId?: string;
  /** User ID for operations with its data */
  userId: string;
}

/** Parameters used for creating new address */
export type UsersAddressesCreatePayload =
  VinistoAuthDllModelsApiAddressUserAddressCreateParameters;

export interface UsersAddressesDetailParams {
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
  IsCache?: boolean;
  /** User ID for operations with its data */
  userId: string;
  /** Id of the address to get */
  addressId: string;
}

/** Parameters used for editing user address */
export type UsersAddressesUpdatePayload =
  VinistoAuthDllModelsApiAddressUserAddressEditParameters;

export interface UsersAddressesDeleteParams {
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
  /** User ID for operations with its data */
  userId: string;
  /** Id of the address */
  addressId: string;
}

export interface UsersAuthListParams {
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
  IsCache?: boolean;
}

export interface UsersAuthGetAuthUserSupplierListParams {
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
  /** Contains list of possible types User API hashs */
  hashType?: VinistoHelperDllEnumsUserLoginHashType;
}

/** Parameters used for login */
export type UsersAuthLoginUpdatePayload =
  VinistoAuthDllModelsApiUserLoginParameters;

/** Parameters used for logout */
export type UsersAuthLogoutUpdatePayload =
  VinistoAuthDllModelsApiUserLogoutParameters;

/** Parameters used for change password */
export type UsersAuthChangePasswordUpdatePayload =
  VinistoAuthDllModelsApiUserChangePasswordParameters;

/** Parameters to user login by external app */
export type UsersAuthLoginByExternalAppUpdatePayload =
  VinistoAuthDllModelsApiUserLoginExternalAppParameters;

export interface UsersBillingInformationListParams {
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
  IsCache?: boolean;
  /** User ID for operations with its data */
  userId: string;
}

/** Parameters used for creating new user billing info */
export type UsersBillingInformationCreatePayload =
  VinistoAuthDllModelsApiBillingInfoUserBillingInfoCreateParameters;

export interface UsersBillingInformationDetailParams {
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
  /** User ID for operations with its data */
  userId: string;
  /** Id of the billing info to get */
  billingInfoId: string;
}

/** Parameters used for editing user billing info */
export type UsersBillingInformationUpdatePayload =
  VinistoAuthDllModelsApiBillingInfoUserBillingInfoEditParameters;

export interface UsersBillingInformationDeleteParams {
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
  /** User ID for operations with its data */
  userId: string;
  /** Id of the billingInfo */
  billingInfoId: string;
}

export interface ExportListParams {
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
}

export interface FavoritesListParams {
  /** Country of sale. Default is CZ. All bundles which are returned must be allowed to sale in country. */
  CountryOfSale?: VinistoHelperDllEnumsCountryCode;
  /** All prices in response are provided in this currency. Default CZK. */
  Currency?: VinistoHelperDllEnumsCurrency;
  /** User hash to authorize operation */
  UserLoginHash?: string;
  /** Id of anonymous user */
  AnonymousUserId?: string;
  IsCache?: boolean;
}

/** Parameters used for creating new favorite item */
export type FavoritesCreatePayload =
  VinistoAuthDllModelsApiFavoriteUserFavoriteCreateParameters;

export interface FavoritesDeleteParams {
  /** User hash to authorize operation */
  UserLoginHash?: string;
  /** Id of anonymous user */
  AnonymousUserId?: string;
}

/** Parameters used to merge favorites items of a logged-in and anonymous user */
export type FavoritesUpdatePayload =
  VinistoAuthDllModelsApiFavoriteUserFavoriteMergeParameters;

export interface FavoritesDelete2Params {
  /** User hash to authorize operation */
  UserLoginHash?: string;
  /** Id of anonymous user */
  AnonymousUserId?: string;
  /** Favorite item id */
  itemId: string;
}

export interface UserLogsDetailParams {
  /** If provided, sorting will be done according to this column. if not provided, default sorting is done by Id */
  SortingColumn?: VinistoHelperDllEnumsUserLogSortableColumns;
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
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
  userId: string;
}

/** Parameters used to add permission to user */
export type UsersAddPermissionUpdatePayload =
  VinistoAuthDllModelsApiPermissionUserPermissionAddParameters;

/** Parameters used to delete permission from user */
export type UsersDeletePermissionUpdatePayload =
  VinistoAuthDllModelsApiPermissionUserPermissionDeleteParameters;

/** UserPermissionValidationParameters - Parameters for checking whether a user has permission */
export type UsersCheckPermissionCreatePayload =
  VinistoAuthDllModelsApiPermissionUserPermissionValidationParameters;

export interface UsersListParams {
  /** If provided search by email in users */
  SearchEmail?: string;
  /** If true, it will only find users whose id is found in Suppliers.Users, if false, it will only find users whose id is not found in Suppliers.Users. If not provided find all users */
  IsInSupplier?: boolean;
  /** If true, it will only find users whose has any permission, If false, it will only find users without permission. If not provided find all users */
  HasPermission?: boolean;
  /** If provided, sorting will be done according to this column. if not provided, default sorting is done by Id */
  SortingColumn?: VinistoHelperDllEnumsUserSortableColumns;
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
  /** If provided can filter if given user has rights to assign rights to other users */
  IsSuperAdmin?: boolean;
  /** If provided than fiter users by registration country */
  RegistrationCountry?: VinistoHelperDllEnumsCountryCode;
  SearchUsersTypes?: VinistoHelperDllEnumsUserUserType[];
  SearchCompaniesByMerchantId?: string;
  SearchByUserState?: VinistoHelperDllEnumsUserUserState;
  SearchByCompanyIco?: string;
  SearchByCompanyName?: string;
  SearchByCompanyEmail?: string;
  SearchByCompanyPhone?: string;
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
  IsCache?: boolean;
}

/** Parameters used for creating new user */
export type UsersCreatePayload =
  VinistoAuthDllModelsApiUserUserCreateParameters;

export interface UsersCsoListParams {
  UserLoginHash?: string;
  ApiKey?: string;
}

export interface UsersDetailParams {
  UserLoginHash?: string;
  ApiKey?: string;
  IsCache?: boolean;
  /** Id of the user to get */
  userId: string;
}

/** Parameters used for editing user */
export type UsersUpdatePayload = VinistoAuthDllModelsApiUserUserEditParameters;

export interface UsersDeleteParams {
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
  /** Id of the user to delete */
  userId: string;
}

/** Parameters used for email verify */
export type UsersEmailAuthUpdatePayload =
  VinistoAuthDllModelsApiUserEmailAuthParameters;

/** Class containing parameters for user authorization */
export type UsersSetEmailVerifiedUpdatePayload =
  | VinistoHelperDllBaseAuthorizationParameters
  | VinistoHelperDllBaseItemAssignParameters
  | VinistoHelperDllBaseItemAssignWithCountryParameters
  | VinistoHelperDllBaseItemsAssignParameters
  | VinistoHelperDllBaseItemsAssignWithCountryParameters;

export interface UsersIsEmailAlreadyUsedListParams {
  /** Searching email */
  email?: string;
}

/** Parameters used for changing user registration country */
export type UsersChangeRegistrationCountryPartialUpdatePayload =
  VinistoAuthDllModelsApiUserUserChangeRegistrationCountryParameters;

export interface UsersSetNewsletterIsActiveUpdateParams {
  /** Identifies not logged in user by email */
  email?: string;
}

export interface UsersUsersNamesEmailsListParams {
  /** Users ids to get users. */
  usersIds?: string[];
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
}

export interface UsersUsersForBasketListParams {
  /** Users id to get users. */
  userId?: string;
  UserLoginHash?: string;
  ApiKey?: string;
  IsCache?: boolean;
}

/** Parameters used for creating new company. */
export type CompaniesCreatePayload =
  VinistoAuthDllModelsApiUserUserCompanyCreateParameters;

export interface CompaniesExistsByIcoListParams {
  /** Company identification number. */
  ico?: string;
}

/** Parameters used for creating new company. */
export type CompaniesUpdatePayload =
  VinistoAuthDllModelsApiUserUserCompanyEditParameters;

/** Class containing parameters for user authorization */
export type CompaniesActivatePartialUpdatePayload =
  | VinistoHelperDllBaseAuthorizationParameters
  | VinistoHelperDllBaseItemAssignParameters
  | VinistoHelperDllBaseItemAssignWithCountryParameters
  | VinistoHelperDllBaseItemsAssignParameters
  | VinistoHelperDllBaseItemsAssignWithCountryParameters;

/** Class containing parameters for user authorization */
export type CompaniesDeactivatePartialUpdatePayload =
  | VinistoHelperDllBaseAuthorizationParameters
  | VinistoHelperDllBaseItemAssignParameters
  | VinistoHelperDllBaseItemAssignWithCountryParameters
  | VinistoHelperDllBaseItemsAssignParameters
  | VinistoHelperDllBaseItemsAssignWithCountryParameters;

/** Parameters used for adding merchant to the company. */
export type CompaniesAddMerchantPartialUpdatePayload =
  VinistoAuthDllModelsApiUserAddMerchantToCompanyParameters;

/** Parameters used to remove merchant from the company. */
export type CompaniesRemoveMerchantPartialUpdatePayload =
  VinistoAuthDllModelsApiUserRemoveMerchantFromCompanyParameters;

export interface CompaniesVerifyCompanyCreditPaymentListParams {
  UserLoginHash?: string;
  ApiKey?: string;
  /** Company id. */
  companyId: string;
}

/** Parameters used for creating new user */
export type MerchantsCreatePayload =
  VinistoAuthDllModelsApiUserUserMerchantCreateParameters;

/** Parameters used for to merchant edit. */
export type MerchantsUpdatePayload =
  VinistoAuthDllModelsApiUserUserMerchantEditParameters;

/** Class containing parameters for user authorization */
export type MerchantsDeletePayload =
  | VinistoHelperDllBaseAuthorizationParameters
  | VinistoHelperDllBaseItemAssignParameters
  | VinistoHelperDllBaseItemAssignWithCountryParameters
  | VinistoHelperDllBaseItemsAssignParameters
  | VinistoHelperDllBaseItemsAssignWithCountryParameters;

export namespace UserApi {
  /**
   * No description
   * @tags ForgottenPassword
   * @name ForgottenPasswordList
   * @summary Sends email to user with password reset instructions
   * @request GET:/user-api/forgotten-password
   * @secure
   */
  export namespace ForgottenPasswordList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** Email of the user */
      email?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody =
      | VinistoHelperDllBaseBaseReturn
      | VinistoHelperDllBaseBaseReturnWithCount
      | VinistoHelperDllBaseBoolReturn
      | VinistoHelperDllBaseDecimalReturn
      | VinistoHelperDllBaseStringReturn;
  }

  /**
   * No description
   * @tags ForgottenPassword
   * @name ForgottenPasswordUpdate
   * @summary Reset password for user identified by the reset hash. Sets the new provided password
   * @request PUT:/user-api/forgotten-password
   * @secure
   */
  export namespace ForgottenPasswordUpdate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ForgottenPasswordUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody =
      | VinistoHelperDllBaseBaseReturn
      | VinistoHelperDllBaseBaseReturnWithCount
      | VinistoHelperDllBaseBoolReturn
      | VinistoHelperDllBaseDecimalReturn
      | VinistoHelperDllBaseStringReturn;
  }

  /**
   * No description
   * @tags UserAddresses
   * @name UsersAddressesList
   * @summary Get User Addresses according to provided parameters
   * @request GET:/user-api/users/{userId}/addresses
   * @secure
   */
  export namespace UsersAddressesList {
    export type RequestParams = {
      /** User ID for operations with its data */
      userId: string;
    };
    export type RequestQuery = {
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
      IsCache?: boolean;
      /** If provided deliveryId, it will filter user addresses which can be used for the provided delivery */
      deliveryId?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoAuthDllModelsApiAddressUserAddressesReturn;
  }

  /**
   * No description
   * @tags UserAddresses
   * @name HeadUserApi
   * @summary Get User Addresses according to provided parameters
   * @request HEAD:/user-api/users/{userId}/addresses
   * @secure
   */
  export namespace HeadUserApi {
    export type RequestParams = {
      /** User ID for operations with its data */
      userId: string;
    };
    export type RequestQuery = {
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
      IsCache?: boolean;
      /** If provided deliveryId, it will filter user addresses which can be used for the provided delivery */
      deliveryId?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoAuthDllModelsApiAddressUserAddressesReturn;
  }

  /**
   * No description
   * @tags UserAddresses
   * @name UsersAddressesCreate
   * @summary Create new address with provided parameters
   * @request POST:/user-api/users/{userId}/addresses
   * @secure
   */
  export namespace UsersAddressesCreate {
    export type RequestParams = {
      /** User ID for operations with its data */
      userId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UsersAddressesCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoAuthDllModelsApiAddressUserAddressReturn;
  }

  /**
   * No description
   * @tags UserAddresses
   * @name UsersAddressesDetail
   * @summary Get address logged user for provided ID address
   * @request GET:/user-api/users/{userId}/addresses/{addressId}
   * @secure
   */
  export namespace UsersAddressesDetail {
    export type RequestParams = {
      /** User ID for operations with its data */
      userId: string;
      /** Id of the address to get */
      addressId: string;
    };
    export type RequestQuery = {
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
      IsCache?: boolean;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoAuthDllModelsApiAddressUserAddressReturn;
  }

  /**
   * No description
   * @tags UserAddresses
   * @name UsersAddressesUpdate
   * @summary Update address with provided address id and other parameters
   * @request PUT:/user-api/users/{userId}/addresses/{addressId}
   * @secure
   */
  export namespace UsersAddressesUpdate {
    export type RequestParams = {
      /** User ID for operations with its data */
      userId: string;
      /** Id of the address */
      addressId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UsersAddressesUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoAuthDllModelsApiAddressUserAddressReturn;
  }

  /**
   * No description
   * @tags UserAddresses
   * @name UsersAddressesDelete
   * @summary Deletes address identified by address id
   * @request DELETE:/user-api/users/{userId}/addresses/{addressId}
   * @secure
   */
  export namespace UsersAddressesDelete {
    export type RequestParams = {
      /** User ID for operations with its data */
      userId: string;
      /** Id of the address */
      addressId: string;
    };
    export type RequestQuery = {
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody =
      | VinistoHelperDllBaseBaseReturn
      | VinistoHelperDllBaseBaseReturnWithCount
      | VinistoHelperDllBaseBoolReturn
      | VinistoHelperDllBaseDecimalReturn
      | VinistoHelperDllBaseStringReturn;
  }

  /**
   * No description
   * @tags UserAuth
   * @name UsersAuthList
   * @summary Get user object by provided userLoginHash
   * @request GET:/user-api/users/auth
   * @secure
   */
  export namespace UsersAuthList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
      IsCache?: boolean;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoAuthDllModelsApiUserUserReturn;
  }

  /**
   * No description
   * @tags UserAuth
   * @name UsersAuthGetAuthUserSupplierList
   * @summary Get user object witho info about supplier by provided userLoginHash
   * @request GET:/user-api/users/auth/GetAuthUserSupplier
   * @secure
   */
  export namespace UsersAuthGetAuthUserSupplierList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
      /** Contains list of possible types User API hashs */
      hashType?: VinistoHelperDllEnumsUserLoginHashType;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoAuthDllModelsApiUserUserReturn;
  }

  /**
   * No description
   * @tags UserAuth
   * @name UsersAuthLoginUpdate
   * @summary Logs the user by provided email and password
   * @request PUT:/user-api/users/auth/Login
   * @secure
   */
  export namespace UsersAuthLoginUpdate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = UsersAuthLoginUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoAuthDllModelsApiUserUserReturn;
  }

  /**
   * No description
   * @tags UserAuth
   * @name UsersAuthLogoutUpdate
   * @summary Log out the user identified by the provided login hash.
   * @request PUT:/user-api/users/auth/Logout
   * @secure
   */
  export namespace UsersAuthLogoutUpdate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = UsersAuthLogoutUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody =
      | VinistoHelperDllBaseBaseReturn
      | VinistoHelperDllBaseBaseReturnWithCount
      | VinistoHelperDllBaseBoolReturn
      | VinistoHelperDllBaseDecimalReturn
      | VinistoHelperDllBaseStringReturn;
  }

  /**
 * No description
 * @tags UserAuth
 * @name UsersAuthChangePasswordUpdate
 * @summary Change user password.
If userId is specified and the user (according to loginHash) has Super Admin authorization, the userId password is edited
Otherwise the password of the logged in user is edited (according to loginHash)
 * @request PUT:/user-api/users/auth/ChangePassword
 * @secure
*/
  export namespace UsersAuthChangePasswordUpdate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = UsersAuthChangePasswordUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody =
      | VinistoHelperDllBaseBaseReturn
      | VinistoHelperDllBaseBaseReturnWithCount
      | VinistoHelperDllBaseBoolReturn
      | VinistoHelperDllBaseDecimalReturn
      | VinistoHelperDllBaseStringReturn;
  }

  /**
   * No description
   * @tags UserAuth
   * @name UsersAuthLoginByExternalAppUpdate
   * @summary Logs the user by login via third-party app
   * @request PUT:/user-api/users/auth/login-by-external-app
   * @secure
   */
  export namespace UsersAuthLoginByExternalAppUpdate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = UsersAuthLoginByExternalAppUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoAuthDllModelsApiUserUserReturn;
  }

  /**
   * No description
   * @tags UserBillingInformation
   * @name UsersBillingInformationList
   * @summary Get User Billing info according to provided parameters
   * @request GET:/user-api/users/{userId}/billing-information
   * @secure
   */
  export namespace UsersBillingInformationList {
    export type RequestParams = {
      /** User ID for operations with its data */
      userId: string;
    };
    export type RequestQuery = {
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
      IsCache?: boolean;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoAuthDllModelsApiBillingInfoUserBillingInfosReturn;
  }

  /**
   * No description
   * @tags UserBillingInformation
   * @name UsersBillingInformationCreate
   * @summary Create new billingInfo with provided parameters
   * @request POST:/user-api/users/{userId}/billing-information
   * @secure
   */
  export namespace UsersBillingInformationCreate {
    export type RequestParams = {
      /** User ID for operations with its data */
      userId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UsersBillingInformationCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoAuthDllModelsApiBillingInfoUserBillingInfoReturn;
  }

  /**
   * No description
   * @tags UserBillingInformation
   * @name UsersBillingInformationDetail
   * @summary Get Billing info for provided ID billing info
   * @request GET:/user-api/users/{userId}/billing-information/{billingInfoId}
   * @secure
   */
  export namespace UsersBillingInformationDetail {
    export type RequestParams = {
      /** User ID for operations with its data */
      userId: string;
      /** Id of the billing info to get */
      billingInfoId: string;
    };
    export type RequestQuery = {
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoAuthDllModelsApiBillingInfoUserBillingInfoReturn;
  }

  /**
   * No description
   * @tags UserBillingInformation
   * @name UsersBillingInformationUpdate
   * @summary Update billingInfo with provided billingInfo id and other parameters
   * @request PUT:/user-api/users/{userId}/billing-information/{billingInfoId}
   * @secure
   */
  export namespace UsersBillingInformationUpdate {
    export type RequestParams = {
      /** User ID for operations with its data */
      userId: string;
      /** Id of the billingInfo */
      billingInfoId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UsersBillingInformationUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoAuthDllModelsApiBillingInfoUserBillingInfoReturn;
  }

  /**
   * No description
   * @tags UserBillingInformation
   * @name UsersBillingInformationDelete
   * @summary Deletes billing Info identified by billing Info id
   * @request DELETE:/user-api/users/{userId}/billing-information/{billingInfoId}
   * @secure
   */
  export namespace UsersBillingInformationDelete {
    export type RequestParams = {
      /** User ID for operations with its data */
      userId: string;
      /** Id of the billingInfo */
      billingInfoId: string;
    };
    export type RequestQuery = {
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody =
      | VinistoHelperDllBaseBaseReturn
      | VinistoHelperDllBaseBaseReturnWithCount
      | VinistoHelperDllBaseBoolReturn
      | VinistoHelperDllBaseDecimalReturn
      | VinistoHelperDllBaseStringReturn;
  }

  /**
   * No description
   * @tags UserExport
   * @name ExportList
   * @summary Generate xls file with users
   * @request GET:/user-api/export
   * @secure
   */
  export namespace ExportList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
 * No description
 * @tags UserFavorites
 * @name FavoritesList
 * @summary Get favorite. Favorite is identified by logged user (login hash) or anonymous user (anonymous user id)
- one of these two parameters has to be provided.
 * @request GET:/user-api/favorites
 * @secure
*/
  export namespace FavoritesList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** Country of sale. Default is CZ. All bundles which are returned must be allowed to sale in country. */
      CountryOfSale?: VinistoHelperDllEnumsCountryCode;
      /** All prices in response are provided in this currency. Default CZK. */
      Currency?: VinistoHelperDllEnumsCurrency;
      /** User hash to authorize operation */
      UserLoginHash?: string;
      /** Id of anonymous user */
      AnonymousUserId?: string;
      IsCache?: boolean;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoAuthDllModelsApiFavoriteUserFavoriteReturn;
  }

  /**
 * No description
 * @tags UserFavorites
 * @name FavoritesCreate
 * @summary Add bundle to favorite. Favorite is identified by logged user (login hash) or anonymous user (anonymous user id)
- one of these two parameters has to be provided.
If favorite does not exist, new one is created.
 * @request POST:/user-api/favorites
 * @secure
*/
  export namespace FavoritesCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = FavoritesCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody =
      | VinistoHelperDllBaseBaseReturn
      | VinistoHelperDllBaseBaseReturnWithCount
      | VinistoHelperDllBaseBoolReturn
      | VinistoHelperDllBaseDecimalReturn
      | VinistoHelperDllBaseStringReturn;
  }

  /**
   * No description
   * @tags UserFavorites
   * @name FavoritesDelete
   * @summary Cleans favorite - remove all items. Favorite is identified by logged user (login hash) or anonymous user (anonymous user id) - one of these two parameters has to be provided.
   * @request DELETE:/user-api/favorites
   * @secure
   */
  export namespace FavoritesDelete {
    export type RequestParams = {};
    export type RequestQuery = {
      /** User hash to authorize operation */
      UserLoginHash?: string;
      /** Id of anonymous user */
      AnonymousUserId?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody =
      | VinistoHelperDllBaseBaseReturn
      | VinistoHelperDllBaseBaseReturnWithCount
      | VinistoHelperDllBaseBoolReturn
      | VinistoHelperDllBaseDecimalReturn
      | VinistoHelperDllBaseStringReturn;
  }

  /**
 * No description
 * @tags UserFavorites
 * @name FavoritesUpdate
 * @summary Merge favorite. Favorite is identified by logged user (login hash) and anonymous user (anonymous user id)
- both parameters has to be provided.
 * @request PUT:/user-api/favorites
 * @secure
*/
  export namespace FavoritesUpdate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = FavoritesUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody =
      | VinistoHelperDllBaseBaseReturn
      | VinistoHelperDllBaseBaseReturnWithCount
      | VinistoHelperDllBaseBoolReturn
      | VinistoHelperDllBaseDecimalReturn
      | VinistoHelperDllBaseStringReturn;
  }

  /**
 * No description
 * @tags UserFavorites
 * @name FavoritesDelete2
 * @summary Remove one favorite from user's favorites.
One of parameters userLoginHas or anonymousUserId has to be set.
 * @request DELETE:/user-api/favorites/{itemId}
 * @originalName favoritesDelete
 * @duplicate
 * @secure
*/
  export namespace FavoritesDelete2 {
    export type RequestParams = {
      /** Favorite item id */
      itemId: string;
    };
    export type RequestQuery = {
      /** User hash to authorize operation */
      UserLoginHash?: string;
      /** Id of anonymous user */
      AnonymousUserId?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody =
      | VinistoHelperDllBaseBaseReturn
      | VinistoHelperDllBaseBaseReturnWithCount
      | VinistoHelperDllBaseBoolReturn
      | VinistoHelperDllBaseDecimalReturn
      | VinistoHelperDllBaseStringReturn;
  }

  /**
   * No description
   * @tags UserLogs
   * @name UserLogsDetail
   * @summary Get log for user defined by provided user id
   * @request GET:/user-api/user-logs/{userId}
   * @secure
   */
  export namespace UserLogsDetail {
    export type RequestParams = {
      userId: string;
    };
    export type RequestQuery = {
      /** If provided, sorting will be done according to this column. if not provided, default sorting is done by Id */
      SortingColumn?: VinistoHelperDllEnumsUserLogSortableColumns;
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
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoAuthDllModelsApiUserLogUserLogsReturn;
  }

  /**
   * No description
   * @tags UserPermissions
   * @name UsersAddPermissionUpdate
   * @summary Add permission - User with userLoginHash who changes the rights (permissionId) of another user with id
   * @request PUT:/user-api/users/{userId}/AddPermission
   * @secure
   */
  export namespace UsersAddPermissionUpdate {
    export type RequestParams = {
      /** Identifies user for adding rights */
      userId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UsersAddPermissionUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody =
      | VinistoHelperDllBaseBaseReturn
      | VinistoHelperDllBaseBaseReturnWithCount
      | VinistoHelperDllBaseBoolReturn
      | VinistoHelperDllBaseDecimalReturn
      | VinistoHelperDllBaseStringReturn;
  }

  /**
   * No description
   * @tags UserPermissions
   * @name UsersDeletePermissionUpdate
   * @summary Delete permission - User with hash who delete the rights (permissionId) of another user with id
   * @request PUT:/user-api/users/{userId}/DeletePermission
   * @secure
   */
  export namespace UsersDeletePermissionUpdate {
    export type RequestParams = {
      /** Identifies user for deleting rights */
      userId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UsersDeletePermissionUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody =
      | VinistoHelperDllBaseBaseReturn
      | VinistoHelperDllBaseBaseReturnWithCount
      | VinistoHelperDllBaseBoolReturn
      | VinistoHelperDllBaseDecimalReturn
      | VinistoHelperDllBaseStringReturn;
  }

  /**
   * No description
   * @tags UserPermissions
   * @name UsersCheckPermissionCreate
   * @summary Validates whether user provided by userLoginHash has provided user right.
   * @request POST:/user-api/users/CheckPermission
   * @secure
   */
  export namespace UsersCheckPermissionCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = UsersCheckPermissionCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoHelperDllBaseBoolReturn;
  }

  /**
   * No description
   * @tags Users
   * @name UsersList
   * @summary Get Users according to provided parameters
   * @request GET:/user-api/users
   * @secure
   */
  export namespace UsersList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** If provided search by email in users */
      SearchEmail?: string;
      /** If true, it will only find users whose id is found in Suppliers.Users, if false, it will only find users whose id is not found in Suppliers.Users. If not provided find all users */
      IsInSupplier?: boolean;
      /** If true, it will only find users whose has any permission, If false, it will only find users without permission. If not provided find all users */
      HasPermission?: boolean;
      /** If provided, sorting will be done according to this column. if not provided, default sorting is done by Id */
      SortingColumn?: VinistoHelperDllEnumsUserSortableColumns;
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
      /** If provided can filter if given user has rights to assign rights to other users */
      IsSuperAdmin?: boolean;
      /** If provided than fiter users by registration country */
      RegistrationCountry?: VinistoHelperDllEnumsCountryCode;
      SearchUsersTypes?: VinistoHelperDllEnumsUserUserType[];
      SearchCompaniesByMerchantId?: string;
      SearchByUserState?: VinistoHelperDllEnumsUserUserState;
      SearchByCompanyIco?: string;
      SearchByCompanyName?: string;
      SearchByCompanyEmail?: string;
      SearchByCompanyPhone?: string;
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
      IsCache?: boolean;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoAuthDllModelsApiUserUsersReturn;
  }

  /**
   * No description
   * @tags Users
   * @name UsersCreate
   * @summary Create new user with provided parameters
   * @request POST:/user-api/users
   * @secure
   */
  export namespace UsersCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = UsersCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoAuthDllModelsApiUserUserReturn;
  }

  /**
   * No description
   * @tags Users
   * @name UsersCsoList
   * @summary Get active CSO users.
   * @request GET:/user-api/users/cso
   * @secure
   */
  export namespace UsersCsoList {
    export type RequestParams = {};
    export type RequestQuery = {
      UserLoginHash?: string;
      ApiKey?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoAuthDllModelsApiUserUsersReturn;
  }

  /**
   * No description
   * @tags Users
   * @name UsersDetail
   * @summary Get user for provided ID
   * @request GET:/user-api/users/{userId}
   * @secure
   */
  export namespace UsersDetail {
    export type RequestParams = {
      /** Id of the user to get */
      userId: string;
    };
    export type RequestQuery = {
      UserLoginHash?: string;
      ApiKey?: string;
      IsCache?: boolean;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoAuthDllModelsApiUserUserReturn;
  }

  /**
   * No description
   * @tags Users
   * @name UsersUpdate
   * @summary Update user with provided user id and other parameters
   * @request PUT:/user-api/users/{userId}
   * @secure
   */
  export namespace UsersUpdate {
    export type RequestParams = {
      /** Id of the user */
      userId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UsersUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoAuthDllModelsApiUserUserReturn;
  }

  /**
 * No description
 * @tags Users
 * @name UsersDelete
 * @summary Deletes user identified by user id.
At same time, all bindings of deleted user to supplier will be removed
 * @request DELETE:/user-api/users/{userId}
 * @secure
*/
  export namespace UsersDelete {
    export type RequestParams = {
      /** Id of the user to delete */
      userId: string;
    };
    export type RequestQuery = {
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody =
      | VinistoHelperDllBaseBaseReturn
      | VinistoHelperDllBaseBaseReturnWithCount
      | VinistoHelperDllBaseBoolReturn
      | VinistoHelperDllBaseDecimalReturn
      | VinistoHelperDllBaseStringReturn;
  }

  /**
   * No description
   * @tags Users
   * @name UsersEmailAuthUpdate
   * @summary Finds a user according to the provided hash. Sets Email as verified and remove the hash.
   * @request PUT:/user-api/users/EmailAuth
   * @secure
   */
  export namespace UsersEmailAuthUpdate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = UsersEmailAuthUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody =
      | VinistoHelperDllBaseBaseReturn
      | VinistoHelperDllBaseBaseReturnWithCount
      | VinistoHelperDllBaseBoolReturn
      | VinistoHelperDllBaseDecimalReturn
      | VinistoHelperDllBaseStringReturn;
  }

  /**
   * No description
   * @tags Users
   * @name UsersSetEmailVerifiedUpdate
   * @summary Sets verified email to user with specified userId.
   * @request PUT:/user-api/users/{userId}/SetEmailVerified
   * @secure
   */
  export namespace UsersSetEmailVerifiedUpdate {
    export type RequestParams = {
      /** Identifies user for email verification */
      userId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UsersSetEmailVerifiedUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoAuthDllModelsApiUserUserReturn;
  }

  /**
   * No description
   * @tags Users
   * @name UsersIsEmailAlreadyUsedList
   * @summary Check if email address is registered in our mongo DB.
   * @request GET:/user-api/users/IsEmailAlreadyUsed
   * @secure
   */
  export namespace UsersIsEmailAlreadyUsedList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** Searching email */
      email?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoHelperDllBaseBoolReturn;
  }

  /**
   * No description
   * @tags Users
   * @name UsersChangeRegistrationCountryPartialUpdate
   * @summary Change registration country of the user
   * @request PATCH:/user-api/users/{userId}/change-registration-country
   * @secure
   */
  export namespace UsersChangeRegistrationCountryPartialUpdate {
    export type RequestParams = {
      /** Identifies user for email verification */
      userId: string;
    };
    export type RequestQuery = {};
    export type RequestBody =
      UsersChangeRegistrationCountryPartialUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoAuthDllModelsApiUserUserReturn;
  }

  /**
   * No description
   * @tags Users
   * @name UsersSetNewsletterIsActiveUpdate
   * @summary Set IsNewsletterActive flag for not logged in user by email address before sent this info to Ecomail
   * @request PUT:/user-api/users/set-newsletter-is-active
   * @secure
   */
  export namespace UsersSetNewsletterIsActiveUpdate {
    export type RequestParams = {};
    export type RequestQuery = {
      /** Identifies not logged in user by email */
      email?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody =
      | VinistoHelperDllBaseBaseReturn
      | VinistoHelperDllBaseBaseReturnWithCount
      | VinistoHelperDllBaseBoolReturn
      | VinistoHelperDllBaseDecimalReturn
      | VinistoHelperDllBaseStringReturn;
  }

  /**
   * No description
   * @tags Users
   * @name UsersUsersNamesEmailsList
   * @summary Get users names and emails.
   * @request GET:/user-api/users/users-names-emails
   * @secure
   */
  export namespace UsersUsersNamesEmailsList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** Users ids to get users. */
      usersIds?: string[];
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoAuthDllModelsApiUserUserReturn;
  }

  /**
   * No description
   * @tags Users
   * @name UsersUsersForBasketList
   * @summary Get users for basket.
   * @request GET:/user-api/users/users-for-basket
   * @secure
   */
  export namespace UsersUsersForBasketList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** Users id to get users. */
      userId?: string;
      UserLoginHash?: string;
      ApiKey?: string;
      IsCache?: boolean;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoAuthDllModelsApiUserUserReturn;
  }

  /**
   * No description
   * @tags UsersCompanies
   * @name CompaniesCreate
   * @summary Create new company with provided parameters.
   * @request POST:/user-api/companies
   * @secure
   */
  export namespace CompaniesCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CompaniesCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoAuthDllModelsApiUserUserReturn;
  }

  /**
   * No description
   * @tags UsersCompanies
   * @name CompaniesExistsByIcoList
   * @summary Check if ICO is used by a company user.
   * @request GET:/user-api/companies/exists-by-ico
   * @secure
   */
  export namespace CompaniesExistsByIcoList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** Company identification number. */
      ico?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = boolean;
  }

  /**
   * No description
   * @tags UsersCompanies
   * @name CompaniesUpdate
   * @summary Create new company with provided parameters.
   * @request PUT:/user-api/companies/{companyId}
   * @secure
   */
  export namespace CompaniesUpdate {
    export type RequestParams = {
      /** Company id. */
      companyId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = CompaniesUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoAuthDllModelsApiUserUserReturn;
  }

  /**
   * No description
   * @tags UsersCompanies
   * @name CompaniesActivatePartialUpdate
   * @summary Activate company.
   * @request PATCH:/user-api/companies/{companyId}/activate
   * @secure
   */
  export namespace CompaniesActivatePartialUpdate {
    export type RequestParams = {
      /** Company id. */
      companyId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = CompaniesActivatePartialUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoAuthDllModelsApiUserUserReturn;
  }

  /**
   * No description
   * @tags UsersCompanies
   * @name CompaniesDeactivatePartialUpdate
   * @summary Deactivate company.
   * @request PATCH:/user-api/companies/{companyId}/deactivate
   * @secure
   */
  export namespace CompaniesDeactivatePartialUpdate {
    export type RequestParams = {
      /** Company id. */
      companyId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = CompaniesDeactivatePartialUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoAuthDllModelsApiUserUserReturn;
  }

  /**
   * No description
   * @tags UsersCompanies
   * @name CompaniesAddMerchantPartialUpdate
   * @summary Add merchant to the company.
   * @request PATCH:/user-api/companies/{companyId}/add-merchant
   * @secure
   */
  export namespace CompaniesAddMerchantPartialUpdate {
    export type RequestParams = {
      /** Company id. */
      companyId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = CompaniesAddMerchantPartialUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoAuthDllModelsApiUserUserReturn;
  }

  /**
   * No description
   * @tags UsersCompanies
   * @name CompaniesRemoveMerchantPartialUpdate
   * @summary Remove user from the company.
   * @request PATCH:/user-api/companies/{companyId}/remove-merchant
   * @secure
   */
  export namespace CompaniesRemoveMerchantPartialUpdate {
    export type RequestParams = {
      /** Company id. */
      companyId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = CompaniesRemoveMerchantPartialUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoAuthDllModelsApiUserUserReturn;
  }

  /**
 * No description
 * @tags UsersCompanies
 * @name CompaniesVerifyCompanyCreditPaymentList
 * @summary Verification of the company's ability to pay on credit.
True = can pay by credit.
False = cannot pay by credit.
 * @request GET:/user-api/companies/{companyId}/verify-company-credit-payment
 * @secure
*/
  export namespace CompaniesVerifyCompanyCreditPaymentList {
    export type RequestParams = {
      /** Company id. */
      companyId: string;
    };
    export type RequestQuery = {
      UserLoginHash?: string;
      ApiKey?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoAuthDllModelsApiUserCompanyValidationReturn;
  }

  /**
   * No description
   * @tags UsersMerchants
   * @name MerchantsCreate
   * @summary Create new merchant with provided parameters.
   * @request POST:/user-api/merchants
   * @secure
   */
  export namespace MerchantsCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MerchantsCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoAuthDllModelsApiUserUserReturn;
  }

  /**
   * No description
   * @tags UsersMerchants
   * @name MerchantsUpdate
   * @summary Update merchant with provided user id and other parameters.
   * @request PUT:/user-api/merchants/{merchantId}
   * @secure
   */
  export namespace MerchantsUpdate {
    export type RequestParams = {
      /** Id of the merchant */
      merchantId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = MerchantsUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoAuthDllModelsApiUserUserReturn;
  }

  /**
   * No description
   * @tags UsersMerchants
   * @name MerchantsDelete
   * @summary Delete merchant.
   * @request DELETE:/user-api/merchants/{merchantId}
   * @secure
   */
  export namespace MerchantsDelete {
    export type RequestParams = {
      /** Id of the merchant */
      merchantId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = MerchantsDeletePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoAuthDllModelsApiUserUserReturn;
  }
}
