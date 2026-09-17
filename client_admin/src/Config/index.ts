import configuration from './_config.json';

const Config = {
	...configuration,
	apiUrl: import.meta.env.VITE_API_URI || '',
};

export default Config;
