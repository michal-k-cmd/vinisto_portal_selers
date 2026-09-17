import { ChangeEvent, useCallback } from 'react';
import { CFormInput, CFormSelect } from '@coreui/react';
import { Column } from '@tanstack/react-table';
import { map } from 'lodash-es';
import { PageListTableRow } from 'Hooks/useAdminTable/interfaces';

import { AmountFilterProps, AvailableCountFilter } from './interfaces';
import { AMOUNT_FILTER, AMOUNT_FILTER_DELIMITER } from './constants';
import { getAmountFilter } from './helpers';

import './styles.css';

const AmountFilter = <T extends PageListTableRow>({
	setColumnFilters,
	setDataFilter,
	value,
	onClick,
	column,
}: AmountFilterProps<T>) => {
	const setAmountFilter = useCallback(
		(column: Column<T>, filter: AvailableCountFilter) => {
			const value = `${filter.type ?? ''}${AMOUNT_FILTER_DELIMITER}${
				filter.value ?? ''
			}`;
			// TODO store to URL and refetch only when both type and value specified
			setColumnFilters((currentColumnFilters) => ({
				...currentColumnFilters,
				[column.id]: value,
			}));
			setDataFilter(column, value);
		},
		[setColumnFilters, setDataFilter]
	);

	const selectAmountFilterType = useCallback(
		(column: Column<T>) => (event: ChangeEvent<HTMLSelectElement>) => {
			event.stopPropagation();
			setAmountFilter(column, {
				...getAmountFilter(column.getFilterValue() as string),
				type: event.target.value as AMOUNT_FILTER,
			});
		},
		[setAmountFilter]
	);

	const setAmountFilterValue = useCallback(
		(column: Column<T>) => (event: ChangeEvent<HTMLInputElement>) => {
			const inputValue = Number(event.target.value);
			setAmountFilter(column, {
				...getAmountFilter(column.getFilterValue() as string),
				value: inputValue === 0 ? '' : inputValue,
			});
		},
		[setAmountFilter]
	);

	const amountFilter = getAmountFilter(value);
	const amountFilterType = amountFilter.type ?? '';
	const amountFilterValue = amountFilter.value ?? '';

	return (
		<>
			<CFormSelect
				onClick={onClick}
				onChange={selectAmountFilterType(column)}
				value={amountFilterType}
				className="form-control"
			>
				<option></option>
				{map(AMOUNT_FILTER, (value, key) => (
					<option
						key={key}
						value={key}
					>
						{value}
					</option>
				))}
			</CFormSelect>
			<CFormInput
				className="vinisto-admin-table__number-input"
				onClick={onClick}
				onChange={setAmountFilterValue(column)}
				value={amountFilterValue}
				type="number"
				min="0"
			/>
		</>
	);
};

export default AmountFilter;
