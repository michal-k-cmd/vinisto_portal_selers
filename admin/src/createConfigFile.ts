import { writeFileSync } from 'fs';
import { join } from 'path';

import { createLogger } from 'vite';
const logger = createLogger();

import localizations from '../config/appConfigs/localizationsConfig.json';
import modals from '../config/appConfigs/modalsConfig.json';
import notifications from '../config/appConfigs/notificationsConfig.json';

export default function createConfigPlugin({
	mode,
}: {
	env: Record<string, string>;
	mode: unknown;
}) {
	const appConfig = {
		environment: mode,
		modals,
		notifications,
		localizations,
		contact: {
			phone: '+420 606 758 080',
			email: 'podpora@vinisto.cz',
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
