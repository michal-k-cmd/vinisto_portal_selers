import { useContext } from 'react';
import cx from 'classnames';
import { LocalizationContext } from 'Services/LocalizationService';
import { Spinner } from 'react-bootstrap';
import { OrderContext } from 'Services/OrderService/context';

import styles from './styles.module.css';
import { ShippingDataButtonProps } from './interfaces';
import SuccessIcon from './SucessIcon';

const ShippingDataButton = ({ onClick }: ShippingDataButtonProps) => {
	const { getOrderRequestStatus, orderId } = useContext(OrderContext);
	const t = useContext(LocalizationContext).useFormatMessage();

	const orderRequestStatus = getOrderRequestStatus(orderId);

	const buttonState = (() => {
		switch (orderRequestStatus) {
			case 'none':
				return 'default';
			case 'sent':
				return 'creating_order';
			case 'received':
				return 'success';
			default:
				return 'disabled';
		}
	})();

	return (
		<button
			className={cx(
				styles.checkoutButton,
				buttonState === 'success' && styles.success
			)}
			{...(buttonState === 'default' && {
				onClick: onClick ?? (() => alert('No function provided')),
			})}
			type="submit"
			disabled={
				buttonState === 'disabled' ||
				buttonState === 'creating_order' ||
				buttonState === 'success'
			}
		>
			{buttonState === 'creating_order' ? (
				<span>
					{t({ id: 'basket.orderFinishLoading' })}
					<Spinner
						size="sm"
						className="ms-2"
					/>
				</span>
			) : buttonState === 'success' ? (
				<span>
					{t({ id: 'basket.orderFinished' })}
					<SuccessIcon />
				</span>
			) : (
				<span>{t({ id: 'basket.orderFinish' })}</span>
			)}
		</button>
	);
};
export default ShippingDataButton;
