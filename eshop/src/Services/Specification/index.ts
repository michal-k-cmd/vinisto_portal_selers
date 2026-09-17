import {
	SpecificationsGetSpecificationAllowedValuesListParams,
	VinistoProductDllModelsApiSpecificationComboSpecificationAllowedValuesReturn,
} from 'vinisto_api_client/src/api-types/product-api';
import { SPECIFICATION_API_URI } from 'Services/Specification/constants';
import api from 'vinisto_api_client/src/api';

/**
 * @deprecated This function will be removed in future versions. Use SpecificationService.getSpecificationAllowedValues from vinisto-api-client instead.
 */
const getSpecificationAllowedValues = async (
	request: SpecificationsGetSpecificationAllowedValuesListParams
): Promise<VinistoProductDllModelsApiSpecificationComboSpecificationAllowedValuesReturn> => {
	const specificationParams = new URLSearchParams();

	if (request.Limit) {
		specificationParams.append('Limit', `${request.Limit}`);
	}
	if (request.SearchValue) {
		specificationParams.append('SearchValue', request.SearchValue);
	}
	if (request.SearchUrl) {
		specificationParams.append('SearchUrl', request.SearchUrl);
	}
	if (request.Language) {
		specificationParams.append('Language', request.Language);
	}
	if (request.SearchUrl) {
		specificationParams.append('SearchUrl', request.SearchUrl);
	}
	if (request.SortingPrimaryColumn) {
		specificationParams.append(
			'SortingPrimaryColumn',
			request.SortingPrimaryColumn
		);
	}
	if (request.IsSortingPrimaryDescending) {
		specificationParams.append(
			'IsSortingPrimaryDescending',
			`${request.IsSortingPrimaryDescending}`
		);
	}
	if (request.SortingSecondaryColumn) {
		specificationParams.append(
			'SortingSecondaryColumn',
			request.SortingSecondaryColumn
		);
	}
	if (request.IsCache) {
		specificationParams.append('IsCache', `${request.IsCache}`);
	}
	if (request.IsSortingSecondaryDescending) {
		specificationParams.append(
			'IsSortingSecondaryDescending',
			`${request.IsSortingSecondaryDescending}`
		);
	}
	if (request.Offset) {
		specificationParams.append('Offset', `${request.Offset}`);
	}

	const res =
		await api.get<VinistoProductDllModelsApiSpecificationComboSpecificationAllowedValuesReturn>(
			`${SPECIFICATION_API_URI}/${request.specificationId}/GetSpecificationAllowedValues`,
			specificationParams
		);

	return res;
};

const specificationService = { getSpecificationAllowedValues };

export default specificationService;
