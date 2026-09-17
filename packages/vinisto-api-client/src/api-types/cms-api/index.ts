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

/** Contains list of possible columns for sorting<p>Members:</p><ul><li><i>ID</i> - Sorting by ID. Default.</ li > <li><i>TITLE</i> - Sorting by TITLE.</ li > <li><i>AVAILABLE_FROM</i> - Sorting by AVAILABLE_FROM.</ li > <li><i>AVAILABLE_TO</i> - Sorting by AVAILABLE_TO.</ li > <li><i>TYPE</i> - Sorting by Type.</ li > <li><i>POSITION</i> - Sorting by Position.</ li > </ul> */
export enum VinistoHelperDllEnumsSliderCarouselSortableColumns {
  ID = "ID",
  TITLE = "TITLE",
  AVAILABLE_FROM = "AVAILABLE_FROM",
  AVAILABLE_TO = "AVAILABLE_TO",
  TYPE = "TYPE",
  POSITION = "POSITION",
}

/** Slider carousel type<p>Members:</p><ul><li><i>HP_TOP</i> - Top carousel</ li > <li><i>HP_BOTTOM</i> - Bottom carousel</ li > <li><i>PRODUCT_DETAIL</i> - Product detail carousel</ li > <li><i>HP_USP</i> - Carousel USP under HP top carousel</ li > <li><i>PRODUCT_DETAIL_USP</i> - Carousel USP detail product</ li > <li><i>PRODUCT_LIST</i> - Product list carousel</ li > </ul> */
export enum VinistoHelperDllEnumsSliderCarouselCarouselType {
  HP_TOP = "HP_TOP",
  HP_BOTTOM = "HP_BOTTOM",
  PRODUCT_DETAIL = "PRODUCT_DETAIL",
  HP_USP = "HP_USP",
  PRODUCT_DETAIL_USP = "PRODUCT_DETAIL_USP",
  PRODUCT_LIST = "PRODUCT_LIST",
}

