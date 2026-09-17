import { useCallback, useContext } from 'react';
import cx from 'classnames';
import { ResetButton, SelectionList, SelectionListItem } from 'vinisto_ui';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import { LocalizationContext } from 'Services/LocalizationService';
import createFormattedDecimalNumber from 'Helpers/createFormattedDecimalNumber';
import removeDiacritics from 'Helpers/removeDiacritics';
import { upperFirst } from 'lodash-es';

import { BundlesWithFiltersContext } from '../CategoryBundlesWithFilters/context';
import { SALE_TAG_ID } from '../CategoryBundlesWithFilters/constants';

import styles from './styles.module.css';

const ActiveFilters = () => {
	const {
		activeSpecificationFilters,
		activeTagFilters,
		isDataLoading,
		specificationsQuery,
		isInStockActive,
		isDiscountedActive,
		isInStockParam,
		isInStockParamRef,
		isDiscountedParam,
		setQuery,
	} = useContext(BundlesWithFiltersContext);

	const getLocalizedValue = useLocalizedValue();
	const { useFormatMessage, activeCurrency } = useContext(LocalizationContext);
	const t = useFormatMessage();
	const urlParamTags = `${t({ id: 'tags.urlParam' })}`;

	const getComboBoxValue = useCallback(
		(filter: any) => {
			return filter.selectedValues?.map((value: string) => {
				const specification = specificationsQuery?.data?.specifications?.find(
					(spec: any) => spec.id === filter.specificationDefinitionId
				);
				const allowedValue =
					// @ts-expect-error needs to assert this is a combobox specification
					specification?.allowedValues?.[value?.toLowerCase()];
				const name = allowedValue?.name || '';
				return { slug: value, displayName: getLocalizedValue(name) };
			});
		},
		[specificationsQuery?.data?.specifications, getLocalizedValue]
	);

	const getCheckboxValue = useCallback(
		(filter: any) => {
			return [
				filter.isChecked
					? `${t({ id: 'category.filter.checkbox.yes' })}`
					: `${t({ id: 'category.filter.checkbox.no' })}`,
			];
		},
		[t]
	);

	const getPriceValue = useCallback(
		(filter: any) => {
			return [
				`${Math.round(filter?.min ?? 0)} ${
					activeCurrency?.title ?? ''
				} – ${Math.round(filter?.max ?? 0)} ${activeCurrency?.title ?? ''}`,
			];
		},
		[activeCurrency.title]
	);

	const getRangeValue = useCallback(
		(filter: any) => {
			return [
				`${
					Number.isInteger(filter?.min)
						? filter?.min
						: createFormattedDecimalNumber(filter?.min)
				} ${getLocalizedValue(filter?.unit)} – ${
					Number.isInteger(filter?.max)
						? filter?.max
						: createFormattedDecimalNumber(filter?.max)
				} ${getLocalizedValue(filter?.unit)}`,
			];
		},
		[getLocalizedValue]
	);

	const getFilterValue = (
		filter: Record<any, any>
	): string[] | { slug: string; displayName: string }[] | undefined => {
		if (filter.selectedValues) return getComboBoxValue(filter);

		if (
			typeof filter.min === 'number' &&
			typeof filter.max === 'number' &&
			filter.unit
		)
			return getRangeValue(filter);

		if (
			typeof filter.min === 'number' &&
			typeof filter.max === 'number' &&
			filter.currency
		)
			return getPriceValue(filter);

		if (filter.isChecked !== undefined) return getCheckboxValue(filter);
	};

	const sortedFilters = [...activeSpecificationFilters].sort(
		(a, b) => a.order - b.order
	);

	const selectedValues = sortedFilters.map((filter) => {
		return {
			key: filter.specificationDefinitionId,
			label: getLocalizedValue(filter.specificationName),
			items: (getFilterValue(filter) ?? []).map(
				(item: string | { slug: string; displayName: string }) => ({
					specificationName: getLocalizedValue(filter.specificationName),
					displayValue: typeof item === 'string' ? item : item.displayName,
					specificationSlug: typeof item === 'string' ? item : item.slug,
				})
			),
		};
	});

	const selectedTags = activeTagFilters.map((filter) => {
		return {
			key: filter.id,
			label: filter.name,
			items: [
				{
					displayValue: filter.name ?? '',
					id: filter.id,
				},
			],
		};
	});

	type SelectedItem = (typeof selectedValues)[number]['items'][number];

	type SelectedTag = (typeof selectedTags)[number]['items'][number];

	const handleOnRemoveValue = ({
		specificationName,
		specificationSlug,
	}: SelectedItem) => {
		const selectedValues =
			activeSpecificationFilters.find(
				(item) =>
					getLocalizedValue(item.specificationName) === specificationName
			)?.selectedValues || [];

		const filteredSelectedValues = selectedValues.filter((value: string) => {
			return value !== specificationSlug;
		});

		setQuery({
			[removeDiacritics(specificationName)]: filteredSelectedValues.length
				? filteredSelectedValues
				: undefined,
		});
	};

	const handleOnRemoveTagFilter = ({ id }: SelectedTag) => {
		const filteredTags = activeTagFilters.filter((tag) => tag.id !== id);

		setQuery({
			[urlParamTags]: filteredTags.length
				? filteredTags.map((tag) => removeDiacritics(tag.name))
				: undefined,
		});
	};

	// TODO duplication with Filters, should be moved to context
	const handleOnRemoveAllFilters = useCallback(() => {
		setQuery((query: Record<string, any>) => {
			const newQuery: Record<string, any> = {};
			Object.entries(query).forEach(([key]) => {
				newQuery[key] = undefined;
			});
			return newQuery;
		});
	}, [setQuery]);

	if (
		isDataLoading ||
		(activeSpecificationFilters.length === 0 &&
			selectedTags.length === 0 &&
			!isInStockActive &&
			!isDiscountedActive)
	)
		return null;

	return (
		<div className="container mb-1 mb-xl-3">
			<div className={cx('col-12', styles.activeFiltersWrap)}>
				<div className={styles.activeFilters}>
					{isInStockActive && (
						<SelectionList
							className={styles.forceSingleRow}
							label={isInStockParam}
							renderLabel={() => null}
							items={[
								{
									displayValue:
										isInStockParamRef === t({ id: 'yes' })
											? upperFirst(
													`${t({ id: 'bundleAvailability.available' })}`
											  )
											: upperFirst(
													`${t({ id: 'bundleAvailability.outOfStock' })}`
											  ),
								},
							]}
							renderItem={(props) => (
								<SelectionListItem
									{...props}
									accessorFn={(item) => item.displayValue}
								/>
							)}
							onItemClick={() => setQuery({ [isInStockParam]: undefined })}
						/>
					)}
					{isDiscountedActive && (
						<SelectionList
							className={styles.forceSingleRow}
							label={isDiscountedParam}
							renderLabel={() => null}
							items={[
								{
									displayValue: t({ id: 'ProductsOnSale' }),
								},
							]}
							renderItem={(props) => (
								<SelectionListItem
									{...props}
									accessorFn={(item) => item.displayValue}
								/>
							)}
							onItemClick={() => setQuery({ [isDiscountedParam]: undefined })}
						/>
					)}

					<SelectionList<SelectedTag>
						className={styles.forceSingleRow}
						label={null}
						renderLabel={() => null}
						items={selectedTags.map(({ key, label }) => ({
							id: key,
							displayValue: label,
						}))}
						accessorFn={(item) => String(item.displayValue)}
						onItemClick={handleOnRemoveTagFilter}
						renderItem={(props) => (
							<SelectionListItem
								{...props}
								accessorFn={(item) =>
									item.id === SALE_TAG_ID
										? t({ id: 'ProductsOnSale' })
										: item.displayValue
								}
							/>
						)}
					/>

					{selectedValues.map((filter) => {
						return (
							<SelectionList<SelectedItem>
								className={styles.forceSingleRow}
								key={'activefilter' + filter.key}
								label={filter.label}
								renderLabel={() => null}
								items={filter.items}
								accessorFn={(item) => String(item.displayValue)}
								onItemClick={handleOnRemoveValue}
							/>
						);
					})}
				</div>
				<ResetButton onClick={handleOnRemoveAllFilters}>
					{t({ id: 'category.filter.cancelSelectedFilters' })}
				</ResetButton>
			</div>
		</div>
	);
};

export default ActiveFilters;
