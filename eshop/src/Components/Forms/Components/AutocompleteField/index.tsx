import { Combobox } from '@headlessui/react';
import cx from 'classnames';
import { useController } from 'react-hook-form';
import Form from 'Components/Forms';

import { AutocompleteFieldProps } from './interfaces';
import styles from './styles.module.css';

const AutocompleteField = ({
	id,
	name,
	label,
	placeholder,
	wrapperClassName,
	labelClassName,
	inputClassName,
	messageClassName,
	showSuccess = false,
	showSuccessIcon = false,
	showError = true,
	successMessage,
	isRequired = false,
	rules,
	setValueOnSelect,
	dropdownContent,
	inputLeftContent,
	inputRightContent,
	onSelect,
	inputProps,
	inputPlaceholderProps,
	onChangeInput,
	dataTestid,
}: AutocompleteFieldProps) => {
	const {
		field,
		fieldState: { error, isTouched },
	} = useController({
		name,
		rules,
	});

	return (
		<div className={cx(styles.wrapper, wrapperClassName)}>
			<Form.Autocomplete
				placeholderValue={({ open, ...props }) =>
					typeof placeholder === 'function'
						? placeholder({ open, ...props })
						: placeholder ?? ''
				}
				label={
					label ? (
						<Combobox.Label
							as={Form.Label}
							className={labelClassName}
							isRequired={isRequired || !!rules?.required}
						>
							{label}
						</Combobox.Label>
					) : undefined
				}
				value={field.value?.value ?? ''}
				onChange={(e) => {
					field.onChange({
						target: {
							value: {
								...field.value,
								value: e.target?.value,
								selectedItem: null,
							},
						},
					});
					onChangeInput && onChangeInput(e, '');
				}}
				selectedItem={field.value?.selectedItem ?? null}
				onSelect={(selectedItem) => {
					const value = setValueOnSelect(selectedItem, field);
					field.value = { ...field.value, value, selectedItem };
					if (typeof onSelect === 'function') {
						onSelect(selectedItem);
					}
				}}
				inputPlaceholderProps={inputPlaceholderProps}
				inputProps={{
					id,
					ref: field.ref,
					name: field.name,
					onBlur: field.onBlur,
					className: inputClassName,
					isError: !!error && showError,
					isSuccess: !error && isTouched && showSuccess,
					showSuccessIcon: showSuccess && showSuccessIcon,
					...inputProps,
				}}
				dropdownContent={dropdownContent}
				inputLeftContent={inputLeftContent}
				inputRightContent={inputRightContent}
				dataTestid={dataTestid}
			/>
			{!!error && (
				<Form.Message
					className={messageClassName}
					variant="error"
				>
					{error.message}
				</Form.Message>
			)}
			{!error && isTouched && successMessage && (
				<Form.Message
					className={messageClassName}
					variant="success"
				>
					{successMessage}
				</Form.Message>
			)}
		</div>
	);
};

export default AutocompleteField;
