import { createContext, useContext, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { LocalizationContext } from 'Services/LocalizationService';
import { VinistoHelperDllEnumsSpecificationSortableColumnsComboValues } from 'vinisto_api_client/src/api-types/product-api';
import { VinistoHelperDllEnumsLanguage } from 'vinisto_api_client/src/api-types/warehouse-api';

import {
	Producers,
	ProducersPageContextProviderProps,
	ProducersPageContextValue,
} from './interfaces';
import {
	CACHE_TIME,
	PRODUCERS_SPECIFICATION_UNIVERSAL_ID,
	SKELETONS_LETTERS_NUM,
	SKELETONS_VALUES_NUM,
} from './constants';
import { getFirstLetters } from './helpers';

import SpecificationService from '@/product-service/specification';

export const ProducersPageContext = createContext<ProducersPageContextValue>({
	producers: {},
	producersData: {},
});

const ProducersPageContextProvider = ({
	children,
}: ProducersPageContextProviderProps) => {
	const { activeLanguageKey } = useContext(LocalizationContext);

	const producersData = useQuery(
		['speficicationData', activeLanguageKey],
		() =>
			SpecificationService.getSpecificationAllowedValues({
				specificationId: PRODUCERS_SPECIFICATION_UNIVERSAL_ID,
				Limit: 0,
				SortingPrimaryColumn:
					VinistoHelperDllEnumsSpecificationSortableColumnsComboValues.VALUE,
				SortingSecondaryColumn:
					VinistoHelperDllEnumsSpecificationSortableColumnsComboValues.VALUE,
			}),
		{
			cacheTime: CACHE_TIME,
			staleTime: CACHE_TIME,
		}
	);

	const producers = useMemo(() => {
		const producers: Producers = {};

		if (producersData?.isLoading) {
			Array.from({ length: SKELETONS_LETTERS_NUM }).forEach((_, i) => {
				producers[i] = Array.from(
					{ length: Math.ceil(Math.random() * SKELETONS_VALUES_NUM - 1) + 1 },
					() => ({
						value: '',
						url: '',
						language: VinistoHelperDllEnumsLanguage.CZECH,
						score: 0,
					})
				);
			});
			return producers;
		}

		const firstLetters = getFirstLetters(
			/* Type from generated types is any */
			producersData?.data?.allowedValues ?? []
		);

		firstLetters?.forEach((letter) => {
			producers[letter] = producersData?.data?.allowedValues?.filter(
				(value) => value.value?.[0]?.toUpperCase() === letter
			);
		});

		return producers;
	}, [producersData?.data?.allowedValues, producersData?.isLoading]);

	return (
		<ProducersPageContext.Provider
			value={{
				producersData,
				producers,
			}}
		>
			{children}
		</ProducersPageContext.Provider>
	);
};

export default ProducersPageContextProvider;
