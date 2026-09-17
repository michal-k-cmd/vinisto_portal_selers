import api from '@/api';
import {
	VinistoEmailDllModelSendEmailParameters,
	VinistoHelperDllBaseBaseReturn,
	VinistoServicesApiControllersContactFormContactFormParameters,
} from '@/api-types/services-api';
import { SERVICES_API_BASE_URI } from './constants';

/**
 * Send contact form from potential customer, who wants to be contacted by Vinisto
 * @param params - Contact form parameters
 * @returns Promise with boolean value, which indicates if the request was successful
 */
const sendContactForm = async (
	params: VinistoServicesApiControllersContactFormContactFormParameters
) => {
	const response = await api.post<VinistoHelperDllBaseBaseReturn>(
		`${SERVICES_API_BASE_URI}/contact`,
		undefined,
		params
	);

	return response.isError ? Promise.reject(response.error) : true;
};

const sendEmail = async (params: VinistoEmailDllModelSendEmailParameters) => {
	const response = await api.post<VinistoHelperDllBaseBaseReturn>(
		`${SERVICES_API_BASE_URI}/email/send`,
		undefined,
		params
	);

	return response.isError ? Promise.reject(response.error) : true;
};

const ServicesService = {
	sendContactForm,
	sendEmail,
};

export { ServicesService };
