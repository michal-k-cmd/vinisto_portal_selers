import { MultiplatformBasketItem } from 'Services/BasketService/interfaces';

import { BasketType } from '@/api-types/basket-api';
import { VinistoHelperDllEnumsCurrency } from '@/api-types/product-api';
import { Bundle } from '@/domain/bundle';

export interface BasketItemProps {
	item: MultiplatformBasketItem & {
		bundle?: Bundle;
	};
	currency: VinistoHelperDllEnumsCurrency;
	basketType: BasketType;
	userOrSystemBasketId?: string;
}
