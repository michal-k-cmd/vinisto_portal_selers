import { FC, ReactNode } from 'react';
import { ModalProps } from 'react-bootstrap';

import { ModalType } from './constants';

export interface IModalValues {
	isOpened: boolean;
	modalType: ModalType | null;
	handleOpenModal: (_: ModalType, data?: Record<any, any>) => void;
	handleCloseModal: () => void;
	data?: Record<any, any>;
}

export interface IModalProviderProps {
	children: ReactNode;
}

export type ModalConfiguration = {
	[key in ModalType]: [string, FC, ModalProps?];
};
