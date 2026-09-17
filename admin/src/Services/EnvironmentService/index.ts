import { LOCAL_ENVIRONMENT_KEYS } from './constants';

class EnvironmentService {
	private ENV: (typeof LOCAL_ENVIRONMENT_KEYS)[keyof typeof LOCAL_ENVIRONMENT_KEYS];
	public isProduction: boolean = false;

	constructor() {
		const hostname = window.location.hostname;

		if (hostname === LOCAL_ENVIRONMENT_KEYS.LOCALHOST) {
			this.ENV = LOCAL_ENVIRONMENT_KEYS.LOCALHOST;
		} else if (hostname === LOCAL_ENVIRONMENT_KEYS.DEV) {
			this.ENV = LOCAL_ENVIRONMENT_KEYS.DEV;
		} else {
			this.ENV = LOCAL_ENVIRONMENT_KEYS.PRODUCTION;
			this.isProduction = true;
		}
	}

	public getEnvironment(): (typeof LOCAL_ENVIRONMENT_KEYS)[keyof typeof LOCAL_ENVIRONMENT_KEYS] {
		return this.ENV;
	}

	public log(message?: any, ...optionalParams: any[]) {
		if (this.ENV === LOCAL_ENVIRONMENT_KEYS.LOCALHOST) {
			// eslint-disable-next-line no-console
			console.log(message, ...optionalParams);
		}
	}
}

export default EnvironmentService;
