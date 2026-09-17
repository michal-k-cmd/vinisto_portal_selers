import { forEach, get } from 'Helpers/lodash';

export const getItemsByLocalizationsConfig = (
	localizationsConfig: Record<any, any>
): Record<any, any>[] => {
	const itemsByLocalizationsConfig: Record<any, any>[] = [];
	forEach(localizationsConfig, (localizationsConfigItem: Record<any, any>) => {
		const nextItemsByLocalizationsConfigPart: Record<any, any> = {
			value: get(localizationsConfigItem, 'lang', '-'),
			label: get(localizationsConfigItem, 'locale', '-'),
		};

		itemsByLocalizationsConfig.push(nextItemsByLocalizationsConfigPart);
	});

	return itemsByLocalizationsConfig;
};
