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

export enum SpecificError {
  DISCOUNT_COUPON_BELOW_ORDER_PRICE_LIMIT = "DISCOUNT_COUPON_BELOW_ORDER_PRICE_LIMIT",
  DISCOUNT_COUPON_NO_LONGER_ACTIVE = "DISCOUNT_COUPON_NO_LONGER_ACTIVE",
  DISCOUNT_COUPON_IS_USED_IN_ANOTHER_ORDER = "DISCOUNT_COUPON_IS_USED_IN_ANOTHER_ORDER",
  DISCOUNT_COUPON_IS_OUT_OF_EXPIRATION = "DISCOUNT_COUPON_IS_OUT_OF_EXPIRATION",
  DISCOUNT_COUPON_IS_SCHEDULED = "DISCOUNT_COUPON_IS_SCHEDULED",
  ITEMS_DOES_NOT_MATCH_DISCOUNT_COUPON_LIMITATION_REQUIREMENTS = "ITEMS_DOES_NOT_MATCH_DISCOUNT_COUPON_LIMITATION_REQUIREMENTS",
  DISCOUNT_COUPON_AMOUNT_VALUE_HIGHER_THEN_ALLOWD_FROM = "DISCOUNT_COUPON_AMOUNT_VALUE_HIGHER_THEN_ALLOWD_FROM",
  DISCOUNT_COUPON_PRICE_HIGHER_DISCOUNTED_PRODUCTS_PRICE = "DISCOUNT_COUPON_PRICE_HIGHER_DISCOUNTED_PRODUCTS_PRICE",
  DISCOUNT_COUPON_IS_NOT_COMBINABLE = "DISCOUNT_COUPON_IS_NOT_COMBINABLE",
  DISCOUNT_COUPON_IS_NOT_FOR_DISCOUNTED_ITEMS = "DISCOUNT_COUPON_IS_NOT_FOR_DISCOUNTED_ITEMS",
  DISCOUNT_COUPON_ID_IS_ALREADY_IN_BASKET = "DISCOUNT_COUPON_ID_IS_ALREADY_IN_BASKET",
  DISCOUNT_COUPON_NOT_APPLICABLE_IN_COUNTRY = "DISCOUNT_COUPON_NOT_APPLICABLE_IN_COUNTRY",
  DISCOUNT_COUPON_IS_FOR_REGISTERED_USERS_ONLY = "DISCOUNT_COUPON_IS_FOR_REGISTERED_USERS_ONLY",
  BUNDLE_NOT_VALID = "BUNDLE_NOT_VALID",
  NOT_SINGLE_ITEM_AVAILABLE_IN_WAREHOUSE = "NOT_SINGLE_ITEM_AVAILABLE_IN_WAREHOUSE",
  QUANTITY_WAS_SET_BY_ORDER_LIMITATION_FOR_BUNDLE_PER_ONE_ORDER = "QUANTITY_WAS_SET_BY_ORDER_LIMITATION_FOR_BUNDLE_PER_ONE_ORDER",
  BUNDLE_WAS_SET_TO_MAXIMUM_QUANTITY_AVAILABLE_IN_WAREHOUSE = "BUNDLE_WAS_SET_TO_MAXIMUM_QUANTITY_AVAILABLE_IN_WAREHOUSE",
  BUNDLE_NOT_ENABLED = "BUNDLE_NOT_ENABLED",
  BUNDLE_DELETED = "BUNDLE_DELETED",
  BUNDLE_SALE_OVER = "BUNDLE_SALE_OVER",
  BUNDLE_TEMPORARY_UNAVAILABLE = "BUNDLE_TEMPORARY_UNAVAILABLE",
  BUNDLE_NOT_ALLOWED_IN_COUNTRY = "BUNDLE_NOT_ALLOWED_IN_COUNTRY",
  BUNDLE_NOT_AVAILABLE_ON_PLATFORM = "BUNDLE_NOT_AVAILABLE_ON_PLATFORM",
  BUNDLE_IS_ONLY_FOR_LOGGED_USERS = "BUNDLE_IS_ONLY_FOR_LOGGED_USERS",
}

