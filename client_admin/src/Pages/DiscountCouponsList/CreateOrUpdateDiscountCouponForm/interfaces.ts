import {
	PageListStateReducerAction,
	PageListTableRow,
} from 'Hooks/useAdminTable/interfaces';

import { CRUD_MODE } from '../constants';

import { VinistoHelperDllEnumsDiscountCouponDiscountCouponType } from '@/api-types/order-api';

export interface CreateOrUpdateDiscountCouponFormProps {
	mode: keyof typeof CRUD_MODE;
	handleClose: () => void;
	discountCouponId?: string;
	dispatch: React.Dispatch<PageListStateReducerAction<PageListTableRow>>;
}

export interface CreateOrUpdateDiscountCouponFormValues {
	isReusable: 'true' | 'false';
	code: string | null;
	discountCouponType: VinistoHelperDllEnumsDiscountCouponDiscountCouponType;
	validFrom: Date;
	validTo: Date;
	allowedFrom: string | null;
	percentageDiscount: string | null;
	amountDiscount: string | null;
	isAlowedFrom: boolean;
}
