import { useContext, useEffect } from 'react';
import cx from 'classnames';
import { DeviceServiceContext } from 'Services/DeviceService';
import Card from 'Components/View/Card';
import Bundles from 'pages-spa/Category/Components/CategoryBundlesWithFilters/Components/Bundles';
import Filters from 'pages-spa/Category/Components/CategoryBundlesWithFilters/Components/Filters';
import styles from 'pages-spa/Category/Components/CategoryBundlesWithFilters/styles.module.css';
import BootstrapContainer from 'Components/View/BootstrapContainer';
import ActiveFilters from 'pages-spa/Category/Components/ActiveFilters';
import { useScrollFixedFilters } from 'Hooks/useScrollFixedFilters';
import { NavbarContext } from 'Components/Navbar/context';

import TagHeader from '../TagHeader';

import { VinistoProductDllModelsApiTagTag } from '@/api-types/product-api';

const TagBundlesWithFilters = ({
	tag,
	tagUrl,
}: {
	tag: VinistoProductDllModelsApiTagTag | null | undefined;
	tagUrl: string;
}) => {
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
				<TagHeader tag={tag} />
				<ActiveFilters />
				<Bundles />
			</div>
			<div
				className={cx('col', styles.vinistoFilter)}
				style={filterStyles}
				// to force React to treat it as a new component and re-render it when the isVisible state changes
				key={'tagsbundlwf' + (isVisible ? 1 : 0)}
				ref={filtersContainerRef}
			>
				<Card className={styles.filtersCard}>
					<Filters
						itemUrl={tagUrl}
						parentRef={filtersRef}
					/>
				</Card>
			</div>
		</BootstrapContainer>
	);
};

export default TagBundlesWithFilters;
