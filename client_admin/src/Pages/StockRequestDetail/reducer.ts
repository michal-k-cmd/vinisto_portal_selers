import { StockRequestDetailAction } from './constants';
import {
	StockRequestDetailReducerAction,
	StockRequestDetailState,
} from './interfaces';

export const stockRequestDetailReducer = (
	state: StockRequestDetailState,
	[type, payload]: StockRequestDetailReducerAction
): StockRequestDetailState => {
	switch (type) {
		case StockRequestDetailAction.setStockRequestData: {
			return {
				...state,
				stockRequest: payload,
			};
		}
		default: {
			return {
				...state,
			};
		}
	}
};
