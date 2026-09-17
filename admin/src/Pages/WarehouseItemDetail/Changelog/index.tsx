import { useContext, useEffect } from 'react';
import { CellContext } from '@tanstack/react-table';
import { get } from 'Helpers/lodash';
import { IPageListTableRow } from 'Hooks/useAdminTable/interfaces';
import { dayjsInstance as dayjs } from 'Services/Date';
import { LocalizationContext } from 'Services/LocalizationService';
import AdminListPage from 'Components/AdminListPage';
import { API_METHOD } from 'Hooks/useAdminTable/constants';
import useAdminTable from 'Hooks/useAdminTable';
import useTableSchema from 'Hooks/useTableSchema';
import { AdminTableFilterType } from 'Components/AdminTable/constants';
import { VinistoWarehouseDllModelsApiWarehouseChangeLogWarehouseChangeLog } from 'vinisto_api_client/src/api-types/warehouse-api';

import {
	DEFAULT_SORT,
	WarehouseItemDetailTableFilterColumnMap,
	WarehouseItemDetailTableKeys,
	WarehouseItemDetailTableSortingColumnMap,
} from '../constants';
import { ChangelogListProps } from '../interfaces';
import UserCell from '../UserCell';

import { MOVEMENT_ROW_CLASS } from './constants';

import { ChangeReasonLocaleMap } from '@/warehouse-service/constants';

type ChangeLogItem =
	VinistoWarehouseDllModelsApiWarehouseChangeLogWarehouseChangeLog;
type ChangeLogItemWithChange = ChangeLogItem & {
	quantityChange: number | null;
	rowClassName?: string;
};

type ApiParam = { key: string; value: string | number | boolean };

/**
 * The API only returns `quantity` = the resulting stock count *after* each
 * change, not the movement itself. We derive the movement (how many pieces
 * were actually added/removed) as the difference against the previous record
 * in chronological order. The oldest loaded record has no known predecessor
 * (it may live on the next page), so its movement stays `null` → shown as "—".
 */
const addQuantityChange = (
	items: ChangeLogItem[]
): ChangeLogItemWithChange[] => {
	const byTimeAsc = [...items].sort(
		(a, b) => (a.createdAt ?? 0) - (b.createdAt ?? 0)
	);
	const changeById = new Map<string, number | null>();
	let prevQuantity: number | null = null;
	byTimeAsc.forEach((item) => {
		changeById.set(
			item.id,
			prevQuantity === null ? null : (item.quantity ?? 0) - prevQuantity
		);
		prevQuantity = item.quantity ?? 0;
	});
	return items.map((item) => {
		const quantityChange = changeById.get(item.id) ?? null;
		return {
			...item,
			quantityChange,
			rowClassName:
				quantityChange === null || quantityChange === 0
					? undefined
					: quantityChange > 0
					? MOVEMENT_ROW_CLASS.up
					: MOVEMENT_ROW_CLASS.down,
		};
	});
};

