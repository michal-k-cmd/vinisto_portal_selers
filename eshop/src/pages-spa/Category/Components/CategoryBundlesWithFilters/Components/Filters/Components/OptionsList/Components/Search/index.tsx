/* eslint-disable jsx-a11y/label-has-associated-control */
import * as React from 'react';
import { get } from 'lodash-es';
import { LocalizationContext } from 'Services/LocalizationService';

import { ISearchOptions } from './interfaces';

const Search: React.FC<ISearchOptions> = (props): JSX.Element => {
	const localizationContext = React.useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();
	const search: string = get(props, 'search', '');
	const placeholderValue = get(props, 'placeholderValue', '');
	const onSearchChange: (search: string) => void = get(
		props,
		'onSearchChange',
		() => {}
	);

	return (
		<label
			htmlFor="search-variety"
			className="vinisto-filter__search-label"
		>
			<input
				className="vinisto-filter__search-input"
				name="search-variety"
				placeholder={`${t(
					{ id: 'category.filter.search.placeholder' },
					{ value: placeholderValue }
				)}`}
				type="text"
				value={search}
				onChange={(e) => onSearchChange(get(e, 'target.value', ''))}
			/>
		</label>
	);
};

export default Search;
