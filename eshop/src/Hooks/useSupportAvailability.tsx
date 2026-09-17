import { dayjsInstance as dayjs } from 'Services/Date';
import { upperFirst } from 'lodash-es';
import Config from 'Config';

const DAY_FORMAT = 'dd';

const useSupportAvailability = () => {
	const availability = {
		...Config.market.supportAvailability,
		dayStart: upperFirst(
			dayjs().day(Config.market.supportAvailability.dayStart).format(DAY_FORMAT)
		),
		dayEnd: upperFirst(
			dayjs().day(Config.market.supportAvailability.dayEnd).format(DAY_FORMAT)
		),
	};

	return availability;
};

export default useSupportAvailability;
