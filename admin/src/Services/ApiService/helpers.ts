import { IQueryArgument } from 'Services/ApiService/interfaces';

const transformParamsToQueryArgs = (params: {
	[key: string]: any;
}): IQueryArgument[] => {
	return Object.entries(params).map(([key, value]) => {
		if (
			typeof value === 'string' ||
			typeof value === 'number' ||
			typeof value === 'boolean'
		) {
			return { key, value };
		}
		throw new Error(`Invalid value type for key ${key}`);
	});
};

export default transformParamsToQueryArgs;
