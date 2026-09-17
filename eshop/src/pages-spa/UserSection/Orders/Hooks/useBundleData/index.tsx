import { useCallback } from 'react';
import { getSingleFlag } from 'Helpers/getFlagSpecification';

import { IBundlePriceReturnData } from './interfaces';

const useBundleData = () => {
	return useCallback((bundle: any): IBundlePriceReturnData => {
		const bundleItem = bundle.bundle;
		const flag = getSingleFlag(bundleItem?.countrySpecification);
		const flagComponent = flag ? flag?.component : null;
		const url = bundleItem?.url ?? '';
		const rating = (bundleItem?.bundleEvaluation?.averageStars ?? 0) / 2;
		const totalEvaluationCount =
			bundleItem?.bundleEvaluation?.totalEvaluationCount;
		const quantity = bundle?.quantity;
		const producerSpecification =
			bundleItem?.producerSpecification?.value ?? '';

		return {
			flagComponent: flagComponent,
			url: url,
			rating: rating,
			totalEvaluationCount: totalEvaluationCount,
			quantity: quantity,
			producerSpecification: producerSpecification,
		};
	}, []);
};

export default useBundleData;
