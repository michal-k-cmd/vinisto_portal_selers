import { useCallback, useContext, useState } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';
import { upperFirst } from 'lodash-es';
import { SearchBox, SelectableOption, ShowMore } from 'vinisto_ui';

import {
	INITIALLY_SHOWN_OPTIONS_NUMBER,
	SHOW_ALL_OPTIONS_THRESHOLD,
} from '../../constants';

import { getFilteredOptions, getUpdatedOptionsOnClick } from './helpers';
import { Option, OptionsListProps } from './interfaces';
import styles from './styles.module.css';

const OptionsList = ({
	type = 'checkbox',
	options = [],
	showMax = INITIALLY_SHOWN_OPTIONS_NUMBER,
	isLoading = false,
	search: searchProp = '',
	searchPlaceholderValue = '',
	onChange = () => undefined,
	onSearchChange,
	renderOption,
}: OptionsListProps) => {
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();

	const [search, setSearch] = useState(searchProp);
	const [showRest, setShowRest] = useState(false);

	const filteredOptionsData = getFilteredOptions(
		options,
		showMax,
		search,
		showRest
	);
	const filteredOptions = filteredOptionsData?.options ?? [];
	const totalOptionsLength =
		filteredOptionsData?.totalLength ?? filteredOptions?.length;

	const handleOnSearch = useCallback(
		(searchVal: string) => {
			if (typeof onSearchChange === 'function')
				return onSearchChange(searchVal);
			setSearch(searchVal);
		},
		[onSearchChange]
	);

	const shouldShowMessage = (() => {
		const isEveryOptionChecked = filteredOptions.every(
			(option) => option.checked === true
		);

		const noOptionsLeft = totalOptionsLength - filteredOptions?.length === 0;
		const showAllOptions = showMax === 0;

		if (isLoading) return false;
		if (showAllOptions) return false;
		if (!showRest && noOptionsLeft) return false;
		if (showRest && isEveryOptionChecked) return false;

		return true;
	})();

	const onCheck = useCallback(
		(option: Option) =>
			onChange(getUpdatedOptionsOnClick(type, option, options)),
		[type, options, onChange]
	);

	const shouldShowSearch = (() => {
		if (isLoading) return false;
		if (search.length) return true;
		if (totalOptionsLength > SHOW_ALL_OPTIONS_THRESHOLD) return true;
		return false;
	})();

	return (
		<div>
			{shouldShowSearch && (
				<SearchBox
					value={search}
					onChange={handleOnSearch}
					placeholder={searchPlaceholderValue}
					onKeyDown={async (e) => {
						if (e.key === 'Enter') {
							e.preventDefault();
						}
					}}
				/>
			)}
			<div className={styles.optionList}>
				{isLoading
					? Array.from({ length: 3 }, () => ({})).map((_, index: number) => (
							<SelectableOption
								key={'catvwfol' + index}
								name={String(index)}
								labelProps={{}}
								isLoading={isLoading}
								order={index}
							/>
					  ))
					: filteredOptions.length
					? filteredOptions.map((option: Option, index: number) =>
							typeof renderOption === 'function' ? (
								renderOption(option)
							) : (
								<SelectableOption
									key={'catvwafsl' + index}
									name={option.value ?? String(index)}
									labelProps={{
										prefix: option.prefix,
										placeholder: option.value,
										value: upperFirst(option.value ?? String(index)),
										suffix: option.suffix,
									}}
									checked={!!option.checked}
									onChange={() => onCheck(option)}
									disabled={option.disabled}
									isLoading={isLoading}
								/>
							)
					  )
					: t({ id: 'category.filter.search.noResults' })}
			</div>

			{shouldShowMessage && (
				<ShowMore
					onClick={() => setShowRest((show) => !show)}
					showMore={!showRest}
					showLessLabel={t({ id: 'category.filter.showLess' })}
					showMorelabel={t(
						{ id: 'category.filter.showAnother' },
						{
							value: totalOptionsLength - filteredOptions?.length,
						}
					)}
					className="mt-2"
				/>
			)}
		</div>
	);
};

export default OptionsList;
