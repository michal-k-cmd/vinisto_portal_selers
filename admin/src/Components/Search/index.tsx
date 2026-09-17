import * as React from 'react';
import { get } from 'Helpers/lodash';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import { LocalizationContext } from 'Services/LocalizationService';

const SideBar: React.FC<Record<any, any>> = (props): JSX.Element => {
	const localizationContext = React.useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();

	const autocompleteOptions = get(props, 'autocompleteOptions');
	const handleOnSearch = get(props, 'handleOnSearch');
	const handleOnChange = get(props, 'handleOnChange');

	return (
		<AsyncTypeahead
			isLoading={false}
			onSearch={handleOnSearch}
			onChange={handleOnChange}
			options={autocompleteOptions}
			id="search-bar"
			className="vinisto-search-bar-result"
			minLength={3}
			filterBy={() => true}
			placeholder={`${t({ id: 'search' })}`}
			aria-label={`${t({ id: 'search' })}`}
			emptyLabel={`${t({ id: 'search.popup.noResults' })}`}
		></AsyncTypeahead>
	);
};

export default SideBar;
