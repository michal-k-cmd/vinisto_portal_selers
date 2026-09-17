import {
	VinistoHelperDllEnumsOrderOrderState,
	VinistoOrderDllModelsApiOrderOrder,
} from '@/api-types/order-api';
import { Order } from '.';
import { AbstractAdapter } from '../abstract-adapter';
import convertDateToDayjs from '@/utils/convert-date-to-dayjs';
import { unescape } from 'lodash-es';
import {
	VinistoHelperDllEnumsCurrency,
	VinistoHelperDllEnumsLanguage,
} from '../../api-types/product-api';

class OrderAdapter extends AbstractAdapter<
	Order,
	VinistoOrderDllModelsApiOrderOrder
> {
	fromApi(apiData: VinistoOrderDllModelsApiOrderOrder): Order {
		return {
			id: apiData.id,
			customerOrderNumber: apiData.customerOrderNumber ?? '',
			orderNumber: apiData.orderNumber ?? '',
			specSymbol: apiData.specSymbol ?? '',

			states: apiData.states,
			state: apiData.state ?? VinistoHelperDllEnumsOrderOrderState.NONE,
			stateChangeRecords: apiData.stateChangeRecords.map((record) => ({
				state: record.state ?? VinistoHelperDllEnumsOrderOrderState.NONE,
				changeTime: convertDateToDayjs(record.changeTime),
			})),

			orderItems: (apiData.orderItems ?? []).map((item) => ({
				...item,
				bundle: { ...item.bundle, name: unescape(item.bundle.name) },
			})),

			orderTotalDiscount: apiData.orderTotalDiscount ?? 0,

			user: {
				id: apiData.user.id ?? '',
				anonymousId: apiData.user.anonymousId ?? '',
				email: apiData.user.email,
			},

			delivery: apiData.delivery,

			payment: apiData.payment,

			billingAddress: apiData.billingAddress,

			language: apiData.language ?? VinistoHelperDllEnumsLanguage.CZECH,

			discountCoupons: apiData.discountCoupons ?? [],

			hasFeeGenerated: apiData.hasFeeGenerated ?? false,
			isNewsletterActive: apiData.isNewsletterActive ?? false,

			orderPrice: apiData.orderPrice ?? 0,
			orderPriceWithVat: apiData.orderPriceWithVat ?? 0,
			orderCurrency: apiData.orderCurrency ?? VinistoHelperDllEnumsCurrency.CZK,

			orderNote: apiData.orderNote ?? '',
			internalOrderNote: apiData.internalOrderNote ?? '',
			trackingId: apiData.trackingId ?? '',
			utm: {
				campaign: apiData.utm?.campaign ?? '',
				gad: apiData.utm?.gad ?? '',
				gclId: apiData.utm?.gclId ?? '',
				medium: apiData.utm?.medium ?? '',
				source: apiData.utm?.source ?? '',
			},

			//TODO: Remove and check all usages
			shippingPackagingBundle: null,
			addons: apiData.addons ?? null,
			giftCouponPayment: apiData.giftCouponPayment ?? 0,
			giftCouponPaymentWithVat: apiData.giftCouponPaymentWithVat ?? 0,

			platformId: apiData.platformId,
		};
	}
}

export default OrderAdapter;
