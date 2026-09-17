import { useCallback, useContext, useMemo } from 'react';
import cx from 'classnames';
import { AsyncTypeahead, TypeaheadLabelKey } from 'react-bootstrap-typeahead';
import { Field, FieldInputProps } from 'react-final-form';
import { LocalizationContext } from 'Services/LocalizationService';
import { InputError, Label, Validators } from 'Components/Form';

import {
	AutocompleteBundleOptionBase,
	AutocompleteBundleProps,
} from './interfaces';
import { LABEL_KEY_DEFAULT, MIN_LENGTH_DEFAULT } from './constants';
import styles from './styles.module.css';

const AutocompleteBundle = <T extends AutocompleteBundleOptionBase>({
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
	options,
	labelKey = LABEL_KEY_DEFAULT,
	onSearchCallback,
	minLength = MIN_LENGTH_DEFAULT,
	renderOption,
}: AutocompleteBundleProps<T>) => {
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
		(searchingNameString: string, params = {}): void => {
			if (onSearchCallback) {
				onSearchCallback(searchingNameString, params);
			}
		},
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
							defaultInputValue={defaultInputValue ?? String(input.value)}
							isLoading={false}
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
							disabled={disabled}
							labelKey={labelKey as TypeaheadLabelKey<T>}
							renderMenuItemChildren={(option: T) => {
								if (renderOption) {
									return (
										<div className={styles.autocompleteBundleItem}>
											{renderOption(option)}
										</div>
									);
								}
								// Ensure the function always returns a valid ReactNode (hidden error)
								return String(option[labelKey as keyof T]);
							}}
						></AsyncTypeahead>

						<InputError
							errorMessage={meta.error}
							touched={meta.touched}
							show={showError}
						/>
					</div>
				);
			}}
		</Field>
	);
};

export default AutocompleteBundle;
