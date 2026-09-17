import { VinistoProductDllModelsApiEvaluationEvaluation } from 'vinisto_api_client/src/api-types/product-api';

export interface IReviewProps {
	review: VinistoProductDllModelsApiEvaluationEvaluation;
	isLoading?: boolean;
}

type User = {
	id: string;
	email: string;
};

export interface IReview {
	id: string;
	text: string;
	bundleId: string;
	createdAt: number;
	createdUserDetail: User;
}
