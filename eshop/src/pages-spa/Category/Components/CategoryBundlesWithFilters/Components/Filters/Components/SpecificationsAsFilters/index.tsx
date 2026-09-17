import { Fragment, useCallback, useContext } from 'react';
import { first, isEmpty, isEqual, last, round, upperFirst } from 'lodash-es';
import removeDiacritics from 'Helpers/removeDiacritics';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import { BundlesWithFiltersContext } from 'pages-spa/Category/Components/CategoryBundlesWithFilters/context';
import { SpecificationAllowedValues } from 'Services/Specification/interfaces';
import {
	FilterHeading,
	FilterOptionsFieldset,
	RangeWithExternalControl,
} from 'vinisto_ui';
import {
	SPECIFICATION_TYPE_TEXT,
	URL_PARAM_PAGE,
} from 'pages-spa/Category/Components/CategoryBundlesWithFilters/constants';
import {
	isComboBoxSpecification,
	isDecimalNumberImperialSpecification,
	isDecimalNumberSpecification,
	isMultiComboBoxSpecification,
	isNumberImperialSpecification,
	isNumberSpecification,
	isPriceSpecification,
} from 'pages-spa/Category/Components/CategoryBundlesWithFilters/helpers';
import { LocalizationContext } from 'Services/LocalizationService';
import { getLocalizedCurrency } from 'vinisto_shared/src/price/get-localized-currency';
import { VinistoHelperDllEnumsCurrency } from 'vinisto_api_client/src/api-types/product-api';

import OptionsList from '../OptionsList';
import IsDiscountedFilter from '../isDiscountedFilter';
import { Option } from '../OptionsList/interfaces';

