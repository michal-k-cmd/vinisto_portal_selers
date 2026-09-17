import { EditEmailAction } from './constants';
import { EditEmailReducerAction, IEditEmailState } from './interfaces';

export const editEmailReducer = (
	state: IEditEmailState,
	[type, payload]: EditEmailReducerAction
): IEditEmailState => {
	switch (type) {
		case EditEmailAction.update: {
			return {
				...state,
				email: payload,
			};
		}
	}
};
