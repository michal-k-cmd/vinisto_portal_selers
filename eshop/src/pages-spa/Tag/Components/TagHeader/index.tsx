import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import cx from 'classnames';
import Skeleton from 'react-loading-skeleton';
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
import { BundlesWithFiltersContext } from 'pages-spa/Category/Components/CategoryBundlesWithFilters/context';
import { LocalizationContext } from 'Services/LocalizationService';
import { DeviceServiceContext } from 'Services/DeviceService';
import { ShareProductLink } from 'vinisto_ui';
import styles from 'pages-spa/Category/Components/CategoryHeader/styles.module.css';
import { usePathname } from 'next/navigation';

import TagBreadcrumb from '../TagBreadcrumb';

import { VinistoProductDllModelsApiTagTag } from '@/api-types/product-api';

const TagHeader = ({
	tag,
}: {
	tag: VinistoProductDllModelsApiTagTag | null | undefined;
}) => {
	const { useFormatMessage, activeCurrency } = useContext(LocalizationContext);
	const {
		activeSpecificationFilters,
		activeTagFilters,
		specificationsQuery,
		isDiscountedActive,
	} = useContext(BundlesWithFiltersContext);
	const pathname = usePathname();

	const t = useFormatMessage();
	const getLocalizedValue = useLocalizedValue();
	const { isMobile, isTablet } = useContext(DeviceServiceContext);

	const isLoading = false;
	const [showFullDescription, setShowFullDescription] =
		useState<boolean>(false);

	useEffect(() => {
		setShowFullDescription(false);
	}, [pathname]);

	const tagDescription = tag?.description ?? '';

	const getRangeValue = useCallback(
		(filter: any) => {
			return `${t(
				{ id: 'category.filter.from' },
				{
					value: `${
						isInteger(filter.min ?? '')
							? filter.min ?? ''
							: createFormattedDecimalNumber(filter.min ?? '')
					} ${getLocalizedValue(filter.unit)}`,
				}
			)} ${t(
				{ id: 'category.filter.to' },
				{
					value: `${
						isInteger(filter.max ?? '')
							? filter.max ?? ''
							: createFormattedDecimalNumber(filter.max ?? '')
					} ${getLocalizedValue(filter.unit)}`,
				}
			)}`;
		},
		[getLocalizedValue, t]
	);

	const getPriceValue = useCallback(
		(filter: any) => {
			return `${t(
				{ id: 'category.filter.from' },
				{
					value: `${round(filter?.min, 0) ?? ''} ${activeCurrency.title ?? ''}`,
				}
			)} ${t(
				{ id: 'category.filter.to' },
				{
					value: `${round(filter?.max, 0) ?? ''} ${activeCurrency.title ?? ''}`,
				}
			)}`;
		},
		[activeCurrency.title, t]
	);

	// This is shared accross multiple contexts - consider refactoring to a shared file
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
		(filter: any) => {
			return get(filter, 'isChecked')
				? `${t({ id: 'category.filter.checkbox.yes' })}`
				: `${t({ id: 'category.filter.checkbox.no' })}`;
		},
		[t]
	);

	const specificationFiltersAsString: string = useMemo(() => {
		const filters: string[] = [];

		forEach(activeSpecificationFilters, (filter) => {
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

	const shouldRenderShowMoreButton = tagDescription.split('\n').length > 1;

	const tagFiltersAsString = activeTagFilters.length
		? `${activeTagFilters.map((tagFilter) => tagFilter.name ?? '').join(', ')}`
		: '';

	const productsOnSaleAsString = isDiscountedActive
		? t({ id: 'ProductsOnSale' })
		: ``;

	return (
		<div className="container mt-0">
			<div className="row">
				<div className="col-12">
					<div className="vinisto-card vinisto-category-header pb-0">
						<TagBreadcrumb tag={tag} />
						<h1 className="vinisto-category-header__heading">
							{`${tag?.name ?? ''}${
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
								shouldRenderShowMoreButton &&
									!showFullDescription &&
									styles.preview
							)}
						>
							{isLoading ? (
								<Skeleton count={1.75} />
							) : (
								<>
									<span
										dangerouslySetInnerHTML={{
											__html: tagDescription,
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
								</>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TagHeader;
