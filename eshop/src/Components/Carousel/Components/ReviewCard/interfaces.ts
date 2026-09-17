import { VinistoProductDllModelsApiEvaluationEvaluationsReturn } from 'vinisto_api_client/src/api-types/product-api';
import { Bundle } from 'vinisto_api_client/src/domain/bundle';

export interface ReviewCardProps {
	data?:
		| (Bundle & {
				evaluations: VinistoProductDllModelsApiEvaluationEvaluationsReturn;
		  })
		| null;
	isLoading?: boolean;
	initialTab?: any;
	displayPriceAsRange?: boolean;
}
