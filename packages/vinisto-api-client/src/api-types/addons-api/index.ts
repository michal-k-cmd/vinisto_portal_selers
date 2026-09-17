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

export enum VatRate {
  BaseVat = "BaseVat",
  FirstReducedVat = "FirstReducedVat",
  SecondReducedVat = "SecondReducedVat",
  NoVat = "NoVat",
}

export enum UxActionType {
  DisableSlovakiaCompanyId = "DisableSlovakiaCompanyId",
}

export enum SpecificationType {
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

export enum Operator {
  None = "None",
  And = "And",
  Or = "Or",
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

export enum ConditionType {
  None = "None",
  ItemCategory = "ItemCategory",
  ItemCoupon = "ItemCoupon",
  ItemQuantity = "ItemQuantity",
  ItemSpecification = "ItemSpecification",
  ItemSupplier = "ItemSupplier",
  MinOrderPrice = "MinOrderPrice",
  MinProductPrice = "MinProductPrice",
  ItemSpecificationDecimalNumber = "ItemSpecificationDecimalNumber",
  SalesDirection = "SalesDirection",
}

export enum BasketItemType {
  Bundle = "Bundle",
}

export enum AddonType {
  None = "None",
  Gift = "Gift",
  Service = "Service",
  Upsell = "Upsell",
  SubscriptionMonth = "SubscriptionMonth",
  SubscriptionYear = "SubscriptionYear",
  Ux = "Ux",
  RelatedProduct = "RelatedProduct",
}

export enum ActionType {
  None = "None",
  SetDelivery = "SetDelivery",
  SetGift = "SetGift",
  SetPrice = "SetPrice",
  SetService = "SetService",
  SetUx = "SetUx",
  SetRelatedProduct = "SetRelatedProduct",
}

export interface ActionRequest {
  price?: PriceRequest;
  isSelectedByDefault?: boolean | null;
  setDeliverActionRequest?: SetDeliverActionRequest;
  setGiftActionRequest?: SetGiftActionRequest;
  setPriceActionRequest?: SetPriceActionRequest;
  setServiceActionRequest?: SetServiceActionRequest;
  setUxActionRequest?: SetUxActionRequest;
  setRelatedProductRequest?: SetRelatedProductActionRequest;
}

export interface AddonResponse {
  id?: string | null;
  /** @format int64 */
  createdAt?: number;
  /** @format int64 */
  updatedAt?: number;
  name?: string | null;
  description?: string | null;
  type?: AddonType;
  countryOfSale?: CountryCode;
  currency?: Currency;
  /** @format int64 */
  validFrom?: number | null;
  /** @format int64 */
  validTo?: number | null;
  /** @format int32 */
  applicableLimit?: number | null;
  /** @format int32 */
  applicableLimitCounter?: number;
  isVisibleOnDetail?: boolean;
  isActive?: boolean;
  conditions?:
    | (
        | ItemCategoryConditionResponse
        | ItemCouponConditionResponse
        | ItemQuantityConditionResponse
        | ItemSpecificationConditionResponse
        | ItemSupplierConditionResponse
        | MinOrderPriceConditionResponse
        | MinProductPriceConditionResponse
      )[]
    | null;
  actions?:
    | (
        | SetDeliveryActionResponse
        | SetGiftActionResponse
        | SetPriceActionResponse
        | SetServiceActionResponse
        | SetRelatedProductActionResponse
      )[]
    | null;
  /** @format double */
  weight?: number;
  /** @format double */
  leftToSpent?: number | null;
  /** @format int32 */
  availableOnPlatform?: number;
}

export interface AddonsResponse {
  addons?: AddonResponse[] | null;
  /** @format int32 */
  totalCount?: number;
}

export interface AddonsValidationResponse {
  addonsToAdd?: AddonResponse[] | null;
  possibleAddons?: AddonResponse[] | null;
}

export interface BaseActionResponse {
  price?: PriceResponse;
  actionType?: ActionType;
  isSelectedByDefault?: boolean | null;
}

export interface BaseConditionResponse {
  conditionType?: ConditionType;
  operator?: Operator;
}

export interface BaseSpecificationResponse {
  specificationDefinitionId?: string | null;
  specificationType?: SpecificationType;
}

export interface BasketItem {
  itemId: string | null;
  /** @format int32 */
  quantity: number;
  type: BasketItemType;
}

export interface CheckBoxSpecificationRequest {
  values?: boolean[] | null;
}

export type CheckBoxSpecificationResponse = BaseSpecificationResponse & {
  allowedValues?: boolean[] | null;
};

export interface ComboBoxSpecificationRequest {
  values?: string[] | null;
}

export type ComboBoxSpecificationResponse = BaseSpecificationResponse & object;

export interface ConditionRequest {
  operator: Operator;
  itemCategoryConditionRequest?: ItemCategoryConditionRequest;
  itemCouponConditionRequest?: ItemCouponConditionRequest;
  itemQuantityConditionRequest?: ItemQuantityConditionRequest;
  itemSpecificationConditionRequest?: ItemSpecificationConditionRequest;
  itemSpecificationDecimalNumberConditionRequest?: ItemSpecificationDecimalNumberConditionRequest;
  itemSupplierConditionRequest?: ItemSupplierConditionRequest;
  minOrderPriceConditionRequest?: MinOrderPriceConditionRequest;
  minProductPriceConditionRequest?: MinProductPriceConditionRequest;
  salesDirectionConditionRequest?: SalesDirectionConditionRequest;
}

export interface CreateAddonRequest {
  name?: string | null;
  description?: string | null;
  type?: AddonType;
  countryOfSale?: CountryCode;
  currency?: Currency;
  /** @format int64 */
  validFrom?: number | null;
  /** @format int64 */
  validTo?: number | null;
  /** @format int32 */
  applicableLimit?: number | null;
  /** @format int32 */
  applicableLimitCounter?: number;
  isVisibleOnDetail?: boolean;
  isActive?: boolean;
  conditions?: ConditionRequest[] | null;
  actions?: ActionRequest[] | null;
  /** @format int32 */
  availableOnPlatform?: number;
}

export interface DecimalNumberSpecificationRequest {
  isImperial?: boolean;
  values?: number[] | null;
}

export type DecimalNumberSpecificationResponse = BaseSpecificationResponse & {
  isImperial?: boolean;
  allowedValues?: number[] | null;
};

export interface ItemCategoryConditionRequest {
  itemCategoryId?: string | null;
}

export type ItemCategoryConditionResponse = BaseConditionResponse & {
  itemCategoryId?: string | null;
};

export interface ItemCouponConditionRequest {
  itemCouponId?: string | null;
}

export type ItemCouponConditionResponse = BaseConditionResponse & {
  itemCouponId?: string | null;
};

export interface ItemQuantityConditionRequest {
  itemId?: string | null;
  /** @format int32 */
  minItemQuantity?: number;
}

export type ItemQuantityConditionResponse = BaseConditionResponse & {
  itemId?: string | null;
  /** @format int32 */
  minItemQuantity?: number;
};

export interface ItemSpecificationConditionRequest {
  specificationId: string | null;
  checkBoxSpecificationRequest?: CheckBoxSpecificationRequest;
  comboBoxSpecificationRequest?: ComboBoxSpecificationRequest;
  decimalNumberSpecificationRequest?: DecimalNumberSpecificationRequest;
  multiComboBoxSpecificationRequest?: MultiComboBoxSpecificationRequest;
  numberSpecificationRequest?: NumberSpecificationRequest;
  textSpecificationRequest?: TextSpecificationRequest;
}

export type ItemSpecificationConditionResponse = BaseConditionResponse & {
  specification?:
    | CheckBoxSpecificationResponse
    | ComboBoxSpecificationResponse
    | DecimalNumberSpecificationResponse
    | MultiComboBoxSpecificationResponse
    | NumberSpecificationResponse
    | TextSpecificationResponse
    | null;
};

export interface ItemSpecificationDecimalNumberConditionRequest {
  itemSpecificationId?: string | null;
  /** @format double */
  minValue?: number;
  /** @format double */
  maxValue?: number;
}

export interface ItemSupplierConditionRequest {
  itemSupplierId?: string | null;
}

export type ItemSupplierConditionResponse = BaseConditionResponse & {
  itemSupplierId?: string | null;
};

export interface MinOrderPriceConditionRequest {
  /** @format double */
  minOrderPrice?: number;
}

export type MinOrderPriceConditionResponse = BaseConditionResponse & {
  /** @format double */
  minOrderPrice?: number;
};

export interface MinProductPriceConditionRequest {
  /** @format double */
  priceWithVat?: number;
  itemId?: string | null;
}

export type MinProductPriceConditionResponse = BaseConditionResponse & {
  /** @format double */
  priceWithVat?: number;
  itemId?: string | null;
};

export interface MultiComboBoxSpecificationRequest {
  values?: string[] | null;
}

export type MultiComboBoxSpecificationResponse = BaseSpecificationResponse &
  object;

export interface NumberSpecificationRequest {
  isImperial?: boolean;
  values?: number[] | null;
}

export type NumberSpecificationResponse = BaseSpecificationResponse & {
  isImperial?: boolean;
  allowedValues?: number[] | null;
};

export interface Operation {
  value?: any;
  path?: string | null;
  op?: string | null;
  from?: string | null;
}

export interface PriceRequest {
  vat?: VatRate;
  /** @format double */
  value?: number;
}

export interface PriceResponse {
  vat?: VatRate;
  /** @format double */
  value?: number;
  /** @format double */
  valueWithVat?: number;
}

export interface SalesDirectionConditionRequest {
  originCountry?: CountryCode;
  destinationCountry?: CountryCode;
}

export interface SetDeliverActionRequest {
  itemId?: string | null;
  /** @format int32 */
  quantity?: number;
}

export type SetDeliveryActionResponse = BaseActionResponse & {
  itemId?: string | null;
  /** @format int32 */
  quantity?: number;
};

export interface SetGiftActionRequest {
  itemId?: string | null;
  /** @format int32 */
  quantity?: number;
}

export type SetGiftActionResponse = BaseActionResponse & {
  itemId?: string | null;
  /** @format int32 */
  quantity?: number;
};

export type SetPriceActionRequest = object;

export type SetPriceActionResponse = BaseActionResponse & object;

export interface SetRelatedProductActionRequest {
  itemId?: string | null;
  /** @format int32 */
  quantity?: number;
}

export type SetRelatedProductActionResponse = BaseActionResponse & {
  itemId?: string | null;
  /** @format int32 */
  quantity?: number;
  relatedProductsIds?: string[] | null;
};

export interface SetServiceActionRequest {
  itemId?: string | null;
  /** @format int32 */
  quantity?: number;
}

export type SetServiceActionResponse = BaseActionResponse & {
  itemId?: string | null;
  /** @format int32 */
  quantity?: number;
};

export interface SetUxActionRequest {
  uxAction?: UxActionType;
}

export interface TextSpecificationRequest {
  values?: string[] | null;
}

export type TextSpecificationResponse = BaseSpecificationResponse & object;

export interface UpdateAddonRequest {
  name?: string | null;
  description?: string | null;
  type?: AddonType;
  countryOfSale?: CountryCode;
  currency?: Currency;
  /** @format int64 */
  validFrom?: number | null;
  /** @format int64 */
  validTo?: number | null;
  /** @format int32 */
  applicableLimit?: number | null;
  /** @format int32 */
  applicableLimitCounter?: number;
  isVisibleOnDetail?: boolean;
  isActive?: boolean;
  conditions?: ConditionRequest[] | null;
  actions?: ActionRequest[] | null;
  /** @format int32 */
  availableOnPlatform?: number;
}

export interface ValidateAddonsApplicableLimitItem {
  addonId: string | null;
  /** @format int32 */
  quantity: number;
}

export interface ValidateAddonsApplicableLimitRequest {
  addons: ValidateAddonsApplicableLimitItem[] | null;
}

export interface ValidateAddonsRequest {
  items: BasketItem[] | null;
  appliedCouponsIds: string[] | null;
  countryOfSale: CountryCode;
  currency: Currency;
  /** @format double */
  orderPrice: number;
  /** @format double */
  discountPriceWithVat?: number | null;
  requestedAddonsQuantities?: Record<string, number>;
  /** @format int32 */
  availableOnPlatform?: number;
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

export type AddonsPartialUpdatePayload = Operation[];

export interface AddonsListParams {
  Ids?: string[];
  Name?: string;
  Description?: string;
  Types?: AddonType[];
  CountryOfSale?: CountryCode;
  Currency?: Currency;
  /** @format int64 */
  ValidFrom?: number;
  /** @format int64 */
  ValidTo?: number;
  /** @format int32 */
  ApplicableLimit?: number;
  /** @format int32 */
  ApplicableLimitCounter?: number;
  IsVisibleOnDetail?: boolean;
  IsActive?: boolean;
  /** @format int32 */
  AvailableOnPlatform?: number;
  SortBy?: string;
  IsSortingDescending?: boolean;
  /** @format int32 */
  Limit?: number;
  /** @format int32 */
  Offset?: number;
  IsCache?: boolean;
  CacheMethodKey?: string;
}

export interface AddonsItemDetailParams {
  addonType?: AddonType;
  itemId: string;
}

export namespace AddonsApi {
  /**
   * No description
   * @tags Addons
   * @name AddonsDetail
   * @request GET:/addons-api/Addons/{addonId}
   * @secure
   */
  export namespace AddonsDetail {
    export type RequestParams = {
      addonId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = AddonResponse;
  }

