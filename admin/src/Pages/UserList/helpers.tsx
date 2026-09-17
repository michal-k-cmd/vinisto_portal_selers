import { map } from 'Helpers/lodash';
import { IDbEntity, IPageListTableRow } from 'Hooks/useAdminTable/interfaces';

export const prepareData = (payload: IDbEntity[]) => {
	return map(payload, (entity): IPageListTableRow => {
		return {
			...entity,
			// expandedContent: (row) => <div>{row.id}</div>,
		};
	});
};
