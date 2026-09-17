import { memo, useContext, useMemo } from 'react';
import { Field } from 'react-final-form';
import { InputError, Label, Validators } from 'Components/Form';
import { LocalizationContext } from 'Services/LocalizationService';
import { FormControlProps } from 'Components/Form/interfaces';
import { composeValidators } from 'Components/Form/validators';
import IconPicker from 'Components/IconPicker';

interface IconPickerInputProps
	extends Omit<
			React.HTMLAttributes<HTMLDivElement>,
			'onChange' | 'defaultValue' | 'validate'
		>,
		FormControlProps {
	name: string;
	className?: string;
	label: string | React.ReactNode;
	activeIcon?: string;
	onSelectCallback?: (value?: string) => void;
}

const IconPickerInput = ({
	name,
	className,
	label,
	identifier,
	activeIcon,
	showError = false,
	onSelectCallback = () => undefined,
	validate = () => undefined,
	...props
}: IconPickerInputProps) => {
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();

	const validators = useMemo(
		() => (Array.isArray(validate) ? composeValidators(...validate) : validate),
		[validate]
	);

	return (
		<div className={className}>
			{label !== undefined && (
				<Label
					htmlFor={identifier}
					isRequired={Validators.isRequired(validate)}
				>
					{typeof label === 'string' ? t({ id: label }) : label}
				</Label>
			)}
			<Field
				name={name}
				validate={validators}
				{...props}
			>
				{({ input, meta }) => {
					return (
						<>
							<IconPicker
								activeIcon={activeIcon}
								onChange={(value) => {
									if (typeof props.onChange === 'function')
										props.onChange(value);
									input.onChange(value);
									onSelectCallback(value);
								}}
							/>
							<InputError
								errorMessage={meta.error || meta.submitError}
								touched={meta.touched}
								show={showError}
							/>
						</>
					);
				}}
			</Field>
		</div>
	);
};

export default memo(IconPickerInput);
