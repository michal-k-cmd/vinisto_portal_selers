export type PPLSelectDetail = {
	accessPointType: 'ParcelShop' | 'ParcelBox';
	activeCardPayment: boolean;
	anchor: {
		left: number;
		top: number;
	};
	capacitySettings: {
		capacity: number | null;
		height: number;
		length: number;
		size: string;
		sizeId: number;
		width: number;
	};
	city: string;
	code: string;
	country: string;
	depot: string;
	depotName: string;
	dhlPsId: string;
	dimensionForced: boolean;
	externalNumbers: {
		type: string;
		value: string;
	};
	gps: {
		latitude: number;
		longitude: number;
	};
	id: number;
	isCapacityAvailable: boolean;
	ktmNote: string;
	name: string;
	openHours: string[];
	parcelshopName: string;
	phone: null | string;
	realCapacitySettings: {
		code: string;
		forYouDeliveryToAccessPoint: string;
		height: number;
		id: number;
		length: number;
		priority: number;
		sizeForWeb: string;
		sizeTypeId: number;
		sizeTypeName: string;
		web: true;
		width: number;
	}[];
	size: null | string;
	street: string;
	title?: string;
	tribalServicePoint: boolean;
	url: string;
	visiblePs: boolean;
	www: string;
	type: string;
	zipCode: string;
};

export type PPLSelectEvent = Event & {
	detail: PPLSelectDetail;
};
