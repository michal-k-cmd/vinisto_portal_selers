import BundleEvaluation, { BundleEvaluationStar } from '.';

import { VinistoProductDllModelsApiBundleBundleEvaluation } from '../../../api-types/product-api';
import { AbstractAdapter } from '../../../domain/abstract-adapter';

class BundleEvaluationAdapter extends AbstractAdapter<
	BundleEvaluation,
	VinistoProductDllModelsApiBundleBundleEvaluation
> {
	fromApi(
		apiData: VinistoProductDllModelsApiBundleBundleEvaluation
	): BundleEvaluation {
		return {
			averageFruitTannin: apiData.averageFruitTannic ?? 0,
			averageLightHeavy: apiData.averageLightHeavy ?? 0,
			averageLowHighAcidity: apiData.averageLowHighAccidity ?? 0,
			averageStars: apiData.averageStars ?? 0,
			averageStarsDecimal: apiData.averageStarsDecimal ?? 0,
			averageSweetDry: apiData.averageSweetDry ?? 0,
			totalEvaluationCount: apiData.totalEvaluationCount ?? 0,
			starCategoryEvaluationCount: this.mapStarCategoryEvaluationCount(
				apiData.starCategoryEvaluationCount
			),
		};
	}

	private mapStarCategoryEvaluationCount(
		countData: Record<number, number> | undefined
	): Record<BundleEvaluationStar, number> {
		const defaultCount = 0;
		const mappedCount: Record<BundleEvaluationStar, number> = {} as Record<
			BundleEvaluationStar,
			number
		>;

		for (let i = 1; i <= 10; i++) {
			mappedCount[i as BundleEvaluationStar] = countData?.[i] ?? defaultCount;
		}

		return mappedCount;
	}
}

export default BundleEvaluationAdapter;
