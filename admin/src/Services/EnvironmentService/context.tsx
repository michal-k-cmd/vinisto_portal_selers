import { createContext, ReactNode } from 'react';

import { EnvironmentServiceContextModel } from './interfaces';

import EnvironmentService from './index';

const defaultEnvironmentServiceContextModel: EnvironmentServiceContextModel = {
	EnvironmentService: new EnvironmentService(),
};

export const EnvironmentContext = createContext(
	defaultEnvironmentServiceContextModel
);

const EnvironmentServiceProvider = ({ children }: { children: ReactNode }) => {
	const environmentContext: EnvironmentServiceContextModel = {
		EnvironmentService: new EnvironmentService(),
	};

	return (
		<EnvironmentContext.Provider value={environmentContext}>
			{children}
		</EnvironmentContext.Provider>
	);
};

export default EnvironmentServiceProvider;