/** <p>Members:</p><ul></ul> */
export enum VinistoHelperDllEnumsSliderCarouselButtonStyle {
  Green = "Green",
  Burgundy = "Burgundy",
  White = "White",
  Black = "Black",
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

/** Contains list of possible columns for sorting<p>Members:</p><ul></ul> */
export enum VinistoHelperDllEnumsCmsTagSortableColumns {
  ID = "ID",
  NAME = "NAME",
  DESCRIPTION = "DESCRIPTION",
  META_DESCRIPTION = "META_DESCRIPTION",
  URL = "URL",
  TIME = "TIME",
}

/** Contains list of possible article states<p>Members:</p><ul><li><i>DRAFT</i> - Draft state (Concept)</ li > <li><i>PUBLISHED</i> - Article is published</ li > </ul> */
export enum VinistoHelperDllEnumsCmsArticleState {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
}

/** Contains list of possible columns for sorting<p>Members:</p><ul><li><i>ID</i> - Sorting by CmsArticle.Id. Default.</ li > <li><i>TITLE</i> - Sorting by CmsArticle.Title.</ li > <li><i>LANGUAGE</i> - Sorting by CmsArticle.Language.</ li > <li><i>URL</i> - Sorting by CmsArticle.Url.</ li > <li><i>PUBLISH_DATE</i> - Sorting by CmsArticle.PublishDate.</ li > <li><i>STATE</i> - Sorting by CmsArticle.State.</ li > </ul> */
export enum VinistoHelperDllEnumsCmsArticleSortableColumns {
  ID = "ID",
  TITLE = "TITLE",
  LANGUAGE = "LANGUAGE",
  URL = "URL",
  PUBLISH_DATE = "PUBLISH_DATE",
  STATE = "STATE",
}

/** Contains list of possible crousel / listing type for article<p>Members:</p><ul><li><i>NONE</i> - None carousel/listing for article</ li > <li><i>CAROUSEL_SPECIFICATIONS</i> - Carousel of specifications</ li > <li><i>CAROUSEL_BUNDLES</i> - Carousel of bundles</ li > <li><i>LISTING_SPECIFICATIONS</i> - Listing of specifications</ li > <li><i>LISTING_BUNDLES</i> - Listing of bundles</ li > </ul> */
export enum VinistoHelperDllEnumsCmsArticleCarouselListingType {
  NONE = "NONE",
  CAROUSEL_SPECIFICATIONS = "CAROUSEL_SPECIFICATIONS",
  CAROUSEL_BUNDLES = "CAROUSEL_BUNDLES",
  LISTING_SPECIFICATIONS = "LISTING_SPECIFICATIONS",
  LISTING_BUNDLES = "LISTING_BUNDLES",
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

/** Represents bundle item for cms article. */
export interface VinistoCmsDllModelsApiCmsArticleBundleItem {
  /**
   * Id of the bundle
   * @minLength 1
   */
  bundleId: string;
  /**
   * Order on list of bundles
   * @format int32
   */
  order?: number;
}

/** Represents cms article api object. */
export interface VinistoCmsDllModelsApiCmsArticleCmsArticle {
  /**
   * Id of the article
   * @minLength 1
   */
  id: string;
  /** Contains list of possible languages */
  language?: VinistoHelperDllEnumsLanguage;
  /** List of cms tag ids */
  tags: string[];
  /** List of specifications. Contains object with id, allowed values, etc.. */
  specifications: VinistoCommonDllModelsApiSpecificationsBaseSpecification[];
  /**
   * Title of the article
   * @minLength 1
   */
  title: string;
  /**
   * Perex of the article
   * @minLength 1
   */
  perex: string;
  /**
   * Meta description of the article
   * @minLength 1
   */
  metaDescription: string;
  /**
   * Meta title of the article
   * @minLength 1
   */
  metaTitle: string;
  /**
   * URL of the article
   * @minLength 1
   */
  url: string;
  /**
   * Updated date of the article
   * @format int64
   */
  updatedAt?: number;
  /**
   * Title image id of the article
   * @minLength 1
   */
  titleImageId: string;
  /**
   * Body of the article
   * @minLength 1
   */
  body: string;
  /** List of bundle ids */
  bundles: VinistoCmsDllModelsApiCmsArticleBundleItem[];
  /** List of author ids */
  authors: string[];
  /**
   * Reading time in minutes of article
   * @format int32
   */
  readingTime?: number;
  /**
   * Date time to publish article
   * @format int32
   */
  publishDate?: number;
  /** Contains list of possible article states */
  state?: VinistoHelperDllEnumsCmsArticleState;
  /** Contains list of possible crousel / listing type for article */
  carouselListingType?: VinistoHelperDllEnumsCmsArticleCarouselListingType;
  /** Title of carousel / listing */
  carouselListingTitle?: string | null;
  /** List of tag detail */
  tagDetails?: VinistoCmsDllModelsApiCmsTagCmsTag[] | null;
  /** List of author detail */
  authorDetails?:
    | VinistoCmsDllModelsApiCmsArticleAuthorCmsArticleAuthor[]
    | null;
  /** List of bundle detail */
  bundleDetails?: VinistoProductDllModelsApiBundleBundle[] | null;
  /** List of specifications detail */
  specificationDetails?:
    | VinistoProductDllModelsApiSpecificationSpecificationDetail[]
    | null;
  /** Title image detail */
  titleImageDetail?: VinistoCmsDllModelsApiCmsImageCmsImage | null;
}

/** Parameters which is possible to provided to api to edit cms article */
export interface VinistoCmsDllModelsApiCmsArticleCmsArticleEditParameters {
  /** Language of the article */
  language?: VinistoHelperDllEnumsLanguage | null;
  /** Title of the article */
  title?: string | null;
  /**
   * Date time to publish article
   * @format int32
   */
  publishDate?: number | null;
  /** Perex of the article */
  perex?: string | null;
  /** Meta description of the article */
  metaDescription?: string | null;
  /** Meta title of the article */
  metaTitle?: string | null;
  /** List of author ids */
  authors?: string[] | null;
  /**
   * Reading time in minutes of article
   * @format int32
   */
  readingTime?: number | null;
  /** List of cms tag ids */
  tags?: string[] | null;
  /** URL of the article */
  url?: string | null;
  /** Title image id of the article */
  titleImageId?: string | null;
  /** Body of the article */
  body?: string | null;
  /** List of specifications. Contains object with id, allowed values, etc.. */
  specifications?: any[] | null;
  /** Type of carousel / listing */
  carouselListing?: VinistoHelperDllEnumsCmsArticleCarouselListingType | null;
  /** Title of carousel / listing */
  carouselListingTitle?: string | null;
  /** List of bundle ids */
  bundles?: VinistoCmsDllModelsApiCmsArticleBundleItem[] | null;
  /** State of the article */
  state?: VinistoHelperDllEnumsCmsArticleState | null;
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

/** Parameters which is possible to provided to api to create / edit cms article */
export interface VinistoCmsDllModelsApiCmsArticleCmsArticleManipulationParameters {
  /** Contains list of possible languages */
  language: VinistoHelperDllEnumsLanguage;
  /**
   * Title of the article
   * @minLength 1
   */
  title: string;
  /**
   * Date time to publish article
   * @format int32
   */
  publishDate?: number;
  /** Perex of the article */
  perex?: string | null;
  /** Meta description of the article */
  metaDescription?: string | null;
  /** Meta title of the article */
  metaTitle?: string | null;
  /** List of author ids */
  authors?: string[] | null;
  /**
   * Reading time in minutes of article
   * @format int32
   */
  readingTime?: number;
  /** List of cms tag ids */
  tags?: string[] | null;
  /** URL of the article */
  url?: string | null;
  /** Title image id of the article */
  titleImageId?: string | null;
  /** Body of the article */
  body?: string | null;
  /** List of specifications. Contains object with id, allowed values, etc.. */
  specifications?: any[] | null;
  /** Contains list of possible crousel / listing type for article */
  carouselListing?: VinistoHelperDllEnumsCmsArticleCarouselListingType;
  /** Title of carousel / listing */
  carouselListingTitle?: string | null;
  /** List of bundle ids */
  bundles?: VinistoCmsDllModelsApiCmsArticleBundleItem[] | null;
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

/** Represents cms article api object. */
export interface VinistoCmsDllModelsApiCmsArticleCmsArticlePreview {
  /**
   * Id of the article
   * @minLength 1
   */
  id: string;
  /**
   * Date time to publish article
   * @format int32
   */
  publishDate?: number;
  /**
   * Title of the article
   * @minLength 1
   */
  title: string;
  /**
   * Perex of the article
   * @minLength 1
   */
  perex: string;
  /**
   * Meta title of the article
   * @minLength 1
   */
  metaTitle: string;
  /**
   * URL of the article
   * @minLength 1
   */
  url: string;
  /**
   * Title image id of the article
   * @minLength 1
   */
  titleImageId: string;
  /** List of author ids */
  authors: string[];
  /**
   * Reading time in minutes of article
   * @format int32
   */
  readingTime?: number;
  /** List of author detail */
  authorDetails?:
    | VinistoCmsDllModelsApiCmsArticleAuthorCmsArticleAuthor[]
    | null;
}

/** Parameters which is possible to provided to api to get bundles count for specifications in article */
export interface VinistoCmsDllModelsApiCmsArticleCmsArticlesGetCountParameters {
  /** Article id */
  articleId?: string | null;
  /** List of specifications. Contains object with id, allowed values, etc.. */
  specifications?: any[] | null;
  /** If is provided, then return bundles count allowed to sale in provided country. Default is null. */
  countryOfSale?: VinistoHelperDllEnumsCountryCode | null;
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

/** Parameters used for manipulation cms article author */
export interface VinistoCmsDllModelsApiCmsArticleAuthorArticleAuthorManipulationParameters {
  /**
   * Name of the author
   * @minLength 1
   */
  name: string;
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

/** Represents author of a cms article. */
export interface VinistoCmsDllModelsApiCmsArticleAuthorCmsArticleAuthor {
  /**
   * Id of the author
   * @minLength 1
   */
  id: string;
  /**
   * Name of the author
   * @minLength 1
   */
  name: string;
}

/** Represents CmsImage api object. */
export interface VinistoCmsDllModelsApiCmsImageCmsImage {
  /**
   * Id
   * @minLength 1
   */
  id: string;
  /**
   * Name of the image
   * @minLength 1
   */
  name: string;
  /** Alternative text */
  alternativeText?: string | null;
  /** Description */
  description?: string | null;
  /** CmsTag ids */
  tags?: string[] | null;
  /**
   * Set of urls pointing to individual image versions of this image
   * Key - name of the image version/size
   * Value - url of the image location
   */
  urls: Record<string, string>;
}

/** Parameters used for editing cms image */
export interface VinistoCmsDllModelsApiCmsImageCmsImageEditParameters {
  /** Name of the cms image */
  name?: string | null;
  /** Alternative text of the cms image */
  alternativeText?: string | null;
  /** Description of the cms image */
  description?: string | null;
  /** Tags of the cms image */
  tags?: string[] | null;
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

/** Represents CmsTag api object. */
export interface VinistoCmsDllModelsApiCmsTagCmsTag {
  /**
   * Id of the cms tag
   * @minLength 1
   */
  id: string;
  /** Name of the cms tag - list containing language versions */
  name: VinistoCmsDllModelsApiMultiLangValue[];
  /** Description of the cms tag - list containing language versions */
  description: VinistoCmsDllModelsApiMultiLangValue[];
  /** Metadescription of the cms tag - list containing language versions */
  metaDescription: VinistoCmsDllModelsApiMultiLangValue[];
  /** Meta title of the cms tag - list containing language versions */
  metaTitle: VinistoCmsDllModelsApiMultiLangValue[];
  /** Url of the cms tag - list containing language versions */
  url: VinistoCmsDllModelsApiMultiLangValue[];
  /**
   * Cms tag creation time
   * @format int64
   */
  createdAt?: number;
  /** @format int64 */
  articleNumber?: number;
}

/** Parameters used for remove language version for existing cms tag */
export interface VinistoCmsDllModelsApiCmsTagCmsTagRemoveLanguageVersionParameters {
  /** Contains list of possible languages */
  language?: VinistoHelperDllEnumsLanguage;
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

/** Represents tag for CMS. */
export interface VinistoCmsDllModelsApiImageTagImageTag {
  /**
   * Id of the tag
   * @minLength 1
   */
  id: string;
  /**
   * Name of the tag - list containing language versions
   * @minLength 1
   */
  name: string;
}

/** Parameters used for creating new tag */
export interface VinistoCmsDllModelsApiImageTagImageTagCreateParameters {
  /**
   * Name of the tag in provided language
   * @minLength 1
   */
  name: string;
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

/** Parameters used for creating new tag */
export interface VinistoCmsDllModelsApiImageTagImageTagEditParameters {
  /**
   * Name of the tag in provided language
   * @minLength 1
   */
  name: string;
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

/** Return API object for Tag */
export interface VinistoCmsDllModelsApiImageTagImageTagReturn {
  /** Return tag */
  tag?: VinistoCmsDllModelsApiImageTagImageTag | null;
  /** Has occurred any error. */
  isError?: boolean;
  /** List of errors code that occurred during the api request. */
  error?: VinistoHelperDllBaseError[] | null;
}

/** Return API object for ImageTag with count of all object */
export interface VinistoCmsDllModelsApiImageTagImageTagsReturn {
  /** Return list Tags */
  tags?: VinistoCmsDllModelsApiImageTagImageTag[] | null;
  /** Has occurred any error. */
  isError?: boolean;
  /** List of errors code that occurred during the api request. */
  error?: VinistoHelperDllBaseError[] | null;
}

/** Class for objects which required to store value in various languages. */
export interface VinistoCmsDllModelsApiMultiLangValue {
  /** Contains list of possible languages */
  language?: VinistoHelperDllEnumsLanguage;
  /**
   * Value
   * @minLength 1
   */
  value: string;
}

/** Return API object for CmsArticleAuthor */
export interface VinistoCmsDllModelsApiReturnCmsArticleAuthorReturn {
  /** CmsArticleAuthor object */
  author?: VinistoCmsDllModelsApiCmsArticleAuthorCmsArticleAuthor | null;
  /** Has occurred any error. */
  isError?: boolean;
  /** List of errors code that occurred during the api request. */
  error?: VinistoHelperDllBaseError[] | null;
}

/** Return API object for CmsArticle */
export interface VinistoCmsDllModelsApiReturnCmsArticleReturn {
  /** CmsArticle object */
  article?: VinistoCmsDllModelsApiCmsArticleCmsArticle | null;
  /** Has occurred any error. */
  isError?: boolean;
  /** List of errors code that occurred during the api request. */
  error?: VinistoHelperDllBaseError[] | null;
}

/** Return API object for list of CmsArticleAuthor */
export interface VinistoCmsDllModelsApiReturnCmsArticlesAuthorsReturn {
  /** CmsArticleAuthor objects */
  authors?: VinistoCmsDllModelsApiCmsArticleAuthorCmsArticleAuthor[] | null;
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

/** Return API object for list of CmsArticle */
export interface VinistoCmsDllModelsApiReturnCmsArticlesPreviewReturn {
  /** CmsArticle objects */
  articlePreviews?: VinistoCmsDllModelsApiCmsArticleCmsArticlePreview[] | null;
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

/** Return API object for list of CmsArticle */
export interface VinistoCmsDllModelsApiReturnCmsArticlesReturn {
  /** CmsArticle objects */
  articles?: VinistoCmsDllModelsApiCmsArticleCmsArticle[] | null;
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

/** Return API object for CmsImage */
export interface VinistoCmsDllModelsApiReturnCmsImageReturn {
  /** CmsImge object */
  image?: VinistoCmsDllModelsApiCmsImageCmsImage | null;
  /** Has occurred any error. */
  isError?: boolean;
  /** List of errors code that occurred during the api request. */
  error?: VinistoHelperDllBaseError[] | null;
}

/** Return API object for list of CmsImage */
export interface VinistoCmsDllModelsApiReturnCmsImagesReturn {
  /** CmsImage objects */
  images?: VinistoCmsDllModelsApiCmsImageCmsImage[] | null;
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

/** Return API object for CmsTag */
export interface VinistoCmsDllModelsApiReturnCmsTagReturn {
  /** CmsTag object */
  tag?: VinistoCmsDllModelsApiCmsTagCmsTag | null;
  /** Has occurred any error. */
  isError?: boolean;
  /** List of errors code that occurred during the api request. */
  error?: VinistoHelperDllBaseError[] | null;
}

/** Return API object for list of CmsImage */
export interface VinistoCmsDllModelsApiReturnCmsTagsReturn {
  /** CmsTag objects */
  tags?: VinistoCmsDllModelsApiCmsTagCmsTag[] | null;
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

/** Represents Slider carousel api object. */
export interface VinistoCmsDllModelsApiSliderCarouselSliderCarousel {
  /**
   * Carousel id
   * @minLength 1
   */
  id: string;
  /** Carousel title */
  title: VinistoCmsDllModelsApiMultiLangValue[];
  titleColor?: string | null;
  /** Carousel subtitle */
  subtitle: VinistoCmsDllModelsApiMultiLangValue[];
  subtitleColor?: string | null;
  /** CTA text of link */
  textLink: VinistoCmsDllModelsApiMultiLangValue[];
  /**
   * Availability from
   * @format int32
   */
  availableFrom?: number;
  /**
   * Availability to
   * @format int32
   */
  availableTo?: number;
  /** Url */
  url: VinistoCmsDllModelsApiMultiLangValue[];
  /** Slider carousel type */
  type?: VinistoHelperDllEnumsSliderCarouselCarouselType;
  /**
   * Position
   * @format int32
   */
  position?: number;
  /** Represents base for application image. */
  image?:
    | VinistoImageDllModelsApiImageUrlsImage
    | VinistoImageDllModelsApiImageImage
    | VinistoImageDllModelsApiImageSvgImage
    | VinistoImageDllModelsApiImageSvgObjectImage
    | null;
  buttonStyle?: VinistoHelperDllEnumsSliderCarouselButtonStyle | null;
  availableOnPlatforms?: number[] | null;
}

/** Parameters used for creating slider carousel */
export interface VinistoCmsDllModelsApiSliderCarouselSliderCarouselCreateParameters {
  /** Slider carousel type */
  type: VinistoHelperDllEnumsSliderCarouselCarouselType;
  /**
   * Position
   * @format int32
   */
  position: number;
  availableOnPlatforms: number[] | null;
  /** Contains list of possible languages */
  language?: VinistoHelperDllEnumsLanguage;
  /** Title of the slider carousel in provided language */
  title?: string | null;
  titleColor?: string | null;
  /** Subtitle of the slider carousel in provided language */
  subtitle?: string | null;
  subtitleColor?: string | null;
  /** Text link of the slider carousel in provided language */
  textLink?: string | null;
  /** Url of the slider carousel in provided language */
  url?: string | null;
  /**
   * Available from
   * @format int64
   */
  availableFrom?: number | null;
  /**
   * Available to. If not set, then si automatically generated into biggest future
   * @format int64
   */
  availableTo?: number | null;
  buttonStyle?: VinistoHelperDllEnumsSliderCarouselButtonStyle | null;
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

/** Return API object for SliderCarousel */
export interface VinistoCmsDllModelsApiSliderCarouselSliderCarouselReturn {
  /** Slider carousel object */
  sliderCarousel?: VinistoCmsDllModelsApiSliderCarouselSliderCarousel | null;
  /** Has occurred any error. */
  isError?: boolean;
  /** List of errors code that occurred during the api request. */
  error?: VinistoHelperDllBaseError[] | null;
}

/** Parameters used for editing slider carousel */
export interface VinistoCmsDllModelsApiSliderCarouselSliderCarouselUpdateParameters {
  /** Carousel type */
  type?: VinistoHelperDllEnumsSliderCarouselCarouselType | null;
  /**
   * Position
   * @format int32
   */
  position?: number | null;
  availableOnPlatforms?: number[] | null;
  /** Contains list of possible languages */
  language?: VinistoHelperDllEnumsLanguage;
  /** Title of the slider carousel in provided language */
  title?: string | null;
  titleColor?: string | null;
  /** Subtitle of the slider carousel in provided language */
  subtitle?: string | null;
  subtitleColor?: string | null;
  /** Text link of the slider carousel in provided language */
  textLink?: string | null;
  /** Url of the slider carousel in provided language */
  url?: string | null;
  /**
   * Available from
   * @format int64
   */
  availableFrom?: number | null;
  /**
   * Available to. If not set, then si automatically generated into biggest future
   * @format int64
   */
  availableTo?: number | null;
  buttonStyle?: VinistoHelperDllEnumsSliderCarouselButtonStyle | null;
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

/** Return API object for list of SliderCarousel */
export interface VinistoCmsDllModelsApiSliderCarouselSliderCarouselsReturn {
  /** Slider carousel objects */
  sliderCarousels?: VinistoCmsDllModelsApiSliderCarouselSliderCarousel[] | null;
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

/** Represents base for application image. */
export interface VinistoImageDllModelsApiImageBaseImage {
  /** Id */
  id?: string | null;
  /** Identifies object type to which an image is assigned */
  objectType?: VinistoHelperDllEnumsImageImageObjectType;
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

export interface VinistoProductDllModelsApiCommonBundlesCountReturn {
  /** @format int64 */
  bundlesCount?: number | null;
  /** Has occurred any error. */
  isError?: boolean;
  /** List of errors code that occurred during the api request. */
  error?: VinistoHelperDllBaseError[] | null;
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
  /** Represents image in various sizes, which is assigned to an object (product, category, bundle..). */
  logo: VinistoImageDllModelsApiImageImage;
  /** Represents image in various sizes, which is assigned to an object (product, category, bundle..). */
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

/** Class containing parameters for user authorization */
export type ArticlesPublishArticleUpdatePayload =
  VinistoHelperDllBaseAuthorizationParameters;

/** Class containing parameters for user authorization */
export type ArticlesDraftArticleUpdatePayload =
  VinistoHelperDllBaseAuthorizationParameters;

export interface ArticlesGetPublishedArticleListParams {
  /** Language to get texts in subobjects. Default is CZECH */
  SubObjectsLanguage?: VinistoHelperDllEnumsLanguage;
  /** Country of sale. Default is CZ. All bundles which are loaded dynamically by specifications must be allowed to sale in country. */
  CountryOfSale?: VinistoHelperDllEnumsCountryCode;
  IsCache?: boolean;
  articleId: string;
}

export interface ArticlesDeleteParams {
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
  /** Id of the cms article */
  articleId: string;
}

/** Parameters which is possible to provided to api to edit cms article */
export type ArticlesPartialUpdatePayload =
  VinistoCmsDllModelsApiCmsArticleCmsArticleEditParameters;

/** Parameters used for manipulation cms article author */
export type ArticleAuthorsUpdatePayload =
  VinistoCmsDllModelsApiCmsArticleAuthorArticleAuthorManipulationParameters;

export interface ArticleAuthorsDeleteParams {
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
  /** Id of the author */
  authorId: string;
}

export interface ArticleAuthorsListParams {
  /** If provided search by name */
  SearchName?: string;
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

/** Parameters used for manipulation cms article author */
export type ArticleAuthorsCreatePayload =
  VinistoCmsDllModelsApiCmsArticleAuthorArticleAuthorManipulationParameters;

export interface ArticleAuthorsGetAutocompleteNamesListParams {
  /** If provided search by name */
  SearchName?: string;
  /**
   * Number of records to be retrieved. if not provided default value is 5.
   * Limited by Maximum number of records in EnvironmentConstants
   * @format int32
   */
  Limit?: number;
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
}

export interface ArticlesListParams {
  /** If provided search by title */
  SearchTitle?: string;
  /** If provided search by language */
  SearchLanguage?: VinistoHelperDllEnumsLanguage;
  /** If provided search by tag Id */
  SearchTagsID?: string;
  /** If provided search by tag Name */
  SearchTagsName?: string;
  /** If provided search by tag URL */
  SearchTagsURL?: string;
  /** If provided search by url */
  SearchUrl?: string;
  /**
   * If provided search by publish date from
   * @format int64
   */
  SearchPublishDateFrom?: number;
  /**
   * If provided search by publish date to
   * @format int64
   */
  SearchPublishDateTo?: number;
  /** If provided search by publish date to */
  SearchState?: VinistoHelperDllEnumsCmsArticleState;
  /** If provided, sorting will be done according to this column. if not provided, default sorting is done by Id */
  SortingColumn?: VinistoHelperDllEnumsCmsArticleSortableColumns;
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

export interface HeadCmsApi2Params {
  /** If provided search by title */
  SearchTitle?: string;
  /** If provided search by language */
  SearchLanguage?: VinistoHelperDllEnumsLanguage;
  /** If provided search by tag Id */
  SearchTagsID?: string;
  /** If provided search by tag Name */
  SearchTagsName?: string;
  /** If provided search by tag URL */
  SearchTagsURL?: string;
  /** If provided search by url */
  SearchUrl?: string;
  /**
   * If provided search by publish date from
   * @format int64
   */
  SearchPublishDateFrom?: number;
  /**
   * If provided search by publish date to
   * @format int64
   */
  SearchPublishDateTo?: number;
  /** If provided search by publish date to */
  SearchState?: VinistoHelperDllEnumsCmsArticleState;
  /** If provided, sorting will be done according to this column. if not provided, default sorting is done by Id */
  SortingColumn?: VinistoHelperDllEnumsCmsArticleSortableColumns;
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

/** Parameters which is possible to provided to api to create / edit cms article */
export type ArticlesCreatePayload =
  VinistoCmsDllModelsApiCmsArticleCmsArticleManipulationParameters;

export interface ArticlesArticlesPublishedListParams {
  /** If provided, sorting will be done according to this column. if not provided, default sorting is done by Id */
  SortingColumn?: VinistoHelperDllEnumsCmsArticleSortableColumns;
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

export interface ArticlesPreviewListParams {
  /** If provided search by title */
  SearchTitle?: string;
  /** If provided search by language */
  SearchLanguage?: VinistoHelperDllEnumsLanguage;
  /** If provided search by tag Id */
  SearchTagsID?: string;
  /** If provided search by tag Name */
  SearchTagsName?: string;
  /** If provided search by tag URL */
  SearchTagsURL?: string;
  /** If provided search by url */
  SearchUrl?: string;
  /**
   * If provided search by publish date from
   * @format int64
   */
  SearchPublishDateFrom?: number;
  /**
   * If provided search by publish date to
   * @format int64
   */
  SearchPublishDateTo?: number;
  /** If provided search by publish date to */
  SearchState?: VinistoHelperDllEnumsCmsArticleState;
  /** If provided, sorting will be done according to this column. if not provided, default sorting is done by Id */
  SortingColumn?: VinistoHelperDllEnumsCmsArticleSortableColumns;
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

/** Parameters which is possible to provided to api to get bundles count for specifications in article */
export type ArticlesGetArticleBundlesCountCreatePayload =
  VinistoCmsDllModelsApiCmsArticleCmsArticlesGetCountParameters;

export interface ArticlesGetArticleByUrlListParams {
  /** Specify requested price levels to be loaded for all requested platforms. */
  priceLevels?: VinistoHelperDllEnumsPriceLevel[];
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
  /** @default true */
  isCache?: boolean;
  /** Url of the cms article */
  articleUrl: string;
}

export interface ArticlesByBundlesTagsListParams {
  /** Filter by bundle ids, at least one bundle must be in filter. */
  BundleIds: string[];
  /** Filter by tag ids, optional. */
  TagIds?: string[];
  IsCache?: boolean;
}

/** Parameters used for editing cms image */
export type ImagesUpdatePayload =
  VinistoCmsDllModelsApiCmsImageCmsImageEditParameters;

export interface ImagesDeleteParams {
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
  /** Id of the cms image */
  imageId: string;
}

export interface ImagesListParams {
  /** If provided search by name */
  SearchName?: string;
  /** If provided search by tags */
  SearchTagIds?: string[];
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
  /** Flag for loading response object from cache */
  IsCache?: boolean;
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
}

export interface ImagesCreatePayload {
  /** @format binary */
  imageFile?: File;
}

export interface ImagesCreateParams {
  /** Name of the cms image */
  Name?: string;
  /** If true set background is added to the picture */
  AddBackground: boolean;
  /** If true background is removed by rapidApi */
  RemoveBackground: boolean;
  /** Alternative text of the cms image */
  AlternativeText?: string;
  /** Description of the cms image */
  Description?: string;
  /** Tags of the cms image */
  Tags?: string[];
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
}

/** Parameters used for creating new tag */
export type ImageTagsUpdatePayload =
  VinistoCmsDllModelsApiImageTagImageTagEditParameters;

export interface ImageTagsDeleteParams {
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
  /** Id of the tag */
  tagId: string;
}

export interface ImageTagsListParams {
  /** If provided search by name */
  SearchName?: string;
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

/** Parameters used for creating new tag */
export type ImageTagsCreatePayload =
  VinistoCmsDllModelsApiImageTagImageTagCreateParameters;

export interface ImageTagsGetAutocompleteNamesListParams {
  /** If provided search by name */
  SearchName?: string;
  /**
   * Number of records to be retrieved. if not provided default value is 10.
   * Limited by Maximum number of records in EnvironmentConstants
   * @format int32
   */
  Limit?: number;
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
}

export interface SliderCarouselDeleteParams {
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
  /** Id of the carousel */
  carouselId: string;
}

/** Parameters used for editing slider carousel */
export type SliderCarouselUpdatePayload =
  VinistoCmsDllModelsApiSliderCarouselSliderCarouselUpdateParameters;

/** Parameters used for creating slider carousel */
export type SliderCarouselsCreatePayload =
  VinistoCmsDllModelsApiSliderCarouselSliderCarouselCreateParameters;

export interface SliderCarouselsListParams {
  /** If provided search by title */
  SearchTitle?: string;
  /**
   * If provided search by availableFrom
   * @format int32
   */
  SearchAvailableFrom?: number;
  /**
   * If provided search by availableTo
   * @format int32
   */
  SearchAvailableTo?: number;
  /** If provided search by type */
  SearchType?: VinistoHelperDllEnumsSliderCarouselCarouselType;
  /**
   * Language of the requested category
   * Language version - if provided, all slider carousels will be only in selected language.
   * Sorting and searching will be according to the specified language
   * Otherwise all language version will be provided and sorting and searching will be according to the default language (CZECH).
   */
  Language?: VinistoHelperDllEnumsLanguage;
  /** If provided, sorting will be done according to this column. if not provided, default sorting is done by Id */
  SortingColumn?: VinistoHelperDllEnumsSliderCarouselSortableColumns;
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
  /** Flag for loading response object from cache */
  IsCache?: boolean;
  /** @format int32 */
  PlatformId?: number;
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
}

export interface HeadCmsApi3Params {
  /** If provided search by title */
  SearchTitle?: string;
  /**
   * If provided search by availableFrom
   * @format int32
   */
  SearchAvailableFrom?: number;
  /**
   * If provided search by availableTo
   * @format int32
   */
  SearchAvailableTo?: number;
  /** If provided search by type */
  SearchType?: VinistoHelperDllEnumsSliderCarouselCarouselType;
  /**
   * Language of the requested category
   * Language version - if provided, all slider carousels will be only in selected language.
   * Sorting and searching will be according to the specified language
   * Otherwise all language version will be provided and sorting and searching will be according to the default language (CZECH).
   */
  Language?: VinistoHelperDllEnumsLanguage;
  /** If provided, sorting will be done according to this column. if not provided, default sorting is done by Id */
  SortingColumn?: VinistoHelperDllEnumsSliderCarouselSortableColumns;
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
  /** Flag for loading response object from cache */
  IsCache?: boolean;
  /** @format int32 */
  PlatformId?: number;
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
}

export interface SliderCarouselsGetSliderCarouselForTypeListParams {
  /** Select by type */
  CarouselType?: VinistoHelperDllEnumsSliderCarouselCarouselType;
  IsCache?: boolean;
}

export interface TagsDetailParams {
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
  /** Id of the cms tag */
  tagId: string;
}

export interface HeadCmsApi4Params {
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
  /** Id of the cms tag */
  tagId: string;
}

export interface TagsDeleteParams {
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
  /** Id of the cms tag */
  tagId: string;
}

export interface TagsAddLanguageVersionUpdateParams {
  /** Language of the cms tag */
  Language: VinistoHelperDllEnumsLanguage;
  /** Name of the cms tag */
  Name: string;
  /** Description of the cms tag */
  Description: string;
  /** Metadescription of the cms tag */
  MetaDescription?: string;
  /** Meta title of the cms tag */
  MetaTitle?: string;
  /** Url of the cms tag (if not set, will be created from Name) */
  Url?: string;
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
  /** Id of the cms tag */
  tagId: string;
}

/** Parameters used for remove language version for existing cms tag */
export type TagsRemoveLanguageValuesUpdatePayload =
  VinistoCmsDllModelsApiCmsTagCmsTagRemoveLanguageVersionParameters;

export interface TagsListParams {
  /** If provided search by name in cms tags */
  SearchName?: string;
  /** If provided search by url in cms tags */
  SearchUrl?: string;
  /** Search tags with published articles */
  SearchPublishedArticles?: boolean;
  /**
   * Language of the requested cms tags
   * Language version - if provided, all cms tags will be only in selected language.
   * Sorting and searching will be according to the specified language
   * Otherwise all language version will be provided and sorting and searching will be according to the default language (CZECH).
   */
  Language?: VinistoHelperDllEnumsLanguage;
  /** If provided, sorting will be done according to this column. if not provided, default sorting is done by Id */
  SortingColumn?: VinistoHelperDllEnumsCmsTagSortableColumns;
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
}

export interface TagsCreateParams {
  /** Language of the cms tag */
  Language: VinistoHelperDllEnumsLanguage;
  /** Name of the cms tag */
  Name: string;
  /** Description of the cms tag */
  Description: string;
  /** Metadescription of the cms tag */
  MetaDescription?: string;
  /** Meta title of the cms tag */
  MetaTitle?: string;
  /** Url of the cms tag (if not set, will be created from Name) */
  Url?: string;
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
}

export interface TagsGetAllTagsListParams {
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
}

export interface TagsGetTagsByLanguageListParams {
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
  /** Contains list of possible languages */
  language?: VinistoHelperDllEnumsLanguage;
}

export namespace CmsApi {
  /**
   * No description
   * @tags Article
   * @name ArticlesPublishArticleUpdate
   * @summary Publish provided article. Set state to PUBLISHED.
   * @request PUT:/cms-api/articles/{articleId}/PublishArticle
   * @secure
   */
  export namespace ArticlesPublishArticleUpdate {
    export type RequestParams = {
      /** Id of the article */
      articleId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = ArticlesPublishArticleUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoHelperDllBaseBaseReturn;
  }

