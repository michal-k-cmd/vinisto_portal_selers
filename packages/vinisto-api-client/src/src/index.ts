/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface CreateLinkRequestContract {
  name?: string | null;
  pathId?: string | null;
  url?: string | null;
  /** @format int32 */
  type?: number;
  /** @format int32 */
  order?: number;
  imageLocator?: string | null;
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
  name?: string | null;
  pathId?: string | null;
  url?: string | null;
  /** @format int32 */
  type?: number;
  /** @format int32 */
  order?: number;
  imageLocator?: string | null;
}
