import { PageListTableRow } from 'Hooks/useAdminTable/interfaces';

import { AdminTableReducerAction, AdminTableState } from './interfaces';
import { AdminTableAction } from './constants';

export const adminTableReducer = <
	T extends PageListTableRow = PageListTableRow
>(
	state: AdminTableState<T>,
	action: AdminTableReducerAction<T>
): AdminTableState<T> => {
	const [type, payload] = action;
	switch (type) {
		case AdminTableAction.setIsError:
			return {
				...state,
				isError: payload,
			};
		case AdminTableAction.setIsLoading:
			return {
				...state,
				isLoading: payload,
			};
		case AdminTableAction.setTableData:
			return {
				...state,
				tableData: payload,
			};
		case AdminTableAction.setAll:
			return {
				...state,
				...payload,
			};
	}
};
