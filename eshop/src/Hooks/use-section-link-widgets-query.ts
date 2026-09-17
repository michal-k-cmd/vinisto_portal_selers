import { useQuery } from '@tanstack/react-query';
import { useIsB2b } from 'Services/PlatformService';
import { LinksListParams } from 'vinisto_api_client/src/api-types/linkwidgets-api';
import { Allowed_Sections } from 'vinisto_api_client/src/domain/link-widget/enums';
import linkWidgetService from 'vinisto_api_client/src/link-widget-service';

import { B2B_NUMERIC_CODE, B2C_NUMERIC_CODE } from '@/shared';

/**
 * Hook for fetching link widgets for a given section.
 * @param section - Section for which to fetch link widgets.
 * @param pathname - Pathname of the current page.
 * @param widgetLimit - Limit of link widgets to fetch.
 * @returns Query object and filtered links.
 */
const useSectionLinkWidgetsQuery = (
	section: Allowed_Sections,
	pathname?: string,
	widgetLimit?: number
) => {
	const isB2b = useIsB2b();
	const removeSortingParam = (url: string) =>
		url.split('/').slice(0, 3).join('/');

	const req: LinksListParams = {
		Sort: 'order',
		PathId: `${removeSortingParam(pathname ?? '/')}|${section}`,
		Limit: widgetLimit,
		AvailableOnPlatform: isB2b ? B2B_NUMERIC_CODE : B2C_NUMERIC_CODE,
	};
	const queryKey = ['linkWidgets', req];

	const query = useQuery(queryKey, async () =>
		linkWidgetService.linksList(req)
	);

	if (!widgetLimit) return { query, filteredLinks: query.data?.data };

	return {
		query,
		filteredLinks: query.data?.data?.slice(0, widgetLimit),
	};
};

export default useSectionLinkWidgetsQuery;
