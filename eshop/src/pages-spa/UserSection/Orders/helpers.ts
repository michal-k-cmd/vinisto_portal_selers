import { last, map, split, trim } from 'lodash-es';
import {
	VinistoHelperDllEnumsInvoiceInvoiceState,
	VinistoHelperDllEnumsInvoiceInvoiceType,
	VinistoOrderDllModelsApiInvoiceInvoice,
	VinistoOrderDllModelsApiOrderStateChangeRecord,
	VinistoOrderDllModelsApiReturnDataOrdersReturn,
	VinistoOrderDllModelsApiReturnDataOrdersWithInvoiceReturn,
	VinistoOrderDllModelsApiReturnDataPdfReturn,
} from 'vinisto_api_client/src/api-types/order-api';
import api from 'vinisto_api_client/src/api';
import { dayjsInstance as dayjs } from 'vinisto_shared';

import { OrderSortingColumn } from './constants';

import { VinistoHelperDllEnumsOrderOrderState } from '@/api-types/order-api';

export const fetchOrders = (
	userLoginHash: string,
	userIds: string,
	page = 1,
	limit: number,
	sortingColumn = OrderSortingColumn.ID,
	isDescending = false,
	isOverdue = false
) => {
	if (!userLoginHash) throw new Error('User login hash has to be provided.');

	const offset = (page - 1) * limit;

	if (isOverdue)
		return api
			.get<VinistoOrderDllModelsApiReturnDataOrdersWithInvoiceReturn>(
				'order-api/orders/orders-with-non-paid-invoice-overdue',
				{
					Offset: offset,
					Limit: limit,
					UserLoginHash: userLoginHash,
					IsSortingDescending: isDescending,
				}
			)
			.then((res) => ({
				...res,
				orders: (res.orders ?? []).map((partialOrder) => ({
					...partialOrder,
					id: partialOrder.id ?? '',
					stateChangeRecords: partialOrder.stateChangeRecords ?? [],
					orderItems: [],
					addons: [],
					delivery: null,
				})),
			}));

	return api.get<VinistoOrderDllModelsApiReturnDataOrdersReturn>(
		'order-api/orders',
		{
			Offset: offset,
			Limit: limit,
			UserLoginHash: userLoginHash,
			UserIds: userIds,
			SortingColumn: sortingColumn,
			IsSortingDescending: isDescending,
		}
	);
};

export interface LocalizedOrderState {
	text: string;
	color: string;
}

export const getLocalizedOrderState = (
	orderState: string
): LocalizedOrderState => {
	const latestState = last(
		map(split(orderState, ','), (state: string) => trim(state))
	);

	if (latestState === VinistoHelperDllEnumsOrderOrderState.PAID) {
		return {
			text: 'userSection.order.state.paid',
			color: '#68A910',
		};
	}
	if (latestState === VinistoHelperDllEnumsOrderOrderState.CANCELLED) {
		return {
			text: 'userSection.order.state.cancelled',
			color: 'red',
		};
	}
	if (latestState === VinistoHelperDllEnumsOrderOrderState.IN_WMS) {
		return {
			text: 'userSection.order.state.inWms',
			color: '#C7A859',
		};
	}
	if (latestState === VinistoHelperDllEnumsOrderOrderState.WMS_ACCEPTED) {
		return {
			text: 'userSection.order.state.wmsAccepted',
			color: '#C7A859',
		};
	}
	if (latestState === VinistoHelperDllEnumsOrderOrderState.WMS_INCOMPLETE) {
		return {
			text: 'userSection.order.state.wmsIncomplete',
			color: '#C7A859',
		};
	}
	if (latestState === VinistoHelperDllEnumsOrderOrderState.WMS_READY) {
		return {
			text: 'userSection.order.state.wmsReady',
			color: '#C7A859',
		};
	}
	if (latestState === VinistoHelperDllEnumsOrderOrderState.SENT) {
		return {
			text: 'userSection.order.state.sent',
			color: '#68A910',
		};
	}
	if (latestState === VinistoHelperDllEnumsOrderOrderState.DELIVERED) {
		return {
			text: 'userSection.order.state.delivered',
			color: '#68A910',
		};
	}
	if (latestState === VinistoHelperDllEnumsOrderOrderState.DONE) {
		return {
			text: 'userSection.order.state.done',
			color: '#68A910',
		};
	}

	if (latestState === VinistoHelperDllEnumsOrderOrderState.RETURNED) {
		return {
			text: 'userSection.order.state.returned',
			color: '#68A910',
		};
	}
	if (latestState === VinistoHelperDllEnumsOrderOrderState.REFUNDED) {
		return {
			text: 'userSection.order.state.refunded',
			color: '#68A910',
		};
	}
	if (
		latestState === VinistoHelperDllEnumsOrderOrderState.REVERT_FINANCE_AND_FEES
	) {
		return {
			text: 'userSection.order.state.revertFinanceAndFees',
			color: 'red',
		};
	}
	if (latestState === VinistoHelperDllEnumsOrderOrderState.LOSS_EVENT) {
		return {
			text: 'userSection.order.state.lossEvent',
			color: 'red',
		};
	}
	if (latestState === VinistoHelperDllEnumsOrderOrderState.RETURNING_GOODS) {
		return {
			text: 'userSection.order.state.returningGoods',
			color: 'red',
		};
	}
	if (latestState === VinistoHelperDllEnumsOrderOrderState.CREATED) {
		return {
			text: 'userSection.order.state.created',
			color: '#C7A859',
		};
	}
	return { text: 'userSection.order.state.unknown', color: '#C7A859' };
};

export const getCreationDate = (
	stateChangeRecord: VinistoOrderDllModelsApiOrderStateChangeRecord[]
) => {
	const changeTime = (stateChangeRecord ?? []).find(
		(record) => record.state === VinistoHelperDllEnumsOrderOrderState.CREATED
	)?.changeTime;

	return changeTime ? dayjs.unix(changeTime).format('D. M. YYYY') : null;
};

export const getIsInvoiceOverdue = (
	invoice: VinistoOrderDllModelsApiInvoiceInvoice
) => {
	if (
		![
			VinistoHelperDllEnumsInvoiceInvoiceType.Invoice,
			VinistoHelperDllEnumsInvoiceInvoiceType.Proforma,
		].includes(invoice.type) ||
		invoice.state !== VinistoHelperDllEnumsInvoiceInvoiceState.Created
	)
		return false;

	const invoiceDueDate = dayjs.unix(invoice.invoiceDueTo);

	return dayjs().isAfter(invoiceDueDate, 'day');
};

export const getPdfDocument = async (
	orderId: string,
	documentUrl: string,
	userLoginHash: string
) => {
	if (userLoginHash && orderId && documentUrl) {
		const response = await api.get<VinistoOrderDllModelsApiReturnDataPdfReturn>(
			`order-api/invoices/order/${orderId}/get-pdf-document`,
			{
				UserLoginHash: userLoginHash,
				DocumentUrl: documentUrl,
			}
		);
		return response.pdfData;
	}
};

export const openPdf = (data: string) => {
	const byteCharacters = window.atob(data);
	const byteNumbers = new Array(byteCharacters.length);
	for (let i = 0; i < byteCharacters.length; i += 1) {
		byteNumbers[i] = byteCharacters.charCodeAt(i);
	}
	const byteArray = new Uint8Array(byteNumbers);
	const file = new Blob([byteArray], { type: 'application/pdf;base64' });
	const fileURL = URL.createObjectURL(file);

	window.open(fileURL);
};
