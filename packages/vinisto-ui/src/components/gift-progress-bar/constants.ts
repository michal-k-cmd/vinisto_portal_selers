import { VinistoHelperDllEnumsCurrency } from '../../../../vinisto-api-client/src/api-types/product-api';

const MAX_VALUE = 9999;
const MIN_DISTANCE_BETWEEN_MARKS = {
	[VinistoHelperDllEnumsCurrency.CZK]: 400,
	[VinistoHelperDllEnumsCurrency.EUR]: 16,
	[VinistoHelperDllEnumsCurrency.USD]: 18,
} as const;

export { MAX_VALUE, MIN_DISTANCE_BETWEEN_MARKS };
