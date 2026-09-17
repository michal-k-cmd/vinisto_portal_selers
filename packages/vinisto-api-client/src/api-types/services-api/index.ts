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

/** Supported RabbitMQ message types for testing.<p>Members:</p><ul></ul> */
export enum VinistoServicesApiControllersRabbitMqPacketType {
  OrderCreate = "OrderCreate",
  StockingRequest = "StockingRequest",
  OrderCancel = "OrderCancel",
  OrderInvoice = "OrderInvoice",
  FeeRecord = "FeeRecord",
  B2B = "B2b",
  BundleFlag = "BundleFlag",
  DiscountCoupon = "DiscountCoupon",
  ModelEvent = "ModelEvent",
  ApplicationLog = "ApplicationLog",
}

/** <p>Members:</p><ul></ul> */
export enum VinistoRabbitmqCoreModelsQueueName {
  B2B = "B2b",
  B2BDeadLetter = "B2bDeadLetter",
  BundleFlag = "BundleFlag",
  BundleFlagDeadLetter = "BundleFlagDeadLetter",
  Order = "Order",
  OrderCreateDeadLetter = "OrderCreateDeadLetter",
  Subscription = "Subscription",
  ApplicationLog = "ApplicationLog",
  ApplicationLogDeadLetter = "ApplicationLogDeadLetter",
  ModelEvent = "ModelEvent",
  ModelEventDeadLetter = "ModelEventDeadLetter",
  OrderInvoice = "OrderInvoice",
  OrderInvoiceDeadLetter = "OrderInvoiceDeadLetter",
  FeeRecord = "FeeRecord",
  FeeRecordDeadLetter = "FeeRecordDeadLetter",
  DiscountCoupon = "DiscountCoupon",
  DiscountCouponDeadLetter = "DiscountCouponDeadLetter",
  Email = "Email",
  OrderCancel = "OrderCancel",
  OrderCancelDeadLetter = "OrderCancelDeadLetter",
  StockingRequest = "StockingRequest",
  StockingRequestDeadLetter = "StockingRequestDeadLetter",
  Price = "Price",
  PriceDeadLetter = "PriceDeadLetter",
  EmailDeadLetter = "EmailDeadLetter",
  Basket = "Basket",
  BasketDeadLetter = "BasketDeadLetter",
  Sms = "Sms",
  SmsDeadLetter = "SmsDeadLetter",
}

/** <p>Members:</p><ul></ul> */
export enum VinistoRabbitmqCoreModelsOrderInvoiceType {
  Order = "Order",
  Subscription = "Subscription",
}

/** <p>Members:</p><ul></ul> */
export enum VinistoHelperDllEnumsRecoverableMessageRecoverableMessageType {
  B2B = "B2b",
}

/** Pickup point company<p>Members:</p><ul><li><i>ZASILKOVNA</i> - Zasilkovna</ li > <li><i>PPL</i> - PPL</ li > <li><i>DPD</i> - DPD</ li > </ul> */
export enum VinistoHelperDllEnumsOrderPickupPointType {
  ZASILKOVNA = "ZASILKOVNA",
  PPL = "PPL",
  DPD = "DPD",
}

