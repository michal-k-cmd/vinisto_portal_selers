import { UseQueryResult } from '@tanstack/react-query';
import { Bundle } from 'vinisto_api_client/src/domain/bundle';
import { VinistoProductDllModelsApiEvaluationEvaluationsReturn } from 'vinisto_api_client/src/api-types/product-api';

export interface ReviewSectionProps {
	bundle: Bundle;
	isLoading?: boolean;
	className?: string;
	reviewsSectionRef?: React.RefObject<HTMLDivElement>;
	reviewsQuery: UseQueryResult<
		VinistoProductDllModelsApiEvaluationEvaluationsReturn,
		unknown
	>;
	averageRating: number;
}