  /**
   * No description
   * @tags Article
   * @name ArticlesDraftArticleUpdate
   * @summary Draft provided article. Set state to DRAFT.
   * @request PUT:/cms-api/articles/{articleId}/DraftArticle
   * @secure
   */
  export namespace ArticlesDraftArticleUpdate {
    export type RequestParams = {
      /** Id of the article */
      articleId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = ArticlesDraftArticleUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoHelperDllBaseBaseReturn;
  }

  /**
   * No description
   * @tags Article
   * @name ArticlesGetPublishedArticleList
   * @summary Get article by id. Article must be published (state = PUBLISHED, publishedDate menší nebo rovno now).
   * @request GET:/cms-api/articles/{articleId}/GetPublishedArticle
   * @secure
   */
  export namespace ArticlesGetPublishedArticleList {
    export type RequestParams = {
      articleId: string;
    };
    export type RequestQuery = {
      /** Language to get texts in subobjects. Default is CZECH */
      SubObjectsLanguage?: VinistoHelperDllEnumsLanguage;
      /** Country of sale. Default is CZ. All bundles which are loaded dynamically by specifications must be allowed to sale in country. */
      CountryOfSale?: VinistoHelperDllEnumsCountryCode;
      IsCache?: boolean;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoCmsDllModelsApiReturnCmsArticleReturn;
  }