const WarehouseItemDetailChangelog = ({ itemState }: ChangelogListProps) => {
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();

	const getTableSchema = useTableSchema();
	const { fetchData, handlers, state, pageNumber, pageCount } =
		useAdminTable(DEFAULT_SORT);

	const tableSchema = [
		{
			header: `${t({ id: 'admin.warehouseItemDetail.changeLog.id.label' })}`,
			accessorKey: WarehouseItemDetailTableKeys.ID,
			enableColumnFilter: false,
			enableSorting: false,
		},
		{
			header: `${t({ id: 'admin.warehouseItemDetail.changeLog.date.label' })}`,
			accessorKey: WarehouseItemDetailTableKeys.CREATED_AT,
			accessorFn: (row: unknown) => {
				return dayjs
					.unix(get(row, 'createdAt', 0))
					.format(`${t({ id: 'admin.dateTimeFormat' })}`);
			},
			enableColumnFilter: false,
			enableSorting: true,
		},
		{
			header: `${t({
				id: 'admin.warehouseItemDetail.changeLog.quantity.label',
			})}`,
			accessorKey: WarehouseItemDetailTableKeys.QUANTITY,
			enableColumnFilter: false,
			enableSorting: false,
		},
		{
			header: `${t({
				id: 'admin.warehouseItemDetail.changeLog.quantityChange.label',
			})}`,
			accessorKey: 'quantityChange',
			enableColumnFilter: false,
			enableSorting: false,
			cell: (context: CellContext<IPageListTableRow, unknown>) => {
				const change = context.row.original.quantityChange as
					| number
					| null
					| undefined;
				if (change === null || change === undefined) return '—';
				return (
					<span
						className={
							change > 0
								? 'text-success fw-bold'
								: change < 0
								? 'text-danger fw-bold'
								: ''
						}
					>
						{change > 0 ? `+${change}` : `${change}`}
					</span>
				);
			},
		},
		{
			header: `${t({ id: 'admin.warehouseItemDetail.changeLog.user.label' })}`,
			accessorKey: WarehouseItemDetailTableKeys.USER_ID,
			enableColumnFilter: false,
			enableSorting: false,
			cell: (context: CellContext<IPageListTableRow, unknown>) => (
				<UserCell row={context.row.original} />
			),
		},
		{
			header: `${t({
				id: 'admin.warehouseItemDetail.changeLog.orderId.label',
			})}`,
			accessorKey: WarehouseItemDetailTableKeys.ORDER_NUMBER,
			enableSorting: false,
		},
		{
			header: `${t({
				id: 'admin.warehouseItemDetail.changeLog.changeReason.label',
			})}`,
			accessorKey: WarehouseItemDetailTableKeys.CHANGE_REASON,
			accessorFn: (row: unknown) => {
				return t({
					id: `admin.warehouseItemDetail.changeReason.${get(
						row,
						'changeReason',
						''
					)}`,
				});
			},
			enableColumnFilter: true,
			enableSorting: true,
			meta: {
				filterType: AdminTableFilterType.MULTISELECT,
				dropDownFilterOptions: ChangeReasonLocaleMap.map(
					(reason) =>
						[reason.value, `${t({ id: reason.label })}`] as [string, string]
				),
			},
		},
	];

	const adminTableSchema = getTableSchema(tableSchema);

	useEffect(() => {
		const apiParams: ApiParam[] = [
			{ key: 'limit', value: state.limit },
			{ key: 'offset', value: state.offset },
		];

		const sortByColumn = state.sorting[0];

		if (sortByColumn?.id) {
			apiParams.push({
				key: 'SortingColumn',
				value: get(
					WarehouseItemDetailTableSortingColumnMap,
					`[${sortByColumn.id}]`,
					''
				),
			});
			apiParams.push({ key: 'IsSortingDescending', value: sortByColumn.desc });
		}

		state.filters?.forEach(({ id, value }) => {
			if (id === WarehouseItemDetailTableKeys.CHANGE_REASON) {
				if (!(id === 'flags') || !(typeof value === 'string')) return;
				const reasons = value.split(',');
				reasons.forEach((reason: string) => {
					apiParams.push({
						key: WarehouseItemDetailTableFilterColumnMap[id],
						value: reason,
					});
				});
			} else if (Object.hasOwn(WarehouseItemDetailTableFilterColumnMap, id)) {
				apiParams.push({
					key: WarehouseItemDetailTableFilterColumnMap[id],
					value: String(value),
				});
			}
		});

		const fetch = () => {
			if (!itemState.warehouseItem.bundleItem?.id) return;
			fetchData(
				`warehouse-api/change-log/${itemState.warehouseItem.bundleItem.id}`,
				apiParams,
				(payload) => addQuantityChange(payload.changeLogItems ?? []),
				'admin.categoryList.loadingError',
				API_METHOD.GET
			);
		};

		fetch();
	}, [fetchData, state, itemState]);

	return (
		<AdminListPage
			adminTableSchema={adminTableSchema}
			handleOnTableRowClick={() => undefined}
			handlers={handlers}
			state={state}
			pageCount={pageCount}
			pageNumber={pageNumber}
		/>
	);
};

export default WarehouseItemDetailChangelog;
