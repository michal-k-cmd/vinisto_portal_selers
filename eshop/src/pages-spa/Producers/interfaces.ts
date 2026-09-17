import { ReactNode } from 'react';
import { UseQueryResult } from '@tanstack/react-query';
import { VinistoProductDllModelsApiSpecificationComboSpecificationAllowedValue } from 'vinisto_api_client/src/api-types/product-api';
import specificationService from 'Services/Specification';

export type Producers = {
	[key: string]:
		| VinistoProductDllModelsApiSpecificationComboSpecificationAllowedValue[]
		| undefined;
};

export type ProducersPageContextValue = {
	producers: Producers;
	producersData:
		| UseQueryResult<
				Awaited<
					ReturnType<typeof specificationService.getSpecificationAllowedValues>
				>
		  >
		| Record<string, never>;
};

export type ProducersPageContextProviderProps = {
	children: ReactNode;
};

export type FetchProducersDataProps = {
	language: string;
};
