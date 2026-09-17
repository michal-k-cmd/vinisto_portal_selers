import api from 'vinisto_api_client/src/api';

import { NEWSLETTER_CREATE_UPDATE_API_ENDPOINT } from './constants';

import { VinistoHelperDllEnumsEcoMailRegistrationType } from '@/api-types/services-api';

const NewsletterService = {
	subscribe: ({
		email,
		type,
	}: {
		email: string;
		type?: VinistoHelperDllEnumsEcoMailRegistrationType;
	}) => {
		return api.post(NEWSLETTER_CREATE_UPDATE_API_ENDPOINT, undefined, {
			EmailAddress: email,
			Type: type ?? VinistoHelperDllEnumsEcoMailRegistrationType.NEWSLETTER,
			VisitorUrl: window.location.href ?? '',
		});
	},
	unsubscribe: (email: string) => {
		return api.post(NEWSLETTER_CREATE_UPDATE_API_ENDPOINT, undefined, {
			EmailAddress: email,
			Type: VinistoHelperDllEnumsEcoMailRegistrationType.ORDER,
		});
	},
};

export default NewsletterService;
