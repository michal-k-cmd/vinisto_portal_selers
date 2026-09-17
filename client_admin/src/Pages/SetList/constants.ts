import { SET_LIST_COLUMN, SetTypeWithoutNone } from './interfaces';

import {
	VinistoHelperDllEnumsBundleBundleState,
	VinistoHelperDllEnumsBundleSetType,
	VinistoHelperDllEnumsBundleSortableColumnsSet,
} from '@/api-types/product-api';

export const SET_API = 'product-api/bundles/get-bundles';

export const COLUMN_PROPERTIES = {
	[SET_LIST_COLUMN.ID]: {
		filter: null,
		sorting: VinistoHelperDllEnumsBundleSortableColumnsSet.ID,
	},
	[SET_LIST_COLUMN.NAME]: {
		filter: 'BundleName',
		sorting: VinistoHelperDllEnumsBundleSortableColumnsSet.NAME,
	},
	[SET_LIST_COLUMN.PRICE]: {
		filter: '',
		sorting: VinistoHelperDllEnumsBundleSortableColumnsSet.PRICE,
	},
	[SET_LIST_COLUMN.TYPE]: {
		filter: 'SetType',
		sorting: VinistoHelperDllEnumsBundleSortableColumnsSet.SET_TYPE,
	},
	[SET_LIST_COLUMN.IN_STOCK]: {
		filter: '',
		sorting: VinistoHelperDllEnumsBundleSortableColumnsSet.WAREHOUSE_AMOUNT,
	},
	[SET_LIST_COLUMN.STATE]: {
		filter: 'BundleStates',
		sorting: VinistoHelperDllEnumsBundleSortableColumnsSet.STATES,
	},
};

export const FILTER_COLUMN_MAP = Object.fromEntries(
	Object.entries(COLUMN_PROPERTIES).map(([key, value]) => [key, value.filter])
);

export const SORTING_COLUMN_MAP: Record<
	string,
	VinistoHelperDllEnumsBundleSortableColumnsSet
> = Object.fromEntries(
	Object.entries(COLUMN_PROPERTIES).map(([key, value]) => [key, value.sorting])
);

export const SET_STATE_LOCALIZATION_MAP = {
	[VinistoHelperDllEnumsBundleBundleState.Concept]: 'set.state.concept',
	[VinistoHelperDllEnumsBundleBundleState.ToConfirm]: 'set.state.waiting',
	[VinistoHelperDllEnumsBundleBundleState.Confirmed]: 'set.state.approved',
	[VinistoHelperDllEnumsBundleBundleState.Rejected]: 'set.state.denied',
};

export const SET_TYPE_LOCALIZATION_MAP: Record<SetTypeWithoutNone, string> = {
	[VinistoHelperDllEnumsBundleSetType.OnePlusOneFree]: 'set.type.onePlusOne',
	[VinistoHelperDllEnumsBundleSetType.TwoPlusOneFree]: 'set.type.twoPlusOne',
	[VinistoHelperDllEnumsBundleSetType.ThreePlusThreeFree]:
		'set.type.threePlusThree',
	[VinistoHelperDllEnumsBundleSetType.FourPlusTwoFree]: 'set.type.fourPlusTwo',
	[VinistoHelperDllEnumsBundleSetType.FivePlusOneFree]: 'set.type.fivePlusOne',
	[VinistoHelperDllEnumsBundleSetType.Six10Percentage]: 'set.type.sixWith10Off',
};

export const SET_TYPE_DATA: Record<SetTypeWithoutNone, number[]> = {
	[VinistoHelperDllEnumsBundleSetType.OnePlusOneFree]: [1, 1],
	[VinistoHelperDllEnumsBundleSetType.TwoPlusOneFree]: [2, 1],
	[VinistoHelperDllEnumsBundleSetType.ThreePlusThreeFree]: [3, 3],
	[VinistoHelperDllEnumsBundleSetType.FourPlusTwoFree]: [4, 2],
	[VinistoHelperDllEnumsBundleSetType.FivePlusOneFree]: [5, 1],
	[VinistoHelperDllEnumsBundleSetType.Six10Percentage]: [6],
};

export interface TabsProps {
	id: number;
	state: VinistoHelperDllEnumsBundleBundleState[];
	heading: string;
	tabName: string;
}

export const SetTabs: TabsProps[] = [
	{
		id: 1,
		state: [
			VinistoHelperDllEnumsBundleBundleState.Concept,
			VinistoHelperDllEnumsBundleBundleState.ToConfirm,
		],
		heading: 'set.tabs.concept.heading',
		tabName: 'set.tabs.concept.tabName',
	},
	{
		id: 2,
		state: [VinistoHelperDllEnumsBundleBundleState.Confirmed],
		heading: 'set.tabs.approved.heading',
		tabName: 'set.tabs.approved.tabName',
	},
	{
		id: 3,
		state: [VinistoHelperDllEnumsBundleBundleState.Rejected],
		heading: 'set.tabs.denied.heading',
		tabName: 'set.tabs.denied.tabName',
	},
];
