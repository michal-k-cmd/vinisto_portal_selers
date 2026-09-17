import * as React from 'react';

import { IModalProviderProps, IModalValues } from './interfaces';

const defaultModalValues: IModalValues = {
	isOpened: false,
	modalType: null,
	handleOpenModal: () => null,
	handleCloseModal: () => null,
	data: {},
	isEscapable: true,
};

export const ModalContext = React.createContext(defaultModalValues);

const ModalProvider: React.FC<IModalProviderProps> = ({ children }) => {
	const [isOpened, setIsOpened] = React.useState<boolean>(false);
	const [data, setData] = React.useState<Record<any, any>>({});
	const [modalType, setModalType] = React.useState<string | null>(null);
	const [isEscapable, setIsEscapable] = React.useState<boolean>(true);

	const handleOpenModal = React.useCallback(
		(newModalType: string, data = {}, isEscapable = true) => {
			if (!isOpened || newModalType !== modalType) {
				setIsOpened(true);
				setModalType(newModalType);
				setData(data);
				setIsEscapable(isEscapable);
			}
		},
		[isOpened, modalType]
	);

	const handleCloseModal = React.useCallback(() => {
		if (isOpened && modalType) {
			setIsOpened(false);
			setModalType(null);
			setData({});
		}
	}, [isOpened, modalType]);

	const modalValues: IModalValues = {
		isOpened,
		modalType,
		handleOpenModal,
		handleCloseModal,
		data,
		isEscapable,
	};

	return (
		<ModalContext.Provider value={modalValues}>
			{children}
		</ModalContext.Provider>
	);
};

export default ModalProvider;