/** <p>Members:</p><ul></ul> */
export enum VinistoHelperDllEnumsOrderOrderType {
  Standard = "Standard",
  Accelerated = "Accelerated",
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

/** <p>Members:</p><ul></ul> */
export enum VinistoHelperDllEnumsOrderAcceleratedPurchaseType {
  Addon = "Addon",
  Bundle = "Bundle",
}

/** Contains event types with mongo models<p>Members:</p><ul><li><i>ORDER_STATE_CHANGE_EVENT</i> - Event to change order state</ li > <li><i>SNAPSHOT_UPDATE_EVENT</i> - Event to update snapshot</ li > <li><i>DELETE_ITEM_EVENT</i> - Event to delete relations to item</ li > <li><i>REMOVE_SPECIFICATION_ALLOWED_VALUE</i> - Event to remove allowed value from bundles when delete allowed value at specification</ li > <li><i>UPDATE_BUNDLES_TAG_COUNTRY</i> - Event to add tag country to bundles.</ li > <li><i>ORDER_EXPORT_EVENT</i> - Event to automatic order export to external app.</ li > <li><i>SEND_ECOMAIL</i> - Send data via ecomail API</ li > <li><i>SUBSCRIPTION</i> - Subscription</ li > </ul> */
export enum VinistoHelperDllEnumsModelEventModelEventType {
  ORDER_STATE_CHANGE_EVENT = "ORDER_STATE_CHANGE_EVENT",
  SNAPSHOT_UPDATE_EVENT = "SNAPSHOT_UPDATE_EVENT",
  DELETE_ITEM_EVENT = "DELETE_ITEM_EVENT",
  REMOVE_SPECIFICATION_ALLOWED_VALUE = "REMOVE_SPECIFICATION_ALLOWED_VALUE",
  UPDATE_BUNDLES_TAG_COUNTRY = "UPDATE_BUNDLES_TAG_COUNTRY",
  ORDER_EXPORT_EVENT = "ORDER_EXPORT_EVENT",
  SEND_ECOMAIL = "SEND_ECOMAIL",
  SUBSCRIPTION = "SUBSCRIPTION",
}

/** Contains list of possible languages<p>Members:</p><ul><li><i>CZECH</i> - Czech language</ li > <li><i>SLOVAK</i> - Slovak language</ li > <li><i>ENGLISH</i> - English</ li > <li><i>GERMAN</i> - German</ li > </ul> */
export enum VinistoHelperDllEnumsLanguage {
  CZECH = "CZECH",
  SLOVAK = "SLOVAK",
  ENGLISH = "ENGLISH",
  GERMAN = "GERMAN",
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

/** Represents gopay session state<p>Members:</p><ul><li><i>CREATED</i> - Payment is created</ li > <li><i>PAYMENT_METHOD_CHOSEN</i> - Payment method confirmed</ li > <li><i>PAID</i> - Payment has already been paid</ li > <li><i>AUTHORIZED</i> - Payment was pre-authorized</ li > <li><i>CANCELED</i> - Payment declined</ li > <li><i>TIMEOUTED</i> - The payment has expired</ li > <li><i>REFUNDED</i> - Payment was refunded</ li > <li><i>PARTIALLY_REFUNDED</i> - Payment was partially refunded</ li > </ul> */
export enum VinistoHelperDllEnumsGoPayGoPaySessionState {
  CREATED = "CREATED",
  PAYMENT_METHOD_CHOSEN = "PAYMENT_METHOD_CHOSEN",
  PAID = "PAID",
  AUTHORIZED = "AUTHORIZED",
  CANCELED = "CANCELED",
  TIMEOUTED = "TIMEOUTED",
  REFUNDED = "REFUNDED",
  PARTIALLY_REFUNDED = "PARTIALLY_REFUNDED",
}

/** Represents gopay refund payment state<p>Members:</p><ul><li><i>ACCEPTED</i> - Refund is accepted</ li > <li><i>FINISHED</i> - Refund is finished</ li > <li><i>FAILED</i> - Refund failed</ li > </ul> */
export enum VinistoHelperDllEnumsGoPayGoPayRefundState {
  ACCEPTED = "ACCEPTED",
  FINISHED = "FINISHED",
  FAILED = "FAILED",
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

/** Contains list of possible EcoMail registration types.<p>Members:</p><ul><li><i>ORDER</i> - Registration from order.</ li > <li><i>NEWSLETTER</i> - Newsletter subscription.</ li > <li><i>VINISTO_CLUB</i> - Vinisto club registration.</ li > <li><i>VINISTO_LANDING</i> - Newsletter subscription from landing page.</ li > </ul> */
export enum VinistoHelperDllEnumsEcoMailRegistrationType {
  ORDER = "ORDER",
  NEWSLETTER = "NEWSLETTER",
  VINISTO_CLUB = "VINISTO_CLUB",
  VINISTO_LANDING = "VINISTO_LANDING",
}

/** Currency<p>Members:</p><ul><li><i>CZK</i> - Czech crown</ li > <li><i>EUR</i> - Euro</ li > <li><i>USD</i> - US Dollar</ li > </ul> */
export enum VinistoHelperDllEnumsCurrency {
  CZK = "CZK",
  EUR = "EUR",
  USD = "USD",
}

/** <p>Members:</p><ul></ul> */
export enum VinistoHelperDllEnumsCronsCronType {
  None = "None",
  DeleteBundles = "DeleteBundles",
  DeleteCategories = "DeleteCategories",
  DeleteCmsArticles = "DeleteCmsArticles",
  ImportBundles = "ImportBundles",
  ImportCategories = "ImportCategories",
  ImportCmsArticles = "ImportCmsArticles",
  CheckBundleWithoutFeeRule = "CheckBundleWithoutFeeRule",
  CheckFeeRuleExpirationIn3Days = "CheckFeeRuleExpirationIn3Days",
  CheckFeeRuleExpirationIn7Days = "CheckFeeRuleExpirationIn7Days",
  CheckFeeRuleValidity = "CheckFeeRuleValidity",
  Migration = "Migration",
  CheckDeliveries = "CheckDeliveries",
  CheckPaymentsStatus = "CheckPaymentsStatus",
  CreateBillingEmails = "CreateBillingEmails",
  CreateBillingForFeeds = "CreateBillingForFeeds",
  CreateBillingInvoice = "CreateBillingInvoice",
  CreateInvoice = "CreateInvoice",
  CreateVatInvoice = "CreateVatInvoice",
  FixPairPaidOrders = "FixPairPaidOrders",
  FixPaidOrdersFeeRecords = "FixPaidOrdersFeeRecords",
  PairPaidOrders = "PairPaidOrders",
  ResetOurOrderNumber = "ResetOurOrderNumber",
  SentDailyNotificationNonPaidOrders = "SentDailyNotificationNonPaidOrders",
  SentCouponExpirationSoonNotification = "SentCouponExpirationSoonNotification",
  SentFirstNotificationNonPaidOrders = "SentFirstNotificationNonPaidOrders",
  SentRequestForEvaluationOfDeliveredOrders = "SentRequestForEvaluationOfDeliveredOrders",
  CheckDiscountCouponsCategories = "CheckDiscountCouponsCategories",
  DeleteOldBaskets = "DeleteOldBaskets",
  DiscountCouponTrigger = "DiscountCouponTrigger",
  FixWarehouseVicom = "FixWarehouseVicom",
  ImportExchangeRate = "ImportExchangeRate",
  InitOrRemoveB2BPrices = "InitOrRemoveB2bPrices",
  ModifyBundles = "ModifyBundles",
  OroReport = "OroReport",
  ResetStockingRequestNumber = "ResetStockingRequestNumber",
  SetDiscountVolume = "SetDiscountVolume",
  WarehouseUpdateBundleSnapshot = "WarehouseUpdateBundleSnapshot",
  DelOldHash = "DelOldHash",
  DelTestCategories = "DelTestCategories",
  DelTestUser = "DelTestUser",
  FillWmsWithProducts = "FillWmsWithProducts",
  SendOrdersToWms = "SendOrdersToWms",
  GenerateHeurekaFeeds = "GenerateHeurekaFeeds",
  GenerateSitemaps = "GenerateSitemaps",
  RbPairPaidOrders = "RbPairPaidOrders",
  RenewSubscriptions = "RenewSubscriptions",
  InactiveSubscriptions = "InactiveSubscriptions",
}

/** Identifies type of the country<p>Members:</p><ul><li><i>CZ</i> - Czech Republic</ li > <li><i>SK</i> - Slovakia</ li > <li><i>DE</i> - Germany</ li > <li><i>UK</i> - United Kingdom</ li > <li><i>PL</i> - Poland</ li > </ul> */
export enum VinistoHelperDllEnumsCountryCode {
  CZ = "CZ",
  SK = "SK",
  DE = "DE",
  UK = "UK",
  PL = "PL",
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

/** Type of trigger<p>Members:</p><ul><li><i>NEW_USER_REGISTRATION</i> - Fire trigger after new user registration</ li > <li><i>NEXT_ORDER</i> - Fire trigger after create order</ li > <li><i>MANUAL</i> - Coupon created manually from admin. This type not fire any further action.</ li > </ul> */
export enum VinistoHelperDllEnumsAutomaticCouponTriggerType {
  NEW_USER_REGISTRATION = "NEW_USER_REGISTRATION",
  NEXT_ORDER = "NEXT_ORDER",
  MANUAL = "MANUAL",
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

export interface MicrosoftAspNetCoreMvcProblemDetails {
  type?: string | null;
  title?: string | null;
  /** @format int32 */
  status?: number | null;
  detail?: string | null;
  instance?: string | null;
  [key: string]: any;
}

export interface VinistoCronDllHelpersEnvironmentVariablesB2BPricesEnvironmentVariables {
  supplierId: string | null;
  producerSpecificationValue: string | null;
  typeSpecificationValue: string | null;
  kindSpecificationValue: string | null;
  countrySpecificationValue: string | null;
  initializeBundles: boolean;
  /** @format double */
  percentageDiscount: number;
}

export interface VinistoCronDllHelpersEnvironmentVariablesCreateBillingForFeedsEnvironmentVariables {
  /** Contains list of possible languages */
  billingLanguage: VinistoHelperDllEnumsLanguage;
  /** @format int64 */
  timeFrom?: number | null;
  /** @format int64 */
  timeTo?: number | null;
}

export interface VinistoCronDllHelpersEnvironmentVariablesCreateBillingInvoiceEnvironmentVariables {
  /** Contains list of possible languages */
  billingLanguage: VinistoHelperDllEnumsLanguage;
  /**
   * Optional lookback period in months for 'on the way' items. If null, defaults to 12 months.
   * @format int32
   */
  onTheWayLookbackMonths?: number | null;
}

export interface VinistoCronDllHelpersEnvironmentVariablesFioBankEnvironmentVariables {
  fioAuthToken: string | null;
}

export interface VinistoCronDllHelpersEnvironmentVariablesFixWarehouseVicomEnvironmentVariables {
  vicomSftpHost: string | null;
  /** @format int32 */
  vicomSftpPort: number;
  vicomSftpUsername: string | null;
  vicomSftpPassword: string | null;
  vicomCsvFileName: string | null;
  vicomCsvFilePath: string | null;
}

export interface VinistoCronDllHelpersEnvironmentVariablesGenerateHeurekaFeedsEnvironmentVariables {
  /** Currency */
  currency: VinistoHelperDllEnumsCurrency;
  /** Identifies type of the country */
  countryOfSale: VinistoHelperDllEnumsCountryCode;
  directoryPath: string | null;
  imageDomainUrl: string | null;
  baseDomainUrlLink: string | null;
}

export interface VinistoCronDllHelpersEnvironmentVariablesImportBundlesEnvironmentVariables {
  /** Contains list of possible languages */
  language: VinistoHelperDllEnumsLanguage;
}

export interface VinistoCronDllHelpersEnvironmentVariablesImportCategoriesEnvironmentVariables {
  /** Contains list of possible languages */
  language: VinistoHelperDllEnumsLanguage;
}

export interface VinistoCronDllHelpersEnvironmentVariablesImportCmsArticlesEnvironmentVariables {
  /** Contains list of possible languages */
  language: VinistoHelperDllEnumsLanguage;
}

export interface VinistoCronDllHelpersEnvironmentVariablesRaiffeisenBankEnvironmentVariables {
  rbAccountNumber?: string | null;
  rbClientId?: string | null;
  rbRequestId?: string | null;
  rbPath?: string | null;
  rbCertPath?: string | null;
  rbCertPassword?: string | null;
}

export interface VinistoCronDllHelpersEnvironmentVariablesRenewSubscriptionsEnvironmentVariables {
  addonsBaseApiUrl?: string | null;
  subscriptionMasterApiKey?: string | null;
  subscriptionReadApiKey?: string | null;
  subscriptionBaseUrl?: string | null;
}

/** Request used with CronType.CheckBundleWithoutFeeRule */
export type VinistoCronDllModelsApiCronCheckBundleWithoutFeeRuleRequest =
  VinistoCronDllModelsApiCronCronRequestBase & object;

/** Request used with CronType.CheckDeliveries */
export type VinistoCronDllModelsApiCronCheckDeliveriesRequest =
  VinistoCronDllModelsApiCronCronRequestBase & object;

/** Request used with CronType.CheckDiscountCouponsCategories */
export type VinistoCronDllModelsApiCronCheckDiscountCouponsCategoriesRequest =
  VinistoCronDllModelsApiCronCronRequestBase & object;

/** Request used with CronType.CheckFeeRuleExpirationIn3Days */
export type VinistoCronDllModelsApiCronCheckFeeRuleExpirationIn3DaysRequest =
  VinistoCronDllModelsApiCronCronRequestBase & object;

/** Request used with CronType.CheckFeeRuleExpirationIn7Days */
export type VinistoCronDllModelsApiCronCheckFeeRuleExpirationIn7DaysRequest =
  VinistoCronDllModelsApiCronCronRequestBase & object;

/** Request used with CronType.CheckFeeRuleValidity */
export type VinistoCronDllModelsApiCronCheckFeeRuleValidityRequest =
  VinistoCronDllModelsApiCronCronRequestBase & object;

/** Request used with CronType.CheckPaymentsStatus */
export type VinistoCronDllModelsApiCronCheckPaymentsStatusRequest =
  VinistoCronDllModelsApiCronCronRequestBase & object;

/** Request used with CronType.CreateBillingEmails */
export type VinistoCronDllModelsApiCronCreateBillingEmailsRequest =
  VinistoCronDllModelsApiCronCronRequestBase & object;

/** Request used with CronType.CreateBillingForFeeds */
export type VinistoCronDllModelsApiCronCreateBillingForFeedsRequest =
  VinistoCronDllModelsApiCronCronRequestBase & {
    /** Nullable variables. If null, default values are used. */
    createBillingForFeedsEnvironmentVariables?: VinistoCronDllHelpersEnvironmentVariablesCreateBillingForFeedsEnvironmentVariables | null;
  };

/** Request used with CronType.CreateBillingInvoice */
export type VinistoCronDllModelsApiCronCreateBillingInvoiceRequest =
  VinistoCronDllModelsApiCronCronRequestBase & {
    /** Nullable variables. If null, default values are used. */
    createBillingInvoiceEnvironmentVariables?: VinistoCronDllHelpersEnvironmentVariablesCreateBillingInvoiceEnvironmentVariables | null;
  };

/** Request used with CronType.CreateInvoice */
export type VinistoCronDllModelsApiCronCreateInvoiceRequest =
  VinistoCronDllModelsApiCronCronRequestBase & object;

/** Request used with CronType.CreateVatInvoice */
export type VinistoCronDllModelsApiCronCreateVatInvoiceRequest =
  VinistoCronDllModelsApiCronCronRequestBase & object;

export interface VinistoCronDllModelsApiCronCronRequestBase {
  cronType: VinistoHelperDllEnumsCronsCronType;
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

/** Request used with CronType.DelOldHash */
export type VinistoCronDllModelsApiCronDelOldHashRequest =
  VinistoCronDllModelsApiCronCronRequestBase & object;

/** Request used with CronType.DelTestCategories */
export type VinistoCronDllModelsApiCronDelTestCategoriesRequest =
  VinistoCronDllModelsApiCronCronRequestBase & object;

/** Request used with CronType.DelTestUser */
export type VinistoCronDllModelsApiCronDelTestUserRequest =
  VinistoCronDllModelsApiCronCronRequestBase & object;

/** Request used with CronType.DeleteBundles */
export type VinistoCronDllModelsApiCronDeleteBundlesRequest =
  VinistoCronDllModelsApiCronCronRequestBase & object;

/** Request used with CronType.DeleteCategories */
export type VinistoCronDllModelsApiCronDeleteCategoriesRequest =
  VinistoCronDllModelsApiCronCronRequestBase & object;

/** Request used with CronType.DeleteCmsArticles */
export type VinistoCronDllModelsApiCronDeleteCmsArticlesRequest =
  VinistoCronDllModelsApiCronCronRequestBase & object;

/** Request used with CronType.DeleteOldBaskets */
export type VinistoCronDllModelsApiCronDeleteOldBasketsRequest =
  VinistoCronDllModelsApiCronCronRequestBase & object;

/** Request used with CronType.DiscountCouponTrigger */
export type VinistoCronDllModelsApiCronDiscountCouponTriggerRequest =
  VinistoCronDllModelsApiCronCronRequestBase & object;

/** Request used with CronType.FillWmsWithProducts */
export type VinistoCronDllModelsApiCronFillWmsWithProductsRequest =
  VinistoCronDllModelsApiCronCronRequestBase & object;

/** Request used with CronType.FixPaidOrdersFeeRecords */
export type VinistoCronDllModelsApiCronFixPaidOrdersFeeRecordsRequest =
  VinistoCronDllModelsApiCronCronRequestBase & object;

/** Request used with CronType.FixPairPaidOrders */
export type VinistoCronDllModelsApiCronFixPairPaidOrdersRequest =
  VinistoCronDllModelsApiCronCronRequestBase & {
    /** Nullable variables. If null, default values are used. */
    fioBankEnvironmentVariables?: VinistoCronDllHelpersEnvironmentVariablesFioBankEnvironmentVariables | null;
    /** Nullable variables. If null, default values are used. */
    raiffeisenBankEnvironmentVariables?: VinistoCronDllHelpersEnvironmentVariablesRaiffeisenBankEnvironmentVariables | null;
  };

/** Request used with CronType.FixWarehouseVicom */
export type VinistoCronDllModelsApiCronFixWarehouseVicomRequest =
  VinistoCronDllModelsApiCronCronRequestBase & {
    /** Nullable variables. If null, default values are used. */
    fixWarehouseVicomEnvironmentVariables?: VinistoCronDllHelpersEnvironmentVariablesFixWarehouseVicomEnvironmentVariables | null;
  };

/** Request used with CronType.GenerateHeurekaFeeds */
export type VinistoCronDllModelsApiCronGenerateHeurekaFeedsRequest =
  VinistoCronDllModelsApiCronCronRequestBase & {
    /** Nullable variables. If null, default values are used. */
    generateHeurekaFeedsEnvironmentVariables?: VinistoCronDllHelpersEnvironmentVariablesGenerateHeurekaFeedsEnvironmentVariables | null;
  };

/** Request used with CronType.GenerateSitemaps */
export type VinistoCronDllModelsApiCronGenerateSitemapsRequest =
  VinistoCronDllModelsApiCronCronRequestBase & {
    /** Nullable variables. If null, default values are used. */
    sitemapEnvironmentVariables?: VinistoSitemapDllHelpersSitemapEnvironmentVariables | null;
  };

/** Request used with CronType.ImportBundles */
export type VinistoCronDllModelsApiCronImportBundlesRequest =
  VinistoCronDllModelsApiCronCronRequestBase & {
    /** Nullable variables. If null, default values are used. */
    importBundlesEnvironmentVariables?: VinistoCronDllHelpersEnvironmentVariablesImportBundlesEnvironmentVariables | null;
  };

/** Request used with CronType.ImportCategories */
export type VinistoCronDllModelsApiCronImportCategoriesRequest =
  VinistoCronDllModelsApiCronCronRequestBase & {
    /** Nullable variables. If null, default values are used. */
    importCategoriesEnvironmentVariables?: VinistoCronDllHelpersEnvironmentVariablesImportCategoriesEnvironmentVariables | null;
  };

/** Request used with CronType.ImportCmsArticles */
export type VinistoCronDllModelsApiCronImportCmsArticlesRequest =
  VinistoCronDllModelsApiCronCronRequestBase & {
    /** Nullable variables. If null, default values are used. */
    importCmsArticlesEnvironmentVariables?: VinistoCronDllHelpersEnvironmentVariablesImportCmsArticlesEnvironmentVariables | null;
  };

/** Request used with CronType.ImportExchangeRate */
export type VinistoCronDllModelsApiCronImportExchangeRateRequest =
  VinistoCronDllModelsApiCronCronRequestBase & object;

/** Request used with CronType.InitOrRemoveB2bPrices */
export type VinistoCronDllModelsApiCronInitOrRemoveB2BPricesRequest =
  VinistoCronDllModelsApiCronCronRequestBase & {
    /** Nullable variables. If null, default values are used. */
    b2bPricesEnvironmentVariables?: VinistoCronDllHelpersEnvironmentVariablesB2BPricesEnvironmentVariables | null;
  };

/** Request used with CronType.Migration */
export type VinistoCronDllModelsApiCronMigrationRequest =
  VinistoCronDllModelsApiCronCronRequestBase & object;

/** Request used with CronType.ModifyBundles */
export type VinistoCronDllModelsApiCronModifyBundlesRequest =
  VinistoCronDllModelsApiCronCronRequestBase & object;

/** Request used with CronType.OroReport */
export type VinistoCronDllModelsApiCronOroReportRequest =
  VinistoCronDllModelsApiCronCronRequestBase & object;

/** Request used with CronType.PairPaidOrders */
export type VinistoCronDllModelsApiCronPairPaidOrdersRequest =
  VinistoCronDllModelsApiCronCronRequestBase & {
    /** Nullable variables. If null, default values are used. */
    fioBankEnvironmentVariables?: VinistoCronDllHelpersEnvironmentVariablesFioBankEnvironmentVariables | null;
    /** Nullable variables. If null, default values are used. */
    raiffeisenBankEnvironmentVariables?: VinistoCronDllHelpersEnvironmentVariablesRaiffeisenBankEnvironmentVariables | null;
  };

/** Request used with CronType.SendOrdersToWms */
export type VinistoCronDllModelsApiCronRenewSubscriptionsRequest =
  VinistoCronDllModelsApiCronCronRequestBase & {
    renewSubscriptionsEnvironmentVariables?: VinistoCronDllHelpersEnvironmentVariablesRenewSubscriptionsEnvironmentVariables | null;
  };

/** Request used with CronType.ResetOurOrderNumber */
export type VinistoCronDllModelsApiCronResetOurOrderNumberRequest =
  VinistoCronDllModelsApiCronCronRequestBase & object;

/** Request used with CronType.ResetStockingRequestNumber */
export type VinistoCronDllModelsApiCronResetStockingRequestNumberRequest =
  VinistoCronDllModelsApiCronCronRequestBase & object;

/** Request used with CronType.SendOrdersToWms */
export type VinistoCronDllModelsApiCronSendOrdersToWmsRequest =
  VinistoCronDllModelsApiCronCronRequestBase & object;

/** Request used with CronType.SentCouponExpirationSoonNotification */
export type VinistoCronDllModelsApiCronSentCouponExpirationSoonNotificationRequest =
  VinistoCronDllModelsApiCronCronRequestBase & object;

/** Request used with CronType.SentDailyNotificationNonPaidOrders */
export type VinistoCronDllModelsApiCronSentDailyNotificationNonPaidOrdersRequest =
  VinistoCronDllModelsApiCronCronRequestBase & object;

/** Request used with CronType.SentFirstNotificationNonPaidOrders */
export type VinistoCronDllModelsApiCronSentFirstNotificationNonPaidOrdersRequest =
  VinistoCronDllModelsApiCronCronRequestBase & object;

/** Request used with CronType.SentRequestForEvaluationOfDeliveredOrders */
export type VinistoCronDllModelsApiCronSentRequestForEvaluationOfDeliveredOrdersRequest =
  VinistoCronDllModelsApiCronCronRequestBase & object;

/** Request used with CronType.SetDiscountVolume */
export type VinistoCronDllModelsApiCronVerifyBundlesPricesRequest =
  VinistoCronDllModelsApiCronCronRequestBase & object;

/** Request used with CronType.WarehouseUpdateBundleSnapshot */
export type VinistoCronDllModelsApiCronWarehouseUpdateBundleSnapshotRequest =
  VinistoCronDllModelsApiCronCronRequestBase & object;

export interface VinistoEcomailConnectorModelClientCreateEventData {
  /** @format int32 */
  id?: number | null;
  email?: string | null;
  category?: string | null;
  action?: string | null;
  label?: string | null;
  property?: string | null;
  value?: string | null;
}

export interface VinistoEcomailConnectorModelCreateOrUpdateOrderParameters {
  orderId: string | null;
  emailAddress: string | null;
}

export interface VinistoEcomailConnectorModelCreateOrUpdateSubscriberParameters {
  emailAddress: string | null;
  type: VinistoHelperDllEnumsEcoMailRegistrationType | null;
  visitorUrl?: string | null;
}

export interface VinistoEcomailConnectorModelUnsubscribeParameters {
  email: string | null;
}

export interface VinistoEmailDllModelSendEmailParameters {
  recipient?: string | null;
  sendEmailToCso?: boolean | null;
  userLoginHash?: string | null;
  subject: string | null;
  body: string | null;
}

export interface VinistoExchangeRateDllModelsApiExchangeRate {
  id?: string | null;
  /** @format date */
  day?: string;
  /** Currency */
  currency?: VinistoHelperDllEnumsCurrency;
  /** @format double */
  value?: number;
  /** @format double */
  valueGoods?: number;
  /** @format double */
  valueDiscountCoupons?: number;
  /** @format double */
  coefficient?: number;
}

export interface VinistoExchangeRateDllModelsApiExchangeRateEditParameters {
  /** @format double */
  coefficient: number;
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

export interface VinistoExchangeRateDllModelsApiReturnDataExchangeRateReturn {
  exchangeRate?: VinistoExchangeRateDllModelsApiExchangeRate | null;
  /** Has occurred any error. */
  isError?: boolean;
  /** List of errors code that occurred during the api request. */
  error?: VinistoHelperDllBaseError[] | null;
}

export interface VinistoExchangeRateDllModelsApiReturnDataExchangeRatesReturn {
  exchangeRates?: VinistoExchangeRateDllModelsApiExchangeRate[] | null;
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

/** Information about requested payment. */
export interface VinistoGopayDllModelsApiOrderPaymentData {
  /**
   * Order id.
   * @minLength 1
   */
  orderId: string;
  /**
   * Order number.
   * @minLength 1
   */
  orderNumber: string;
  /** Currency */
  currency: VinistoHelperDllEnumsCurrency;
  /** Contains list of possible languages */
  language: VinistoHelperDllEnumsLanguage;
  /**
   * Amount of the payment in selected currency.
   * @format double
   */
  amount: number;
  /** Type of payment corresponding to possible GoPay payments types */
  paymentType: VinistoHelperDllEnumsGoPayGoPayType;
  /** Contact of the payer. */
  paymentContact: VinistoGopayDllModelsApiPaymentContact;
  /**
   * Url for notification of payment state.
   * @minLength 1
   */
  notificationUrl: string;
  /**
   * Url where user will be redirected after payment.
   * @minLength 1
   */
  returnUrl: string;
  isCreateRecurrence: boolean;
}

/** Information data about the payer. Contact information */
export interface VinistoGopayDllModelsApiPaymentContact {
  /** First name */
  firstName?: string | null;
  /** Last name */
  lastName?: string | null;
  /**
   * Email of the contact
   * @minLength 1
   */
  email: string;
  /** Phone number */
  phoneNumber?: string | null;
  /** City */
  city?: string | null;
  /** Street with number */
  street?: string | null;
  /** Postal (ZIP) code */
  postalCode?: string | null;
  /** Country code */
  countryCode?: VinistoHelperDllEnumsCountryCode | null;
}

/** Information about created payment. */
export interface VinistoGopayDllModelsApiPaymentInfo {
  /**
   * Id of the payment.
   * @format int64
   */
  paymentId?: number;
  /**
   * GoPay payment url.
   * @minLength 1
   */
  gwUrl: string;
  /**
   * Id of the order.
   * @minLength 1
   */
  orderId: string;
  /**
   * Number of the order.
   * @minLength 1
   */
  orderNumber: string;
  /** Current state of the payment. */
  state?: VinistoHelperDllEnumsGoPayGoPaySessionState | null;
  /** Type of the payment. */
  paymentType?: VinistoHelperDllEnumsGoPayGoPayType | null;
  /**
   * Amount in cents.
   * @format int64
   */
  amount?: number;
  /** Currency of the payment. */
  currency?: VinistoHelperDllEnumsCurrency | null;
  /** Currency of the payment. */
  countryOfSale?: VinistoHelperDllEnumsCountryCode | null;
}

/** Parameters creating payment. All required data is loaded from Order by Order Id. */
export interface VinistoGopayDllModelsApiPaymentParameters {
  /**
   * Order number
   * @minLength 1
   */
  orderId: string;
  /**
   * Url for notification of payment state
   * @minLength 1
   */
  notificationUrl: string;
  /**
   * Url where user will be redirected after payment
   * @minLength 1
   */
  returnUrl: string;
}

/** Return object for GoPay payment */
export interface VinistoGopayDllModelsApiPaymentReturn {
  /** GoPay payment information */
  payment?: VinistoGopayDllModelsApiPaymentInfo | null;
  /** Has occurred any error. */
  isError?: boolean;
  /** List of errors code that occurred during the api request. */
  error?: VinistoHelperDllBaseError[] | null;
}

/** Information about created payment */
export interface VinistoGopayDllModelsApiRefundInfo {
  /**
   * Id of the payment
   * @format int64
   */
  paymentId?: number;
  /** State of the refund */
  refundState?: VinistoHelperDllEnumsGoPayGoPayRefundState | null;
  /**
   * Description
   * @minLength 1
   */
  description: string;
}

/** Parameters used for refund payment */
export interface VinistoGopayDllModelsApiRefundParameters {
  /**
   * The amount of the payment to be refunded
   * @format double
   */
  amount: number;
}

/** Return object for refund payment */
export interface VinistoGopayDllModelsApiRefundReturn {
  /** GoPay refund information */
  refund?: VinistoGopayDllModelsApiRefundInfo | null;
  /** Has occurred any error. */
  isError?: boolean;
  /** List of errors code that occurred during the api request. */
  error?: VinistoHelperDllBaseError[] | null;
}

/** Information about requested payment. */
export interface VinistoGopayDllModelsApiSubscriptionCardChangePaymentData {
  /** Subscription id. */
  subscriptionId?: string | null;
  /** Currency */
  currency: VinistoHelperDllEnumsCurrency;
  /** Contains list of possible languages */
  language: VinistoHelperDllEnumsLanguage;
  /**
   * Amount of the payment in selected currency.
   * @format double
   */
  amount: number;
  /** Type of payment corresponding to possible GoPay payments types */
  paymentType: VinistoHelperDllEnumsGoPayGoPayType;
  /** Contact of the payer. */
  paymentContact: VinistoGopayDllModelsApiPaymentContact;
  /**
   * Url for notification of payment state.
   * @minLength 1
   */
  notificationUrl: string;
  /**
   * Url where user will be redirected after payment.
   * @minLength 1
   */
  returnUrl: string;
  isCreateRecurrence: boolean;
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

export interface VinistoRabbitmqCoreModelsApplicationLogOrderChangedData {
  orderState?: VinistoHelperDllEnumsOrderOrderState | null;
  emailTemplate?: string | null;
  emailData?: string | null;
  itemId?: string | null;
  /** Possible application log types */
  action?: VinistoHelperDllEnumsActionLogApplicationLogType;
  executorUserId?: string | null;
  /** @format int64 */
  time?: number;
  /** @format int64 */
  createdAt?: number | null;
}

export interface VinistoRabbitmqCoreModelsBundleBundleFlagData {
  bundleId?: string | null;
  /**
   * Contains list of possible flag for bundle.
   * Is used for transfering flag to RBMQ
   */
  flag?: VinistoHelperDllEnumsBundleFlag;
  /** @format int32 */
  platformId?: number;
}

export interface VinistoRabbitmqCoreModelsDiscountCouponDiscountCouponData {
  userEmail?: string | null;
  /** Type of trigger */
  trigger?: VinistoHelperDllEnumsAutomaticCouponTriggerType;
  /** Currency */
  currency?: VinistoHelperDllEnumsCurrency;
  /** Identifies type of the country */
  countryOfSale?: VinistoHelperDllEnumsCountryCode;
  /** Contains list of possible languages */
  language?: VinistoHelperDllEnumsLanguage;
  userId?: string | null;
  orderId?: string | null;
  /** @format double */
  orderPrice?: number | null;
}

export interface VinistoRabbitmqCoreModelsModelEventChangeOrderStateEvent {
  orderId?: string | null;
  /** State of the order */
  newOrderState?: VinistoHelperDllEnumsOrderOrderState;
  /** State of the order */
  currentOrderState?: VinistoHelperDllEnumsOrderOrderState;
  userId?: string | null;
  isNotificationEmailSent?: boolean;
  /** Possible application log types */
  logType?: VinistoHelperDllEnumsActionLogApplicationLogType;
  /** Contains event types with mongo models */
  eventType?: VinistoHelperDllEnumsModelEventModelEventType;
}

export interface VinistoRabbitmqCoreModelsOrderAcceleratedOrderItem {
  itemId: string | null;
  type: VinistoHelperDllEnumsOrderAcceleratedPurchaseType;
}

export interface VinistoRabbitmqCoreModelsOrderAddress {
  /** @minLength 1 */
  name: string;
  /** @minLength 1 */
  surname: string;
  /** @minLength 1 */
  phone: string;
  note?: string | null;
  email?: string | null;
  title?: string | null;
  company?: string | null;
  ico?: string | null;
  dic?: string | null;
  accountNumber?: string | null;
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
  /** Identifies type of the country */
  countryCode?: VinistoHelperDllEnumsCountryCode;
}

export interface VinistoRabbitmqCoreModelsOrderCancelOrderData {
  orderId?: string | null;
  userId?: string | null;
}

export interface VinistoRabbitmqCoreModelsOrderCreateOrderMessage {
  type?: VinistoHelperDllEnumsOrderOrderType;
  wsId?: string | null;
  /** Currency */
  currency?: VinistoHelperDllEnumsCurrency;
  /** Contains list of possible languages */
  language?: VinistoHelperDllEnumsLanguage;
  signedUser?: boolean;
  basketId?: string | null;
  deliveryId?: string | null;
  paymentId?: string | null;
  isNewsletterActive?: boolean | null;
  orderNote?: string | null;
  userCustomOrderNumber?: string | null;
  specSymbol?: string | null;
  pickupPoint?: VinistoRabbitmqCoreModelsOrderPickupPoint | null;
  utm?: VinistoRabbitmqCoreModelsOrderUtmParameters | null;
  billingAddress?: VinistoRabbitmqCoreModelsOrderAddress | null;
  orderId?: string | null;
  acceleratedOrderItems?:
    | VinistoRabbitmqCoreModelsOrderAcceleratedOrderItem[]
    | null;
  billingAddressId?: string | null;
  deliveryAddressId?: string | null;
  /** Class containing parameters for user authorization */
  authorizationParameters?: VinistoHelperDllBaseAuthorizationParameters | null;
  anonymousUserId?: string | null;
  userEmail?: string | null;
  deliveryAddress?: VinistoRabbitmqCoreModelsOrderAddress | null;
  /** @format int32 */
  platformId?: number;
  platformApiKey?: string | null;
}

export interface VinistoRabbitmqCoreModelsOrderOrderInvoiceMessage {
  itemId?: string | null;
  type?: VinistoRabbitmqCoreModelsOrderInvoiceType;
}

export interface VinistoRabbitmqCoreModelsOrderPickupPoint {
  /** Pickup point company */
  type?: VinistoHelperDllEnumsOrderPickupPointType;
  /** @minLength 1 */
  code: string;
  /** @minLength 1 */
  addressee: string;
  /** @minLength 1 */
  phone: string;
  /** @minLength 1 */
  email: string;
  address: VinistoRabbitmqCoreModelsOrderPostalAddress;
}

export interface VinistoRabbitmqCoreModelsOrderPostalAddress {
  /** @minLength 1 */
  street: string;
  /** @minLength 1 */
  landRegistryNumber: string;
  houseNumber?: string | null;
  /** @minLength 1 */
  zip: string;
  /** @minLength 1 */
  city: string;
  /** Identifies type of the country */
  countryCode?: VinistoHelperDllEnumsCountryCode;
}

export interface VinistoRabbitmqCoreModelsOrderUtmParameters {
  source?: string | null;
  medium?: string | null;
  campaign?: string | null;
  gad?: string | null;
  gclId?: string | null;
}

export interface VinistoRabbitmqCoreModelsRecoverableMessagesBaseData {
  type?: VinistoHelperDllEnumsRecoverableMessageRecoverableMessageType;
}

export interface VinistoRabbitmqCoreModelsRecoverableMessagesRecoverableMessage {
  id?: string | null;
  queueName?: VinistoRabbitmqCoreModelsQueueName;
  data?: VinistoRabbitmqCoreModelsRecoverableMessagesBaseData | null;
}

export interface VinistoRabbitmqCoreModelsStockingRequestStockingRequestData {
  stockingRequestId?: string | null;
  isCancelRequest?: boolean;
}

/** Parameters used for send contact form data */
export interface VinistoServicesApiControllersContactFormContactFormParameters {
  name?: string | null;
  mail?: string | null;
  ico?: string | null;
  phone?: string | null;
  isVatPayer?: boolean | null;
}

/** Represents order item in basket for EHub request */
export interface VinistoServicesApiControllersEHubEHubOrderItem {
  /** Items id in basket */
  id?: string | null;
  /** Master type of item */
  masterType?: string | null;
  /** Category of item */
  category?: string | null;
  /** Item name */
  name?: string | null;
  /** Price per unit of item */
  unitPrice?: string | null;
  /** Amount of units of item */
  quantity?: string | null;
}

/** Parameters used for send EHub request */
export interface VinistoServicesApiControllersEHubEHubRequestParameters {
  /** Visitor identifier that the advertiser's server receives in url of landing page when clicked through */
  visitId?: string | null;
  /** Internal marking of e-shop order, which is also communicated to customer (often also a variable symbol) */
  orderId?: string | null;
  /**
   * Total value of order, without VAT and shipping and any other fees (e.g. for cash on delivery), by default in CKZ, or in currency specified in currency parameter
   * Depending on setting of commission model and agreed method of tracking, one alternative (OrderAmount or OrderItems) is always used
   */
  orderAmount?: string | null;
  /** Currency */
  currency?: VinistoHelperDllEnumsCurrency;
  /** Discount from total value of order resulting from discount coupon used, without VAT, by default in CKZ, or in currency specified in currency parameter */
  couponDiscount?: string | null;
  /** Discount coupon code, e.g. VANOCE2020 */
  couponCode?: string | null;
  /** Text describing the selected payment type, e.g. cash on delivery */
  paymentMethod?: string | null;
  /** Value 0 for repeat customer (who has historically bought in the e-shop), value 1 for new e-shop customer (never bought before) */
  newCustomer?: string | null;
  /** Order items - Depending on setting of commission model and agreed method of tracking, one alternative (OrderAmount or OrderItems) is always used */
  orderItems?: VinistoServicesApiControllersEHubEHubOrderItem[] | null;
}

/**
 * Request model for publishing RabbitMQ messages.
 * Acts as a discriminated union based on the Type property.
 */
export interface VinistoServicesApiControllersRabbitMqPublishRequest {
  /** The type of message to publish. Determines the target exchange and routing key. */
  type?: VinistoServicesApiControllersRabbitMqPacketType;
  /** Optional Target-Version header for versioning tests. */
  targetVersion?: string | null;
  /** Optional Message-Type header. */
  messageType?: string | null;
  /**
   * Optional number of messages to publish. Default is 1. Max is 10000.
   * @format int32
   */
  messageCount?: number | null;
  /** Payload for OrderCreate messages. Used if Type is OrderCreate. */
  orderCreateData?: VinistoRabbitmqCoreModelsOrderCreateOrderMessage | null;
  /** Payload for StockingRequest messages. Used if Type is StockingRequest. */
  stockingRequestData?: VinistoRabbitmqCoreModelsStockingRequestStockingRequestData | null;
  /** Payload for OrderCancel messages. Used if Type is OrderCancel. */
  cancelOrderData?: VinistoRabbitmqCoreModelsOrderCancelOrderData | null;
  /** Payload for OrderInvoice messages. Used if Type is OrderInvoice. */
  orderInvoiceMessage?: VinistoRabbitmqCoreModelsOrderOrderInvoiceMessage | null;
  /** Payload for FeeRecord messages. Used if Type is FeeRecord. */
  feeRecordData?: string | null;
  /** Payload for B2b messages. Used if Type is B2b. */
  recoverableMessage?: VinistoRabbitmqCoreModelsRecoverableMessagesRecoverableMessage | null;
  /** Payload for BundleFlag messages. */
  bundleFlagData?: VinistoRabbitmqCoreModelsBundleBundleFlagData | null;
  /** Payload for DiscountCoupon messages. */
  discountCouponData?: VinistoRabbitmqCoreModelsDiscountCouponDiscountCouponData | null;
  /** Payload for ModelEvent messages. Using concrete type for binding. */
  changeOrderStateEvent?: VinistoRabbitmqCoreModelsModelEventChangeOrderStateEvent | null;
  /** Payload for ApplicationLog messages. Using concrete type for binding. */
  orderChangedData?: VinistoRabbitmqCoreModelsApplicationLogOrderChangedData | null;
}

/** Result of importing Upgates contacts. */
export interface VinistoServicesApiControllersUpgatesContactUpgatesContactImportReturn {
  /**
   * Number of companies created in Mongo.
   * @format int32
   */
  importedCount?: number;
  /**
   * Number of rows skipped because they could not be imported.
   * @format int32
   */
  skippedCount?: number;
  /** Ids of newly created companies. */
  importedCompanyIds?: string[] | null;
  /** Path to a CSV file containing skipped rows and the failure reason. */
  failedRowsCsvPath?: string | null;
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

export interface VinistoServicesApiServicesIntegrationListItemDto {
  id: string | null;
  /** @format int32 */
  integrationId: number;
  integrationName: string | null;
}

export interface VinistoServicesApiServicesIntegrationsReturn {
  integrations: VinistoServicesApiServicesIntegrationListItemDto[] | null;
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

export interface VinistoSitemapDllHelpersSitemapEnvironmentVariables {
  sitemapFolderPath: string | null;
  sitemapDomainUrl: string | null;
  sitemapItemDomainUrl: string | null;
  /** Contains list of possible languages */
  language: VinistoHelperDllEnumsLanguage;
}

/** Default SmartForm POST response wrapper */
export interface VinistoSmartformDllModelsResponsePostResponse {
  /** Array of objects (PostResponseAddress). List of whisperer suggestions. */
  suggestions?: VinistoSmartformDllModelsResponsePostResponseAddress[] | null;
  /** ResultCode - Query result. */
  resultCode?: string | null;
  /** Detailed description of the error (if ResultCode == FAIL). */
  errorMessage?: string | null;
  /**
   * Query identification - for review (should be the same as the query number).
   * @format int32
   */
  id?: number | null;
}

/** List of whisperer suggestions. */
export interface VinistoSmartformDllModelsResponsePostResponseAddress {
  /** FieldType - for which field the proposal is intended. */
  fieldType?: string | null;
  /**
   * List of values - values assigned to form fields.
   * "NUMBER": "1266/3",
   * "STREET_AND_NUMBER": "Foglarova 1266/3",
   * "STREET": "Foglarova",
   * "CITY_EXTENDED": "Plzeň 23",
   * "CITY": "Plzeň",
   * "DISTRICT": "Plzeň-město",
   * "REGION": "Plzeňský kraj",
   * "ZIP": "32300",
   * "POST": "Plzeň 23",
   * "WHOLE_ADDRESS": "Foglarova 1266/3, 32300 Plzeň 23"
   */
  values?: Record<string, string>;
  /** List of flags - additional symptoms to whispered item */
  flags?: Record<string, string>;
}

export interface VinistoSupportboxDllModelsApiGetUserResponse {
  name?: string | null;
  html?: string | null;
  isBackground?: boolean;
  companyLogoUrl?: string | null;
  /** Has occurred any error. */
  isError?: boolean;
  /** List of errors code that occurred during the api request. */
  error?: VinistoHelperDllBaseError[] | null;
}

export interface CachesDeleteParams {
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
}

/** Parameters used for send contact form data */
export type ContactCreatePayload =
  VinistoServicesApiControllersContactFormContactFormParameters;

/** CreateOrUpdateSubscriberParameters: Email address and type of registration for create or update (if exists) subscriber. */
export type EcomailCreateOrUpdateSubscriberCreatePayload =
  VinistoEcomailConnectorModelCreateOrUpdateSubscriberParameters;

/** UnsubscribeParameters: Email address for remove subscriber. */
export type EcomailRemoveSubscriberUpdatePayload =
  VinistoEcomailConnectorModelUnsubscribeParameters;

/** CreateOrUpdateOrderParameters: Email address and order id. */
export type EcomailCreateOrUpdateOrderCreatePayload =
  VinistoEcomailConnectorModelCreateOrUpdateOrderParameters;

export type EcomailAddEventCreatePayload =
  VinistoEcomailConnectorModelClientCreateEventData;

/** Parameters used for send EHub request */
export type EhubCreatePayload =
  VinistoServicesApiControllersEHubEHubRequestParameters;

export type EmailSendCreatePayload = VinistoEmailDllModelSendEmailParameters;

export interface ExchangeRatesListParams {
  /** @format date */
  Day?: string;
  Currency?: VinistoHelperDllEnumsCurrency;
  /** @format int32 */
  Limit?: number;
  /** @format int32 */
  Offset?: number;
}

export type ExchangeRatesEditCoefficientUpdatePayload =
  VinistoExchangeRateDllModelsApiExchangeRateEditParameters;

export interface CronsListParams {
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
}

/** Cron type, environment variables and authorization parameters. */
export type CronsExecuteCreatePayload =
  | VinistoCronDllModelsApiCronDeleteBundlesRequest
  | VinistoCronDllModelsApiCronDeleteCategoriesRequest
  | VinistoCronDllModelsApiCronDeleteCmsArticlesRequest
  | VinistoCronDllModelsApiCronImportBundlesRequest
  | VinistoCronDllModelsApiCronImportCategoriesRequest
  | VinistoCronDllModelsApiCronImportCmsArticlesRequest
  | VinistoCronDllModelsApiCronCheckBundleWithoutFeeRuleRequest
  | VinistoCronDllModelsApiCronCheckFeeRuleExpirationIn3DaysRequest
  | VinistoCronDllModelsApiCronCheckFeeRuleExpirationIn7DaysRequest
  | VinistoCronDllModelsApiCronCheckFeeRuleValidityRequest
  | VinistoCronDllModelsApiCronMigrationRequest
  | VinistoCronDllModelsApiCronCheckDeliveriesRequest
  | VinistoCronDllModelsApiCronCheckPaymentsStatusRequest
  | VinistoCronDllModelsApiCronCreateBillingEmailsRequest
  | VinistoCronDllModelsApiCronCreateBillingForFeedsRequest
  | VinistoCronDllModelsApiCronCreateBillingInvoiceRequest
  | VinistoCronDllModelsApiCronCreateInvoiceRequest
  | VinistoCronDllModelsApiCronCreateVatInvoiceRequest
  | VinistoCronDllModelsApiCronFixPairPaidOrdersRequest
  | VinistoCronDllModelsApiCronFixPaidOrdersFeeRecordsRequest
  | VinistoCronDllModelsApiCronPairPaidOrdersRequest
  | VinistoCronDllModelsApiCronResetOurOrderNumberRequest
  | VinistoCronDllModelsApiCronSentDailyNotificationNonPaidOrdersRequest
  | VinistoCronDllModelsApiCronSentCouponExpirationSoonNotificationRequest
  | VinistoCronDllModelsApiCronSentFirstNotificationNonPaidOrdersRequest
  | VinistoCronDllModelsApiCronSentRequestForEvaluationOfDeliveredOrdersRequest
  | VinistoCronDllModelsApiCronCheckDiscountCouponsCategoriesRequest
  | VinistoCronDllModelsApiCronDeleteOldBasketsRequest
  | VinistoCronDllModelsApiCronDiscountCouponTriggerRequest
  | VinistoCronDllModelsApiCronFixWarehouseVicomRequest
  | VinistoCronDllModelsApiCronImportExchangeRateRequest
  | VinistoCronDllModelsApiCronInitOrRemoveB2BPricesRequest
  | VinistoCronDllModelsApiCronModifyBundlesRequest
  | VinistoCronDllModelsApiCronOroReportRequest
  | VinistoCronDllModelsApiCronResetStockingRequestNumberRequest
  | VinistoCronDllModelsApiCronVerifyBundlesPricesRequest
  | VinistoCronDllModelsApiCronWarehouseUpdateBundleSnapshotRequest
  | VinistoCronDllModelsApiCronDelOldHashRequest
  | VinistoCronDllModelsApiCronDelTestCategoriesRequest
  | VinistoCronDllModelsApiCronDelTestUserRequest
  | VinistoCronDllModelsApiCronFillWmsWithProductsRequest
  | VinistoCronDllModelsApiCronSendOrdersToWmsRequest
  | VinistoCronDllModelsApiCronGenerateHeurekaFeedsRequest
  | VinistoCronDllModelsApiCronGenerateSitemapsRequest
  | VinistoCronDllModelsApiCronRenewSubscriptionsRequest;

/** Information about requested payment. */
export type GopayCreatePayload = VinistoGopayDllModelsApiOrderPaymentData;

/** Parameters creating payment. All required data is loaded from Order by Order Id. */
export type GopayCreatePaymentFromOrderCreatePayload =
  VinistoGopayDllModelsApiPaymentParameters;

/** Parameters used for refund payment */
export type GopayRefundCreatePayload = VinistoGopayDllModelsApiRefundParameters;

export interface GopayNotifyListParams {
  /**
   * Id of the payment
   * @format int64
   */
  id?: number;
}

/** Information about requested payment. */
export type GopayChangeCardCreatePayload =
  VinistoGopayDllModelsApiSubscriptionCardChangePaymentData;

export interface InvoiceGetInvoiceListParams {
  orderId?: string;
}

export interface GetServicesApiParams {
  /**
   * Time from
   * @format int64
   */
  timeFrom?: number;
  /**
   * Time to
   * @format int64
   */
  timeTo?: number;
}

export interface OroXmlFileListParams {
  /** @format int64 */
  timeFrom?: number;
  /** @format int64 */
  timeTo?: number;
}

/**
 * Request model for publishing RabbitMQ messages.
 * Acts as a discriminated union based on the Type property.
 */
export type RabbitmqTestPublishCreatePayload =
  VinistoServicesApiControllersRabbitMqPublishRequest;

export interface SmartformListParams {
  /** String for search addresses */
  SearchAddress: string;
  /** Search address in provided country (Allowed values: CZ, SK). If not provided default value is CZ */
  Country?: string;
  /**
   * Number of records to be retrieved. if not provided default value is 10.
   * Limited by Maximum number of records in EnvironmentConstants
   * @format int32
   */
  Limit?: number;
  IsCache?: boolean;
}

export interface SubscriptionsListParams {
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
}

export interface SupportboxGetUserListParams {
  Id?: string;
  Email?: string;
  Key?: string;
}

export interface UpgatesContactImportCreatePayload {
  /**
   * Upgates contacts CSV export file.
   * @format binary
   */
  csv?: File;
}

export interface UpgatesContactImportCreateParams {
  /** Merchant id that will be linked to every imported company. */
  MerchantId?: string;
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
}

export namespace ServicesApi {
  /**
   * No description
   * @tags Ares
   * @name AresDetail
   * @summary Get data from ARES II to provided ico
   * @request GET:/services-api/ares/{ico}
   * @secure
   */
  export namespace AresDetail {
    export type RequestParams = {
      /** IČO */
      ico: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = string;
  }