  /**
   * No description
   * @tags Article
   * @name ArticlesDelete
   * @summary Delete cms article by id
   * @request DELETE:/cms-api/articles/{articleId}
   * @secure
   */
  export namespace ArticlesDelete {
    export type RequestParams = {
      /** Id of the cms article */
      articleId: string;
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
   * @tags Article
   * @name ArticlesPartialUpdate
   * @summary Update cms article by provided parameters
   * @request PATCH:/cms-api/articles/{articleId}
   * @secure
   */
  export namespace ArticlesPartialUpdate {
    export type RequestParams = {
      articleId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = ArticlesPartialUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoCmsDllModelsApiReturnCmsArticleReturn;
  }

  /**
   * No description
   * @tags Article
   * @name ArticlesDetail
   * @summary Get cms article by id
   * @request GET:/cms-api/articles/{articleId}
   * @secure
   */
  export namespace ArticlesDetail {
    export type RequestParams = {
      /** Id of the cms article */
      articleId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoCmsDllModelsApiReturnCmsArticleReturn;
  }

  /**
   * No description
   * @tags Article
   * @name HeadCmsApi
   * @summary Get cms article by id
   * @request HEAD:/cms-api/articles/{articleId}
   * @secure
   */
  export namespace HeadCmsApi {
    export type RequestParams = {
      /** Id of the cms article */
      articleId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoCmsDllModelsApiReturnCmsArticleReturn;
  }

  /**
   * No description
   * @tags ArticleAuthor
   * @name ArticleAuthorsUpdate
   * @summary Update article author
   * @request PUT:/cms-api/article-authors/{authorId}
   * @secure
   */
  export namespace ArticleAuthorsUpdate {
    export type RequestParams = {
      /** Id of the author */
      authorId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = ArticleAuthorsUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoCmsDllModelsApiReturnCmsArticleAuthorReturn;
  }

  /**
   * No description
   * @tags ArticleAuthor
   * @name ArticleAuthorsDelete
   * @summary Delete author by id
   * @request DELETE:/cms-api/article-authors/{authorId}
   * @secure
   */
  export namespace ArticleAuthorsDelete {
    export type RequestParams = {
      /** Id of the author */
      authorId: string;
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
   * @tags ArticleAuthors
   * @name ArticleAuthorsList
   * @summary Get authors according to provided parameters
   * @request GET:/cms-api/article-authors
   * @secure
   */
  export namespace ArticleAuthorsList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** If provided search by name */
      SearchName?: string;
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
      VinistoCmsDllModelsApiReturnCmsArticlesAuthorsReturn;
  }

  /**
   * No description
   * @tags ArticleAuthors
   * @name ArticleAuthorsCreate
   * @summary Create new author with provided parameters
   * @request POST:/cms-api/article-authors
   * @secure
   */
  export namespace ArticleAuthorsCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ArticleAuthorsCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoCmsDllModelsApiReturnCmsArticleAuthorReturn;
  }

  /**
   * No description
   * @tags ArticleAuthors
   * @name ArticleAuthorsGetAutocompleteNamesList
   * @summary Get authors for autocomplete according to provided parameters
   * @request GET:/cms-api/article-authors/GetAutocompleteNames
   * @secure
   */
  export namespace ArticleAuthorsGetAutocompleteNamesList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** If provided search by name */
      SearchName?: string;
      /**
       * Number of records to be retrieved. if not provided default value is 5.
       * Limited by Maximum number of records in EnvironmentConstants
       * @format int32
       */
      Limit?: number;
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoCmsDllModelsApiReturnCmsArticlesAuthorsReturn;
  }

  /**
   * No description
   * @tags Articles
   * @name ArticlesList
   * @summary Get cms articles by parameters
   * @request GET:/cms-api/articles
   * @secure
   */
  export namespace ArticlesList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** If provided search by title */
      SearchTitle?: string;
      /** If provided search by language */
      SearchLanguage?: VinistoHelperDllEnumsLanguage;
      /** If provided search by tag Id */
      SearchTagsID?: string;
      /** If provided search by tag Name */
      SearchTagsName?: string;
      /** If provided search by tag URL */
      SearchTagsURL?: string;
      /** If provided search by url */
      SearchUrl?: string;
      /**
       * If provided search by publish date from
       * @format int64
       */
      SearchPublishDateFrom?: number;
      /**
       * If provided search by publish date to
       * @format int64
       */
      SearchPublishDateTo?: number;
      /** If provided search by publish date to */
      SearchState?: VinistoHelperDllEnumsCmsArticleState;
      /** If provided, sorting will be done according to this column. if not provided, default sorting is done by Id */
      SortingColumn?: VinistoHelperDllEnumsCmsArticleSortableColumns;
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
    export type ResponseBody = VinistoCmsDllModelsApiReturnCmsArticlesReturn;
  }

  /**
   * No description
   * @tags Articles
   * @name HeadCmsApi2
   * @summary Get cms articles by parameters
   * @request HEAD:/cms-api/articles
   * @originalName headCmsApi
   * @duplicate
   * @secure
   */
  export namespace HeadCmsApi2 {
    export type RequestParams = {};
    export type RequestQuery = {
      /** If provided search by title */
      SearchTitle?: string;
      /** If provided search by language */
      SearchLanguage?: VinistoHelperDllEnumsLanguage;
      /** If provided search by tag Id */
      SearchTagsID?: string;
      /** If provided search by tag Name */
      SearchTagsName?: string;
      /** If provided search by tag URL */
      SearchTagsURL?: string;
      /** If provided search by url */
      SearchUrl?: string;
      /**
       * If provided search by publish date from
       * @format int64
       */
      SearchPublishDateFrom?: number;
      /**
       * If provided search by publish date to
       * @format int64
       */
      SearchPublishDateTo?: number;
      /** If provided search by publish date to */
      SearchState?: VinistoHelperDllEnumsCmsArticleState;
      /** If provided, sorting will be done according to this column. if not provided, default sorting is done by Id */
      SortingColumn?: VinistoHelperDllEnumsCmsArticleSortableColumns;
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
    export type ResponseBody = VinistoCmsDllModelsApiReturnCmsArticlesReturn;
  }

  /**
   * No description
   * @tags Articles
   * @name ArticlesCreate
   * @summary Create new cms article for provided parameters
   * @request POST:/cms-api/articles
   * @secure
   */
  export namespace ArticlesCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ArticlesCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoCmsDllModelsApiReturnCmsArticleReturn;
  }

  /**
   * No description
   * @tags Articles
   * @name ArticlesArticlesPublishedList
   * @summary Get cms published articles by parameters without any additional data
   * @request GET:/cms-api/articles/articles-published
   * @secure
   */
  export namespace ArticlesArticlesPublishedList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** If provided, sorting will be done according to this column. if not provided, default sorting is done by Id */
      SortingColumn?: VinistoHelperDllEnumsCmsArticleSortableColumns;
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
      VinistoCmsDllModelsApiReturnCmsArticlesPreviewReturn;
  }

  /**
   * No description
   * @tags Articles
   * @name ArticlesPreviewList
   * @summary Get cms articles preview by parameters
   * @request GET:/cms-api/articles/preview
   * @secure
   */
  export namespace ArticlesPreviewList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** If provided search by title */
      SearchTitle?: string;
      /** If provided search by language */
      SearchLanguage?: VinistoHelperDllEnumsLanguage;
      /** If provided search by tag Id */
      SearchTagsID?: string;
      /** If provided search by tag Name */
      SearchTagsName?: string;
      /** If provided search by tag URL */
      SearchTagsURL?: string;
      /** If provided search by url */
      SearchUrl?: string;
      /**
       * If provided search by publish date from
       * @format int64
       */
      SearchPublishDateFrom?: number;
      /**
       * If provided search by publish date to
       * @format int64
       */
      SearchPublishDateTo?: number;
      /** If provided search by publish date to */
      SearchState?: VinistoHelperDllEnumsCmsArticleState;
      /** If provided, sorting will be done according to this column. if not provided, default sorting is done by Id */
      SortingColumn?: VinistoHelperDllEnumsCmsArticleSortableColumns;
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
      VinistoCmsDllModelsApiReturnCmsArticlesPreviewReturn;
  }

  /**
   * No description
   * @tags Articles
   * @name ArticlesGetArticleBundlesCountCreate
   * @summary Get bundles count for article specifications
   * @request POST:/cms-api/articles/GetArticleBundlesCount
   * @secure
   */
  export namespace ArticlesGetArticleBundlesCountCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ArticlesGetArticleBundlesCountCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoProductDllModelsApiCommonBundlesCountReturn;
  }

