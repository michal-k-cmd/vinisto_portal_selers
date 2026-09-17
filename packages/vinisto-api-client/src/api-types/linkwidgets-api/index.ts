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

export interface CreateLinkRequestContract {
  /** @minLength 1 */
  name: string;
  /** @minLength 1 */
  pathId: string;
  url?: string | null;
  /** @format int32 */
  type?: number;
  /** @format int32 */
  order?: number;
  imageLocator?: string | null;
  flags?: string[] | null;
  availableOnPlatforms: number[] | null;
}

export type Created = object;

export type Deleted = object;

export interface GetLinkMenusResponseContract {
  desktopMenu?: MenuLink[] | null;
  mobileMenu?: MenuLink[] | null;
}

export interface GetLinkResponseContract {
  id?: string | null;
  name?: string | null;
  pathId?: string | null;
  url?: string | null;
  /** @format int32 */
  type?: number;
  /** @format int32 */
  order?: number;
  imageLocator?: string | null;
  flags?: string[] | null;
  availableOnPlatforms?: number[] | null;
}

export interface GetLinksResponseContract {
  id?: string | null;
  name?: string | null;
  pathId?: string | null;
  url?: string | null;
  /** @format int32 */
  type?: number;
  /** @format int32 */
  order?: number;
  imageLocator?: string | null;
  flags?: string[] | null;
  availableOnPlatforms?: number[] | null;
}

export interface MenuLink {
  name?: string | null;
  url?: string | null;
  /** @format int32 */
  type?: number;
  imageLocator?: string | null;
  flags?: string[] | null;
  availableOnPlatforms?: number[] | null;
  childLinks?: MenuLink[] | null;
}

export interface ProblemDetails {
  type?: string | null;
  title?: string | null;
  /** @format int32 */
  status?: number | null;
  detail?: string | null;
  instance?: string | null;
  [key: string]: any;
}

export interface UpdateLinkRequestContract {
  /** @minLength 1 */
  name: string;
  /** @minLength 1 */
  pathId: string;
  url?: string | null;
  /** @format int32 */
  type?: number;
  /** @format int32 */
  order?: number;
  imageLocator?: string | null;
  flags?: string[] | null;
  availableOnPlatforms?: number[] | null;
}

export type Updated = object;

export interface LinkMenusListParams {
  /** @format int32 */
  platformId?: number;
}

export interface LinksListParams {
  Name?: string;
  /** @format int32 */
  Type?: number;
  PathId?: string;
  /** @format int32 */
  AvailableOnPlatform?: number;
  /** @format int32 */
  Limit?: number;
  /** @format int32 */
  Skip?: number;
  Sort?: string;
}

export namespace LinkwidgetsApi {
  /**
   * No description
   * @tags Link
   * @name LinkDetail
   * @request GET:/linkwidgets-api/link/{id}
   */
  export namespace LinkDetail {
    export type RequestParams = {
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetLinkResponseContract;
  }

  /**
   * No description
   * @tags Link
   * @name LinkUpdate
   * @request PUT:/linkwidgets-api/link/{id}
   */
  export namespace LinkUpdate {
    export type RequestParams = {
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateLinkRequestContract;
    export type RequestHeaders = {};
    export type ResponseBody = Updated;
  }

  /**
   * No description
   * @tags Link
   * @name LinkDelete
   * @request DELETE:/linkwidgets-api/link/{id}
   */
  export namespace LinkDelete {
    export type RequestParams = {
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = Deleted;
  }

  /**
   * No description
   * @tags Link
   * @name LinkCreate
   * @request POST:/linkwidgets-api/link
   */
  export namespace LinkCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateLinkRequestContract;
    export type RequestHeaders = {};
    export type ResponseBody = Created;
  }

  /**
   * No description
   * @tags LinkMenus
   * @name LinkMenusList
   * @request GET:/linkwidgets-api/link-menus
   */
  export namespace LinkMenusList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** @format int32 */
      platformId?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetLinkMenusResponseContract;
  }

  /**
   * No description
   * @tags Links
   * @name LinksList
   * @request GET:/linkwidgets-api/links
   */
  export namespace LinksList {
    export type RequestParams = {};
    export type RequestQuery = {
      Name?: string;
      /** @format int32 */
      Type?: number;
      PathId?: string;
      /** @format int32 */
      AvailableOnPlatform?: number;
      /** @format int32 */
      Limit?: number;
      /** @format int32 */
      Skip?: number;
      Sort?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetLinksResponseContract[];
  }

  /**
   * No description
   * @tags Links
   * @name LinksFlagsList
   * @request GET:/linkwidgets-api/links/flags
   */
  export namespace LinksFlagsList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = string[];
  }

  /**
   * No description
   * @tags Links
   * @name LinksClearCacheDelete
   * @request DELETE:/linkwidgets-api/links/clear-cache
   */
  export namespace LinksClearCacheDelete {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = boolean;
  }
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
  public baseUrl: string = "https://b2b.vinisto.dev";
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
 * @title LinkWidgets.Api
 * @version 1.0
 * @baseUrl https://b2b.vinisto.dev
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  linkwidgetsApi = {
    /**
     * No description
     *
     * @tags Link
     * @name LinkDetail
     * @request GET:/linkwidgets-api/link/{id}
     */
    linkDetail: (id: string, params: RequestParams = {}) =>
      this.request<GetLinkResponseContract, ProblemDetails>({
        path: `/linkwidgets-api/link/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Link
     * @name LinkUpdate
     * @request PUT:/linkwidgets-api/link/{id}
     */
    linkUpdate: (
      id: string,
      data: UpdateLinkRequestContract,
      params: RequestParams = {},
    ) =>
      this.request<Updated, ProblemDetails>({
        path: `/linkwidgets-api/link/${id}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Link
     * @name LinkDelete
     * @request DELETE:/linkwidgets-api/link/{id}
     */
    linkDelete: (id: string, params: RequestParams = {}) =>
      this.request<Deleted, ProblemDetails>({
        path: `/linkwidgets-api/link/${id}`,
        method: "DELETE",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Link
     * @name LinkCreate
     * @request POST:/linkwidgets-api/link
     */
    linkCreate: (data: CreateLinkRequestContract, params: RequestParams = {}) =>
      this.request<Created, ProblemDetails>({
        path: `/linkwidgets-api/link`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags LinkMenus
     * @name LinkMenusList
     * @request GET:/linkwidgets-api/link-menus
     */
    linkMenusList: (query: LinkMenusListParams, params: RequestParams = {}) =>
      this.request<GetLinkMenusResponseContract, any>({
        path: `/linkwidgets-api/link-menus`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Links
     * @name LinksList
     * @request GET:/linkwidgets-api/links
     */
    linksList: (query: LinksListParams, params: RequestParams = {}) =>
      this.request<GetLinksResponseContract[], any>({
        path: `/linkwidgets-api/links`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Links
     * @name LinksFlagsList
     * @request GET:/linkwidgets-api/links/flags
     */
    linksFlagsList: (params: RequestParams = {}) =>
      this.request<string[], any>({
        path: `/linkwidgets-api/links/flags`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Links
     * @name LinksClearCacheDelete
     * @request DELETE:/linkwidgets-api/links/clear-cache
     */
    linksClearCacheDelete: (params: RequestParams = {}) =>
      this.request<boolean, any>({
        path: `/linkwidgets-api/links/clear-cache`,
        method: "DELETE",
        format: "json",
        ...params,
      }),
  };
}
