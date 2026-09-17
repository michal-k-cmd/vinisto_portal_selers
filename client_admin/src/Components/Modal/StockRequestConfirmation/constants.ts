import { TimeSlot } from 'Services/StockRequest/constants';

export const TIME_SLOTS_OPTIONS = [
	{
		label: '8:00 - 10:00',
		value: String(TimeSlot.D_8_10),
	},
	{
		label: '10:00 - 12:00',
		value: String(TimeSlot.D_10_12),
	},
	{
		label: '12:00 - 14:00',
		value: String(TimeSlot.D_12_14),
	},
	{
		label: '14:00 - 16:00',
		value: String(TimeSlot.D_14_16),
	},
];

// validation passes when empty string provided to value attribute - see https://github.com/coreui/coreui-react/issues/363
export const EMPTY_VALUE = '__ME_SO_EMPTY__';
