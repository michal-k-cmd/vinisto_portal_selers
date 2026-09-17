import configuration from './_config.json';

const Config = {
	...configuration,
	apiUrl: import.meta.env.VITE_API_URI || '',
	eshopUrl: import.meta.env.VITE_ESHOP_URI || '',
};

export default Config;
