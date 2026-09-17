import { ReactNode } from 'react';
import { MessageDescriptor } from 'react-intl';
import { FOR_LATER_BASKET_NAME } from 'Services/BasketService/constants';

import { BasketResponse, BasketType } from '@/api-types/basket-api';

export const getUserOrSystemBasketName = (
	basket: BasketResponse,
	translationFn: (props: MessageDescriptor, values?: any) => ReactNode
) => {
	if (basket.type === BasketType.SystemDefined) {
		return translationFn({ id: `basket.lists.${basket.name}` });
	}
	return basket.name;
};

export const getUserOrSystemBasketIconPath = (basket: BasketResponse) => {
	if (
		basket.type === BasketType.SystemDefined &&
		basket.name === FOR_LATER_BASKET_NAME
	) {
		return '/assets/images/calendar.svg';
	}
	return '/assets/images/list.svg';
};