  /**
   * No description
   * @tags Cache
   * @name CachesDelete
   * @summary Clear all data from cache
   * @request DELETE:/services-api/caches
   * @secure
   */
  export namespace CachesDelete {
    export type RequestParams = {};
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
   * @tags ContactForm
   * @name ContactCreate
   * @summary Send email with offer to email from config
   * @request POST:/services-api/contact
   * @secure
   */
  export namespace ContactCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ContactCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoHelperDllBaseBaseReturn;
  }

  /**
   * No description
   * @tags Ecomail
   * @name EcomailCreateOrUpdateSubscriberCreate
   * @summary Create new subscriber or update existing subscriber in Ecomail by email address and type of registration.
   * @request POST:/services-api/ecomail/create-or-update-subscriber
   * @secure
   */
  export namespace EcomailCreateOrUpdateSubscriberCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = EcomailCreateOrUpdateSubscriberCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoHelperDllBaseBaseReturn;
  }

  /**
   * No description
   * @tags Ecomail
   * @name EcomailRemoveSubscriberUpdate
   * @summary Remove subscriber from Ecomail.
   * @request PUT:/services-api/ecomail/remove-subscriber
   * @secure
   */
  export namespace EcomailRemoveSubscriberUpdate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = EcomailRemoveSubscriberUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoHelperDllBaseBaseReturn;
  }

