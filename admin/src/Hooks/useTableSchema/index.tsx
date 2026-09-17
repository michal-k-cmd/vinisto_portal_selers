import { useCallback } from 'react';
import { IPageListTableRow } from 'Hooks/useAdminTable/interfaces';

import { TableSchema } from './interfaces';

const useTableSchema = <T extends IPageListTableRow = IPageListTableRow>() => {
	return useCallback((tableSchema: TableSchema<T>) => {
		return tableSchema;
	}, []);
};

export default useTableSchema;
