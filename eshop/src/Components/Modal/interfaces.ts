import { ReactNode } from 'react';

import modalsConfig from './config';
export interface IModalProps {
	modalType: string;
}

export interface IModalValues {
	isOpened: boolean;
	modalType: string | null;
	modalConfig: Record<any, any>;
	modalData: Record<any, any> | null | undefined;
	showModalPreloader: boolean;
	handleOpenModal: (
		_: keyof typeof modalsConfig,
		__?: Record<any, any> | null | undefined
	) => void;
	handleCloseModal: () => void;
	handleUpdateModalConfig: (_: Record<any, any>) => void;
	handleToggleModalPreloader: (_: boolean) => void;
	modalRef: React.RefObject<HTMLDivElement | null> | null;
	setModalRef: (ref: React.RefObject<HTMLDivElement | null>) => void;
}

export interface IModalProviderProps {
	children: ReactNode;
}
