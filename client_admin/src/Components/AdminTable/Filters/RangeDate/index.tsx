import { useContext, useEffect } from 'react';
import React from 'react';
import LocalizedDatePicker from 'Components/LocalizedDatePicker';
import { LocalizationContext } from 'Services/LocalizationService';

import {
	getDateValue,
	getSecondsString,
	getSecondsStringOfTomorrow,
} from '../Date/helpers';

import { RangeDateFilterProps } from './interfaces';
import { RANGE_DATE_FILTER_DELIMITER } from './constants';

import './styles.css';

const RangeDateFilter = (props: RangeDateFilterProps) => {
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();
	const [fromDate, setFromDate] = React.useState<Date | null>(null);
	const [toDate, setToDate] = React.useState<Date | null>(null);

	// @see https://github.com/date-fns/date-fns/blob/main/docs/unicodeTokens.md
	const dateFormat = `${t({ id: 'dateFormat.datepicker' })}`;

	const setDateFromFilter = (date: Date | null) => {
		if (
			toDate &&
			Number(getSecondsString(date)) > Number(getSecondsString(toDate))
		) {
			props.onChange(
				`${getSecondsString(date)}${
					date ? RANGE_DATE_FILTER_DELIMITER : ''
				}${getSecondsStringOfTomorrow(date)}`
			);
			setToDate(date);
			setFromDate(date);
		} else {
			props.onChange(
				`${getSecondsString(date)}${
					date || toDate ? RANGE_DATE_FILTER_DELIMITER : ''
				}${getSecondsStringOfTomorrow(toDate)}`
			);
			setFromDate(date);
		}
	};

	const setDateToFilter = (date: Date | null) => {
		if (
			fromDate &&
			Number(getSecondsString(date)) < Number(getSecondsString(fromDate))
		) {
			props.onChange(
				`${getSecondsString(fromDate)}${
					date ? RANGE_DATE_FILTER_DELIMITER : ''
				}${getSecondsStringOfTomorrow(date)}`
			);
			setToDate(date);
			setFromDate(date);
		} else {
			props.onChange(
				`${getSecondsString(fromDate)}${
					fromDate || date ? RANGE_DATE_FILTER_DELIMITER : ''
				}${getSecondsStringOfTomorrow(date)}`
			);
			setToDate(date);
		}
	};

	const [fromValue, toValue] = props.value.split(RANGE_DATE_FILTER_DELIMITER);

	// Clear inputs if value (from table filter state) is empty
	useEffect(() => {
		if (!fromValue) {
			setFromDate(null);
		}
		if (!toValue) {
			setToDate(null);
		}
	}, [fromValue, toValue]);

	return (
		<div
			className="vinisto-admin-table__date-range"
			onClick={props.onClick ?? (() => undefined)}
		>
			<LocalizedDatePicker
				className="form-control"
				onChange={(date) => setDateFromFilter(date)}
				dateFormat={dateFormat}
				selected={getDateValue(getSecondsString(fromDate))}
			/>
			<LocalizedDatePicker
				className="form-control"
				onChange={(date) => setDateToFilter(date)}
				dateFormat={dateFormat}
				selected={getDateValue(getSecondsString(toDate))}
			/>
		</div>
	);
};

export default RangeDateFilter;
