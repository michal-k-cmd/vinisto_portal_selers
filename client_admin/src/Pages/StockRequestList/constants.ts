import { STOCK_REQUEST_STATE } from 'Services/StockRequest/constants';

export const STOCK_REQUEST_STATE_LOCALIZATION_MAP = {
	[STOCK_REQUEST_STATE.SENT]: 'stockRequest.state.waitingForAcceptacion',
	[STOCK_REQUEST_STATE.CANCELLED]: 'stockRequest.state.cancelled',
	[STOCK_REQUEST_STATE.CONFIRMED]: 'stockRequest.state.waitingForTransport',
	[STOCK_REQUEST_STATE.WMS_STOCKED]: 'stockRequest.state.accepted',
};

export const STOCK_REQUEST_STATE_CSS = {
	[STOCK_REQUEST_STATE.SENT]: 'request-state--waiting',
	[STOCK_REQUEST_STATE.CANCELLED]: 'request-state--cancelled',
	[STOCK_REQUEST_STATE.CONFIRMED]: 'request-state--waiting',
	[STOCK_REQUEST_STATE.WMS_STOCKED]: 'request-state--accepted',
};
