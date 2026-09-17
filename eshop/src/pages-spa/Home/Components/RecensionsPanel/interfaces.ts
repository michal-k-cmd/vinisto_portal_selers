import { VinistoProductDllModelsApiEvaluationEvaluationsReturn } from 'vinisto_api_client/src/api-types/product-api';
import { Bundle } from 'vinisto_api_client/src/domain/bundle';

export interface IRecensionItem {
	id: number;
	title: string;
	shortDescription: string;
	quantity: number;
	priceFrom: number;
	brand: string;
}

export interface IRecensionItemProps {
	item: IRecensionItem;
	key: string;
	clickHandler: (nextitem: IRecensionItem) => () => void;
}

export interface IMainRecensionItemProps {
	item: Record<any, any> | undefined;
}

export interface RecensionsPanelProps {
	data?: Array<
		Bundle & {
			evaluations: VinistoProductDllModelsApiEvaluationEvaluationsReturn;
		}
	>;
	isLoading?: boolean;
}
