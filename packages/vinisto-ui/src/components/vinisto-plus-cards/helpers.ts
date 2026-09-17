import {
	ActionType,
	AddonResponse,
} from 'vinisto_api_client/src/api-types/addons-api';

export const getSubscriptionPrices = ({
	monthlySubscription,
	yearlySubscription,
}: {
	monthlySubscription: AddonResponse | undefined;
	yearlySubscription: AddonResponse | undefined;
}) => {
	const monthlyPriceWithVat =
		monthlySubscription?.actions?.find(
			(action) => action.actionType === ActionType.SetPrice
		)?.price?.valueWithVat ?? 0;

	const monthlyPriceWithVatForAYear = monthlyPriceWithVat * 12;

	const yearlyPriceWithVat =
		yearlySubscription?.actions?.find(
			(action) => action.actionType === ActionType.SetPrice
		)?.price?.valueWithVat ?? 0;

	const yearlyPriceSaveAmount = Math.max(
		monthlyPriceWithVatForAYear - yearlyPriceWithVat,
		0
	);
	return {
		monthlyPriceWithVat,
		monthlyPriceWithVatForAYear,
		yearlyPriceWithVat,
		yearlyPriceSaveAmount,
	};
};
