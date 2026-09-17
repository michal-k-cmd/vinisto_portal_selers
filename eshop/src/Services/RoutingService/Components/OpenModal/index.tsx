import { useContext, useEffect } from 'react';
import { ModalContext } from 'Components/Modal/context';
import modalsConfig from 'Components/Modal/config';

interface IOpenModalProps {
	modalName: keyof typeof modalsConfig;
	modalData?: Record<any, any> | null | undefined;
}

const OpenModal = ({ modalName, modalData = {} }: IOpenModalProps) => {
	const { handleOpenModal } = useContext(ModalContext);

	useEffect(() => {
		handleOpenModal(modalName, modalData);
	}, []);

	return <></>;
};

export default OpenModal;
