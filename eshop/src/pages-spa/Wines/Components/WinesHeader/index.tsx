import { useCallback, useContext, useMemo } from 'react';
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
import useLocalizedValue from 'Hooks/useLocalizedValue';
import { BundlesWithFiltersContext } from 'pages-spa/Category/Components/CategoryBundlesWithFilters/context';
import { LocalizationContext } from 'Services/LocalizationService';
import { DeviceServiceContext } from 'Services/DeviceService';
import createFormattedDecimalNumber from 'Helpers/createFormattedDecimalNumber';
import ContainerFullWidth from 'Components/View/ContainerFullWidth';
import { ShareProductLink } from 'vinisto_ui';
import styles from 'pages-spa/Category/Components/CategoryHeader/styles.module.css';

import WinesBundlesBreadcrumb from '../WinesBundlesBreadcrumb';

const WinesHeader = () => {
	// Rerender if resolution changes
	useContext(DeviceServiceContext);

	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();
	const getLocalizedValue = useLocalizedValue();
	const { activeSpecificationFilters, activeTagFilters, specificationsQuery } =
		useContext(BundlesWithFiltersContext);
	const isLoading = specificationsQuery?.isLoading ?? false;

	const { isMobile, isTablet } = useContext(DeviceServiceContext);

	const getRangeValue = useCallback(
		(filter: any) => {
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
		(filter: any) => {
			return `${t(
				{ id: 'category.filter.from' },
				{
					value: `${round(filter?.min, 2) ?? ''} ${get(
						localizationContext,
						'activeCurrency.title',
						''
					)}`,
				}
			)} ${t(
				{ id: 'category.filter.to' },
				{
					value: `${round(filter?.max, 2) ?? ''} ${get(
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
	}, [activeSpecificationFilters]);

	const tagFiltersAsString = activeTagFilters.length
		? `${activeTagFilters.map((tagFilter) => tagFilter.name ?? '').join(', ')}`
		: '';

	return (
		<ContainerFullWidth containerClassName="mt-0">
			<div className="vinisto-card vinisto-category-header pb-0">
				<WinesBundlesBreadcrumb />
				<h1 className="vinisto-category-header__heading">
					{isLoading ? (
						<Skeleton width="200px" />
					) : (
						`${t({
							id: 'products.title',
						})}${
							specificationFiltersAsString ? ',' : ''
						}${specificationFiltersAsString}${
							tagFiltersAsString ? ',' : ''
						}${tagFiltersAsString}`
					)}
					<ShareProductLink
						className="ms-1"
						bundleName={''}
						isTabletMobile={isMobile || isTablet}
					/>
				</h1>
				<div className={styles.readMoreWrap}>
					{isLoading ? (
						<Skeleton count={2.75} />
					) : (
						<span>
							Chcete najít na internetu místo, kde najdete vína a destiláty z
							celého světa? Potom je tu{' '}
							<span style={{ color: '#68a910' }}>vinisto</span>. Bílé víno, víno
							červené, šumivé nebo portské, k tomu mnoho destilátů známých i v
							České republice neznámých. A chybět nesmí ani sekty či prosecca!
							Na vinistu se původem vína či destilátu neomezujeme..
						</span>
					)}
				</div>
			</div>
		</ContainerFullWidth>
	);
};

export default WinesHeader;
