import { FC, useContext } from 'react';
import LocalizedDatePicker from 'Components/LocalizedDatePicker';
import { LocalizationContext } from 'Services/LocalizationService';

import { DateFilterProps } from './interfaces';
import { getDateValue, getSecondsString } from './helpers';

const DateFilter: FC<DateFilterProps> = ({ value, onChange, onClick }) => {
	const { useFormatMessage } = useContext(LocalizationContext);
	const t = useFormatMessage();

	// @see https://github.com/date-fns/date-fns/blob/main/docs/unicodeTokens.md
	const dateFormat = `${t({ id: 'dateFormat.datepicker' })}`;

	return (
		<div onClick={onClick}>
			<LocalizedDatePicker
				className="form-control"
				onChange={(date) => onChange(getSecondsString(date))}
				dateFormat={dateFormat}
				selected={getDateValue(value)}
			/>
		</div>
	);
};

export default DateFilter;