export enum PriceLevel {
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

export enum PriceDiscountType {
  VinistoDiscount = "VinistoDiscount",
  SupplierDiscount = "SupplierDiscount",
  VolumeDiscount = "VolumeDiscount",
  GroupDiscount = "GroupDiscount",
  SetDiscount = "SetDiscount",
}

export enum DiscountCouponType {
  AMOUNT = "AMOUNT",
  PERCENTAGE = "PERCENTAGE",
  GIFT = "GIFT",
}

export enum Currency {
  CZK = "CZK",
  EUR = "EUR",
  USD = "USD",
}

export enum CountryCode {
  CZ = "CZ",
  SK = "SK",
  DE = "DE",
  UK = "UK",
  PL = "PL",
}

export enum BasketType {
  Primary = "Primary",
  SystemDefined = "SystemDefined",
  UserDefined = "UserDefined",
}

export enum BasketPlatformType {
  B2C = "B2c",
  B2B = "B2b",
}

export enum BasketItemType {
  Bundle = "Bundle",
}

export enum BasketApprovalState {
  CONCEPT = "CONCEPT",
  WAITING_FOR_APPROVAL = "WAITING_FOR_APPROVAL",
  WAITING_FOR_DIRECTOR_APPROVAL = "WAITING_FOR_DIRECTOR_APPROVAL",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

export interface BaseBasketItem {
  platformType?: BasketPlatformType;
  itemId: string | null;
  type?: BasketItemType;
  /** @format int32 */
  quantity?: number;
  relatedOnProductItems?: RelatedProductItem[] | null;
  priceLevel?: PriceLevel;
  /** @format double */
  price?: number;
  /** @format double */
  priceWithVat?: number;
  /** @format double */
  discountPrice?: number | null;
  /** @format double */
  discountPriceWithVat?: number | null;
  discountPriceType?: PriceDiscountType;
  /** @format double */
  weight?: number;
  /** @format int32 */
  volumeDiscountVolume?: number | null;
}

export interface BasketAddon {
  addonId: string | null;
  type: string | null;
  currency?: Currency;
  itemId?: string | null;
  /** @format int32 */
  quantity?: number;
  /** @format double */
  price?: number;
  /** @format double */
  priceWithVat?: number;
  /** @format double */
  weight?: number;
}

export interface BasketApprovalFlags {
  approveCreditPayment?: boolean | null;
  isPaymentChecked?: boolean | null;
  approveAdditionalDiscount?: boolean | null;
  approveCustomer?: boolean | null;
}

export interface BasketApproveFlagsRequest {
  userLoginHash: string | null;
  approveCreditPayment?: boolean | null;
  isPaymentChecked?: boolean | null;
  approveAdditionalDiscount?: boolean | null;
  approveCustomer?: boolean | null;
  websocketId?: string | null;
}

export interface BasketCoupon {
  couponId?: string | null;
  code?: string | null;
  type?: DiscountCouponType;
  /** @format double */
  discountPrice?: number | null;
  /** @format double */
  discountPriceWithVat?: number | null;
  isCouponApplied?: boolean;
  notAppliedReason?: SpecificError;
  notForDiscountedItemsMessage?: SpecificError;
}

export interface BasketCreateRequest {
  userId?: string | null;
  userLoginHash?: string | null;
  anonymousUserId?: string | null;
  customerId?: string | null;
  name?: string | null;
  type?: BasketType;
  countryOfSale?: CountryCode;
  currency?: Currency;
}

export type BasketItem = BaseBasketItem & {
  coupons?: BundleItemCouponDto[] | null;
};

export type BasketItemB2B = BaseBasketItem & {
  /** @format double */
  additionalPercentageDiscount?: number | null;
  /** @format double */
  discountPriceAdditionalPercentageDiscount?: number | null;
  /** @format double */
  discountPriceWithVatAdditionalPercentageDiscount?: number | null;
  /** @format double */
  standardFee?: number;
  /** @format double */
  fee?: number;
  /** @format double */
  feeLoss?: number | null;
};

export interface BasketResponse {
  id: string | null;
  platformType?: BasketPlatformType;
  userId?: string | null;
  anonymousUserId?: string | null;
  customerId?: string | null;
  name?: string | null;
  type?: BasketType;
  items?: (BasketItem | BasketItemB2B)[] | null;
  addons?: BasketAddon[] | null;
  currency?: Currency;
  countryOfSale?: CountryCode;
  /** @format int64 */
  createdAt?: number;
  /** @format int64 */
  updatedAt?: number;
  /** @format double */
  totalStandardPrice?: number;
  /** @format double */
  totalStandardPriceWithVat?: number;
  /** @format double */
  totalPrice?: number;
  /** @format double */
  totalPriceWithVat?: number;
  /** @format double */
  totalDiscountedPrice?: number;
  /** @format double */
  totalDiscountedPriceWithVat?: number;
  /** @format double */
  basketPriceWithVatForDelivery?: number;
  /** @format double */
  basketPriceForDelivery?: number;
  /** @format double */
  basketPriceWithVatForDeliveryInCzk?: number;
  /** @format double */
  basketPriceForDeliveryInCzk?: number;
  /** @format double */
  minimalPriceForFreeDelivery?: number;
  /** @format double */
  totalDiscountedPriceWithGiftCoupons?: number;
  /** @format double */
  totalDiscountedPriceWithVatWithGiftCoupons?: number;
}

export type BasketResponseB2B = BasketResponse & {
  /** @format double */
  totalFee?: number | null;
  /** @format double */
  totalFeeLoss?: number | null;
  approvalState?: BasketApprovalState;
  approvalFlags?: BasketApprovalFlags;
};

export type BasketResponseB2C = BasketResponse & {
  coupons?: BasketCoupon[] | null;
};

export interface BasketsResponse {
  baskets?: (BasketResponseB2C | BasketResponseB2B)[] | null;
  /** @format int64 */
  count?: number;
}

export interface BundleItemCouponDto {
  couponId?: string | null;
  /** @format double */
  discountPrice?: number;
  /** @format double */
  discountPriceWithVat?: number;
}

export interface ChangeBasketStateRequest {
  newState?: BasketApprovalState;
}

export interface ChangeOwnerRequest {
  userId: string | null;
  websocketId: string | null;
}

export interface MergeRequest {
  websocketId?: string | null;
  destructive?: boolean;
}

export interface Operation {
  value?: any;
  path?: string | null;
  op?: string | null;
  from?: string | null;
}

export interface RelatedProductItem {
  itemId: string | null;
  /** @format int32 */
  quantity?: number;
}

export interface ValidationProblemDetails {
  errors?: Record<string, string[]>;
  type?: string | null;
  title?: string | null;
  /** @format int32 */
  status?: number | null;
  detail?: string | null;
  instance?: string | null;
  [key: string]: any;
}

export interface WebsocketRequest {
  websocketId?: string | null;
}

export type BasketPartialUpdatePayload = Operation[];

export interface BasketPartialUpdateParams {
  userLoginHash?: string;
  basketId: string;
}

export interface BasketDeleteParams {
  userId?: string;
  anonymousUserId?: string;
  basketId: string;
}

export interface BasketListParams {
  UserLoginHash: string;
  ApprovalState?: BasketApprovalState[];
  CustomerId?: string;
  /** @format int32 */
  Limit?: number;
  /** @format int32 */
  Offset?: number;
  IsSortingDescending?: boolean;
  IsCache?: boolean;
  CacheMethodKey?: string;
}

export interface BasketStateUpdateParams {
  userLoginHash?: string;
  basketId: string;
}

export namespace BasketApi {
  /**
   * No description
   * @tags Basket
   * @name BasketDetail
   * @request GET:/basket-api/Basket/{basketId}
   * @secure
   */
  export namespace BasketDetail {
    export type RequestParams = {
      basketId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = BasketResponseB2C | BasketResponseB2B;
  }

