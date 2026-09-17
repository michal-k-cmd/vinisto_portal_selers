interface EHubOrderItem {
	id: string;
	masterType: string;
	category: string;
	name: string;
	unitPrice: string;
	quantity: string;
}

interface EHubRequest {
	visitId: string;
	orderId: string;
	orderAmount: string;
	orderItems?: EHubOrderItem[];
	currency: string;
	couponCode?: string;
	couponDiscount?: string;
	paymentMethod?: string;
	newCustomer?: string;
}

export type { EHubRequest };
