import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import pluralGetSet from 'dayjs/plugin/pluralGetSet';
import localizedFormat from 'dayjs/plugin/localizedFormat';

const dayjsInstance = dayjs;

[utc, pluralGetSet, localizedFormat].forEach((plugin) => {
	dayjsInstance.extend(plugin);
});

export { dayjsInstance };