  /**
   * No description
   * @tags Articles
   * @name ArticlesGetArticleByUrlList
   * @summary Get cms article by url
   * @request GET:/cms-api/articles/{articleUrl}/get-article-by-url
   * @secure
   */
  export namespace ArticlesGetArticleByUrlList {
    export type RequestParams = {
      /** Url of the cms article */
      articleUrl: string;
    };
    export type RequestQuery = {
      /** Specify requested price levels to be loaded for all requested platforms. */
      priceLevels?: VinistoHelperDllEnumsPriceLevel[];
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
      /** @default true */
      isCache?: boolean;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoCmsDllModelsApiReturnCmsArticleReturn;
  }

  /**
   * No description
   * @tags Articles
   * @name ArticlesByBundlesTagsList
   * @summary Get cms articles by bundle ids and tag ids (optional).
   * @request GET:/cms-api/articles/by-bundles-tags
   * @secure
   */
  export namespace ArticlesByBundlesTagsList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** Filter by bundle ids, at least one bundle must be in filter. */
      BundleIds: string[];
      /** Filter by tag ids, optional. */
      TagIds?: string[];
      IsCache?: boolean;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoCmsDllModelsApiReturnCmsArticlesReturn;
  }

  /**
   * No description
   * @tags Image
   * @name ImagesDetail
   * @summary Get cms image by id
   * @request GET:/cms-api/images/{imageId}
   * @secure
   */
  export namespace ImagesDetail {
    export type RequestParams = {
      /** Id of the cms image */
      imageId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoCmsDllModelsApiReturnCmsImageReturn;
  }

