import { get } from 'Helpers/lodash';
import Config from 'Config';

export const getModalConfigByType = (
	modalType: string | null
): Record<any, any> => {
	const currentModalConfig: Record<any, any> = get(
		Config,
		`modals.${modalType}`,
		{}
	);

	return currentModalConfig;
};
