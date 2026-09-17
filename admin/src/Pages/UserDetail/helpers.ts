import {
	VinistoHelperDllEnumsOrderOrderState,
	VinistoOrderDllModelsApiOrderOrder,
} from 'vinisto_api_client/src/api-types/order-api/';
import { dayjsInstance } from 'Services/Date';
import { round } from 'Helpers/lodash';

import { UserOrdersTableData } from './Components/Table';

import { VinistoAuthDllModelsApiUserCompany } from '@/api-types/user-api';

const PASSWORD_CHARSETS = [
	'abcdefghijkmnopqrstuvwxyz',
	'ABCDEFGHJKLMNPQRSTUVWXYZ',
	'23456789',
] as const;

const secureIndex = (max: number) => {
	const values = new Uint32Array(1);
	const limit = Math.floor(0xffffffff / max) * max;
	for (;;) {
		crypto.getRandomValues(values);
		if (values[0] < limit) return values[0] % max;
	}
};

const generateRandomPassword = (): string => {
	const characters = PASSWORD_CHARSETS.join('');
	const result = PASSWORD_CHARSETS.map(
		(charactersSet) => charactersSet[secureIndex(charactersSet.length)]
	);
	while (result.length < 12)
		result.push(characters[secureIndex(characters.length)]);
	for (let i = result.length - 1; i > 0; i--) {
		const j = secureIndex(i + 1);
		[result[i], result[j]] = [result[j], result[i]];
	}
	return result.join('');
};

const mapUserOrders = (
	data: VinistoOrderDllModelsApiOrderOrder[]
): UserOrdersTableData[] => {
	if (!data || data.length === 0) return [];

	return data.map((order): UserOrdersTableData => {
		const dateCreatedUnix =
			order.stateChangeRecords.find(
				(r) => r.state === VinistoHelperDllEnumsOrderOrderState.CREATED
			)?.changeTime ?? 0;

		const itemCount = order.orderItems
			.map((i) => i.quantity ?? 0)
			.reduce((a, b) => a + b, 0);

		const utmParams = [
			{ key: 'source', value: order.utm?.source },
			{ key: 'medium', value: order.utm?.medium },
			{ key: 'campaign', value: order.utm?.campaign },
			{ key: 'gad', value: order.utm?.gad },
			{ key: 'gclId', value: order.utm?.gclId },
		];

		const campaign = utmParams
			.filter((param) => param.value)
			.map((param) => `${param.key}: ${param.value}`)
			.join('; ');

		const discountCoupons =
			order.discountCoupons?.map((coupon) => ({
				id: coupon.id ?? '',
				code: coupon.code ?? '',
			})) ?? [];

		return {
			id: order.id,
			number: order.orderNumber ?? '',
			dateCreated: dayjsInstance.unix(dateCreatedUnix),
			value: round(order.orderPriceWithVat ?? 0, 2),
			itemCount,
			campaign,
			discountCoupons,
		};
	});
};

const mapB2bCustomerToString = (
	customer: VinistoAuthDllModelsApiUserCompany
) => {
	const companyName =
		customer.validationData?.companyName ?? customer.billingAddress?.company;
	const companyUserName = `${customer.firstName} ${customer.surname}`;
	const companyAddress = `${customer.billingAddress?.street} ${
		customer.billingAddress?.landRegistryNumber
	}${
		customer.billingAddress?.houseNumber
			? `/${customer.billingAddress?.houseNumber}`
			: ``
	} ${customer.billingAddress?.city}`;

	return `${companyName ?? companyUserName}, ${companyAddress}`;
};

export { generateRandomPassword, mapUserOrders, mapB2bCustomerToString };
