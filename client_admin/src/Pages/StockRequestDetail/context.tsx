import { createContext, FC, ReactNode, Suspense } from 'react';
import { Await, useLoaderData, useNavigate, useParams } from 'react-router-dom';
import { Middleware } from 'Hooks/useMiddlewareReducer/types';
import useMiddlewareReducer from 'Hooks/useMiddlewareReducer';
import LoadingSpinner from 'Components/Preloader/Components/LoadingSpinner';

import {
	StockRequestDetailContextValue,
	StockRequestDetailLoaderReturnValue,
	StockRequestDetailReducerAction,
	StockRequestDetailState,
} from './interfaces';
import { StockRequestDetailAction } from './constants';
import { stockRequestDetailReducer } from './reducer';
import LoadError from './Components/LoadError';

const defaultState = {
	stockRequest: null,
};

export const StockRequestDetailContext =
	createContext<StockRequestDetailContextValue>({
		...defaultState,
		dispatch: () => {},
	});

const StockRequestDetailContextProvider: FC<{ children: ReactNode }> = ({
	children,
}) => {
	const { stockRequestPromise } =
		useLoaderData() as StockRequestDetailLoaderReturnValue;
	const { id: stockRequestId } = useParams();
	const navigate = useNavigate();

	const stockRequestDetailMiddleware: Middleware<
		StockRequestDetailState,
		StockRequestDetailReducerAction
	> = () => (next) => async (action) => {
		const [type] = action;
		switch (type) {
			case StockRequestDetailAction.reload:
				navigate(`/stock-request-detail/${stockRequestId}`);
				return;
		}
		return next(action);
	};

	const [state, dispatch] = useMiddlewareReducer(
		stockRequestDetailReducer,
		{
			...defaultState,
		},
		[stockRequestDetailMiddleware]
	);

	return (
		<Suspense
			fallback={
				<div className="h-100 d-flex align-items-center justify-content-center">
					<LoadingSpinner />
				</div>
			}
		>
			<Await
				resolve={stockRequestPromise}
				errorElement={<LoadError />}
			>
				{(stockRequest) => (
					<StockRequestDetailContext.Provider
						value={{
							...state,
							stockRequest: state.stockRequest ?? stockRequest,
							dispatch,
						}}
					>
						{children}
					</StockRequestDetailContext.Provider>
				)}
			</Await>
		</Suspense>
	);
};

export default StockRequestDetailContextProvider;
