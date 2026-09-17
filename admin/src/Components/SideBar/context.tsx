import { createContext, FC, useCallback, useState } from 'react';

import { ISideBarContextProps, ISideBarModel } from './interfaces';

const defaultSideBarModel: ISideBarModel = {
	isOpened: true,
	handleOnToggleSideBar: () => {},
	handleOnForceHideSideBar: () => {},
	handleOnForceOpenSideBar: () => {},
};

export const SideBarContext = createContext(defaultSideBarModel);

const SideBarContextProvider: FC<ISideBarContextProps> = ({ children }) => {
	const [isOpen, setIsOpen] = useState(true);

	const handleOnToggleSideBar = useCallback(() => {
		setIsOpen((isOpen) => !isOpen);
	}, []);

	const handleOnForceHideSideBar = useCallback(() => {
		setIsOpen(false);
	}, []);

	const handleOnForceOpenSideBar = useCallback(() => {
		setIsOpen(true);
	}, []);

	return (
		<SideBarContext.Provider
			value={{
				isOpened: isOpen,
				handleOnToggleSideBar,
				handleOnForceHideSideBar,
				handleOnForceOpenSideBar,
			}}
		>
			{children}
		</SideBarContext.Provider>
	);
};

export default SideBarContextProvider;
