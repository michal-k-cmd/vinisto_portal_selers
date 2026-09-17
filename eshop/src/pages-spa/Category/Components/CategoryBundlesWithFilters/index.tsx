'use client';

import { useContext, useEffect, useMemo, useRef } from 'react';
import cx from 'classnames';
import Card from 'Components/View/Card';
import BootstrapContainer from 'Components/View/BootstrapContainer';
import { DeviceServiceContext } from 'Services/DeviceService';
import { useScrollFixedFilters } from 'Hooks/useScrollFixedFilters';
import { NavbarContext } from 'Components/Navbar/context';
import { parseAsString, useQueryState } from 'nuqs';

import CategoryHeader from '../CategoryHeader';
import ActiveFilters from '../ActiveFilters';

import Filters from './Components/Filters';
import Bundles from './Components/Bundles';
import styles from './styles.module.css';
import { BundlesWithFiltersContext } from './context';

import { VinistoProductDllModelsApiCategoryCategory } from '@/api-types/product-api';
import { LinkWidget } from '@/domain/link-widget';

const CategoryBundlesWithFilters = ({
	category,
	categoryWithVirtualData,
	linkWidgets,
}: {
	category: VinistoProductDllModelsApiCategoryCategory;
	categoryWithVirtualData?: VinistoProductDllModelsApiCategoryCategory | null;
	linkWidgets: LinkWidget[];
}) => {
	const [categoryUrl] = useQueryState(
		'categoryUrl',
		parseAsString.withDefault('')
	);
	const { isDataLoading, activeSpecificationFilters } = useContext(
		BundlesWithFiltersContext
	);

	const initialFiltersRef = useRef<Record<any, any>[] | null>(null);
	const initializedRef = useRef(false);

	useEffect(() => {
		if (!isDataLoading && !initializedRef.current) {
			initialFiltersRef.current = activeSpecificationFilters;
			initializedRef.current = true;
		}
	}, [isDataLoading, activeSpecificationFilters]);

	const filtersAreEqual = (filtersA: any, filtersB: any) =>
		JSON.stringify(filtersA) === JSON.stringify(filtersB);

	const categoryWithVirtualDataForHeader = useMemo(() => {
		if (!initializedRef.current) {
			return categoryWithVirtualData;
		}
		if (
			categoryWithVirtualData &&
			filtersAreEqual(activeSpecificationFilters, initialFiltersRef.current)
		) {
			return categoryWithVirtualData;
		}
		return null;
	}, [activeSpecificationFilters, categoryWithVirtualData]);

	const { isMobile, isTablet } = useContext(DeviceServiceContext);
	const { isFiltersVisible: isVisible } = useContext(NavbarContext);

	const filterStyles = {
		order: 0,
		...((isMobile || isTablet) && {
			display: isVisible ? 'fixed' : 'none',
		}),
	};

	useEffect(() => {
		if (isVisible) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.removeProperty('overflow');
		}
		return () => {
			document.body.style.removeProperty('overflow');
		};
	}, [isVisible]);

	const { filtersContainerRef, filtersRef, contentRef } =
		useScrollFixedFilters();

	return (
		<BootstrapContainer
			className="align-items-start"
			containerClassName="mt-0"
		>
			<div
				className="col vinisto-category-list"
				ref={contentRef}
				style={{
					order: 1,
				}}
			>
				<CategoryHeader
					category={category}
					categoryWithVirtualData={categoryWithVirtualDataForHeader}
					linkWidgets={linkWidgets}
				/>
				<ActiveFilters />
				<Bundles />
			</div>
			<div
				className={cx('col', styles.vinistoFilter)}
				style={filterStyles}
				// to force React to treat it as a new component and re-render it when the isVisible state changes
				key={'catbwf' + (isVisible ? 1 : 0)}
				ref={filtersContainerRef}
			>
				<Card className={styles.filtersCard}>
					<Filters
						itemUrl={categoryUrl}
						parentRef={filtersRef}
					/>
				</Card>
			</div>
		</BootstrapContainer>
	);
};

export default CategoryBundlesWithFilters;
