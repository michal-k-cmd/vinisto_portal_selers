import { AutomaticCoupon } from 'Services/ApiService/Adapters/AutomaticCouponAdapter';

type AutomaticCouponFormErrors = {
	[K in keyof AutomaticCoupon]?: string;
};

export type { AutomaticCouponFormErrors };
