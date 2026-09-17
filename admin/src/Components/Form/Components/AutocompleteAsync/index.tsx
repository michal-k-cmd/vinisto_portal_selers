import { useCallback, useContext, useMemo } from 'react';
import cx from 'classnames';
import { debounce, get } from 'Helpers/lodash';
import { AsyncTypeahead, TypeaheadLabelKey } from 'react-bootstrap-typeahead';
import { Field, FieldInputProps } from 'react-final-form';
import { LocalizationContext } from 'Services/LocalizationService';
import { InputError, Label, Validators } from 'Components/Form';

import {
	AutocompleteOptionBase,
	InputAutocompleteAsyncProps,
} from './interfaces';
import { LABEL_KEY_DEFAULT, MIN_LENGTH_DEFAULT } from './constants';

/**
 * @category Component Input Async Autocomplete
 */
const InputAutocompleteAsync = <T extends AutocompleteOptionBase>({
	name,
	identifier,
	label,
	labelClassName,
	placeholder,
	defaultInputValue,
	className,
	validate = () => undefined,
	onChange,
	showError = false,
	disabled = false,
	isLoading = false,
	options,
	labelKey = LABEL_KEY_DEFAULT,
	onSearchCallback,
	minLength = MIN_LENGTH_DEFAULT,
}: InputAutocompleteAsyncProps<T>) => {
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();

	const validators = useMemo(
		() =>
			Array.isArray(validate) ? Validators.compose(...validate) : validate,
		[validate]
	);

	const handleOnChange = useCallback(
		(input: FieldInputProps<T[]>) => (nextSelected: T[]) => {
			input.onChange(nextSelected);
			if (typeof onChange === 'function') {
				onChange(nextSelected);
			}
		},
		[onChange]
	);

	const handleOnSearch = useCallback(
		debounce((searchingNameString: string): void => {
			if (onSearchCallback) {
				onSearchCallback(searchingNameString);
			}
		}, 275),
		[onSearchCallback]
	);

	return (
		<Field
			name={name}
			validate={validators}
		>
			{(fieldPropTypes) => {
				const { input, meta } = fieldPropTypes;
				return (
					<div className={cx('admin-select', className)}>
						{label !== undefined && (
							<Label
								htmlFor={identifier}
								isRequired={Validators.isRequired(validate)}
								className={labelClassName}
							>
								{typeof label === 'string' ? t({ id: label }) : label}
							</Label>
						)}
						<AsyncTypeahead
							defaultInputValue={
								defaultInputValue ??
								(typeof input.value === 'string' ? String(input.value) : '')
							}
							isLoading={isLoading}
							onSearch={handleOnSearch}
							onChange={handleOnChange(input)}
							options={options}
							id="search-bar"
							className="vinisto-search-bar-result"
							minLength={minLength}
							filterBy={() => true}
							placeholder={placeholder ? `${t({ id: placeholder })}` : ''}
							aria-label={`${t({ id: 'search' })}`}
							emptyLabel={`${t({ id: 'search.popup.noResults' })}`}
							searchText={`${t({ id: 'searching' })}`}
							disabled={disabled}
							labelKey={labelKey as TypeaheadLabelKey<T>}
						></AsyncTypeahead>

						<InputError
							errorMessage={get(meta, 'error')}
							touched={get(meta, 'touched', false)}
							show={showError}
						/>
					</div>
				);
			}}
		</Field>
	);
};

export default InputAutocompleteAsync;