  /**
   * No description
   * @tags Image
   * @name ImagesUpdate
   * @summary Update cms image properties without image data
   * @request PUT:/cms-api/images/{imageId}
   * @secure
   */
  export namespace ImagesUpdate {
    export type RequestParams = {
      /** Id of the cms image */
      imageId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = ImagesUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoCmsDllModelsApiReturnCmsImageReturn;
  }

  /**
   * No description
   * @tags Image
   * @name ImagesDelete
   * @summary Delete cms image by id
   * @request DELETE:/cms-api/images/{imageId}
   * @secure
   */
  export namespace ImagesDelete {
    export type RequestParams = {
      /** Id of the cms image */
      imageId: string;
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
   * @tags Images
   * @name ImagesList
   * @summary Get cms images according to provided parameters
   * @request GET:/cms-api/images
   * @secure
   */
  export namespace ImagesList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** If provided search by name */
      SearchName?: string;
      /** If provided search by tags */
      SearchTagIds?: string[];
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
      /** Flag for loading response object from cache */
      IsCache?: boolean;
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoCmsDllModelsApiReturnCmsImagesReturn;
  }

  /**
   * No description
   * @tags Images
   * @name ImagesCreate
   * @summary Create cms image
   * @request POST:/cms-api/images
   * @secure
   */
  export namespace ImagesCreate {
    export type RequestParams = {};
    export type RequestQuery = {
      /** Name of the cms image */
      Name?: string;
      /** If true set background is added to the picture */
      AddBackground: boolean;
      /** If true background is removed by rapidApi */
      RemoveBackground: boolean;
      /** Alternative text of the cms image */
      AlternativeText?: string;
      /** Description of the cms image */
      Description?: string;
      /** Tags of the cms image */
      Tags?: string[];
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
    };
    export type RequestBody = ImagesCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoCmsDllModelsApiReturnCmsImageReturn;
  }

