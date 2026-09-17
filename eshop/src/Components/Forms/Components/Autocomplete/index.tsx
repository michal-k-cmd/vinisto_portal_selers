import { ElementType, FocusEvent, MouseEvent, useRef } from 'react';
import { Combobox } from '@headlessui/react';
import cx from 'classnames';

import Input from '../Input';

import { AutocompleteProps } from './interfaces';
import styles from './styles.module.css';

const Autocomplete = <T extends Record<string, any>>({
	value,
	onChange,
	placeholderValue,
	selectedItem,
	label,
	className,
	inputLeftContent,
	inputRightContent,
	contentWrapperClassName,
	inputsWrapperClassName,
	dropdownClassName,
	isDropdownMenuOpen,
	dropdownContent,
	inputPlaceholderProps,
	inputProps,
	onSelect,
	dataTestid,
}: AutocompleteProps<T>) => {
	const buttonRef = useRef<HTMLDivElement>(null);
	const inputCombobox = useRef<HTMLInputElement>(null);

	return (
		<Combobox
			value={selectedItem}
			onChange={onSelect}
		>
			{({ open, ...props }) => {
				const shouldShowDropdown =
					typeof isDropdownMenuOpen !== 'boolean' ? open : isDropdownMenuOpen;

				return (
					<div className={className}>
						{label}
						<div className={cx(styles.contentWrapper, contentWrapperClassName)}>
							{inputLeftContent}
							<Combobox.Button
								ref={buttonRef}
								as="div"
								onClick={(e: MouseEvent<HTMLDivElement>) =>
									shouldShowDropdown ? e.preventDefault() : undefined
								}
								className={cx(styles.inputsWrapper, inputsWrapperClassName)}
							>
								<Input
									value={
										typeof placeholderValue === 'function'
											? placeholderValue({ open, ...props, inputValue: value })
											: placeholderValue
									}
									readOnly
									disabled
									{...inputPlaceholderProps}
									className={cx(
										styles.placeholderInput,
										inputPlaceholderProps?.className
									)}
								/>
								<Combobox.Input
									as={Input}
									value={value}
									displayValue={() => value}
									onChange={onChange}
									autoComplete="on"
									{...(inputProps as ElementType<HTMLObjectElement>)}
									onFocus={(e: FocusEvent<HTMLInputElement>) => {
										if (value?.length === 0) {
											buttonRef.current?.click();
										}
										if (typeof inputProps?.onFocus === 'function') {
											inputProps?.onFocus(e);
										}
									}}
									className={cx(styles.input, inputProps?.className)}
									wrapperClassName={cx(
										styles.inputWrapper,
										inputProps?.wrapperClassName
									)}
									ref={inputCombobox}
									data-testid={dataTestid}
								/>
								<Combobox.Options
									as="div"
									className={cx(styles.dropdown, dropdownClassName)}
									static={
										typeof isDropdownMenuOpen !== 'boolean'
											? undefined
											: !!isDropdownMenuOpen
									}
								>
									{shouldShowDropdown && (
										<>
											{typeof dropdownContent === 'function'
												? dropdownContent({
														open: shouldShowDropdown,
														...props,
														inputValue: value,
												  })
												: dropdownContent}
										</>
									)}
								</Combobox.Options>
							</Combobox.Button>
							{inputRightContent}
						</div>
					</div>
				);
			}}
		</Combobox>
	);
};

Autocomplete.Option = Combobox.Option;

export default Autocomplete;
