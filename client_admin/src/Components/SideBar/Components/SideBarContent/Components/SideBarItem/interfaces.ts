import { ModalType } from 'Components/Modal/constants';
import { IconType } from 'react-icons';

export interface ISideBarItem {
	title: string;
	route: string;
	modalType?: ModalType;
	icon?: IconType;
}

export interface ISideBarItemProps {
	title: string;
	route: string;
	icon?: IconType;
	modalType?: ModalType;
	customIconSize?: number;
	customFontSize?: number;
}
