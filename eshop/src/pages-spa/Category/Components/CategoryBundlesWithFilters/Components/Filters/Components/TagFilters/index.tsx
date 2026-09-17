import {
	FilterHeading,
	FilterOptionsFieldset,
	SelectableOption,
} from 'vinisto_ui';
import { useCallback, useContext } from 'react';
import { BundlesWithFiltersContext } from 'pages-spa/Category/Components/CategoryBundlesWithFilters/context';
import removeDiacritics from 'Helpers/removeDiacritics';
import { LocalizationContext } from 'Services/LocalizationService';
import { SALE_TAG_ID } from 'pages-spa/Category/Components/CategoryBundlesWithFilters/constants';
import { URL_PARAM_PAGE } from 'pages-spa/Category/Components/CategoryBundlesWithFilters/constants';

import OptionsList from '../OptionsList';
import { Option } from '../OptionsList/interfaces';

interface TagFiltersProps {
	tags: Record<string, any>[];
	heading: React.ReactNode;
	colorize?: boolean;
}

const TagFilters = ({
	tags,
	heading = '',
	colorize = true,
}: TagFiltersProps) => {
	const t = useContext(LocalizationContext).useFormatMessage();
	const {
		query,
		setQuery,
		specificationsQuery,
		specificationsWithBundleFilters,
	} = useContext(BundlesWithFiltersContext);

	const isLoading = specificationsQuery.isLoading;

	const urlParamTags = `${t({ id: 'tags.urlParam' })}`;

	const handleOnOptionsChange = useCallback(
		(option: Option) => () => {
			if (!option) return;

			const slugifiedValue = removeDiacritics(option.value);
			let currentTags = query[urlParamTags];

			// Ensure currentTags is always an array
			if (!Array.isArray(currentTags)) {
				currentTags = currentTags ? [currentTags] : [];
			}

			let updatedTagQuery;
			if (option.checked) {
				// Remove the tag if it's already selected
				updatedTagQuery = currentTags.filter(
					(v: string) => v !== slugifiedValue
				);
			} else {
				// Add the tag if it's not selected
				updatedTagQuery = [...currentTags, slugifiedValue];
			}

			setQuery({
				[URL_PARAM_PAGE]: undefined,
				[urlParamTags]: updatedTagQuery.length ? updatedTagQuery : undefined,
			});
		},
		[query, setQuery, urlParamTags]
	);

	const tagsAsOptions = tags.map((tag) => {
		const slugifiedValue = removeDiacritics(tag.name);
		let currentTags = query[urlParamTags];

		// Ensure currentTags is always an array for checking
		if (!Array.isArray(currentTags)) {
			currentTags = currentTags ? [currentTags] : [];
		}

		return {
			id: `${tag.id}`,
			value: tag.name,
			checked: currentTags.includes(slugifiedValue),
			style: colorize ? { backgroundColor: `${tag.color}15` } : {},
			suffix: tag.occurence,
		};
	});

	if (!specificationsWithBundleFilters.tagFilters.length) return null;

	return (
		<FilterOptionsFieldset>
			{!!heading && (
				<FilterHeading isLoading={isLoading}>{heading}</FilterHeading>
			)}
			<OptionsList
				options={tagsAsOptions}
				isLoading={isLoading}
				onChange={() => undefined}
				renderOption={(option) => (
					<div
						style={option.style}
						key={'tagfoi' + option.id}
					>
						<SelectableOption
							{...option}
							checked={option.checked}
							name={option.value}
							onChange={handleOnOptionsChange(option)}
							labelProps={{
								value:
									option.id === SALE_TAG_ID
										? `${t({ id: 'ProductsOnSale' })}`
										: option.value,
								style: colorize
									? {
											fontSize: '0.9375rem',
									  }
									: {},
								suffix: `(${option.suffix ?? 0})`,
							}}
						/>
					</div>
				)}
			/>
		</FilterOptionsFieldset>
	);
};

export default TagFilters;
