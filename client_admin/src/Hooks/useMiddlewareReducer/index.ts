/**
 * Based on https://www.npmjs.com/package/use-middleware-reducer
 * (it was not possible to build the original version due to missing types)
 *
 * @author https://github.com/gvergnaud/
 */
import React from 'react';

import { Dispatch, Middleware } from './types';

export const useMiddlewareReducer = <A, B>(
	reducer: (state: A, action: B) => A,
	initialState: A | (() => A),
	middlewares: Middleware<A>[] = []
): [A, Dispatch<B>] => {
	const [state, setState] = React.useState(initialState);
	const stateRef = React.useRef(state);

	const dispatch = React.useMemo(() => {
		let dispatch: Dispatch = () => {
			throw new Error(
				`Dispatching while constructing your middleware is not allowed. ` +
					`Other middleware would not be applied to this dispatch.`
			);
		};

		const middlewareAPI = {
			getState: () => stateRef.current,
			dispatch: (action: any) => dispatch(action),
		};

		const localDispatch = (action: any) => {
			stateRef.current = reducer(stateRef.current, action);
			setState(stateRef.current);
		};

		dispatch = middlewares
			.map((middleware) => middleware(middlewareAPI))
			.reduceRight((acc, middleware) => middleware(acc), localDispatch);

		return dispatch;
	}, []);

	return [state, dispatch];
};

export default useMiddlewareReducer;
