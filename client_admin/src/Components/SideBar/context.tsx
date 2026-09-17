import { createContext, FC, useCallback, useState } from 'react';

import { SideBarContextProps, SideBarModel } from './interfaces';

const defaultSideBarModel: SideBarModel = {
	isOpened: true,
	handleOnToggleSideBar: () => {},
	handleOnForceHideSideBar: () => {},
	handleOnForceOpenSideBar: () => {},
};

export const SideBarContext = createContext(defaultSideBarModel);

const SideBarContextProvider: FC<SideBarContextProps> = ({ children }) => {
	const [sideBarState, setSideBarState] = useState({ isOpened: true });

	const handleOnToggleSideBar = useCallback(() => {
		setSideBarState((prevState) => ({
			isOpened: !prevState.isOpened,
		}));
	}, []);

	const handleOnForceHideSideBar = useCallback(() => {
		if (sideBarState.isOpened) {
			setSideBarState({ isOpened: false });
		}
	}, [sideBarState.isOpened]);

	const handleOnForceOpenSideBar = useCallback(() => {
		if (!sideBarState.isOpened) {
			setSideBarState({ isOpened: true });
		}
	}, [sideBarState.isOpened]);

	return (
		<SideBarContext.Provider
			value={{
				...sideBarState,
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
