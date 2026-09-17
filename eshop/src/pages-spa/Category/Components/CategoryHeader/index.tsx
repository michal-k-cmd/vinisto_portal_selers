import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import cx from 'classnames';
import {
	forEach,
	get,
	isInteger,
	isNumber,
	join,
	round,
	size,
} from 'lodash-es';
import createFormattedDecimalNumber from 'Helpers/createFormattedDecimalNumber';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import { DeviceServiceContext } from 'Services/DeviceService';
import { LocalizationContext } from 'Services/LocalizationService';
import LinkWidgetList from 'Components/link-widget';
import { ShareProductLink } from 'vinisto_ui';
import { usePathname } from 'next/navigation';
import ContainerFullWidth from 'Components/View/ContainerFullWidth';

import { BundlesWithFiltersContext } from '../CategoryBundlesWithFilters/context';
import CategoryBreadcrumb from '../CategoryBreadcrumb';

import styles from './styles.module.css';

import { VinistoProductDllModelsApiCategoryCategory } from '@/api-types/product-api';
import { LinkWidget } from '@/domain/link-widget';

const CategoryHeader = ({
	category,
	categoryWithVirtualData,
	linkWidgets,
}: {
	category: VinistoProductDllModelsApiCategoryCategory;
	categoryWithVirtualData?: VinistoProductDllModelsApiCategoryCategory | null;
	linkWidgets: LinkWidget[];
}) => {
	// Rerender if resolution changes
	useContext(DeviceServiceContext);
	const pathname = usePathname();

	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();
	const getLocalizedValue = useLocalizedValue();
	const {
		activeSpecificationFilters,
		activeTagFilters,
		specificationsQuery,
		isDiscountedActive,
	} = useContext(BundlesWithFiltersContext);

	const { isMobile, isTablet } = useContext(DeviceServiceContext);

	const [showFullDescription, setShowFullDescription] =
		useState<boolean>(false);

	useEffect(() => {
		setShowFullDescription(false);
	}, [pathname]);

	const categoryDescription = getLocalizedValue(
		categoryWithVirtualData
			? categoryWithVirtualData.description
			: category.description
	);

	// This is mostly the same getters as the ones in frontend/eshop/src/spa-routes/Category/Components/CategoryBundlesWithFilters/index.tsx
	// Or frontend/eshop/src/spa-routes/Tag/Components/TagHeader/index.tsx
	// Or frontend/eshop/src/spa-routes/Wines/Components/WinesHeader/index.tsx
	// Or frontend/eshop/src/spa-routes/Category/Components/ActiveFilters/index.tsx (here are slightly different return shapes)
	// TODO: possibly refactor this to a shared file
	const getRangeValue = useCallback(
		(filter: Record<string, any>) => {
			return `${t(
				{ id: 'category.filter.from' },
				{
					value: `${
						isInteger(get(filter, 'min', ''))
							? get(filter, 'min', '')
							: createFormattedDecimalNumber(get(filter, 'min', ''))
					} ${getLocalizedValue(get(filter, 'unit'))}`,
				}
			)} ${t(
				{ id: 'category.filter.to' },
				{
					value: `${
						isInteger(get(filter, 'max', ''))
							? get(filter, 'max', '')
							: createFormattedDecimalNumber(get(filter, 'max', ''))
					} ${getLocalizedValue(get(filter, 'unit'))}`,
				}
			)}`;
		},
		[getLocalizedValue, t]
	);

	const getPriceValue = useCallback(
		(filter: Record<string, any>) => {
			return `${t(
				{ id: 'category.filter.from' },
				{
					value: `${round(filter?.min, 0) ?? ''} ${get(
						localizationContext,
						'activeCurrency.title',
						''
					)}`,
				}
			)} ${t(
				{ id: 'category.filter.to' },
				{
					value: `${round(filter?.max, 0) ?? ''} ${get(
						localizationContext,
						'activeCurrency.title',
						''
					)}`,
				}
			)}`;
		},
		[localizationContext, t]
	);

	const getComboBoxValue = useCallback(
		(filter: Record<string, any>) => {
			return (filter.selectedValues ?? [])
				.map((value: string) => {
					const specification = (
						specificationsQuery?.data?.specifications ?? []
					).find((item) => item.id === filter.specificationDefinitionId);
					const allowedValue =
						// @ts-expect-error needs to assert this is a combobox specification
						specification?.allowedValues?.[value.toLowerCase()];
					return getLocalizedValue(allowedValue?.name ?? '');
				})
				.join(', ');
		},
		[specificationsQuery?.data?.specifications, getLocalizedValue]
	);

	const getCheckboxValue = useCallback(
		(filter: Record<string, any>) => {
			return get(filter, 'isChecked')
				? `${t({ id: 'category.filter.checkbox.yes' })}`
				: `${t({ id: 'category.filter.checkbox.no' })}`;
		},
		[t]
	);

	const specificationFiltersAsString: string = useMemo(() => {
		const filters: string[] = [];

		// Include tag filters
		forEach(activeSpecificationFilters, (filter: Record<string, any>) => {
			const filterStart = '';

			if (get(filter, 'selectedValues')) {
				filters.push(`${filterStart} ${getComboBoxValue(filter)}`);
			} else if (
				isNumber(get(filter, 'min')) &&
				isNumber(get(filter, 'max')) &&
				get(filter, 'unit')
			) {
				filters.push(`${filterStart} ${getRangeValue(filter)}`);
			} else if (
				isNumber(get(filter, 'min')) &&
				isNumber(get(filter, 'max')) &&
				get(filter, 'currency')
			) {
				filters.push(`${filterStart} ${getPriceValue(filter)}`);
			} else if (get(filter, 'isChecked') !== undefined) {
				filters.push(`${filterStart} ${getCheckboxValue(filter)}`);
			}
		});

		if (size(filters) > 0) {
			return ` ${join(filters, ', ')}`;
		}
		return '';
	}, [
		activeSpecificationFilters,
		getCheckboxValue,
		getComboBoxValue,
		getPriceValue,
		getRangeValue,
	]);

	const shouldRenderShowMoreButton = categoryDescription.split('\n').length > 1;

	const tagFiltersAsString = activeTagFilters.length
		? `${activeTagFilters.map((tagFilter) => tagFilter.name ?? '').join(', ')}`
		: '';

	const productsOnSaleAsString = isDiscountedActive
		? t({ id: 'ProductsOnSale' })
		: ``;

	const scrollToId = 'filter';

	return (
		<ContainerFullWidth containerClassName="mt-0 mb-0">
			<div className="vinisto-card vinisto-category-header pb-0">
				<div className="breadcrumb">
					<CategoryBreadcrumb category={category} />
				</div>
				<h1 className={styles.categoryHeading}>
					{categoryWithVirtualData
						? getLocalizedValue(categoryWithVirtualData.name)
						: `${getLocalizedValue(category?.name)}${
								specificationFiltersAsString ? ', ' : ''
						  }${specificationFiltersAsString}${
								tagFiltersAsString ? ', ' : ''
						  }${tagFiltersAsString}${
								productsOnSaleAsString ? ', ' : ''
						  }${productsOnSaleAsString}`}
					<ShareProductLink
						className="ms-1"
						bundleName={''}
						isTabletMobile={isMobile || isTablet}
					/>
				</h1>

				<div
					className={cx(
						styles.readMoreWrap,
						shouldRenderShowMoreButton && !showFullDescription && styles.preview
					)}
				>
					<span
						dangerouslySetInnerHTML={{
							__html: categoryDescription,
						}}
					/>
					{shouldRenderShowMoreButton && (
						<button
							onClick={() =>
								setShowFullDescription(
									(setShowFullDescription) => !setShowFullDescription
								)
							}
							className={styles.readMoreLink}
						>
							{showFullDescription
								? t({
										id: 'category.header.stopReading',
								  })
								: t({
										id: 'category.header.continueReading',
								  })}
						</button>
					)}
				</div>

				<LinkWidgetList
					isLoading={false}
					itemClassName={styles.linkWidgets}
					linkWidgets={linkWidgets?.map((linkWidget) => ({
						id: linkWidget.id,
						name: linkWidget.name,
						imageLocator: linkWidget.imageLocator,
						to: linkWidget.url,
						type: linkWidget.type,
					}))}
					scrollToAnchor={scrollToId}
				/>
				<div
					className={styles.scrollToId}
					id={scrollToId}
				/>
			</div>
		</ContainerFullWidth>
	);
};

export default CategoryHeader;
