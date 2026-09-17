import { find, get } from 'lodash-es';

/**
 * @deprecated Use useFindBundleInBasket hook instead (memoized, typed, free of lodash c@#$)
 */
const getItemInBasket = (basket: Record<string, any>, itemId: string) => {
	return find(
		get(basket, 'items', []),
		(item: Record<any, any>) => get(item, 'bundleId', '') === itemId
	);
};

export default getItemInBasket;
