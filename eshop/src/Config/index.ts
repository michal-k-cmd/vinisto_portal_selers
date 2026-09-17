import configuration from '../../config/appConfigs/appConfig.json';

const getConfig = () => {
	if (typeof window !== 'undefined') {
		const location = window.document.location;
		const isSlovak = location.hostname.includes('.sk');
		return {
			...configuration,
			baseUrl: isSlovak
				? process.env.NEXT_PUBLIC_BASE_URI_SK || ''
				: process.env.NEXT_PUBLIC_BASE_URI || '',

			apiUrl: isSlovak
				? process.env.NEXT_PUBLIC_API_URI_SK || ''
				: process.env.NEXT_PUBLIC_API_URI || '',

			advisorUrl: isSlovak
				? process.env.NEXT_PUBLIC_ADVISOR_URI_SK || ''
				: process.env.NEXT_PUBLIC_ADVISOR_URI || '',
			environment: process.env.NODE_ENV,
		};
	}
	return {
		...configuration,
		// TODO Handle SK
		baseUrl: process.env.NEXT_PUBLIC_BASE_URI || '',
		apiUrl: process.env.NEXT_PUBLIC_API_URI || '',
		advisorUrl: process.env.NEXT_PUBLIC_ADVISOR_URI || '',
		// TODO handle staging, testing, ci etc.
		environment: process.env.NODE_ENV,
	};
};

const Config = getConfig();

export default Config;
