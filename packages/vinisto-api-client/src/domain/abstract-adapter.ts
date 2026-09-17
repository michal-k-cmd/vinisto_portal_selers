import { VinistoMongoConnectorModelsMultiLangValue } from '@/api-types/order-api';
import { unescape } from 'lodash-es';
import { LangValuePair } from '@/shared';
import { VinistoCommonDllModelsApiMultiLangValues } from './../api-types/product-api';

interface Adapter<DomainType, ApiType> {
	fromApi(apiData: ApiType, request: Record<PropertyKey, any>): DomainType;
	toApi(domainData: DomainType): ApiType;
	isValid(item: unknown): item is ApiType;
}

abstract class AbstractAdapter<DomainType, ApiType>
	implements Adapter<DomainType, ApiType>
{
	abstract fromApi(apiData: ApiType, request: Record<PropertyKey, any>): DomainType;

	toApi(domainData: DomainType): ApiType {
		throw new Error(`toApi is not implemented: ${domainData}`);
	}

	isValid(item: unknown): item is ApiType {
		throw new Error('isValid is not implemented');
	}

	protected convertMultiLangValue(
		multiLangValue:
			| VinistoMongoConnectorModelsMultiLangValue[]
			| null
			| undefined
	): LangValuePair[] {
		if (!Array.isArray(multiLangValue)) {
			return [];
		}

		return (
			multiLangValue
			.filter((item) => item.value !== '')
			?.map((item) => ({
					language: item.language || '',
					value: unescape(item.value || ''),
				}))
		);
	}

	protected convertMultiLangValues(
		multiLangValues:
			| VinistoCommonDllModelsApiMultiLangValues[]
			| null
			| undefined
	) {
		if (!Array.isArray(multiLangValues)) {
			return [];
		}

		return (
			multiLangValues
			?.map((item) => ({
					language: item.language || '',
					values: item.values?.filter(e => e !== '').map(e => unescape(e || '')) ?? [],
				}))
		);
	}
}

export { AbstractAdapter };
export type { Adapter };
