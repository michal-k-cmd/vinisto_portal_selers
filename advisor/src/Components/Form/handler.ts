import { type Dispatch } from 'react';
import { type SubmitHandler } from 'react-hook-form';
import {
	VinistoHelperDllEnumsBundleSortableColumns,
	VinistoHelperDllEnumsCurrency,
	VinistoProductDllModelsApiBundleBundlesGetParameters,
} from 'vinisto_api_client/src/api-types/product-api';

import type { TFormValues } from '../../App';
import { type Action } from '../../App/bundleContext';
import BundleService from '../../Services/Bundle';
import {
	BundleContextActions,
	BundleContextStates,
} from '../../App/bundleContext';

import {
	dataKeys,
	formSteps,
	giftPriceRanges,
	priceLevelEnumToIntegerMap,
	selfPriceRanges,
} from './constants';

import { VinistoHelperDllEnumsPriceLevel } from '@/api-types/order-api';

const {
	FOR_MYSELF_OR_PRESENT_TOGGLE,
	CHARACTER,
	PRESENT_RECIEVER,
	KIND,
	TYPE,
	COUNTRY_OF_ORIGIN,
	IS_FOR_LOGGED_USERS,
} = dataKeys;

function notFalse<T>(unionType: T) {
	return unionType as Exclude<T, false>;
}

export const handleSendRequest =
	(
		dispatch: Dispatch<Action>,
		currency: VinistoHelperDllEnumsCurrency = VinistoHelperDllEnumsCurrency.CZK,
		priceLevel: VinistoHelperDllEnumsPriceLevel = VinistoHelperDllEnumsPriceLevel.Level1
	): SubmitHandler<TFormValues> =>
	async (data: TFormValues) => {
		dispatch({
			type: BundleContextActions.SET_CURRENT_STATE,
			payload: BundleContextStates.LOADING,
		});

		const priceRanges = data[FOR_MYSELF_OR_PRESENT_TOGGLE].includes('present')
			? giftPriceRanges
			: selfPriceRanges;

		const presentRecieverFilter = {
			specificationDefinitionId: '64abf3519d400755c24bdc70',
			selectedValues: [data[PRESENT_RECIEVER]],
		};

		const characterFilter = {
			specificationDefinitionId: '64abf7cd9d400755c24bdc71',
			selectedValues: [data[CHARACTER]],
		};

		const stepTwoFilter = data[FOR_MYSELF_OR_PRESENT_TOGGLE].includes('present')
			? presentRecieverFilter
			: characterFilter;

		const isForLoggedUsers = data[IS_FOR_LOGGED_USERS];

		const responses = await Promise.all(
			priceRanges.map(async (range) => {
				const req: VinistoProductDllModelsApiBundleBundlesGetParameters = {
					currency,
					isCache: true,
					isDeleted: false,
					isGift: false,
					isTemporaryUnavailable: false,
					isSaleOver: false,
					isEnabled: true,
					isInImperialUnits: false,
					isInStock: true,
					isForLoggedUsers,
					filters: [
						stepTwoFilter,
						{
							specificationDefinitionId: '631576cc4114d721a1d6e535',
							selectedValues: notFalse(data[COUNTRY_OF_ORIGIN]).length
								? notFalse(data[COUNTRY_OF_ORIGIN]).flatMap((field: string) =>
										field.split(',')
								  )
								: [
										...formSteps[COUNTRY_OF_ORIGIN].options
											.map((option) => option.value)
											.flatMap((field: string) => field.split(',')),
								  ],
						},
						{
							specificationDefinitionId: '667bd93ae420697337c8eac0',
							selectedValues: notFalse(data[TYPE]).length
								? [...notFalse(data[TYPE])]
								: [...formSteps[TYPE].options.map((option) => option.value)],
						},
						{
							specificationDefinitionId: '631576cc4114d721a1d6e537',
							selectedValues: notFalse(data[KIND]).length
								? [...notFalse(data[KIND])]
								: [...formSteps[KIND].options.map((option) => option.value)],
						},
						{
							specificationDefinitionId: range.id,
							min: range.min,
							max: range.max,
							currency: 1,
							priceLevel: priceLevelEnumToIntegerMap[priceLevel] ?? 0,
						},
					],
					sortingColumn:
						VinistoHelperDllEnumsBundleSortableColumns.SCORING_PRICE,
					isSortingDescending: true,
				};

				const res = await BundleService.GetUniqueBundlesByScoring({
					...req,
				}).then((res) => {
					dispatch({
						type: BundleContextActions.SET_CURRENT_STATE,
						payload: BundleContextStates.LOADED,
					});
					return res;
				});
				return res?.slice(0, 3);
			})
		);

		dispatch({
			type: BundleContextActions.SET_PRICES,
			payload: {
				priceRangeOne: responses[0] ?? [],
				priceRangeTwo: responses[1] ?? [],
				priceRangeThree: responses[2] ?? [],
			},
		});
	};
