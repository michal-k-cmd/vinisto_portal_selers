import { VinistoProductDllModelsApiEvaluationEvaluationsReturn } from 'vinisto_api_client/src/api-types/product-api';

export const getRatingSortedByStarsCounts = (
	data: VinistoProductDllModelsApiEvaluationEvaluationsReturn | undefined
) => {
	// TO CONSIDER What about zero stars?
	const counts: Record<string, number> = {
		1: 0,
		2: 0,
		3: 0,
		4: 0,
		5: 0,
	};
	data?.evaluations?.forEach((evaluation) => {
		const stars = Math.ceil((evaluation.stars ?? 0) / 2);
		if (stars && stars in counts) {
			counts[stars] += 1;
		}
	});
	return Object.values(counts).reverse();
};

export const getBundleAvgRating = (
	data: VinistoProductDllModelsApiEvaluationEvaluationsReturn | undefined
) =>
	(data?.evaluations?.reduce((acc, evaluation) => {
		return acc + (evaluation.stars ?? 0);
	}, 0) ?? 0) /
	(2 * (data?.count ?? 0));
