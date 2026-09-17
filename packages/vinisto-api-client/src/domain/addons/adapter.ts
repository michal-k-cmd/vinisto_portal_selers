import {
	ActionType,
	AddonResponse,
	ConditionType,
	CountryCode,
	UxActionType,
} from '@/api-types/addons-api';
import { B2C_NUMERIC_CODE } from '@/shared';
import { AbstractAdapter } from '../abstract-adapter';
import { dayjsInstance } from 'vinisto_shared';
import { AddonGift, AddonUx } from '.';

export class GiftAdapter extends AbstractAdapter<
	AddonGift | null,
	AddonResponse
> {
	fromApi(apiData: AddonResponse): AddonGift | null {
		const id = apiData.id;
		if (!id) throw new Error('AddonResponse must have an id');

		const giftActions = apiData.actions?.filter(
			(action) => action.actionType === ActionType.SetGift
		);

		if (!giftActions || giftActions.length === 0) return null;

		const bundleIds = giftActions
			//@ts-expect-error. Generated types do not match the API response. For ActionType = SetGift, the itemId is expected to be a string.
			.map((action) => action.itemId);

		const isSelectedByDefault = giftActions.some(
			(action) => action.isSelectedByDefault === true
		);

		const orderPriceLimitFrom =
			apiData.conditions?.find(
				(condition) => condition.conditionType === ConditionType.MinOrderPrice
				//@ts-expect-error. Generated types do not match the API response. For ConditionType = MinOrderPrice, the property minOrderPrice is expected to be a number.
			)?.minOrderPrice ?? null;

		const supplierId =
			apiData.conditions?.find(
				(condition) => condition.conditionType === ConditionType.ItemSupplier
				//@ts-expect-error. Generated types do not match the API response. For ConditionType = ItemSupplier, the property itemSupplierId is expected to be a string, if such condition exists.
			)?.itemSupplierId ?? null;

		const categoryId =
			apiData.conditions?.find(
				(condition) => condition.conditionType === ConditionType.ItemCategory
				//@ts-expect-error. Generated types do not match the API response. For ConditionType = ItemCategory, the property minOrderPrice is expected to be a string, if such condition exists.
			)?.itemCategoryId ?? null;

		//TODO: a gift can also be under a specification condition. However the response looks like this:

		//     "conditions": [
		//   {
		//     "specification": {
		//       "allowedValues": [
		//         "nealkoholicka-vina"
		//       ],
		//       "specificationDefinitionId": "64380550713c671d8cb281a7",
		//       "specificationType": "MULTI_COMBO_BOX"
		//     },
		//     "conditionType": "ItemSpecification",
		//     "operator": "And"
		//   }
		// ],

		// etc. which is hard for me to map so I won't do it.

		return {
			id,
			name: apiData.name ?? '',
			description: apiData.description ?? undefined,
			allowedCountry: apiData.countryOfSale ?? CountryCode.CZ,
			validFrom: dayjsInstance(apiData.validFrom).toDate(),
			validTo: apiData.validTo ? dayjsInstance(apiData.validTo).toDate() : null,
			applicableLimit: apiData.applicableLimit ?? 0,
			applicableLimitCounter: apiData.applicableLimitCounter,
			isActive: apiData.isActive ?? true,
			isVisibleOnDetail: apiData.isVisibleOnDetail ?? false,
			isSelectedByDefault,
			availableOnPlatform: apiData.availableOnPlatform ?? B2C_NUMERIC_CODE,
			currency: apiData.currency ?? undefined,
			orderPriceLimitFrom: orderPriceLimitFrom ?? undefined,
			leftToSpent: apiData.leftToSpent ?? undefined,
			categoryId,
			supplierId,
			bundleIds,
		};
	}
}

export class UxAdapter extends AbstractAdapter<AddonUx | null, AddonResponse> {
	fromApi(apiData: AddonResponse): AddonUx | null {
		const id = apiData.id;
		if (!id) throw new Error('AddonResponse must have an id');

		const uxActions = apiData.actions?.filter(
			(action) => action.actionType === ActionType.SetUx
		);

		if (!uxActions || uxActions.length === 0) return null;

		return {
			id,
			name: apiData.name ?? '',
			description: apiData.description ?? '',
			allowedCountry: apiData.countryOfSale ?? CountryCode.CZ,
			validFrom: apiData.validFrom
				? dayjsInstance(apiData.validFrom).toDate()
				: null,
			validTo: apiData.validTo ? dayjsInstance(apiData.validTo).toDate() : null,
			isActive: apiData.isActive ?? true,
			currency: apiData.currency ?? undefined,
			conditions: (() => {
				const decimalConditions = apiData.conditions
					?.filter(
						(condition) =>
							condition.conditionType ===
							ConditionType.ItemSpecificationDecimalNumber
					)
					.map((condition) => {
						const itemSpecificationId =
							'itemSpecificationId' in condition
								? (condition as { itemSpecificationId: string })
										.itemSpecificationId ?? ''
								: '';
						return {
							itemSpecificationId,
							minValue:
								(
									condition as {
										minValue: number | undefined;
									}
								).minValue ?? undefined,
							maxValue:
								(
									condition as {
										maxValue: number | undefined;
									}
								).maxValue ?? undefined,
						};
					});
				if (decimalConditions && decimalConditions.length > 0) {
					return {
						conditionType: ConditionType.ItemSpecificationDecimalNumber,
						itemSpecificationDecimalNumberConditionRequest: decimalConditions,
					};
				}
				return undefined;
			})(),
			actions:
				apiData.actions
					?.filter(
						(action) =>
							action.actionType === ActionType.SetUx &&
							action.actionType !== undefined
					)
					.map((action) => ({
						actionType: action.actionType as ActionType,
						uxAction: (action as { uxAction?: UxActionType }).uxAction,
					})) ?? undefined,
		};
	}
}
