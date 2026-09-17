import { useContext } from 'react';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import { SpecificationExplanationProps } from 'vinisto_ui/src/components/specification-explanation/types';
import { LocalizationContext } from 'Services/LocalizationService';
import { VinistoProductDllModelsApiSpecificationSpecificationDetail } from 'vinisto_api_client/src/api-types/product-api';
import { Specification } from 'vinisto_api_client/src/domain/specification/schema';
import { BundleSpecificationDetails } from 'vinisto_api_client/src/domain/bundle/specification-details';

export const useSpecificationExplanation = (
	specificationDetails: BundleSpecificationDetails[]
) => {
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();
	const getLocalizedValue = useLocalizedValue();

	const prepareData = (
		specification: VinistoProductDllModelsApiSpecificationSpecificationDetail,
		bigImage: boolean
	) => {
		if (!specification) return null;

		const definition = specification.definition as Specification;
		if (
			definition.specificationType !== 'COMBO_BOX' &&
			definition.specificationType !== 'MULTI_COMBO_BOX'
		) {
			return null;
		}

		const values = Object.values(definition.allowedValues)[0];

		if (
			values.name.length === 0 ||
			values.description.length === 0 ||
			values.images.length === 0
		)
			return null;

		const specificationData: SpecificationExplanationProps = {
			imageUrl: bigImage
				? values.images[0]?.domainUrls?.thumb_818x290 || ''
				: values.images[0]?.domainUrls?.thumb_330x260 || '',
			heading: getLocalizedValue(values.name),
			text: getLocalizedValue(values.description),
			anchorLink: bigImage
				? '/produkty/Vyrobce/' + specification.value.selectedValueName
				: undefined,
			anchorText: t({ id: 'productDetail.specificationView.more' }) as string,
		};

		return specificationData;
	};

	const preparedData: VinistoProductDllModelsApiSpecificationSpecificationDetail[] =
		[];

	specificationDetails.map(
		(item: VinistoProductDllModelsApiSpecificationSpecificationDetail) => {
			const specificationName = item?.definition?.name[0].value || '';
			if (specificationName === 'Druh produktu') {
				preparedData[0] = item;
			} else if (specificationName === 'Odrůda') {
				preparedData[1] = item;
			} else if (specificationName === 'Druh') {
				preparedData[2] = item;
			} else if (specificationName === 'Výrobce') {
				preparedData[3] = item;
			}
		}
	);

	const specificationExplanationData: SpecificationExplanationProps[] = [];

	preparedData.map(
		(
			item: VinistoProductDllModelsApiSpecificationSpecificationDetail,
			index
		) => {
			if (!item) return;
			const data = prepareData(item, index === 2 ? true : false);
			data && specificationExplanationData.push(data);
		}
	);

	return specificationExplanationData;
};
