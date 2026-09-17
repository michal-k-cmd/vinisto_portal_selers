//export type CartShippingDataFormSchema = Record<any, any>;

export type CartShippingDataFormSchema = {
	isNewsletterActive: boolean;
	useBillingInfo: boolean;
	specSymbol: string;
	userCustomOrderNumber: string;
	name: { delivery: string; billingInfo: string };
	lastname: { delivery: string; billingInfo: string };
	phone: { delivery: string; billingInfo: string };
	street: {
		delivery: {
			value: string;
			selectedItem: any;
		};
		billingInfo: {
			value: string;
			selectedItem: any;
		};
	};
	numberHouse: { delivery: string; billingInfo: string };
	landRegistryNumber: { delivery: string; billingInfo: string };
	city: { delivery: string; billingInfo: string };
	zip: { delivery: string; billingInfo: string };
	email: { delivery: string; billingInfo: string };
	note: { delivery: string; billingInfo: string };
	organization: { delivery: string; billingInfo: string };

	//Only for billingInfo
	ico: { billingInfo: '' };
	dic: { billingInfo: '' };
	accountNumber: { billingInfo: '' };

	billingInfoId?: string | null;
	deliveryAddressId?: string | null;
	isDirty?: boolean;
	useCompanyData?: boolean;
	utm: {
		source: string | null;
		medium: string | null;
		campaign: string | null;
		gad: string | null;
		gclId: string | null;
	};
};
