import useTableSchema from 'Hooks/useTableSchema';
import { useContext, useMemo } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';
import { TableSchema } from 'Hooks/useTableSchema/interfaces';
import { Device } from 'Services/DeviceService/constants';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import { AdminTableFilterType } from 'Components/AdminTable/constants';
import { DropdownFilterProps } from 'Components/AdminTable/Filters/Dropdown/interfaces';
import { Link } from 'react-router-dom';
import { IN_STOCK_COLUMN } from 'Pages/BundleList/constants';
import { getLocalizedPrice } from 'vinisto_shared/src/price/get-localized-price';
import { FALLBACK_CURRENCY } from 'Components/Modal/CreateDiscount/constants';

import {
	SET_LIST_COLUMN,
	SetListTableRow,
	SetTypeWithoutNone,
} from './interfaces';
import {
	SET_STATE_LOCALIZATION_MAP,
	SET_TYPE_LOCALIZATION_MAP,
} from './constants';

import {
	// VinistoHelperDllEnumsBundleBundleState,
	VinistoHelperDllEnumsBundleSetType,
} from '@/api-types/product-api';

export const useSetListTableSchema = () => {
	const { useFormatMessage } = useContext(LocalizationContext);
	const getTableSchema = useTableSchema<SetListTableRow>();

	const getLocalizedValue = useLocalizedValue();

	const t = useFormatMessage();

	//const stateFilterOptions: DropdownFilterProps['options'] = useMemo(
	//	() =>
	//		Object.values(VinistoHelperDllEnumsBundleBundleState).map((state) => [
	//			String(state),
	//			`${t({ id: SET_STATE_LOCALIZATION_MAP[state] })}`,
	//		]),
	//	[t]
	//);

	const typeFilterOptions: DropdownFilterProps['options'] = useMemo(
		() =>
			Object.values(VinistoHelperDllEnumsBundleSetType)
				.filter((value) => value !== VinistoHelperDllEnumsBundleSetType.None)
				.map((state) => [
					String(state),
					`${t({
						id: SET_TYPE_LOCALIZATION_MAP[state as SetTypeWithoutNone],
						defaultMessage: '',
					})}`,
				]),
		[t]
	);

	const tableSchema: TableSchema<SetListTableRow> = [
		{
			header: `${t({
				id: 'set.header.name',
				defaultMessage: 'Název setu',
			})}`,
			id: SET_LIST_COLUMN.NAME,
			accessorFn: (row) => getLocalizedValue(row.name),
			devices: [Device.MOBILE, Device.TABLET, Device.DESKTOP],
		},
		{
			header: `${t({
				id: 'set.header.type',
				defaultMessage: 'Typ setu',
			})}`,
			id: SET_LIST_COLUMN.TYPE,
			accessorFn: (ctx) => ctx.setType,
			cell: ({ row }) => {
				if (
					!row.original.setType ||
					row.original.setType === VinistoHelperDllEnumsBundleSetType.None
				)
					return '';

				return t({ id: SET_TYPE_LOCALIZATION_MAP[row.original.setType] });
			},
			devices: [Device.MOBILE, Device.TABLET, Device.DESKTOP],
			meta: {
				filterType: AdminTableFilterType.DROPDOWN,
				filterOptions: typeFilterOptions,
			},
		},
		{
			header: `${t({
				id: 'set.header.price',
				defaultMessage: 'Cena',
			})}`,
			id: SET_LIST_COLUMN.PRICE,
			accessorFn: (ctx) => ctx.totalSetPrice,
			cell: (ctx) =>
				getLocalizedPrice({
					price: ctx.row.getValue(SET_LIST_COLUMN.PRICE),
					currency: FALLBACK_CURRENCY,
				}),
			enableColumnFilter: false,
			enableSorting: true,
			devices: [Device.MOBILE, Device.TABLET, Device.DESKTOP],
		},
		{
			header: `${t({ id: 'bundleList.inStock' })}`,
			id: IN_STOCK_COLUMN,
			accessorFn: (ctx) => ctx.availableCount,
			enableSorting: true,
			enableColumnFilter: false,
			devices: [Device.MOBILE, Device.TABLET, Device.DESKTOP],
		},
		{
			header: `${t({
				id: 'set.header.state',
				defaultMessage: 'Stav',
			})}`,
			id: SET_LIST_COLUMN.STATE,
			accessorFn: (ctx) => ctx.states,
			cell: ({ row }) => {
				if (!row.original.states?.length) return '';

				const state = row.original.states[0];

				return (
					<span style={{ color: '#c7a859' }}>
						{t({ id: SET_STATE_LOCALIZATION_MAP[state] })}
					</span>
				);
			},
			devices: [Device.MOBILE, Device.TABLET, Device.DESKTOP],
			enableColumnFilter: false,
		},
		{
			header: '',
			id: 'placeholder',
			cell: (entity) => (
				<div className="text-end">
					<Link
						to={`/set-detail/${entity.row.id}`}
						className="btn btn-primary"
					>
						{t({ id: 'bundleList.detailLink' })}
					</Link>
				</div>
			),
			devices: [Device.TABLET, Device.DESKTOP],
		},
	];

	return getTableSchema(tableSchema);
};
