'use client';

import { createContext, useCallback, useState } from 'react';

import modalsConfig from './config';
import { getModalConfigByType } from './helpers';
import { IModalProviderProps, IModalValues } from './interfaces';
import { DEFAULT_CLOSING_TIMEOUT } from './constants';

const defaultModalValues: IModalValues = {
	isOpened: false,
	modalType: null,
	modalData: null,
	modalConfig: {},
	showModalPreloader: false,
	handleOpenModal: () => null,
	handleCloseModal: () => null,
	handleUpdateModalConfig: () => null,
	handleToggleModalPreloader: () => null,
	modalRef: null,
	setModalRef: (ref: React.RefObject<HTMLDivElement | null>) => {
		defaultModalValues.modalRef = ref;
	},
};

export const ModalContext = createContext(defaultModalValues);

const ModalProvider = (props: IModalProviderProps) => {
	const [isOpened, setIsOpened] = useState<boolean>(
		defaultModalValues.isOpened
	);
	const [modalType, setModalType] = useState<keyof typeof modalsConfig | null>(
		null
	);
	const [modalData, setModalData] = useState<
		Record<any, any> | null | undefined
	>(defaultModalValues.modalData);
	const [modalConfig, setModalConfig] = useState(
		getModalConfigByType(modalType)
	);
	const [showModalPreloader, setShowModalPreloader] = useState<boolean>(
		defaultModalValues.showModalPreloader
	);

	const handleToggleModalPreloader = useCallback((show: boolean) => {
		setShowModalPreloader(show);
	}, []);

	const handleUpdateModalConfig = useCallback(
		(updatedModalConfig: Record<any, any>) => {
			setModalConfig(updatedModalConfig);
		},
		[]
	);

	const handleOpenModal = useCallback(
		(
			newModalType: keyof typeof modalsConfig,
			mData?: Record<any, any> | null | undefined
		) => {
			if (!isOpened || newModalType !== modalType) {
				setIsOpened(true);
				setModalType(newModalType);
				setModalConfig(getModalConfigByType(newModalType));
				if (mData) {
					setModalData(mData);
				}
			}
		},
		[isOpened, modalType]
	);

	const handleCloseModal = useCallback(() => {
		if (isOpened && modalType) {
			setTimeout(() => {
				setIsOpened(false);
			}, DEFAULT_CLOSING_TIMEOUT);
			setModalType(null);
			setModalData(null);
		}
	}, [isOpened, modalType]);

	// Create modal values object to pass to the context
	const modalRef = defaultModalValues.modalRef || null;
	if (!modalRef) {
		defaultModalValues.setModalRef = (
			ref: React.RefObject<HTMLDivElement | null>
		) => {
			defaultModalValues.modalRef = ref;
		};
	}

	const modalValues: IModalValues = {
		modalConfig,
		modalData,
		isOpened,
		modalType,
		showModalPreloader,
		handleUpdateModalConfig,
		handleOpenModal,
		handleCloseModal,
		handleToggleModalPreloader,
		modalRef,
		setModalRef: defaultModalValues.setModalRef || (() => null),
	};

	return (
		<ModalContext.Provider value={modalValues}>
			{props.children}
		</ModalContext.Provider>
	);
};

export default ModalProvider;
