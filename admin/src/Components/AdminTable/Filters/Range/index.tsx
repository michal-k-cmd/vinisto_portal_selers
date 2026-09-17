import { useCallback, useEffect, useState } from 'react';
import { IPageListTableRow } from 'Hooks/useAdminTable/interfaces';
import cx from 'classnames';

import { FilterProps, RangeFilterValues } from './interfaces';
import {
	RANGE_FILTER_DELIMITER,
	RANGE_FILTER_MAX_VALUE,
	RANGE_FILTER_MIN_VALUE,
} from './constants';

import './styles.css';

const Range = <T extends IPageListTableRow>({
	onChange,
	onClick,
}: FilterProps<T>) => {
	const [range, setRange] = useState<RangeFilterValues>({
		min: null,
		max: null,
	});
	const [rangeMinValueError, setRangeMinValueError] = useState<boolean>(false);
	const [rangeMaxValueError, setRangeMaxValueError] = useState<boolean>(false);

	useEffect(() => {
		if (range.max === null || range.min === null) return;
		const { min, max } = range;
		const value = `${Math.min(min, max)}${RANGE_FILTER_DELIMITER}${Math.max(
			min,
			max
		)}`;
		onChange(value);
	}, [range]);

	const setMin = useCallback(
		(inputNumber: number) => {
			if (range.max !== null && inputNumber > range.max) {
				setRange((prev) => {
					return {
						...prev,
						min: null,
					};
				});
				setRangeMinValueError(true);
			} else {
				setRangeMinValueError(false);
				setRange({
					max: range.max,
					min: inputNumber,
				});
			}
		},
		[range]
	);

	const setMax = useCallback(
		(inputNumber: number | null) => {
			if (
				range.min !== null &&
				inputNumber !== null &&
				inputNumber < range.min
			) {
				setRange((prev) => {
					return {
						...prev,
						max: null,
					};
				});
				setRangeMaxValueError(true);
			} else {
				setRangeMaxValueError(false);
				setRange({
					min: range.min,
					max: inputNumber,
				});
			}
		},
		[range]
	);

	return (
		<div
			className="vinisto-admin-table__numeric-filter"
			onClick={onClick ?? (() => {})}
		>
			<input
				className={cx('form-control', {
					error: rangeMinValueError,
				})}
				type="number"
				value={rangeMinValueError ? '' : this}
				onChange={() => setRangeMinValueError(false)}
				onBlur={(event) => setMin(Number(event.currentTarget.value))}
				min={RANGE_FILTER_MIN_VALUE}
				max={RANGE_FILTER_MAX_VALUE}
			/>
			<input
				className={cx('form-control', {
					error: rangeMaxValueError,
				})}
				type="number"
				value={rangeMaxValueError ? '' : this}
				onChange={() => setRangeMaxValueError(false)}
				onBlur={(event) => setMax(Number(event.currentTarget.value))}
				min={RANGE_FILTER_MIN_VALUE}
				max={RANGE_FILTER_MAX_VALUE}
			/>
		</div>
	);
};

export default Range;
