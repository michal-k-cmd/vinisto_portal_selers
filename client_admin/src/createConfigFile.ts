import { writeFileSync } from 'fs';
import { join } from 'path';

import { createLogger } from 'vite';

import localizations from '../config/appConfigs/localizationsConfig.json';
import notifications from '../config/appConfigs/notificationsConfig.json';
import queryClient from '../config/appConfigs/queryClientConfig.json';
import vinistoPlusDiscountOptions from '../config/appConfigs/vinistoPlusDiscountOptions.json';

const logger = createLogger();

export default function createConfigPlugin({
	mode,
}: {
	env: Record<string, string>;
	mode: unknown;
}) {
	const appConfig = {
		environment: mode,
		localizations,
		notifications,
		queryClient,
		vinistoPlusDiscountOptions,
		contact: {
			phone: '+420 606 758 080',
			daysRange: ['days.mon', 'days.fri'],
			hoursRange: [8, 20],
			email: 'prodejce@vinisto.cz',
		},
	};

	return {
		name: 'write-to-disk',
		buildStart: () => {
			logger.info('Creating config file…', {
				timestamp: true,
			});

			writeFileSync(
				join(`${__dirname}/../src/Config/_config.json`),
				JSON.stringify(appConfig)
			);

			logger.info('✔ Config file was successfully created', {
				timestamp: true,
			});
		},
	};
}
