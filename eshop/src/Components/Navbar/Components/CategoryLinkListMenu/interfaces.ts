import { MenuLink } from 'vinisto_api_client/src/api-types/linkwidgets-api';

export interface ICategoryLinkListMenuProps {
	sections: MenuLink[];
	category: MenuLink;
	handleOnMouseLeave: () => void;
	displayedCategory: string | null;
}