  /**
   * No description
   * @tags ImageTag
   * @name ImageTagsUpdate
   * @summary Update tag
   * @request PUT:/cms-api/image-tags/{tagId}
   * @secure
   */
  export namespace ImageTagsUpdate {
    export type RequestParams = {
      /** Id of the tag */
      tagId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = ImageTagsUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoCmsDllModelsApiImageTagImageTagReturn;
  }

  /**
   * No description
   * @tags ImageTag
   * @name ImageTagsDelete
   * @summary Deletes tag identified by tag id
   * @request DELETE:/cms-api/image-tags/{tagId}
   * @secure
   */
  export namespace ImageTagsDelete {
    export type RequestParams = {
      /** Id of the tag */
      tagId: string;
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
   * @tags ImageTags
   * @name ImageTagsList
   * @summary Get Tags according to provided parameters
   * @request GET:/cms-api/image-tags
   * @secure
   */
  export namespace ImageTagsList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** If provided search by name */
      SearchName?: string;
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
    export type ResponseBody = VinistoCmsDllModelsApiImageTagImageTagsReturn;
  }

  /**
   * No description
   * @tags ImageTags
   * @name ImageTagsCreate
   * @summary Create new tag with provided parameters
   * @request POST:/cms-api/image-tags
   * @secure
   */
  export namespace ImageTagsCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ImageTagsCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoCmsDllModelsApiImageTagImageTagReturn;
  }

  /**
   * No description
   * @tags ImageTags
   * @name ImageTagsGetAutocompleteNamesList
   * @summary Get Tags according to provided parameters
   * @request GET:/cms-api/image-tags/GetAutocompleteNames
   * @secure
   */
  export namespace ImageTagsGetAutocompleteNamesList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** If provided search by name */
      SearchName?: string;
      /**
       * Number of records to be retrieved. if not provided default value is 10.
       * Limited by Maximum number of records in EnvironmentConstants
       * @format int32
       */
      Limit?: number;
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoCmsDllModelsApiImageTagImageTagsReturn;
  }

  /**
   * No description
   * @tags Rss
   * @name GetCmsApi
   * @summary Get cms articles RSS Feed.
   * @request GET:/cms-api/rss
   * @secure
   */
  export namespace GetCmsApi {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags SliderCarousel
   * @name SliderCarouselDelete
   * @summary Delete provided slider carousel
   * @request DELETE:/cms-api/slider-carousel/{carouselId}
   * @secure
   */
  export namespace SliderCarouselDelete {
    export type RequestParams = {
      /** Id of the carousel */
      carouselId: string;
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
   * @tags SliderCarousel
   * @name SliderCarouselUpdate
   * @summary Update provided slider carousel
   * @request PUT:/cms-api/slider-carousel/{carouselId}
   * @secure
   */
  export namespace SliderCarouselUpdate {
    export type RequestParams = {
      /** Id of the carousel */
      carouselId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = SliderCarouselUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoCmsDllModelsApiSliderCarouselSliderCarouselReturn;
  }

  /**
   * No description
   * @tags SliderCarousels
   * @name SliderCarouselsCreate
   * @summary Create new slider carousel from provided parameters
   * @request POST:/cms-api/slider-carousels
   * @secure
   */
  export namespace SliderCarouselsCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SliderCarouselsCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoCmsDllModelsApiSliderCarouselSliderCarouselReturn;
  }

  /**
   * No description
   * @tags SliderCarousels
   * @name SliderCarouselsList
   * @summary Get Slider carousels according to provided parameters
   * @request GET:/cms-api/slider-carousels
   * @secure
   */
  export namespace SliderCarouselsList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** If provided search by title */
      SearchTitle?: string;
      /**
       * If provided search by availableFrom
       * @format int32
       */
      SearchAvailableFrom?: number;
      /**
       * If provided search by availableTo
       * @format int32
       */
      SearchAvailableTo?: number;
      /** If provided search by type */
      SearchType?: VinistoHelperDllEnumsSliderCarouselCarouselType;
      /**
       * Language of the requested category
       * Language version - if provided, all slider carousels will be only in selected language.
       * Sorting and searching will be according to the specified language
       * Otherwise all language version will be provided and sorting and searching will be according to the default language (CZECH).
       */
      Language?: VinistoHelperDllEnumsLanguage;
      /** If provided, sorting will be done according to this column. if not provided, default sorting is done by Id */
      SortingColumn?: VinistoHelperDllEnumsSliderCarouselSortableColumns;
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
      /** Flag for loading response object from cache */
      IsCache?: boolean;
      /** @format int32 */
      PlatformId?: number;
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoCmsDllModelsApiSliderCarouselSliderCarouselsReturn;
  }

