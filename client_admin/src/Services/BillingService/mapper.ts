import {
	IAPIBillingsDetailResponse,
	IAPIBillingsListResponse,
} from './interfaces';
import { BillingDetailItem, BillingListItem } from './interfaces';

export const mapApiBillingDetail = (
	response: IAPIBillingsDetailResponse
): BillingDetailItem => {
	const billingItem = response?.billing;

	const bundles = billingItem?.bundles
		? billingItem?.bundles.map((bundleItem) => {
				return {
					id: bundleItem.id!,
					name: bundleItem.name[0].value!,
					soldPcs: bundleItem.soldPcs!,
					sumPrice: bundleItem.sumPrice!,
					sumFee: bundleItem.sumFee!,
					percentFee: bundleItem.percentFee!,
					totalProfit: bundleItem.totalProfit!,
					lot: bundleItem.bundleLot!,
				};
		  })
		: [];

	return {
		id: billingItem.id!,
		billingNumber: billingItem.billingNumber!,
		timeFrom: new Date(billingItem.timeFrom! * 1000),
		timeTo: new Date(billingItem.timeTo! * 1000),
		date: new Date(billingItem.createdAt! * 1000),
		totalSum: billingItem.totalSum!,
		state: billingItem.state!,
		pdf: billingItem.billingPdf!,
		invoice: billingItem.invoicePdf!,
		bundles: bundles,
	};
};

export const mapApiBillingList = (
	response: IAPIBillingsListResponse
): BillingListItem[] => {
	const billings = response?.billings ?? [];

	return billings.map((billingItem) => {
		return {
			id: billingItem.id!,
			billingNumber: billingItem.billingNumber!,
			timeFrom: new Date(billingItem.timeFrom! * 1000),
			timeTo: new Date(billingItem.timeTo! * 1000),
			date: new Date(billingItem.createdAt! * 1000),
			totalSum: billingItem.totalSum!,
			state: billingItem.state!,
			pdf: billingItem.billingPdf!,
			invoice: billingItem.invoicePdf!,
		};
	});
};
