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

/** Types of tag.<p>Members:</p><ul><li><i>User</i> - User tag type can be edited by admin.</ li > <li><i>System</i> - System tag type is triggered by automatic systems and can't be manually changed.</ li > <li><i>Personalized</i> - Personalized tag types are created by user behaviour.</ li > </ul> */
export enum VinistoHelperDllEnumsTagTagType {
  User = "User",
  System = "System",
  Personalized = "Personalized",
}

/** Contains list of possible columns for sorting<p>Members:</p><ul></ul> */
export enum VinistoHelperDllEnumsSupplierTagSortableColumns {
  ID = "ID",
  NAME = "NAME",
  URL = "URL",
  CREATED_AT = "CREATED_AT",
  IS_DELETED = "IS_DELETED",
}

/** Contains list of possible supplier type<p>Members:</p><ul><li><i>PRODUCER</i> - Supplier type - producer</ li > <li><i>IMPORTER</i> - Supplier type - importer</ li > </ul> */
export enum VinistoHelperDllEnumsSupplierSupplierType {
  PRODUCER = "PRODUCER",
  IMPORTER = "IMPORTER",
}

/** Contains list of possible columns for sorting<p>Members:</p><ul></ul> */
export enum VinistoHelperDllEnumsSupplierSortableColumns {
  ID = "ID",
  NAME = "NAME",
  ICO = "ICO",
  DIC = "DIC",
  COUNTRY = "COUNTRY",
  IS_SHIPPING = "IS_SHIPPING",
  FLEXI_ABBREVIATION = "FLEXI_ABBREVIATION",
}

/** Contains list of possible states for stocking request<p>Members:</p><ul><li><i>CREATED</i> - Created stocking request</ li > <li><i>SENT</i> - Sended stocking request</ li > <li><i>CANCELLED</i> - Cancelled stocking request</ li > <li><i>CONFIRMED</i> - Confirmed stocking request</ li > <li><i>SENT_WMS</i> - Bundles in stocking request was sent to wms</ li > <li><i>DELIVERY_ORDERED</i> - Delivery ordered for stocking request</ li > <li><i>WMS_DELIVERED</i> - Bundles in stocking request was accepted in wms</ li > <li><i>WMS_STOCKED</i> - Closed stocking request</ li > </ul> */
export enum VinistoHelperDllEnumsStockingRequestStockingState {
  CREATED = "CREATED",
  SENT = "SENT",
  CANCELLED = "CANCELLED",
  CONFIRMED = "CONFIRMED",
  SENT_WMS = "SENT_WMS",
  DELIVERY_ORDERED = "DELIVERY_ORDERED",
  WMS_DELIVERED = "WMS_DELIVERED",
  WMS_STOCKED = "WMS_STOCKED",
}

/** Contains list of possible columns for sorting<p>Members:</p><ul><li><i>ID</i> - Sort by StockingRequest.Id property</ li > <li><i>REQUEST_NUMBER</i> - Sort by StockingRequest.RequestNumber property</ li > <li><i>CREATE_DATE</i> - Sort by StockingRequest.CreateDate property</ li > <li><i>DELIVERY_TYPE</i> - Sort by StockingRequest.DeliveryType property</ li > <li><i>STOCKING_DATE</i> - Sort by StockingRequest.StockingDate property</ li > <li><i>STATE</i> - Sort by StockingRequest.StockingState property</ li > <li><i>DELIVERY_DATE</i> - Sort by StockingRequest.DeliveryDate property</ li > </ul> */
export enum VinistoHelperDllEnumsStockingRequestSortableColumns {
  ID = "ID",
  REQUEST_NUMBER = "REQUEST_NUMBER",
  CREATE_DATE = "CREATE_DATE",
  DELIVERY_TYPE = "DELIVERY_TYPE",
  STOCKING_DATE = "STOCKING_DATE",
  STATE = "STATE",
  DELIVERY_DATE = "DELIVERY_DATE",
}

/** Contains list of possible delivery type for stocking request<p>Members:</p><ul><li><i>SUPPLIER_DELIVERY</i> - Stocking by supplier delivery</ li > <li><i>VINISTO_DELIVERY</i> - Stocking by vinisto delivery</ li > </ul> */
export enum VinistoHelperDllEnumsStockingRequestDeliveryType {
  SUPPLIER_DELIVERY = "SUPPLIER_DELIVERY",
  VINISTO_DELIVERY = "VINISTO_DELIVERY",
}

