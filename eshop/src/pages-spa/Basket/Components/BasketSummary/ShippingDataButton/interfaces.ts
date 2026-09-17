export type ShippingDataButtonState =
	| 'default'
	| 'disabled'
	| 'creating_order'
	| 'success';

export interface ShippingDataButtonProps {
	onClick?: () => void;
}
