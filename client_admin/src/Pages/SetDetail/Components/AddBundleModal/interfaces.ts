import { PageListTableRow } from 'Hooks/useAdminTable/interfaces';

import { Bundle } from '@/domain/bundle';

export interface SetListTableRow extends PageListTableRow, Bundle {}

export enum SET_LIST_COLUMN {
	ID = 'id',
	IMAGE = 'image',
	NAME = 'name',
	TYPE = 'type',
	PRICE_B2C = 'priceB2C',
	PRICE_B2B = 'priceB2B',
	IN_STOCK = 'inStock',
}
