import { SetTypeWithoutNone } from 'Pages/SetList/interfaces';

import { VinistoHelperDllEnumsBundleSetType } from '@/api-types/product-api';

export const tiles: SetTypeWithoutNone[] = Object.values(
	VinistoHelperDllEnumsBundleSetType
).filter(
	(value) => value !== VinistoHelperDllEnumsBundleSetType.None
) as SetTypeWithoutNone[];
