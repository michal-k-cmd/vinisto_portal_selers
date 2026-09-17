import cx from 'classnames';
import SearchResultBundleItem from 'Components/Navbar/Components/Search/SearchResultBundleItem';
import { useContext, useMemo, useState } from 'react';
import HexagonalRibbon from 'vinisto_ui/src/components/hexagonal-ribbon';
import FilterDropdownArrowIcon from 'Components/Icons/FilterDropdownArrow';
import { LocalizationContext } from 'Services/LocalizationService';
import useGetBundleInSets from 'Hooks/Queries/useGetBundleInSets';

import styles from './styles.module.css';

interface BundleInSetsProps {
	bundleId: string;
}

const BundleInSetsTop = ({ bundleId }: BundleInSetsProps) => {
	const t = useContext(LocalizationContext).useFormatMessage();

	const { data: bundlesInSets } = useGetBundleInSets({ bundleId });

	const { firstBundle, restBundles, count } = useMemo(() => {
		if (!bundlesInSets?.length)
			return { firstBundle: null, restBundles: null, count: 0 };
		return {
			firstBundle: bundlesInSets[0],
			restBundles: bundlesInSets.slice(1),
			count: bundlesInSets.length,
		};
	}, [bundlesInSets]);

	const [isExpanded, setIsExpanded] = useState(false);

	return firstBundle ? (
		<section className={styles.component}>
			<HexagonalRibbon
				hasRightHexagon={true}
				className={styles.ribbon}
				backgroundColor="rgb(var(--vinisto-color-white))"
			>
				<h2 className={styles.title}>
					{t(
						{ id: 'bundle.buyInASet' },
						{ count: count > 1 ? `(${count})` : '' }
					)}
				</h2>
			</HexagonalRibbon>
			<div className={styles.items}>
				<SearchResultBundleItem
					bundle={firstBundle}
					className={styles.item}
					displayCta={true}
					key={firstBundle.id}
				/>
				{!!restBundles?.length && (
					<div
						style={{ '--row-count': restBundles.length }}
						className={cx(styles.expander, isExpanded && styles.expanded)}
					>
						{restBundles?.map((bundle) => (
							<div
								key={bundle.id}
								className={styles.expanderItem}
							>
								<SearchResultBundleItem
									className={styles.item}
									bundle={bundle}
									displayCta={true}
								/>
							</div>
						))}
					</div>
				)}
				{!!restBundles?.length && (
					<button
						onClick={() => setIsExpanded(!isExpanded)}
						className={styles.toggleExpandedButton}
					>
						{isExpanded
							? t({ id: 'bundle.lessSets' })
							: t({ id: 'bundle.moreSets' })}
						<FilterDropdownArrowIcon
							className={cx(
								styles.showMoreArrow,
								isExpanded && styles.expanded
							)}
						/>
					</button>
				)}
			</div>
		</section>
	) : null;
};

export default BundleInSetsTop;
