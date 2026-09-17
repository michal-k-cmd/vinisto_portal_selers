import {
	ChangeEventHandler,
	FC,
	useCallback,
	useContext,
	useMemo,
} from 'react';
import { CFormSelect } from '@coreui/react';
import { get } from 'lodash-es';
import { Field, FieldInputProps } from 'react-final-form';
import { LocalizationContext } from 'Services/LocalizationService';
import { composeValidators } from 'Components/Form/validators';
import { InputError, Label, Validators } from 'Components/Form';

import { InputSelectProps } from './interfaces';

/**
 * @category Component Input Select
 */
const InputSelect: FC<InputSelectProps> = ({
	name,
	identifier,
	label,
	labelClassName,
	className,
	validate = () => undefined,
	onChange,
	disabled = false,
	showError = false,
	options,
}) => {
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();

	const validators = useMemo(
		() => (Array.isArray(validate) ? composeValidators(...validate) : validate),
		[validate]
	);

	const handleOnChange = useCallback<
		(input: FieldInputProps<string>) => ChangeEventHandler<HTMLSelectElement>
	>(
		(input) => (event) => {
			input.onChange(event);
			if (typeof onChange === 'function') {
				onChange(event.target.value);
			}
		},
		[onChange]
	);

	return (
		<Field
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
								{typeof label == 'string' ? t({ id: label }) : label}
							</Label>
						)}
						<CFormSelect
							name={name}
							id={identifier}
							options={options}
							value={input.value}
							onChange={handleOnChange(input)}
							disabled={disabled}
							className="form-control"
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

export default InputSelect;
