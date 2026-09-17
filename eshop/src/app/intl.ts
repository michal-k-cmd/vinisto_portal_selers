'server-only';

import { createIntl } from 'react-intl';
import { unstable_cache as cache } from 'next/cache';

const getMessages = cache(
	async (locale) =>
		(
			await import(
				`../Services/LocalizationService/translations/${locale}.json`
			)
		).default,
	['get-intl']
);

export default async function getIntl(locale = 'cs' /* namespace: string */) {
	return createIntl({
		locale: locale,
		messages: await getMessages(locale),
	});
}
