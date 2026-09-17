import { AbstractAdapter } from '../abstract-adapter';

import { type LinkWidget } from './index';

import { GetLinkResponseContract } from '@/api-types/linkwidgets-api';

class LinkWidgetAdapter extends AbstractAdapter<
	LinkWidget,
	GetLinkResponseContract
> {
	fromApi(apiData: GetLinkResponseContract): LinkWidget {
		return {
      id: apiData.id ?? '',
      name: apiData.name ?? '',
      pathId: apiData.pathId ?? '',
      url: apiData.url ?? '',
      type: apiData.type ?? 0,
      order: apiData.order ?? 0,
      imageLocator: apiData.imageLocator ?? '',
      flags: apiData.flags ?? [],
      availableOnPlatforms: apiData.availableOnPlatforms ?? [],
		};
	}
}

export default LinkWidgetAdapter;
