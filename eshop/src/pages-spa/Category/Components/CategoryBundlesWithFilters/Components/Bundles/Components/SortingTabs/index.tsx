import { BundlesWithFiltersContext } from 'pages-spa/Category/Components/CategoryBundlesWithFilters/context';
import { BundleSorting } from 'pages-spa/Category/Components/CategoryBundlesWithFilters/interfaces';
import { useCallback, useContext } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';
import { TabNavItem, TabNavItemList } from 'vinisto_ui';
import { SORTING } from 'pages-spa/Category/Components/CategoryBundlesWithFilters/constants';

const SortingTabs = () => {
	const t = useContext(LocalizationContext).useFormatMessage();
	const { sorting: activeSorting, setSorting } = useContext(
		BundlesWithFiltersContext
	);

	const handleOnChangeSorting = useCallback(
		(sorting: BundleSorting) => () => {
			setSorting(sorting);
		},
		[setSorting]
	);

	return (
		<TabNavItemList>
			{SORTING?.map((sorting) => (
				<li
					key={'catbwftitlei' + sorting.title}
					className="list-group-item"
				>
					<TabNavItem
						as="a"
						isActive={sorting.title === activeSorting.title}
						onClick={handleOnChangeSorting(sorting)}
						aria-current="page"
						data-content={t({ id: sorting.title })}
					>
						{t({ id: sorting.title })}
					</TabNavItem>
				</li>
			))}
		</TabNavItemList>
	);
};

export default SortingTabs;
