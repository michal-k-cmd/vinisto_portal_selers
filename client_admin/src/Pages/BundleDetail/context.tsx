import { createContext, FC, ReactNode, Suspense } from 'react';
import { Await, useLoaderData } from 'react-router-dom';
import useMiddlewareReducer from 'Hooks/useMiddlewareReducer';
import LoadingSpinner from 'Components/Preloader/Components/LoadingSpinner';

import {
	BundleDetailContextValue,
	BundleDetailLoaderReturnValue,
} from './interfaces';
import { bundleDetailReducer } from './reducer';
import LoadError from './Components/LoadError';

const defaultState = {
	bundle: null,
	discounts: Promise.resolve([]),
};

export const BundleDetailContext = createContext<BundleDetailContextValue>({
	...defaultState,
	dispatch: () => {},
});

const BundleDetailContextProvider: FC<{ children: ReactNode }> = ({
	children,
}) => {
	const { bundlePromise } = useLoaderData() as BundleDetailLoaderReturnValue;

	const [state, dispatch] = useMiddlewareReducer(
		bundleDetailReducer,
		defaultState,
		[]
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
				resolve={bundlePromise}
				errorElement={<LoadError />}
			>
				{(bundle) => (
					<BundleDetailContext.Provider
						value={{
							...state,
							bundle: state.bundle ?? bundle,
							dispatch,
						}}
					>
						{children}
					</BundleDetailContext.Provider>
				)}
			</Await>
		</Suspense>
	);
};

export default BundleDetailContextProvider;
