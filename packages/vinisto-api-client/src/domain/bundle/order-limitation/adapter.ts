import BundleOrderLimitation from '.';

import { AbstractAdapter } from '../../../domain/abstract-adapter';
import { VinistoProductDllModelsApiBundleOrderLimitation } from '../../../api-types/product-api';
import convertDateToDayjs from '../../../utils/convert-date-to-dayjs';

class BundleOrderLimitationAdapter extends AbstractAdapter<
	BundleOrderLimitation,
	VinistoProductDllModelsApiBundleOrderLimitation
> {
	fromApi(
		apiData: VinistoProductDllModelsApiBundleOrderLimitation
	): BundleOrderLimitation {
		return {
			limit: apiData.limit,
			validFrom: convertDateToDayjs(apiData.validFrom),
			validTo: convertDateToDayjs(apiData.validTo),
		};
	}
}

export default BundleOrderLimitationAdapter;
