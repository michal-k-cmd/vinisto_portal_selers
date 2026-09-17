import useLocalizedValue from 'Hooks/useLocalizedValue';
import {
	VinistoProductDllModelsApiBundleBundle,
	VinistoProductDllModelsApiHomePageItem,
} from 'vinisto_api_client/src/api-types/product-api/';

const useBundleItem = (
	bundle: VinistoProductDllModelsApiBundleBundle,
	idSequenceMap?: VinistoProductDllModelsApiHomePageItem
) => {
	const getLocalizedValue = useLocalizedValue();

	const id = bundle.id ?? '';
	const name = getLocalizedValue(bundle.name ?? []);
	const supplier = bundle.supplier?.nameWeb ?? '';
	const availableCount = bundle.availableCount ?? 0;
	const sequenceNumber =
		idSequenceMap && idSequenceMap.bundleId === id
			? idSequenceMap.sequenceNumber
			: null;

	const bundleImage = bundle?.images?.find((image) => image?.isMain)?.domainUrls
		?.thumb_88x138;

	return {
		id,
		name,
		supplier,
		availableCount,
		sequenceNumber,
		bundleImage,
	};
};

export default useBundleItem;
