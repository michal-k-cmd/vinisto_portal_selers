import { ReactNode } from 'react';

export type TBundleProducerProps = {
	flag: ReactNode;
	name: string;
	isLoading?: boolean;
	openInNewTab?: boolean;
};
