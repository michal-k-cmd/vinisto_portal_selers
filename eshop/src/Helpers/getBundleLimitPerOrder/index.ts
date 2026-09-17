import { dayjsInstance as dayjs } from 'vinisto_shared';
import BundleOrderLimitation from 'vinisto_api_client/src/domain/bundle/order-limitation';
import { VinistoProductDllModelsApiBundleOrderLimitation } from 'vinisto_api_client/src/api-types/product-api';

const getBundleLimitPerOrder = (
	orderLimitation?:
		| BundleOrderLimitation
		| VinistoProductDllModelsApiBundleOrderLimitation
		| null
) => {
	if (!orderLimitation) return null;

	if (
		dayjs.isDayjs(orderLimitation.validFrom) ||
		dayjs.isDayjs(orderLimitation.validTo)
	) {
		const isCurrentlyLimited = dayjs().isBetween(
			orderLimitation.validFrom,
			orderLimitation.validTo,
			undefined,
			'[]'
		);
		const bundleLimitPerOrder =
			(isCurrentlyLimited && orderLimitation?.limit) || null;

		return bundleLimitPerOrder;
	}

	const nowInSeconds = +new Date() / 1000;
	const isCurrentlyLimited = Boolean(
		orderLimitation?.validFrom &&
			orderLimitation.validFrom < nowInSeconds &&
			orderLimitation?.validTo &&
			orderLimitation.validTo > nowInSeconds
	);

	const bundleLimitPerOrder =
		(isCurrentlyLimited && orderLimitation?.limit) || null;

	return bundleLimitPerOrder;
};

export default getBundleLimitPerOrder;
