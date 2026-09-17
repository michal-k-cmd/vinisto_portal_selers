import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import pluralGetSet from 'dayjs/plugin/pluralGetSet';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import isBetween from 'dayjs/plugin/isBetween';
import ObjectSupport from 'dayjs/plugin/objectSupport';
import timezone from 'dayjs/plugin/timezone';

const dayjsInstance = dayjs;

[
	utc,
	pluralGetSet,
	localizedFormat,
	isBetween,
	ObjectSupport,
	timezone,
].forEach((plugin) => {
	dayjsInstance.extend(plugin);
});

dayjsInstance.tz.setDefault('Europe/Prague');

export default dayjsInstance;
