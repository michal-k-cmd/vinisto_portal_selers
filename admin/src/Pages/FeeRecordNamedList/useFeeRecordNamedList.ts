import { useContext, useEffect } from 'react';
import { get } from 'Helpers/lodash';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { API_METHOD } from 'Hooks/useAdminTable/constants';
import useAdminTable from 'Hooks/useAdminTable';
import { RANGE_DATE_FILTER_DELIMITER } from 'Components/AdminTable/Filters/RangeDate/constants';

import {
	FeeRecordListTableKeys,
	FILTER_COLUMN_MAP,
	SORTING_COLUMN_MAP,
} from '../FeeRecordList/constants';

type QueryArgument = {
	key: string;
	value: string | number | boolean;
};

/**
 * Data-fetching logic for the named fee-record list, kept separate from the
 * table definition / rendering. Wraps `useAdminTable`, builds the query params
 * from the current sorting/filter state and fetches `supplier-api/fee-records`.
 */
const useFeeRecordNamedList = () => {
	const authenticationContext = useContext(AuthenticationContext);
	const adminTable = useAdminTable();
	const { fetchData, state } = adminTable;

	useEffect(() => {
		const apiParams: QueryArgument[] = [
			{ key: 'limit', value: state.limit },
			{ key: 'offset', value: state.offset },
			{
				key: 'UserLoginHash',
				value: authenticationContext.vinistoUser?.loginHash ?? '',
			},
		];

		const [sortByColumn] = state.sorting;

		if (Object.hasOwn(SORTING_COLUMN_MAP, sortByColumn?.id)) {
			apiParams.push({
				key: 'SortingColumn',
				value: SORTING_COLUMN_MAP[sortByColumn.id],
			});
			apiParams.push({ key: 'IsSortingDescending', value: sortByColumn.desc });
		}

		state.filters?.forEach(({ id, value }) => {
			if (
				id === FeeRecordListTableKeys.CREATED_AT &&
				typeof value === 'string'
			) {
				const [dateFrom = '', dateTo = ''] = value.split(
					RANGE_DATE_FILTER_DELIMITER
				);
				apiParams.push({ key: 'TimeFrom', value: dateFrom });
				apiParams.push({ key: 'TimeTo', value: dateTo });
			} else if (Object.hasOwn(FILTER_COLUMN_MAP, id)) {
				apiParams.push({ key: FILTER_COLUMN_MAP[id], value: String(value) });
			}
		});

		fetchData(
			'supplier-api/fee-records',
			apiParams,
			(payload) => get(payload, 'feeRecords', []) ?? [],
			'admin.feeRecordList.loadingError',
			API_METHOD.GET
		);
	}, [fetchData, state, authenticationContext]);

	return adminTable;
};

export default useFeeRecordNamedList;
