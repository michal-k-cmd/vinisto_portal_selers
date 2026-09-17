import { createContext, useContext, useReducer } from 'react';
import { unstable_usePrompt } from 'react-router-dom';
import { LocalizationContext } from 'Services/LocalizationService';

import {
	SingleEditFormContextProps,
	SingleEditFormContextValues,
} from './interfaces';
import { SingleEditFormReducer } from './reducer';

const defaultContextValue: SingleEditFormContextValues = {
	editEnabledField: null,
	isLoading: false,
	isDirty: false,
	dispatch: () => {},
};

export const SingleEditFormContext =
	createContext<SingleEditFormContextValues>(defaultContextValue);

const SingleEditFormContextProvider = ({
	children,
}: SingleEditFormContextProps) => {
	const [state, dispatch] = useReducer(
		SingleEditFormReducer,
		defaultContextValue
	);
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();

	const contextValues = {
		...state,
		dispatch,
	};

	const isDirty =
		state.editEnabledField !== null && !state.isLoading && state.isDirty;

	unstable_usePrompt({
		message: `${t({ id: 'admin.modal.leavingPage.question' })}`,
		when: isDirty,
	});

	return (
		<SingleEditFormContext.Provider value={contextValues}>
			{children}
		</SingleEditFormContext.Provider>
	);
};

export default SingleEditFormContextProvider;
