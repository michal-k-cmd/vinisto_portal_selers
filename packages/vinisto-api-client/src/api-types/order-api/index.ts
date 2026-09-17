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

/** Contains list of possible types for change item quantity reason<p>Members:</p><ul><li><i>NONE</i> - None</ li > <li><i>R_STOCK_TAKING</i> - Stock-taking</ li > <li><i>R_STOCKING_FROM_SELLER</i> - Stocking form the seller</ li > <li><i>R_ORDER_CANCELLATION</i> - Order cancellation</ li > <li><i>R_RETURNING_GOODS</i> - Returning goods</ li > <li><i>R_IMPORT_CORRECTION</i> - Import correction</ li > <li><i>R_COMPLAINT</i> - Complaint</ li > <li><i>R_RETURNED_SELLER</i> - Returned to seller</ li > <li><i>A_WAREHOUSE_IMPORT</i> - Warehouse import</ li > <li><i>A_PRODUCT_IMPORT</i> - Product import</ li > <li><i>A_ORDER_CREATION</i> - Order creation by customer</ li > <li><i>A_ORDER_CANCELLATION_CUSTOMER</i> - Order cancellation by customer</ li > <li><i>A_ORDER_CANCELLATION_VINISTO</i> - Order cancellation by user with USER_ORDER_STORNO rule</ li > <li><i>A_ADD_TO_STOCK_SELLER</i> - Automatic product adding to stock by seller</ li > <li><i>B2B_PRODEJ_PARTNER</i> - Removing quantity of goods after sale on the B2B platform</ li > <li><i>B2B_STORNO_PARTNER</i> - Adding quantity of goods after sale on the B2B platform</ li > <li><i>B2C_PRODEJ_PARTNER</i> - Removing quantity of goods after sale on the external B2C platform.</ li > <li><i>B2C_STORNO_PARTNER</i> - Adding quantity of goods after sale on the external B2c platform.</ li > </ul> */
export enum VinistoHelperDllEnumsWarehouseChangeReasonType {
  NONE = "NONE",
  R_STOCK_TAKING = "R_STOCK_TAKING",
  R_STOCKING_FROM_SELLER = "R_STOCKING_FROM_SELLER",
  R_ORDER_CANCELLATION = "R_ORDER_CANCELLATION",
  R_RETURNING_GOODS = "R_RETURNING_GOODS",
  R_IMPORT_CORRECTION = "R_IMPORT_CORRECTION",
  R_COMPLAINT = "R_COMPLAINT",
  R_RETURNED_SELLER = "R_RETURNED_SELLER",
  A_WAREHOUSE_IMPORT = "A_WAREHOUSE_IMPORT",
  A_PRODUCT_IMPORT = "A_PRODUCT_IMPORT",
  A_ORDER_CREATION = "A_ORDER_CREATION",
  A_ORDER_CANCELLATION_CUSTOMER = "A_ORDER_CANCELLATION_CUSTOMER",
  A_ORDER_CANCELLATION_VINISTO = "A_ORDER_CANCELLATION_VINISTO",
  A_ADD_TO_STOCK_SELLER = "A_ADD_TO_STOCK_SELLER",
  B2B_PRODEJ_PARTNER = "B2B_PRODEJ_PARTNER",
  B2B_STORNO_PARTNER = "B2B_STORNO_PARTNER",
  B2C_PRODEJ_PARTNER = "B2C_PRODEJ_PARTNER",
  B2C_STORNO_PARTNER = "B2C_STORNO_PARTNER",
}

/** Contains list of possible virtual category states<p>Members:</p><ul></ul> */
export enum VinistoHelperDllEnumsVirtualCategoryState {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
}

/** VatRate<p>Members:</p><ul><li><i>BaseVat</i> - Base VAT level e.g. 21%</ li > <li><i>FirstReducedVat</i> - First reduced VAT level e.g. 15%</ li > <li><i>SecondReducedVat</i> - Second reduced VAT level e.g. 10%</ li > <li><i>NoVat</i> - No VAT e.g. 0%</ li > </ul> */
export enum VinistoHelperDllEnumsVatRate {
  BaseVat = "BaseVat",
  FirstReducedVat = "FirstReducedVat",
  SecondReducedVat = "SecondReducedVat",
  NoVat = "NoVat",
}

/** Contains list of possible columns for sorting<p>Members:</p><ul><li><i>ID</i> - Sorting by ID. Default.</ li > <li><i>BUNDLE_NAME</i> - Sorting by name of bundle.</ li > <li><i>ORDER_DELIVERY_TIME</i> - Sorting by time of delivery.</ li > <li><i>EVALUATION_EXISTS</i> - Sorting by existence of evaluation for bundle.</ li > <li><i>EVALUATION_CREATED_AT</i> - Sorting by evalution created at for bundle.</ li > </ul> */
export enum VinistoHelperDllEnumsUserBundleSortableColumns {
  ID = "ID",
  BUNDLE_NAME = "BUNDLE_NAME",
  ORDER_DELIVERY_TIME = "ORDER_DELIVERY_TIME",
  EVALUATION_EXISTS = "EVALUATION_EXISTS",
  EVALUATION_CREATED_AT = "EVALUATION_CREATED_AT",
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
export enum VinistoHelperDllEnumsSpecificationProductAttributeTab {
  Property = "Property",
  NutritionalValue = "NutritionalValue",
  Composition = "Composition",
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

/** States of the product<p>Members:</p><ul><li><i>CREATED</i> - Newly created order</ li > </ul> */
export enum VinistoHelperDllEnumsProductProductState {
  CREATED = "CREATED",
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

/** PDF type<p>Members:</p><ul><li><i>Billing</i> - Billing type</ li > <li><i>Invoice</i> - Invoice type</ li > </ul> */
export enum VinistoHelperDllEnumsPdfType {
  Billing = "Billing",
  Invoice = "Invoice",
}

/** Contains list of possible columns for sorting<p>Members:</p><ul></ul> */
export enum VinistoHelperDllEnumsPaymentSortableColumns {
  ID = "ID",
  NAME = "NAME",
  PAYMENT_TYPE = "PAYMENT_TYPE",
  IS_ACTIVE = "IS_ACTIVE",
  ORDER = "ORDER",
}

/** Contains list of possible columns for sorting<p>Members:</p><ul></ul> */
export enum VinistoHelperDllEnumsOrderSortableColumns {
  ID = "ID",
  PRICE = "PRICE",
  TIME = "TIME",
  DELIVERY_TYPE = "DELIVERY_TYPE",
  PAYMENT_TYPE = "PAYMENT_TYPE",
  TRACKING_ID = "TRACKING_ID",
  STATE = "STATE",
  EMAIL = "EMAIL",
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

/** Payment notification types<p>Members:</p><ul><li><i>AFTER_ORDER_CREATION</i> - Send payment notification after payment fail when create order</ li > <li><i>FIRST_DAY</i> - Send payment notification after one day after order creation (non paid order)</ li > <li><i>THIRTH_DAY</i> - Send payment notification after thirth day after order creation (non paid order)</ li > <li><i>FIFTH_DAY</i> - Send payment notification after fifth day after order creation (non paid order)</ li > </ul> */
export enum VinistoHelperDllEnumsOrderPaymentNotifictionType {
  AFTER_ORDER_CREATION = "AFTER_ORDER_CREATION",
  FIRST_DAY = "FIRST_DAY",
  THIRTH_DAY = "THIRTH_DAY",
  FIFTH_DAY = "FIFTH_DAY",
}

/** Identifies type of export for order statistics<p>Members:</p><ul><li><i>BY_ORDER</i> - Each line is a separate order</ li > <li><i>BY_ITEM</i> - Each line is a separate item in order</ li > </ul> */
export enum VinistoHelperDllEnumsOrderOrderStatisticExportType {
  BY_ORDER = "BY_ORDER",
  BY_ITEM = "BY_ITEM",
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

/** Identifies state of the payment for order<p>Members:</p><ul><li><i>CREATED</i> - Created</ li > <li><i>PAID</i> - Paid</ li > <li><i>TIMEOUTED</i> - Timeouted</ li > </ul> */
export enum VinistoHelperDllEnumsOrderOrderPaymentState {
  CREATED = "CREATED",
  PAID = "PAID",
  TIMEOUTED = "TIMEOUTED",
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

/** Contains list of possible languages<p>Members:</p><ul><li><i>CZECH</i> - Czech language</ li > <li><i>SLOVAK</i> - Slovak language</ li > <li><i>ENGLISH</i> - English</ li > <li><i>GERMAN</i> - German</ li > </ul> */
export enum VinistoHelperDllEnumsLanguage {
  CZECH = "CZECH",
  SLOVAK = "SLOVAK",
  ENGLISH = "ENGLISH",
  GERMAN = "GERMAN",
}

/** Item type<p>Members:</p><ul><li><i>PRODUCT</i> - Product</ li > <li><i>BUNDLE</i> - Bundle</ li > </ul> */
export enum VinistoHelperDllEnumsItemType {
  PRODUCT = "PRODUCT",
  BUNDLE = "BUNDLE",
}

/** Contains all possible invoice types.<p>Members:</p><ul></ul> */
export enum VinistoHelperDllEnumsInvoiceInvoiceType {
  Invoice = "Invoice",
  Proforma = "Proforma",
  VatInvoice = "VatInvoice",
  CreditNote = "CreditNote",
}

/** Contains all possible invoice states.<p>Members:</p><ul></ul> */
export enum VinistoHelperDllEnumsInvoiceInvoiceState {
  Created = "Created",
  Paid = "Paid",
  Overdue = "Overdue",
  Credited = "Credited",
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

/** Contains list of possible gift rule types<p>Members:</p><ul><li><i>GIFT_ORDER_PRICE_FROM</i> - Gift rule from price</ li > <li><i>GIFT_CATEGORY</i> - Gift rule for products with category</ li > <li><i>GIFT_SUPPLIER</i> - Gift rule for products from supplier</ li > <li><i>GIFT_SPECIFICATION</i> - Gift rule for products with specification</ li > </ul> */
export enum VinistoHelperDllEnumsGiftGiftRuleType {
  GIFT_ORDER_PRICE_FROM = "GIFT_ORDER_PRICE_FROM",
  GIFT_CATEGORY = "GIFT_CATEGORY",
  GIFT_SUPPLIER = "GIFT_SUPPLIER",
  GIFT_SPECIFICATION = "GIFT_SPECIFICATION",
}

/** Status of flexibee invoice faktura-vydana/stavUhrK<p>Members:</p><ul><li><i>UNSPECIFIED</i> - Not specified - the filed is empty ("")</ li > <li><i>PARTLY_PAID</i> - Invoice is partly paid (stavUhr.castUhr)</ li > <li><i>PAID</i> - Invoice is paid (stavUhr.uhrazeno)</ li > <li><i>MANUALLY_PAID</i> - Invoice is paid manually (stavUhr.uhrazenoRucne)</ li > </ul> */
export enum VinistoHelperDllEnumsFlexibeePaymentState {
  UNSPECIFIED = "UNSPECIFIED",
  PARTLY_PAID = "PARTLY_PAID",
  PAID = "PAID",
  MANUALLY_PAID = "MANUALLY_PAID",
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

/** Contains list of possible columns for sorting<p>Members:</p><ul><li><i>ID</i> - Sort by DiscountCoupon.Id property</ li > <li><i>CODE</i> - Sort by DiscountCoupon.Code property</ li > <li><i>IS_REUSABLE</i> - Sort by DiscountCoupon.IsReusable property</ li > <li><i>DISCOUNT_COUPON_TYPE</i> - Sort by DiscountCoupon.DiscountCouponType property</ li > <li><i>VALID_TO</i> - Sort by DiscountCoupon.ValidTo property</ li > <li><i>IS_ACTIVE</i> - Sort by DiscountCoupon.IsActive property</ li > <li><i>DISCOUNT_VALUE</i> - Sort by discount value</ li > <li><i>CREATION_DATE</i> - Sort by creation data</ li > <li><i>APPLICABLE_VALUE_FROM</i> - Sort by value of basket since from the coupon is applicable from</ li > </ul> */
export enum VinistoHelperDllEnumsDiscountCouponSortableColumns {
  ID = "ID",
  CODE = "CODE",
  IS_REUSABLE = "IS_REUSABLE",
  DISCOUNT_COUPON_TYPE = "DISCOUNT_COUPON_TYPE",
  VALID_TO = "VALID_TO",
  IS_ACTIVE = "IS_ACTIVE",
  DISCOUNT_VALUE = "DISCOUNT_VALUE",
  CREATION_DATE = "CREATION_DATE",
  APPLICABLE_VALUE_FROM = "APPLICABLE_VALUE_FROM",
}

/** Contains list of possible limitation types for Discount coupon<p>Members:</p><ul><li><i>NO_LIMITATION</i> - Coupon has not any limitation</ li > <li><i>CATEGORY_LIMITATION</i> - Coupon is limited to specific category</ li > <li><i>SPECIFICATION_LIMITATION</i> - Coupon is limited to specific specification</ li > <li><i>SUPPLIER_LIMITATION</i> - Coupon is limited to specific supplier</ li > </ul> */
export enum VinistoHelperDllEnumsDiscountCouponLimitationType {
  NO_LIMITATION = "NO_LIMITATION",
  CATEGORY_LIMITATION = "CATEGORY_LIMITATION",
  SPECIFICATION_LIMITATION = "SPECIFICATION_LIMITATION",
  SUPPLIER_LIMITATION = "SUPPLIER_LIMITATION",
}

/** Contains list of possible types Order API - Discount coupon.<p>Members:</p><ul><li><i>AMOUNT</i> - Coupon specifies exact discount in money.</ li > <li><i>PERCENTAGE</i> - Coupon specifies discount by percentage from the order.</ li > <li><i>GIFT</i> - Gift coupon in money.</ li > </ul> */
export enum VinistoHelperDllEnumsDiscountCouponDiscountCouponType {
  AMOUNT = "AMOUNT",
  PERCENTAGE = "PERCENTAGE",
  GIFT = "GIFT",
}

/** <p>Members:</p><ul></ul> */
export enum VinistoHelperDllEnumsDeliveryAndPaymentPlatform {
  B2C = "B2c",
  B2B = "B2b",
  Admin = "Admin",
}

/** Contains list of possible columns for sorting<p>Members:</p><ul></ul> */
export enum VinistoHelperDllEnumsDeliverySortableColumns {
  ID = "ID",
  NAME = "NAME",
  MIN_ALLOWED_WEIGHT = "MIN_ALLOWED_WEIGHT",
  MAX_ALLOWED_WEIGHT = "MAX_ALLOWED_WEIGHT",
  DELIVERY_TYPE = "DELIVERY_TYPE",
  IS_ACTIVE = "IS_ACTIVE",
  ORDER = "ORDER",
}

/** Currency<p>Members:</p><ul><li><i>CZK</i> - Czech crown</ li > <li><i>EUR</i> - Euro</ li > <li><i>USD</i> - US Dollar</ li > </ul> */
export enum VinistoHelperDllEnumsCurrency {
  CZK = "CZK",
  EUR = "EUR",
  USD = "USD",
}

/** Contains list of possible crons in order api<p>Members:</p><ul><li><i>CHECK_DELIVERY</i> - Check delivery cron</ li > </ul> */
export enum VinistoHelperDllEnumsCronOrderApiCronType {
  CHECK_DELIVERY = "CHECK_DELIVERY",
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
export enum VinistoHelperDllEnumsContractWithdrawalRequestSortableColumns {
  Id = "Id",
  Date = "Date",
}

/** <p>Members:</p><ul></ul> */
export enum VinistoHelperDllEnumsContractWithdrawalRequestContractWithdrawalRequestState {
  Created = "Created",
  InReview = "InReview",
  Approved = "Approved",
  Rejected = "Rejected",
  Resolved = "Resolved",
}

/** <p>Members:</p><ul></ul> */
export enum VinistoHelperDllEnumsContractWithdrawalRequestContractWithdrawalRequestSource {
  PublicForm = "PublicForm",
  OrderDetail = "OrderDetail",
}

/** <p>Members:</p><ul></ul> */
export enum VinistoHelperDllEnumsContractWithdrawalRequestContractWithdrawalRequestCustomerType {
  LoggedUser = "LoggedUser",
  Guest = "Guest",
}

/** <p>Members:</p><ul></ul> */
export enum VinistoHelperDllEnumsContractWithdrawalRequestContractWithdrawalRequestChangeState {
  InReview = "InReview",
  Approved = "Approved",
  Rejected = "Rejected",
  Resolved = "Resolved",
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

/** Contains list of possible columns for sorting<p>Members:</p><ul></ul> */
export enum VinistoHelperDllEnumsBillingSortableColumns {
  ID = "ID",
  BILLING_NUMBER = "BILLING_NUMBER",
  BILLING_PERIOD = "BILLING_PERIOD",
  CREATION_DATE = "CREATION_DATE",
  TOTAL_PRICE = "TOTAL_PRICE",
  STATE = "STATE",
  SUPPLIER_NAME = "SUPPLIER_NAME",
}

/** Contains list of possible billing states<p>Members:</p><ul><li><i>CREATED</i> - Created</ li > <li><i>IN_ISSUE</i> - In issue</ li > <li><i>PAYMENT_IN_PROCCESS</i> - Payment in proccess</ li > <li><i>PAID</i> - Paid</ li > <li><i>CANCELLED</i> - Cancelled</ li > </ul> */
export enum VinistoHelperDllEnumsBillingBillingState {
  CREATED = "CREATED",
  IN_ISSUE = "IN_ISSUE",
  PAYMENT_IN_PROCCESS = "PAYMENT_IN_PROCCESS",
  PAID = "PAID",
  CANCELLED = "CANCELLED",
}

/** All possible change types published to B2b.<p>Members:</p><ul></ul> */
export enum VinistoHelperDllEnumsB2BChangeType {
  BUNDLE = "BUNDLE",
  WAREHOUSE = "WAREHOUSE",
}

/** Type of trigger<p>Members:</p><ul><li><i>NEW_USER_REGISTRATION</i> - Fire trigger after new user registration</ li > <li><i>NEXT_ORDER</i> - Fire trigger after create order</ li > <li><i>MANUAL</i> - Coupon created manually from admin. This type not fire any further action.</ li > </ul> */
export enum VinistoHelperDllEnumsAutomaticCouponTriggerType {
  NEW_USER_REGISTRATION = "NEW_USER_REGISTRATION",
  NEXT_ORDER = "NEXT_ORDER",
  MANUAL = "MANUAL",
}

/** Contains list of possible columns for sorting<p>Members:</p><ul><li><i>ID</i> - Sort by AutomaticCoupon.Id property</ li > <li><i>NAME</i> - Sort by AutomaticCoupon.Name property</ li > <li><i>DISCOUNT_TYPE</i> - Sort by AutomaticCoupon.DiscountType property</ li > <li><i>DISCOUNT_VALUE</i> - Sort by AutomaticCoupon.DiscountValue property</ li > <li><i>CURRENCY</i> - Sort by AutomaticCoupon.Currency property</ li > <li><i>APPLICABLE_FROM</i> - Sort by AutomaticCoupon.ApplicableFrom property</ li > <li><i>LANGUAGE</i> - Sort by AutomaticCoupon.Language property</ li > <li><i>EXPIRATION_DAYS</i> - Sort by AutomaticCoupon.ExpirationDays property</ li > <li><i>TRIGGER</i> - Sort by AutomaticCoupon.Trigger property</ li > </ul> */
export enum VinistoHelperDllEnumsAutomaticCouponSortableColumns {
  ID = "ID",
  NAME = "NAME",
  DISCOUNT_TYPE = "DISCOUNT_TYPE",
  DISCOUNT_VALUE = "DISCOUNT_VALUE",
  CURRENCY = "CURRENCY",
  APPLICABLE_FROM = "APPLICABLE_FROM",
  LANGUAGE = "LANGUAGE",
  EXPIRATION_DAYS = "EXPIRATION_DAYS",
  TRIGGER = "TRIGGER",
}

/** <p>Members:</p><ul></ul> */
export enum VinistoHelperDllEnumsAddonUxActionType {
  DisableSlovakiaCompanyId = "DisableSlovakiaCompanyId",
}

/** <p>Members:</p><ul></ul> */
export enum VinistoHelperDllEnumsAddonOperator {
  None = "None",
  And = "And",
  Or = "Or",
}

/** Contains list of possible basket addon types.<p>Members:</p><ul></ul> */
export enum VinistoHelperDllEnumsAddonAddonType {
  None = "None",
  Gift = "Gift",
  Service = "Service",
  Upsell = "Upsell",
  SubscriptionMonth = "SubscriptionMonth",
  SubscriptionYear = "SubscriptionYear",
  Ux = "Ux",
  RelatedProduct = "RelatedProduct",
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
        | VinistoApplicationLogDllModelsApiApplicationLogBundleApplicationLog
        | VinistoApplicationLogDllModelsApiApplicationLogContractWithdrawalRequestApplicationLog
        | VinistoApplicationLogDllModelsApiApplicationLogOrderApplicationLog
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
  user?:
    | VinistoAuthDllModelsApiUserBaseBuyerUser
    | VinistoAuthDllModelsApiUserCompany
    | VinistoAuthDllModelsApiUserMerchant
    | VinistoAuthDllModelsApiUserUser
    | null;
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

export type VinistoApplicationLogDllModelsApiApplicationLogContractWithdrawalRequestApplicationLog =
  VinistoApplicationLogDllModelsApiApplicationLogBaseApplicationLog & {
    state: VinistoHelperDllEnumsContractWithdrawalRequestContractWithdrawalRequestState;
  };

export type VinistoApplicationLogDllModelsApiApplicationLogOrderApplicationLog =
  VinistoApplicationLogDllModelsApiApplicationLogBaseApplicationLog & {
    orderState?: VinistoHelperDllEnumsOrderOrderState | null;
    emailTemplate?: string | null;
    emailData?: string | null;
  };

export interface VinistoAuthDllModelsApiBillingInfoBillingInfo {
  /** @minLength 1 */
  id: string;
  /** @minLength 1 */
  name: string;
  /** @minLength 1 */
  surname: string;
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
  /** @minLength 1 */
  phone: string;
  email?: string | null;
  note?: string | null;
  title?: string | null;
  /** Identifies type of the country */
  countryCode: VinistoHelperDllEnumsCountryCode;
}

export type VinistoAuthDllModelsApiUserBaseBuyerUser =
  VinistoAuthDllModelsApiUserBaseUser & {
    isAgreementCC?: boolean;
    /** @format int64 */
    agreementCCTime?: number | null;
    isNewsletterActive?: boolean;
    /** @format int64 */
    isNewsletterActiveTime?: number | null;
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
    billingAddress?: VinistoAuthDllModelsApiBillingInfoBillingInfo | null;
    agreementCCNote?: string | null;
    validationData?: VinistoAuthDllModelsApiUserCompanyValidationData | null;
  };

export interface VinistoAuthDllModelsApiUserCompanyUser {
  userId?: string | null;
  /** Identifies company user rights. */
  right?: VinistoHelperDllEnumsUserCompanyCompanyUserRights;
  companyUserDetail?: VinistoAuthDllModelsApiUserCompanyUserDetail | null;
}

export interface VinistoAuthDllModelsApiUserCompanyUserDetail {
  firstName?: string | null;
  surname?: string | null;
  phone?: string | null;
  email?: string | null;
}

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
    billingAddress?: VinistoAuthDllModelsApiBillingInfoBillingInfo | null;
  };

export type VinistoAuthDllModelsApiUserUser =
  VinistoAuthDllModelsApiUserBaseBuyerUser & {
    suppliers: VinistoSupplierDllModelsApiSupplierSupplier[];
  };

export interface VinistoCommonDllModelsApiCouponLimitationsBaseLimitationDefinition {
  /** Contains list of possible limitation types for Discount coupon */
  limitationType?: VinistoHelperDllEnumsDiscountCouponLimitationType;
}

export type VinistoCommonDllModelsApiCouponLimitationsLimitationDefinitionCategory =
  VinistoCommonDllModelsApiCouponLimitationsBaseLimitationDefinition & {
    categoryId?: string | null;
  };

export type VinistoCommonDllModelsApiCouponLimitationsLimitationDefinitionNone =
  VinistoCommonDllModelsApiCouponLimitationsBaseLimitationDefinition & object;

export type VinistoCommonDllModelsApiCouponLimitationsLimitationDefinitionSpecification =
  VinistoCommonDllModelsApiCouponLimitationsBaseLimitationDefinition & {
    specification?:
      | VinistoCommonDllModelsApiSpecificationsCheckBoxSpecification
      | VinistoCommonDllModelsApiSpecificationsComboBoxSpecification
      | VinistoCommonDllModelsApiSpecificationsDecimalNumberSpecification
      | VinistoCommonDllModelsApiSpecificationsMultiComboBoxSpecification
      | VinistoCommonDllModelsApiSpecificationsNumberSpecification
      | VinistoCommonDllModelsApiSpecificationsStringSpecification
      | VinistoCommonDllModelsApiSpecificationsTextSpecification
      | null;
  };

export type VinistoCommonDllModelsApiCouponLimitationsLimitationDefinitionSupplier =
  VinistoCommonDllModelsApiCouponLimitationsBaseLimitationDefinition & {
    supplierId?: string | null;
    supplierName?: string | null;
  };

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

/**
 * Represents a action log
 * IMPORTANT!!! - changing this object please increase model version of this or main mongo object and create Migration!
 */
export type VinistoMongoConnectorModelsApplicationLogBaseApplicationLog =
  VinistoMongoConnectorModelsBaseMongoObject & {
    /** ItemId */
    itemId?: string | null;
    /** User ID who executes this action */
    executorUserId?: string | null;
    /**
     * Time of the log - timestamp in seconds from 1.1.1970
     * @format int64
     */
    time?: number;
    /** The action which is logged */
    action?: VinistoHelperDllEnumsActionLogApplicationLogType;
  };

/** Represents a action log for bundle */
export type VinistoMongoConnectorModelsApplicationLogBundleApplicationLog =
  VinistoMongoConnectorModelsApplicationLogBaseApplicationLog & {
    /**
     * New price value
     * @format double
     */
    newPriceValue?: number | null;
    /** New price vat rate */
    newPriceVat?: VinistoHelperDllEnumsVatRate | null;
    /** New price vat rate */
    newPriceCurrency?: VinistoHelperDllEnumsCurrency | null;
    /** Price discount type. If null, then price type is standard. */
    priceDiscountType?: VinistoHelperDllEnumsPriceDiscountType | null;
    /** Price level */
    priceLevel?: VinistoHelperDllEnumsPriceLevel | null;
    /**
     * Old price value
     * @format double
     */
    oldPriceValue?: number | null;
    /** Old price vat rate */
    oldPriceVat?: VinistoHelperDllEnumsVatRate | null;
    /** Old price vat rate */
    oldPriceCurrency?: VinistoHelperDllEnumsCurrency | null;
    /** Bundle name - populated when loading logs */
    name?: string | null;
  };

/** Represents a action log for contract withdrawal request. */
export type VinistoMongoConnectorModelsApplicationLogContractWithdrawalRequestLog =
  VinistoMongoConnectorModelsApplicationLogBaseApplicationLog & {
    state?: VinistoHelperDllEnumsContractWithdrawalRequestContractWithdrawalRequestState;
  };

/** Represents a action log for order */
export type VinistoMongoConnectorModelsApplicationLogOrderApplicationLog =
  VinistoMongoConnectorModelsApplicationLogBaseApplicationLog & {
    /** Order state */
    orderState?: VinistoHelperDllEnumsOrderOrderState | null;
    /** Email template name */
    emailTemplate?: string | null;
    /** Email body */
    emailData?: string | null;
  };

/**
 * Represents automatic discount coupon
 * IMPORTANT!!! - changing this object please increase model version of this or main mongo object and create Migration!
 */
export type VinistoMongoConnectorModelsAutomaticCouponAutomaticCoupon =
  VinistoMongoConnectorModelsBaseMongoObject & {
    /** Name */
    name?: string | null;
    /** Normalized name used for autocomplete and sorting */
    nameNormalized?: string | null;
    /**
     * Minimal price of order. Is used to check rule after order payment.
     * @format double
     */
    minOrderPrice?: number | null;
    /**
     * Maximal price of order. Is used to check rule after order payment.
     * @format double
     */
    maxOrderPrice?: number | null;
    /** Contains trigger attributes. */
    trigger?: VinistoMongoConnectorModelsAutomaticCouponTrigger | null;
    /** Discount type */
    discountType?: VinistoHelperDllEnumsDiscountCouponDiscountCouponType;
    /**
     * Discount value
     * @format double
     */
    discountValue?: number;
    /** Basket price currency */
    currency?: VinistoHelperDllEnumsCurrency;
    /** Country of sale */
    countryOfSale?: VinistoHelperDllEnumsCountryCode;
    /** Language */
    language?: VinistoHelperDllEnumsLanguage;
    /**
     * Day count to coupon expiration
     * @format int32
     */
    expirationDays?: number;
    /**
     * Minimal price of basket to coupon application. When is set to 0, coupon si unlimited.
     * @format double
     */
    applicableFrom?: number | null;
    /** Can be combined with other coupons - true if is combinable */
    isCombinable?: boolean;
    /** Can be used for discounted items - true if can be used for discounted items */
    isForDiscountedItems?: boolean;
    /** Limitation definition */
    limitationDefinition?:
      | VinistoMongoConnectorModelsCommonLimitationsLimitationDefinitionCategory
      | VinistoMongoConnectorModelsCommonLimitationsLimitationDefinitionNone
      | VinistoMongoConnectorModelsCommonLimitationsLimitationDefinitionSpecification
      | VinistoMongoConnectorModelsCommonLimitationsLimitationDefinitionSupplier
      | null;
  };

/**
 * Represents automatic coupon trigger information.
 * IMPORTANT!!! - changing this object please increase model version of this or main mongo object and create Migration!
 */
export interface VinistoMongoConnectorModelsAutomaticCouponTrigger {
  /** Type of trigger */
  type?: VinistoHelperDllEnumsAutomaticCouponTriggerType;
  /**
   * Can be used to delay discount coupon creation process (in hours).
   * @format int32
   */
  delay?: number;
}

/**
 * Represents base mongo object which has its own collection
 * IMPORTANT!!! - changing this object please increase model version of this or main mongo object and create Migration!
 */
export interface VinistoMongoConnectorModelsBaseMongoObject {
  /** Id of the mongo object */
  id?: string | null;
  /**
   * Version of respective entity model. Used for migrations
   * @format int32
   */
  version?: number;
  extraElements?: Record<string, any>;
  /**
   * Created time for all objects
   * @format int64
   */
  createdAt?: number;
  /**
   * Updated time for all objects
   * @format int64
   */
  updatedAt?: number;
}

/**
 * Represents billing.
 * IMPORTANT!!! - changing this object please increase model version of this or main mongo object and create Migration!
 */
export type VinistoMongoConnectorModelsBillingBilling =
  VinistoMongoConnectorModelsBaseMongoObject & {
    /** Number of the billing */
    billingNumber?: string | null;
    /** Number of the invoice */
    invoiceNumber?: string | null;
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
    /** Supplier ID */
    supplierId?: string | null;
    /** State of the billing */
    state?: VinistoHelperDllEnumsBillingBillingState;
    /**
     * Sum of all prices without Vat
     * @format double
     */
    totalSum?: number;
    /** List of fee record ids */
    feeRecords?: string[] | null;
    /** URL to billing PDF document */
    billingPdf?: string | null;
    /** URL to invoice PDF document */
    invoicePdf?: string | null;
    /** List of bundles with total SUMs */
    bundles?: VinistoMongoConnectorModelsBillingBundle[] | null;
    /** List of discounts grouped by vat */
    discounts?: VinistoMongoConnectorModelsBillingDiscount[] | null;
    /**
     * Sum of fee to VINISTO for discounts created by suppplier
     * @format double
     */
    totalSellerDiscount?: number;
    /**
     * Sum of yield to supplier for discounts created by VINISTO
     * @format double
     */
    totalVinistoDiscount?: number;
    /**
     * Sum of bundles total profit + supplier discounts
     * @format double
     */
    totalSellerProfit?: number;
    /**
     * Sum of bundles total sale fee + abs value of supplier discounts
     * @format double
     */
    totalVinistoFeeSale?: number;
    /**
     * Sum of bundles total logistics fee
     * @format double
     */
    totalVinistoFeeLogistics?: number;
    /**
     * Sum of bundles total fee + abs value of supplier discounts
     * @format double
     */
    totalVat?: number;
    /**
     * Sum of bundles total fee + abs value of supplier discounts
     * @format double
     */
    totalSellerProfitWithVat?: number;
    /** List of bundles on the way (not paid and generated fee record) */
    bundlesOnTheWay?:
      | (
          | VinistoMongoConnectorModelsBillingBundleBaseData
          | VinistoMongoConnectorModelsBillingBundle
        )[]
      | null;
  };

/** Represents Bundle in Billing. */
export type VinistoMongoConnectorModelsBillingBundle =
  VinistoMongoConnectorModelsBillingBundleBaseData & {
    /**
     * Sum of prices without VAT
     * @format double
     */
    sumPrice?: number;
    /**
     * Sum sale fee.
     * @format double
     */
    sumFeeSale?: number;
    /**
     * Sum logistics fee.
     * @format double
     */
    sumFeeLogistics?: number;
    /**
     * Sum Fee
     * @format double
     */
    sumFee?: number;
    /**
     * Fee percentage
     * @format double
     */
    percentFee?: number;
    /**
     * Fix fee
     * @format double
     */
    fixFee?: number;
    /**
     * Total profit. Is counted as SumPrice - SumFee.
     * @format double
     */
    totalProfit?: number;
    /**
     * Price
     * @format double
     */
    itemPrice?: number;
    /** Vat rate */
    vat?: VinistoHelperDllEnumsVatRate;
    /**
     * Price with vat
     * @format double
     */
    priceVat?: number;
    /**
     * Total Vat price
     * @format double
     */
    totalPriceVat?: number;
    /**
     * Total profit with Vat
     * @format double
     */
    totalProfitWithVat?: number;
    /** Sell type */
    sellType?: VinistoHelperDllEnumsFeeRecordFeeRecordType;
    wmsIds?: string[] | null;
    /** @format double */
    sellerDiscount?: number;
    /** @format double */
    vinistoDiscount?: number;
    /**
     * Platform for distinguishing B2C, B2B, etc. sales
     * @format int32
     */
    platform?: number;
    feeRuleNames?: string[] | null;
  };

export interface VinistoMongoConnectorModelsBillingBundleBaseData {
  id?: string | null;
  name?: VinistoMongoConnectorModelsMultiLangValue[] | null;
  /** @format int32 */
  soldPcs?: number;
  bundleLot?: string | null;
}

/** Represents Total discount from price and coupons grouped by vat */
export interface VinistoMongoConnectorModelsBillingDiscount {
  /**
   * Total value without vat
   * @format double
   */
  totalValue?: number;
  /** Vat rate */
  vat?: VinistoHelperDllEnumsVatRate;
  /**
   * Vat value
   * @format double
   */
  vatValue?: number;
  /**
   * Total value with Vat
   * @format double
   */
  totalValueWithVat?: number;
}

/**
 * Represents last number for generate billing number.
 * IMPORTANT!!! - changing this object please increase model version of this or main mongo object and create Migration!
 */
export type VinistoMongoConnectorModelsBillingNumberBillingNumber =
  VinistoMongoConnectorModelsBaseMongoObject & {
    /**
     * Our last number for generate order number
     * @format int32
     */
    lastNumber?: number;
  };

/**
 * Represents bundle
 * IMPORTANT!!! - changing this object please increase model version of this or main mongo object and create Migration!
 */
export type VinistoMongoConnectorModelsBundleBundle =
  VinistoMongoConnectorModelsBaseMongoObject & {
    /** Name of the bundle - list containing language versions */
    name?: VinistoMongoConnectorModelsMultiLangValue[] | null;
    /** Normalized name used for autocomplete */
    nameNormalized?: VinistoMongoConnectorModelsMultiLangValue[] | null;
    /** Description of the bundle - list containing language versions */
    description?: VinistoMongoConnectorModelsMultiLangValue[] | null;
    /** Meta Description (first 160 description characters) of the bundle - list containing language versions */
    metaDescription?: VinistoMongoConnectorModelsMultiLangValue[] | null;
    /** Short description of the bundle - list containing language versions */
    shortDescription?: VinistoMongoConnectorModelsMultiLangValue[] | null;
    /** Long text of the bundle - list containing language versions */
    text?: VinistoMongoConnectorModelsMultiLangValue[] | null;
    /** Url of the bundle - list containing language versions */
    url?: VinistoMongoConnectorModelsMultiLangValue[] | null;
    /** Price of the bundle - list containing various currency. */
    prices?:
      | (
          | VinistoMongoConnectorModelsCommonPricesPrice
          | VinistoMongoConnectorModelsCommonPricesOrderConditionPrice
        )[]
      | null;
    /**
     * Lowest known price for this bundle on the internet.
     * @format double
     */
    lowestInternetPrice?: number | null;
    /** Possible price discounts for this bundle. */
    priceDiscounts?:
      | (
          | VinistoMongoConnectorModelsCommonPricesLockPriceDiscount
          | VinistoMongoConnectorModelsCommonPricesOrderConditionPrice
          | VinistoMongoConnectorModelsCommonPricesPrice
          | VinistoMongoConnectorModelsCommonPricesPriceDiscountSet
          | VinistoMongoConnectorModelsCommonPricesPriceDiscountSupplier
          | VinistoMongoConnectorModelsCommonPricesPriceDiscountVinisto
          | VinistoMongoConnectorModelsCommonPricesPriceDiscountVolume
          | VinistoMongoConnectorModelsCommonPricesTimeLimitedPriceDiscount
        )[]
      | null;
    /** Items of the bundle - list containing product definition or bundle definition if bundle is set */
    items?:
      | (
          | VinistoMongoConnectorModelsBundleItemsBundleItem
          | VinistoMongoConnectorModelsBundleItemsProductItem
        )[]
      | null;
    /** Alternative bundles - list containing bundle id as string. */
    alternativeBundles?: string[] | null;
    /** Enabled flag - true if bundle enabled. */
    isEnabled?: boolean;
    /** Deleted flag - true if bundle deleted. */
    isDeleted?: boolean;
    /** Tags - list containing tags for this bundle. */
    tags?: VinistoMongoConnectorModelsBundleTag[] | null;
    /** Categories of the bundle (product) - list of ids. */
    categories?: string[] | null;
    /**
     * Unix datetime of last open of bundle via URL
     * @format int64
     */
    lastView?: number | null;
    /** Specifications - list containing specifications id and value as list. */
    specifications?:
      | (
          | VinistoMongoConnectorModelsSpecificationCheckBoxSpecificationValue
          | VinistoMongoConnectorModelsSpecificationComboBoxSpecificationValue
          | VinistoMongoConnectorModelsSpecificationDecimalNumberImperialSpecificationValue
          | VinistoMongoConnectorModelsSpecificationDecimalNumberSpecificationValue
          | VinistoMongoConnectorModelsSpecificationMultiComboBoxSpecificationValue
          | VinistoMongoConnectorModelsSpecificationNumberImperialSpecificationValue
          | VinistoMongoConnectorModelsSpecificationNumberSpecificationValue
          | VinistoMongoConnectorModelsSpecificationTextSpecificationValue
        )[]
      | null;
    /** Supplier - supplier id as string */
    supplierId?: string | null;
    /** Delivery flag - true if for bundle is delivery free. */
    isDeliveryFree?: boolean;
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
    /** Object that limits number of pieces bundle per one order in time range */
    orderLimitation?: VinistoMongoConnectorModelsBundleOrderLimitation | null;
    /** Keywords */
    keywords?: VinistoMongoConnectorModelsCommonMultiLangValues[] | null;
    /** Flag to specify bundle with one product or with set of products */
    isSet?: boolean;
    /** CanSendToWms flag - false if bundle is intangible goods. */
    canSendToWms?: boolean;
    /** Flag to set bundle state sale is over */
    isSaleOver?: boolean;
    /**
     * Number of pieces per package
     * @format int32
     */
    piecesPerPackage?: number;
    /**
     * Number of packages on pallet
     * @format int32
     */
    packagesOnPallet?: number;
    /** Allowed country codes */
    allowedCountries?: VinistoHelperDllEnumsCountryCode[] | null;
    setType?: VinistoHelperDllEnumsBundleSetType;
    states?: VinistoHelperDllEnumsBundleBundleState[] | null;
    /** IsApproved flag - false if bundle is not approve. */
    isApproved?: boolean;
    /** Bundle is available on these platforms */
    availableOnPlatforms?: number[] | null;
    /** Product. Used for join */
    product?: VinistoMongoConnectorModelsProductProduct | null;
    /** Item */
    item?:
      | VinistoMongoConnectorModelsBundleItemsBundleItem
      | VinistoMongoConnectorModelsBundleItemsProductItem
      | null;
    /**
     * Item
     * @format int32
     */
    availableCount?: number | null;
    /** Represents common price object. */
    price?:
      | VinistoMongoConnectorModelsCommonPricesPrice
      | VinistoMongoConnectorModelsCommonPricesOrderConditionPrice
      | null;
    /** Represents base price object. */
    discountPrice?:
      | VinistoMongoConnectorModelsCommonPricesLockPriceDiscount
      | VinistoMongoConnectorModelsCommonPricesOrderConditionPrice
      | VinistoMongoConnectorModelsCommonPricesPrice
      | VinistoMongoConnectorModelsCommonPricesPriceDiscountSet
      | VinistoMongoConnectorModelsCommonPricesPriceDiscountSupplier
      | VinistoMongoConnectorModelsCommonPricesPriceDiscountVinisto
      | VinistoMongoConnectorModelsCommonPricesPriceDiscountVolume
      | VinistoMongoConnectorModelsCommonPricesTimeLimitedPriceDiscount
      | null;
    /** Represents common price object. */
    defaultPrice?:
      | VinistoMongoConnectorModelsCommonPricesPrice
      | VinistoMongoConnectorModelsCommonPricesOrderConditionPrice
      | null;
    /** Represents base price object. */
    defaultDiscountPrice?:
      | VinistoMongoConnectorModelsCommonPricesLockPriceDiscount
      | VinistoMongoConnectorModelsCommonPricesOrderConditionPrice
      | VinistoMongoConnectorModelsCommonPricesPrice
      | VinistoMongoConnectorModelsCommonPricesPriceDiscountSet
      | VinistoMongoConnectorModelsCommonPricesPriceDiscountSupplier
      | VinistoMongoConnectorModelsCommonPricesPriceDiscountVinisto
      | VinistoMongoConnectorModelsCommonPricesPriceDiscountVolume
      | VinistoMongoConnectorModelsCommonPricesTimeLimitedPriceDiscount
      | null;
  };

/** Represents base item object to specify bundle items by his type. */
export interface VinistoMongoConnectorModelsBundleItemsBaseItem {
  itemId?: string | null;
  /** @format int32 */
  amount?: number;
}

/** Represents Bundle item object containing bundle id, amount and price */
export type VinistoMongoConnectorModelsBundleItemsBundleItem =
  VinistoMongoConnectorModelsBundleItemsBaseItem & {
    id?: string | null;
  };

/** Represents Bundle item object containing product id and amount */
export type VinistoMongoConnectorModelsBundleItemsProductItem =
  VinistoMongoConnectorModelsBundleItemsBaseItem & object;

/**
 * Represents OrderLimitation object containing Limit, ValidFrom and ValidTo
 * IMPORTANT!!! - changing this object please increase model version of this or main mongo object and create Migration!
 */
export interface VinistoMongoConnectorModelsBundleOrderLimitation {
  /**
   * Maximum number of bundles in one order
   * @format int32
   */
  limit?: number;
  /**
   * Limit is valid from
   * @format int64
   */
  validFrom?: number;
  /**
   * Limit is valid to
   * @format int64
   */
  validTo?: number | null;
}

export interface VinistoMongoConnectorModelsBundleTag {
  /** Tag id for bundle. */
  tagId?: string | null;
  /** Allowed tag countries of sale for current bundle. */
  countriesOfSale?: VinistoHelperDllEnumsCountryCode[] | null;
}

/**
 * Represents category of a product.
 * IMPORTANT!!! - changing this object please increase model version of this or main mongo object and create Migration!
 */
export type VinistoMongoConnectorModelsCategoryCategory =
  VinistoMongoConnectorModelsBaseMongoObject & {
    /** Name of the category - list containing language versions */
    name?: VinistoMongoConnectorModelsMultiLangValue[] | null;
    /** Normalized name used for autocomplete */
    nameNormalized?: VinistoMongoConnectorModelsMultiLangValue[] | null;
    /** Description of the category - list containing language versions */
    description?: VinistoMongoConnectorModelsMultiLangValue[] | null;
    /** Url to category - list containing language versions */
    url?: VinistoMongoConnectorModelsMultiLangValue[] | null;
    /** Category type = STATIC / DYNAMIC */
    type?: VinistoHelperDllEnumsCategoryCategoryType;
    /** List of possible allowed specifications */
    specifications?:
      | (
          | VinistoMongoConnectorModelsCommonSpecificationsCheckBoxSpecification
          | VinistoMongoConnectorModelsCommonSpecificationsComboBoxSpecification
          | VinistoMongoConnectorModelsCommonSpecificationsDecimalNumberSpecification
          | VinistoMongoConnectorModelsCommonSpecificationsMultiComboBoxSpecification
          | VinistoMongoConnectorModelsCommonSpecificationsNumberSpecification
          | VinistoMongoConnectorModelsCommonSpecificationsStringSpecification
          | VinistoMongoConnectorModelsCommonSpecificationsTextSpecification
        )[]
      | null;
    /** Meta Description (first 160 description characters) of the category - list containing language versions */
    metaDescription?: VinistoMongoConnectorModelsMultiLangValue[] | null;
    /** Meta Title of the category - list containing language versions */
    metaTitle?: VinistoMongoConnectorModelsMultiLangValue[] | null;
    /** Keywords */
    keywords?: VinistoMongoConnectorModelsCommonMultiLangValues[] | null;
    /** Country codes for which this category is allowed to be searched in elasticsearch. */
    allowedSearchCountries?: VinistoHelperDllEnumsCountryCode[] | null;
    /** Id of the parent category */
    parentId?: string | null;
    /** Tags - list containing tags for this category. */
    tags?: VinistoMongoConnectorModelsCategoryTag[] | null;
    /** Suppliers */
    suppliers?: string[] | null;
    /** Category is available on these platforms */
    availableOnPlatforms?: number[] | null;
    /** Discount filter applied by default when listing bundles in this category. */
    bundleDiscountFilter?: VinistoHelperDllEnumsCategoryCategoryBundleDiscountFilter;
    /** List of parent categories */
    parents?: VinistoMongoConnectorModelsCategoryCategory[] | null;
  };

export interface VinistoMongoConnectorModelsCategoryTag {
  /** Tag id for category. */
  tagId?: string | null;
  /** Allowed tag countries of sale for current category. */
  countriesOfSale?: VinistoHelperDllEnumsCountryCode[] | null;
}

/**
 * Represents supplier certificate
 * IMPORTANT!!! - changing this object please increase model version of this or main mongo object and create Migration!
 */
export type VinistoMongoConnectorModelsCertificateCertificate =
  VinistoMongoConnectorModelsBaseMongoObject & {
    /** Id of the object the certificate is assigned to */
    objectId?: string | null;
    /** Url to get certificate */
    url?: string | null;
  };

/** Represents bundle item for cms article. */
export interface VinistoMongoConnectorModelsCmsArticleBundleItem {
  /** Id of the bundle */
  bundleId?: string | null;
  /**
   * Order on list of bundles
   * @format int32
   */
  order?: number;
}

/**
 * Represents cms article.
 * IMPORTANT!!! - changing this object please increase model version of this or main mongo object and create Migration!
 */
export type VinistoMongoConnectorModelsCmsArticleCmsArticle =
  VinistoMongoConnectorModelsBaseMongoObject & {
    /** Language of the article */
    language?: VinistoHelperDllEnumsLanguage;
    /** List of cms tag ids */
    tags?: string[] | null;
    /** List of specifications. Contains object with id, allowed values, etc.. */
    specifications?:
      | (
          | VinistoMongoConnectorModelsCommonSpecificationsCheckBoxSpecification
          | VinistoMongoConnectorModelsCommonSpecificationsComboBoxSpecification
          | VinistoMongoConnectorModelsCommonSpecificationsDecimalNumberSpecification
          | VinistoMongoConnectorModelsCommonSpecificationsMultiComboBoxSpecification
          | VinistoMongoConnectorModelsCommonSpecificationsNumberSpecification
          | VinistoMongoConnectorModelsCommonSpecificationsStringSpecification
          | VinistoMongoConnectorModelsCommonSpecificationsTextSpecification
        )[]
      | null;
    /** Title of the article */
    title?: string | null;
    /** Perex of the article */
    perex?: string | null;
    /** Meta description of the article */
    metaDescription?: string | null;
    /** Meta title of the article */
    metaTitle?: string | null;
    /** URL of the article */
    url?: string | null;
    /** Title image id of the article */
    titleImageId?: string | null;
    /** Body of the article */
    body?: string | null;
    /** List of bundle ids */
    bundles?: VinistoMongoConnectorModelsCmsArticleBundleItem[] | null;
    /** List of author ids */
    authors?: string[] | null;
    /**
     * Reading time in minutes of article
     * @format int32
     */
    readingTime?: number;
    /**
     * Date time to publish article
     * @format int64
     */
    publishDate?: number;
    /** State of the article */
    state?: VinistoHelperDllEnumsCmsArticleState;
    /** Type of carousel / listing */
    carouselListingType?: VinistoHelperDllEnumsCmsArticleCarouselListingType;
    /** Title of carousel / listing */
    carouselListingTitle?: string | null;
  };

/**
 * Represents author of a cms article.
 * IMPORTANT!!! - changing this object please increase model version of this or main mongo object and create Migration!
 */
export type VinistoMongoConnectorModelsCmsArticleAuthorCmsArticleAuthor =
  VinistoMongoConnectorModelsBaseMongoObject & {
    /** Name of the author */
    name?: string | null;
    /** Normalized name used for autocomplete */
    nameNormalized?: string | null;
  };

/**
 * Represents cms image in various sizes.
 * IMPORTANT!!! - changing this object please increase model version of this or main mongo object and create Migration!
 */
export type VinistoMongoConnectorModelsCmsImageCmsImage =
  VinistoMongoConnectorModelsBaseMongoObject & {
    /** Name of the image */
    name?: string | null;
    /** Normalized name used for autocomplete */
    nameNormalized?: string | null;
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
    urls?: Record<string, string>;
  };

/**
 * Represents tag of a product.
 * IMPORTANT!!! - changing this object please increase model version of this or main mongo object and create Migration!
 */
export type VinistoMongoConnectorModelsCmsImageTagCmsImageTag =
  VinistoMongoConnectorModelsBaseMongoObject & {
    /** Name of the tag - list containing language versions */
    name?: string | null;
    /** Normalized name used for autocomplete */
    nameNormalized?: string | null;
  };

/**
 * Represents cms tag
 * IMPORTANT!!! - changing this object please increase model version of this or main mongo object and create Migration!
 */
export type VinistoMongoConnectorModelsCmsTagCmsTag =
  VinistoMongoConnectorModelsBaseMongoObject & {
    /** Name of the cms tag - list containing language versions */
    name?: VinistoMongoConnectorModelsMultiLangValue[] | null;
    /** Normalized name used for autocomplete */
    nameNormalized?: VinistoMongoConnectorModelsMultiLangValue[] | null;
    /** Description of the cms tag - list containing language versions */
    description?: VinistoMongoConnectorModelsMultiLangValue[] | null;
    /** Metadescription of the cms tag - list containing language versions */
    metaDescription?: VinistoMongoConnectorModelsMultiLangValue[] | null;
    /** Meta title of the cms tag - list containing language versions */
    metaTitle?: VinistoMongoConnectorModelsMultiLangValue[] | null;
    /** Url of the cms tag - list containing language versions */
    url?: VinistoMongoConnectorModelsMultiLangValue[] | null;
  };

/**
 * Base class for Address
 * IMPORTANT!!! - changing this object please increase model version of this or main mongo object and create Migration!
 */
export type VinistoMongoConnectorModelsCommonBaseAddress =
  VinistoMongoConnectorModelsCommonPostalAddress & {
    /** Phone contact of the addressee */
    phone?: string | null;
    /** Email of the addressee */
    email?: string | null;
    /** Note to the address */
    note?: string | null;
    /** Title of the address */
    title?: string | null;
  };

/** Represents base discount coupon limitation definition. */
export interface VinistoMongoConnectorModelsCommonLimitationsBaseLimitationDefinition {
  /** Limitation type of Discount coupon */
  limitationType?: VinistoHelperDllEnumsDiscountCouponLimitationType;
}

/** Represents discount coupon with limitation to specific category. */
export type VinistoMongoConnectorModelsCommonLimitationsLimitationDefinitionCategory =
  VinistoMongoConnectorModelsCommonLimitationsBaseLimitationDefinition & {
    /** Limitation to category defined by id */
    categoryId?: string | null;
  };

/** Represents discount coupon with no limitation definition. */
export type VinistoMongoConnectorModelsCommonLimitationsLimitationDefinitionNone =
  VinistoMongoConnectorModelsCommonLimitationsBaseLimitationDefinition & object;

/** Represents discount coupon with limitation to specific specification. */
export type VinistoMongoConnectorModelsCommonLimitationsLimitationDefinitionSpecification =
  VinistoMongoConnectorModelsCommonLimitationsBaseLimitationDefinition & {
    /** Limitation to specification */
    specification?:
      | VinistoMongoConnectorModelsCommonSpecificationsCheckBoxSpecification
      | VinistoMongoConnectorModelsCommonSpecificationsComboBoxSpecification
      | VinistoMongoConnectorModelsCommonSpecificationsDecimalNumberSpecification
      | VinistoMongoConnectorModelsCommonSpecificationsMultiComboBoxSpecification
      | VinistoMongoConnectorModelsCommonSpecificationsNumberSpecification
      | VinistoMongoConnectorModelsCommonSpecificationsStringSpecification
      | VinistoMongoConnectorModelsCommonSpecificationsTextSpecification
      | null;
  };

/** Represents discount coupon with limitation to specific supplier. */
export type VinistoMongoConnectorModelsCommonLimitationsLimitationDefinitionSupplier =
  VinistoMongoConnectorModelsCommonLimitationsBaseLimitationDefinition & {
    /** Limitation to supplier defined by id */
    supplierId?: string | null;
  };

/**
 * Base class for objects which required to store values in various languages.
 * IMPORTANT!!! - changing this object please increase model version of this or main mongo object and create Migration!
 */
export interface VinistoMongoConnectorModelsCommonMultiLangValues {
  /** Language of the value */
  language?: VinistoHelperDllEnumsLanguage;
  /** Value */
  values?: string[] | null;
}

/**
 * Base class for Address
 * IMPORTANT!!! - changing this object please increase model version of this or main mongo object and create Migration!
 */
export interface VinistoMongoConnectorModelsCommonPostalAddress {
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

/** Represents base price object. */
export interface VinistoMongoConnectorModelsCommonPricesBasePrice {
  /** Price identifier used for unique identification of the price */
  priceId?: string | null;
  /** VatRate refer to enum of possible VatRate types. */
  vat?: VinistoHelperDllEnumsVatRate;
  /** Currency refer to enum of possible Currency types. */
  currency?: VinistoHelperDllEnumsCurrency;
  /** PriceLevel refer to enum of possible Price types. */
  level?: VinistoHelperDllEnumsPriceLevel;
  /**
   * PriceLevel refer to enum of possible Price types.
   * @format int32
   */
  platformId?: number;
}

/** Represents lock base price discount. */
export type VinistoMongoConnectorModelsCommonPricesLockPriceDiscount =
  VinistoMongoConnectorModelsCommonPricesTimeLimitedPriceDiscount & {
    /** Indicates if the discount is locked from price change via import. */
    isLocked?: boolean;
  };

/** Represents order condition price. */
export type VinistoMongoConnectorModelsCommonPricesOrderConditionPrice =
  VinistoMongoConnectorModelsCommonPricesPrice & {
    /**
     * Min order price for using of this price
     * @format double
     */
    minOrderPrice?: number;
    /**
     * Max order price for using of this price
     * @format double
     */
    maxOrderPrice?: number;
  };

/** Represents common price object. */
export type VinistoMongoConnectorModelsCommonPricesPrice =
  VinistoMongoConnectorModelsCommonPricesBasePrice & {
    /**
     * Value is price without VAT.
     * @format double
     */
    value?: number;
    /**
     * Price with VAT calculated from Value and VatRate.
     * @format double
     */
    valueWithVat?: number;
  };

/** Represents price discount for bundle set. */
export type VinistoMongoConnectorModelsCommonPricesPriceDiscountSet =
  VinistoMongoConnectorModelsCommonPricesTimeLimitedPriceDiscount & {
    /**
     * Value is price without VAT.
     * @format double
     */
    value?: number;
    /**
     * Price with VAT calculated from Value and VatRate.
     * @format double
     */
    valueWithVat?: number;
    /** Contains original and set price for each item in set. */
    values?: Record<
      string,
      VinistoMongoConnectorModelsCommonPricesSetItemPrice
    >;
  };

/** Represents price discount by supplier. */
export type VinistoMongoConnectorModelsCommonPricesPriceDiscountSupplier =
  VinistoMongoConnectorModelsCommonPricesLockPriceDiscount & {
    /**
     * Value is price without VAT.
     * @format double
     */
    value?: number;
    /**
     * Price with VAT calculated from Value and VatRate.
     * @format double
     */
    valueWithVat?: number;
  };

/** Represents price discount by vinisto. */
export type VinistoMongoConnectorModelsCommonPricesPriceDiscountVinisto =
  VinistoMongoConnectorModelsCommonPricesLockPriceDiscount & {
    /**
     * Value is price without VAT.
     * @format double
     */
    value?: number;
    /**
     * Price with VAT calculated from Value and VatRate.
     * @format double
     */
    valueWithVat?: number;
  };

/** Represents price discount by volume according to the quantity of goods purchased. */
export type VinistoMongoConnectorModelsCommonPricesPriceDiscountVolume =
  VinistoMongoConnectorModelsCommonPricesTimeLimitedPriceDiscount & {
    /** Values contain quantity and discount price without VAT for this quantity. */
    values?: Record<string, number>;
    /** Who pays the cost of the discount. True means supplier, false means vinisto. */
    isSupplierDiscount?: boolean;
  };

/** Represents discount price for set item. */
export interface VinistoMongoConnectorModelsCommonPricesSetItemPrice {
  /** Discounted set price of item. */
  setPrice?:
    | VinistoMongoConnectorModelsCommonPricesPrice
    | VinistoMongoConnectorModelsCommonPricesOrderConditionPrice
    | null;
  /** Original standard price of item. */
  originalPrice?:
    | VinistoMongoConnectorModelsCommonPricesPrice
    | VinistoMongoConnectorModelsCommonPricesOrderConditionPrice
    | null;
  /** Who pays the cost of the discount. True means supplier, false means vinisto. */
  isSupplierDiscount?: boolean;
}

/** Represents time limited base price discount. */
export type VinistoMongoConnectorModelsCommonPricesTimeLimitedPriceDiscount =
  VinistoMongoConnectorModelsCommonPricesBasePrice & {
    /**
     * Discount price valid from.
     * @format int64
     */
    validFrom?: number | null;
    /**
     * Discount price valid to.
     * @format int64
     */
    validTo?: number | null;
  };

/** Base specification filter */
export interface VinistoMongoConnectorModelsCommonSpecificationsBaseSpecification {
  /** Id of specification definition which this filter is connected to */
  definitionId?: string | null;
  /** Type */
  type?: VinistoHelperDllEnumsSpecificationSpecificationType;
}

/** Checkbox specification */
export type VinistoMongoConnectorModelsCommonSpecificationsCheckBoxSpecification =
  VinistoMongoConnectorModelsCommonSpecificationsBaseSpecification & {
    /** All allowed values for specification. */
    allowedValues?: boolean[] | null;
  };

/** ComboBox specification */
export type VinistoMongoConnectorModelsCommonSpecificationsComboBoxSpecification =
  VinistoMongoConnectorModelsCommonSpecificationsStringSpecification & object;

/** Decimal number specification */
export type VinistoMongoConnectorModelsCommonSpecificationsDecimalNumberSpecification =
  VinistoMongoConnectorModelsCommonSpecificationsBaseSpecification & {
    /** Is specification in imperial units */
    isImperial?: boolean;
    /** All allowed values for specification. */
    allowedValues?: number[] | null;
  };

/** MultiComboBox specification */
export type VinistoMongoConnectorModelsCommonSpecificationsMultiComboBoxSpecification =
  VinistoMongoConnectorModelsCommonSpecificationsStringSpecification & object;

/** Number specification */
export type VinistoMongoConnectorModelsCommonSpecificationsNumberSpecification =
  VinistoMongoConnectorModelsCommonSpecificationsBaseSpecification & {
    /** Is specification in imperial units */
    isImperial?: boolean;
    /** All allowed values for specification. */
    allowedValues?: number[] | null;
  };

/** String base specification */
export type VinistoMongoConnectorModelsCommonSpecificationsStringSpecification =
  VinistoMongoConnectorModelsCommonSpecificationsBaseSpecification & {
    /** Allowed values from combobox */
    allowedValues?: string[] | null;
  };

/** Text specification */
export type VinistoMongoConnectorModelsCommonSpecificationsTextSpecification =
  VinistoMongoConnectorModelsCommonSpecificationsStringSpecification & object;

export type VinistoMongoConnectorModelsContractWithdrawalRequestContractWithdrawalRequest =
  VinistoMongoConnectorModelsBaseMongoObject & {
    orderId?: string | null;
    orderNumber?: string | null;
    customerId?: string | null;
    customerEmail?: string | null;
    ipAddress?: string | null;
    userAgent?: string | null;
    customerFirstName?: string | null;
    customerSurname?: string | null;
    /**
     * Base class for Address
     * IMPORTANT!!! - changing this object please increase model version of this or main mongo object and create Migration!
     */
    customerAddress?:
      | VinistoMongoConnectorModelsCommonPostalAddress
      | VinistoMongoConnectorModelsUserAddress
      | VinistoMongoConnectorModelsUserBaseUserAddress
      | VinistoMongoConnectorModelsUserBillingInfo
      | VinistoMongoConnectorModelsSupplierAddress
      | VinistoMongoConnectorModelsOrderAddress
      | VinistoMongoConnectorModelsCommonBaseAddress
      | null;
    customerPhone?: string | null;
    bankAccount?: string | null;
    note?: string | null;
    source?: VinistoHelperDllEnumsContractWithdrawalRequestContractWithdrawalRequestSource;
    state?: VinistoHelperDllEnumsContractWithdrawalRequestContractWithdrawalRequestState;
    customerType?: VinistoHelperDllEnumsContractWithdrawalRequestContractWithdrawalRequestCustomerType;
    stateChangeRecords?:
      | VinistoMongoConnectorModelsContractWithdrawalRequestStateChangeRecord[]
      | null;
    internalNote?: string | null;
    processedBy?: string | null;
  };

export interface VinistoMongoConnectorModelsContractWithdrawalRequestStateChangeRecord {
  state?: VinistoHelperDllEnumsContractWithdrawalRequestContractWithdrawalRequestState;
  /** @format int64 */
  changeTime?: number;
  executorUserId?: string | null;
}

/**
 * Represents delivery.
 * IMPORTANT!!! - changing this object please increase model version of this or main mongo object and create Migration!
 */
export type VinistoMongoConnectorModelsDeliveryDelivery =
  VinistoMongoConnectorModelsBaseMongoObject & {
    /**
     * Name of the delivery - list containing language versions
     * Delivery name for second step in basket
     */
    name?: VinistoMongoConnectorModelsMultiLangValue[] | null;
    /** Normalized name used for searching */
    nameNormalized?: VinistoMongoConnectorModelsMultiLangValue[] | null;
    /**
     * Alternative name of the delivery - list containing language versions
     * Delivery name for productDetail and first step in basket
     */
    alternativeName?: VinistoMongoConnectorModelsMultiLangValue[] | null;
    /** Description of the delivery - list containing language versions */
    description?: VinistoMongoConnectorModelsMultiLangValue[] | null;
    /** Active flag - true if is active */
    isActive?: boolean;
    /**
     * Delivery time in days
     * @format int32
     */
    deliveryTime?: number;
    /** Delivery prices */
    prices?:
      | VinistoMongoConnectorModelsCommonPricesOrderConditionPrice[]
      | null;
    /**
     * Minimal allowed weight for this type of delivery [Kg]
     * @format double
     */
    minAllowedWeight?: number;
    /**
     * Maximal allowed weight for this type of delivery [Kg]
     * @format double
     */
    maxAllowedWeight?: number;
    /** Allowed country codes */
    countries?: VinistoHelperDllEnumsCountryCode[] | null;
    /** Allowed payments */
    payments?: string[] | null;
    /** Delivery type */
    deliveryType?: VinistoHelperDllEnumsOrderDeliveryType;
    /** Pickup point type */
    pickupPointType?: VinistoHelperDllEnumsOrderPickupPointType | null;
    /** Delivery code */
    deliveryCode?: string | null;
    /** Tracking URL string */
    trackingUrl?: string | null;
    /**
     * Order
     * @format int32
     */
    order?: number;
    /**
     * Delivery costs (without VAT) in CZK
     * @format double
     */
    costs?: number | null;
    /** Is for stocking flag - true if is for stocking */
    isForStocking?: boolean;
    /** Is for customer delivery flag - true if is for orders */
    isForCustomerDelivery?: boolean;
    /**
     * List of serving zip codes - this delivery delivers only to addresses with zip codes included in this list
     * If empty, all zip codes are served
     */
    servingZipCodes?: string[] | null;
    /** Delivery base type */
    deliveryBaseType?: VinistoHelperDllEnumsOrderDeliveryBaseType;
    /**
     * Order treshold time
     * @format date-span
     */
    orderTresholdTime?: string;
    /** "Is on product detail" flag - if true is viewed alternative delivery name in product detail and in first step in basket */
    isOnProductDetail?: boolean;
    /** Delivery note in language */
    note?: VinistoMongoConnectorModelsMultiLangValue[] | null;
    /** Is subscriber flag - true - delivery is free if user is subscriber */
    isSubscriber?: boolean;
    /** Contains allowed platforms. */
    allowedOnPlatforms?:
      | VinistoHelperDllEnumsDeliveryAndPaymentPlatform[]
      | null;
    isDeliveryOnSaturday?: boolean;
    isDeliveryOnSunday?: boolean;
  };

/**
 * Represent amount discount on order
 * IMPORTANT!!! - changing this object please increase model version of this or main mongo object and create Migration!
 */
export type VinistoMongoConnectorModelsDiscountCouponAmountDiscountCouponDefinition =
  VinistoMongoConnectorModelsDiscountCouponConditionalDiscountCouponDefinition & {
    /** Price value */
    amountDiscount?:
      | VinistoMongoConnectorModelsCommonPricesPrice
      | VinistoMongoConnectorModelsCommonPricesOrderConditionPrice
      | null;
  };

/**
 * Represents base specification definition.
 * IMPORTANT!!! - changing this object please increase model version of this or main mongo object and create Migration!
 */
export type VinistoMongoConnectorModelsDiscountCouponBaseDiscountCouponDefinition =
  VinistoMongoConnectorModelsBaseMongoObject & {
    /** Code of Discount coupon */
    code?: string | null;
    name?: VinistoMongoConnectorModelsMultiLangValue[] | null;
    shortDescription?: VinistoMongoConnectorModelsMultiLangValue[] | null;
    description?: VinistoMongoConnectorModelsMultiLangValue[] | null;
    /** @format int64 */
    validFrom?: number;
    /** @format int64 */
    validTo?: number;
    /** Active flag - true if is active */
    isActive?: boolean;
    /** Unit in language for all types */
    unit?: VinistoMongoConnectorModelsMultiLangValue | null;
    /** Contains trigger attributes from automatic coupon creation process. */
    trigger?: VinistoMongoConnectorModelsDiscountCouponTrigger | null;
    /** Basket price currency */
    currency?: VinistoHelperDllEnumsCurrency;
    /** Country of sale */
    countryOfSale?: VinistoHelperDllEnumsCountryCode;
  };

/** Represents base common conditions for discount coupons. */
export type VinistoMongoConnectorModelsDiscountCouponConditionalDiscountCouponDefinition =
  VinistoMongoConnectorModelsDiscountCouponBaseDiscountCouponDefinition & {
    /** Coupon allowed from order in amount from */
    allowedFrom?:
      | VinistoMongoConnectorModelsCommonPricesPrice
      | VinistoMongoConnectorModelsCommonPricesOrderConditionPrice
      | null;
    /** Active flag - true if is active */
    isReusable?: boolean;
    /** Can be combined with other coupons - true if is combinable */
    isCombinable?: boolean;
    /** Can be used for discounted items - true if can be used for discounted items */
    isForDiscountedItems?: boolean;
    /** Limitation definition */
    limitationDefinition?:
      | VinistoMongoConnectorModelsCommonLimitationsLimitationDefinitionCategory
      | VinistoMongoConnectorModelsCommonLimitationsLimitationDefinitionNone
      | VinistoMongoConnectorModelsCommonLimitationsLimitationDefinitionSpecification
      | VinistoMongoConnectorModelsCommonLimitationsLimitationDefinitionSupplier
      | null;
    /**
     * If true the discount is taken from supplier fee
     * If false the discount is taken from vinisto fee
     */
    isSupplierDiscount?: boolean;
    /**
     * If true discount coupon is visible on product detail
     * If false discount coupon is not visible on product detail
     */
    isVisibleOnProductDetail?: boolean;
    /** True if is visible in users section vinisto club. */
    isVisibleInUsersSection?: boolean;
    /** True if can be used for registered (logged in) users only. */
    isForRegisteredUsers?: boolean;
    /** Id of the dynamic category */
    categoryId?: string | null;
  };

/**
 * Represent gift coupon.
 * IMPORTANT!!! - changing this object please increase model version of this or main mongo object and create Migration!
 */
export type VinistoMongoConnectorModelsDiscountCouponGiftCouponDefinition =
  VinistoMongoConnectorModelsDiscountCouponBaseDiscountCouponDefinition & {
    /** Price value */
    amount?:
      | VinistoMongoConnectorModelsCommonPricesPrice
      | VinistoMongoConnectorModelsCommonPricesOrderConditionPrice
      | null;
  };

/**
 * Represent percentage discount on order
 * IMPORTANT!!! - changing this object please increase model version of this or main mongo object and create Migration!
 */
export type VinistoMongoConnectorModelsDiscountCouponPercentageDiscountCouponDefinition =
  VinistoMongoConnectorModelsDiscountCouponConditionalDiscountCouponDefinition & {
    /**
     * Percentage amount
     * @format double
     */
    percentageDiscount?: number;
  };

/**
 * Represents discount coupon trigger information.
 * IMPORTANT!!! - changing this object please increase model version of this or main mongo object and create Migration!
 */
export interface VinistoMongoConnectorModelsDiscountCouponTrigger {
  /** Type of trigger */
  type?: VinistoHelperDllEnumsAutomaticCouponTriggerType;
  /** User's email to which the discount coupon will be sent. */
  sentToEmail?: string | null;
  /**
   * Can be used to delay discount coupon creation process (in hours).
   * @format int32
   */
  delay?: number;
  /** Id of the object, which triggered discount coupon creation (OrderId, UserId...). */
  itemId?: string | null;
  /** If trigger was already executed, it's true, otherwise false. */
  isExecuted?: boolean;
}

/**
 * Represents Evaluation of a bundle.
 * IMPORTANT!!! - changing this object please increase model version of this or main mongo object and create Migration!
 */
export type VinistoMongoConnectorModelsEvaluationEvaluation =
  VinistoMongoConnectorModelsBaseMongoObject & {
    /** Evaluation text */
    text?: string | null;
    /** User that creates evaluation */
    createdUserId?: string | null;
    /** Product id of evaluation */
    productId?: string | null;
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
    /** Cteated by admin flag - true if yes, default false */
    createdByAdmin?: boolean;
  };

/**
 * Represents exchange rate history
 * IMPORTANT!!! - changing this object please increase model version of this or main mongo object and create Migration!
 */
export type VinistoMongoConnectorModelsExchangeRateHistoryExchangeRate =
  VinistoMongoConnectorModelsBaseMongoObject & {
    /** @format date */
    day?: string;
    /** Currency */
    currency?: VinistoHelperDllEnumsCurrency;
    /**
     * Only base exchange rate value. Is not directly used to prices computation.
     * @format double
     */
    value?: number;
    /**
     * Use for goods prices computation.
     * @format double
     */
    valueGoods?: number;
    /**
     * Use for discount coupon prices computation.
     * @format double
     */
    valueDiscountCoupons?: number;
    /** @format double */
    coefficient?: number;
  };

/**
 * Represents favorites
 * IMPORTANT!!! - changing this object please increase model version of this or main mongo object and create Migration!
 */
export type VinistoMongoConnectorModelsFavoriteFavorite =
  VinistoMongoConnectorModelsBaseMongoObject & {
    /** Id of logged user */
    userId?: string | null;
    /** Id of anonymous user */
    anonymousUserId?: string | null;
    /** List of items in the basket */
    items?: VinistoMongoConnectorModelsFavoriteFavoriteItem[] | null;
  };

/**
 * One item in the favorite
 * IMPORTANT!!! - changing this object please increase model version of this or main mongo object and create Migration!
 */
export interface VinistoMongoConnectorModelsFavoriteFavoriteItem {
  /** Id of the item */
  itemId?: string | null;
}

/** Discount for applied coupon for fee calculation purposes */
export interface VinistoMongoConnectorModelsFeeRecordDiscountCouponValue {
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
export type VinistoMongoConnectorModelsFeeRecordFeeRecord =
  VinistoMongoConnectorModelsBaseMongoObject & {
    /** Id of the supplier the fee record is connected to */
    supplierId?: string | null;
    /** Id of the bundle the fee record is connected to */
    bundleId?: string | null;
    /** Id of the order the fee record is connected to */
    orderId?: string | null;
    /**
     * Time of the record created - timestamp in seconds from 1.1.1970
     * @format int64
     */
    time?: number;
    /** Standard bundle price in time of order */
    originalPrice?:
      | VinistoMongoConnectorModelsCommonPricesPrice
      | VinistoMongoConnectorModelsCommonPricesOrderConditionPrice
      | null;
    /** Price of the item in this fee record */
    itemPrice?:
      | VinistoMongoConnectorModelsCommonPricesPrice
      | VinistoMongoConnectorModelsCommonPricesOrderConditionPrice
      | null;
    /** Flag specifies which price is used to fee compute. If true, then fee is computed form ItemPrice. If false, then fee is computed from OriginalPrice. */
    isSupplierDiscount?: boolean | null;
    /**
     * Supplier yield without vat in item price currency
     * @format double
     */
    supplierYieldValue?: number;
    /** Contains coupons with calculated discount which are applied to order item */
    discountCoupons?:
      | VinistoMongoConnectorModelsFeeRecordDiscountCouponValue[]
      | null;
    /** Is it paid out. */
    isPaidOut?: boolean;
    /** type of the fee record */
    type?: VinistoHelperDllEnumsFeeRecordFeeRecordType;
    /** Id ot the billing for supplier */
    billingId?: string | null;
    /** Sell type of the bundle fee record */
    sellType?: VinistoHelperDllEnumsFeeRecordFeeRecordSellType;
    /** Price type with B2B level type. If null, then it is not b2b fee record. */
    priceLevel?: VinistoHelperDllEnumsPriceLevel | null;
    /** Applied sale fee rule to bundle. */
    appliedSaleFeeRule?: VinistoMongoConnectorModelsFeeRecordFeeRuleItemAppliedFeeRule | null;
    /** Applied logistic fee rules to bundle. */
    appliedLogisticFeeRule?: VinistoMongoConnectorModelsFeeRecordFeeRuleItemAppliedFeeRule | null;
    /** Order id in the external app. */
    externalOrderId?: string | null;
    /** @format int32 */
    platform?: number;
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
  };

export interface VinistoMongoConnectorModelsFeeRecordFeeRuleItemAppliedFeeRule {
  /** Represents Fee value defined by percentage or fixed price. */
  feeValue?: VinistoMongoConnectorModelsFeeRecordFeeRuleItemFeeValue | null;
  /** Represents Fee rule snapshot with necessary data. */
  feeRule?:
    | VinistoMongoConnectorModelsFeeRecordFeeRuleItemBaseSpecificationFeeRule
    | VinistoMongoConnectorModelsFeeRecordFeeRuleItemDynamicSaleFeeRule
    | VinistoMongoConnectorModelsFeeRecordFeeRuleItemLogisticFeeRule
    | VinistoMongoConnectorModelsFeeRecordFeeRuleItemSaleFeeRule
    | null;
}

/** Represents Fee rule snapshot with necessary data. */
export interface VinistoMongoConnectorModelsFeeRecordFeeRuleItemBaseFeeRule {
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

/** Represents base for Fee rule with base specification setup to create supplier fee. */
export type VinistoMongoConnectorModelsFeeRecordFeeRuleItemBaseSpecificationFeeRule =
  VinistoMongoConnectorModelsFeeRecordFeeRuleItemBaseFeeRule & {
    specifications?:
      | (
          | VinistoMongoConnectorModelsCommonSpecificationsCheckBoxSpecification
          | VinistoMongoConnectorModelsCommonSpecificationsComboBoxSpecification
          | VinistoMongoConnectorModelsCommonSpecificationsDecimalNumberSpecification
          | VinistoMongoConnectorModelsCommonSpecificationsMultiComboBoxSpecification
          | VinistoMongoConnectorModelsCommonSpecificationsNumberSpecification
          | VinistoMongoConnectorModelsCommonSpecificationsStringSpecification
          | VinistoMongoConnectorModelsCommonSpecificationsTextSpecification
        )[]
      | null;
    /** MultiComboBox specification */
    bundleType?: VinistoMongoConnectorModelsCommonSpecificationsMultiComboBoxSpecification | null;
    /** MultiComboBox specification */
    bundleKind?: VinistoMongoConnectorModelsCommonSpecificationsMultiComboBoxSpecification | null;
  };

/** Represents Dynamic sale fee rule to create supplier fee. */
export type VinistoMongoConnectorModelsFeeRecordFeeRuleItemDynamicSaleFeeRule =
  VinistoMongoConnectorModelsFeeRecordFeeRuleItemBaseFeeRule & {
    name?: string | null;
    /**
     * Contains list of possible production types.
     * Origin production = supplier country code is equals to bundle made in country.
     */
    production?: VinistoHelperDllEnumsFeeRecordFeeValueProductionType;
  };

/** Represents Fee value defined by percentage or fixed price. */
export interface VinistoMongoConnectorModelsFeeRecordFeeRuleItemFeeValue {
  /** @format double */
  fixedPrice?: number;
  /** @format double */
  percentage?: number;
  /**
   * Vinisto fee without vat in item price currecncy
   * @format double
   */
  vinistoFeeValue?: number;
  /**
   * Vinisto fee with vat in item price currecncy
   * @format double
   */
  vinistoFeeValueWithVat?: number;
}

/** Represents Logistic fee rule to create supplier fee. */
export type VinistoMongoConnectorModelsFeeRecordFeeRuleItemLogisticFeeRule =
  VinistoMongoConnectorModelsFeeRecordFeeRuleItemBaseSpecificationFeeRule & {
    name?: string | null;
    warehouseId?: string | null;
  };

/** Represents Sale fee rule to create supplier fee. */
export type VinistoMongoConnectorModelsFeeRecordFeeRuleItemSaleFeeRule =
  VinistoMongoConnectorModelsFeeRecordFeeRuleItemBaseSpecificationFeeRule & {
    /**
     * Contains list of possible production types.
     * Origin production = supplier country code is equals to bundle made in country.
     */
    production?: VinistoHelperDllEnumsFeeRecordFeeValueProductionType;
  };

/**
 * Represents Fee rule to create supplier fee.
 * IMPORTANT!!! - changing this object please increase model version of this or main mongo object and create Migration!
 */
export type VinistoMongoConnectorModelsFeeRuleBaseFeeRule =
  VinistoMongoConnectorModelsBaseMongoObject & {
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
  };

/** Represents base for Fee rule with base specification setup to create supplier fee. */
export type VinistoMongoConnectorModelsFeeRuleBaseSpecificationFeeRule =
  VinistoMongoConnectorModelsFeeRuleBaseFeeRule & {
    specifications?:
      | (
          | VinistoMongoConnectorModelsCommonSpecificationsCheckBoxSpecification
          | VinistoMongoConnectorModelsCommonSpecificationsComboBoxSpecification
          | VinistoMongoConnectorModelsCommonSpecificationsDecimalNumberSpecification
          | VinistoMongoConnectorModelsCommonSpecificationsMultiComboBoxSpecification
          | VinistoMongoConnectorModelsCommonSpecificationsNumberSpecification
          | VinistoMongoConnectorModelsCommonSpecificationsStringSpecification
          | VinistoMongoConnectorModelsCommonSpecificationsTextSpecification
        )[]
      | null;
    /** MultiComboBox specification */
    bundleType?: VinistoMongoConnectorModelsCommonSpecificationsMultiComboBoxSpecification | null;
    /** MultiComboBox specification */
    bundleKind?: VinistoMongoConnectorModelsCommonSpecificationsMultiComboBoxSpecification | null;
  };

/** Represents Dynamic sale fee rule to create supplier fee. */
export type VinistoMongoConnectorModelsFeeRuleDynamicSaleFeeRule =
  VinistoMongoConnectorModelsFeeRuleBaseSpecificationFeeRule & {
    name?: string | null;
    supplierIds?: string[] | null;
    categoryIds?: string[] | null;
    tags?: VinistoMongoConnectorModelsFeeRuleTag[] | null;
    bundleIds?: string[] | null;
    /** @format int32 */
    bundleAmountFrom?: number | null;
    /** @format int32 */
    bundleAmountTo?: number | null;
    /** Represents all possible conditions to setup Turnover for supplier fee computation. */
    turnover?: VinistoMongoConnectorModelsFeeRuleTurnoverValue | null;
    originFees?: Record<
      string,
      | VinistoMongoConnectorModelsFeeRuleFeeValue
      | VinistoMongoConnectorModelsFeeRuleLogisticFeeValue
    >;
    destinationFees?: Record<
      string,
      | VinistoMongoConnectorModelsFeeRuleFeeValue
      | VinistoMongoConnectorModelsFeeRuleLogisticFeeValue
    >;
    /** Contains list of possible fee rule priorities */
    priority?: VinistoHelperDllEnumsFeeRuleFeeRulePriority;
    categoryNames?: string[] | null;
    supplierNames?: string[] | null;
    bundleNames?: string[] | null;
    tagNames?: string[] | null;
  };

/** Represents Fee value defined by percentage or fixed price. */
export interface VinistoMongoConnectorModelsFeeRuleFeeValue {
  /** @format double */
  fixedPrice?: number | null;
  /** @format double */
  percentage?: number | null;
}

/** Represents Logistic fee rule to create supplier fee. */
export type VinistoMongoConnectorModelsFeeRuleLogisticFeeRule =
  VinistoMongoConnectorModelsFeeRuleBaseSpecificationFeeRule & {
    name?: string | null;
    originFees?: {
      SupplierTransport?: VinistoMongoConnectorModelsFeeRuleLogisticFeeValue[];
      VinistoTransport?: VinistoMongoConnectorModelsFeeRuleLogisticFeeValue[];
      Dispatching?: VinistoMongoConnectorModelsFeeRuleLogisticFeeValue[];
      Packaging?: VinistoMongoConnectorModelsFeeRuleLogisticFeeValue[];
      Completion?: VinistoMongoConnectorModelsFeeRuleLogisticFeeValue[];
      Storage?: VinistoMongoConnectorModelsFeeRuleLogisticFeeValue[];
    } | null;
    warehouseId?: string | null;
  };

/** Represents Logistic fee value defined by price level and percentage or fixed price. */
export type VinistoMongoConnectorModelsFeeRuleLogisticFeeValue =
  VinistoMongoConnectorModelsFeeRuleFeeValue & {
    /** @format int32 */
    platformId?: number | null;
  };

/** Represents Sale fee rule to create supplier fee. */
export type VinistoMongoConnectorModelsFeeRuleSaleFeeRule =
  VinistoMongoConnectorModelsFeeRuleBaseSpecificationFeeRule & {
    originFees?: Record<
      string,
      | VinistoMongoConnectorModelsFeeRuleFeeValue
      | VinistoMongoConnectorModelsFeeRuleLogisticFeeValue
    >;
    destinationFees?: Record<
      string,
      | VinistoMongoConnectorModelsFeeRuleFeeValue
      | VinistoMongoConnectorModelsFeeRuleLogisticFeeValue
    >;
  };

export interface VinistoMongoConnectorModelsFeeRuleTag {
  tagId?: string | null;
  countriesOfSale?: VinistoHelperDllEnumsCountryCode[] | null;
}

/** Represents all possible conditions to setup Turnover for supplier fee computation. */
export interface VinistoMongoConnectorModelsFeeRuleTurnoverValue {
  /** @format double */
  valueFrom?: number | null;
  /** @format double */
  valueTo?: number | null;
  /** @format int64 */
  validFrom?: number | null;
  /** @format int64 */
  validTo?: number | null;
}

/** Represents a category gift rule to add gifts to order */
export type VinistoMongoConnectorModelsGiftRuleBaseBundleGiftRule =
  VinistoMongoConnectorModelsGiftRuleBaseGiftRule & {
    isShowOnDetail?: boolean;
  };

/** Represents a gift rule to add gifts to order */
export type VinistoMongoConnectorModelsGiftRuleBaseGiftRule =
  VinistoMongoConnectorModelsBaseMongoObject & {
    /** Gift rule name */
    name?: string | null;
    /** Gift name used for search by name */
    nameNormalized?: string | null;
    /** Gift rule description */
    description?: string | null;
    /** Gift rule allowed country code */
    countryCode?: VinistoHelperDllEnumsCountryCode;
    /**
     * Valid from
     * @format int64
     */
    validFrom?: number;
    /**
     * Valid to
     * @format int64
     */
    validTo?: number | null;
    /**
     * Applicable limit
     * @format int32
     */
    applicableLimit?: number | null;
    /**
     * Counter for aplicable limit. Is automatically reset to 0 when ApplicableLimit is updated to non null value. When ApplicableLimit is null, then counter is also null.
     * @format int32
     */
    applicableLimitCounter?: number | null;
    /** Gift rule type */
    ruleType?: VinistoHelperDllEnumsGiftGiftRuleType;
    /** Flag is active */
    isActive?: boolean;
    /** Bundle definitions */
    bundles?: VinistoMongoConnectorModelsGiftRuleBundleItem[] | null;
  };

/** Represents a bundle definition for gift */
export interface VinistoMongoConnectorModelsGiftRuleBundleItem {
  /** Bundle id */
  bundleId?: string | null;
  /**
   * Bundle amount
   * @format int32
   */
  amount?: number;
}

/** Represents a category gift rule to add gifts to order */
export type VinistoMongoConnectorModelsGiftRuleCategoryGiftRule =
  VinistoMongoConnectorModelsGiftRuleBaseBundleGiftRule & {
    categoryId?: string | null;
  };

/** Represents a price gift rule to add gifts to order */
export type VinistoMongoConnectorModelsGiftRuleOrderPriceGiftRule =
  VinistoMongoConnectorModelsGiftRuleBaseGiftRule & {
    /**
     * Price limit from.
     * Price is defined with VAT and computed as basket item prices sum - all discount coupons values. Delivery and payment prices are ignored.
     * @format double
     */
    orderPriceLimitFrom?: number;
    /**
     * Price limit to.
     * Price is defined with VAT and computed as basket item prices sum - all discount coupons values. Delivery and payment prices are ignored.
     * Price limit to is ignored when is null.
     * @format double
     */
    orderPriceLimitTo?: number | null;
    /** Price currency. */
    currency?: VinistoHelperDllEnumsCurrency;
  };

/** Represents a specification gift rule to add gifts to order */
export type VinistoMongoConnectorModelsGiftRuleSpecificationGiftRule =
  VinistoMongoConnectorModelsGiftRuleBaseBundleGiftRule & {
    /** Base specification filter */
    specification?:
      | VinistoMongoConnectorModelsCommonSpecificationsCheckBoxSpecification
      | VinistoMongoConnectorModelsCommonSpecificationsComboBoxSpecification
      | VinistoMongoConnectorModelsCommonSpecificationsDecimalNumberSpecification
      | VinistoMongoConnectorModelsCommonSpecificationsMultiComboBoxSpecification
      | VinistoMongoConnectorModelsCommonSpecificationsNumberSpecification
      | VinistoMongoConnectorModelsCommonSpecificationsStringSpecification
      | VinistoMongoConnectorModelsCommonSpecificationsTextSpecification
      | null;
  };

/** Represents a supplier gift rule to add gifts to order */
export type VinistoMongoConnectorModelsGiftRuleSupplierGiftRule =
  VinistoMongoConnectorModelsGiftRuleBaseBundleGiftRule & {
    supplierId?: string | null;
  };

/**
 * Represents CategoryItem object containing category id and sequence number
 * IMPORTANT!!! - changing this object please increase model version of this or main mongo object and create Migration!
 */
export interface VinistoMongoConnectorModelsHomePageCategoryItem {
  /** Category id in Homepage */
  categoryId?: string | null;
  /**
   * SequenceNumber category in Homepage category
   * @format int32
   */
  sequenceNumber?: number;
}

/**
 * Represents category HP of a product.
 * IMPORTANT!!! - changing this object please increase model version of this or main mongo object and create Migration!
 */
export type VinistoMongoConnectorModelsHomePageHomePageCategory =
  VinistoMongoConnectorModelsBaseMongoObject & {
    /** Type Category on Homepage */
    type?: VinistoHelperDllEnumsProductHomePageCategoryType;
    /** CategoryHomePage of the products - list containing categories id as string. */
    categories?: VinistoMongoConnectorModelsHomePageCategoryItem[] | null;
  };

/**
 * Represents category HP of a product.
 * IMPORTANT!!! - changing this object please increase model version of this or main mongo object and create Migration!
 */
export type VinistoMongoConnectorModelsHomePageHomePageCustomCarousel =
  VinistoMongoConnectorModelsBaseMongoObject & {
    /** Name carousel on HomePage - list containing language versions */
    name?: VinistoMongoConnectorModelsMultiLangValue[] | null;
    /** Normalized name used for searching */
    nameNormalized?: VinistoMongoConnectorModelsMultiLangValue[] | null;
    /**
     * SequenceNumber carousel in homepage
     * @format int32
     */
    sequenceNumber?: number;
    /** HomePageCustomCarousel items - list containing bundle items (bundle id + sequence number). */
    items?: VinistoMongoConnectorModelsHomePageItem[] | null;
    /** Enabled flag - true if carousel enabled. */
    isEnabled?: boolean;
    /** @format int32 */
    availableOnPlatform?: number;
  };

/**
 * Represents Item object containing bundle and sequence number
 * IMPORTANT!!! - changing this object please increase model version of this or main mongo object and create Migration!
 */
export interface VinistoMongoConnectorModelsHomePageItem {
  /** Bundle id in Custom carousel */
  bundleId?: string | null;
  /**
   * SequenceNumber bundle in custom carousel
   * @format int32
   */
  sequenceNumber?: number;
}

/**
 * Represents base for application image.
 * IMPORTANT!!! - changing this object please increase model version of this or main mongo object and create Migration!
 */
export type VinistoMongoConnectorModelsImageBaseImage =
  VinistoMongoConnectorModelsBaseMongoObject & {
    /** Identifies object type to which an image is assigned */
    objectType?: VinistoHelperDllEnumsImageImageObjectType;
    /** True in case the image is the main */
    isMain?: boolean;
  };

/** Represents image in various sizes, which is assigned to an object (product, category, bundle..). */
export type VinistoMongoConnectorModelsImageImage =
  VinistoMongoConnectorModelsImageUrlsImage & {
    /** Id of the object the image is assigned to */
    objectId?: string | null;
  };

/** Represents svg image */
export type VinistoMongoConnectorModelsImageSvgImage =
  VinistoMongoConnectorModelsImageBaseImage & {
    /** Url of the svg image location */
    url?: string | null;
  };

/** Represents svg image for several entities in project, e.g. HP_USP banners, PRODUCT_DETAIL_USP banners, etc. */
export type VinistoMongoConnectorModelsImageSvgObjectImage =
  VinistoMongoConnectorModelsImageSvgImage & {
    /** Id of the object the image is assigned to */
    itemId?: string | null;
  };

/** Represents image in various sizes. */
export type VinistoMongoConnectorModelsImageUrlsImage =
  VinistoMongoConnectorModelsImageBaseImage & {
    /**
     * Set of urls pointing to individual image versions of this image
     * Key - name of the image version/size
     * Value - url of the image location
     */
    urls?: Record<string, string>;
  };

export type VinistoMongoConnectorModelsIntegrationIntegration =
  VinistoMongoConnectorModelsBaseMongoObject & {
    /** @format int32 */
    integrationId?: number;
    integrationName?: string | null;
    defaultPriceList?: VinistoHelperDllEnumsPriceLevel;
    apps?: Record<string, string>;
  };

export type VinistoMongoConnectorModelsInvoiceInvoice =
  VinistoMongoConnectorModelsBaseMongoObject & {
    invoiceNumber?: string | null;
    variableSymbol?: string | null;
    /**
     * Invoice due to timestamp.
     * @format int64
     */
    invoiceDueTo?: number;
    /**
     * Amount without vat.
     * @format double
     */
    amount?: number;
    userId?: string | null;
    /** Order, subscription etc. id. */
    objectId?: string | null;
    /** Contains all possible invoice states. */
    state?: VinistoHelperDllEnumsInvoiceInvoiceState;
    /** Contains all possible invoice types. */
    type?: VinistoHelperDllEnumsInvoiceInvoiceType;
    path?: string | null;
  };

export type VinistoMongoConnectorModelsMerchantFeeRuleMerchantFeeRule =
  VinistoMongoConnectorModelsBaseMongoObject & {
    /** MultiComboBox specification */
    type?: VinistoMongoConnectorModelsCommonSpecificationsMultiComboBoxSpecification | null;
    /** MultiComboBox specification */
    kind?: VinistoMongoConnectorModelsCommonSpecificationsMultiComboBoxSpecification | null;
    /** @format double */
    fee?: number;
    merchants?: string[] | null;
  };

/**
 * Base class for objects which required to store value in various languages.
 * IMPORTANT!!! - changing this object please increase model version of this or main mongo object and create Migration!
 */
export interface VinistoMongoConnectorModelsMultiLangValue {
  /** Language of the value */
  language?: VinistoHelperDllEnumsLanguage;
  /** Value */
  value?: string | null;
}

/** Represents one addon item and an amount. */
export interface VinistoMongoConnectorModelsOrderAddonItem {
  /**
   * Quantity of the gift item
   * @format int32
   */
  quantity?: number;
  /** Gift rule that put given gift in basket */
  addon?: VinistoMongoConnectorModelsOrderAddonsAddon | null;
}

export interface VinistoMongoConnectorModelsOrderAddonsActionsBaseAction {
  /** Represents addon price object. */
  price?: VinistoMongoConnectorModelsOrderAddonsPrice | null;
  isSelectedByDefault?: boolean | null;
}

export type VinistoMongoConnectorModelsOrderAddonsActionsSetDeliveryAction =
  VinistoMongoConnectorModelsOrderAddonsActionsBaseAction & {
    itemId?: string | null;
    /** @format int32 */
    quantity?: number;
  };

export type VinistoMongoConnectorModelsOrderAddonsActionsSetGiftAction =
  VinistoMongoConnectorModelsOrderAddonsActionsBaseAction & {
    itemId?: string | null;
    /** @format int32 */
    quantity?: number;
    /**
     * Represents bundle
     * IMPORTANT!!! - changing this object please increase model version of this or main mongo object and create Migration!
     */
    bundle?: VinistoMongoConnectorModelsOrderBundle | null;
  };

export type VinistoMongoConnectorModelsOrderAddonsActionsSetPriceAction =
  VinistoMongoConnectorModelsOrderAddonsActionsBaseAction & object;

export type VinistoMongoConnectorModelsOrderAddonsActionsSetServiceAction =
  VinistoMongoConnectorModelsOrderAddonsActionsBaseAction & {
    itemId?: string | null;
    /** @format int32 */
    quantity?: number;
    /**
     * Represents bundle
     * IMPORTANT!!! - changing this object please increase model version of this or main mongo object and create Migration!
     */
    bundle?: VinistoMongoConnectorModelsOrderBundle | null;
  };

export type VinistoMongoConnectorModelsOrderAddonsActionsSetUxAction =
  VinistoMongoConnectorModelsOrderAddonsActionsBaseAction & {
    uxAction?: VinistoHelperDllEnumsAddonUxActionType;
  };

/** Represents Addon. */
export interface VinistoMongoConnectorModelsOrderAddonsAddon {
  id?: string | null;
  name?: string | null;
  description?: string | null;
  /** Contains list of possible basket addon types. */
  type?: VinistoHelperDllEnumsAddonAddonType;
  /** Identifies type of the country */
  countryOfSale?: VinistoHelperDllEnumsCountryCode;
  /** Currency */
  currency?: VinistoHelperDllEnumsCurrency;
  /** @format int64 */
  validFrom?: number | null;
  /** @format int64 */
  validTo?: number | null;
  /** @format int32 */
  applicableLimit?: number | null;
  /** @format int32 */
  applicableLimitCounter?: number | null;
  actions?:
    | (
        | VinistoMongoConnectorModelsOrderAddonsActionsSetDeliveryAction
        | VinistoMongoConnectorModelsOrderAddonsActionsSetGiftAction
        | VinistoMongoConnectorModelsOrderAddonsActionsSetPriceAction
        | VinistoMongoConnectorModelsOrderAddonsActionsSetServiceAction
        | VinistoMongoConnectorModelsOrderAddonsActionsSetUxAction
      )[]
    | null;
  conditions?:
    | (
        | VinistoMongoConnectorModelsOrderAddonsConditionsItemCategoryCondition
        | VinistoMongoConnectorModelsOrderAddonsConditionsItemCouponCondition
        | VinistoMongoConnectorModelsOrderAddonsConditionsItemQuantityCondition
        | VinistoMongoConnectorModelsOrderAddonsConditionsItemSpecificationCondition
        | VinistoMongoConnectorModelsOrderAddonsConditionsItemSpecificationDecimalNumberCondition
        | VinistoMongoConnectorModelsOrderAddonsConditionsItemSupplierCondition
        | VinistoMongoConnectorModelsOrderAddonsConditionsMinOrderPriceCondition
        | VinistoMongoConnectorModelsOrderAddonsConditionsMinProductPriceCondition
        | VinistoMongoConnectorModelsOrderAddonsConditionsSalesDirectionCondition
      )[]
    | null;
}

export interface VinistoMongoConnectorModelsOrderAddonsConditionsBaseCondition {
  operator?: VinistoHelperDllEnumsAddonOperator;
}

export type VinistoMongoConnectorModelsOrderAddonsConditionsItemCategoryCondition =
  VinistoMongoConnectorModelsOrderAddonsConditionsBaseCondition & {
    itemCategoryId?: string | null;
  };

export type VinistoMongoConnectorModelsOrderAddonsConditionsItemCouponCondition =
  VinistoMongoConnectorModelsOrderAddonsConditionsBaseCondition & {
    itemCouponId?: string | null;
  };

export type VinistoMongoConnectorModelsOrderAddonsConditionsItemQuantityCondition =
  VinistoMongoConnectorModelsOrderAddonsConditionsBaseCondition & {
    itemId?: string | null;
    /** @format int32 */
    minItemQuantity?: number;
  };

export type VinistoMongoConnectorModelsOrderAddonsConditionsItemSpecificationCondition =
  VinistoMongoConnectorModelsOrderAddonsConditionsBaseCondition & {
    /** Base specification filter */
    specification?:
      | VinistoMongoConnectorModelsCommonSpecificationsCheckBoxSpecification
      | VinistoMongoConnectorModelsCommonSpecificationsComboBoxSpecification
      | VinistoMongoConnectorModelsCommonSpecificationsDecimalNumberSpecification
      | VinistoMongoConnectorModelsCommonSpecificationsMultiComboBoxSpecification
      | VinistoMongoConnectorModelsCommonSpecificationsNumberSpecification
      | VinistoMongoConnectorModelsCommonSpecificationsStringSpecification
      | VinistoMongoConnectorModelsCommonSpecificationsTextSpecification
      | null;
  };

export type VinistoMongoConnectorModelsOrderAddonsConditionsItemSpecificationDecimalNumberCondition =
  VinistoMongoConnectorModelsOrderAddonsConditionsBaseCondition & {
    itemSpecificationId?: string | null;
    /** @format double */
    minValue?: number;
    /** @format double */
    maxValue?: number;
  };

export type VinistoMongoConnectorModelsOrderAddonsConditionsItemSupplierCondition =
  VinistoMongoConnectorModelsOrderAddonsConditionsBaseCondition & {
    itemSupplierId?: string | null;
  };

export type VinistoMongoConnectorModelsOrderAddonsConditionsMinOrderPriceCondition =
  VinistoMongoConnectorModelsOrderAddonsConditionsBaseCondition & {
    /** @format double */
    minOrderPrice?: number;
  };

export type VinistoMongoConnectorModelsOrderAddonsConditionsMinProductPriceCondition =
  VinistoMongoConnectorModelsOrderAddonsConditionsBaseCondition & {
    /** @format double */
    priceWithVat?: number;
    itemId?: string | null;
  };

export type VinistoMongoConnectorModelsOrderAddonsConditionsSalesDirectionCondition =
  VinistoMongoConnectorModelsOrderAddonsConditionsBaseCondition & {
    /** Identifies type of the country */
    originCountry?: VinistoHelperDllEnumsCountryCode;
    /** Identifies type of the country */
    destinationCountry?: VinistoHelperDllEnumsCountryCode;
  };

/** Represents addon price object. */
export interface VinistoMongoConnectorModelsOrderAddonsPrice {
  /** Price vat. */
  vat?: VinistoHelperDllEnumsVatRate;
  /**
   * Value is price without VAT.
   * @format double
   */
  value?: number;
  /**
   * Price with VAT calculated from Value and VatRate.
   * @format double
   */
  valueWithVat?: number;
}

/**
 * Represents delivery address
 * IMPORTANT!!! - changing this object please increase model version of this or main mongo object and create Migration!
 */
export type VinistoMongoConnectorModelsOrderAddress =
  VinistoMongoConnectorModelsCommonBaseAddress & {
    /** Addressee name in the address */
    name?: string | null;
    /** Addressee surname in the address */
    surname?: string | null;
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
  };

/**
 * Represents bundle
 * IMPORTANT!!! - changing this object please increase model version of this or main mongo object and create Migration!
 */
export interface VinistoMongoConnectorModelsOrderBundle {
  /** Id of the bundle */
  id?: string | null;
  /** Id of the supplier */
  supplierId?: string | null;
  /** Name of the bundle */
  name?: string | null;
  /** Description of the bundle */
  description?: string | null;
  /** Url of the bundle */
  url?: string | null;
  /** Origin country of the wine */
  countrySpecification?: string | null;
  /** Origin producer of the wine */
  producerSpecification?: VinistoMongoConnectorModelsMultiLangValue | null;
  /** Price of the bundle in time of order */
  price?:
    | VinistoMongoConnectorModelsCommonPricesPrice
    | VinistoMongoConnectorModelsCommonPricesOrderConditionPrice
    | null;
  /** Possible prices for this bundle in time of order. */
  prices?:
    | (
        | VinistoMongoConnectorModelsCommonPricesPrice
        | VinistoMongoConnectorModelsCommonPricesOrderConditionPrice
      )[]
    | null;
  /** Possible price discounts for this bundle in time of order. */
  priceDiscounts?:
    | (
        | VinistoMongoConnectorModelsCommonPricesLockPriceDiscount
        | VinistoMongoConnectorModelsCommonPricesOrderConditionPrice
        | VinistoMongoConnectorModelsCommonPricesPrice
        | VinistoMongoConnectorModelsCommonPricesPriceDiscountSet
        | VinistoMongoConnectorModelsCommonPricesPriceDiscountSupplier
        | VinistoMongoConnectorModelsCommonPricesPriceDiscountVinisto
        | VinistoMongoConnectorModelsCommonPricesPriceDiscountVolume
        | VinistoMongoConnectorModelsCommonPricesTimeLimitedPriceDiscount
      )[]
    | null;
  /** Discount Price of the bundle in time of order */
  discountPrice?:
    | VinistoMongoConnectorModelsCommonPricesLockPriceDiscount
    | VinistoMongoConnectorModelsCommonPricesOrderConditionPrice
    | VinistoMongoConnectorModelsCommonPricesPrice
    | VinistoMongoConnectorModelsCommonPricesPriceDiscountSet
    | VinistoMongoConnectorModelsCommonPricesPriceDiscountSupplier
    | VinistoMongoConnectorModelsCommonPricesPriceDiscountVinisto
    | VinistoMongoConnectorModelsCommonPricesPriceDiscountVolume
    | VinistoMongoConnectorModelsCommonPricesTimeLimitedPriceDiscount
    | null;
  /** Delivery flag - true if for bundle is delivery free. */
  isDeliveryFree?: boolean;
  /** Flag if it is bundle or set */
  isSet?: boolean;
  /** CanSendToWms flag - false if bundle is intangible goods. */
  canSendToWms?: boolean;
  /** Items of the bundle - list containing product definition or bundle definition if bundle is set */
  bundleItems?:
    | (
        | VinistoMongoConnectorModelsOrderItemsBundleItem
        | VinistoMongoConnectorModelsOrderItemsProductItem
      )[]
    | null;
  /** List of specification value */
  specifications?:
    | (
        | VinistoMongoConnectorModelsOrderSpecificationCheckBoxSpecificationValue
        | VinistoMongoConnectorModelsOrderSpecificationComboBoxSpecificationValue
        | VinistoMongoConnectorModelsOrderSpecificationDecimalNumberImperialSpecificationValue
        | VinistoMongoConnectorModelsOrderSpecificationDecimalNumberSpecificationValue
        | VinistoMongoConnectorModelsOrderSpecificationMultiComboBoxSpecificationValue
        | VinistoMongoConnectorModelsOrderSpecificationNumberImperialSpecificationValue
        | VinistoMongoConnectorModelsOrderSpecificationNumberSpecificationValue
        | VinistoMongoConnectorModelsOrderSpecificationTextSpecificationValue
      )[]
    | null;
  /** List of category ids */
  categories?: string[] | null;
  /** List of tags */
  tags?: VinistoMongoConnectorModelsOrderTag[] | null;
}

/**
 * CreditNote - dobropis
 * IMPORTANT!!! - changing this object please increase model version of this or main mongo object and create Migration!
 */
export interface VinistoMongoConnectorModelsOrderCreditNote {
  /**
   * Id of credit note to identify credit note later in Flexibee
   * @format int32
   */
  flexibeeId?: number;
  /** Invoice code - FlexiBee generated order number */
  orderNumber?: string | null;
  /** Variable symbol - generated variable symbol */
  variableSymbol?: string | null;
  /** URL to generated invoice */
  pdfUrl?: string | null;
}

/**
 * Represents delivery information.
 * IMPORTANT!!! - changing this object please increase model version of this or main mongo object and create Migration!
 */
export interface VinistoMongoConnectorModelsOrderDelivery {
  /** Delivery id */
  id?: string | null;
  /** Name of the delivery - list containing language versions */
  name?: VinistoMongoConnectorModelsMultiLangValue[] | null;
  /** Description of the delivery - list containing language versions */
  description?: VinistoMongoConnectorModelsMultiLangValue[] | null;
  /**
   * Delivery time in hours
   * @format int32
   */
  deliveryTime?: number;
  /** Delivery price */
  price?:
    | VinistoMongoConnectorModelsCommonPricesPrice
    | VinistoMongoConnectorModelsCommonPricesOrderConditionPrice
    | null;
  /**
   * Identification of the delivery address
   * Delivery address or Pickup point has to be provided
   */
  deliveryAddress?: VinistoMongoConnectorModelsOrderAddress | null;
  /**
   * PickupPoint of the delivery
   * Delivery address or Pickup point has to be provided
   */
  pickupPoint?: VinistoMongoConnectorModelsOrderPickupPoint | null;
  /** Delivery type */
  deliveryType?: VinistoHelperDllEnumsOrderDeliveryType;
  /** Id of the package */
  packageId?: string | null;
  /** Delivery code */
  deliveryCode?: string | null;
  /**
   * Delivery costs (without VAT) in CZK
   * @format double
   */
  costs?: number | null;
  /** Is subscriber flag - true - delivery is free if user is subscriber */
  isSubscriber?: boolean;
}

/**
 * Represent amount discount on order
 * IMPORTANT!!! - changing this object please increase model version of this or main mongo object and create Migration!
 */
export type VinistoMongoConnectorModelsOrderDiscountCouponAmountDiscountCouponDefinition =
  VinistoMongoConnectorModelsOrderDiscountCouponConditionalDiscountCouponDefinition & {
    /** Price value */
    amountDiscount?:
      | VinistoMongoConnectorModelsCommonPricesPrice
      | VinistoMongoConnectorModelsCommonPricesOrderConditionPrice
      | null;
  };

/**
 * Represents base specification definition.
 * IMPORTANT!!! - changing this object please increase model version of this or main mongo object and create Migration!
 */
export interface VinistoMongoConnectorModelsOrderDiscountCouponBaseDiscountCouponDefinition {
  /** Id */
  id?: string | null;
  /** Code of Discount coupon */
  code?: string | null;
  name?: VinistoMongoConnectorModelsMultiLangValue[] | null;
  shortDescription?: VinistoMongoConnectorModelsMultiLangValue[] | null;
  description?: VinistoMongoConnectorModelsMultiLangValue[] | null;
  /**
   * Created at - timestamp value
   * @format int64
   */
  creationDate?: number;
  /** @format int64 */
  validFrom?: number;
  /** @format int64 */
  validTo?: number;
  /** Active flag - true if is active */
  isActive?: boolean;
  /** Unit in language for all types */
  unit?: VinistoMongoConnectorModelsMultiLangValue | null;
  /** It contains email this coupon was sent to. */
  sentToEmail?: string | null;
  /**
   * Bundles matching discount coupon limitations
   * When list is null, then all bundles match discount coupon limitations or order has not discount.
   */
  discountedBundles?: string[] | null;
  discountAmountByVats?:
    | VinistoMongoConnectorModelsOrderDiscountCouponDiscountAmountByVat[]
    | null;
}

/** Represents base common conditions for discount coupons. */
export type VinistoMongoConnectorModelsOrderDiscountCouponConditionalDiscountCouponDefinition =
  VinistoMongoConnectorModelsOrderDiscountCouponBaseDiscountCouponDefinition & {
    /** Coupon allowed from order in amount from */
    allowedFrom?:
      | VinistoMongoConnectorModelsCommonPricesPrice
      | VinistoMongoConnectorModelsCommonPricesOrderConditionPrice
      | null;
    /** Active flag - true if is active */
    isReusable?: boolean;
    /** Can be combined with other coupons - true if is combinable */
    isCombinable?: boolean;
    /** Can be used for discounted items - true if can be used for discounted items */
    isForDiscountedItems?: boolean;
    /** Limitation definition */
    limitationDefinition?:
      | VinistoMongoConnectorModelsCommonLimitationsLimitationDefinitionCategory
      | VinistoMongoConnectorModelsCommonLimitationsLimitationDefinitionNone
      | VinistoMongoConnectorModelsCommonLimitationsLimitationDefinitionSpecification
      | VinistoMongoConnectorModelsCommonLimitationsLimitationDefinitionSupplier
      | null;
    /**
     * Flag specifies who cost discount.
     * If coupon limitation is not SupplierLimitation, then this flag is always false.
     */
    isSupplierDiscount?: boolean;
    /** True if is visible in users section vinisto club. */
    isVisibleInUsersSection?: boolean;
    /** True if can be used for registered (logged in) users only. */
    isForRegisteredUsers?: boolean;
  };

/** Represents calculated discounts for VAT groups. */
export interface VinistoMongoConnectorModelsOrderDiscountCouponDiscountAmountByVat {
  /**
   * Amount price without VAT.
   * @format double
   */
  amountValue?: number;
  /** @format double */
  amountValueWithVat?: number;
  /** VatRate */
  vat?: VinistoHelperDllEnumsVatRate;
  /** @format double */
  amountVat?: number;
}

/**
 * Represent gift coupon.
 * IMPORTANT!!! - changing this object please increase model version of this or main mongo object and create Migration!
 */
export type VinistoMongoConnectorModelsOrderDiscountCouponGiftCouponDefinition =
  VinistoMongoConnectorModelsOrderDiscountCouponBaseDiscountCouponDefinition & {
    /** Price value */
    amount?:
      | VinistoMongoConnectorModelsCommonPricesPrice
      | VinistoMongoConnectorModelsCommonPricesOrderConditionPrice
      | null;
  };

/**
 * Represent percentage discount on order
 * IMPORTANT!!! - changing this object please increase model version of this or main mongo object and create Migration!
 */
export type VinistoMongoConnectorModelsOrderDiscountCouponPercentageDiscountCouponDefinition =
  VinistoMongoConnectorModelsOrderDiscountCouponConditionalDiscountCouponDefinition & {
    /**
     * Percentage amount
     * @format double
     */
    percentageDiscount?: number;
  };

/**
 * Represents exchange in order creation moment
 * IMPORTANT!!! - changing this object please increase model version of this or main mongo object and create Migration!
 */
export interface VinistoMongoConnectorModelsOrderExchangeRate {
  id?: string | null;
  /** @format date */
  day?: string;
  /** Currency */
  currency?: VinistoHelperDllEnumsCurrency;
  /**
   * Only base exchange rate value. Is not directly used to prices computation.
   * @format double
   */
  value?: number;
  /**
   * Use for goods prices computation.
   * @format double
   */
  valueGoods?: number;
  /**
   * Use for discount coupon prices computation.
   * @format double
   */
  valueDiscountCoupons?: number;
  /** @format double */
  coefficient?: number;
}

/**
 * Flexibee invoice data
 * IMPORTANT!!! - changing this object please increase model version of this or main mongo object and create Migration!
 */
export interface VinistoMongoConnectorModelsOrderInvoice {
  /**
   * Id of invoice in to identify invoice later in Flexibee
   * @format int32
   */
  flexibeeId?: number;
  /** Invoice code - FlexiBee generated order number */
  orderNumber?: string | null;
  /** Variable symbol - FlexiBee generated variable symbol */
  variableSymbol?: string | null;
  /** URL to Flexibee generated invoice */
  pdfUrl?: string | null;
  /** URL to Flexibee generated proforma invoice */
  pdfProformaUrl?: string | null;
  /** URL to Flexibee generated vat invoice after proforma invoice */
  pdfVatInvoiceUrl?: string | null;
}

/** Represents base item object to specify bundle items by his type. */
export interface VinistoMongoConnectorModelsOrderItemsBaseItem {
  itemId?: string | null;
  /** @format int32 */
  amount?: number;
}

/** Represents Bundle item object containing bundle id, amount and price */
export type VinistoMongoConnectorModelsOrderItemsBundleItem =
  VinistoMongoConnectorModelsOrderItemsBaseItem & {
    /** Represents common price object. */
    price?:
      | VinistoMongoConnectorModelsCommonPricesPrice
      | VinistoMongoConnectorModelsCommonPricesOrderConditionPrice
      | null;
    discountCostsSupplier?: boolean;
    /** Product in the bundle */
    bundle?: VinistoMongoConnectorModelsOrderBundle | null;
    /** Calculated price after B2B discount. */
    calculatedPriceAfterB2bDiscount?:
      | VinistoMongoConnectorModelsCommonPricesPrice
      | VinistoMongoConnectorModelsCommonPricesOrderConditionPrice
      | null;
  };

/** Represents Bundle item object containing product id and amount */
export type VinistoMongoConnectorModelsOrderItemsProductItem =
  VinistoMongoConnectorModelsOrderItemsBaseItem & {
    /** Product in the bundle */
    product?: VinistoMongoConnectorModelsOrderProduct | null;
  };

/**
 * Represents order.
 * IMPORTANT!!! - changing this object please increase model version of this or main mongo object and create Migration!
 */
export type VinistoMongoConnectorModelsOrderOrder =
  VinistoMongoConnectorModelsBaseMongoObject & {
    /** Last state of the order */
    state?: VinistoHelperDllEnumsOrderOrderState;
    /** List states of the order */
    states?: VinistoHelperDllEnumsOrderOrderState[] | null;
    /** Times when order change state */
    stateChangeRecords?:
      | VinistoMongoConnectorModelsOrderStateChangeRecord[]
      | null;
    /** List of ordered items (only bundles at the moment) */
    orderItems?: VinistoMongoConnectorModelsOrderOrderItem[] | null;
    /** Identification of the customer */
    user?: VinistoMongoConnectorModelsOrderUser | null;
    /** Delivery information */
    delivery?: VinistoMongoConnectorModelsOrderDelivery | null;
    /** Payment information */
    payment?: VinistoMongoConnectorModelsOrderPayment | null;
    /** Language of the order */
    language?: VinistoHelperDllEnumsLanguage;
    /** List of discount coupons */
    discountCoupons?:
      | (
          | VinistoMongoConnectorModelsOrderDiscountCouponAmountDiscountCouponDefinition
          | VinistoMongoConnectorModelsOrderDiscountCouponConditionalDiscountCouponDefinition
          | VinistoMongoConnectorModelsOrderDiscountCouponGiftCouponDefinition
          | VinistoMongoConnectorModelsOrderDiscountCouponPercentageDiscountCouponDefinition
        )[]
      | null;
    /**
     * Order calculated discount. Is only used to calculating order price when order currency is not CZK.
     * @format double
     */
    orderTotalDiscount?: number | null;
    /**
     * Order calculated discount with vat.
     * @format double
     */
    orderTotalDiscountWithVat?: number | null;
    /** Order spec symbol */
    specSymbol?: string | null;
    /** Clients order number */
    customerOrderNumber?: string | null;
    /** Our generate order number */
    orderNumber?: string | null;
    /** Flag for sending newsletter */
    isNewsletterActive?: boolean;
    /** Order billing address */
    billingAddress?: VinistoMongoConnectorModelsOrderAddress | null;
    /**
     * Order price with VAT
     * @format double
     */
    orderPriceWithVat?: number;
    /**
     * Order price without VAT
     * @format double
     */
    orderPrice?: number;
    /** Currency */
    orderCurrency?: VinistoHelperDllEnumsCurrency;
    /** Order note */
    orderNote?: string | null;
    /** Invoice data */
    invoice?: VinistoMongoConnectorModelsOrderInvoice | null;
    /** Credit note */
    creditNote?: VinistoMongoConnectorModelsOrderCreditNote | null;
    /** Tracking id from warehouse */
    trackingId?: string | null;
    /** UTM parameters */
    utm?: VinistoMongoConnectorModelsOrderUtmParameters | null;
    /** Addons added to order */
    addons?: VinistoMongoConnectorModelsOrderAddonItem[] | null;
    /** Internal Order note */
    internalOrderNote?: string | null;
    /** Internal documents */
    internalDocuments?:
      | VinistoMongoConnectorModelsOrderOrderInternalDocument[]
      | null;
    /** Country of sale */
    countryOfSale?: VinistoHelperDllEnumsCountryCode;
    /** Order exchange rate. Is set only if order currency is not CZK. */
    orderExchangeRate?: VinistoMongoConnectorModelsOrderExchangeRate | null;
    /** @format int32 */
    platformId?: number;
    /** Id of the User which create order. If order is created by anonymous user, then is null. */
    creatorUserId?: string | null;
    /** @format double */
    orderPriceWithoutSubscription?: number;
    /** @format double */
    orderPriceWithVatWithoutSubscription?: number;
    /** @format double */
    giftCouponPayment?: number;
    /** @format double */
    giftCouponPaymentWithVat?: number;
  };

/** Represents order internal document */
export interface VinistoMongoConnectorModelsOrderOrderInternalDocument {
  id?: string | null;
  filePath?: string | null;
  originalFileName?: string | null;
}

/**
 * Represents one basket item (only Bundle is accepted at the moment) and an amount.
 * IMPORTANT!!! - changing this object please increase model version of this or main mongo object and create Migration!
 */
export interface VinistoMongoConnectorModelsOrderOrderItem {
  /** Bundle object if a bundle is in this BasketItem. */
  bundle?: VinistoMongoConnectorModelsOrderBundle | null;
  /**
   * Quantity of the item.
   * @format int32
   */
  quantity?: number;
  /**
   * B2B percentage discount applied to this item.
   * @format double
   */
  b2bPercentageDiscount?: number | null;
  /** Calculated price after B2B discount. */
  calculatedPriceAfterB2bDiscount?:
    | VinistoMongoConnectorModelsCommonPricesLockPriceDiscount
    | VinistoMongoConnectorModelsCommonPricesOrderConditionPrice
    | VinistoMongoConnectorModelsCommonPricesPrice
    | VinistoMongoConnectorModelsCommonPricesPriceDiscountSet
    | VinistoMongoConnectorModelsCommonPricesPriceDiscountSupplier
    | VinistoMongoConnectorModelsCommonPricesPriceDiscountVinisto
    | VinistoMongoConnectorModelsCommonPricesPriceDiscountVolume
    | VinistoMongoConnectorModelsCommonPricesTimeLimitedPriceDiscount
    | null;
}

/**
 * Represents payment information.
 * IMPORTANT!!! - changing this object please increase model version of this or main mongo object and create Migration!
 */
export interface VinistoMongoConnectorModelsOrderPayment {
  /** Payment id */
  id?: string | null;
  /** Name of the payment - list containing language versions */
  name?: VinistoMongoConnectorModelsMultiLangValue[] | null;
  /** Description of the payment - list containing language versions */
  description?: VinistoMongoConnectorModelsMultiLangValue[] | null;
  /** Payment price */
  price?:
    | VinistoMongoConnectorModelsCommonPricesPrice
    | VinistoMongoConnectorModelsCommonPricesOrderConditionPrice
    | null;
  /**
   * If the payment supports GoPay this defines GoPay type
   * If null this payment is not supporting goPay
   */
  goPayType?: VinistoHelperDllEnumsGoPayGoPayType | null;
  /**
   * If the payment was done, this id stores the payment id so it was possible to map the order with GoPay payment
   * @format int64
   */
  goPayId?: number | null;
  /** Payment type */
  paymentType?: VinistoHelperDllEnumsOrderPaymentType;
  /** Variable symbol to identify the payment which is payed at delivery (dobirka) */
  variableSymbol?: string | null;
  /** Notifications to pay order */
  notifications?: VinistoHelperDllEnumsOrderPaymentNotifictionType[] | null;
  /**
   * Invoice due date in days.
   * @format int32
   */
  invoiceDueDateInDays?: number | null;
  /** Relative path to qr code */
  qrCode?: string | null;
}

/**
 * Represents pickup point where the package shall be delivered
 * IMPORTANT!!! - changing this object please increase model version of this or main mongo object and create Migration!
 */
export interface VinistoMongoConnectorModelsOrderPickupPoint {
  /** PickupPoint type ... eg. company it belongs to Zasilkovna/PPL... */
  type?: VinistoHelperDllEnumsOrderPickupPointType;
  /** Code identifying the pickup point */
  code?: string | null;
  /** Name of the person the package is delivered to */
  addressee?: string | null;
  /** Phone number where information about the readiness of the package will be sent */
  phone?: string | null;
  /** Email where information about the readiness of the package will be sent */
  email?: string | null;
  /** Pickup point address */
  address?:
    | VinistoMongoConnectorModelsCommonPostalAddress
    | VinistoMongoConnectorModelsUserAddress
    | VinistoMongoConnectorModelsUserBaseUserAddress
    | VinistoMongoConnectorModelsUserBillingInfo
    | VinistoMongoConnectorModelsSupplierAddress
    | VinistoMongoConnectorModelsOrderAddress
    | VinistoMongoConnectorModelsCommonBaseAddress
    | null;
}

/**
 * Represents product.
 * IMPORTANT!!! - changing this object please increase model version of this or main mongo object and create Migration!
 */
export interface VinistoMongoConnectorModelsOrderProduct {
  /** Id of the product */
  id?: string | null;
  /** Name of the product */
  name?: string | null;
  /** Description of the product */
  description?: string | null;
  /** Wms Code of the product */
  wmsCode?: string | null;
  /** Price of the product in time of order */
  price?:
    | VinistoMongoConnectorModelsCommonPricesPrice
    | VinistoMongoConnectorModelsCommonPricesOrderConditionPrice
    | null;
}

/** Represents value base specification value, which reference a specification definition and contains respective value. */
export interface VinistoMongoConnectorModelsOrderSpecificationBaseSpecificationValue {
  definitionId?: string | null;
}

/** Represents value for specification with bool value. */
export type VinistoMongoConnectorModelsOrderSpecificationCheckBoxSpecificationValue =
  VinistoMongoConnectorModelsOrderSpecificationBaseSpecificationValue & {
    /** Bool value */
    value?: boolean;
  };

/** Represents value for specification with predefined values - combobox. */
export type VinistoMongoConnectorModelsOrderSpecificationComboBoxSpecificationValue =
  VinistoMongoConnectorModelsOrderSpecificationBaseSpecificationValue & {
    selectedValueName?: string | null;
  };

/** Represents value for specification with float value. */
export type VinistoMongoConnectorModelsOrderSpecificationDecimalNumberImperialSpecificationValue =
  VinistoMongoConnectorModelsOrderSpecificationDecimalNumberSpecificationValue & {
    /**
     * Imperial value ... value in imperial units
     * @format float
     */
    imperialValue?: number;
  };

/** Represents value for specification with float value. */
export type VinistoMongoConnectorModelsOrderSpecificationDecimalNumberSpecificationValue =
  VinistoMongoConnectorModelsOrderSpecificationBaseSpecificationValue & {
    /**
     * float value
     * @format float
     */
    value?: number;
  };

/** Represents value for specification with predefined values - multicombobox. */
export type VinistoMongoConnectorModelsOrderSpecificationMultiComboBoxSpecificationValue =
  VinistoMongoConnectorModelsOrderSpecificationBaseSpecificationValue & {
    /** Reference to defined values in definition */
    selectedValuesName?: string[] | null;
  };

/** Represents value for specification with integer value. */
export type VinistoMongoConnectorModelsOrderSpecificationNumberImperialSpecificationValue =
  VinistoMongoConnectorModelsOrderSpecificationNumberSpecificationValue & {
    /**
     * Integer value
     * @format int32
     */
    imperialValue?: number;
  };

/** Represents value for specification with integer value. */
export type VinistoMongoConnectorModelsOrderSpecificationNumberSpecificationValue =
  VinistoMongoConnectorModelsOrderSpecificationBaseSpecificationValue & {
    /**
     * Integer value
     * @format int32
     */
    value?: number;
  };

/** Represents value for specification with free text. */
export type VinistoMongoConnectorModelsOrderSpecificationTextSpecificationValue =
  VinistoMongoConnectorModelsOrderSpecificationBaseSpecificationValue & {
    /** Multi language text value */
    value?: VinistoMongoConnectorModelsMultiLangValue[] | null;
  };

/**
 * Represents order state change log
 * IMPORTANT!!! - changing this object please increase model version of this or main mongo object and create Migration!
 */
export interface VinistoMongoConnectorModelsOrderStateChangeRecord {
  /** State which was changed */
  state?: VinistoHelperDllEnumsOrderOrderState;
  /**
   * Time of the change
   * @format int64
   */
  changeTime?: number;
}

export interface VinistoMongoConnectorModelsOrderTag {
  /** Tag id for bundle. */
  tagId?: string | null;
  /** Allowed tag countries of sale for current bundle. */
  countriesOfSale?: VinistoHelperDllEnumsCountryCode[] | null;
}

/**
 * Represents a user
 * IMPORTANT!!! - changing this object please increase model version of this or main mongo object and create Migration!
 */
export interface VinistoMongoConnectorModelsOrderUser {
  /** Id of the User */
  id?: string | null;
  /** Id of the anonymous User */
  anonymousId?: string | null;
  /** Email of the user */
  email?: string | null;
}

/**
 * Represents a UTM parameters (Urchin Tracking Module)
 * IMPORTANT!!! - changing this object please increase model version of this or main mongo object and create Migration!
 */
export interface VinistoMongoConnectorModelsOrderUtmParameters {
  /** UTM source */
  source?: string | null;
  /** UTM medium */
  medium?: string | null;
  /** UTM campaign */
  campaign?: string | null;
  /** Gad - Google Ads Help */
  gad?: string | null;
  /** Gclid - Google Click Identifier */
  gclId?: string | null;
}

/**
 * Represents last number for generate order number.
 * IMPORTANT!!! - changing this object please increase model version of this or main mongo object and create Migration!
 */
export type VinistoMongoConnectorModelsOrderNumberOrderNumber =
  VinistoMongoConnectorModelsBaseMongoObject & {
    /**
     * Our last number for generate order number
     * @format int32
     */
    lastNumber?: number;
    /**
     * Our last number for generate b2b order number. Not used currently. All orders has number generated by LastNumber property.
     * @format int32
     */
    lastNumberB2b?: number;
  };

/**
 * Represents payment for order.
 * IMPORTANT!!! - changing this object please increase model version of this or main mongo object and create Migration!
 */
export type VinistoMongoConnectorModelsOrderPaymentOrderPayment =
  VinistoMongoConnectorModelsBaseMongoObject & {
    /**
     * Payment ID
     * @format int64
     */
    paymentId?: number;
    /** Order Id */
    orderId?: string | null;
    /** GoPay GW url */
    goPayUrl?: string | null;
    /** Current state of the order */
    state?: VinistoHelperDllEnumsOrderOrderPaymentState;
  };

/**
 * Represents payment.
 * IMPORTANT!!! - changing this object please increase model version of this or main mongo object and create Migration!
 */
export type VinistoMongoConnectorModelsPaymentPayment =
  VinistoMongoConnectorModelsBaseMongoObject & {
    /** Name of the payment - list containing language versions */
    name?: VinistoMongoConnectorModelsMultiLangValue[] | null;
    /** Normalized name used for autocomplete */
    nameNormalized?: VinistoMongoConnectorModelsMultiLangValue[] | null;
    /** Description of the payment - list containing language versions */
    description?: VinistoMongoConnectorModelsMultiLangValue[] | null;
    /** Active flag - true if is active */
    isActive?: boolean;
    /** Payment prices */
    prices?:
      | VinistoMongoConnectorModelsCommonPricesOrderConditionPrice[]
      | null;
    /** Payment country codes */
    countries?: VinistoHelperDllEnumsCountryCode[] | null;
    /** GoPay type */
    goPayType?: VinistoHelperDllEnumsGoPayGoPayType | null;
    /** Payment type */
    paymentType?: VinistoHelperDllEnumsOrderPaymentType;
    /**
     * Order
     * @format int32
     */
    order?: number;
    /** Payment note in language */
    note?: VinistoMongoConnectorModelsMultiLangValue[] | null;
    /** Contains allowed platforms. */
    allowedOnPlatforms?:
      | VinistoHelperDllEnumsDeliveryAndPaymentPlatform[]
      | null;
  };

/**
 * Represents product.
 * IMPORTANT!!! - changing this object please increase model version of this or main mongo object and create Migration!
 */
export type VinistoMongoConnectorModelsProductProduct =
  VinistoMongoConnectorModelsBaseMongoObject & {
    /** Current state of the product */
    state?: VinistoHelperDllEnumsProductProductState;
    /** Url of the product - list containing language versions */
    url?: VinistoMongoConnectorModelsMultiLangValue[] | null;
    /** Name of the product - list containing language versions */
    name?: VinistoMongoConnectorModelsMultiLangValue[] | null;
    /** Normalized name used for autocomplete */
    nameNormalized?: VinistoMongoConnectorModelsMultiLangValue[] | null;
    /** Description of the product - list containing language versions */
    description?: VinistoMongoConnectorModelsMultiLangValue[] | null;
    /** Long text of the product - list containing language versions */
    text?: VinistoMongoConnectorModelsMultiLangValue[] | null;
    /** Price of the product - list containing various currency. */
    prices?:
      | (
          | VinistoMongoConnectorModelsCommonPricesPrice
          | VinistoMongoConnectorModelsCommonPricesOrderConditionPrice
        )[]
      | null;
    /** Enabled flag - true if product enabled. */
    isEnabled?: boolean;
    /** Deleted flag - true if product deleted. */
    isDeleted?: boolean;
    /** Category of the products - list containing categories id as string. */
    categories?: string[] | null;
    /** Tags - list containing tags for this product. */
    tags?: VinistoMongoConnectorModelsProductTag[] | null;
    /** Specifications - list containing specifications id and value as list. */
    specifications?:
      | (
          | VinistoMongoConnectorModelsSpecificationCheckBoxSpecificationValue
          | VinistoMongoConnectorModelsSpecificationComboBoxSpecificationValue
          | VinistoMongoConnectorModelsSpecificationDecimalNumberImperialSpecificationValue
          | VinistoMongoConnectorModelsSpecificationDecimalNumberSpecificationValue
          | VinistoMongoConnectorModelsSpecificationMultiComboBoxSpecificationValue
          | VinistoMongoConnectorModelsSpecificationNumberImperialSpecificationValue
          | VinistoMongoConnectorModelsSpecificationNumberSpecificationValue
          | VinistoMongoConnectorModelsSpecificationTextSpecificationValue
        )[]
      | null;
    /** EAN - universal European product indentifier */
    ean?: string | null;
    /** WarehouseId - product identifier in warehouse database */
    warehouseId?: string | null;
    /**
     * Unix datetime of last open of product via URL
     * @format int64
     */
    lastView?: number | null;
    /** Flag to mark product as only for logged users */
    isForLogged?: boolean;
  };

export interface VinistoMongoConnectorModelsProductTag {
  /** Tag id for product. */
  tagId?: string | null;
  /** Allowed tag countries of sale for current product. */
  countriesOfSale?: VinistoHelperDllEnumsCountryCode[] | null;
}

/** Data to publish bundle change to B2b as MessageMQ transfer object. */
export type VinistoMongoConnectorModelsRecoverableMessageModelB2BData =
  VinistoMongoConnectorModelsRecoverableMessageModelBaseRbmqData & {
    bundleId?: string | null;
    /** All possible change types published to B2b. */
    changeType?: VinistoHelperDllEnumsB2BChangeType;
    platforms?: number[] | null;
  };

/** Base rbmq data model which is used for sending recoverable messages. */
export type VinistoMongoConnectorModelsRecoverableMessageModelBaseRbmqData =
  object;

/**
 * Represents model for message recovery purposes.
 * IMPORTANT!!! - changing this object please increase model version of this or main mongo object and create Migration!
 */
export type VinistoMongoConnectorModelsRecoverableMessageModelRecoverableMessageModel =
  VinistoMongoConnectorModelsBaseMongoObject & {
    /** Base rbmq data model which is used for sending recoverable messages. */
    message?:
      | VinistoMongoConnectorModelsRecoverableMessageModelB2BData
      | VinistoMongoConnectorModelsRecoverableMessageModelSubscriptionPaymentData
      | null;
    queueType?: VinistoRabbitmqCoreModelsQueueName;
    /** @format int64 */
    communicatedAt?: number | null;
    /** @format int32 */
    attemptsCount?: number;
  };

/** Data to create / renew subscription. */
export type VinistoMongoConnectorModelsRecoverableMessageModelSubscriptionPaymentData =
  VinistoMongoConnectorModelsRecoverableMessageModelBaseRbmqData & {
    /** @format int64 */
    paymentId?: number;
  };

/** Represents model to log search query */
export type VinistoMongoConnectorModelsSearchSearchQuery =
  VinistoMongoConnectorModelsBaseMongoObject & {
    /** Serached phrase */
    expression?: string | null;
    /** User id. If query was searched by anonymous user, then is null */
    userId?: string | null;
  };

/**
 * Represents Slider carousel with image.
 * IMPORTANT!!! - changing this object please increase model version of this or main mongo object and create Migration!
 */
export type VinistoMongoConnectorModelsSliderCarouselSliderCarousel =
  VinistoMongoConnectorModelsBaseMongoObject & {
    /** Carousel title */
    title?: VinistoMongoConnectorModelsMultiLangValue[] | null;
    titleColor?: string | null;
    /** Carousel subtitle */
    subtitle?: VinistoMongoConnectorModelsMultiLangValue[] | null;
    subtitleColor?: string | null;
    /** CTA text of link */
    textLink?: VinistoMongoConnectorModelsMultiLangValue[] | null;
    /**
     * Availability from
     * @format int64
     */
    availableFrom?: number;
    /**
     * Availability to
     * @format int64
     */
    availableTo?: number;
    /** Url */
    url?: VinistoMongoConnectorModelsMultiLangValue[] | null;
    /** Carousel type */
    type?: VinistoHelperDllEnumsSliderCarouselCarouselType;
    /**
     * Position
     * @format int32
     */
    position?: number;
    buttonStyle?: VinistoHelperDllEnumsSliderCarouselButtonStyle | null;
    availableOnPlatforms?: number[] | null;
  };

/**
 * Represents base specification definition.
 * IMPORTANT!!! - changing this object please increase model version of this or main mongo object and create Migration!
 */
export type VinistoMongoConnectorModelsSpecificationBaseSpecificationDefinition =
  VinistoMongoConnectorModelsBaseMongoObject & {
    /** Name of the specification - list containing language versions */
    name?: VinistoMongoConnectorModelsMultiLangValue[] | null;
    /** Normalized name used for autocomplete */
    nameNormalized?: VinistoMongoConnectorModelsMultiLangValue[] | null;
    /** URL of the specification - list containing language versions */
    url?: VinistoMongoConnectorModelsMultiLangValue[] | null;
    /** Description of the specification - list containing language versions */
    description?: VinistoMongoConnectorModelsMultiLangValue[] | null;
    /** Meta description of the specification - list containing language versions */
    metaDescription?: VinistoMongoConnectorModelsMultiLangValue[] | null;
    /** Image of the specification - list containing language versions for image id */
    imageId?: VinistoMongoConnectorModelsMultiLangValue[] | null;
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
    /** Flag for hide specificaton */
    isHidden?: boolean;
    /** Flag for show/hide specification in product detail */
    isDetail?: boolean;
    /**
     * List of tabs in which this specification is shown.
     * Defined by ProductAttributeTab enum, possibly dynamic in the future.
     */
    productAttributeTabs?:
      | VinistoHelperDllEnumsSpecificationProductAttributeTab[]
      | null;
  };

/**
 * Represents value base specification value, which reference a specification definition and contains respective value
 * IMPORTANT!!! - changing this object please increase model version of this or main mongo object and create Migration!
 */
export interface VinistoMongoConnectorModelsSpecificationBaseSpecificationValue {
  /** Id of specification definition */
  definitionId?: string | null;
}

/**
 * Represents specification with bool values (checkbox)
 * IMPORTANT!!! - changing this object please increase model version of this or main mongo object and create Migration!
 */
export type VinistoMongoConnectorModelsSpecificationCheckBoxSpecificationDefinition =
  VinistoMongoConnectorModelsSpecificationBaseSpecificationDefinition & object;

/**
 * Represents value for specification with bool value
 * IMPORTANT!!! - changing this object please increase model version of this or main mongo object and create Migration!
 */
export type VinistoMongoConnectorModelsSpecificationCheckBoxSpecificationValue =
  VinistoMongoConnectorModelsSpecificationBaseSpecificationValue & {
    /** Bool value */
    value?: boolean;
  };

/**
 * Specifies allowed value with scoring so they could be ordered
 * IMPORTANT!!! - changing this object please increase model version of this or main mongo object and create Migration!
 */
export interface VinistoMongoConnectorModelsSpecificationComboBoxAllowedValueDefinition {
  /** Name of the specification - list containing language versions */
  name?: VinistoMongoConnectorModelsMultiLangValue[] | null;
  /** Description of the specification allowed value - list containing language versions */
  description?: VinistoMongoConnectorModelsMultiLangValue[] | null;
  /** Meta description of the specification allowed value - list containing language versions */
  metaDescription?: VinistoMongoConnectorModelsMultiLangValue[] | null;
  /** Image id of the specification allowed value - list containing language versions */
  imageId?: VinistoMongoConnectorModelsMultiLangValue[] | null;
  /** Icon id of the specification allowed value - list containing language versions */
  iconId?: VinistoMongoConnectorModelsMultiLangValue[] | null;
  /**
   * Score of the allowed value
   * @format int32
   */
  score?: number;
}

/**
 * Represents specification with predefined text values (combobox)
 * IMPORTANT!!! - changing this object please increase model version of this or main mongo object and create Migration!
 */
export type VinistoMongoConnectorModelsSpecificationComboBoxSpecificationDefinition =
  VinistoMongoConnectorModelsSpecificationBaseSpecificationDefinition & {
    /**
     * Name of the specification - list containing language versions
     * key is name of selected value, The value is then referenced by the index
     * value is list of various multilang values for given index
     */
    allowedValues?: Record<
      string,
      VinistoMongoConnectorModelsSpecificationComboBoxAllowedValueDefinition
    >;
  };

/**
 * Represents value for specification with predefined values - combobox
 * IMPORTANT!!! - changing this object please increase model version of this or main mongo object and create Migration!
 */
export type VinistoMongoConnectorModelsSpecificationComboBoxSpecificationValue =
  VinistoMongoConnectorModelsSpecificationBaseSpecificationValue & {
    /** Reference to defined values in definition */
    selectedValueName?: string | null;
  };

/**
 * Represents decimal number specification with unit and additional imperial unit
 * IMPORTANT!!! - changing this object please increase model version of this or main mongo object and create Migration!
 */
export type VinistoMongoConnectorModelsSpecificationDecimalNumberImperialSpecificationDefinition =
  VinistoMongoConnectorModelsSpecificationNumberImperialSpecificationDefinition &
    object;

/**
 * Represents value for specification with float value
 * IMPORTANT!!! - changing this object please increase model version of this or main mongo object and create Migration!
 */
export type VinistoMongoConnectorModelsSpecificationDecimalNumberImperialSpecificationValue =
  VinistoMongoConnectorModelsSpecificationDecimalNumberSpecificationValue & {
    /**
     * Imperial value ... value in imperial units
     * @format float
     */
    imperialValue?: number;
  };

/**
 * Represents decimal number specification with optional unit
 * IMPORTANT!!! - changing this object please increase model version of this or main mongo object and create Migration!
 */
export type VinistoMongoConnectorModelsSpecificationDecimalNumberSpecificationDefinition =
  VinistoMongoConnectorModelsSpecificationNumberSpecificationDefinition &
    object;

/**
 * Represents value for specification with float value
 * IMPORTANT!!! - changing this object please increase model version of this or main mongo object and create Migration!
 */
export type VinistoMongoConnectorModelsSpecificationDecimalNumberSpecificationValue =
  VinistoMongoConnectorModelsSpecificationBaseSpecificationValue & {
    /**
     * float value
     * @format float
     */
    value?: number;
  };

/**
 * Represents specification with predefined text values (multicombobox)
 * IMPORTANT!!! - changing this object please increase model version of this or main mongo object and create Migration!
 */
export type VinistoMongoConnectorModelsSpecificationMultiComboBoxSpecificationDefinition =
  VinistoMongoConnectorModelsSpecificationComboBoxSpecificationDefinition &
    object;

/**
 * Represents value for specification with predefined values - multicombobox
 * IMPORTANT!!! - changing this object please increase model version of this or main mongo object and create Migration!
 */
export type VinistoMongoConnectorModelsSpecificationMultiComboBoxSpecificationValue =
  VinistoMongoConnectorModelsSpecificationBaseSpecificationValue & {
    /** Reference to defined values in definition */
    selectedValuesName?: string[] | null;
  };

/**
 * Represents number specification with unit and additional imperial unit
 * IMPORTANT!!! - changing this object please increase model version of this or main mongo object and create Migration!
 */
export type VinistoMongoConnectorModelsSpecificationNumberImperialSpecificationDefinition =
  VinistoMongoConnectorModelsSpecificationNumberSpecificationDefinition & {
    /** Imperial Unit displayed after the decimal value - list containing language versions */
    imperialUnit?: VinistoMongoConnectorModelsMultiLangValue[] | null;
  };

/**
 * Represents value for specification with integer value
 * IMPORTANT!!! - changing this object please increase model version of this or main mongo object and create Migration!
 */
export type VinistoMongoConnectorModelsSpecificationNumberImperialSpecificationValue =
  VinistoMongoConnectorModelsSpecificationNumberSpecificationValue & {
    /**
     * Integer value
     * @format int32
     */
    imperialValue?: number;
  };

/**
 * Represents number specification with optional unit
 * IMPORTANT!!! - changing this object please increase model version of this or main mongo object and create Migration!
 */
export type VinistoMongoConnectorModelsSpecificationNumberSpecificationDefinition =
  VinistoMongoConnectorModelsSpecificationBaseSpecificationDefinition & {
    /** Metric Unit displayed after the decimal value - list containing language versions */
    unit?: VinistoMongoConnectorModelsMultiLangValue[] | null;
  };

/**
 * Represents value for specification with integer value
 * IMPORTANT!!! - changing this object please increase model version of this or main mongo object and create Migration!
 */
export type VinistoMongoConnectorModelsSpecificationNumberSpecificationValue =
  VinistoMongoConnectorModelsSpecificationBaseSpecificationValue & {
    /**
     * Integer value
     * @format int32
     */
    value?: number;
  };

/**
 * Represents specification for price. This specification has only definition.
 * IMPORTANT!!! - changing this object please increase model version of this or main mongo object and create Migration!
 */
export type VinistoMongoConnectorModelsSpecificationPriceSpecificationDefinition =
  VinistoMongoConnectorModelsSpecificationBaseSpecificationDefinition & object;

/**
 * Represents specification with free text
 * IMPORTANT!!! - changing this object please increase model version of this or main mongo object and create Migration!
 */
export type VinistoMongoConnectorModelsSpecificationTextSpecificationDefinition =
  VinistoMongoConnectorModelsSpecificationBaseSpecificationDefinition & object;

/**
 * Represents value for specification with free text
 * IMPORTANT!!! - changing this object please increase model version of this or main mongo object and create Migration!
 */
export type VinistoMongoConnectorModelsSpecificationTextSpecificationValue =
  VinistoMongoConnectorModelsSpecificationBaseSpecificationValue & {
    /** Multi language text value */
    value?: VinistoMongoConnectorModelsMultiLangValue[] | null;
  };

/** Represents bundle request for stocking request */
export interface VinistoMongoConnectorModelsStockingRequestBundleStockingRequest {
  /** Id of the bundle */
  bundleId?: string | null;
  /**
   * Requested count of the bundle
   * @format int32
   */
  requestedCount?: number;
  /**
   * Delivered count of the bundle
   * @format int32
   */
  deliveredCount?: number | null;
  /** Note */
  note?: string | null;
}

/** Represents stocking request state change log */
export interface VinistoMongoConnectorModelsStockingRequestStateChangeRecord {
  /** State which was changed */
  stockingState?: VinistoHelperDllEnumsStockingRequestStockingState;
  /**
   * Time of the change
   * @format int64
   */
  changeTime?: number;
}

/**
 * Represents a stocking request
 * IMPORTANT!!! - changing this object please increase model version of this or main mongo object and create Migration!
 */
export type VinistoMongoConnectorModelsStockingRequestStockingRequest =
  VinistoMongoConnectorModelsBaseMongoObject & {
    /** Stocking request number */
    requestNumber?: string | null;
    /** Supplier id */
    supplierId?: string | null;
    /** Delivery type of stocking request */
    deliveryType?: VinistoHelperDllEnumsStockingRequestDeliveryType;
    /** State of stocking request */
    stockingState?: VinistoHelperDllEnumsStockingRequestStockingState;
    /** Delviery of stocking request */
    deliveryId?: string | null;
    /** Tracking number of stocking request */
    trackingNumber?: string | null;
    /**
     * Delivery date of stocking request
     * @format int64
     */
    deliveryDate?: number | null;
    /** Delivery time interval of stocking request */
    deliveryTime?: VinistoHelperDllEnumsStockingRequestDeliveryTime | null;
    /**
     * Stocking date of stocking request
     * @format int64
     */
    stockingDate?: number | null;
    /** Delivery receipt of stocking request */
    deliveryReceipt?: string | null;
    /** List of bundle request */
    bundles?:
      | VinistoMongoConnectorModelsStockingRequestBundleStockingRequest[]
      | null;
    /** Flag to specify is sended to seller */
    isSent?: boolean;
    /** List of state change records */
    stateChangeRecords?:
      | VinistoMongoConnectorModelsStockingRequestStateChangeRecord[]
      | null;
    /** Latest errors that occurred during update stocking request. */
    errors?: string[] | null;
    /** Administrator note, kept internally. */
    adminNote?: string | null;
    /** Supplier */
    supplier?: VinistoMongoConnectorModelsSupplierSupplier | null;
  };

/**
 * Represents last number for generate stocking request number.
 * IMPORTANT!!! - changing this object please increase model version of this or main mongo object and create Migration!
 */
export type VinistoMongoConnectorModelsStockingRequestNumberStockingRequestNumber =
  VinistoMongoConnectorModelsBaseMongoObject & {
    /**
     * Our last number for generate stocking request number
     * @format int32
     */
    lastNumber?: number;
  };

/** Represents last number to generate subscription variable symbol. */
export type VinistoMongoConnectorModelsSubscriptionVariableSymbolNumberSubscriptionVariableSymbolNumber =
  VinistoMongoConnectorModelsBaseMongoObject & {
    /** @format int32 */
    lastNumber?: number;
  };

/**
 * Represents supplier address
 * IMPORTANT!!! - changing this object please increase model version of this or main mongo object and create Migration!
 */
export type VinistoMongoConnectorModelsSupplierAddress =
  VinistoMongoConnectorModelsCommonBaseAddress & {
    /** Addressee */
    addressee?: string | null;
  };

/**
 * Represents a supplier
 * IMPORTANT!!! - changing this object please increase model version of this or main mongo object and create Migration!
 */
export type VinistoMongoConnectorModelsSupplierSupplier =
  VinistoMongoConnectorModelsBaseMongoObject & {
    /** Web name of the supplier */
    nameWeb?: string | null;
    /** Billing name of the supplier */
    nameBilling?: string | null;
    /** Normalized name used for autocomplete */
    nameNormalized?: string | null;
    /** Supplier abbreviation in flexibee - for automatic invoice matching during import. */
    abbreviationInFlexibee?: string | null;
    /** Company Identification Number of the supplier */
    ico?: string | null;
    /** VAT (value-added tax) number of the supplier */
    dic?: string | null;
    /**
     * Supplier billing address
     *
     * TODO - consider change to nullable for endpoint DELETE /supplier-api/suppliers/{supplierId}/address
     */
    address?: VinistoMongoConnectorModelsSupplierAddress | null;
    /** Country code of the supplier */
    countryCode?: VinistoHelperDllEnumsCountryCode;
    /** List of user IDs that can edit supplier data */
    userIds?: string[] | null;
    /** List of supplier tag ids. */
    supplierTagIds?: string[] | null;
    /** Type of the supplier */
    supplierType?: VinistoHelperDllEnumsSupplierSupplierType;
    /** IsShipping. It is necessary for fee calculation */
    isShipping?: boolean;
    /** Supplier web */
    web?: VinistoMongoConnectorModelsMultiLangValue[] | null;
    /** Supplier comapny description */
    companyDescription?: VinistoMongoConnectorModelsMultiLangValue[] | null;
    /** Supplier main profile */
    mainProfile?: VinistoMongoConnectorModelsMultiLangValue[] | null;
    /** Supplier wine region */
    wineRegion?: VinistoMongoConnectorModelsMultiLangValue[] | null;
    /** Address of the pick up. Is used to specify pick up point when IsShipping = false. */
    pickupAddress?: VinistoMongoConnectorModelsSupplierAddress | null;
    /** Bank account number of the supplier */
    bankAccountNumber?: string | null;
    /** Prefix for supplier coupons */
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
     * Maximum discount for a supplier B2C promotion in percent.
     * @format double
     */
    maxB2cPromotionDiscountPercentage?: number | null;
    /**
     * Maximum number of supplier B2C promotions per year.
     * @format int32
     */
    maxB2cPromotionsPerYear?: number | null;
  };

/**
 * Represents supplier tag.
 * IMPORTANT!!! - changing this object please increase model version of this or main mongo object and create Migration!
 */
export type VinistoMongoConnectorModelsSupplierTagSupplierTag =
  VinistoMongoConnectorModelsBaseMongoObject & {
    /** Name of the tag - list containing language versions. */
    name?: VinistoMongoConnectorModelsMultiLangValue[] | null;
    /** Normalized name used for autocomplete. */
    nameNormalized?: VinistoMongoConnectorModelsMultiLangValue[] | null;
    /** Description of the tag - list containing language versions. */
    description?: VinistoMongoConnectorModelsMultiLangValue[] | null;
    /** Meta Description of the tag - list containing language versions */
    metaDescription?: VinistoMongoConnectorModelsMultiLangValue[] | null;
    /** Url of the tag - list containing language versions. */
    url?: VinistoMongoConnectorModelsMultiLangValue[] | null;
    /** Tag color in RGB ("#000000"). */
    color?: string | null;
    /** True when tag is visible and can be used, otherwise false. */
    isDeleted?: boolean;
  };

/** Base object of tag slug. */
export interface VinistoMongoConnectorModelsTagBaseTagSlug {
  value?: string | null;
}

/**
 * Represents tag.
 * IMPORTANT!!! - when changing this object please increase model version of this or main mongo object and create Migration!
 */
export type VinistoMongoConnectorModelsTagTag =
  VinistoMongoConnectorModelsBaseMongoObject & {
    name?: string | null;
    description?: string | null;
    metaDescription?: string | null;
    metaTitle?: string | null;
    slugs?: VinistoMongoConnectorModelsTagTagSlugMain[] | null;
    color?: string | null;
    isEnabled?: boolean;
    isOnHomepage?: boolean;
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
      | (
          | VinistoMongoConnectorModelsCommonSpecificationsCheckBoxSpecification
          | VinistoMongoConnectorModelsCommonSpecificationsComboBoxSpecification
          | VinistoMongoConnectorModelsCommonSpecificationsDecimalNumberSpecification
          | VinistoMongoConnectorModelsCommonSpecificationsMultiComboBoxSpecification
          | VinistoMongoConnectorModelsCommonSpecificationsNumberSpecification
          | VinistoMongoConnectorModelsCommonSpecificationsStringSpecification
          | VinistoMongoConnectorModelsCommonSpecificationsTextSpecification
        )[]
      | null;
  };

/** Extended object of tag slug to mark main slug. */
export type VinistoMongoConnectorModelsTagTagSlugMain =
  VinistoMongoConnectorModelsTagBaseTagSlug & {
    isMain?: boolean;
  };

/**
 * Represents user address
 * IMPORTANT!!! - changing this object please increase model version of this or main mongo object and create Migration!
 */
export type VinistoMongoConnectorModelsUserAddress =
  VinistoMongoConnectorModelsUserBaseUserAddress & {
    /** Id of the Address */
    id?: string | null;
    /** Name of the addressee */
    name?: string | null;
    /** Surname of the addressee */
    surname?: string | null;
    /** Company */
    company?: string | null;
  };

/**
 * Represents a buyer user.
 * IMPORTANT!!! - changing this object please increase model version of this or main mongo object and create Migration!
 */
export type VinistoMongoConnectorModelsUserBaseBuyerUser =
  VinistoMongoConnectorModelsUserBaseUser & {
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

/**
 * Represents a base user.
 * IMPORTANT!!! - changing this object please increase model version of this or main mongo object and create Migration!
 */
export type VinistoMongoConnectorModelsUserBaseUser =
  VinistoMongoConnectorModelsBaseMongoObject & {
    /** Contains list of possible types User types. */
    type?: VinistoHelperDllEnumsUserUserType;
    /** Email of the user */
    email?: string | null;
    /** Password hash */
    passwordHash?: string | null;
    /** Login key */
    loginKey?: string | null;
    /** Login hash */
    loginHashShop?: string | null;
    /** Login hash */
    loginHashAdmin?: string | null;
    /** Login hash */
    loginHashClient?: string | null;
    /**
     * Time of the registration - timestamp in seconds from 1.1.1970
     * @format int64
     */
    registrationTime?: number;
    /**
     * Time of the last login - timestamp in seconds from 1.1.1970
     * @format int64
     */
    lastLoginTime?: number | null;
    /** Is email verified */
    isEmailVerified?: boolean;
    /** List of available user hashes */
    hashes?: VinistoMongoConnectorModelsUserHash[] | null;
    /** List of ids of user available addresses */
    addresses?: VinistoMongoConnectorModelsUserAddress[] | null;
    /** List of available user permissions */
    permissions?: VinistoHelperDllEnumsUserUserRights[] | null;
    /** True if is super admin as permission to set permissions */
    isSuperAdmin?: boolean;
    /** List of users billing infos */
    billingInfos?: VinistoMongoConnectorModelsUserBillingInfo[] | null;
    /** Nickname */
    nickname?: string | null;
    /** Price level */
    priceLevel?: VinistoHelperDllEnumsPriceLevel | null;
    googleAuthToken?: string | null;
    facebookAuthToken?: string | null;
    appleAuthToken?: string | null;
    seznamAuthToken?: string | null;
    /** Identifies type of the country */
    registrationCountry?: VinistoHelperDllEnumsCountryCode;
    /** Contains list of possible company states. */
    state?: VinistoHelperDllEnumsUserUserState;
  };

/** Represents base user address */
export type VinistoMongoConnectorModelsUserBaseUserAddress =
  VinistoMongoConnectorModelsCommonBaseAddress & {
    isDefault?: boolean;
  };

/**
 * Represents user billing info
 * IMPORTANT!!! - changing this object please increase model version of this or main mongo object and create Migration!
 */
export type VinistoMongoConnectorModelsUserBillingInfo =
  VinistoMongoConnectorModelsUserBaseUserAddress & {
    /** Id of the Billing Information */
    id?: string | null;
    /** Person's first name */
    name?: string | null;
    /** Person's second name */
    surname?: string | null;
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
  };

/** Represents a company. Includes main company data. */
export type VinistoMongoConnectorModelsUserCompany =
  VinistoMongoConnectorModelsUserBaseBuyerUser & {
    ico?: string | null;
    firstName?: string | null;
    surname?: string | null;
    phone?: string | null;
    companyEmail?: string | null;
    positionInCompany?: string | null;
    /** @format int64 */
    customerFrom?: number;
    /** @format int32 */
    invoiceDueDate?: number | null;
    /** @format double */
    credit?: number;
    /** Identifies preferred company payment type. */
    paymentMethod?: VinistoHelperDllEnumsUserCompanyPaymentType;
    /** Identifies preferred company payment type. */
    industryType?: VinistoHelperDllEnumsCompanyUserIndustryType;
    /** @format double */
    monthlyTurnover?: number | null;
    /** @format int32 */
    orderingFrequency?: number | null;
    users?: VinistoMongoConnectorModelsUserCompanyUser[] | null;
    agreementCCNote?: string | null;
    /** Identifies preferred communication types. */
    preferredCommunicationType?: VinistoHelperDllEnumsUserCompanyCommunicationType;
    /** Contains data obtained form ares and mfcr. */
    validationData?: VinistoMongoConnectorModelsUserCompanyValidationData | null;
  };

/** Represents a company user. */
export interface VinistoMongoConnectorModelsUserCompanyUser {
  userId?: string | null;
  /** Identifies company user rights. */
  right?: VinistoHelperDllEnumsUserCompanyCompanyUserRights;
}

/** Contains data obtained form ares and mfcr. */
export interface VinistoMongoConnectorModelsUserCompanyValidationData {
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

/**
 * Represents a user hash
 * IMPORTANT!!! - changing this object please increase model version of this or main mongo object and create Migration!
 */
export interface VinistoMongoConnectorModelsUserHash {
  /** Value of the computed hash */
  value?: string | null;
  /**
   * Type of the hash
   * @format int32
   */
  type?: number;
  /**
   * Expiration time - timestamp in seconds from 1.1.1970
   * @format int64
   */
  expirationTime?: number;
}

/** Represents a company. Includes main company data. */
export type VinistoMongoConnectorModelsUserMerchant =
  VinistoMongoConnectorModelsUserBaseUser & {
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
  };

/**
 * Represents a user
 * IMPORTANT!!! - changing this object please increase model version of this or main mongo object and create Migration!
 */
export type VinistoMongoConnectorModelsUserUser =
  VinistoMongoConnectorModelsUserBaseBuyerUser & {
    /** Has supplier */
    hasSupplier?: boolean;
  };

/**
 * Represents a user log
 * IMPORTANT!!! - changing this object please increase model version of this or main mongo object and create Migration!
 */
export type VinistoMongoConnectorModelsUserLogUserLog =
  VinistoMongoConnectorModelsBaseMongoObject & {
    /** User id */
    userId?: string | null;
    /** The IP Address from which the action was done. */
    ipAddress?: string | null;
    /** The action which is logged */
    action?: string | null;
    /** Note to the logged action */
    note?: string | null;
  };

/**
 * Represents a virtual category.
 * IMPORTANT!!! - changing this object please increase model version of this or main mongo object and create Migration!
 */
export type VinistoMongoConnectorModelsVirtualCategoryVirtualCategory =
  VinistoMongoConnectorModelsBaseMongoObject & {
    group?: string | null;
    url?: string | null;
    titleH1?: VinistoMongoConnectorModelsMultiLangValue[] | null;
    seoTitle?: VinistoMongoConnectorModelsMultiLangValue[] | null;
    seoDescription?: VinistoMongoConnectorModelsMultiLangValue[] | null;
    contentHtml?: VinistoMongoConnectorModelsMultiLangValue[] | null;
    /** Contains list of possible virtual category states */
    state?: VinistoHelperDllEnumsVirtualCategoryState;
  };

/**
 * Represents Warehouse
 * IMPORTANT!!! - changing this object please increase model version of this or main mongo object and create Migration!
 */
export type VinistoMongoConnectorModelsWarehouseWarehouse =
  VinistoMongoConnectorModelsBaseMongoObject & {
    /** External identification of warehouse. */
    externalId?: string | null;
    /** Name of the warehouse. */
    name?: string | null;
  };

/**
 * Represents Warehouse item
 * IMPORTANT!!! - changing this object please increase model version of this or main mongo object and create Migration!
 */
export type VinistoMongoConnectorModelsWarehouseWarehouseItem =
  VinistoMongoConnectorModelsBaseMongoObject & {
    /** Unix datetime of item chagne */
    itemType?: VinistoHelperDllEnumsItemType;
    /** Product Id or Bundle Id */
    itemId?: string | null;
    /**
     * Count of pieces in warehouse
     * @format int32
     */
    quantity?: number;
    /** Bundle detail */
    bundleItem?: VinistoMongoConnectorModelsBundleBundle | null;
    /** Change log */
    product?: VinistoMongoConnectorModelsProductProduct | null;
  };

/**
 * Represents Warehouse Bundle Snapshot item
 * IMPORTANT!!! - changing this object please increase model version of this or main mongo object and create Migration!
 */
export type VinistoMongoConnectorModelsWarehouseBundleSnapshotWarehouseBundleSnapshot =
  VinistoMongoConnectorModelsBaseMongoObject & {
    bundleId?: string | null;
    /**
     * Total quantity of this bundle from all warehouses.
     * @format int32
     */
    totalQuantity?: number;
    /** Current quantity of this bundle for each of the warehouses. */
    warehouseStocks?:
      | VinistoMongoConnectorModelsWarehouseBundleSnapshotWarehouseStock[]
      | null;
    /** Id of last movement which is computed to bundle snapshot */
    lastMovementId?: string | null;
    /** Bundle detail */
    bundleItem?: VinistoMongoConnectorModelsBundleBundle | null;
    /** Change log */
    productWarehouseId?: string | null;
  };

export interface VinistoMongoConnectorModelsWarehouseBundleSnapshotWarehouseStock {
  warehouseId?: string | null;
  /**
   * Current quantity of bundles for this warehouse.
   * @format int32
   */
  quantity?: number;
}

/**
 * Represents Change log item. Save information about one change in warehouse
 * IMPORTANT!!! - changing this object please increase model version of this or main mongo object and create Migration!
 */
export type VinistoMongoConnectorModelsWarehouseChangeLogWarehouseChangeLog =
  VinistoMongoConnectorModelsBaseMongoObject & {
    itemId?: string | null;
    bundleId?: string | null;
    warehouseId?: string | null;
    /**
     * Count of pieces after change in warehouse
     * @format int32
     */
    quantity?: number;
    /** User id */
    userId?: string | null;
    /** Document Number - it's order number or stocking number */
    documentNumber?: string | null;
    /** Receipt id */
    receiptId?: string | null;
    /** Quantity change reason */
    changeReason?: VinistoHelperDllEnumsWarehouseChangeReasonType;
    externalOrderId?: string | null;
  };

/**
 * Represents Warehouse Movement item
 * IMPORTANT!!! - changing this object please increase model version of this or main mongo object and create Migration!
 */
export type VinistoMongoConnectorModelsWarehouseMovementWarehouseMovement =
  VinistoMongoConnectorModelsBaseMongoObject & {
    bundleId?: string | null;
    /**
     * Quantity change of bundle movement. Can be a negative number.
     * @format int32
     */
    quantity?: number;
    /** WarehouseId that stores this bundle. */
    warehouseId?: string | null;
    externalOrderId?: string | null;
  };

/** Represents automatic coupon. */
export interface VinistoOrderDllModelsApiAutomaticCouponAutomaticCoupon {
  /**
   * Id of the billing
   * @minLength 1
   */
  id: string;
  /**
   * Name
   * @minLength 1
   */
  name: string;
  /**
   * Minimal price of order. Is used to check rule after order payment.
   * @format double
   */
  minOrderPrice?: number | null;
  /**
   * Maximal price of order. Is used to check rule after order payment.
   * @format double
   */
  maxOrderPrice?: number | null;
  /** Trigger */
  trigger?: VinistoOrderDllModelsApiAutomaticCouponTrigger | null;
  /** Contains list of possible types Order API - Discount coupon. */
  discountType?: VinistoHelperDllEnumsDiscountCouponDiscountCouponType;
  /**
   * Discount value
   * @format double
   */
  discountValue?: number;
  /** Currency */
  currency?: VinistoHelperDllEnumsCurrency;
  /** Identifies type of the country */
  countryOfSale?: VinistoHelperDllEnumsCountryCode;
  /** Contains list of possible languages */
  language?: VinistoHelperDllEnumsLanguage;
  /**
   * Day count to coupon expiration
   * @format int32
   */
  expirationDays?: number;
  /** Can be combined with other coupons - true if is combinable */
  isCombinable?: boolean;
  /** Can be used for discounted items - true if can be used for discounted items */
  isForDiscountedItems?: boolean;
  /**
   * Minimal price of basket to coupon application. When is set to 0, coupon si unlimited.
   * @format double
   */
  applicableFrom?: number | null;
  /** Limitation definition */
  limitationDefinition?:
    | VinistoCommonDllModelsApiCouponLimitationsLimitationDefinitionCategory
    | VinistoCommonDllModelsApiCouponLimitationsLimitationDefinitionNone
    | VinistoCommonDllModelsApiCouponLimitationsLimitationDefinitionSpecification
    | VinistoCommonDllModelsApiCouponLimitationsLimitationDefinitionSupplier
    | null;
}

/** Parameters which is possible to provided to api to specify request to create new automatic coupon */
export type VinistoOrderDllModelsApiAutomaticCouponAutomaticCouponCreateParameters =
  VinistoOrderDllModelsApiAutomaticCouponAutomaticCouponManipulationParameters & {
    limitationDefinition: any;
    /** @minLength 1 */
    name: string;
    /** Contains list of possible types Order API - Discount coupon. */
    discountType: VinistoHelperDllEnumsDiscountCouponDiscountCouponType;
    /** @format double */
    discountValue: number;
    /** Currency */
    currency?: VinistoHelperDllEnumsCurrency;
    /** Identifies type of the country */
    countryOfSale?: VinistoHelperDllEnumsCountryCode;
    /** Contains list of possible languages */
    language?: VinistoHelperDllEnumsLanguage;
    /**
     * Day count to coupon expiration.
     * @format int32
     */
    expirationDays?: number;
    /** Can be combined with other coupons - true if is combinable. */
    isCombinable?: boolean;
    /** Can be used for discounted items - true if can be used for discounted items. */
    isForDiscountedItems?: boolean;
  };

/** Parameters which is possible to provided to api to specify request to edit automatic coupon */
export type VinistoOrderDllModelsApiAutomaticCouponAutomaticCouponEditParameters =
  VinistoOrderDllModelsApiAutomaticCouponAutomaticCouponManipulationParameters & {
    limitationDefinition?: any;
    name?: string | null;
    discountType?: VinistoHelperDllEnumsDiscountCouponDiscountCouponType | null;
    /** @format double */
    discountValue?: number | null;
    /** Basket price currency. */
    currency?: VinistoHelperDllEnumsCurrency | null;
    countryOfSale?: VinistoHelperDllEnumsCountryCode | null;
    language?: VinistoHelperDllEnumsLanguage | null;
    /**
     * Day count to coupon expiration.
     * @format int32
     */
    expirationDays?: number | null;
    /** Can be combined with other coupons - true if is combinable. */
    isCombinable?: boolean | null;
    /** Can be used for discounted items - true if can be used for discounted items. */
    isForDiscountedItems?: boolean | null;
  };

/** Base parameters which is possible to provided to api. */
export interface VinistoOrderDllModelsApiAutomaticCouponAutomaticCouponManipulationParameters {
  /** Trigger attributes. */
  trigger: VinistoOrderDllModelsApiAutomaticCouponTrigger;
  /**
   * Minimal price of basket to coupon application. When is set to 0, coupon si unlimited.
   * @format double
   */
  applicableFrom?: number | null;
  /**
   * Minimal price of order. Is used to check rule after order payment.
   * @format double
   */
  minOrderPrice?: number | null;
  /**
   * Maximal price of order. Is used to check rule after order payment.
   * @format double
   */
  maxOrderPrice?: number | null;
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

/** Represents automatic coupon trigger object. */
export interface VinistoOrderDllModelsApiAutomaticCouponTrigger {
  /** Type of trigger */
  type?: VinistoHelperDllEnumsAutomaticCouponTriggerType;
  /**
   * Can be used to delay discount coupon creation process (in hours).
   * @format int32
   */
  delay?: number;
}

/** Represents billing. */
export interface VinistoOrderDllModelsApiBillingBilling {
  /**
   * Id of the billing
   * @minLength 1
   */
  id: string;
  /**
   * Number of the billing
   * @minLength 1
   */
  billingNumber: string;
  /**
   * Number of the invoice
   * @minLength 1
   */
  invoiceNumber: string;
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
  /**
   * Time of the billing creation
   * @format int64
   */
  createdAt?: number;
  /**
   * Supplier ID
   * @minLength 1
   */
  supplierId: string;
  /** Contains list of possible billing states */
  state?: VinistoHelperDllEnumsBillingBillingState;
  /**
   * Sum of all prices without Vat
   * @format double
   */
  totalSum?: number;
  /** List of fee record ids */
  feeRecords: string[];
  /**
   * URL to billing PDF document
   * @minLength 1
   */
  billingPdf: string;
  /**
   * URL to invoice PDF document
   * @minLength 1
   */
  invoicePdf: string;
  /** List of bundles with total SUMs */
  bundles: VinistoOrderDllModelsApiBillingBundle[];
  /** Supplier web name for paired supplier by id */
  supplierName?: string | null;
  /**
   * Sum of yield to supplier for discounts created by VINISTO
   * @format double
   */
  totalSellerDiscount?: number;
  /**
   * Sum of fee to VINISTO for discounts created by suppplier
   * @format double
   */
  totalVinistoDiscount?: number;
  /** List of bundles on the way (not paid and generated fee record). */
  bundlesOnTheWay?:
    | (
        | VinistoOrderDllModelsApiBillingBundleBaseData
        | VinistoOrderDllModelsApiBillingBundle
      )[]
    | null;
}

/** Parameters which is possible to provided to api to specify request for change billing state */
export interface VinistoOrderDllModelsApiBillingBillingChangeParameters {
  /** Contains list of possible billing states */
  billingState: VinistoHelperDllEnumsBillingBillingState;
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

/** Parameters which is possible to provided to api to specify request to create new billing */
export interface VinistoOrderDllModelsApiBillingBillingsCreateParameters {
  /**
   * Time from.
   * @format int64
   */
  timeFrom: number;
  /**
   * Time to.
   * @format int64
   */
  timeTo: number;
  /**
   * Id of the supplier
   * @minLength 1
   */
  supplierId: string;
  /** Contains list of possible languages */
  language?: VinistoHelperDllEnumsLanguage;
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

/** Represents Bundle in Billing. */
export type VinistoOrderDllModelsApiBillingBundle =
  VinistoOrderDllModelsApiBillingBundleBaseData & {
    /**
     * Sum of prices without VAT
     * @format double
     */
    sumPrice?: number;
    /**
     * Sum Fee
     * @format double
     */
    sumFee?: number;
    /**
     * Fee percentage
     * @format double
     */
    percentFee?: number;
    /**
     * Total profit. Is counted as SumPrice - SumFee.
     * @format double
     */
    totalProfit?: number;
    /**
     * Total yield to supplier for discounts created by VINISTO for this bundle
     * @format double
     */
    sellerDiscount?: number;
    /**
     * Total fee to VINISTO for discounts created by suppplier for this bundle
     * @format double
     */
    vinistoDiscount?: number;
  };

export interface VinistoOrderDllModelsApiBillingBundleBaseData {
  /**
   * Id of the bundle
   * @minLength 1
   */
  id: string;
  /** Name of the bundle */
  name: VinistoOrderDllModelsApiCommonMultiLangValue[];
  /**
   * Count of solded items
   * @format int32
   */
  soldPcs?: number;
  /**
   * Bundle lot
   * @minLength 1
   */
  bundleLot: string;
}

/** Class for objects which required to store value in various languages. */
export interface VinistoOrderDllModelsApiCommonMultiLangValue {
  /** Contains list of possible languages */
  language?: VinistoHelperDllEnumsLanguage;
  /**
   * Value
   * @minLength 1
   */
  value: string;
}

export interface VinistoOrderDllModelsApiContractWithdrawalRequestContractWithdrawalRequest {
  id: string | null;
  orderId: string | null;
  orderNumber: string | null;
  /** @format int64 */
  createdAt?: number;
  customerId?: string | null;
  customerEmail: string | null;
  ipAddress?: string | null;
  userAgent?: string | null;
  customerFirstName: string | null;
  customerSurname: string | null;
  /** Postal address */
  customerAddress:
    | VinistoOrderDllModelsApiOrderPostalAddress
    | VinistoOrderDllModelsApiOrderAddress
    | null;
  customerPhone?: string | null;
  bankAccount?: string | null;
  note?: string | null;
  source: VinistoHelperDllEnumsContractWithdrawalRequestContractWithdrawalRequestSource;
  state: VinistoHelperDllEnumsContractWithdrawalRequestContractWithdrawalRequestState;
  customerType: VinistoHelperDllEnumsContractWithdrawalRequestContractWithdrawalRequestCustomerType;
  stateChangeRecords?:
    | VinistoOrderDllModelsApiContractWithdrawalRequestStateChangeRecord[]
    | null;
  internalNote?: string | null;
  processedBy?: string | null;
}

export interface VinistoOrderDllModelsApiContractWithdrawalRequestCreateContractWithdrawalRequestParameters {
  orderId?: string | null;
  orderNumber?: string | null;
  customerId?: string | null;
  customerEmail: string | null;
  customerFirstName: string | null;
  customerSurname: string | null;
  /** Postal address */
  customerAddress:
    | VinistoOrderDllModelsApiOrderPostalAddress
    | VinistoOrderDllModelsApiOrderAddress
    | null;
  customerPhone?: string | null;
  bankAccount?: string | null;
  note?: string | null;
  source: VinistoHelperDllEnumsContractWithdrawalRequestContractWithdrawalRequestSource;
  userLoginHash?: string | null;
  anonymousUserId?: string | null;
}

export interface VinistoOrderDllModelsApiContractWithdrawalRequestStateChangeRecord {
  state?: VinistoHelperDllEnumsContractWithdrawalRequestContractWithdrawalRequestState;
  /** @format int64 */
  changeTime?: number;
  executorUserId?: string | null;
}

/** Represents Bundle in sale dashboard section. */
export interface VinistoOrderDllModelsApiDashboardSaleSaleBundle {
  /**
   * Id of the bundle
   * @minLength 1
   */
  id: string;
  /**
   * Count of solded items
   * @format int32
   */
  soldPcs: number;
  /**
   * Percentage difference of solded products by same previous interval
   * @format int32
   */
  soldPcsPercentageDifference?: number;
  /**
   * Sum of prices without VAT - Sum fees
   * @format double
   */
  sumPrice: number;
  /** Detail of the bundle */
  bundleDetail: VinistoProductDllModelsApiBundleBundle;
}

/** Sale data for supplier by time interval */
export interface VinistoOrderDllModelsApiDashboardSaleSaleData {
  /**
   * Total sold pcs
   * @format int32
   */
  totalSoldPcs?: number;
  /**
   * Percentage difference of total sold pcs by same previous interval
   * @format int32
   */
  totalSoldPcsPercentageDifference?: number;
  /**
   * Total profit. Is counted as SumPrice without VAT - SumFee.
   * @format double
   */
  totalProfit?: number;
  /**
   * Percentage difference of total profit by same previous interval
   * @format int32
   */
  totalProfitPercentageDifference?: number;
  /**
   * Total order count with some supplier bundle
   * @format int32
   */
  totalOrderCount?: number;
  /**
   * Percentage difference of total order count by same previous interval
   * @format int32
   */
  totalOrderCountPercentageDifference?: number;
  /** List of bundles with sale data */
  bundles?: VinistoOrderDllModelsApiDashboardSaleSaleBundle[] | null;
}

/** Represents delivery */
export interface VinistoOrderDllModelsApiDeliveryDelivery {
  /**
   * Id of the delivery
   * @minLength 1
   */
  id: string;
  /**
   * Name of the delivery - list containing language versions
   * Delivery name for second step in basket
   */
  name: VinistoOrderDllModelsApiCommonMultiLangValue[];
  /**
   * Alternative name of the delivery - list containing language versions
   * Delivery name for productDetail and first step in basket
   */
  alternativeName?: VinistoOrderDllModelsApiCommonMultiLangValue[] | null;
  /** Description of the delivery - list containing language versions */
  description: VinistoOrderDllModelsApiCommonMultiLangValue[];
  /** Active flag - true if is active */
  isActive?: boolean;
  /**
   * Delivery time in hours
   * @format int32
   */
  deliveryTime?: number;
  /** Delivery prices */
  prices: VinistoCommonDllModelsApiPricesOrderConditionPrice[];
  /**
   * Minimal allowed weight for this type of delivery [Kg]
   * @format double
   */
  minAllowedWeight?: number;
  /**
   * Maximal allowed weight for this type of delivery [Kg]
   * @format double
   */
  maxAllowedWeight?: number;
  /** Delivery countries */
  countries: VinistoHelperDllEnumsCountryCode[];
  /** Delivery payments */
  payments: VinistoOrderDllModelsApiPaymentPayment[];
  /** Identifies type of the delivery */
  deliveryType?: VinistoHelperDllEnumsOrderDeliveryType;
  /** Pickup point type */
  pickupPointType?: VinistoHelperDllEnumsOrderPickupPointType | null;
  /**
   * Delivery code
   * @minLength 1
   */
  deliveryCode: string;
  /** Tracking URL string */
  trackingUrl?: string | null;
  /**
   * Order
   * @format int32
   */
  order?: number;
  /** Delivery date and time range from to */
  deliveryTimeRange?: VinistoOrderDllModelsApiDeliveryDeliveryTimeRange | null;
  /**
   * Delivery costs (without VAT) in CZK
   * @format double
   */
  costs?: number | null;
  /** Is for stocking flag - true if is for stocking */
  isForStocking?: boolean;
  /** Is for customer delivery flag - true if is for orders */
  isForCustomerDelivery?: boolean;
  /**
   * List of serving zip codes - this delivery delivers only to addresses with zip codes included in this list
   * If empty, all zip codes are served
   */
  servingZipCodes: string[];
  /** Identifies base type of the delivery */
  deliveryBaseType?: VinistoHelperDllEnumsOrderDeliveryBaseType;
  /**
   * Order treshold time
   * @format date-span
   */
  orderTresholdTime: string;
  /** "Is on product detail" flag - if true is viewed alternative delivery name in product detail and in first step in basket */
  isOnProductDetail: boolean;
  /** Delivery note in language */
  note?: VinistoOrderDllModelsApiCommonMultiLangValue[] | null;
  /** Indicates if the delivery is for subscribers */
  isSubscriber?: boolean;
  /** Contains allowed platforms. */
  allowedOnPlatforms?: VinistoHelperDllEnumsDeliveryAndPaymentPlatform[] | null;
  isDeliveryOnSaturday?: boolean;
  isDeliveryOnSunday?: boolean;
}

/** Parameters provided to endpoint for creating delivery */
export type VinistoOrderDllModelsApiDeliveryDeliveryCreateParameters =
  VinistoOrderDllModelsApiDeliveryDeliveryManipulationParameters & {
    /** Active flag of the delivery */
    isActive: boolean;
    /** Identifies type of the delivery */
    deliveryType: VinistoHelperDllEnumsOrderDeliveryType;
    /** Pickup point type (It will only be stored if DeliveryType == PICKUP_POINT, otherwise null will be stored) */
    pickupPointType?: VinistoHelperDllEnumsOrderPickupPointType | null;
    /**
     * Delivery code
     * @minLength 1
     */
    deliveryCode: string;
    /** Tracking URL string */
    trackingUrl?: string | null;
    /**
     * Order
     * @format int32
     */
    order: number;
    /** Identifies base type of the delivery */
    deliveryBaseType: VinistoHelperDllEnumsOrderDeliveryBaseType;
    /**
     * Order treshold time
     * @format date-span
     */
    orderTresholdTime: string;
    /** Allowed platforms. */
    allowedOnPlatforms: VinistoHelperDllEnumsDeliveryAndPaymentPlatform[];
    isDeliveryOnSaturday?: boolean;
    isDeliveryOnSunday?: boolean;
  };

/** Parameters provided to endpoint for editing delivery */
export type VinistoOrderDllModelsApiDeliveryDeliveryEditParameters =
  VinistoOrderDllModelsApiDeliveryDeliveryManipulationParameters & {
    /** Delivery type */
    deliveryType?: VinistoHelperDllEnumsOrderDeliveryType | null;
    /** Pickup point type (It will only be stored if DeliveryType == PICKUP_POINT, otherwise null will be stored) */
    pickupPointType?: VinistoHelperDllEnumsOrderPickupPointType | null;
    /** Delivery code */
    deliveryCode?: string | null;
    /** Tracking URL string */
    trackingUrl?: string | null;
    /**
     * Order
     * @format int32
     */
    order?: number | null;
    /** Delivery base type */
    deliveryBaseType?: VinistoHelperDllEnumsOrderDeliveryBaseType | null;
    /**
     * Order treshold time
     * @format date-span
     */
    orderTresholdTime?: string | null;
    /** Allowed platforms. */
    allowedOnPlatforms?:
      | VinistoHelperDllEnumsDeliveryAndPaymentPlatform[]
      | null;
    isDeliveryOnSaturday?: boolean | null;
    isDeliveryOnSunday?: boolean | null;
  };

/** Parameters which is possible to provided to api to specify which deliveries are requested with allowed condition values */
export interface VinistoOrderDllModelsApiDeliveryDeliveryGetByConditionsParameters {
  cacheMethodKey?: string | null;
  /** Basket id to get. */
  basketId?: string | null;
  /** Language version - if provided, all deliveries will be only in selected language. */
  language?: VinistoHelperDllEnumsLanguage | null;
  /** Currency */
  currency?: VinistoHelperDllEnumsCurrency;
  /** Filter to get deliveries for allowed country */
  allowedCountry?: VinistoHelperDllEnumsCountryCode | null;
  isCache?: boolean;
}

/** Parameters which is possible to provided to api to specify request for add country to delivery */
export interface VinistoOrderDllModelsApiDeliveryDeliveryManipulationCountryParameters {
  /** Identifies type of the country */
  country: VinistoHelperDllEnumsCountryCode;
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

/** Parameters used for creating/editing delivery */
export interface VinistoOrderDllModelsApiDeliveryDeliveryManipulationParameters {
  /** Contains list of possible languages */
  language: VinistoHelperDllEnumsLanguage;
  /**
   * Name of the delivery
   * @minLength 1
   */
  name: string;
  /** Alternative name of the delivery - for productDetail and first step in basket */
  alternativeName?: string | null;
  /**
   * Description of the delivery
   * @minLength 1
   */
  description: string;
  /**
   * Time of the delivery in hours
   * @format int32
   */
  deliveryTime: number;
  /**
   * Minimal allowed weight for this type of delivery [Kg]
   * @format double
   */
  minAllowedWeight: number;
  /**
   * Maximal allowed weight for this type of delivery [Kg]
   * @format double
   */
  maxAllowedWeight: number;
  /**
   * Costs without VAT in CZK
   * @format double
   */
  costs?: number | null;
  /** Is for stocking flag - true if is for stocking */
  isForStocking?: boolean | null;
  /** Is for customer delivery flag - true if is for orders */
  isForCustomerDelivery?: boolean | null;
  /**
   * List of serving zip codes - this delivery delivers only to addresses with zip codes included in this list
   * If empty, all zip codes are served
   */
  servingZipCodes?: string[] | null;
  /** "Is on product detail" flag - if true is viewed alternative delivery name in product detail and in first step in basket */
  isOnProductDetail?: boolean | null;
  note?: string | null;
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

/** Parameters which is possible to provided to api to specify request for add price to delivery */
export interface VinistoOrderDllModelsApiDeliveryDeliveryManipulationPriceParameters {
  /**
   * Price of the delivery
   * @format double
   */
  price?: number;
  /** VatRate */
  vat?: VinistoHelperDllEnumsVatRate;
  /** Currency */
  currency?: VinistoHelperDllEnumsCurrency;
  /**
   * Min order price for using this delivery price
   * @format double
   */
  minOrderPrice?: number;
  /**
   * Max order price for using this delivery price
   * @format double
   */
  maxOrderPrice?: number;
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

/** Represents delivery time range. */
export interface VinistoOrderDllModelsApiDeliveryDeliveryTimeRange {
  /**
   * Day of delivery
   * @format date
   */
  deliveryDate?: string | null;
  /**
   * Delivery time from
   * @format time
   */
  timeFrom?: string | null;
  /**
   * Delivery time to
   * @format time
   */
  timeTo?: string | null;
}

/** Represent amount discount. */
export type VinistoOrderDllModelsApiDiscountCouponDefinitionModelsAmountDiscountCouponDefinition =
  VinistoOrderDllModelsApiDiscountCouponDefinitionModelsConditionalDiscountCouponDefinition & {
    /** AmountDiscount value */
    amountDiscount?:
      | VinistoCommonDllModelsApiPricesPrice
      | VinistoCommonDllModelsApiPricesOrderConditionPrice
      | null;
  };

/** Represents base discount coupon definition. */
export interface VinistoOrderDllModelsApiDiscountCouponDefinitionModelsBaseDiscountCouponDefinition {
  /**
   * Id of the discount coupon
   * @minLength 1
   */
  id: string;
  /** Contains list of possible types Order API - Discount coupon. */
  discountCouponType?: VinistoHelperDllEnumsDiscountCouponDiscountCouponType;
  /** Code of Discount coupon */
  code?: string | null;
  name?: VinistoOrderDllModelsApiCommonMultiLangValue[] | null;
  shortDescription?: VinistoOrderDllModelsApiCommonMultiLangValue[] | null;
  description?: VinistoOrderDllModelsApiCommonMultiLangValue[] | null;
  images?: VinistoImageDllModelsApiImageImage[] | null;
  /**
   * Created at - timestamp value
   * @format int64
   */
  createdAt?: number;
  /** @format int64 */
  validFrom?: number;
  /** @format int64 */
  validTo?: number;
  /** Active flag - true if is active. */
  isActive?: boolean;
  /** Information to which email this coupon was sent. */
  sentToEmail?: string | null;
  /**
   * CanBeApplied flag
   * True if is unexpired (reusable) coupons or unexpired unused (single use) coupons.
   * False if is expired (reusable) coupons or expired (single use) coupons or used (single use) coupons.
   */
  canBeApplied?: boolean;
  /** Metric Unit displayed after the decimal value - list containing language versions. */
  unit?: VinistoOrderDllModelsApiCommonMultiLangValue | null;
  /** Contains trigger attributes from automatic coupon creation process. */
  trigger?: VinistoOrderDllModelsApiDiscountCouponDefinitionModelsTrigger | null;
  /** Is Discount coupon already used. */
  isUsed?: boolean;
  /** Order, where this coupon is used or NULL when there are none or many orders. */
  order?: VinistoOrderDllModelsApiOrderOrder | null;
  /** Currency */
  currency?: VinistoHelperDllEnumsCurrency;
  /** Identifies type of the country */
  countryOfSale?: VinistoHelperDllEnumsCountryCode;
}

/** Represents base common conditions for discount coupons. */
export type VinistoOrderDllModelsApiDiscountCouponDefinitionModelsConditionalDiscountCouponDefinition =
  VinistoOrderDllModelsApiDiscountCouponDefinitionModelsBaseDiscountCouponDefinition & {
    /** Coupon allowed from order in amount from. */
    allowedFrom?:
      | VinistoCommonDllModelsApiPricesPrice
      | VinistoCommonDllModelsApiPricesOrderConditionPrice
      | null;
    /** Active flag - true if is active. */
    isReusable?: boolean;
    /** Can be combined with other coupons - true if is combinable. */
    isCombinable?: boolean;
    /** Can be used for discounted items - true if can be used for discounted items. */
    isForDiscountedItems?: boolean;
    /** Limitation definition. */
    limitationDefinition?:
      | VinistoCommonDllModelsApiCouponLimitationsLimitationDefinitionCategory
      | VinistoCommonDllModelsApiCouponLimitationsLimitationDefinitionNone
      | VinistoCommonDllModelsApiCouponLimitationsLimitationDefinitionSpecification
      | VinistoCommonDllModelsApiCouponLimitationsLimitationDefinitionSupplier
      | null;
    /**
     * If true the discount is taken from supplier fee.
     * If false the discount is taken from vinisto fee.
     */
    isSupplierDiscount?: boolean;
    /**
     * If true discount coupon is visible on product detail.
     * If false discount coupon is not visible on product detail.
     */
    isVisibleOnProductDetail?: boolean;
    /** True if is visible in users section vinisto club. */
    isVisibleInUsersSection?: boolean;
    /** True if can be used for registered (logged in) users only. */
    isForRegisteredUsers?: boolean;
    /** Id of the dynamic category. */
    categoryId?: string | null;
    /** Detail of connected category. */
    category?: VinistoProductDllModelsApiCategoryCategory | null;
  };

/** Represent gift coupon. */
export type VinistoOrderDllModelsApiDiscountCouponDefinitionModelsGiftCouponDefinition =
  VinistoOrderDllModelsApiDiscountCouponDefinitionModelsBaseDiscountCouponDefinition & {
    amount?:
      | VinistoCommonDllModelsApiPricesPrice
      | VinistoCommonDllModelsApiPricesOrderConditionPrice
      | null;
  };

/** Represent percentage discount. */
export type VinistoOrderDllModelsApiDiscountCouponDefinitionModelsPercentageDiscountCouponDefinition =
  VinistoOrderDllModelsApiDiscountCouponDefinitionModelsConditionalDiscountCouponDefinition & {
    /** @format double */
    percentageDiscount?: number;
  };

/** Represents discount coupon trigger information. */
export interface VinistoOrderDllModelsApiDiscountCouponDefinitionModelsTrigger {
  /** Type of trigger */
  type?: VinistoHelperDllEnumsAutomaticCouponTriggerType;
  /** Id of the object, which triggered discount coupon creation (OrderId, UserId...). */
  itemId?: string | null;
}

/** Parameters used for comon create parameters */
export type VinistoOrderDllModelsApiDiscountCouponDefinitionParametersBaseDiscountCouponCreateParameters =
  VinistoOrderDllModelsApiDiscountCouponDefinitionParametersBaseDiscountCouponManipulationParameters & {
    name?: VinistoMongoConnectorModelsMultiLangValue[] | null;
    shortDescription?: VinistoMongoConnectorModelsMultiLangValue[] | null;
    description?: VinistoMongoConnectorModelsMultiLangValue[] | null;
    /** Can be combined with other coupons - true if is combinable */
    isCombinable?: boolean;
    /** Can be used for discounted items - true if can be used for discounted items */
    isForDiscountedItems?: boolean;
    /** Currency */
    currency?: VinistoHelperDllEnumsCurrency;
    /** Identifies type of the country */
    countryOfSale?: VinistoHelperDllEnumsCountryCode;
  };

/** Parameters used for manipulation specification */
export interface VinistoOrderDllModelsApiDiscountCouponDefinitionParametersBaseDiscountCouponManipulationParameters {
  /** @format int64 */
  validFrom: number;
  /** @format int64 */
  validTo: number;
  /** Contains list of possible types Order API - Discount coupon. */
  discountCouponType: VinistoHelperDllEnumsDiscountCouponDiscountCouponType;
  /** Reusable flag - true if is reusable */
  isReusable?: boolean;
  /** Custom name of coupon. If not filled in, will be the generated code. This does not apply to bulk coupon generation */
  code?: string | null;
  /** Represents common price object. */
  allowedFrom?:
    | VinistoMongoConnectorModelsCommonPricesPrice
    | VinistoMongoConnectorModelsCommonPricesOrderConditionPrice
    | null;
  /**
   * Base class for objects which required to store value in various languages.
   * IMPORTANT!!! - changing this object please increase model version of this or main mongo object and create Migration!
   */
  unit?: VinistoMongoConnectorModelsMultiLangValue | null;
  /** Represents common price object. */
  amountDiscount?:
    | VinistoMongoConnectorModelsCommonPricesPrice
    | VinistoMongoConnectorModelsCommonPricesOrderConditionPrice
    | null;
  /**
   * Percentage value for PercentageDiscountCouponDefinition
   * @format double
   */
  percentageDiscount?: number | null;
  /**
   * is taken account only if admin is creating discount
   * If true the discount is taken from supplier fee
   * If false the discount is taken from vinisto fee
   */
  isSupplierDiscount?: boolean | null;
  /**
   * If true discount coupon is displayed in product detail
   * If false discount coupon is not displayed in product detail
   */
  isVisibleOnProductDetail?: boolean | null;
  /** True if is visible in users section vinisto club. */
  isVisibleInUsersSection?: boolean;
  /** True if can be used by registered (logged in) users only. */
  isForRegisteredUsers?: boolean;
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

/** Parameters used for creating new category from discount coupon */
export interface VinistoOrderDllModelsApiDiscountCouponDefinitionParametersCategoryCreateFromCouponParameters {
  /** Contains list of possible languages */
  language?: VinistoHelperDllEnumsLanguage;
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

/** Parameters used for manipulation DiscountCoupon */
export type VinistoOrderDllModelsApiDiscountCouponDefinitionParametersDiscountCouponCreateParameters =
  VinistoOrderDllModelsApiDiscountCouponDefinitionParametersBaseDiscountCouponCreateParameters & {
    externalAuth?: string | null;
    /** Limitation definition */
    limitationDefinition?: any;
  };

/** Parameters used for manipulation DiscountCoupon */
export type VinistoOrderDllModelsApiDiscountCouponDefinitionParametersDiscountCouponEditParameters =
  VinistoOrderDllModelsApiDiscountCouponDefinitionParametersBaseDiscountCouponManipulationParameters & {
    name?: VinistoMongoConnectorModelsMultiLangValue[] | null;
    shortDescription?: VinistoMongoConnectorModelsMultiLangValue[] | null;
    description?: VinistoMongoConnectorModelsMultiLangValue[] | null;
    /** Can be combined with other coupons - true if is combinable */
    isCombinable?: boolean | null;
    /** Can be used for discounted items - true if can be used for discounted items */
    isForDiscountedItems?: boolean | null;
    /** Currency of the discount coupon. */
    currency?: VinistoHelperDllEnumsCurrency | null;
    /** Country of sale for discount coupon. */
    countryOfSale?: VinistoHelperDllEnumsCountryCode | null;
  };

/** Parameters which is possible to provided to api to specify request for checking dicount coupon validity */
export interface VinistoOrderDllModelsApiDiscountCouponDefinitionParametersDiscountCouponsCheckParameters {
  /** Anonymous user id */
  anonymousUser?: string | null;
  /** Contains list of possible languages */
  language: VinistoHelperDllEnumsLanguage;
  /** Currency */
  currency: VinistoHelperDllEnumsCurrency;
  /**
   * Discount code
   * @minLength 1
   */
  discountCouponCode: string;
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

/** Parameters used for create more Discount Coupons */
export type VinistoOrderDllModelsApiDiscountCouponDefinitionParametersDiscountCouponsCreateParameters =
  VinistoOrderDllModelsApiDiscountCouponDefinitionParametersDiscountCouponCreateParameters & {
    /**
     * Count of create discount coupons
     * @format int32
     */
    countCoupons: number;
  };

/** Parameters provided to endpoint for batch deactivating disocunt coupon */
export interface VinistoOrderDllModelsApiDiscountCouponDefinitionParametersDiscountCouponsDeactivationParameters {
  /** List of discount coupon ids */
  discountCouponIds: string[];
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

/** Parameters used for creation of supplier DiscountCoupon */
export type VinistoOrderDllModelsApiDiscountCouponDefinitionParametersSupplierDiscountCouponCreateParameters =
  VinistoOrderDllModelsApiDiscountCouponDefinitionParametersBaseDiscountCouponCreateParameters &
    object;

export interface VinistoOrderDllModelsApiInvoiceInvoice {
  id: string | null;
  invoiceNumber: string | null;
  variableSymbol: string | null;
  /**
   * Invoice due to timestamp.
   * @format int64
   */
  invoiceDueTo: number;
  /**
   * Amount without vat.
   * @format double
   */
  amount: number;
  userId: string | null;
  /** Order, subscription etc. id. */
  objectId: string | null;
  /** Contains all possible invoice states. */
  state: VinistoHelperDllEnumsInvoiceInvoiceState;
  /** Contains all possible invoice types. */
  type: VinistoHelperDllEnumsInvoiceInvoiceType;
  path: string | null;
}

export interface VinistoOrderDllModelsApiOrderActionsBaseAction {
  price:
    | VinistoCommonDllModelsApiPricesPrice
    | VinistoCommonDllModelsApiPricesOrderConditionPrice
    | null;
  isSelectedByDefault?: boolean | null;
}

export type VinistoOrderDllModelsApiOrderActionsSetDeliveryAction =
  VinistoOrderDllModelsApiOrderActionsBaseAction & {
    itemId?: string | null;
    /** @format int32 */
    quantity?: number;
  };

export type VinistoOrderDllModelsApiOrderActionsSetGiftAction =
  VinistoOrderDllModelsApiOrderActionsBaseAction & {
    itemId: string | null;
    /** @format int32 */
    quantity: number;
    /** Represents bundle */
    bundle: VinistoOrderDllModelsApiOrderBundle | null;
  };

export type VinistoOrderDllModelsApiOrderActionsSetPriceAction =
  VinistoOrderDllModelsApiOrderActionsBaseAction & object;

export type VinistoOrderDllModelsApiOrderActionsSetServiceAction =
  VinistoOrderDllModelsApiOrderActionsBaseAction & {
    itemId: string | null;
    /** @format int32 */
    quantity: number;
    /** Represents bundle */
    bundle: VinistoOrderDllModelsApiOrderBundle | null;
  };

export interface VinistoOrderDllModelsApiOrderAddon {
  id: string | null;
  name?: string | null;
  description?: string | null;
  /** Contains list of possible basket addon types. */
  type?: VinistoHelperDllEnumsAddonAddonType;
  /** Identifies type of the country */
  countryOfSale?: VinistoHelperDllEnumsCountryCode;
  /** Currency */
  currency?: VinistoHelperDllEnumsCurrency;
  /** @format int64 */
  validFrom?: number | null;
  /** @format int64 */
  validTo?: number | null;
  /** @format int32 */
  applicableLimit?: number | null;
  /** @format int32 */
  applicableLimitCounter?: number | null;
  actions?:
    | (
        | VinistoOrderDllModelsApiOrderActionsSetDeliveryAction
        | VinistoOrderDllModelsApiOrderActionsSetGiftAction
        | VinistoOrderDllModelsApiOrderActionsSetPriceAction
        | VinistoOrderDllModelsApiOrderActionsSetServiceAction
      )[]
    | null;
  conditions?:
    | (
        | VinistoOrderDllModelsApiOrderConditionsItemCategoryCondition
        | VinistoOrderDllModelsApiOrderConditionsItemCouponCondition
        | VinistoOrderDllModelsApiOrderConditionsItemQuantityCondition
        | VinistoOrderDllModelsApiOrderConditionsItemSpecificationCondition
        | VinistoOrderDllModelsApiOrderConditionsItemSupplierCondition
        | VinistoOrderDllModelsApiOrderConditionsMinOrderPriceCondition
        | VinistoOrderDllModelsApiOrderConditionsMinProductPriceCondition
      )[]
    | null;
}

export interface VinistoOrderDllModelsApiOrderAddonItem {
  /** @format int32 */
  quantity?: number;
  addon?: VinistoOrderDllModelsApiOrderAddon | null;
}

/** Represents delivery address */
export type VinistoOrderDllModelsApiOrderAddress =
  VinistoOrderDllModelsApiOrderPostalAddress & {
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
    /**
     * Phone contact of the addressee
     * @minLength 1
     */
    phone: string;
    /** Note to the address */
    note?: string | null;
    /** Email of the addressee */
    email?: string | null;
    /** Title of the address */
    title?: string | null;
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
  };

/** Represents bundle */
export interface VinistoOrderDllModelsApiOrderBundle {
  /**
   * Id of the bundle
   * @minLength 1
   */
  id: string;
  /** Id of the supplier */
  supplierId?: string | null;
  /**
   * Name of the bundle
   * @minLength 1
   */
  name: string;
  /**
   * Description of the bundle
   * @minLength 1
   */
  description: string;
  /** Origin country of the wine */
  countrySpecification?: string | null;
  /** Producer of the wine */
  producerSpecification?: VinistoOrderDllModelsApiCommonMultiLangValue | null;
  /**
   * Url of the bundle - list containing language versions
   * @minLength 1
   */
  url: string;
  /** Price of the bundle in time of order */
  price:
    | VinistoCommonDllModelsApiPricesPrice
    | VinistoCommonDllModelsApiPricesOrderConditionPrice;
  /** Possible prices for this bundle in time of order. */
  prices?:
    | (
        | VinistoCommonDllModelsApiPricesPrice
        | VinistoCommonDllModelsApiPricesOrderConditionPrice
      )[]
    | null;
  /** Possible price discounts for this bundle in time of order. */
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
  /** Discount Price of the bundle in time of order */
  discountPrice?:
    | VinistoCommonDllModelsApiPricesOrderConditionPrice
    | VinistoCommonDllModelsApiPricesPrice
    | VinistoCommonDllModelsApiPricesPriceDiscountSet
    | VinistoCommonDllModelsApiPricesPriceDiscountSupplier
    | VinistoCommonDllModelsApiPricesPriceDiscountVinisto
    | VinistoCommonDllModelsApiPricesPriceDiscountVolume
    | VinistoCommonDllModelsApiPricesTimeLimitedPriceDiscount
    | null;
  /** Items of the bundle - list containing product definition or bundle definition if bundle is set */
  bundleItems: (
    | VinistoOrderDllModelsApiOrderItemsBundleItem
    | VinistoOrderDllModelsApiOrderItemsProductItem
  )[];
  /** Delivery flag - true if for bundle is delivery free. */
  isDeliveryFree?: boolean;
  /** Main mage of the bundle */
  mainImage?: VinistoImageDllModelsApiImageImage | null;
  /** Average evaluation and all evaluations for bundle */
  bundleEvaluation?: VinistoOrderDllModelsApiOrderBundleEvaluation | null;
  /**
   * Represents a supplier
   * IMPORTANT!!! - changing this object please increase model version of this or main mongo object and create Migration!
   */
  supplierDetail?: VinistoMongoConnectorModelsSupplierSupplier | null;
  /** Flag if it is bundle or set */
  isSet: boolean;
  /** Flag if can bundle send to WMS */
  canSendToWms: boolean;
  /** Represents fee record for order bundle. */
  feeRecord?: VinistoOrderDllModelsApiOrderFeeRecordItem | null;
}

/** Represents data about average evaluation and all evaluations for bundle */
export interface VinistoOrderDllModelsApiOrderBundleEvaluation {
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

export interface VinistoOrderDllModelsApiOrderConditionsBaseCondition {
  operator?: VinistoHelperDllEnumsAddonOperator;
}

export type VinistoOrderDllModelsApiOrderConditionsItemCategoryCondition =
  VinistoOrderDllModelsApiOrderConditionsBaseCondition & {
    itemCategoryId?: string | null;
  };

export type VinistoOrderDllModelsApiOrderConditionsItemCouponCondition =
  VinistoOrderDllModelsApiOrderConditionsBaseCondition & {
    itemCouponId?: string | null;
  };

export type VinistoOrderDllModelsApiOrderConditionsItemQuantityCondition =
  VinistoOrderDllModelsApiOrderConditionsBaseCondition & {
    itemId?: string | null;
    /** @format int32 */
    minItemQuantity?: number;
  };

export type VinistoOrderDllModelsApiOrderConditionsItemSpecificationCondition =
  VinistoOrderDllModelsApiOrderConditionsBaseCondition & {
    specification?:
      | VinistoCommonDllModelsApiSpecificationsCheckBoxSpecification
      | VinistoCommonDllModelsApiSpecificationsComboBoxSpecification
      | VinistoCommonDllModelsApiSpecificationsDecimalNumberSpecification
      | VinistoCommonDllModelsApiSpecificationsMultiComboBoxSpecification
      | VinistoCommonDllModelsApiSpecificationsNumberSpecification
      | VinistoCommonDllModelsApiSpecificationsStringSpecification
      | VinistoCommonDllModelsApiSpecificationsTextSpecification
      | null;
  };

export type VinistoOrderDllModelsApiOrderConditionsItemSupplierCondition =
  VinistoOrderDllModelsApiOrderConditionsBaseCondition & {
    itemSupplierId?: string | null;
  };

export type VinistoOrderDllModelsApiOrderConditionsMinOrderPriceCondition =
  VinistoOrderDllModelsApiOrderConditionsBaseCondition & {
    /** @format double */
    minOrderPrice?: number;
  };

export type VinistoOrderDllModelsApiOrderConditionsMinProductPriceCondition =
  VinistoOrderDllModelsApiOrderConditionsBaseCondition & {
    /** @format double */
    priceWithVat?: number;
    itemId?: string | null;
  };

/** Represents delivery information. */
export interface VinistoOrderDllModelsApiOrderDelivery {
  /**
   * Delivery id
   * @minLength 1
   */
  id: string;
  /** Name of the delivery - list containing language versions */
  name: VinistoOrderDllModelsApiCommonMultiLangValue[];
  /** Description of the delivery - list containing language versions */
  description: VinistoOrderDllModelsApiCommonMultiLangValue[];
  /**
   * Delivery time in days
   * @format int32
   */
  deliveryTime?: number;
  /** Delivery price */
  price:
    | VinistoCommonDllModelsApiPricesPrice
    | VinistoCommonDllModelsApiPricesOrderConditionPrice;
  /**
   * Identification of the delivery address
   * Delivery address or pickup-point has to be provided
   */
  deliveryAddress?: VinistoOrderDllModelsApiOrderAddress | null;
  /**
   * Pickup point.
   * Delivery address or pickup-point has to be provided
   */
  pickupPoint?: VinistoOrderDllModelsApiOrderPickupPoint | null;
  /** Identifies type of the delivery */
  deliveryType?: VinistoHelperDllEnumsOrderDeliveryType;
  /** Id of the package */
  packageId?: string | null;
  /** Tracking url for tracking the package */
  trackingUrl?: string | null;
  /**
   * Delivery code
   * @minLength 1
   */
  deliveryCode: string;
  /**
   * Delivery costs (without VAT) in CZK
   * @format double
   */
  costs?: number | null;
}

/** Represent amount discount on order */
export type VinistoOrderDllModelsApiOrderDiscountCouponAmountDiscountCouponDefinition =
  VinistoOrderDllModelsApiOrderDiscountCouponConditionalDiscountCouponDefinition & {
    /** AmountDiscount value */
    amountDiscount?:
      | VinistoCommonDllModelsApiPricesPrice
      | VinistoCommonDllModelsApiPricesOrderConditionPrice
      | null;
  };

/** Represents base discount coupon definition. */
export interface VinistoOrderDllModelsApiOrderDiscountCouponBaseDiscountCouponDefinition {
  /** Id */
  id?: string | null;
  /** Contains list of possible types Order API - Discount coupon. */
  discountCouponType?: VinistoHelperDllEnumsDiscountCouponDiscountCouponType;
  /** Code of Discount coupon */
  code?: string | null;
  /**
   * Created at - timestamp value
   * @format int64
   */
  creationDate?: number;
  /** @format int64 */
  validFrom?: number;
  /** @format int64 */
  validTo?: number;
  /** Active flag - true if is active */
  isActive?: boolean;
  /** Information to which email this coupon was sent */
  sentToEmail?: string | null;
  /**
   * CanBeApplied flag
   * True if is unexpired (reusable) coupons or unexpired unused (single use) coupons.
   * False if is expired (reusable) coupons or expired (single use) coupons or used (single use) coupons.
   */
  canBeApplied?: boolean;
  /** Metric Unit displayed after the decimal value - list containing language versions */
  unit?: VinistoOrderDllModelsApiCommonMultiLangValue | null;
  /** Is Discount coupon already used */
  isUsed?: boolean;
  /**
   * Discount value witch VAT for order items
   * @format double
   */
  discountValueWithVat?: number;
}

/** Represents base common conditions for discount coupons. */
export type VinistoOrderDllModelsApiOrderDiscountCouponConditionalDiscountCouponDefinition =
  VinistoOrderDllModelsApiOrderDiscountCouponBaseDiscountCouponDefinition & {
    /** Coupon allowed from order in amount from. */
    allowedFrom?:
      | VinistoCommonDllModelsApiPricesPrice
      | VinistoCommonDllModelsApiPricesOrderConditionPrice
      | null;
    /** Active flag - true if is active. */
    isReusable?: boolean;
    /** Limitation definition. */
    limitationDefinition?:
      | VinistoCommonDllModelsApiCouponLimitationsLimitationDefinitionCategory
      | VinistoCommonDllModelsApiCouponLimitationsLimitationDefinitionNone
      | VinistoCommonDllModelsApiCouponLimitationsLimitationDefinitionSpecification
      | VinistoCommonDllModelsApiCouponLimitationsLimitationDefinitionSupplier
      | null;
    /**
     * If true the discount is taken from supplier fee.
     * If false the discount is taken from vinisto fee.
     */
    isSupplierDiscount?: boolean;
  };

/** Represent gift coupon. */
export type VinistoOrderDllModelsApiOrderDiscountCouponGiftCouponDefinition =
  VinistoOrderDllModelsApiOrderDiscountCouponBaseDiscountCouponDefinition & {
    amount?:
      | VinistoCommonDllModelsApiPricesPrice
      | VinistoCommonDllModelsApiPricesOrderConditionPrice
      | null;
  };

/** Represent percentage discount on order */
export type VinistoOrderDllModelsApiOrderDiscountCouponPercentageDiscountCouponDefinition =
  VinistoOrderDllModelsApiOrderDiscountCouponConditionalDiscountCouponDefinition & {
    /** @format double */
    percentageDiscount?: number;
  };

/** Represents exchange rate history */
export interface VinistoOrderDllModelsApiOrderExchangeRate {
  id?: string | null;
  /** @format date */
  day?: string;
  /** Currency */
  currency?: VinistoHelperDllEnumsCurrency;
  /**
   * Only base exchange rate value. Is not directly used to prices computation.
   * @format double
   */
  value?: number;
  /**
   * Use for goods prices computation.
   * @format double
   */
  valueGoods?: number;
  /**
   * Use for discount coupon prices computation.
   * @format double
   */
  valueDiscountCoupons?: number;
  /** @format double */
  coefficient?: number;
}

/** Represents fee record for order bundle. */
export interface VinistoOrderDllModelsApiOrderFeeRecordItem {
  /** @format double */
  supplierYield: number;
  /** @format double */
  supplierYieldWithVat: number;
  /** Represents Fee value defined by percentage or fixed price. */
  totalFeeValue: VinistoOrderDllModelsApiOrderFeeRuleItemFeeValue;
  saleFeeValue: VinistoOrderDllModelsApiOrderFeeRuleItemAppliedFeeRule;
  logisticFeeValue: VinistoOrderDllModelsApiOrderFeeRuleItemAppliedFeeRule;
}

export interface VinistoOrderDllModelsApiOrderFeeRuleItemAppliedFeeRule {
  /** Represents Fee value defined by percentage or fixed price. */
  feeValue?: VinistoOrderDllModelsApiOrderFeeRuleItemFeeValue | null;
  /** Represents Fee rule snapshot with necessary data. */
  feeRule?:
    | VinistoOrderDllModelsApiOrderFeeRuleItemBaseSpecificationFeeRule
    | VinistoOrderDllModelsApiOrderFeeRuleItemDynamicSaleFeeRule
    | VinistoOrderDllModelsApiOrderFeeRuleItemLogisticFeeRule
    | VinistoOrderDllModelsApiOrderFeeRuleItemSaleFeeRule
    | null;
}

/** Represents Fee rule snapshot with necessary data. */
export interface VinistoOrderDllModelsApiOrderFeeRuleItemBaseFeeRule {
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

/** Represents base for Fee rule with base specification setup to create supplier fee. */
export type VinistoOrderDllModelsApiOrderFeeRuleItemBaseSpecificationFeeRule =
  VinistoOrderDllModelsApiOrderFeeRuleItemBaseFeeRule & {
    bundleType?: VinistoCommonDllModelsApiSpecificationsMultiComboBoxSpecification | null;
    bundleKind?: VinistoCommonDllModelsApiSpecificationsMultiComboBoxSpecification | null;
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
  };

/** Represents Dynamic sale fee rule to create supplier fee. */
export type VinistoOrderDllModelsApiOrderFeeRuleItemDynamicSaleFeeRule =
  VinistoOrderDllModelsApiOrderFeeRuleItemBaseFeeRule & {
    name?: string | null;
    /**
     * Contains list of possible production types.
     * Origin production = supplier country code is equals to bundle made in country.
     */
    production?: VinistoHelperDllEnumsFeeRecordFeeValueProductionType;
  };

/** Represents Fee value defined by percentage or fixed price. */
export interface VinistoOrderDllModelsApiOrderFeeRuleItemFeeValue {
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
export type VinistoOrderDllModelsApiOrderFeeRuleItemLogisticFeeRule =
  VinistoOrderDllModelsApiOrderFeeRuleItemBaseSpecificationFeeRule & {
    name?: string | null;
    warehouseId?: string | null;
  };

/** Represents Sale fee rule to create supplier fee. */
export type VinistoOrderDllModelsApiOrderFeeRuleItemSaleFeeRule =
  VinistoOrderDllModelsApiOrderFeeRuleItemBaseSpecificationFeeRule & {
    /**
     * Contains list of possible production types.
     * Origin production = supplier country code is equals to bundle made in country.
     */
    production?: VinistoHelperDllEnumsFeeRecordFeeValueProductionType;
  };

/** Represents base item object to specify bundle items by his type. */
export interface VinistoOrderDllModelsApiOrderItemsBaseItem {
  itemId?: string | null;
  /** @format int32 */
  amount?: number;
}

/** Represents Bundle item object containing bundle id, amount and price */
export type VinistoOrderDllModelsApiOrderItemsBundleItem =
  VinistoOrderDllModelsApiOrderItemsBaseItem & {
    /** Price for which is the bundle sold in the set */
    price:
      | VinistoCommonDllModelsApiPricesPrice
      | VinistoCommonDllModelsApiPricesOrderConditionPrice
      | null;
    /** Discount costs supplier */
    discountCostsSupplier: boolean;
    /** Bundle in the set */
    bundle: VinistoOrderDllModelsApiOrderBundle | null;
    /** Calculated price after B2B discount. */
    calculatedPriceAfterB2bDiscount?:
      | VinistoCommonDllModelsApiPricesPrice
      | VinistoCommonDllModelsApiPricesOrderConditionPrice
      | null;
  };

/** Represents Bundle item object containing product id and amount */
export type VinistoOrderDllModelsApiOrderItemsProductItem =
  VinistoOrderDllModelsApiOrderItemsBaseItem & {
    /** Product in the bundle */
    product?: VinistoOrderDllModelsApiOrderProduct | null;
  };

/** Represents order. */
export interface VinistoOrderDllModelsApiOrderOrder {
  /**
   * Id of the order
   * @minLength 1
   */
  id: string;
  /** All states of the order */
  states: VinistoHelperDllEnumsOrderOrderState[];
  /** State of the order */
  state?: VinistoHelperDllEnumsOrderOrderState;
  /** Times when order change state */
  stateChangeRecords: VinistoOrderDllModelsApiOrderStateChangeRecord[];
  /** List of ordered items (bundles) */
  orderItems: VinistoOrderDllModelsApiOrderOrderItem[];
  /** Identification of the customer */
  user: VinistoOrderDllModelsApiOrderUser;
  /** Delivery information */
  delivery: VinistoOrderDllModelsApiOrderDelivery;
  /** Payment information */
  payment: VinistoOrderDllModelsApiOrderPayment;
  /** Contains list of possible languages */
  language?: VinistoHelperDllEnumsLanguage;
  /** Discount coupons */
  discountCoupons?:
    | (
        | VinistoOrderDllModelsApiOrderDiscountCouponAmountDiscountCouponDefinition
        | VinistoOrderDllModelsApiOrderDiscountCouponConditionalDiscountCouponDefinition
        | VinistoOrderDllModelsApiOrderDiscountCouponGiftCouponDefinition
        | VinistoOrderDllModelsApiOrderDiscountCouponPercentageDiscountCouponDefinition
      )[]
    | null;
  /**
   * Order calculated discount
   * @format double
   */
  orderTotalDiscount?: number | null;
  /** Spec symbol */
  specSymbol?: string | null;
  /** Customer Order number */
  customerOrderNumber?: string | null;
  /** Order number */
  orderNumber?: string | null;
  /** Flag for sending newsletter */
  isNewsletterActive?: boolean;
  /** Order billing address */
  billingAddress: VinistoOrderDllModelsApiOrderAddress;
  /**
   * Order price without VAT
   * @format double
   */
  orderPrice?: number;
  /**
   * Order price with VAT
   * @format double
   */
  orderPriceWithVat?: number;
  /** Currency */
  orderCurrency?: VinistoHelperDllEnumsCurrency;
  /** Order note */
  orderNote?: string | null;
  /** Tracking Id */
  trackingId?: string | null;
  /** UTM (Urchin Tracking Module) */
  utm?: VinistoOrderDllModelsApiOrderUtmParameters | null;
  /** Addons added to order */
  addons?: VinistoOrderDllModelsApiOrderAddonItem[] | null;
  /** Internal Order note */
  internalOrderNote?: string | null;
  /** True if exist fee records for order. Otherwise false. */
  hasFeeGenerated?: boolean;
  /**
   * Sum fees for order
   * @format double
   */
  sumOrderFee?: number;
  /**
   * Sum fees for order
   * @format double
   */
  sumOrderFeeWithVat?: number;
  /** Identifies type of the country */
  countryOfSale?: VinistoHelperDllEnumsCountryCode;
  /** Exchange rate for prices in order */
  orderExchangeRate?: VinistoOrderDllModelsApiOrderExchangeRate | null;
  /** @format int32 */
  platformId?: number;
  /** @format double */
  giftCouponPayment?: number;
  /** @format double */
  giftCouponPaymentWithVat?: number;
}

/** Parameters which is possible to provided to api to specify request for add discount coupon to order */
export interface VinistoOrderDllModelsApiOrderOrderAddDiscoutCouponParameters {
  /**
   * Discount coupon code
   * @minLength 1
   */
  discountCouponCode: string;
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

/** Parameters which is possible to provided to api to specify request for change order state */
export interface VinistoOrderDllModelsApiOrderOrderChangeParameters {
  /** State of the order */
  orderState: VinistoHelperDllEnumsOrderOrderState;
  /** If false, no notification email is sent to the customer. In default, it is set to true. */
  isNotificationEmailSent?: boolean;
  /** UserHash to authorize respective operation. */
  userLoginHash?: string | null;
  /** Order api key to authentication. */
  orderApiKey?: string | null;
}

/** Parameters which is possible to provided to api to specify requests for creating order with subscription when accelerated purchase. */
export interface VinistoOrderDllModelsApiOrderOrderCreateAcceleratedSubscriptionParameters {
  wsId?: string | null;
  /** Currency */
  currency: VinistoHelperDllEnumsCurrency;
  /** Contains list of possible languages */
  language: VinistoHelperDllEnumsLanguage;
  subscriptionAddonId: string | null;
  paymentId: string | null;
  /** Represents delivery address */
  billingAddress?: VinistoOrderDllModelsApiOrderAddress | null;
  billingAddressId?: string | null;
  /** Class containing parameters for user authorization */
  authorizationParameters:
    | VinistoHelperDllBaseAuthorizationParameters
    | VinistoHelperDllBaseItemAssignParameters
    | VinistoHelperDllBaseItemAssignWithCountryParameters
    | VinistoHelperDllBaseItemsAssignParameters
    | VinistoHelperDllBaseItemsAssignWithCountryParameters
    | null;
  orderId?: string | null;
}

/** Parameters which is possible to provided to api to specify request for editing addresses in the order */
export interface VinistoOrderDllModelsApiOrderOrderEditAddressesParameters {
  /** Address used for editing billing address */
  billingAddress?: VinistoOrderDllModelsApiOrderAddress | null;
  /** Address used for  editing delivery address */
  deliveryAddress?: VinistoOrderDllModelsApiOrderAddress | null;
  /** If true send email with info about changes */
  isSendInfoEmailRequested?: boolean;
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

/** Parameters which is possible to provided to api to specify request for editing note in the order */
export interface VinistoOrderDllModelsApiOrderOrderEditInternalNoteParameters {
  /** Edit order note. If note is empty string, empty string is also set in database. */
  internalOrderNote?: string | null;
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

/** Represents order internal document */
export interface VinistoOrderDllModelsApiOrderOrderInternalDocument {
  /** @minLength 1 */
  id: string;
  /** @minLength 1 */
  originalFileName: string;
}

/** Represents one basket item (only Bundle is accepted at the moment) and an amount. */
export interface VinistoOrderDllModelsApiOrderOrderItem {
  /** Bundle object of this BasketItem */
  bundle: VinistoOrderDllModelsApiOrderBundle;
  /**
   * Quantity of the bundle
   * @format int32
   */
  quantity?: number;
  /**
   * B2B percentage discount applied to this item.
   * @format double
   */
  b2bPercentageDiscount?: number | null;
  /** Calculated price after B2B discount. */
  calculatedPriceAfterB2bDiscount?:
    | VinistoCommonDllModelsApiPricesOrderConditionPrice
    | VinistoCommonDllModelsApiPricesPrice
    | VinistoCommonDllModelsApiPricesPriceDiscountSet
    | VinistoCommonDllModelsApiPricesPriceDiscountSupplier
    | VinistoCommonDllModelsApiPricesPriceDiscountVinisto
    | VinistoCommonDllModelsApiPricesPriceDiscountVolume
    | VinistoCommonDllModelsApiPricesTimeLimitedPriceDiscount
    | null;
}

export interface VinistoOrderDllModelsApiOrderOrderSubscriptionInvoice {
  name: string | null;
  /** @format date */
  paidAt: string;
  /** @format double */
  priceWithVat: number;
  invoicePath: string | null;
  variableSymbol: string | null;
}

export interface VinistoOrderDllModelsApiOrderOrderWithInvoice {
  id: string | null;
  /** @format double */
  orderPrice: number;
  /** @format double */
  orderPriceWithVat: number;
  /** State of the order */
  state: VinistoHelperDllEnumsOrderOrderState;
  stateChangeRecords: VinistoOrderDllModelsApiOrderStateChangeRecord[] | null;
  orderNumber: string | null;
  /** Currency */
  orderCurrency: VinistoHelperDllEnumsCurrency;
  /** Represents payment information. */
  payment?: VinistoOrderDllModelsApiOrderPayment | null;
  /** @format int32 */
  platformId: number;
  invoices?: VinistoOrderDllModelsApiInvoiceInvoice[] | null;
}

/** Parameters which is possible to provided to api to specify request for change state for provided order list ids */
export interface VinistoOrderDllModelsApiOrderOrdersChangeParameters {
  /** State of the order */
  orderState: VinistoHelperDllEnumsOrderOrderState;
  /** List of order ids */
  orderIds: string[];
  /** UserHash to authorize respective operation. */
  userLoginHash?: string | null;
  /** Order api key to authentication. */
  orderApiKey?: string | null;
}

/** Parameters which is possible to provided to api to specify requests for create order */
export interface VinistoOrderDllModelsApiOrderOrdersCreateParameters {
  /** Websocket ID for the order */
  wsId?: string | null;
  /** Currency */
  currency: VinistoHelperDllEnumsCurrency;
  /** Contains list of possible languages */
  language: VinistoHelperDllEnumsLanguage;
  /** Basket id */
  basketId: string | null;
  /** Delivery id */
  deliveryId: string | null;
  /** Payment id */
  paymentId?: string | null;
  /** Value for checkbox send newsletter */
  isNewsletterActive?: boolean | null;
  /** OrderNote */
  orderNote?: string | null;
  /** Order number */
  userCustomOrderNumber?: string | null;
  /** Order spec symbol */
  specSymbol?: string | null;
  /** Pickup point where the package will be delivered */
  pickupPoint?: VinistoOrderDllModelsApiOrderPickupPoint | null;
  /** Utm (Urchin Tracking Module) */
  utm?: VinistoOrderDllModelsApiOrderUtmParameters | null;
  /** Address used for  creating billing address */
  billingAddress?: VinistoOrderDllModelsApiOrderAddress | null;
  /** Id of user address used for creating billing address */
  billingAddressId?: string | null;
  /** Id of user address used for creating delivery address */
  deliveryAddressId?: string | null;
  /** Class containing parameters for user authorization */
  authorizationParameters?:
    | VinistoHelperDllBaseAuthorizationParameters
    | VinistoHelperDllBaseItemAssignParameters
    | VinistoHelperDllBaseItemAssignWithCountryParameters
    | VinistoHelperDllBaseItemsAssignParameters
    | VinistoHelperDllBaseItemsAssignWithCountryParameters
    | null;
  /** Anonymous user ID */
  anonymousUserId?: string | null;
  /** User e-mail */
  userEmail?: string | null;
  /** Address used for creating delivery */
  deliveryAddress?: VinistoOrderDllModelsApiOrderAddress | null;
  /** If is provided, then will be created order with this id. It must by ObjectId (24 hex string). */
  orderId?: string | null;
}

/** Represents payment information. */
export interface VinistoOrderDllModelsApiOrderPayment {
  /**
   * Payment id
   * @minLength 1
   */
  id: string;
  /** Name of the payment - list containing language versions */
  name: VinistoOrderDllModelsApiCommonMultiLangValue[];
  /** Description of the payment - list containing language versions */
  description: VinistoOrderDllModelsApiCommonMultiLangValue[];
  /** Payment price */
  price:
    | VinistoCommonDllModelsApiPricesPrice
    | VinistoCommonDllModelsApiPricesOrderConditionPrice;
  /**
   * If the payment supports GoPay this defines GoPay type
   * If null this payment is not supporting goPay
   */
  goPayType?: VinistoHelperDllEnumsGoPayGoPayType | null;
  /**
   * If the payment was done, this id stores the payment id so it was possible to map the order with GoPay payment
   * @format int64
   */
  goPayId?: number | null;
  /** Identifies type of the payment */
  paymentType?: VinistoHelperDllEnumsOrderPaymentType;
  /** Variable symbol to identify the payment which is payed at delivery (dobirka) */
  variableSymbol?: string | null;
  /**
   * Invoice due date in days.
   * @format int32
   */
  invoiceDueDateInDays?: number | null;
}

/** Represents pickup point where the package shall be delivered */
export interface VinistoOrderDllModelsApiOrderPickupPoint {
  /** Pickup point company */
  type?: VinistoHelperDllEnumsOrderPickupPointType;
  /**
   * Code identifying the pickup point
   * @minLength 1
   */
  code: string;
  /**
   * Name of the person the package is delivered to
   * @minLength 1
   */
  addressee: string;
  /**
   * Phone number where information about the readiness of the package will be sent
   * @minLength 1
   */
  phone: string;
  /**
   * Email where information about the readiness of the package will be sent
   * @minLength 1
   */
  email: string;
  /** Pickup point address */
  address:
    | VinistoOrderDllModelsApiOrderPostalAddress
    | VinistoOrderDllModelsApiOrderAddress;
}

/** Postal address */
export interface VinistoOrderDllModelsApiOrderPostalAddress {
  /**
   * Street name in the address
   * @minLength 1
   */
  street: string;
  /**
   * House number unique in cadastral area - in czech "cislo popisne"
   * @minLength 1
   */
  landRegistryNumber: string;
  /** House number unique in street/area - in czech "cislo orientacni" */
  houseNumber?: string | null;
  /**
   * Zip code in the address
   * @minLength 1
   */
  zip: string;
  /**
   * City in the address
   * @minLength 1
   */
  city: string;
  /** Identifies type of the country */
  countryCode?: VinistoHelperDllEnumsCountryCode;
}

/** Represents product. */
export interface VinistoOrderDllModelsApiOrderProduct {
  /**
   * Id of the product
   * @minLength 1
   */
  id: string;
  /**
   * Name of the product
   * @minLength 1
   */
  name: string;
  /**
   * Description of the product
   * @minLength 1
   */
  description: string;
  /**
   * Wms code of the product
   * @minLength 1
   */
  wmsCode: string;
  /** Price of the product in time of order */
  price:
    | VinistoCommonDllModelsApiPricesPrice
    | VinistoCommonDllModelsApiPricesOrderConditionPrice;
}

/** Represents order state change log */
export interface VinistoOrderDllModelsApiOrderStateChangeRecord {
  /** State of the order */
  state?: VinistoHelperDllEnumsOrderOrderState;
  /**
   * Time of the change
   * @format int64
   */
  changeTime?: number;
}

/** Represents a user */
export interface VinistoOrderDllModelsApiOrderUser {
  /** Id of the User */
  id?: string | null;
  /** Id of the anonymous User */
  anonymousId?: string | null;
  /**
   * Email of the user
   * @minLength 1
   */
  email: string;
}

/** Represents a UTM parameters (Urchin Tracking Module) */
export interface VinistoOrderDllModelsApiOrderUtmParameters {
  /** UTM source */
  source?: string | null;
  /** UTM medium */
  medium?: string | null;
  /** UTM campaign */
  campaign?: string | null;
  /** Gad - Google Ads Help */
  gad?: string | null;
  /** Gclid - Google Click Identifier */
  gclId?: string | null;
}

/** Represents payments */
export interface VinistoOrderDllModelsApiPaymentPayment {
  /**
   * Id of the payment
   * @minLength 1
   */
  id: string;
  /** Name of the payment - list containing language versions */
  name: VinistoOrderDllModelsApiCommonMultiLangValue[];
  /** Description of the payment - list containing language versions */
  description: VinistoOrderDllModelsApiCommonMultiLangValue[];
  /** Active flag - true if is active */
  isActive?: boolean;
  /** Payment prices */
  prices: VinistoCommonDllModelsApiPricesOrderConditionPrice[];
  /** Payments countries */
  countries: VinistoHelperDllEnumsCountryCode[];
  /**
   * GoPay type corresponding to possible GoPay payments type.
   * If null this payment is not possible to handle by GoPay
   */
  goPayType?: VinistoHelperDllEnumsGoPayGoPayType | null;
  /** Identifies type of the payment */
  paymentType?: VinistoHelperDllEnumsOrderPaymentType;
  /**
   * Order
   * @format int32
   */
  order?: number;
  /** Image */
  image?: VinistoImageDllModelsApiImageImage | null;
  /** Payment note in language */
  note?: VinistoOrderDllModelsApiCommonMultiLangValue[] | null;
  /** Contains allowed platforms. */
  allowedOnPlatforms?: VinistoHelperDllEnumsDeliveryAndPaymentPlatform[] | null;
}

/** Parameters which is possible to provided to api to specify request for creating payment */
export type VinistoOrderDllModelsApiPaymentPaymentCreateParameters =
  VinistoOrderDllModelsApiPaymentPaymentManipulationParameters & {
    /** Active flag of the Payment */
    isActive: boolean;
    /** Identifies type of the payment */
    paymentType: VinistoHelperDllEnumsOrderPaymentType;
    /**
     * Order
     * @format int32
     */
    order: number;
    /** Allowed platforms. */
    allowedOnPlatforms: VinistoHelperDllEnumsDeliveryAndPaymentPlatform[];
  };

/** Parameters which is possible to provided to api to specify request for editing payment */
export type VinistoOrderDllModelsApiPaymentPaymentEditParameters =
  VinistoOrderDllModelsApiPaymentPaymentManipulationParameters & {
    /** Payment type */
    paymentType?: VinistoHelperDllEnumsOrderPaymentType | null;
    /**
     * Order
     * @format int32
     */
    order?: number | null;
    /** Allowed platforms. */
    allowedOnPlatforms?:
      | VinistoHelperDllEnumsDeliveryAndPaymentPlatform[]
      | null;
  };

/** Parameters which is possible to provided to api to specify request for add country to payment */
export interface VinistoOrderDllModelsApiPaymentPaymentManipulationCountryParameters {
  /** Identifies type of the country */
  country: VinistoHelperDllEnumsCountryCode;
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

/** Base Parameters which is possible to provided to api to specify request for creating or editing payment */
export interface VinistoOrderDllModelsApiPaymentPaymentManipulationParameters {
  /** Contains list of possible languages */
  language: VinistoHelperDllEnumsLanguage;
  /**
   * Name of the payment
   * @minLength 1
   */
  name: string;
  /**
   * Description of the Payment
   * @minLength 1
   */
  description: string;
  /**
   * GoPay type corresponding to possible GoPay paymentes type.
   * If null this payment is not possible to handle by GoPay
   */
  goPayType?: VinistoHelperDllEnumsGoPayGoPayType | null;
  /** Note of the Payment */
  note?: string | null;
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

/** Parameters which is possible to provided to api to specify request for add price to payment */
export interface VinistoOrderDllModelsApiPaymentPaymentManipulationPriceParameters {
  /**
   * Price of the payment
   * @format double
   */
  price: number;
  /** VatRate */
  vat: VinistoHelperDllEnumsVatRate;
  /** Currency */
  currency: VinistoHelperDllEnumsCurrency;
  /**
   * Min order price for using this payment price
   * @format double
   */
  minOrderPrice: number;
  /**
   * Max order price for using this payment price
   * @format double
   */
  maxOrderPrice: number;
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

/** Parameters provided to endpoint for batch changing of payment activations */
export interface VinistoOrderDllModelsApiPaymentPaymentsActivationParameters {
  /** List of payment ids */
  paymentIds: string[];
  /** UserHash to authorize respective operation */
  userLoginHash?: string | null;
}

/** Return API object for AutomaticCoupon coupon */
export interface VinistoOrderDllModelsApiReturnDataAutomaticCouponReturn {
  /** Return AutomaticCoupon */
  automaticCoupon?: VinistoOrderDllModelsApiAutomaticCouponAutomaticCoupon | null;
  /** Has occurred any error. */
  isError?: boolean;
  /** List of errors code that occurred during the api request. */
  error?: VinistoHelperDllBaseError[] | null;
}

/** Return API object for Automatic coupon with count of all object */
export interface VinistoOrderDllModelsApiReturnDataAutomaticCouponsReturn {
  /** List of AutomaticCoupon */
  automaticCoupons?:
    | VinistoOrderDllModelsApiAutomaticCouponAutomaticCoupon[]
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

/** Return API object for Billing */
export interface VinistoOrderDllModelsApiReturnDataBillingReturn {
  /** Return billing */
  billing?: VinistoOrderDllModelsApiBillingBilling | null;
  /** Has occurred any error. */
  isError?: boolean;
  /** List of errors code that occurred during the api request. */
  error?: VinistoHelperDllBaseError[] | null;
}

/** Return API object for List of Billing */
export interface VinistoOrderDllModelsApiReturnDataBillingsReturn {
  /** List of Billings */
  billings?: VinistoOrderDllModelsApiBillingBilling[] | null;
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

/** Return API object for ContractWithdrawalRequest. */
export interface VinistoOrderDllModelsApiReturnDataContractWithdrawalRequestReturn {
  /** Return ContractWithdrawalRequest. */
  contractWithdrawalRequest?: VinistoOrderDllModelsApiContractWithdrawalRequestContractWithdrawalRequest | null;
  /** Has occurred any error. */
  isError?: boolean;
  /** List of errors code that occurred during the api request. */
  error?: VinistoHelperDllBaseError[] | null;
}

/** Return API object for List of ContractWithdrawalRequest. */
export interface VinistoOrderDllModelsApiReturnDataContractWithdrawalRequestsReturn {
  /** List of ContractWithdrawalRequest. */
  contractWithdrawalRequests?:
    | VinistoOrderDllModelsApiContractWithdrawalRequestContractWithdrawalRequest[]
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

/** Return API object for List of Delivery */
export interface VinistoOrderDllModelsApiReturnDataDeliveriesReturn {
  /** List of Deliveries */
  deliveries?: VinistoOrderDllModelsApiDeliveryDelivery[] | null;
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

/** Return API object for Delivery */
export interface VinistoOrderDllModelsApiReturnDataDeliveryReturn {
  /** Return delivery */
  delivery?: VinistoOrderDllModelsApiDeliveryDelivery | null;
  /** Has occurred any error. */
  isError?: boolean;
  /** List of errors code that occurred during the api request. */
  error?: VinistoHelperDllBaseError[] | null;
}

/** Return API object for DeliveryTimeRange */
export interface VinistoOrderDllModelsApiReturnDataDeliveryTimeRangeReturn {
  /** Return DeliveryTimeRange */
  deliveryTimeRange?: VinistoOrderDllModelsApiDeliveryDeliveryTimeRange | null;
  /** Has occurred any error. */
  isError?: boolean;
  /** List of errors code that occurred during the api request. */
  error?: VinistoHelperDllBaseError[] | null;
}

/** Return API object for Discount coupon */
export interface VinistoOrderDllModelsApiReturnDataDiscountCouponReturn {
  /** Represents base discount coupon definition. */
  discountCoupon?:
    | VinistoOrderDllModelsApiDiscountCouponDefinitionModelsAmountDiscountCouponDefinition
    | VinistoOrderDllModelsApiDiscountCouponDefinitionModelsConditionalDiscountCouponDefinition
    | VinistoOrderDllModelsApiDiscountCouponDefinitionModelsGiftCouponDefinition
    | VinistoOrderDllModelsApiDiscountCouponDefinitionModelsPercentageDiscountCouponDefinition
    | null;
  /** Has occurred any error. */
  isError?: boolean;
  /** List of errors code that occurred during the api request. */
  error?: VinistoHelperDllBaseError[] | null;
}

/** Return API object for check discount coupon validity */
export interface VinistoOrderDllModelsApiReturnDataDiscountCouponValidityReturn {
  /** true if coupon is valid */
  isValid?: boolean;
  /** Has occurred any error. */
  isError?: boolean;
  /** List of errors code that occurred during the api request. */
  error?: VinistoHelperDllBaseError[] | null;
}

/** Return API object for Discount coupon with count of all object */
export interface VinistoOrderDllModelsApiReturnDataDiscountCouponsReturn {
  discountCoupons?:
    | (
        | VinistoOrderDllModelsApiDiscountCouponDefinitionModelsAmountDiscountCouponDefinition
        | VinistoOrderDllModelsApiDiscountCouponDefinitionModelsConditionalDiscountCouponDefinition
        | VinistoOrderDllModelsApiDiscountCouponDefinitionModelsGiftCouponDefinition
        | VinistoOrderDllModelsApiDiscountCouponDefinitionModelsPercentageDiscountCouponDefinition
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

/** Return API object for Invoice */
export interface VinistoOrderDllModelsApiReturnDataInvoicesReturn {
  invoices?: VinistoOrderDllModelsApiInvoiceInvoice[] | null;
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

/** Return API object for Order internal documents */
export interface VinistoOrderDllModelsApiReturnDataOrderInternalDocumentsReturn {
  /** List of order internal documents */
  internalDocuments?:
    | VinistoOrderDllModelsApiOrderOrderInternalDocument[]
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

/** Return API object for Order */
export interface VinistoOrderDllModelsApiReturnDataOrderReturn {
  /** Return order */
  order?: VinistoOrderDllModelsApiOrderOrder | null;
  /** Has occurred any error. */
  isError?: boolean;
  /** List of errors code that occurred during the api request. */
  error?: VinistoHelperDllBaseError[] | null;
}

export interface VinistoOrderDllModelsApiReturnDataOrderSubscriberDiscountsReturn {
  /** @format double */
  totalSubscriberGoodsDiscount?: number;
  /** @format double */
  totalSubscriberDeliveriesDiscount?: number;
  /** Has occurred any error. */
  isError?: boolean;
  /** List of errors code that occurred during the api request. */
  error?: VinistoHelperDllBaseError[] | null;
}

/** Return necessary data for list of subscription invoices. */
export interface VinistoOrderDllModelsApiReturnDataOrderSubscriptionInvoiceReturn {
  /** Return order */
  invoiceData?: VinistoOrderDllModelsApiOrderOrderSubscriptionInvoice | null;
  /** Has occurred any error. */
  isError?: boolean;
  /** List of errors code that occurred during the api request. */
  error?: VinistoHelperDllBaseError[] | null;
}

/** Return API object for Order */
export interface VinistoOrderDllModelsApiReturnDataOrdersReturn {
  /** List of Orders */
  orders?: VinistoOrderDllModelsApiOrderOrder[] | null;
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

/** Return API object for OrderWithInvoice */
export interface VinistoOrderDllModelsApiReturnDataOrdersWithInvoiceReturn {
  /** List of Orders with Invoice */
  orders?: VinistoOrderDllModelsApiOrderOrderWithInvoice[] | null;
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

/** Return API object for Payment */
export interface VinistoOrderDllModelsApiReturnDataPaymentReturn {
  /** Return payment */
  payment?: VinistoOrderDllModelsApiPaymentPayment | null;
  /** Has occurred any error. */
  isError?: boolean;
  /** List of errors code that occurred during the api request. */
  error?: VinistoHelperDllBaseError[] | null;
}

/** Return API object for List of Payment */
export interface VinistoOrderDllModelsApiReturnDataPaymentsReturn {
  /** List of Deliveries */
  payments?: VinistoOrderDllModelsApiPaymentPayment[] | null;
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

/** Return API object for Pdf */
export interface VinistoOrderDllModelsApiReturnDataPdfReturn {
  /**
   * Return byera with pdf data
   * @format byte
   */
  pdfData?: string | null;
  /** Has occurred any error. */
  isError?: boolean;
  /** List of errors code that occurred during the api request. */
  error?: VinistoHelperDllBaseError[] | null;
}

/** Return API object for dashboard sale section */
export interface VinistoOrderDllModelsApiReturnDataSaleDataReturn {
  /** Sale data */
  saleData?: VinistoOrderDllModelsApiDashboardSaleSaleData | null;
  /** Has occurred any error. */
  isError?: boolean;
  /** List of errors code that occurred during the api request. */
  error?: VinistoHelperDllBaseError[] | null;
}

/** Return API object for List of User Bundles */
export interface VinistoOrderDllModelsApiReturnDataUserBundlesReturn {
  /** List of  UserBundles */
  userBundles?: VinistoOrderDllModelsApiUserBundleUserBundle[] | null;
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

/** Represents bundle */
export interface VinistoOrderDllModelsApiUserBundleBundle {
  /** Id of the bundle */
  id?: string | null;
  /** Name of the bundle - list containing language versions */
  name?: VinistoOrderDllModelsApiCommonMultiLangValue[] | null;
  /** Url of the bundle - list containing language versions */
  url?: VinistoOrderDllModelsApiCommonMultiLangValue[] | null;
  /** Item of the bundle - list containing various product_id and amount. */
  items?:
    | (
        | VinistoProductDllModelsApiBundleItemsBundleItem
        | VinistoProductDllModelsApiBundleItemsProductItem
      )[]
    | null;
  /** Enabled flag - true if bundle enabled. */
  isEnabled?: boolean;
  /** Deleted flag - true if bundle deleted. */
  isDeleted?: boolean;
  /** Supplier - supplier id as string */
  supplierId?: string | null;
  /**
   * Count of available bundles in warehouse
   * @format int32
   */
  availableCount?: number;
  /** Delivery flag - true if for bundle is delivery free. */
  isDeliveryFree?: boolean;
  /** Flag to mark bundle as only for logged users */
  isForLogged?: boolean;
  /** Flag to mark bundle as temporary unavailable */
  temporaryUnavailable?: boolean;
  /** Flag to mark bundle as Gift */
  isGift?: boolean;
  /** Flag to mark bundle as Clearance sale */
  isClearanceSale?: boolean;
  /** Get all bundle flags grouped in one collection */
  flags?: Record<string, boolean>;
  /** Object that limits number of pieces bundle per one order in time range */
  orderLimitation?: VinistoOrderDllModelsApiUserBundleOrderLimitation | null;
  /** Flag to specify bundle with one product or with set of products */
  isSet?: boolean;
  /** CanSendToWms flag - false if bundle is intangible goods. */
  canSendToWms?: boolean;
  /** Flag to set bundle state sale is over */
  isSaleOver?: boolean;
  /** Allowed country codes */
  allowedCountries?: VinistoHelperDllEnumsCountryCode[] | null;
  setType?: VinistoHelperDllEnumsBundleSetType;
  states?: VinistoHelperDllEnumsBundleBundleState[] | null;
  /** IsApproved flag - false if bundle is not approve. */
  isApproved?: boolean;
  /** Bundle is available on these platforms */
  availableOnPlatforms?: number[] | null;
}

/** Represents OrderLimitation object containing Limit, ValidFrom and ValidTo */
export interface VinistoOrderDllModelsApiUserBundleOrderLimitation {
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

/** Represents value base specification value, which reference a specification definition and contains respective value */
export interface VinistoOrderDllModelsApiUserBundleSpecificationDetail {
  /**
   * Specification definition object - BaseSpecificationDefinition type.
   * It is object due to proper serialization to json
   */
  definition?: any;
  /**
   * Specification value object - BaseSpecificationValue type or BaseSpecification type
   * It is object due to proper serialization to json
   */
  value?: any;
}

/** Represents bundle that user purchased. */
export interface VinistoOrderDllModelsApiUserBundleUserBundle {
  /** Id of the bundle. */
  bundle?: VinistoOrderDllModelsApiUserBundleBundle | null;
  /** Main image of the bundle. */
  image?: VinistoImageDllModelsApiImageImage | null;
  /** Specifications - list containing specifications id and value as list. */
  specificationDetails?:
    | VinistoOrderDllModelsApiUserBundleSpecificationDetail[]
    | null;
  /** All orders that contain this bundle. */
  orders?: VinistoOrderDllModelsApiUserBundleUserOrder[] | null;
  /** Evaluation stars for user and this bundle. */
  evaluation?: VinistoOrderDllModelsApiUserBundleUserBundleEvaluation | null;
}

/** Represents user bundle evaluation API object. */
export interface VinistoOrderDllModelsApiUserBundleUserBundleEvaluation {
  /** Id of the evaluation. */
  id?: string | null;
  /** Evaluation text. */
  text?: string | null;
  /**
   * Overall evaluation in stars.
   * @format int32
   */
  stars?: number;
  /**
   * Timestamp when evaluation was created.
   * @format int32
   */
  createdAt?: number;
}

/** Represents user order API object. */
export interface VinistoOrderDllModelsApiUserBundleUserOrder {
  /** Id of the order. */
  id?: string | null;
  /** Name of the order. */
  orderNumber?: string | null;
  /**
   * Delivery time of the order.
   * @format int64
   */
  deliveryTime?: number;
  /** State of the order */
  state?: VinistoHelperDllEnumsOrderOrderState;
  /**
   * Time when the order was created.
   * @format int32
   */
  createdAt?: number | null;
  /**
   * Order price with VAT.
   * @format double
   */
  orderPriceWithVat?: number;
  /** Currency */
  orderCurrency?: VinistoHelperDllEnumsCurrency;
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

export interface AutomaticCouponsDetailParams {
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
  IsCache?: boolean;
  /** Id of the automatic coupon */
  automaticCouponId: string;
}

/** Parameters which is possible to provided to api to specify request to edit automatic coupon */
export type AutomaticCouponsUpdatePayload =
  VinistoOrderDllModelsApiAutomaticCouponAutomaticCouponEditParameters;

export interface AutomaticCouponsDeleteParams {
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
  automaticCouponId: string;
}

export interface AutomaticCouponsListParams {
  /** If provided search by Name in automaticCoupons */
  SearchName?: string;
  /** If provided search by Language in automaticCoupons */
  SearchLanguage?: VinistoHelperDllEnumsLanguage;
  /** If provided search by DiscountType in automaticCoupons */
  SearchDiscountType?: VinistoHelperDllEnumsDiscountCouponDiscountCouponType;
  /** If provided search by Currency in automaticCoupons */
  SearchCurrency?: VinistoHelperDllEnumsCurrency;
  /** If true search only between combinable coupons, if false search only between not combinable coupons, if not provided search all coupons */
  IsCombinable?: boolean;
  /** If true search only between coupons applicable for discounted items, if false search only between coupons not applicable for discounted items, if not provided search all coupons */
  IsForDiscountedItems?: boolean;
  /** If provided search by Trigger in automaticCoupons */
  SearchTriggerType?: VinistoHelperDllEnumsAutomaticCouponTriggerType;
  /** If provided search by limitation type in discount coupon (more than one can be selected), If not provided search all type coupons. */
  SearchLimitationType?: VinistoHelperDllEnumsDiscountCouponLimitationType[];
  /** If provided, sorting will be done according to this column. if not provided, default sorting is done by Id */
  SortingColumn?: VinistoHelperDllEnumsAutomaticCouponSortableColumns;
  /** True in case that sorting shall be done in descending order */
  IsSortingDescending?: boolean;
  /**
   * Number of records to be retrieved. if not provided default value is 10
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

export interface HeadOrderApiParams {
  /** If provided search by Name in automaticCoupons */
  SearchName?: string;
  /** If provided search by Language in automaticCoupons */
  SearchLanguage?: VinistoHelperDllEnumsLanguage;
  /** If provided search by DiscountType in automaticCoupons */
  SearchDiscountType?: VinistoHelperDllEnumsDiscountCouponDiscountCouponType;
  /** If provided search by Currency in automaticCoupons */
  SearchCurrency?: VinistoHelperDllEnumsCurrency;
  /** If true search only between combinable coupons, if false search only between not combinable coupons, if not provided search all coupons */
  IsCombinable?: boolean;
  /** If true search only between coupons applicable for discounted items, if false search only between coupons not applicable for discounted items, if not provided search all coupons */
  IsForDiscountedItems?: boolean;
  /** If provided search by Trigger in automaticCoupons */
  SearchTriggerType?: VinistoHelperDllEnumsAutomaticCouponTriggerType;
  /** If provided search by limitation type in discount coupon (more than one can be selected), If not provided search all type coupons. */
  SearchLimitationType?: VinistoHelperDllEnumsDiscountCouponLimitationType[];
  /** If provided, sorting will be done according to this column. if not provided, default sorting is done by Id */
  SortingColumn?: VinistoHelperDllEnumsAutomaticCouponSortableColumns;
  /** True in case that sorting shall be done in descending order */
  IsSortingDescending?: boolean;
  /**
   * Number of records to be retrieved. if not provided default value is 10
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

/** Parameters which is possible to provided to api to specify request to create new automatic coupon */
export type AutomaticCouponsCreatePayload =
  VinistoOrderDllModelsApiAutomaticCouponAutomaticCouponCreateParameters;

/** Parameters which is possible to provided to api to specify request for change billing state */
export type BillingsUpdatePayload =
  VinistoOrderDllModelsApiBillingBillingChangeParameters;

export interface BillingsDetailParams {
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
  /**
   * Contains list of possible languages
   * @default "CZECH"
   */
  language?: VinistoHelperDllEnumsLanguage;
  /**
   * Optional lookback period in months for 'on the way' items. Default is 12.
   * @format int32
   */
  onTheWayLookbackMonths?: number;
  /** Id of the billing */
  billingId: string;
}

export interface BillingsDeleteParams {
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
  /** Id of the billing */
  billingId: string;
}

export interface BillingsGeneratePdfListParams {
  /** Language */
  Language?: VinistoHelperDllEnumsLanguage;
  /** Pdf type */
  PdfType: VinistoHelperDllEnumsPdfType;
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
  /**
   * Optional lookback period in months for 'on the way' items. Default is 12.
   * @format int32
   */
  onTheWayLookbackMonths?: number;
  /** Id of the billing */
  billingId: string;
}

export interface BillingsDownloadPdfListParams {
  /** Pdf type */
  PdfType: VinistoHelperDllEnumsPdfType;
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
  /** Id of the billing */
  billingId: string;
}

export interface BillingsGenerateXlsListParams {
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
  /**
   * Contains list of possible languages
   * @default "CZECH"
   */
  language?: VinistoHelperDllEnumsLanguage;
  /**
   * Optional lookback period in months for 'on the way' items. Default is 12.
   * @format int32
   */
  onTheWayLookbackMonths?: number;
  /** Id of the billing */
  billingId: string;
}

export interface BillingsListParams {
  /**
   * If provided search by create time. Time from.
   * @format int32
   */
  TimeFrom?: number;
  /**
   * If provided search by create time. Time to.
   * @format int32
   */
  TimeTo?: number;
  /** If provided search by supplier Id */
  SupplierId?: string;
  /** If provided search by supplier name */
  SupplierName?: string;
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
  /** If provided, sorting will be done according to this column. if not provided, default sorting is done by Id */
  SortingColumn?: VinistoHelperDllEnumsBillingSortableColumns;
  /** True in case that sorting shall be done in descending order */
  IsSortingDescending?: boolean;
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
}

export interface HeadOrderApi2Params {
  /**
   * If provided search by create time. Time from.
   * @format int32
   */
  TimeFrom?: number;
  /**
   * If provided search by create time. Time to.
   * @format int32
   */
  TimeTo?: number;
  /** If provided search by supplier Id */
  SupplierId?: string;
  /** If provided search by supplier name */
  SupplierName?: string;
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
  /** If provided, sorting will be done according to this column. if not provided, default sorting is done by Id */
  SortingColumn?: VinistoHelperDllEnumsBillingSortableColumns;
  /** True in case that sorting shall be done in descending order */
  IsSortingDescending?: boolean;
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
}

/** Parameters which is possible to provided to api to specify request to create new billing */
export type BillingsCreatePayload =
  VinistoOrderDllModelsApiBillingBillingsCreateParameters;

export interface BillingsCsvExportListParams {
  /** Supplier Id */
  supplierId?: string;
  /** UserHash to authorize respective operation */
  userLoginHash?: string;
  /**
   * Select only orders created from this dateTime
   * @format int64
   */
  timeFrom?: number;
  /**
   * Select only orders created to this dateTime
   * @format int64
   */
  timeTo?: number;
  /**
   * Optional lookback period in months for 'on the way' items. Default is 12.
   * @format int32
   */
  onTheWayLookbackMonths?: number;
}

export interface BillingsXmlGetXmlBillingsListParams {
  /** UserHash to authorize respective operation */
  userLoginHash?: string;
  /**
   * Select only orders created from this dateTime
   * @format int64
   */
  timeFrom?: number;
  /**
   * Select only orders created to this dateTime
   * @format int64
   */
  timeTo?: number;
}

export interface ContractWithdrawalRequestDetailParams {
  UserLoginHash?: string;
  AnonymousUserId?: string;
  /** Id of the contract withdrawal request */
  contractWithdrawalRequestId: string;
}

export interface ContractWithdrawalRequestUpdateParams {
  State: VinistoHelperDllEnumsContractWithdrawalRequestContractWithdrawalRequestChangeState;
  InternalNote?: string;
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
  /** Id of the contract withdrawal request */
  contractWithdrawalRequestId: string;
}

export interface ContractWithdrawalRequestListParams {
  SearchSurname?: string;
  SearchEmail?: string;
  SearchPhone?: string;
  SearchState?: VinistoHelperDllEnumsContractWithdrawalRequestContractWithdrawalRequestState;
  /** If provided, sorting will be done according to this column. if not provided, default sorting is done by Id. */
  SortingColumn?: VinistoHelperDllEnumsContractWithdrawalRequestSortableColumns;
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
}

export interface HeadOrderApi3Params {
  SearchSurname?: string;
  SearchEmail?: string;
  SearchPhone?: string;
  SearchState?: VinistoHelperDllEnumsContractWithdrawalRequestContractWithdrawalRequestState;
  /** If provided, sorting will be done according to this column. if not provided, default sorting is done by Id. */
  SortingColumn?: VinistoHelperDllEnumsContractWithdrawalRequestSortableColumns;
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
}

/** CreateContractWithdrawalRequestParameters - Parameters for creating contract withdrawal request */
export type ContractWithdrawalRequestCreatePayload =
  VinistoOrderDllModelsApiContractWithdrawalRequestCreateContractWithdrawalRequestParameters;

export interface HeadOrderApi4Params {
  /**
   * Search by time. Time from.
   * @format int64
   */
  TimeFrom: number;
  /**
   * Search by time. Time to.
   * @format int64
   */
  TimeTo: number;
  /** Search by supplier Id */
  SupplierId?: string;
  /**
   * Limit for bundles with sale information
   * @format int32
   */
  Limit?: number;
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
}

export interface DashboardSaleListParams {
  /**
   * Search by time. Time from.
   * @format int64
   */
  TimeFrom: number;
  /**
   * Search by time. Time to.
   * @format int64
   */
  TimeTo: number;
  /** Search by supplier Id */
  SupplierId?: string;
  /**
   * Limit for bundles with sale information
   * @format int32
   */
  Limit?: number;
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
}

export interface DeliveriesListParams {
  /** If provided search by name in products */
  SearchName?: string;
  /**
   * Filter to get deliveries for weight
   * @format double
   */
  AllowedWeight?: number;
  /** Filter to get deliveries for allowed country */
  AllowedCountry?: VinistoHelperDllEnumsCountryCode;
  /** If provided search all deliveries to provided delivery type */
  DeliveryType?: VinistoHelperDllEnumsOrderDeliveryType;
  /** If true search only between active deliveries, if false search only between not active deliveries, if not provided search all deliveries */
  IsActive?: boolean;
  /** If provided, sorting will be done according to this column. if not provided, default sorting is done by Order */
  SortingColumn?: VinistoHelperDllEnumsDeliverySortableColumns;
  /** True in case that sorting shall be done in descending order */
  IsSortingDescending?: boolean;
  /** Language version - if provided, all deliveries will be only in selected language. */
  Language?: VinistoHelperDllEnumsLanguage;
  /** If provided it will return deliveries only serving provided zip code */
  ServingZip?: string;
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
  /** Search by is for stocking flag - true if is for stocking */
  IsForStocking?: boolean;
  /** Search by is for customer delivery flag - true if is for orders */
  IsForCustomerDelivery?: boolean;
  /** Prices in response are converted to this currency. Default is CZK. */
  Currency?: VinistoHelperDllEnumsCurrency;
  /** Search by is user subscriber flag - true if is */
  IsSubscriber?: boolean;
  /** @format int32 */
  PlatformId?: number;
  IsCache?: boolean;
}

export interface HeadOrderApi5Params {
  /** If provided search by name in products */
  SearchName?: string;
  /**
   * Filter to get deliveries for weight
   * @format double
   */
  AllowedWeight?: number;
  /** Filter to get deliveries for allowed country */
  AllowedCountry?: VinistoHelperDllEnumsCountryCode;
  /** If provided search all deliveries to provided delivery type */
  DeliveryType?: VinistoHelperDllEnumsOrderDeliveryType;
  /** If true search only between active deliveries, if false search only between not active deliveries, if not provided search all deliveries */
  IsActive?: boolean;
  /** If provided, sorting will be done according to this column. if not provided, default sorting is done by Order */
  SortingColumn?: VinistoHelperDllEnumsDeliverySortableColumns;
  /** True in case that sorting shall be done in descending order */
  IsSortingDescending?: boolean;
  /** Language version - if provided, all deliveries will be only in selected language. */
  Language?: VinistoHelperDllEnumsLanguage;
  /** If provided it will return deliveries only serving provided zip code */
  ServingZip?: string;
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
  /** Search by is for stocking flag - true if is for stocking */
  IsForStocking?: boolean;
  /** Search by is for customer delivery flag - true if is for orders */
  IsForCustomerDelivery?: boolean;
  /** Prices in response are converted to this currency. Default is CZK. */
  Currency?: VinistoHelperDllEnumsCurrency;
  /** Search by is user subscriber flag - true if is */
  IsSubscriber?: boolean;
  /** @format int32 */
  PlatformId?: number;
  IsCache?: boolean;
}

/** Parameters provided to endpoint for creating delivery */
export type DeliveriesCreatePayload =
  VinistoOrderDllModelsApiDeliveryDeliveryCreateParameters;

/** Parameters which is possible to provided to api to specify which deliveries are requested with allowed condition values */
export type DeliveriesGetDeliveriesByBasketCreatePayload =
  VinistoOrderDllModelsApiDeliveryDeliveryGetByConditionsParameters;

export interface DeliveriesGetDeliveryListParams {
  IsCache?: boolean;
  /**
   * Currency
   * @default "CZK"
   */
  currency?: VinistoHelperDllEnumsCurrency;
  /** Id of the delivery */
  deliveryId: string;
}

export interface DeliveriesGetDeliveryTimeListParams {
  /**
   * Order time. If not set, the current time is used
   * @format int32
   */
  orderTime?: number;
  /** Id of the delivery */
  deliveryId: string;
}

/** Parameters provided to endpoint for editing delivery */
export type DeliveriesEditDeliveryUpdatePayload =
  VinistoOrderDllModelsApiDeliveryDeliveryEditParameters;

/** Class containing parameters for user authorization */
export type DeliveriesActivateDeliveryUpdatePayload =
  | VinistoHelperDllBaseAuthorizationParameters
  | VinistoHelperDllBaseItemAssignParameters
  | VinistoHelperDllBaseItemAssignWithCountryParameters
  | VinistoHelperDllBaseItemsAssignParameters
  | VinistoHelperDllBaseItemsAssignWithCountryParameters;

/** Class containing parameters for user authorization */
export type DeliveriesDeactivateDeliveryUpdatePayload =
  | VinistoHelperDllBaseAuthorizationParameters
  | VinistoHelperDllBaseItemAssignParameters
  | VinistoHelperDllBaseItemAssignWithCountryParameters
  | VinistoHelperDllBaseItemsAssignParameters
  | VinistoHelperDllBaseItemsAssignWithCountryParameters;

/** Parameters which is possible to provided to api to specify request for add price to delivery */
export type DeliveriesPricesCreatePayload =
  VinistoOrderDllModelsApiDeliveryDeliveryManipulationPriceParameters;

export interface DeliveriesPricesDeleteParams {
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
  /** Id of the delivery */
  deliveryId: string;
  /** Id of price which shall be deleted */
  priceId: string;
}

export interface DeliveriesDeleteParams {
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
  /** Id of the delivery */
  deliveryId: string;
}

/** Parameters which is possible to provided to api to specify request for add country to delivery */
export type DeliveriesCountriesCreatePayload =
  VinistoOrderDllModelsApiDeliveryDeliveryManipulationCountryParameters;

export interface DeliveriesCountriesDeleteParams {
  /** Country code for allowed country */
  Country: VinistoHelperDllEnumsCountryCode;
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
  /** Id of the delivery */
  deliveryId: string;
}

/** Class containing parameters for user authorization */
export type DeliveriesPaymentsCreatePayload =
  | VinistoHelperDllBaseAuthorizationParameters
  | VinistoHelperDllBaseItemAssignParameters
  | VinistoHelperDllBaseItemAssignWithCountryParameters
  | VinistoHelperDllBaseItemsAssignParameters
  | VinistoHelperDllBaseItemsAssignWithCountryParameters;

export interface DeliveriesPaymentsDeleteParams {
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
  /** Id of the delivery */
  deliveryId: string;
  /** Id of the payment */
  paymentId: string;
}

/** Class containing parameters for user authorization */
export type DeliveriesActivateIsForStockingDeliveryUpdatePayload =
  | VinistoHelperDllBaseAuthorizationParameters
  | VinistoHelperDllBaseItemAssignParameters
  | VinistoHelperDllBaseItemAssignWithCountryParameters
  | VinistoHelperDllBaseItemsAssignParameters
  | VinistoHelperDllBaseItemsAssignWithCountryParameters;

/** Class containing parameters for user authorization */
export type DeliveriesDeactivateIsForStockingDeliveryUpdatePayload =
  | VinistoHelperDllBaseAuthorizationParameters
  | VinistoHelperDllBaseItemAssignParameters
  | VinistoHelperDllBaseItemAssignWithCountryParameters
  | VinistoHelperDllBaseItemsAssignParameters
  | VinistoHelperDllBaseItemsAssignWithCountryParameters;

/** Class containing parameters for user authorization */
export type DeliveriesActivateIsForCustomerDeliveryUpdatePayload =
  | VinistoHelperDllBaseAuthorizationParameters
  | VinistoHelperDllBaseItemAssignParameters
  | VinistoHelperDllBaseItemAssignWithCountryParameters
  | VinistoHelperDllBaseItemsAssignParameters
  | VinistoHelperDllBaseItemsAssignWithCountryParameters;

/** Class containing parameters for user authorization */
export type DeliveriesDeactivateIsForCustomerDeliveryUpdatePayload =
  | VinistoHelperDllBaseAuthorizationParameters
  | VinistoHelperDllBaseItemAssignParameters
  | VinistoHelperDllBaseItemAssignWithCountryParameters
  | VinistoHelperDllBaseItemsAssignParameters
  | VinistoHelperDllBaseItemsAssignWithCountryParameters;

export interface DeliveriesCanDeliveryToZipListParams {
  /** Zip to */
  zip?: string;
  IsCache?: boolean;
  /** Id of the delivery */
  deliveryId: string;
}

/** Class containing parameters for user authorization */
export type DeliveriesActivateIsSubscriberDeliveryUpdatePayload =
  | VinistoHelperDllBaseAuthorizationParameters
  | VinistoHelperDllBaseItemAssignParameters
  | VinistoHelperDllBaseItemAssignWithCountryParameters
  | VinistoHelperDllBaseItemsAssignParameters
  | VinistoHelperDllBaseItemsAssignWithCountryParameters;

/** Class containing parameters for user authorization */
export type DeliveriesDeactivateIsSubscriberDeliveryUpdatePayload =
  | VinistoHelperDllBaseAuthorizationParameters
  | VinistoHelperDllBaseItemAssignParameters
  | VinistoHelperDllBaseItemAssignWithCountryParameters
  | VinistoHelperDllBaseItemsAssignParameters
  | VinistoHelperDllBaseItemsAssignWithCountryParameters;

export interface DiscountCouponsGetDiscountCouponListParams {
  IsCache?: boolean;
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
  /**
   * Currency
   * @default "CZK"
   */
  currency?: VinistoHelperDllEnumsCurrency;
  /** Id of the discountCoupon */
  discountCouponId: string;
}

export interface DiscountCouponsGetOrdersListParams {
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
  /** Id of the discountCoupon */
  discountCouponId: string;
}

/** Parameters used for manipulation DiscountCoupon */
export type DiscountCouponsEditDiscountCouponUpdatePayload =
  VinistoOrderDllModelsApiDiscountCouponDefinitionParametersDiscountCouponEditParameters;

/** Class containing parameters for user authorization */
export type DiscountCouponsDeactivateDiscountCouponUpdatePayload =
  | VinistoHelperDllBaseAuthorizationParameters
  | VinistoHelperDllBaseItemAssignParameters
  | VinistoHelperDllBaseItemAssignWithCountryParameters
  | VinistoHelperDllBaseItemsAssignParameters
  | VinistoHelperDllBaseItemsAssignWithCountryParameters;

/** Class containing parameters for user authorization */
export type DiscountCouponsActivateUpdatePayload =
  | VinistoHelperDllBaseAuthorizationParameters
  | VinistoHelperDllBaseItemAssignParameters
  | VinistoHelperDllBaseItemAssignWithCountryParameters
  | VinistoHelperDllBaseItemsAssignParameters
  | VinistoHelperDllBaseItemsAssignWithCountryParameters;

export interface DiscountCouponsDeleteParams {
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
  /** Id of the discount coupon */
  discountCouponId: string;
}

/** Parameters used for creating new category from discount coupon */
export type DiscountCouponsCreateCategoryFromCouponCreatePayload =
  VinistoOrderDllModelsApiDiscountCouponDefinitionParametersCategoryCreateFromCouponParameters;

export interface DiscountCouponsListParams {
  /** If provided search by code in discountCoupons */
  SearchCode?: string;
  /** If true, searchCode is used as StartWith instead of Contains */
  IsSearchCodeAutocomplete?: boolean;
  /**
   * Language of the requested category
   * Language version - if provided, all discountCoupons will be only in selected language.
   * Sorting and searching will be according to the specified language
   * Otherwise all language version will be provided and sorting and searching will be according to the default language (CZECH).
   */
  Language?: VinistoHelperDllEnumsLanguage;
  /** If true search only between coupons applicable for discounted items, if false search only between coupons not applicable for discounted items, if not provided search all coupons */
  IsForDiscountedItems?: boolean;
  /**
   * If provided search by Expiration. Time from.
   * @format int32
   */
  ExpirationTimeFrom?: number;
  /**
   * If provided search by Expiration. Time to.
   * @format int32
   */
  ExpirationTimeTo?: number;
  /**
   * If provided search by Creation Time from.
   * @format int32
   */
  CreationTimeFrom?: number;
  /**
   * If provided search by Creation Time to.
   * @format int32
   */
  CreationTimeTo?: number;
  /** If provided search by IsSupplierDiscount */
  IsSupplierDiscount?: boolean;
  /** If provided search by provided suppliersIds in supplierLimitation coupons, If not provided search all type coupons. */
  SearchSuppliers?: string[];
  /** If provided, sorting will be done according to this column. if not provided, default sorting is done by Id */
  SortingColumn?: VinistoHelperDllEnumsDiscountCouponSortableColumns;
  /** True in case that sorting shall be done in descending order */
  IsSortingDescending?: boolean;
  /**
   * Number of records to be skipped. If not provided default value is 0
   * @format int32
   */
  Offset?: number;
  /** If true search only between active coupons, if false search only between not active coupons, if not provided search all coupons */
  IsActive?: boolean;
  /** If true search only between reusable coupons, if false search only between not reusable coupons, if not provided search all coupons */
  IsReusable?: boolean;
  /** If true search only between combinable coupons, if false search only between not combinable coupons, if not provided search all coupons */
  IsCombinable?: boolean;
  /**
   * If true, search only between unexpired reusable coupons and unexpired unused coupons (for non-reusable coupons).
   * If false, search only between coupons that can no longer be used through expiration or that have already been used (for non-reusable coupons).
   * If not provided search all coupons.
   */
  CanBeApplied?: boolean;
  /** If provided search by type in discount coupon */
  SearchDiscountCouponType?: VinistoHelperDllEnumsDiscountCouponDiscountCouponType[];
  /** If provided search by limitation type in discount coupon (more than one can be selected), If not provided search all type coupons. */
  SearchLimitationType?: VinistoHelperDllEnumsDiscountCouponLimitationType[];
  /** If provided search by IsVisibleOnProductDetail */
  IsVisibleOnProductDetail?: boolean;
  /**
   * Number of records to be retrieved. if not provided default value is 10.
   * Limited by Maximum number of records in EnvironmentConstants
   * @format int32
   */
  Limit?: number;
  /** Prices in response are converted to this currency. Default is CZK; */
  Currency?: VinistoHelperDllEnumsCurrency;
  /** Country of sale. All coupons which are returned must be allowed to sale in country. If not provided, then all coupons are allowed. */
  CountryOfSale?: VinistoHelperDllEnumsCountryCode;
  IsCache?: boolean;
}

export interface HeadOrderApi6Params {
  /** If provided search by code in discountCoupons */
  SearchCode?: string;
  /** If true, searchCode is used as StartWith instead of Contains */
  IsSearchCodeAutocomplete?: boolean;
  /**
   * Language of the requested category
   * Language version - if provided, all discountCoupons will be only in selected language.
   * Sorting and searching will be according to the specified language
   * Otherwise all language version will be provided and sorting and searching will be according to the default language (CZECH).
   */
  Language?: VinistoHelperDllEnumsLanguage;
  /** If true search only between coupons applicable for discounted items, if false search only between coupons not applicable for discounted items, if not provided search all coupons */
  IsForDiscountedItems?: boolean;
  /**
   * If provided search by Expiration. Time from.
   * @format int32
   */
  ExpirationTimeFrom?: number;
  /**
   * If provided search by Expiration. Time to.
   * @format int32
   */
  ExpirationTimeTo?: number;
  /**
   * If provided search by Creation Time from.
   * @format int32
   */
  CreationTimeFrom?: number;
  /**
   * If provided search by Creation Time to.
   * @format int32
   */
  CreationTimeTo?: number;
  /** If provided search by IsSupplierDiscount */
  IsSupplierDiscount?: boolean;
  /** If provided search by provided suppliersIds in supplierLimitation coupons, If not provided search all type coupons. */
  SearchSuppliers?: string[];
  /** If provided, sorting will be done according to this column. if not provided, default sorting is done by Id */
  SortingColumn?: VinistoHelperDllEnumsDiscountCouponSortableColumns;
  /** True in case that sorting shall be done in descending order */
  IsSortingDescending?: boolean;
  /**
   * Number of records to be skipped. If not provided default value is 0
   * @format int32
   */
  Offset?: number;
  /** If true search only between active coupons, if false search only between not active coupons, if not provided search all coupons */
  IsActive?: boolean;
  /** If true search only between reusable coupons, if false search only between not reusable coupons, if not provided search all coupons */
  IsReusable?: boolean;
  /** If true search only between combinable coupons, if false search only between not combinable coupons, if not provided search all coupons */
  IsCombinable?: boolean;
  /**
   * If true, search only between unexpired reusable coupons and unexpired unused coupons (for non-reusable coupons).
   * If false, search only between coupons that can no longer be used through expiration or that have already been used (for non-reusable coupons).
   * If not provided search all coupons.
   */
  CanBeApplied?: boolean;
  /** If provided search by type in discount coupon */
  SearchDiscountCouponType?: VinistoHelperDllEnumsDiscountCouponDiscountCouponType[];
  /** If provided search by limitation type in discount coupon (more than one can be selected), If not provided search all type coupons. */
  SearchLimitationType?: VinistoHelperDllEnumsDiscountCouponLimitationType[];
  /** If provided search by IsVisibleOnProductDetail */
  IsVisibleOnProductDetail?: boolean;
  /**
   * Number of records to be retrieved. if not provided default value is 10.
   * Limited by Maximum number of records in EnvironmentConstants
   * @format int32
   */
  Limit?: number;
  /** Prices in response are converted to this currency. Default is CZK; */
  Currency?: VinistoHelperDllEnumsCurrency;
  /** Country of sale. All coupons which are returned must be allowed to sale in country. If not provided, then all coupons are allowed. */
  CountryOfSale?: VinistoHelperDllEnumsCountryCode;
  IsCache?: boolean;
}

export interface DiscountCouponsDelete2Params {
  /** ID of discount coupons to delete */
  DiscountCouponIds: string[];
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
}

/** Parameters used for manipulation DiscountCoupon */
export type DiscountCouponsCreateDiscountCouponCreatePayload =
  | VinistoOrderDllModelsApiDiscountCouponDefinitionParametersDiscountCouponCreateParameters
  | VinistoOrderDllModelsApiDiscountCouponDefinitionParametersDiscountCouponsCreateParameters;

/** Parameters used for creation of supplier DiscountCoupon */
export type DiscountCouponsSuppliersCreatePayload =
  VinistoOrderDllModelsApiDiscountCouponDefinitionParametersSupplierDiscountCouponCreateParameters;

/** Parameters which is possible to provided to api to specify request for checking dicount coupon validity */
export type DiscountCouponsCheckCouponValidityCreatePayload =
  VinistoOrderDllModelsApiDiscountCouponDefinitionParametersDiscountCouponsCheckParameters;

/** Parameters used for create more Discount Coupons */
export type DiscountCouponsCreateDiscountCouponsCreatePayload =
  VinistoOrderDllModelsApiDiscountCouponDefinitionParametersDiscountCouponsCreateParameters;

/** Parameters provided to endpoint for batch deactivating disocunt coupon */
export type DiscountCouponsDeactivateDiscountCouponsUpdatePayload =
  VinistoOrderDllModelsApiDiscountCouponDefinitionParametersDiscountCouponsDeactivationParameters;

export interface DiscountCouponsGetUserAvailableDiscountCouponsListParams {
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

export interface DiscountCouponsGetDiscountCouponsForBasketValidationListParams {
  /** Discount coupons codes. */
  discountCouponsCodes?: string[];
}

export interface OrdersDetailParams {
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
  IsCache?: boolean;
  /** Id of the order */
  orderId: string;
}

export interface HeadOrderApi7Params {
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
  IsCache?: boolean;
  /** Id of the order */
  orderId: string;
}

/** Parameters which is possible to provided to api to specify request for change order state */
export type OrdersOrderChangeStateUpdatePayload =
  VinistoOrderDllModelsApiOrderOrderChangeParameters;

/** Parameters which is possible to provided to api to specify request for add discount coupon to order */
export type OrdersAddDiscountCouponUpdatePayload =
  VinistoOrderDllModelsApiOrderOrderAddDiscoutCouponParameters;

/** Class containing parameters for user authorization */
export type OrdersRemoveDiscountCouponUpdatePayload =
  | VinistoHelperDllBaseAuthorizationParameters
  | VinistoHelperDllBaseItemAssignParameters
  | VinistoHelperDllBaseItemAssignWithCountryParameters
  | VinistoHelperDllBaseItemsAssignParameters
  | VinistoHelperDllBaseItemsAssignWithCountryParameters;

/** Class containing parameters for user authorization */
export type OrdersSendOrderToFlexiUpdatePayload =
  | VinistoHelperDllBaseAuthorizationParameters
  | VinistoHelperDllBaseItemAssignParameters
  | VinistoHelperDllBaseItemAssignWithCountryParameters
  | VinistoHelperDllBaseItemsAssignParameters
  | VinistoHelperDllBaseItemsAssignWithCountryParameters;

/** Class containing parameters for user authorization */
export type OrdersSendOrderToGenerateProformaInvoiceUpdatePayload =
  | VinistoHelperDllBaseAuthorizationParameters
  | VinistoHelperDllBaseItemAssignParameters
  | VinistoHelperDllBaseItemAssignWithCountryParameters
  | VinistoHelperDllBaseItemsAssignParameters
  | VinistoHelperDllBaseItemsAssignWithCountryParameters;

/** Class containing parameters for user authorization */
export type OrdersSendOrderToGenerateVatInvoiceUpdatePayload =
  | VinistoHelperDllBaseAuthorizationParameters
  | VinistoHelperDllBaseItemAssignParameters
  | VinistoHelperDllBaseItemAssignWithCountryParameters
  | VinistoHelperDllBaseItemsAssignParameters
  | VinistoHelperDllBaseItemsAssignWithCountryParameters;

export interface OrdersCanStornoOrderListParams {
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
  orderId: string;
}

/** Class containing parameters for user authorization */
export type OrdersStornoOrderUpdatePayload =
  | VinistoHelperDllBaseAuthorizationParameters
  | VinistoHelperDllBaseItemAssignParameters
  | VinistoHelperDllBaseItemAssignWithCountryParameters
  | VinistoHelperDllBaseItemsAssignParameters
  | VinistoHelperDllBaseItemsAssignWithCountryParameters;

export interface OrdersIsOrderAddressesEditableListParams {
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
  orderId: string;
}

/** Parameters which is possible to provided to api to specify request for editing addresses in the order */
export type OrdersEditAddressesInOrderUpdatePayload =
  VinistoOrderDllModelsApiOrderOrderEditAddressesParameters;

/** Parameters which is possible to provided to api to specify request for editing note in the order */
export type OrdersEditInternalOrderNoteUpdatePayload =
  VinistoOrderDllModelsApiOrderOrderEditInternalNoteParameters;

export interface OrdersSendOrderToWmsUpdateParams {
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
  orderId: string;
}

/** Class containing parameters for user authorization */
export type OrdersRefundUpdatePayload =
  | VinistoHelperDllBaseAuthorizationParameters
  | VinistoHelperDllBaseItemAssignParameters
  | VinistoHelperDllBaseItemAssignWithCountryParameters
  | VinistoHelperDllBaseItemsAssignParameters
  | VinistoHelperDllBaseItemsAssignWithCountryParameters;

export interface OrdersInvoiceSubscriptionListParams {
  userId?: string;
  orderId: string;
}

export interface CronsListParams {
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
  /** Contains list of possible crons in order api */
  cronType?: VinistoHelperDllEnumsCronOrderApiCronType;
}

export interface CronsGenerateDebugInvoicesListParams {
  /**
   * If provided search by time. Time from.
   * @format int32
   */
  TimeFrom?: number;
  /**
   * If provided search by time. Time to.
   * @format int32
   */
  TimeTo?: number;
  /** If provided search by supplier Id */
  SupplierId?: string;
  /** Path where the invoices will be generated */
  Path?: string;
  /**
   * Optional lookback period in months for 'on the way' items. If null, defaults to 12 months.
   * @format int32
   */
  OnTheWayLookbackMonths?: number;
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
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
  /** order id */
  orderId: string;
}

export interface HeadOrderApi8Params {
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
  /** order id */
  orderId: string;
}

export interface OrderDocumentsCreatePayload {
  documents?: File[];
}

export interface OrderDocumentsCreateParams {
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
  orderId: string;
}

export interface OrderDocumentsListParams {
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
  orderId: string;
}

export interface OrderDocumentsDetailParams {
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
  orderId: string;
  documentId: string;
}

export interface OrderDocumentsDeleteParams {
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
  orderId: string;
  documentId: string;
}

export interface InvoicesOrderGetInvoicesListParams {
  /** Hash of the registered user */
  UserLoginHash?: string;
  AnonymousUserId?: string;
  /** Id of the order */
  orderId: string;
}

export interface InvoicesOrderGetPdfDocumentListParams {
  /** Hash of the registered user */
  UserLoginHash?: string;
  /** Id of the anonymous user */
  AnonymousUserId?: string;
  /** Document url */
  DocumentUrl: string;
  /** Id of the order */
  orderId: string;
}

export interface OrdersListParams {
  /** If provided search by user email in orders */
  UserEmail?: string;
  /** If provided search by users ids in orders */
  UsersIds?: string[];
  /** If provided search by order Id */
  OrderId?: string;
  /** If provided search all orders by provided order number */
  OrderNumber?: string;
  /** If provided, searches by state in order states history */
  OrderState?: VinistoHelperDllEnumsOrderOrderState;
  /** If provided, searches by states in order states history */
  OrderStates?: VinistoHelperDllEnumsOrderOrderState[];
  /**
   * If provided search all orders from provided Time (timestamp in seconds from 1.1.1970)
   * @format int64
   */
  TimeFrom?: number;
  /**
   * If provided search all orders to provided Time (timestamp in seconds from 1.1.1970)
   * @format int64
   */
  TimeTo?: number;
  /**
   * If provided search all orders from provided price (total price of the order including vat)
   * @format double
   */
  PriceFrom?: number;
  /**
   * If provided search all orders to provided price (total price of the order including vat)
   * @format double
   */
  PriceTo?: number;
  /** If provided search all orders to provided trackingId */
  TrackingId?: string;
  /** If provided search all orders to provided delivery type */
  DeliveryType?: VinistoHelperDllEnumsOrderDeliveryType;
  /** If provided search all orders to provided payment type */
  PaymentType?: VinistoHelperDllEnumsOrderPaymentType;
  /** If provided, sorting will be done according to this column. if not provided, default sorting is done by Id */
  SortingColumn?: VinistoHelperDllEnumsOrderSortableColumns;
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
  /** If provided, it searches according to current status in orders */
  CurrentState?: VinistoHelperDllEnumsOrderOrderState;
  /**
   * Language for search by delivery name,
   * if provided, searching will be according to the specified language,
   * if not provided, searching will be according to the default language (CZECH).
   */
  Language?: VinistoHelperDllEnumsLanguage;
  /** If provided, it searches according to provided delivery name */
  DeliveryName?: string;
  /** UTM source */
  "Utm.Source"?: string;
  /** UTM medium */
  "Utm.Medium"?: string;
  /** UTM campaign */
  "Utm.Campaign"?: string;
  /** Gad - Google Ads Help */
  "Utm.Gad"?: string;
  /** Gclid - Google Click Identifier */
  "Utm.GclId"?: string;
  /** If provided, it searches according to provided delivery address phone */
  DeliveryPhone?: string;
  /** If provided, it searches according to provided billing id */
  BillingId?: string;
  /** If provided, it searches according to provided country of sale */
  CountryOfSale?: VinistoHelperDllEnumsCountryCode;
  /** @format int32 */
  PlatformId?: number;
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
}

/** Parameters which is possible to provided to api to specify request for change state for provided order list ids */
export type OrdersUpdatePayload =
  VinistoOrderDllModelsApiOrderOrdersChangeParameters;

/** Parameters which is possible to provided to api to specify requests for create order */
export type OrdersCreatePayload =
  VinistoOrderDllModelsApiOrderOrdersCreateParameters;

export interface OrdersBillingOrdersListParams {
  billingId?: string;
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
}

/** Parameters which is possible to provided to api to specify requests for creating order with subscription when accelerated purchase. */
export type OrdersAcceleratedSubscriptionCreatePayload =
  VinistoOrderDllModelsApiOrderOrderCreateAcceleratedSubscriptionParameters;

export interface OrdersOrdersWithNonPaidInvoiceOverdueListParams {
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
  /**
   * @format int32
   * @default 10
   */
  Limit?: number;
  /**
   * @format int32
   * @default 0
   */
  Offset?: number;
  /** @default false */
  IsSortingDescending?: boolean;
}

export interface StatisticsListParams {
  /**
   * Search all orders from provided Time (timestamp in seconds from 1.1.1970)
   * @format int64
   */
  TimeFrom?: number;
  /**
   * Search all orders to provided Time (timestamp in seconds from 1.1.1970)
   * @format int64
   */
  TimeTo?: number;
  /** Language to get texts */
  Language?: VinistoHelperDllEnumsLanguage;
  /** List of states */
  OrderStates: VinistoHelperDllEnumsOrderOrderState[];
  /** Order statistic export type */
  ExportType?: VinistoHelperDllEnumsOrderOrderStatisticExportType;
  /** If not provided, then are returned all orders in XML. If provided, then are returned orders only for country of sale. */
  CountryOfSale?: VinistoHelperDllEnumsCountryCode;
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
}

export interface StatisticsSubscriberTotalDiscountsListParams {
  SubscriptionId: string;
  /** Currency */
  Currency?: VinistoHelperDllEnumsCurrency;
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
}

export interface OrdersXmlGetXmlOrdersListParams {
  /** UserHash to authorize respective operation */
  userLoginHash?: string;
  /**
   * Select only orders created from this dateTime
   * @format int64
   */
  timeFrom?: number;
  /**
   * Select only orders created to this dateTime
   * @format int64
   */
  timeTo?: number;
  /** If not provided, then are returned all orders in XML. If provided, then are returned orders only for country of sale. */
  countryOfSale?: VinistoHelperDllEnumsCountryCode;
}

export interface PaymentsGetPaymentListParams {
  IsCache?: boolean;
  /**
   * Currency
   * @default "CZK"
   */
  currency?: VinistoHelperDllEnumsCurrency;
  /** Id of the payment */
  paymentId: string;
}

/** Parameters which is possible to provided to api to specify request for editing payment */
export type PaymentsEditPaymentUpdatePayload =
  VinistoOrderDllModelsApiPaymentPaymentEditParameters;

/** Class containing parameters for user authorization */
export type PaymentsActivatePaymentUpdatePayload =
  | VinistoHelperDllBaseAuthorizationParameters
  | VinistoHelperDllBaseItemAssignParameters
  | VinistoHelperDllBaseItemAssignWithCountryParameters
  | VinistoHelperDllBaseItemsAssignParameters
  | VinistoHelperDllBaseItemsAssignWithCountryParameters;

/** Class containing parameters for user authorization */
export type PaymentsDeactivatePaymentUpdatePayload =
  | VinistoHelperDllBaseAuthorizationParameters
  | VinistoHelperDllBaseItemAssignParameters
  | VinistoHelperDllBaseItemAssignWithCountryParameters
  | VinistoHelperDllBaseItemsAssignParameters
  | VinistoHelperDllBaseItemsAssignWithCountryParameters;

export interface PaymentsDeleteParams {
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
  /** Id of the payment */
  paymentId: string;
}

/** Parameters which is possible to provided to api to specify request for add price to payment */
export type PaymentsAddPriceForPaymentCreatePayload =
  VinistoOrderDllModelsApiPaymentPaymentManipulationPriceParameters;

export interface PaymentsPricesDeleteParams {
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
  /** Id of the payment */
  paymentId: string;
  /** Id of price which shall be deleted */
  priceId: string;
}

/** Parameters which is possible to provided to api to specify request for add country to payment */
export type PaymentsAddCountryForPaymentCreatePayload =
  VinistoOrderDllModelsApiPaymentPaymentManipulationCountryParameters;

export interface PaymentsRemoveCountryFromPaymentDeleteParams {
  /** Country code for allowed country */
  Country: VinistoHelperDllEnumsCountryCode;
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
  /** Id of the payment */
  paymentId: string;
}

export interface PaymentsListParams {
  /** If provided search by name of Payment */
  SearchName?: string;
  /** Filter to get payments for allowed country */
  AllowedCountry?: VinistoHelperDllEnumsCountryCode;
  /** If provided search all payments to provided payment type */
  PaymentType?: VinistoHelperDllEnumsOrderPaymentType;
  /** If true search only between active payments, if false search only between not active payments, if not provided search all payments */
  IsActive?: boolean;
  /** If provided, sorting will be done according to this column. if not provided, default sorting is done by Order */
  SortingColumn?: VinistoHelperDllEnumsPaymentSortableColumns;
  /** True in case that sorting shall be done in descending order */
  IsSortingDescending?: boolean;
  /** Language version - if provided, all payment will be only in selected language. */
  Language?: VinistoHelperDllEnumsLanguage;
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
  /** Prices in response are converted to this currency. Default is CZK. */
  Currency?: VinistoHelperDllEnumsCurrency;
  IsCache?: boolean;
}

export interface HeadOrderApi9Params {
  /** If provided search by name of Payment */
  SearchName?: string;
  /** Filter to get payments for allowed country */
  AllowedCountry?: VinistoHelperDllEnumsCountryCode;
  /** If provided search all payments to provided payment type */
  PaymentType?: VinistoHelperDllEnumsOrderPaymentType;
  /** If true search only between active payments, if false search only between not active payments, if not provided search all payments */
  IsActive?: boolean;
  /** If provided, sorting will be done according to this column. if not provided, default sorting is done by Order */
  SortingColumn?: VinistoHelperDllEnumsPaymentSortableColumns;
  /** True in case that sorting shall be done in descending order */
  IsSortingDescending?: boolean;
  /** Language version - if provided, all payment will be only in selected language. */
  Language?: VinistoHelperDllEnumsLanguage;
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
  /** Prices in response are converted to this currency. Default is CZK. */
  Currency?: VinistoHelperDllEnumsCurrency;
  IsCache?: boolean;
}

/** Parameters which is possible to provided to api to specify request for creating payment */
export type PaymentsCreatePayload =
  VinistoOrderDllModelsApiPaymentPaymentCreateParameters;

/** Parameters provided to endpoint for batch changing of payment activations */
export type PaymentsActiatePaymentsUpdatePayload =
  VinistoOrderDllModelsApiPaymentPaymentsActivationParameters;

/** Parameters provided to endpoint for batch changing of payment activations */
export type PaymentsDeactivatePaymentsUpdatePayload =
  VinistoOrderDllModelsApiPaymentPaymentsActivationParameters;

export interface PaymentsGetAutocompleteNamesListParams {
  /** Name of the payment */
  Name: string;
  /** Language version - if provided, all payment will be only in selected language. */
  Language?: VinistoHelperDllEnumsLanguage;
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
  /** If provided, sorting will be done according to this column. if not provided, default sorting is done by Order */
  SortingColumn?: VinistoHelperDllEnumsPaymentSortableColumns;
  /** True in case that sorting shall be done in descending order */
  IsSortingDescending?: boolean;
  /** Prices in response are converted to this currency. Default is CZK. */
  Currency?: VinistoHelperDllEnumsCurrency;
  IsCache?: boolean;
}

export interface PaymentsGetAllowedPaymentsListParams {
  /** Basket id - required */
  BasketId: string;
  /** Selected delivery as id */
  DeliveryId?: string;
  /** Language version - if provided, all paymentes will be only in selected language. */
  Language?: VinistoHelperDllEnumsLanguage;
  /** Price currency  - required */
  Currency?: VinistoHelperDllEnumsCurrency;
  /** Filter to get paymentes for allowed country */
  AllowedCountry?: VinistoHelperDllEnumsCountryCode;
  IsCache?: boolean;
}

export interface PaymentsGetActivePaymentsListParams {
  /** Language version - if provided, all paymentes will be only in selected language. */
  Language?: VinistoHelperDllEnumsLanguage;
  /** Filter to get paymentes for allowed country */
  AllowedCountry?: VinistoHelperDllEnumsCountryCode;
  /** Prices in response are converted to this currency. Default is CZK. */
  Currency?: VinistoHelperDllEnumsCurrency;
  IsCache?: boolean;
}

export interface SetInvoicePaymentStateListParams {
  /** @format int32 */
  flexibeeInvoiceId?: number;
  /** Status of flexibee invoice faktura-vydana/stavUhrK */
  paymentState?: VinistoHelperDllEnumsFlexibeePaymentState;
}

export interface CreateReceiptListParams {
  code?: string;
  /** @format int32 */
  count?: number;
}

export interface CreateDisbrusementListParams {
  code?: string;
  /** @format int32 */
  count?: number;
}

export interface UserBundlesListParams {
  /**
   * Language of the requested user bundles.
   * Sorting will be according to the specified language.
   * Otherwise all language version will be provided and sorting will be according to the default language (CZECH).
   */
  Language?: VinistoHelperDllEnumsLanguage;
  /** If provided, sorting will be done according to this column. if not provided, default sorting is done by Id. */
  SortingColumn?: VinistoHelperDllEnumsUserBundleSortableColumns;
  /** True in case that sorting shall be done in descending order. */
  IsSortingDescending?: boolean;
  /** Specifies whether to filter based on the presence of an evaluation from a user. */
  HasEvaluationFromUser?: boolean;
  /**
   * Number of records to be retrieved. if not provided default value is 10.
   * Limited by Maximum number of records in EnvironmentConstants.
   * @format int32
   */
  Limit?: number;
  /**
   * Number of records to be skipped. If not provided default value is 0.
   * @format int32
   */
  Offset?: number;
  /** UserHash to authorize respective operation */
  UserLoginHash?: string;
}

export namespace OrderApi {
  /**
   * No description
   * @tags AutomaticCoupon
   * @name AutomaticCouponsDetail
   * @summary Get automatic coupon according to provided automaticCouponId.
   * @request GET:/order-api/automatic-coupons/{automaticCouponId}
   * @secure
   */
  export namespace AutomaticCouponsDetail {
    export type RequestParams = {
      /** Id of the automatic coupon */
      automaticCouponId: string;
    };
    export type RequestQuery = {
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
      IsCache?: boolean;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoOrderDllModelsApiReturnDataAutomaticCouponReturn;
  }

  /**
   * No description
   * @tags AutomaticCoupon
   * @name AutomaticCouponsUpdate
   * @summary Edit automatic coupon with values according to provided automaticCouponId
   * @request PUT:/order-api/automatic-coupons/{automaticCouponId}
   * @secure
   */
  export namespace AutomaticCouponsUpdate {
    export type RequestParams = {
      automaticCouponId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = AutomaticCouponsUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoOrderDllModelsApiReturnDataAutomaticCouponReturn;
  }

  /**
   * No description
   * @tags AutomaticCoupon
   * @name AutomaticCouponsDelete
   * @summary Remove automatic coupon
   * @request DELETE:/order-api/automatic-coupons/{automaticCouponId}
   * @secure
   */
  export namespace AutomaticCouponsDelete {
    export type RequestParams = {
      automaticCouponId: string;
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
   * @tags AutomaticCoupons
   * @name AutomaticCouponsList
   * @summary Gets the AutomaticCoupon by provided limit and offset sorted by the provided sortByColumn parameter, the sort direction is determined by the sortDesc parameter.
   * @request GET:/order-api/automatic-coupons
   * @secure
   */
  export namespace AutomaticCouponsList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** If provided search by Name in automaticCoupons */
      SearchName?: string;
      /** If provided search by Language in automaticCoupons */
      SearchLanguage?: VinistoHelperDllEnumsLanguage;
      /** If provided search by DiscountType in automaticCoupons */
      SearchDiscountType?: VinistoHelperDllEnumsDiscountCouponDiscountCouponType;
      /** If provided search by Currency in automaticCoupons */
      SearchCurrency?: VinistoHelperDllEnumsCurrency;
      /** If true search only between combinable coupons, if false search only between not combinable coupons, if not provided search all coupons */
      IsCombinable?: boolean;
      /** If true search only between coupons applicable for discounted items, if false search only between coupons not applicable for discounted items, if not provided search all coupons */
      IsForDiscountedItems?: boolean;
      /** If provided search by Trigger in automaticCoupons */
      SearchTriggerType?: VinistoHelperDllEnumsAutomaticCouponTriggerType;
      /** If provided search by limitation type in discount coupon (more than one can be selected), If not provided search all type coupons. */
      SearchLimitationType?: VinistoHelperDllEnumsDiscountCouponLimitationType[];
      /** If provided, sorting will be done according to this column. if not provided, default sorting is done by Id */
      SortingColumn?: VinistoHelperDllEnumsAutomaticCouponSortableColumns;
      /** True in case that sorting shall be done in descending order */
      IsSortingDescending?: boolean;
      /**
       * Number of records to be retrieved. if not provided default value is 10
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
      VinistoOrderDllModelsApiReturnDataAutomaticCouponsReturn;
  }

  /**
   * No description
   * @tags AutomaticCoupons
   * @name HeadOrderApi
   * @summary Gets the AutomaticCoupon by provided limit and offset sorted by the provided sortByColumn parameter, the sort direction is determined by the sortDesc parameter.
   * @request HEAD:/order-api/automatic-coupons
   * @secure
   */
  export namespace HeadOrderApi {
    export type RequestParams = {};
    export type RequestQuery = {
      /** If provided search by Name in automaticCoupons */
      SearchName?: string;
      /** If provided search by Language in automaticCoupons */
      SearchLanguage?: VinistoHelperDllEnumsLanguage;
      /** If provided search by DiscountType in automaticCoupons */
      SearchDiscountType?: VinistoHelperDllEnumsDiscountCouponDiscountCouponType;
      /** If provided search by Currency in automaticCoupons */
      SearchCurrency?: VinistoHelperDllEnumsCurrency;
      /** If true search only between combinable coupons, if false search only between not combinable coupons, if not provided search all coupons */
      IsCombinable?: boolean;
      /** If true search only between coupons applicable for discounted items, if false search only between coupons not applicable for discounted items, if not provided search all coupons */
      IsForDiscountedItems?: boolean;
      /** If provided search by Trigger in automaticCoupons */
      SearchTriggerType?: VinistoHelperDllEnumsAutomaticCouponTriggerType;
      /** If provided search by limitation type in discount coupon (more than one can be selected), If not provided search all type coupons. */
      SearchLimitationType?: VinistoHelperDllEnumsDiscountCouponLimitationType[];
      /** If provided, sorting will be done according to this column. if not provided, default sorting is done by Id */
      SortingColumn?: VinistoHelperDllEnumsAutomaticCouponSortableColumns;
      /** True in case that sorting shall be done in descending order */
      IsSortingDescending?: boolean;
      /**
       * Number of records to be retrieved. if not provided default value is 10
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
      VinistoOrderDllModelsApiReturnDataAutomaticCouponsReturn;
  }

  /**
   * No description
   * @tags AutomaticCoupons
   * @name AutomaticCouponsCreate
   * @summary Creates one new automatic coupon object from provided parameters.
   * @request POST:/order-api/automatic-coupons
   * @secure
   */
  export namespace AutomaticCouponsCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = AutomaticCouponsCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoOrderDllModelsApiReturnDataAutomaticCouponReturn;
  }

  /**
   * No description
   * @tags Billing
   * @name BillingsUpdate
   * @summary Change state of the required billing
   * @request PUT:/order-api/billings/{billingId}
   * @secure
   */
  export namespace BillingsUpdate {
    export type RequestParams = {
      /** Id of the billing */
      billingId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = BillingsUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoOrderDllModelsApiReturnDataBillingReturn;
  }

  /**
   * No description
   * @tags Billing
   * @name BillingsDetail
   * @summary Get desired bílling defined by ID
   * @request GET:/order-api/billings/{billingId}
   * @secure
   */
  export namespace BillingsDetail {
    export type RequestParams = {
      /** Id of the billing */
      billingId: string;
    };
    export type RequestQuery = {
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
      /**
       * Contains list of possible languages
       * @default "CZECH"
       */
      language?: VinistoHelperDllEnumsLanguage;
      /**
       * Optional lookback period in months for 'on the way' items. Default is 12.
       * @format int32
       */
      onTheWayLookbackMonths?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoOrderDllModelsApiReturnDataBillingReturn;
  }

  /**
   * No description
   * @tags Billing
   * @name BillingsDelete
   * @summary Delete provided billing.
   * @request DELETE:/order-api/billings/{billingId}
   * @secure
   */
  export namespace BillingsDelete {
    export type RequestParams = {
      /** Id of the billing */
      billingId: string;
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
   * @tags Billing
   * @name BillingsGeneratePdfList
   * @summary Generate pdf for provided billing.
   * @request GET:/order-api/billings/{billingId}/GeneratePdf
   * @secure
   */
  export namespace BillingsGeneratePdfList {
    export type RequestParams = {
      /** Id of the billing */
      billingId: string;
    };
    export type RequestQuery = {
      /** Language */
      Language?: VinistoHelperDllEnumsLanguage;
      /** Pdf type */
      PdfType: VinistoHelperDllEnumsPdfType;
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
      /**
       * Optional lookback period in months for 'on the way' items. Default is 12.
       * @format int32
       */
      onTheWayLookbackMonths?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags Billing
   * @name BillingsDownloadPdfList
   * @summary Download pdf for provided billing.
   * @request GET:/order-api/billings/{billingId}/DownloadPdf
   * @secure
   */
  export namespace BillingsDownloadPdfList {
    export type RequestParams = {
      /** Id of the billing */
      billingId: string;
    };
    export type RequestQuery = {
      /** Pdf type */
      PdfType: VinistoHelperDllEnumsPdfType;
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags Billing
   * @name BillingsGenerateXlsList
   * @summary Generate .xls for provided billing.
   * @request GET:/order-api/billings/{billingId}/GenerateXls
   * @secure
   */
  export namespace BillingsGenerateXlsList {
    export type RequestParams = {
      /** Id of the billing */
      billingId: string;
    };
    export type RequestQuery = {
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
      /**
       * Contains list of possible languages
       * @default "CZECH"
       */
      language?: VinistoHelperDllEnumsLanguage;
      /**
       * Optional lookback period in months for 'on the way' items. Default is 12.
       * @format int32
       */
      onTheWayLookbackMonths?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags Billings
   * @name BillingsList
   * @summary Get Billings according to provided parameters
   * @request GET:/order-api/billings
   * @secure
   */
  export namespace BillingsList {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * If provided search by create time. Time from.
       * @format int32
       */
      TimeFrom?: number;
      /**
       * If provided search by create time. Time to.
       * @format int32
       */
      TimeTo?: number;
      /** If provided search by supplier Id */
      SupplierId?: string;
      /** If provided search by supplier name */
      SupplierName?: string;
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
      /** If provided, sorting will be done according to this column. if not provided, default sorting is done by Id */
      SortingColumn?: VinistoHelperDllEnumsBillingSortableColumns;
      /** True in case that sorting shall be done in descending order */
      IsSortingDescending?: boolean;
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoOrderDllModelsApiReturnDataBillingsReturn;
  }

  /**
   * No description
   * @tags Billings
   * @name HeadOrderApi2
   * @summary Get Billings according to provided parameters
   * @request HEAD:/order-api/billings
   * @originalName headOrderApi
   * @duplicate
   * @secure
   */
  export namespace HeadOrderApi2 {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * If provided search by create time. Time from.
       * @format int32
       */
      TimeFrom?: number;
      /**
       * If provided search by create time. Time to.
       * @format int32
       */
      TimeTo?: number;
      /** If provided search by supplier Id */
      SupplierId?: string;
      /** If provided search by supplier name */
      SupplierName?: string;
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
      /** If provided, sorting will be done according to this column. if not provided, default sorting is done by Id */
      SortingColumn?: VinistoHelperDllEnumsBillingSortableColumns;
      /** True in case that sorting shall be done in descending order */
      IsSortingDescending?: boolean;
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoOrderDllModelsApiReturnDataBillingsReturn;
  }

  /**
   * No description
   * @tags Billings
   * @name BillingsCreate
   * @summary Create billing.
   * @request POST:/order-api/billings
   * @secure
   */
  export namespace BillingsCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BillingsCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoOrderDllModelsApiReturnDataBillingReturn;
  }

  /**
   * No description
   * @tags Billings
   * @name BillingsCsvExportList
   * @summary Generate billings data in csv format for provided supplier
   * @request GET:/order-api/billings/csv-export
   * @secure
   */
  export namespace BillingsCsvExportList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** Supplier Id */
      supplierId?: string;
      /** UserHash to authorize respective operation */
      userLoginHash?: string;
      /**
       * Select only orders created from this dateTime
       * @format int64
       */
      timeFrom?: number;
      /**
       * Select only orders created to this dateTime
       * @format int64
       */
      timeTo?: number;
      /**
       * Optional lookback period in months for 'on the way' items. Default is 12.
       * @format int32
       */
      onTheWayLookbackMonths?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags BillingsXml
   * @name BillingsXmlGetXmlBillingsList
   * @summary Generate billings data in XML format
   * @request GET:/order-api/billings-xml/GetXmlBillings
   * @secure
   */
  export namespace BillingsXmlGetXmlBillingsList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** UserHash to authorize respective operation */
      userLoginHash?: string;
      /**
       * Select only orders created from this dateTime
       * @format int64
       */
      timeFrom?: number;
      /**
       * Select only orders created to this dateTime
       * @format int64
       */
      timeTo?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags ContractWithdrawalRequest
   * @name ContractWithdrawalRequestDetail
   * @summary Get contract withdrawal request according to provided id.
   * @request GET:/order-api/contract-withdrawal-request/{contractWithdrawalRequestId}
   * @secure
   */
  export namespace ContractWithdrawalRequestDetail {
    export type RequestParams = {
      /** Id of the contract withdrawal request */
      contractWithdrawalRequestId: string;
    };
    export type RequestQuery = {
      UserLoginHash?: string;
      AnonymousUserId?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoOrderDllModelsApiReturnDataContractWithdrawalRequestReturn;
  }

  /**
   * No description
   * @tags ContractWithdrawalRequest
   * @name ContractWithdrawalRequestUpdate
   * @summary Change contract withdrawal request state and set internal note, processed by properties.
   * @request PUT:/order-api/contract-withdrawal-request/{contractWithdrawalRequestId}
   * @secure
   */
  export namespace ContractWithdrawalRequestUpdate {
    export type RequestParams = {
      /** Id of the contract withdrawal request */
      contractWithdrawalRequestId: string;
    };
    export type RequestQuery = {
      State: VinistoHelperDllEnumsContractWithdrawalRequestContractWithdrawalRequestChangeState;
      InternalNote?: string;
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoOrderDllModelsApiReturnDataContractWithdrawalRequestReturn;
  }

  /**
   * No description
   * @tags ContractWithdrawalRequests
   * @name ContractWithdrawalRequestList
   * @summary Get contract withdrawal requests according to provided parameters.
   * @request GET:/order-api/contract-withdrawal-request
   * @secure
   */
  export namespace ContractWithdrawalRequestList {
    export type RequestParams = {};
    export type RequestQuery = {
      SearchSurname?: string;
      SearchEmail?: string;
      SearchPhone?: string;
      SearchState?: VinistoHelperDllEnumsContractWithdrawalRequestContractWithdrawalRequestState;
      /** If provided, sorting will be done according to this column. if not provided, default sorting is done by Id. */
      SortingColumn?: VinistoHelperDllEnumsContractWithdrawalRequestSortableColumns;
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
    export type ResponseBody =
      VinistoOrderDllModelsApiReturnDataContractWithdrawalRequestsReturn;
  }

  /**
   * No description
   * @tags ContractWithdrawalRequests
   * @name HeadOrderApi3
   * @summary Get contract withdrawal requests according to provided parameters.
   * @request HEAD:/order-api/contract-withdrawal-request
   * @originalName headOrderApi
   * @duplicate
   * @secure
   */
  export namespace HeadOrderApi3 {
    export type RequestParams = {};
    export type RequestQuery = {
      SearchSurname?: string;
      SearchEmail?: string;
      SearchPhone?: string;
      SearchState?: VinistoHelperDllEnumsContractWithdrawalRequestContractWithdrawalRequestState;
      /** If provided, sorting will be done according to this column. if not provided, default sorting is done by Id. */
      SortingColumn?: VinistoHelperDllEnumsContractWithdrawalRequestSortableColumns;
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
    export type ResponseBody =
      VinistoOrderDllModelsApiReturnDataContractWithdrawalRequestsReturn;
  }

  /**
   * No description
   * @tags ContractWithdrawalRequests
   * @name ContractWithdrawalRequestCreate
   * @summary Create new contract withdrawal request.
   * @request POST:/order-api/contract-withdrawal-request
   * @secure
   */
  export namespace ContractWithdrawalRequestCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ContractWithdrawalRequestCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoOrderDllModelsApiReturnDataContractWithdrawalRequestReturn;
  }

  /**
   * No description
   * @tags DashboardSale
   * @name HeadOrderApi4
   * @summary Get sale data by provided DashboardSaleGetParameters parametres (time interval and supplier id)
   * @request HEAD:/order-api/dashboard-sale
   * @originalName headOrderApi
   * @duplicate
   * @secure
   */
  export namespace HeadOrderApi4 {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * Search by time. Time from.
       * @format int64
       */
      TimeFrom: number;
      /**
       * Search by time. Time to.
       * @format int64
       */
      TimeTo: number;
      /** Search by supplier Id */
      SupplierId?: string;
      /**
       * Limit for bundles with sale information
       * @format int32
       */
      Limit?: number;
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoOrderDllModelsApiReturnDataSaleDataReturn;
  }

  /**
   * No description
   * @tags DashboardSale
   * @name DashboardSaleList
   * @summary Get sale data by provided DashboardSaleGetParameters parametres (time interval and supplier id)
   * @request GET:/order-api/dashboard-sale
   * @secure
   */
  export namespace DashboardSaleList {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * Search by time. Time from.
       * @format int64
       */
      TimeFrom: number;
      /**
       * Search by time. Time to.
       * @format int64
       */
      TimeTo: number;
      /** Search by supplier Id */
      SupplierId?: string;
      /**
       * Limit for bundles with sale information
       * @format int32
       */
      Limit?: number;
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoOrderDllModelsApiReturnDataSaleDataReturn;
  }

  /**
   * No description
   * @tags Deliveries
   * @name DeliveriesList
   * @summary Get Deliveries according to provided parameters. Delivery time is in Hours
   * @request GET:/order-api/deliveries
   * @secure
   */
  export namespace DeliveriesList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** If provided search by name in products */
      SearchName?: string;
      /**
       * Filter to get deliveries for weight
       * @format double
       */
      AllowedWeight?: number;
      /** Filter to get deliveries for allowed country */
      AllowedCountry?: VinistoHelperDllEnumsCountryCode;
      /** If provided search all deliveries to provided delivery type */
      DeliveryType?: VinistoHelperDllEnumsOrderDeliveryType;
      /** If true search only between active deliveries, if false search only between not active deliveries, if not provided search all deliveries */
      IsActive?: boolean;
      /** If provided, sorting will be done according to this column. if not provided, default sorting is done by Order */
      SortingColumn?: VinistoHelperDllEnumsDeliverySortableColumns;
      /** True in case that sorting shall be done in descending order */
      IsSortingDescending?: boolean;
      /** Language version - if provided, all deliveries will be only in selected language. */
      Language?: VinistoHelperDllEnumsLanguage;
      /** If provided it will return deliveries only serving provided zip code */
      ServingZip?: string;
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
      /** Search by is for stocking flag - true if is for stocking */
      IsForStocking?: boolean;
      /** Search by is for customer delivery flag - true if is for orders */
      IsForCustomerDelivery?: boolean;
      /** Prices in response are converted to this currency. Default is CZK. */
      Currency?: VinistoHelperDllEnumsCurrency;
      /** Search by is user subscriber flag - true if is */
      IsSubscriber?: boolean;
      /** @format int32 */
      PlatformId?: number;
      IsCache?: boolean;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoOrderDllModelsApiReturnDataDeliveriesReturn;
  }

  /**
   * No description
   * @tags Deliveries
   * @name HeadOrderApi5
   * @summary Get Deliveries according to provided parameters. Delivery time is in Hours
   * @request HEAD:/order-api/deliveries
   * @originalName headOrderApi
   * @duplicate
   * @secure
   */
  export namespace HeadOrderApi5 {
    export type RequestParams = {};
    export type RequestQuery = {
      /** If provided search by name in products */
      SearchName?: string;
      /**
       * Filter to get deliveries for weight
       * @format double
       */
      AllowedWeight?: number;
      /** Filter to get deliveries for allowed country */
      AllowedCountry?: VinistoHelperDllEnumsCountryCode;
      /** If provided search all deliveries to provided delivery type */
      DeliveryType?: VinistoHelperDllEnumsOrderDeliveryType;
      /** If true search only between active deliveries, if false search only between not active deliveries, if not provided search all deliveries */
      IsActive?: boolean;
      /** If provided, sorting will be done according to this column. if not provided, default sorting is done by Order */
      SortingColumn?: VinistoHelperDllEnumsDeliverySortableColumns;
      /** True in case that sorting shall be done in descending order */
      IsSortingDescending?: boolean;
      /** Language version - if provided, all deliveries will be only in selected language. */
      Language?: VinistoHelperDllEnumsLanguage;
      /** If provided it will return deliveries only serving provided zip code */
      ServingZip?: string;
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
      /** Search by is for stocking flag - true if is for stocking */
      IsForStocking?: boolean;
      /** Search by is for customer delivery flag - true if is for orders */
      IsForCustomerDelivery?: boolean;
      /** Prices in response are converted to this currency. Default is CZK. */
      Currency?: VinistoHelperDllEnumsCurrency;
      /** Search by is user subscriber flag - true if is */
      IsSubscriber?: boolean;
      /** @format int32 */
      PlatformId?: number;
      IsCache?: boolean;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoOrderDllModelsApiReturnDataDeliveriesReturn;
  }

  /**
   * No description
   * @tags Deliveries
   * @name DeliveriesCreate
   * @summary Create new delivery.  Delivery time is in Hours
   * @request POST:/order-api/deliveries
   * @secure
   */
  export namespace DeliveriesCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = DeliveriesCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoOrderDllModelsApiReturnDataDeliveryReturn;
  }

  /**
   * No description
   * @tags Deliveries
   * @name DeliveriesGetDeliveriesByBasketCreate
   * @summary Get deliveries for basket total price and weight
   * @request POST:/order-api/deliveries/GetDeliveriesByBasket
   * @secure
   */
  export namespace DeliveriesGetDeliveriesByBasketCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = DeliveriesGetDeliveriesByBasketCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoOrderDllModelsApiReturnDataDeliveriesReturn;
  }

  /**
   * No description
   * @tags Delivery
   * @name DeliveriesGetDeliveryList
   * @summary Get delivery with values according to provided delivery id. Delivery time is in hours
   * @request GET:/order-api/deliveries/{deliveryId}/GetDelivery
   * @secure
   */
  export namespace DeliveriesGetDeliveryList {
    export type RequestParams = {
      /** Id of the delivery */
      deliveryId: string;
    };
    export type RequestQuery = {
      IsCache?: boolean;
      /**
       * Currency
       * @default "CZK"
       */
      currency?: VinistoHelperDllEnumsCurrency;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoOrderDllModelsApiReturnDataDeliveryReturn;
  }

  /**
   * No description
   * @tags Delivery
   * @name DeliveriesGetDeliveryTimeList
   * @summary Get delivery time with values according to provided delivery id.
   * @request GET:/order-api/deliveries/{deliveryId}/GetDeliveryTime
   * @secure
   */
  export namespace DeliveriesGetDeliveryTimeList {
    export type RequestParams = {
      /** Id of the delivery */
      deliveryId: string;
    };
    export type RequestQuery = {
      /**
       * Order time. If not set, the current time is used
       * @format int32
       */
      orderTime?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoOrderDllModelsApiReturnDataDeliveryTimeRangeReturn;
  }

  /**
   * No description
   * @tags Delivery
   * @name DeliveriesEditDeliveryUpdate
   * @summary Edit delivery
   * @request PUT:/order-api/deliveries/{deliveryId}/EditDelivery
   * @secure
   */
  export namespace DeliveriesEditDeliveryUpdate {
    export type RequestParams = {
      /** Id of the delivery */
      deliveryId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = DeliveriesEditDeliveryUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoOrderDllModelsApiReturnDataDeliveryReturn;
  }

  /**
   * No description
   * @tags Delivery
   * @name DeliveriesActivateDeliveryUpdate
   * @summary Activate delivery
   * @request PUT:/order-api/deliveries/{deliveryId}/ActivateDelivery
   * @secure
   */
  export namespace DeliveriesActivateDeliveryUpdate {
    export type RequestParams = {
      /** Id of the delivery */
      deliveryId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = DeliveriesActivateDeliveryUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoOrderDllModelsApiReturnDataDeliveryReturn;
  }

  /**
   * No description
   * @tags Delivery
   * @name DeliveriesDeactivateDeliveryUpdate
   * @summary Deactivate delivery
   * @request PUT:/order-api/deliveries/{deliveryId}/DeactivateDelivery
   * @secure
   */
  export namespace DeliveriesDeactivateDeliveryUpdate {
    export type RequestParams = {
      /** Id of the delivery */
      deliveryId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = DeliveriesDeactivateDeliveryUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoOrderDllModelsApiReturnDataDeliveryReturn;
  }

  /**
   * No description
   * @tags Delivery
   * @name DeliveriesPricesCreate
   * @summary Add price to delivery
   * @request POST:/order-api/deliveries/{deliveryId}/prices
   * @secure
   */
  export namespace DeliveriesPricesCreate {
    export type RequestParams = {
      /** Id of the delivery */
      deliveryId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = DeliveriesPricesCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoOrderDllModelsApiReturnDataDeliveryReturn;
  }

  /**
   * No description
   * @tags Delivery
   * @name DeliveriesPricesDelete
   * @summary Remove price from delivery
   * @request DELETE:/order-api/deliveries/{deliveryId}/prices/{priceId}
   * @secure
   */
  export namespace DeliveriesPricesDelete {
    export type RequestParams = {
      /** Id of the delivery */
      deliveryId: string;
      /** Id of price which shall be deleted */
      priceId: string;
    };
    export type RequestQuery = {
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoOrderDllModelsApiReturnDataDeliveryReturn;
  }

  /**
   * No description
   * @tags Delivery
   * @name DeliveriesDelete
   * @summary Remove delivery
   * @request DELETE:/order-api/deliveries/{deliveryId}
   * @secure
   */
  export namespace DeliveriesDelete {
    export type RequestParams = {
      /** Id of the delivery */
      deliveryId: string;
    };
    export type RequestQuery = {
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoOrderDllModelsApiReturnDataDeliveryReturn;
  }

  /**
   * No description
   * @tags Delivery
   * @name DeliveriesCountriesCreate
   * @summary Add country to delivery
   * @request POST:/order-api/deliveries/{deliveryId}/countries
   * @secure
   */
  export namespace DeliveriesCountriesCreate {
    export type RequestParams = {
      /** Id of the delivery */
      deliveryId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = DeliveriesCountriesCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoOrderDllModelsApiReturnDataDeliveryReturn;
  }

  /**
   * No description
   * @tags Delivery
   * @name DeliveriesCountriesDelete
   * @summary Remove country from delivery
   * @request DELETE:/order-api/deliveries/{deliveryId}/countries
   * @secure
   */
  export namespace DeliveriesCountriesDelete {
    export type RequestParams = {
      /** Id of the delivery */
      deliveryId: string;
    };
    export type RequestQuery = {
      /** Country code for allowed country */
      Country: VinistoHelperDllEnumsCountryCode;
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoOrderDllModelsApiReturnDataDeliveryReturn;
  }

  /**
   * No description
   * @tags Delivery
   * @name DeliveriesPaymentsCreate
   * @summary Add payment to delivery
   * @request POST:/order-api/deliveries/{deliveryId}/payments/{paymentId}
   * @secure
   */
  export namespace DeliveriesPaymentsCreate {
    export type RequestParams = {
      /** Id of the delivery */
      deliveryId: string;
      /** Id of the payment */
      paymentId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = DeliveriesPaymentsCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoOrderDllModelsApiReturnDataDeliveryReturn;
  }

  /**
   * No description
   * @tags Delivery
   * @name DeliveriesPaymentsDelete
   * @summary Remove payment from delivery
   * @request DELETE:/order-api/deliveries/{deliveryId}/payments/{paymentId}
   * @secure
   */
  export namespace DeliveriesPaymentsDelete {
    export type RequestParams = {
      /** Id of the delivery */
      deliveryId: string;
      /** Id of the payment */
      paymentId: string;
    };
    export type RequestQuery = {
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoOrderDllModelsApiReturnDataDeliveryReturn;
  }

  /**
   * No description
   * @tags Delivery
   * @name DeliveriesActivateIsForStockingDeliveryUpdate
   * @summary Activate IsForStocking delivery property
   * @request PUT:/order-api/deliveries/{deliveryId}/ActivateIsForStockingDelivery
   * @secure
   */
  export namespace DeliveriesActivateIsForStockingDeliveryUpdate {
    export type RequestParams = {
      /** Id of the delivery */
      deliveryId: string;
    };
    export type RequestQuery = {};
    export type RequestBody =
      DeliveriesActivateIsForStockingDeliveryUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoOrderDllModelsApiReturnDataDeliveryReturn;
  }

  /**
   * No description
   * @tags Delivery
   * @name DeliveriesDeactivateIsForStockingDeliveryUpdate
   * @summary Deactivate IsForStocking delivery property
   * @request PUT:/order-api/deliveries/{deliveryId}/DeactivateIsForStockingDelivery
   * @secure
   */
  export namespace DeliveriesDeactivateIsForStockingDeliveryUpdate {
    export type RequestParams = {
      /** Id of the delivery */
      deliveryId: string;
    };
    export type RequestQuery = {};
    export type RequestBody =
      DeliveriesDeactivateIsForStockingDeliveryUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoOrderDllModelsApiReturnDataDeliveryReturn;
  }

  /**
   * No description
   * @tags Delivery
   * @name DeliveriesActivateIsForCustomerDeliveryUpdate
   * @summary Activate IsForCustomerDelivery delivery property
   * @request PUT:/order-api/deliveries/{deliveryId}/ActivateIsForCustomerDelivery
   * @secure
   */
  export namespace DeliveriesActivateIsForCustomerDeliveryUpdate {
    export type RequestParams = {
      /** Id of the delivery */
      deliveryId: string;
    };
    export type RequestQuery = {};
    export type RequestBody =
      DeliveriesActivateIsForCustomerDeliveryUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoOrderDllModelsApiReturnDataDeliveryReturn;
  }

  /**
   * No description
   * @tags Delivery
   * @name DeliveriesDeactivateIsForCustomerDeliveryUpdate
   * @summary Deactivate IsForCustomerDelivery delivery property
   * @request PUT:/order-api/deliveries/{deliveryId}/DeactivateIsForCustomerDelivery
   * @secure
   */
  export namespace DeliveriesDeactivateIsForCustomerDeliveryUpdate {
    export type RequestParams = {
      /** Id of the delivery */
      deliveryId: string;
    };
    export type RequestQuery = {};
    export type RequestBody =
      DeliveriesDeactivateIsForCustomerDeliveryUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoOrderDllModelsApiReturnDataDeliveryReturn;
  }

  /**
   * No description
   * @tags Delivery
   * @name DeliveriesCanDeliveryToZipList
   * @summary Check if provided delivery can delivery to provided zip
   * @request GET:/order-api/deliveries/{deliveryId}/CanDeliveryToZip
   * @secure
   */
  export namespace DeliveriesCanDeliveryToZipList {
    export type RequestParams = {
      /** Id of the delivery */
      deliveryId: string;
    };
    export type RequestQuery = {
      /** Zip to */
      zip?: string;
      IsCache?: boolean;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoHelperDllBaseBoolReturn;
  }

  /**
   * No description
   * @tags Delivery
   * @name DeliveriesActivateIsSubscriberDeliveryUpdate
   * @summary Activate IsSubscriber delivery property
   * @request PUT:/order-api/deliveries/{deliveryId}/ActivateIsSubscriberDelivery
   * @secure
   */
  export namespace DeliveriesActivateIsSubscriberDeliveryUpdate {
    export type RequestParams = {
      /** Id of the delivery */
      deliveryId: string;
    };
    export type RequestQuery = {};
    export type RequestBody =
      DeliveriesActivateIsSubscriberDeliveryUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoOrderDllModelsApiReturnDataDeliveryReturn;
  }

  /**
   * No description
   * @tags Delivery
   * @name DeliveriesDeactivateIsSubscriberDeliveryUpdate
   * @summary Deactivate IsSubscriber delivery property
   * @request PUT:/order-api/deliveries/{deliveryId}/DeactivateIsSubscriberDelivery
   * @secure
   */
  export namespace DeliveriesDeactivateIsSubscriberDeliveryUpdate {
    export type RequestParams = {
      /** Id of the delivery */
      deliveryId: string;
    };
    export type RequestQuery = {};
    export type RequestBody =
      DeliveriesDeactivateIsSubscriberDeliveryUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoOrderDllModelsApiReturnDataDeliveryReturn;
  }

  /**
   * No description
   * @tags DiscountCoupon
   * @name DiscountCouponsGetDiscountCouponList
   * @summary Get discountCoupon with values according to provided discountCouponId.
   * @request GET:/order-api/discount-coupons/{discountCouponId}/GetDiscountCoupon
   * @secure
   */
  export namespace DiscountCouponsGetDiscountCouponList {
    export type RequestParams = {
      /** Id of the discountCoupon */
      discountCouponId: string;
    };
    export type RequestQuery = {
      IsCache?: boolean;
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
    export type ResponseBody =
      VinistoOrderDllModelsApiReturnDataDiscountCouponReturn;
  }

  /**
   * No description
   * @tags DiscountCoupon
   * @name DiscountCouponsGetOrdersList
   * @summary Get orders with discount code
   * @request GET:/order-api/discount-coupons/{discountCouponId}/GetOrders
   * @secure
   */
  export namespace DiscountCouponsGetOrdersList {
    export type RequestParams = {
      /** Id of the discountCoupon */
      discountCouponId: string;
    };
    export type RequestQuery = {
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoOrderDllModelsApiReturnDataOrdersReturn;
  }

  /**
   * No description
   * @tags DiscountCoupon
   * @name DiscountCouponsEditDiscountCouponUpdate
   * @summary Edit discount coupon with values according to provided discountCouponId
   * @request PUT:/order-api/discount-coupons/{discountCouponId}/EditDiscountCoupon
   * @secure
   */
  export namespace DiscountCouponsEditDiscountCouponUpdate {
    export type RequestParams = {
      /** Discount coupon ID */
      discountCouponId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = DiscountCouponsEditDiscountCouponUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoOrderDllModelsApiReturnDataDiscountCouponReturn;
  }

  /**
   * No description
   * @tags DiscountCoupon
   * @name DiscountCouponsDeactivateDiscountCouponUpdate
   * @summary Deactivate discountCoupon
   * @request PUT:/order-api/discount-coupons/{discountCouponId}/DeactivateDiscountCoupon
   * @secure
   */
  export namespace DiscountCouponsDeactivateDiscountCouponUpdate {
    export type RequestParams = {
      /** Id of the discountCoupon */
      discountCouponId: string;
    };
    export type RequestQuery = {};
    export type RequestBody =
      DiscountCouponsDeactivateDiscountCouponUpdatePayload;
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
   * @tags DiscountCoupon
   * @name DiscountCouponsActivateUpdate
   * @summary Activates discount coupon
   * @request PUT:/order-api/discount-coupons/{discountCouponId}/activate
   * @secure
   */
  export namespace DiscountCouponsActivateUpdate {
    export type RequestParams = {
      /** Id of the discountCoupon */
      discountCouponId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = DiscountCouponsActivateUpdatePayload;
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
   * @tags DiscountCoupon
   * @name DiscountCouponsDelete
   * @summary Remove discount coupon
   * @request DELETE:/order-api/discount-coupons/{discountCouponId}
   * @secure
   */
  export namespace DiscountCouponsDelete {
    export type RequestParams = {
      /** Id of the discount coupon */
      discountCouponId: string;
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
   * @tags DiscountCoupon
   * @name DiscountCouponsCreateCategoryFromCouponCreate
   * @summary Create new dynamic category by discount coupon limitation
   * @request POST:/order-api/discount-coupons/{discountCouponId}/create-category-from-coupon
   * @secure
   */
  export namespace DiscountCouponsCreateCategoryFromCouponCreate {
    export type RequestParams = {
      /** Id of the discount coupon */
      discountCouponId: string;
    };
    export type RequestQuery = {};
    export type RequestBody =
      DiscountCouponsCreateCategoryFromCouponCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoOrderDllModelsApiReturnDataDiscountCouponReturn;
  }

  /**
 * No description
 * @tags DiscountCoupons
 * @name DiscountCouponsList
 * @summary Gets the DiscountCoupons by provided limit and offset sorted by the provided sortByColumn parameter, the sort direction is determined by the sortDesc parameter.
If code was specified, DiscountCoupons will be searched according to these specified parameters.
 * @request GET:/order-api/discount-coupons
 * @secure
*/
  export namespace DiscountCouponsList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** If provided search by code in discountCoupons */
      SearchCode?: string;
      /** If true, searchCode is used as StartWith instead of Contains */
      IsSearchCodeAutocomplete?: boolean;
      /**
       * Language of the requested category
       * Language version - if provided, all discountCoupons will be only in selected language.
       * Sorting and searching will be according to the specified language
       * Otherwise all language version will be provided and sorting and searching will be according to the default language (CZECH).
       */
      Language?: VinistoHelperDllEnumsLanguage;
      /** If true search only between coupons applicable for discounted items, if false search only between coupons not applicable for discounted items, if not provided search all coupons */
      IsForDiscountedItems?: boolean;
      /**
       * If provided search by Expiration. Time from.
       * @format int32
       */
      ExpirationTimeFrom?: number;
      /**
       * If provided search by Expiration. Time to.
       * @format int32
       */
      ExpirationTimeTo?: number;
      /**
       * If provided search by Creation Time from.
       * @format int32
       */
      CreationTimeFrom?: number;
      /**
       * If provided search by Creation Time to.
       * @format int32
       */
      CreationTimeTo?: number;
      /** If provided search by IsSupplierDiscount */
      IsSupplierDiscount?: boolean;
      /** If provided search by provided suppliersIds in supplierLimitation coupons, If not provided search all type coupons. */
      SearchSuppliers?: string[];
      /** If provided, sorting will be done according to this column. if not provided, default sorting is done by Id */
      SortingColumn?: VinistoHelperDllEnumsDiscountCouponSortableColumns;
      /** True in case that sorting shall be done in descending order */
      IsSortingDescending?: boolean;
      /**
       * Number of records to be skipped. If not provided default value is 0
       * @format int32
       */
      Offset?: number;
      /** If true search only between active coupons, if false search only between not active coupons, if not provided search all coupons */
      IsActive?: boolean;
      /** If true search only between reusable coupons, if false search only between not reusable coupons, if not provided search all coupons */
      IsReusable?: boolean;
      /** If true search only between combinable coupons, if false search only between not combinable coupons, if not provided search all coupons */
      IsCombinable?: boolean;
      /**
       * If true, search only between unexpired reusable coupons and unexpired unused coupons (for non-reusable coupons).
       * If false, search only between coupons that can no longer be used through expiration or that have already been used (for non-reusable coupons).
       * If not provided search all coupons.
       */
      CanBeApplied?: boolean;
      /** If provided search by type in discount coupon */
      SearchDiscountCouponType?: VinistoHelperDllEnumsDiscountCouponDiscountCouponType[];
      /** If provided search by limitation type in discount coupon (more than one can be selected), If not provided search all type coupons. */
      SearchLimitationType?: VinistoHelperDllEnumsDiscountCouponLimitationType[];
      /** If provided search by IsVisibleOnProductDetail */
      IsVisibleOnProductDetail?: boolean;
      /**
       * Number of records to be retrieved. if not provided default value is 10.
       * Limited by Maximum number of records in EnvironmentConstants
       * @format int32
       */
      Limit?: number;
      /** Prices in response are converted to this currency. Default is CZK; */
      Currency?: VinistoHelperDllEnumsCurrency;
      /** Country of sale. All coupons which are returned must be allowed to sale in country. If not provided, then all coupons are allowed. */
      CountryOfSale?: VinistoHelperDllEnumsCountryCode;
      IsCache?: boolean;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoOrderDllModelsApiReturnDataDiscountCouponsReturn;
  }

  /**
 * No description
 * @tags DiscountCoupons
 * @name HeadOrderApi6
 * @summary Gets the DiscountCoupons by provided limit and offset sorted by the provided sortByColumn parameter, the sort direction is determined by the sortDesc parameter.
If code was specified, DiscountCoupons will be searched according to these specified parameters.
 * @request HEAD:/order-api/discount-coupons
 * @originalName headOrderApi
 * @duplicate
 * @secure
*/
  export namespace HeadOrderApi6 {
    export type RequestParams = {};
    export type RequestQuery = {
      /** If provided search by code in discountCoupons */
      SearchCode?: string;
      /** If true, searchCode is used as StartWith instead of Contains */
      IsSearchCodeAutocomplete?: boolean;
      /**
       * Language of the requested category
       * Language version - if provided, all discountCoupons will be only in selected language.
       * Sorting and searching will be according to the specified language
       * Otherwise all language version will be provided and sorting and searching will be according to the default language (CZECH).
       */
      Language?: VinistoHelperDllEnumsLanguage;
      /** If true search only between coupons applicable for discounted items, if false search only between coupons not applicable for discounted items, if not provided search all coupons */
      IsForDiscountedItems?: boolean;
      /**
       * If provided search by Expiration. Time from.
       * @format int32
       */
      ExpirationTimeFrom?: number;
      /**
       * If provided search by Expiration. Time to.
       * @format int32
       */
      ExpirationTimeTo?: number;
      /**
       * If provided search by Creation Time from.
       * @format int32
       */
      CreationTimeFrom?: number;
      /**
       * If provided search by Creation Time to.
       * @format int32
       */
      CreationTimeTo?: number;
      /** If provided search by IsSupplierDiscount */
      IsSupplierDiscount?: boolean;
      /** If provided search by provided suppliersIds in supplierLimitation coupons, If not provided search all type coupons. */
      SearchSuppliers?: string[];
      /** If provided, sorting will be done according to this column. if not provided, default sorting is done by Id */
      SortingColumn?: VinistoHelperDllEnumsDiscountCouponSortableColumns;
      /** True in case that sorting shall be done in descending order */
      IsSortingDescending?: boolean;
      /**
       * Number of records to be skipped. If not provided default value is 0
       * @format int32
       */
      Offset?: number;
      /** If true search only between active coupons, if false search only between not active coupons, if not provided search all coupons */
      IsActive?: boolean;
      /** If true search only between reusable coupons, if false search only between not reusable coupons, if not provided search all coupons */
      IsReusable?: boolean;
      /** If true search only between combinable coupons, if false search only between not combinable coupons, if not provided search all coupons */
      IsCombinable?: boolean;
      /**
       * If true, search only between unexpired reusable coupons and unexpired unused coupons (for non-reusable coupons).
       * If false, search only between coupons that can no longer be used through expiration or that have already been used (for non-reusable coupons).
       * If not provided search all coupons.
       */
      CanBeApplied?: boolean;
      /** If provided search by type in discount coupon */
      SearchDiscountCouponType?: VinistoHelperDllEnumsDiscountCouponDiscountCouponType[];
      /** If provided search by limitation type in discount coupon (more than one can be selected), If not provided search all type coupons. */
      SearchLimitationType?: VinistoHelperDllEnumsDiscountCouponLimitationType[];
      /** If provided search by IsVisibleOnProductDetail */
      IsVisibleOnProductDetail?: boolean;
      /**
       * Number of records to be retrieved. if not provided default value is 10.
       * Limited by Maximum number of records in EnvironmentConstants
       * @format int32
       */
      Limit?: number;
      /** Prices in response are converted to this currency. Default is CZK; */
      Currency?: VinistoHelperDllEnumsCurrency;
      /** Country of sale. All coupons which are returned must be allowed to sale in country. If not provided, then all coupons are allowed. */
      CountryOfSale?: VinistoHelperDllEnumsCountryCode;
      IsCache?: boolean;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoOrderDllModelsApiReturnDataDiscountCouponsReturn;
  }

  /**
   * No description
   * @tags DiscountCoupons
   * @name DiscountCouponsDelete2
   * @summary Remove discount coupons by list discount coupons id
   * @request DELETE:/order-api/discount-coupons
   * @originalName discountCouponsDelete
   * @duplicate
   * @secure
   */
  export namespace DiscountCouponsDelete2 {
    export type RequestParams = {};
    export type RequestQuery = {
      /** ID of discount coupons to delete */
      DiscountCouponIds: string[];
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
 * @tags DiscountCoupons
 * @name DiscountCouponsCreateDiscountCouponCreate
 * @summary Creates one new discount coupon object from provided parameters.
For all prices in coupon definition please use NoVat. Vat for coupon id calculated depending on the basket items.
So please use all Prices as it would be with Vat and set zero vat.
 * @request POST:/order-api/discount-coupons/CreateDiscountCoupon
 * @secure
*/
  export namespace DiscountCouponsCreateDiscountCouponCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = DiscountCouponsCreateDiscountCouponCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoOrderDllModelsApiReturnDataDiscountCouponReturn;
  }

  /**
 * No description
 * @tags DiscountCoupons
 * @name DiscountCouponsSuppliersCreate
 * @summary Creates one new discount coupon object for respective supplier
For all prices in coupon definition please use NoVat. Vat for coupon id calculated depending on the basket items.
So please use all Prices as it would be with Vat and set zero vat.
 * @request POST:/order-api/discount-coupons/suppliers/{supplierId}
 * @secure
*/
  export namespace DiscountCouponsSuppliersCreate {
    export type RequestParams = {
      supplierId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = DiscountCouponsSuppliersCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoOrderDllModelsApiReturnDataDiscountCouponReturn;
  }

  /**
   * No description
   * @tags DiscountCoupons
   * @name DiscountCouponsCheckCouponValidityCreate
   * @summary Check if discount coupon defined by code is valid
   * @request POST:/order-api/discount-coupons/CheckCouponValidity
   * @secure
   */
  export namespace DiscountCouponsCheckCouponValidityCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = DiscountCouponsCheckCouponValidityCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoOrderDllModelsApiReturnDataDiscountCouponValidityReturn;
  }

  /**
 * No description
 * @tags DiscountCoupons
 * @name DiscountCouponsCreateDiscountCouponsCreate
 * @summary Creates -n new discount coupon objects from provided parameters.
For all prices in coupon definition please use NoVat. Vat for coupon id calculated depending on the basket items.
So please use all Prices as it would be with Vat and set zero vat.
 * @request POST:/order-api/discount-coupons/CreateDiscountCoupons
 * @secure
*/
  export namespace DiscountCouponsCreateDiscountCouponsCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = DiscountCouponsCreateDiscountCouponsCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoOrderDllModelsApiReturnDataDiscountCouponsReturn;
  }

  /**
   * No description
   * @tags DiscountCoupons
   * @name DiscountCouponsDeactivateDiscountCouponsUpdate
   * @summary Deactivate provided coupons
   * @request PUT:/order-api/discount-coupons/DeactivateDiscountCoupons
   * @secure
   */
  export namespace DiscountCouponsDeactivateDiscountCouponsUpdate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody =
      DiscountCouponsDeactivateDiscountCouponsUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoOrderDllModelsApiReturnDataDiscountCouponsReturn;
  }

  /**
   * No description
   * @tags DiscountCoupons
   * @name DiscountCouponsGetUserAvailableDiscountCouponsList
   * @summary Gets user available (vinisto club) discount coupons by provided limit and offset sorted by expiration date.
   * @request GET:/order-api/discount-coupons/get-user-available-discount-coupons
   * @secure
   */
  export namespace DiscountCouponsGetUserAvailableDiscountCouponsList {
    export type RequestParams = {};
    export type RequestQuery = {
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
      VinistoOrderDllModelsApiReturnDataDiscountCouponsReturn;
  }

  /**
   * No description
   * @tags DiscountCoupons
   * @name DiscountCouponsGetDiscountCouponsForBasketValidationList
   * @summary Get discount coupons for basket validation.
   * @request GET:/order-api/discount-coupons/get-discount-coupons-for-basket-validation
   * @secure
   */
  export namespace DiscountCouponsGetDiscountCouponsForBasketValidationList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** Discount coupons codes. */
      discountCouponsCodes?: string[];
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoOrderDllModelsApiReturnDataDiscountCouponsReturn;
  }

  /**
   * No description
   * @tags Order
   * @name OrdersDetail
   * @summary Get desired order defined by ID
   * @request GET:/order-api/orders/{orderId}
   * @secure
   */
  export namespace OrdersDetail {
    export type RequestParams = {
      /** Id of the order */
      orderId: string;
    };
    export type RequestQuery = {
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
      IsCache?: boolean;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoOrderDllModelsApiReturnDataOrderReturn;
  }

  /**
   * No description
   * @tags Order
   * @name HeadOrderApi7
   * @summary Get desired order defined by ID
   * @request HEAD:/order-api/orders/{orderId}
   * @originalName headOrderApi
   * @duplicate
   * @secure
   */
  export namespace HeadOrderApi7 {
    export type RequestParams = {
      /** Id of the order */
      orderId: string;
    };
    export type RequestQuery = {
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
      IsCache?: boolean;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoOrderDllModelsApiReturnDataOrderReturn;
  }

  /**
   * No description
   * @tags Order
   * @name OrdersAnonymousDetail
   * @summary Get desired order defined by ID and anonymousUserId
   * @request GET:/order-api/orders/{orderId}/anonymous/{anonymousUserId}
   * @secure
   */
  export namespace OrdersAnonymousDetail {
    export type RequestParams = {
      /** Id of the order */
      orderId: string;
      /** Anonymous user id. Is used for filter combination with order id when selecting order. */
      anonymousUserId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoOrderDllModelsApiReturnDataOrderReturn;
  }

  /**
   * No description
   * @tags Order
   * @name OrdersGetQrCodeImgPngList
   * @summary Get QR code
   * @request GET:/order-api/orders/{orderId}/GetQrCode/img.png
   * @secure
   */
  export namespace OrdersGetQrCodeImgPngList {
    export type RequestParams = {
      /** id of the order */
      orderId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags Order
   * @name OrdersOrderChangeStateUpdate
   * @summary Change state of the required order
   * @request PUT:/order-api/orders/{orderId}/OrderChangeState
   * @secure
   */
  export namespace OrdersOrderChangeStateUpdate {
    export type RequestParams = {
      /** Id of the order */
      orderId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = OrdersOrderChangeStateUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoOrderDllModelsApiReturnDataOrderReturn;
  }

  /**
   * No description
   * @tags Order
   * @name OrdersAddDiscountCouponUpdate
   * @summary Add discount coupon to order
   * @request PUT:/order-api/orders/{orderId}/AddDiscountCoupon
   * @secure
   */
  export namespace OrdersAddDiscountCouponUpdate {
    export type RequestParams = {
      /** Id of the order */
      orderId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = OrdersAddDiscountCouponUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoOrderDllModelsApiReturnDataOrderReturn;
  }

  /**
   * No description
   * @tags Order
   * @name OrdersRemoveDiscountCouponUpdate
   * @summary Remove discount coupon from order
   * @request PUT:/order-api/orders/{orderId}/RemoveDiscountCoupon
   * @secure
   */
  export namespace OrdersRemoveDiscountCouponUpdate {
    export type RequestParams = {
      /** Id of the order */
      orderId: string;
      /** Id of discount coupon to be removed */
      discountCouponId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = OrdersRemoveDiscountCouponUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoOrderDllModelsApiReturnDataOrderReturn;
  }

  /**
   * No description
   * @tags Order
   * @name OrdersSendOrderToFlexiUpdate
   * @summary Send order to flexi-bee queue so an invoice is generated.
   * @request PUT:/order-api/orders/{orderId}/SendOrderToFlexi
   * @secure
   */
  export namespace OrdersSendOrderToFlexiUpdate {
    export type RequestParams = {
      orderId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = OrdersSendOrderToFlexiUpdatePayload;
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
   * @tags Order
   * @name OrdersSendOrderToGenerateProformaInvoiceUpdate
   * @summary Send order to generate proforma invoice.
   * @request PUT:/order-api/orders/{orderId}/SendOrderToGenerateProformaInvoice
   * @secure
   */
  export namespace OrdersSendOrderToGenerateProformaInvoiceUpdate {
    export type RequestParams = {
      orderId: string;
    };
    export type RequestQuery = {};
    export type RequestBody =
      OrdersSendOrderToGenerateProformaInvoiceUpdatePayload;
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
   * @tags Order
   * @name OrdersSendOrderToGenerateVatInvoiceUpdate
   * @summary Send order to generate vat invoice.
   * @request PUT:/order-api/orders/{orderId}/SendOrderToGenerateVatInvoice
   * @secure
   */
  export namespace OrdersSendOrderToGenerateVatInvoiceUpdate {
    export type RequestParams = {
      orderId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = OrdersSendOrderToGenerateVatInvoiceUpdatePayload;
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
   * @tags Order
   * @name OrdersCanStornoOrderList
   * @summary Check user storno order availability
   * @request GET:/order-api/orders/{orderId}/CanStornoOrder
   * @secure
   */
  export namespace OrdersCanStornoOrderList {
    export type RequestParams = {
      orderId: string;
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
   * @tags Order
   * @name OrdersStornoOrderUpdate
   * @summary Storno order
   * @request PUT:/order-api/orders/{orderId}/StornoOrder
   * @secure
   */
  export namespace OrdersStornoOrderUpdate {
    export type RequestParams = {
      orderId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = OrdersStornoOrderUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoOrderDllModelsApiReturnDataOrderReturn;
  }

  /**
   * No description
   * @tags Order
   * @name OrdersIsOrderAddressesEditableList
   * @summary Get true if order addresses is editable
   * @request GET:/order-api/orders/{orderId}/IsOrderAddressesEditable
   * @secure
   */
  export namespace OrdersIsOrderAddressesEditableList {
    export type RequestParams = {
      orderId: string;
    };
    export type RequestQuery = {
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = boolean;
  }

  /**
   * No description
   * @tags Order
   * @name OrdersEditAddressesInOrderUpdate
   * @summary Edit addresses only in order
   * @request PUT:/order-api/orders/{orderId}/EditAddressesInOrder
   * @secure
   */
  export namespace OrdersEditAddressesInOrderUpdate {
    export type RequestParams = {
      orderId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = OrdersEditAddressesInOrderUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoOrderDllModelsApiReturnDataOrderReturn;
  }

  /**
   * No description
   * @tags Order
   * @name OrdersEditInternalOrderNoteUpdate
   * @summary Edit internal note in order
   * @request PUT:/order-api/orders/{orderId}/edit-internal-order-note
   * @secure
   */
  export namespace OrdersEditInternalOrderNoteUpdate {
    export type RequestParams = {
      orderId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = OrdersEditInternalOrderNoteUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoOrderDllModelsApiReturnDataOrderReturn;
  }

  /**
   * No description
   * @tags Order
   * @name OrdersSendOrderToWmsUpdate
   * @summary Send order repeatedly to wms
   * @request PUT:/order-api/orders/{orderId}/send-order-to-wms
   * @secure
   */
  export namespace OrdersSendOrderToWmsUpdate {
    export type RequestParams = {
      orderId: string;
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
   * @tags Order
   * @name OrdersRefundUpdate
   * @summary Refund order - only set set state REFUNDED. Money are returned manualy by support.
   * @request PUT:/order-api/orders/{orderId}/refund
   * @secure
   */
  export namespace OrdersRefundUpdate {
    export type RequestParams = {
      orderId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = OrdersRefundUpdatePayload;
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
   * @tags Order
   * @name OrdersInvoiceSubscriptionList
   * @summary Get data for order subscription invoice.
   * @request GET:/order-api/orders/{orderId}/invoice-subscription
   * @secure
   */
  export namespace OrdersInvoiceSubscriptionList {
    export type RequestParams = {
      orderId: string;
    };
    export type RequestQuery = {
      userId?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoOrderDllModelsApiReturnDataOrderSubscriptionInvoiceReturn;
  }

  /**
   * No description
   * @tags OrderApiCron
   * @name CronsList
   * @summary Execute cron service based on cronType property
   * @request GET:/order-api/crons
   * @secure
   */
  export namespace CronsList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
      /** Contains list of possible crons in order api */
      cronType?: VinistoHelperDllEnumsCronOrderApiCronType;
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
   * @tags OrderApiCron
   * @name CronsGenerateDebugInvoicesList
   * @summary Execute cron service based on cronType property
   * @request GET:/order-api/crons/GenerateDebugInvoices
   * @secure
   */
  export namespace CronsGenerateDebugInvoicesList {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * If provided search by time. Time from.
       * @format int32
       */
      TimeFrom?: number;
      /**
       * If provided search by time. Time to.
       * @format int32
       */
      TimeTo?: number;
      /** If provided search by supplier Id */
      SupplierId?: string;
      /** Path where the invoices will be generated */
      Path?: string;
      /**
       * Optional lookback period in months for 'on the way' items. If null, defaults to 12 months.
       * @format int32
       */
      OnTheWayLookbackMonths?: number;
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
   * @tags OrderApplicationLog
   * @name ApplicationLogDetail
   * @summary Get application logs for order
   * @request GET:/order-api/application-log/{orderId}
   * @secure
   */
  export namespace ApplicationLogDetail {
    export type RequestParams = {
      /** order id */
      orderId: string;
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
   * @tags OrderApplicationLog
   * @name HeadOrderApi8
   * @summary Get application logs for order
   * @request HEAD:/order-api/application-log/{orderId}
   * @originalName headOrderApi
   * @duplicate
   * @secure
   */
  export namespace HeadOrderApi8 {
    export type RequestParams = {
      /** order id */
      orderId: string;
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
   * @tags OrderInternalDocuments
   * @name OrderDocumentsCreate
   * @summary Upload internal documents to order
   * @request POST:/order-api/order/{orderId}/documents
   * @secure
   */
  export namespace OrderDocumentsCreate {
    export type RequestParams = {
      orderId: string;
    };
    export type RequestQuery = {
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
    };
    export type RequestBody = OrderDocumentsCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoOrderDllModelsApiReturnDataOrderInternalDocumentsReturn;
  }

  /**
   * No description
   * @tags OrderInternalDocuments
   * @name OrderDocumentsList
   * @summary Get internal documents for order
   * @request GET:/order-api/order/{orderId}/documents
   * @secure
   */
  export namespace OrderDocumentsList {
    export type RequestParams = {
      orderId: string;
    };
    export type RequestQuery = {
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoOrderDllModelsApiReturnDataOrderInternalDocumentsReturn;
  }

  /**
   * No description
   * @tags OrderInternalDocuments
   * @name OrderDocumentsDetail
   * @summary Get internal document by id from order
   * @request GET:/order-api/order/{orderId}/documents/{documentId}
   * @secure
   */
  export namespace OrderDocumentsDetail {
    export type RequestParams = {
      orderId: string;
      documentId: string;
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
   * @tags OrderInternalDocuments
   * @name OrderDocumentsDelete
   * @summary Delete internal document from order
   * @request DELETE:/order-api/order/{orderId}/documents/{documentId}
   * @secure
   */
  export namespace OrderDocumentsDelete {
    export type RequestParams = {
      orderId: string;
      documentId: string;
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
   * @tags OrderInvoices
   * @name InvoicesOrderGetInvoicesList
   * @summary Get order invoices.
   * @request GET:/order-api/invoices/order/{orderId}/get-invoices
   * @secure
   */
  export namespace InvoicesOrderGetInvoicesList {
    export type RequestParams = {
      /** Id of the order */
      orderId: string;
    };
    export type RequestQuery = {
      /** Hash of the registered user */
      UserLoginHash?: string;
      AnonymousUserId?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoOrderDllModelsApiReturnDataInvoicesReturn;
  }

  /**
   * No description
   * @tags OrderInvoices
   * @name InvoicesOrderGetPdfDocumentList
   * @summary Get pdf document for order invoice.
   * @request GET:/order-api/invoices/order/{orderId}/get-pdf-document
   * @secure
   */
  export namespace InvoicesOrderGetPdfDocumentList {
    export type RequestParams = {
      /** Id of the order */
      orderId: string;
    };
    export type RequestQuery = {
      /** Hash of the registered user */
      UserLoginHash?: string;
      /** Id of the anonymous user */
      AnonymousUserId?: string;
      /** Document url */
      DocumentUrl: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoOrderDllModelsApiReturnDataPdfReturn;
  }

  /**
 * No description
 * @tags Orders
 * @name OrdersList
 * @summary Get all orders for provided user email.
Further more it can be filtered by order state
 * @request GET:/order-api/orders
 * @secure
*/
  export namespace OrdersList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** If provided search by user email in orders */
      UserEmail?: string;
      /** If provided search by users ids in orders */
      UsersIds?: string[];
      /** If provided search by order Id */
      OrderId?: string;
      /** If provided search all orders by provided order number */
      OrderNumber?: string;
      /** If provided, searches by state in order states history */
      OrderState?: VinistoHelperDllEnumsOrderOrderState;
      /** If provided, searches by states in order states history */
      OrderStates?: VinistoHelperDllEnumsOrderOrderState[];
      /**
       * If provided search all orders from provided Time (timestamp in seconds from 1.1.1970)
       * @format int64
       */
      TimeFrom?: number;
      /**
       * If provided search all orders to provided Time (timestamp in seconds from 1.1.1970)
       * @format int64
       */
      TimeTo?: number;
      /**
       * If provided search all orders from provided price (total price of the order including vat)
       * @format double
       */
      PriceFrom?: number;
      /**
       * If provided search all orders to provided price (total price of the order including vat)
       * @format double
       */
      PriceTo?: number;
      /** If provided search all orders to provided trackingId */
      TrackingId?: string;
      /** If provided search all orders to provided delivery type */
      DeliveryType?: VinistoHelperDllEnumsOrderDeliveryType;
      /** If provided search all orders to provided payment type */
      PaymentType?: VinistoHelperDllEnumsOrderPaymentType;
      /** If provided, sorting will be done according to this column. if not provided, default sorting is done by Id */
      SortingColumn?: VinistoHelperDllEnumsOrderSortableColumns;
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
      /** If provided, it searches according to current status in orders */
      CurrentState?: VinistoHelperDllEnumsOrderOrderState;
      /**
       * Language for search by delivery name,
       * if provided, searching will be according to the specified language,
       * if not provided, searching will be according to the default language (CZECH).
       */
      Language?: VinistoHelperDllEnumsLanguage;
      /** If provided, it searches according to provided delivery name */
      DeliveryName?: string;
      /** UTM source */
      "Utm.Source"?: string;
      /** UTM medium */
      "Utm.Medium"?: string;
      /** UTM campaign */
      "Utm.Campaign"?: string;
      /** Gad - Google Ads Help */
      "Utm.Gad"?: string;
      /** Gclid - Google Click Identifier */
      "Utm.GclId"?: string;
      /** If provided, it searches according to provided delivery address phone */
      DeliveryPhone?: string;
      /** If provided, it searches according to provided billing id */
      BillingId?: string;
      /** If provided, it searches according to provided country of sale */
      CountryOfSale?: VinistoHelperDllEnumsCountryCode;
      /** @format int32 */
      PlatformId?: number;
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoOrderDllModelsApiReturnDataOrdersReturn;
  }

  /**
 * No description
 * @tags Orders
 * @name OrdersUpdate
 * @summary For provided orders changes provided state.
Operation is provided only for orders without provided state.
 * @request PUT:/order-api/orders
 * @secure
*/
  export namespace OrdersUpdate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OrdersUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoOrderDllModelsApiReturnDataOrdersReturn;
  }

  /**
 * No description
 * @tags Orders
 * @name OrdersCreate
 * @summary Creates order for all user.
Mandatory fields for all users are:
Currency, Language, BasketId, DeliveryId, PaymentId.
Mandatory fields only for logged in users are:
UserLoginHash and available ways to specify addresses in Order:
1. Only billingAddressId
2. BillingAddressId and DeliveryAddressId
3. BillingAddress and DeliveryAddressId.
Mandatory fields only for unregistered users are:
AnonymousUserId, UserEmail and BillingAddress.
 * @request POST:/order-api/orders
 * @secure
*/
  export namespace OrdersCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OrdersCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoOrderDllModelsApiReturnDataOrderReturn;
  }

  /**
   * No description
   * @tags Orders
   * @name OrdersBillingOrdersList
   * @summary Get all orders for provided billing id.
   * @request GET:/order-api/orders/billing-orders
   * @secure
   */
  export namespace OrdersBillingOrdersList {
    export type RequestParams = {};
    export type RequestQuery = {
      billingId?: string;
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoOrderDllModelsApiReturnDataOrdersReturn;
  }

  /**
   * No description
   * @tags Orders
   * @name OrdersAcceleratedSubscriptionCreate
   * @summary Creates accelerated order with subscription.
   * @request POST:/order-api/orders/accelerated-subscription
   * @secure
   */
  export namespace OrdersAcceleratedSubscriptionCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = OrdersAcceleratedSubscriptionCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoOrderDllModelsApiReturnDataOrderReturn;
  }

  /**
   * No description
   * @tags Orders
   * @name OrdersOrdersWithNonPaidInvoiceOverdueList
   * @summary Get order base data with non paid invoice.
   * @request GET:/order-api/orders/orders-with-non-paid-invoice-overdue
   * @secure
   */
  export namespace OrdersOrdersWithNonPaidInvoiceOverdueList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
      /**
       * @format int32
       * @default 10
       */
      Limit?: number;
      /**
       * @format int32
       * @default 0
       */
      Offset?: number;
      /** @default false */
      IsSortingDescending?: boolean;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoOrderDllModelsApiReturnDataOrdersWithInvoiceReturn;
  }

  /**
   * No description
   * @tags OrdersStatistics
   * @name StatisticsList
   * @summary Generate xls file with orders statistics
   * @request GET:/order-api/statistics
   * @secure
   */
  export namespace StatisticsList {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * Search all orders from provided Time (timestamp in seconds from 1.1.1970)
       * @format int64
       */
      TimeFrom?: number;
      /**
       * Search all orders to provided Time (timestamp in seconds from 1.1.1970)
       * @format int64
       */
      TimeTo?: number;
      /** Language to get texts */
      Language?: VinistoHelperDllEnumsLanguage;
      /** List of states */
      OrderStates: VinistoHelperDllEnumsOrderOrderState[];
      /** Order statistic export type */
      ExportType?: VinistoHelperDllEnumsOrderOrderStatisticExportType;
      /** If not provided, then are returned all orders in XML. If provided, then are returned orders only for country of sale. */
      CountryOfSale?: VinistoHelperDllEnumsCountryCode;
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags OrdersStatistics
   * @name StatisticsSubscriberTotalDiscountsList
   * @summary Compute total subscriber discounts form orders.
   * @request GET:/order-api/statistics/subscriber-total-discounts
   * @secure
   */
  export namespace StatisticsSubscriberTotalDiscountsList {
    export type RequestParams = {};
    export type RequestQuery = {
      SubscriptionId: string;
      /** Currency */
      Currency?: VinistoHelperDllEnumsCurrency;
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoOrderDllModelsApiReturnDataOrderSubscriberDiscountsReturn;
  }

  /**
   * No description
   * @tags OrdersXml
   * @name OrdersXmlGetXmlOrdersList
   * @summary Generate XML file with orders according provided parameters
   * @request GET:/order-api/orders-xml/GetXmlOrders
   * @secure
   */
  export namespace OrdersXmlGetXmlOrdersList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** UserHash to authorize respective operation */
      userLoginHash?: string;
      /**
       * Select only orders created from this dateTime
       * @format int64
       */
      timeFrom?: number;
      /**
       * Select only orders created to this dateTime
       * @format int64
       */
      timeTo?: number;
      /** If not provided, then are returned all orders in XML. If provided, then are returned orders only for country of sale. */
      countryOfSale?: VinistoHelperDllEnumsCountryCode;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags Payment
   * @name PaymentsGetPaymentList
   * @summary Get payment with values according to provided payment id.
   * @request GET:/order-api/payments/{paymentId}/GetPayment
   * @secure
   */
  export namespace PaymentsGetPaymentList {
    export type RequestParams = {
      /** Id of the payment */
      paymentId: string;
    };
    export type RequestQuery = {
      IsCache?: boolean;
      /**
       * Currency
       * @default "CZK"
       */
      currency?: VinistoHelperDllEnumsCurrency;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoOrderDllModelsApiReturnDataPaymentReturn;
  }

  /**
   * No description
   * @tags Payment
   * @name PaymentsEditPaymentUpdate
   * @summary Edit payment
   * @request PUT:/order-api/payments/{paymentId}/EditPayment
   * @secure
   */
  export namespace PaymentsEditPaymentUpdate {
    export type RequestParams = {
      /** Id of the payment */
      paymentId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = PaymentsEditPaymentUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoOrderDllModelsApiReturnDataPaymentReturn;
  }

  /**
   * No description
   * @tags Payment
   * @name PaymentsActivatePaymentUpdate
   * @summary Activate payment
   * @request PUT:/order-api/payments/{paymentId}/ActivatePayment
   * @secure
   */
  export namespace PaymentsActivatePaymentUpdate {
    export type RequestParams = {
      /** Id of the payment */
      paymentId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = PaymentsActivatePaymentUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoOrderDllModelsApiReturnDataPaymentReturn;
  }

  /**
   * No description
   * @tags Payment
   * @name PaymentsDeactivatePaymentUpdate
   * @summary Deactivate payment
   * @request PUT:/order-api/payments/{paymentId}/DeactivatePayment
   * @secure
   */
  export namespace PaymentsDeactivatePaymentUpdate {
    export type RequestParams = {
      /** Id of the payment */
      paymentId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = PaymentsDeactivatePaymentUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoOrderDllModelsApiReturnDataPaymentReturn;
  }

  /**
   * No description
   * @tags Payment
   * @name PaymentsDelete
   * @summary Remove payment
   * @request DELETE:/order-api/payments/{paymentId}
   * @secure
   */
  export namespace PaymentsDelete {
    export type RequestParams = {
      /** Id of the payment */
      paymentId: string;
    };
    export type RequestQuery = {
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoOrderDllModelsApiReturnDataPaymentReturn;
  }

  /**
   * No description
   * @tags Payment
   * @name PaymentsAddPriceForPaymentCreate
   * @summary Add price to payment
   * @request POST:/order-api/payments/{paymentId}/AddPriceForPayment
   * @secure
   */
  export namespace PaymentsAddPriceForPaymentCreate {
    export type RequestParams = {
      /** Id of the payment */
      paymentId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = PaymentsAddPriceForPaymentCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoOrderDllModelsApiReturnDataPaymentReturn;
  }

  /**
   * No description
   * @tags Payment
   * @name PaymentsPricesDelete
   * @summary Remove price from payment
   * @request DELETE:/order-api/payments/{paymentId}/prices/{priceId}
   * @secure
   */
  export namespace PaymentsPricesDelete {
    export type RequestParams = {
      /** Id of the payment */
      paymentId: string;
      /** Id of price which shall be deleted */
      priceId: string;
    };
    export type RequestQuery = {
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoOrderDllModelsApiReturnDataPaymentReturn;
  }

  /**
   * No description
   * @tags Payment
   * @name PaymentsAddCountryForPaymentCreate
   * @summary Add country to payment
   * @request POST:/order-api/payments/{paymentId}/AddCountryForPayment
   * @secure
   */
  export namespace PaymentsAddCountryForPaymentCreate {
    export type RequestParams = {
      /** Id of the payment */
      paymentId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = PaymentsAddCountryForPaymentCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoOrderDllModelsApiReturnDataPaymentReturn;
  }

  /**
   * No description
   * @tags Payment
   * @name PaymentsRemoveCountryFromPaymentDelete
   * @summary Remove country from payment
   * @request DELETE:/order-api/payments/{paymentId}/RemoveCountryFromPayment
   * @secure
   */
  export namespace PaymentsRemoveCountryFromPaymentDelete {
    export type RequestParams = {
      /** Id of the payment */
      paymentId: string;
    };
    export type RequestQuery = {
      /** Country code for allowed country */
      Country: VinistoHelperDllEnumsCountryCode;
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoOrderDllModelsApiReturnDataPaymentReturn;
  }

  /**
   * No description
   * @tags Payments
   * @name PaymentsList
   * @summary Get Payments according to provided parameters
   * @request GET:/order-api/payments
   * @secure
   */
  export namespace PaymentsList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** If provided search by name of Payment */
      SearchName?: string;
      /** Filter to get payments for allowed country */
      AllowedCountry?: VinistoHelperDllEnumsCountryCode;
      /** If provided search all payments to provided payment type */
      PaymentType?: VinistoHelperDllEnumsOrderPaymentType;
      /** If true search only between active payments, if false search only between not active payments, if not provided search all payments */
      IsActive?: boolean;
      /** If provided, sorting will be done according to this column. if not provided, default sorting is done by Order */
      SortingColumn?: VinistoHelperDllEnumsPaymentSortableColumns;
      /** True in case that sorting shall be done in descending order */
      IsSortingDescending?: boolean;
      /** Language version - if provided, all payment will be only in selected language. */
      Language?: VinistoHelperDllEnumsLanguage;
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
      /** Prices in response are converted to this currency. Default is CZK. */
      Currency?: VinistoHelperDllEnumsCurrency;
      IsCache?: boolean;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoOrderDllModelsApiReturnDataPaymentsReturn;
  }

  /**
   * No description
   * @tags Payments
   * @name HeadOrderApi9
   * @summary Get Payments according to provided parameters
   * @request HEAD:/order-api/payments
   * @originalName headOrderApi
   * @duplicate
   * @secure
   */
  export namespace HeadOrderApi9 {
    export type RequestParams = {};
    export type RequestQuery = {
      /** If provided search by name of Payment */
      SearchName?: string;
      /** Filter to get payments for allowed country */
      AllowedCountry?: VinistoHelperDllEnumsCountryCode;
      /** If provided search all payments to provided payment type */
      PaymentType?: VinistoHelperDllEnumsOrderPaymentType;
      /** If true search only between active payments, if false search only between not active payments, if not provided search all payments */
      IsActive?: boolean;
      /** If provided, sorting will be done according to this column. if not provided, default sorting is done by Order */
      SortingColumn?: VinistoHelperDllEnumsPaymentSortableColumns;
      /** True in case that sorting shall be done in descending order */
      IsSortingDescending?: boolean;
      /** Language version - if provided, all payment will be only in selected language. */
      Language?: VinistoHelperDllEnumsLanguage;
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
      /** Prices in response are converted to this currency. Default is CZK. */
      Currency?: VinistoHelperDllEnumsCurrency;
      IsCache?: boolean;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoOrderDllModelsApiReturnDataPaymentsReturn;
  }

  /**
   * No description
   * @tags Payments
   * @name PaymentsCreate
   * @summary Create new payment
   * @request POST:/order-api/payments
   * @secure
   */
  export namespace PaymentsCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PaymentsCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoOrderDllModelsApiReturnDataPaymentReturn;
  }

  /**
   * No description
   * @tags Payments
   * @name PaymentsActiatePaymentsUpdate
   * @summary Activate provided payments
   * @request PUT:/order-api/payments/ActiatePayments
   * @secure
   */
  export namespace PaymentsActiatePaymentsUpdate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PaymentsActiatePaymentsUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoOrderDllModelsApiReturnDataPaymentsReturn;
  }

  /**
   * No description
   * @tags Payments
   * @name PaymentsDeactivatePaymentsUpdate
   * @summary Deactivate provided payments
   * @request PUT:/order-api/payments/DeactivatePayments
   * @secure
   */
  export namespace PaymentsDeactivatePaymentsUpdate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PaymentsDeactivatePaymentsUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoOrderDllModelsApiReturnDataPaymentsReturn;
  }

  /**
   * No description
   * @tags Payments
   * @name PaymentsGetAutocompleteNamesList
   * @summary Get Payments according to provided parameters
   * @request GET:/order-api/payments/GetAutocompleteNames
   * @secure
   */
  export namespace PaymentsGetAutocompleteNamesList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** Name of the payment */
      Name: string;
      /** Language version - if provided, all payment will be only in selected language. */
      Language?: VinistoHelperDllEnumsLanguage;
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
      /** If provided, sorting will be done according to this column. if not provided, default sorting is done by Order */
      SortingColumn?: VinistoHelperDllEnumsPaymentSortableColumns;
      /** True in case that sorting shall be done in descending order */
      IsSortingDescending?: boolean;
      /** Prices in response are converted to this currency. Default is CZK. */
      Currency?: VinistoHelperDllEnumsCurrency;
      IsCache?: boolean;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoOrderDllModelsApiReturnDataPaymentsReturn;
  }

  /**
   * No description
   * @tags Payments
   * @name PaymentsGetAllowedPaymentsList
   * @summary Get available payments for basket according to provided parameters
   * @request GET:/order-api/payments/GetAllowedPayments
   * @secure
   */
  export namespace PaymentsGetAllowedPaymentsList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** Basket id - required */
      BasketId: string;
      /** Selected delivery as id */
      DeliveryId?: string;
      /** Language version - if provided, all paymentes will be only in selected language. */
      Language?: VinistoHelperDllEnumsLanguage;
      /** Price currency  - required */
      Currency?: VinistoHelperDllEnumsCurrency;
      /** Filter to get paymentes for allowed country */
      AllowedCountry?: VinistoHelperDllEnumsCountryCode;
      IsCache?: boolean;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoOrderDllModelsApiReturnDataPaymentsReturn;
  }

  /**
   * No description
   * @tags Payments
   * @name PaymentsGetActivePaymentsList
   * @summary Get available payments for basket according to provided parameters
   * @request GET:/order-api/payments/GetActivePayments
   * @secure
   */
  export namespace PaymentsGetActivePaymentsList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** Language version - if provided, all paymentes will be only in selected language. */
      Language?: VinistoHelperDllEnumsLanguage;
      /** Filter to get paymentes for allowed country */
      AllowedCountry?: VinistoHelperDllEnumsCountryCode;
      /** Prices in response are converted to this currency. Default is CZK. */
      Currency?: VinistoHelperDllEnumsCurrency;
      IsCache?: boolean;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VinistoOrderDllModelsApiReturnDataPaymentsReturn;
  }

  /**
   * No description
   * @tags UserBundles
   * @name UserBundlesList
   * @summary Get all bundles in all orders for user by provided parameters
   * @request GET:/order-api/user-bundles
   * @secure
   */
  export namespace UserBundlesList {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * Language of the requested user bundles.
       * Sorting will be according to the specified language.
       * Otherwise all language version will be provided and sorting will be according to the default language (CZECH).
       */
      Language?: VinistoHelperDllEnumsLanguage;
      /** If provided, sorting will be done according to this column. if not provided, default sorting is done by Id. */
      SortingColumn?: VinistoHelperDllEnumsUserBundleSortableColumns;
      /** True in case that sorting shall be done in descending order. */
      IsSortingDescending?: boolean;
      /** Specifies whether to filter based on the presence of an evaluation from a user. */
      HasEvaluationFromUser?: boolean;
      /**
       * Number of records to be retrieved. if not provided default value is 10.
       * Limited by Maximum number of records in EnvironmentConstants.
       * @format int32
       */
      Limit?: number;
      /**
       * Number of records to be skipped. If not provided default value is 0.
       * @format int32
       */
      Offset?: number;
      /** UserHash to authorize respective operation */
      UserLoginHash?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody =
      VinistoOrderDllModelsApiReturnDataUserBundlesReturn;
  }
}

export namespace SetInvoicePaymentState {
  /**
 * No description
 * @tags TestFlexibee
 * @name SetInvoicePaymentStateList
 * @summary Nastav fakturu jako zaplacenou
Vytvoř si novou objednávku a podívej se do sub-objektu Invoice. Odtud vezmi flexibee id a vlož sem.
Alternativně vezmi id faktury, kteoru vidíš v administraci z url. Např:
https://corlox.flexibee.eu/flexi/merkatos_cz_test/faktura-vydana/753/edit
Lze nastavit PAID_MANUALLY (nelze jen PAID)
 * @request GET:/SetInvoicePaymentState
 * @secure
*/
  export namespace SetInvoicePaymentStateList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** @format int32 */
      flexibeeInvoiceId?: number;
      /** Status of flexibee invoice faktura-vydana/stavUhrK */
      paymentState?: VinistoHelperDllEnumsFlexibeePaymentState;
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
}

export namespace CreateReceipt {
  /**
   * No description
   * @tags TestFlexibee
   * @name CreateReceiptList
   * @summary Založí příjemku pro daný kód zboží a množství
   * @request GET:/CreateReceipt
   * @secure
   */
  export namespace CreateReceiptList {
    export type RequestParams = {};
    export type RequestQuery = {
      code?: string;
      /** @format int32 */
      count?: number;
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
}

export namespace CreateDisbrusement {
  /**
   * No description
   * @tags TestFlexibee
   * @name CreateDisbrusementList
   * @summary Založí příjemku pro daný kód zboží a množství
   * @request GET:/CreateDisbrusement
   * @secure
   */
  export namespace CreateDisbrusementList {
    export type RequestParams = {};
    export type RequestQuery = {
      code?: string;
      /** @format int32 */
      count?: number;
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
}
