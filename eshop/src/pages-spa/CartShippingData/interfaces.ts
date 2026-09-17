import { BILLING_INFO_ID_FIELD, DELIVERY_ADDRESS_ID_FIELD } from './constants';

export type IdField =
	| typeof BILLING_INFO_ID_FIELD
	| typeof DELIVERY_ADDRESS_ID_FIELD;

export interface SavedAddressesIds {
	deliveryAddressId?: string | null;
	billingInfoId?: string | null;
}
