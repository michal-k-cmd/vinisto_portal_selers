import {
	CreateLinkRequestContract,
	GetLinkResponseContract,
	ProblemDetails,
	UpdateLinkRequestContract,
	LinksListParams,
	LinkMenusListParams,
} from '@/api-types/linkwidgets-api';
import { ContentType, HttpClient, RequestParams } from './client';
import LinkWidgetAdapter from '../domain/link-widget/adapter';
import { GetLinkMenusResponseContract } from '@/api-types/linkwidgets-api';

export const linkWidgetAdapter = new LinkWidgetAdapter();

export const LINK_WIDGETS_API_PATH = 'linkwidgets-api/link';

/**
 * @title LinkWidgets.Api
 * @version 1.0
 */
export class Api<
	SecurityDataType extends unknown
> extends HttpClient<SecurityDataType> {
	api = {
		/**
		 * No description
		 *
		 * @tags Link
		 * @name LinkDetail
		 * @request GET:/api/link/{id}
		 */
		linkDetail: (id: string, params: RequestParams = {}) =>
			this.request<GetLinkResponseContract, ProblemDetails>({
				path: `${LINK_WIDGETS_API_PATH}/${id}`,
				method: 'GET',
				format: 'json',
				...params,
			}).then((response) => linkWidgetAdapter.fromApi(response.data)),

		/**
		 * No description
		 *
		 * @tags Link
		 * @name LinkUpdate
		 * @request PUT:/api/link/{id}
		 */
		linkUpdate: (
			id: string,
			data: UpdateLinkRequestContract,
			params: RequestParams = {}
		) =>
			this.request<boolean, ProblemDetails>({
				path: `${LINK_WIDGETS_API_PATH}/${id}`,
				method: 'PUT',
				body: data,
				type: ContentType.Json,
				format: 'json',
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags Link
		 * @name LinkDelete
		 * @request DELETE:/api/link/{id}
		 */
		linkDelete: (id: string, params: RequestParams = {}) =>
			this.request<boolean, ProblemDetails>({
				path: `${LINK_WIDGETS_API_PATH}/${id}`,
				method: 'DELETE',
				format: 'json',
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags Link
		 * @name LinkCreate
		 * @request POST:/api/link
		 */
		linkCreate: (data: CreateLinkRequestContract, params: RequestParams = {}) =>
			this.request<boolean, ProblemDetails>({
				path: `${LINK_WIDGETS_API_PATH}`,
				method: 'POST',
				body: data,
				type: ContentType.Json,
				format: 'json',
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags Links
		 * @name LinksList
		 * @request GET:/api/links
		 */
		linksList: (query: LinksListParams, params: RequestParams = {}) =>
			this.request<GetLinkResponseContract[], ProblemDetails>({
				path: `${LINK_WIDGETS_API_PATH}s`,
				method: 'GET',
				query: query,
				format: 'json',
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags Links
		 * @name LinksClearCacheDelete
		 * @request DELETE:/api/links/clear-cache
		 */
		linksClearCacheDelete: (params: RequestParams = {}) =>
			this.request<boolean, ProblemDetails>({
				path: `${LINK_WIDGETS_API_PATH}s/clear-cache`,
				method: 'DELETE',
				format: 'json',
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
				path: `linkwidgets-api/link-menus`,
				method: 'GET',
				query: query,
				format: 'json',
				...params,
			}),
	};
}

type SecurityDataType = { key: string };

//const location = document.location;
//const baseUrl = location.hostname.includes('.sk')
//		? import.meta.env?.VITE_API_URI_SK || process.env.NEXT_PUBLIC_API_URI_SK || ''
//		: import.meta.env?.VITE_API_URI || process.env.NEXT_PUBLIC_API_URI || '';

// TODO Fix document reference
const baseUrl =
	import.meta.env?.VITE_API_URI || process.env.NEXT_PUBLIC_API_URI || '';

const widgetLinkApi = new Api<SecurityDataType>({
	baseUrl: baseUrl,
	securityWorker: (securityData: SecurityDataType | null) => {
		if (securityData) {
			return {
				headers: {
					['X-Api-Key']: securityData.key,
				},
			};
		}
	},
});
widgetLinkApi.setSecurityData({
	key:
		import.meta.env?.VITE_LINK_WIDGET_API_KEY ||
		process.env.NEXT_PUBLIC_LINK_WIDGET_API_KEY ||
		'',
});

export default widgetLinkApi.api;
