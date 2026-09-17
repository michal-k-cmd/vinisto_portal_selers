import { useCallback, useContext } from 'react';
import { BundlesWithFiltersContext } from 'pages-spa/Category/Components/CategoryBundlesWithFilters/context';
import { LocalizationContext } from 'Services/LocalizationService';
import { URL_PARAM_PAGE } from 'pages-spa/Category/Components/CategoryBundlesWithFilters/constants';
import { FilterOptionsFieldset } from 'vinisto_ui';

import OptionsList from '../OptionsList';
import { Option } from '../OptionsList/interfaces';

// This component is very similar to IsInStockFilter (minus heading), consider refactoring them into a single component
const IsDiscountedFilter = () => {
	const t = useContext(LocalizationContext).useFormatMessage();
	const {
		query,
		setQuery,
		specificationsQuery,
		isDiscountedParam,
		specificationsWithBundleFilters,
	} = useContext(BundlesWithFiltersContext);

	const { isDiscountedFilters } = specificationsWithBundleFilters;
	const isDiscountedOccurence = isDiscountedFilters.find(
		(filter) => filter.value === true
	)?.occurence;

	const isLoading = specificationsQuery.isLoading;

	const handleOnOptionsChange = useCallback(
		(options: Option[]) => {
			const [option] = options;

			const updatedQuery = {
				...query,
				[URL_PARAM_PAGE]: undefined,
				[isDiscountedParam]: option.checked ? t({ id: 'yes' }) : undefined,
			};
			setQuery(updatedQuery);
		},
		[isDiscountedParam, query, setQuery, t]
	);

	return (
		<FilterOptionsFieldset>
			<OptionsList
				options={[
					{
						id: 'isDiscounted',
						value: `${t({ id: 'ProductsOnSale' })}`,
						checked: query[isDiscountedParam] === `${t({ id: 'yes' })}`,
						suffix: `(${isDiscountedOccurence ?? 0})`,
					},
				]}
				isLoading={isLoading}
				onChange={handleOnOptionsChange}
			/>
		</FilterOptionsFieldset>
	);
};

export default IsDiscountedFilter;
