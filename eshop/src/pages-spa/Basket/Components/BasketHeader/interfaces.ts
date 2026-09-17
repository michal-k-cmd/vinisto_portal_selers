export interface BasketHeaderProps {
	step: 'basket' | 'shippingAndPayment' | 'deliveryDetail';
	basketItemsQuantity: number;
}
