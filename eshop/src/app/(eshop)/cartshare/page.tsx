import { QueryClient } from '@tanstack/react-query';
import BasketView from 'pages-spa/Basket';
import { getLocalizedValue } from 'Hooks/useLocalizedValue';
import { getBundleProducerNames } from 'Services/BasketService/helpers';
import { ObjectId } from 'bson';
import { Metadata } from 'next';
import getIntl from 'app/intl';

import api from '@/api';
import {
	VinistoHelperDllEnumsPriceLevel,
	VinistoProductDllModelsApiBundleBundlesReturn,
} from '@/api-types/product-api';

export const generateMetadata = async (): Promise<Metadata> => {
	const intl = await getIntl();
	const t = intl.formatMessage;

	return {
		title: `${t(
			{ id: 'app.title.page' },
			{ title: `${t({ id: 'routes.cart.name' })}` }
		)}`,
		robots: 'noindex, nofollow',
	};
};

const BasketShare = async ({
	searchParams,
}: {
	searchParams: Promise<{ bundleIds: string[] }>;
}) => {
	const search = await searchParams;
	const bundleIdsAndQuantitiesRaw = Array.isArray(search.bundleIds)
		? search.bundleIds
		: [search.bundleIds];

	const bundleIdsAndQuantitiesParsed = bundleIdsAndQuantitiesRaw
		.map((item) => {
			const [id, quantity] = item.split('_');
			return {
				bundleId: id,
				quantity: Number(quantity),
			};
		})
		.filter((item) => {
			const isValidNumber = !Number.isNaN(item.quantity);
			let isValidObjectId;
			try {
				isValidObjectId =
					new ObjectId(item.bundleId).toString() === item.bundleId;
			} catch (e) {
				isValidObjectId = false;
			}
			return isValidNumber && isValidObjectId;
		});

	const bundleIds = bundleIdsAndQuantitiesParsed.map((item) => item.bundleId);

	const queryClient = new QueryClient();

	const bundles = await queryClient
		.fetchQuery({
			queryKey: ['bundlesByIdsRaw', bundleIds],
			queryFn: () =>
				api
					.get<VinistoProductDllModelsApiBundleBundlesReturn>(
						`product-api/bundles/by-ids`,
						{
							bundleIds: bundleIds,
						}
					)
					.then((res) => res.bundles ?? []),
		})
		.catch(() => []);

	const bundleIdsAndQuantitiesParsedIncludingAnalytics =
		bundleIdsAndQuantitiesParsed.map((item) => {
			const itemBundle = bundles.find((bundle) => bundle.id === item.bundleId);
			if (!itemBundle)
				return {
					...item,
					bundleMetaForAnalytics: {
						item_name: '',
						item_brand: '',
						price: 0,
					},
				};
			const item_name = getLocalizedValue(itemBundle.name);
			const item_brand = getBundleProducerNames(itemBundle).join(', ');
			// TODO: This is a poor mans solution, try fixing adapter to be able to work server side as well
			const price = (() => {
				const result = (
					itemBundle.priceDiscounts ??
					itemBundle.prices ??
					[]
				).find(
					(price) => price.level === VinistoHelperDllEnumsPriceLevel.Level1
				);
				return (result as any)?.value ?? 0;
			})();
			return {
				...item,
				bundleMetaForAnalytics: {
					item_name,
					item_brand,
					price,
				},
			};
		});

	return (
		<BasketView sharedItems={bundleIdsAndQuantitiesParsedIncludingAnalytics} />
	);
};

export default BasketShare;
