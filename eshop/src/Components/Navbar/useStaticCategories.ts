import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { NotificationsContext } from 'Services/NotificationService';
import { withoutExcluded } from 'vinisto_api_client';
import linkWidgetService from 'vinisto_api_client/src/link-widget-service';
import { MenuLink } from 'vinisto_api_client/src/api-types/linkwidgets-api';
import { useIsB2b } from 'Services/PlatformService';

import { B2B_NUMERIC_CODE, B2C_NUMERIC_CODE } from '@/shared';

const combineUrls = (
	menuLinks: MenuLink[],
	parentUrl: string = ''
): MenuLink[] => {
	return menuLinks.map((link) => {
		if (link.type === 3 && !link.url?.startsWith(parentUrl)) {
			link.url = `${parentUrl}${link.url}`;
		}
		if (link.childLinks && link.childLinks.length > 0) {
			link.childLinks = combineUrls(link.childLinks, link.url ?? '');
		}
		return link;
	});
};

const useStaticCategories = () => {
	const { handleShowErrorNotification } = useContext(NotificationsContext);
	const isB2b = useIsB2b();

	const { data, isLoading } = useQuery({
		queryKey: ['menu', isB2b],
		queryFn: () =>
			linkWidgetService
				.linkMenusList({
					platformId: isB2b ? B2B_NUMERIC_CODE : B2C_NUMERIC_CODE,
				})
				.then((res) => {
					if (res.data.desktopMenu === undefined) {
						throw new Error('No desktopMenu data in response');
					}

					if (res.data.mobileMenu === undefined) {
						throw new Error('No mobileMenu data in response');
					}

					const out = {
						desktopMenu: withoutExcluded(res.data.desktopMenu),
						mobileMenu: withoutExcluded(res.data.mobileMenu),
					};

					return out;
				}),
		onError: () => {
			handleShowErrorNotification('megamenu.loadError');
		},
	});

	if (isLoading) {
		return { desktopMenu: [], mobileMenu: [] };
	}

	const desktopMenuRaw =
		data?.desktopMenu !== null && data?.desktopMenu != undefined
			? data.desktopMenu
			: [];

	const mobileMenuRaw =
		data?.mobileMenu !== null && data?.mobileMenu != undefined
			? data.mobileMenu
			: [];

	const desktopMenu = combineUrls(desktopMenuRaw);
	const mobileMenu = combineUrls(mobileMenuRaw);

	return { desktopMenu, mobileMenu };
};

export default useStaticCategories;
