import { createContext, useState } from 'react';

import { IPreloaderModel, IPreloaderProps } from './interfaces';

import Preloader from './index';

const defaultPreloaderModel: IPreloaderModel = {
	togglePreloader: () => {},
	isPreloaderDisplayed: false,
};

export const PreloaderContext = createContext(defaultPreloaderModel);

const PreloaderProvider = (props: IPreloaderProps) => {
	const { children } = props;

	const [isPreloaderDisplayed, setIsPreloaderDisplayed] = useState(
		defaultPreloaderModel.isPreloaderDisplayed
	);
	const togglePreloader: IPreloaderModel['togglePreloader'] = (isShow) => {
		if (isShow === undefined) {
			setIsPreloaderDisplayed((oldValue) => !oldValue);
		} else {
			setIsPreloaderDisplayed(isShow);
		}
	};

	const preloaderModel: IPreloaderModel = {
		togglePreloader,
		isPreloaderDisplayed,
	};

	return (
		<PreloaderContext.Provider value={preloaderModel}>
			{isPreloaderDisplayed && <Preloader />}
			{children}
		</PreloaderContext.Provider>
	);
};

export default PreloaderProvider;
