import { useContext } from 'react';
import { BasketContext } from 'Services/BasketService';
import { useGetBundlesByIdsQueries } from 'Hooks/Queries/useGetBundlesByIds';
import { LocalizationContext } from 'Services/LocalizationService';

import UpsellItem from '../BasketItem/UpsellItem';

import styles from './styles.module.css';

import { BasketItem } from '@/api-types/basket-api';
import { Bundle } from '@/domain/bundle';

interface UpsellsProps {
	item: BasketItem & {
		bundle?: Bundle;
	};
}

const Upsells = ({ item }: UpsellsProps) => {
	const { countryOfSale } = useContext(LocalizationContext);
	const { isBasketQueryEnabled, relatedProductsBundleIdsAndQuantitiesMap } =
		useContext(BasketContext);

	const relatedProductsIdsAndQuantities = item.itemId
		? relatedProductsBundleIdsAndQuantitiesMap.get(item.itemId)
		: [];

	const basketBundlesQuery = useGetBundlesByIdsQueries({
		bundleIds: Array.from(
			new Set([
				...(relatedProductsIdsAndQuantities ?? []).map((item) => item.itemId),
			])
		),
		requestParams: {
			countryOfSale,
		},
		options: {
			enabled: isBasketQueryEnabled,
			keepPreviousData: true,
		},
	});

	const basketBundles = new Map(
		basketBundlesQuery.map((query) => [query.data?.id, query.data])
	);

	const relatedBundlesAndQuantities: { bundle: Bundle; quantity: number }[] = (
		relatedProductsIdsAndQuantities ?? []
	)
		.map((item) => {
			const bundle = basketBundles.get(item.itemId);
			return bundle ? { bundle, quantity: item.quantity } : null;
		})
		.filter((relatedBundleAndQuantity) => relatedBundleAndQuantity != null);

	return (
		<div className={styles.upSellings}>
			{relatedBundlesAndQuantities.map((relatedBundleAndQuantity) => (
				<UpsellItem
					key={`${relatedBundleAndQuantity?.bundle.id}`}
					parentItem={item}
					relatedBundle={relatedBundleAndQuantity.bundle}
					baseQuantity={relatedBundleAndQuantity.quantity}
				/>
			))}
		</div>
	);
};

export default Upsells;
