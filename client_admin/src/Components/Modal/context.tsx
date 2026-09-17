import * as React from 'react';

import { IModalProviderProps, IModalValues } from './interfaces';
import { ModalType } from './constants';

const defaultModalValues: IModalValues = {
	isOpened: false,
	modalType: null,
	handleOpenModal: () => {},
	handleCloseModal: () => {},
	data: {},
};

export const ModalContext = React.createContext(defaultModalValues);

/**
 * @category Component Modal Context Provider
 */
const ModalProvider: React.FC<IModalProviderProps> = (props) => {
	const [isOpened, setIsOpened] = React.useState<boolean>(false);
	const [data, setData] = React.useState<Record<any, any>>({});
	const [modalType, setModalType] = React.useState<ModalType | null>(null);

	const handleOpenModal = React.useCallback(
		(newModalType: ModalType, data = {}) => {
			if (isOpened && newModalType === modalType) return;
			setIsOpened(true);
			setModalType(newModalType);
			setData(data);
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
	};

	return (
		<ModalContext.Provider value={modalValues}>
			{props.children}
		</ModalContext.Provider>
	);
};

export default ModalProvider;
