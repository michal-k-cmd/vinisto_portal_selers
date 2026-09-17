import React from 'react';

export interface INavbarContextValue {
	basketRef: React.RefObject<Element>;
	menuRef: React.RefObject<HTMLDivElement>;
	headerRef: React.RefObject<HTMLElement>;
	isMenuOpen: boolean;
	isFiltersVisible: boolean;
	setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
	setIsFiltersVisible: React.Dispatch<React.SetStateAction<boolean>>;
	handleOnCloseMenu: () => void;
	handleOnToggleMenu: () => void;
	isMobileHeaderVisible: boolean;
	setIsMobileHeaderVisible: React.Dispatch<React.SetStateAction<boolean>>;
	hideHeader: () => void;
	showHeader: () => void;
	activeCurrencyCookie: string | undefined;
}

export interface INavbarContextProviderProps {
	children: React.ReactNode;
	activeCurrencyCookie: string | undefined;
}