  /**
   * No description
   * @tags SliderCarousels
   * @name HeadCmsApi3
   * @summary Get Slider carousels according to provided parameters
   * @request HEAD:/cms-api/slider-carousels
   * @originalName headCmsApi
   * @duplicate
   * @secure
   */
  export namespace HeadCmsApi3 {
    export type RequestParams = {};
    export type RequestQuery = {
      /** If provided search by title */
      SearchTitle?: string;
      /**
       * If provided search by availableFrom
       * @format int32
       */
      SearchAvailableFrom?: number;
      /**
       * If provided search by availableTo
       * @format int32
       */
      SearchAvailableTo?: number;
      /** If provided search by type */
      SearchType?: VinistoHelperDllEnumsSliderCarouselCarouselType;
      /**
       * Language of the requested category
       * Language version - if provided, all slider carousels will be only in selected language.
       * Sorting and searching will be according to the specified language
       * Otherwise all language version will be provided and sorting and searching will be according to the default language (CZECH).
       */
      Language?: VinistoHelperDllEnumsLanguage;
      /** If provided, sorting will be done according to this column. if not provided, default sorting is done by Id */
      SortingColumn?: VinistoHelperDllEnumsSliderCarouselSortableColumns;
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
      /** Flag for loading response object from cache */
      IsCache?: boolean;
      /** @format int32 */
      PlatformId?: number;
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoCmsDllModelsApiSliderCarouselSliderCarouselsReturn;
  }

  /**
   * No description
   * @tags SliderCarousels
   * @name SliderCarouselsGetSliderCarouselForTypeList
   * @summary Get Slider carousel according to provided carousel type
   * @request GET:/cms-api/slider-carousels/GetSliderCarouselForType
   * @secure
   */
  export namespace SliderCarouselsGetSliderCarouselForTypeList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** Select by type */
      CarouselType?: VinistoHelperDllEnumsSliderCarouselCarouselType;
      IsCache?: boolean;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoCmsDllModelsApiSliderCarouselSliderCarouselsReturn;
  }

  /**
   * No description
   * @tags Tag
   * @name TagsDetail
   * @summary Get cms tag by id
   * @request GET:/cms-api/tags/{tagId}
   * @secure
   */
  export namespace TagsDetail {
    export type RequestParams = {
      /** Id of the cms tag */
      tagId: string;
    };
    export type RequestQuery = {
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoCmsDllModelsApiReturnCmsTagReturn;
  }

  /**
   * No description
   * @tags Tag
   * @name HeadCmsApi4
   * @summary Get cms tag by id
   * @request HEAD:/cms-api/tags/{tagId}
   * @originalName headCmsApi
   * @duplicate
   * @secure
   */
  export namespace HeadCmsApi4 {
    export type RequestParams = {
      /** Id of the cms tag */
      tagId: string;
    };
    export type RequestQuery = {
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoCmsDllModelsApiReturnCmsTagReturn;
  }

  /**
   * No description
   * @tags Tag
   * @name TagsDelete
   * @summary Delete cms tag by id
   * @request DELETE:/cms-api/tags/{tagId}
   * @secure
   */
  export namespace TagsDelete {
    export type RequestParams = {
      /** Id of the cms tag */
      tagId: string;
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
   * @tags Tag
   * @name TagsAddLanguageVersionUpdate
   * @summary Add or update language version to existing cms tag
   * @request PUT:/cms-api/tags/{tagId}/AddLanguageVersion
   * @secure
   */
  export namespace TagsAddLanguageVersionUpdate {
    export type RequestParams = {
      /** Id of the cms tag */
      tagId: string;
    };
    export type RequestQuery = {
      /** Language of the cms tag */
      Language: VinistoHelperDllEnumsLanguage;
      /** Name of the cms tag */
      Name: string;
      /** Description of the cms tag */
      Description: string;
      /** Metadescription of the cms tag */
      MetaDescription?: string;
      /** Meta title of the cms tag */
      MetaTitle?: string;
      /** Url of the cms tag (if not set, will be created from Name) */
      Url?: string;
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoCmsDllModelsApiReturnCmsTagReturn;
  }

  /**
   * No description
   * @tags Tag
   * @name TagsRemoveLanguageValuesUpdate
   * @summary Remove values for language from cms tag
   * @request PUT:/cms-api/tags/{tagId}/RemoveLanguageValues
   * @secure
   */
  export namespace TagsRemoveLanguageValuesUpdate {
    export type RequestParams = {
      /** Id of the tag */
      tagId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = TagsRemoveLanguageValuesUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoHelperDllBaseBaseReturn;
  }

  /**
   * No description
   * @tags Tags
   * @name TagsList
   * @summary Get cms tags according to provided parameters
   * @request GET:/cms-api/tags
   * @secure
   */
  export namespace TagsList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** If provided search by name in cms tags */
      SearchName?: string;
      /** If provided search by url in cms tags */
      SearchUrl?: string;
      /** Search tags with published articles */
      SearchPublishedArticles?: boolean;
      /**
       * Language of the requested cms tags
       * Language version - if provided, all cms tags will be only in selected language.
       * Sorting and searching will be according to the specified language
       * Otherwise all language version will be provided and sorting and searching will be according to the default language (CZECH).
       */
      Language?: VinistoHelperDllEnumsLanguage;
      /** If provided, sorting will be done according to this column. if not provided, default sorting is done by Id */
      SortingColumn?: VinistoHelperDllEnumsCmsTagSortableColumns;
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
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoCmsDllModelsApiReturnCmsTagsReturn;
  }

  /**
   * No description
   * @tags Tags
   * @name TagsCreate
   * @summary Create new cms tag
   * @request POST:/cms-api/tags
   * @secure
   */
  export namespace TagsCreate {
    export type RequestParams = {};
    export type RequestQuery = {
      /** Language of the cms tag */
      Language: VinistoHelperDllEnumsLanguage;
      /** Name of the cms tag */
      Name: string;
      /** Description of the cms tag */
      Description: string;
      /** Metadescription of the cms tag */
      MetaDescription?: string;
      /** Meta title of the cms tag */
      MetaTitle?: string;
      /** Url of the cms tag (if not set, will be created from Name) */
      Url?: string;
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoCmsDllModelsApiReturnCmsTagReturn;
  }

  /**
   * No description
   * @tags Tags
   * @name TagsGetAllTagsList
   * @summary Get all cms tags without parameters
   * @request GET:/cms-api/tags/GetAllTags
   * @secure
   */
  export namespace TagsGetAllTagsList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoCmsDllModelsApiReturnCmsTagsReturn;
  }

  /**
   * No description
   * @tags Tags
   * @name TagsGetTagsByLanguageList
   * @summary Get all cms tags according in provided language
   * @request GET:/cms-api/tags/GetTagsByLanguage
   * @secure
   */
  export namespace TagsGetTagsByLanguageList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
      /** Contains list of possible languages */
      language?: VinistoHelperDllEnumsLanguage;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoCmsDllModelsApiReturnCmsTagsReturn;
  }
}
