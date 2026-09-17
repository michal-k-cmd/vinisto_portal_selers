import {
	createContext,
	Dispatch,
	ReactNode,
	useContext,
	useReducer,
} from 'react';
import { VinistoProductDllModelsApiBundleBundle } from 'vinisto_api_client/src/api-types/product-api';

export const BundleContextStates = {
	IDLE: 'IDLE',
	LOADING: 'LOADING',
	LOADED: 'LOADED',
} as const;

interface BundleContextState {
	priceRangeOne: VinistoProductDllModelsApiBundleBundle[];
	priceRangeTwo: VinistoProductDllModelsApiBundleBundle[];
	priceRangeThree: VinistoProductDllModelsApiBundleBundle[];
	currentState: keyof typeof BundleContextStates;
}

const initialState: BundleContextState = {
	priceRangeOne: [],
	priceRangeTwo: [],
	priceRangeThree: [],
	currentState: BundleContextStates.IDLE,
};

export const BundleContextActions = {
	SET_PRICE_RANGE_ONE: 'SET_PRICE_RANGE_ONE',
	SET_PRICE_RANGE_TWO: 'SET_PRICE_RANGE_TWO',
	SET_PRICE_RANGE_THREE: 'SET_PRICE_RANGE_THREE',
	SET_INITIAL_STATE: 'SET_INITIAL_STATE',
	SET_PRICES: 'SET_PRICES',
	SET_CURRENT_STATE: 'SET_CURRENT_STATE',
} as const;

export type Action =
	| {
			type: typeof BundleContextActions.SET_PRICE_RANGE_ONE;
			payload: VinistoProductDllModelsApiBundleBundle[];
	  }
	| {
			type: typeof BundleContextActions.SET_PRICE_RANGE_TWO;
			payload: VinistoProductDllModelsApiBundleBundle[];
	  }
	| {
			type: typeof BundleContextActions.SET_PRICE_RANGE_THREE;
			payload: VinistoProductDllModelsApiBundleBundle[];
	  }
	| {
			type: typeof BundleContextActions.SET_PRICES;
			payload: {
				priceRangeOne: VinistoProductDllModelsApiBundleBundle[];
				priceRangeTwo: VinistoProductDllModelsApiBundleBundle[];
				priceRangeThree: VinistoProductDllModelsApiBundleBundle[];
			};
	  }
	| {
			type: typeof BundleContextActions.SET_CURRENT_STATE;
			payload: keyof typeof BundleContextStates;
	  }
	| {
			type: typeof BundleContextActions.SET_INITIAL_STATE;
	  };

const bundleReducer = (
	state: BundleContextState,
	action: Action
): BundleContextState => {
	switch (action.type) {
		case BundleContextActions.SET_PRICE_RANGE_ONE:
			return { ...state, priceRangeOne: action.payload };
		case BundleContextActions.SET_PRICE_RANGE_TWO:
			return { ...state, priceRangeTwo: action.payload };
		case BundleContextActions.SET_PRICE_RANGE_THREE:
			return { ...state, priceRangeThree: action.payload };
		case BundleContextActions.SET_PRICES:
			return {
				...state,
				priceRangeOne: action.payload.priceRangeOne,
				priceRangeTwo: action.payload.priceRangeTwo,
				priceRangeThree: action.payload.priceRangeThree,
			};
		case BundleContextActions.SET_CURRENT_STATE:
			return { ...state, currentState: action.payload };
		case BundleContextActions.SET_INITIAL_STATE:
			return initialState;
		default:
			return state;
	}
};

const BundleContext = createContext<{
	state: BundleContextState;
	dispatch: Dispatch<Action>;
}>({
	state: initialState,
	dispatch: () => undefined,
});

const BundleProvider = ({ children }: { children: ReactNode }) => {
	const [state, dispatch] = useReducer(bundleReducer, initialState);

	return (
		<BundleContext.Provider value={{ state, dispatch }}>
			{children}
		</BundleContext.Provider>
	);
};

export const useBundleContext = () => useContext(BundleContext);

export default BundleProvider;
