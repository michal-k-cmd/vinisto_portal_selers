import { orderBy } from 'lodash-es';
import useSpecificationParamValue from 'Hooks/useSpecificationParamValue';
import { VinistoProductDllModelsApiSpecificationSpecificationDetail } from 'vinisto_api_client/src/api-types/product-api';

export const useStringifySetBundleParams = (
	bundleParams: VinistoProductDllModelsApiSpecificationSpecificationDetail[]
): string => {
	const getParamValue = useSpecificationParamValue();

	const params = bundleParams.filter(
		(param) =>
			param.definition.name.some(
				(item: { value: string }) =>
					item.value === 'Druh' ||
					item.value === 'Typ' ||
					item.value === 'Objem' ||
					item.value === 'Alkohol'
			) &&
			(param.value?.selectedValueName?.length > 0 ||
				param.value?.selectedValuesName?.length > 0 ||
				param.value?.value !== undefined ||
				(param.value?.specificationType === 'TEXT' &&
					param.definition.isHidden === true))
	);

	const paramsOrdered = orderBy(params, 'definition.orderDetail', 'asc');

	const parameters = paramsOrdered.map((param) => {
		const paramValues = getParamValue(param);
		return Array.isArray(paramValues)
			? paramValues?.map(({ name }) => name)
			: paramValues?.name;
	});
	return parameters.join(', ');
};