  /**
   * No description
   * @tags Basket
   * @name BasketPartialUpdate
   * @request PATCH:/basket-api/Basket/{basketId}
   * @secure
   */
  export namespace BasketPartialUpdate {
    export type RequestParams = {
      basketId: string;
    };
    export type RequestQuery = {
      userLoginHash?: string;
    };
    export type RequestBody = BasketPartialUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags Basket
   * @name BasketDelete
   * @request DELETE:/basket-api/Basket/{basketId}
   * @secure
   */
  export namespace BasketDelete {
    export type RequestParams = {
      basketId: string;
    };
    export type RequestQuery = {
      userId?: string;
      anonymousUserId?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags Basket
   * @name BasketUserDetail
   * @request GET:/basket-api/Basket/user/{userId}
   * @secure
   */
  export namespace BasketUserDetail {
    export type RequestParams = {
      userId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = (BasketResponseB2C | BasketResponseB2B)[];
  }

  /**
   * No description
   * @tags Basket
   * @name BasketList
   * @request GET:/basket-api/Basket
   * @secure
   */
  export namespace BasketList {
    export type RequestParams = {};
    export type RequestQuery = {
      UserLoginHash: string;
      ApprovalState?: BasketApprovalState[];
      CustomerId?: string;
      /** @format int32 */
      Limit?: number;
      /** @format int32 */
      Offset?: number;
      IsSortingDescending?: boolean;
      IsCache?: boolean;
      CacheMethodKey?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = BasketsResponse;
  }

  /**
   * No description
   * @tags Basket
   * @name BasketCreate
   * @request POST:/basket-api/Basket
   * @secure
   */
  export namespace BasketCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BasketCreateRequest;
    export type RequestHeaders = {};
    export type ResponseBody = string;
  }

  /**
   * No description
   * @tags Basket
   * @name BasketRefreshCreate
   * @request POST:/basket-api/Basket/{basketId}/refresh
   * @secure
   */
  export namespace BasketRefreshCreate {
    export type RequestParams = {
      basketId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = WebsocketRequest;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags Basket
   * @name BasketMergeCreate
   * @request POST:/basket-api/Basket/{sourceBasketId}/merge/{targetBasketId}
   * @secure
   */
  export namespace BasketMergeCreate {
    export type RequestParams = {
      sourceBasketId: string;
      targetBasketId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = MergeRequest;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags Basket
   * @name BasketStateUpdate
   * @request PUT:/basket-api/Basket/{basketId}/state
   * @secure
   */
  export namespace BasketStateUpdate {
    export type RequestParams = {
      basketId: string;
    };
    export type RequestQuery = {
      userLoginHash?: string;
    };
    export type RequestBody = ChangeBasketStateRequest;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags Basket
   * @name BasketChangeApprovalFlagsPartialUpdate
   * @request PATCH:/basket-api/Basket/{basketId}/change-approval-flags
   * @secure
   */
  export namespace BasketChangeApprovalFlagsPartialUpdate {
    export type RequestParams = {
      basketId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = BasketApproveFlagsRequest;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags Basket
   * @name BasketBundleRemoveDelete
   * @request DELETE:/basket-api/Basket/bundle/{bundleId}/remove
   * @secure
   */
  export namespace BasketBundleRemoveDelete {
    export type RequestParams = {
      bundleId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags Basket
   * @name BasketRemoveOldBasketsDelete
   * @request DELETE:/basket-api/Basket/remove-old-baskets
   * @secure
   */
  export namespace BasketRemoveOldBasketsDelete {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags Basket
   * @name BasketRemoveDelete
   * @request DELETE:/basket-api/Basket/{basketId}/remove
   * @secure
   */
  export namespace BasketRemoveDelete {
    export type RequestParams = {
      basketId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags Basket
   * @name BasketChangeBasketOwnerPartialUpdate
   * @request PATCH:/basket-api/Basket/{basketId}/change-basket-owner
   * @secure
   */
  export namespace BasketChangeBasketOwnerPartialUpdate {
    export type RequestParams = {
      basketId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = ChangeOwnerRequest;
    export type RequestHeaders = {};
    export type ResponseBody = BasketsResponse;
  }
}
