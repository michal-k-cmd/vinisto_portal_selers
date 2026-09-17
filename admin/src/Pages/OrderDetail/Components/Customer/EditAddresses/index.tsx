import { useContext } from 'react';
import { FaEdit } from 'react-icons/fa';
import { ModalContext } from 'Components/Modal/context';
import { OrderAddressModalData } from 'Components/Forms/interfaces';
import { ORDER_ADDRESS } from 'Components/Modal/constants';

import type { EditAddressesProps } from './interfaces';
import styles from './styles.module.css';

const EditAddresses = ({
	shippingAddress,
	billingAddress,
	isStateCreated = false,
	type,
	orderId,
	handleEditAddressesInOrder,
}: EditAddressesProps) => {
	const modalContext = useContext(ModalContext);

	const handleClickEdit = () => {
		const modalData: OrderAddressModalData = {
			orderId,
			orderAddressType: type,
			shippingAddress: shippingAddress,
			billingAddress: billingAddress,
			handleEditAddressesInOrder: handleEditAddressesInOrder,
		};
		modalContext.handleOpenModal(ORDER_ADDRESS, modalData);
	};

	if (!isStateCreated) return null;

	return (
		<FaEdit
			className={styles.editIcon}
			role="button"
			onClick={handleClickEdit}
		/>
	);
};

export default EditAddresses;
