import { VinistoImageDllModelsApiImageImage } from 'vinisto_api_client/src/api-types/product-api';

const getSrcSet = (
	domainUrls: VinistoImageDllModelsApiImageImage['domainUrls']
) => {
	if (!domainUrls) return null;
	const sources = Object.keys(domainUrls)
		.map((key) => {
			const width = key.match(/\d+/)?.[0];
			return width ? `${domainUrls[key]} ${width}w` : null;
		})
		.filter(Boolean);
	return sources.join(', ');
};

export default getSrcSet;
