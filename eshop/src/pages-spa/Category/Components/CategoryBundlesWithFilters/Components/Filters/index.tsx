import {
	lazy,
	Suspense,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react';
import { entriesIn, forEach, map, set, some, values } from 'lodash-es';
import cx from 'classnames';
import { LocalizationContext } from 'Services/LocalizationService';
import { BundlesWithFiltersContext } from 'pages-spa/Category/Components/CategoryBundlesWithFilters/context';
import Loader from 'Components/View/Loader';
import { Button, buttonVariants, ResetButton } from 'vinisto_ui';
import { NavbarContext } from 'Components/Navbar/context';

import { SALE_TAG_ID } from '../../constants';

import { FilterProps } from './interfaces';
import { INITIALLY_SHOWN_FILTERS_NUMBER } from './constants';
import { generateSpecificationsToShow } from './helpers';
import styles from './styles.module.css';
import SpecificationsAsFilters from './Components/SpecificationsAsFilters';
const CloseIcon = lazy(() => import('Components/Icons/Close'));
const FilterCategoryIcon = lazy(
	() => import('Components/Icons/FilterCategory')
);
import TagFilters from './Components/TagFilters';
import { useResetFilterOnCountryChange } from './hooks/useResetFilterOnCountryChange';
// Temporary disabled
// https://vinisto.atlassian.net/jira/software/c/projects/VWA/boards/2/backlog?selectedIssue=VWA-1879)
// import IsInStockFilter from './Components/IsInStockFilter';

const Filters = (props: FilterProps) => {
	const { useFormatMessage, activeLanguageKey } =
		useContext(LocalizationContext);
	const { setIsFiltersVisible: setIsVisible } = useContext(NavbarContext);
	const t = useFormatMessage();
	const {
		activeSpecificationFilters,
		bundlesCount,
		activeTagFilters,
		specificationsWithBundleFilters,
		query,
		setQuery,
		specificationsQuery,
		totalActiveFiltersCount,
		isInStockActive,
		isDiscountedActive,
	} = useContext(BundlesWithFiltersContext);

	useResetFilterOnCountryChange({ query, setQuery });

	const { specificationFilters, tagFilters } = specificationsWithBundleFilters;

	const tagFiltersThatAreNotAvailableButChecked = activeTagFilters
		.filter((tag) => !tagFilters.find(({ id }) => id === tag.id))
		.map(({ id, color, name }) => ({
			id,
			color,
			name: name ?? '',
			occurence: 0,
		}));

	const tagsFiltersExceptSale = tagFilters
		.concat(tagFiltersThatAreNotAvailableButChecked)
		.filter((tag) => tag.id !== SALE_TAG_ID);

	const handleFilterBtn = useCallback(() => {
		if (setIsVisible) {
			setIsVisible((isOpen) => !isOpen);
		}
	}, [setIsVisible]);

	const [showAllFilters, setShowAllFilters] = useState(false);

	const specificationsToShow = useMemo(() => {
		if (specificationsQuery.isLoading) {
			return [
				{ specificationType: 'NUMBER', isLoading: true, values: {} },
				...map(Array(INITIALLY_SHOWN_FILTERS_NUMBER), () => ({
					specificationType: 'COMBO_BOX',
					isLoading: true,
					values: {},
				})),
			];
		}
		return generateSpecificationsToShow(
			specificationFilters,
			query,
			activeLanguageKey,
			showAllFilters
		);
	}, [
		specificationsQuery.isLoading,
		specificationFilters,
		query,
		activeLanguageKey,
		showAllFilters,
	]);

	const showRemoveAllFiltersButton = useMemo(
		() => some(values(query), (queryValue) => queryValue !== undefined),
		[query]
	);

	const priceSpecification = useMemo(() => {
		const priceSpecification = specificationsToShow.find(
			(specification) => specification.specificationType === 'PRICE'
		);
		if (!priceSpecification) {
			return [];
		}
		return [priceSpecification];
	}, [specificationsToShow]);

	const specificationsExceptPrice = useMemo(
		() =>
			specificationsToShow.filter(
				(specification) => specification.specificationType !== 'PRICE'
			),
		[specificationsToShow]
	);

	const shouldShowButton =
		isInStockActive ||
		isDiscountedActive ||
		activeTagFilters.length > 0 ||
		activeSpecificationFilters.length > 0;

	// TODO Should be move to context, duplicity with ActiveFilters
	const handleOnRemoveAllFilters = useCallback(() => {
		setQuery((query: Record<string, any>) => {
			const newQuery = {};
			forEach(entriesIn(query), ([key]) => {
				set(newQuery, key, undefined);
			});
			return newQuery;
		});
	}, [setQuery]);

	const handleOnToggleShowAllFilters = () =>
		setShowAllFilters((showAllFilters) => !showAllFilters);

	useEffect(() => {
		setShowAllFilters(false);
	}, [props.itemUrl]);

	return (
		<form
			className={cx(styles.filters, {
				show: true,
			})}
			ref={props.parentRef}
		>
			<div className={styles.filtersHeader}>
				<div>
					<Suspense fallback={<Loader blank />}>
						<FilterCategoryIcon className="vinisto-filter-category-icon--active" />
					</Suspense>
					<span className="color-primary ms-2">
						<span className="fw-bolder">
							{t({ id: 'category.filter.openBtn.alternative' })}
						</span>{' '}
						<span className="fst-italic">
							(
							{t(
								{ id: 'category.filter.openBtn.activeCount' },
								{ count: totalActiveFiltersCount }
							)}
							)
						</span>
					</span>
				</div>
				<button
					className="vinisto-btn vinisto-clear-btn"
					onClick={handleFilterBtn}
				>
					<Suspense fallback={<Loader blank />}>
						<CloseIcon />
					</Suspense>
				</button>
			</div>
			<div className={styles.filtersWrapper}>
				<SpecificationsAsFilters specificationsToShow={priceSpecification} />
				{!!tagsFiltersExceptSale.length && (
					<TagFilters
						tags={tagsFiltersExceptSale}
						heading={t({ id: 'tags' })}
					/>
				)}
				{/* Temporary disabled
				(https://vinisto.atlassian.net/jira/software/c/projects/VWA/boards/2/backlog?selectedIssue=VWA-1879)
				<IsInStockFilter />*/}
				<SpecificationsAsFilters
					specificationsToShow={specificationsExceptPrice}
				/>

				{!showAllFilters && specificationsQuery.isFetched && (
					<div>
						<Button
							type="button"
							onClick={handleOnToggleShowAllFilters}
						>
							{t({ id: 'category.filter.showAllFilters' })}
						</Button>
					</div>
				)}
			</div>
			{shouldShowButton && (
				<div className={styles.filtersFooter}>
					{showRemoveAllFiltersButton && (
						<ResetButton
							onClick={handleOnRemoveAllFilters}
							className="tablet-mobile-only"
						>
							{t({ id: 'category.filter.cancelSelectedFilters' })}
						</ResetButton>
					)}
					<Button
						className="tablet-mobile-only"
						onClick={handleFilterBtn}
						variant={buttonVariants.SOLID_BACKGROUND}
						type="button"
					>
						{t(
							{ id: 'category.filter.showAllBundles' },
							{ count: bundlesCount }
						)}
					</Button>
				</div>
			)}
		</form>
	);
};

export default Filters;
