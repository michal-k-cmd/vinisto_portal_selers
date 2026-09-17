'use client';

import React, { useContext, useEffect } from 'react';
import useMobileHeaderVisibility from 'Hooks/use-mobile-header-visibility';
import { DeviceServiceContext } from 'Services/DeviceService';

import { INavbarContextProviderProps, INavbarContextValue } from './interfaces';

const navbarContextDefaultValues: INavbarContextValue = {
	basketRef: React.createRef<HTMLDivElement>(),
	menuRef: React.createRef(),
	headerRef: React.createRef(),
	isMenuOpen: false,
	setIsMenuOpen: () => null,
	handleOnCloseMenu: () => null,
	handleOnToggleMenu: () => null,
	isFiltersVisible: false,
	setIsFiltersVisible: () => null,
	isMobileHeaderVisible: false,
	setIsMobileHeaderVisible: () => null,
	hideHeader: () => null,
	showHeader: () => null,
	activeCurrencyCookie: undefined,
};

export const NavbarContext = React.createContext(navbarContextDefaultValues);

const NavbarContextProvider = ({
	children,
	activeCurrencyCookie,
}: INavbarContextProviderProps) => {
	const { isDesktop } = useContext(DeviceServiceContext);

	const [isMenuOpen, setIsMenuOpen] = React.useState<boolean>(false);
	const [isFiltersVisible, setIsFiltersVisible] =
		React.useState<boolean>(false);
	const basketRef = React.useRef<HTMLDivElement>(null);
	const menuRef = React.useRef(null);
	const headerRef = React.useRef<HTMLElement>(null);

	const hideHeader = () => {
		if (headerRef.current) {
			headerRef.current.classList.add('hidden');
		}
	};

	const showHeader = () => {
		if (headerRef.current) {
			headerRef.current.classList.remove('hidden');
		}
	};

	const handleOnCloseMenu = React.useCallback(() => {
		setIsMenuOpen(false);
	}, []);

	const [isMobileHeaderVisible, setIsMobileHeaderVisible] =
		useMobileHeaderVisibility({ throttleDelay: 100, isEnabled: !isDesktop });

	const handleOnToggleMenu = () => {
		setIsMenuOpen((bool: boolean) => !bool);

		setIsMobileHeaderVisible(true);

		if (setIsFiltersVisible) {
			setIsFiltersVisible(false);
		}
	};

	// This ensures that the body is not scrollable when the search results are visible
	useEffect(() => {
		if (isMenuOpen) {
			document.body.classList.add('overflow-hidden');
		} else {
			document.body.classList.remove('overflow-hidden');
		}
		return () => {
			document.body.classList.remove('overflow-hidden');
		};
	}, [isMenuOpen]);

	const contextValue: INavbarContextValue = {
		isMenuOpen,
		setIsMenuOpen,
		handleOnCloseMenu,
		handleOnToggleMenu,
		basketRef,
		menuRef,
		headerRef,
		isFiltersVisible,
		setIsFiltersVisible,
		isMobileHeaderVisible,
		setIsMobileHeaderVisible,
		hideHeader,
		showHeader,
		activeCurrencyCookie,
	};

	return (
		<NavbarContext.Provider value={contextValue}>
			{children}
		</NavbarContext.Provider>
	);
};

export default NavbarContextProvider;
