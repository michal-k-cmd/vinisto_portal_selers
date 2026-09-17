import {
	IAPIOrderDetailResponse,
	IAPIOrdersListResponse,
	OrderDetailItem,
	OrderListItem,
} from './interfaces';

export const mapApiOrdersList = (
	response: IAPIOrdersListResponse
): OrderListItem[] => {
	const billings = response?.orders ?? [];
	return billings.map((orderItem) => {
		return {
			id: orderItem.id!,
			state: orderItem.state!,
			date: new Date(orderItem.stateChangeRecords[0].changeTime! * 1000),
			orderPriceWithVat: orderItem.orderPriceWithVat,
			orderNumber: orderItem.orderNumber!,
		};
	});
};

export const mapApiOrderDetail = (
	response: IAPIOrderDetailResponse
): OrderDetailItem => {
	const orderItem = response.order!;
	const orderItems = orderItem?.orderItems
		? orderItem?.orderItems.map((orderItem) => {
				return {
					id: orderItem.bundle.id!,
					orderNumber: orderItem.bundle.orderNumber!,
					name: orderItem.bundle.name!,
					quantity: orderItem.quantity,
					price: orderItem.bundle.price.valueWithVat,
				};
		  })
		: [];

	return {
		id: orderItem.id!,
		orderNumber: orderItem.orderNumber!,
		state: orderItem.state!,
		orderItems: orderItems,
		orderPriceWithVat: orderItem.orderPriceWithVat,
		date: new Date(orderItem.stateChangeRecords[0].changeTime! * 1000),
	};
};
