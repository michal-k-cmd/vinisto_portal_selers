import { PageListTableRow } from 'Hooks/useAdminTable/interfaces';

import {
	VinistoHelperDllEnumsBundleSetType,
	VinistoProductDllModelsApiBundleSetBundleSupplier,
} from '@/api-types/product-api';

export interface SetListTableRow
	extends PageListTableRow,
		VinistoProductDllModelsApiBundleSetBundleSupplier {}

export enum SET_LIST_COLUMN {
	ID = 'id',
	NAME = 'name',
	TYPE = 'type',
	PRICE = 'price',
	IN_STOCK = 'availableCount',
	STATE = 'state',
}

export type SetTypeWithoutNone = Exclude<
	VinistoHelperDllEnumsBundleSetType,
	VinistoHelperDllEnumsBundleSetType.None
>;
