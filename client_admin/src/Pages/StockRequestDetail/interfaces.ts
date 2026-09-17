import { Dispatch } from 'react';
import { StockRequestType } from 'Services/StockRequest/interfaces';

import { StockRequestDetailAction } from './constants';

export interface StockRequestDetailState {
	stockRequest: StockRequestType | null;
}

export type SetStockRequestDataAction = [
	StockRequestDetailAction.setStockRequestData,
	StockRequestDetailState['stockRequest']
];

export type ReloadAction = [StockRequestDetailAction.reload];

export type StockRequestDetailReducerAction =
	| SetStockRequestDataAction
	| ReloadAction;

export interface StockRequestDetailLoaderReturnValue
	extends Record<string, any> {
	stockRequestPromise: Promise<StockRequestDetailState['stockRequest']>;
}

export interface StockRequestDetailContextValue
	extends StockRequestDetailState {
	dispatch: Dispatch<StockRequestDetailReducerAction>;
}
