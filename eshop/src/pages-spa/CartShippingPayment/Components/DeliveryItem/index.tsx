import { useContext } from 'react';
import { VinistoOrderDllModelsApiDeliveryDelivery } from 'vinisto_api_client/src/api-types/order-api';
import ShippingItem from 'pages-spa/CartShippingPayment/Components/ShippingItem';
import { OrderContext } from 'Services/OrderService/context';
import { DeliveryMethodsPlacement } from 'Components/DeliveryMethods/types';

import { useDeliveryItem } from './hooks';

interface DeliveryItemProps
	extends Omit<React.HTMLProps<HTMLDivElement>, 'onClick'> {
	delivery?: VinistoOrderDllModelsApiDeliveryDelivery;
	isLoading?: boolean;
	selectable?: boolean;
	monthName?: boolean;
	dataTestid?: string;
	placement?: DeliveryMethodsPlacement;
	showIcons?: boolean;
	onSelectDelivery?: () => void;
	selectedDelivery?: string | null;
}

const DeliveryItem = ({
	delivery,
	isLoading = false,
	selectable = true,
	monthName,
	dataTestid,
	placement = DeliveryMethodsPlacement.PRODUCT_DETAIL,
	showIcons = true,
	onSelectDelivery,
	selectedDelivery,
	...restProps
}: DeliveryItemProps) => {
	const deliveryProps = useDeliveryItem(delivery, selectable, monthName);
	const orderContext = useContext(OrderContext);
	const handleReset = () => orderContext.setDeliveryMethod(null);

	if (
		typeof selectedDelivery === 'string' &&
		delivery?.id !== selectedDelivery
	) {
		return;
	}

	if (!selectable) {
		return (
			<ShippingItem
				{...restProps}
				{...deliveryProps}
				onClick={() => {
					return;
				}}
				isLoading={isLoading}
				selectable={selectable}
				placement={placement}
				showIcons={showIcons}
			/>
		);
	}

	return (
		<ShippingItem
			{...restProps}
			{...deliveryProps}
			handleReset={handleReset}
			isLoading={isLoading}
			selectable
			dataTestid={dataTestid}
			placement={placement}
			showIcons={showIcons}
			onSelectDelivery={onSelectDelivery}
		/>
	);
};

export default DeliveryItem;
