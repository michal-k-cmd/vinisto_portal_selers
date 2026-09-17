import useLocalizedValue from 'Hooks/useLocalizedValue';
import {
	Dispatch,
	SetStateAction,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import cx from 'classnames';
import {
	Menu,
	MenuItem,
	TokenProps,
	Typeahead,
	TypeaheadMenuProps,
	TypeaheadResult,
	useToken,
} from 'react-bootstrap-typeahead';
import { useQuery } from '@tanstack/react-query';
import useOnClickOutside from 'Hooks/useOnClickOutside';
import { SpecificationType } from 'Services/Specification/constants';
import { CFormInput, CFormLabel } from '@coreui/react';
import { useField } from 'react-final-form';
import { InputError } from 'Components/Form';
import styles from 'Components/AdminTable/Filters/Specification/styles.module.css';

import {
	ConditionRequest,
	ItemSpecificationDecimalNumberConditionRequest,
} from '@/api-types/addons-api';
import { VinistoProductDllModelsApiSpecificationSpecificationsReturn } from '@/api-types/product-api';
import api from '@/api';

interface ItemSpecificationDecimalProps {
	name: string;
	initialConditions: ConditionRequest;
}

const SelectedValuesToken = ({
	onRemoveCallback,
	setActiveParentId,
	specificationsData,
	...props
}: Omit<TokenProps, 'onClick' | 'onFocus' | 'onBlur'> & {
	option: ItemSpecificationDecimalNumberConditionRequest;
	specificationsData: VinistoProductDllModelsApiSpecificationSpecificationsReturn['specifications'];
	setActiveParentId: Dispatch<SetStateAction<string | null>>;
	onRemoveCallback?: Dispatch<
		SetStateAction<ItemSpecificationDecimalNumberConditionRequest>
	>;
}) => {
	const { active, onClick, ref, ...otherProps } = useToken(props);
	const { option } = props;
	const getLocalizedValue = useLocalizedValue();

	const specificationName = getLocalizedValue(
		specificationsData?.find(
			(specification) => specification.id === option.itemSpecificationId
		)?.name ?? ''
	);

	return (
		<span
			{...otherProps}
			onClick={(event) => {
				setActiveParentId(option.itemSpecificationId ?? null);
				onClick?.(event);
				event.stopPropagation();
			}}
			className={cx(styles.token, active ? styles.active : '')}
			ref={ref}
			role="button"
			tabIndex={0}
			style={{ display: 'inline' }}
		>
			<span className={cx(styles.tokenSpecification)}>
				{specificationName}:{' '}
			</span>
			<div
				className={styles.tokenValue}
				onClick={(event) => {
					setActiveParentId(option.itemSpecificationId ?? null);
					onClick?.(event);
					event.stopPropagation();
				}}
				role="button"
				tabIndex={0}
			>
				<span>
					{option.minValue}–{option.maxValue}
				</span>

				<button
					className={styles.tokenRemoveButton}
					onClick={(event) => {
						event.stopPropagation();
						onRemoveCallback?.(option);
					}}
				>
					×
				</button>
			</div>
		</span>
	);
};

const ItemSpecificationDecimal = ({
	name,
	initialConditions,
}: ItemSpecificationDecimalProps) => {
	const { data: specificationsData, isLoading: isSpecificationsDataLoading } =
		useQuery(['specifications'], () =>
			api
				.get<VinistoProductDllModelsApiSpecificationSpecificationsReturn>(
					'product-api/admin/specifications',
					{
						limit: 100,
						SpecificationType: SpecificationType.DECIMAL_NUMBER,
					}
				)
				.then((response) => response.specifications)
		);

	if (isSpecificationsDataLoading) {
		return (
			<div>
				<CFormLabel>Specifikace</CFormLabel>
				<Typeahead
					multiple
					id="specifications-filter"
					options={[]}
					selected={[]}
					onChange={() => null}
					positionFixed
				/>
			</div>
		);
	}

	const filters: ItemSpecificationDecimalNumberConditionRequest[] = [];

	const specificationDefinitionId =
		typeof initialConditions?.itemSpecificationDecimalNumberConditionRequest
			?.itemSpecificationId === 'string'
			? initialConditions.itemSpecificationDecimalNumberConditionRequest
					.itemSpecificationId
			: '';
	const specificationMinValue =
		initialConditions?.itemSpecificationDecimalNumberConditionRequest
			?.minValue ?? undefined;
	const specificationMaxValue =
		initialConditions?.itemSpecificationDecimalNumberConditionRequest
			?.maxValue ?? undefined;
	if (specificationDefinitionId) {
		filters.push({
			itemSpecificationId: specificationDefinitionId,
			minValue: specificationMinValue,
			maxValue: specificationMaxValue,
		});
	}

	return (
		<SpecificationsFilter
			specificationsData={specificationsData}
			initialValues={filters}
			name={name}
		/>
	);
};

interface SpecificationFilterProps {
	specificationsData: VinistoProductDllModelsApiSpecificationSpecificationsReturn['specifications'];
	initialValues: ItemSpecificationDecimalNumberConditionRequest[];
	name: string;
}

const SpecificationsFilter = ({
	specificationsData,
	initialValues,
	name,
}: SpecificationFilterProps) => {
	const { input, meta } = useField(name, {
		subscription: { value: true, touched: true, error: true },
		validate: (value) => {
			if (!value || value.length === 0) {
				return 'validation.error.required';
			}
			return undefined;
		},
	});

	const getLocalizedValue = useLocalizedValue();

	const [value, setValue] = useState<
		ItemSpecificationDecimalNumberConditionRequest[]
	>(initialValues ?? []);

	const [inputText, setInputText] = useState<string>('');

	const options = useMemo(
		() =>
			specificationsData?.map((specification) => ({
				itemSpecificationId: specification.id,
				minValue: undefined,
				maxValue: undefined,
				label: getLocalizedValue(specification.name),
			})) ?? [],
		[specificationsData, getLocalizedValue]
	);

	const selected = useMemo(
		() =>
			Array.isArray(value)
				? value.map((option) => {
						return {
							itemSpecificationId: option.itemSpecificationId,
							minValue: option.minValue ?? undefined,
							maxValue: option.maxValue ?? undefined,
						};
				  })
				: [],
		[value]
	);

	const typeaheadRef =
		useRef<Typeahead<ItemSpecificationDecimalNumberConditionRequest>>(null);

	const [activeParentId, setActiveParentId] = useState<string | null>(null);

	const menuWithValuesRef = useRef<HTMLUListElement & { align: string }>(null);

	const updateQuery = useCallback(() => input.onChange(value), [input, value]);

	useOnClickOutside<HTMLUListElement & { align: string }>(
		[menuWithValuesRef],
		() => updateQuery()
	);

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (menuWithValuesRef.current) {
				if (e.key === 'Enter') {
					updateQuery();
				}
			}
		};
		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [updateQuery]);

	const handleOnChange = (
		selectedOptions: TypeaheadResult<ItemSpecificationDecimalNumberConditionRequest>[]
	) => {
		if (selectedOptions.every((option) => 'itemSpecificationId' in option)) {
			setActiveParentId(selectedOptions.at(-1)?.itemSpecificationId ?? null);
			setValue((prev) => {
				return [...prev, ...selectedOptions].filter(
					(option, index, self) =>
						index ===
						self.findIndex(
							(o) => o.itemSpecificationId === option.itemSpecificationId
						)
				);
			});
			typeaheadRef.current?.blur();
			typeaheadRef.current?.focus();
		}
	};

	const shouldRenderValues = selected.length > 0 && activeParentId !== null;

	const currentOptions = shouldRenderValues ? [] : options;

	const filterByCallback = (
		option: ItemSpecificationDecimalNumberConditionRequest
	) => {
		const specificationName = getLocalizedValue(
			specificationsData?.find(
				(specification) => specification.id === option.itemSpecificationId
			)?.name ?? ''
		);

		if (inputText === '') {
			return !value.find(
				(spec) =>
					'itemSpecificationId' in option &&
					spec.itemSpecificationId === option.itemSpecificationId
			);
		}

		return (
			specificationName.toLowerCase().indexOf(inputText.toLowerCase()) !== -1
		);
	};

	const getOptionsComponent = useCallback(
		(
			results: TypeaheadResult<ItemSpecificationDecimalNumberConditionRequest>[],
			menuProps: TypeaheadMenuProps<ItemSpecificationDecimalNumberConditionRequest>
		) => {
			if (!shouldRenderValues) {
				return (
					<Menu {...menuProps}>
						{results.map((result, index) => {
							const specificationName = getLocalizedValue(
								specificationsData?.find(
									(specification) =>
										specification.id === result.itemSpecificationId
								)?.name ?? ''
							);

							return (
								<MenuItem
									key={index}
									option={result}
									position={index}
									onClick={() => {
										handleOnChange([result]);
									}}
								>
									{specificationName}
								</MenuItem>
							);
						})}
					</Menu>
				);
			}
			const activeSpecification = specificationsData?.find(
				(specification) => specification.id === activeParentId
			);

			if (!activeSpecification) return null;

			return (
				<div
					style={{
						...menuProps.style,
						transform: 'none',
						top: '100%',
					}}
					className="rbt-menu dropdown-menu show"
					ref={menuWithValuesRef}
				>
					<div className={styles.dropdownItem}>
						Min
						<CFormInput
							size="sm"
							type="number"
							step="any"
							value={
								value.find(
									(item) => item.itemSpecificationId === activeParentId
								)?.minValue
							}
							onChange={(e) => {
								setValue(() => {
									return value.map((item) => {
										if (activeParentId === item.itemSpecificationId) {
											return {
												...item,
												minValue: parseFloat(e.target.value),
											};
										}
										return item;
									});
								});
							}}
						/>
					</div>
					<div className={styles.dropdownItem}>
						Max
						<CFormInput
							size="sm"
							type="number"
							step="any"
							value={
								value.find(
									(item) => item.itemSpecificationId === activeParentId
								)?.maxValue
							}
							onChange={(e) => {
								setValue(() => {
									return value.map((item) => {
										if (activeParentId === item.itemSpecificationId) {
											return {
												...item,
												maxValue: parseFloat(e.target.value),
											};
										}
										return item;
									});
								});
							}}
						/>
					</div>
				</div>
			);
		},
		[
			shouldRenderValues,
			specificationsData,
			value,
			getLocalizedValue,
			activeParentId,
		]
	);

	return (
		<div>
			<CFormLabel>Specifikace</CFormLabel>
			<Typeahead<ItemSpecificationDecimalNumberConditionRequest>
				multiple
				align="left"
				className={styles.typeahead}
				ref={typeaheadRef}
				filterBy={filterByCallback}
				id="specifications-filter"
				options={currentOptions}
				selected={selected}
				onInputChange={(input) => {
					setInputText(input);
				}}
				onChange={() => setInputText('')}
				renderToken={(option, props, index) => {
					return (
						<SelectedValuesToken
							{...props}
							setActiveParentId={setActiveParentId}
							specificationsData={specificationsData}
							onRemoveCallback={(option) => {
								const filteredValue = value.filter(
									(item) =>
										'itemSpecificationId' in option &&
										item.itemSpecificationId !== option.itemSpecificationId
								);

								// Update the value state and query params
								setValue(filteredValue);
								input.onChange(filteredValue);

								setActiveParentId(null);
								typeaheadRef.current?.hideMenu();
							}}
							key={index}
							option={
								'itemSpecificationId' in option
									? (option as ItemSpecificationDecimalNumberConditionRequest)
									: {
											itemSpecificationId: '',
											minValue: undefined,
											maxValue: undefined,
									  }
							}
						/>
					);
				}}
				renderMenu={getOptionsComponent}
				// positionFixed
			/>
			<InputError
				errorMessage={meta.error}
				touched={meta.touched}
			/>
		</div>
	);
};

export default ItemSpecificationDecimal;
