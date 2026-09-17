import { DeliveryMethodsPlacement } from 'Components/DeliveryMethods/types';
import { ReactNode } from 'react';

export interface ShippingItemProps
	extends Omit<React.HTMLProps<HTMLDivElement>, 'onClick'> {
	onClick?: () => void;
	isLoading?: boolean;
	isSelected?: boolean;
	title?: string;
	titleContent?: ReactNode;
	priceContent?: ReactNode;
	dateContent?: ReactNode;
	selectable?: boolean;
	handleReset?: () => void;
	dataTestid?: string;
	isPaymentItem?: boolean;
	placement?: DeliveryMethodsPlacement;
	showIcons?: boolean;
	note?: string;
	onSelectDelivery?: () => void;
	isForSubscribersOnly?: boolean;
}
