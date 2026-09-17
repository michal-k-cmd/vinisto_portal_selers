'use client';

import { useContext, useEffect, useMemo } from 'react';
import { bundleAdapter } from 'vinisto_api_client/src/index';
import { Bundle } from 'vinisto_api_client/src/domain/bundle';
import CarouselSection from 'Components/CarouselSection';
import { LocalizationContext } from 'Services/LocalizationService';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import { useQuery } from '@tanstack/react-query';
import { getHomepageCarousels } from 'app/(eshop)/helpers';
import { WarehouseContext } from 'Services/WarehouseService';
import type { CarouselData } from 'Types/homepage';
import { useIsB2b } from 'Services/PlatformService';
import { AuthenticationContext } from 'Services/AuthenticationService/context';

import HomeSectionDivider from './HomeSectionDivider';

import {
	VinistoHelperDllEnumsCountryCode,
	VinistoHelperDllEnumsCurrency,
} from '@/api-types/product-api';

interface CustomCarouselsClientProps {
	initialData: CarouselData[keyof CarouselData];
	countryOfSale: VinistoHelperDllEnumsCountryCode;
	currency: VinistoHelperDllEnumsCurrency;
	position: keyof CarouselData;
}

// The hell? Carousels are being fetched TWICE? No wonder the homepage is slow af
const CustomCarouselsClient = ({
	initialData,
	countryOfSale: initialCountryOfSale,
	currency: initialCurrency,
	position,
}: CustomCarouselsClientProps) => {
	const isB2b = useIsB2b();
	const getLocalizedValue = useLocalizedValue();
	const { countryOfSale, activeCurrency } = useContext(LocalizationContext);
	const { priceLevel } = useContext(AuthenticationContext).vinistoUser;

	const { fetchQuantity } = useContext(WarehouseContext);
	const currentCurrency = activeCurrency.currency;
	const preferencesChanged =
		countryOfSale !== initialCountryOfSale ||
		currentCurrency !== initialCurrency;

	const { data: queriedData } = useQuery({
		queryKey: [
			'homepage-carousels',
			countryOfSale,
			currentCurrency,
			isB2b,
			position,
		],
		queryFn: () =>
			getHomepageCarousels(countryOfSale, currentCurrency, isB2b).then(
				(response) => response[position]
			),
		enabled: preferencesChanged,
	});

	const carousels = useMemo(
		() => (preferencesChanged ? queriedData ?? [] : initialData),
		[initialData, preferencesChanged, queriedData]
	);

	useEffect(() => {
		const bundleIds = carousels
			.flatMap((carousel) => carousel.bundles?.map((bundle) => bundle.id))
			.filter((id): id is string => !!id);

		if (bundleIds.length > 0) {
			fetchQuantity(bundleIds);
		}
	}, [carousels, fetchQuantity]);

	const adaptedCarousels = useMemo(() => {
		return carousels
			.map((carousel) => {
				const adaptedBundles = (carousel.bundles ?? [])
					.map((bundle) => {
						try {
							return bundleAdapter.fromApi(bundle, {
								currency: currentCurrency,
								customerPriceLevel: priceLevel,
							});
						} catch (error) {
							return null;
						}
					})
					.filter((bundle): bundle is Bundle => bundle !== null);

				return {
					id: carousel.id,
					title: getLocalizedValue(carousel.name),
					bundles: adaptedBundles,
				};
			})
			.filter((carousel) => carousel.bundles.length > 0);
	}, [carousels, getLocalizedValue, currentCurrency, priceLevel]);

	if (adaptedCarousels.length === 0) {
		return null;
	}

	return (
		<>
			<HomeSectionDivider />
			{adaptedCarousels.map((carousel) => {
				return (
					<CarouselSection
						key={'carousel' + carousel.id}
						title={carousel.title}
						data={carousel.bundles}
						analyticsListId={`homepage_${position}_${carousel.id}`}
						analyticsListName={carousel.title}
					/>
				);
			})}
		</>
	);
};

export default CustomCarouselsClient;
