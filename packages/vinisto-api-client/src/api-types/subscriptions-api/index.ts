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

export enum SubscriptionType {
  Month = "Month",
  Year = "Year",
}

export enum SubscriptionState {
  Active = "Active",
  Inactive = "Inactive",
  WaitingToStart = "WaitingToStart",
}

export interface CreateSubscriptionRequest {
  userLoginHash: string | null;
  type: SubscriptionType;
  /** @format date */
  startDate: string;
  /** @format date */
  endDate?: string | null;
  /** @format date */
  lastPayment: string;
  state?: SubscriptionState;
  /** @format int32 */
  paymentAttemptsCount?: number | null;
  /** @format int32 */
  creationPayment: number;
  card: SubscriptionCardRequest;
  itemId: string | null;
}

export interface Operation {
  value?: any;
  path?: string | null;
  op?: string | null;
  from?: string | null;
}

export interface SubscriptionCardRequest {
  /** @format int32 */
  id: number;
  brand: string | null;
  realMaskedPan: string | null;
  artUrl: string | null;
}

export interface SubscriptionCardResponse {
  /** @format int32 */
  id: number;
  brand: string | null;
  realMaskedPan: string | null;
  artUrl: string | null;
}

export interface SubscriptionResponse {
  id: string | null;
  userId: string | null;
  type: SubscriptionType;
  /** @format date */
  startDate: string;
  /** @format date */
  endDate?: string | null;
  /** @format date */
  lastPayment: string;
  state?: SubscriptionState;
  /** @format int32 */
  paymentAttemptsCount?: number | null;
  /** @format int32 */
  creationPayment: number;
  card: SubscriptionCardResponse;
  itemId: string | null;
}

export interface SubscriptionStatusResponse {
  isSubscribed?: boolean;
}

export interface SubscriptionsResponse {
  subscriptions: SubscriptionResponse[] | null;
  /** @format int32 */
  count: number;
}

export type Success = object;

export interface UpdateSubscriptionRequest {
  userLoginHash: string | null;
  type: SubscriptionType;
  /** @format date */
  startDate: string;
  /** @format date */
  endDate?: string | null;
  /** @format date */
  lastPayment: string;
  state?: SubscriptionState;
  /** @format int32 */
  paymentAttemptsCount?: number | null;
  /** @format int32 */
  creationPayment: number;
  card: SubscriptionCardRequest;
  itemId: string | null;
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

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown>
  extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  JsonApi = "application/vnd.api+json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "https://localhost:7159";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) =>
    fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter(
      (key) => "undefined" !== typeof query[key],
    );
    return keys
      .map((key) =>
        Array.isArray(query[key])
          ? this.addArrayQueryParam(query, key)
          : this.addQueryParam(query, key),
      )
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.JsonApi]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.Text]: (input: any) =>
      input !== null && typeof input !== "string"
        ? JSON.stringify(input)
        : input,
    [ContentType.FormData]: (input: any) => {
      if (input instanceof FormData) {
        return input;
      }

      return Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
              ? JSON.stringify(property)
              : `${property}`,
        );
        return formData;
      }, new FormData());
    },
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(
    params1: RequestParams,
    params2?: RequestParams,
  ): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (
    cancelToken: CancelToken,
  ): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(
      `${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`,
      {
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData
            ? { "Content-Type": type }
            : {}),
        },
        signal:
          (cancelToken
            ? this.createAbortSignal(cancelToken)
            : requestParams.signal) || null,
        body:
          typeof body === "undefined" || body === null
            ? null
            : payloadFormatter(body),
      },
    ).then(async (response) => {
      const r = response.clone() as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title Subscription.Api
 * @version 1.0
 * @baseUrl https://localhost:7159
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  subscriptionApi = {
    /**
     * No description
     *
     * @tags Subscriptions
     * @name SubscriptionsDetail
     * @request GET:/subscription-api/Subscriptions/{subscriptionId}
     * @secure
     */
    subscriptionsDetail: (subscriptionId: string, params: RequestParams = {}) =>
      this.request<SubscriptionResponse, ValidationProblemDetails>({
        path: `/subscription-api/Subscriptions/${subscriptionId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Subscriptions
     * @name SubscriptionsUpdate
     * @request PUT:/subscription-api/Subscriptions/{subscriptionId}
     * @secure
     */
    subscriptionsUpdate: (
      subscriptionId: string,
      data: UpdateSubscriptionRequest,
      params: RequestParams = {},
    ) =>
      this.request<SubscriptionResponse, ValidationProblemDetails>({
        path: `/subscription-api/Subscriptions/${subscriptionId}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Subscriptions
     * @name SubscriptionsDelete
     * @request DELETE:/subscription-api/Subscriptions/{subscriptionId}
     * @secure
     */
    subscriptionsDelete: (subscriptionId: string, params: RequestParams = {}) =>
      this.request<Success, ValidationProblemDetails>({
        path: `/subscription-api/Subscriptions/${subscriptionId}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Subscriptions
     * @name SubscriptionsList
     * @request GET:/subscription-api/Subscriptions
     * @secure
     */
    subscriptionsList: (
      query?: {
        UserId?: string;
        /** @format int32 */
        Limit?: number;
        /** @format int32 */
        Offset?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<SubscriptionsResponse, ValidationProblemDetails>({
        path: `/subscription-api/Subscriptions`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Subscriptions
     * @name SubscriptionsCreate
     * @request POST:/subscription-api/Subscriptions
     * @secure
     */
    subscriptionsCreate: (
      data: CreateSubscriptionRequest,
      params: RequestParams = {},
    ) =>
      this.request<SubscriptionResponse, ValidationProblemDetails>({
        path: `/subscription-api/Subscriptions`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Subscriptions
     * @name SubscriptionsPartialUpdate
     * @request PATCH:/subscription-api/Subscriptions
     * @secure
     */
    subscriptionsPartialUpdate: (
      data: Operation[],
      query?: {
        subscriptionId?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/subscription-api/Subscriptions`,
        method: "PATCH",
        query: query,
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Subscriptions
     * @name SubscriptionsIsSubscribedList
     * @request GET:/subscription-api/Subscriptions/{userId}/is-subscribed
     * @secure
     */
    subscriptionsIsSubscribedList: (
      userId: string,
      params: RequestParams = {},
    ) =>
      this.request<SubscriptionStatusResponse, any>({
        path: `/subscription-api/Subscriptions/${userId}/is-subscribed`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
  };
}