  /**
   * No description
   * @tags Ecomail
   * @name EcomailCreateOrUpdateOrderCreate
   * @summary Create new order or update existing order (change status by order state) in Ecomail by email address and order id.
   * @request POST:/services-api/ecomail/create-or-update-order
   * @secure
   */
  export namespace EcomailCreateOrUpdateOrderCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = EcomailCreateOrUpdateOrderCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoHelperDllBaseBaseReturn;
  }

  /**
   * No description
   * @tags Ecomail
   * @name EcomailAddEventCreate
   * @summary Forwards the request raw to Ecomail AddEvent API.
   * @request POST:/services-api/ecomail/add-event
   * @secure
   */
  export namespace EcomailAddEventCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = EcomailAddEventCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags EHub
   * @name EhubCreate
   * @summary Send data to EHub
   * @request POST:/services-api/ehub
   * @secure
   */
  export namespace EhubCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = EhubCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = string;
  }

  /**
   * No description
   * @tags Email
   * @name EmailSendCreate
   * @summary Send email with provided body and subject to provided email address.
   * @request POST:/services-api/email/send
   * @secure
   */
  export namespace EmailSendCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = EmailSendCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoHelperDllBaseBaseReturn;
  }

  /**
   * No description
   * @tags ExchangeRates
   * @name ExchangeRatesList
   * @summary Get exchange rates by provided parameters
   * @request GET:/services-api/exchange-rates
   * @secure
   */
  export namespace ExchangeRatesList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** @format date */
      Day?: string;
      Currency?: VinistoHelperDllEnumsCurrency;
      /** @format int32 */
      Limit?: number;
      /** @format int32 */
      Offset?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoExchangeRateDllModelsApiReturnDataExchangeRatesReturn;
  }

