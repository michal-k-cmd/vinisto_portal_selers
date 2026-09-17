import { FIELD_NAME } from './constants';

export interface HouseNumberFormFields {
	[FIELD_NAME]: string;
}

export interface AddressHouseNumberFormProps {
	formKey: string;
	initialValue?: HouseNumberFormFields[typeof FIELD_NAME];
	onSubmit: (values: HouseNumberFormFields) => Promise<HouseNumberFormFields>;
	id: string;
}
