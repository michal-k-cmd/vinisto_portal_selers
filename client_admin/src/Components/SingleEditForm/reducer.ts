import { SingleEditFormAction } from './constants';
import { SingleEditFormReducerAction, SingleEditFormState } from './interfaces';

export const SingleEditFormReducer = (
	state: SingleEditFormState,
	[type, payload]: SingleEditFormReducerAction
): SingleEditFormState => {
	switch (type) {
		case SingleEditFormAction.setAll: {
			return {
				...state,
				...payload,
			};
		}
		case SingleEditFormAction.setEditEnabledField: {
			return {
				...state,
				editEnabledField: payload,
			};
		}
		case SingleEditFormAction.setIsLoading: {
			return {
				...state,
				isLoading: payload,
			};
		}
		case SingleEditFormAction.setIsDirty: {
			return {
				...state,
				isDirty: payload,
			};
		}
	}
};