  /**
   * No description
   * @tags Addons
   * @name AddonsPartialUpdate
   * @request PATCH:/addons-api/Addons/{addonId}
   * @secure
   */
  export namespace AddonsPartialUpdate {
    export type RequestParams = {
      addonId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = AddonsPartialUpdatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = AddonResponse;
  }

  /**
   * No description
   * @tags Addons
   * @name AddonsUpdate
   * @request PUT:/addons-api/Addons/{addonId}
   * @secure
   */
  export namespace AddonsUpdate {
    export type RequestParams = {
      addonId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateAddonRequest;
    export type RequestHeaders = {};
    export type ResponseBody = AddonResponse;
  }

  /**
   * No description
   * @tags Addons
   * @name AddonsDelete
   * @request DELETE:/addons-api/Addons/{addonId}
   * @secure
   */
  export namespace AddonsDelete {
    export type RequestParams = {
      addonId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags Addons
   * @name AddonsList
   * @request GET:/addons-api/Addons
   * @secure
   */
  export namespace AddonsList {
    export type RequestParams = {};
    export type RequestQuery = {
      Ids?: string[];
      Name?: string;
      Description?: string;
      Types?: AddonType[];
      CountryOfSale?: CountryCode;
      Currency?: Currency;
      /** @format int64 */
      ValidFrom?: number;
      /** @format int64 */
      ValidTo?: number;
      /** @format int32 */
      ApplicableLimit?: number;
      /** @format int32 */
      ApplicableLimitCounter?: number;
      IsVisibleOnDetail?: boolean;
      IsActive?: boolean;
      /** @format int32 */
      AvailableOnPlatform?: number;
      SortBy?: string;
      IsSortingDescending?: boolean;
      /** @format int32 */
      Limit?: number;
      /** @format int32 */
      Offset?: number;
      IsCache?: boolean;
      CacheMethodKey?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = AddonsResponse;
  }

  /**
   * No description
   * @tags Addons
   * @name AddonsCreate
   * @request POST:/addons-api/Addons
   * @secure
   */
  export namespace AddonsCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateAddonRequest;
    export type RequestHeaders = {};
    export type ResponseBody = AddonResponse;
  }

  /**
   * No description
   * @tags Addons
   * @name AddonsValidateAddonsCreate
   * @request POST:/addons-api/Addons/validate-addons
   * @secure
   */
  export namespace AddonsValidateAddonsCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ValidateAddonsRequest;
    export type RequestHeaders = {};
    export type ResponseBody = AddonsValidationResponse;
  }

  /**
   * No description
   * @tags Addons
   * @name AddonsValidateAddonsApplicableLimitCreate
   * @request POST:/addons-api/Addons/validate-addons-applicable-limit
   * @secure
   */
  export namespace AddonsValidateAddonsApplicableLimitCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ValidateAddonsApplicableLimitRequest;
    export type RequestHeaders = {};
    export type ResponseBody = AddonResponse;
  }

  /**
   * No description
   * @tags Addons
   * @name AddonsItemDetail
   * @request GET:/addons-api/Addons/item/{itemId}
   * @secure
   */
  export namespace AddonsItemDetail {
    export type RequestParams = {
      itemId: string;
    };
    export type RequestQuery = {
      addonType?: AddonType;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = AddonsResponse;
  }
}
