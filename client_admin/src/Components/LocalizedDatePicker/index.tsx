import DatePicker, {
	ReactDatePickerProps,
	registerLocale,
} from 'react-datepicker';
import cs from 'date-fns/locale/cs';
registerLocale('cs-CZ', cs);

const LocalizedDatePicker = <T extends ReactDatePickerProps>(props: T) => {
	return (
		<DatePicker
			locale={cs}
			{...props}
		/>
	);
};

export default LocalizedDatePicker;
