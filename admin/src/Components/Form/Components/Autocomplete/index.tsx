import { FC, memo, useCallback, useContext, useMemo } from 'react';
import cx from 'classnames';
import { get } from 'Helpers/lodash';
import { Typeahead } from 'react-bootstrap-typeahead';
import { Field, FieldInputProps } from 'react-final-form';
import { LocalizationContext } from 'Services/LocalizationService';
import { InputError, Label, Validators } from 'Components/Form';

import { InputAutocompleteProps } from './interfaces';
import { LABEL_KEY_DEFAULT } from './constants';

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
	validate = () => undefined,
	onChange,
	showError = false,
	disabled = false,
	options,
	labelKey = LABEL_KEY_DEFAULT,
}) => {
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();

	const validators = useMemo(
		() =>
			Array.isArray(validate) ? Validators.compose(...validate) : validate,
		[validate]
	);

	const handleOnChange = useCallback(
		(input: FieldInputProps<Record<any, any>[]>) =>
			(nextSelected: Record<any, any>[]) => {
				input.onChange(nextSelected);
				if (typeof onChange === 'function') {
					onChange(nextSelected);
				}
			},
		[]
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

						<Typeahead
							clearButton
							id={identifier}
							labelKey={labelKey}
							onChange={handleOnChange(input)}
							options={options}
							placeholder={placeholder ? `${t({ id: placeholder })}` : ''}
							selected={input.value ? input.value : []}
							paginationText={
								t({
									id: 'admin.components.form.inputAutocomplete.paginationText',
								}) as string
							}
							disabled={disabled}
						/>

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

export default memo(InputAutocomplete);
