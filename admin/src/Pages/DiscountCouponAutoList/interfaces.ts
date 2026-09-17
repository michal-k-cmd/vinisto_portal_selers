import { IPageListTableRow } from 'Hooks/useAdminTable/interfaces';
import { AutomaticCoupon } from 'Services/ApiService/Adapters/AutomaticCouponAdapter';

interface DiscountCouponAutoTableRow
	extends IPageListTableRow,
		Omit<AutomaticCoupon, 'id'> {}

export type { DiscountCouponAutoTableRow };