  /**
   * No description
   * @tags ExchangeRates
   * @name ExchangeRatesDetail
   * @summary Get exchange rate by provided id
   * @request GET:/services-api/exchange-rates/{exchangeRateId}
   * @secure
   */
  export namespace ExchangeRatesDetail {
    export type RequestParams = {
      exchangeRateId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoExchangeRateDllModelsApiReturnDataExchangeRateReturn;
  }

  /**
   * No description
   * @tags ExchangeRates
   * @name ExchangeRatesEditCoefficientUpdate
   * @summary Editing coefficient for exchange rate by provided id
   * @request PUT:/services-api/exchange-rates/edit-coefficient/{exchangeRateId}
   * @secure
   */
  export namespace ExchangeRatesEditCoefficientUpdate {
    export type RequestParams = {
      exchangeRateId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = ExchangeRatesEditCoefficientUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoExchangeRateDllModelsApiReturnDataExchangeRateReturn;
  }

  /**
   * No description
   * @tags GlobalCron
   * @name CronsList
   * @summary Execute cron service for global cron services
   * @request GET:/services-api/crons
   * @secure
   */
  export namespace CronsList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoHelperDllBaseBaseReturn;
  }

  /**
   * @description All of the environment variables are optional. When they are not provided, default values will be used. Sample requests: Request without environment variables: { "cronType": "DeleteBundles", "userLoginHash": "hash" } Cron types with optional environment variables: ImportBundles: { "cronType": "ImportBundles", "userLoginHash": "hash", "ImportBundlesEnvironmentVariables": { "language": "CZECH" } } ImportCategories: { "cronType": "ImportCategories", "userLoginHash": "hash", "ImportCategoriesEnvironmentVariables": { "language": "CZECH" } } ImportCmsArticles: { "cronType": "ImportCmsArticles", "userLoginHash": "hash", "ImportCmsArticlesEnvironmentVariables": { "language": "CZECH" } } CreateBillingForFeeds: { "cronType": "CreateBillingForFeeds", "userLoginHash": "hash", "CreateBillingForFeedsEnvironmentVariables": { "BillingLanguage": "CZECH", "TimeFrom": null or long, "TimeTo": null or long } } CreateBillingInvoice: { "cronType": "CreateBillingInvoice", "userLoginHash": "hash", "CreateBillingInvoiceEnvironmentVariables": { "BillingLanguage": "CZECH" } } FixPairPaidOrders: { "cronType": "FixPairPaidOrders", "userLoginHash": "hash", "FioBankEnvironmentVariables": { "FioAuthToken": "authToken" } } PairPaidOrders: { "cronType": "PairPaidOrders", "userLoginHash": "hash", "FioBankEnvironmentVariables": { "FioAuthToken": "authToken" } } FixWarehouseVicom: { "cronType": "FixWarehouseVicom", "userLoginHash": "hash", "fixWarehouseVicomEnvironmentVariables": { "VicomSftpHost": "host", "VicomSftpPort": "port", "VicomSftpUsername": "username", "VicomSftpPassword": "password", "VicomCsvFileName": "fileName", "VicomCsvFilePath": "filePath" } } InitOrRemoveB2bPrices: { "cronType": "InitOrRemoveB2bPrices", "userLoginHash": "hash", "b2bPricesEnvironmentVariables": { "SupplierId": "id", "ProducerSpecificationValue": null, "TypeSpecificationValue": null, "KindSpecificationValue": null, "CountrySpecificationValue": null, "InitializeBundles": null, "PercentageDiscount": null } } CreateBillingForFeeds: { "cronType": "CreateBillingForFeeds", "userLoginHash": "hash", "createBillingForFeedsEnvironmentVariables": { "billingLanguage": "CZECH", "timeFrom": null, "timeTo": null } } GenerateHeurekaFeeds: { "cronType": "GenerateHeurekaFeeds", "userLoginHash": "hash", "generateHeurekaFeedsEnvironmentVariables": { "Currency": "CZK", "CountryOfSale": "CZ", "DirectoryPath": "path", "ImageDomainUrl": "url", "BaseDomainUrlLink": "url" } } GenerateSitemaps: { "cronType": "GenerateSitemaps", "userLoginHash": "hash", "sitemapEnvironmentVariables": { "SitemapFolderPath": "path", "SitemapDomainUrl": "url", "SitemapItemDomainUrl": "url", "Language": "CZECH" } } RenewSubscriptions: { "cronType": "RenewSubscriptions", "userLoginHash": "userLoginHash", "renewSubscriptionsEnvironmentVariables": { "AddonsBaseApiUrl": "https://localhost:7159", "SubscriptionMasterApiKey": "test", "SubscriptionReadApiKey": "test", "SubscriptionBaseUrl": "https://localhost:8160" } InactiveSubscriptions: { "cronType": "InactiveSubscriptions", "userLoginHash": "userLoginHash", "renewSubscriptionsEnvironmentVariables": { "SubscriptionMasterApiKey": "test", "SubscriptionReadApiKey": "test", "SubscriptionBaseUrl": "https://localhost:8160", "EmailTemplatePath": "", "EmailDomainUrl":"" } }
   * @tags GlobalCron
   * @name CronsExecuteCreate
   * @summary Execute cron service specified by cron request parameters.
   * @request POST:/services-api/crons/execute
   * @secure
   */
  export namespace CronsExecuteCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CronsExecuteCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoHelperDllBaseBaseReturn;
  }

