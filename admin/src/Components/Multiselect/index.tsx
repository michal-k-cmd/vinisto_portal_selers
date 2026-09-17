import {
	MouseEvent,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import cx from 'classnames';
import { IoAdd, IoClose } from 'react-icons/io5';
import { LocalizationContext } from 'Services/LocalizationService';

import { MultiselectProps, Option } from './interfaces';
import { MULTISELECT_KEYBOARD_KEYS, MULTISELECT_MAX_WIDTH } from './constants';
import './styles.css';

const Multiselect = ({
	options,
	initialSelected = [],
	onSearchChange,
	onSelectionChange,
	newItem,
	onAddNewItem,
	onSelectItem,
	onDeselectItem,
	maxWidth = MULTISELECT_MAX_WIDTH,
	disabled = false,
	placeholder = '',
}: MultiselectProps) => {
	const [selectedItems, setSelectedItems] = useState(initialSelected);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [inputText, setInputText] = useState('');

	const [focusedOptionIndex, setFocusedOptionIndex] = useState(-1);
	const componentRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);
	const lastAutoSelectedNewItemValue = useRef<string>();
	const [focusedOptionRef, setFocusedOptionRef] = useState<HTMLElement | null>(
		null
	);

	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();

	const isExactMatch = useMemo(() => {
		return options.some(
			(option) => option.label.toLowerCase() === inputText.toLowerCase()
		);
	}, [inputText, options]);

	const [isInputFocused, setIsInputFocused] = useState(false);

	const filteredOptions = useMemo(
		() =>
			options.filter((option) =>
				option.label.toLowerCase().includes(inputText.toLowerCase())
			),
		[inputText, options]
	);

	const toggleDropdown = () => {
		if (disabled) return;

		setIsDropdownOpen(!isDropdownOpen);
	};

	const handleCreateNewItem = (e: MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		if (!onAddNewItem) return;
		const addedItem: Option = { value: inputText, label: inputText };
		onAddNewItem(addedItem);

		setInputText('');
	};

	const handleAddSelectedItem = useCallback(
		(option: Option) => {
			if (disabled) return;

			const isSelected = selectedItems.some(
				(item) => item.value === option.value
			);
			if (isSelected) {
				const newSelectedItems = selectedItems.filter(
					(item) => item.value !== option.value
				);
				setSelectedItems(newSelectedItems);
				if (onSelectionChange) onSelectionChange(newSelectedItems);
				if (onDeselectItem) onDeselectItem(option);
			} else {
				const newSelectedItems = [...selectedItems, option];
				setSelectedItems(newSelectedItems);
				if (onSelectionChange) onSelectionChange(newSelectedItems);
				if (onSelectItem) onSelectItem(option);
			}
		},
		[disabled, onDeselectItem, onSelectItem, onSelectionChange, selectedItems]
	);

	const handleRemoveSelectedItem = (option: Option) => {
		if (disabled) return;

		const newSelectedItems = selectedItems.filter(
			(item) => item.value !== option.value
		);
		setSelectedItems(newSelectedItems);
		if (onSelectionChange) onSelectionChange(newSelectedItems);
		if (onDeselectItem) onDeselectItem(option);
	};

	// Add new item to selected items
	useEffect(() => {
		if (!newItem?.value) {
			lastAutoSelectedNewItemValue.current = undefined;
			return;
		}

		if (lastAutoSelectedNewItemValue.current === newItem.value) return;

		lastAutoSelectedNewItemValue.current = newItem.value;

		if (!selectedItems.some((item) => item.value === newItem.value)) {
			handleAddSelectedItem(newItem);
		}
	}, [newItem, handleAddSelectedItem, selectedItems]);

	useEffect(() => {
		const input = inputRef.current;

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === MULTISELECT_KEYBOARD_KEYS.ARROW_DOWN) {
				e.preventDefault();
				setFocusedOptionIndex((prevIndex) =>
					prevIndex < filteredOptions.length - 1 ? prevIndex + 1 : prevIndex
				);
			} else if (e.key === MULTISELECT_KEYBOARD_KEYS.ARROW_UP) {
				e.preventDefault();
				setFocusedOptionIndex((prevIndex) =>
					prevIndex > 0 ? prevIndex - 1 : prevIndex
				);
			} else if (e.key === MULTISELECT_KEYBOARD_KEYS.ENTER) {
				e.preventDefault();
				if (
					focusedOptionIndex >= 0 &&
					focusedOptionIndex < filteredOptions.length
				) {
					handleAddSelectedItem(filteredOptions[focusedOptionIndex]);
				}
			}
		};

		if (isDropdownOpen) {
			input?.addEventListener('keydown', handleKeyDown);
		}

		return () => {
			input?.removeEventListener('keydown', handleKeyDown);
		};
	}, [
		isDropdownOpen,
		focusedOptionIndex,
		filteredOptions,
		handleAddSelectedItem,
	]);

	useEffect(() => {
		const handleEscKey = (e: KeyboardEvent) => {
			if (e.key === MULTISELECT_KEYBOARD_KEYS.ESC) {
				setIsDropdownOpen(false);
			}
		};
		document.addEventListener('keydown', handleEscKey);
		return () => {
			document.removeEventListener('keydown', handleEscKey);
		};
	}, []);

	// Scroll focused option into view if overflowed
	useEffect(() => {
		if (focusedOptionRef) {
			focusedOptionRef.scrollIntoView({ block: 'nearest' });
		}
	}, [focusedOptionRef]);

	// Close dropdown when clicked outside
	useEffect(() => {
		const handleClickOutside = (e: any) => {
			if (
				componentRef.current &&
				!componentRef.current.contains(e.target) &&
				isDropdownOpen
			) {
				setIsDropdownOpen(false);
			}
		};

		if (isDropdownOpen) {
			document.addEventListener('mouseup', handleClickOutside);
		} else {
			document.removeEventListener('mouseup', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mouseup', handleClickOutside);
		};
	}, [isDropdownOpen]);

	useEffect(() => {
		if (typeof onSearchChange === 'function' && inputText)
			onSearchChange(inputText);
	}, [inputText, onSearchChange]);

	return (
		<div
			className="multiselect"
			ref={componentRef}
		>
			<div
				className={cx(
					'multiselect-input-wrapper',
					isDropdownOpen && 'multiselect-input-wrapper-focused'
				)}
				style={{ maxWidth }}
				onMouseDown={toggleDropdown}
			>
				{selectedItems.length > 0 || isInputFocused || inputText ? (
					selectedItems.map((item) => (
						<span
							className="multiselect-item"
							key={item.value}
						>
							{item.label}
							<button
								className="multiselect-item-button"
								type="button"
								onClick={(e) => {
									e.stopPropagation();
									handleRemoveSelectedItem(item);
								}}
								disabled={disabled}
							>
								<IoClose />
							</button>
						</span>
					))
				) : (
					<span className="multiselect-placeholder">{placeholder}</span>
				)}
				<input
					ref={inputRef}
					className="multiselect-input"
					onChange={(e) => {
						setInputText(e.target.value);
						setIsDropdownOpen(true);
					}}
					onFocus={() => {
						setIsDropdownOpen(true);
						setIsInputFocused(true);
					}}
					onBlur={() => {
						if (!isDropdownOpen) setIsInputFocused(false);
					}}
					value={inputText}
					disabled={disabled}
				/>
			</div>
			{isDropdownOpen && (
				<ul
					className="multiselect-dropdown"
					style={{ maxWidth }}
				>
					{!isExactMatch && inputText && onAddNewItem && (
						<li className="multiselect-dropdown-item">
							<button
								className="multiselect-item-button-add"
								type="button"
								onClick={(e) => handleCreateNewItem(e)}
								disabled={disabled}
							>
								<IoAdd className="multiselect-item-button-add-icon" />
							</button>
							{inputText}
							<span className="multiselect-add-label">
								({t({ id: 'admin.multiselect.addNew.label' })})
							</span>
						</li>
					)}
					{filteredOptions.map((option, index) => (
						<li
							key={option.value}
							ref={(el) => {
								if (index === focusedOptionIndex) {
									setFocusedOptionRef(el);
								}
							}}
							className={cx('multiselect-dropdown-item', {
								'multiselect-dropdown-item-focused':
									focusedOptionIndex === index,
							})}
							onClick={() => handleAddSelectedItem(option)}
						>
							<div className="vinisto-checkbox-wrapper">
								<input
									className="vinisto-checkbox-input"
									type="checkbox"
									id={`option-${option.value}`}
									onChange={() => {}}
									checked={selectedItems.some(
										(item) => item.value === option.value
									)}
								/>
								<label htmlFor={`option-${option.value}`}>
									<span
										className={
											selectedItems.some((item) => item.value === option.value)
												? 'vinisto-checkbox__checkmark-checked'
												: 'vinisto-checkbox__checkmark'
										}
									></span>
									{option.label}
								</label>
							</div>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default Multiselect;
