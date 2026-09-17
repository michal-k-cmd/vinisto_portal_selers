import { LangValuePair } from 'Hooks/useLocalizedValue/interfaces';
import { VinistoOrderDllModelsApiCommonMultiLangValue } from 'vinisto_api_client/src/api-types/order-api';

interface Adapter<DomainType, ApiType> {
	fromApi(apiData: ApiType): DomainType;
	toApi(domainData: DomainType): ApiType;
	isValid(item: unknown): item is ApiType;
}

abstract class AbstractAdapter<DomainType, ApiType>
	implements Adapter<DomainType, ApiType>
{
	abstract fromApi(apiData: ApiType): DomainType;
	abstract toApi(domainData: DomainType): ApiType;
	abstract isValid(item: unknown): item is ApiType;

	protected convertMultiLangValue(
		multiLangValue: VinistoOrderDllModelsApiCommonMultiLangValue[] | undefined
	): LangValuePair[] {
		return (
			multiLangValue
				?.map((item) => ({
					language: item.language || '',
					value: item.value || '',
				}))
				.filter((item) => item.value !== '') || []
		);
	}
}

export { AbstractAdapter };
export type { Adapter };
