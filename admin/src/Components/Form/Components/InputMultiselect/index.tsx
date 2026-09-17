import { FC, useContext } from 'react';
import { Field } from 'react-final-form';
import { LocalizationContext } from 'Services/LocalizationService';
import Multiselect from 'Components/Multiselect';
import { InputError, Label, Validators } from 'Components/Form';

import { InputMultiselectProps } from './interfaces';

const InputMultiselect: FC<InputMultiselectProps> = ({
	name,
	options,
	onAddNewItem,
	onSelectItem,
	onDeselectItem,
	onSearchChange,
	maxWidth,
	initialSelected = [],
	identifier,
	label,
	className,
	labelClassName,
	newItem,
	validate = () => undefined,
	disabled = false,
	showError = false,
}) => {
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();

	return (
		<Field name={name}>
			{({ input, meta }) => (
				<div className={className}>
					{label !== undefined && (
						<Label
							htmlFor={identifier}
							className={labelClassName}
							isRequired={Validators.isRequired(validate)}
						>
							{typeof label == 'string' ? t({ id: label }) : label}
						</Label>
					)}
					<Multiselect
						options={options}
						initialSelected={initialSelected}
						onSearchChange={onSearchChange}
						onSelectionChange={input.onChange}
						onAddNewItem={onAddNewItem}
						onSelectItem={onSelectItem}
						onDeselectItem={onDeselectItem}
						maxWidth={maxWidth}
						disabled={disabled}
						newItem={newItem}
					/>

					<InputError
						errorMessage={meta.error || meta.submitError}
						touched={meta.touched}
						show={showError}
					/>
				</div>
			)}
		</Field>
	);
};

export default InputMultiselect;
