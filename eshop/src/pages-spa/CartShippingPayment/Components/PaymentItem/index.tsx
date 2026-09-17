import { useContext } from 'react';
import { VinistoOrderDllModelsApiPaymentPayment } from 'vinisto_api_client/src/api-types/order-api';
import { OrderContext } from 'Services/OrderService/context';
import { DeliveryMethodsPlacement } from 'Components/DeliveryMethods/types';

import ShippingItem from '../ShippingItem';

import { usePaymentItem } from './hooks';

const PaymentItem = ({
	payment,
	isLoading = false,
	className,
	dataTestid,
	disabled,
}: {
	payment: VinistoOrderDllModelsApiPaymentPayment;
	isLoading?: boolean;
	className?: string;
	dataTestid?: string;
	disabled?: boolean;
}) => {
	const paymentProps = usePaymentItem(payment);
	const orderContext = useContext(OrderContext);
	const handleReset = () => orderContext.setPaymentMethod(null);

	return (
		<ShippingItem
			{...paymentProps}
			isLoading={isLoading}
			className={className}
			selectable
			handleReset={handleReset}
			dataTestid={dataTestid}
			isPaymentItem
			placement={DeliveryMethodsPlacement.CART}
			disabled={disabled}
		/>
	);
};

export default PaymentItem;
