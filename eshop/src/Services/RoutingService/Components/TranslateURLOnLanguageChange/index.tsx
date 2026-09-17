import React from 'react';
import {
	endsWith,
	get,
	isEqual,
	join,
	keysIn,
	map,
	pickBy,
	split,
	startsWith,
	without,
} from 'lodash-es';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { LocalizationContext } from 'Services/LocalizationService';
import { availableLanguage } from 'Services/LocalizationService/constants';

const TranslateURLOnLanguageChange: React.FC = (): JSX.Element => {
	const localizationContext = React.useContext(LocalizationContext);
	const lAll = localizationContext.useAllMessagesFromLanguage();
	const prevLanguage = get(localizationContext, 'prevLanguage', null);
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const activeLanguage = get(localizationContext, 'activeLanguage', null);

	React.useEffect(() => {
		// If both previous language and active language are defined
		if (get(prevLanguage, 'current', null) && activeLanguage) {
			// Split pathname by "/" and remove empty string
			const splittedPathname = without(split(pathname || '', '/'), '');
			// Get all routes from previous language
			const prevRouteLangs = pickBy(
				lAll(`${get(prevLanguage, 'current', availableLanguage.cs)}`),
				(_, key) => startsWith(key, 'routes') && endsWith(key, 'route')
			);
			// Get all routes from active language
			const activeRouteLangs = pickBy(
				lAll(activeLanguage),
				(_, key) => startsWith(key, 'routes') && endsWith(key, 'route')
			);
			// Generate new pathname
			const newPathname = map(splittedPathname, (pathPart) => {
				const pathKey = get(
					keysIn(
						pickBy(prevRouteLangs, (message) => isEqual(message, pathPart))
					),
					'[0]',
					null
				);
				if (!pathKey) return pathPart;
				const activeLangPathPart = get(activeRouteLangs, `${pathKey}`, null);
				if (activeLangPathPart) return activeLangPathPart;
				return pathPart;
			});
			// Navigate to new URL, don't add to history
			router.replace(
				`/${join(newPathname, '/')}${
					searchParams ? `?${searchParams.toString()}` : ''
				}`
			);
		}
	}, [activeLanguage, pathname, searchParams, prevLanguage, lAll, router]);

	return <></>;
};

export default TranslateURLOnLanguageChange;