  /**
   * No description
   * @tags GoPay
   * @name GopayCreate
   * @summary Create payment for provided data.
   * @request POST:/services-api/gopay
   * @secure
   */
  export namespace GopayCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = GopayCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoGopayDllModelsApiPaymentReturn;
  }

  /**
   * No description
   * @tags GoPay
   * @name GopayCreatePaymentFromOrderCreate
   * @summary Create payment for provided data.
   * @request POST:/services-api/gopay/CreatePaymentFromOrder
   * @secure
   */
  export namespace GopayCreatePaymentFromOrderCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = GopayCreatePaymentFromOrderCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoGopayDllModelsApiPaymentReturn;
  }

  /**
   * No description
   * @tags GoPay
   * @name GopayDetail
   * @summary Get current state for provided paymentId.
   * @request GET:/services-api/gopay/{paymentId}
   * @secure
   */
  export namespace GopayDetail {
    export type RequestParams = {
      /** @format int64 */
      paymentId: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoGopayDllModelsApiPaymentReturn;
  }

  /**
   * No description
   * @tags GoPay
   * @name GopayRecreatePaymentFromOrderList
   * @summary Recreate payment for provided order
   * @request GET:/services-api/gopay/{orderId}/RecreatePaymentFromOrder
   * @secure
   */
  export namespace GopayRecreatePaymentFromOrderList {
    export type RequestParams = {
      /** Id to check order gopay gateway timeout and recreate new payment gw */
      orderId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags GoPay
   * @name GopayRefundCreate
   * @summary Tries to refund provided amount from provided payment
   * @request POST:/services-api/gopay/{paymentId}/refund
   * @secure
   */
  export namespace GopayRefundCreate {
    export type RequestParams = {
      /**
       * Id of the payment
       * @format int64
       */
      paymentId: number;
    };
    export type RequestQuery = {};
    export type RequestBody = GopayRefundCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoGopayDllModelsApiRefundReturn;
  }

  /**
   * No description
   * @tags GoPay
   * @name GopayNotifyList
   * @summary Endpoint to notify about payment.
   * @request GET:/services-api/gopay/notify
   * @secure
   */
  export namespace GopayNotifyList {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * Id of the payment
       * @format int64
       */
      id?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags GoPay
   * @name GopayChangeCardCreate
   * @summary Create authorization payment to change card for subscription recurrence payments.
   * @request POST:/services-api/gopay/change-card
   * @secure
   */
  export namespace GopayChangeCardCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = GopayChangeCardCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoGopayDllModelsApiPaymentReturn;
  }

  /**
   * No description
   * @tags GoPay
   * @name GopayIsCardActiveDetail
   * @summary Verify card status. If card status is ACTIVE, then return in result.
   * @request GET:/services-api/gopay/is-card-active/{cardId}
   * @secure
   */
  export namespace GopayIsCardActiveDetail {
    export type RequestParams = {
      /**
       * Card id.
       * @format int64
       */
      cardId: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoGopayDllModelsApiPaymentReturn;
  }

  /**
 * No description
 * @tags Integration
 * @name IntegrationsList
 * @summary Get posible integrations.
If X-Api-Key in request is provided, then returns only integration for provided key.
If X-Api-Key in request is not provided, then returns all integrations.
 * @request GET:/services-api/integrations
 * @secure
*/
  export namespace IntegrationsList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoServicesApiServicesIntegrationsReturn;
  }

  /**
   * No description
   * @tags Invoice
   * @name InvoiceGetInvoiceList
   * @summary Get html as string for generate invoice to PDF
   * @request GET:/services-api/invoice/GetInvoice
   * @secure
   */
  export namespace InvoiceGetInvoiceList {
    export type RequestParams = {};
    export type RequestQuery = {
      orderId?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = string;
  }

  /**
   * No description
   * @tags Mongo
   * @name MongoCreateMongoIndicesCreate
   * @summary Create mongo indices to speed up all operations.
   * @request POST:/services-api/mongo/CreateMongoIndices
   * @secure
   */
  export namespace MongoCreateMongoIndicesCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoHelperDllBaseBaseReturn;
  }

  /**
   * No description
   * @tags Oro
   * @name GetServicesApi
   * @summary Gets oro report for provided date
   * @request GET:/services-api/oro
   * @secure
   */
  export namespace GetServicesApi {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * Time from
       * @format int64
       */
      timeFrom?: number;
      /**
       * Time to
       * @format int64
       */
      timeTo?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = string;
  }

  /**
   * No description
   * @tags Oro
   * @name OroXmlFileList
   * @request GET:/services-api/oro/xml-file
   * @secure
   */
  export namespace OroXmlFileList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** @format int64 */
      timeFrom?: number;
      /** @format int64 */
      timeTo?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags RabbitMqTest
   * @name RabbitmqTestPublishCreate
   * @summary Publishes a message to a RabbitMQ exchange for testing purposes.
   * @request POST:/services-api/rabbitmq-test/publish
   * @secure
   */
  export namespace RabbitmqTestPublishCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = RabbitmqTestPublishCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags SmartForm
   * @name SmartformList
   * @summary Get addresses from SmartForm to provided address
   * @request GET:/services-api/smartform
   * @secure
   */
  export namespace SmartformList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** String for search addresses */
      SearchAddress: string;
      /** Search address in provided country (Allowed values: CZ, SK). If not provided default value is CZ */
      Country?: string;
      /**
       * Number of records to be retrieved. if not provided default value is 10.
       * Limited by Maximum number of records in EnvironmentConstants
       * @format int32
       */
      Limit?: number;
      IsCache?: boolean;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoSmartformDllModelsResponsePostResponse;
  }

  /**
   * No description
   * @tags SubscriptionControler
   * @name SubscriptionsList
   * @request GET:/services-api/subscriptions
   * @secure
   */
  export namespace SubscriptionsList {
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
   * @tags SupportBox
   * @name SupportboxGetUserList
   * @summary Get user data by email for SupportBox.
   * @request GET:/services-api/supportbox/GetUser
   * @secure
   */
  export namespace SupportboxGetUserList {
    export type RequestParams = {};
    export type RequestQuery = {
      Id?: string;
      Email?: string;
      Key?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoSupportboxDllModelsApiGetUserResponse;
  }

  /**
   * No description
   * @tags UpgatesContactImport
   * @name UpgatesContactImportCreate
   * @summary Import Upgates contacts from a CSV file into Mongo companies.
   * @request POST:/services-api/upgates-contact/import
   * @secure
   */
  export namespace UpgatesContactImportCreate {
    export type RequestParams = {};
    export type RequestQuery = {
      /** Merchant id that will be linked to every imported company. */
      MerchantId?: string;
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
    };
    export type RequestBody = UpgatesContactImportCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoServicesApiControllersUpgatesContactUpgatesContactImportReturn;
  }
}
