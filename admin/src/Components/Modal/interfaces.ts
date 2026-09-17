import { ReactNode } from 'react';

export interface IModalProps {
	modalType: string;
}

export interface IModalValues {
	isOpened: boolean;
	modalType: string | null;
	handleOpenModal: (
		_: string,
		data?: Record<any, any>,
		isEscapable?: boolean
	) => void;
	handleCloseModal: () => void;
	data?: Record<any, any>;
	isEscapable?: boolean;
}

export interface IModalProviderProps {
	children: ReactNode;
}
