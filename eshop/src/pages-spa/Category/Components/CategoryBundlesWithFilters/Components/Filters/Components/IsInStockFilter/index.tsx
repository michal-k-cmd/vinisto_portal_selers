import { FilterHeading, FilterOptionsFieldset } from 'vinisto_ui';
import { ReactNode, useCallback, useContext } from 'react';
import { BundlesWithFiltersContext } from 'pages-spa/Category/Components/CategoryBundlesWithFilters/context';
import { LocalizationContext } from 'Services/LocalizationService';
import { URL_PARAM_PAGE } from 'pages-spa/Category/Components/CategoryBundlesWithFilters/constants';

import OptionsList from '../OptionsList';
import { Option } from '../OptionsList/interfaces';

const IsInStockFilter = () => {
	const t = useContext(LocalizationContext).useFormatMessage();
	const { query, setQuery, specificationsQuery, isInStockParam } = useContext(
		BundlesWithFiltersContext
	);

	const isLoading = specificationsQuery.isLoading;

	const handleOnOptionsChange = useCallback(
		(options: Option[]) => {
			let isInStock = false;
			let isNotInStock = false;

			options.forEach((option) => {
				option.checked && option.id === 'isInStock' && (isInStock = true);
				option.checked && option.id === 'isNotInStock' && (isNotInStock = true);
			});

			const inStockParam: ReactNode =
				(isInStock && isNotInStock) || (!isInStock && !isNotInStock)
					? undefined
					: isInStock
					? t({ id: 'yes' })
					: t({ id: 'no' });

			const updatedQuery = {
				...query,
				[URL_PARAM_PAGE]: undefined,
				[isInStockParam]: inStockParam,
				AllStock: isInStock && isNotInStock ? true : undefined,
			};

			setQuery(updatedQuery);
		},
		[isInStockParam, query, setQuery, t]
	);

	return (
		<FilterOptionsFieldset>
			<FilterHeading isLoading={isLoading}>
				{t({ id: 'availability' })}
			</FilterHeading>
			<OptionsList
				options={[
					{
						id: 'isInStock',
						value: `${t({ id: 'bundleAvailability.available' })}`,
						checked:
							query[isInStockParam] === `${t({ id: 'yes' })}` || query.AllStock,
						suffix: '',
					},
					{
						id: 'isNotInStock',
						value: `${t({ id: 'bundleAvailability.outOfStock' })}`,
						checked:
							query[isInStockParam] === `${t({ id: 'no' })}` || query.AllStock,
						suffix: '',
					},
				]}
				isLoading={isLoading}
				onChange={handleOnOptionsChange}
			/>
		</FilterOptionsFieldset>
	);
};

export default IsInStockFilter;
