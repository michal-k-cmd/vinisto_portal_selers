import { ReactNode } from 'react';

export interface SideBarModel {
	isOpened: boolean;
	handleOnToggleSideBar: () => void;
	handleOnForceHideSideBar: () => void;
	handleOnForceOpenSideBar: () => void;
}

export interface SideBarContextProps {
	children: ReactNode;
}
