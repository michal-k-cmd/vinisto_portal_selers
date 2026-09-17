import { FormControlProps } from 'Components/Form/interfaces';
import { VinistoProductDllModelsApiBundleBundle } from 'vinisto_api_client/src/api-types/product-api/';

export interface AutocompleteBundleOptionBase {
	label: string;
	value: string;
}

export interface AutocompleteBundleOption extends AutocompleteBundleOptionBase {
	bundle: VinistoProductDllModelsApiBundleBundle;
}

export interface AutocompleteBundleProps<T extends AutocompleteBundleOptionBase>
	extends FormControlProps<T[]> {
	options: T[];
	defaultInputValue?: string;
	labelKey?: string;
	onSearchCallback?: (
		searchingNameString: string,
		params: { [key: string]: string | number | boolean }
	) => void;
	minLength?: number;
	renderOption?: (option: T) => React.ReactNode;
}
