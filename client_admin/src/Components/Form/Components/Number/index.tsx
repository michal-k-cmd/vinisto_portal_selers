import {
	ChangeEventHandler,
	FC,
	useCallback,
	useContext,
	useMemo,
} from 'react';
import { get } from 'lodash-es';
import InputSpinner from 'Components/Form/Components/Number/Components/InputSpinner';
import { Field, FieldInputProps } from 'react-final-form';
import { composeValidators } from 'Components/Form/validators';
import { LocalizationContext } from 'Services/LocalizationService';
import { InputError, Label, Validators } from 'Components/Form';

import { InputNumberProps } from './interfaces';

/**
 * @category Component Input Number
 */
const InputNumber: FC<InputNumberProps> = ({
	name,
	identifier,
	label,
	labelClassName,
	className,
	validate,
	onChange,
	showError = false,
	disabled = false,
}) => {
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();

	const validators = useMemo(
		() => (Array.isArray(validate) ? composeValidators(...validate) : validate),
		[validate]
	);

	const handleOnChange = useCallback<
		(input: FieldInputProps<number>) => ChangeEventHandler<HTMLInputElement>
	>(
		(input) => (event) => {
			input.onChange(event);
			if (typeof onChange === 'function') {
				onChange(Number(event.target.value));
			}
		},
		[onChange]
	);

	return (
		<Field<number>
			name={name}
			validate={validators}
		>
			{(fieldPropTypes) => {
				const { input, meta } = fieldPropTypes;

				return (
					<div className={className}>
						{label !== undefined && (
							<Label
								htmlFor={identifier}
								isRequired={Validators.isRequired(validate)}
								className={labelClassName}
							>
								{typeof label === 'string' ? t({ id: label }) : label}
							</Label>
						)}

						<InputSpinner
							type={'float'}
							precision={2}
							max={10000}
							min={0}
							step={1}
							value={input.value}
							onChange={handleOnChange(input)}
							variant="primary"
							size="md"
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

export default InputNumber;
