import useLocalizedValue from 'Hooks/useLocalizedValue';
import {
	Dispatch,
	SetStateAction,
	useCallback,
	useContext,
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
import { ArrayParam, useQueryParams } from 'Helpers/query-params';
import { SpecificationType } from 'Services/Specification/constants';
import { CFormCheck, CFormInput } from '@coreui/react';
import { LocalizationContext } from 'Services/LocalizationService';

import {
	selectedValuesParam,
	specificationDefinitionIdParam,
	specificationTypeParam,
} from './constants';
import styles from './styles.module.css';

import { VinistoProductDllModelsApiSpecificationSpecificationsReturn } from '@/api-types/product-api';
import api from '@/api';

const SelectedValuesToken = ({
	onRemoveCallback,
	setActiveParentId,
	...props
}: Omit<TokenProps, 'onClick' | 'onFocus' | 'onBlur'> & {
	option: {
		id: string;
		type: SpecificationType;
		unit?: string;
		label: string;
		values: any[];
	};
	setActiveParentId: Dispatch<SetStateAction<string | null>>;
	onRemoveCallback?: Dispatch<SetStateAction<SpecificationFilterValue>>;
}) => {
	const { active, onClick, ref, ...otherProps } = useToken(props);
	const { option } = props;

	return (
		<span
			{...otherProps}
			onClick={(event) => {
				setActiveParentId(option.id);
				onClick?.(event);
				event.stopPropagation();
			}}
			className={cx(styles.token, active ? styles.active : '')}
			ref={ref}
			role="button"
			tabIndex={0}
			style={{ display: 'inline' }}
		>
			<span className={cx(styles.tokenSpecification)}>{option.label}: </span>
			<div
				className={styles.tokenValue}
				onClick={(event) => {
					setActiveParentId(option.id);
					onClick?.(event);
					event.stopPropagation();
				}}
				role="button"
				tabIndex={0}
			>
				{(option.type === SpecificationType.COMBO_BOX ||
					option.type === SpecificationType.MULTI_COMBO_BOX) &&
					option.values
						.map((value) => value.label.replace(/\s/, '\u00A0'))
						.join(',\u00A0')}
				{(option.type === SpecificationType.NUMBER ||
					option.type === SpecificationType.NUMBER_IMPERIAL ||
					option.type === SpecificationType.DECIMAL_NUMBER ||
					option.type === SpecificationType.DECIMAL_NUMBER_IMPERIAL ||
					// @ts-expect-error To Fix later
					option.type === 'PRICE') && (
					<span>
						{option.values[0]?.label}–{option.values[1]?.label} {option.unit}
					</span>
				)}
				{(option.type === SpecificationType.TEXT ||
					option.type === SpecificationType.CHECK_BOX) && (
					<span>{option.values[0]?.label}</span>
				)}

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

interface SpecificationFilterValue {
	id: string;
	type: SpecificationType;
	unit?: string;
	label: string;
	values: any[];
}

const SpecificationFilterWrapper = () => {
	const getLocalizedValue = useLocalizedValue();
	const t = useContext(LocalizationContext).useFormatMessage();
	const { data: specificationsData, isLoading: isSpecificationsDataLoading } =
		useQuery(['specifications'], () =>
			api
				.get<VinistoProductDllModelsApiSpecificationSpecificationsReturn>(
					'product-api/admin/specifications',
					{
						limit: 100,
					}
				)
				.then((response) => response.specifications)
		);

	if (isSpecificationsDataLoading) {
		return (
			<Typeahead
				multiple
				id="specifications-filter"
				options={[]}
				selected={[]}
				onChange={() => null}
				positionFixed
			/>
		);
	}

	const specificationDefinitionIds =
		new URLSearchParams(window.location.search).getAll(
			'specificationDefinitionId'
		) || [];

	const selectedValues =
		new URLSearchParams(window.location.search).getAll('selectedValues') ?? [];

	const filters = [];
	let i = 0;
	while (i <= specificationDefinitionIds.length) {
		const specificationDefinitionId = specificationDefinitionIds[i];
		const specificationValue = selectedValues[i];

		if (specificationDefinitionId && specificationValue) {
			const specification = specificationsData?.find(
				(spec) => spec.id === specificationDefinitionId
			);

			filters.push({
				id: specificationDefinitionId,
				type: specification.specificationType,
				label: getLocalizedValue(specification?.name),
				unit: specification?.unit
					? getLocalizedValue(specification?.unit)
					: undefined,
				values: specificationValue.split(',').map((val) => {
					if (
						specification?.specificationType === SpecificationType.TEXT ||
						specification?.specificationType === SpecificationType.NUMBER ||
						specification?.specificationType ===
							SpecificationType.NUMBER_IMPERIAL ||
						specification?.specificationType ===
							SpecificationType.DECIMAL_NUMBER ||
						specification?.specificationType ===
							SpecificationType.DECIMAL_NUMBER_IMPERIAL ||
						specification?.specificationType === 'PRICE'
					) {
						return {
							value: val,
							label: val,
						};
					}

					if (
						specification?.specificationType === SpecificationType.CHECK_BOX
					) {
						return {
							value: val,
							label: `${t({ id: 'admin.yes' })}`,
						};
					}
					const allowedValue = specification?.allowedValues?.[val];
					return {
						value: val,
						label: getLocalizedValue(allowedValue?.name),
					};
				}),
			});
		}
		i++;
	}

	return (
		<SpecificationsFilter
			specificationsData={specificationsData}
			initialValues={filters}
		/>
	);
};

interface SpecificationFilterProps {
	specificationsData: VinistoProductDllModelsApiSpecificationSpecificationsReturn['specifications'];
	initialValues: SpecificationFilterValue[];
}

const SpecificationsFilter = ({
	specificationsData,
	initialValues,
}: SpecificationFilterProps) => {
	const [_, setQuery] = useQueryParams({
		[specificationDefinitionIdParam]: ArrayParam,
		[specificationTypeParam]: ArrayParam,
		[selectedValuesParam]: ArrayParam,
	});

	const getLocalizedValue = useLocalizedValue();
	const t = useContext(LocalizationContext).useFormatMessage();

	const [value, setValue] = useState<SpecificationFilterValue[]>(
		initialValues ?? []
	);

	const [inputText, setInputText] = useState<string>('');

	const options = useMemo(
		() =>
			specificationsData
				?.map((specification) => ({
					id: specification.id,
					type: specification.specificationType,
					unit: specification.unit
						? getLocalizedValue(specification.unit)
						: undefined,
					label: getLocalizedValue(specification.name ?? []),
					values: [] as any[],
				}))
				.sort((a, b) => a.label.localeCompare(b.label)) ?? [],
		[getLocalizedValue, specificationsData]
	);

	const selected = useMemo(
		() =>
			Array.isArray(value)
				? value.map((option) => ({
						id: option.id,
						type: option.type,
						unit: option.unit,
						values: option.values ?? option,
						label: option.label ?? option.id,
				  }))
				: [],
		[value]
	);

	const typeaheadRef = useRef<Typeahead<
		| {
				id: string;
				type: SpecificationType;
				unit?: string;
				label: string;
				values: any[];
		  }
		| { value: string; label: string }
	> | null>(null);

	const [activeParentId, setActiveParentId] = useState<string | null>(null);

	const menuWithValuesRef = useRef<HTMLUListElement & { align: string }>(null);

	const updateQuery = useCallback(() => {
		setQuery({
			[specificationDefinitionIdParam]: value.map((spec) => spec.id),
			[specificationTypeParam]: value.map((spec) => spec.type),
			[selectedValuesParam]: value.map((v) =>
				v.values.map((val) => val.value).join(',')
			),
		});
		setActiveParentId(null);
		// Sadly , this does not work
		setInputText('');
		typeaheadRef.current?.blur();
	}, [value, setQuery]);

	useOnClickOutside<HTMLUListElement & { align: string }>(
		[menuWithValuesRef],
		updateQuery
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
		selectedOptions: TypeaheadResult<
			SpecificationFilterValue | { value: string; label: string }
		>[]
	) => {
		if (selectedOptions.every((option) => 'id' in option)) {
			setActiveParentId(selectedOptions.at(-1)?.id ?? null);
			setValue((prev) => {
				return [...prev, ...selectedOptions].filter(
					(option, index, self) =>
						index === self.findIndex((o) => o.id === option.id)
				);
			});
			typeaheadRef.current?.blur();
			typeaheadRef.current?.focus();
		}
	};

	const getAllowedValuesOptions = () => {
		const allowedValues = specificationsData?.find(
			(specification) => specification.id === activeParentId
		)?.allowedValues;

		if (!allowedValues) return [];
		return Object.entries(allowedValues).map(([key, value]) => ({
			value: key,
			label: getLocalizedValue((value as any)?.name),
		}));
	};

	const shouldRenderValues = selected.length > 0 && activeParentId !== null;

	const currentOptions = shouldRenderValues
		? getAllowedValuesOptions()
		: options;

	const filterByCallback = (
		option: SpecificationFilterValue | { value: string; label: string }
	) => {
		if (inputText === '') {
			return !value.find((spec) => 'id' in option && spec.id === option.id);
		}
		return option.label.toLowerCase().indexOf(inputText.toLowerCase()) !== -1;
	};

	const getOptionsComponent = useCallback(
		(
			results: TypeaheadResult<
				| SpecificationFilterValue
				| {
						value: string;
						label: string;
				  }
			>[],
			menuProps: TypeaheadMenuProps<
				| SpecificationFilterValue
				| {
						value: string;
						label: string;
				  }
			>
		) => {
			if (!shouldRenderValues) {
				return (
					<Menu {...menuProps}>
						{results.map((result, index) => (
							<MenuItem
								key={index}
								option={result}
								position={index}
								onClick={() => {
									handleOnChange([result]);
								}}
							>
								{result.label}
							</MenuItem>
						))}
					</Menu>
				);
			}
			const activeSpecification = specificationsData?.find(
				(specification) => specification.id === activeParentId
			);

			if (!activeSpecification) return null;

			const activeSpecificationType = activeSpecification.specificationType;
			if (
				activeSpecificationType === SpecificationType.COMBO_BOX ||
				activeSpecificationType === SpecificationType.MULTI_COMBO_BOX
			) {
				return (
					<Menu {...menuProps}>
						<ul
							ref={menuWithValuesRef}
							className={styles.allowedValueList}
						>
							{results.map((result, index) => {
								const parentValue = value.find(
									(option) => option.id === activeParentId
								);
								return (
									<li
										key={index}
										className={styles.allowedValueListItem}
									>
										<CFormCheck
											style={{ marginRight: '0.5rem' }}
											id={result.label}
											onChange={() => {
												setValue((prev) => {
													if (parentValue) {
														const values = parentValue.values;
														const isSelected = values.find(
															(item) =>
																'value' in result && item.value === result.value
														);
														const selectedSpecificationValues = isSelected
															? values.filter(
																	(item) =>
																		'value' in result &&
																		item.value !== result.value
															  )
															: [...values, result];

														return [
															...prev.filter(
																(value) => value.id !== activeParentId
															),
															{
																...parentValue,
																values: selectedSpecificationValues,
															},
														];
													}
													return prev;
												});
											}}
											checked={parentValue?.values?.some(
												(item) =>
													'value' in result && item.value === result.value
											)}
										/>
										<label
											className={styles.label}
											htmlFor={result.label}
										>
											{result.label}
										</label>
									</li>
								);
							})}
						</ul>
					</Menu>
				);
			}
			if (
				activeSpecificationType === SpecificationType.DECIMAL_NUMBER ||
				activeSpecificationType === SpecificationType.DECIMAL_NUMBER_IMPERIAL ||
				activeSpecificationType === SpecificationType.NUMBER ||
				activeSpecificationType === SpecificationType.NUMBER_IMPERIAL ||
				activeSpecificationType === 'PRICE'
			) {
				return (
					<div
						style={{
							...menuProps.style,
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
									value.find((item) => item.id === activeParentId)?.values[0]
										?.value
								}
								onChange={(e) => {
									const result = {
										value: e.target.value,
										label: e.target.value,
									};
									setValue(() => {
										return value.map((item) => {
											if (activeParentId === item.id) {
												return {
													...item,
													values: [
														result,
														item.values[1] ?? {
															value: '',
															label: '',
														},
													],
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
									value.find((item) => item.id === activeParentId)?.values[1]
										?.value
								}
								onChange={(e) => {
									const result = {
										value: e.target.value,
										label: e.target.value,
									};
									setValue(() => {
										return value.map((item) => {
											if (activeParentId === item.id) {
												return {
													...item,
													values: [
														item.values[0] ?? {
															value: '',
															label: '',
														},
														result,
													],
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
			}
			if (activeSpecificationType === SpecificationType.TEXT) {
				return (
					<div
						style={{
							...menuProps.style,
						}}
						className="rbt-menu dropdown-menu show"
						ref={menuWithValuesRef}
					>
						<label className={styles.dropdownItem}>
							{getLocalizedValue(activeSpecification.name)}
							<CFormInput
								type="text"
								value={
									value.find((item) => item.id === activeParentId)?.values[0]
										?.value
								}
								onChange={(e) => {
									const result = {
										value: e.target.value,
										label: e.target.value,
									};
									setValue(() => {
										return value.map((item) => {
											if (activeParentId === item.id) {
												return {
													...item,
													values: [result],
												};
											}
											return item;
										});
									});
								}}
							/>
						</label>
					</div>
				);
			}
			if (activeSpecificationType === SpecificationType.CHECK_BOX) {
				return (
					<Menu {...menuProps}>
						<div ref={menuWithValuesRef}>
							<label className={styles.dropdownItem}>
								{getLocalizedValue(activeSpecification.name)}
								<CFormCheck
									inline
									style={{ marginLeft: '0.5rem' }}
									onChange={(e) => {
										setValue((prev) => {
											const isChecked = e.target.checked;
											if (isChecked) {
												return prev.map((item) => {
													if (activeParentId === item.id) {
														return {
															...item,
															values: [
																{
																	value: 'true',
																	label: `${t({ id: 'admin.yes' })}`,
																},
															],
														};
													}

													return item;
												});
											}
											return prev.filter((item) => item.id !== activeParentId);
										});
									}}
								/>
							</label>
						</div>
					</Menu>
				);
			}
		},
		[
			shouldRenderValues,
			specificationsData,
			activeParentId,
			value,
			getLocalizedValue,
			t,
		]
	);

	return (
		<Typeahead<SpecificationFilterValue | { value: string; label: string }>
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
						onRemoveCallback={(option) => {
							const filteredValue = value.filter(
								(item) => 'id' in option && item.id !== option.id
							);

							setValue(filteredValue);

							setQuery({
								[specificationDefinitionIdParam]: filteredValue.map(
									(spec) => spec.id
								),
								[specificationTypeParam]: filteredValue.map(
									(spec) => spec.type
								),
								[selectedValuesParam]: filteredValue.map((v) =>
									v.values.map((val) => val.value).join(',')
								),
							});
							setActiveParentId(null);
							typeaheadRef.current?.hideMenu();
						}}
						key={index}
						option={
							'id' in option && 'label' in option && 'values' in option
								? (option as SpecificationFilterValue)
								: {
										id: '',
										type: SpecificationType.COMBO_BOX,
										label: '',
										values: [],
								  }
						}
					/>
				);
			}}
			renderMenu={getOptionsComponent}
			positionFixed
		/>
	);
};

export default SpecificationFilterWrapper;
