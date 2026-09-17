import { ReactNode } from 'react';

export interface IPreloaderModel {
	togglePreloader: (isShow?: boolean) => void;
	isPreloaderDisplayed: boolean;
}

export interface IPreloaderProps {
	children?: ReactNode;
}