/** Contains list of possible delivery time intervals for stocking request<p>Members:</p><ul><li><i>D_8_10</i> - Time interval 8:00 - 10:00</ li > <li><i>D_10_12</i> - Time interval 10:00 - 12:00</ li > <li><i>D_12_14</i> - Time interval 12:00 - 14:00</ li > <li><i>D_14_16</i> - Time interval 14:00 - 16:00</ li > </ul> */
export enum VinistoHelperDllEnumsStockingRequestDeliveryTime {
  D_8_10 = "D_8_10",
  D_10_12 = "D_10_12",
  D_12_14 = "D_12_14",
  D_14_16 = "D_14_16",
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

/** Pickup point company<p>Members:</p><ul><li><i>ZASILKOVNA</i> - Zasilkovna</ li > <li><i>PPL</i> - PPL</ li > <li><i>DPD</i> - DPD</ li > </ul> */
export enum VinistoHelperDllEnumsOrderPickupPointType {
  ZASILKOVNA = "ZASILKOVNA",
  PPL = "PPL",
  DPD = "DPD",
}

/** Identifies type of the payment<p>Members:</p><ul><li><i>GO_PAY</i> - Payment via GoPay</ li > <li><i>CASH</i> - By cash</ li > <li><i>BANK_TRANSFER</i> - By bank transfer (Bankovni prevod)</ li > <li><i>BY_HANDOVER</i> - hand over - dobirka</ li > <li><i>CREDIT</i> - Similar to "Proforma". Is used for b2b payments.</ li > </ul> */
export enum VinistoHelperDllEnumsOrderPaymentType {
  GO_PAY = "GO_PAY",
  CASH = "CASH",
  BANK_TRANSFER = "BANK_TRANSFER",
  BY_HANDOVER = "BY_HANDOVER",
  CREDIT = "CREDIT",
}

/** Identifies type of the delivery<p>Members:</p><ul><li><i>PICKUP</i> - Personal pickup from the warehouse</ li > <li><i>PICKUP_POINT</i> - Pickup from predefined automated Boxes or shops</ li > <li><i>ADDRESS_SHIPPING</i> - Delivering to customer specified address</ li > <li><i>SUBSCRIPTION</i> - Virtual delivery only for purposes fast order with subscription.</ li > </ul> */
export enum VinistoHelperDllEnumsOrderDeliveryType {
  PICKUP = "PICKUP",
  PICKUP_POINT = "PICKUP_POINT",
  ADDRESS_SHIPPING = "ADDRESS_SHIPPING",
  SUBSCRIPTION = "SUBSCRIPTION",
}

/** Identifies base type of the delivery<p>Members:</p><ul><li><i>OWN_DELIVERY</i> - Own delivery</ li > <li><i>TRANSPORT_COMPANY</i> - Transport company</ li > </ul> */
export enum VinistoHelperDllEnumsOrderDeliveryBaseType {
  OWN_DELIVERY = "OWN_DELIVERY",
  TRANSPORT_COMPANY = "TRANSPORT_COMPANY",
}

/** Contains list of possible columns for sorting.<p>Members:</p><ul></ul> */
export enum VinistoHelperDllEnumsMerchantFeeFuleSortableColumns {
  Id = "Id",
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

/** Type of payment corresponding to possible GoPay payments types<p>Members:</p><ul><li><i>PAYMENT_CARD</i> - Payment card</ li > <li><i>BANK_ACCOUNT</i> - Bank account</ li > <li><i>GPAY</i> - Google pay</ li > <li><i>APPLE_PAY</i> - Apple pay</ li > <li><i>GOPAY</i> - GoPay wallet</ li > <li><i>PAYPAL</i> - PayPal wallet</ li > <li><i>MPAYMENT</i> - mPlatba (mobile payment)</ li > <li><i>PRSMS</i> - Premium SMS</ li > <li><i>PAYSAFECARD</i> - PaySafeCard coupon</ li > <li><i>BITCOIN</i> - Bitcoin wallet</ li > <li><i>CLICK_TO_PAY</i> - Click to Pay</ li > </ul> */
export enum VinistoHelperDllEnumsGoPayGoPayType {
  PAYMENT_CARD = "PAYMENT_CARD",
  BANK_ACCOUNT = "BANK_ACCOUNT",
  GPAY = "GPAY",
  APPLE_PAY = "APPLE_PAY",
  GOPAY = "GOPAY",
  PAYPAL = "PAYPAL",
  MPAYMENT = "MPAYMENT",
  PRSMS = "PRSMS",
  PAYSAFECARD = "PAYSAFECARD",
  BITCOIN = "BITCOIN",
  CLICK_TO_PAY = "CLICK_TO_PAY",
}

/** Contains list of possible fee rule types<p>Members:</p><ul></ul> */
export enum VinistoHelperDllEnumsFeeRuleFeeRuleType {
  Sale = "Sale",
  Logistic = "Logistic",
  DynamicSale = "DynamicSale",
}

/** Contains list of possible fee rule states<p>Members:</p><ul></ul> */
export enum VinistoHelperDllEnumsFeeRuleFeeRuleState {
  Active = "Active",
  Inactive = "Inactive",
  Scheduled = "Scheduled",
  Concept = "Concept",
  EndingSoon = "EndingSoon",
  Deleted = "Deleted",
}

/** <p>Members:</p><ul></ul> */
export enum VinistoHelperDllEnumsFeeRuleFeeRuleSortableColumns {
  VALID_FROM = "VALID_FROM",
  VALID_TO = "VALID_TO",
  BUNDLE_PRICE_FROM = "BUNDLE_PRICE_FROM",
  BUNDLE_PRICE_TO = "BUNDLE_PRICE_TO",
  NAME = "NAME",
  SPECIFICATION_TYPE = "SPECIFICATION_TYPE",
  SPECIFICATION_KIND = "SPECIFICATION_KIND",
}

/** Contains list of possible fee rule priorities<p>Members:</p><ul><li><i>Level1</i> - Has defined supplier turnover.</ li > <li><i>Level2</i> - Has defined bundle amount.</ li > <li><i>Level3</i> - Has defined bundle price.</ li > <li><i>Level4</i> - Has defined categories by ids.</ li > <li><i>Level5</i> - Has defined tags.</ li > <li><i>Level6</i> - Has defined specifications.</ li > <li><i>Level7</i> - Has defined suppliers by ids.</ li > <li><i>Level8</i> - Has defined bundles by ids.</ li > </ul> */
export enum VinistoHelperDllEnumsFeeRuleFeeRulePriority {
  Level1 = "Level1",
  Level2 = "Level2",
  Level3 = "Level3",
  Level4 = "Level4",
  Level5 = "Level5",
  Level6 = "Level6",
  Level7 = "Level7",
  Level8 = "Level8",
}

/** Contains list of possible columns for sorting<p>Members:</p><ul></ul> */
export enum VinistoHelperDllEnumsFeeRecordSortableColumns {
  ID = "ID",
  SUPPLIER_ID = "SUPPLIER_ID",
  ORDER_ID = "ORDER_ID",
  BUNDLE_ID = "BUNDLE_ID",
  TIME = "TIME",
  PRICE = "PRICE",
  FEE_RECORD_TYPE = "FEE_RECORD_TYPE",
  IS_PAID_OUT = "IS_PAID_OUT",
  FEE_RECORD_SELL_TYPE = "FEE_RECORD_SELL_TYPE",
}

/**
 * Contains list of possible production types.
 * Origin production = supplier country code is equals to bundle made in country.<p>Members:</p><ul></ul>
 */
export enum VinistoHelperDllEnumsFeeRecordFeeValueProductionType {
  Origin = "Origin",
  Destination = "Destination",
}

/** Contains list of possible fee record types<p>Members:</p><ul><li><i>SELL</i> - Fee record type sell</ li > <li><i>RETURNED</i> - Fee record type returned</ li > <li><i>GIFT</i> - Fee record Gift - for gift items in the order</ li > </ul> */
export enum VinistoHelperDllEnumsFeeRecordFeeRecordType {
  SELL = "SELL",
  RETURNED = "RETURNED",
  GIFT = "GIFT",
}

/** Contains list of possible fee record sell types<p>Members:</p><ul><li><i>STANDARD</i> - Fee record standard sell type</ li > <li><i>SET</i> - Fee record set sell type</ li > </ul> */
export enum VinistoHelperDllEnumsFeeRecordFeeRecordSellType {
  STANDARD = "STANDARD",
  SET = "SET",
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

/** <p>Members:</p><ul></ul> */
export enum VinistoHelperDllEnumsDeliveryAndPaymentPlatform {
  B2C = "B2c",
  B2B = "B2b",
  Admin = "Admin",
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

export interface VinistoCommonDllModelsApiPricesOrderConditionPrice {
  /** @format double */
  minOrderPrice?: number;
  /** @format double */
  maxOrderPrice?: number;
  /** @format double */
  value?: number;
  /** @format double */
  valueWithVat?: number;
  /** @format int32 */
  vatValue?: number;
  priceId?: string | null;
  /** VatRate */
  vat?: VinistoHelperDllEnumsVatRate;
  /** Currency */
  currency?: VinistoHelperDllEnumsCurrency;
  level?: VinistoHelperDllEnumsPriceLevel;
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
  /** VatRate */
  vat?: VinistoHelperDllEnumsVatRate;
  /** Currency */
  currency?: VinistoHelperDllEnumsCurrency;
  level?: VinistoHelperDllEnumsPriceLevel;
  /** @format int32 */
  platformId?: number;
}

export interface VinistoCommonDllModelsApiSpecificationsBaseSpecification {
  /** @minLength 1 */
  definitionId: string;
  /** Contains list of possible specification type */
  type?: VinistoHelperDllEnumsSpecificationSpecificationType;
}

export interface VinistoCommonDllModelsApiSpecificationsStringSpecificationWithoutType {
  /** @minLength 1 */
  definitionId: string;
  allowedValues: string[];
}

/** Discount for applied coupon for fee calculation purposes. */
export interface VinistoFeeSystemModelsFeeRecordDiscountCouponValue {
  couponId?: string | null;
  /**
   * Discount without vat in fee record item currency.
   * @format double
   */
  discount?: number;
  /** Who pays the discount. If true, supplier pays discount, otherwise vinisto pays discount. */
  isSupplierDiscount?: boolean;
}

export interface VinistoFeeSystemModelsFeeRecordFeeRecord {
  /** Id of the supplier the fee record is connected to. */
  supplierId?: string | null;
  /** Id of the bundle the fee record is connected to. */
  bundleId?: string | null;
  /** Id of the order the fee record is connected to. */
  orderId?: string | null;
  /**
   * Record created at value in timestamp format.
   * @format int64
   */
  time?: number;
  /** Standard bundle price in time of order. */
  originalPrice?: VinistoCommonDllModelsApiPricesPrice | null;
  /** Price of the item in this fee record. */
  itemPrice?: VinistoCommonDllModelsApiPricesPrice | null;
  /**
   * Flag specifies which price is used to fee compute.
   * If true, then fee is computed form ItemPrice.
   * If false, then fee is computed from OriginalPrice.
   */
  isSupplierDiscount?: boolean | null;
  /**
   * Calculated fee to this item record in percent eg. 13.5%. Its sum Percentage from AppliedFeeRules.
   * @format double
   */
  feePercentage?: number;
  /**
   * Calculated fee to this item record. Its sum FixedPrice from AppliedFeeRules.
   * @format double
   */
  fixFee?: number;
  /**
   * Vinisto fee without vat in item price currency.
   * @format double
   */
  vinistoFeeValue?: number;
  /**
   * Vinisto fee with vat in item price currency.
   * @format double
   */
  vinistoFeeValueWithVat?: number;
  /**
   * Supplier yield without vat in item price currency.
   * @format double
   */
  supplierYieldValue?: number;
  /** Contains coupons with calculated discount which are applied to order item. */
  discountCoupons?: VinistoFeeSystemModelsFeeRecordDiscountCouponValue[] | null;
  /** Is it paid out. */
  isPaidOut?: boolean;
  /** type of the fee record. */
  type?: VinistoHelperDllEnumsFeeRecordFeeRecordType;
  /** Id ot the billing for supplier. */
  billingId?: string | null;
  /** Sell type of the bundle fee record. */
  sellType?: VinistoHelperDllEnumsFeeRecordFeeRecordSellType;
  /** Price type with B2B level type. If null, then it is not b2b fee record. */
  priceLevel?: VinistoHelperDllEnumsPriceLevel | null;
  /** Applied fee rules to bundle. */
  appliedFeeRules?:
    | (
        | VinistoFeeSystemModelsFeeRuleSaleFeeRule
        | VinistoFeeSystemModelsFeeRuleLogisticFeeRule
        | VinistoFeeSystemModelsFeeRuleDynamicSaleFeeRule
      )[]
    | null;
  /** @format int32 */
  platformId?: number;
}

export interface VinistoFeeSystemModelsFeeRecordReturnFeeRecordsReturn {
  supplierFeeRecords?:
    | VinistoFeeSystemModelsFeeRecordSupplierFeeRecord[]
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

export interface VinistoFeeSystemModelsFeeRecordSupplierFeeRecord {
  /** Id of the order the fee record is connected to. */
  orderId?: string | null;
  /** List of fee records. */
  feeRecords?: VinistoFeeSystemModelsFeeRecordFeeRecord[] | null;
}

/** Represents Fee rule to create supplier fee. */
export interface VinistoFeeSystemModelsFeeRuleBaseFeeRule {
  id?: string | null;
  /** Contains list of possible fee rule types */
  type?: VinistoHelperDllEnumsFeeRuleFeeRuleType;
  /** Contains list of possible fee rule states */
  state?: VinistoHelperDllEnumsFeeRuleFeeRuleState;
  /** Identifies type of the country */
  originCountry?: VinistoHelperDllEnumsCountryCode;
  /** Identifies type of the country */
  destinationCountry?: VinistoHelperDllEnumsCountryCode;
  /** @format int64 */
  validFrom?: number | null;
  /** @format int64 */
  validTo?: number | null;
  /** @format double */
  bundlePriceFrom?: number | null;
  /** @format double */
  bundlePriceTo?: number | null;
  note?: string | null;
  /** @format int32 */
  numberOfBundlesMatchingFeeRule?: number | null;
}

/** Represents Dynamic sale fee rule to create supplier fee. */
export type VinistoFeeSystemModelsFeeRuleDynamicSaleFeeRule =
  VinistoFeeSystemModelsFeeRuleBaseFeeRule & {
    name?: string | null;
    supplierIds?: string[] | null;
    categoryIds?: string[] | null;
    tags?: VinistoFeeSystemModelsFeeRuleTag[] | null;
    bundleIds?: string[] | null;
    /** @format int32 */
    bundleAmountFrom?: number | null;
    /** @format int32 */
    bundleAmountTo?: number | null;
    /** Represents all possible conditions to setup Turnover for supplier fee computation. */
    turnover?: VinistoFeeSystemModelsFeeRuleTurnoverValue | null;
    originFees?: Record<string, VinistoFeeSystemModelsFeeRuleFeeValue>;
    destinationFees?: Record<string, VinistoFeeSystemModelsFeeRuleFeeValue>;
    /** Contains list of possible fee rule priorities */
    priority?: VinistoHelperDllEnumsFeeRuleFeeRulePriority;
    categoryNames?: string[] | null;
    supplierNames?: string[] | null;
    bundleNames?: string[] | null;
    tagNames?: string[] | null;
  };

export interface VinistoFeeSystemModelsFeeRuleDynamicSaleFeeRuleCreateParameters {
  /** Only ACTIVE or CONCEPT states are allowed. */
  state: VinistoHelperDllEnumsFeeRuleFeeRuleState;
  /** Identifies type of the country */
  originCountry: VinistoHelperDllEnumsCountryCode;
  /** Identifies type of the country */
  destinationCountry: VinistoHelperDllEnumsCountryCode;
  originFees: Record<string, VinistoFeeSystemModelsFeeRuleFeeValue>;
  destinationFees: Record<string, VinistoFeeSystemModelsFeeRuleFeeValue>;
  name: string | null;
  /** @format int64 */
  validFrom?: number | null;
  /** @format int64 */
  validTo?: number | null;
  supplierIds?: string[] | null;
  specifications?: any[] | null;
  tags?: VinistoFeeSystemModelsFeeRuleTag[] | null;
  categoryIds?: string[] | null;
  bundleIds?: string[] | null;
  /** @format double */
  bundlePriceFrom?: number | null;
  /** @format double */
  bundlePriceTo?: number | null;
  /** @format int32 */
  bundleAmountFrom?: number | null;
  /** @format int32 */
  bundleAmountTo?: number | null;
  /** Represents all possible conditions to setup Turnover for supplier fee computation. */
  turnover?: VinistoFeeSystemModelsFeeRuleTurnoverValue | null;
  note?: string | null;
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

export interface VinistoFeeSystemModelsFeeRuleDynamicSaleFeeRuleEditParameters {
  /** Only ACTIVE, INACTIVE, CONCEPT states are allowed. */
  state?: VinistoHelperDllBaseNullableField1SystemNullable1VinistoHelperDllEnumsFeeRuleFeeRuleStateVinistoHelperDllVersion1000CultureNeutralPublicKeyTokenNullSystemPrivateCoreLibVersion8000CultureNeutralPublicKeyToken7Cec85D7Bea7798E | null;
  /** Class to update properties with Patch */
  originFees?: VinistoHelperDllBaseNullableField1SystemCollectionsGenericDictionary2SystemInt32SystemPrivateCoreLibVersion8000CultureNeutralPublicKeyToken7Cec85D7Bea7798EVinistoFeeSystemModelsFeeRuleFeeValueVinistoFeeSystemVersion1000CultureNeutralPublicKeyTokenNullSystemPrivateCoreLibVersion8000CultureNeutralPublicKeyToken7Cec85D7Bea7798E | null;
  /** Class to update properties with Patch */
  destinationFees?: VinistoHelperDllBaseNullableField1SystemCollectionsGenericDictionary2SystemInt32SystemPrivateCoreLibVersion8000CultureNeutralPublicKeyToken7Cec85D7Bea7798EVinistoFeeSystemModelsFeeRuleFeeValueVinistoFeeSystemVersion1000CultureNeutralPublicKeyTokenNullSystemPrivateCoreLibVersion8000CultureNeutralPublicKeyToken7Cec85D7Bea7798E | null;
  /** Class to update properties with Patch */
  name?: VinistoHelperDllBaseNullableField1SystemStringSystemPrivateCoreLibVersion8000CultureNeutralPublicKeyToken7Cec85D7Bea7798E | null;
  /** Class to update properties with Patch */
  validFrom?: VinistoHelperDllBaseNullableField1SystemNullable1SystemInt64SystemPrivateCoreLibVersion8000CultureNeutralPublicKeyToken7Cec85D7Bea7798ESystemPrivateCoreLibVersion8000CultureNeutralPublicKeyToken7Cec85D7Bea7798E | null;
  /** Class to update properties with Patch */
  validTo?: VinistoHelperDllBaseNullableField1SystemNullable1SystemInt64SystemPrivateCoreLibVersion8000CultureNeutralPublicKeyToken7Cec85D7Bea7798ESystemPrivateCoreLibVersion8000CultureNeutralPublicKeyToken7Cec85D7Bea7798E | null;
  /** Class to update properties with Patch */
  supplierIds?: VinistoHelperDllBaseNullableField1SystemCollectionsGenericIList1SystemStringSystemPrivateCoreLibVersion8000CultureNeutralPublicKeyToken7Cec85D7Bea7798ESystemPrivateCoreLibVersion8000CultureNeutralPublicKeyToken7Cec85D7Bea7798E | null;
  /** Class to update properties with Patch */
  specifications?: VinistoHelperDllBaseNullableField1SystemCollectionsGenericIList1SystemObjectSystemPrivateCoreLibVersion8000CultureNeutralPublicKeyToken7Cec85D7Bea7798ESystemPrivateCoreLibVersion8000CultureNeutralPublicKeyToken7Cec85D7Bea7798E | null;
  /** Class to update properties with Patch */
  tags?: VinistoHelperDllBaseNullableField1SystemCollectionsGenericIList1VinistoFeeSystemModelsFeeRuleTagVinistoFeeSystemVersion1000CultureNeutralPublicKeyTokenNullSystemPrivateCoreLibVersion8000CultureNeutralPublicKeyToken7Cec85D7Bea7798E | null;
  /** Class to update properties with Patch */
  categoryIds?: VinistoHelperDllBaseNullableField1SystemCollectionsGenericIList1SystemStringSystemPrivateCoreLibVersion8000CultureNeutralPublicKeyToken7Cec85D7Bea7798ESystemPrivateCoreLibVersion8000CultureNeutralPublicKeyToken7Cec85D7Bea7798E | null;
  /** Class to update properties with Patch */
  bundleIds?: VinistoHelperDllBaseNullableField1SystemCollectionsGenericIList1SystemStringSystemPrivateCoreLibVersion8000CultureNeutralPublicKeyToken7Cec85D7Bea7798ESystemPrivateCoreLibVersion8000CultureNeutralPublicKeyToken7Cec85D7Bea7798E | null;
  /** Class to update properties with Patch */
  bundlePriceFrom?: VinistoHelperDllBaseNullableField1SystemNullable1SystemDecimalSystemPrivateCoreLibVersion8000CultureNeutralPublicKeyToken7Cec85D7Bea7798ESystemPrivateCoreLibVersion8000CultureNeutralPublicKeyToken7Cec85D7Bea7798E | null;
  /** Class to update properties with Patch */
  bundlePriceTo?: VinistoHelperDllBaseNullableField1SystemNullable1SystemDecimalSystemPrivateCoreLibVersion8000CultureNeutralPublicKeyToken7Cec85D7Bea7798ESystemPrivateCoreLibVersion8000CultureNeutralPublicKeyToken7Cec85D7Bea7798E | null;
  /** Class to update properties with Patch */
  bundleAmountFrom?: VinistoHelperDllBaseNullableField1SystemNullable1SystemInt32SystemPrivateCoreLibVersion8000CultureNeutralPublicKeyToken7Cec85D7Bea7798ESystemPrivateCoreLibVersion8000CultureNeutralPublicKeyToken7Cec85D7Bea7798E | null;
  /** Class to update properties with Patch */
  bundleAmountTo?: VinistoHelperDllBaseNullableField1SystemNullable1SystemInt32SystemPrivateCoreLibVersion8000CultureNeutralPublicKeyToken7Cec85D7Bea7798ESystemPrivateCoreLibVersion8000CultureNeutralPublicKeyToken7Cec85D7Bea7798E | null;
  /** Class to update properties with Patch */
  turnover?: VinistoHelperDllBaseNullableField1VinistoFeeSystemModelsFeeRuleTurnoverValueVinistoFeeSystemVersion1000CultureNeutralPublicKeyTokenNull | null;
  /** Class to update properties with Patch */
  note?: VinistoHelperDllBaseNullableField1SystemStringSystemPrivateCoreLibVersion8000CultureNeutralPublicKeyToken7Cec85D7Bea7798E | null;
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

/** Represents Fee value defined by percentage or fixed price. */
export interface VinistoFeeSystemModelsFeeRuleFeeValue {
  /** @format double */
  fixedPrice?: number | null;
  /** @format double */
  percentage?: number | null;
}

/** Represents Logistic fee rule to create supplier fee. */
export type VinistoFeeSystemModelsFeeRuleLogisticFeeRule =
  VinistoFeeSystemModelsFeeRuleBaseFeeRule & {
    name?: string | null;
    originFees?: {
      SupplierTransport?: VinistoFeeSystemModelsFeeRuleLogisticFeeValue[];
      VinistoTransport?: VinistoFeeSystemModelsFeeRuleLogisticFeeValue[];
      Dispatching?: VinistoFeeSystemModelsFeeRuleLogisticFeeValue[];
      Packaging?: VinistoFeeSystemModelsFeeRuleLogisticFeeValue[];
      Completion?: VinistoFeeSystemModelsFeeRuleLogisticFeeValue[];
      Storage?: VinistoFeeSystemModelsFeeRuleLogisticFeeValue[];
    } | null;
    warehouseId?: string | null;
  };

export interface VinistoFeeSystemModelsFeeRuleLogisticFeeRuleCreateParameters {
  /** Contains list of possible fee rule states */
  state: VinistoHelperDllEnumsFeeRuleFeeRuleState;
  specifications?: any[] | null;
  originFees: {
    SupplierTransport?: VinistoFeeSystemModelsFeeRuleLogisticFeeValue[];
    VinistoTransport?: VinistoFeeSystemModelsFeeRuleLogisticFeeValue[];
    Dispatching?: VinistoFeeSystemModelsFeeRuleLogisticFeeValue[];
    Packaging?: VinistoFeeSystemModelsFeeRuleLogisticFeeValue[];
    Completion?: VinistoFeeSystemModelsFeeRuleLogisticFeeValue[];
    Storage?: VinistoFeeSystemModelsFeeRuleLogisticFeeValue[];
  } | null;
  /** Identifies type of the country */
  originCountry: VinistoHelperDllEnumsCountryCode;
  /** Identifies type of the country */
  destinationCountry: VinistoHelperDllEnumsCountryCode;
  /** @format int64 */
  validFrom?: number | null;
  /** @format int64 */
  validTo?: number | null;
  /** @format double */
  bundlePriceFrom?: number | null;
  /** @format double */
  bundlePriceTo?: number | null;
  note?: string | null;
  name: string | null;
  /** EnvironmentConstants.WAREHOUSE_ID_CZ_MAIN */
  warehouseId: string | null;
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

export interface VinistoFeeSystemModelsFeeRuleLogisticFeeRuleEditParameters {
  /** Class to update properties with Patch */
  state?: VinistoHelperDllBaseNullableField1SystemNullable1VinistoHelperDllEnumsFeeRuleFeeRuleStateVinistoHelperDllVersion1000CultureNeutralPublicKeyTokenNullSystemPrivateCoreLibVersion8000CultureNeutralPublicKeyToken7Cec85D7Bea7798E | null;
  /** Class to update properties with Patch */
  specifications?: VinistoHelperDllBaseNullableField1SystemCollectionsGenericIList1SystemObjectSystemPrivateCoreLibVersion8000CultureNeutralPublicKeyToken7Cec85D7Bea7798ESystemPrivateCoreLibVersion8000CultureNeutralPublicKeyToken7Cec85D7Bea7798E | null;
  /** Class to update properties with Patch */
  originFees?: VinistoHelperDllBaseNullableField1SystemCollectionsGenericIDictionary2VinistoHelperDllEnumsFeeRuleLogisticFeeValueTypeVinistoHelperDllVersion1000CultureNeutralPublicKeyTokenNullSystemCollectionsGenericList1VinistoFeeSystemModelsFeeRuleLogisticFeeValueVinistoFeeSystemVersion1000CultureNeutralPublicKeyTokenNullSystemPrivateCoreLibVersion8000CultureNeutralPublicKeyToken7Cec85D7Bea7798ESystemPrivateCoreLibVersion8000CultureNeutralPublicKeyToken7Cec85D7Bea7798E | null;
  /** Class to update properties with Patch */
  validFrom?: VinistoHelperDllBaseNullableField1SystemNullable1SystemInt64SystemPrivateCoreLibVersion8000CultureNeutralPublicKeyToken7Cec85D7Bea7798ESystemPrivateCoreLibVersion8000CultureNeutralPublicKeyToken7Cec85D7Bea7798E | null;
  /** Class to update properties with Patch */
  validTo?: VinistoHelperDllBaseNullableField1SystemInt64SystemPrivateCoreLibVersion8000CultureNeutralPublicKeyToken7Cec85D7Bea7798E | null;
  /** Class to update properties with Patch */
  bundlePriceFrom?: VinistoHelperDllBaseNullableField1SystemNullable1SystemDecimalSystemPrivateCoreLibVersion8000CultureNeutralPublicKeyToken7Cec85D7Bea7798ESystemPrivateCoreLibVersion8000CultureNeutralPublicKeyToken7Cec85D7Bea7798E | null;
  /** Class to update properties with Patch */
  bundlePriceTo?: VinistoHelperDllBaseNullableField1SystemNullable1SystemDecimalSystemPrivateCoreLibVersion8000CultureNeutralPublicKeyToken7Cec85D7Bea7798ESystemPrivateCoreLibVersion8000CultureNeutralPublicKeyToken7Cec85D7Bea7798E | null;
  /** Class to update properties with Patch */
  note?: VinistoHelperDllBaseNullableField1SystemStringSystemPrivateCoreLibVersion8000CultureNeutralPublicKeyToken7Cec85D7Bea7798E | null;
  /** Class to update properties with Patch */
  name?: VinistoHelperDllBaseNullableField1SystemStringSystemPrivateCoreLibVersion8000CultureNeutralPublicKeyToken7Cec85D7Bea7798E | null;
  /** Class to update properties with Patch */
  warehouseId?: VinistoHelperDllBaseNullableField1SystemStringSystemPrivateCoreLibVersion8000CultureNeutralPublicKeyToken7Cec85D7Bea7798E | null;
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

/** Represents Logistic fee value defined by price level and percentage or fixed price. */
export interface VinistoFeeSystemModelsFeeRuleLogisticFeeValue {
  /** @format int32 */
  platformId?: number | null;
  /** @format double */
  fixedPrice?: number | null;
  /** @format double */
  percentage?: number | null;
}

export interface VinistoFeeSystemModelsFeeRuleReturnDynamicSaleFeeRuleReturn {
  /** Represents Dynamic sale fee rule to create supplier fee. */
  feeRule?: VinistoFeeSystemModelsFeeRuleDynamicSaleFeeRule | null;
  /** Has occurred any error. */
  isError?: boolean;
  /** List of errors code that occurred during the api request. */
  error?: VinistoHelperDllBaseError[] | null;
}

export interface VinistoFeeSystemModelsFeeRuleReturnFeeRuleReturn {
  /** Fee rule object (can be SaleFeeRule or LogisticFeeRule or DynamicSaleFeeRule) */
  feeRule?:
    | VinistoFeeSystemModelsFeeRuleSaleFeeRule
    | VinistoFeeSystemModelsFeeRuleLogisticFeeRule
    | VinistoFeeSystemModelsFeeRuleDynamicSaleFeeRule
    | null;
  /** Has occurred any error. */
  isError?: boolean;
  /** List of errors code that occurred during the api request. */
  error?: VinistoHelperDllBaseError[] | null;
}

export interface VinistoFeeSystemModelsFeeRuleReturnFeeRulesReturn {
  feeRules?:
    | (
        | VinistoFeeSystemModelsFeeRuleSaleFeeRule
        | VinistoFeeSystemModelsFeeRuleLogisticFeeRule
        | VinistoFeeSystemModelsFeeRuleDynamicSaleFeeRule
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

/** Returns API object for LogisticFeeRule */
export interface VinistoFeeSystemModelsFeeRuleReturnLogisticFeeRuleReturn {
  /** Represents Logistic fee rule to create supplier fee. */
  logisticFeeRule?: VinistoFeeSystemModelsFeeRuleLogisticFeeRule | null;
  /** Has occurred any error. */
  isError?: boolean;
  /** List of errors code that occurred during the api request. */
  error?: VinistoHelperDllBaseError[] | null;
}

export interface VinistoFeeSystemModelsFeeRuleReturnSaleFeeRuleReturn {
  /** Represents Sale fee rule to create supplier fee. */
  saleFeeRule?: VinistoFeeSystemModelsFeeRuleSaleFeeRule | null;
  /** Has occurred any error. */
  isError?: boolean;
  /** List of errors code that occurred during the api request. */
  error?: VinistoHelperDllBaseError[] | null;
}

export interface VinistoFeeSystemModelsFeeRuleReturnSupplierAdminFeeRulesReturn {
  /** Return all base fee rules. */
  feeRules?: VinistoFeeSystemModelsFeeRuleSupplierAdminFeeRules[] | null;
  /** Return all dynamic fee rules. */
  dynamicSaleFeeRules?:
    | VinistoFeeSystemModelsFeeRuleDynamicSaleFeeRule[]
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

export interface VinistoFeeSystemModelsFeeRuleReturnSupplierAdminFeeValuesReturn {
  /** Return all fee values for supplier. */
  feeValues?: VinistoFeeSystemModelsFeeRuleSupplierAdminFeeValues | null;
  /** @format double */
  defaultSaleFeeValue?: number;
  /** @format double */
  defaultSaleFeeValueB2b?: number;
  /** @format double */
  defaultLogisticFeeVinistoTransport?: number;
  /** @format double */
  defaultLogisticFeeSupplierTransport?: number;
  /** Has occurred any error. */
  isError?: boolean;
  /** List of errors code that occurred during the api request. */
  error?: VinistoHelperDllBaseError[] | null;
}

/** Represents Sale fee rule to create supplier fee. */
export type VinistoFeeSystemModelsFeeRuleSaleFeeRule =
  VinistoFeeSystemModelsFeeRuleBaseFeeRule & {
    originFees?: Record<string, VinistoFeeSystemModelsFeeRuleFeeValue>;
    destinationFees?: Record<string, VinistoFeeSystemModelsFeeRuleFeeValue>;
  };

export interface VinistoFeeSystemModelsFeeRuleSaleFeeRuleCreateParameters {
  /** Only Active or Concept states are allowed. */
  state: VinistoHelperDllEnumsFeeRuleFeeRuleState;
  /** Identifies type of the country */
  originCountry: VinistoHelperDllEnumsCountryCode;
  /** Identifies type of the country */
  destinationCountry: VinistoHelperDllEnumsCountryCode;
  originFees: Record<string, VinistoFeeSystemModelsFeeRuleFeeValue>;
  destinationFees: Record<string, VinistoFeeSystemModelsFeeRuleFeeValue>;
  /** @format int64 */
  validFrom?: number | null;
  /** @format int64 */
  validTo?: number | null;
  specifications?: any[] | null;
  /** @format double */
  bundlePriceFrom?: number | null;
  /** @format double */
  bundlePriceTo?: number | null;
  note?: string | null;
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

export interface VinistoFeeSystemModelsFeeRuleSaleFeeRuleEditParameters {
  /** Only Active, Inactive or Concept states are allowed. */
  state?: VinistoHelperDllBaseNullableField1SystemNullable1VinistoHelperDllEnumsFeeRuleFeeRuleStateVinistoHelperDllVersion1000CultureNeutralPublicKeyTokenNullSystemPrivateCoreLibVersion8000CultureNeutralPublicKeyToken7Cec85D7Bea7798E | null;
  /** Class to update properties with Patch */
  originFees?: VinistoHelperDllBaseNullableField1SystemCollectionsGenericDictionary2SystemInt32SystemPrivateCoreLibVersion8000CultureNeutralPublicKeyToken7Cec85D7Bea7798EVinistoFeeSystemModelsFeeRuleFeeValueVinistoFeeSystemVersion1000CultureNeutralPublicKeyTokenNullSystemPrivateCoreLibVersion8000CultureNeutralPublicKeyToken7Cec85D7Bea7798E | null;
  /** Class to update properties with Patch */
  destinationFees?: VinistoHelperDllBaseNullableField1SystemCollectionsGenericDictionary2SystemInt32SystemPrivateCoreLibVersion8000CultureNeutralPublicKeyToken7Cec85D7Bea7798EVinistoFeeSystemModelsFeeRuleFeeValueVinistoFeeSystemVersion1000CultureNeutralPublicKeyTokenNullSystemPrivateCoreLibVersion8000CultureNeutralPublicKeyToken7Cec85D7Bea7798E | null;
  /** Class to update properties with Patch */
  validFrom?: VinistoHelperDllBaseNullableField1SystemNullable1SystemInt64SystemPrivateCoreLibVersion8000CultureNeutralPublicKeyToken7Cec85D7Bea7798ESystemPrivateCoreLibVersion8000CultureNeutralPublicKeyToken7Cec85D7Bea7798E | null;
  /** Class to update properties with Patch */
  validTo?: VinistoHelperDllBaseNullableField1SystemNullable1SystemInt64SystemPrivateCoreLibVersion8000CultureNeutralPublicKeyToken7Cec85D7Bea7798ESystemPrivateCoreLibVersion8000CultureNeutralPublicKeyToken7Cec85D7Bea7798E | null;
  /** Class to update properties with Patch */
  specifications?: VinistoHelperDllBaseNullableField1SystemCollectionsGenericIList1SystemObjectSystemPrivateCoreLibVersion8000CultureNeutralPublicKeyToken7Cec85D7Bea7798ESystemPrivateCoreLibVersion8000CultureNeutralPublicKeyToken7Cec85D7Bea7798E | null;
  /** Class to update properties with Patch */
  bundlePriceFrom?: VinistoHelperDllBaseNullableField1SystemNullable1SystemDecimalSystemPrivateCoreLibVersion8000CultureNeutralPublicKeyToken7Cec85D7Bea7798ESystemPrivateCoreLibVersion8000CultureNeutralPublicKeyToken7Cec85D7Bea7798E | null;
  /** Class to update properties with Patch */
  bundlePriceTo?: VinistoHelperDllBaseNullableField1SystemNullable1SystemDecimalSystemPrivateCoreLibVersion8000CultureNeutralPublicKeyToken7Cec85D7Bea7798ESystemPrivateCoreLibVersion8000CultureNeutralPublicKeyToken7Cec85D7Bea7798E | null;
  /** Class to update properties with Patch */
  note?: VinistoHelperDllBaseNullableField1SystemStringSystemPrivateCoreLibVersion8000CultureNeutralPublicKeyToken7Cec85D7Bea7798E | null;
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

export interface VinistoFeeSystemModelsFeeRuleSupplierAdminFeeRules {
  /** Represents Sale fee rule to create supplier fee. */
  saleFeeRule?: VinistoFeeSystemModelsFeeRuleSaleFeeRule | null;
  /** Represents Logistic fee rule to create supplier fee. */
  logisticFeeRule?: VinistoFeeSystemModelsFeeRuleLogisticFeeRule | null;
}

export interface VinistoFeeSystemModelsFeeRuleSupplierAdminFeeValues {
  supplierSaleFeeValues?:
    | VinistoFeeSystemModelsFeeRuleSupplierSaleFeeValue[]
    | null;
  supplierLogisticFeeValues?:
    | VinistoFeeSystemModelsFeeRuleSupplierLogisticFeeValue[]
    | null;
}

/** Represents Logistic fee value for supplier dashboard. */
export interface VinistoFeeSystemModelsFeeRuleSupplierLogisticFeeValue {
  allowedValue?: string | null;
  /** @format double */
  minSupplierTransportPercentage?: number;
  /** @format double */
  minSupplierTransportPercentageB2b?: number;
  /** @format double */
  minVinistoTransportPercentage?: number;
  /** @format double */
  minVinistoTransportPercentageB2b?: number;
  /** @format double */
  minCompletionPercentage?: number;
  /** @format double */
  minCompletionPercentageB2b?: number;
  /** @format double */
  minStoragePercentage?: number;
  /** @format double */
  minStoragePercentageB2b?: number;
}

/** Represents Sale fee value for supplier dashboard. */
export interface VinistoFeeSystemModelsFeeRuleSupplierSaleFeeValue {
  allowedValue?: string | null;
  /** @format double */
  minB2cPercentage?: number;
  /** @format double */
  minB2bPercentage?: number;
}

export interface VinistoFeeSystemModelsFeeRuleTag {
  tagId?: string | null;
  countriesOfSale?: VinistoHelperDllEnumsCountryCode[] | null;
}

/** Represents all possible conditions to setup Turnover for supplier fee computation. */
export interface VinistoFeeSystemModelsFeeRuleTurnoverValue {
  /** @format double */
  valueFrom?: number | null;
  /** @format double */
  valueTo?: number | null;
  /** @format int64 */
  validFrom?: number | null;
  /** @format int64 */
  validTo?: number | null;
}

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

/** Return object with decimal value */
export interface VinistoHelperDllBaseDecimalReturn {
  /** @format double */
  result?: number | null;
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

/** Class to update properties with Patch */
export interface VinistoHelperDllBaseNullableField1SystemCollectionsGenericDictionary2SystemInt32SystemPrivateCoreLibVersion8000CultureNeutralPublicKeyToken7Cec85D7Bea7798EVinistoFeeSystemModelsFeeRuleFeeValueVinistoFeeSystemVersion1000CultureNeutralPublicKeyTokenNullSystemPrivateCoreLibVersion8000CultureNeutralPublicKeyToken7Cec85D7Bea7798E {
  hasValue?: boolean;
  value?: Record<string, VinistoFeeSystemModelsFeeRuleFeeValue>;
}

/** Class to update properties with Patch */
export interface VinistoHelperDllBaseNullableField1SystemCollectionsGenericIDictionary2VinistoHelperDllEnumsFeeRuleLogisticFeeValueTypeVinistoHelperDllVersion1000CultureNeutralPublicKeyTokenNullSystemCollectionsGenericList1VinistoFeeSystemModelsFeeRuleLogisticFeeValueVinistoFeeSystemVersion1000CultureNeutralPublicKeyTokenNullSystemPrivateCoreLibVersion8000CultureNeutralPublicKeyToken7Cec85D7Bea7798ESystemPrivateCoreLibVersion8000CultureNeutralPublicKeyToken7Cec85D7Bea7798E {
  hasValue?: boolean;
  value?: {
    SupplierTransport?: VinistoFeeSystemModelsFeeRuleLogisticFeeValue[];
    VinistoTransport?: VinistoFeeSystemModelsFeeRuleLogisticFeeValue[];
    Dispatching?: VinistoFeeSystemModelsFeeRuleLogisticFeeValue[];
    Packaging?: VinistoFeeSystemModelsFeeRuleLogisticFeeValue[];
    Completion?: VinistoFeeSystemModelsFeeRuleLogisticFeeValue[];
    Storage?: VinistoFeeSystemModelsFeeRuleLogisticFeeValue[];
  } | null;
}

/** Class to update properties with Patch */
export interface VinistoHelperDllBaseNullableField1SystemCollectionsGenericIList1SystemObjectSystemPrivateCoreLibVersion8000CultureNeutralPublicKeyToken7Cec85D7Bea7798ESystemPrivateCoreLibVersion8000CultureNeutralPublicKeyToken7Cec85D7Bea7798E {
  hasValue?: boolean;
  value?: any[] | null;
}

/** Class to update properties with Patch */
export interface VinistoHelperDllBaseNullableField1SystemCollectionsGenericIList1SystemStringSystemPrivateCoreLibVersion8000CultureNeutralPublicKeyToken7Cec85D7Bea7798ESystemPrivateCoreLibVersion8000CultureNeutralPublicKeyToken7Cec85D7Bea7798E {
  hasValue?: boolean;
  value?: string[] | null;
}

/** Class to update properties with Patch */
export interface VinistoHelperDllBaseNullableField1SystemCollectionsGenericIList1VinistoFeeSystemModelsFeeRuleTagVinistoFeeSystemVersion1000CultureNeutralPublicKeyTokenNullSystemPrivateCoreLibVersion8000CultureNeutralPublicKeyToken7Cec85D7Bea7798E {
  hasValue?: boolean;
  value?: VinistoFeeSystemModelsFeeRuleTag[] | null;
}

/** Class to update properties with Patch */
export interface VinistoHelperDllBaseNullableField1SystemInt64SystemPrivateCoreLibVersion8000CultureNeutralPublicKeyToken7Cec85D7Bea7798E {
  hasValue?: boolean;
  /** @format int64 */
  value?: number;
}

/** Class to update properties with Patch */
export interface VinistoHelperDllBaseNullableField1SystemNullable1SystemDecimalSystemPrivateCoreLibVersion8000CultureNeutralPublicKeyToken7Cec85D7Bea7798ESystemPrivateCoreLibVersion8000CultureNeutralPublicKeyToken7Cec85D7Bea7798E {
  hasValue?: boolean;
  /** @format double */
  value?: number | null;
}

/** Class to update properties with Patch */
export interface VinistoHelperDllBaseNullableField1SystemNullable1SystemInt32SystemPrivateCoreLibVersion8000CultureNeutralPublicKeyToken7Cec85D7Bea7798ESystemPrivateCoreLibVersion8000CultureNeutralPublicKeyToken7Cec85D7Bea7798E {
  hasValue?: boolean;
  /** @format int32 */
  value?: number | null;
}

/** Class to update properties with Patch */
export interface VinistoHelperDllBaseNullableField1SystemNullable1SystemInt64SystemPrivateCoreLibVersion8000CultureNeutralPublicKeyToken7Cec85D7Bea7798ESystemPrivateCoreLibVersion8000CultureNeutralPublicKeyToken7Cec85D7Bea7798E {
  hasValue?: boolean;
  /** @format int64 */
  value?: number | null;
}

/** Class to update properties with Patch */
export interface VinistoHelperDllBaseNullableField1SystemNullable1VinistoHelperDllEnumsFeeRuleFeeRuleStateVinistoHelperDllVersion1000CultureNeutralPublicKeyTokenNullSystemPrivateCoreLibVersion8000CultureNeutralPublicKeyToken7Cec85D7Bea7798E {
  hasValue?: boolean;
  value?: VinistoHelperDllEnumsFeeRuleFeeRuleState | null;
}

/** Class to update properties with Patch */
export interface VinistoHelperDllBaseNullableField1SystemStringSystemPrivateCoreLibVersion8000CultureNeutralPublicKeyToken7Cec85D7Bea7798E {
  hasValue?: boolean;
  value?: string | null;
}

/** Class to update properties with Patch */
export interface VinistoHelperDllBaseNullableField1VinistoFeeSystemModelsFeeRuleTurnoverValueVinistoFeeSystemVersion1000CultureNeutralPublicKeyTokenNull {
  hasValue?: boolean;
  /** Represents all possible conditions to setup Turnover for supplier fee computation. */
  value?: VinistoFeeSystemModelsFeeRuleTurnoverValue | null;
}

export interface VinistoImageDllModelsApiImageImage {
  objectId?: string | null;
  domainUrls?: Record<string, string>;
  id?: string | null;
  /** Identifies object type to which an image is assigned */
  objectType?: VinistoHelperDllEnumsImageImageObjectType;
  isMain?: boolean;
}

/**
 * Represents supplier address
 * IMPORTANT!!! - changing this object please increase model version of this or main mongo object and create Migration!
 */
export interface VinistoMongoConnectorModelsSupplierAddress {
  /** Addressee */
  addressee?: string | null;
  /** Phone contact of the addressee */
  phone?: string | null;
  /** Email of the addressee */
  email?: string | null;
  /** Note to the address */
  note?: string | null;
  /** Title of the address */
  title?: string | null;
  /** Street name in the address */
  street?: string | null;
  /** House number unique in cadastral area - in czech "cislo popisne" */
  landRegistryNumber?: string | null;
  /** House number unique in street/area - in czech "cislo orientacni" */
  houseNumber?: string | null;
  /** Zip code in the address */
  zip?: string | null;
  /** City in the address */
  city?: string | null;
  /** Country code of the address */
  countryCode?: VinistoHelperDllEnumsCountryCode;
}

export interface VinistoOrderDllModelsApiCommonMultiLangValue {
  /** Contains list of possible languages */
  language?: VinistoHelperDllEnumsLanguage;
  /** @minLength 1 */
  value: string;
}

export interface VinistoOrderDllModelsApiDeliveryDelivery {
  /** @minLength 1 */
  id: string;
  name: VinistoOrderDllModelsApiCommonMultiLangValue[];
  alternativeName?: VinistoOrderDllModelsApiCommonMultiLangValue[] | null;
  description: VinistoOrderDllModelsApiCommonMultiLangValue[];
  isActive?: boolean;
  /** @format int32 */
  deliveryTime?: number;
  prices: VinistoCommonDllModelsApiPricesOrderConditionPrice[];
  /** @format double */
  minAllowedWeight?: number;
  /** @format double */
  maxAllowedWeight?: number;
  countries: VinistoHelperDllEnumsCountryCode[];
  payments: VinistoOrderDllModelsApiPaymentPayment[];
  /** Identifies type of the delivery */
  deliveryType?: VinistoHelperDllEnumsOrderDeliveryType;
  pickupPointType?: VinistoHelperDllEnumsOrderPickupPointType | null;
  /** @minLength 1 */
  deliveryCode: string;
  trackingUrl?: string | null;
  /** @format int32 */
  order?: number;
  deliveryTimeRange?: VinistoOrderDllModelsApiDeliveryDeliveryTimeRange | null;
  /** @format double */
  costs?: number | null;
  isForStocking?: boolean;
  isForCustomerDelivery?: boolean;
  servingZipCodes: string[];
  /** Identifies base type of the delivery */
  deliveryBaseType?: VinistoHelperDllEnumsOrderDeliveryBaseType;
  /** @format date-span */
  orderTresholdTime: string;
  isOnProductDetail: boolean;
  note?: VinistoOrderDllModelsApiCommonMultiLangValue[] | null;
  isSubscriber?: boolean;
  allowedOnPlatforms?: VinistoHelperDllEnumsDeliveryAndPaymentPlatform[] | null;
  isDeliveryOnSaturday?: boolean;
  isDeliveryOnSunday?: boolean;
}

export interface VinistoOrderDllModelsApiDeliveryDeliveryTimeRange {
  /** @format date */
  deliveryDate?: string | null;
  /** @format time */
  timeFrom?: string | null;
  /** @format time */
  timeTo?: string | null;
}

export interface VinistoOrderDllModelsApiPaymentPayment {
  /** @minLength 1 */
  id: string;
  name: VinistoOrderDllModelsApiCommonMultiLangValue[];
  description: VinistoOrderDllModelsApiCommonMultiLangValue[];
  isActive?: boolean;
  prices: VinistoCommonDllModelsApiPricesOrderConditionPrice[];
  countries: VinistoHelperDllEnumsCountryCode[];
  goPayType?: VinistoHelperDllEnumsGoPayGoPayType | null;
  /** Identifies type of the payment */
  paymentType?: VinistoHelperDllEnumsOrderPaymentType;
  /** @format int32 */
  order?: number;
  image?: VinistoImageDllModelsApiImageImage | null;
  note?: VinistoOrderDllModelsApiCommonMultiLangValue[] | null;
  allowedOnPlatforms?: VinistoHelperDllEnumsDeliveryAndPaymentPlatform[] | null;
}

export interface VinistoProductDllModelsApiBundleBundle {
  /** @minLength 1 */
  id: string;
  name: VinistoProductDllModelsApiMultiLangValue[];
  description: VinistoProductDllModelsApiMultiLangValue[];
  metaDescription: VinistoProductDllModelsApiMultiLangValue[];
  shortDescription: VinistoProductDllModelsApiMultiLangValue[];
  text: VinistoProductDllModelsApiMultiLangValue[];
  url: VinistoProductDllModelsApiMultiLangValue[];
  prices: VinistoCommonDllModelsApiPricesPrice[];
  /** @format double */
  lowestInternetPrice?: number | null;
  priceDiscounts?: VinistoCommonDllModelsApiPricesBasePrice[] | null;
  items: VinistoProductDllModelsApiBundleItemsBaseItem[];
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
  /** Represents a supplier model provided in api. */
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

export interface VinistoProductDllModelsApiBundleBundlesReturn {
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

export interface VinistoProductDllModelsApiBundleItemsBaseItem {
  itemId?: string | null;
  /** @format int32 */
  amount?: number;
}

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
  prices: VinistoCommonDllModelsApiPricesPrice[];
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
  slugs: VinistoProductDllModelsApiTagBaseTagSlug[];
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
    | VinistoCommonDllModelsApiSpecificationsBaseSpecification[]
    | null;
  specificationDetails: VinistoProductDllModelsApiSpecificationSpecificationDetail[];
}

export interface VinistoStockingRequestDllModelsApiStockingRequestBundleNote {
  /** @minLength 1 */
  bundleId: string;
  note?: string | null;
}

export interface VinistoStockingRequestDllModelsApiStockingRequestBundleStockingRequest {
  /** @minLength 1 */
  bundleId: string;
  /** @format int32 */
  requestedCount?: number;
  /** @format int32 */
  deliveredCount?: number | null;
  /** @format int32 */
  countDifference?: number | null;
  note?: string | null;
}

export interface VinistoStockingRequestDllModelsApiStockingRequestModifyBundleRequest {
  /** @minLength 1 */
  bundleId: string;
  /** @format int32 */
  requestedCount: number;
  note?: string | null;
}

export interface VinistoStockingRequestDllModelsApiStockingRequestStateChangeRecord {
  /** Contains list of possible states for stocking request */
  stockingState?: VinistoHelperDllEnumsStockingRequestStockingState;
  /** @format int64 */
  changeTime?: number;
}

export interface VinistoStockingRequestDllModelsApiStockingRequestStockingRequest {
  /** @minLength 1 */
  id: string;
  /** @minLength 1 */
  requestNumber: string;
  /** @format int64 */
  createdAt?: number | null;
  /** @minLength 1 */
  supplierId: string;
  /** Contains list of possible delivery type for stocking request */
  deliveryType?: VinistoHelperDllEnumsStockingRequestDeliveryType;
  /** Contains list of possible states for stocking request */
  stockingState?: VinistoHelperDllEnumsStockingRequestStockingState;
  deliveryId?: string | null;
  trackingNumber?: string | null;
  /** @format int32 */
  deliveryDate?: number | null;
  deliveryTime?: VinistoHelperDllEnumsStockingRequestDeliveryTime | null;
  /** @format int32 */
  stockingDate?: number | null;
  deliveryReceipt?: string | null;
  bundles: VinistoStockingRequestDllModelsApiStockingRequestBundleStockingRequest[];
  isSent?: boolean;
  isConfirmed?: boolean;
  isStocked?: boolean;
  stateChangeRecords: VinistoStockingRequestDllModelsApiStockingRequestStateChangeRecord[];
  errors?: string[] | null;
  /** Represents a supplier model provided in api. */
  supplier?: VinistoSupplierDllModelsApiSupplierSupplier | null;
  bundleDetails: VinistoProductDllModelsApiBundleBundle[];
  delivery?: VinistoOrderDllModelsApiDeliveryDelivery | null;
  trackingUrl?: string | null;
  adminNote?: string | null;
}

export interface VinistoStockingRequestDllModelsApiStockingRequestStockingRequestBundleNotesParameters {
  bundlesNotes?:
    | VinistoStockingRequestDllModelsApiStockingRequestBundleNote[]
    | null;
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

export interface VinistoStockingRequestDllModelsApiStockingRequestStockingRequestConfirmParameters {
  /** @format int32 */
  deliveryDate: number;
  /** Contains list of possible delivery time intervals for stocking request */
  deliveryTime: VinistoHelperDllEnumsStockingRequestDeliveryTime;
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

export interface VinistoStockingRequestDllModelsApiStockingRequestStockingRequestCreateParameters {
  /** @minLength 1 */
  supplierId: string;
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

export interface VinistoStockingRequestDllModelsApiStockingRequestStockingRequestDeliveryOrderParameters {
  deliveryId?: string | null;
  trackingNumber?: string | null;
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

export interface VinistoStockingRequestDllModelsApiStockingRequestStockingRequestModifyBundleParameters {
  /** @minLength 1 */
  bundleId: string;
  /** @format int32 */
  requestedCount: number;
  note?: string | null;
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

export interface VinistoStockingRequestDllModelsApiStockingRequestStockingRequestModifyBundlesParameters {
  bundlesRequests: VinistoStockingRequestDllModelsApiStockingRequestModifyBundleRequest[];
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

export interface VinistoStockingRequestDllModelsApiStockingRequestStockingRequestReturn {
  stockingRequest?: VinistoStockingRequestDllModelsApiStockingRequestStockingRequest | null;
  /** Has occurred any error. */
  isError?: boolean;
  /** List of errors code that occurred during the api request. */
  error?: VinistoHelperDllBaseError[] | null;
}

export interface VinistoStockingRequestDllModelsApiStockingRequestStockingRequestUpdateAdminNoteParameters {
  adminNote: string | null;
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

export interface VinistoStockingRequestDllModelsApiStockingRequestStockingRequestsReturn {
  stockingRequests?:
    | VinistoStockingRequestDllModelsApiStockingRequestStockingRequest[]
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

/** Represents a single bundle row in the supplier warehouse product list. */
export interface VinistoSupplierApiModelsWarehouseOverviewSupplierProductItem {
  /** Bundle identifier. */
  bundleId?: string | null;
  /** Product warehouse identifiers (external WMS codes) for the bundle's constituent products. */
  warehouseIds?: string[] | null;
  /** Bundle name in all available languages. */
  bundleName?: VinistoProductDllModelsApiMultiLangValue[] | null;
  /** All specifications for this bundle (definition + value pairs). */
  specifications?:
    | VinistoProductDllModelsApiSpecificationSpecificationDetail[]
    | null;
  /**
   * Current warehouse stock count.
   * @format int32
   */
  warehouseCount?: number;
  /**
   * Number of pieces sold in the current calendar month (net of returns).
   * @format int32
   */
  soldThisMonth?: number;
  /**
   * Number of pieces sold in the previous calendar month (net of returns).
   * @format int32
   */
  soldLastMonth?: number;
  /**
   * Quantity of this bundle in unpaid (CREATED) orders.
   * @format int32
   */
  countInUnpaidOrders?: number;
}

/** Paginated return model for supplier warehouse products. */
export interface VinistoSupplierApiModelsWarehouseOverviewSupplierProductsReturn {
  /** List of supplier product items for the current page. */
  products?:
    | VinistoSupplierApiModelsWarehouseOverviewSupplierProductItem[]
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

/** Return model for supplier warehouse statistics. */
export interface VinistoSupplierApiModelsWarehouseOverviewSupplierStatisticsReturn {
  /**
   * Sum of all bundle quantities currently stocked in warehouse for the supplier.
   * @format int32
   */
  totalBundlesInWarehouse?: number;
  /**
   * Number of unique bundles that have stock greater than zero.
   * @format int32
   */
  uniqueBundlesInWarehouse?: number;
  /**
   * Total number of bundles sold in the current calendar month (net of returns).
   * @format int32
   */
  bundlesSoldThisMonth?: number;
  /**
   * Total number of bundles sold in the previous calendar month (net of returns).
   * @format int32
   */
  bundlesSoldLastMonth?: number;
  /**
   * Total quantity of the supplier's bundles sitting in unpaid (CREATED) orders.
   * @format int32
   */
  bundlesInUnpaidOrders?: number;
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

/** Parameters used for creating new address */
export interface VinistoSupplierDllModelsApiAddressSupplierAddressCreateParameters {
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
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

/** Parameters used for editing supplier address */
export interface VinistoSupplierDllModelsApiAddressSupplierAddressEditParameters {
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
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

/** Return object from supplier address controllers */
export interface VinistoSupplierDllModelsApiAddressSupplierAddressReturn {
  /** Found Address */
  address?: VinistoSupplierDllModelsApiAddressAddress | null;
  /** Has occurred any error. */
  isError?: boolean;
  /** List of errors code that occurred during the api request. */
  error?: VinistoHelperDllBaseError[] | null;
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

/** Return supplier certificate object */
export interface VinistoSupplierDllModelsApiCertificateCertificateReturn {
  /** Supplier object */
  certificate?: VinistoSupplierDllModelsApiCertificateCertificate | null;
  /** Has occurred any error. */
  isError?: boolean;
  /** List of errors code that occurred during the api request. */
  error?: VinistoHelperDllBaseError[] | null;
}

/** Represents bundle */
export interface VinistoSupplierDllModelsApiFeeRecordBundle {
  /**
   * Id of the bundle
   * @minLength 1
   */
  id: string;
  /** Name of the bundle - list containing language versions */
  name: VinistoSupplierDllModelsApiMultiLangValue[];
  /** Description of the bundle - list containing language versions */
  description: VinistoSupplierDllModelsApiMultiLangValue[];
  /** Long text of the bundle - list containing language versions */
  text: VinistoSupplierDllModelsApiMultiLangValue[];
  /** Url of the bundle - list containing language versions */
  url: VinistoSupplierDllModelsApiMultiLangValue[];
  /** Price of the bundle - list containing various currency. */
  prices: VinistoSupplierDllModelsApiFeeRecordPrice[];
  /** Item of the bundle - list containing various product_id and amount. */
  items: VinistoSupplierDllModelsApiFeeRecordItemsBaseItem[];
  /** Images of the bundle */
  images: VinistoImageDllModelsApiImageImage[];
  /** Enabled flag - true if bundle enabled. */
  isEnabled?: boolean;
  /** Deleted flag - true if bundle deleted. */
  isDeleted?: boolean;
  /** Tags - list containing tags id as string. */
  tags: string[];
  /** Tags of the bundles - list containing tag data as Tag object. */
  tagsDetail: VinistoSupplierDllModelsApiFeeRecordTag[];
  /** Category of the products - list containing categories id as string. */
  categories: string[];
  /** Lang for Tags */
  language?: VinistoHelperDllEnumsLanguage | null;
  /** Alternative bundles - list containing bundle id as string. */
  alternativeBundles: string[];
  /** Alternative bundles - list containing bundle id as string. */
  alternativeBundleObjects?:
    | VinistoSupplierDllModelsApiFeeRecordBundle[]
    | null;
  /** Identical bundles */
  identicalBundles: VinistoSupplierDllModelsApiFeeRecordBundle[];
  /** Product of the bundles - list containing product data as Tag object. */
  productsDetail: VinistoSupplierDllModelsApiFeeRecordProduct[];
  /**
   * Supplier - supplier id as string
   * @minLength 1
   */
  supplierId: string;
  /** Supplier - supplier object */
  supplier: VinistoSupplierDllModelsApiSupplierSupplier;
  /**
   * Count of available bundles in warehouse
   * @format int32
   */
  availableCount?: number;
  /** Delivery flag - true if for bundle is delivery free. */
  isDeliveryFree?: boolean;
  /** Average evaluation and all evaluations for bundle */
  bundleEvaluation?: VinistoSupplierDllModelsApiFeeRecordBundleEvaluation | null;
}

/** Represents data about average evaluation and all evaluations for bundle */
export interface VinistoSupplierDllModelsApiFeeRecordBundleEvaluation {
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

/** Discount for applied coupon for fee calculation purposes */
export interface VinistoSupplierDllModelsApiFeeRecordDiscountCouponValue {
  couponId?: string | null;
  /**
   * Discount without vat in fee record item currency and vat
   * @format double
   */
  discount?: number;
  /** Flag saying who costs disount. If true, supplier costs discount. Otherwise vinisto. */
  isSupplierDiscount?: boolean;
}

/** Represents a fee record for getting fee to supplier */
export interface VinistoSupplierDllModelsApiFeeRecordFeeRecord {
  /**
   * Id of the fee record
   * @minLength 1
   */
  id: string;
  /**
   * Id of the supplier the fee record is connected to
   * @minLength 1
   */
  supplierId: string;
  /** Supplier - supplier object */
  supplier: VinistoSupplierDllModelsApiSupplierSupplier;
  /**
   * Id of the bundle the fee record is connected to
   * @minLength 1
   */
  bundleId: string;
  /** Bundle - bundle object */
  bundle: VinistoSupplierDllModelsApiFeeRecordBundle;
  /**
   * Id of the order the fee record is connected to
   * @minLength 1
   */
  orderId: string;
  /** Id of billing associated with this fee record */
  billingId?: string | null;
  /**
   * Time of the record created - timestamp in seconds from 1.1.1970
   * @format int64
   */
  createdAt?: number;
  /** Standard bundle price in time of order */
  originalPrice: VinistoSupplierDllModelsApiFeeRecordPrice;
  /** Price of the item in this fee record */
  itemPrice: VinistoSupplierDllModelsApiFeeRecordPrice;
  /** Flag specifies which price is used to fee compute. If true, then fee is computed form ItemPrice. If false, then fee is computed from OriginalPrice. */
  isSupplierDiscount?: boolean | null;
  /**
   * Supplier yield without vat in item price currency
   * @format double
   */
  supplierYieldValue?: number;
  /** Contains coupons with calculated discount which are applied to order item */
  discountCoupons?:
    | VinistoSupplierDllModelsApiFeeRecordDiscountCouponValue[]
    | null;
  /** Is it paid out. */
  isPaidOut?: boolean;
  /** Contains list of possible fee record types */
  type?: VinistoHelperDllEnumsFeeRecordFeeRecordType;
  /** Price type with B2b level type. If null, then it is not b2b fee record. */
  priceLevel?: VinistoHelperDllEnumsPriceLevel | null;
  /** Type discount of fee record. */
  typeDiscount?: VinistoHelperDllEnumsPriceDiscountType | null;
  /** Applied sale fee rule to bundle. */
  appliedSaleFeeRule?: VinistoSupplierDllModelsApiFeeRecordFeeRuleItemAppliedFeeRule | null;
  /** Applied logistics fee rules to bundle. */
  appliedLogisticFeeRule?: VinistoSupplierDllModelsApiFeeRecordFeeRuleItemAppliedFeeRule | null;
  /**
   * Calculated fee to this item record in percent eg. 13.5%. Its sum Percentage from AppliedFeeRules.
   * @format double
   */
  feePercentage?: number;
  /**
   * Calculated fee to this item record. Its sum FixedPrice from AppliedFeeRules.
   * @format double
   */
  fixFee?: number;
  /**
   * Vinisto fee without vat in item price currecncy.
   * @format double
   */
  vinistoFeeValue?: number;
  /**
   * Vinisto fee with vat in item price currecncy.
   * @format double
   */
  vinistoFeeValueWithVat?: number;
  /** Order id in the external app. */
  externalOrderId?: string | null;
  /** @format int32 */
  platform?: number;
}

/** Return object from FeeRecord Controllers */
export interface VinistoSupplierDllModelsApiFeeRecordFeeRecordReturn {
  /** Fee Record object */
  feeRecord?: VinistoSupplierDllModelsApiFeeRecordFeeRecord | null;
  /** Has occurred any error. */
  isError?: boolean;
  /** List of errors code that occurred during the api request. */
  error?: VinistoHelperDllBaseError[] | null;
}

/** Parameters used for manipulation fee record */
export interface VinistoSupplierDllModelsApiFeeRecordFeeRecordsFromOrderParameters {
  /**
   * Id of the order the fee record is connected to
   * @minLength 1
   */
  orderId: string;
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

/** Parameters used for manipulation fee record */
export interface VinistoSupplierDllModelsApiFeeRecordFeeRecordsManipulationParameters {
  /**
   * Id of the bundle the fee record is connected to
   * @minLength 1
   */
  bundleId: string;
  /** ObjectId of the order the fee record is connected to */
  orderId?: string | null;
  /** Contains list of possible fee record types */
  type: VinistoHelperDllEnumsFeeRecordFeeRecordType;
  /** Type of the bundle price. Is allowed only from B2B request and allowed values are B2B_LEVELE_1 .. B2B_LEVEL_N */
  priceLevel?: VinistoHelperDllEnumsPriceLevel | null;
  /** Is it paid out. */
  isPaidOut?: boolean | null;
  /** Identifies type of the country */
  countryOfSale?: VinistoHelperDllEnumsCountryCode;
  /** Order id in external app. */
  externalOrderId?: string | null;
  userLoginHash?: string | null;
}

/** Return list object from FeeRecord Controllers */
export interface VinistoSupplierDllModelsApiFeeRecordFeeRecordsReturn {
  /** List of Fee Records object */
  feeRecords?: VinistoSupplierDllModelsApiFeeRecordFeeRecord[] | null;
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

export interface VinistoSupplierDllModelsApiFeeRecordFeeRuleItemAppliedFeeRule {
  /** Represents Fee value defined by percentage or fixed price. */
  feeValue?: VinistoSupplierDllModelsApiFeeRecordFeeRuleItemFeeValue | null;
  /** Represents Fee rule snapshot with necessary data. */
  feeRule?:
    | VinistoSupplierDllModelsApiFeeRecordFeeRuleItemSaleFeeRule
    | VinistoSupplierDllModelsApiFeeRecordFeeRuleItemLogisticFeeRule
    | VinistoSupplierDllModelsApiFeeRecordFeeRuleItemDynamicSaleFeeRule
    | null;
}

/** Represents Fee rule snapshot with necessary data. */
export interface VinistoSupplierDllModelsApiFeeRecordFeeRuleItemBaseFeeRule {
  feeRuleId?: string | null;
  /** Contains list of possible fee rule types */
  type?: VinistoHelperDllEnumsFeeRuleFeeRuleType;
  /** Identifies type of the country */
  originCountry?: VinistoHelperDllEnumsCountryCode;
  /** Identifies type of the country */
  destinationCountry?: VinistoHelperDllEnumsCountryCode;
  /** @format int64 */
  validFrom?: number | null;
  /** @format int64 */
  validTo?: number | null;
}

/** Represents Dynamic sale fee rule to create supplier fee. */
export type VinistoSupplierDllModelsApiFeeRecordFeeRuleItemDynamicSaleFeeRule =
  VinistoSupplierDllModelsApiFeeRecordFeeRuleItemBaseFeeRule & {
    name?: string | null;
    /**
     * Contains list of possible production types.
     * Origin production = supplier country code is equals to bundle made in country.
     */
    production?: VinistoHelperDllEnumsFeeRecordFeeValueProductionType;
  };

/** Represents Fee value defined by percentage or fixed price. */
export interface VinistoSupplierDllModelsApiFeeRecordFeeRuleItemFeeValue {
  /** @format double */
  fixedPrice?: number;
  /** @format double */
  percentage?: number;
  /**
   * Vinisto fee without vat in item price currecncy.
   * @format double
   */
  vinistoFeeValue?: number;
  /**
   * Vinisto fee with vat in item price currecncy.
   * @format double
   */
  vinistoFeeValueWithVat?: number;
}

/** Represents Logistic fee rule to create supplier fee. */
export type VinistoSupplierDllModelsApiFeeRecordFeeRuleItemLogisticFeeRule =
  VinistoSupplierDllModelsApiFeeRecordFeeRuleItemBaseFeeRule & {
    name?: string | null;
    warehouseId?: string | null;
  };

/** Represents Sale fee rule to create supplier fee. */
export type VinistoSupplierDllModelsApiFeeRecordFeeRuleItemSaleFeeRule =
  VinistoSupplierDllModelsApiFeeRecordFeeRuleItemBaseFeeRule & {
    /**
     * Contains list of possible production types.
     * Origin production = supplier country code is equals to bundle made in country.
     */
    production?: VinistoHelperDllEnumsFeeRecordFeeValueProductionType;
  };

/** Represents base item object to specify bundle items by his type. */
export interface VinistoSupplierDllModelsApiFeeRecordItemsBaseItem {
  itemId?: string | null;
  /** @format int32 */
  amount?: number;
}

/** Represents price object containing various currency */
export interface VinistoSupplierDllModelsApiFeeRecordPrice {
  /**
   * Value - price
   * @format double
   */
  value?: number;
  /** VatRate */
  vat?: VinistoHelperDllEnumsVatRate;
  /**
   * Price with vat
   * @format double
   */
  valueWithVat?: number;
  /**
   * Current Vat value in %
   * @format int32
   */
  vatValue?: number;
  /**
   * Currency
   * @minLength 1
   */
  currency: string;
}

/** Represents product. */
export interface VinistoSupplierDllModelsApiFeeRecordProduct {
  /**
   * Id of the product
   * @minLength 1
   */
  id: string;
  /** Url of the product - list containing language versions */
  url: VinistoSupplierDllModelsApiMultiLangValue[];
  /** Name of the product - list containing language versions */
  name: VinistoSupplierDllModelsApiMultiLangValue[];
  /** Description of the product - list containing language versions */
  description: VinistoSupplierDllModelsApiMultiLangValue[];
  /** Long text of the product - list containing language versions */
  text: VinistoSupplierDllModelsApiMultiLangValue[];
  /** Price of the bundle - list containing various currency. */
  prices: VinistoSupplierDllModelsApiFeeRecordPrice[];
  /** Images of the product */
  images: VinistoImageDllModelsApiImageImage[];
  /** Enabled flag - true if product enabled. */
  isEnabled?: boolean;
  /** Deleted flag - true if product deleted. */
  isDeleted?: boolean;
  /** Category of the products - list containing categories id as string. */
  categories: string[];
  /** Tags - list containing tags id as string. */
  tags: string[];
  /** Tags of the products - list containing tag data as Tag object. */
  tagsDetail: VinistoSupplierDllModelsApiFeeRecordTag[];
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
}

/** Parameters used to revert fee records from external app. */
export interface VinistoSupplierDllModelsApiFeeRecordRevertFeeRecordsParameters {
  /** Order id in the external app. */
  externalOrderId: string | null;
}

/** Represents tag of a product. */
export interface VinistoSupplierDllModelsApiFeeRecordTag {
  /**
   * Id of the tag
   * @minLength 1
   */
  id: string;
  /** Name of the tag - list containing language versions */
  name: VinistoSupplierDllModelsApiMultiLangValue[];
  /** Url of the tag - list containing language versions */
  url: VinistoSupplierDllModelsApiMultiLangValue[];
  /**
   * Tag color in RGB ("#000000")
   * @minLength 1
   */
  color: string;
  /** HomePage flag - true if tag is view in homepage. */
  isInHomePage?: boolean;
  /** Bundle with this tag - list containing bundle data as Bundle object. */
  bundles: VinistoSupplierDllModelsApiFeeRecordBundle[];
  /** Lang for Tags */
  language?: VinistoHelperDllEnumsLanguage | null;
  /** Is display list Bundles in result tags */
  isDisplayBundles?: boolean;
}

export interface VinistoSupplierDllModelsApiMerchantFeeRuleMerchant {
  id: string | null;
  firstName: string | null;
  surname: string | null;
  email: string | null;
}

/** Represents bundle */
export interface VinistoSupplierDllModelsApiMerchantFeeRuleMerchantFeeRule {
  /** Id of the bundle */
  id: string | null;
  /** Allowed values for type specification. */
  type?: VinistoCommonDllModelsApiSpecificationsStringSpecificationWithoutType | null;
  /** Allowed values for kind spceficiation. */
  kind?: VinistoCommonDllModelsApiSpecificationsStringSpecificationWithoutType | null;
  /** @format double */
  fee: number;
  merchants?: string[] | null;
  merchantsDetails?:
    | VinistoSupplierDllModelsApiMerchantFeeRuleMerchant[]
    | null;
}

/** Parameters used for manipulation fee record */
export interface VinistoSupplierDllModelsApiMerchantFeeRuleMerchantFeeRuleCreateParameters {
  /** Allowed values for type specification. */
  type?: VinistoCommonDllModelsApiSpecificationsStringSpecificationWithoutType | null;
  /** Allowed values for kind spceficiation. */
  kind?: VinistoCommonDllModelsApiSpecificationsStringSpecificationWithoutType | null;
  /** @format double */
  fee: number;
  merchants?: string[] | null;
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

/** Return object for MerchantFeeRule. */
export interface VinistoSupplierDllModelsApiMerchantFeeRuleMerchantFeeRuleReturn {
  /** Merchant fee rule object */
  merchantFeeRule?: VinistoSupplierDllModelsApiMerchantFeeRuleMerchantFeeRule | null;
  /** Has occurred any error. */
  isError?: boolean;
  /** List of errors code that occurred during the api request. */
  error?: VinistoHelperDllBaseError[] | null;
}

/** Parameters used for manipulation fee record */
export interface VinistoSupplierDllModelsApiMerchantFeeRuleMerchantFeeRuleUpdateParameters {
  /** Allowed values for type specification. */
  type?: VinistoCommonDllModelsApiSpecificationsStringSpecificationWithoutType | null;
  /** Allowed values for kind spceficiation. */
  kind?: VinistoCommonDllModelsApiSpecificationsStringSpecificationWithoutType | null;
  /** @format double */
  fee?: number | null;
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

/** Return list of MerchantFeeRule object */
export interface VinistoSupplierDllModelsApiMerchantFeeRuleMerchantFeeRulesReturn {
  /** List of Merchant fee rule object */
  merchantFeeRules?:
    | VinistoSupplierDllModelsApiMerchantFeeRuleMerchantFeeRule[]
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

/** Class for objects which required to store value in various languages. */
export interface VinistoSupplierDllModelsApiMultiLangValue {
  /** Contains list of possible languages */
  language?: VinistoHelperDllEnumsLanguage;
  /**
   * Value
   * @minLength 1
   */
  value: string;
}

export interface VinistoSupplierDllModelsApiSupplierBasketSupplierReturn {
  id?: string | null;
  url?: string | null;
  name?: string | null;
}

export interface VinistoSupplierDllModelsApiSupplierBasketSuppliersReturn {
  suppliers?: VinistoSupplierDllModelsApiSupplierBasketSupplierReturn[] | null;
  /** Has occurred any error. */
  isError?: boolean;
  /** List of errors code that occurred during the api request. */
  error?: VinistoHelperDllBaseError[] | null;
}

export interface VinistoSupplierDllModelsApiSupplierGetBasketSuppliersByIdsParameters {
  supplierIds?: string[] | null;
  language?: VinistoHelperDllEnumsLanguage | null;
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
  /** Identifies type of the country */
  countryCode?: VinistoHelperDllEnumsCountryCode;
  /** List of user ids that can edit supplier data. */
  userIds: string[];
  /** List of user objects that can edit supplier data. */
  users: VinistoSupplierDllModelsApiSupplierUser[];
  /** List of supplier tag ids assigned to this supplier. */
  supplierTagIds?: string[] | null;
  /** List of supplier tags assigned to this supplier. */
  supplierTags?: VinistoSupplierDllModelsApiSupplierTagGetSupplierTag[] | null;
  /** Contains list of possible supplier type */
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

/** Parameters used for adding user to supplier. */
export interface VinistoSupplierDllModelsApiSupplierSupplierAddUserParameters {
  /** @minLength 1 */
  userId: string;
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

/** Parameters used for creating new supplier with user authorization. */
export interface VinistoSupplierDllModelsApiSupplierSupplierCreateAuthParameters {
  /**
   * UserHash to authorize respective operation.
   * @minLength 1
   */
  userLoginHash: string;
  /**
   * Represents supplier address
   * IMPORTANT!!! - changing this object please increase model version of this or main mongo object and create Migration!
   */
  address: VinistoMongoConnectorModelsSupplierAddress;
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
  /** Identifies type of the country */
  countryCode: VinistoHelperDllEnumsCountryCode;
  /** Contains list of possible supplier type */
  supplierType: VinistoHelperDllEnumsSupplierSupplierType;
  /** IsShipping. It is neccessary for fee calculation. */
  isShipping?: boolean;
  /** Contains list of possible languages */
  language?: VinistoHelperDllEnumsLanguage;
  /** Supplier web. */
  web?: string | null;
  /** Supplier company description. */
  companyDescription?: string | null;
  /** Supplier main profile. */
  mainProfile?: string | null;
  /** Supplier wine region. */
  wineRegion?: string | null;
  /**
   * Represents supplier address
   * IMPORTANT!!! - changing this object please increase model version of this or main mongo object and create Migration!
   */
  pickupAddress?: VinistoMongoConnectorModelsSupplierAddress | null;
  /** Bank account number. */
  bankAccountNumber?: string | null;
  /** Coupon prefix. */
  couponPrefix?: string | null;
  /** Internal supplier note. */
  internalSupplierNote?: string | null;
  /**
   * Maximum possible supplier discount in percent.
   * @format double
   * @min 0
   * @max 100
   */
  maxPossibleSupplierDiscountPercentage?: number | null;
  /**
   * Maximum percentage by which the B2B price can be lower than the B2C price.
   * @format double
   * @min 0
   * @max 100
   */
  maxB2cB2bPriceDifferencePercentage?: number | null;
  /**
   * Maximum discount for a supplier B2C promotion in percent.
   * @format double
   * @min 0
   * @max 100
   */
  maxB2cPromotionDiscountPercentage?: number | null;
  /**
   * Maximum number of supplier B2C promotions per year.
   * @format int32
   * @min 0
   * @max 2147483647
   */
  maxB2cPromotionsPerYear?: number | null;
}

/** Parameters used for editing supplier. */
export interface VinistoSupplierDllModelsApiSupplierSupplierEditParameters {
  /**
   * UserHash to authorize respective operation.
   * @minLength 1
   */
  userLoginHash: string;
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
  /** Identifies type of the country */
  countryCode: VinistoHelperDllEnumsCountryCode;
  /** Contains list of possible supplier type */
  supplierType: VinistoHelperDllEnumsSupplierSupplierType;
  /** IsShipping. It is neccessary for fee calculation. */
  isShipping?: boolean;
  /** Contains list of possible languages */
  language?: VinistoHelperDllEnumsLanguage;
  /** Supplier web. */
  web?: string | null;
  /** Supplier company description. */
  companyDescription?: string | null;
  /** Supplier main profile. */
  mainProfile?: string | null;
  /** Supplier wine region. */
  wineRegion?: string | null;
  /**
   * Represents supplier address
   * IMPORTANT!!! - changing this object please increase model version of this or main mongo object and create Migration!
   */
  pickupAddress?: VinistoMongoConnectorModelsSupplierAddress | null;
  /** Bank account number. */
  bankAccountNumber?: string | null;
  /** Coupon prefix. */
  couponPrefix?: string | null;
  /** Internal supplier note. */
  internalSupplierNote?: string | null;
  /**
   * Maximum possible supplier discount in percent.
   * @format double
   * @min 0
   * @max 100
   */
  maxPossibleSupplierDiscountPercentage?: number | null;
  /**
   * Maximum percentage by which the B2B price can be lower than the B2C price.
   * @format double
   * @min 0
   * @max 100
   */
  maxB2cB2bPriceDifferencePercentage?: number | null;
  /**
   * Maximum discount for a supplier B2C promotion in percent.
   * @format double
   * @min 0
   * @max 100
   */
  maxB2cPromotionDiscountPercentage?: number | null;
  /**
   * Maximum number of supplier B2C promotions per year.
   * @format int32
   * @min 0
   * @max 2147483647
   */
  maxB2cPromotionsPerYear?: number | null;
}

/** Parameters used for remove user from supplier. */
export interface VinistoSupplierDllModelsApiSupplierSupplierRemoveUserParameters {
  /** @minLength 1 */
  userId: string;
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

/** Return object from Supplier Controllers. */
export interface VinistoSupplierDllModelsApiSupplierSupplierReturn {
  /** Supplier object. */
  supplier?: VinistoSupplierDllModelsApiSupplierSupplier | null;
  /** Has occurred any error. */
  isError?: boolean;
  /** List of errors code that occurred during the api request. */
  error?: VinistoHelperDllBaseError[] | null;
}

/** Parameters used for creating new supplier and user. */
export interface VinistoSupplierDllModelsApiSupplierSupplierUserCreateParameters {
  /**
   * Email of the user.
   * @minLength 1
   */
  email: string;
  /** User nickname. */
  nickname?: string | null;
  /**
   * Password of the user.
   * @minLength 1
   */
  password: string;
  /** Agreement of credential conditions is confirmed. */
  isAgreementCC: boolean;
  /** Flag for sending newsletter. */
  isNewsletterActive: boolean;
  /** Identifies type of the country */
  registrationCountry?: VinistoHelperDllEnumsCountryCode;
  /**
   * Represents supplier address
   * IMPORTANT!!! - changing this object please increase model version of this or main mongo object and create Migration!
   */
  address: VinistoMongoConnectorModelsSupplierAddress;
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
  /** Identifies type of the country */
  countryCode: VinistoHelperDllEnumsCountryCode;
  /** Contains list of possible supplier type */
  supplierType: VinistoHelperDllEnumsSupplierSupplierType;
  /** IsShipping. It is neccessary for fee calculation. */
  isShipping?: boolean;
  /** Contains list of possible languages */
  language?: VinistoHelperDllEnumsLanguage;
  /** Supplier web. */
  web?: string | null;
  /** Supplier company description. */
  companyDescription?: string | null;
  /** Supplier main profile. */
  mainProfile?: string | null;
  /** Supplier wine region. */
  wineRegion?: string | null;
  /**
   * Represents supplier address
   * IMPORTANT!!! - changing this object please increase model version of this or main mongo object and create Migration!
   */
  pickupAddress?: VinistoMongoConnectorModelsSupplierAddress | null;
  /** Bank account number. */
  bankAccountNumber?: string | null;
  /** Coupon prefix. */
  couponPrefix?: string | null;
  /** Internal supplier note. */
  internalSupplierNote?: string | null;
  /**
   * Maximum possible supplier discount in percent.
   * @format double
   * @min 0
   * @max 100
   */
  maxPossibleSupplierDiscountPercentage?: number | null;
  /**
   * Maximum percentage by which the B2B price can be lower than the B2C price.
   * @format double
   * @min 0
   * @max 100
   */
  maxB2cB2bPriceDifferencePercentage?: number | null;
  /**
   * Maximum discount for a supplier B2C promotion in percent.
   * @format double
   * @min 0
   * @max 100
   */
  maxB2cPromotionDiscountPercentage?: number | null;
  /**
   * Maximum number of supplier B2C promotions per year.
   * @format int32
   * @min 0
   * @max 2147483647
   */
  maxB2cPromotionsPerYear?: number | null;
}

/** Return list object from Supplier Controllers. */
export interface VinistoSupplierDllModelsApiSupplierSuppliersReturn {
  /** List of Supplier object. */
  suppliers?: VinistoSupplierDllModelsApiSupplierSupplier[] | null;
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

export interface VinistoSupplierDllModelsApiSupplierTagCreateSupplierTagRequestContract {
  name?: VinistoSupplierDllModelsApiMultiLangValue[] | null;
  description?: VinistoSupplierDllModelsApiMultiLangValue[] | null;
  metaDescription?: VinistoSupplierDllModelsApiMultiLangValue[] | null;
  url?: VinistoSupplierDllModelsApiMultiLangValue[] | null;
  color?: string | null;
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

export interface VinistoSupplierDllModelsApiSupplierTagCreateSupplierTagResponseContract {
  id?: string | null;
  /** Has occurred any error. */
  isError?: boolean;
  /** List of errors code that occurred during the api request. */
  error?: VinistoHelperDllBaseError[] | null;
}

export interface VinistoSupplierDllModelsApiSupplierTagDeleteSupplierTagResponseContract {
  id?: string | null;
  /** Has occurred any error. */
  isError?: boolean;
  /** List of errors code that occurred during the api request. */
  error?: VinistoHelperDllBaseError[] | null;
}

export interface VinistoSupplierDllModelsApiSupplierTagGetFilteredSupplierTagsResponseContract {
  supplierTags?: VinistoSupplierDllModelsApiSupplierTagGetSupplierTag[] | null;
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

export interface VinistoSupplierDllModelsApiSupplierTagGetSupplierTagResponseContract {
  supplierTag?: VinistoSupplierDllModelsApiSupplierTagGetSupplierTag | null;
  /** Has occurred any error. */
  isError?: boolean;
  /** List of errors code that occurred during the api request. */
  error?: VinistoHelperDllBaseError[] | null;
}

export interface VinistoSupplierDllModelsApiSupplierTagGetSupplierTagsResponseContract {
  supplierTagList?:
    | VinistoSupplierDllModelsApiSupplierTagGetSupplierTag[]
    | null;
  /** Has occurred any error. */
  isError?: boolean;
  /** List of errors code that occurred during the api request. */
  error?: VinistoHelperDllBaseError[] | null;
}

export interface VinistoSupplierDllModelsApiSupplierTagModifySupplierSupplierTagsRequestContract {
  supplierTagIds: string[] | null;
  supplierId: string | null;
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

export interface VinistoSupplierDllModelsApiSupplierTagModifySupplierSupplierTagsResponseContract {
  supplierTagIds?: string[] | null;
  supplierId?: string | null;
  /** Has occurred any error. */
  isError?: boolean;
  /** List of errors code that occurred during the api request. */
  error?: VinistoHelperDllBaseError[] | null;
}

export interface VinistoSupplierDllModelsApiSupplierTagUpdateSupplierTagRequestContract {
  name?: VinistoSupplierDllModelsApiMultiLangValue[] | null;
  description?: VinistoSupplierDllModelsApiMultiLangValue[] | null;
  metaDescription?: VinistoSupplierDllModelsApiMultiLangValue[] | null;
  url?: VinistoSupplierDllModelsApiMultiLangValue[] | null;
  color?: string | null;
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

export interface VinistoSupplierDllModelsApiSupplierTagUpdateSupplierTagResponseContract {
  supplierTag?: VinistoSupplierDllModelsApiSupplierTagGetSupplierTag | null;
  /** Has occurred any error. */
  isError?: boolean;
  /** List of errors code that occurred during the api request. */
  error?: VinistoHelperDllBaseError[] | null;
}

export interface AdminProductsDetailParams {
  /**
   * Maximum number of items to return.
   * @format int32
   * @default 10
   */
  Limit?: number;
  /**
   * Number of items to skip.
   * @format int32
   * @default 0
   */
  Offset?: number;
  /** If provided, only bundles whose name contains this string (case-insensitive) are returned. */
  SearchBundleName?: string;
  /** If provided, only bundles that contain a product with this warehouse ID are returned. */
  SearchProductWarehouseId?: string;
  /** Supplier identifier. */
  supplierId: string;
}

export type AdminFeeRulesDynamicSaleCreatePayload =
  VinistoFeeSystemModelsFeeRuleDynamicSaleFeeRuleCreateParameters;

export type AdminFeeRulesDynamicSalePartialUpdatePayload =
  VinistoFeeSystemModelsFeeRuleDynamicSaleFeeRuleEditParameters;

export interface AdminFeeRulesDetailParams {
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
  feeRuleId: string;
}

export interface AdminFeeRulesListParams {
  /** Contains list of possible fee rule types */
  Type: VinistoHelperDllEnumsFeeRuleFeeRuleType;
  /** Identifies type of the country */
  OriginCountry: VinistoHelperDllEnumsCountryCode;
  /** Identifies type of the country */
  DestinationCountry: VinistoHelperDllEnumsCountryCode;
  /** @format int64 */
  ValidFrom?: number;
  /** @format int64 */
  ValidTo?: number;
  /** @format double */
  BundlePriceFrom?: number;
  /** @format double */
  BundlePriceTo?: number;
  State?: VinistoHelperDllEnumsFeeRuleFeeRuleState;
  BundleType?: string;
  BundleKind?: string;
  /** Only for types Logistic and DynamicSale. */
  Name?: string;
  /** Sort by provided property. */
  SortingColumn?: VinistoHelperDllEnumsFeeRuleFeeRuleSortableColumns;
  IsSortingDescending?: boolean;
  /** @format int32 */
  Limit?: number;
  /** @format int32 */
  Offset?: number;
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
}

export interface AdminFeeRulesCheckBundlesValidityListParams {
  /** Only Sale or Logistic types are allowed. */
  Type: VinistoHelperDllEnumsFeeRuleFeeRuleType;
  /** Identifies type of the country */
  OriginCountry: VinistoHelperDllEnumsCountryCode;
  /** Identifies type of the country */
  DestinationCountry: VinistoHelperDllEnumsCountryCode;
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
}

export interface AdminFeeRulesGetInvalidBundlesListParams {
  /** Only Sale or Logistic types are allowed. */
  Type: VinistoHelperDllEnumsFeeRuleFeeRuleType;
  /** Identifies type of the country */
  OriginCountry: VinistoHelperDllEnumsCountryCode;
  /** Identifies type of the country */
  DestinationCountry: VinistoHelperDllEnumsCountryCode;
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
}

export interface AdminFeeRulesGetAppliedListParams {
  /** Destination country. Origin country is selected form supplier country code. */
  DestinationCountry?: VinistoHelperDllEnumsCountryCode;
  /**
   * Fee rule states to filter by.
   * Default: Active, EndingSoon
   */
  FeeRuleStates?: VinistoHelperDllEnumsFeeRuleFeeRuleState[];
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
  /** Id of the bundle. */
  bundleId: string;
}

export type AdminFeeRulesLogisticCreatePayload =
  VinistoFeeSystemModelsFeeRuleLogisticFeeRuleCreateParameters;

export type AdminFeeRulesLogisticPartialUpdatePayload =
  VinistoFeeSystemModelsFeeRuleLogisticFeeRuleEditParameters;

export type AdminFeeRulesSaleCreatePayload =
  VinistoFeeSystemModelsFeeRuleSaleFeeRuleCreateParameters;

export type AdminFeeRulesSalePartialUpdatePayload =
  VinistoFeeSystemModelsFeeRuleSaleFeeRuleEditParameters;

export interface AdminFeeRulesSupplierDetailParams {
  /** Identifies type of the country */
  OriginCountry: VinistoHelperDllEnumsCountryCode;
  /** Identifies type of the country */
  DestinationCountry: VinistoHelperDllEnumsCountryCode;
  IsActive?: boolean;
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
  id: string;
}

export interface AdminFeeRulesSupplierFeeValuesListParams {
  /** Identifies type of the country */
  OriginCountry: VinistoHelperDllEnumsCountryCode;
  /** Identifies type of the country */
  DestinationCountry: VinistoHelperDllEnumsCountryCode;
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
  id: string;
}

export interface AdminFeeRecordsGroupByOrderListParams {
  SupplierId: string;
  /** @format int64 */
  TimeFrom: number;
  /** @format int64 */
  TimeTo?: number;
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
}

export type BasketSuppliersByIdsCreatePayload =
  VinistoSupplierDllModelsApiSupplierGetBasketSuppliersByIdsParameters;

export interface FeeRecordsDetailParams {
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
  /** Id of the fee record to get */
  feeRecordId: string;
}

export interface FeeRecordsDeleteParams {
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
  /** Id of the fee record to delete */
  feeRecordId: string;
}

export interface FeeRecordsListParams {
  /** If provided search by supplierId */
  SupplierId?: string;
  /** If provided search by OrderId */
  OrderId?: string;
  /** If provided search by BundleId */
  BundleId?: string;
  /**
   * If provided search all records from provided Time (timestamp in seconds from 1.1.1970)
   * @format int32
   */
  TimeFrom?: number;
  /**
   * If provided search all records to provided Time (timestamp in seconds from 1.1.1970)
   * @format int32
   */
  TimeTo?: number;
  /** If provided and If true shows only paid out record, on false shows only not paid records */
  IsPaidOut?: boolean;
  /** If provided shows only provided type records */
  FeeRecordType?: VinistoHelperDllEnumsFeeRecordFeeRecordType;
  /** If provided shows only fee records with provided sell type */
  FeeRecordSellType?: VinistoHelperDllEnumsFeeRecordFeeRecordSellType;
  /** If provided, sorting will be done according to this column. if not provided, default sorting is done by Id */
  SortingColumn?: VinistoHelperDllEnumsFeeRecordSortableColumns;
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
  /** Prices currency. Is used for getting price available filter. */
  Currency?: VinistoHelperDllEnumsCurrency;
  /** If null, then return all fee records. If true, then return fee records with price type null (B2C). If false, then return fee records with price type not null (B2B). */
  IsB2cFees?: boolean;
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
}

/** Parameters used for manipulation fee record */
export type FeeRecordsCreatePayload =
  VinistoSupplierDllModelsApiFeeRecordFeeRecordsManipulationParameters;

/** Parameters used for manipulation fee record */
export type FeeRecordsCreateFeeRecordsFromOrderCreatePayload =
  VinistoSupplierDllModelsApiFeeRecordFeeRecordsFromOrderParameters;

/** Parameters used to revert fee records from external app. */
export type FeeRecordsRevertCreatePayload =
  VinistoSupplierDllModelsApiFeeRecordRevertFeeRecordsParameters;

export interface MerchantPortalMerchantFeeRulesDetailParams {
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
  merchantFeeRuleId: string;
}

/** Parameters used for manipulation fee record */
export type MerchantPortalMerchantFeeRulesUpdatePayload =
  VinistoSupplierDllModelsApiMerchantFeeRuleMerchantFeeRuleUpdateParameters;

export interface MerchantPortalMerchantFeeRulesDeleteParams {
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
  merchantFeeRuleId: string;
}

export interface MerchantPortalMerchantFeeRulesListParams {
  /** If provided search by type specification. */
  Type?: string;
  /** If provided search by kind specification. */
  Kind?: string;
  /** If provided search by merchant name. */
  Merchant?: string;
  /** If provided, sorting will be done according to this column. if not provided, default sorting is done by Id. */
  SortingColumn?: VinistoHelperDllEnumsMerchantFeeFuleSortableColumns;
  /** True in case that sorting shall be done in descending order. */
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
}

/** Parameters used for manipulation fee record */
export type MerchantPortalMerchantFeeRulesCreatePayload =
  VinistoSupplierDllModelsApiMerchantFeeRuleMerchantFeeRuleCreateParameters;

/** Class containing parameters for user authorization */
export type MerchantPortalMerchantFeeRulesMerchantUpdatePayload =
  VinistoHelperDllBaseAuthorizationParameters;

/** Class containing parameters for user authorization */
export type MerchantPortalMerchantFeeRulesMerchantDeletePayload =
  VinistoHelperDllBaseAuthorizationParameters;

export interface StockingRequestsDetailParams {
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
  /** Stocking request id */
  stockingRequestId: string;
}

export interface StockingRequestsDeleteParams {
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
  /** Stocking request id */
  stockingRequestId: string;
}

/** StockingRequestModifyBundleParameters - Parameters to modify bundle in stocking request */
export type StockingRequestsUpdatePayload =
  VinistoStockingRequestDllModelsApiStockingRequestStockingRequestModifyBundleParameters;

/** StockingRequestModifyBundlesParameters - Parameters to modify bundles in stocking request */
export type StockingRequestsModifyBundlesStockingRequestUpdatePayload =
  VinistoStockingRequestDllModelsApiStockingRequestStockingRequestModifyBundlesParameters;

/** Class containing parameters for user authorization */
export type StockingRequestsUpdateStockingRequestWmsUpdatePayload =
  VinistoHelperDllBaseAuthorizationParameters;

export interface StockingRequestsDownloadPdfListParams {
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
  /** Id of the stocking request */
  stockingRequestId: string;
}

export type StockingRequestsUpdateAdminNoteUpdatePayload =
  VinistoStockingRequestDllModelsApiStockingRequestStockingRequestUpdateAdminNoteParameters;

export interface StockingRequestsListParams {
  IsSent?: boolean;
  SearchSupplierName?: string;
  SearchSupplierId?: string;
  SearchRequestNumber?: string;
  /** @format int32 */
  SearchCreateDate?: number;
  /** @format int32 */
  SearchCreateDateFrom?: number;
  /** @format int32 */
  SearchCreateDateTo?: number;
  SearchDeliveryType?: VinistoHelperDllEnumsStockingRequestDeliveryType;
  /** @format int32 */
  SearchStockingDate?: number;
  /** @format int32 */
  SearchStockingDateFrom?: number;
  /** @format int32 */
  SearchStockingDateTo?: number;
  /** @format int32 */
  SearchDeliveryDate?: number;
  /** @format int32 */
  SearchDeliveryDateFrom?: number;
  /** @format int32 */
  SearchDeliveryDateTo?: number;
  SearchStockingState?: VinistoHelperDllEnumsStockingRequestStockingState[];
  Language?: VinistoHelperDllEnumsLanguage;
  /** Contains list of possible columns for sorting */
  SortingColumn?: VinistoHelperDllEnumsStockingRequestSortableColumns;
  IsSortingDescending?: boolean;
  /** @format int32 */
  Limit?: number;
  /** @format int32 */
  Offset?: number;
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
}

export interface HeadSupplierApiParams {
  IsSent?: boolean;
  SearchSupplierName?: string;
  SearchSupplierId?: string;
  SearchRequestNumber?: string;
  /** @format int32 */
  SearchCreateDate?: number;
  /** @format int32 */
  SearchCreateDateFrom?: number;
  /** @format int32 */
  SearchCreateDateTo?: number;
  SearchDeliveryType?: VinistoHelperDllEnumsStockingRequestDeliveryType;
  /** @format int32 */
  SearchStockingDate?: number;
  /** @format int32 */
  SearchStockingDateFrom?: number;
  /** @format int32 */
  SearchStockingDateTo?: number;
  /** @format int32 */
  SearchDeliveryDate?: number;
  /** @format int32 */
  SearchDeliveryDateFrom?: number;
  /** @format int32 */
  SearchDeliveryDateTo?: number;
  SearchStockingState?: VinistoHelperDllEnumsStockingRequestStockingState[];
  Language?: VinistoHelperDllEnumsLanguage;
  /** Contains list of possible columns for sorting */
  SortingColumn?: VinistoHelperDllEnumsStockingRequestSortableColumns;
  IsSortingDescending?: boolean;
  /** @format int32 */
  Limit?: number;
  /** @format int32 */
  Offset?: number;
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
}

/** StockingRequestCreateParameters - Parameters for creating new stocking request */
export type StockingRequestsCreatePayload =
  VinistoStockingRequestDllModelsApiStockingRequestStockingRequestCreateParameters;

/** Class containing parameters for user authorization */
export type StockingRequestsStatesCancelStockingRequestUpdatePayload =
  VinistoHelperDllBaseAuthorizationParameters;

/** StockingRequestBundleNotesParameters - Parameters to close stocking request */
export type StockingRequestsStatesAddBundleNotesToStockingRequestUpdatePayload =
  VinistoStockingRequestDllModelsApiStockingRequestStockingRequestBundleNotesParameters;

export interface StockingRequestsStatesCloseStockingRequestUpdatePayload {
  /** @format binary */
  receiptFile?: File;
}

export interface StockingRequestsStatesCloseStockingRequestUpdateParams {
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
  /** Stocking request id */
  stockingRequestId: string;
}

/** Class containing parameters for user authorization */
export type StockingRequestsStatesSendStockingRequestToSupplierCreatePayload =
  VinistoHelperDllBaseAuthorizationParameters;

/** Class containing parameters for user authorization */
export type StockingRequestsStatesSendStockingRequestToSupplierAgainCreatePayload =
  VinistoHelperDllBaseAuthorizationParameters;

/** StockingRequestConfirmParameters - Parameters to confirm stocking request */
export type StockingRequestsStatesConfirmStockingRequestUpdatePayload =
  VinistoStockingRequestDllModelsApiStockingRequestStockingRequestConfirmParameters;

/** StockingRequestDeliveryOrderParameters - Parameters to delivery order for stocking request */
export type StockingRequestsStatesDeliveryOrderStockingRequestCreatePayload =
  VinistoStockingRequestDllModelsApiStockingRequestStockingRequestDeliveryOrderParameters;

export interface StockingRequestsStatesUploadReceiptToClosedStockingRequestUpdatePayload {
  /** @format binary */
  receiptFile?: File;
}

export interface StockingRequestsStatesUploadReceiptToClosedStockingRequestUpdateParams {
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
  /** Stocking request id */
  stockingRequestId: string;
}

export interface SuppliersDetailParams {
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
  IsCache?: boolean;
  /**
   * Contains list of possible languages
   * @default "CZECH"
   */
  language?: VinistoHelperDllEnumsLanguage;
  /** Id of the supplier to get */
  supplierId: string;
}

export interface SuppliersDeleteParams {
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
  /** Id of the supplier to delete */
  supplierId: string;
}

/** Parameters used for editing supplier. */
export type SuppliersUpdateSupplierUpdatePayload =
  VinistoSupplierDllModelsApiSupplierSupplierEditParameters;

/** Parameters used for adding user to supplier. */
export type SuppliersAddUserToSupplierUpdatePayload =
  VinistoSupplierDllModelsApiSupplierSupplierAddUserParameters;

/** Parameters used for remove user from supplier. */
export type SuppliersRemoveUserFromSupplierUpdatePayload =
  VinistoSupplierDllModelsApiSupplierSupplierRemoveUserParameters;

export interface SuppliersCertificateAddSupplierCertificateCreatePayload {
  /** @format binary */
  certificateFile?: File;
}

export interface SuppliersCertificateAddSupplierCertificateCreateParams {
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
  /** supplier id */
  supplierId: string;
}

/** Class containing parameters for user authorization */
export type SuppliersCertificateRemoveSupplierCertificateUpdatePayload =
  VinistoHelperDllBaseAuthorizationParameters;

export interface SuppliersAddressListParams {
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
  /** Supplier ID for operations with its data */
  supplierId: string;
}

export interface HeadSupplierApi2Params {
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
  /** Supplier ID for operations with its data */
  supplierId: string;
}

/** Parameters used for creating new address */
export type SuppliersAddressCreatePayload =
  VinistoSupplierDllModelsApiAddressSupplierAddressCreateParameters;

/** Parameters used for editing supplier address */
export type SuppliersAddressUpdatePayload =
  VinistoSupplierDllModelsApiAddressSupplierAddressEditParameters;

export interface SuppliersAddressDeleteParams {
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
  /** Supplier ID for operations with its data */
  supplierId: string;
}

export interface SuppliersListParams {
  /** If provided search by name in suppliers. */
  SearchName?: string;
  /** If provided search by Supplier abbreviation in flexibee. */
  SearchAbbreviationInFlexibee?: string;
  /** If provided search by ico in suppliers. */
  SearchIco?: string;
  /** If provided search by IsShipping property in suppliers. */
  SearchIsShipping?: boolean;
  /** If provided search by SupplierTag list of Ids in suppliers. */
  SearchSupplierTagIds?: string[];
  /** If true, searchName or searchIco or searchAbbreviationInFlexibee is used as StartWith instead of Contains. */
  IsSearchNameAutocomplete?: boolean;
  /** If provided, sorting will be done according to this column. if not provided, default sorting is done by Id. */
  SortingColumn?: VinistoHelperDllEnumsSupplierSortableColumns;
  /** True in case that sorting shall be done in descending order. */
  IsSortingDescending?: boolean;
  /**
   * Number of records to be retrieved. if not provided default value is 10.
   * @format int32
   */
  Limit?: number;
  /**
   * Number of records to be skipped. If not provided default value is 0.
   * @format int32
   */
  Offset?: number;
  /** :Language to get supplier properties in specified language. */
  Language?: VinistoHelperDllEnumsLanguage;
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
  IsCache?: boolean;
}

export interface HeadSupplierApi3Params {
  /** If provided search by name in suppliers. */
  SearchName?: string;
  /** If provided search by Supplier abbreviation in flexibee. */
  SearchAbbreviationInFlexibee?: string;
  /** If provided search by ico in suppliers. */
  SearchIco?: string;
  /** If provided search by IsShipping property in suppliers. */
  SearchIsShipping?: boolean;
  /** If provided search by SupplierTag list of Ids in suppliers. */
  SearchSupplierTagIds?: string[];
  /** If true, searchName or searchIco or searchAbbreviationInFlexibee is used as StartWith instead of Contains. */
  IsSearchNameAutocomplete?: boolean;
  /** If provided, sorting will be done according to this column. if not provided, default sorting is done by Id. */
  SortingColumn?: VinistoHelperDllEnumsSupplierSortableColumns;
  /** True in case that sorting shall be done in descending order. */
  IsSortingDescending?: boolean;
  /**
   * Number of records to be retrieved. if not provided default value is 10.
   * @format int32
   */
  Limit?: number;
  /**
   * Number of records to be skipped. If not provided default value is 0.
   * @format int32
   */
  Offset?: number;
  /** :Language to get supplier properties in specified language. */
  Language?: VinistoHelperDllEnumsLanguage;
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
  IsCache?: boolean;
}

export interface SuppliersGetAutocompleteNamesListParams {
  /** User login hash. */
  userLoginHash?: string;
  /** Searching string name. */
  searchingNameString?: string;
  /** Searching string ICO. */
  searchingIcoString?: string;
  IsCache?: boolean;
  /**
   * Number of returned items
   * @format int32
   * @default 5
   */
  limit?: number;
}

/** Parameters used for creating new supplier with user authorization. */
export type SuppliersCreateSupplierCreatePayload =
  VinistoSupplierDllModelsApiSupplierSupplierCreateAuthParameters;

/** Parameters used for creating new supplier and user. */
export type SuppliersCreateSupplierAndUserCreatePayload =
  VinistoSupplierDllModelsApiSupplierSupplierUserCreateParameters;

export interface SuppliersGetSupplierTurnoverListParams {
  /** @format int64 */
  TimeFrom: number;
  /** @format int64 */
  TimeTo: number;
  /** If user has admin rights, then supplier id can be null (return turnover for all suppliers) else return turnover for provided supplier. */
  SupplierId?: string;
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
}

export interface SupplierTagDetailParams {
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
  id: string;
}

export type SupplierTagUpdatePayload =
  VinistoSupplierDllModelsApiSupplierTagUpdateSupplierTagRequestContract;

export interface SupplierTagPartialUpdateParams {
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
  id: string;
}

export type SupplierTagCreatePayload =
  VinistoSupplierDllModelsApiSupplierTagCreateSupplierTagRequestContract;

export interface SupplierTagsListParams {
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
}

export interface SupplierTagsFilteredListParams {
  SearchName?: string;
  SearchUrl?: string;
  /** Contains list of possible languages */
  Language?: VinistoHelperDllEnumsLanguage;
  /** Contains list of possible columns for sorting */
  SortingColumn?: VinistoHelperDllEnumsSupplierTagSortableColumns;
  IsSortingDescending?: boolean;
  /** @format int32 */
  Limit?: number;
  /** @format int32 */
  Offset?: number;
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
}

export type SupplierTagsAssignPartialUpdatePayload =
  VinistoSupplierDllModelsApiSupplierTagModifySupplierSupplierTagsRequestContract;

export type SupplierTagsUnassignPartialUpdatePayload =
  VinistoSupplierDllModelsApiSupplierTagModifySupplierSupplierTagsRequestContract;

export namespace SupplierApi {
  /**
 * No description
 * @tags Admin
 * @name AdminStatisticsDetail
 * @summary Get aggregated warehouse statistics for a supplier.
Returns total stocked bundle count, unique bundles in warehouse,
bundles sold this/last month, and bundles in unpaid orders.
 * @request GET:/supplier-api/admin/statistics/{supplierId}
 * @secure
*/
  export namespace AdminStatisticsDetail {
    export type RequestParams = {
      /** Supplier identifier. */
      supplierId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoSupplierApiModelsWarehouseOverviewSupplierStatisticsReturn;
  }

  /**
 * No description
 * @tags Admin
 * @name AdminProductsDetail
 * @summary Get a paginated list of all bundles for a supplier with warehouse and sales data.
Each item includes warehouse IDs, bundle name, specifications, warehouse stock count,
sold this/last month, and count in unpaid orders.
 * @request GET:/supplier-api/admin/products/{supplierId}
 * @secure
*/
  export namespace AdminProductsDetail {
    export type RequestParams = {
      /** Supplier identifier. */
      supplierId: string;
    };
    export type RequestQuery = {
      /**
       * Maximum number of items to return.
       * @format int32
       * @default 10
       */
      Limit?: number;
      /**
       * Number of items to skip.
       * @format int32
       * @default 0
       */
      Offset?: number;
      /** If provided, only bundles whose name contains this string (case-insensitive) are returned. */
      SearchBundleName?: string;
      /** If provided, only bundles that contain a product with this warehouse ID are returned. */
      SearchProductWarehouseId?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoSupplierApiModelsWarehouseOverviewSupplierProductsReturn;
  }

  /**
   * No description
   * @tags Admin
   * @name AdminFeeRulesDynamicSaleCreate
   * @summary Create dynamic sale fee rule and set active / scheduled state by valid from and valid to params.
   * @request POST:/supplier-api/admin/fee-rules/dynamic-sale
   * @secure
   */
  export namespace AdminFeeRulesDynamicSaleCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = AdminFeeRulesDynamicSaleCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoFeeSystemModelsFeeRuleReturnDynamicSaleFeeRuleReturn;
  }

  /**
 * No description
 * @tags Admin
 * @name AdminFeeRulesDynamicSalePartialUpdate
 * @summary Edit dynamic sale fee rule.
If fee rule is not valid and current state is concept, then state is not changed.
If fee rule is valid and current state is not active, then fee rule is updated.
 * @request PATCH:/supplier-api/admin/fee-rules/dynamic-sale/{id}
 * @secure
*/
  export namespace AdminFeeRulesDynamicSalePartialUpdate {
    export type RequestParams = {
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = AdminFeeRulesDynamicSalePartialUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoFeeSystemModelsFeeRuleReturnDynamicSaleFeeRuleReturn;
  }

  /**
   * No description
   * @tags Admin
   * @name AdminFeeRulesDetail
   * @summary Get fee rule by id.
   * @request GET:/supplier-api/admin/fee-rules/{feeRuleId}
   * @secure
   */
  export namespace AdminFeeRulesDetail {
    export type RequestParams = {
      feeRuleId: string;
    };
    export type RequestQuery = {
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoFeeSystemModelsFeeRuleReturnFeeRuleReturn;
  }

  /**
   * No description
   * @tags Admin
   * @name AdminFeeRulesList
   * @summary Get fee rules for listing by provided parameters.
   * @request GET:/supplier-api/admin/fee-rules
   * @secure
   */
  export namespace AdminFeeRulesList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** Contains list of possible fee rule types */
      Type: VinistoHelperDllEnumsFeeRuleFeeRuleType;
      /** Identifies type of the country */
      OriginCountry: VinistoHelperDllEnumsCountryCode;
      /** Identifies type of the country */
      DestinationCountry: VinistoHelperDllEnumsCountryCode;
      /** @format int64 */
      ValidFrom?: number;
      /** @format int64 */
      ValidTo?: number;
      /** @format double */
      BundlePriceFrom?: number;
      /** @format double */
      BundlePriceTo?: number;
      State?: VinistoHelperDllEnumsFeeRuleFeeRuleState;
      BundleType?: string;
      BundleKind?: string;
      /** Only for types Logistic and DynamicSale. */
      Name?: string;
      /** Sort by provided property. */
      SortingColumn?: VinistoHelperDllEnumsFeeRuleFeeRuleSortableColumns;
      IsSortingDescending?: boolean;
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
      VinistoFeeSystemModelsFeeRuleReturnFeeRulesReturn;
  }

  /**
 * No description
 * @tags Admin
 * @name AdminFeeRulesCheckBundlesValidityList
 * @summary Check bundles validity for active fee rules by parameters.
Return true when all bundles from provided parameters are valid, otherwise false.
 * @request GET:/supplier-api/admin/fee-rules/check-bundles-validity
 * @secure
*/
  export namespace AdminFeeRulesCheckBundlesValidityList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** Only Sale or Logistic types are allowed. */
      Type: VinistoHelperDllEnumsFeeRuleFeeRuleType;
      /** Identifies type of the country */
      OriginCountry: VinistoHelperDllEnumsCountryCode;
      /** Identifies type of the country */
      DestinationCountry: VinistoHelperDllEnumsCountryCode;
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
    export type ResponseBody = VinistoHelperDllBaseBoolReturn;
  }

  /**
   * No description
   * @tags Admin
   * @name AdminFeeRulesGetInvalidBundlesList
   * @summary Return bundles without any fee rule.
   * @request GET:/supplier-api/admin/fee-rules/get-invalid-bundles
   * @secure
   */
  export namespace AdminFeeRulesGetInvalidBundlesList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** Only Sale or Logistic types are allowed. */
      Type: VinistoHelperDllEnumsFeeRuleFeeRuleType;
      /** Identifies type of the country */
      OriginCountry: VinistoHelperDllEnumsCountryCode;
      /** Identifies type of the country */
      DestinationCountry: VinistoHelperDllEnumsCountryCode;
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
    export type ResponseBody = VinistoProductDllModelsApiBundleBundlesReturn;
  }

  /**
   * No description
   * @tags Admin
   * @name AdminFeeRulesGetAppliedList
   * @summary Get applied fee rules for target bundle.
   * @request GET:/supplier-api/admin/fee-rules/{bundleId}/get-applied
   * @secure
   */
  export namespace AdminFeeRulesGetAppliedList {
    export type RequestParams = {
      /** Id of the bundle. */
      bundleId: string;
    };
    export type RequestQuery = {
      /** Destination country. Origin country is selected form supplier country code. */
      DestinationCountry?: VinistoHelperDllEnumsCountryCode;
      /**
       * Fee rule states to filter by.
       * Default: Active, EndingSoon
       */
      FeeRuleStates?: VinistoHelperDllEnumsFeeRuleFeeRuleState[];
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoFeeSystemModelsFeeRuleReturnFeeRulesReturn;
  }

  /**
   * No description
   * @tags Admin
   * @name AdminFeeRulesLogisticCreate
   * @summary Create logistic fee rule.
   * @request POST:/supplier-api/admin/fee-rules/logistic
   * @secure
   */
  export namespace AdminFeeRulesLogisticCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = AdminFeeRulesLogisticCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoFeeSystemModelsFeeRuleReturnLogisticFeeRuleReturn;
  }

  /**
   * No description
   * @tags Admin
   * @name AdminFeeRulesLogisticPartialUpdate
   * @summary Update logistic fee rule.
   * @request PATCH:/supplier-api/admin/fee-rules/logistic/{id}
   * @secure
   */
  export namespace AdminFeeRulesLogisticPartialUpdate {
    export type RequestParams = {
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = AdminFeeRulesLogisticPartialUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoFeeSystemModelsFeeRuleReturnLogisticFeeRuleReturn;
  }

  /**
   * No description
   * @tags Admin
   * @name AdminFeeRulesSaleCreate
   * @summary Create sale fee rule.
   * @request POST:/supplier-api/admin/fee-rules/sale
   * @secure
   */
  export namespace AdminFeeRulesSaleCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = AdminFeeRulesSaleCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoFeeSystemModelsFeeRuleReturnSaleFeeRuleReturn;
  }

  /**
   * No description
   * @tags Admin
   * @name AdminFeeRulesSalePartialUpdate
   * @summary Edit sale fee rule.
   * @request PATCH:/supplier-api/admin/fee-rules/sale/{id}
   * @secure
   */
  export namespace AdminFeeRulesSalePartialUpdate {
    export type RequestParams = {
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = AdminFeeRulesSalePartialUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoFeeSystemModelsFeeRuleReturnSaleFeeRuleReturn;
  }

  /**
   * No description
   * @tags Admin
   * @name AdminFeeRulesSupplierDetail
   * @summary Get fee rules by supplier id and other parameters.
   * @request GET:/supplier-api/admin/fee-rules/supplier/{id}
   * @secure
   */
  export namespace AdminFeeRulesSupplierDetail {
    export type RequestParams = {
      id: string;
    };
    export type RequestQuery = {
      /** Identifies type of the country */
      OriginCountry: VinistoHelperDllEnumsCountryCode;
      /** Identifies type of the country */
      DestinationCountry: VinistoHelperDllEnumsCountryCode;
      IsActive?: boolean;
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoFeeSystemModelsFeeRuleReturnSupplierAdminFeeRulesReturn;
  }

  /**
   * No description
   * @tags Admin
   * @name AdminFeeRulesSupplierFeeValuesList
   * @summary Get list of fee minimal values by supplier id.
   * @request GET:/supplier-api/admin/fee-rules/supplier/{id}/fee-values
   * @secure
   */
  export namespace AdminFeeRulesSupplierFeeValuesList {
    export type RequestParams = {
      id: string;
    };
    export type RequestQuery = {
      /** Identifies type of the country */
      OriginCountry: VinistoHelperDllEnumsCountryCode;
      /** Identifies type of the country */
      DestinationCountry: VinistoHelperDllEnumsCountryCode;
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoFeeSystemModelsFeeRuleReturnSupplierAdminFeeValuesReturn;
  }

  /**
   * No description
   * @tags Admin
   * @name AdminFeeRecordsGroupByOrderList
   * @summary Get fee records by supplierId and time range grouped by order.
   * @request GET:/supplier-api/admin/fee-records/group-by-order
   * @secure
   */
  export namespace AdminFeeRecordsGroupByOrderList {
    export type RequestParams = {};
    export type RequestQuery = {
      SupplierId: string;
      /** @format int64 */
      TimeFrom: number;
      /** @format int64 */
      TimeTo?: number;
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoFeeSystemModelsFeeRecordReturnFeeRecordsReturn;
  }

  /**
   * No description
   * @tags Basket
   * @name BasketSuppliersByIdsCreate
   * @summary Retrieves suppliers for basket by provided Ids. Returns only Id, url (web) and name (web name).
   * @request POST:/supplier-api/basket/suppliers/by-ids
   * @secure
   */
  export namespace BasketSuppliersByIdsCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BasketSuppliersByIdsCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoSupplierDllModelsApiSupplierBasketSuppliersReturn;
  }

  /**
   * No description
   * @tags FeeRecord
   * @name FeeRecordsDetail
   * @summary Get Fee record for provided ID
   * @request GET:/supplier-api/fee-records/{feeRecordId}
   * @secure
   */
  export namespace FeeRecordsDetail {
    export type RequestParams = {
      /** Id of the fee record to get */
      feeRecordId: string;
    };
    export type RequestQuery = {
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoSupplierDllModelsApiFeeRecordFeeRecordReturn;
  }

  /**
   * No description
   * @tags FeeRecord
   * @name FeeRecordsDelete
   * @summary Deletes fee record identified by fee record id
   * @request DELETE:/supplier-api/fee-records/{feeRecordId}
   * @secure
   */
  export namespace FeeRecordsDelete {
    export type RequestParams = {
      /** Id of the fee record to delete */
      feeRecordId: string;
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
 * @tags FeeRecords
 * @name FeeRecordsList
 * @summary Get filtered fee records.
If admin user is provided, it will return all records according to parameters.
If non admin user is provided, the result will be limited to records assigned to only those suppliers the user has access to.
 * @request GET:/supplier-api/fee-records
 * @secure
*/
  export namespace FeeRecordsList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** If provided search by supplierId */
      SupplierId?: string;
      /** If provided search by OrderId */
      OrderId?: string;
      /** If provided search by BundleId */
      BundleId?: string;
      /**
       * If provided search all records from provided Time (timestamp in seconds from 1.1.1970)
       * @format int32
       */
      TimeFrom?: number;
      /**
       * If provided search all records to provided Time (timestamp in seconds from 1.1.1970)
       * @format int32
       */
      TimeTo?: number;
      /** If provided and If true shows only paid out record, on false shows only not paid records */
      IsPaidOut?: boolean;
      /** If provided shows only provided type records */
      FeeRecordType?: VinistoHelperDllEnumsFeeRecordFeeRecordType;
      /** If provided shows only fee records with provided sell type */
      FeeRecordSellType?: VinistoHelperDllEnumsFeeRecordFeeRecordSellType;
      /** If provided, sorting will be done according to this column. if not provided, default sorting is done by Id */
      SortingColumn?: VinistoHelperDllEnumsFeeRecordSortableColumns;
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
      /** Prices currency. Is used for getting price available filter. */
      Currency?: VinistoHelperDllEnumsCurrency;
      /** If null, then return all fee records. If true, then return fee records with price type null (B2C). If false, then return fee records with price type not null (B2B). */
      IsB2cFees?: boolean;
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoSupplierDllModelsApiFeeRecordFeeRecordsReturn;
  }

  /**
   * No description
   * @tags FeeRecords
   * @name FeeRecordsCreate
   * @summary Create new fee records with provided parameters
   * @request POST:/supplier-api/fee-records
   * @secure
   */
  export namespace FeeRecordsCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = FeeRecordsCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoSupplierDllModelsApiFeeRecordFeeRecordReturn;
  }

  /**
   * No description
   * @tags FeeRecords
   * @name FeeRecordsCreateFeeRecordsFromOrderCreate
   * @summary Create new fee records from provided order
   * @request POST:/supplier-api/fee-records/CreateFeeRecordsFromOrder
   * @secure
   */
  export namespace FeeRecordsCreateFeeRecordsFromOrderCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = FeeRecordsCreateFeeRecordsFromOrderCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoSupplierDllModelsApiFeeRecordFeeRecordsReturn;
  }

  /**
   * No description
   * @tags FeeRecords
   * @name FeeRecordsRevertCreate
   * @summary Revert fee records for order (defined by external order id) from external app.
   * @request POST:/supplier-api/fee-records/revert
   * @secure
   */
  export namespace FeeRecordsRevertCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = FeeRecordsRevertCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoHelperDllBaseBoolReturn;
  }

  /**
   * No description
   * @tags MerchantPortal
   * @name MerchantPortalMerchantFeeRulesDetail
   * @summary Get merchant fee rule by id.
   * @request GET:/supplier-api/merchant-portal/merchant-fee-rules/{merchantFeeRuleId}
   * @secure
   */
  export namespace MerchantPortalMerchantFeeRulesDetail {
    export type RequestParams = {
      merchantFeeRuleId: string;
    };
    export type RequestQuery = {
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoFeeSystemModelsFeeRuleReturnFeeRuleReturn;
  }

  /**
   * No description
   * @tags MerchantPortal
   * @name MerchantPortalMerchantFeeRulesUpdate
   * @summary Get merchant fee rule by id.
   * @request PUT:/supplier-api/merchant-portal/merchant-fee-rules/{merchantFeeRuleId}
   * @secure
   */
  export namespace MerchantPortalMerchantFeeRulesUpdate {
    export type RequestParams = {
      /** Merchant fee rule id. */
      merchantFeeRuleId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = MerchantPortalMerchantFeeRulesUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoFeeSystemModelsFeeRuleReturnFeeRuleReturn;
  }

  /**
   * No description
   * @tags MerchantPortal
   * @name MerchantPortalMerchantFeeRulesDelete
   * @summary Delete merchant fee rule by id.
   * @request DELETE:/supplier-api/merchant-portal/merchant-fee-rules/{merchantFeeRuleId}
   * @secure
   */
  export namespace MerchantPortalMerchantFeeRulesDelete {
    export type RequestParams = {
      merchantFeeRuleId: string;
    };
    export type RequestQuery = {
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoHelperDllBaseBoolReturn;
  }

  /**
   * No description
   * @tags MerchantPortal
   * @name MerchantPortalMerchantFeeRulesList
   * @summary Get merchant fee rules for listing by provided parameters.
   * @request GET:/supplier-api/merchant-portal/merchant-fee-rules
   * @secure
   */
  export namespace MerchantPortalMerchantFeeRulesList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** If provided search by type specification. */
      Type?: string;
      /** If provided search by kind specification. */
      Kind?: string;
      /** If provided search by merchant name. */
      Merchant?: string;
      /** If provided, sorting will be done according to this column. if not provided, default sorting is done by Id. */
      SortingColumn?: VinistoHelperDllEnumsMerchantFeeFuleSortableColumns;
      /** True in case that sorting shall be done in descending order. */
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
    export type ResponseBody =
      VinistoSupplierDllModelsApiMerchantFeeRuleMerchantFeeRulesReturn;
  }

  /**
   * No description
   * @tags MerchantPortal
   * @name MerchantPortalMerchantFeeRulesCreate
   * @summary Create merchant fee rule.
   * @request POST:/supplier-api/merchant-portal/merchant-fee-rules
   * @secure
   */
  export namespace MerchantPortalMerchantFeeRulesCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MerchantPortalMerchantFeeRulesCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoSupplierDllModelsApiMerchantFeeRuleMerchantFeeRuleReturn;
  }

  /**
   * No description
   * @tags MerchantPortal
   * @name MerchantPortalMerchantFeeRulesMerchantUpdate
   * @summary Add merchant to fee rule.
   * @request PUT:/supplier-api/merchant-portal/merchant-fee-rules/{merchantFeeRuleId}/merchant/{merchantId}
   * @secure
   */
  export namespace MerchantPortalMerchantFeeRulesMerchantUpdate {
    export type RequestParams = {
      merchantFeeRuleId: string;
      merchantId: string;
    };
    export type RequestQuery = {};
    export type RequestBody =
      MerchantPortalMerchantFeeRulesMerchantUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoSupplierDllModelsApiMerchantFeeRuleMerchantFeeRuleReturn;
  }

  /**
   * No description
   * @tags MerchantPortal
   * @name MerchantPortalMerchantFeeRulesMerchantDelete
   * @summary Remove merchant from fee rule.
   * @request DELETE:/supplier-api/merchant-portal/merchant-fee-rules/{merchantFeeRuleId}/merchant/{merchantId}
   * @secure
   */
  export namespace MerchantPortalMerchantFeeRulesMerchantDelete {
    export type RequestParams = {
      merchantFeeRuleId: string;
      merchantId: string;
    };
    export type RequestQuery = {};
    export type RequestBody =
      MerchantPortalMerchantFeeRulesMerchantDeletePayload;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoFeeSystemModelsFeeRuleReturnLogisticFeeRuleReturn;
  }

  /**
   * No description
   * @tags StockingRequest
   * @name StockingRequestsDetail
   * @summary Get stocking request by provided stocking request id
   * @request GET:/supplier-api/stocking-requests/{stockingRequestId}
   * @secure
   */
  export namespace StockingRequestsDetail {
    export type RequestParams = {
      /** Stocking request id */
      stockingRequestId: string;
    };
    export type RequestQuery = {
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoStockingRequestDllModelsApiStockingRequestStockingRequestReturn;
  }

  /**
   * No description
   * @tags StockingRequest
   * @name StockingRequestsDelete
   * @summary Delete stocking request by id
   * @request DELETE:/supplier-api/stocking-requests/{stockingRequestId}
   * @secure
   */
  export namespace StockingRequestsDelete {
    export type RequestParams = {
      /** Stocking request id */
      stockingRequestId: string;
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
   * @tags StockingRequest
   * @name StockingRequestsUpdate
   * @summary Modify bundle request in stocking request defined by id
   * @request PUT:/supplier-api/stocking-requests/{stockingRequestId}
   * @secure
   */
  export namespace StockingRequestsUpdate {
    export type RequestParams = {
      /** Stocking request id */
      stockingRequestId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = StockingRequestsUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoStockingRequestDllModelsApiStockingRequestStockingRequestReturn;
  }

  /**
   * No description
   * @tags StockingRequest
   * @name StockingRequestsModifyBundlesStockingRequestUpdate
   * @summary Modify bundle requests in stocking request defined by id
   * @request PUT:/supplier-api/stocking-requests/{stockingRequestId}/ModifyBundlesStockingRequest
   * @secure
   */
  export namespace StockingRequestsModifyBundlesStockingRequestUpdate {
    export type RequestParams = {
      /** Stocking request id */
      stockingRequestId: string;
    };
    export type RequestQuery = {};
    export type RequestBody =
      StockingRequestsModifyBundlesStockingRequestUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoStockingRequestDllModelsApiStockingRequestStockingRequestReturn;
  }

  /**
   * No description
   * @tags StockingRequest
   * @name StockingRequestsUpdateStockingRequestWmsUpdate
   * @summary Update stocking request defined by id in WMS
   * @request PUT:/supplier-api/stocking-requests/{stockingRequestId}/UpdateStockingRequestWMS
   * @secure
   */
  export namespace StockingRequestsUpdateStockingRequestWmsUpdate {
    export type RequestParams = {
      /** Stocking request id */
      stockingRequestId: string;
    };
    export type RequestQuery = {};
    export type RequestBody =
      StockingRequestsUpdateStockingRequestWmsUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoStockingRequestDllModelsApiStockingRequestStockingRequestReturn;
  }

  /**
   * No description
   * @tags StockingRequest
   * @name StockingRequestsDownloadPdfList
   * @summary Download pdf for provided stocking request.
   * @request GET:/supplier-api/stocking-requests/{stockingRequestId}/DownloadPdf
   * @secure
   */
  export namespace StockingRequestsDownloadPdfList {
    export type RequestParams = {
      /** Id of the stocking request */
      stockingRequestId: string;
    };
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
   * @tags StockingRequest
   * @name StockingRequestsUpdateAdminNoteUpdate
   * @summary Update AdminNote of the specified StockingRequest
   * @request PUT:/supplier-api/stocking-requests/{stockingRequestId}/update-admin-note
   * @secure
   */
  export namespace StockingRequestsUpdateAdminNoteUpdate {
    export type RequestParams = {
      stockingRequestId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = StockingRequestsUpdateAdminNoteUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoStockingRequestDllModelsApiStockingRequestStockingRequestReturn;
  }

  /**
   * No description
   * @tags StockingRequests
   * @name StockingRequestsList
   * @summary Get all stocking requests by provided parameters
   * @request GET:/supplier-api/stocking-requests
   * @secure
   */
  export namespace StockingRequestsList {
    export type RequestParams = {};
    export type RequestQuery = {
      IsSent?: boolean;
      SearchSupplierName?: string;
      SearchSupplierId?: string;
      SearchRequestNumber?: string;
      /** @format int32 */
      SearchCreateDate?: number;
      /** @format int32 */
      SearchCreateDateFrom?: number;
      /** @format int32 */
      SearchCreateDateTo?: number;
      SearchDeliveryType?: VinistoHelperDllEnumsStockingRequestDeliveryType;
      /** @format int32 */
      SearchStockingDate?: number;
      /** @format int32 */
      SearchStockingDateFrom?: number;
      /** @format int32 */
      SearchStockingDateTo?: number;
      /** @format int32 */
      SearchDeliveryDate?: number;
      /** @format int32 */
      SearchDeliveryDateFrom?: number;
      /** @format int32 */
      SearchDeliveryDateTo?: number;
      SearchStockingState?: VinistoHelperDllEnumsStockingRequestStockingState[];
      Language?: VinistoHelperDllEnumsLanguage;
      /** Contains list of possible columns for sorting */
      SortingColumn?: VinistoHelperDllEnumsStockingRequestSortableColumns;
      IsSortingDescending?: boolean;
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
      VinistoStockingRequestDllModelsApiStockingRequestStockingRequestsReturn;
  }

  /**
   * No description
   * @tags StockingRequests
   * @name HeadSupplierApi
   * @summary Get all stocking requests by provided parameters
   * @request HEAD:/supplier-api/stocking-requests
   * @secure
   */
  export namespace HeadSupplierApi {
    export type RequestParams = {};
    export type RequestQuery = {
      IsSent?: boolean;
      SearchSupplierName?: string;
      SearchSupplierId?: string;
      SearchRequestNumber?: string;
      /** @format int32 */
      SearchCreateDate?: number;
      /** @format int32 */
      SearchCreateDateFrom?: number;
      /** @format int32 */
      SearchCreateDateTo?: number;
      SearchDeliveryType?: VinistoHelperDllEnumsStockingRequestDeliveryType;
      /** @format int32 */
      SearchStockingDate?: number;
      /** @format int32 */
      SearchStockingDateFrom?: number;
      /** @format int32 */
      SearchStockingDateTo?: number;
      /** @format int32 */
      SearchDeliveryDate?: number;
      /** @format int32 */
      SearchDeliveryDateFrom?: number;
      /** @format int32 */
      SearchDeliveryDateTo?: number;
      SearchStockingState?: VinistoHelperDllEnumsStockingRequestStockingState[];
      Language?: VinistoHelperDllEnumsLanguage;
      /** Contains list of possible columns for sorting */
      SortingColumn?: VinistoHelperDllEnumsStockingRequestSortableColumns;
      IsSortingDescending?: boolean;
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
      VinistoStockingRequestDllModelsApiStockingRequestStockingRequestsReturn;
  }

  /**
   * No description
   * @tags StockingRequests
   * @name StockingRequestsCreate
   * @summary Create new stocking request with provided parameters
   * @request POST:/supplier-api/stocking-requests
   * @secure
   */
  export namespace StockingRequestsCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = StockingRequestsCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoStockingRequestDllModelsApiStockingRequestStockingRequestReturn;
  }

  /**
   * No description
   * @tags StockingRequestStates
   * @name StockingRequestsStatesCancelStockingRequestUpdate
   * @summary Cancel stocking request defined by id
   * @request PUT:/supplier-api/stocking-requests/{stockingRequestId}/states/CancelStockingRequest
   * @secure
   */
  export namespace StockingRequestsStatesCancelStockingRequestUpdate {
    export type RequestParams = {
      /** Stocking request id */
      stockingRequestId: string;
    };
    export type RequestQuery = {};
    export type RequestBody =
      StockingRequestsStatesCancelStockingRequestUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoStockingRequestDllModelsApiStockingRequestStockingRequestReturn;
  }

  /**
   * No description
   * @tags StockingRequestStates
   * @name StockingRequestsStatesAddBundleNotesToStockingRequestUpdate
   * @summary Add bundle notes to stocking request defined by id
   * @request PUT:/supplier-api/stocking-requests/{stockingRequestId}/states/AddBundleNotesToStockingRequest
   * @secure
   */
  export namespace StockingRequestsStatesAddBundleNotesToStockingRequestUpdate {
    export type RequestParams = {
      /** Stocking request id */
      stockingRequestId: string;
    };
    export type RequestQuery = {};
    export type RequestBody =
      StockingRequestsStatesAddBundleNotesToStockingRequestUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoStockingRequestDllModelsApiStockingRequestStockingRequestReturn;
  }

  /**
   * No description
   * @tags StockingRequestStates
   * @name StockingRequestsStatesCloseStockingRequestUpdate
   * @summary Close stocking request defined by id
   * @request PUT:/supplier-api/stocking-requests/{stockingRequestId}/states/CloseStockingRequest
   * @secure
   */
  export namespace StockingRequestsStatesCloseStockingRequestUpdate {
    export type RequestParams = {
      /** Stocking request id */
      stockingRequestId: string;
    };
    export type RequestQuery = {
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
    };
    export type RequestBody =
      StockingRequestsStatesCloseStockingRequestUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoStockingRequestDllModelsApiStockingRequestStockingRequestReturn;
  }

  /**
   * No description
   * @tags StockingRequestStates
   * @name StockingRequestsStatesSendStockingRequestToSupplierCreate
   * @summary Send stocking request defined by id to supplier
   * @request POST:/supplier-api/stocking-requests/{stockingRequestId}/states/SendStockingRequestToSupplier
   * @secure
   */
  export namespace StockingRequestsStatesSendStockingRequestToSupplierCreate {
    export type RequestParams = {
      /** Stocking request id */
      stockingRequestId: string;
    };
    export type RequestQuery = {};
    export type RequestBody =
      StockingRequestsStatesSendStockingRequestToSupplierCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoStockingRequestDllModelsApiStockingRequestStockingRequestReturn;
  }

  /**
   * No description
   * @tags StockingRequestStates
   * @name StockingRequestsStatesSendStockingRequestToSupplierAgainCreate
   * @summary Send stocking request defined by id to supplier again
   * @request POST:/supplier-api/stocking-requests/{stockingRequestId}/states/send-stocking-request-to-supplier-again
   * @secure
   */
  export namespace StockingRequestsStatesSendStockingRequestToSupplierAgainCreate {
    export type RequestParams = {
      /** Stocking request id */
      stockingRequestId: string;
    };
    export type RequestQuery = {};
    export type RequestBody =
      StockingRequestsStatesSendStockingRequestToSupplierAgainCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoStockingRequestDllModelsApiStockingRequestStockingRequestReturn;
  }

  /**
   * No description
   * @tags StockingRequestStates
   * @name StockingRequestsStatesConfirmStockingRequestUpdate
   * @summary Confirm stocking request defined by id
   * @request PUT:/supplier-api/stocking-requests/{stockingRequestId}/states/ConfirmStockingRequest
   * @secure
   */
  export namespace StockingRequestsStatesConfirmStockingRequestUpdate {
    export type RequestParams = {
      /** Stocking request id */
      stockingRequestId: string;
    };
    export type RequestQuery = {};
    export type RequestBody =
      StockingRequestsStatesConfirmStockingRequestUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoStockingRequestDllModelsApiStockingRequestStockingRequestReturn;
  }

  /**
 * No description
 * @tags StockingRequestStates
 * @name StockingRequestsStatesDeliveryOrderStockingRequestCreate
 * @summary Delivery order for stocking request defined by id.
Delivery is defined by DeliveryId from our table Deliveries
 * @request POST:/supplier-api/stocking-requests/{stockingRequestId}/states/DeliveryOrderStockingRequest
 * @secure
*/
  export namespace StockingRequestsStatesDeliveryOrderStockingRequestCreate {
    export type RequestParams = {
      /** Stocking request id */
      stockingRequestId: string;
    };
    export type RequestQuery = {};
    export type RequestBody =
      StockingRequestsStatesDeliveryOrderStockingRequestCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoStockingRequestDllModelsApiStockingRequestStockingRequestReturn;
  }

  /**
   * No description
   * @tags StockingRequestStates
   * @name StockingRequestsStatesUploadReceiptToClosedStockingRequestUpdate
   * @summary Upload a receipt protocol to an already closed (WMS_STOCKED) stocking request.
   * @request PUT:/supplier-api/stocking-requests/{stockingRequestId}/states/UploadReceiptToClosedStockingRequest
   * @secure
   */
  export namespace StockingRequestsStatesUploadReceiptToClosedStockingRequestUpdate {
    export type RequestParams = {
      /** Stocking request id */
      stockingRequestId: string;
    };
    export type RequestQuery = {
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
    };
    export type RequestBody =
      StockingRequestsStatesUploadReceiptToClosedStockingRequestUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoStockingRequestDllModelsApiStockingRequestStockingRequestReturn;
  }

  /**
   * No description
   * @tags Supplier
   * @name SuppliersDetail
   * @summary Get supplier for provided ID
   * @request GET:/supplier-api/suppliers/{supplierId}
   * @secure
   */
  export namespace SuppliersDetail {
    export type RequestParams = {
      /** Id of the supplier to get */
      supplierId: string;
    };
    export type RequestQuery = {
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
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
      VinistoSupplierDllModelsApiSupplierSupplierReturn;
  }

  /**
   * No description
   * @tags Supplier
   * @name SuppliersDelete
   * @summary Deletes supplier identified by supplier id
   * @request DELETE:/supplier-api/suppliers/{supplierId}
   * @secure
   */
  export namespace SuppliersDelete {
    export type RequestParams = {
      /** Id of the supplier to delete */
      supplierId: string;
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
   * @tags Supplier
   * @name SuppliersUpdateSupplierUpdate
   * @summary Update supplier with provided supplier id and other parameters
   * @request PUT:/supplier-api/suppliers/{supplierId}/UpdateSupplier
   * @secure
   */
  export namespace SuppliersUpdateSupplierUpdate {
    export type RequestParams = {
      /** Id of the supplier */
      supplierId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = SuppliersUpdateSupplierUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoSupplierDllModelsApiSupplierSupplierReturn;
  }

  /**
   * No description
   * @tags Supplier
   * @name SuppliersAddUserToSupplierUpdate
   * @summary Add user to provided supplier.
   * @request PUT:/supplier-api/suppliers/{supplierId}/AddUserToSupplier
   * @secure
   */
  export namespace SuppliersAddUserToSupplierUpdate {
    export type RequestParams = {
      /** Id of the supplier */
      supplierId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = SuppliersAddUserToSupplierUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoSupplierDllModelsApiSupplierSupplierReturn;
  }

  /**
   * No description
   * @tags Supplier
   * @name SuppliersRemoveUserFromSupplierUpdate
   * @summary Remove user from provided supplier.
   * @request PUT:/supplier-api/suppliers/{supplierId}/RemoveUserFromSupplier
   * @secure
   */
  export namespace SuppliersRemoveUserFromSupplierUpdate {
    export type RequestParams = {
      /** Id of the supplier */
      supplierId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = SuppliersRemoveUserFromSupplierUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoSupplierDllModelsApiSupplierSupplierReturn;
  }

  /**
   * No description
   * @tags Supplier
   * @name SuppliersCertificateAddSupplierCertificateCreate
   * @summary Save provided certificate to predefined locations.
   * @request POST:/supplier-api/suppliers/{supplierId}/certificate/AddSupplierCertificate
   * @secure
   */
  export namespace SuppliersCertificateAddSupplierCertificateCreate {
    export type RequestParams = {
      /** supplier id */
      supplierId: string;
    };
    export type RequestQuery = {
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
    };
    export type RequestBody =
      SuppliersCertificateAddSupplierCertificateCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoSupplierDllModelsApiCertificateCertificateReturn;
  }

  /**
   * No description
   * @tags Supplier
   * @name SuppliersCertificateRemoveSupplierCertificateUpdate
   * @summary Remove user from provided supplier.
   * @request PUT:/supplier-api/suppliers/{supplierId}/certificate/{certificateId}/RemoveSupplierCertificate
   * @secure
   */
  export namespace SuppliersCertificateRemoveSupplierCertificateUpdate {
    export type RequestParams = {
      /** Id of the supplier */
      supplierId: string;
      /** Id of the supplier */
      certificateId: string;
    };
    export type RequestQuery = {};
    export type RequestBody =
      SuppliersCertificateRemoveSupplierCertificateUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoHelperDllBaseBaseReturn;
  }

  /**
   * No description
   * @tags SupplierAddresses
   * @name SuppliersAddressList
   * @summary Get Supplier Address according to provided supplier id
   * @request GET:/supplier-api/suppliers/{supplierId}/address
   * @secure
   */
  export namespace SuppliersAddressList {
    export type RequestParams = {
      /** Supplier ID for operations with its data */
      supplierId: string;
    };
    export type RequestQuery = {
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoSupplierDllModelsApiAddressSupplierAddressReturn;
  }

  /**
   * No description
   * @tags SupplierAddresses
   * @name HeadSupplierApi2
   * @summary Get Supplier Address according to provided supplier id
   * @request HEAD:/supplier-api/suppliers/{supplierId}/address
   * @originalName headSupplierApi
   * @duplicate
   * @secure
   */
  export namespace HeadSupplierApi2 {
    export type RequestParams = {
      /** Supplier ID for operations with its data */
      supplierId: string;
    };
    export type RequestQuery = {
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoSupplierDllModelsApiAddressSupplierAddressReturn;
  }

  /**
   * No description
   * @tags SupplierAddresses
   * @name SuppliersAddressCreate
   * @summary Create new address for provided supplier with supplier id with provided parameters
   * @request POST:/supplier-api/suppliers/{supplierId}/address
   * @secure
   */
  export namespace SuppliersAddressCreate {
    export type RequestParams = {
      /** Supplier ID for operations with its data */
      supplierId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = SuppliersAddressCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoSupplierDllModelsApiAddressSupplierAddressReturn;
  }

  /**
   * No description
   * @tags SupplierAddresses
   * @name SuppliersAddressUpdate
   * @summary Update address with provided supplier id and other parameters
   * @request PUT:/supplier-api/suppliers/{supplierId}/address
   * @secure
   */
  export namespace SuppliersAddressUpdate {
    export type RequestParams = {
      /** Supplier ID for operations with its data */
      supplierId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = SuppliersAddressUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoSupplierDllModelsApiAddressSupplierAddressReturn;
  }

  /**
   * No description
   * @tags SupplierAddresses
   * @name SuppliersAddressDelete
   * @summary Deletes address identified by supplier id
   * @request DELETE:/supplier-api/suppliers/{supplierId}/address
   * @secure
   */
  export namespace SuppliersAddressDelete {
    export type RequestParams = {
      /** Supplier ID for operations with its data */
      supplierId: string;
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
   * @tags Suppliers
   * @name SuppliersList
   * @summary Get Suppliers according to provided parameters
   * @request GET:/supplier-api/suppliers
   * @secure
   */
  export namespace SuppliersList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** If provided search by name in suppliers. */
      SearchName?: string;
      /** If provided search by Supplier abbreviation in flexibee. */
      SearchAbbreviationInFlexibee?: string;
      /** If provided search by ico in suppliers. */
      SearchIco?: string;
      /** If provided search by IsShipping property in suppliers. */
      SearchIsShipping?: boolean;
      /** If provided search by SupplierTag list of Ids in suppliers. */
      SearchSupplierTagIds?: string[];
      /** If true, searchName or searchIco or searchAbbreviationInFlexibee is used as StartWith instead of Contains. */
      IsSearchNameAutocomplete?: boolean;
      /** If provided, sorting will be done according to this column. if not provided, default sorting is done by Id. */
      SortingColumn?: VinistoHelperDllEnumsSupplierSortableColumns;
      /** True in case that sorting shall be done in descending order. */
      IsSortingDescending?: boolean;
      /**
       * Number of records to be retrieved. if not provided default value is 10.
       * @format int32
       */
      Limit?: number;
      /**
       * Number of records to be skipped. If not provided default value is 0.
       * @format int32
       */
      Offset?: number;
      /** :Language to get supplier properties in specified language. */
      Language?: VinistoHelperDllEnumsLanguage;
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
      IsCache?: boolean;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoSupplierDllModelsApiSupplierSuppliersReturn;
  }

  /**
   * No description
   * @tags Suppliers
   * @name HeadSupplierApi3
   * @summary Get Suppliers according to provided parameters
   * @request HEAD:/supplier-api/suppliers
   * @originalName headSupplierApi
   * @duplicate
   * @secure
   */
  export namespace HeadSupplierApi3 {
    export type RequestParams = {};
    export type RequestQuery = {
      /** If provided search by name in suppliers. */
      SearchName?: string;
      /** If provided search by Supplier abbreviation in flexibee. */
      SearchAbbreviationInFlexibee?: string;
      /** If provided search by ico in suppliers. */
      SearchIco?: string;
      /** If provided search by IsShipping property in suppliers. */
      SearchIsShipping?: boolean;
      /** If provided search by SupplierTag list of Ids in suppliers. */
      SearchSupplierTagIds?: string[];
      /** If true, searchName or searchIco or searchAbbreviationInFlexibee is used as StartWith instead of Contains. */
      IsSearchNameAutocomplete?: boolean;
      /** If provided, sorting will be done according to this column. if not provided, default sorting is done by Id. */
      SortingColumn?: VinistoHelperDllEnumsSupplierSortableColumns;
      /** True in case that sorting shall be done in descending order. */
      IsSortingDescending?: boolean;
      /**
       * Number of records to be retrieved. if not provided default value is 10.
       * @format int32
       */
      Limit?: number;
      /**
       * Number of records to be skipped. If not provided default value is 0.
       * @format int32
       */
      Offset?: number;
      /** :Language to get supplier properties in specified language. */
      Language?: VinistoHelperDllEnumsLanguage;
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
      IsCache?: boolean;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoSupplierDllModelsApiSupplierSuppliersReturn;
  }

  /**
   * No description
   * @tags Suppliers
   * @name SuppliersGetAutocompleteNamesList
   * @summary Find and get suppliers, suppliers will be searched according to the entered letters (min. 3)
   * @request GET:/supplier-api/suppliers/GetAutocompleteNames
   * @secure
   */
  export namespace SuppliersGetAutocompleteNamesList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** User login hash. */
      userLoginHash?: string;
      /** Searching string name. */
      searchingNameString?: string;
      /** Searching string ICO. */
      searchingIcoString?: string;
      IsCache?: boolean;
      /**
       * Number of returned items
       * @format int32
       * @default 5
       */
      limit?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoSupplierDllModelsApiSupplierSuppliersReturn;
  }

  /**
   * No description
   * @tags Suppliers
   * @name SuppliersCreateSupplierCreate
   * @summary Create new supplier with provided parameters
   * @request POST:/supplier-api/suppliers/CreateSupplier
   * @secure
   */
  export namespace SuppliersCreateSupplierCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SuppliersCreateSupplierCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoSupplierDllModelsApiSupplierSupplierReturn;
  }

  /**
   * No description
   * @tags Suppliers
   * @name SuppliersCreateSupplierAndUserCreate
   * @summary Create new supplier with provided parameters and with create user and join
   * @request POST:/supplier-api/suppliers/CreateSupplierAndUser
   * @secure
   */
  export namespace SuppliersCreateSupplierAndUserCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SuppliersCreateSupplierAndUserCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoSupplierDllModelsApiSupplierSupplierReturn;
  }

  /**
   * No description
   * @tags Suppliers
   * @name SuppliersGetSupplierTurnoverList
   * @summary Get supplier turnover for provided time interval.
   * @request GET:/supplier-api/suppliers/get-supplier-turnover
   * @secure
   */
  export namespace SuppliersGetSupplierTurnoverList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** @format int64 */
      TimeFrom: number;
      /** @format int64 */
      TimeTo: number;
      /** If user has admin rights, then supplier id can be null (return turnover for all suppliers) else return turnover for provided supplier. */
      SupplierId?: string;
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoHelperDllBaseDecimalReturn;
  }

  /**
   * No description
   * @tags SupplierTag
   * @name SupplierTagDetail
   * @summary Get supplier tag by id.
   * @request GET:/supplier-api/supplier-tag/{id}
   * @secure
   */
  export namespace SupplierTagDetail {
    export type RequestParams = {
      id: string;
    };
    export type RequestQuery = {
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoSupplierDllModelsApiSupplierTagGetSupplierTagResponseContract;
  }

  /**
   * No description
   * @tags SupplierTag
   * @name SupplierTagUpdate
   * @summary Edit supplier tag.
   * @request PUT:/supplier-api/supplier-tag/{id}
   * @secure
   */
  export namespace SupplierTagUpdate {
    export type RequestParams = {
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = SupplierTagUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoSupplierDllModelsApiSupplierTagUpdateSupplierTagResponseContract;
  }

  /**
   * No description
   * @tags SupplierTag
   * @name SupplierTagPartialUpdate
   * @summary Delete supplier tag by id. Record is set as IsDeleted and remains in database.
   * @request PATCH:/supplier-api/supplier-tag/{id}
   * @secure
   */
  export namespace SupplierTagPartialUpdate {
    export type RequestParams = {
      id: string;
    };
    export type RequestQuery = {
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoSupplierDllModelsApiSupplierTagDeleteSupplierTagResponseContract;
  }

  /**
   * No description
   * @tags SupplierTag
   * @name SupplierTagCreate
   * @summary Create supplier tag.
   * @request POST:/supplier-api/supplier-tag
   * @secure
   */
  export namespace SupplierTagCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SupplierTagCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoSupplierDllModelsApiSupplierTagCreateSupplierTagResponseContract;
  }

  /**
   * No description
   * @tags SupplierTags
   * @name SupplierTagsList
   * @summary Get all supplier tags.
   * @request GET:/supplier-api/supplier-tags
   * @secure
   */
  export namespace SupplierTagsList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoSupplierDllModelsApiSupplierTagGetSupplierTagsResponseContract;
  }

  /**
   * No description
   * @tags SupplierTags
   * @name SupplierTagsFilteredList
   * @summary Get supplier tags according to provided parameters.
   * @request GET:/supplier-api/supplier-tags/filtered
   * @secure
   */
  export namespace SupplierTagsFilteredList {
    export type RequestParams = {};
    export type RequestQuery = {
      SearchName?: string;
      SearchUrl?: string;
      /** Contains list of possible languages */
      Language?: VinistoHelperDllEnumsLanguage;
      /** Contains list of possible columns for sorting */
      SortingColumn?: VinistoHelperDllEnumsSupplierTagSortableColumns;
      IsSortingDescending?: boolean;
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
      VinistoSupplierDllModelsApiSupplierTagGetFilteredSupplierTagsResponseContract;
  }

  /**
   * No description
   * @tags SupplierTags
   * @name SupplierTagsAssignPartialUpdate
   * @summary Assign supplier tags to supplier.
   * @request PATCH:/supplier-api/supplier-tags/assign
   * @secure
   */
  export namespace SupplierTagsAssignPartialUpdate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SupplierTagsAssignPartialUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoSupplierDllModelsApiSupplierTagModifySupplierSupplierTagsResponseContract;
  }

  /**
   * No description
   * @tags SupplierTags
   * @name SupplierTagsUnassignPartialUpdate
   * @summary Unassign supplier tags from supplier.
   * @request PATCH:/supplier-api/supplier-tags/unassign
   * @secure
   */
  export namespace SupplierTagsUnassignPartialUpdate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SupplierTagsUnassignPartialUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoSupplierDllModelsApiSupplierTagModifySupplierSupplierTagsResponseContract;
  }
}
