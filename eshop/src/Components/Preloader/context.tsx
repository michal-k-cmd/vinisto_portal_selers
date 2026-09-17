'use client';

import * as React from 'react';
import Preloader from 'Components/Preloader';

import { IPreloaderModel, IPreloaderProps } from './interfaces';

const defaultPreloaderModel: IPreloaderModel = {
	togglePreloader: () => null,
	isPreloaderDisplayed: false,
};

export const PreloaderContext = React.createContext(defaultPreloaderModel);

const PreloaderProvider: React.FunctionComponent<IPreloaderProps> = (
	props: IPreloaderProps
): JSX.Element => {
	const { children } = props;

	const [isPreloaderDisplayed, setIsPreloaderDisplayed] = React.useState(
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
