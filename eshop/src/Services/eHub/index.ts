import api from 'vinisto_api_client/src/api';

import { EHUB_POST_URL } from './constants';
import { EHubRequest } from './types';

const sendEHubRequest = async (data: EHubRequest) => {
	return api.post(EHUB_POST_URL, undefined, data);
};

export const eHubService = {
	sendEHubRequest,
};
