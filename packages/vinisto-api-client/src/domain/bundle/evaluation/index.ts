type BundleEvaluationStar = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

interface BundleEvaluation {
	averageStars?: number;
	averageStarsDecimal?: number;
	averageSweetDry?: number;
	averageLightHeavy?: number;
	averageFruitTannin?: number;
	averageLowHighAcidity?: number;
	totalEvaluationCount?: number;
	starCategoryEvaluationCount?: Record<BundleEvaluationStar, number>;
}

export type { BundleEvaluationStar, BundleEvaluation };
export default BundleEvaluation;