const SpecificationsAsFilters = ({
	specificationsToShow,
}: {
	specificationsToShow: Record<string, any>[];
}) => {
	const getLocalizedValue = useLocalizedValue();
	const { query, setQuery, specificationsWithBundleFilters } = useContext(
		BundlesWithFiltersContext
	);
	const {
		activeCurrency: { currency },
		convertCZKtoEUR,
	} = useContext(LocalizationContext);

	const { isDiscountedFilters } = specificationsWithBundleFilters;

	const isDiscountedFilterAvailable = isDiscountedFilters.find(
		(filter) => filter.value === true
	);

	const handleOnOptionsChange = useCallback(
		(specification: any) => (newOptions: Record<string, any>) => {
			if (!specification) return;
			const specificationName = removeDiacritics(
				getLocalizedValue(specification.name ?? [])
			);
			if (!specificationName) return;

			const checkedOptions = newOptions
				.filter((newOption: any) => newOption?.checked === true)
				.map((option: any) => {
					return removeDiacritics(option?.valueLink);
				});

			setQuery({
				[URL_PARAM_PAGE]: undefined,
				[specificationName]: !isEmpty(checkedOptions)
					? checkedOptions
					: undefined,
			});
		},
		[setQuery, getLocalizedValue]
	);

	const handleOnRangeChange = useCallback(
		(specification: any) => (newValue: [number, number]) => {
			if (!specification) return;

			const specificationName = removeDiacritics(
				getLocalizedValue(specification?.name ?? [])
			);
			if (!specificationName) return;
			const isSameAsDefault: boolean =
				first(newValue) === specification?.values?.min &&
				last(newValue) === specification?.values?.max;

			newValue = [round(newValue[0], 0), round(newValue[1], 0)];

			setQuery({
				[URL_PARAM_PAGE]: undefined,
				[specificationName]: !isSameAsDefault ? newValue : undefined,
			});
		},
		[setQuery, getLocalizedValue]
	);

	const getSpecificationRangeLimits = (
		specification: Record<string, any>
	): [number, number] => {
		return [
			specification?.values?.min ?? specification?.min ?? 0,
			specification?.values?.max ?? specification?.max ?? 0,
		];
	};

	const getSpecificationRangeQuery = (
		specification: Record<PropertyKey, any>
	): [number, number] => {
		if (!specification) return [0, 0];

		const specificationName = removeDiacritics(
			getLocalizedValue(specification?.name ?? [])
		);
		const specificationQueryValue = query[specificationName];
		return specificationQueryValue;
	};

	const getSpecificationUnit = (specification: Record<string, any>) =>
		getLocalizedValue(specification?.unit ?? []);

	const specificationsMappedToFilters = specificationsToShow.map(
		(specification) => {
			const specificationName = removeDiacritics(
				getLocalizedValue(specification.name)
			);
			const specificationQuery: Option[] = [];

			Object.entries(specification?.allowedValues ?? []).forEach(
				(value, index) => {
					const key = value[0];
					const valueEntry = value[1] as SpecificationAllowedValues;
					const isValueEntryChecked = Boolean(
						Array.isArray(query[specificationName] || [])
							? query[specificationName] &&
									query[specificationName].includes(removeDiacritics(key))
							: isEqual(
									query[
										removeDiacritics(getLocalizedValue(specification.name))
									],
									removeDiacritics(key)
							  )
					);
					const valueEntryOccurence =
						(specification?.values?.selectedValues ?? []).find(
							(selectedValue: Record<string, string>) =>
								(selectedValue?.value ?? '').toLowerCase() === key
						)?.occurence ?? 0;

					if (!isValueEntryChecked && valueEntryOccurence === 0) return;

					specificationQuery.push({
						id: String(index),
						value: getLocalizedValue(valueEntry.name),
						valueLink: key,
						checked: isValueEntryChecked,
						suffix: `(${valueEntryOccurence})`,
					});
				}
			);

			return { specification, specificationQuery };
		}
	);

	const specificationsWithCheckedOrAvailableOptions =
		specificationsMappedToFilters.filter(
			({ specification, specificationQuery }) => {
				if (
					!(
						isComboBoxSpecification(specification.specificationType) ||
						isMultiComboBoxSpecification(specification.specificationType)
					)
				) {
					return true;
				}
				return specificationQuery.length > 0;
			}
		);

	return specificationsWithCheckedOrAvailableOptions.map(
		({ specification = {}, specificationQuery }, index) => {
			if (isPriceSpecification(specification.specificationType)) {
				const [minLimit, maxLimit] = getSpecificationRangeLimits(specification);

				return (
					<Fragment key={specification.id ?? 'catbwfspec' + index}>
						<FilterOptionsFieldset>
							<FilterHeading isLoading={!!specification.isLoading}>
								{upperFirst(getLocalizedValue(specification.name ?? []))}
							</FilterHeading>
							<RangeWithExternalControl
								min={
									currency === VinistoHelperDllEnumsCurrency.CZK
										? minLimit
										: convertCZKtoEUR(minLimit)
								}
								max={
									currency === VinistoHelperDllEnumsCurrency.CZK
										? maxLimit
										: convertCZKtoEUR(maxLimit)
								}
								// Todo this has to be fixed by BE or by editing the specification
								// Currently returns value (which was used to determine currency) as "0"
								// which resolves to "Kč" only because of the default value
								suffix={` ${getLocalizedCurrency(currency)}`}
								value={getSpecificationRangeQuery(specification)}
								defaultValue={getSpecificationRangeLimits(specification)}
								onChange={handleOnRangeChange(specification)}
								step={1}
							/>
						</FilterOptionsFieldset>
						{isDiscountedFilterAvailable && <IsDiscountedFilter />}
					</Fragment>
				);
			}
			return (
				<FilterOptionsFieldset key={specification.id ?? 'catbwfspec2' + index}>
					{specification.specificationType !== SPECIFICATION_TYPE_TEXT && (
						<FilterHeading isLoading={!!specification.isLoading}>
							{upperFirst(getLocalizedValue(specification.name ?? []))}
						</FilterHeading>
					)}
					{(isComboBoxSpecification(specification.specificationType) ||
						isMultiComboBoxSpecification(specification.specificationType)) && (
						<OptionsList
							options={specificationQuery}
							onChange={handleOnOptionsChange(specification)}
							searchPlaceholderValue={getLocalizedValue(
								specification.name ?? []
							)}
							isLoading={!!specification.isLoading}
						/>
					)}
					{(isNumberSpecification(specification.specificationType) ||
						isNumberImperialSpecification(specification.specificationType)) && (
						<RangeWithExternalControl
							min={specification?.values?.min ?? 0}
							max={specification?.values?.max ?? 50000}
							suffix={getSpecificationUnit(specification)}
							value={getSpecificationRangeQuery(specification)}
							onChange={handleOnRangeChange(specification)}
							isLoading={!!specification?.isLoading}
						/>
					)}
					{(isDecimalNumberSpecification(specification.specificationType) ||
						isDecimalNumberImperialSpecification(
							specification.specificationType
						)) && (
						<RangeWithExternalControl
							min={specification?.values?.min ?? 0}
							max={specification?.values?.max ?? 1}
							suffix={getSpecificationUnit(specification)}
							value={getSpecificationRangeQuery(specification)}
							onChange={handleOnRangeChange(specification)}
							isLoading={!!specification?.isLoading}
						/>
					)}
				</FilterOptionsFieldset>
			);
		}
	);
};

export default SpecificationsAsFilters;
