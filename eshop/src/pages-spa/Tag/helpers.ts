import { VinistoProductDllModelsApiTagTagReturn } from 'vinisto_api_client/src/api-types/product-api';
import api from 'vinisto_api_client/src/api';

import { IFetchTagByUrlProps } from './interfaces';

export const fetchTagByUrl = async ({
	tagUrl,
	countryOfSale,
	Currency,
}: IFetchTagByUrlProps) => {
	if (!tagUrl) throw new Error('Tag URL is missing.');

	const tagData = await api.get<VinistoProductDllModelsApiTagTagReturn>(
		`product-api/tags/${tagUrl}/GetTagByUrl`,
		{
			Currency: Currency,
			CountryOfSale: countryOfSale,
		},
		{ serializeUrlParams: false }
	);
	return tagData;
};
