import { FC, useCallback, useContext, useMemo } from 'react';
import cx from 'classnames';
import { get } from 'lodash-es';
import { Typeahead } from 'react-bootstrap-typeahead';
import { Field, FieldInputProps } from 'react-final-form';
import { LocalizationContext } from 'Services/LocalizationService';
import { InputError, Label } from 'Components/Form';
import { composeValidators } from 'Components/Form/validators';

import {
	AutocompleteTypeaheadModel,
	InputAutocompleteProps,
} from './interfaces';

/**
 * @category Component Input Autocomplete
 */
const InputAutocomplete: FC<InputAutocompleteProps> = ({
	name,
	identifier,
	label,
	labelClassName,
	placeholder,
	className,
	validate,
	onChange,
	showError = false,
	disabled = false,
	options,
	labelKey = 'label',
	isRequired = false,
}) => {
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();

	const handleOnChange = useCallback(
		(input: FieldInputProps<AutocompleteTypeaheadModel>) =>
			(nextSelected: AutocompleteTypeaheadModel[]) => {
				input.onChange(nextSelected);
				if (typeof onChange === 'function') {
					onChange(nextSelected);
				}
			},
		[onChange]
	);

	const validators = useMemo(
		() => (Array.isArray(validate) ? composeValidators(...validate) : validate),
		[validate]
	);

	return (
		<Field<AutocompleteTypeaheadModel[]>
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
								isRequired={isRequired}
								className={labelClassName}
							>
								{typeof label === 'string' ? t({ id: label }) : label}
							</Label>
						)}

						<Typeahead
							clearButton
							id={identifier}
							labelKey={labelKey}
							onChange={handleOnChange(input)}
							options={options}
							placeholder={
								placeholder !== undefined ? `${t({ id: placeholder })}` : ''
							}
							selected={input.value ? input.value : []}
							disabled={disabled}
						/>

						<InputError
							errorMessage={get(meta, 'error') || get(meta, 'submitError')}
							touched={get(meta, 'touched', false)}
							show={showError}
						/>
					</div>
				);
			}}
		</Field>
	);
};

export default InputAutocomplete;
