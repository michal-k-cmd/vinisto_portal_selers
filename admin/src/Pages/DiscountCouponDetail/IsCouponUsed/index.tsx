import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useContext } from 'react';
import { VinistoOrderDllModelsApiOrderOrder } from 'vinisto_api_client/src/api-types/order-api/';
import { LocalizationContext } from 'Services/LocalizationService';
import { COUPON_LINKED_ORDERS_LIST } from 'Components/Modal/constants';
import { ModalContext } from 'Components/Modal/context';

import styles from './styles.module.css';

const IsCouponUsed = ({
	orders,
	isReusable,
}: {
	orders: VinistoOrderDllModelsApiOrderOrder[];
	isReusable: boolean;
}) => {
	const t = useContext(LocalizationContext).useFormatMessage();
	const { handleOpenModal } = useContext(ModalContext);
	const navigate = useNavigate();

	const isUsed = orders.length > 0;

	return isUsed ? (
		<>
			{t({ id: 'admin.yes' })?.toString().toUpperCase()}
			{!isReusable && <span className={styles.dashSpacing}>{' - '}</span>}
			{!isReusable ? (
				<a
					className={styles.defaultLinkStyle}
					onClick={() => {
						navigate(`/order-detail/${orders[0].id}`);
					}}
				>
					{orders[0].orderNumber}
				</a>
			) : (
				<Button
					className={styles.buttonSpacing}
					onClick={() =>
						handleOpenModal(COUPON_LINKED_ORDERS_LIST, {
							orders,
						})
					}
				>
					{t({ id: 'admin.couponDetail.displayOrders.label' })}
				</Button>
			)}
		</>
	) : (
		<>{t({ id: 'admin.no' })?.toString().toUpperCase()}</>
	);
};

export default IsCouponUsed;
