import { MenuLink } from 'vinisto_api_client/src/api-types/linkwidgets-api';

import { ICategoryLink } from '../CategoryLink/interfaces';

export interface ICategoryLinkListSubcategory {
	heading?: string;
	children: ICategoryLink[];
}

export interface CategoryLinkListItem extends ICategoryLink {
	children?: ICategoryLinkListSubcategory[];
}

export interface ICategoryLinkListProps {
	links: MenuLink[];
}
