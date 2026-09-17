import { Dispatch, SetStateAction } from 'react';

export interface IAddressAddProps {
	handleOnCreate?: (id: string | null | undefined) => void;
	elementType: string;
	className?: string;
	setBillingState?: Dispatch<
		SetStateAction<{
			loading: boolean;
			loaded: boolean;
			billingInfos: Record<any, any>[];
		}>
	>;
	setAddressesState?: Dispatch<
		SetStateAction<{
			loading: boolean;
			loaded: boolean;
			addresses: Record<any, any>[];
		}>
	>;
}
