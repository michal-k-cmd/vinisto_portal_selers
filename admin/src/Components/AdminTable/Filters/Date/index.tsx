import { useContext } from 'react';
import LocalizedDatePicker from 'Components/LocalizedDatePicker';
import { IPageListTableRow } from 'Hooks/useAdminTable/interfaces';
import { LocalizationContext } from 'Services/LocalizationService';

import { DateFilterProps } from './interfaces';
import { getDateValue, getSecondsString } from './helpers';

const DateFilter = <T extends IPageListTableRow>(props: DateFilterProps<T>) => {
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();

	// @see https://github.com/date-fns/date-fns/blob/main/docs/unicodeTokens.md
	const dateFormat = `${t({ id: 'admin.dateFormat.datepicker' })}`;

	return (
		<div onClick={props.onClick ?? (() => {})}>
			<LocalizedDatePicker
				className="form-control"
				onChange={(date) => props.onChange(getSecondsString(date))}
				dateFormat={dateFormat}
				selected={getDateValue(props.value)}
			/>
		</div>
	);
};

export default DateFilter;
