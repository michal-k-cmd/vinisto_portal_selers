import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ModalContext } from 'Components/Modal/context';
import { Button } from 'react-bootstrap';
import { LocalizationContext } from 'Services/LocalizationService';

import { CouponLinkedOrdersListModalData } from './interfaces';
import styles from './styles.module.css';

/**
 * Requires type CouponLinkedOrdersListModalData as ModalData
 */
const CouponLinkedOrdersListModal = () => {
	const t = useContext(LocalizationContext).useFormatMessage();
	const { handleCloseModal, data } = useContext(ModalContext);
	const { orders } = data as CouponLinkedOrdersListModalData;

	const navigate = useNavigate();

	return (
		<>
			<div className={styles.container}>
				{orders.map((order) => {
					return (
						<a
							className={styles.defaultLinkStyle}
							key={order.id}
							onClick={() => {
								navigate(`/order-detail/${order.id}`);
							}}
						>
							{order.orderNumber}
						</a>
					);
				})}
			</div>
			<Button
				onClick={() => {
					handleCloseModal();
				}}
			>
				{t({ id: 'admin.couponDetail.displayOrders.close' })}
			</Button>
		</>
	);
};

export default CouponLinkedOrdersListModal;
