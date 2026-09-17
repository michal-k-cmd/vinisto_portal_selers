import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import pluralGetSet from 'dayjs/plugin/pluralGetSet';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import 'dayjs/locale/cs';
import 'dayjs/locale/en';

const dayjsInstance = dayjs;

[utc, pluralGetSet, localizedFormat].forEach((plugin) => {
	dayjsInstance.extend(plugin);
});

const browserLocale = navigator.language.split('-')[0];
dayjsInstance.locale(browserLocale);

export { dayjsInstance };
