import { ReactNode } from 'react';

export interface IBundlePriceReturnData {
	flagComponent: ReactNode;
	url: string;
	rating: number;
	totalEvaluationCount: number;
	quantity: number;
	producerSpecification: string;
}
