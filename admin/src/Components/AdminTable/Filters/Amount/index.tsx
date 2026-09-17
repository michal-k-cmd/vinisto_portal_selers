import React from 'react';
import { CFormInput, CFormSelect } from '@coreui/react';
import { Column } from '@tanstack/react-table';
import { map } from 'Helpers/lodash';
import { IPageListTableRow } from 'Hooks/useAdminTable/interfaces';

import { IAmountFilterProps, IAvailableCountFilter } from './interfaces';
import { AMOUNT_FILTER, AMOUNT_FILTER_DELIMITER } from './constants';
import { getAmountFilter } from './helpers';

import './styles.css';

const AmountFilter = <T extends IPageListTableRow = IPageListTableRow>(
	props: IAmountFilterProps<T>
) => {
	const setAmountFilter = React.useCallback(
		(column: Column<T>, filter: IAvailableCountFilter) => {
			const value = `${
				filter.comparingNumberType ?? ''
			}${AMOUNT_FILTER_DELIMITER}${filter.value ?? ''}`;
			// TODO store to URL and refetch only when both type and value specified
			props.setColumnFilters((currentColumnFilters) => ({
				...currentColumnFilters,
				[column.id]: value,
			}));
			props.setDataFilter(column, value);
		},
		[props.setColumnFilters, props.setDataFilter]
	);

	const selectAmountFilterType = React.useCallback(
		(column: Column<T>) => (event: React.ChangeEvent<HTMLSelectElement>) => {
			event.stopPropagation();
			setAmountFilter(column, {
				...getAmountFilter(column.getFilterValue() as string),
				comparingNumberType: event.target.value as AMOUNT_FILTER,
			});
		},
		[setAmountFilter]
	);

	const setAmountFilterValue = React.useCallback(
		(column: Column<T>) => (event: React.ChangeEvent<HTMLInputElement>) => {
			const inputValue = Number(event.target.value);
			setAmountFilter(column, {
				...getAmountFilter(column.getFilterValue() as string),
				value: inputValue === 0 ? '' : inputValue,
			});
		},
		[setAmountFilter]
	);

	const amountFilter = getAmountFilter(props.value);
	const amountFilterType = amountFilter.comparingNumberType ?? '';
	const amountFilterValue = amountFilter.value ?? '';

	return (
		<>
			<CFormSelect
				onClick={props.onClick ?? (() => {})}
				onChange={selectAmountFilterType(props.column)}
				className="vinisto-admin-table__text-input"
				value={amountFilterType}
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
				onClick={props.onClick ?? (() => {})}
				onChange={setAmountFilterValue(props.column)}
				value={amountFilterValue}
				type="number"
				min="0"
			/>
		</>
	);
};

export default AmountFilter;
